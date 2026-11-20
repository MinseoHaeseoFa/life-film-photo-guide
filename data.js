/* 인생이라는 필름 — 데이터 (1부: 혼자 여행·인물·세팅 + 풍경 일부)
   모든 카드의 사실 근거는 research/source-notes.md 와 이 파일의 sources 에 기록되어 있습니다.
   같은 기법이 두 번 나오지 않도록 100장을 전수 재설계했습니다(2026-11-21). */

const CATS = [
  { id: 'all', label: '전체' },
  { id: 'solo', label: '혼자 여행·셀카봉' },
  { id: 'pose', label: '인물·포즈' },
  { id: 'scene', label: '풍경·여행지' },
  { id: 'cafe', label: '카페·음식' },
  { id: 'night', label: '야경·역광·감성' },
  { id: 'setting', label: '폰 카메라 세팅' }
];

const SRC = {
  etnews: { t: '전자신문 「폰카홀릭」 — 구도 설정부터 (수직·수평 안내선)', u: 'https://www.etnews.com/20240509000341', v: '확인' },
  kaa24: { t: 'KAA 저널 2024 여름 — 김성주, 「갤럭시로 보는 세상」 (격자선·수평수직)', u: 'https://www.kaa.or.kr/k/mag/2024/summer/KAA_journal_2024_summer_Chapter9.pdf', v: '확인' },
  kaa25: { t: 'KAA 저널 2025 봄 — 김성주, 멀티 카메라 100% 활용법 (초광각/광각/망원·접사)', u: 'https://www.kaa.or.kr/k/mag/2025/spring/KAA_journal_2025_spring_Chapter5_2.pdf', v: '확인' },
  hani_zoom: { t: '한겨레 김성주의 스마트폰 한 컷 — 3.9배보다 4배, 손가락 줌 대신 렌즈', u: 'https://www.hani.co.kr/arti/specialsection/esc_section/1257865.html', v: '확인' },
  hani_multi: { t: '한겨레 — 「손가락 줌」과 이별하고 멀티 카메라 활용하기', u: 'https://www.hani.co.kr/arti/specialsection/esc_section/1181368.html', v: '확인' },
  haomin: { t: '스마트폰 사진 잘 찍는 법 완전정복 — 구도·빛·설정·후보정', u: 'https://haominhouse.com/entry/%EC%8A%A4%EB%A7%88%ED%8A%B8%ED%8F%B0-%EC%82%AC%EC%A7%84-%EC%9E%98-%EC%B0%8D%EB%8A%94-%EB%B2%95-%EC%99%84%EC%A0%84%EC%A0%95%EB%B3%B5%EF%BD%9C%EA%B5%AC%EB%8F%84%C2%B7%EB%B9%9B%C2%B7%EC%84%A4%EC%A0%95%C2%B7%ED%9B%84%EB%B3%B4%EC%A0%95%EA%B9%8C%EC%A7%80-%ED%92%80%EC%BD%94%EC%8A%A4', v: '확인' },
  impulse: { t: '스마트폰으로 전문가처럼 — 빛의 방향·3분할·여백', u: 'https://impulsewave.kr/bbs/board.php?bo_table=news&wr_id=583', v: '확인' },
  sd: { t: '삼성디스플레이 뉴스룸 — 스마트폰으로 사진작가처럼 10편, 야경', u: 'https://news.samsungdisplay.com/16640', v: '확인' },
  tour: { t: '온더투어 — 스마트폰 하나로 도시 야경 제대로 담는 법', u: 'https://www.onthetour.co.kr/news/articleView.html?idxno=5233', v: '확인' },
  foodshot: { t: 'FoodShot AI — 핸드폰 음식 사진 8단계', u: 'https://foodshot.ai/ko/blog/how-to-take-food-photos-phone', v: '확인' },
  sixone: { t: '식스원 — 음식 사진 조명·각도·폰 설정 체크리스트', u: 'https://sixonebiz.com/blog/food-photography-tips', v: '확인' },
  brunch: { t: '서울브런치 — 브런치 사진 잘 찍는 법과 촬영 매너', u: 'https://seoulbrunch.com/seoul-brunch-for-men-at-mobile-photo/', v: '확인' },
  jamie: { t: 'Jamie B Studio — 자연스러운 인물 사진 포즈 디렉션', u: 'https://jamiebphotography.com/natural-poses/', v: '확인' },
  ava: { t: 'AVAseoul — 인물 포즈에서 손은 어떻게 하나요', u: 'https://avaseoul.com/%ec%9d%b8%eb%ac%bc-%ed%8f%ac%ec%a6%88%ec%97%90%ec%84%9c-%ec%86%90%ec%9d%80-%ec%96%b4%eb%96%bb%ea%b2%8c-%ed%95%98%eb%82%98%ec%9a%94/', v: '확인' },
  haruw: { t: '하루우 — 셀카 퀄리티 높이는 촬영 비법(구도·각도)', u: 'https://haruw.com/entry/%EC%85%80%EC%B9%B4-%ED%80%84%EB%A6%AC%ED%8B%B0-%EB%86%92%EC%9D%B4%EB%8A%94-%EB%B8%94%EB%A3%A8%ED%88%AC%EC%8A%A4-%EC%B4%AC%EC%98%81-%EB%B9%84%EB%B2%95', v: '확인' },
  dolmen: { t: 'Dolmen — 셀카봉 잘 찍는 방법, 각도부터 빛까지', u: 'https://dolmen1220.blogspot.com/2025/08/blog-post_24.html', v: '확인' },
  solo1: { t: '혼자 여행해도 인생샷은 충분하다 — 감성 구도 & 셀카 팁', u: 'https://future-academy10000.com/entry/%ED%98%BC%EC%9E%90-%EC%97%AC%ED%96%89%ED%95%B4%EB%8F%84-%EC%9D%B8%EC%83%9D%EC%83%B7%EC%9D%80-%EC%B6%A9%EB%B6%84%ED%95%98%EB%8B%A4-%EA%B0%90%EC%84%B1-%EA%B5%AC%EB%8F%84-%EC%85%80%EC%B9%B4-%ED%8C%81-%EC%B4%9D%EC%A0%95%EB%A6%AC', v: '확인' },
  mytravel: { t: 'myTravel — 여행 사진 잘 찍는 10가지 팁(스마트폰)', u: 'https://mytravel-planner.com/blog/smartphone-travel-photography', v: '확인' },
  jetlag: { t: 'Jetlag Sarah — 혼자 여행에서 나를 찍는 법(마커·연속 촬영)', u: 'https://jetlagsarah.com/how-i-take-photos-of-myself-on-a-solo-trip/', v: '확인' },
  gudo: { t: '구도캠 — 인물 사진 구도와 촬영 팁 가이드', u: 'https://gudocam.com/ko/guides/portrait-photography', v: '확인' },
  canon: { t: '캐논코리아 원포인트레슨 — 인물 사진 구도 잡기', u: 'https://kr.canon/magazine/detail/4745', v: '확인' },
  stylezine: { t: '스타일진 — 인생샷을 만드는 인물사진 잘 찍는 법(이강신)', u: 'https://stylezineblog.com/5050', v: '확인' },
  clien: { t: '클리앙 사진 수업 — 인물 사진, 어디를 잘라야 할까', u: 'https://www.clien.net/service/board/lecture/13461119', v: '확인' },
  carat: { t: '캐럿 — 인물사진 구도 완벽정리, 삼분할과 여백', u: 'https://carat.im/blog/portrait-photography-composition-tips', v: '확인' },
  ig_elan: { t: '@elanvital7(박성욱) 인스타그램 — 스마트폰 사진 구도와 빛 20가지', u: 'https://www.instagram.com/p/DfzggHxoyAu/', v: '확인(캡션)' },
  ig_uk: { t: '@ukwanghyun 인스타그램 — 가을사진 예쁘게 담는 7가지', u: 'https://www.instagram.com/p/DfMauevk2hA/', v: '확인(캡션)' },
  th_donggi: { t: '@donggi_photo Threads — 물웅덩이 반영샷 5단계', u: 'https://www.threads.com/@donggi_photo/post/DcEI27WGK-I', v: '확인(본문)' },
  ig_23: { t: '@_23iii_ 인스타그램 — 갤럭시 프로모드 벚꽃 색감', u: 'https://www.instagram.com/p/DWtzbX6iU-M/', v: '확인(캡션)' },
  ig_junny_rain: { t: '@junnywhere 인스타그램 — 비 오는 날 3배 망원·셔터 1/50 vs 1/350', u: 'https://www.instagram.com/reel/DN9gtSIE1s6/', v: '확인(캡션)' },
  ig_junny_fire: { t: '@junnywhere 인스타그램 — 불꽃놀이 Expert RAW·ND16·ISO50·2초', u: 'https://www.instagram.com/reel/DNKvPAozU3Y/', v: '확인(캡션)' },
  ig_junny_portrait: { t: '@junnywhere 인스타그램 — 소품 인물사진 모드(3배·블러 -5)', u: 'https://www.instagram.com/reel/DIlyf8nzr4x/', v: '확인(캡션)' },
  ig_junny_star: { t: '@junnywhere 인스타그램 — 별 사진 Expert RAW·천체사진 모드', u: 'https://www.instagram.com/reel/DMh8FpuTJDS/', v: '확인(캡션)' },
  ig_kf: { t: '@kfconcept 인스타그램 — 카 라이트 트레일(장노출) 데모', u: 'https://www.instagram.com/reel/DIa01BlO4sX/', v: '부분 확인(주제)' },
  ig_clos: { t: '@clos_click 인스타그램 — 모바일 프로모드 접사 데모', u: 'https://www.instagram.com/reels/DV2MPnaCO4V/', v: '부분 확인(프레임)' },
  yt_stars: { t: '미드나잇 YouTube — 갤럭시로 은하수·밤하늘 촬영(ISO 3200·15초·수동초점)', u: 'https://www.youtube.com/watch?v=sUyBdFgieQc', v: '확인(영상 내용)' },
  ig_sunset: { t: '@photofreak_guy 인스타그램 — 노을 프로모드 ISO100·1/1600·WB8000', u: 'https://www.instagram.com/reel/DHL1L9fzqQG/', v: '확인(캡션)' },
  nw_exposure: { t: '뉴스웍스 「감성 가득한 한 컷」 — 노출의 3요소(ISO·조리개·셔터)', u: 'https://www.newsworks.co.kr/news/articleView.html?idxno=794383', v: '확인' },
  hani_snow: { t: '한겨레 「폰카로 찍은 설경이 안 이쁘다면 이렇게」', u: 'https://www.hani.co.kr/arti/culture/culture_general/1182637.html', v: '확인' },
  hani_grid: { t: '한겨레 「여행 인생 사진 찍고 싶다면 격자를 활용하라」', u: 'https://www.hani.co.kr/arti/specialsection/esc_section/1187143.html', v: '확인' },
  hani_portrait: { t: '한겨레 「영화 포스터 같은 인물 사진」 — 인물사진 기능', u: 'https://www.hani.co.kr/arti/culture/culture_general/1176336.html', v: '확인' },
  hani_2015: { t: '한겨레 「스마트폰으로 휴가 사진 잘 찍는 14가지 방법」', u: 'https://www.hani.co.kr/arti/culture/travel/704472.html', v: '확인' },
  ontour_scene: { t: '온더투어 「장소별 스마트폰 구도 정리」', u: 'https://www.onthetour.co.kr/news/articleView.html?idxno=4318', v: '확인' },
  ontour_night: { t: '온더투어 「스마트폰 하나로 도시 야경 담는 법」', u: 'https://www.onthetour.co.kr/news/articleView.html?idxno=5233', v: '확인' },
  sd_night: { t: '삼성디스플레이 뉴스룸 「야경 사진 찍는 법」', u: 'https://news.samsungdisplay.com/16640', v: '확인' },
  canon_comp: { t: '캐논코리아 원포인트레슨 「인물 사진 구도 잡기」', u: 'https://kr.canon/magazine/detail/4745', v: '확인' },
  jamie_pose: { t: 'Jamie B Studio 「자연스러운 인물 사진 포즈」', u: 'https://jamiebphotography.com/natural-poses/', v: '확인' },
  dps_food: { t: 'Digital Photography School 「10 More Food Photography Tips」', u: 'https://digital-photography-school.com/food-photography-tips/', v: '확인' },
  apple_night: { t: 'Apple 지원 「iPhone 야간 모드 사용하기」', u: 'https://support.apple.com/en-us/102519', v: '확인' },
  apple_portrait: { t: 'Apple 지원 「iPhone 인물 사진 모드 사용하기」', u: 'https://support.apple.com/en-us/102398', v: '확인' },
  apple_tools: { t: 'Apple 지원 「iPhone 카메라 도구로 구도 잡기」', u: 'https://support.apple.com/guide/iphone/use-camera-tools-iph3dc593597/ios', v: '확인' },
  imore_night: { t: 'iMore 「iPhone Photography Basics: How to use Night mode」', u: 'https://www.imore.com/iphone/iphone-photography-basics-how-to-use-night-mode', v: '확인' },
  ava_museum: { t: 'AVAseoul 「미술관·전시장에서 찍기」 — 유리 반사·플래시 금지·ISO', u: 'https://avaseoul.com/%eb%af%b8%ec%88%a0%ea%b4%80%c2%b7%ec%a0%84%ec%8b%9c%ec%9e%a5%ec%97%90%ec%84%9c-%ec%b0%8d%ea%b8%b0/', v: '확인' },
  studiosoy: { t: 'studiosoy — 인스타 전시 사진, 동선과 조명별 실수 4가지', u: 'https://studiosoy.net/insta-exhibit-photo-flow-light-mistakes/', v: '확인' },
  kaminbeth: { t: '카미앤베스 — 스마트폰으로 반려동물 사진 잘 찍는 8가지 방법', u: 'https://kaminbeth.com/bbs/board.php?bo_table=pet_life&wr_id=6', v: '확인' },
  petpotal: { t: '펫포털 — 반려동물 인생샷 건지는 사진 잘 찍는 방법 5가지', u: 'https://petpotal.ttpk.co.kr/guide/pet-photo', v: '확인' },
  ghotel: { t: 'Google Hotel Center — 숙소 사진 권장 사항과 스마트폰 팁', u: 'https://support.google.com/hotelprices/answer/13483115?hl=ko', v: '확인' },
  airbnb_help: { t: 'Airbnb 도움말 — 숙소 사진 촬영 팁(자연 채광·가로 촬영)', u: 'https://www.airbnb.co.kr/help/article/746', v: '확인' },
  jeju_window: { t: '제주일보 「기차 사진은 렌즈 위치부터」 — 창밖 반사 줄이기', u: 'https://www.jejutwn.com/news/article.html?no=463981', v: '확인' },
  bonamy: { t: '보남이의 앱세이 — 창밖 풍경은 폰을 유리에 붙여 찍기', u: 'https://m.blog.naver.com/bonamy/221269323189', v: '확인' },
  ava_nightmarket: { t: 'AVAseoul 「야시장·포장마차 야경」 — ISO 1600~3200·1/125초·WB', u: 'https://avaseoul.com/%ec%95%bc%ec%8b%9c%ec%9e%a5%c2%b7%ed%8f%ac%ec%9e%a5%eb%a7%88%ec%b0%a8-%ec%95%bc%ea%b2%bd-%ec%96%b4%eb%91%a0-%ec%86%8d-%ec%83%89%ec%83%89%ec%9d%98-%eb%b6%88%eb%b9%9b%ec%9d%84-%ec%9a%94/', v: '확인' },
  nightmarket_guide: { t: '우리동네야시장 — 폰으로 야시장 조명·음식·풍경 담기', u: 'https://xn--950b94c1wh42k8idy5bf8b.com/guide/photos', v: '확인' },
  pajoox: { t: 'Pajoox — 스마트폰 야경 사진과 도시 촬영 팁', u: 'https://pajoox.com/ko/blog/city-night-photo-ideas-better-phone-photos-after-dark', v: '확인' },
  trainfyi: { t: 'TrainFYI — 기차 사진 가이드(창 반사·셔터 1/500초 기준)', u: 'https://trainfyi.com/guides/train-photography/', v: '확인' },
  cizucu: { t: 'cizucu 매거진 — 계단을 찍는 법(앵글·빛·사람)', u: 'https://www.cizucu.com/ko/magazines/2026-01-photography-of-stairs', v: '확인' },
  skylum: { t: 'Skylum 블로그 — 촬영 시점으로 깊이와 리듬 만들기', u: 'https://blog.skylum.com/ko/vantage-point-photography-how-to-create-depth-and-impact/', v: '확인' },
};

