/* 인생이라는 필름 — 앱 로직 */
(function () {
  'use strict';

  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const LEVEL_TXT = { 1: '쉬움', 2: '보통', 3: '고급' };
  const CAT_LABEL = Object.fromEntries(CATS.map(c => [c.id, c.label]));

  const store = {
    get(k, fb) {
      try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : fb; } catch (e) { return fb; }
    },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }
  };

  let state = {
    cat: 'all', q: '', level: 'all', lens: 'all',
    favOnly: false,
    favs: new Set(store.get('lifefilm:favs', [])),
    filtered: [],
    modalCard: null,
    after: false,
    grid: false
  };

  /* ── 초기 렌더 ───────────────────────── */
  function renderChips() {
    const wrap = $('#catChips');
    wrap.innerHTML = CATS.map(c => {
      const n = c.id === 'all' ? CARDS.length : CARDS.filter(x => x.cat.includes(c.id)).length;
      return `<button type="button" class="chip" role="tab" data-cat="${c.id}" aria-selected="${c.id === state.cat}">${c.label}<span class="n">${n}</span></button>`;
    }).join('');
    wrap.addEventListener('click', e => {
      const b = e.target.closest('.chip'); if (!b) return;
      state.cat = b.dataset.cat;
      $$('.chip', wrap).forEach(x => x.setAttribute('aria-selected', String(x === b)));
      renderGrid();
    });
  }

  function renderLens() {
    const items = [['all', '전체'], ['0.5x', '0.5x 초광각'], ['1x', '1x 기본'], ['3x', '2~3x 망원']];
    const wrap = $('#lensFilter');
    wrap.innerHTML = items.map(([v, l]) => `<button type="button" data-lens="${v}" aria-pressed="${v === state.lens}">${l}</button>`).join('');
    wrap.addEventListener('click', e => {
      const b = e.target.closest('button'); if (!b) return;
      state.lens = b.dataset.lens;
      $$('button', wrap).forEach(x => x.setAttribute('aria-pressed', String(x === b)));
      renderGrid();
    });
  }

  function svgFor(card, opts) {
    const fn = DIAGRAMS[card.diagram];
    const inner = fn ? fn(opts || {}) : '';
    const g = (opts && opts.grid) ? grid() : '';
    return `<svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" role="img" aria-label="${escapeAttr(card.title)} 촬영 구도 예시">${inner}${g}</svg>`;
  }
  function escapeAttr(s) { return String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;'); }

  function levelDots(n) {
    return `<span class="lvl" title="${LEVEL_TXT[n]}">${[1, 2, 3].map(i => `<i class="${i <= n ? 'on' : ''}"></i>`).join('')}<em style="font-style:normal;margin-left:4px;font-size:10.5px">${LEVEL_TXT[n]}</em></span>`;
  }

  function renderGrid() {
    const q = state.q.trim().toLowerCase();
    let list = CARDS.filter(c => {
      if (state.cat !== 'all' && !c.cat.includes(state.cat)) return false;
      if (state.level !== 'all' && String(c.level) !== state.level) return false;
      if (state.lens !== 'all') {
        if (state.lens === '3x') { if (!c.lens.includes('3x') && !c.lens.includes('2x')) return false; }
        else if (!c.lens.includes(state.lens)) return false;
      }
      if (state.favOnly && !state.favs.has(c.id)) return false;
      if (q) {
        const hay = [c.title, c.tagline, c.principle, c.keywords, (c.steps || []).join(' '), c.cat.map(x => CAT_LABEL[x]).join(' ')].join(' ').toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
    state.filtered = list;

    const grid = $('#grid');
    grid.innerHTML = list.map(c => `
      <article class="card" tabindex="0" role="button" data-id="${c.id}" aria-label="${escapeAttr(c.title)} — ${escapeAttr(c.tagline)}">
        <div class="card__thumb">
          ${svgFor(c, { after: true, grid: false })}
          <button type="button" class="card__fav" data-fav="${c.id}" aria-pressed="${state.favs.has(c.id)}" aria-label="스크랩">${state.favs.has(c.id) ? '★' : '☆'}</button>
        </div>
        <div class="card__body">
          <div class="card__meta">
            <span class="tag">${CAT_LABEL[c.cat[0]]}</span>
            <span class="lens">${c.lens.join(' · ')}</span>
            ${levelDots(c.level)}
          </div>
          <h3>${c.title}</h3>
          <p>${c.tagline}</p>
          <span class="card__go">뷰파인더로 보기 →</span>
        </div>
      </article>`).join('');

    $('#empty').hidden = list.length > 0;
    $('#resultCount').innerHTML = `<b>${list.length}</b> / ${CARDS.length}개 카드`;
    $('#statCards').textContent = CARDS.length;
  }

  function toggleFav(id) {
    if (state.favs.has(id)) state.favs.delete(id); else state.favs.add(id);
    store.set('lifefilm:favs', Array.from(state.favs));
    $$(`[data-fav="${id}"]`).forEach(b => {
      const on = state.favs.has(id);
      b.setAttribute('aria-pressed', String(on));
      b.textContent = on ? '★' : '☆';
    });
    const mf = $('#mFav');
    if (mf && state.modalCard && state.modalCard.id === id) {
      mf.setAttribute('aria-pressed', String(state.favs.has(id)));
      mf.textContent = state.favs.has(id) ? '★ 스크랩됨' : '★ 스크랩';
    }
    if (state.favOnly) renderGrid();
  }

  /* ── 모달 ────────────────────────────── */
  let lastFocus = null;

  function openModal(card) {
    if (!card) return;
    lastFocus = document.activeElement;
    state.modalCard = card;
    state.after = false;
    state.grid = false;
    $('#modal').hidden = false;
    document.body.style.overflow = 'hidden';

    $('#mCat').textContent = card.cat.map(c => CAT_LABEL[c]).join(' · ') + '  ·  ' + LEVEL_TXT[card.level];
    $('#mTitle').textContent = card.title;
    $('#mPrinciple').textContent = card.principle;
    $('#mBadges').innerHTML = card.badges.map(b => `<span class="mbadge"><b>${b.k}</b>${b.v}</span>`).join('');
    $('#mSteps').innerHTML = card.steps.map(s => `<li>${s}</li>`).join('');
    $('#mFails').innerHTML = card.fails.map(s => `<li>${s}</li>`).join('');
    $('#mSources').innerHTML = card.sources.map(s => `<li><a href="${s.u}" target="_blank" rel="noopener noreferrer">${s.t}</a><span class="v">${s.v}</span></li>`).join('');

    const saved = store.get('lifefilm:check:' + card.id, []);
    $('#mChecks').innerHTML = card.checks.map((c, i) => `
      <li><label><input type="checkbox" data-check="${i}" ${saved.includes(i) ? 'checked' : ''}/><span>${c}</span></label></li>`).join('');

    $('#mFav').setAttribute('aria-pressed', String(state.favs.has(card.id)));
    $('#mFav').textContent = state.favs.has(card.id) ? '★ 스크랩됨' : '★ 스크랩';

    renderRelated(card);
    updateViewer();
    updateProgress();
    $('#mGrid').setAttribute('aria-pressed', 'false');
    $('#mGrid').querySelector('span').textContent = 'OFF';
    $('#mBefore').classList.add('on');
    $('#mAfter').classList.remove('on');

    const idx = state.filtered.findIndex(c => c.id === card.id);
    $('#mPrev').disabled = idx <= 0;
    $('#mNext').disabled = idx < 0 || idx >= state.filtered.length - 1;
    $('#mPrev').style.opacity = idx <= 0 ? .4 : 1;
    $('#mNext').style.opacity = (idx < 0 || idx >= state.filtered.length - 1) ? .4 : 1;

    $('#modalPanelScroll') // noop guard
    $('#modal .modal__panel').scrollTop = 0;
    setTimeout(() => $('#modalClose').focus(), 30);
  }

  function updateViewer() {
    const c = state.modalCard; if (!c) return;
    $('#mStage').innerHTML = svgFor(c, { after: state.after, grid: state.grid });
    $('#mHint').textContent = c.diagram === 'crop'
      ? '점선 위치를 비교해 보세요. 관절이 아니라 그 사이에서 잘라야 자연스럽습니다.'
      : '두 상태를 번갈아 눌러 무엇이 달라지는지 비교해 보세요.';
  }

  function renderRelated(card) {
    const rel = CARDS.filter(c => c.id !== card.id && c.cat.some(x => card.cat.includes(x))).slice(0, 3);
    $('#mRelated').innerHTML = rel.map(c => `
      <button type="button" data-rel="${c.id}" aria-label="관련 카드: ${escapeAttr(c.title)}">
        ${svgFor(c, { after: true, grid: false })}<span>${c.title}</span>
      </button>`).join('');
  }

  function updateProgress() {
    if (!state.modalCard) return;
    const boxes = $$('#mChecks input');
    const done = boxes.filter(b => b.checked).length;
    $('#mProgressN').textContent = done;
    $('#mProgressT').textContent = boxes.length;
    $('#mProgressBar').style.width = boxes.length ? (done / boxes.length * 100) + '%' : '0%';
  }

  function closeModal() {
    if ($('#modal').hidden) return;
    $('#modal').hidden = true;
    document.body.style.overflow = '';
    state.modalCard = null;
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }

  function step(dir) {
    const i = state.filtered.findIndex(c => c.id === state.modalCard?.id);
    const n = i + dir;
    if (i < 0 || n < 0 || n >= state.filtered.length) return;
    openModal(state.filtered[n]);
  }

  /* ── 히어로 필름 스트립 · 출처 표 ─────── */
  function renderHero() {
    const picks = ['selfie-height', 'horizon', 'puddle'].map(id => CARDS.find(c => c.id === id)).filter(Boolean);
    $('#heroFrames').innerHTML = picks.map(c => `<div class="frame">${svgFor(c, { after: true, grid: false })}</div>`).join('');
  }

  const LINK_ROWS = [
    ['1', 'https://www.instagram.com/p/DfzggHxoyAu/', '인스타 포스트', 'ok', '확인(캡션)', '@elanvital7 — 스마트폰 사진 구도와 빛 20가지'],
    ['2', 'https://www.instagram.com/p/DfMauevk2hA/', '인스타 포스트', 'ok', '확인(캡션)', '@ukwanghyun — 가을사진 예쁘게 담는 7가지'],
    ['3', 'https://www.threads.com/@donggi_photo/post/DcEI27WGK-I', '스레드', 'ok', '확인(본문)', '@donggi_photo — 물웅덩이 반영샷 5단계'],
    ['4', 'https://www.instagram.com/reels/DV2MPnaCO4V/', '인스타 릴스', 'part', '부분 확인', '@clos_click — 영상 프레임에서 접사·프로모드 데모만 확인'],
    ['5', 'https://www.instagram.com/p/DWtzbX6iU-M/', '인스타 포스트', 'ok', '확인(캡션)', '@_23iii_ — 프로모드 벚꽃 색감(대비 -10 등)'],
    ['6', 'https://www.threads.com/@pure.moood/post/DTScY4RE0am', '스레드', 'no', '접근 제한', '일부 사용자만 볼 수 있는 콘텐츠 — 내용 미확인·미수록'],
    ['7', 'https://www.instagram.com/reels/DN9gtSIE1s6/', '인스타 릴스', 'ok', '확인(캡션)', '@junnywhere — 비 오는 날 3배 망원, 1/50 vs 1/350'],
    ['8', 'https://www.instagram.com/reels/DHL1L9fzqQG/', '인스타 릴스', 'ok', '확인(캡션)', '@photofreak_guy — 노을 ISO100·1/1600·WB8000'],
    ['9', 'https://www.youtube.com/watch?v=sUyBdFgieQc', '유튜브', 'ok', '확인(영상)', '미드나잇 — 갤럭시 은하수 ISO3200·15초·수동초점'],
    ['10', 'https://www.instagram.com/reels/DNKvPAozU3Y/', '인스타 릴스', 'ok', '확인(캡션)', '@junnywhere — 불꽃놀이 ND16·ISO50·2초'],
    ['11', 'https://www.instagram.com/reels/DIlyf8nzr4x/', '인스타 릴스', 'ok', '확인(캡션)', '@junnywhere — 인물사진 모드 3배·블러 -5'],
    ['12', 'https://www.instagram.com/reels/DIa01BlO4sX/', '인스타 릴스', 'part', '부분 확인', '@kfconcept — 차량 라이트 트레일 주제만 확인'],
    ['13', 'https://www.instagram.com/reels/DMh8FpuTJDS/', '인스타 릴스', 'ok', '확인(캡션)', '@junnywhere — Expert RAW 천체사진, 시간 길게']
  ];

  function renderSources() {
    const badge = { ok: 'badge--ok', part: 'badge--part', no: 'badge--no' };
    $('#sourceTable').innerHTML = LINK_ROWS.map(r => `
      <tr><td>${r[0]}</td>
      <td><a href="${r[1]}" target="_blank" rel="noopener noreferrer">${r[1].replace('https://www.', '').slice(0, 46)}${r[1].length > 54 ? '…' : ''}</a></td>
      <td>${r[2]}</td>
      <td><span class="badge ${badge[r[3]]}">${r[4]}</span></td>
      <td>${r[5]}</td></tr>`).join('');
  }

  /* ── 이벤트 ──────────────────────────── */
  function bind() {
    const search = $('#searchInput');
    search.addEventListener('input', () => {
      state.q = search.value;
      $('#searchClear').hidden = !search.value;
      renderGrid();
    });
    $('#searchClear').addEventListener('click', () => {
      search.value = ''; state.q = ''; $('#searchClear').hidden = true; renderGrid(); search.focus();
    });

    $('#favFilter').addEventListener('click', e => {
      state.favOnly = !state.favOnly;
      e.currentTarget.setAttribute('aria-pressed', String(state.favOnly));
      renderGrid();
    });

    $('#levelSelect').addEventListener('change', e => { state.level = e.target.value; renderGrid(); });

    $('#resetBtn').addEventListener('click', () => {
      state.cat = 'all'; state.q = ''; state.level = 'all'; state.lens = 'all'; state.favOnly = false;
      $('#searchInput').value = ''; $('#searchClear').hidden = true;
      $('#levelSelect').value = 'all';
      $('#favFilter').setAttribute('aria-pressed', 'false');
      $$('.chip').forEach(c => c.setAttribute('aria-selected', String(c.dataset.cat === 'all')));
      $$('#lensFilter button').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.lens === 'all')));
      renderGrid();
      $('#cards').scrollIntoView({ behavior: 'smooth', block: 'start' });
    });

    $('#randomBtn').addEventListener('click', () => {
      const pool = state.filtered.length ? state.filtered : CARDS;
      openModal(pool[Math.floor(Math.random() * pool.length)]);
    });

    const grid = $('#grid');
    grid.addEventListener('click', e => {
      const fav = e.target.closest('.card__fav');
      if (fav) { e.stopPropagation(); toggleFav(fav.dataset.fav); return; }
      const card = e.target.closest('.card');
      if (card) openModal(CARDS.find(c => c.id === card.dataset.id));
    });
    grid.addEventListener('keydown', e => {
      if (e.key !== 'Enter' && e.key !== ' ') return;
      if (e.target.closest('.card__fav')) return;
      const card = e.target.closest('.card');
      if (card) { e.preventDefault(); openModal(CARDS.find(c => c.id === card.dataset.id)); }
    });

    $('#modalClose').addEventListener('click', closeModal);
    $('#modal').addEventListener('click', e => { if (e.target.dataset.close) closeModal(); });

    $('#mBefore').addEventListener('click', () => {
      state.after = false;
      $('#mBefore').classList.add('on'); $('#mAfter').classList.remove('on'); updateViewer();
    });
    $('#mAfter').addEventListener('click', () => {
      state.after = true;
      $('#mAfter').classList.add('on'); $('#mBefore').classList.remove('on'); updateViewer();
    });
    $('#mGrid').addEventListener('click', () => {
      state.grid = !state.grid;
      $('#mGrid').setAttribute('aria-pressed', String(state.grid));
      $('#mGrid').querySelector('span').textContent = state.grid ? 'ON' : 'OFF';
      updateViewer();
    });

    $('#mChecks').addEventListener('change', e => {
      if (!e.target.matches('input[type="checkbox"]') || !state.modalCard) return;
      const boxes = $$('#mChecks input');
      const checked = boxes.map((b, i) => b.checked ? i : -1).filter(i => i >= 0);
      store.set('lifefilm:check:' + state.modalCard.id, checked);
      updateProgress();
    });

    $('#mFav').addEventListener('click', () => { if (state.modalCard) toggleFav(state.modalCard.id); });
    $('#mRelated').addEventListener('click', e => {
      const b = e.target.closest('[data-rel]');
      if (b) openModal(CARDS.find(c => c.id === b.dataset.rel));
    });
    $('#mPrev').addEventListener('click', () => step(-1));
    $('#mNext').addEventListener('click', () => step(1));

    document.addEventListener('keydown', e => {
      if ($('#modal').hidden) return;
      if (e.key === 'Escape') closeModal();
      if (e.key === 'ArrowLeft') { e.preventDefault(); step(-1); }
      if (e.key === 'ArrowRight') { e.preventDefault(); step(1); }
    });
  }

  /* ── 시작 ────────────────────────────── */
  function syncHeaderHeight() {
    const h = document.querySelector('.topbar');
    if (h) document.documentElement.style.setProperty('--headerH', h.offsetHeight + 'px');
  }
  syncHeaderHeight();
  window.addEventListener('resize', syncHeaderHeight);

  renderChips();
  renderLens();
  renderHero();
  renderSources();
  renderGrid();
  bind();
})();
