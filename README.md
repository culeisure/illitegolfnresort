# illitegolfnresort — 고객 전용 안내 (모바일 랜딩)

일라이트 레인보우멤버십 SMS/MMS 전환용 모바일 전용 페이지.
검색엔진 비노출(noindex) 처리. 깃헙 페이지 배포, bit.ly로 단축.

## 구조 (루트에 평탄화 — 깃헙 페이지용)

```
illitegolfnresort/
├── index.html        ← 페이지 본체
├── style.css
├── script.js
├── robots.txt
├── .nojekyll          ← 깃헙 페이지 Jekyll 처리 생략
└── img/               ← 사진·로고
```

## 깃헙 페이지 배포 순서

> 주의: `C:\Users\Johnny` 자체가 git 저장소(윈도우 프로필)라 거기엔 절대 커밋 금지.
> 아래는 이 폴더만 별도 저장소로 올리는 절차.

```powershell
cd C:\Users\Johnny\Desktop\illitegolfnresort
git init
git add .
git commit -m "일라이트 레인보우멤버십 안내 랜딩"
# gh CLI 사용 시 (저장소 생성+푸시 한 번에)
gh repo create illitegolfnresort --public --source=. --remote=origin --push
```

그다음 깃헙에서 **Settings → Pages → Build and deployment**
→ Source: *Deploy from a branch* / Branch: `main` / 폴더 `/ (root)` → Save.
1분 내 빌드 완료 후 접속 주소:

```
https://<깃헙아이디>.github.io/illitegolfnresort/
```

## bit.ly 단축

위 주소를 bit.ly에서 커스텀 백하프(예: `egnr-guide`)로 단축
→ `https://bit.ly/egnr-guide` 를 문자 본문에 사용.

## 검색 차단 — 깃헙 페이지에서 어떻게 보장되나

- **실제 핵심: HTML `noindex` 메타태그** (구글·네이버 색인 방지의 진짜 수단) → 깃헙 페이지에서 그대로 작동.
- `robots.txt`: 깃헙 프로젝트 사이트(`아이디.github.io/저장소/…`)에선 크롤러가
  하위경로 robots.txt를 읽지 않음 → 보조 수단(있어도 무해, 커스텀 도메인 시 작동).
- `X-Robots-Tag` 헤더: 깃헙 페이지는 헤더 설정 불가. 메타태그로 충분.

## 문자(SMS/MMS) 발송 문안

```
(광고)일라이트CC

일라이트CC를 자주 이용하시는 고객님께
레인보우멤버십 한정 구좌를 우선 안내드립니다.

월 6회 라운드 혜택 / 주말 월 2회 가능
호텔 연 30박 멤버십 요금 적용

상세 안내
https://bit.ly/egnr-guide

문의 042-471-1119
무료수신거부 080-877-5688
```

## 연락처 설정 (현재)

| 버튼 | 연결 |
|---|---|
| 전화 상담 / 헤더 / 푸터 문의 | `042-471-1119` |
| 문자 상담 (섹션·하단바) | `010-4087-3443` (본문 자동: "레인보우멤버십 상담 요청드립니다.") |
| 무료수신거부 표기 | `080-877-5688` |

## 자주 바꾸는 부분

| 항목 | 위치 |
|---|---|
| 히어로 사진 | `img/hero.webp` 덮어쓰기 (세로 권장. 프레임 `3:4` 고정, 크롭 기준 `style.css` `.hero__media` `background-position`) |
| 갤러리 사진 | `img/` 해당 파일 덮어쓰기 |
| 혜택/상세 내용 | `index.html` 본문 |
| 전화·문자 번호 | `index.html` 의 `tel:` · `sms:` 링크 |
| 포인트 컬러 | `style.css` `:root` 변수 (`--lime` 등) |
| 전환 측정 연결 | `script.js` `sendEvent()` (GA4 줄 주석 해제) |

## 디자인 메모

- 톤: 일라이트 실제 인테리어 — 크림/스톤 + 차콜슬레이트 + 로고 라임 포인트.
  (초기 딥그린+골드 안은 브랜드 불일치로 폐기 — 되돌리지 말 것)
- 폰트 Pretendard. 모션: 인트로 로고(세션 1회)·켄번즈·스크롤 리빌·진행바·카운트업.
  전부 `prefers-reduced-motion` 존중.
- `img/` 안 미사용 사진(aerial·resort·hero.jpg(옛 노을)·course-02·lobby-eve)은
  히어로/갤러리 교체용 백업.
