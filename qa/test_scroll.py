#!/usr/bin/env python3
"""인생이라는 필름 — 탭·필터 전환 시 첫 카드 스크롤 정렬 회귀 테스트.
PC 1440×900 · 모바일 390×844에서 페이지 맨 아래까지 내린 뒤
탭/렌즈/난이도/검색을 바꾸고, 첫 카드 상단이 sticky 필터 바 아래 12px에
오는지 실측한다. 최초 로드에서는 스크롤이 0이어야 한다.
"""
import os, subprocess, sys, time, json
from playwright.sync_api import sync_playwright

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = '/workspace/downloads/life-film-v4-2026-11-21/scroll'
PORT = 8794
LIB = '/workspace/.local/lib/chromedeps/usr/lib/x86_64-linux-gnu'
ENV = dict(os.environ)
if os.path.isdir(LIB):
    ENV['LD_LIBRARY_PATH'] = LIB + ':' + ENV.get('LD_LIBRARY_PATH', '')
os.makedirs(OUT, exist_ok=True)

srv = subprocess.Popen([sys.executable, '-m', 'http.server', str(PORT), '--bind', '127.0.0.1'],
                       cwd=ROOT, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
time.sleep(1.2)
res = []


def measure(pg):
    return pg.evaluate("""() => {
        const c = document.querySelector('.controls').getBoundingClientRect();
        const card = document.querySelector('#grid .card');
        const r = card ? card.getBoundingClientRect() : null;
        return {barBottom: Math.round(c.bottom), cardTop: r ? Math.round(r.top) : null,
                gap: r ? Math.round(r.top - c.bottom) : null,
                scrollY: Math.round(window.scrollY),
                n: document.querySelectorAll('#grid .card').length,
                first: card ? card.getAttribute('data-id') : null};
    }""")


try:
    with sync_playwright() as p:
        b = p.chromium.launch(env=ENV)
        for label, w, h in [('PC', 1440, 900), ('M390', 390, 844)]:
            pg = b.new_page(viewport={'width': w, 'height': h}, device_scale_factor=1,
                            is_mobile=(label == 'M390'), has_touch=(label == 'M390'))
            errs = []
            pg.on('console', lambda m: errs.append(m.text) if m.type == 'error' else None)
            pg.on('pageerror', lambda e: errs.append(str(e)))
            pg.goto(f'http://127.0.0.1:{PORT}/index.html', wait_until='networkidle')
            pg.wait_for_timeout(600)
            res.append((label, '초기 로드', measure(pg), errs[:3]))
            pg.screenshot(path=f'{OUT}/{label}_00_initial.png')

            tabs = ['인물·포즈', '혼자 여행·셀카봉', '풍경·여행지', '카페·음식', '야경·역광·감성', '폰 카메라 세팅']
            for i, t in enumerate(tabs):
                pg.evaluate("() => window.scrollTo(0, document.body.scrollHeight)")
                pg.wait_for_timeout(350)
                depth = pg.evaluate("() => Math.round(window.scrollY)")
                pg.get_by_role('tab', name=t).click()
                pg.wait_for_timeout(600)
                res.append((label, '하단→' + t, dict(measure(pg), fromY=depth), []))
                pg.screenshot(path=f'{OUT}/{label}_{i + 1:02d}_{["pose", "solo", "scene", "cafe", "night", "setting"][i]}.png')

            pg.evaluate("() => window.scrollTo(0, document.body.scrollHeight)")
            pg.wait_for_timeout(300)
            pg.locator('#lensFilter button', has_text='0.5x').first.click()
            pg.wait_for_timeout(500)
            res.append((label, '하단→렌즈 0.5x', measure(pg), []))
            pg.screenshot(path=f'{OUT}/{label}_07_lens.png')

            pg.locator('#lensFilter button', has_text='전체').first.click()
            pg.wait_for_timeout(300)
            pg.evaluate("() => window.scrollTo(0, document.body.scrollHeight)")
            pg.wait_for_timeout(300)
            pg.select_option('#levelSelect', '3')
            pg.wait_for_timeout(500)
            res.append((label, '하단→난이도 고급', measure(pg), []))
            pg.screenshot(path=f'{OUT}/{label}_08_level.png')

            pg.select_option('#levelSelect', 'all')
            pg.wait_for_timeout(300)
            pg.evaluate("() => window.scrollTo(0, document.body.scrollHeight)")
            pg.wait_for_timeout(300)
            pg.fill('#searchInput', '야경')
            pg.wait_for_timeout(600)
            res.append((label, '하단→검색 야경', measure(pg), []))
            pg.screenshot(path=f'{OUT}/{label}_09_search.png')

            pg.fill('#searchInput', '')
            pg.evaluate("() => window.scrollTo(0, 0)")
            pg.wait_for_timeout(300)
            res.append((label, '맨 위 상태', measure(pg), []))
            pg.close()
        b.close()
finally:
    srv.terminate()

print(json.dumps(res, ensure_ascii=False, indent=1))
bad = [r for r in res
       if r[1] not in ('초기 로드', '맨 위 상태')
       and (r[2]['gap'] is None or abs(r[2]['gap'] - 12) > 3)]
print('\nFAIL', len(bad))
for b_ in bad:
    print(b_)
