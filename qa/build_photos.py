#!/usr/bin/env python3
"""photos.js / photos-more.js 생성기 (v3 시점 기록).
카드 = 이미지 1:1 매핑, 각 사진의 실제 피사체 위치에 초점 좌표(fx·fy)를 맞춘다.
NOTE: 아래 R 목록은 2026-11-21 v3 시점의 카드 구성입니다. 이후 v4·v5에서 카드가 교체·추가되어
현재 photos*.js 와 100% 일치하지 않으므로, 재생성에 쓰기 전에 R 목록을 현재 cards 와 대조해야 합니다.
"""
import os
from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
IMG = os.path.join(ROOT, 'assets', 'img')

# (카드id, 사진키, alt, EXIF(6), before, fx, fy, after_note, guides)
R = [
# ── 세팅 ──
('grid-level','grid-level','바다 수평선에 폰을 수평으로 맞춘 여행자','26mm|f/1.8|ISO 50|1/500s|EV -0.3|WB 5600K','tilt|-4.2|수평 -4.2° · 지평선 흘러내림|1.0',50,40,'수평 0.0° · 격자 정렬','thirds,level'),
('lens-button','lens-button','호수 풍경을 폰 렌즈로 담는 손','28mm|f/1.8|ISO 64|1/800s|EV 0.0|WB 5600K','zoom|2.15|디지털 줌 3.9배 · 화질 저하',52,50,'렌즈 버튼 1x · 화질 유지','thirds'),
('exposure-slider','exposure-slider','역광 속에서도 얼굴이 살아난 여성','50mm|f/1.8|ISO 100|1/1000s|EV -0.7|WB 5200K','dark|하늘에 노출 · 얼굴 -2.0EV',50,32,'얼굴 터치 · EV -0.5','thirds'),
('af-lock','af-lock','군중 속 왼쪽 1/3에 선 남자와 선명한 눈','85mm|f/1.8|ISO 200|1/250s|EV 0.0|WB 5600K','zoom|1.6|초점이 배경으로 도망',38,35,'AE/AF 잠금 후 재구도','thirds,dots'),
('timer','timer','석양의 해변 난간에 세워 둔 스마트폰','24mm|f/1.8|ISO 400|1/4s|EV -0.3|WB 3800K','soft|셔터 누른 손이 폰을 흔듦',91,48,'고정 + 3초 타이머','thirds'),
('steady-grip','steady-grip','두 손으로 감싸 쥐고 밤거리를 찍는 사람','24mm|f/1.8|ISO 800|1/8s|EV -0.7|WB 3600K','soft|팔만 뻗어 든 채 흔들림',50,48,'팔꿈치 붙이고 두 손','thirds'),
('remote-shutter','remote-shutter','이어폰을 꽂고 축제를 찍는 사진가','24mm|f/1.8|ISO 50|2s|EV -1.0|WB 4200K','soft|셔터 진동이 남음',55,45,'이어폰·워치로 원격 촬영','thirds'),
('pro-triangle','pro-triangle','블루아워 도시를 삼각대 위 폰으로 찍는 사람','24mm|f/1.8|ISO 400|1/4s|EV -0.3|WB 3800K','blow|자동 모드로 노출만 올림',50,43,'ISO 400 · 셔터로 밝기','thirds,level'),
('wb-kelvin','wb-kelvin','나트륨등 아래 흰 간판이 빛나는 밤 골목','35mm|f/2.0|ISO 400|1/60s|EV -0.7|WB 3000K','flat|자동 WB · 나트륨등에 끌림',30,45,'WB 3000K로 직접 조정','thirds'),
('snow-ev','snow-ev','햇살에 반짝이는 눈 덮인 마을 길','26mm|f/2.0|ISO 50|1/800s|EV +1.3|WB 5600K','dark|EV 0 · 눈이 회색',55,55,'EV +1.3 · 눈이 하얗게','thirds,level'),
('night-mode-time','night-mode-time','좁은 밤 골목을 향해 폰을 든 사람','24mm|f/1.8|ISO 640|3s|EV -0.7|WB 3600K','blow|야간 모드 최소 시간 · 어둡게',35,45,'노출 시간 직접 선택','thirds'),
('portrait-distance','portrait-distance','벚꽃 배경 1m 앞에 선 여성','85mm|f/2.4|ISO 100|1/250s|EV 0.3|WB 5200K','zoom|1.6|30cm보다 가까이 · 흐림 실패',48,35,'30cm~2m · 배경 흐림','thirds'),
('portrait-light','portrait-light','어두운 배경에 조명을 받은 남자의 얼굴','85mm|f/2.0|ISO 100|1/500s|EV 0.3|WB 5400K','dark|조명 없이 역광만',45,35,'스튜디오·스테이지 조명','thirds'),
('raw-format','raw-format','호숫가 삼각대 위 카메라와 해질녘 산','24mm|f/1.8|ISO 3200|15s|EV -2.0|WB 3900K','blow|JPEG 저장 · 계조 뭉개짐',30,70,'RAW+JPEG로 촬영','thirds,level'),
('grading','cherry-blossom','파란 하늘 아래 핀 벚꽃','50mm|f/2.0|ISO 50|1/640s|EV 0.0|WB 5200K','flat|자동 모드 · 흰 꽃이 회색',55,30,'대비 -10 · 채도 +10','thirds'),

# ── 혼자 여행 ──
('selfie-height','selfie-stick','골목에서 셀카봉을 든 여성의 셀피','24mm|f/2.2|ISO 64|1/250s|EV 0.0|WB 5400K','zoom|1.5|렌즈가 눈 아래 · 여백 0',25,50,'렌즈 눈+한 뼘','thirds'),
('selfie-distance','selfie-distance','골목에서 팔을 뻗어 찍은 셀피','24mm|f/2.2|ISO 64|1/250s|EV 0.0|WB 5400K','zoom|1.7|얼굴에 폰을 바짝 붙임',55,45,'팔+20cm · 얼굴 1/2 이하','thirds'),
('selfie-place','selfie-place','난간에 세운 폰과 그 앞에 선 여성','26mm|f/1.8|ISO 100|1/320s|EV 0.0|WB 5600K','soft|손으로 들고 눌러 흔들림',60,45,'난간에 고정 · 3초 타이머','thirds'),
('selfie-marker','water-bottle-marker','호숫가 난간 위에 세워 둔 물병','26mm|f/2.0|ISO 50|1/500s|EV 0.0|WB 5800K','zoom|1.5|물병이 프레임 밖 · 자리 못 잡음',50,80,'물병 자리에 내가 들어감','thirds'),
('backview','traveler-viewpoint','셀카봉을 높이 든 여행자의 뒷모습과 해안','35mm|f/4.0|ISO 100|1/500s|EV -0.3|WB 5600K','tilt|3.4|수평 3.4° · 인물 한가운데|1.18',75,50,'인물 우측 1/3 · 수평 0.0°','thirds,level'),
('walk-burst','walking-candid','햇살 드는 골목을 걷는 남자의 전신','50mm|f/2.8|ISO 200|1/500s|EV 0.0|WB 5400K','zoom|1.38|발끝 잘림 · 멈춰 선 자세',33,32,'걷는 중간 · 발끝까지','thirds'),
('ultrawide-selfie','wide-selfie','광장에서 초광각으로 찍은 두 사람','13mm|f/2.2|ISO 50|1/800s|EV 0.0|WB 5600K','custom|scale(1.4) translateX(-24%)|contrast(1.06) saturate(.92)|none|crop|얼굴이 가장자리 · 왜곡 심함',35,45,'얼굴 중앙 · 0.5x','thirds'),
('ratio','ratio','거대한 계단식 차밭 아래 작게 선 여행자','35mm|f/2.8|ISO 400|1/60s|EV -0.7|WB 4300K','zoom|1.32|인물 절반 · 답답한 배분',48,60,'인물 하단 1/3','thirds'),
('scene-first','blue-hour-valley','블루아워 전망대에서 계곡을 바라보는 인물','35mm|f/2.8|ISO 400|1/60s|EV -0.7|WB 4300K','zoom|1.3|인물부터 넣고 배경은 나중',50,50,'배경 먼저 · 인물 투입','thirds'),
('phone-flip','phone-flip','젖은 거리 바닥 낮은 곳에서 든 폰과 신발','24mm|f/2.2|ISO 100|1/320s|EV 0.0|WB 5800K','center|1.15|허리 높이로 들고 촬영',70,40,'폰 뒤집어 렌즈 낮게','thirds'),
('many-angles','many-angles','전망대에서 폰으로 사진을 찍는 여행자','35mm|f/4.0|ISO 100|1/500s|EV -0.3|WB 5600K','center|1.25|한 장만 찍고 자리를 뜸',42,45,'세 각도 · 세 컷','thirds'),
('shadow-self','shadow-self','낮은 해에 길게 뻗은 여행자의 그림자','35mm|f/4.0|ISO 100|1/1000s|EV -0.3|WB 4800K','center|1.15|해를 정면으로 보고 서서 그림자 사라짐',50,65,'그림자 발끝 하단 1/3','thirds,level'),
('selfie-story-3','selfie-story-3','해안도로를 걷는 배낭 여행자의 전신','35mm|f/4.0|ISO 100|1/500s|EV -0.3|WB 5600K','zoom|1.3|전신만 열 장 · 표정 없음',30,55,'전신→얼굴→디테일 3컷','thirds'),
('mirror-selfie','mirror-selfie','빈티지 호텔에서 거울 셀피를 찍는 여성','35mm|f/2.5|ISO 400|1/80s|EV 0.0|WB 3200K','custom|scale(1.3) translateY(-10%)|contrast(.96)|none|crop|폰이 얼굴을 가림',45,40,'가슴 높이 · 얼굴 가리지 않기','thirds'),
('request-stranger','request-stranger','산길에서 지나가는 사람에게 폰을 건네는 여행자','35mm|f/4.0|ISO 100|1/500s|EV 0.0|WB 5600K','zoom|1.4|얼굴만 크게 · 발끝 잘림',50,45,'세로 · 발끝까지 · 3장','thirds'),

# ── 인물·포즈 ──
('eye-thirds','eye-thirds','눈이 위쪽 교차점에 놓인 창가 인물','50mm|f/1.8|ISO 200|1/160s|EV 0.3|WB 5000K','center|1.24|얼굴 중앙 · 눈이 정중앙',33,33,'눈 = 위쪽 교차점','thirds,dots'),
('hands-role','bokeh-portrait','두 손으로 컵을 쥔 여성과 흐려진 배경','35mm|f/2.0|ISO 400|1/125s|EV 0.3|WB 4800K','zoom|1.2|손이 프레임 아래로 잘림',53,36,'손에 역할 · 컵을 쥐게','thirds'),
('body-turn','lean-wall','벽 옆에서 몸을 튼 채 선 여성','85mm|f/2.0|ISO 100|1/400s|EV 0.0|WB 5600K','center|1.28|정면 · 증명사진 각도',62,45,'몸 45도 · 얼굴만 정면','thirds,dots'),
('lean','leaning-railing','바다를 향해 난간에 기댄 여성','50mm|f/2.4|ISO 100|1/500s|EV -0.3|WB 5200K','tilt|2.6|수평 2.6° · 팔이 붙음|1.12',30,40,'한쪽만 기대 사선','thirds,level'),
('frame-in-frame','frame-in-frame','아치 문틀 안의 인물과 가을 정원','35mm|f/4.0|ISO 200|1/250s|EV 0.0|WB 5400K','zoom|1.65|문틀이 잘려 액자 사라짐',50,55,'문틀 = 액자','thirds'),
('space','space','흰 벽 오른쪽 끝에서 왼쪽 여백을 바라보는 여성','35mm|f/4.0|ISO 100|1/640s|EV -0.3|WB 5600K','custom|scale(1.42) translateX(15%)|contrast(.96)|none|crop|여백 없음 · 시선 막힘',85,35,'시선 방향에 여백 2/3','thirds'),
('low-angle','lowangle-street','지면 가까이에서 올려 담은 골목의 전신','24mm|f/2.2|ISO 100|1/320s|EV 0.0|WB 5800K','custom|scale(1.18) translateY(-7%)|contrast(.94) saturate(.92)|none|crop|허리 높이 · 다리 짧음',40,45,'로우앵글 · 발끝까지','thirds'),
('crop','crop','베이지 배경 앞 전신 인물과 두 손','50mm|f/2.8|ISO 200|1/200s|EV 0.0|WB 5400K','custom|scale(1.34) translateY(-15%)|contrast(.96)|none|crop|손목에서 잘림 · 어색한 경계',50,45,'관절 사이에서 자름','thirds'),
('shoulder-line','shoulder-line','한쪽 어깨를 카메라로 향한 코트 차림 남성','85mm|f/2.0|ISO 100|1/400s|EV 0.0|WB 5600K','center|1.2|어깨를 치켜세움',55,45,'렌즈 쪽 어깨 내리기','thirds'),
('chin-forward','chin-forward','턱을 살짝 앞으로 내민 여성의 클로즈업','85mm|f/1.8|ISO 200|1/250s|EV 0.3|WB 5200K','center|1.22|턱을 뒤로 당김',48,40,'턱 1cm 앞으로','thirds,dots'),
('gaze-split','gaze-split','창밖을 바라보는 여성의 옆얼굴','85mm|f/2.0|ISO 200|1/200s|EV 0.3|WB 5000K','zoom|1.3|렌즈만 계속 응시',35,40,'렌즈 컷 + 비키는 컷','thirds'),
('laugh-question','laugh-question','카페에서 자연스럽게 웃는 두 친구','35mm|f/2.0|ISO 400|1/125s|EV 0.3|WB 4800K','center|1.2|웃어보세요만 반복',52,35,'질문으로 웃음 유도','thirds'),
('bg-check','bg-check','머리 뒤가 깨끗한 하늘인 야외 인물','85mm|f/2.2|ISO 100|1/500s|EV 0.0|WB 5600K','zoom|1.2|머리 뒤 기둥이 겹침',45,40,'머리 뒤·얼굴 선 정리','thirds'),
('horizon-neck','horizon-neck','바닷가에서 수평선이 목 아래로 지나는 여성','50mm|f/4.0|ISO 100|1/640s|EV -0.3|WB 5600K','tilt|1.6|수평선이 목을 가로지름|1.08',65,50,'수평선을 목 아래로','thirds,level'),
('center-symmetric','architecture-symmetry','좌우 대칭 아치 회랑','24mm|f/5.6|ISO 100|1/125s|EV 0.0|WB 5200K','center|1.2|중앙인데 좌우 제각각',50,50,'좌우 대칭 중앙','thirds,level'),
('weight-shift','weight-shift','벽 앞에서 한쪽 다리에 체중을 둔 여성','50mm|f/2.8|ISO 200|1/400s|EV 0.0|WB 5400K','center|1.15|양발에 똑같이 힘',50,45,'한쪽 다리에 체중','thirds'),
('seated-pose','seated-pose','벤치 끝에 걸터앉아 앞으로 기운 남성','50mm|f/2.0|ISO 400|1/200s|EV 0.0|WB 5200K','center|1.2|등을 붙여 뒤로 젖혀짐',32,40,'의자 끝 · 상체 앞으로','thirds'),
('pair-pose','pair-pose','언덕에 어깨를 맞대고 선 두 친구','50mm|f/4.0|ISO 100|1/500s|EV 0.0|WB 5600K','zoom|1.3|두 사람 사이가 벌어짐',48,35,'안쪽 어깨 겹치기','thirds'),

# ── 풍경·여행지 ──
('horizon-thirds','horizon-sea','수평선 아래 1/3에 맞춘 잔잔한 바다와 해변','26mm|f/4.0|ISO 50|1/640s|EV -0.3|WB 5600K','tilt|1.8|수평선 한가운데 · 두 동강|1.1',50,70,'수평선 아래 1/3','thirds,level'),
('leading-lines','leading-lines','먼 산으로 이어지는 도로의 소실점','28mm|f/4.0|ISO 100|1/250s|EV 0.0|WB 5600K','center|0.92|선이 끊김 · 깊이 없음',48,55,'길이 주인공으로 수렴','thirds'),
('symmetry-reflection','lake-reflection','수면에 산이 그대로 비치는 호수','24mm|f/4.0|ISO 100|1/320s|EV -0.3|WB 6200K','tilt|-2.2|좌우 비대칭 · 중심축 흐트러짐|1.24',50,55,'좌우 대칭 · 중심축','thirds,level'),
('color-contrast','color-contrast','회색 콘크리트 사이의 빨간 코트','50mm|f/4.0|ISO 100|1/400s|EV -0.3|WB 6000K','flat|색 대비 없음 · 주인공 실종',43,60,'빨강 하나로 시선 고정','thirds,dots'),
('eye-level-change','eye-level-change','바닥 높이에서 올려다본 광장과 비둘기','24mm|f/4.0|ISO 100|1/320s|EV -0.3|WB 5600K','zoom|1.26|서서 찍은 눈높이',50,55,'바닥 낮은 시점','thirds,level'),
('sea-ev','sea-ev','짙푸른 하늘과 청록 바다의 해안','26mm|f/4.0|ISO 50|1/1000s|EV -1.0|WB 6000K','blow|반사광에 하늘·물 날아감',50,45,'EV -0.7 · 색 살리기','thirds,level'),
('mountain-scale','mountain-scale','거대한 산맥 앞 능선 위의 작은 등산객','35mm|f/4.0|ISO 200|1/250s|EV -0.3|WB 5000K','zoom|1.35|사람이 화면을 꽉 채움',63,55,'사람을 작게 · 산 규모','thirds'),
('foreground-depth','foreground-depth','이끼 낀 바위 전경과 뒤의 산맥','28mm|f/5.6|ISO 100|1/250s|EV 0.0|WB 5600K','center|0.95|전경 없이 민둥산만',45,55,'전경 사물로 깊이','thirds'),
('orientation','orientation','숲 속 세로로 긴 폭포','35mm|f/4.0|ISO 200|1/250s|EV 0.0|WB 5400K','zoom|1.4|세로 대상을 가로로 잘라',50,45,'길면 세로','thirds'),
('vertical-line','vertical-line','수직 기둥이 늘어선 건물 정면','24mm|f/5.6|ISO 100|1/160s|EV 0.0|WB 5200K','tilt|-3.6|건물 수직선이 기움|1.0',50,45,'격자로 수직선 맞추기','thirds,level'),
('overcast-soft','overcast-soft','흐린 숲길을 걷는 여성과 부드러운 빛','50mm|f/2.8|ISO 400|1/125s|EV 0.3|WB 5600K','flat|흐린 하늘 절반 · 회색 벽',68,50,'하늘 1/4 · 확산광','thirds'),
('rain-window','rain-window','카페 유리 위 물방울과 바깥 보케','35mm|f/2.0|ISO 800|1/60s|EV -0.3|WB 4200K','zoom|1.5|창밖에 초점 · 물방울 뭉개짐',50,50,'물방울에 초점 · 보케','thirds'),
('fog-layers','fog-layers','안개 속에 겹겹이 이어진 산 능선','35mm|f/4.0|ISO 200|1/200s|EV -0.5|WB 6000K','blow|밝게 올려 전체가 하얀 화면',50,50,'노출 -0.5 · 능선 3단','thirds,level'),
('repetition-pattern','repetition-pattern','반복되는 아치 회랑과 끝의 작은 인물','35mm|f/5.6|ISO 200|1/125s|EV 0.0|WB 5200K','center|1.2|반복이 잘려 리듬 끊김',50,45,'10~20도 비껴 리듬','thirds'),
('minimal-space','minimal-space','눈밭에 홀로 선 나무와 큰 여백','35mm|f/4.0|ISO 100|1/800s|EV +0.7|WB 5600K','zoom|1.3|여백에 잡동사니',47,45,'여백 90% · 피사체 10%','thirds,dots'),
('street-wait','street-wait','햇살 드는 빈 거리를 건너는 한 사람','35mm|f/4.0|ISO 200|1/500s|EV -0.3|WB 5600K','center|1.2|사람 쫓다 배경 어수선',62,50,'빈 배경에서 기다리기','thirds'),
('flower-low','flower-low','지면 높이에서 담은 들꽃과 흐려진 앞 꽃','24mm|f/2.4|ISO 100|1/400s|EV 0.3|WB 5200K','center|1.15|서서 내려다봄 · 흙이 보임',25,60,'꽃 높이 · 앞 꽃 흐림','thirds'),
('snow-flash','snow-flash','플래시에 잡힌 눈송이와 밤 보케','26mm|f/2.2|ISO 100|1/200s|EV 0.0|WB 5600K','dark|플래시 꺼서 눈송이 안 보임',15,45,'플래시로 눈송이 살리기','thirds'),
('panorama','panorama','산맥 사이로 이어진 강 계곡의 파노라마','24mm|f/4.0|ISO 100|1/400s|EV -0.3|WB 5600K','tilt|-3|팔만 돌려 휘어진 파노라마|1.1',50,50,'몸을 축으로 수평 유지','thirds,level'),

# ── 카페·음식 ──
('food-window-light','cafe-window-food','비 내리는 창가의 라테와 크루아상','35mm|f/2.2|ISO 200|1/160s|EV 0.3|WB 4800K','tilt|-3|천장등 켜짐 · 그림자 두 개|1.12',45,65,'창가 60~90cm 옆빛','thirds'),
('food-overhead','cafe-overhead','탑뷰로 담은 라테와 치즈케이크','26mm|f/2.8|ISO 200|1/125s|EV 0.0|WB 5000K','custom|rotate(9deg) scale(.9)|contrast(.95) brightness(1.04)|none|level|기울어진 탑뷰 · 접시 어긋남',38,47,'90도 수평 · 접시 정렬','thirds,level'),
('food-layer','food-side','층이 보이게 담은 버거와 아이스 라테','50mm|f/1.8|ISO 400|1/100s|EV 0.3|WB 4600K','zoom|1.06|위에서 내려다봄 · 층 안 보임',65,55,'45도 · 층과 단면','thirds'),
('food-drink-eye','food-drink-eye','컵 높이에서 담은 아이스 라테의 층','50mm|f/2.0|ISO 400|1/100s|EV 0.3|WB 4600K','center|1.15|위에서만 찍어 컵이 납작',50,45,'컵 높이 아이레벨','thirds'),
('food-macro','food-macro','접사로 담은 딸기 생크림 케이크 단면','13mm|f/2.4|ISO 200|1/200s|EV 0.3|WB 4800K','custom|scale(.72)|blur(.8px) contrast(.94)|blur|none|멀리서 · 질감이 안 보임',45,45,'3~5cm 접사','thirds'),
('food-reflector','food-reflector','창가 옆빛과 흰 냅킨 반사판을 쓴 파스타','35mm|f/2.2|ISO 200|1/125s|EV 0.3|WB 5000K','dark|한쪽이 새까맣게',55,55,'흰 종이로 반사','thirds'),
('food-clean','food-clean','테두리를 닦은 깨끗한 브런치 접시','26mm|f/2.8|ISO 200|1/160s|EV 0.3|WB 5000K','zoom|1.15|접시 테두리 얼룩',50,55,'접시·테이블 닦기','thirds'),
('food-prop','food-prop','포크와 냅킨만 곁들인 케이크 한 조각','50mm|f/2.0|ISO 400|1/125s|EV 0.3|WB 4800K','zoom|1.2|소품이 음식을 가림',48,50,'소품 1~2개만','thirds'),
('food-odd','food-odd','간격을 달리해 놓은 디저트 세 접시','26mm|f/2.8|ISO 200|1/125s|EV 0.3|WB 5000K','center|1.2|접시 두 개를 나란히',50,50,'3·5개 홀수 배치','thirds'),
('food-many','food-many','카페에서 여러 각도로 음식을 찍는 사람','35mm|f/2.8|ISO 400|1/125s|EV 0.3|WB 4800K','zoom|1.35|한 장 찍고 자리를 뜸',65,55,'앵글·거리 10~15장','thirds'),
('food-edit','food-edit','색이 살아 있는 샐러드 볼','26mm|f/2.8|ISO 200|1/160s|EV 0.3|WB 5000K','flat|보정 없이 어둡고 칙칙',50,50,'크롭·밝기·채도·선명도','thirds'),
('food-steam','food-steam','역광을 받아 김이 피어오르는 수프','50mm|f/2.0|ISO 800|1/80s|EV -0.3|WB 4600K','dark|정면광 · 김이 사라짐',45,60,'역광으로 김 살리기','thirds'),
('food-with-person','cafe-person-bokeh','컵을 든 사람과 흐려진 카페 배경','35mm|f/2.0|ISO 320|1/125s|EV 0.3|WB 4800K','zoom|1.4|얼굴만 크게 · 음식 밀려남',65,55,'컵 든 손 하나','thirds'),
('food-table-wide','food-table-wide','60도 높이에서 담은 한 상 차림','24mm|f/3.5|ISO 400|1/100s|EV 0.3|WB 4600K','zoom|1.5|가까이서 접시 절반 잘림',50,55,'광각 · 60~70도','thirds'),
('food-action','food-action','팬케이크 위로 꿀이 떨어지는 순간','50mm|f/1.8|ISO 400|1/250s|EV 0.3|WB 4600K','soft|셔터 느려 손이 번짐',55,60,'1/250초 · 붓는 순간','thirds'),
('food-plating','food-plating','대각선으로 놓인 디저트 접시와 여백','50mm|f/2.2|ISO 200|1/160s|EV 0.3|WB 5000K','center|1.2|접시 정중앙 · 답답함',60,55,'대각선 · 여백 한쪽','thirds'),

# ── 야경·감성 ──
('puddle-reflection','rainy-puddle','네온이 반사되는 밤 물웅덩이','24mm|f/2.0|ISO 800|1/30s|EV -0.7|WB 3600K','center|1.1|서서 찍음 · 반영이 사라짐',50,60,'물가 낮은 시점 · 반영','thirds,level'),
('rain-streak','rain-streak','가로등 빛에 드러난 빗줄기와 보케','70mm|f/2.8|ISO 50|1/50s|EV -0.3|WB 4200K','custom|scale(1.14)|contrast(1.12) brightness(.96)|none|none|1/350 · 빗줄기가 끊겨 어색함',50,45,'1/50 · 빗줄기가 흐름','thirds'),
('night-city-iso','night-city','네온이 반사되는 밤 골목','24mm|f/1.8|ISO 400|1s|EV -0.7|WB 3400K','blow|밝게 올려 네온이 하얗게 날아감',50,50,'ISO 400 · 1초 고정','thirds,level'),
('fireworks','fireworks','도시 위로 터진 불꽃의 장노출','24mm|f/1.8|ISO 50|2s|EV -1.0|WB 4200K','zoom|1.32|터진 뒤 눌러 불꽃이 잘림',50,35,'터질 때 · ND16 2초','thirds'),
('light-trail','light-trail','곡선 도로를 지나는 차량 불빛 궤적','24mm|f/1.8|ISO 100|2.5s|EV -1.0|WB 4000K','blow|1/30 · 차가 그냥 차로 보임',50,60,'2.5초 · 차가 선이 됨','thirds'),
('milkyway-mode','milkyway','산 능선 위로 걸린 은하수','24mm|f/1.8|ISO 3200|15s|EV -2.0|WB 3900K','blow|도시 광해 · 별이 씻겨 사라짐',50,40,'천체 모드 · 12분','thirds,level'),
('star-manual','star-field','호수에 별이 내려앉은 밤하늘과 텐트','24mm|f/1.8|ISO 3200|15s|EV -1.7|WB 3900K','soft|자동 초점 · 별이 뭉개짐',50,50,'수동 초점 · 15초','thirds,level'),
('sunset-wb','sunset-silhouette','노을 하늘을 배경으로 선 두 사람의 실루엣','50mm|f/2.8|ISO 100|1/1600s|EV -0.7|WB 8000K','flat|자동 모드 · 노을이 회색으로',53,62,'WB 8000K · 색을 붙잡음','thirds,level'),
('magic-hour-30','magic-hour-30','블루아워 도심 스카이라인과 강','35mm|f/2.8|ISO 200|1/8s|EV -0.7|WB 4300K','flat|완전히 어두워진 뒤 촬영',50,45,'해 진 뒤 30분','thirds,level'),
('backlight-rim','backlit-portrait','노을을 등지고 선 인물의 역광 윤곽','85mm|f/2.0|ISO 100|1/2000s|EV 0.7|WB 5800K','dark|역광에 얼굴이 실루엣',45,40,'얼굴 노출 + · 윤곽 살림','thirds'),
('night-flash-off','night-flash-off','등불이 밝은 야시장 거리','35mm|f/2.0|ISO 800|1/60s|EV -0.7|WB 3600K','blow|플래시로 앞만 하얗게',50,50,'플래시 끄기 · 2~3m 한계','thirds'),
('night-live-off','night-live-off','어두운 거리에서 폰 화면을 보는 여성','35mm|f/1.8|ISO 640|1/15s|EV -0.7|WB 3600K','soft|라이브 포토 켜서 야간모드 꺼짐',40,45,'라이브 포토 끄기','thirds'),
('night-crosshair','night-crosshair','장노출로 담은 야간 교량과 빛 궤적','24mm|f/1.8|ISO 200|4s|EV -1.0|WB 4000K','soft|움직여도 그냥 촬영',45,45,'십자선 정렬','thirds,level'),
('night-motion','night-motion','장노출로 흐려진 관람차의 원형 궤적','24mm|f/1.8|ISO 200|4s|EV -1.2|WB 4000K','dark|짧은 노출로 궤적이 없음',50,45,'2~4초 장노출 궤적','thirds'),
('night-sodium-wb','night-sodium-wb','나트륨등 아래 주황빛 지하 통로','35mm|f/2.5|ISO 800|1/60s|EV -0.7|WB 3000K','flat|나트륨등 누런 색 그대로',55,50,'WB 3000K로 누런 기운','thirds'),
('night-portrait-bokeh','night-portrait-bokeh','도시 불빛 보케를 배경으로 한 여성','85mm|f/1.8|ISO 800|1.5s|EV -0.7|WB 3800K','soft|피사체가 움직여 얼굴 번짐',35,50,'1~2초 · 인물 정지','thirds'),
('crowd-erase','crowd-erase','장노출로 행인이 흐려진 밤 광장','24mm|f/1.8|ISO 100|10s|EV -1.0|WB 3800K','zoom|1.3|서 있는 사람만 남음',50,50,'10초 · 행인 지우기','thirds,level'),
]

