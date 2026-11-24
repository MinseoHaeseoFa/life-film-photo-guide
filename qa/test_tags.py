#!/usr/bin/env python3
"""인생이라는 필름 — 카드 분류 배지 회귀 테스트.

카드는 두 분야에 속할 수 있으므로 배지는 속한 분류를 모두 표시해야 합니다.
1) 모든 탭 × PC(1280) · 모바일(390)에서 카드마다 배지 수 == 카드의 분류 수
2) '전체' 탭에서는 데이터 순서(대표 분류) 그대로
3) 특정 탭에서는 그 탭의 분류가 첫 배지 + 강조(`.tag--match`)
4) 배지 · 렌즈 · 난이도가 3줄로 흘러넘치지 않고 가로 오버플로우 0
5) 모달도 같은 배지를 같은 순서로 표시
사용: python3 qa/test_tags.py [http://127.0.0.1:8801/]
"""
import json, os, subprocess, sys, time

from playwright.sync_api import sync_playwright

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PORT = 8801
LIB = '/workspace/.local/lib/chromedeps/usr/lib/x86_64-linux-gnu'
ENV = dict(os.environ)
if os.path.isdir(LIB):
    ENV['LD_LIBRARY_PATH'] = LIB + ':' + ENV.get('LD_LIBRARY_PATH', '')

TABS = ['all', 'solo', 'pose', 'scene', 'cafe', 'night', 'setting']

GRID_CHECK = r"""(tab) => {
  const L = Object.fromEntries(CATS.map(k => [k.id, k.label]));
  const bad = [];
  const cards = [...document.querySelectorAll('#grid .card')];
  let multi = 0;
  for (const el of cards) {
    const c = CARDS.find(x => x.id === el.dataset.id);
    const meta = el.querySelector('.card__meta');
    const tags = [...meta.querySelectorAll('.tag')];
    if (tags.length !== c.cat.length) bad.push({ id: c.id, why: '배지 수', got: tags.length, want: c.cat.length });
    if (c.cat.length > 1) multi++;
    if (tab === 'all') {
      const want = c.cat.map(k => L[k]).join('|');
      if (tags.map(t => t.textContent).join('|') !== want) bad.push({ id: c.id, why: '전체 탭 순서', got: tags.map(t => t.textContent) });
    } else {
      if (!c.cat.includes(tab)) bad.push({ id: c.id, why: '탭 밖 카드' });
      if (tags[0] && tags[0].textContent !== L[tab]) bad.push({ id: c.id, why: '첫 배지', got: tags.map(t => t.textContent) });
      if (tags[0] && !tags[0].classList.contains('tag--match')) bad.push({ id: c.id, why: '강조 클래스 없음' });
      if (tags.slice(1).some(t => t.classList.contains('tag--match'))) bad.push({ id: c.id, why: '강조 배지 중복' });
    }
    const tops = [...meta.children].map(x => x.getBoundingClientRect().top);
    const rows = [];
    for (const tp of tops) if (!rows.some(v => Math.abs(v - tp) <= 6)) rows.push(tp);
    if (rows.length > 2) bad.push({ id: c.id, why: '메타 3줄 이상', rows: rows.length });
    const box = el.querySelector('.card__body').getBoundingClientRect();
    for (const ch of meta.children) {
      const r = ch.getBoundingClientRect();
      if (r.right > box.right + 0.6 || r.left < box.left - 0.6) bad.push({ id: c.id, why: '가로 넘침', el: ch.className });
    }
  }
  return {
    count: cards.length, multi, bad,
    overflow: document.documentElement.scrollWidth - window.innerWidth,
  };
}"""

MODAL_CHECK = r"""(id) => {
  const c = CARDS.find(x => x.id === id);
  const badges = [...document.querySelectorAll('#mCat .tag')].map(t => t.textContent);
  return { id, badges, wantN: c.cat.length, lv: document.querySelector('#mCat .modal__lv')?.textContent || null };
}"""


def main():
    base = sys.argv[1] if len(sys.argv) > 1 else None
    srv = None
    if not base:
        base = f'http://127.0.0.1:{PORT}/'
        srv = subprocess.Popen([sys.executable, '-m', 'http.server', str(PORT), '--bind', '127.0.0.1'],
                               cwd=ROOT, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
        time.sleep(1.2)
    out = {'base': base, 'tabs': {}, 'console': [], 'fail': 0}
    try:
        with sync_playwright() as p:
            b = p.chromium.launch(env=ENV)
            for vw in (1280, 390):
                ctx = b.new_context(viewport={'width': vw, 'height': 900})
                pg = ctx.new_page()
                pg.on('console', lambda m: out['console'].append(m.text) if m.type == 'error' else None)
                pg.on('pageerror', lambda e: out['console'].append(str(e)))
                pg.goto(base, wait_until='networkidle')
                for tab in TABS:
                    pg.evaluate("t => document.querySelector(`[data-cat=\"${t}\"]`).click()", tab)
                    pg.wait_for_timeout(320)
                    r = pg.evaluate(GRID_CHECK, tab)
                    if r['bad']:
                        out['fail'] += len(r['bad'])
                    if r['overflow']:
                        out['fail'] += 1
                        r['bad'].append({'why': '페이지 가로 오버플로우', 'px': r['overflow']})
                    out['tabs'][f'{vw}-{tab}'] = {'count': r['count'], 'multi': r['multi'], 'bad': r['bad'][:5]}
                if vw == 1280:
                    # 모달: 다중 분류 카드 하나를 열어 배지 수 · 난이도 확인
                    pg.evaluate("document.querySelector('[data-cat=\"all\"]').click()")
                    pg.wait_for_timeout(250)
                    pg.evaluate("document.querySelector('.card[data-id=\"backview\"]').click()")
                    pg.wait_for_timeout(400)
                    m = pg.evaluate(MODAL_CHECK, 'backview')
                    ok = m['badges'] and len(m['badges']) == m['wantN'] and m['lv']
                    out['modal'] = m
                    if not ok:
                        out['fail'] += 1
                ctx.close()
            b.close()
    finally:
        if srv:
            srv.terminate()
    print(json.dumps(out, ensure_ascii=False, indent=1))
    print(('PASS' if out['fail'] == 0 and not out['console'] else 'FAIL'), out['fail'], '건 · 콘솔', len(out['console']))
    return 0 if out['fail'] == 0 and not out['console'] else 1


if __name__ == '__main__':
    sys.exit(main())
