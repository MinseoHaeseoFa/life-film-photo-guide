/* 인생이라는 필름 — 실사 사진 에셋과 뷰파인더 메타데이터
   assets/img/*.jpg 는 35mm 필름 룩으로 생성한 에디토리얼 사진입니다(실제 촬영지·인물 기록 아님).
   카드마다 사진 1장 + 촬영 실패를 재현하는 Before 변형 + 교정된 After 가이드를 묶었습니다. */

const PHOTOS = {
  'horizon-sea':        { src: 'assets/img/horizon-sea.jpg',        w: 1280, h: 853, alt: '수평선 아래 1/3에 맞춘 잔잔한 바다와 해변의 인물' },
  'leading-lines':      { src: 'assets/img/leading-lines.jpg',      w: 1280, h: 853, alt: '먼 산으로 이어지는 도로의 소실점' },
  'backlit-portrait':   { src: 'assets/img/backlit-portrait.jpg',   w: 1280, h: 853, alt: '노을을 등지고 선 인물의 역광 윤곽' },
  'night-city':         { src: 'assets/img/night-city.jpg',         w: 1280, h: 853, alt: '네온이 반사되는 밤 골목' },
  'cherry-blossom':     { src: 'assets/img/cherry-blossom.jpg',     w: 1280, h: 853, alt: '파란 하늘을 배경으로 핀 벚꽃' },
  'selfie-stick':       { src: 'assets/img/selfie-stick.jpg',       w: 1280, h: 852, alt: '롱 셀카봉을 든 인물의 셀피' },
  'selfie-place':       { src: 'assets/img/selfie-place.jpg',       w: 1280, h: 852, alt: '난간에 세워 둔 폰과 타이머로 찍히는 인물' },
  'water-bottle-marker':{ src: 'assets/img/water-bottle-marker.jpg',w: 1280, h: 853, alt: '호숫가 난간에 세워 둔 물병' },
  'traveler-viewpoint': { src: 'assets/img/traveler-viewpoint.jpg', w: 1280, h: 853, alt: '셀카봉을 높이 든 여행자의 뒷모습과 해안 풍경' },
  'walking-candid':     { src: 'assets/img/walking-candid.jpg',     w: 1280, h: 853, alt: '햇살 드는 골목을 걷는 남자의 전신' },
  'wide-selfie':        { src: 'assets/img/wide-selfie.jpg',        w: 1280, h: 853, alt: '초광각으로 담은 두 사람의 셀피와 광장' },
  'blue-hour-valley':   { src: 'assets/img/blue-hour-valley.jpg',   w: 1280, h: 853, alt: '블루아워에 전망대에서 계곡을 바라보는 인물' },
  'window-portrait':    { src: 'assets/img/window-portrait.jpg',    w: 1280, h: 853, alt: '창가 옆빛을 받는 인물 포트레이트' },
  'cafe-person-bokeh':  { src: 'assets/img/cafe-person-bokeh.jpg',  w: 1280, h: 1923, alt: '카페에서 컵을 든 채 웃는 인물과 흐려진 배경' },
  'bokeh-portrait':     { src: 'assets/img/bokeh-portrait.jpg',     w: 1280, h: 853, alt: '카페에서 두 손으로 컵을 쥔 인물과 부드러운 배경 흐림' },
  'lean-wall':          { src: 'assets/img/lean-wall.jpg',          w: 1280, h: 852, alt: '흰 벽에 기대어 45도로 선 인물' },
  'leaning-railing':    { src: 'assets/img/leaning-railing.jpg',    w: 1280, h: 853, alt: '바다를 향해 난간에 기댄 인물' },
  'frame-in-frame':     { src: 'assets/img/frame-in-frame.jpg',     w: 1280, h: 853, alt: '아치 문틀 안에 담긴 인물과 가을 정원' },
  'lowangle-street':    { src: 'assets/img/lowangle-street.jpg',    w: 1280, h: 853, alt: '지면 가까이에서 올려 담은 골목의 전신' },
  'architecture-symmetry': { src: 'assets/img/architecture-symmetry.jpg', w: 1280, h: 853, alt: '좌우 대칭으로 이어지는 아치 회랑' },
  'color-contrast':     { src: 'assets/img/color-contrast.jpg',     w: 1280, h: 853, alt: '회색 콘크리트 사이의 빨간 코트' },
  'lake-reflection':    { src: 'assets/img/lake-reflection.jpg',    w: 1280, h: 853, alt: '수면에 산이 그대로 비치는 호수' },
  'cafe-window-food':   { src: 'assets/img/cafe-window-food.jpg',   w: 1280, h: 853, alt: '비 내리는 창가의 라테와 크루아상' },
  'cafe-overhead':      { src: 'assets/img/cafe-overhead.jpg',      w: 1280, h: 853, alt: '탑뷰로 담은 라테와 치즈케이크' },
  'food-side':          { src: 'assets/img/food-side.jpg',          w: 1280, h: 1024, alt: '층이 보이도록 옆에서 담은 버거와 아이스 라테' },
  'food-macro':         { src: 'assets/img/food-macro.jpg',         w: 1280, h: 853, alt: '접사로 담은 딸기 생크림 케이크 단면' },
  'rainy-puddle':       { src: 'assets/img/rainy-puddle.jpg',       w: 1280, h: 853, alt: '네온이 반사되는 밤 물웅덩이' },
  'rain-streak':        { src: 'assets/img/rain-streak.jpg',        w: 1280, h: 853, alt: '가로등 빛에 드러난 빗줄기와 보케' },
  'fireworks':          { src: 'assets/img/fireworks.jpg',          w: 1280, h: 853, alt: '도시 위로 터진 불꽃의 장노출' },
  'light-trail':        { src: 'assets/img/light-trail.jpg',        w: 1280, h: 853, alt: '곡선 도로를 지나는 차량 불빛 궤적' },
  'milkyway':           { src: 'assets/img/milkyway.jpg',           w: 1280, h: 853, alt: '산 능선 위로 걸린 은하수' },
  'star-field':         { src: 'assets/img/star-field.jpg',         w: 1280, h: 853, alt: '호수에 별이 내려앉은 밤하늘과 텐트' },
  'sunset-silhouette':  { src: 'assets/img/sunset-silhouette.jpg',  w: 1280, h: 853, alt: '노을 하늘을 배경으로 선 두 사람의 실루엣' }
};

