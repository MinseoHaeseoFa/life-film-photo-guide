/* 인생이라는 필름 — 실사 사진 에셋과 뷰파인더 메타데이터 (1부: 카드 48장)
   assets/img/*.jpg 는 35mm 필름 룩으로 만든 에디토리얼 사진입니다(실제 촬영지·인물 기록 아님).
   100장 카드가 100장의 서로 다른 사진을 하나씩 쓰도록 1:1 매핑했고, 뷰파인더 초점 좌표는
   각 사진에서 주 피사체가 실제로 있는 위치에 맞췄습니다. */

const PHOTOS = {
  'grid-level': { src: 'assets/img/grid-level.jpg', w: 900, h: 600, alt: '바다 수평선에 폰을 수평으로 맞춘 여행자' },
  'lens-button': { src: 'assets/img/lens-button.jpg', w: 900, h: 600, alt: '호수 풍경을 폰 렌즈로 담는 손' },
  'exposure-slider': { src: 'assets/img/exposure-slider.jpg', w: 900, h: 600, alt: '역광 속에서도 얼굴이 살아난 여성' },
  'af-lock': { src: 'assets/img/af-lock.jpg', w: 900, h: 1350, alt: '군중 속 왼쪽 1/3에 선 남자와 선명한 눈' },
  'timer': { src: 'assets/img/timer.jpg', w: 900, h: 600, alt: '석양의 해변 난간에 세워 둔 스마트폰' },
  'steady-grip': { src: 'assets/img/steady-grip.jpg', w: 900, h: 600, alt: '두 손으로 감싸 쥐고 밤거리를 찍는 사람' },
  'remote-shutter': { src: 'assets/img/remote-shutter.jpg', w: 900, h: 600, alt: '이어폰을 꽂고 축제를 찍는 사진가' },
  'pro-triangle': { src: 'assets/img/pro-triangle.jpg', w: 900, h: 600, alt: '블루아워 도시를 삼각대 위 폰으로 찍는 사람' },
  'wb-kelvin': { src: 'assets/img/wb-kelvin.jpg', w: 900, h: 596, alt: '나트륨등 아래 흰 간판이 빛나는 밤 골목' },
  'snow-ev': { src: 'assets/img/snow-ev.jpg', w: 900, h: 600, alt: '햇살에 반짝이는 눈 덮인 마을 길' },
  'night-mode-time': { src: 'assets/img/night-mode-time.jpg', w: 900, h: 600, alt: '좁은 밤 골목을 향해 폰을 든 사람' },
  'portrait-distance': { src: 'assets/img/portrait-distance.jpg', w: 900, h: 599, alt: '벚꽃 배경 1m 앞에 선 여성' },
  'portrait-light': { src: 'assets/img/portrait-light.jpg', w: 900, h: 1350, alt: '어두운 배경에 조명을 받은 남자의 얼굴' },
  'raw-format': { src: 'assets/img/raw-format.jpg', w: 900, h: 600, alt: '호숫가 삼각대 위 카메라와 해질녘 산' },
  'cherry-blossom': { src: 'assets/img/cherry-blossom.jpg', w: 1280, h: 853, alt: '파란 하늘 아래 핀 벚꽃' },
  'selfie-stick': { src: 'assets/img/selfie-stick.jpg', w: 1280, h: 852, alt: '골목에서 셀카봉을 든 여성의 셀피' },
  'selfie-distance': { src: 'assets/img/selfie-distance.jpg', w: 900, h: 600, alt: '골목에서 팔을 뻗어 찍은 셀피' },
  'selfie-place': { src: 'assets/img/selfie-place.jpg', w: 1280, h: 852, alt: '난간에 세운 폰과 그 앞에 선 여성' },
  'water-bottle-marker': { src: 'assets/img/water-bottle-marker.jpg', w: 1280, h: 853, alt: '호숫가 난간 위에 세워 둔 물병' },
  'traveler-viewpoint': { src: 'assets/img/traveler-viewpoint.jpg', w: 1280, h: 853, alt: '셀카봉을 높이 든 여행자의 뒷모습과 해안' },
  'walking-candid': { src: 'assets/img/walking-candid.jpg', w: 1280, h: 853, alt: '햇살 드는 골목을 걷는 남자의 전신' },
  'wide-selfie': { src: 'assets/img/wide-selfie.jpg', w: 1280, h: 853, alt: '광장에서 초광각으로 찍은 두 사람' },
  'ratio': { src: 'assets/img/ratio.jpg', w: 900, h: 600, alt: '거대한 계단식 차밭 아래 작게 선 여행자' },
  'blue-hour-valley': { src: 'assets/img/blue-hour-valley.jpg', w: 1280, h: 853, alt: '블루아워 전망대에서 계곡을 바라보는 인물' },
  'phone-flip': { src: 'assets/img/phone-flip.jpg', w: 900, h: 600, alt: '젖은 거리 바닥 낮은 곳에서 든 폰과 신발' },
  'many-angles': { src: 'assets/img/many-angles.jpg', w: 900, h: 600, alt: '전망대에서 폰으로 사진을 찍는 여행자' },
  'shadow-self': { src: 'assets/img/shadow-self.jpg', w: 900, h: 600, alt: '낮은 해에 길게 뻗은 여행자의 그림자' },
  'selfie-story-3': { src: 'assets/img/selfie-story-3.jpg', w: 900, h: 600, alt: '해안도로를 걷는 배낭 여행자의 전신' },
  'mirror-selfie': { src: 'assets/img/mirror-selfie.jpg', w: 900, h: 649, alt: '빈티지 호텔에서 거울 셀피를 찍는 여성' },
  'request-stranger': { src: 'assets/img/request-stranger.jpg', w: 900, h: 600, alt: '산길에서 지나가는 사람에게 폰을 건네는 여행자' },
  'window-portrait': { src: 'assets/img/window-portrait.jpg', w: 1280, h: 853, alt: '창가 빛을 받는 여성의 상반신' },
  'bokeh-portrait': { src: 'assets/img/bokeh-portrait.jpg', w: 1280, h: 853, alt: '두 손으로 컵을 쥔 여성과 흐려진 배경' },
  'lean-wall': { src: 'assets/img/lean-wall.jpg', w: 1280, h: 852, alt: '벽 옆에서 몸을 튼 채 선 여성' },
  'leaning-railing': { src: 'assets/img/leaning-railing.jpg', w: 1280, h: 853, alt: '바다를 향해 난간에 기댄 여성' },
  'frame-in-frame': { src: 'assets/img/frame-in-frame.jpg', w: 1280, h: 853, alt: '아치 문틀 안의 인물과 가을 정원' },
  'space': { src: 'assets/img/space.jpg', w: 900, h: 600, alt: '흰 벽 오른쪽 끝에서 왼쪽 여백을 바라보는 여성' },
  'lowangle-street': { src: 'assets/img/lowangle-street.jpg', w: 1280, h: 853, alt: '지면 가까이에서 올려 담은 골목의 전신' },
  'crop': { src: 'assets/img/crop.jpg', w: 900, h: 1350, alt: '베이지 배경 앞 전신 인물과 두 손' },
  'shoulder-line': { src: 'assets/img/shoulder-line.jpg', w: 900, h: 600, alt: '한쪽 어깨를 카메라로 향한 코트 차림 남성' },
  'chin-forward': { src: 'assets/img/chin-forward.jpg', w: 900, h: 720, alt: '턱을 살짝 앞으로 내민 여성의 클로즈업' },
  'gaze-split': { src: 'assets/img/gaze-split.jpg', w: 900, h: 600, alt: '창밖을 바라보는 여성의 옆얼굴' },
  'laugh-question': { src: 'assets/img/laugh-question.jpg', w: 900, h: 600, alt: '카페에서 자연스럽게 웃는 두 친구' },
  'bg-check': { src: 'assets/img/bg-check.jpg', w: 900, h: 600, alt: '머리 뒤가 깨끗한 하늘인 야외 인물' },
  'horizon-neck': { src: 'assets/img/horizon-neck.jpg', w: 900, h: 600, alt: '바닷가에서 수평선이 목 아래로 지나는 여성' },
  'architecture-symmetry': { src: 'assets/img/architecture-symmetry.jpg', w: 1280, h: 853, alt: '좌우 대칭 아치 회랑' },
  'weight-shift': { src: 'assets/img/weight-shift.jpg', w: 900, h: 1350, alt: '벽 앞에서 한쪽 다리에 체중을 둔 여성' },
  'seated-pose': { src: 'assets/img/seated-pose.jpg', w: 900, h: 600, alt: '벤치 끝에 걸터앉아 앞으로 기운 남성' },
  'pair-pose': { src: 'assets/img/pair-pose.jpg', w: 900, h: 600, alt: '언덕에 어깨를 맞대고 선 두 친구' },
  'horizon-sea': { src: 'assets/img/horizon-sea.jpg', w: 1280, h: 853, alt: '수평선 아래 1/3에 맞춘 잔잔한 바다와 해변' },
  'leading-lines': { src: 'assets/img/leading-lines.jpg', w: 1280, h: 853, alt: '먼 산으로 이어지는 도로의 소실점' },
  'lake-reflection': { src: 'assets/img/lake-reflection.jpg', w: 1280, h: 853, alt: '수면에 산이 그대로 비치는 호수' },
  'color-contrast': { src: 'assets/img/color-contrast.jpg', w: 1280, h: 853, alt: '회색 콘크리트 사이의 빨간 코트' },
  'eye-level-change': { src: 'assets/img/eye-level-change.jpg', w: 900, h: 600, alt: '바닥 높이에서 올려다본 광장과 비둘기' },
  'sea-ev': { src: 'assets/img/sea-ev.jpg', w: 900, h: 600, alt: '짙푸른 하늘과 청록 바다의 해안' },
  'mountain-scale': { src: 'assets/img/mountain-scale.jpg', w: 900, h: 600, alt: '거대한 산맥 앞 능선 위의 작은 등산객' },
  'foreground-depth': { src: 'assets/img/foreground-depth.jpg', w: 900, h: 600, alt: '이끼 낀 바위 전경과 뒤의 산맥' },
  'orientation': { src: 'assets/img/orientation.jpg', w: 900, h: 1352, alt: '숲 속 세로로 긴 폭포' },
  'vertical-line': { src: 'assets/img/vertical-line.jpg', w: 900, h: 1350, alt: '수직 기둥이 늘어선 건물 정면' },
  'overcast-soft': { src: 'assets/img/overcast-soft.jpg', w: 900, h: 600, alt: '흐린 숲길을 걷는 여성과 부드러운 빛' },
  'rain-window': { src: 'assets/img/rain-window.jpg', w: 900, h: 600, alt: '카페 유리 위 물방울과 바깥 보케' },
  'fog-layers': { src: 'assets/img/fog-layers.jpg', w: 900, h: 600, alt: '안개 속에 겹겹이 이어진 산 능선' },
  'repetition-pattern': { src: 'assets/img/repetition-pattern.jpg', w: 900, h: 600, alt: '반복되는 아치 회랑과 끝의 작은 인물' },
  'minimal-space': { src: 'assets/img/minimal-space.jpg', w: 900, h: 600, alt: '눈밭에 홀로 선 나무와 큰 여백' },
  'street-wait': { src: 'assets/img/street-wait.jpg', w: 900, h: 600, alt: '햇살 드는 빈 거리를 건너는 한 사람' },
  'flower-low': { src: 'assets/img/flower-low.jpg', w: 900, h: 600, alt: '지면 높이에서 담은 들꽃과 흐려진 앞 꽃' },
  'snow-flash': { src: 'assets/img/snow-flash.jpg', w: 900, h: 597, alt: '플래시에 잡힌 눈송이와 밤 보케' },
  'panorama': { src: 'assets/img/panorama.jpg', w: 900, h: 392, alt: '산맥 사이로 이어진 강 계곡의 파노라마' },
  'cafe-window-food': { src: 'assets/img/cafe-window-food.jpg', w: 1280, h: 853, alt: '비 내리는 창가의 라테와 크루아상' },
  'cafe-overhead': { src: 'assets/img/cafe-overhead.jpg', w: 1280, h: 853, alt: '탑뷰로 담은 라테와 치즈케이크' },
  'food-side': { src: 'assets/img/food-side.jpg', w: 1280, h: 1024, alt: '층이 보이게 담은 버거와 아이스 라테' },
  'food-drink-eye': { src: 'assets/img/food-drink-eye.jpg', w: 900, h: 600, alt: '컵 높이에서 담은 아이스 라테의 층' },
  'food-macro': { src: 'assets/img/food-macro.jpg', w: 1280, h: 853, alt: '접사로 담은 딸기 생크림 케이크 단면' },
  'food-reflector': { src: 'assets/img/food-reflector.jpg', w: 900, h: 600, alt: '창가 옆빛과 흰 냅킨 반사판을 쓴 파스타' },
  'food-clean': { src: 'assets/img/food-clean.jpg', w: 900, h: 598, alt: '테두리를 닦은 깨끗한 브런치 접시' },
  'food-prop': { src: 'assets/img/food-prop.jpg', w: 900, h: 600, alt: '포크와 냅킨만 곁들인 케이크 한 조각' },
  'food-odd': { src: 'assets/img/food-odd.jpg', w: 900, h: 600, alt: '간격을 달리해 놓은 디저트 세 접시' },
  'food-many': { src: 'assets/img/food-many.jpg', w: 900, h: 600, alt: '카페에서 여러 각도로 음식을 찍는 사람' },
  'food-edit': { src: 'assets/img/food-edit.jpg', w: 900, h: 600, alt: '색이 살아 있는 샐러드 볼' },
  'food-steam': { src: 'assets/img/food-steam.jpg', w: 900, h: 600, alt: '역광을 받아 김이 피어오르는 수프' },
  'cafe-person-bokeh': { src: 'assets/img/cafe-person-bokeh.jpg', w: 1280, h: 1923, alt: '컵을 든 사람과 흐려진 카페 배경' },
  'food-table-wide': { src: 'assets/img/food-table-wide.jpg', w: 900, h: 600, alt: '60도 높이에서 담은 한 상 차림' },
  'food-action': { src: 'assets/img/food-action.jpg', w: 900, h: 600, alt: '팬케이크 위로 꿀이 떨어지는 순간' },
  'food-plating': { src: 'assets/img/food-plating.jpg', w: 900, h: 600, alt: '대각선으로 놓인 디저트 접시와 여백' },
  'rainy-puddle': { src: 'assets/img/rainy-puddle.jpg', w: 1280, h: 853, alt: '네온이 반사되는 밤 물웅덩이' },
  'rain-streak': { src: 'assets/img/rain-streak.jpg', w: 1280, h: 853, alt: '가로등 빛에 드러난 빗줄기와 보케' },
  'night-city': { src: 'assets/img/night-city.jpg', w: 1280, h: 853, alt: '네온이 반사되는 밤 골목' },
  'fireworks': { src: 'assets/img/fireworks.jpg', w: 1280, h: 853, alt: '도시 위로 터진 불꽃의 장노출' },
  'light-trail': { src: 'assets/img/light-trail.jpg', w: 1280, h: 853, alt: '곡선 도로를 지나는 차량 불빛 궤적' },
  'milkyway': { src: 'assets/img/milkyway.jpg', w: 1280, h: 853, alt: '산 능선 위로 걸린 은하수' },
  'star-field': { src: 'assets/img/star-field.jpg', w: 1280, h: 853, alt: '호수에 별이 내려앉은 밤하늘과 텐트' },
  'sunset-silhouette': { src: 'assets/img/sunset-silhouette.jpg', w: 1280, h: 853, alt: '노을 하늘을 배경으로 선 두 사람의 실루엣' },
  'magic-hour-30': { src: 'assets/img/magic-hour-30.jpg', w: 900, h: 600, alt: '블루아워 도심 스카이라인과 강' },
  'backlit-portrait': { src: 'assets/img/backlit-portrait.jpg', w: 1280, h: 853, alt: '노을을 등지고 선 인물의 역광 윤곽' },
  'night-flash-off': { src: 'assets/img/night-flash-off.jpg', w: 900, h: 600, alt: '등불이 밝은 야시장 거리' },
  'night-live-off': { src: 'assets/img/night-live-off.jpg', w: 900, h: 600, alt: '어두운 거리에서 폰 화면을 보는 여성' },
  'night-crosshair': { src: 'assets/img/night-crosshair.jpg', w: 900, h: 600, alt: '장노출로 담은 야간 교량과 빛 궤적' },
  'night-motion': { src: 'assets/img/night-motion.jpg', w: 900, h: 600, alt: '장노출로 흐려진 관람차의 원형 궤적' },
  'night-sodium-wb': { src: 'assets/img/night-sodium-wb.jpg', w: 900, h: 603, alt: '나트륨등 아래 주황빛 지하 통로' },
  'night-portrait-bokeh': { src: 'assets/img/night-portrait-bokeh.jpg', w: 900, h: 600, alt: '도시 불빛 보케를 배경으로 한 여성' },
  'crowd-erase': { src: 'assets/img/crowd-erase.jpg', w: 900, h: 598, alt: '장노출로 행인이 흐려진 밤 광장' },
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
    photo: 'grid-level', pos: '50% 40%',
    exif: EX('26mm', 'f/1.8', 'ISO 50', '1/500s', 'EV -0.3', 'WB 5600K'),
    before: bTilt(-4.2, '수평 -4.2° · 지평선 흘러내림', 1.0),
    after: aAt(50, 40, '수평 0.0° · 격자 정렬', ['thirds', 'level'])
  },
  'lens-button': {
    photo: 'lens-button', pos: '52% 50%',
    exif: EX('28mm', 'f/1.8', 'ISO 64', '1/800s', 'EV 0.0', 'WB 5600K'),
    before: bZoom(2.15, '디지털 줌 3.9배 · 화질 저하'),
    after: aAt(52, 50, '렌즈 버튼 1x · 화질 유지', ['thirds'])
  },
  'exposure-slider': {
    photo: 'exposure-slider', pos: '50% 32%',
    exif: EX('50mm', 'f/1.8', 'ISO 100', '1/1000s', 'EV -0.7', 'WB 5200K'),
    before: bDark('하늘에 노출 · 얼굴 -2.0EV'),
    after: aAt(50, 32, '얼굴 터치 · EV -0.5', ['thirds'])
  },
  'af-lock': {
    photo: 'af-lock', pos: '38% 35%',
    exif: EX('85mm', 'f/1.8', 'ISO 200', '1/250s', 'EV 0.0', 'WB 5600K'),
    before: bZoom(1.6, '초점이 배경으로 도망'),
    after: aAt(38, 35, 'AE/AF 잠금 후 재구도', ['thirds', 'dots'])
  },
  'timer': {
    photo: 'timer', pos: '91% 48%',
    exif: EX('24mm', 'f/1.8', 'ISO 400', '1/4s', 'EV -0.3', 'WB 3800K'),
    before: bSoft('셔터 누른 손이 폰을 흔듦'),
    after: aAt(91, 48, '고정 + 3초 타이머', ['thirds'])
  },
  'steady-grip': {
    photo: 'steady-grip', pos: '50% 48%',
    exif: EX('24mm', 'f/1.8', 'ISO 800', '1/8s', 'EV -0.7', 'WB 3600K'),
    before: bSoft('팔만 뻗어 든 채 흔들림'),
    after: aAt(50, 48, '팔꿈치 붙이고 두 손', ['thirds'])
  },
  'remote-shutter': {
    photo: 'remote-shutter', pos: '55% 45%',
    exif: EX('24mm', 'f/1.8', 'ISO 50', '2s', 'EV -1.0', 'WB 4200K'),
    before: bSoft('셔터 진동이 남음'),
    after: aAt(55, 45, '이어폰·워치로 원격 촬영', ['thirds'])
  },
  'pro-triangle': {
    photo: 'pro-triangle', pos: '50% 43%',
    exif: EX('24mm', 'f/1.8', 'ISO 400', '1/4s', 'EV -0.3', 'WB 3800K'),
    before: bBlow('자동 모드로 노출만 올림'),
    after: aAt(50, 43, 'ISO 400 · 셔터로 밝기', ['thirds', 'level'])
  },
  'wb-kelvin': {
    photo: 'wb-kelvin', pos: '30% 45%',
    exif: EX('35mm', 'f/2.0', 'ISO 400', '1/60s', 'EV -0.7', 'WB 3000K'),
    before: bFlat('자동 WB · 나트륨등에 끌림'),
    after: aAt(30, 45, 'WB 3000K로 직접 조정', ['thirds'])
  },
  'snow-ev': {
    photo: 'snow-ev', pos: '55% 55%',
    exif: EX('26mm', 'f/2.0', 'ISO 50', '1/800s', 'EV +1.3', 'WB 5600K'),
    before: bDark('EV 0 · 눈이 회색'),
    after: aAt(55, 55, 'EV +1.3 · 눈이 하얗게', ['thirds', 'level'])
  },
  'night-mode-time': {
    photo: 'night-mode-time', pos: '35% 45%',
    exif: EX('24mm', 'f/1.8', 'ISO 640', '3s', 'EV -0.7', 'WB 3600K'),
    before: bBlow('야간 모드 최소 시간 · 어둡게'),
    after: aAt(35, 45, '노출 시간 직접 선택', ['thirds'])
  },
  'portrait-distance': {
    photo: 'portrait-distance', pos: '48% 35%',
    exif: EX('85mm', 'f/2.4', 'ISO 100', '1/250s', 'EV 0.3', 'WB 5200K'),
    before: bZoom(1.6, '30cm보다 가까이 · 흐림 실패'),
    after: aAt(48, 35, '30cm~2m · 배경 흐림', ['thirds'])
  },
  'portrait-light': {
    photo: 'portrait-light', pos: '45% 35%',
    exif: EX('85mm', 'f/2.0', 'ISO 100', '1/500s', 'EV 0.3', 'WB 5400K'),
    before: bDark('조명 없이 역광만'),
    after: aAt(45, 35, '스튜디오·스테이지 조명', ['thirds'])
  },
  'raw-format': {
    photo: 'raw-format', pos: '30% 70%',
    exif: EX('24mm', 'f/1.8', 'ISO 3200', '15s', 'EV -2.0', 'WB 3900K'),
    before: bBlow('JPEG 저장 · 계조 뭉개짐'),
    after: aAt(30, 70, 'RAW+JPEG로 촬영', ['thirds', 'level'])
  },
  'grading': {
    photo: 'cherry-blossom', pos: '55% 30%',
    exif: EX('50mm', 'f/2.0', 'ISO 50', '1/640s', 'EV 0.0', 'WB 5200K'),
    before: bFlat('자동 모드 · 흰 꽃이 회색'),
    after: aAt(55, 30, '대비 -10 · 채도 +10', ['thirds'])
  },
  'selfie-height': {
    photo: 'selfie-stick', pos: '25% 50%',
    exif: EX('24mm', 'f/2.2', 'ISO 64', '1/250s', 'EV 0.0', 'WB 5400K'),
    before: bZoom(1.5, '렌즈가 눈 아래 · 여백 0'),
    after: aAt(25, 50, '렌즈 눈+한 뼘', ['thirds'])
  },
  'selfie-distance': {
    photo: 'selfie-distance', pos: '55% 45%',
    exif: EX('24mm', 'f/2.2', 'ISO 64', '1/250s', 'EV 0.0', 'WB 5400K'),
    before: bZoom(1.7, '얼굴에 폰을 바짝 붙임'),
    after: aAt(55, 45, '팔+20cm · 얼굴 1/2 이하', ['thirds'])
  },
  'selfie-place': {
    photo: 'selfie-place', pos: '60% 45%',
    exif: EX('26mm', 'f/1.8', 'ISO 100', '1/320s', 'EV 0.0', 'WB 5600K'),
    before: bSoft('손으로 들고 눌러 흔들림'),
    after: aAt(60, 45, '난간에 고정 · 3초 타이머', ['thirds'])
  },
  'selfie-marker': {
    photo: 'water-bottle-marker', pos: '50% 80%',
    exif: EX('26mm', 'f/2.0', 'ISO 50', '1/500s', 'EV 0.0', 'WB 5800K'),
    before: bZoom(1.5, '물병이 프레임 밖 · 자리 못 잡음'),
    after: aAt(50, 80, '물병 자리에 내가 들어감', ['thirds'])
  },
  'backview': {
    photo: 'traveler-viewpoint', pos: '75% 50%',
    exif: EX('35mm', 'f/4.0', 'ISO 100', '1/500s', 'EV -0.3', 'WB 5600K'),
    before: bTilt(3.4, '수평 3.4° · 인물 한가운데', 1.18),
    after: aAt(75, 50, '인물 우측 1/3 · 수평 0.0°', ['thirds', 'level'])
  },
  'walk-burst': {
    photo: 'walking-candid', pos: '33% 32%',
    exif: EX('50mm', 'f/2.8', 'ISO 200', '1/500s', 'EV 0.0', 'WB 5400K'),
    before: bZoom(1.38, '발끝 잘림 · 멈춰 선 자세'),
    after: aAt(33, 32, '걷는 중간 · 발끝까지', ['thirds'])
  },
  'ultrawide-selfie': {
    photo: 'wide-selfie', pos: '35% 45%',
    exif: EX('13mm', 'f/2.2', 'ISO 50', '1/800s', 'EV 0.0', 'WB 5600K'),
    before: { t: 'scale(1.4) translateX(-24%)', f: 'contrast(1.06) saturate(.92)', tone: 'none', warn: 'crop', note: '얼굴이 가장자리 · 왜곡 심함' },
    after: aAt(35, 45, '얼굴 중앙 · 0.5x', ['thirds'])
  },
  'ratio': {
    photo: 'ratio', pos: '48% 60%',
    exif: EX('35mm', 'f/2.8', 'ISO 400', '1/60s', 'EV -0.7', 'WB 4300K'),
    before: bZoom(1.32, '인물 절반 · 답답한 배분'),
    after: aAt(48, 60, '인물 하단 1/3', ['thirds'])
  },
  'scene-first': {
    photo: 'blue-hour-valley', pos: '50% 50%',
    exif: EX('35mm', 'f/2.8', 'ISO 400', '1/60s', 'EV -0.7', 'WB 4300K'),
    before: bZoom(1.3, '인물부터 넣고 배경은 나중'),
    after: aAt(50, 50, '배경 먼저 · 인물 투입', ['thirds'])
  },
  'phone-flip': {
    photo: 'phone-flip', pos: '70% 40%',
    exif: EX('24mm', 'f/2.2', 'ISO 100', '1/320s', 'EV 0.0', 'WB 5800K'),
    before: bCenter(1.15, '허리 높이로 들고 촬영'),
    after: aAt(70, 40, '폰 뒤집어 렌즈 낮게', ['thirds'])
  },
  'many-angles': {
    photo: 'many-angles', pos: '42% 45%',
    exif: EX('35mm', 'f/4.0', 'ISO 100', '1/500s', 'EV -0.3', 'WB 5600K'),
    before: bCenter(1.25, '한 장만 찍고 자리를 뜸'),
    after: aAt(42, 45, '세 각도 · 세 컷', ['thirds'])
  },
  'shadow-self': {
    photo: 'shadow-self', pos: '50% 65%',
    exif: EX('35mm', 'f/4.0', 'ISO 100', '1/1000s', 'EV -0.3', 'WB 4800K'),
    before: bCenter(1.15, '해를 정면으로 보고 서서 그림자 사라짐'),
    after: aAt(50, 65, '그림자 발끝 하단 1/3', ['thirds', 'level'])
  },
  'selfie-story-3': {
    photo: 'selfie-story-3', pos: '30% 55%',
    exif: EX('35mm', 'f/4.0', 'ISO 100', '1/500s', 'EV -0.3', 'WB 5600K'),
    before: bZoom(1.3, '전신만 열 장 · 표정 없음'),
    after: aAt(30, 55, '전신→얼굴→디테일 3컷', ['thirds'])
  },
  'mirror-selfie': {
    photo: 'mirror-selfie', pos: '45% 40%',
    exif: EX('35mm', 'f/2.5', 'ISO 400', '1/80s', 'EV 0.0', 'WB 3200K'),
    before: { t: 'scale(1.3) translateY(-10%)', f: 'contrast(.96)', tone: 'none', warn: 'crop', note: '폰이 얼굴을 가림' },
    after: aAt(45, 40, '가슴 높이 · 얼굴 가리지 않기', ['thirds'])
  },
  'request-stranger': {
    photo: 'request-stranger', pos: '50% 45%',
    exif: EX('35mm', 'f/4.0', 'ISO 100', '1/500s', 'EV 0.0', 'WB 5600K'),
    before: bZoom(1.4, '얼굴만 크게 · 발끝 잘림'),
    after: aAt(50, 45, '세로 · 발끝까지 · 3장', ['thirds'])
  },
  'eye-thirds': {
    photo: 'window-portrait', pos: '24% 42%',
    exif: EX('50mm', 'f/1.8', 'ISO 200', '1/160s', 'EV 0.3', 'WB 5000K'),
    before: bCenter(1.24, '얼굴 중앙 · 눈이 정중앙'),
    after: aAt(24, 42, '눈 = 위쪽 교차점', ['thirds', 'dots'])
  },
  'hands-role': {
    photo: 'bokeh-portrait', pos: '53% 36%',
    exif: EX('35mm', 'f/2.0', 'ISO 400', '1/125s', 'EV 0.3', 'WB 4800K'),
    before: bZoom(1.2, '손이 프레임 아래로 잘림'),
    after: aAt(53, 36, '손에 역할 · 컵을 쥐게', ['thirds'])
  },
  'body-turn': {
    photo: 'lean-wall', pos: '62% 45%',
    exif: EX('85mm', 'f/2.0', 'ISO 100', '1/400s', 'EV 0.0', 'WB 5600K'),
    before: bCenter(1.28, '정면 · 증명사진 각도'),
    after: aAt(62, 45, '몸 45도 · 얼굴만 정면', ['thirds', 'dots'])
  },
  'lean': {
    photo: 'leaning-railing', pos: '30% 40%',
    exif: EX('50mm', 'f/2.4', 'ISO 100', '1/500s', 'EV -0.3', 'WB 5200K'),
    before: bTilt(2.6, '수평 2.6° · 팔이 붙음', 1.12),
    after: aAt(30, 40, '한쪽만 기대 사선', ['thirds', 'level'])
  },
  'frame-in-frame': {
    photo: 'frame-in-frame', pos: '50% 55%',
    exif: EX('35mm', 'f/4.0', 'ISO 200', '1/250s', 'EV 0.0', 'WB 5400K'),
    before: bZoom(1.65, '문틀이 잘려 액자 사라짐'),
    after: aAt(50, 55, '문틀 = 액자', ['thirds'])
  },
  'space': {
    photo: 'space', pos: '85% 35%',
    exif: EX('35mm', 'f/4.0', 'ISO 100', '1/640s', 'EV -0.3', 'WB 5600K'),
    before: { t: 'scale(1.42) translateX(15%)', f: 'contrast(.96)', tone: 'none', warn: 'crop', note: '여백 없음 · 시선 막힘' },
    after: aAt(85, 35, '시선 방향에 여백 2/3', ['thirds'])
  },
  'low-angle': {
    photo: 'lowangle-street', pos: '40% 45%',
    exif: EX('24mm', 'f/2.2', 'ISO 100', '1/320s', 'EV 0.0', 'WB 5800K'),
    before: { t: 'scale(1.18) translateY(-7%)', f: 'contrast(.94) saturate(.92)', tone: 'none', warn: 'crop', note: '허리 높이 · 다리 짧음' },
    after: aAt(40, 45, '로우앵글 · 발끝까지', ['thirds'])
  },
  'crop': {
    photo: 'crop', pos: '50% 45%',
    exif: EX('50mm', 'f/2.8', 'ISO 200', '1/200s', 'EV 0.0', 'WB 5400K'),
    before: { t: 'scale(1.34) translateY(-15%)', f: 'contrast(.96)', tone: 'none', warn: 'crop', note: '손목에서 잘림 · 어색한 경계' },
    after: aAt(50, 45, '관절 사이에서 자름', ['thirds'])
  },
  'shoulder-line': {
    photo: 'shoulder-line', pos: '55% 45%',
    exif: EX('85mm', 'f/2.0', 'ISO 100', '1/400s', 'EV 0.0', 'WB 5600K'),
    before: bCenter(1.2, '어깨를 치켜세움'),
    after: aAt(55, 45, '렌즈 쪽 어깨 내리기', ['thirds'])
  },
  'chin-forward': {
    photo: 'chin-forward', pos: '48% 40%',
    exif: EX('85mm', 'f/1.8', 'ISO 200', '1/250s', 'EV 0.3', 'WB 5200K'),
    before: bCenter(1.22, '턱을 뒤로 당김'),
    after: aAt(48, 40, '턱 1cm 앞으로', ['thirds', 'dots'])
  },
  'gaze-split': {
    photo: 'gaze-split', pos: '35% 40%',
    exif: EX('85mm', 'f/2.0', 'ISO 200', '1/200s', 'EV 0.3', 'WB 5000K'),
    before: bZoom(1.3, '렌즈만 계속 응시'),
    after: aAt(35, 40, '렌즈 컷 + 비키는 컷', ['thirds'])
  },
  'laugh-question': {
    photo: 'laugh-question', pos: '52% 35%',
    exif: EX('35mm', 'f/2.0', 'ISO 400', '1/125s', 'EV 0.3', 'WB 4800K'),
    before: bCenter(1.2, '웃어보세요만 반복'),
    after: aAt(52, 35, '질문으로 웃음 유도', ['thirds'])
  },
  'bg-check': {
    photo: 'bg-check', pos: '45% 40%',
    exif: EX('85mm', 'f/2.2', 'ISO 100', '1/500s', 'EV 0.0', 'WB 5600K'),
    before: bZoom(1.2, '머리 뒤 기둥이 겹침'),
    after: aAt(45, 40, '머리 뒤·얼굴 선 정리', ['thirds'])
  },
  'horizon-neck': {
    photo: 'horizon-neck', pos: '65% 50%',
    exif: EX('50mm', 'f/4.0', 'ISO 100', '1/640s', 'EV -0.3', 'WB 5600K'),
    before: bTilt(1.6, '수평선이 목을 가로지름', 1.08),
    after: aAt(65, 50, '수평선을 목 아래로', ['thirds', 'level'])
  },
  'center-symmetric': {
    photo: 'architecture-symmetry', pos: '50% 50%',
    exif: EX('24mm', 'f/5.6', 'ISO 100', '1/125s', 'EV 0.0', 'WB 5200K'),
    before: bCenter(1.2, '중앙인데 좌우 제각각'),
    after: aAt(50, 50, '좌우 대칭 중앙', ['thirds', 'level'])
  },
  'weight-shift': {
    photo: 'weight-shift', pos: '50% 45%',
    exif: EX('50mm', 'f/2.8', 'ISO 200', '1/400s', 'EV 0.0', 'WB 5400K'),
    before: bCenter(1.15, '양발에 똑같이 힘'),
    after: aAt(50, 45, '한쪽 다리에 체중', ['thirds'])
  },
  'seated-pose': {
    photo: 'seated-pose', pos: '32% 40%',
    exif: EX('50mm', 'f/2.0', 'ISO 400', '1/200s', 'EV 0.0', 'WB 5200K'),
    before: bCenter(1.2, '등을 붙여 뒤로 젖혀짐'),
    after: aAt(32, 40, '의자 끝 · 상체 앞으로', ['thirds'])
  },
  'pair-pose': {
    photo: 'pair-pose', pos: '48% 35%',
    exif: EX('50mm', 'f/4.0', 'ISO 100', '1/500s', 'EV 0.0', 'WB 5600K'),
    before: bZoom(1.3, '두 사람 사이가 벌어짐'),
    after: aAt(48, 35, '안쪽 어깨 겹치기', ['thirds'])
  },
};
