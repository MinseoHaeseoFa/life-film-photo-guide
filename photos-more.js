/* 인생이라는 필름 — 사진 매핑 (2부: 카드 52장)
   photos.js 의 PHOTOS·프리셋(bTilt·bZoom·bBlow·bDark·bSoft·bFlat·bCenter·aAt)을 그대로 씁니다. */

Object.assign(MEDIA, {
  'horizon-thirds': {
    photo: 'horizon-sea', pos: '50% 70%',
    exif: EX('26mm', 'f/4.0', 'ISO 50', '1/640s', 'EV -0.3', 'WB 5600K'),
    before: bTilt(1.8, '수평선 한가운데 · 두 동강', 1.1),
    after: aAt(50, 70, '수평선 아래 1/3', ['thirds', 'level'])
  },
  'leading-lines': {
    photo: 'leading-lines', pos: '48% 55%',
    exif: EX('28mm', 'f/4.0', 'ISO 100', '1/250s', 'EV 0.0', 'WB 5600K'),
    before: bCenter(0.92, '선이 끊김 · 깊이 없음'),
    after: aAt(48, 55, '길이 주인공으로 수렴', ['thirds'])
  },
  'symmetry-reflection': {
    photo: 'lake-reflection', pos: '50% 55%',
    exif: EX('24mm', 'f/4.0', 'ISO 100', '1/320s', 'EV -0.3', 'WB 6200K'),
    before: bTilt(-2.2, '좌우 비대칭 · 중심축 흐트러짐', 1.24),
    after: aAt(50, 55, '좌우 대칭 · 중심축', ['thirds', 'level'])
  },
  'color-contrast': {
    photo: 'color-contrast', pos: '43% 60%',
    exif: EX('50mm', 'f/4.0', 'ISO 100', '1/400s', 'EV -0.3', 'WB 6000K'),
    before: bFlat('색 대비 없음 · 주인공 실종'),
    after: aAt(43, 60, '빨강 하나로 시선 고정', ['thirds', 'dots'])
  },
  'sea-ev': {
    photo: 'sea-ev', pos: '50% 45%',
    exif: EX('26mm', 'f/4.0', 'ISO 50', '1/1000s', 'EV -1.0', 'WB 6000K'),
    before: bBlow('반사광에 하늘·물 날아감'),
    after: aAt(50, 45, 'EV -0.7 · 색 살리기', ['thirds', 'level'])
  },
  'mountain-scale': {
    photo: 'mountain-scale', pos: '63% 55%',
    exif: EX('35mm', 'f/4.0', 'ISO 200', '1/250s', 'EV -0.3', 'WB 5000K'),
    before: bZoom(1.35, '사람이 화면을 꽉 채움'),
    after: aAt(63, 55, '사람을 작게 · 산 규모', ['thirds'])
  },
  'foreground-depth': {
    photo: 'foreground-depth', pos: '45% 55%',
    exif: EX('28mm', 'f/5.6', 'ISO 100', '1/250s', 'EV 0.0', 'WB 5600K'),
    before: bCenter(0.95, '전경 없이 민둥산만'),
    after: aAt(45, 55, '전경 사물로 깊이', ['thirds'])
  },
  'orientation': {
    photo: 'orientation', pos: '50% 45%',
    exif: EX('35mm', 'f/4.0', 'ISO 200', '1/250s', 'EV 0.0', 'WB 5400K'),
    before: bZoom(1.4, '세로 대상을 가로로 잘라'),
    after: aAt(50, 45, '길면 세로', ['thirds'])
  },
  'overcast-soft': {
    photo: 'overcast-soft', pos: '68% 50%',
    exif: EX('50mm', 'f/2.8', 'ISO 400', '1/125s', 'EV 0.3', 'WB 5600K'),
    before: bFlat('흐린 하늘 절반 · 회색 벽'),
    after: aAt(68, 50, '하늘 1/4 · 확산광', ['thirds'])
  },
  'fog-layers': {
    photo: 'fog-layers', pos: '50% 50%',
    exif: EX('35mm', 'f/4.0', 'ISO 200', '1/200s', 'EV -0.5', 'WB 6000K'),
    before: bBlow('밝게 올려 전체가 하얀 화면'),
    after: aAt(50, 50, '노출 -0.5 · 능선 3단', ['thirds', 'level'])
  },
  'repetition-pattern': {
    photo: 'repetition-pattern', pos: '50% 45%',
    exif: EX('35mm', 'f/5.6', 'ISO 200', '1/125s', 'EV 0.0', 'WB 5200K'),
    before: bCenter(1.2, '반복이 잘려 리듬 끊김'),
    after: aAt(50, 45, '10~20도 비껴 리듬', ['thirds'])
  },
  'minimal-space': {
    photo: 'minimal-space', pos: '47% 45%',
    exif: EX('35mm', 'f/4.0', 'ISO 100', '1/800s', 'EV +0.7', 'WB 5600K'),
    before: bZoom(1.3, '여백에 잡동사니'),
    after: aAt(47, 45, '여백 90% · 피사체 10%', ['thirds', 'dots'])
  },
  'street-wait': {
    photo: 'street-wait', pos: '62% 50%',
    exif: EX('35mm', 'f/4.0', 'ISO 200', '1/500s', 'EV -0.3', 'WB 5600K'),
    before: bCenter(1.2, '사람 쫓다 배경 어수선'),
    after: aAt(62, 50, '빈 배경에서 기다리기', ['thirds'])
  },
  'flower-low': {
    photo: 'flower-low', pos: '25% 60%',
    exif: EX('24mm', 'f/2.4', 'ISO 100', '1/400s', 'EV 0.3', 'WB 5200K'),
    before: bCenter(1.15, '서서 내려다봄 · 흙이 보임'),
    after: aAt(25, 60, '꽃 높이 · 앞 꽃 흐림', ['thirds'])
  },
  'snow-flash': {
    photo: 'snow-flash', pos: '15% 45%',
    exif: EX('26mm', 'f/2.2', 'ISO 100', '1/200s', 'EV 0.0', 'WB 5600K'),
    before: bDark('플래시 꺼서 눈송이 안 보임'),
    after: aAt(15, 45, '플래시로 눈송이 살리기', ['thirds'])
  },
  'panorama': {
    photo: 'panorama', pos: '50% 50%',
    exif: EX('24mm', 'f/4.0', 'ISO 100', '1/400s', 'EV -0.3', 'WB 5600K'),
    before: bTilt(-3, '팔만 돌려 휘어진 파노라마', 1.1),
    after: aAt(50, 50, '몸을 축으로 수평 유지', ['thirds', 'level'])
  },
  'food-window-light': {
    photo: 'cafe-window-food', pos: '45% 65%',
    exif: EX('35mm', 'f/2.2', 'ISO 200', '1/160s', 'EV 0.3', 'WB 4800K'),
    before: bTilt(-3, '천장등 켜짐 · 그림자 두 개', 1.12),
    after: aAt(45, 65, '창가 60~90cm 옆빛', ['thirds'])
  },
  'food-overhead': {
    photo: 'cafe-overhead', pos: '38% 47%',
    exif: EX('26mm', 'f/2.8', 'ISO 200', '1/125s', 'EV 0.0', 'WB 5000K'),
    before: { t: 'rotate(9deg) scale(.9)', f: 'contrast(.95) brightness(1.04)', tone: 'none', warn: 'level', note: '기울어진 탑뷰 · 접시 어긋남' },
    after: aAt(38, 47, '90도 수평 · 접시 정렬', ['thirds', 'level'])
  },
  'food-layer': {
    photo: 'food-side', pos: '65% 55%',
    exif: EX('50mm', 'f/1.8', 'ISO 400', '1/100s', 'EV 0.3', 'WB 4600K'),
    before: bZoom(1.06, '위에서 내려다봄 · 층 안 보임'),
    after: aAt(65, 55, '45도 · 층과 단면', ['thirds'])
  },
  'food-drink-eye': {
    photo: 'food-drink-eye', pos: '50% 45%',
    exif: EX('50mm', 'f/2.0', 'ISO 400', '1/100s', 'EV 0.3', 'WB 4600K'),
    before: bCenter(1.15, '위에서만 찍어 컵이 납작'),
    after: aAt(50, 45, '컵 높이 아이레벨', ['thirds'])
  },
  'food-macro': {
    photo: 'food-macro', pos: '45% 45%',
    exif: EX('13mm', 'f/2.4', 'ISO 200', '1/200s', 'EV 0.3', 'WB 4800K'),
    before: { t: 'scale(.72)', f: 'blur(.8px) contrast(.94)', tone: 'blur', warn: 'none', note: '멀리서 · 질감이 안 보임' },
    after: aAt(45, 45, '3~5cm 접사', ['thirds'])
  },
  'food-reflector': {
    photo: 'food-reflector', pos: '55% 55%',
    exif: EX('35mm', 'f/2.2', 'ISO 200', '1/125s', 'EV 0.3', 'WB 5000K'),
    before: bDark('한쪽이 새까맣게'),
    after: aAt(55, 55, '흰 종이로 반사', ['thirds'])
  },
  'food-clean': {
    photo: 'food-clean', pos: '50% 55%',
    exif: EX('26mm', 'f/2.8', 'ISO 200', '1/160s', 'EV 0.3', 'WB 5000K'),
    before: bZoom(1.15, '접시 테두리 얼룩'),
    after: aAt(50, 55, '접시·테이블 닦기', ['thirds'])
  },
  'food-prop': {
    photo: 'food-prop', pos: '48% 50%',
    exif: EX('50mm', 'f/2.0', 'ISO 400', '1/125s', 'EV 0.3', 'WB 4800K'),
    before: bZoom(1.2, '소품이 음식을 가림'),
    after: aAt(48, 50, '소품 1~2개만', ['thirds'])
  },
  'food-odd': {
    photo: 'food-odd', pos: '50% 50%',
    exif: EX('26mm', 'f/2.8', 'ISO 200', '1/125s', 'EV 0.3', 'WB 5000K'),
    before: bCenter(1.2, '접시 두 개를 나란히'),
    after: aAt(50, 50, '3·5개 홀수 배치', ['thirds'])
  },
  'food-edit': {
    photo: 'food-edit', pos: '50% 50%',
    exif: EX('26mm', 'f/2.8', 'ISO 200', '1/160s', 'EV 0.3', 'WB 5000K'),
    before: bFlat('보정 없이 어둡고 칙칙'),
    after: aAt(50, 50, '크롭·밝기·채도·선명도', ['thirds'])
  },
  'food-steam': {
    photo: 'food-steam', pos: '45% 60%',
    exif: EX('50mm', 'f/2.0', 'ISO 800', '1/80s', 'EV -0.3', 'WB 4600K'),
    before: bDark('정면광 · 김이 사라짐'),
    after: aAt(45, 60, '역광으로 김 살리기', ['thirds'])
  },
  'food-with-person': {
    photo: 'cafe-person-bokeh', pos: '65% 55%',
    exif: EX('35mm', 'f/2.0', 'ISO 320', '1/125s', 'EV 0.3', 'WB 4800K'),
    before: bZoom(1.4, '얼굴만 크게 · 음식 밀려남'),
    after: aAt(65, 55, '컵 든 손 하나', ['thirds'])
  },
  'food-table-wide': {
    photo: 'food-table-wide', pos: '50% 55%',
    exif: EX('24mm', 'f/3.5', 'ISO 400', '1/100s', 'EV 0.3', 'WB 4600K'),
    before: bZoom(1.5, '가까이서 접시 절반 잘림'),
    after: aAt(50, 55, '광각 · 60~70도', ['thirds'])
  },
  'food-action': {
    photo: 'food-action', pos: '55% 60%',
    exif: EX('50mm', 'f/1.8', 'ISO 400', '1/250s', 'EV 0.3', 'WB 4600K'),
    before: bSoft('셔터 느려 손이 번짐'),
    after: aAt(55, 60, '1/250초 · 붓는 순간', ['thirds'])
  },
  'food-plating': {
    photo: 'food-plating', pos: '60% 55%',
    exif: EX('50mm', 'f/2.2', 'ISO 200', '1/160s', 'EV 0.3', 'WB 5000K'),
    before: bCenter(1.2, '접시 정중앙 · 답답함'),
    after: aAt(60, 55, '대각선 · 여백 한쪽', ['thirds'])
  },
  'rain-streak': {
    photo: 'rain-streak', pos: '50% 45%',
    exif: EX('70mm', 'f/2.8', 'ISO 50', '1/50s', 'EV -0.3', 'WB 4200K'),
    before: { t: 'scale(1.14)', f: 'contrast(1.12) brightness(.96)', tone: 'none', warn: 'none', note: '1/350 · 빗줄기가 끊겨 어색함' },
    after: aAt(50, 45, '1/50 · 빗줄기가 흐름', ['thirds'])
  },
  'night-city-iso': {
    photo: 'night-city', pos: '50% 50%',
    exif: EX('24mm', 'f/1.8', 'ISO 400', '1s', 'EV -0.7', 'WB 3400K'),
    before: bBlow('밝게 올려 네온이 하얗게 날아감'),
    after: aAt(50, 50, 'ISO 400 · 1초 고정', ['thirds', 'level'])
  },
  'fireworks': {
    photo: 'fireworks', pos: '50% 35%',
    exif: EX('24mm', 'f/1.8', 'ISO 50', '2s', 'EV -1.0', 'WB 4200K'),
    before: bZoom(1.32, '터진 뒤 눌러 불꽃이 잘림'),
    after: aAt(50, 35, '터질 때 · ND16 2초', ['thirds'])
  },
  'light-trail': {
    photo: 'light-trail', pos: '50% 60%',
    exif: EX('24mm', 'f/1.8', 'ISO 100', '2.5s', 'EV -1.0', 'WB 4000K'),
    before: bBlow('1/30 · 차가 그냥 차로 보임'),
    after: aAt(50, 60, '2.5초 · 차가 선이 됨', ['thirds'])
  },
  'milkyway-mode': {
    photo: 'milkyway', pos: '50% 40%',
    exif: EX('24mm', 'f/1.8', 'ISO 3200', '15s', 'EV -2.0', 'WB 3900K'),
    before: bBlow('도시 광해 · 별이 씻겨 사라짐'),
    after: aAt(50, 40, '천체 모드 · 12분', ['thirds', 'level'])
  },
  'sunset-wb': {
    photo: 'sunset-silhouette', pos: '53% 62%',
    exif: EX('50mm', 'f/2.8', 'ISO 100', '1/1600s', 'EV -0.7', 'WB 8000K'),
    before: bFlat('자동 모드 · 노을이 회색으로'),
    after: aAt(53, 62, 'WB 8000K · 색을 붙잡음', ['thirds', 'level'])
  },
  'magic-hour-30': {
    photo: 'magic-hour-30', pos: '50% 45%',
    exif: EX('35mm', 'f/2.8', 'ISO 200', '1/8s', 'EV -0.7', 'WB 4300K'),
    before: bFlat('완전히 어두워진 뒤 촬영'),
    after: aAt(50, 45, '해 진 뒤 30분', ['thirds', 'level'])
  },
  'backlight-rim': {
    photo: 'backlit-portrait', pos: '45% 40%',
    exif: EX('85mm', 'f/2.0', 'ISO 100', '1/2000s', 'EV 0.7', 'WB 5800K'),
    before: bDark('역광에 얼굴이 실루엣'),
    after: aAt(45, 40, '얼굴 노출 + · 윤곽 살림', ['thirds'])
  },
  'night-flash-off': {
    photo: 'night-flash-off', pos: '50% 50%',
    exif: EX('35mm', 'f/2.0', 'ISO 800', '1/60s', 'EV -0.7', 'WB 3600K'),
    before: bBlow('플래시로 앞만 하얗게'),
    after: aAt(50, 50, '플래시 끄기 · 2~3m 한계', ['thirds'])
  },
  'night-live-off': {
    photo: 'night-live-off', pos: '40% 45%',
    exif: EX('35mm', 'f/1.8', 'ISO 640', '1/15s', 'EV -0.7', 'WB 3600K'),
    before: bSoft('라이브 포토 켜서 야간모드 꺼짐'),
    after: aAt(40, 45, '라이브 포토 끄기', ['thirds'])
  },
  'night-crosshair': {
    photo: 'night-crosshair', pos: '45% 45%',
    exif: EX('24mm', 'f/1.8', 'ISO 200', '4s', 'EV -1.0', 'WB 4000K'),
    before: bSoft('움직여도 그냥 촬영'),
    after: aAt(45, 45, '십자선 정렬', ['thirds', 'level'])
  },
  'night-portrait-bokeh': {
    photo: 'night-portrait-bokeh', pos: '35% 50%',
    exif: EX('85mm', 'f/1.8', 'ISO 800', '1.5s', 'EV -0.7', 'WB 3800K'),
    before: bSoft('피사체가 움직여 얼굴 번짐'),
    after: aAt(35, 50, '1~2초 · 인물 정지', ['thirds'])
  },
  'crowd-erase': {
    photo: 'crowd-erase', pos: '50% 50%',
    exif: EX('24mm', 'f/1.8', 'ISO 100', '10s', 'EV -1.0', 'WB 3800K'),
    before: bZoom(1.3, '서 있는 사람만 남음'),
    after: aAt(50, 50, '10초 · 행인 지우기', ['thirds', 'level'])
  },
  'night-selfie-light': {
    photo: 'night-selfie-light', pos: '50% 36%',
    exif: EX('26mm', 'f/1.8', 'ISO 800', '1/60s', 'EV -0.7', 'WB 3600K'),
    before: bDark('광원에서 멀어 얼굴만 어두움'),
    after: aAt(50, 36, '간판 빛 앞 한 발짝 · 얼굴 노출', ['thirds'])
  },
  'pet-eye': {
    photo: 'pet-eye', pos: '55% 50%',
    exif: EX('26mm', 'f/1.8', 'ISO 400', '1/125s', 'EV 0.0', 'WB 5200K'),
    before: bZoom(1.5, '서서 내려다본 구도'),
    after: aAt(55, 50, '눈높이 · 눈에 초점', ['thirds'])
  },
  'stairs-angle': {
    photo: 'stairs-angle', pos: '50% 50%',
    exif: EX('16mm', 'f/2.2', 'ISO 200', '1/250s', 'EV -0.3', 'WB 5400K'),
    before: bZoom(1.22, '수평으로만 담아 밋밋함'),
    after: aAt(50, 50, '아래에서 올려다본 대각선', ['thirds', 'level'])
  },
  'exhibit-glass': {
    photo: 'exhibit-glass', pos: '48% 45%',
    exif: EX('26mm', 'f/1.8', 'ISO 800', '1/60s', 'EV -0.7', 'WB 3400K'),
    before: bBlow('정면 유리 반사로 하얗게 날아감'),
    after: aAt(48, 45, '각도를 비껴 반사 제거', ['thirds'])
  },
  'window-glass': {
    photo: 'window-glass', pos: '52% 50%',
    exif: EX('26mm', 'f/1.8', 'ISO 100', '1/500s', 'EV -0.3', 'WB 5800K'),
    before: bSoft('유리에서 떼어 반사·흔들림'),
    after: aAt(52, 50, '렌즈를 유리에 밀착', ['thirds'])
  },
  'market-food': {
    photo: 'market-food', pos: '55% 55%',
    exif: EX('26mm', 'f/1.8', 'ISO 800', '1/125s', 'EV -0.7', 'WB 3800K'),
    before: bBlow('매대 조명에 흰 접시가 날아감'),
    after: aAt(55, 55, '밝기 -1칸 · 색온도 낮춤', ['thirds'])
  },
  'night-market': {
    photo: 'night-market', pos: '50% 50%',
    exif: EX('26mm', 'f/1.8', 'ISO 3200', '1/125s', 'EV -0.5', 'WB 3600K'),
    before: bSoft('어두워 셔터가 느려 사람이 뭉개짐'),
    after: aAt(50, 50, 'ISO 3200 · 1/125초', ['thirds'])
  },
  'night-mode-choice': {
    photo: 'night-mode-choice', pos: '50% 48%',
    exif: EX('26mm', 'f/1.8', 'ISO 1600', '1/125s', 'EV -0.7', 'WB 3800K'),
    before: bSoft('야간 모드로 걷는 사람이 겹침'),
    after: aAt(50, 48, '일반 모드 · 움직임 정지', ['thirds'])
  },
  'hotel-room': {
    photo: 'hotel-room', pos: '50% 50%',
    exif: EX('16mm', 'f/2.2', 'ISO 200', '1/60s', 'EV 0.0', 'WB 5000K'),
    before: bTilt(-3.4, '방 한가운데서 기울게 찍음', 1.0),
    after: aAt(50, 50, '구석 · 허리 높이 · 수직', ['thirds', 'level'])
  },
  'subject-face': {
    photo: 'subject-face', pos: '52% 50%',
    exif: EX('50mm', 'f/4.0', 'ISO 100', '1/500s', 'EV -0.3', 'WB 5600K'),
    before: bZoom(1.4, '비스듬히 담아 힘이 빠짐'),
    after: aAt(52, 50, '정면에서 똑바로', ['thirds'])
  },
});