/* ── Before / After 프리셋 ─────────────────────────────── */
const EX = (lens, ap, iso, sh, ev, wb) => [lens, ap, iso, sh, ev, wb];

const bTilt = (deg, note, sc) => ({ t: `rotate(${deg}deg) scale(${sc || 1.16})`, f: 'contrast(.92) saturate(.87) brightness(.96)', tone: 'dull', warn: 'level', note });
const bZoom = (sc, note) => ({ t: `scale(${sc}) translate(6%, -4%)`, f: 'blur(1.3px) contrast(.92)', tone: 'none', warn: 'crop', note });
const bBlow = (note) => ({ t: 'none', f: 'brightness(1.5) contrast(.85) saturate(.9)', tone: 'blow', warn: 'blow', note });
const bDark = (note) => ({ t: 'none', f: 'brightness(.52) contrast(1.22)', tone: 'dark', warn: 'dark', note });
const bSoft = (note) => ({ t: 'scale(1.04)', f: 'blur(1.5px) brightness(.95)', tone: 'blur', warn: 'blur', note });
const bFlat = (note) => ({ t: 'none', f: 'saturate(.35) contrast(.9)', tone: 'flat', warn: 'flat', note });
const bCenter = (sc, note) => ({ t: `scale(${sc})`, f: 'contrast(.95)', tone: 'none', warn: 'center', note });
const aAt = (x, y, note, guides) => ({ note, focus: [x, y], guides: guides || ['thirds'] });

