#!/usr/bin/env python3
"""인생이라는 필름 v3 — 100장 전수 검증.
1) 데이터: 카드 100 · 단계 3 · 실수 2 · 체크 3 · 출처 1개 이상 · 중복/유사 0건
2) 이미지: 카드 100 = 사진 100 (중복 0) · 파일 실존 · 용량 · 해상도
3) 실브라우저: 100장 이미지 전수 로드 · 1440/390 레이아웃 · 콘솔 에러 0 · 모달 동작
"""
import json, os, re, subprocess, sys, time, itertools
from playwright.sync_api import sync_playwright

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = '/workspace/downloads/life-film-v3-2026-11-21'
PORT = 8791
os.makedirs(OUT, exist_ok=True)
LIB = '/workspace/.local/lib/chromedeps/usr/lib/x86_64-linux-gnu'
ENV = dict(os.environ)
if os.path.isdir(LIB):
    ENV['LD_LIBRARY_PATH'] = LIB + ':' + ENV.get('LD_LIBRARY_PATH', '')

srv = subprocess.Popen([sys.executable, '-m', 'http.server', str(PORT), '--bind', '127.0.0.1'],
                       cwd=ROOT, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
time.sleep(1.2)

report = {'errors': [], 'warnings': [], 'stats': {}}


def add_err(m):
    report['errors'].append(m)


def tokens(s):
    s = re.sub(r'[^0-9A-Za-z가-힣]+', ' ', s)
    return [t for t in s.split() if len(t) > 1]


def grams(s, n=4):
    s = re.sub(r'[^0-9A-Za-z가-힣]+', '', s)
    return {s[i:i + n] for i in range(max(0, len(s) - n + 1))}


def jac(a, b):
    if not a or not b:
        return 0.0
    return len(a & b) / len(a | b)


def similarity(pairs, label, show=6):
    """title·principle·keywords 종합 유사도."""
    res = []
    for (ta, pa, ka), (tb, pb, kb) in itertools.combinations(pairs, 2):
        st = jac(grams(ta + pa), grams(tb + pb))
        sk = jac(set(ka.split()), set(kb.split()))
        tt = jac(set(tokens(ta)), set(tokens(tb)))
        res.append((round(max(st, sk, tt * 0.95), 3), ta, tb, round(st, 3), round(sk, 3), round(tt, 3)))
    res.sort(reverse=True)
    print(f'[{label}] 쌍 {len(res)} · 최대 {res[0][0] if res else 0:.3f}')
    for r in res[:show]:
        print('   ', r)
    return res


try:
    with sync_playwright() as p:
        b = p.chromium.launch(env=ENV)
        page = b.new_page(viewport={'width': 1440, 'height': 900})
        msgs = []
        page.on('console', lambda m: msgs.append((m.type, m.text)) if m.type == 'error' else None)
        page.on('pageerror', lambda e: msgs.append(('pageerror', str(e))))
        page.goto(f'http://127.0.0.1:{PORT}/index.html', wait_until='networkidle')
        page.wait_for_timeout(600)

        data = page.evaluate('''() => JSON.stringify({
            cards: CARDS, media: MEDIA, photos: PHOTOS, src: Object.keys(SRC),
            nPhotos: Object.keys(PHOTOS).length })''')
        D = json.loads(data)
        cards, media, photos = D['cards'], D['media'], D['photos']
        report['stats']['cards'] = len(cards)
        report['stats']['src'] = len(D['src'])
        report['stats']['photos'] = D['nPhotos']

        # ── 데이터 검증 ──
        if len(cards) != 100:
            add_err(f'카드 수 {len(cards)} (100 아님)')
        ids = [c['id'] for c in cards]
        if len(set(ids)) != 100:
            add_err('카드 id 중복: ' + str([i for i in set(ids) if ids.count(i) > 1]))
        titles = [c['title'] for c in cards]
        if len(set(titles)) != 100:
            add_err('카드 제목 중복: ' + str([t for t in set(titles) if titles.count(t) > 1]))
        for c in cards:
            if len(c.get('steps', [])) != 3:
                add_err(f"{c['id']}: 단계 {len(c.get('steps', []))}개")
            if len(c.get('fails', [])) != 2:
                add_err(f"{c['id']}: 실수 {len(c.get('fails', []))}개")
            if len(c.get('checks', [])) != 3:
                add_err(f"{c['id']}: 체크 {len(c.get('checks', []))}개")
            if not c.get('sources'):
                add_err(f"{c['id']}: 출처 없음")
            if len(c.get('principle', '')) < 60:
                add_err(f"{c['id']}: 원리 설명이 너무 짧음({len(c.get('principle', ''))}자)")
            if not re.search(r'\d', c.get('principle', '')):
                report['warnings'].append(f"{c['id']}: 원리에 수치 없음")
            if c['id'] not in media:
                add_err(f"{c['id']}: MEDIA 없음")

        over = [r for r in similarity([(c['title'], c['principle'], c['keywords']) for c in cards], '새 카드') if r[0] >= 0.30]
        if over:
            add_err(f'유사 카드 {len(over)}쌍 임계(0.30) 초과: ' + str(over[:3]))

        # ── 이미지 검증 ──
        used = [media[c['id']]['photo'] for c in cards]
        if len(set(used)) != 100:
            dup = [u for u in set(used) if used.count(u) > 1]
            add_err(f'이미지 중복 사용: {dup}')
        total = 0
        for key, ph in photos.items():
            fpath = os.path.join(ROOT, ph['src'])
            if not os.path.exists(fpath):
                add_err(f'이미지 파일 없음: {ph["src"]}')
                continue
            sz = os.path.getsize(fpath)
            total += sz
            if sz > 260 * 1024:
                add_err(f'{key}: 용량 {sz // 1024}KB (과대)')
            if sz < 20 * 1024:
                add_err(f'{key}: 용량 {sz // 1024}KB (과소)')
            from PIL import Image
            with Image.open(fpath) as im:
                w, h = im.size
            if (w, h) != (ph['w'], ph['h']):
                add_err(f'{key}: 해상도 {w}x{h} ≠ 메타 {ph["w"]}x{ph["h"]}')
        report['stats']['img_total_mb'] = round(total / 1024 / 1024, 2)

        # ── 실브라우저: 100장 이미지 전수 로드 + 레이아웃 ──
        layouts = {}
        for label, w, h in [('desktop', 1440, 900), ('mobile', 390, 844)]:
            ctx = b.new_context(viewport={'width': w, 'height': h}, device_scale_factor=1,
                                is_mobile=(label == 'mobile'), has_touch=(label == 'mobile'))
            pg = ctx.new_page()
            pmsgs = []
            pg.on('console', lambda m: pmsgs.append((m.type, m.text)) if m.type == 'error' else None)
            pg.on('pageerror', lambda e: pmsgs.append(('pageerror', str(e))))
            pg.goto(f'http://127.0.0.1:{PORT}/index.html', wait_until='networkidle')
            pg.wait_for_timeout(500)
            n = pg.locator('.card').count()
            if n != 100:
                add_err(f'{label}: 카드 DOM {n}개')
            bad = []
            for i in range(n):
                pg.locator('.card').nth(i).scroll_into_view_if_needed()
                pg.wait_for_timeout(25)
            pg.wait_for_timeout(400)
            dims = pg.evaluate('''() => Array.from(document.querySelectorAll('.thumb__img'))
                .map(im => ({src: im.getAttribute('src'), nw: im.naturalWidth, ch: im.complete}))''')
            bad = [d for d in dims if d['nw'] == 0 or not d['ch']]
            if bad:
                add_err(f'{label}: 로드 실패 이미지 {len(bad)}장 {bad[:3]}')
            ov = pg.evaluate("() => document.documentElement.scrollWidth - window.innerWidth")
            cols = pg.evaluate("()=>getComputedStyle(document.querySelector('#grid')).gridTemplateColumns.split(' ').length")
            layouts[label] = {'img': len(dims), 'loaded': len(dims) - len(bad), 'overflow': ov, 'cols': cols,
                              'console': len(pmsgs)}
            if ov > 0:
                add_err(f'{label}: 가로 오버플로우 {ov}px')
            if label == 'desktop' and cols != 3:
                add_err(f'데스크톱 열 수 {cols}')
            if label == 'mobile' and cols != 1:
                add_err(f'모바일 열 수 {cols}')
            if pmsgs:
                add_err(f'{label} 콘솔 에러: {pmsgs[:3]}')
            ctx.close()
        report['stats']['layouts'] = layouts

        # ── 모달 동작 (대표 3장) ──
        pg = b.new_page(viewport={'width': 1440, 'height': 900}, device_scale_factor=2)
        pg.goto(f'http://127.0.0.1:{PORT}/index.html', wait_until='networkidle')
        modal = {}
        for cid in ['puddle-reflection', 'space', 'food-action']:
            pg.click(f'.card[data-id="{cid}"]')
            pg.wait_for_timeout(250)
            pg.click('#mBefore')
            pg.wait_for_timeout(150)
            pg.click('#mAfter')
            pg.wait_for_timeout(150)
            pg.click('#mGrid')
            pg.wait_for_timeout(150)
            boxes = pg.locator('#mChecks input').count()
            pg.locator('#mChecks input').nth(0).check()
            pg.wait_for_timeout(100)
            modal[cid] = {'checks': boxes, 'progress': pg.inner_text('#mProgressN'),
                          'note': pg.inner_text('#mHint'),
                          'focus_dot': pg.locator('.hud__focus').count()}
            if boxes != 3:
                add_err(f'{cid}: 모달 체크박스 {boxes}개')
            if pg.locator('.hud__focus').count() != 1:
                add_err(f'{cid}: 초점 표시 없음')
            if not pg.locator('.shot__img').is_visible():
                add_err(f'{cid}: 뷰파인더 이미지 없음')
            pg.click('#modalClose')
            pg.wait_for_timeout(150)
        report['stats']['modal'] = modal

        # ── 스크린샷 ──
        pg.click('.card[data-id="puddle-reflection"]')
        pg.wait_for_timeout(300)
        pg.click('#mAfter'); pg.click('#mGrid'); pg.wait_for_timeout(300)
        pg.locator('.vf').screenshot(path=f'{OUT}/modal-after-puddle.png')
        pg.click('#mBefore'); pg.wait_for_timeout(250)
        pg.locator('.vf').screenshot(path=f'{OUT}/modal-before-puddle.png')
        pg.click('#modalClose'); pg.wait_for_timeout(200)
        pg.screenshot(path=f'{OUT}/desktop-1440.png', full_page=False)
        pg.screenshot(path=f'{OUT}/desktop-full.png', full_page=True)
        pg.set_viewport_size({'width': 390, 'height': 844})
        pg.wait_for_timeout(400)
        pg.screenshot(path=f'{OUT}/mobile-390.png', full_page=False)
        pg.set_viewport_size({'width': 1440, 'height': 900})
        pg.click('.card[data-id="space"]')
        pg.wait_for_timeout(300)
        pg.locator('.vf').screenshot(path=f'{OUT}/modal-after-space.png')
        pg.click('#modalClose')
        b.close()
finally:
    srv.terminate()

# ── 기존(v2) 대비 개선 수치 ──
print('\n== 기존 v2 데이터 유사도 ==')
tmp = '/tmp/v2'
os.makedirs(tmp, exist_ok=True)
for f in ['data.js', 'cards-more.js']:
    out = subprocess.run(['git', 'show', f'HEAD:{f}'], cwd=ROOT, capture_output=True, text=True)
    open(os.path.join(tmp, f), 'w', encoding='utf-8').write(out.stdout)
old = open(os.path.join(tmp, 'data.js'), encoding='utf-8').read() + '\n' + \
    open(os.path.join(tmp, 'cards-more.js'), encoding='utf-8').read()
old_cards = []
for m in re.finditer(r"title: '([^']+)'.*?keywords: '([^']*)'.*?principle: '([^']+)'", old, re.S):
    old_cards.append((m.group(1), m.group(3), m.group(2)))
print('v2 카드', len(old_cards))
old_res = similarity(old_cards, 'v2 카드', show=14)
old_over = [r for r in old_res if r[0] >= 0.30]
print('v2 유사 카드(0.30 이상):', len(old_over), '쌍')
print('v2 이미지 매핑 중복:', end=' ')
photos_v2 = open(os.path.join(tmp, 'photos.js'), encoding='utf-8').read() if os.path.exists(os.path.join(tmp, 'photos.js')) else ''
subprocess.run(['git', 'show', 'HEAD:photos.js'], cwd=ROOT, stdout=open(os.path.join(tmp, 'photos.js'), 'w'), text=True)
subprocess.run(['git', 'show', 'HEAD:photos-more.js'], cwd=ROOT, stdout=open(os.path.join(tmp, 'photos-more.js'), 'w'), text=True)
p2 = open(os.path.join(tmp, 'photos.js'), encoding='utf-8').read() + open(os.path.join(tmp, 'photos-more.js'), encoding='utf-8').read()
used2 = re.findall(r"photo: '([^']+)'", p2)
from collections import Counter
c2 = Counter(used2)
print(sum(v - 1 for v in c2.values() if v > 1), '건 / 사용', len(used2), '/ 고유', len(c2))
report['stats']['v2_dup_pairs'] = len(old_over)
report['stats']['v2_img_dups'] = sum(v - 1 for v in c2.values() if v > 1)

print('\n== 결과 ==')
print(json.dumps(report, ensure_ascii=False, indent=1))
print('\n에러', len(report['errors']), '/ 경고', len(report['warnings']))
sys.exit(1 if report['errors'] else 0)
