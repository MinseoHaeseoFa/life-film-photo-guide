/* 인생이라는 필름 — SVG 뷰파인더 다이어그램
   외부 이미지 없이 전부 코드로 그립니다. 카드 썸네일과 모달의 Before/After 가 같은 함수를 씁니다. */

let SEQ = 0;
const uid = () => 'g' + (++SEQ);

const C = {
  ink: '#2a2621', ink2: '#4a4540', amber: '#d99a4e', gold: '#e8b96a',
  skyTop: '#e9e3d4', skyBot: '#cfdad5', sun: '#f0bd72',
  hillFar: '#b7bfae', hillNear: '#8d9884', ground: '#d8c8a6', ground2: '#c2ae88',
  tree: '#6d7c62', nightTop: '#0d1320', nightBot: '#1c2434', city: '#18202e',
  city2: '#232d3f', light: '#f2c777', face: '#e3c6a4', white: '#ffffff'
};

function sky(id, top = C.skyTop, bot = C.skyBot) {
  return `<defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="${top}"/><stop offset="1" stop-color="${bot}"/></linearGradient></defs>
    <rect width="400" height="300" fill="url(#${id})"/>`;
}
function nightSky(id) {
  return `<defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="${C.nightTop}"/><stop offset="1" stop-color="${C.nightBot}"/></linearGradient></defs>
    <rect width="400" height="300" fill="url(#${id})"/>`;
}
function hill(y, fill, opacity = 1) {
  return `<path d="M0 ${y} Q70 ${y - 34} 140 ${y} T280 ${y - 10} T400 ${y + 6} L400 300 L0 300 Z" fill="${fill}" opacity="${opacity}"/>`;
}
function sun(x, y, r) {
  return `<circle cx="${x}" cy="${y}" r="${r}" fill="${C.sun}" opacity=".95"/>
  <circle cx="${x}" cy="${y}" r="${r * 2.4}" fill="${C.sun}" opacity=".18"/>`;
}
function tree(x, y, s = 1, fill = C.tree) {
  return `<g fill="${fill}" transform="translate(${x} ${y}) scale(${s})">
    <rect x="-2" y="-16" width="4" height="18" fill="#6b5a44"/>
    <ellipse cx="0" cy="-30" rx="17" ry="20"/><ellipse cx="-10" cy="-18" rx="12" ry="13"/><ellipse cx="11" cy="-19" rx="12" ry="13"/></g>`;
}
function person(x, y, s = 1, o = {}) {
  const col = o.color || C.ink;
  const headY = y - 46 * s;
  const spread = o.spread ?? 7;
  const aL = { down: `M${x} ${y - 36 * s} L${x - 8 * s} ${y - 20 * s}`, up: `M${x} ${y - 36 * s} L${x - 13 * s} ${y - 54 * s}`, out: `M${x} ${y - 36 * s} L${x - 18 * s} ${y - 28 * s}`, collar: `M${x} ${y - 36 * s} Q${x - 9 * s} ${y - 41 * s} ${x - 3 * s} ${y - 47 * s}`, pocket: `M${x} ${y - 36 * s} L${x - 10 * s} ${y - 24 * s} L${x - 7 * s} ${y - 15 * s}`, back: `M${x} ${y - 36 * s} L${x - 12 * s} ${y - 34 * s} L${x - 10 * s} ${y - 24 * s}` }[o.armL || 'down'];
  const aR = { down: `M${x} ${y - 36 * s} L${x + 8 * s} ${y - 20 * s}`, up: `M${x} ${y - 36 * s} L${x + 13 * s} ${y - 56 * s}`, out: `M${x} ${y - 36 * s} L${x + 19 * s} ${y - 26 * s}`, pocket: `M${x} ${y - 36 * s} L${x + 11 * s} ${y - 25 * s} L${x + 8 * s} ${y - 16 * s}`, swing: `M${x} ${y - 36 * s} L${x + 14 * s} ${y - 30 * s}` }[o.armR || 'down'];
  let legs = `<path d="M${x} ${y - 18 * s} L${x - spread * s} ${y}"/><path d="M${x} ${y - 18 * s} L${x + spread * s} ${y}"/>`;
  if (o.legs === 'walk') legs = `<path d="M${x} ${y - 18 * s} L${x - 14 * s} ${y}"/><path d="M${x} ${y - 18 * s} L${x + 15 * s} ${y - 3 * s}"/>`;
  if (o.legs === 'long') legs = `<path d="M${x} ${y - 18 * s} L${x - 6 * s} ${y} L${x - 12 * s} ${y}"/><path d="M${x} ${y - 18 * s} L${x + 7 * s} ${y} L${x + 13 * s} ${y}"/>`;
  return `<g stroke="${col}" stroke-width="${7 * s}" stroke-linecap="round" fill="none">
    <path d="${aL}"/><path d="${aR}"/><path d="M${x} ${y - 38 * s} L${x} ${y - 18 * s}"/>${legs}</g>
    <circle cx="${x}" cy="${headY}" r="${6.4 * s}" fill="${o.headFill || col}" stroke="none"/>`;
}
function bust(cx, cy, s = 1, o = {}) {
  const col = o.color || C.ink;
  const face = o.face || col;
  const rot = o.turn ? `rotate(${o.turn} ${cx} ${cy + 30 * s})` : '';
  const hair = o.hair === false ? '' : `<path d="M${cx - 27 * s} ${cy - 4 * s} Q${cx - 30 * s} ${cy - 34 * s} ${cx} ${cy - 33 * s} Q${cx + 30 * s} ${cy - 34 * s} ${cx + 27 * s} ${cy - 4 * s} Q${cx + 16 * s} ${cy - 20 * s} ${cx} ${cy - 19 * s} Q${cx - 16 * s} ${cy - 20 * s} ${cx - 27 * s} ${cy - 4 * s} Z" fill="${col}"/>`;
  return `<g ${rot ? `transform="${rot}"` : ''}>
    <path d="M${cx - 44 * s} ${cy + 78 * s} Q${cx - 40 * s} ${cy + 26 * s} ${cx} ${cy + 24 * s} Q${cx + 40 * s} ${cy + 26 * s} ${cx + 44 * s} ${cy + 78 * s} Z" fill="${col}"/>
    <rect x="${cx - 9 * s}" y="${cy + 14 * s}" width="${18 * s}" height="${16 * s}" fill="${face}"/>
    <ellipse cx="${cx}" cy="${cy}" rx="${22 * s}" ry="${26 * s}" fill="${face}"/>
    ${hair}
    ${o.eye === false ? '' : `<circle cx="${cx - 7 * s}" cy="${cy - 2 * s}" r="${1.9 * s}" fill="${C.ink2}"/><circle cx="${cx + 7 * s}" cy="${cy - 2 * s}" r="${1.9 * s}" fill="${C.ink2}"/>`}
  </g>`;
}
function phone(x, y, w = 16, h = 30, rot = 0, fill = '#1b1a18') {
  return `<g transform="rotate(${rot} ${x} ${y})"><rect x="${x - w / 2}" y="${y - h / 2}" width="${w}" height="${h}" rx="3" fill="${fill}"/>
  <circle cx="${x}" cy="${y - h / 2 + 5}" r="2.2" fill="#8fa4b8"/></g>`;
}
function grid() {
  const xs = [133, 267], ys = [100, 200];
  let dark = '', light = '';
  xs.forEach(x => {
    dark += `<line x1="${x}" y1="0" x2="${x}" y2="300"/>`;
    light += `<line x1="${x}" y1="0" x2="${x}" y2="300"/>`;
  });
  ys.forEach(y => {
    dark += `<line x1="0" y1="${y}" x2="400" y2="${y}"/>`;
    light += `<line x1="0" y1="${y}" x2="400" y2="${y}"/>`;
  });
  let dots = '';
  xs.forEach(x => ys.forEach(y => {
    dots += `<circle cx="${x}" cy="${y}" r="5" fill="rgba(20,18,16,.35)"/><circle cx="${x}" cy="${y}" r="3.6" fill="${C.gold}" stroke="#fff" stroke-width="1.4"/>`;
  }));
  return `<g fill="none" stroke-linecap="round">
    <g stroke="rgba(15,14,12,.32)" stroke-width="2.6">${dark}</g>
    <g stroke="#ffffff" stroke-opacity=".95" stroke-width="1.2" stroke-dasharray="6 5">${light}</g>
  </g>${dots}`;
}
function vignette() {
  return `<rect width="400" height="300" fill="none"/>`;
}
function label(x, y, t, size = 9, fill = 'rgba(20,18,16,.55)', anchor = 'start') {
  return `<text x="${x}" y="${y}" font-size="${size}" font-family="inherit" fill="${fill}" text-anchor="${anchor}">${t}</text>`;
}
function lensBar(active = 1, y = 276) {
  const xs = [150, 200, 250], names = ['0.5x', '1x', '3x'];
  let s = `<rect x="126" y="${y - 13}" width="148" height="24" rx="12" fill="rgba(15,14,12,.55)"/>`;
  names.forEach((n, i) => {
    const on = i === active;
    s += `<circle cx="${xs[i]}" cy="${y - 1}" r="${on ? 8 : 4}" fill="${on ? C.gold : 'rgba(255,255,255,.55)'}"/>
    ${on ? label(xs[i], y + 12, n, 7, 'rgba(0,0,0,0)', 'middle') : ''}`;
  });
  return s;
}

