/* 인생이라는 필름 — 앱 로직 (실사 사진 + 뷰파인더 HUD) */
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
    after: true,
    grid: true
  };

  /* ── 사진 · 뷰파인더 ─────────────────── */
  const CAT_ORDER = Object.fromEntries(CATS.map((c, i) => [c.id, i]));
  CARDS.sort((a, b) => (CAT_ORDER[a.cat[0]] ?? 99) - (CAT_ORDER[b.cat[0]] ?? 99));
  function mediaFor(card) {
    return MEDIA[card.id] || { photo: 'horizon-sea', pos: '50% 50%', exif: ['35mm', 'f/2.8', 'ISO 100', '1/250s', 'EV 0', 'WB 5500K'], before: { t: 'none', f: 'none', tone: 'none', warn: 'none', note: '' }, after: { note: '', focus: [50, 50], guides: ['thirds'] } };
  }
  function photoFor(card) {
    const m = mediaFor(card);
    return PHOTOS[m.photo] || PHOTOS['horizon-sea'];
  }
  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;'); }

  const CORNERS = ['tl', 'tr', 'bl', 'br'].map(c => `<span class="hud__corner hud__corner--${c}"></span>`).join('');
  const THIRDS_SVG = `<svg class="hud__thirds" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
      <g fill="none" stroke="rgba(255,255,255,.62)" stroke-width=".75" vector-effect="non-scaling-stroke">
        <path d="M33.333 0V100M66.667 0V100M0 33.333H100M0 66.667H100"/></g></svg>`;
  const DOTS = [[33.333, 33.333], [66.667, 33.333], [33.333, 66.667], [66.667, 66.667]]
    .map(([x, y]) => `<span class="hud__dot" style="left:${x}%;top:${y}%"></span>`).join('');

  /* 카드 썸네일용 사진 */
  function thumbHTML(card, cls) {
    const m = mediaFor(card), p = photoFor(card);
    return `<span class="thumb ${cls || ''}">
      <img class="thumb__img" src="${p.src}" width="${p.w}" height="${p.h}" alt="" loading="lazy" decoding="async" style="object-position:${m.pos}">
      <span class="thumb__grid" aria-hidden="true"></span>
      ${CORNERS}
    </span>`;
  }

  /* 모달 뷰파인더 스테이지 */
  function shotHTML(card, isAfter) {
    const m = mediaFor(card), p = photoFor(card);
    const b = m.before, a = m.after;
    const t = isAfter ? 'none' : (b.t || 'none');
    const f = isAfter ? 'saturate(1.07) contrast(1.05) brightness(1.01)' : (b.f || 'none');
    const tone = isAfter ? 'none' : (b.tone || 'none');
    const [ex, ap, iso, sh, ev, wb] = m.exif;

    const levelDeg = (() => {
      const mm = /rotate\((-?[\d.]+)deg\)/.exec(b.t || '');
      if (mm) return parseFloat(mm[1]);
      return -4.2;
    })();
    const levelY = a.focus ? a.focus[1] : 50;

    let guides = '';
    if (state.grid) guides += THIRDS_SVG;
    if (isAfter && (a.guides || []).indexOf('dots') >= 0) guides += DOTS;
    if (!isAfter && b.warn === 'center') guides += `<span class="hud__center"></span>`;
    if (!isAfter && b.warn === 'crop') guides += `<span class="hud__crop"></span>`;
    if (!isAfter && b.warn === 'level') guides += `<span class="hud__warnline" style="transform:translate(-50%,-50%) rotate(${levelDeg}deg)"><b>${levelDeg.toFixed(1)}°</b></span>`;
    if (isAfter && (a.guides || []).indexOf('level') >= 0) guides += `<span class="hud__level" style="top:${levelY}%"><b>0.0°</b></span>`;
    if (isAfter) guides += `<span class="hud__focus" style="left:${a.focus[0]}%;top:${a.focus[1]}%"></span>`;

    return `<div class="shot ${isAfter ? 'shot--after' : 'shot--before'}">
      <img class="shot__img" src="${p.src}" width="${p.w}" height="${p.h}" alt="${esc(p.alt)}"
           decoding="async" style="object-position:${m.pos};transform:${t};filter:${f}">
      <span class="shot__tone tone--${tone}"></span>
      <span class="shot__vign"></span>
      <span class="shot__grain"></span>
      <div class="hud">
        ${CORNERS}${guides}
        <span class="hud__chip hud__chip--state">${isAfter ? 'AFTER · 인생샷' : 'BEFORE · 아쉬운 예'}</span>
        <span class="hud__chip hud__chip--lens">${ex} · ${ap}</span>
        <span class="hud__chip hud__chip--iso">${iso} · ${sh}</span>
        <span class="hud__chip hud__chip--ev">${ev} · ${wb}</span>
        <span class="hud__note">${esc(isAfter ? a.note : b.note)}</span>
      </div>
    </div>`;
  }

  /* ── 필터 UI ─────────────────────────── */
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

  function levelDots(n) {
    return `<span class="lvl" title="${LEVEL_TXT[n]}">${[1, 2, 3].map(i => `<i class="${i <= n ? 'on' : ''}"></i>`).join('')}<em>${LEVEL_TXT[n]}</em></span>`;
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
    grid.innerHTML = list.map(c => {
      const m = mediaFor(c);
      return `
      <article class="card" tabindex="0" role="button" data-id="${c.id}" aria-label="${esc(c.title)} — ${esc(c.tagline)}">
        <div class="card__thumb">
          ${thumbHTML(c)}
          <span class="card__lens">${m.exif[0]} · ${m.exif[3]}</span>
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
      </article>`;
    }).join('');

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
    state.after = true;
    state.grid = true;
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

    renderRelatedPlaceholder();
    syncToggle();
    updateViewer();
    updateProgress();

    const idx = state.filtered.findIndex(c => c.id === card.id);
    $('#mPrev').disabled = idx <= 0;
    $('#mNext').disabled = idx < 0 || idx >= state.filtered.length - 1;
    $('#mPrev').style.opacity = idx <= 0 ? .4 : 1;
    $('#mNext').style.opacity = (idx < 0 || idx >= state.filtered.length - 1) ? .4 : 1;

    $('#modal .modal__panel').scrollTop = 0;
    setTimeout(() => $('#modalClose').focus(), 30);
  }

  function syncToggle() {
    $('#mAfter').classList.toggle('on', state.after);
    $('#mBefore').classList.toggle('on', !state.after);
    $('#mGrid').setAttribute('aria-pressed', String(state.grid));
    $('#mGrid').querySelector('span').textContent = state.grid ? 'ON' : 'OFF';
  }

  function updateViewer() {
    const c = state.modalCard; if (!c) return;
    const stage = $('#mStage');
    stage.innerHTML = shotHTML(c, state.after);
    syncToggle();
    const m = mediaFor(c);
    $('#mHint').textContent = state.after
      ? `교정 후 · ${m.after.note}`
      : `흔한 실패 · ${m.before.note}`;
  }

  function renderRelatedPlaceholder() { /* 관련 카드 추천 영역은 레이아웃 정리로 제거했습니다. */ }

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

  /* ── 히어로 필름 스트립 ───────────────── */
  const HERO_FRAMES = [
    { photo: 'traveler-viewpoint', pos: '62% 50%', no: '16', cap: '35mm · 1/500s' },
    { photo: 'sunset-silhouette', pos: '55% 62%', no: '23', cap: '50mm · 1/1600s' },
    { photo: 'night-city', pos: '50% 46%', no: '31', cap: '24mm · 1/4s' }
  ];

  function renderHero() {
    $('#heroFrames').innerHTML = HERO_FRAMES.map(f => {
      const p = PHOTOS[f.photo];
      return `<div class="frame">
        <img src="${p.src}" width="${p.w}" height="${p.h}" alt="" style="object-position:${f.pos}" fetchpriority="high" decoding="async">
        <span class="frame__no">${f.no}</span>
        <span class="frame__cap">${f.cap}</span>
      </div>`;
    }).join('');
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

    $('#mBefore').addEventListener('click', () => { state.after = false; updateViewer(); });
    $('#mAfter').addEventListener('click', () => { state.after = true; updateViewer(); });
    $('#mGrid').addEventListener('click', () => {
      state.grid = !state.grid;
      syncToggle();
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