assert len(R) == 100, len(R)
assert len({r[0] for r in R}) == 100
assert len({r[1] for r in R}) == 100


def sizes():
    out = {}
    for _, key, *_ in R:
        p = os.path.join(IMG, key + '.jpg')
        with Image.open(p) as im:
            out[key] = im.size
    return out


SZ = sizes()


def exif(s):
    return 'EX(' + ', '.join("'%s'" % x for x in s.split('|')) + ')'


def before(s):
    parts = s.split('|')
    kind = parts[0]
    if kind == 'tilt':
        deg, note = parts[1], parts[2]
        sc = parts[3] if len(parts) > 3 else '1'
        return "bTilt(%s, '%s', %s)" % (deg, note, sc)
    if kind == 'zoom':
        return "bZoom(%s, '%s')" % (parts[1], parts[2])
    if kind == 'blow':
        return "bBlow('%s')" % parts[1]
    if kind == 'dark':
        return "bDark('%s')" % parts[1]
    if kind == 'soft':
        return "bSoft('%s')" % parts[1]
    if kind == 'flat':
        return "bFlat('%s')" % parts[1]
    if kind == 'center':
        return "bCenter(%s, '%s')" % (parts[1], parts[2])
    if kind == 'custom':
        t, f, tone, warn, note = parts[1:6]
        return "{ t: '%s', f: '%s', tone: '%s', warn: '%s', note: '%s' }" % (t, f, tone, warn, note)
    raise ValueError(s)