const DIAGRAMS = {
  /* 1. 격자·수평 */
  level(o) {
    const id = uid(), t = o.after ? 0 : -5;
    let s = sky(id);
    s += `<g transform="rotate(${t} 200 150)">${sun(300, 70, 16)}${hill(150, C.hillFar, .9)}${hill(178, C.hillNear, .95)}
      <rect x="0" y="188" width="400" height="112" fill="${C.ground}"/>
      <path d="M0 188 H400" stroke="#9a8f78" stroke-width="1.5"/>
      <path d="M0 214 Q120 200 240 216 T400 208 L400 300 L0 300 Z" fill="${C.ground2}" opacity=".55"/>
      ${tree(78, 196, .8)}${tree(330, 198, .55)}</g>`;
    s += `<rect x="150" y="18" width="100" height="12" rx="6" fill="rgba(20,18,16,.35)"/>
      <line x1="200" y1="18" x2="200" y2="30" stroke="#fff" stroke-opacity=".5"/>
      <circle cx="${o.after ? 200 : 222}" cy="24" r="4" fill="${o.after ? '#8fd0a2' : C.gold}"/>`;
    s += `<g transform="rotate(${t} 200 150)"><line x1="0" y1="188" x2="400" y2="188" stroke="${o.after ? '#8fd0a2' : '#e0a458'}" stroke-width="2" stroke-dasharray="10 6"/></g>`;
    return s;
  },

  /* 2. 렌즈 버튼 */
  zoom(o) {
    const id = uid();
    let s = sky(id);
    s += `${hill(168, C.hillFar, .85)}<rect x="0" y="196" width="400" height="104" fill="${C.ground}"/>
      <path d="M250 168 Q300 150 360 162" stroke="#6b5a44" stroke-width="4" fill="none"/>`;
    const bx = 322, by = 148, bs = o.after ? 1.9 : 0.7;
    s += `<g transform="translate(${bx} ${by}) scale(${bs})">
      <path d="M-16 2 L-27 -4 L-24 6 Z" fill="${C.ink2}"/>
      <ellipse cx="-2" cy="0" rx="14" ry="9" fill="${C.ink2}"/><circle cx="11" cy="-7" r="6" fill="${C.ink2}"/>
      <path d="M17 -7 l8 -3 l-1 6 z" fill="${C.amber}"/>
      <path d="M-8 -2 q7 5 14 0" stroke="#8d8578" stroke-width="1.4" fill="none"/>
      <circle cx="12.6" cy="-8.4" r="1.2" fill="#f4ead6"/></g>`;
    if (!o.after) {
      s += `<rect x="300" y="124" width="46" height="46" fill="none" stroke="#fff" stroke-opacity=".7" stroke-dasharray="4 3"/>
        ${label(288, 116, '작게 찍고 잘라내기', 8, 'rgba(20,18,16,.6)')}`;
    } else {
      s += `${label(262, 118, '3x 렌즈로 직접', 9, 'rgba(20,18,16,.62)')}`;
    }
    s += lensBar(o.after ? 2 : 0);
    return s;
  },

  /* 3. 노출 */
  exposure(o) {
    const id = uid();
    let s = sky(id, '#f4e6c8', '#e5d3ad');
    s += `${sun(300, 74, 24)}${hill(176, C.hillFar, .7)}<rect x="0" y="200" width="400" height="100" fill="${C.ground2}"/>`;
    s += person(150, 232, 1.15, { headFill: o.after ? C.face : C.ink, armL: 'down', armR: 'down' });
    if (o.after) {
      s += `<path d="M143 168 q7 -12 14 0" stroke="${C.gold}" stroke-width="2" fill="none" opacity=".9"/>`;
    } else {
      s += `<rect x="120" y="150" width="60" height="80" fill="#000" opacity=".18"/>`;
    }
    const hy = o.after ? 236 : 196;
    s += `<rect x="346" y="120" width="6" height="120" rx="3" fill="rgba(20,18,16,.3)"/>
      <circle cx="349" cy="${hy}" r="9" fill="${C.ink}" stroke="#fff" stroke-width="2"/>
      ${label(360, 112, '밝기', 8, 'rgba(20,18,16,.6)')}
      ${label(363, hy + 4, o.after ? '−0.7' : '0', 9, 'rgba(20,18,16,.75)')}`;
    return s;
  },

  /* 4. 타이머 */
  timer(o) {
    const id = uid();
    let s = nightSky(id);
    for (let i = 0; i < 26; i++) {
      const x = (i * 97) % 400, y = (i * 53) % 150;
      s += `<circle cx="${x}" cy="${y}" r="1.1" fill="#e8e2cf" opacity="${0.25 + (i % 3) * 0.2}"/>`;
    }
    s += `<g fill="${C.city}">`;
    [0, 60, 120, 190, 260, 320].forEach((x, i) => {
      const h = 40 + (i % 3) * 22;
      s += `<rect x="${x}" y="${190 - h}" width="52" height="${h + 60}"/>`;
    });
    s += `</g>`;
    s += `<g fill="${C.light}" opacity=".75">`;
    for (let i = 0; i < 30; i++) s += `<rect x="${10 + (i * 37) % 380}" y="${150 + (i * 29) % 46}" width="3" height="3"/>`;
    s += `</g>`;
    s += `<rect x="0" y="248" width="400" height="8" fill="#2c3038"/><rect x="0" y="256" width="400" height="44" fill="#20242b"/>`;
    const px = 210, py = 234;
    if (!o.after) {
      s += phone(px - 7, py, 16, 30, -2) + phone(px + 7, py + 3, 16, 30, 2);
      s += `<path d="M${px - 24} ${py + 20} q10 6 20 0" stroke="rgba(255,255,255,.5)" stroke-width="1.5" fill="none" stroke-dasharray="3 3"/>
        ${label(236, 288, '손 떨림', 9, 'rgba(255,255,255,.7)')}`;
    } else {
      s += phone(px, py, 16, 30, 0);
      s += `<circle cx="${px}" cy="${py}" r="24" fill="none" stroke="${C.gold}" stroke-width="2" stroke-dasharray="113 150" transform="rotate(-90 ${px} ${py})"/>
        ${label(px, py + 4, '3', 14, C.gold, 'middle')}`;
      s += `<path d="M${px - 10} 260 l-8 26 M${px + 10} 260 l8 26" stroke="#3a4048" stroke-width="2.5"/>`;
    }
    return s;
  },

  /* 5. 색감 */
  grading(o) {
    const id = uid();
    let s = `<defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="${o.after ? '#f6e4cf' : '#e2e0d8'}"/><stop offset="1" stop-color="${o.after ? '#d9b98f' : '#c9c7bd'}"/></linearGradient></defs>
      <rect width="400" height="300" fill="url(#${id})"/>`;
    s += `<g opacity="${o.after ? 1 : .55}">`;
    s += `<path d="M60 300 Q90 190 130 160" stroke="${o.after ? '#7d8f5e' : '#8a8f7d'}" stroke-width="4" fill="none"/>`;
    const petal = o.after ? '#f2c2c6' : '#d9cfcb';
    const core = o.after ? '#e2a33c' : '#c0b7a6';
    for (let i = 0; i < 6; i++) {
      const a = (i * 60) * Math.PI / 180;
      s += `<ellipse cx="${130 + Math.cos(a) * 20}" cy="${150 + Math.sin(a) * 18}" rx="17" ry="12" fill="${petal}" transform="rotate(${i * 60} ${130 + Math.cos(a) * 20} ${150 + Math.sin(a) * 18})"/>`;
    }
    s += `<circle cx="130" cy="150" r="12" fill="${core}"/>`;
    for (let i = 0; i < 5; i++) {
      const a = (i * 72 + 20) * Math.PI / 180;
      s += `<ellipse cx="${200 + Math.cos(a) * 34}" cy="${170 + Math.sin(a) * 26}" rx="22" ry="15" fill="${petal}" opacity=".9" transform="rotate(${i * 40} ${200 + Math.cos(a) * 34} ${170 + Math.sin(a) * 26})"/>`;
    }
    s += `<circle cx="200" cy="170" r="14" fill="${core}"/>`;
    s += `</g>`;
    const vals = o.after ? [38, 62, 78, 55, 32] : [50, 50, 50, 50, 50];
    s += `<rect x="252" y="34" width="118" height="104" rx="10" fill="rgba(15,14,12,.55)"/>
      ${label(264, 50, 'PRO', 9, 'rgba(255,255,255,.75)')}`;
    ['대비', '하이라이트', '채도', '틴트', '그림자'].forEach((n, i) => {
      const x = 276 + i * 18;
      s += `<rect x="${x}" y="62" width="4" height="52" rx="2" fill="rgba(255,255,255,.25)"/>
        <rect x="${x}" y="${114 - vals[i] / 2}" width="4" height="${vals[i] / 2}" rx="2" fill="${C.gold}"/>
        <circle cx="${x + 2}" cy="${114 - vals[i] / 2}" r="4" fill="#fff"/>`;
    });
    return s;
  },

  /* 6. 셀카봉 높이 */
  selfie(o) {
    const id = uid();
    let s = sky(id);
    s += `${sun(74, 62, 15)}${hill(170, C.hillFar, .9)}<rect x="0" y="196" width="400" height="104" fill="${C.ground}"/>${tree(330, 206, .75)}`;
    const px = 196, py = 236;
    s += person(px, py, 1.05, { armR: 'up' });
    const top = o.after ? 118 : 196, topX = o.after ? 246 : 244;
    s += `<line x1="${px + 14}" y1="${py - 60}" x2="${topX}" y2="${top}" stroke="#4a4540" stroke-width="3"/>`;
    s += phone(topX, top - 16, 18, 32, o.after ? -12 : -34);
    if (o.after) {
      s += `<path d="M206 150 q-18 30 0 54" stroke="rgba(255,255,255,.75)" stroke-width="1.5" fill="none" stroke-dasharray="3 3"/>`;
      s += label(120, 112, '눈높이 + 한 뼘', 9, 'rgba(20,18,16,.6)');
    } else {
      s += label(120, 112, '가슴 높이', 9, 'rgba(20,18,16,.55)');
    }
    return s;
  },

  /* 7. 난간 고정 */
  place(o) {
    const id = uid();
    let s = sky(id);
    s += `${hill(164, C.hillFar, .85)}<rect x="0" y="192" width="400" height="108" fill="${C.ground2}"/>
      <path d="M0 214 Q120 202 250 218 T400 210" stroke="#b9a888" stroke-width="2" fill="none"/>`;
    s += `<rect x="0" y="150" width="400" height="7" rx="3" fill="#6f6a60"/><rect x="0" y="176" width="400" height="4" fill="#8b857a" opacity=".8"/>`;
    [40, 200, 360].forEach(x => { s += `<rect x="${x}" y="150" width="6" height="90" fill="#6f6a60"/>`; });
    const py = o.after ? 166 : 206;
    s += phone(120, py, 20, 34, o.after ? -3 : -16);
    s += person(280, 244, 1.0);
    if (o.after) {
      s += `<circle cx="120" cy="${py}" r="26" fill="none" stroke="${C.gold}" stroke-width="2" stroke-dasharray="90 160" transform="rotate(-90 120 ${py})"/>
        ${label(96, 128, '3초', 9, C.amber)}`;
    } else {
      s += label(86, 190, '낮고 기울어짐', 8, 'rgba(20,18,16,.55)');
    }
    return s;
  },

  /* 8. 자리 표시 */
  marker(o) {
    const id = uid();
    let s = sky(id);
    s += `${hill(160, C.hillFar, .8)}<rect x="0" y="190" width="400" height="110" fill="${C.ground}"/>
      <path d="M0 232 Q200 216 400 236" stroke="#bda98a" stroke-width="3" fill="none"/>
      ${tree(52, 208, .9)}${tree(360, 214, .7)}
      <path d="M0 196 H400" stroke="#bda98a" stroke-width="1.2" opacity=".5"/>`;
    const mx = 286, my = 236;
    if (!o.after) {
      s += `<rect x="${mx - 5}" y="${my - 34}" width="10" height="34" rx="3" fill="#9fb9c4" stroke="#6c8b98"/>
        <rect x="${mx - 3}" y="${my - 44}" width="6" height="10" rx="2" fill="#6c8b98"/>`;
      s += `<g stroke="${C.amber}" stroke-width="1.6" stroke-dasharray="5 4" fill="none">
        <circle cx="${mx}" cy="${my - 56}" r="8"/><path d="M${mx} ${my - 48} L${mx} ${my - 22} L${mx - 9} ${my} M${mx} ${my - 22} L${mx + 9} ${my} M${mx - 14} ${my - 40} L${mx + 14} ${my - 40}"/></g>`;
      s += label(214, 150, '물병으로 자리 확인', 9, 'rgba(20,18,16,.6)');
    } else {
      s += person(mx, my, 1.0, { armL: 'pocket', armR: 'down' });
      s += `<path d="M262 250 q24 6 48 0" stroke="#b9a888" stroke-width="2" fill="none" opacity=".7"/>`;
    }
    return s;
  },

  /* 9. 뒤태 */
  backview(o) {
    const id = uid();
    let s = sky(id, '#dfe6e3', '#f0e3ca');
    s += `${sun(310, 78, 14)}${hill(140, C.hillFar, .9)}${hill(172, C.hillNear, .95)}
      <rect x="0" y="196" width="400" height="104" fill="#9fb0a4"/>
      <path d="M0 226 Q200 214 400 230 L400 300 L0 300 Z" fill="#8499a0" opacity=".8"/>${tree(58, 200, .7)}`;
    if (o.after) {
      s += `<g transform="translate(120 236) scale(1.0)">
        <ellipse cx="0" cy="-28" rx="9" ry="11" fill="${C.ink}"/>
        <path d="M-11 -20 q11 -6 22 0 l4 22 q-15 5 -30 0 Z" fill="${C.ink}"/>
        <rect x="-9" y="-18" width="18" height="16" rx="4" fill="${C.ink2}"/>
        <path d="M-7 -8 L-9 0 M7 -8 L9 0" stroke="${C.ink}" stroke-width="4"/></g>`;
      s += label(150, 130, '풍경 2/3 · 나 1/3', 9, 'rgba(20,18,16,.6)');
      s += `<path d="M120 196 q0 -26 0 -44" stroke="${C.gold}" stroke-width="1.4" stroke-dasharray="3 3" fill="none"/>`;
    } else {
      s += person(200, 250, 1.5);
      s += label(140, 120, '풍경 가림', 9, 'rgba(20,18,16,.55)');
    }
    return s;
  },

  /* 10. 걷기 */
  walk(o) {
    const id = uid();
    let s = sky(id);
    s += `${hill(168, C.hillFar, .8)}<rect x="0" y="198" width="400" height="102" fill="${C.ground}"/>
      <path d="M0 240 H400" stroke="#b9a888" stroke-width="2"/>`;
    if (o.after) {
      s += person(196, 246, 1.25, { legs: 'walk', armL: 'out', armR: 'swing' });
      s += `<path d="M150 262 h26 M226 258 h26" stroke="rgba(90,80,64,.35)" stroke-width="2" stroke-dasharray="4 4"/>`;
      s += label(124, 132, '걷는 중간', 9, 'rgba(20,18,16,.6)');
    } else {
      s += person(200, 250, 1.25, { spread: 9 });
      s += label(140, 132, '멈춰 선 자세', 9, 'rgba(20,18,16,.55)');
    }
    return s;
  },

  /* 11. 초광각 셀카 */
  wide(o) {
    const id = uid();
    let s = sky(id);
    s += `${hill(150, C.hillFar, .9)}<rect x="0" y="190" width="400" height="110" fill="${C.ground}"/>
      <path d="M50 190 Q44 150 52 110" stroke="#6d7c62" stroke-width="4" fill="none"/>${tree(60, 112, .7)}
      <path d="M352 190 Q360 140 350 96" stroke="#6d7c62" stroke-width="4" fill="none"/>${tree(352, 98, .8)}`;
    if (o.after) {
      s += bust(200, 138, 1.05, { face: C.face });
      s += `<path d="M120 232 q80 22 160 0" stroke="#b9a888" stroke-width="2" fill="none"/>`;
      s += `<g stroke="rgba(255,255,255,.55)" stroke-width="1.4" fill="none">
        <path d="M8 40 Q2 150 8 262"/><path d="M392 40 Q398 150 392 262"/></g>`;
    } else {
      s += bust(66, 150, 1.45, { face: C.face });
      s += `<ellipse cx="66" cy="150" rx="42" ry="46" fill="none" stroke="${C.amber}" stroke-width="1.6" stroke-dasharray="5 4"/>`;
      s += label(96, 96, '가장자리 = 늘어남', 9, 'rgba(20,18,16,.65)');
    }
    return s;
  },

  /* 11-b. 인물과 배경의 비율 */
  ratio(o) {
    const id = uid();
    let s = sky(id, '#e9e2d1', '#d4ddd6');
    s += `${sun(316, 74, 15)}${hill(150, C.hillFar, .85)}${hill(184, C.hillNear, .9)}
      <rect x="0" y="204" width="400" height="96" fill="${C.ground}"/>
      <path d="M0 232 Q120 220 240 236 T400 228" stroke="#bda98a" stroke-width="2.4" fill="none"/>`;
    if (o.after) {
      s += `${tree(66, 214, .8)}${tree(340, 216, .6)}`;
      s += person(120, 262, .72, { armL: 'collar', armR: 'pocket' });
      s += `<path d="M0 100 H400" stroke="${C.gold}" stroke-width="1.2" stroke-dasharray="6 5" opacity=".85"/>`;
      s += label(152, 92, '배경 2/3', 9, 'rgba(20,18,16,.55)');
      s += label(94, 288, '나 1/3', 9, 'rgba(20,18,16,.55)');
      s += `<path d="M120 236 q0 -18 0 -34" stroke="${C.gold}" stroke-width="1.2" stroke-dasharray="3 3" fill="none"/>`;
    } else {
      s += person(200, 292, 1.55);
      s += label(146, 52, '인물만 크게 = 배경 사라짐', 9, 'rgba(20,18,16,.55)');
    }
    return s;
  },

  /* 12. 눈 위치 */
  eye(o) {
    const id = uid();
    let s = `<rect width="400" height="300" fill="#e7dfd0"/>`;
    s += `<rect x="0" y="188" width="400" height="112" fill="#cfc5b2"/>`;
    s += `<rect x="292" y="52" width="86" height="122" rx="4" fill="#f4ead4" stroke="#b9ad94"/>`;
    s += `<path d="M292 113 H378 M335 52 V174" stroke="#cfc4ad" stroke-width="2"/>`;
    const cx = o.after ? 140 : 200, cy = o.after ? 105 : 152;
    s += bust(cx, cy, 1.4, { face: C.face });
    if (!o.after) {
      s += `<path d="M0 150 H400" stroke="#9b8f79" stroke-width="1.6" stroke-dasharray="7 5"/>
        <circle cx="200" cy="150" r="3.4" fill="${C.amber}"/>`;
      s += label(244, 138, '얼굴 한가운데', 9, 'rgba(20,18,16,.55)');
    } else {
      s += `<circle cx="133" cy="103" r="9" fill="none" stroke="${C.gold}" stroke-width="2"/>
        <circle cx="133" cy="103" r="2.2" fill="${C.amber}"/>`;
      s += label(196, 92, '눈 = 교차점', 9, 'rgba(20,18,16,.62)');
    }
    return s;
  },

  /* 13. 손 */
  hands(o) {
    let s = `<rect width="400" height="300" fill="#ded6c6"/><rect x="0" y="210" width="400" height="90" fill="#c9bfa9"/>`;
    s += bust(200, 128, 1.55, { face: C.face });
    if (o.after) {
      s += `<path d="M212 214 Q236 196 244 172" stroke="${C.ink}" stroke-width="9" stroke-linecap="round" fill="none"/>
        <circle cx="245" cy="168" r="7" fill="${C.face}"/>
        <path d="M188 214 Q170 226 166 238" stroke="${C.ink}" stroke-width="9" stroke-linecap="round" fill="none"/>`;
      s += label(258, 128, '옷깃', 9, 'rgba(20,18,16,.55)');
      s += label(96, 244, '주머니', 9, 'rgba(20,18,16,.55)');
      s += `<rect x="150" y="228" width="34" height="8" rx="4" fill="${C.ink2}" opacity=".5"/>`;
    } else {
      s += `<path d="M182 214 L178 254 M218 214 L222 254" stroke="${C.ink}" stroke-width="9" stroke-linecap="round" fill="none"/>
        <circle cx="178" cy="258" r="7" fill="${C.face}"/><circle cx="222" cy="258" r="7" fill="${C.face}"/>`;
      s += label(120, 268, '양손이 몸에 붙어 굳음', 9, 'rgba(20,18,16,.55)');
    }
    return s;
  },

  /* 14. 몸 45도 */
  body(o) {
    let s = `<rect width="400" height="300" fill="#e3dbca"/><rect x="0" y="214" width="400" height="86" fill="#cfc4ac"/>`;
    if (o.after) {
      s += `<g transform="rotate(-14 200 150)">${bust(196, 118, 1.35, { face: C.face })}</g>`;
      s += `<path d="M170 254 L162 292 M206 254 L214 292" stroke="${C.ink}" stroke-width="8" stroke-linecap="round"/>`;
      s += `<circle cx="222" cy="270" r="10" fill="${C.ink}" opacity=".15"/>`;
      s += label(238, 96, '몸 45°', 9, 'rgba(20,18,16,.6)');
    } else {
      s += bust(200, 118, 1.35, { face: C.face });
      s += `<path d="M186 254 L186 292 M214 254 L214 292" stroke="${C.ink}" stroke-width="8" stroke-linecap="round"/>`;
      s += label(150, 90, '정면 = 증명사진', 9, 'rgba(20,18,16,.55)');
    }
    return s;
  },

  /* 15. 기대기 */
  lean(o) {
    let s = `<rect width="400" height="300" fill="#e0d8c8"/><rect x="0" y="230" width="400" height="70" fill="#c8bda6"/>`;
    s += `<rect x="286" y="0" width="114" height="300" fill="#cdc3ae"/>
      <path d="M286 0 V300" stroke="#a99d84" stroke-width="2"/>`;
    if (o.after) {
      s += `<g transform="rotate(10 240 200)">${person(236, 244, 1.2, { armR: 'out', armL: 'down' })}</g>`;
      s += `</g><circle cx="284" cy="196" r="5" fill="${C.face}"/>`;
      s += `<path d="M262 172 L284 196" stroke="${C.ink}" stroke-width="7" stroke-linecap="round"/>`;
      s += label(64, 96, '한쪽만 기대 사선', 9, 'rgba(20,18,16,.6)');
    } else {
      s += person(240, 244, 1.2);
      s += `<rect x="276" y="150" width="10" height="94" fill="${C.ink}" opacity=".25"/>`;
      s += label(64, 96, '등을 붙여 납작', 9, 'rgba(20,18,16,.55)');
    }
    return s;
  },

  /* 16. 프레임 속 프레임 */
  frame(o) {
    let s = `<rect width="400" height="300" fill="#d9d2c0"/>`;
    s += `<rect x="0" y="0" width="400" height="300" fill="#7d8a70"/>`;
    s += `<rect x="0" y="206" width="400" height="94" fill="#9aa47f"/>`;
    if (o.after) {
      s += `<rect x="104" y="34" width="192" height="238" fill="#e9e2d0"/>`;
      s += person(200, 258, 1.35, { armL: 'collar', armR: 'pocket' });
      s += `<g fill="#5c6a50"><rect x="0" y="0" width="104" height="300"/><rect x="296" y="0" width="104" height="300"/>
        <rect x="104" y="0" width="192" height="34"/></g>`;
      s += `<path d="M150 60 Q120 40 96 58 M250 60 Q282 38 306 56" stroke="#4f5c45" stroke-width="6" fill="none"/>`;
      s += label(120, 292, '문틀 = 액자', 9, 'rgba(255,255,255,.7)');
    } else {
      s += `<rect x="140" y="34" width="192" height="238" fill="#e9e2d0"/>`;
      s += person(268, 258, 1.35);
      s += `<g fill="#5c6a50"><rect x="0" y="0" width="140" height="300"/><rect x="332" y="0" width="68" height="300"/></g>`;
      s += label(28, 292, '액자 밖으로 나감', 9, 'rgba(255,255,255,.7)');
    }
    return s;
  },

  /* 17. 여백 */
  space(o) {
    const id = uid();
    let s = sky(id, '#efe6d2', '#dbe2dc');
    s += `${hill(196, C.hillFar, .55)}<rect x="0" y="228" width="400" height="72" fill="${C.ground}"/>`;
    s += `<path d="M0 238 Q200 226 400 244" stroke="#c0ad8c" stroke-width="3" fill="none"/>`;
    if (o.after) {
      s += bust(300, 146, 1.15, { face: C.face, turn: -10 });
      s += `<path d="M282 142 H150" stroke="${C.gold}" stroke-width="1.4" stroke-dasharray="4 5" fill="none"/>
        <path d="M156 136 l-8 6 l8 6" stroke="${C.gold}" stroke-width="1.6" fill="none"/>`;
      s += label(120, 112, '시선 쪽 = 여백', 9, 'rgba(20,18,16,.55)');
    } else {
      s += bust(300, 146, 1.15, { face: C.face, turn: 12 });
      s += `<path d="M318 142 H392" stroke="${C.amber}" stroke-width="1.4" stroke-dasharray="4 5"/>
        ${label(316, 112, '벽에 막힘', 9, 'rgba(20,18,16,.55)')}`;
    }
    return s;
  },

  /* 18. 로우앵글 */
  low(o) {
    const id = uid();
    let s = sky(id, '#e8e1cf', '#cdd8d2');
    s += `${hill(184, C.hillFar, .7)}<rect x="0" y="216" width="400" height="84" fill="${C.ground2}"/>`;
    if (o.after) {
      s += person(206, 268, 1.55, { legs: 'long' });
      s += phone(96, 258, 16, 30, -18);
      s += `<path d="M118 262 H176" stroke="${C.gold}" stroke-width="1.2" stroke-dasharray="4 4"/>`;
      s += label(150, 240, '허리 높이', 9, 'rgba(20,18,16,.6)');
      s += `<circle cx="206" cy="152" r="7" fill="${C.ink}"/>`;
    } else {
      s += `<g transform="translate(206 262) scale(1.55)"><circle cx="0" cy="-58" r="9" fill="${C.ink}"/>
        <path d="M0 -50 L0 -22" stroke="${C.ink}" stroke-width="7"/>
        <path d="M0 -22 L-6 -6 M0 -22 L6 -6" stroke="${C.ink}" stroke-width="7" stroke-linecap="round"/></g>`;
      s += phone(84, 96, 16, 30, 22);
      s += label(122, 78, '높은 각도 = 짧은 다리', 9, 'rgba(20,18,16,.55)');
    }
    return s;
  },

  /* 19. 크롭 */
  crop(o) {
    let s = `<rect width="400" height="300" fill="#e6dfd0"/><rect x="0" y="280" width="400" height="20" fill="#cfc4ad"/>`;
    s += person(200, 280, 2.0, { armL: 'out', armR: 'down' });
    if (o.after) {
      s += `<line x1="0" y1="250" x2="400" y2="250" stroke="#6f9c78" stroke-width="1.8" stroke-dasharray="8 5"/>`;
      s += `<rect x="0" y="0" width="400" height="250" fill="#6f9c78" opacity=".06"/>`;
      s += label(20, 28, '허벅지에서 자르기 = 자연스러움', 9, 'rgba(30,50,36,.7)');
      s += label(206, 246, '자르는 선', 9, 'rgba(30,50,36,.6)');
    } else {
      s += `<line x1="0" y1="262" x2="400" y2="262" stroke="#c2704f" stroke-width="1.8" stroke-dasharray="8 5"/>
        <line x1="0" y1="279" x2="400" y2="279" stroke="#c2704f" stroke-width="1.8" stroke-dasharray="8 5"/>`;
      s += label(20, 28, '무릎·발목에서 자르면 어색', 9, 'rgba(120,54,36,.75)');
      s += label(206, 258, '무릎', 9, 'rgba(120,54,36,.6)');
    }
    return s;
  },

  /* 20. 인물 모드 */
  bokeh(o) {
    let s = `<rect width="400" height="300" fill="${o.after ? '#cfc7b4' : '#d8d2c2'}"/>`;
    if (o.after) {
      ['#d9c9a8', '#c9d3c0', '#e2cba6', '#b9c6cf'].forEach((c, i) => {
        s += `<circle cx="${30 + i * 96}" cy="${60 + (i % 2) * 46}" r="${20 + i * 5}" fill="${c}" opacity=".55"/>`;
      });
      s += `<circle cx="120" cy="210" r="34" fill="#dccfae" opacity=".45"/><circle cx="320" cy="120" r="42" fill="#cbbfa4" opacity=".4"/>`;
    } else {
      s += `<g fill="none" stroke="#a99f8a" stroke-width="3">
        <rect x="18" y="40" width="70" height="90"/><rect x="290" y="30" width="86" height="70"/>
        <path d="M0 150 H400 M120 0 V300"/><path d="M180 60 l50 40 M230 60 l-50 40"/></g>`;
    }
    s += bust(200, 148, 1.5, { face: C.face });
    if (o.after) {
      s += `<rect x="286" y="244" width="96" height="18" rx="9" fill="rgba(15,14,12,.45)"/>
        ${label(292, 257, '블러 -5', 9, 'rgba(255,255,255,.85)')}`;
    } else {
      s += label(252, 282, '배경이 어수선', 9, 'rgba(20,18,16,.55)');
    }
    return s;
  },

  /* 21. 수평선 */
  horizon(o) {
    const id = uid();
    let s = sky(id, '#dfe7e6', '#f3e6cc');
    const hy = o.after ? 200 : 150;
    s += `${sun(318, o.after ? 84 : 96, 15)}`;
    s += `<rect x="0" y="${hy}" width="400" height="${300 - hy}" fill="#8fa6a4"/>`;
    s += `<path d="M0 ${hy} H400" stroke="#7b908f" stroke-width="2"/>`;
    s += `<path d="M0 ${hy + 26} q60 -8 120 0 T280 ${hy + 22} T400 ${hy + 26}" stroke="rgba(255,255,255,.5)" stroke-width="1.6" fill="none"/>`;
    s += o.after ? hill(hy, C.hillFar, .35) : '';
    s += label(20, o.after ? 188 : 140, o.after ? '하늘 2/3 · 땅 1/3' : '반반 = 어느 쪽도 주인공 아님', 9, 'rgba(20,18,16,.55)');
    return s;
  },

  /* 22. 리딩 라인 */
  leading(o) {
    const id = uid();
    let s = sky(id, '#e7e1d1', '#cdd9d2');
    s += `${hill(164, C.hillFar, .8)}<rect x="0" y="192" width="400" height="108" fill="#9aa77e"/>`;
    if (o.after) {
      s += `<path d="M-10 300 L180 200 L220 200 L410 300 Z" fill="#d7c7a4"/>
        <path d="M-10 300 L180 200 M410 300 L220 200" stroke="#b8a581" stroke-width="2" fill="none"/>
        ${person(200, 212, .72)}`;
      s += `<path d="M40 276 L188 210 M360 276 L212 210" stroke="${C.gold}" stroke-width="1.4" stroke-dasharray="5 5" fill="none"/>`;
      s += label(222, 130, '선이 주인공으로', 9, 'rgba(20,18,16,.6)');
    } else {
      s += `<path d="M0 300 L120 220 L60 210 L0 240 Z" fill="#d7c7a4"/>${person(300, 250, .9)}`;
      s += label(140, 130, '선이 화면 밖으로', 9, 'rgba(20,18,16,.55)');
    }
    return s;
  },

  /* 23. 대칭 */
  symmetry(o) {
    let s = `<rect width="400" height="300" fill="#dfe6e4"/>`;
    const t = o.after ? 0 : 4;
    s += `<g transform="rotate(${t} 200 150)">`;
    s += `<rect x="0" y="150" width="400" height="150" fill="#8fa5a3"/>
      <rect x="70" y="62" width="60" height="88" fill="#a89f8d"/><rect x="170" y="40" width="70" height="110" fill="#b7ad98"/>
      <rect x="270" y="72" width="56" height="78" fill="#a89f8d"/>
      <g fill="#6f6a5f">${[0, 1, 2, 3].map(i => `<rect x="${78 + i * 40}" y="${70 + (i % 2) * 10}" width="8" height="12"/>`).join('')}</g>`;
    s += `<g opacity=".45"><rect x="70" y="212" width="60" height="88" fill="#a89f8d"/><rect x="170" y="190" width="70" height="110" fill="#b7ad98"/><rect x="270" y="222" width="56" height="78" fill="#a89f8d"/></g>`;
    s += `<path d="M0 150 H400" stroke="#fff" stroke-opacity=".6" stroke-width="1.6"/></g>`;
    if (o.after) s += label(20, 30, '경계 = 중앙', 9, 'rgba(20,18,16,.55)');
    else s += label(20, 30, '기울고 치우침', 9, 'rgba(20,18,16,.55)');
    return s;
  },

  /* 24. 색 대비 */
  color(o) {
    let s = `<rect width="400" height="300" fill="${o.after ? '#7f9769' : '#85916f'}"/>`;
    s += `<path d="M0 210 Q100 190 200 206 T400 200 L400 300 L0 300 Z" fill="${o.after ? '#6d8459' : '#7a8867'}"/>`;
    const col = o.after ? '#c8503f' : '#7d8a66';
    s += `<g transform="translate(268 200) scale(1.55)">
      <path d="M0 0 L0 -34 M0 -34 Q-26 -40 -30 -18 Q-8 -12 0 -34 Q8 -12 30 -18 Q26 -40 0 -34" fill="${col}"/>
      <path d="M0 -34 V-2" stroke="#6b5a44" stroke-width="2.5"/></g>`;
    if (o.after) {
      s += `<circle cx="268" cy="170" r="52" fill="none" stroke="${C.gold}" stroke-width="2" stroke-dasharray="6 5"/>`;
      s += label(60, 96, '다른 색 하나 = 주인공', 9, 'rgba(255,255,255,.85)');
    } else {
      s += label(60, 96, '같은 색에 묻힘', 9, 'rgba(255,255,255,.75)');
    }
    return s;
  },

  /* 25. 높이 */
  height(o) {
    const id = uid();
    let s = sky(id, '#e3e7df', '#f0e2c8');
    if (o.after) {
      s += `${sun(310, 62, 13)}${hill(150, C.hillFar, .75)}<rect x="0" y="190" width="400" height="110" fill="#9aa87e"/>`;
      s += `${tree(40, 240, 1.5)}${tree(360, 250, 1.2)}`;
      s += `<g>${[0, 1, 2, 3, 4].map(i => `<circle cx="${110 + i * 40}" cy="${266 - (i % 2) * 8}" r="10" fill="#e0c6a2"/>`).join('')}</g>`;
      s += person(220, 236, 1.0);
      s += label(20, 36, '바닥에서 올려다보기', 9, 'rgba(20,18,16,.62)');
    } else {
      s += `${hill(146, C.hillFar, .75)}<rect x="0" y="160" width="400" height="140" fill="#9aa87e"/>
        <path d="M0 160 H400" stroke="#87946d" stroke-width="2"/>`;
      s += person(220, 250, 1.0);
      s += label(20, 40, '서서 허리 높이', 9, 'rgba(20,18,16,.55)');
    }
    return s;
  },

  /* 26. 역광 */
  backlight(o) {
    const id = uid();
    let s = sky(id, o.after ? '#f6d9a8' : '#f7f1e2', o.after ? '#e0a768' : '#efe6d2');
    s += sun(240, 150, 30);
    s += `<rect x="0" y="216" width="400" height="84" fill="${o.after ? '#b78f5e' : '#cabfa8'}"/>`;
    s += `${tree(70, 220, 1.1, o.after ? '#5d6a4c' : '#8d9884')}`;
    s += person(236, 246, 1.15, { headFill: o.after ? C.face : '#3a352e' });
    if (o.after) {
      s += `<path d="M229 196 q7 -22 14 0" stroke="#ffe0a2" stroke-width="2.4" fill="none"/>
        <path d="M222 214 q14 -8 28 0" stroke="rgba(255,224,162,.8)" stroke-width="2" fill="none"/>`;
      s += label(20, 42, '얼굴 터치 + 노출 소폭 UP', 9, 'rgba(60,40,20,.7)');
    } else {
      s += `<rect x="210" y="188" width="56" height="70" fill="#000" opacity=".22"/>`;
      s += label(20, 42, '하늘에 노출 → 얼굴 검게', 9, 'rgba(60,40,20,.65)');
    }
    return s;
  },

  /* 27. 창가 옆빛 */
  window(o) {
    let s = `<rect width="400" height="300" fill="${o.after ? '#efe6d3' : '#e6d9b9'}"/>`;
    s += `<rect x="0" y="196" width="400" height="104" fill="#b98f63"/>
      <rect x="0" y="196" width="400" height="8" fill="#cfae86"/>`;
    s += `<rect x="0" y="24" width="86" height="150" fill="#fdf6e4"/>
      <path d="M43 24 V174 M0 100 H86" stroke="#e2d4b8" stroke-width="4"/>`;
    if (!o.after) {
      s += `<g><circle cx="240" cy="52" r="13" fill="#e8cf8d"/><path d="M240 65 L240 110" stroke="#cbb06e" stroke-width="2"/></g>`;
      s += `<ellipse cx="246" cy="238" rx="86" ry="34" fill="#9a744c" opacity=".55"/>`;
    }
    s += `<ellipse cx="240" cy="238" rx="80" ry="30" fill="#f6efdd" stroke="#d9c9ab"/>
      <ellipse cx="240" cy="234" rx="58" ry="20" fill="#e7cfa8"/>
      <rect x="196" y="204" width="34" height="26" rx="3" fill="#c96f4a"/>
      <circle cx="278" cy="212" r="13" fill="#f7f2e6" stroke="#d9c9ab"/><rect x="266" y="220" width="24" height="16" rx="4" fill="#f7f2e6" stroke="#d9c9ab"/>`;
    if (o.after) {
      s += `<path d="M86 60 L300 110 L300 150 L86 120 Z" fill="#fff8e2" opacity=".45"/>
        <path d="M240 262 q40 6 76 0" stroke="rgba(120,90,50,.35)" stroke-width="6" fill="none"/>`;
      s += label(96, 196, '옆빛 → 질감', 9, 'rgba(90,64,30,.65)');
    } else {
      s += label(96, 196, '정면광 → 평평', 9, 'rgba(90,64,30,.65)');
    }
    return s;
  },

  /* 28. 탑뷰 */
  overhead(o) {
    let s = `<rect width="400" height="300" fill="#b98f63"/><rect x="0" y="0" width="400" height="300" fill="#c49a6c"/>`;
    [0, 1, 2, 3, 4].forEach(i => { s += `<path d="M0 ${40 + i * 56} H400" stroke="rgba(120,86,48,.25)" stroke-width="1.5"/>`; });
    const cx = 200, cy = 150;
    if (o.after) {
      s += `<circle cx="${cx}" cy="${cy}" r="86" fill="#fbf5e6" stroke="#ddcdb0"/>
        <circle cx="${cx}" cy="${cy}" r="62" fill="#e9cfa6"/>
        <circle cx="${cx - 16}" cy="${cy - 12}" r="14" fill="#c96f4a"/><circle cx="${cx + 18}" cy="${cy + 10}" r="16" fill="#8fa664"/>
        <circle cx="${cx + 4}" cy="${cy - 22}" r="10" fill="#d8a04a"/>`;
      s += `<g stroke="#cdbd9e" stroke-width="3"><line x1="66" y1="150" x2="96" y2="150"/><line x1="304" y1="150" x2="334" y2="150"/></g>`;
      s += label(20, 30, '접시 테두리 = 격자에 나란히', 9, 'rgba(60,40,20,.65)');
    } else {
      s += `<ellipse cx="${cx}" cy="${cy}" rx="92" ry="66" fill="#fbf5e6" stroke="#ddcdb0"/>
        <ellipse cx="${cx}" cy="${cy}" rx="66" ry="44" fill="#e9cfa6"/>
        <circle cx="${cx - 16}" cy="${cy - 8}" r="12" fill="#c96f4a"/><circle cx="${cx + 18}" cy="${cy + 6}" r="14" fill="#8fa664"/>`;
      s += `<rect x="212" y="176" width="88" height="52" rx="8" fill="#2a2621" opacity=".28"/>`;
      s += label(20, 30, '기울어 접시가 찌그러짐', 9, 'rgba(60,40,20,.65)');
    }
    return s;
  },

  /* 29. 눈높이 단면 */
  side(o) {
    let s = `<rect width="400" height="300" fill="#e7dcc7"/><rect x="0" y="206" width="400" height="94" fill="#b98f63"/>`;
    if (o.after) {
      s += `<g><rect x="120" y="96" width="58" height="110" rx="6" fill="rgba(255,255,255,.35)" stroke="#cbb99a"/>
        <rect x="120" y="150" width="58" height="56" fill="#c98a52" opacity=".85"/>
        <rect x="120" y="120" width="58" height="30" fill="#efe0c2" opacity=".9"/>
        <rect x="120" y="96" width="58" height="24" fill="#fdf6e6" opacity=".95"/>
        <ellipse cx="149" cy="98" rx="29" ry="6" fill="#fff" opacity=".7"/></g>`;
      s += `<path d="M240 206 L240 150 L300 150 L300 206 Z" fill="#f2e4c6" stroke="#d9c4a0"/>
        <path d="M240 176 H300 M240 192 H300" stroke="#c98a52" stroke-width="6"/>
        <path d="M240 150 L268 128 L300 150" fill="#f7edda" stroke="#d9c4a0"/>`;
      s += label(96, 76, '눈높이 = 층·단면', 9, 'rgba(70,48,26,.7)');
    } else {
      s += `<ellipse cx="200" cy="210" rx="96" ry="34" fill="#fbf5e6" stroke="#ddcdb0"/>
        <rect x="164" y="196" width="46" height="14" rx="4" fill="#c98a52"/>
        <circle cx="238" cy="204" r="16" fill="#efe0c2"/>`;
      s += label(96, 150, '위에서만 = 층이 사라짐', 9, 'rgba(70,48,26,.7)');
    }
    return s;
  },

  /* 30. 접사 */
  macro(o) {
    let s = `<rect width="400" height="300" fill="${o.after ? '#e8dcc4' : '#dfe6da'}"/>`;
    if (o.after) {
      s += `<circle cx="210" cy="150" r="120" fill="#f0c9c9"/>
        ${[0, 1, 2, 3, 4, 5, 6, 7].map(i => {
          const a = i * 45 * Math.PI / 180;
          return `<ellipse cx="${210 + Math.cos(a) * 74}" cy="${150 + Math.sin(a) * 74}" rx="58" ry="30" fill="${i % 2 ? '#eab6b8' : '#f4d3d2'}" transform="rotate(${i * 45} ${210 + Math.cos(a) * 74} ${150 + Math.sin(a) * 74})"/>`;
        }).join('')}
        <circle cx="210" cy="150" r="42" fill="#e0b25e"/>
        <circle cx="196" cy="138" r="5" fill="#fff" opacity=".55"/><circle cx="224" cy="158" r="4" fill="#fff" opacity=".45"/>`;
      s += label(24, 36, '2~5cm 접사', 9, 'rgba(60,40,30,.6)');
    } else {
      s += `<path d="M150 300 Q160 220 180 190" stroke="#7d8f6a" stroke-width="4" fill="none"/>
        <circle cx="180" cy="186" r="16" fill="#eab6b8"/><circle cx="180" cy="186" r="6" fill="#e0b25e"/>`;
      s += `<path d="M0 300 Q60 250 120 268 T260 250 T400 270 L400 300 Z" fill="#9aa87e"/>`;
      s += label(24, 36, '멀리서 = 질감이 안 보임', 9, 'rgba(40,50,34,.6)');
    }
    return s;
  },

  /* 31. 물웅덩이 */
  puddle(o) {
    const id = uid();
    let s = sky(id, '#cfd6d6', '#e5dcc8');
    s += `<g fill="#8d9089"><rect x="20" y="60" width="70" height="120"/><rect x="110" y="36" width="54" height="144"/>
      <rect x="184" y="66" width="80" height="114"/><rect x="286" y="44" width="90" height="136"/></g>`;
    s += `<g fill="#f0d39a" opacity=".8">${[0, 1, 2, 3, 4, 5, 6, 7].map(i => `<rect x="${32 + (i * 43) % 330}" y="${76 + (i * 37) % 90}" width="6" height="8"/>`).join('')}</g>`;
    s += `<rect x="0" y="180" width="400" height="120" fill="#9a9691"/>`;
    const cx = 200, cy = 236;
    if (o.after) {
      s += `<defs><clipPath id="pc${id}"><ellipse cx="${cx}" cy="${cy}" rx="150" ry="46"/></clipPath></defs>
        <ellipse cx="${cx}" cy="${cy}" rx="150" ry="46" fill="#7f8b8e"/>`;
      s += `<g clip-path="url(#pc${id})"><g transform="translate(0 360) scale(1 -1)" opacity=".9">
        <rect x="20" y="60" width="70" height="120" fill="#46514c"/><rect x="110" y="36" width="54" height="144" fill="#46514c"/>
        <rect x="184" y="66" width="80" height="114" fill="#46514c"/><rect x="286" y="44" width="90" height="136" fill="#46514c"/></g></g>`;
      s += `<ellipse cx="${cx}" cy="${cy}" rx="150" ry="46" fill="none" stroke="rgba(255,255,255,.45)" stroke-width="1.5"/>`;
      s += `<rect x="176" y="200" width="10" height="26" fill="${C.ink}" opacity=".8"/><circle cx="181" cy="196" r="6" fill="${C.ink}"/>`;
      s += `<g stroke="rgba(255,255,255,.28)" stroke-width="1.2" fill="none">
        <path d="M96 214 q22 3 44 0"/><path d="M188 256 q26 3 52 0"/></g>
        <g fill="#f0cf8e" opacity=".55"><circle cx="128" cy="216" r="1.7"/><circle cx="147" cy="232" r="1.7"/><circle cx="214" cy="222" r="1.7"/><circle cx="240" cy="246" r="1.7"/><circle cx="306" cy="228" r="1.7"/></g>`;
      s += label(20, 292, '위·아래를 함께', 9, 'rgba(20,18,16,.6)');
    } else {
      s += `<ellipse cx="${cx}" cy="${cy}" rx="150" ry="46" fill="#8b8783"/>`;
      s += label(20, 292, '바닥만 = 그냥 아스팔트', 9, 'rgba(20,18,16,.55)');
    }
    return s;
  },

  /* 32. 빗줄기 */
  rain(o) {
    const id = uid();
    let s = nightSky(id);
    s += `<g fill="${C.city}"><rect x="0" y="150" width="90" height="150"/><rect x="110" y="120" width="70" height="180"/>
      <rect x="210" y="140" width="90" height="160"/><rect x="320" y="110" width="80" height="190"/></g>`;
    s += `<g fill="${C.light}" opacity=".85"><rect x="130" y="160" width="14" height="26" rx="2"/><rect x="240" y="176" width="26" height="10" rx="2"/>
      <rect x="344" y="150" width="10" height="30" rx="2"/></g>`;
    s += `<rect x="0" y="252" width="400" height="48" fill="#22283a"/>`;
    if (o.after) {
      for (let i = 0; i < 34; i++) {
        const x = (i * 61) % 400, y = (i * 37) % 260;
        s += `<line x1="${x}" y1="${y}" x2="${x - 6}" y2="${y + 26}" stroke="#dfe8f5" stroke-opacity=".72" stroke-width="1.4"/>`;
      }
      s += `<rect x="300" y="272" width="88" height="18" rx="9" fill="rgba(15,14,12,.5)"/>${label(306, 285, '1/50s', 9, 'rgba(255,255,255,.8)')}`;
    } else {
      for (let i = 0; i < 60; i++) {
        const x = (i * 53) % 400, y = (i * 41) % 260;
        s += `<circle cx="${x}" cy="${y}" r="1.3" fill="#cfd9e8" fill-opacity=".45"/>`;
      }
      s += `<rect x="300" y="272" width="88" height="18" rx="9" fill="rgba(15,14,12,.5)"/>${label(306, 285, '1/350s', 9, 'rgba(255,255,255,.8)')}`;
    }
    return s;
  },

  /* 33. 야경 */
  nightcity(o) {
    const id = uid();
    let s = nightSky(id);
    const bs = [
      { x: -4, w: 56, h: 76 }, { x: 56, w: 48, h: 118 }, { x: 108, w: 62, h: 88 },
      { x: 174, w: 52, h: 134 }, { x: 230, w: 60, h: 96 }, { x: 294, w: 46, h: 120 }, { x: 344, w: 62, h: 84 }
    ];
    let city = '', win = '';
    bs.forEach((b, i) => {
      const top = 244 - b.h;
      city += `<rect x="${b.x}" y="${top}" width="${b.w}" height="${b.h + 56}" fill="${i % 2 ? '#233044' : '#2b3a50'}" stroke="rgba(255,255,255,.12)" stroke-width="1"/>`;
      for (let r = 0; r < Math.floor(b.h / 16); r++) {
        for (let c = 0; c < Math.floor((b.w - 10) / 13); c++) {
          if ((r * 3 + c + i) % 4 === 0) continue;
          win += `<rect x="${b.x + 8 + c * 13}" y="${top + 9 + r * 16}" width="5" height="7" rx="1" fill="${C.light}" opacity="${o.after ? .9 : .62}"/>`;
        }
      }
    });
    s += city + win;
    if (!o.after) {
      for (let i = 0; i < 110; i++) {
        const x = (i * 71) % 400, y = (i * 43) % 244;
        s += `<circle cx="${x}" cy="${y}" r="1" fill="#fff" opacity=".2"/>`;
      }
      s += `<g transform="rotate(-3.5 200 150)"><rect x="0" y="252" width="400" height="48" fill="#121821"/>
        <rect x="0" y="258" width="400" height="3" fill="#2b3546"/></g>`;
      s += label(20, 26, '손으로 들고 자동', 9, 'rgba(255,255,255,.62)');
    } else {
      s += `<rect x="0" y="252" width="400" height="48" fill="#121821"/>
        <rect x="0" y="258" width="400" height="3" fill="#2b3546"/>
        <path d="M200 254 L188 292 M200 254 L212 292 M196 268 H205" stroke="#4a5464" stroke-width="2.6" fill="none"/>
        <rect x="195" y="238" width="10" height="18" rx="2" fill="#2a3140"/>`;
      s += label(20, 26, '고정 · ISO 400 · 1초', 9, 'rgba(255,255,255,.78)');
    }
    return s;
  },

  /* 34. 불꽃놀이 */
  fireworks(o) {
    const id = uid();
    let s = nightSky(id);
    s += `<g fill="${C.city}"><rect x="0" y="210" width="70" height="90"/><rect x="80" y="232" width="54" height="68"/>
      <rect x="300" y="220" width="100" height="80"/></g>`;
    s += `<g fill="${C.light}" opacity=".6"><rect x="20" y="230" width="8" height="6"/><rect x="316" y="240" width="10" height="6"/></g>`;
    const cx = 200, cy = 120;
    if (o.after) {
      for (let i = 0; i < 16; i++) {
        const a = i * 22.5 * Math.PI / 180, r = 62 + (i % 3) * 10;
        s += `<line x1="${cx}" y1="${cy}" x2="${cx + Math.cos(a) * r}" y2="${cy + Math.sin(a) * r}" stroke="${i % 2 ? '#f6d38a' : '#efb45f'}" stroke-width="2" stroke-linecap="round"/>
          <circle cx="${cx + Math.cos(a) * (r + 5)}" cy="${cy + Math.sin(a) * (r + 5)}" r="2.6" fill="#fbe6b5"/>`;
      }
      s += `<circle cx="${cx}" cy="${cy}" r="10" fill="#fff3cf" opacity=".9"/>`;
      s += label(20, 30, 'ND16 · ISO50 · 2초', 9, 'rgba(255,255,255,.7)');
    } else {
      s += `<circle cx="${cx}" cy="${cy}" r="52" fill="#ffffff" opacity=".92"/>
        <circle cx="${cx}" cy="${cy}" r="80" fill="#ffffff" opacity=".2"/>`;
      s += label(20, 30, '자동 = 하얀 덩어리', 9, 'rgba(255,255,255,.7)');
    }
    return s;
  },

  /* 35. 라이트 트레일 */
  trail(o) {
    const id = uid();
    let s = nightSky(id);
    s += `<g fill="${C.city}"><rect x="0" y="100" width="80" height="120"/><rect x="320" y="110" width="80" height="110"/></g>`;
    s += `<rect x="0" y="220" width="400" height="80" fill="#20262f"/>
      <path d="M0 246 H400 M0 276 H400" stroke="#3a4250" stroke-width="2"/>`;
    if (o.after) {
      s += `<path d="M-20 258 Q120 250 200 252 T420 244" stroke="#ffd487" stroke-width="5" fill="none" opacity="1"/>
        <path d="M-20 254 Q120 246 200 248 T420 240" stroke="#fff0c8" stroke-width="1.6" fill="none" opacity=".8"/>
        <path d="M420 274 Q280 268 200 270 T-20 266" stroke="#f09a6a" stroke-width="4" fill="none" opacity="1"/>`;
      s += `<g><rect x="188" y="236" width="34" height="16" rx="4" fill="#2e3542"/><circle cx="222" cy="244" r="3" fill="#f7e0aa"/><circle cx="188" cy="244" r="3" fill="#e88a5a"/></g>`;
      s += label(20, 30, '2초 이상 · ISO 최저', 9, 'rgba(255,255,255,.7)');
    } else {
      s += `<g><rect x="188" y="236" width="34" height="16" rx="4" fill="#2e3542"/><path d="M222 244 L266 240 L266 250 Z" fill="#f7e0aa" opacity=".6"/></g>`;
      s += label(20, 30, '짧은 셔터 = 그냥 차', 9, 'rgba(255,255,255,.65)');
    }
    return s;
  },

  /* 36. 은하수 */
  milky(o) {
    const id = uid();
    let s = nightSky(id);
    if (o.after) {
      s += `<defs><linearGradient id="mw${id}" x1="0" y1="1" x2="1" y2="0">
        <stop offset="0" stop-color="#b9c6dd" stop-opacity=".05"/><stop offset=".45" stop-color="#cdd8ea" stop-opacity=".38"/>
        <stop offset="1" stop-color="#8f9dbb" stop-opacity=".05"/></linearGradient></defs>
        <path d="M-30 300 L180 0 L300 0 L40 300 Z" fill="url(#mw${id})"/>`;
      for (let i = 0; i < 70; i++) {
        const x = (i * 73) % 400, y = (i * 47) % 230;
        s += `<circle cx="${x}" cy="${y}" r="${i % 7 === 0 ? 1.6 : 0.9}" fill="#eae6d6" opacity="${.3 + (i % 5) * .13}"/>`;
      }
      s += `<path d="M0 236 Q90 224 180 234 T400 230 L400 300 L0 300 Z" fill="#0a0f16"/>
        <path d="M110 220 L118 236 M286 218 L292 236" stroke="#0a0f16" stroke-width="3"/>`;
      s += `<path d="M330 300 L344 246 M356 300 L344 246 M344 258 H352" stroke="#2a3242" stroke-width="2.4" fill="none"/>`;
      s += label(20, 30, '천체사진 · 최대 12분', 9, 'rgba(220,228,240,.7)');
    } else {
      for (let i = 0; i < 10; i++) {
        s += `<circle cx="${(i * 83) % 400}" cy="${(i * 37) % 180}" r="1.2" fill="#eae6d6" opacity=".4"/>`;
      }
      s += `<rect x="0" y="0" width="400" height="300" fill="#c98a4a" opacity=".18"/>`;
      s += `<path d="M0 236 Q90 224 180 234 T400 230 L400 300 L0 300 Z" fill="#12161c"/>`;
      s += label(20, 30, '도시 근처 = 하늘 밝음', 9, 'rgba(220,228,240,.65)');
    }
    return s;
  },

  /* 37. 별 초점 */
  stars(o) {
    const id = uid();
    let s = nightSky(id);
    s += `<rect x="0" y="250" width="400" height="50" fill="#0a0e15"/>`;
    for (let i = 0; i < 46; i++) {
      const x = (i * 67) % 400, y = 20 + (i * 41) % 210;
      if (o.after) {
        s += `<circle cx="${x}" cy="${y}" r="${i % 6 === 0 ? 1.5 : 0.9}" fill="#f2eedc" opacity="${.55 + (i % 4) * .12}"/>`;
      } else {
        s += `<circle cx="${x}" cy="${y}" r="${i % 6 === 0 ? 4.5 : 3}" fill="#f2eedc" opacity=".35"/>`;
      }
    }
    s += o.after ? label(20, 30, '수동 초점 · 점처럼', 9, 'rgba(255,255,255,.7)') : label(20, 30, '초점 어긋남 · 번짐', 9, 'rgba(255,255,255,.65)');
    return s;
  },

  /* 38. 노을 */
  sunset(o) {
    const id = uid();
    let s = sky(id, o.after ? '#f3b46b' : '#dfe0d8', o.after ? '#f6d8a6' : '#ece4d2');
    s += sun(268, o.after ? 210 : 236, 26);
    s += `<rect x="0" y="238" width="400" height="62" fill="${o.after ? '#8d7a63' : '#9b9483'}"/>`;
    s += `<path d="M0 238 H400" stroke="${o.after ? '#f0c58c' : '#c9c3b2'}" stroke-width="2"/>`;
    if (o.after) {
      s += `<path d="M238 240 Q268 254 300 240" stroke="#f7d59f" stroke-width="3" fill="none" opacity=".8"/>
        <path d="M256 254 Q268 260 282 254" stroke="#f7d59f" stroke-width="2" fill="none" opacity=".6"/>`;
      s += label(20, 40, 'WB 8000K · ISO100', 9, 'rgba(70,40,20,.7)');
    } else {
      s += label(20, 40, '자동 = 회색 하늘', 9, 'rgba(50,45,36,.6)');
    }
    return s;
  }
};
