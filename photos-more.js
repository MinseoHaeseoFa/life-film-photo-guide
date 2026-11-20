/* 인생이라는 필름 — 100장 확장분(61장)의 사진 매핑과 Before/After 변형.
   photos.js 의 프리셋(bTilt·bZoom·bBlow·bDark·bSoft·bFlat·bCenter·aAt)을 그대로 씁니다. */

Object.assign(MEDIA, {
  /* ── 폰 카메라 세팅 +11 ───────────────────── */
  'pro-triangle': {
    photo: 'night-city', pos: '50% 46%',
    exif: EX('24mm', 'f/1.8', 'ISO 400', '1/4s', 'EV -0.3', 'WB 3400K'),
    before: bBlow('자동 모드 · 노출만 끌어올림'),
    after: aAt(50, 50, 'ISO 400 · 1/4s 직접 설정', ['thirds', 'level'])
  },
  'night-iso': {
    photo: 'light-trail', pos: '50% 55%',
    exif: EX('24mm', 'f/1.8', 'ISO 400', '1s', 'EV -0.7', 'WB 4000K'),
    before: bBlow('ISO만 올려 노이즈 · 불빛 뭉개짐'),
    after: aAt(60, 55, 'ISO 낮게 · 셔터로 밝기')
  },
  'wb-kelvin': {
    photo: 'sunset-silhouette', pos: '55% 62%',
    exif: EX('24mm', 'f/1.8', 'ISO 100', '1/500s', 'EV -0.7', 'WB 2300K'),
    before: bFlat('자동 WB · 색이 한쪽으로 치우침'),
    after: aAt(33, 55, 'WB를 직접 올려 따뜻하게', ['thirds', 'level'])
  },
  'snow-ev': {
    photo: 'horizon-sea', pos: '55% 62%',
    exif: EX('26mm', 'f/2.0', 'ISO 50', '1/800s', 'EV +1.3', 'WB 5600K'),
    before: bDark('EV 0 · 눈이 회색으로'),
    after: aAt(67, 62, 'EV +1~2 · 눈이 하얗게', ['thirds', 'level'])
  },
  'steady-grip': {
    photo: 'night-city', pos: '50% 46%',
    exif: EX('24mm', 'f/1.8', 'ISO 800', '1/8s', 'EV -0.7', 'WB 3600K'),
    before: bSoft('팔만 뻗어 든 채 눌러 흔들림'),
    after: aAt(50, 50, '팔꿈치 붙이고 두 손 · 2초')
  },
  'remote-shutter': {
    photo: 'fireworks', pos: '50% 42%',
    exif: EX('24mm', 'f/1.8', 'ISO 50', '2s', 'EV -1.0', 'WB 4200K'),
    before: bSoft('셔터 누르는 진동이 남음'),
    after: aAt(50, 30, '이어폰 볼륨·워치로 원격 촬영')
  },
  'night-mode-time': {
    photo: 'night-city', pos: '50% 46%',
    exif: EX('24mm', 'f/1.8', 'ISO 640', '3s', 'EV -0.7', 'WB 3400K'),
    before: bBlow('야간모드 최소 시간 · 어둡게'),
    after: aAt(50, 50, '노출 시간 직접 선택')
  },
  'portrait-distance': {
    photo: 'bokeh-portrait', pos: '50% 45%',
    exif: EX('85mm', 'f/2.4', 'ISO 100', '1/250s', 'EV 0.3', 'WB 5200K'),
    before: bZoom(1.6, '30cm보다 가까이 · 흐림 실패'),
    after: aAt(40, 30, '30cm~2m 안에서 촬영')
  },
  'portrait-light': {
    photo: 'backlit-portrait', pos: '38% 45%',
    exif: EX('85mm', 'f/2.0', 'ISO 100', '1/500s', 'EV 0.3', 'WB 5400K'),
    before: bDark('인물 조명 없이 역광만'),
    after: aAt(38, 24, '스튜디오·스테이지 조명')
  },
  'ae-af-lock': {
    photo: 'window-portrait', pos: '45% 45%',
    exif: EX('50mm', 'f/1.8', 'ISO 200', '1/160s', 'EV 0.3', 'WB 5000K'),
    before: bCenter(1.2, '초점이 배경으로 도망'),
    after: aAt(28, 28, '눈을 터치하고 AE/AF 잠금', ['thirds', 'dots'])
  },
  'raw-format': {
    photo: 'milkyway', pos: '50% 40%',
    exif: EX('24mm', 'f/1.8', 'ISO 3200', '15s', 'EV -2.0', 'WB 3900K'),
    before: bBlow('JPEG로만 저장 · 계조 뭉개짐'),
    after: aAt(50, 28, 'RAW+JPEG · 후보정 여지', ['thirds', 'level'])
  },

  /* ── 혼자 여행·셀카 +9 ───────────────────── */
  'scene-first': {
    photo: 'blue-hour-valley', pos: '50% 45%',
    exif: EX('35mm', 'f/2.8', 'ISO 400', '1/60s', 'EV -0.7', 'WB 4300K'),
    before: bZoom(1.3, '인물부터 넣고 배경은 나중'),
    after: aAt(47, 40, '배경과 구도를 먼저 결정')
  },
  'many-angles': {
    photo: 'traveler-viewpoint', pos: '100% 50%',
    exif: EX('35mm', 'f/4.0', 'ISO 100', '1/500s', 'EV -0.3', 'WB 5600K'),
    before: bCenter(1.25, '한 장만 찍고 자리를 뜸'),
    after: aAt(63, 52, '같은 자리에서 각도 바꿔 여러 장')
  },
  'lean-support': {
    photo: 'leaning-railing', pos: '50% 45%',
    exif: EX('50mm', 'f/2.4', 'ISO 100', '1/500s', 'EV -0.3', 'WB 5200K'),
    before: bTilt(2.2, '벽에 등을 다 붙여 굳은 자세', 1.1),
    after: aAt(33, 28, '어깨 한쪽만 가볍게 기대기')
  },
  'walk-three': {
    photo: 'walking-candid', pos: '55% 48%',
    exif: EX('50mm', 'f/2.8', 'ISO 200', '1/500s', 'EV 0.0', 'WB 5400K'),
    before: bZoom(1.3, '서서 정면만 응시'),
    after: aAt(46, 45, '세 걸음 천천히 · 3컷')
  },
  'timer-night': {
    photo: 'night-city', pos: '50% 46%',
    exif: EX('24mm', 'f/1.8', 'ISO 400', '3s', 'EV -0.7', 'WB 3600K'),
    before: bSoft('들고 찍어 흔들린 야간 셀피'),
    after: aAt(50, 50, '난간에 고정하고 타이머')
  },
  'arm-length': {
    photo: 'selfie-stick', pos: '90% 42%',
    exif: EX('24mm', 'f/2.2', 'ISO 64', '1/250s', 'EV 0.0', 'WB 5400K'),
    before: bZoom(1.7, '얼굴에 폰을 바짝 붙임'),
    after: aAt(55, 55, '대화 가능한 거리에서')
  },
  'night-portrait': {
    photo: 'blue-hour-valley', pos: '50% 45%',
    exif: EX('35mm', 'f/2.0', 'ISO 800', '1/15s', 'EV -0.7', 'WB 4300K'),
    before: bSoft('야간 인물 모드에 피사체가 움직임'),
    after: aAt(47, 40, '1~2초 · 피사체 정지')
  },
  'phone-flip': {
    photo: 'lowangle-street', pos: '50% 42%',
    exif: EX('24mm', 'f/2.2', 'ISO 100', '1/320s', 'EV 0.0', 'WB 5800K'),
    before: bCenter(1.15, '허리 높이로 들고 촬영'),
    after: aAt(44, 45, '폰을 뒤집어 렌즈를 낮게')
  },
  'solo-ultrawide': {
    photo: 'wide-selfie', pos: '50% 50%',
    exif: EX('13mm', 'f/2.2', 'ISO 50', '1/800s', 'EV 0.0', 'WB 5600K'),
    before: bZoom(1.45, '배경이 잘린 셀피'),
    after: aAt(38, 55, '0.5x로 배경 광활하게')
  },

  /* ── 인물·포즈 +9 ────────────────────────── */
  'pose-angle': {
    photo: 'lean-wall', pos: '68% 38%',
    exif: EX('85mm', 'f/2.0', 'ISO 100', '1/400s', 'EV 0.0', 'WB 5600K'),
    before: bCenter(1.2, '정면으로 딱 서기'),
    after: aAt(54, 28, '몸통 30~45도 · 얼굴만 정면', ['thirds', 'dots'])
  },
  'pose-weight': {
    photo: 'walking-candid', pos: '55% 48%',
    exif: EX('50mm', 'f/2.8', 'ISO 200', '1/400s', 'EV 0.0', 'WB 5400K'),
    before: bCenter(1.15, '양발에 똑같이 힘을 줌'),
    after: aAt(46, 45, '한쪽 다리에 체중')
  },
  'pose-hands': {
    photo: 'bokeh-portrait', pos: '50% 45%',
    exif: EX('35mm', 'f/2.0', 'ISO 320', '1/125s', 'EV 0.3', 'WB 4800K'),
    before: bZoom(1.25, '손을 몸에 꽉 붙임'),
    after: aAt(50, 68, '손에 역할 주기')
  },
  'pose-chin': {
    photo: 'window-portrait', pos: '45% 45%',
    exif: EX('50mm', 'f/1.8', 'ISO 200', '1/160s', 'EV 0.3', 'WB 5000K'),
    before: bCenter(1.22, '턱을 뒤로 당김'),
    after: aAt(28, 28, '턱 1cm 앞으로', ['thirds', 'dots'])
  },
  'pose-gaze': {
    photo: 'lean-wall', pos: '68% 38%',
    exif: EX('85mm', 'f/2.0', 'ISO 100', '1/320s', 'EV 0.0', 'WB 5600K'),
    before: bZoom(1.3, '렌즈만 계속 응시'),
    after: aAt(54, 28, '보는 컷·비키는 컷 나눠')
  },
  'pose-laugh': {
    photo: 'bokeh-portrait', pos: '50% 45%',
    exif: EX('35mm', 'f/2.0', 'ISO 320', '1/125s', 'EV 0.3', 'WB 4800K'),
    before: bCenter(1.2, '웃어보세요만 반복'),
    after: aAt(40, 30, '질문으로 웃음 유도')
  },
  'pose-bg': {
    photo: 'window-portrait', pos: '45% 45%',
    exif: EX('50mm', 'f/1.8', 'ISO 200', '1/160s', 'EV 0.3', 'WB 5000K'),
    before: bZoom(1.2, '머리 뒤 기둥이 겹침'),
    after: aAt(28, 28, '머리 뒤·얼굴 선 정리')
  },
  'pose-horizon-neck': {
    photo: 'horizon-sea', pos: '55% 62%',
    exif: EX('26mm', 'f/4.0', 'ISO 50', '1/640s', 'EV -0.3', 'WB 5600K'),
    before: bTilt(1.6, '수평선이 목을 가로지름', 1.08),
    after: aAt(67, 62, '수평선을 목 아래로', ['thirds', 'level'])
  },
  'pose-center': {
    photo: 'architecture-symmetry', pos: '50% 50%',
    exif: EX('24mm', 'f/5.6', 'ISO 100', '1/125s', 'EV 0.0', 'WB 5200K'),
    before: bCenter(1.2, '중앙인데 좌우 배경이 제각각'),
    after: aAt(50, 55, '중앙 배치는 좌우 대칭', ['thirds', 'level'])
  },

  /* ── 풍경·여행지 +10 ─────────────────────── */
  'third-line': {
    photo: 'lake-reflection', pos: '50% 50%',
    exif: EX('24mm', 'f/4.0', 'ISO 100', '1/320s', 'EV -0.3', 'WB 6200K'),
    before: bTilt(-2.8, '지상인데 상단선에 수평선'),
    after: aAt(50, 55, '지상은 하단 가로선', ['thirds', 'level'])
  },
  'sea-ev': {
    photo: 'horizon-sea', pos: '55% 62%',
    exif: EX('26mm', 'f/4.0', 'ISO 50', '1/1000s', 'EV -1.0', 'WB 6000K'),
    before: bBlow('반사광에 하늘·물이 날아감'),
    after: aAt(67, 62, 'EV 낮춰 색 살리기', ['thirds', 'level'])
  },
  'mountain-scale': {
    photo: 'blue-hour-valley', pos: '50% 45%',
    exif: EX('35mm', 'f/4.0', 'ISO 200', '1/250s', 'EV -0.3', 'WB 5000K'),
    before: bZoom(1.35, '사람이 화면을 꽉 채움'),
    after: aAt(47, 40, '사람을 작게 · 산의 규모')
  },
  'foreground': {
    photo: 'leading-lines', pos: '50% 52%',
    exif: EX('28mm', 'f/5.6', 'ISO 100', '1/250s', 'EV 0.0', 'WB 5600K'),
    before: bCenter(0.95, '전경 없이 민둥산만'),
    after: aAt(48, 46, '전경 사물로 깊이')
  },
  'orientation': {
    photo: 'frame-in-frame', pos: '50% 52%',
    exif: EX('35mm', 'f/4.0', 'ISO 200', '1/250s', 'EV 0.0', 'WB 5400K'),
    before: bZoom(1.4, '세로 대상을 가로로 잘라'),
    after: aAt(50, 55, '넓으면 가로, 길면 세로')
  },
  'magic-hour': {
    photo: 'sunset-silhouette', pos: '55% 62%',
    exif: EX('50mm', 'f/2.8', 'ISO 100', '1/1000s', 'EV -0.7', 'WB 6000K'),
    before: bFlat('한낮에 찍어 색이 밋밋'),
    after: aAt(33, 55, '해 뜨기 전·진 후 30분', ['thirds', 'level'])
  },
  'city-reflection': {
    photo: 'rainy-puddle', pos: '50% 55%',
    exif: EX('24mm', 'f/2.0', 'ISO 640', '1/30s', 'EV -0.7', 'WB 3800K'),
    before: bCenter(1.1, '반사 없이 위에서만'),
    after: aAt(50, 60, '유리·물에 비친 도시', ['thirds', 'level'])
  },
  'vertical-line': {
    photo: 'architecture-symmetry', pos: '50% 50%',
    exif: EX('24mm', 'f/5.6', 'ISO 100', '1/160s', 'EV 0.0', 'WB 5200K'),
    before: bTilt(-3.6, '건물 수직선이 기움'),
    after: aAt(50, 55, '격자로 수직선 맞추기', ['thirds', 'level'])
  },
  'snow-contrast': {
    photo: 'color-contrast', pos: '100% 55%',
    exif: EX('50mm', 'f/4.0', 'ISO 100', '1/500s', 'EV 0.7', 'WB 5600K'),
    before: bFlat('색이 많아 주인공이 없음'),
    after: aAt(67, 62, '색 수를 줄여 대비', ['thirds', 'dots'])
  },
  'snow-flash': {
    photo: 'rain-streak', pos: '50% 50%',
    exif: EX('26mm', 'f/2.2', 'ISO 100', '1/200s', 'EV 0.0', 'WB 5600K'),
    before: bDark('플래시를 꺼서 눈송이가 안 보임'),
    after: aAt(50, 45, '플래시로 눈송이 살리기')
  },

  /* ── 카페·음식 +10 ───────────────────────── */
  'food-window-60': {
    photo: 'cafe-window-food', pos: '45% 55%',
    exif: EX('35mm', 'f/2.2', 'ISO 200', '1/160s', 'EV 0.3', 'WB 4800K'),
    before: bFlat('창문에서 멀리 · 빛이 부족'),
    after: aAt(40, 60, '창문 60~90cm 옆빛')
  },
  'food-ceiling': {
    photo: 'cafe-window-food', pos: '45% 55%',
    exif: EX('35mm', 'f/2.2', 'ISO 200', '1/125s', 'EV 0.3', 'WB 4600K'),
    before: bBlow('천장등까지 켜 그림자가 두 개'),
    after: aAt(40, 60, '천장등 끄고 창가만')
  },
  'food-reflector': {
    photo: 'cafe-overhead', pos: '50% 50%',
    exif: EX('26mm', 'f/2.8', 'ISO 200', '1/125s', 'EV 0.3', 'WB 5000K'),
    before: bDark('한쪽이 새까맣게'),
    after: aAt(33, 45, '반대편 흰 종이로 반사')
  },
  'food-clean': {
    photo: 'cafe-overhead', pos: '50% 50%',
    exif: EX('26mm', 'f/2.8', 'ISO 200', '1/160s', 'EV 0.3', 'WB 5000K'),
    before: bZoom(1.15, '접시 테두리 얼룩 그대로'),
    after: aAt(33, 45, '접시·테이블 닦기')
  },
  'food-one-prop': {
    photo: 'food-side', pos: '45% 52%',
    exif: EX('50mm', 'f/1.8', 'ISO 400', '1/100s', 'EV 0.3', 'WB 4600K'),
    before: bZoom(1.2, '소품이 음식을 가림'),
    after: aAt(55, 52, '소품 1~2개만')
  },
  'food-45': {
    photo: 'food-side', pos: '45% 52%',
    exif: EX('50mm', 'f/1.8', 'ISO 400', '1/125s', 'EV 0.3', 'WB 4600K'),
    before: bZoom(1.3, '어중간한 각도'),
    after: aAt(55, 52, '45도가 기본')
  },
  'food-eye': {
    photo: 'food-side', pos: '45% 52%',
    exif: EX('50mm', 'f/2.0', 'ISO 400', '1/100s', 'EV 0.3', 'WB 4600K'),
    before: bCenter(1.15, '음료를 위에서만'),
    after: aAt(55, 52, '컵 높이 아이레벨')
  },
  'food-odd': {
    photo: 'cafe-overhead', pos: '50% 50%',
    exif: EX('26mm', 'f/2.8', 'ISO 200', '1/125s', 'EV 0.3', 'WB 5000K'),
    before: bCenter(1.2, '접시 두 개를 나란히'),
    after: aAt(33, 45, '3·5개 홀수 배치')
  },
  'food-many': {
    photo: 'food-macro', pos: '50% 48%',
    exif: EX('13mm', 'f/2.4', 'ISO 200', '1/200s', 'EV 0.3', 'WB 4800K'),
    before: bZoom(1.35, '한 장 찍고 자리를 뜸'),
    after: aAt(50, 50, '한 접시 10~15장')
  },
  'food-edit': {
    photo: 'cafe-overhead', pos: '50% 50%',
    exif: EX('26mm', 'f/2.8', 'ISO 200', '1/125s', 'EV 0.3', 'WB 5000K'),
    before: bFlat('보정 없이 어둡고 칙칙'),
    after: aAt(33, 45, '크롭·밝기·채도·선명도')
  },

  /* ── 야경·역광·감성 +12 ──────────────────── */
  'night-magic-30': {
    photo: 'sunset-silhouette', pos: '55% 62%',
    exif: EX('50mm', 'f/2.8', 'ISO 100', '1/400s', 'EV -0.7', 'WB 6500K'),
    before: bFlat('완전히 어두워진 뒤 촬영'),
    after: aAt(33, 55, '해 진 뒤 30분 매직아워', ['thirds', 'level'])
  },
  'night-tripod': {
    photo: 'light-trail', pos: '50% 55%',
    exif: EX('24mm', 'f/1.8', 'ISO 100', '2s', 'EV -1.0', 'WB 4000K'),
    before: bSoft('손으로 들고 장노출'),
    after: aAt(60, 55, '삼각대·난간에 고정')
  },
  'night-pro-auto': {
    photo: 'night-city', pos: '50% 46%',
    exif: EX('24mm', 'f/1.8', 'ISO 500', '1/8s', 'EV -0.7', 'WB 3600K'),
    before: bBlow('자동 모드 · 노출 강제 상승'),
    after: aAt(50, 50, '프로 모드로 노출 낮추기')
  },
  'night-shutter': {
    photo: 'light-trail', pos: '50% 55%',
    exif: EX('24mm', 'f/1.8', 'ISO 100', '1/2s', 'EV -1.0', 'WB 4000K'),
    before: bDark('1/20초 · 너무 어둡게'),
    after: aAt(60, 55, '1초 이상 · 밝기 확보')
  },
  'night-iso400': {
    photo: 'rainy-puddle', pos: '50% 55%',
    exif: EX('24mm', 'f/1.8', 'ISO 400', '1s', 'EV -0.7', 'WB 3600K'),
    before: bBlow('ISO 3200 · 노이즈 범벅'),
    after: aAt(50, 60, 'ISO 400 · 1초 안팎', ['thirds', 'level'])
  },
  'night-flash-off': {
    photo: 'night-city', pos: '50% 46%',
    exif: EX('24mm', 'f/1.8', 'ISO 800', '1/15s', 'EV -0.7', 'WB 3600K'),
    before: bBlow('플래시로 앞만 하얗게'),
    after: aAt(50, 50, '플래시 끄기 · 2~3m 한계')
  },
  'night-live-off': {
    photo: 'fireworks', pos: '50% 42%',
    exif: EX('24mm', 'f/1.8', 'ISO 50', '2s', 'EV -1.0', 'WB 4200K'),
    before: bSoft('라이브 포토 켜서 야간모드가 꺼짐'),
    after: aAt(50, 30, '라이브 포토 끄기')
  },
  'night-crosshair': {
    photo: 'star-field', pos: '50% 44%',
    exif: EX('24mm', 'f/1.8', 'ISO 3200', '10s', 'EV -1.7', 'WB 3900K'),
    before: bSoft('움직여도 그냥 촬영'),
    after: aAt(50, 40, '십자선 정렬로 흔들림 감소', ['thirds', 'level'])
  },
  'night-motion': {
    photo: 'light-trail', pos: '50% 55%',
    exif: EX('24mm', 'f/1.8', 'ISO 200', '4s', 'EV -1.2', 'WB 4000K'),
    before: bDark('짧은 노출로 궤적이 없음'),
    after: aAt(60, 55, '장노출로 궤적 만들기')
  },
  'night-sodium-wb': {
    photo: 'rain-streak', pos: '50% 50%',
    exif: EX('35mm', 'f/2.5', 'ISO 800', '1/60s', 'EV -0.7', 'WB 3000K'),
    before: bFlat('나트륨등 누런 색 그대로'),
    after: aAt(50, 45, 'WB로 누런 기운 잡기')
  },
  'night-star-15s': {
    photo: 'star-field', pos: '50% 44%',
    exif: EX('24mm', 'f/1.8', 'ISO 3200', '15s', 'EV -2.0', 'WB 3900K'),
    before: bSoft('30초 노출로 별이 선이 됨'),
    after: aAt(50, 40, '10~15초 · 궤적 방지', ['thirds', 'level'])
  },
  'night-star-mf': {
    photo: 'milkyway', pos: '50% 40%',
    exif: EX('24mm', 'f/1.8', 'ISO 3200', '12s', 'EV -2.0', 'WB 3900K'),
    before: bSoft('자동 초점으로 별이 뭉개짐'),
    after: aAt(50, 28, '수동 초점 · 점처럼 선명하게', ['thirds', 'level'])
  }
});