const MEDIA = {
  'grid-level': {
    photo: 'horizon-sea', pos: '55% 62%',
    exif: EX('26mm', 'f/1.8', 'ISO 50', '1/500s', 'EV -0.3', 'WB 5500K'),
    before: bTilt(-4.2, '수평 -4.2° · 하늘을 절반에'),
    after: aAt(67, 62, '수평 0.0° · 하늘 2/3', ['thirds', 'level'])
  },
  'lens-button': {
    photo: 'leading-lines', pos: '50% 52%',
    exif: EX('28mm', 'f/1.8', 'ISO 64', '1/800s', 'EV 0.0', 'WB 5600K'),
    before: bZoom(2.15, '디지털 줌 3.9배 · 화질 저하'),
    after: aAt(48, 46, '1x 광각 렌즈 · 화질 유지')
  },
  'exposure': {
    photo: 'backlit-portrait', pos: '38% 45%',
    exif: EX('50mm', 'f/1.8', 'ISO 100', '1/1000s', 'EV -0.7', 'WB 5200K'),
    before: bDark('하늘에 노출 고정 · 얼굴 -2.0EV'),
    after: aAt(38, 24, '얼굴에 노출 고정 · EV -0.7')
  },
  'timer': {
    photo: 'night-city', pos: '50% 46%',
    exif: EX('24mm', 'f/1.8', 'ISO 400', '1/4s', 'EV -0.3', 'WB 3800K'),
    before: bSoft('셔터 누른 손이 폰을 흔듦'),
    after: aAt(50, 50, '삼각대 고정 · 3초 타이머', ['thirds', 'level'])
  },
  'grading': {
    photo: 'cherry-blossom', pos: '55% 50%',
    exif: EX('50mm', 'f/2.0', 'ISO 50', '1/640s', 'EV 0.0', 'WB 5200K'),
    before: bFlat('자동 모드 · 흰 꽃이 회색으로'),
    after: aAt(52, 34, '채도 +10 · 틴트 +2')
  },
  'selfie-height': {
    photo: 'selfie-stick', pos: '90% 42%',
    exif: EX('24mm', 'f/2.2', 'ISO 64', '1/250s', 'EV 0.0', 'WB 5400K'),
    before: bZoom(1.5, '렌즈가 눈 아래 · 머리 위 여백 0'),
    after: aAt(55, 55, '렌즈 눈+한 뼘 · 배경 2/3')
  },
  'selfie-place': {
    photo: 'selfie-place', pos: '58% 50%',
    exif: EX('26mm', 'f/1.8', 'ISO 100', '1/320s', 'EV 0.0', 'WB 5600K'),
    before: bSoft('손으로 들고 눌러 흔들림'),
    after: aAt(68, 38, '난간에 고정 · 3초 타이머')
  },
  'selfie-marker': {
    photo: 'water-bottle-marker', pos: '50% 66%',
    exif: EX('26mm', 'f/2.0', 'ISO 50', '1/500s', 'EV 0.0', 'WB 5800K'),
    before: bZoom(1.5, '물병이 프레임 밖 · 자리 못 잡음'),
    after: aAt(50, 80, '물병 자리에 내가 들어감')
  },
  'backview': {
    photo: 'traveler-viewpoint', pos: '100% 50%',
    exif: EX('35mm', 'f/4.0', 'ISO 100', '1/500s', 'EV -0.3', 'WB 5600K'),
    before: bTilt(3.4, '수평 3.4° · 인물이 한가운데', 1.18),
    after: aAt(63, 52, '인물 우측 1/3 · 수평 0.0°', ['thirds', 'level'])
  },
  'walk-burst': {
    photo: 'walking-candid', pos: '55% 48%',
    exif: EX('50mm', 'f/2.8', 'ISO 200', '1/500s', 'EV 0.0', 'WB 5400K'),
    before: bZoom(1.38, '발끝이 잘림 · 멈춰 선 자세'),
    after: aAt(46, 45, '걷는 중간 · 발끝까지 담김')
  },
  'ultrawide-selfie': {
    photo: 'wide-selfie', pos: '50% 50%',
    exif: EX('13mm', 'f/2.2', 'ISO 50', '1/800s', 'EV 0.0', 'WB 5600K'),
    before: { t: 'scale(1.4) translateX(-24%)', f: 'contrast(1.06) saturate(.92)', tone: 'none', warn: 'crop', note: '얼굴이 가장자리 · 왜곡 심함' },
    after: aAt(38, 55, '얼굴 중앙 · 0.5x 초광각')
  },
  'ratio': {
    photo: 'blue-hour-valley', pos: '50% 45%',
    exif: EX('35mm', 'f/2.8', 'ISO 400', '1/60s', 'EV -0.7', 'WB 4300K'),
    before: bZoom(1.32, '인물 절반 · 답답한 배분'),
    after: aAt(47, 40, '인물 1/3 · 풍경 2/3')
  },
  'eye-thirds': {
    photo: 'window-portrait', pos: '45% 45%',
    exif: EX('50mm', 'f/1.8', 'ISO 200', '1/160s', 'EV 0.3', 'WB 5000K'),
    before: bCenter(1.24, '얼굴 중앙 · 눈이 정중앙'),
    after: aAt(28, 28, '눈 = 위쪽 교차점', ['thirds', 'dots'])
  },
  'hands': {
    photo: 'bokeh-portrait', pos: '50% 45%',
    exif: EX('35mm', 'f/2.0', 'ISO 400', '1/125s', 'EV 0.3', 'WB 4800K'),
    before: bZoom(1.2, '손이 프레임 아래로 잘림'),
    after: aAt(50, 68, '손에 역할 · 컵을 쥐게')
  },
  'body-turn': {
    photo: 'lean-wall', pos: '68% 38%',
    exif: EX('85mm', 'f/2.0', 'ISO 100', '1/400s', 'EV 0.0', 'WB 5600K'),
    before: bCenter(1.28, '정면 · 증명사진 같은 각도'),
    after: aAt(54, 28, '몸 45도 · 얼굴만 정면', ['thirds', 'dots'])
  },
  'lean': {
    photo: 'leaning-railing', pos: '50% 45%',
    exif: EX('50mm', 'f/2.4', 'ISO 100', '1/500s', 'EV -0.3', 'WB 5200K'),
    before: bTilt(2.6, '수평 2.6° · 팔이 어색하게 붙음', 1.12),
    after: aAt(33, 28, '난간에 기대 사선 확보', ['thirds', 'level'])
  },
  'frame-in-frame': {
    photo: 'frame-in-frame', pos: '50% 52%',
    exif: EX('35mm', 'f/4.0', 'ISO 200', '1/250s', 'EV 0.0', 'WB 5400K'),
    before: bZoom(1.65, '문틀이 잘려 액자가 사라짐'),
    after: aAt(40, 55, '문틀 = 액자 · 시선 집중')
  },
  'space': {
    photo: 'traveler-viewpoint', pos: '100% 50%',
    exif: EX('35mm', 'f/4.0', 'ISO 100', '1/640s', 'EV -0.3', 'WB 5600K'),
    before: { t: 'scale(1.42) translateX(-15%)', f: 'contrast(.96)', tone: 'none', warn: 'crop', note: '여백 없음 · 시선이 막힘' },
    after: aAt(75, 48, '시선 방향에 여백 2/3')
  },
  'low-angle': {
    photo: 'lowangle-street', pos: '50% 42%',
    exif: EX('24mm', 'f/2.2', 'ISO 100', '1/320s', 'EV 0.0', 'WB 5800K'),
    before: { t: 'scale(1.18) translateY(-7%)', f: 'contrast(.94) saturate(.92)', tone: 'none', warn: 'crop', note: '허리 높이에서 · 다리가 짧음' },
    after: aAt(44, 45, '로우앵글 · 발끝 프레임 안')
  },
  'crop': {
    photo: 'cafe-person-bokeh', pos: '55% 34%',
    exif: EX('35mm', 'f/2.0', 'ISO 320', '1/125s', 'EV 0.0', 'WB 4800K'),
    before: { t: 'scale(1.34) translateY(-15%)', f: 'contrast(.96)', tone: 'none', warn: 'crop', note: '손목에서 자름 · 어색한 경계' },
    after: aAt(62, 18, '관절 사이에서 자름')
  },
  'portrait-mode': {
    photo: 'bokeh-portrait', pos: '50% 45%',
    exif: EX('85mm', 'f/2.4', 'ISO 100', '1/320s', 'EV 0.3', 'WB 5400K'),
    before: { t: 'none', f: 'contrast(1.1) saturate(.9)', tone: 'flat', warn: 'flat', note: '배경까지 선명 · 주인공 약함' },
    after: aAt(40, 30, '3x 인물 모드 · 블러 -5')
  },
  'horizon': {
    photo: 'horizon-sea', pos: '55% 62%',
    exif: EX('26mm', 'f/4.0', 'ISO 50', '1/640s', 'EV -0.3', 'WB 5600K'),
    before: bTilt(1.8, '수평선이 한가운데 · 두 동강', 1.1),
    after: aAt(67, 62, '수평선 아래 1/3', ['thirds', 'level'])
  },
  'leading': {
    photo: 'lowangle-street', pos: '50% 45%',
    exif: EX('28mm', 'f/4.0', 'ISO 100', '1/250s', 'EV 0.0', 'WB 5600K'),
    before: bCenter(0.92, '선이 끊김 · 깊이 없음'),
    after: aAt(44, 45, '길이 인물로 수렴')
  },
  'symmetry': {
    photo: 'architecture-symmetry', pos: '50% 50%',
    exif: EX('24mm', 'f/5.6', 'ISO 100', '1/125s', 'EV 0.0', 'WB 5200K'),
    before: bTilt(-2.2, '좌우 비대칭 · 중심축 흐트러짐', 1.24),
    after: aAt(50, 55, '좌우 대칭 · 중심축 일치', ['thirds', 'level'])
  },
  'color-contrast': {
    photo: 'color-contrast', pos: '100% 55%',
    exif: EX('50mm', 'f/4.0', 'ISO 100', '1/400s', 'EV -0.3', 'WB 6000K'),
    before: bFlat('색 대비 없음 · 주인공 실종'),
    after: aAt(67, 62, '빨강 하나로 시선 고정', ['thirds', 'dots'])
  },
  'eye-level': {
    photo: 'lake-reflection', pos: '50% 50%',
    exif: EX('24mm', 'f/4.0', 'ISO 100', '1/320s', 'EV -0.3', 'WB 6200K'),
    before: bZoom(1.26, '서서 찍은 눈높이 · 늘 같은 사진'),
    after: aAt(50, 55, '물가 낮은 시점 · 반영 확보', ['thirds', 'level'])
  },
  'backlight': {
    photo: 'backlit-portrait', pos: '38% 45%',
    exif: EX('85mm', 'f/2.0', 'ISO 100', '1/2000s', 'EV 0.7', 'WB 5800K'),
    before: bDark('역광에 얼굴이 실루엣'),
    after: aAt(38, 24, '얼굴 노출 + · 윤곽 살림')
  },
  'food-window': {
    photo: 'cafe-window-food', pos: '45% 55%',
    exif: EX('35mm', 'f/2.2', 'ISO 200', '1/160s', 'EV 0.3', 'WB 4800K'),
    before: bTilt(-3, '천장등 켜짐 · 그림자 두 개', 1.12),
    after: aAt(40, 60, '창가 옆빛 하나')
  },
  'food-overhead': {
    photo: 'cafe-overhead', pos: '50% 50%',
    exif: EX('26mm', 'f/2.8', 'ISO 200', '1/125s', 'EV 0.0', 'WB 5000K'),
    before: { t: 'rotate(9deg) scale(.9)', f: 'contrast(.95) brightness(1.04)', tone: 'none', warn: 'level', note: '기울어진 탑뷰 · 접시 어긋남' },
    after: aAt(33, 45, '90도 수평 · 접시 정렬', ['thirds', 'level'])
  },
  'food-side': {
    photo: 'food-side', pos: '45% 52%',
    exif: EX('50mm', 'f/1.8', 'ISO 400', '1/100s', 'EV 0.3', 'WB 4600K'),
    before: bZoom(1.06, '위에서 내려다봄 · 층이 안 보임'),
    after: aAt(55, 52, '컵 높이 눈높이 · 층과 단면')
  },
  'food-macro': {
    photo: 'food-macro', pos: '50% 48%',
    exif: EX('13mm', 'f/2.4', 'ISO 200', '1/200s', 'EV 0.3', 'WB 4800K'),
    before: { t: 'scale(.72)', f: 'blur(.8px) contrast(.94)', tone: 'blur', warn: 'none', note: '멀리서 · 질감이 안 보임' },
    after: aAt(50, 50, '3~5cm 접사 · 결이 살아남')
  },
  'puddle': {
    photo: 'rainy-puddle', pos: '50% 55%',
    exif: EX('24mm', 'f/2.0', 'ISO 800', '1/30s', 'EV -0.7', 'WB 3600K'),
    before: bCenter(1.1, '서서 찍음 · 반영이 사라짐'),
    after: aAt(50, 60, '물가 낮은 시점 · 반영 확보', ['thirds', 'level'])
  },
  'rain-streak': {
    photo: 'rain-streak', pos: '50% 50%',
    exif: EX('70mm', 'f/2.8', 'ISO 800', '1/50s', 'EV -0.3', 'WB 4200K'),
    before: { t: 'scale(1.14)', f: 'contrast(1.12) brightness(.96)', tone: 'none', warn: 'none', note: '1/350 · 빗줄기가 끊겨 어색함' },
    after: aAt(50, 45, '1/50 · 빗줄기가 흐름')
  },
  'night-city': {
    photo: 'night-city', pos: '50% 46%',
    exif: EX('24mm', 'f/1.8', 'ISO 400', '1/4s', 'EV -0.7', 'WB 3400K'),
    before: bBlow('밝게 올려 네온이 하얗게 날아감'),
    after: aAt(50, 50, 'ISO 400 · 1/4s 고정', ['thirds', 'level'])
  },
  'fireworks': {
    photo: 'fireworks', pos: '50% 42%',
    exif: EX('24mm', 'f/1.8', 'ISO 50', '2s', 'EV -1.0', 'WB 4200K'),
    before: bZoom(1.32, '터진 뒤 눌러 불꽃이 잘림'),
    after: aAt(50, 30, '터지기 시작할 때 · 2초')
  },
  'light-trail': {
    photo: 'light-trail', pos: '50% 55%',
    exif: EX('24mm', 'f/1.8', 'ISO 100', '2.5s', 'EV -1.0', 'WB 4000K'),
    before: bBlow('1/30 · 차가 그냥 차로 보임'),
    after: aAt(60, 55, '2.5초 · 차가 선이 됨')
  },
  'milkyway': {
    photo: 'milkyway', pos: '50% 40%',
    exif: EX('24mm', 'f/1.8', 'ISO 3200', '15s', 'EV -2.0', 'WB 3900K'),
    before: bBlow('도시 광해 · 별이 씻겨 사라짐'),
    after: aAt(50, 28, '천체 모드 · 12분', ['thirds', 'level'])
  },
  'star-field': {
    photo: 'star-field', pos: '50% 44%',
    exif: EX('24mm', 'f/1.8', 'ISO 3200', '15s', 'EV -1.7', 'WB 3900K'),
    before: bSoft('자동 초점 · 별이 뭉개짐'),
    after: aAt(50, 40, '수동 초점 · 15초 고정', ['thirds', 'level'])
  },
  'sunset': {
    photo: 'sunset-silhouette', pos: '55% 62%',
    exif: EX('50mm', 'f/2.8', 'ISO 100', '1/1600s', 'EV -0.7', 'WB 8000K'),
    before: bFlat('자동 모드 · 노을이 회색으로'),
    after: aAt(33, 55, 'WB 8000K · 색을 붙잡음', ['thirds', 'level'])
  }
};
