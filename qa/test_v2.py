"""인생이라는 필름 v2 — 100장 카드 + 실사 사진/뷰파인더 실브라우저 검증
실행: python3 qa/test_v2.py  (내부에서 http.server 기동/종료)
"""
import json, os, subprocess, sys, time
from playwright.sync_api import sync_playwright

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = '/workspace/downloads/life-film-v2-2026-11-20'
PORT = 8765

os.makedirs(OUT, exist_ok=True)
LIB = '/workspace/.local/lib/chromedeps/usr/lib/x86_64-linux-gnu'
ENV = dict(os.environ)
if os.path.isdir(LIB):
    ENV['LD_LIBRARY_PATH'] = LIB + ':' + ENV.get('LD_LIBRARY_PATH', '')
srv = subprocess.Popen([sys.executable, '-m', 'http.server', str(PORT), '--bind', '127.0.0.1'],
                       cwd=ROOT, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
time.sleep(1.2)

report = {'errors': [], 'checks': {}}
try:
    with sync_playwright() as p:
        b = p.chromium.launch(env=ENV)
        for label, w, h in [('desktop', 1440, 900), ('mobile', 390, 844)]:
            ctx = b.new_context(viewport={'width': w, 'height': h}, device_scale_factor=2,
                                is_mobile=(label == 'mobile'), has_touch=(label == 'mobile'))
            page = ctx.new_page()
            msgs = []
            page.on('console', lambda m: msgs.append((m.type, m.text)) if m.type == 'error' else None)
            page.on('pageerror', lambda e: msgs.append(('pageerror', str(e))))
            page.goto(f'http://127.0.0.1:{PORT}/index.html', wait_until='networkidle')
            page.wait_for_timeout(500)

            # 카드마다 화면에 올려 lazy 이미지가 실제로 로드되는지 확인
            fail_load = []
            n_cards = page.locator('.card').count()
            for i in range(n_cards):
                card = page.locator('.card').nth(i)
                card.scroll_into_view_if_needed()
                page.wait_for_timeout(60)
                ok = card.locator('img').evaluate("i => i.complete && i.naturalWidth > 0")
                if not ok:
                    fail_load.append(card.get_attribute('data-id'))
            page.evaluate("window.scrollTo(0, 0)")
            page.wait_for_timeout(600)

            broken = page.eval_on_selector_all('.card__thumb img', "els => els.filter(e => e.naturalWidth === 0).length")
            overflow = page.evaluate("() => ({sw: document.documentElement.scrollWidth, cw: document.documentElement.clientWidth, body: document.body.scrollWidth})")
            cols = page.evaluate("() => getComputedStyle(document.getElementById('grid')).gridTemplateColumns.split(' ').length")
            thumbs = page.eval_on_selector_all('.card__thumb img.thumb__img', 'els => els.length')
            stat = page.inner_text('#statCards')

            report['checks'][label] = {
                'cards': n_cards, 'card_thumbs': thumbs, 'broken': broken, 'fail_load': fail_load,
                'stat': stat, 'overflow': overflow, 'grid_columns': cols,
                'console': [m for m in msgs]
            }

            if label == 'desktop':
                page.screenshot(path=f'{OUT}/desktop-hero.png', clip={'x': 0, 'y': 0, 'width': w, 'height': 900})
                page.evaluate("window.scrollTo(0, document.getElementById('cards').offsetTop - 60)")
                page.wait_for_timeout(400)
                page.screenshot(path=f'{OUT}/desktop-cards.png')
            else:
                page.evaluate("window.scrollTo(0, document.getElementById('cards').offsetTop - 40)")
                page.wait_for_timeout(400)
                page.screenshot(path=f'{OUT}/mobile-cards.png')

            # 모달: After → Before → 삼분할 토글
            page.evaluate("document.querySelector('.card').click()")
            page.wait_for_selector('#modal:not([hidden])')
            page.wait_for_timeout(600)
            state_after = page.evaluate("""() => ({after: !!document.querySelector('.shot--after'),
                grid: !!document.querySelector('.hud__thirds'), note: document.querySelector('.hud__note')?.textContent,
                nw: document.querySelector('.shot__img')?.naturalWidth,
                related: !!document.querySelector('#mRelated'),
                checkInsideViewer: !!document.querySelector('.vf__check #mChecks'),
                checkCount: document.querySelectorAll('#mChecks input').length})""")
            page.screenshot(path=f'{OUT}/{label}-modal-after.png')

            page.click('#mBefore')
            page.wait_for_timeout(500)
            state_before = page.evaluate("""() => ({before: !!document.querySelector('.shot--before'),
                transform: getComputedStyle(document.querySelector('.shot__img')).transform,
                filter: getComputedStyle(document.querySelector('.shot__img')).filter,
                warn: !!document.querySelector('.hud__warnline, .hud__center, .hud__crop'),
                note: document.querySelector('.hud__note')?.textContent})""")
            page.screenshot(path=f'{OUT}/{label}-modal-before.png')

            page.click('#mGrid')
            page.wait_for_timeout(300)
            grid_off = page.evaluate("() => ({grid: !!document.querySelector('.hud__thirds'), label: document.querySelector('#mGrid span').textContent})")
            page.click('#mGrid')
            page.wait_for_timeout(200)

            report['checks'][label].update({'modal_after': state_after, 'modal_before': state_before, 'grid_toggle_off': grid_off})
            ctx.close()

        # 100장 전수 순회: 모든 카드가 사진을 갖고 before/after 모두 렌더되는지
        ctx = b.new_context(viewport={'width': 1440, 'height': 900})
        page = ctx.new_page()
        page.goto(f'http://127.0.0.1:{PORT}/index.html', wait_until='networkidle')
        page.wait_for_timeout(500)
        ids = page.evaluate("() => Array.from(document.querySelectorAll('.card')).map(c => c.dataset.id)")
        bad = []
        no_photo = []
        for cid in ids:
            page.evaluate(f"document.querySelector('.card[data-id=\"{cid}\"]').click()")
            page.wait_for_timeout(70)
            for is_after in (True, False):
                page.click('#mAfter' if is_after else '#mBefore')
                page.wait_for_timeout(45)
                r = page.evaluate("""() => { const i = document.querySelector('.shot__img');
                    return {nw: i.naturalWidth, cls: document.querySelector('.shot').className,
                            note: document.querySelector('.hud__note')?.textContent || '',
                            checks: document.querySelectorAll('#mChecks input').length,
                            srcs: document.querySelectorAll('#mSources a').length}; }""")
                if r['nw'] == 0 or not r['note'] or ('after' in r['cls']) != is_after or r['checks'] < 2 or r['srcs'] < 1:
                    bad.append((cid, is_after, r))
            page.keyboard.press('Escape')
            page.wait_for_timeout(40)
        report['all_cards_bad'] = bad
        report['all_cards_count'] = len(ids)

        # 필터·검색 동작
        page.fill('#searchInput', '야경')
        page.wait_for_timeout(250)
        search_n = page.locator('.card').count()
        page.fill('#searchInput', '')
        page.wait_for_timeout(200)
        page.click('.chip[data-cat="cafe"]')
        page.wait_for_timeout(250)
        cafe_n = page.locator('.card').count()
        page.click('.chip[data-cat="all"]')
        page.wait_for_timeout(200)
        total_n = page.locator('.card').count()
        report['filters'] = {'search_야경': search_n, 'cafe': cafe_n, 'all': total_n}
        ctx.close()
        b.close()
finally:
    srv.terminate()

print(json.dumps(report, ensure_ascii=False, indent=1))