lines = []
lines.append('/* 인생이라는 필름 — 실사 사진 에셋과 뷰파인더 메타데이터 (1부: 카드 48장)')
lines.append('   assets/img/*.jpg 는 35mm 필름 룩으로 만든 에디토리얼 사진입니다(실제 촬영지·인물 기록 아님).')
lines.append('   100장 카드가 100장의 서로 다른 사진을 하나씩 쓰도록 1:1 매핑했고, 뷰파인더 초점 좌표는')
lines.append('   각 사진에서 주 피사체가 실제로 있는 위치에 맞췄습니다. */')
lines.append('')
lines.append('const PHOTOS = {')
for _, key, alt, *_ in R:
    w, h = SZ[key]
    lines.append("  '%s': { src: 'assets/img/%s.jpg', w: %d, h: %d, alt: '%s' }," % (key, key, w, h, alt))
lines.append('};')
lines.append('')
lines.append('/* ── Before / After 프리셋 ─────────────────────────────── */')
lines.append('const EX = (lens, ap, iso, sh, ev, wb) => [lens, ap, iso, sh, ev, wb];')
lines.append('')
lines.append("const bTilt = (deg, note, sc) => ({ t: `rotate(${deg}deg) scale(${sc || 1.16})`, f: 'contrast(.92) saturate(.87) brightness(.96)', tone: 'dull', warn: 'level', note });")
lines.append("const bZoom = (sc, note) => ({ t: `scale(${sc}) translate(6%, -4%)`, f: 'blur(1.3px) contrast(.92)', tone: 'none', warn: 'crop', note });")
lines.append("const bBlow = (note) => ({ t: 'none', f: 'brightness(1.5) contrast(.85) saturate(.9)', tone: 'blow', warn: 'blow', note });")
lines.append("const bDark = (note) => ({ t: 'none', f: 'brightness(.52) contrast(1.22)', tone: 'dark', warn: 'dark', note });")
lines.append("const bSoft = (note) => ({ t: 'scale(1.04)', f: 'blur(1.5px) brightness(.95)', tone: 'blur', warn: 'blur', note });")
lines.append("const bFlat = (note) => ({ t: 'none', f: 'saturate(.35) contrast(.9)', tone: 'flat', warn: 'flat', note });")
lines.append("const bCenter = (sc, note) => ({ t: `scale(${sc})`, f: 'contrast(.95)', tone: 'none', warn: 'center', note });")
lines.append("const aAt = (x, y, note, guides) => ({ note, focus: [x, y], guides: guides || ['thirds'] });")
lines.append('')
lines.append('const MEDIA = {')
for row in R[:48]:
    cid, key, alt, ex, bf, fx, fy, note, guides = row
    gl = ', '.join("'%s'" % g for g in guides.split(','))
    lines.append("  '%s': {" % cid)
    lines.append("    photo: '%s', pos: '%d%% %d%%'," % (key, fx, fy))
    lines.append("    exif: %s," % exif(ex))
    lines.append("    before: %s," % before(bf))
    lines.append("    after: aAt(%d, %d, '%s', [%s])" % (fx, fy, note, gl))
    lines.append('  },')