const CARDS = [
  /* ── 폰 카메라 세팅 ───────────────────────────── */
  {
    id: 'grid-level', cat: ['setting'], level: 1, lens: ['1x'],
    title: '격자·수평계 3초 세팅',
    tagline: '사진이 기울어 보이는 이유는 대개 1~2도의 수평 오차입니다.',
    keywords: '격자 안내선 수평 수직 기울기 똑바로 수평계',
    principle: '카메라 설정에서 3×3 격자를 켜고 지평선이나 건물 기둥을 격자선에 겹친 뒤, 수평계가 초록이 될 때 셔터를 누릅니다. 눈대중으로는 1~2도 오차를 잡기 어렵습니다.',
    steps: [
      '설정에서 격자(갤럭시 촬영 가이드 / 아이폰 격자)와 수평계를 켠다.',
      '지평선·바다·건물 기둥을 가로·세로 격자선에 나란히 겹친다.',
      '화면의 수평계가 초록으로 바뀐 순간 눌러 찍는다.'
    ],
    badges: [{ k: '설정', v: '격자 ON' }, { k: '설정', v: '수평계 ON' }],
    fails: ['격자를 켜 두고도 화면 구석만 보며 눌러 1~2도 기운 사진', '수평선이 인물의 목을 가로질러 목이 잘려 보이는 사진'],
    checks: ['격자가 켜져 있다', '지평선이 가로 격자선과 나란하다', '수평계가 초록(0도)이다'],
    sources: [SRC.etnews, SRC.kaa24]
  },
  {
    id: 'lens-button', cat: ['setting'], level: 1, lens: ['0.5x', '1x', '3x'],
    title: '핀치 줌 대신 렌즈 버튼',
    tagline: '0.5 · 1 · 3 숫자를 직접 누르면 화질이 살아납니다.',
    keywords: '줌 배율 렌즈 버튼 광각 망원 화질 3.9배 4배',
    principle: '두 손가락으로 벌리는 줌은 이미 찍힌 화면을 잘라 확대하는 디지털 줌이라 화질이 떨어집니다. 아래 0.5/1/3(5) 버튼은 실제 렌즈를 바꾸는 스위치이고, 3.9배 같은 중간 배율보다 4배 렌즈가 깨끗합니다.',
    steps: [
      '촬영 화면 아래 0.5 / 1 / 3(또는 5) 버튼을 확인한다.',
      '필요한 화각의 버튼을 직접 누르고 1.1~3.9배 중간 배율은 피한다.',
      '더 당기고 싶으면 그 렌즈로 찍은 뒤 나중에 잘라낸다.'
    ],
    badges: [{ k: '렌즈', v: '0.5x' }, { k: '렌즈', v: '1x' }, { k: '렌즈', v: '3x' }],
    fails: ['3.9배로 찍어 가장자리가 뭉개진 사진', '밤에 망원·초광각으로 찍어 노이즈가 늘어난 사진'],
    checks: ['배율을 버튼으로 바꿨다', '어중간한 배율이 아니다', '밤에는 1x를 먼저 썼다'],
    sources: [SRC.hani_zoom, SRC.hani_multi, SRC.kaa25]
  },
  {
    id: 'exposure-slider', cat: ['setting'], level: 1, lens: ['1x'],
    title: '얼굴 터치 후 노출 -0.3',
    tagline: '터치 한 번과 슬라이더 한 칸이 하늘과 얼굴을 함께 살립니다.',
    keywords: '노출 밝기 보정 역광 하이라이트 슬라이더 AE AF',
    principle: '폰은 화면에서 가장 밝은 곳을 기준으로 밝기를 정합니다. 역광에서 얼굴을 터치하고 해 모양 슬라이더를 -0.3~-0.7로 내리면 얼굴은 남고 하늘은 살아납니다.',
    steps: [
      '살릴 곳(얼굴)을 톡 터치한다.',
      '나타난 해 모양 슬라이더를 -0.3~-0.7까지 내린다.',
      '하늘이 하얗게 날아가지 않는지 확인하고 찍는다.'
    ],
    badges: [{ k: '노출', v: '-0.3 ~ -0.7' }, { k: '기준', v: '얼굴 터치' }],
    fails: ['배경 하늘에 밝기가 맞아 얼굴이 까맣게 남은 사진', '야경에서 +로 올려 간판이 하얀 덩어리가 된 사진'],
    checks: ['얼굴에 노출 기준이 있다', '하이라이트가 살아 있다', '어두운 부분이 뭉개지지 않았다'],
    sources: [SRC.haomin, SRC.hani_zoom]
  },
  {
    id: 'af-lock', cat: ['setting'], level: 2, lens: ['1x', '3x'],
    title: '길게 눌러 초점 잠그고 재구도',
    tagline: '인물을 화면 가장자리에 둘 때 초점이 배경으로 도망가는 것을 막습니다.',
    keywords: 'AE AF 잠금 초점 고정 재구도 터치',
    principle: '얼굴을 길게 누르면 AE/AF 잠금이 걸려 초점과 밝기가 그 거리에 고정됩니다. 그 상태로 프레임을 옮기면 인물을 1/3 지점에 두어도 초점이 배경으로 가지 않습니다.',
    steps: [
      '인물 얼굴을 1~2초 길게 눌러 잠금 표시를 띄운다.',
      '잠금을 유지한 채 폰을 옆으로 옮겨 구도를 잡는다.',
      '촬영 후 잠금을 풀어 다음 장면에 대비한다.'
    ],
    badges: [{ k: '기능', v: 'AE/AF 잠금' }, { k: '조작', v: '길게 누르기' }],
    fails: ['잠금을 건 채 거리가 다른 피사체를 찍어 흐린 사진', '잠금 후 밝기를 다시 확인하지 않아 어둡게 나온 사진'],
    checks: ['잠금 표시가 떠 있다', '프레임 이동 후에도 얼굴이 선명하다', '밝기가 그대로 유지된다'],
    sources: [SRC.apple_tools]
  },
  {
    id: 'timer', cat: ['setting', 'night'], level: 1, lens: ['1x'],
    title: '2~3초 타이머로 진동 지우기',
    tagline: '셔터를 누르는 손가락 하나가 사진을 흔듭니다.',
    keywords: '타이머 셔터 흔들림 삼각대 고정 야간 긴 노출',
    principle: '버튼을 누르는 순간 폰이 1~2mm 밀립니다. 2~3초 타이머를 걸면 폰이 가라앉은 뒤에 찍혀 야간·장노출에서도 선명합니다.',
    steps: [
      '폰을 난간·벤치·가방 위에 고정한다.',
      '타이머를 2~3초로 맞춘다.',
      '버튼을 누르고 손을 뗀 뒤 찍힐 때까지 화면을 만지지 않는다.'
    ],
    badges: [{ k: '설정', v: '타이머 3초' }, { k: '도구', v: '고정면' }],
    fails: ['찍히자마자 폰을 드는 습관', '바람 부는 날 얇은 셀카봉을 완전히 펼쳐 세우기'],
    checks: ['폰이 단단한 곳에 있다', '타이머가 걸려 있다', '촬영 중 손을 뗐다'],
    sources: [SRC.sd, SRC.tour]
  },
  {
    id: 'steady-grip', cat: ['setting', 'night'], level: 1, lens: ['1x'],
    title: '팔꿈치 붙이고 두 손으로',
    tagline: '들고 찍어야 할 때는 자세가 흔들림의 절반을 잡습니다.',
    keywords: '손떨림 흔들림 자세 팔꿈치 두 손 그립',
    principle: '야간 모드는 노출이 길어 조금만 움직여도 흐려집니다. 팔꿈치를 몸에서 10cm 안으로 붙이고 두 손으로 감싸 쥐고 벽이나 난간에 몸을 기대면 들고 찍어도 흔들림이 크게 줄어듭니다.',
    steps: [
      '벽·난간·기둥에 몸을 가볍게 기댄다.',
      '팔꿈치를 옆구리에 붙이고 두 손으로 폰을 감싼다.',
      '숨을 내쉬며 어깨 힘을 빼고 촬영한다.'
    ],
    badges: [{ k: '자세', v: '두 손' }, { k: '보조', v: '벽에 기대기' }],
    fails: ['팔만 뻗어 든 채 야간 모드로 찍은 사진', '숨을 참아 어깨에 힘이 들어간 사진'],
    checks: ['팔꿈치가 몸에 붙어 있다', '두 손으로 쥐었다', '어깨에 힘이 없다'],
    sources: [SRC.ontour_night]
  },
  {
    id: 'remote-shutter', cat: ['setting', 'solo'], level: 1, lens: ['1x'],
    title: '이어폰 볼륨·워치로 셔터',
    tagline: '화면을 만지지 않으면 흔들림이 한 번 줄어듭니다.',
    keywords: '리모컨 셔터 이어폰 볼륨 워치 블루투스',
    principle: '이어폰의 볼륨 버튼이나 스마트워치 1개만 연결하면 카메라 셔터로 동작합니다. 폰을 고정한 뒤 리모컨으로 누르면 화면을 건드리지 않아 진동이 사라집니다.',
    steps: [
      '이어폰이나 워치를 폰에 연결한다.',
      '폰을 난간이나 삼각대에 고정한다.',
      '화면을 보지 않고 리모컨 버튼으로 촬영한다.'
    ],
    badges: [{ k: '도구', v: '이어폰·워치' }, { k: '효과', v: '진동 제거' }],
    fails: ['리모컨을 연결해 놓고 폰을 손에 든 채 찍은 사진', '타이머와 리모컨을 겹쳐 셔터 타이밍을 놓친 경우'],
    checks: ['리모컨이 연결됐다', '폰이 고정돼 있다', '촬영 중 화면을 만지지 않았다'],
    sources: [SRC.ontour_night]
  },
  {
    id: 'pro-triangle', cat: ['setting'], level: 2, lens: ['1x'],
    title: '프로 모드는 ISO부터 고정',
    tagline: '세 손잡이를 한꺼번에 만지면 전부 어긋납니다. 순서가 있습니다.',
    keywords: '프로모드 ISO 셔터스피드 조리개 노출 삼각형',
    principle: 'ISO는 빛에 대한 민감도라 올리면 노이즈가 늘고, 셔터는 빛을 받는 시간이라 밝기와 움직임을 함께 정합니다. 폰 조리개는 기종에 따라 고정이라, 실질은 ISO를 100~400으로 고정하고 셔터로 밝기를 채우는 두 단계입니다.',
    steps: [
      '프로 모드에서 ISO를 100~400으로 먼저 고정한다.',
      '부족한 밝기를 셔터 속도로 채운다.',
      '배경 흐림은 조리개 대신 인물 모드로 만든다.'
    ],
    badges: [{ k: 'ISO', v: '100~400' }, { k: '셔터', v: '밝기 담당' }, { k: '조리개', v: '폰은 고정' }],
    fails: ['세 값을 동시에 만지다 전부 어긋난 사진', 'ISO만 올려 노이즈가 덮은 사진'],
    checks: ['ISO를 먼저 정했다', '셔터로 밝기를 맞췄다', '노이즈가 감당된다'],
    sources: [SRC.nw_exposure]
  },
  {
    id: 'wb-kelvin', cat: ['setting', 'night'], level: 2, lens: ['1x'],
    title: '화이트밸런스 K값 손으로',
    tagline: '낮은 K는 푸르게, 높은 K는 노랗게. 밤 색은 이 손잡이로 정합니다.',
    keywords: '화이트밸런스 WB 켈빈 색온도 나트륨등 프로모드',
    principle: '화이트밸런스 K값을 낮추면(2300K) 푸른 기운이, 높이면(10000K) 노란 기운이 더해집니다. 노란 나트륨등 아래에서 사진이 누렇게 나왔다면 프로 모드에서 K를 낮춰 잡습니다.',
    steps: [
      '프로 모드에서 WB를 연다.',
      'K값을 낮춰 누런 기운을 줄인다.',
      '흰 간판이나 셔츠를 기준으로 ±로 미세 조정한다.'
    ],
    badges: [{ k: 'WB', v: '2300~10000K' }, { k: '모드', v: '프로' }],
    fails: ['자동 WB가 나트륨등에 끌려 전체가 노란 사진', 'K를 과하게 낮춰 얼굴까지 파랗게 나온 사진'],
    checks: ['K값을 직접 만졌다', '흰 부분이 희게 보인다', '피부색이 자연스럽다'],
    sources: [SRC.sd_night, SRC.ontour_night]
  },
  {
    id: 'snow-ev', cat: ['setting', 'scene'], level: 1, lens: ['1x'],
    title: '설경은 EV +1~2',
    tagline: '하얀 눈을 찍으면 카메라는 어둡게 잡습니다.',
    keywords: '설경 눈 노출보정 EV 플러스 하얗게',
    principle: '반사율이 높은 흰 눈에 맞춰 카메라가 노출을 낮게 잡아 회색 눈이 됩니다. EV를 +1~2로 올리면 눈으로 보는 밝기에 가까워지고, 이 설정은 앱을 껐다 켜도 유지됩니다.',
    steps: [
      '촬영 화면을 터치해 해 아이콘을 띄운다.',
      'EV를 +1로 올려 한 장 찍어 본다.',
      '눈의 결이 남는 선에서 +2까지 조정한다.'
    ],
    badges: [{ k: 'EV', v: '+1~2' }, { k: '대상', v: '설경' }],
    fails: ['EV 0으로 찍어 눈이 회색으로 죽은 사진', 'EV를 과하게 올려 눈의 결이 사라진 사진'],
    checks: ['EV가 +로 올라가 있다', '눈이 하얗게 보인다', '눈의 결이 남아 있다'],
    sources: [SRC.hani_snow]
  },
  {
    id: 'night-mode-time', cat: ['setting', 'night'], level: 2, lens: ['1x'],
    title: '야간 모드 노출 시간 직접 고르기',
    tagline: '길게 잡으면 밝아지고, 대신 흔들릴 위험도 커집니다.',
    keywords: '야간모드 나이트모드 노출시간 롱 익스포저 아이폰 갤럭시',
    principle: '아이폰은 야간 모드 아이콘을 눌러 노출 시간을 직접 고를 수 있고, 갤럭시 나이트 모드는 조명 밝기에 따라 3·5·10초를 화면에 표시합니다. 삼각대가 있으면 길게, 들고 찍으면 짧게 잡는 것이 기준입니다.',
    steps: [
      '어두운 곳에서 카메라를 열고 야간 모드 아이콘을 누른다.',
      '화면에 표시된 노출 시간을 확인한다.',
      '삼각대가 있으면 길게, 없으면 3초 이내로 잡는다.'
    ],
    badges: [{ k: '설정', v: '노출 시간' }, { k: '표시', v: '3·5·10초' }],
    fails: ['자동 시간을 믿고 들고 찍어 흔들린 사진', '시간을 최대로 두고 움직이는 피사체를 찍은 사진'],
    checks: ['노출 시간을 확인했다', '폰이 고정돼 있다', '피사체가 정지해 있다'],
    sources: [SRC.apple_night, SRC.ontour_night]
  },
  {
    id: 'portrait-distance', cat: ['setting', 'pose'], level: 2, lens: ['3x'],
    title: '인물 모드는 30cm~2m 안에서',
    tagline: '너무 가까우면 흐림 효과가 아예 걸리지 않습니다.',
    keywords: '인물모드 거리 30cm 2m F값 심도 블러',
    principle: '인물 사진 모드의 배경 흐림은 보통 30cm 이상 2m 이내에서 적용됩니다. F값이 낮을수록, 블러 숫자가 높을수록 배경이 더 흐려지고, 촬영 뒤에도 초점과 강도를 바꿀 수 있습니다.',
    steps: [
      '인물 모드에서 피사체와 1m 안팎 거리를 둔다.',
      '화면의 거리 안내가 사라지는지 확인한다.',
      'F값이나 블러 숫자로 흐림 정도를 정한다.'
    ],
    badges: [{ k: '거리', v: '30cm~2m' }, { k: '설정', v: 'F값' }],
    fails: ['피사체에 바짝 붙어 흐림이 안 걸린 사진', '너무 멀리 서서 인물이 작아진 사진'],
    checks: ['거리 안내가 사라졌다', '배경이 자연스럽게 흐려졌다', '인물 가장자리가 깨지지 않았다'],
    sources: [SRC.apple_portrait, SRC.hani_portrait]
  },
  {
    id: 'portrait-light', cat: ['setting', 'pose'], level: 2, lens: ['3x'],
    title: '인물 모드 조명 5종',
    tagline: '촬영 전에 조명을 고르면 보정 없이 표정이 살아납니다.',
    keywords: '인물조명 스튜디오 컨투어 스테이지 하이키 모노 아이폰',
    principle: '인물 모드는 스튜디오·컨투어·스테이지·스테이지 모노·하이키 모노 5종 조명을 제공하고 촬영 후에도 강도를 조절할 수 있습니다. 역광에서 얼굴을 살리는 데는 스튜디오와 스테이지가 가장 실용적입니다.',
    steps: [
      '인물 모드에서 아래 조명 목록을 좌우로 넘긴다.',
      '얼굴과 배경에 맞는 효과를 하나 고른다.',
      '찍은 뒤 편집에서 조명 강도를 조정한다.'
    ],
    badges: [{ k: '효과', v: '5종' }, { k: '보정', v: '촬영 후 가능' }],
    fails: ['조명 효과를 최대로 올려 얼굴이 뭉개진 사진', '흑백 효과와 컬러 배경이 섞여 어색한 사진'],
    checks: ['조명 효과를 골랐다', '눈과 입이 살아 있다', '배경과 톤이 어울린다'],
    sources: [SRC.apple_portrait]
  },
  {
    id: 'raw-format', cat: ['setting', 'night'], level: 3, lens: ['1x'],
    title: 'RAW로 남기면 밤이 버틴다',
    tagline: '어두운 사진은 JPEG보다 RAW가 훨씬 많이 살아납니다.',
    keywords: 'RAW ProRAW Expert RAW 저장 형식 후보정 용량',
    principle: 'RAW는 압축을 거치지 않아 밝기와 색을 되살릴 여지가 큽니다. 대신 RAW+JPEG로 두면 저장 공간이 2배 이상 필요하고, 갤럭시는 프로 모드에서 촬영 형식을 RAW 및 JPEG로 함께 둘 수 있습니다.',
    steps: [
      '카메라 설정에서 RAW 또는 RAW+JPEG를 켠다.',
      '남은 저장 공간을 확인한다.',
      '촬영 후 편집에서 하이라이트와 그림자를 살린다.'
    ],
    badges: [{ k: '형식', v: 'RAW+JPEG' }, { k: '주의', v: '용량' }],
    fails: ['저장 공간이 없어 RAW가 저장되지 않은 경우', 'RAW를 켜 두고 연사해 저장이 밀린 경우'],
    checks: ['RAW가 켜져 있다', '저장 공간이 충분하다', '편집에서 계조가 살아난다'],
    sources: [SRC.ontour_night]
  },
  {
    id: 'grading', cat: ['setting', 'cafe'], level: 2, lens: ['1x'],
    title: '프로 모드 색감 손잡이 5개',
    tagline: '대비·하이라이트·채도·틴트·그림자, 이 다섯이면 봄 색이 살아납니다.',
    keywords: '프로모드 색감 보정 대비 채도 틴트 그림자 벚꽃',
    principle: '필터 대신 촬영 전에 색을 정하면 하늘이 덜 뭉개집니다. 갤럭시 프로 모드에서 대비 -10, 하이라이트 +5, 채도 +10, 틴트 +2, 그림자 -7로 찍은 벚꽃 사례가 있습니다.',
    steps: [
      '카메라를 프로 모드로 바꾼다.',
      '대비 -10 · 하이라이트 +5 · 채도 +10 · 틴트 +2 · 그림자 -7로 맞춘다.',
      '한 장 찍어 보고 채도와 틴트만 미세 조정한다.'
    ],
    badges: [{ k: '대비', v: '-10' }, { k: '채도', v: '+10' }, { k: '틴트', v: '+2' }],
    fails: ['채도만 올려 꽃잎이 형광색으로 뜬 사진', '틴트를 과하게 올려 전체가 분홍 안개가 된 사진'],
    checks: ['하이라이트가 살아 있다', '채도가 자연스럽다', '흰 꽃잎이 하얗게 보인다'],
    sources: [SRC.ig_23]
  },

  /* ── 혼자 여행·셀카봉 ─────────────────────────── */
  {
    id: 'selfie-height', cat: ['solo'], level: 1, lens: ['1x'],
    title: '셀카봉은 눈보다 한 뼘 위',
    tagline: '렌즈가 눈보다 조금 위에 오면 얼굴이 갸름해지고 배경이 넓어집니다.',
    keywords: '셀카봉 셀피 각도 롱셀카봉 얼굴 갸름 배경 여행',
    principle: '카메라를 눈높이보다 한 뼘 위에 두고 아래로 15~30도 기울이면 얼굴이 작아 보이고 배경이 2/3 들어옵니다. 아래에서 올려 찍으면 얼굴이 커지고 비율이 어색해집니다.',
    steps: [
      '셀카봉을 눈높이보다 한 뼘 위로 올린다.',
      '폰을 15~30도 아래로 숙여 내려다보는 각도를 만든다.',
      '얼굴은 화면 가운데 위, 배경은 2/3를 차지하게 한다.'
    ],
    badges: [{ k: '높이', v: '눈+한 뼘' }, { k: '각도', v: '15~30° 하향' }],
    fails: ['머리 위 여백이 절반을 넘는 사진', '팔을 쭉 뻗어 어깨가 올라간 자세'],
    checks: ['렌즈가 눈보다 위에 있다', '머리 위 여백이 과하지 않다', '배경이 절반 이상 보인다'],
    sources: [SRC.haruw, SRC.dolmen]
  },
  {
    id: 'selfie-distance', cat: ['solo'], level: 1, lens: ['1x'],
    title: '셀피는 팔보다 조금 더 멀리',
    tagline: '얼굴이 화면 절반을 넘으면 코가 커지고 어깨가 올라갑니다.',
    keywords: '셀피 거리 얼굴 비례 팔길이 셀카봉',
    principle: '카메라가 얼굴에 가까울수록 중심부가 과장됩니다. 팔을 반쯤 펴거나 셀카봉을 20~30cm 더 펼쳐 얼굴이 화면의 절반을 넘지 않게 하면 비례와 표정이 함께 좋아집니다.',
    steps: [
      '팔을 반쯤 펴거나 셀카봉을 20~30cm 펼친다.',
      '얼굴이 화면 절반을 넘지 않게 거리를 잡는다.',
      '배경이 함께 보이는지 확인한다.'
    ],
    badges: [{ k: '거리', v: '팔+20~30cm' }, { k: '비례', v: '얼굴 1/2 이하' }],
    fails: ['폰을 얼굴에 붙여 코가 커진 셀피', '팔을 굽혀 어깨가 올라간 셀피'],
    checks: ['얼굴이 화면 절반 이하다', '배경이 보인다', '어깨에 힘이 없다'],
    sources: [SRC.jamie, SRC.haruw]
  },
  {
    id: 'night-selfie-light', cat: ['solo', 'night'], level: 1, lens: ['1x'],
    title: '야경 셀카는 간판 빛 앞 한 발짝',
    tagline: '어두운 골목에서 찍으면 얼굴만 사라집니다. 빛으로 걸어가세요.',
    keywords: '야경 셀카 인물 광원 간판 쇼윈도 노출 셀피 밤',
    principle: '밤에는 화면에서 가장 밝은 곳으로 시선이 가므로 인물도 광원 가까이에 서야 합니다. 간판이나 쇼윈도에서 한 발짝 앞에 서면 얼굴이 살고, 광원 바로 아래는 눈 밑 그림자가 지므로 반 발짝 더 앞으로 나옵니다. 얼굴을 터치해 초점과 노출을 잡고 1~2장 찍어 배경 불빛과의 균형을 봅니다.',
    steps: [
      '간판이나 쇼윈도 빛을 찾아 그 앞 한 발짝에 선다.',
      '눈 밑 그림자가 지면 반 발짝 앞으로 나온다.',
      '얼굴을 터치해 초점·노출을 잡고 한 장 더 찍어 비교한다.'
    ],
    badges: [{ k: '거리', v: '한 발짝' }, { k: '광원', v: '얼굴 앞' }],
    fails: ['광원에서 멀리 서서 얼굴만 어둡게 나온 사진', '간판 바로 아래 서서 눈 밑이 새까맣게 찍힌 사진'],
    checks: ['얼굴에 빛이 닿는다', '눈 밑 그림자가 없다', '배경 불빛이 하얗게 날아가지 않았다'],
    sources: [SRC.pajoox, SRC.nightmarket_guide]
  },
  {
    id: 'selfie-marker', cat: ['solo'], level: 2, lens: ['1x'],
    title: '물병으로 내 자리 먼저 확인',
    tagline: '빈 프레임에 물병을 세워 두고, 그 자리에 내가 들어갑니다.',
    keywords: '자리 표시 마커 테스트 컷 혼자 구도 잡기',
    principle: '혼자서는 내가 화면 어디에 서야 하는지 알기 어렵습니다. 물병이나 가방을 설 자리에 두고 1~2장 테스트 컷을 찍으면 여백과 수평을 눈으로 확인할 수 있습니다.',
    steps: [
      '폰을 고정하고 내가 설 자리에 물병을 둔다.',
      '테스트 컷으로 위치·여백·수평을 확인한다.',
      '물병을 치우고 그 자리에 서서 타이머로 찍는다.'
    ],
    badges: [{ k: '도구', v: '물병·가방' }, { k: '절차', v: '테스트 컷' }],
    fails: ['마커 없이 감으로 서서 화면 끝에 걸린 사진', '테스트 컷에서 수평을 확인하지 않고 그대로 찍기'],
    checks: ['테스트 컷으로 자리를 확인했다', '발끝이 잘리지 않는다', '배경선이 머리를 가르지 않는다'],
    sources: [SRC.jetlag]
  },
  {
    id: 'backview', cat: ['solo', 'scene'], level: 1, lens: ['1x'],
    title: '뒤태 구도 — 풍경이 주인공',
    tagline: '뒷모습으로 서면 표정 부담 없이 여행의 분위기가 남습니다.',
    keywords: '뒤태 뒷모습 여행 감성 풍경 인물 실루엣',
    principle: '풍경을 바라보는 뒷모습은 감정을 강요하지 않아 여행 사진에 잘 맞습니다. 인물을 화면 아래 1/3에 작게 두고 풍경을 2/3 담으면 장소가 주인공이 됩니다.',
    steps: [
      '풍경이 잘 보이는 지점에 선다.',
      '인물을 화면 아래 1/3, 한쪽 옆에 작게 배치한다.',
      '시선이 향하는 쪽에 여백을 남기고 찍는다.'
    ],
    badges: [{ k: '구도', v: '하단 1/3' }, { k: '주인공', v: '풍경' }],
    fails: ['인물을 정중앙에 크게 두어 풍경이 가려진 사진', '하늘만 절반 이상 담아 밋밋한 사진'],
    checks: ['풍경이 2/3 이상이다', '인물이 하단 1/3에 있다', '시선 방향에 여백이 있다'],
    sources: [SRC.solo1, SRC.mytravel]
  },
  {
    id: 'walk-burst', cat: ['solo', 'pose'], level: 2, lens: ['1x'],
    title: '멈추지 말고 걸어오다 한 컷',
    tagline: '서 있는 포즈보다 걷는 중간이 훨씬 자연스럽습니다.',
    keywords: '걷는 포즈 연속 촬영 자연스러움 움직임 버스트',
    principle: '몸이 움직이는 동안에는 표정과 손에 힘이 빠집니다. 3~5초 연속 촬영이나 3초 타이머로 걷는 중간을 잡으면 팔이 흔들려 자연스러운 한 컷이 나옵니다.',
    steps: [
      '폰을 고정하고 연속 촬영이나 3초 타이머를 준비한다.',
      '카메라 쪽으로 천천히 세 걸음 걷는다.',
      '시선은 한 컷은 렌즈, 한 컷은 옆, 한 컷은 발끝으로 준다.'
    ],
    badges: [{ k: '설정', v: '연속 촬영' }, { k: '동작', v: '세 걸음' }],
    fails: ['서서 정면만 응시해 굳은 사진', '한 장만 찍고 확인하지 않는 경우'],
    checks: ['여러 장을 연속으로 찍었다', '팔이 몸에 붙어 굳지 않았다', '발이 화면 밖으로 잘리지 않았다'],
    sources: [SRC.jetlag, SRC.jamie]
  },
  {
    id: 'ultrawide-selfie', cat: ['solo'], level: 2, lens: ['0.5x'],
    title: '0.5x 셀피는 얼굴을 중앙에',
    tagline: '배경을 넓게 담는 대신, 얼굴이 가장자리로 가면 늘어납니다.',
    keywords: '초광각 0.5 광각 셀카 배경 여행 왜곡',
    principle: '초광각(0.5x)은 가장자리로 갈수록 피사체를 늘려 그립니다. 얼굴을 중앙 1/3 안에 두고 배경 랜드마크를 가장자리에 배치하면 넓은 여행지와 자연스러운 얼굴을 함께 담습니다.',
    steps: [
      '0.5x 렌즈를 선택한다.',
      '얼굴을 화면 중앙에 두고 팔을 조금 앞으로 뻗는다.',
      '배경의 랜드마크가 가장자리에 오도록 살짝 돌린다.'
    ],
    badges: [{ k: '렌즈', v: '0.5x' }, { k: '주의', v: '얼굴 중앙' }],
    fails: ['얼굴을 구석에 두어 코와 이마가 늘어난 사진', '실내 좁은 곳에서 초광각으로 얼굴을 가까이 댄 사진'],
    checks: ['얼굴이 중앙에서 벗어나지 않았다', '배경이 넓게 담겼다', '수직선이 과하게 휘지 않았다'],
    sources: [SRC.mytravel, SRC.kaa25]
  },
  {
    id: 'pet-eye', cat: ['pose', 'solo'], level: 1, lens: ['1x', '3x'],
    title: '반려동물은 무릎 꿇고 눈높이로',
    tagline: '서서 내려다보면 머리만 커지고 배경에는 바닥이 남습니다.',
    keywords: '반려동물 강아지 고양이 눈높이 로우앵글 초점 연사',
    principle: '사람 눈높이에서 내려다보면 머리는 커지고 몸은 작아지며 배경에는 바닥만 남아 흐림도 만들기 어렵습니다. 무릎을 굽혀 눈높이를 맞추면 표정이 살아나고, 가까운 쪽 눈에 초점을 두면 털 결까지 선명합니다. 움직이는 순간은 연속 촬영으로 3~5장을 남겨 고릅니다.',
    steps: [
      '무릎을 굽히거나 앉아 렌즈를 눈높이에 맞춘다.',
      '가까운 쪽 눈을 터치해 초점을 잡는다.',
      '움직이기 시작하면 연속 촬영으로 3~5장을 담는다.'
    ],
    badges: [{ k: '높이', v: '눈높이' }, { k: '초점', v: '눈' }],
    fails: ['서서 내려다봐 머리만 크고 배경이 바닥인 사진', '플래시를 켜 눈이 하얗게 뜨고 아이가 놀란 사진'],
    checks: ['렌즈가 눈높이다', '눈에 초점이 맞았다', '배경이 단순하다'],
    sources: [SRC.kaminbeth, SRC.petpotal]
  },
  {
    id: 'scene-first', cat: ['solo', 'scene'], level: 1, lens: ['1x'],
    title: '배경을 먼저 정하고 내가 들어간다',
    tagline: '주인공을 따라다니지 말고 배경과 구도를 먼저 결정하세요.',
    keywords: '혼자 여행 배경 구도 먼저 인물 나중',
    principle: '좋은 인물 사진은 인물을 떼어 놓아도 사진이 됩니다. 여행지에서는 배경과 구도를 먼저 잡고 폰을 고정한 뒤 정한 자리에 들어가 3초 타이머로 찍는 편이 안정적입니다.',
    steps: [
      '빈 프레임으로 배경과 구도를 먼저 잡는다.',
      '삼각대나 난간에 폰을 고정한다.',
      '정한 자리에 들어가 타이머로 찍는다.'
    ],
    badges: [{ k: '순서', v: '배경 먼저' }, { k: '도구', v: '타이머' }],
    fails: ['인물부터 세우고 배경을 나중에 맞춘 사진', '배경이 잘려 여행지가 어디인지 모를 사진'],
    checks: ['배경이 먼저 정해졌다', '인물이 그 안에 들어갔다', '여행지가 보인다'],
    sources: [SRC.hani_grid]
  },
  {
    id: 'phone-flip', cat: ['solo', 'scene'], level: 1, lens: ['1x'],
    title: '폰을 뒤집으면 렌즈가 내려간다',
    tagline: '로우앵글을 잡고 싶은데 손이 안 내려간다면 폰을 돌리세요.',
    keywords: '폰 뒤집기 로우앵글 렌즈 위치 낮게 촬영',
    principle: '스마트폰 렌즈는 폰 위쪽에 붙어 있어 허리 높이에서 들면 눈높이보다 높은 앵글이 됩니다. 폰을 위아래로 뒤집으면 같은 손 높이에서 렌즈가 5~7cm 내려가 로우앵글이 잡힙니다.',
    steps: [
      '폰을 위아래로 뒤집어 든다.',
      '렌즈가 아래를 향하게 잡고 팔을 살짝 뻗는다.',
      '화면을 보며 수평을 맞춘다.'
    ],
    badges: [{ k: '팁', v: '폰 뒤집기' }, { k: '효과', v: '렌즈 -5~7cm' }],
    fails: ['허리만 굽혀 찍어 수평이 무너진 사진', '뒤집은 뒤 화면 방향을 확인하지 않은 사진'],
    checks: ['렌즈가 낮아졌다', '수평이 맞다', '발끝이 프레임에 있다'],
    sources: [SRC.hani_2015]
  },
  {
    id: 'many-angles', cat: ['solo'], level: 1, lens: ['1x'],
    title: '한 자리에서 세 각도, 세 컷',
    tagline: '한 장으로 끝내면 고를 것이 없습니다.',
    keywords: '여러장 각도 비교 선택 베스트컷 높이',
    principle: '같은 자리에서도 높이와 방향을 바꾸면 완전히 다른 사진이 됩니다. 눈높이·허리·무릎 3단계 높이에서 한 장씩, 가로와 세로를 섞어 찍으면 돌아와 고를 수 있습니다.',
    steps: [
      '눈높이에서 한 장 찍는다.',
      '허리 높이와 무릎 높이로 낮춰 각각 한 장씩 찍는다.',
      '가로·세로를 섞어 찍고 돌아와 한 장을 고른다.'
    ],
    badges: [{ k: '높이', v: '3단계' }, { k: '비율', v: '가로+세로' }],
    fails: ['한 장만 찍고 아쉬워하는 경우', '높이는 같고 위치만 조금 바뀐 비슷한 사진들'],
    checks: ['높이가 세 가지다', '가로·세로를 모두 찍었다', '고를 장수가 있다'],
    sources: [SRC.ontour_scene]
  },
  {
    id: 'shadow-self', cat: ['solo', 'scene'], level: 2, lens: ['1x'],
    title: '내 그림자를 주인공으로',
    tagline: '해를 등지면 사진사가 아니라 그림자가 여행 사진에 들어옵니다.',
    keywords: '그림자 셀피 역광 실루엣 혼자 여행',
    principle: '해가 낮게 뜬 아침·저녁에 해를 등지고 서면 내 그림자가 2~3m 길게 앞으로 뻗습니다. 그림자 발끝이 프레임 아래 1/3에 오게 잡으면 혼자서도 사람이 들어간 풍경 사진이 됩니다.',
    steps: [
      '해를 등지고 서서 그림자가 앞으로 길게 뻗는지 확인한다.',
      '폰을 낮게 들어 그림자 발끝이 화면 아래 1/3에 오게 한다.',
      '노출을 -0.3 낮춰 그림자와 지면의 결을 함께 담는다.'
    ],
    badges: [{ k: '시간', v: '해 뜨고 진 직후' }, { k: '그림자', v: '2~3m' }],
    fails: ['해를 정면으로 보고 서서 그림자가 뒤로 사라진 사진', '그림자가 화면 밖으로 잘려 머리만 남은 사진'],
    checks: ['그림자가 화면 안에 있다', '발끝이 하단 1/3에 있다', '그림자 윤곽이 선명하다'],
    sources: [SRC.hani_2015, SRC.solo1]
  },
  {
    id: 'selfie-story-3', cat: ['solo'], level: 2, lens: ['1x'],
    title: '혼자 여행은 3컷 한 세트',
    tagline: '전신·얼굴·디테일. 세 장이면 그날의 이야기가 됩니다.',
    keywords: '여행 스토리 전신 상반신 디테일 세컷',
    principle: '한 장소에서 3컷 — 전신(장소) → 상반신(표정) → 디테일(손·음식·발) 순서로 찍으면 같은 여행이 훨씬 풍부하게 남습니다. 폰을 고정하고 세 번 타이머로 찍으면 혼자서도 가능합니다.',
    steps: [
      '폰을 고정하고 전신을 담는다.',
      '한 걸음 다가가 상반신과 표정을 담는다.',
      '손에 든 컵이나 발밑 디테일을 접사로 담는다.'
    ],
    badges: [{ k: '구성', v: '3컷' }, { k: '순서', v: '전신→얼굴→디테일' }],
    fails: ['전신 사진만 열 장이라 표정이 없는 경우', '세 컷 모두 같은 거리에서 찍힌 사진'],
    checks: ['거리가 세 가지다', '표정이 보이는 컷이 있다', '디테일 컷이 있다'],
    sources: [SRC.jetlag, SRC.mytravel]
  },
  {
    id: 'mirror-selfie', cat: ['solo'], level: 2, lens: ['1x'],
    title: '거울 셀피는 1.5m, 가슴 높이',
    tagline: '거울을 쓰면 셀카봉 없이 전신을 남길 수 있습니다.',
    keywords: '거울 셀피 전신 호텔 실내 셀카',
    principle: '전신 거울 앞 1.2~1.5m에 서서 폰을 가슴 높이에 들면 전신이 담깁니다. 화면이 아니라 거울 속 렌즈를 보고, 폰은 얼굴 옆이 아니라 가슴 쪽에 두어 얼굴을 가리지 않게 합니다.',
    steps: [
      '전신 거울에서 1.2~1.5m 뒤로 선다.',
      '폰을 가슴 높이로 들고 거울 속 렌즈를 본다.',
      '한 발을 살짝 앞으로 빼고 몸을 10~20도 튼다.'
    ],
    badges: [{ k: '거리', v: '1.2~1.5m' }, { k: '높이', v: '가슴' }],
    fails: ['폰을 얼굴 앞에 대어 얼굴이 가려진 사진', '거울에 붙어 다리가 잘린 사진'],
    checks: ['전신이 담겼다', '얼굴이 가려지지 않았다', '거울 얼룩이 없다'],
    sources: [SRC.hani_2015]
  },
  {
    id: 'request-stranger', cat: ['solo'], level: 1, lens: ['1x'],
    title: '부탁은 세 문장, 세 컷',
    tagline: '폰을 넘길 때 구도를 말해 주면 결과가 달라집니다.',
    keywords: '부탁 남에게 찍기 구도 지정 세장',
    principle: '처음 보는 사람에게 부탁할 때는 3문장이면 충분합니다. 세로로, 발끝까지, 하늘 조금 남기고. 이 세 가지만 말하고 세 장을 부탁하면 고를 수 있습니다.',
    steps: [
      '폰을 세로로 맞춰 건넨다.',
      '발끝까지, 하늘 조금 남기고 라고 구도를 말한다.',
      '세 장을 부탁하고 한 장을 고른다.'
    ],
    badges: [{ k: '요청', v: '3문장' }, { k: '장수', v: '3장' }],
    fails: ['그냥 찍어 달라고만 해 얼굴만 크게 나온 사진', '한 장만 부탁해 실패하면 되돌릴 수 없는 경우'],
    checks: ['세로로 부탁했다', '발끝과 하늘이 담겼다', '세 장을 받았다'],
    sources: [SRC.jetlag, SRC.solo1]
  },

  /* ── 인물·포즈 ───────────────────────────────── */
  {
    id: 'eye-thirds', cat: ['pose'], level: 1, lens: ['1x', '3x'],
    title: '눈을 위쪽 교차점에',
    tagline: '얼굴을 한가운데 두지 말고 눈을 격자 교차점에 얹으세요.',
    keywords: '삼분할 삼등분 얼굴 눈 교차점 인물 구도',
    principle: '시선이 가장 먼저 가는 곳은 눈입니다. 눈을 위쪽 1/3 가로선의 두 교차점 중 하나에 두면 사진이 안정되고 머리 위 여백이 생깁니다.',
    steps: [
      '격자를 켜고 상반신을 담는다.',
      '눈을 위쪽 가로선 근처 교차점 하나에 맞춘다.',
      '머리 위 여백을 남기고 턱 아래는 답답하지 않게 한다.'
    ],
    badges: [{ k: '구도', v: '삼분할' }, { k: '기준', v: '눈' }],
    fails: ['정수리를 화면 맨 위에 붙여 머리가 잘린 듯한 사진', '얼굴 뒤 밝은 간판이 시선을 빼앗는 사진'],
    checks: ['눈이 위쪽 1/3선에 있다', '머리 위 여백이 있다', '얼굴 뒤 배경이 단순하다'],
    sources: [SRC.canon, SRC.stylezine]
  },
  {
    id: 'hands-role', cat: ['pose'], level: 1, lens: ['1x', '3x'],
    title: '손에 할 일을 주기',
    tagline: '손이 어색하면 숨기지 말고 옷깃·주머니·컵에 역할을 주세요.',
    keywords: '손 포즈 주머니 옷깃 머리카락 소품 자연스러움',
    principle: '손은 긴장이 가장 먼저 드러나는 곳입니다. 옷깃을 만지거나, 한 손만 주머니에 엄지는 밖으로, 컵을 쥐게 하면 손의 힘이 빠집니다. 손바닥이 화면의 1/4을 넘지 않게 합니다.',
    steps: [
      '한 손은 옷깃이나 소매에 가볍게 닿게 한다.',
      '다른 손은 주머니에 일부만 넣거나 컵을 쥔다.',
      '손등이 아니라 손날이 보이게 살짝 튼다.'
    ],
    badges: [{ k: '포즈', v: '손에 역할' }, { k: '주의', v: '손바닥 금지' }],
    fails: ['양손을 똑같이 붙여 부동자세처럼 보이는 사진', '손바닥을 펴서 카메라로 내미는 사진'],
    checks: ['두 손의 위치가 다르다', '손가락에 힘이 빠져 있다', '손이 얼굴을 가리지 않는다'],
    sources: [SRC.ava, SRC.jamie]
  },
  {
    id: 'body-turn', cat: ['pose'], level: 2, lens: ['1x', '3x'],
    title: '몸은 45도, 얼굴만 정면',
    tagline: '정면으로 딱 서면 증명사진, 45도로 틀면 인물사진이 됩니다.',
    keywords: '45도 각도 몸 틀기 체중 어깨 정면 인물',
    principle: '몸통과 발끝을 30~45도 돌리고 얼굴만 렌즈로 가져오면 몸의 선이 부드러워지고 어깨 힘이 빠져 보입니다. 정면보다 목선이 길어 보입니다.',
    steps: [
      '발끝과 몸통을 30~45도 돌린다.',
      '한쪽 다리에 체중을 싣고 반대 무릎을 푼다.',
      '얼굴만 렌즈로 돌리고 턱을 1cm 앞으로 낸다.'
    ],
    badges: [{ k: '각도', v: '30~45°' }, { k: '얼굴', v: '정면' }],
    fails: ['어깨를 군인처럼 펴 목이 짧아 보이는 사진', '양발에 똑같이 힘을 주어 굳은 자세'],
    checks: ['몸통이 비스듬하다', '어깨가 내려가 있다', '턱선이 살아 있다'],
    sources: [SRC.jamie, SRC.stylezine]
  },
  {
    id: 'lean', cat: ['pose', 'solo'], level: 1, lens: ['1x', '3x'],
    title: '벽·난간엔 한쪽만 기대기',
    tagline: '몸을 맡길 곳이 있으면 손 둘 곳과 사선이 저절로 생깁니다.',
    keywords: '기대기 벽 난간 사선 자세 어색함',
    principle: '어깨나 팔꿈치 한쪽만 벽에 대면 체중의 30~40%를 구조물이 받아 자세가 편해지고 몸에 사선이 생깁니다. 등을 전부 붙이면 납작해 보입니다.',
    steps: [
      '벽·난간·기둥을 찾아 어깨나 팔꿈치 한쪽만 댄다.',
      '반대쪽 다리를 살짝 앞으로 빼 사선을 만든다.',
      '벽에 닿은 손은 누르지 말고 손끝이 스치게 둔다.'
    ],
    badges: [{ k: '포즈', v: '한쪽만' }, { k: '효과', v: '사선' }],
    fails: ['등 전체를 벽에 붙여 납작해 보이는 자세', '난간을 두 손으로 꽉 잡아 긴장한 모습'],
    checks: ['몸에 사선이 있다', '체중이 한쪽에 실렸다', '손이 벽을 누르지 않는다'],
    sources: [SRC.ava, SRC.jamie]
  },
  {
    id: 'frame-in-frame', cat: ['pose', 'scene'], level: 2, lens: ['1x', '3x'],
    title: '문틀·나뭇가지로 액자 만들기',
    tagline: '앞쪽의 무언가로 테두리를 만들면 시선이 인물로 모입니다.',
    keywords: '프레임 속 프레임 액자 문 창문 나뭇가지 단풍',
    principle: '문틀, 창문, 나뭇가지 사이로 인물을 담으면 화면 안에 또 하나의 액자가 생깁니다. 앞쪽 요소는 화면 가장자리 1/4에 두고, 초점은 반드시 얼굴에 둡니다.',
    steps: [
      '문·창·나뭇가지 사이로 인물이 보이는 위치를 찾는다.',
      '액자 요소를 화면 가장자리에 둔다.',
      '초점을 얼굴에 두고 앞 요소는 살짝 흐리게 한다.'
    ],
    badges: [{ k: '구도', v: '프레임' }, { k: '초점', v: '얼굴' }],
    fails: ['액자가 너무 두꺼워 인물이 작아만 보이는 사진', '앞 요소에 초점이 잡혀 인물이 흐린 사진'],
    checks: ['액자 요소가 가장자리에 있다', '얼굴이 프레임 안에 있다', '초점이 얼굴에 맞았다'],
    sources: [SRC.ig_uk, SRC.haomin]
  },
  {
    id: 'space', cat: ['pose'], level: 2, lens: ['1x', '3x'],
    title: '시선이 향하는 쪽을 비우기',
    tagline: '인물이 보는 방향을 비워 두면 사진에 이야기가 생깁니다.',
    keywords: '여백 시선 방향 네거티브 스페이스 감성 인물',
    principle: '인물을 한쪽 1/3에 두고 시선이 향하는 쪽을 비우면 보는 사람이 그 너머를 상상합니다. 시선 쪽을 막으면 답답해 보입니다.',
    steps: [
      '인물을 좌우 1/3 중 한쪽에 세운다.',
      '인물이 바라보는 방향에 여백을 2/3 남긴다.',
      '배경은 벽·하늘·물로 정리한다.'
    ],
    badges: [{ k: '구도', v: '여백 2/3' }, { k: '배경', v: '단순하게' }],
    fails: ['시선 방향이 화면 밖으로 잘려 답답한 사진', '인물 뒤쪽에만 여백을 두어 어색한 사진'],
    checks: ['시선 방향이 비어 있다', '배경이 단순하다', '인물이 가장자리에 붙지 않았다'],
    sources: [SRC.canon, SRC.stylezine]
  },
  {
    id: 'low-angle', cat: ['pose', 'solo'], level: 2, lens: ['0.5x', '1x'],
    title: '로우앵글로 다리 길게, 발끝까지',
    tagline: '허리 높이에서 살짝 아래로. 발끝을 남기면 비율이 살아납니다.',
    keywords: '로우앵글 다리 길게 전신 발끝 비율 광각',
    principle: '카메라를 허리(약 1m)나 무릎 높이로 낮춰 아래에서 위로 찍으면 다리가 길어 보입니다. 대신 얼굴이 커지고 수직선이 모이므로 발끝 여백과 수평을 확인해야 합니다.',
    steps: [
      '카메라를 허리나 무릎 높이로 낮춘다.',
      '발끝 아래 여백을 남기고 머리부터 발끝까지 담는다.',
      '얼굴이 너무 커지면 초광각 대신 1x로 바꾼다.'
    ],
    badges: [{ k: '높이', v: '허리·무릎' }, { k: '확인', v: '발끝 여백' }],
    fails: ['발목이나 무릎에서 프레임이 잘린 사진', '과한 로우앵글로 얼굴이 왜곡된 사진'],
    checks: ['발끝이 잘리지 않았다', '머리 위 여백이 적당하다', '배경 수직선이 과하게 휘지 않았다'],
    sources: [SRC.stylezine, SRC.gudo]
  },
  {
    id: 'crop', cat: ['pose'], level: 1, lens: ['1x', '3x'],
    title: '관절이 아니라 그 사이에서 자르기',
    tagline: '발목·무릎·팔꿈치가 프레임 끝에 걸리면 유난히 어색합니다.',
    keywords: '크롭 자르기 관절 전신 상반신 구도',
    principle: '인물을 자를 때는 관절에서 5cm 이상 떨어진 정강이·허벅지·팔뚝에서 자릅니다. 전신은 발끝 아래, 상반신은 골반 위에서 끊습니다.',
    steps: [
      '전신인지 상반신인지 먼저 정한다.',
      '프레임 끝이 관절에 걸리지 않게 폰을 조금 올리거나 내린다.',
      '촬영 전 화면 네 모서리를 훑어 잘린 곳을 확인한다.'
    ],
    badges: [{ k: '구도', v: '관절 회피' }, { k: '확인', v: '네 모서리' }],
    fails: ['무릎이나 발목만 살짝 잘린 전신 사진', '손목에서 잘려 손이 사라진 상반신 사진'],
    checks: ['관절이 프레임 끝에 없다', '발끝 아래 여백이 있다', '잘린 곳이 의도한 곳이다'],
    sources: [SRC.clien, SRC.carat]
  },
  {
    id: 'shoulder-line', cat: ['pose'], level: 1, lens: ['1x', '3x'],
    title: '렌즈 쪽 어깨를 살짝 내리기',
    tagline: '어깨가 올라가면 목이 짧아 보입니다.',
    keywords: '어깨 목 길이 팔뚝 삼각형 상체',
    principle: '카메라에 가까운 어깨를 1~2cm 내리고 팔뚝과 허리 사이에 삼각형 공간을 만들면 상체가 넓고 편해 보입니다. 어깨를 치켜세우면 목이 짧아집니다.',
    steps: [
      '카메라 쪽 어깨를 숨 내쉬며 내린다.',
      '팔꿈치를 허리에서 조금 떼어 삼각형 공간을 만든다.',
      '가슴을 과하게 펴지 말고 허리만 세운다.'
    ],
    badges: [{ k: '자세', v: '어깨 -1~2cm' }, { k: '효과', v: '목 길이' }],
    fails: ['어깨를 치켜세워 목이 사라진 사진', '팔을 몸에 붙여 상체가 좁아 보이는 사진'],
    checks: ['어깨가 내려가 있다', '팔과 허리 사이에 공간이 있다', '목이 길어 보인다'],
    sources: [SRC.stylezine, SRC.gudo]
  },
  {
    id: 'chin-forward', cat: ['pose'], level: 1, lens: ['1x', '3x'],
    title: '턱은 당기지 말고 1cm 앞으로',
    tagline: '긴장하면 턱이 목으로 들어가 이중턱이 생깁니다.',
    keywords: '턱 앞으로 목 정수리 이중턱 자세',
    principle: '정수리를 위로 세우고 얼굴을 1cm 앞으로 보내면 턱선이 정리되고 목이 길어 보입니다. 턱을 뒤로 당기면 목이 접히고, 과하게 들면 콧구멍이 보입니다.',
    steps: [
      '정수리를 위로 세운다.',
      '얼굴을 1cm만 앞으로 보낸다.',
      '어깨를 내리고 목을 길게 둔다.'
    ],
    badges: [{ k: '자세', v: '정수리 위로' }, { k: '턱', v: '1cm 앞' }],
    fails: ['턱을 뒤로 당겨 목이 접힌 사진', '턱을 과하게 들어 콧구멍이 보이는 사진'],
    checks: ['정수리가 위로 섰다', '턱이 앞으로 나왔다', '목이 길어 보인다'],
    sources: [SRC.jamie]
  },
  {
    id: 'gaze-split', cat: ['pose'], level: 1, lens: ['1x', '3x'],
    title: '렌즈 보는 컷, 비키는 컷',
    tagline: '모든 컷에서 렌즈만 보면 표정이 굳습니다.',
    keywords: '시선 렌즈 응시 옆보기 눈빛 방향',
    principle: '렌즈를 보는 시선은 단정함을, 다른 곳을 보는 시선은 이야기를 만듭니다. 2컷 중 한 컷은 렌즈, 한 컷은 창밖 빛이나 손에 든 물건을 보게 하면 호흡이 달라집니다.',
    steps: [
      '첫 컷은 렌즈를 보게 한다.',
      '둘째 컷은 구체적인 지점(창밖·컵)을 알려 준다.',
      '두 장을 나란히 비교한다.'
    ],
    badges: [{ k: '시선', v: '2종' }, { k: '지시', v: '구체적으로' }],
    fails: ['어디를 볼지 몰라 눈동자가 흔들린 사진', '시선을 돌렸는데 얼굴까지 돌아간 사진'],
    checks: ['렌즈 보는 컷이 있다', '비키는 컷이 있다', '눈에 빛이 들어와 있다'],
    sources: [SRC.jamie]
  },
  {
    id: 'laugh-question', cat: ['pose'], level: 2, lens: ['1x', '3x'],
    title: '웃으라고 하지 말고 물어보기',
    tagline: '웃음은 결과가 아니라 상황에서 나옵니다.',
    keywords: '웃음 표정 자연스러운 미소 대화 질문',
    principle: '웃어 보세요는 가장 어려운 지시입니다. 기분 좋았던 일을 묻고, 대답하다 웃는 순간을 3~5장 연속 촬영으로 잡으면 표정이 자연스럽습니다.',
    steps: [
      '가벼운 질문을 하나 던진다.',
      '대답을 듣다가 웃는 순간을 기다린다.',
      '표정이 풀린 중간을 연속으로 찍는다.'
    ],
    badges: [{ k: '방법', v: '질문' }, { k: '타이밍', v: '웃는 순간' }],
    fails: ['웃어 보세요에 억지 미소가 된 사진', '질문만 하고 셔터를 놓친 경우'],
    checks: ['대화가 있었다', '눈이 웃고 있다', '어깨에 힘이 없다'],
    sources: [SRC.jamie]
  },
  {
    id: 'bg-check', cat: ['pose'], level: 1, lens: ['1x', '3x'],
    title: '셔터 전에 머리 뒤를 본다',
    tagline: '포즈보다 먼저 배경을 보세요. 기둥 하나가 인물을 망칩니다.',
    keywords: '배경 정리 기둥 나뭇가지 얼굴 가로지르는 선',
    principle: '머리 뒤로 기둥이나 나뭇가지가 겹치면 삿갓을 쓴 것처럼 보이고, 얼굴을 가로지르는 선은 시선을 끊습니다. 한 발(약 30cm)만 옆으로 옮기면 대부분 해결됩니다.',
    steps: [
      '머리 뒤와 어깨 뒤 배경을 확인한다.',
      '얼굴을 가로지르는 선이 있는지 본다.',
      '한 발 옆으로 옮겨 배경을 정리한다.'
    ],
    badges: [{ k: '확인', v: '머리 뒤' }, { k: '해결', v: '한 발 이동' }],
    fails: ['머리 위로 기둥이 솟아 삿갓을 쓴 사진', '얼굴을 나뭇가지가 가로지른 사진'],
    checks: ['머리 뒤가 깨끗하다', '얼굴에 선이 없다', '배경이 단순하다'],
    sources: [SRC.jamie, SRC.canon_comp]
  },
  {
    id: 'horizon-neck', cat: ['pose', 'scene'], level: 2, lens: ['1x', '3x'],
    title: '인물 뒤 수평선은 목 아래로',
    tagline: '바다와 하늘의 경계가 목을 지나면 어색해집니다.',
    keywords: '수평선 목 바다 하늘 경계 인물',
    principle: '바닷가 인물 사진에서 하늘과 바다의 경계선이 목 아래 10cm에 오면 인물이 배경에서 분리되어 안정됩니다. 경계가 목을 가로지르면 목이 잘려 보입니다.',
    steps: [
      '카메라를 조금 낮춰 수평선을 내린다.',
      '경계선을 인물의 목 아래에 둔다.',
      '격자로 수평을 맞춘다.'
    ],
    badges: [{ k: '경계', v: '목 아래' }, { k: '구도', v: '수평' }],
    fails: ['수평선이 목을 가로질러 목이 잘려 보이는 사진', '수평선이 기울어 불안한 사진'],
    checks: ['경계선이 목 아래다', '수평이 맞다', '인물이 배경과 분리된다'],
    sources: [SRC.canon_comp]
  },
  {
    id: 'center-symmetric', cat: ['pose'], level: 2, lens: ['1x'],
    title: '중앙 배치는 좌우 대칭일 때만',
    tagline: '가운데 세우려면 배경도 가운데로 맞춰야 합니다.',
    keywords: '중앙 배치 대칭 정면 건축 인물',
    principle: '인물을 중앙에 두면 집중도가 올라가지만, 좌우 1/2이 다르면 불안해집니다. 기둥·문·아치처럼 좌우가 같은 배경에서 중앙 배치가 힘을 냅니다.',
    steps: [
      '인물을 화면 중앙에 세운다.',
      '좌우 배경이 대칭인지 확인한다.',
      '수직·수평을 맞춰 찍는다.'
    ],
    badges: [{ k: '구도', v: '중앙' }, { k: '조건', v: '좌우 대칭' }],
    fails: ['한쪽에만 건물이 있는데 중앙에 세운 사진', '중앙인데 수직이 기운 사진'],
    checks: ['좌우 배경이 비슷하다', '수직이 맞다', '인물이 정중앙이다'],
    sources: [SRC.canon_comp]
  },
  {
    id: 'weight-shift', cat: ['pose'], level: 1, lens: ['1x'],
    title: '한쪽 다리에 체중 싣기',
    tagline: '양발에 똑같이 힘을 주면 증명사진이 됩니다.',
    keywords: '체중 이동 다리 무릎 균형 자세',
    principle: '한쪽 다리에 체중을 싣고 반대 무릎을 10도쯤 풀면 골반에 기울기가 생겨 몸이 자연스러워집니다. 허리는 세우되 가슴을 과하게 펴지 않습니다.',
    steps: [
      '한쪽 다리에 체중을 싣는다.',
      '반대쪽 무릎의 힘을 뺀다.',
      '허리를 세우고 어깨를 내린다.'
    ],
    badges: [{ k: '자세', v: '체중 이동' }, { k: '효과', v: '자연스러움' }],
    fails: ['양발에 힘을 똑같이 주어 굳은 사진', '허리를 젖혀 배가 나와 보이는 사진'],
    checks: ['한쪽 다리에 체중이 실렸다', '무릎이 풀려 있다', '허리가 세워졌다'],
    sources: [SRC.jamie]
  },
  {
    id: 'seated-pose', cat: ['pose'], level: 2, lens: ['1x'],
    title: '앉을 때는 의자 끝에',
    tagline: '등을 붙이고 앉으면 굳습니다. 끝에 걸터앉아 상체를 앞으로.',
    keywords: '앉은 자세 의자 무릎 상체 전신',
    principle: '의자 등받이에 등을 붙이면 상체가 뒤로 젖혀져 배가 나와 보입니다. 의자 끝 1/3에 걸터앉아 상체를 살짝 앞으로, 한 팔은 무릎에 올리면 편안한 사선이 생깁니다.',
    steps: [
      '의자 끝 1/3에 걸터앉는다.',
      '상체를 살짝 앞으로 숙이고 한 팔을 무릎에 올린다.',
      '카메라를 눈높이보다 조금 높여 내려다본다.'
    ],
    badges: [{ k: '자세', v: '의자 끝 1/3' }, { k: '앵글', v: '눈높이+' }],
    fails: ['등을 붙이고 앉아 상체가 뒤로 젖혀진 사진', '무릎이 화면 아래로 잘려 다리가 사라진 사진'],
    checks: ['의자 끝에 앉았다', '상체가 앞으로 숙여졌다', '무릎과 발이 프레임에 있다'],
    sources: [SRC.jamie, SRC.canon_comp]
  },
  {
    id: 'pair-pose', cat: ['pose'], level: 2, lens: ['1x'],
    title: '두 사람은 안쪽 어깨를 붙이기',
    tagline: '나란히 서면 어색합니다. 어깨를 겹치고 키 차이를 활용하세요.',
    keywords: '커플 가족 두 사람 단체 어깨 키차이',
    principle: '두 사람이 나란히 서면 몸이 따로 놉니다. 안쪽 어깨를 살짝 겹치고 바깥 어깨를 30도 틀면 한 덩어리로 보입니다. 키 차이가 크면 한 사람은 계단이나 낮은 곳에 서게 합니다.',
    steps: [
      '두 사람의 안쪽 어깨를 살짝 겹치게 한다.',
      '바깥쪽 사람은 몸을 30도 틀어 카메라를 향한다.',
      '키 차이가 크면 한 사람을 한 단 낮은 곳에 세운다.'
    ],
    badges: [{ k: '배치', v: '어깨 겹치기' }, { k: '키차이', v: '계단 활용' }],
    fails: ['두 사람 사이가 벌어져 남남처럼 보이는 사진', '키가 작은 사람이 화면 끝에서 잘린 사진'],
    checks: ['어깨가 겹쳤다', '두 얼굴이 같은 높이 근처에 있다', '두 사람이 모두 프레임 안에 있다'],
    sources: [SRC.jamie, SRC.stylezine]
  }
];