lines.append('};')
lines.append('')

with open(os.path.join(ROOT, 'photos.js'), 'w', encoding='utf-8') as f:
    f.write('\n'.join(lines))

lines2 = []
lines2.append('/* 인생이라는 필름 — 사진 매핑 (2부: 카드 52장)')
lines2.append('   photos.js 의 PHOTOS·프리셋(bTilt·bZoom·bBlow·bDark·bSoft·bFlat·bCenter·aAt)을 그대로 씁니다. */')
lines2.append('')
lines2.append('Object.assign(MEDIA, {')
for row in R[48:]:
    cid, key, alt, ex, bf, fx, fy, note, guides = row
    gl = ', '.join("'%s'" % g for g in guides.split(','))
    lines2.append("  '%s': {" % cid)
    lines2.append("    photo: '%s', pos: '%d%% %d%%'," % (key, fx, fy))
    lines2.append("    exif: %s," % exif(ex))
    lines2.append("    before: %s," % before(bf))
    lines2.append("    after: aAt(%d, %d, '%s', [%s])" % (fx, fy, note, gl))
    lines2.append('  },')
lines2.append('});')
lines2.append('')

with open(os.path.join(ROOT, 'photos-more.js'), 'w', encoding='utf-8') as f:
    f.write('\n'.join(lines2))

print('photos.js / photos-more.js OK · PHOTOS', len(R), '· MEDIA', len(R))
