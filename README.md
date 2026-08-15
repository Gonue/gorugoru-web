# gorugoru-web

고루고루 브랜드 페이지 + 앱별 정책 문서 사이트.
Next.js 16 (App Router) · React 19 · TypeScript · 정적 내보내기.

```bash
npm run dev              # http://localhost:3000
npm run build            # out/ 에 정적 HTML 생성
npm run preview:static   # out/ 을 그대로 띄운다 (실제 배포와 같은 조건)
npm run preview:share    # 공유 카드 미리보기
npm run lint
```

---

## 구조

| | 브랜드 페이지 | 정책 페이지 |
|---|---|---|
| URL | `/` | `/legal/...` |
| 읽는 사람 | 잠재 사용자 | 앱 심사 봇, 분쟁 시 확인하는 사람 |
| 스타일 | `app/styles/brand.css` | `app/styles/legal.css` |

토큰·마스코트·폰트는 공유하고 밀도만 다르다. 정책 페이지는 파스텔 배경과 마스코트를
헤더 스트립 안에만 두고, 본문은 흰 배경이다.

**정책 페이지 트리에 클라이언트 컴포넌트를 넣지 말 것.** 지금은 사이트 전체에
클라이언트 JS가 없고, 스크립트를 모두 걷어내도 정책 문서 본문이 그대로 읽힌다.

### 데이터가 원본이다

| 고칠 것 | 파일 |
|---|---|
| 앱 이름·언어·마스코트·색·출시 상태·스토어 링크 | `lib/apps.ts` |
| 회사 정보, 도메인, 태그라인, 초안 플래그 | `lib/company.ts` |
| 앱별 수집 항목·SDK·아동 대상 여부·시행일 | `lib/legal.ts` |
| 마스코트 도형 | `components/Mascot.tsx` |

앱 색은 CSS에 손으로 쓰지 않는다. `lib/apps.ts` 를 고치면
`[data-app="..."]{--bg;--accent}` 규칙이 `components/AppTokens.tsx` 를 통해
빌드 시점에 다시 생성된다.

앱을 추가하려면 `lib/apps.ts` 배열에 항목 하나를 넣는다. 라인업·정책 문서 목록·
사이트맵이 모두 따라온다. 이름은 AA-AA 반복형(짝수 글자)이어야 하며, 아니면
`splitRepeat()` 이 빌드를 멈춘다.

도메인을 바꿀 때 고칠 곳은 `lib/company.ts` 의 `SITE_DOMAIN` 한 줄이다.
사이트 URL과 두 이메일이 여기서 파생된다.

---

## 스토어에 등록할 URL

```
https://gorugoru.app/legal/privacy/engleengle
https://gorugoru.app/legal/terms/engleengle
https://gorugoru.app/legal/privacy/rabirabi
https://gorugoru.app/legal/terms/rabirabi
```

공통 페이지(`/legal/privacy`)를 등록하면 심사에서 걸린다 — 앱별 하위 페이지를
등록해야 한다.

`output: "export"` 로 순수 정적 HTML만 내보내고 `trailingSlash` 는 기본값(false)을
유지한다. true로 켜면 위 URL에 308 리다이렉트가 붙고, 심사 봇이 리다이렉트를
따라가지 못하는 경우가 있다.

`npm run preview:static` 으로 확장자 없는 URL이 리다이렉트 없이 200인지 확인할 수 있다.

---

## 출시 전 확정 필요

- [ ] **두 앱의 타겟 연령대** — `lib/legal.ts` 의 `childDirected: null`.
      값을 넣으면 아동 관련 조항이 확정된다. 디자인에도 영향을 준다(아래 폰트 항목).
- [ ] **수집 항목 및 SDK 목록** — `lib/legal.ts` 의 `confirmed: false` 항목들.
      지금은 Expo 기반 언어 학습 앱의 일반적인 초안이고 화면에 ※ 로 표시된다.
      실제 구현과 대조한 뒤 `true` 로 바꾸거나 삭제한다.
- [ ] **시행일** — `lib/legal.ts` 의 `effectiveDate`. null 인 동안 "출시 시 확정" 으로 표기된다.
- [ ] **스토어 URL** — `lib/apps.ts` 의 `stores`. 넣으면 뱃지가 링크로 바뀐다.
- [ ] **법무 검토 후** `lib/company.ts` 의 `DRAFT = false` — 초안 배너와 ※ 가 사라진다.
- [ ] 로마자 표기 확정 (`slug` — URL과 레포명에 고정된다)
- [ ] 태그라인 최종 선택 (`SITE.tagline` — 공유 카드 이미지도 다시 만들어야 한다)

**사업자 정보는 비워둔 상태다.** `representative` / `businessNumber` /
`privacyOfficer` 가 전부 `null` 이고, null 인 줄은 렌더되지 않는다
(`components/CompanyFacts.tsx`). 개인 개발자에게 사업자등록은 필수가 아니며,
없는 정보를 플레이스홀더로 띄워두는 쪽이 비워두는 쪽보다 나쁘다. 등록 후 값을 채우면
브랜드 푸터와 정책 페이지 푸터에 한꺼번에 다시 나타난다.

같은 이유로 `legalName` 은 법인명이 아니라 `"고루고루"` 다. 존재하지 않는 법인을
개인정보처리자로 적으면 정책 문서에 사실과 다른 내용이 실린다.

정책 문구는 구조와 체크리스트이며 **법률 자문이 아니다.** 실제 문구는 변호사 또는
개인정보보호 전문가의 검토를 받아야 한다.

---

## 폰트

- 디스플레이 **Jua** (Google Fonts) · 본문 **Pretendard** (jsdelivr)

둘 다 CDN이지만 `font-display: swap` 이고 `tokens.css` 의 폴백이 시스템 한글 폰트로
이어진다. 심사 봇이 폰트를 못 받아도 레이아웃이 깨지지 않는다.

디자인 문서가 지정한 Cafe24Ssurround 는 안정적인 CDN 경로를 찾지 못해 같은 성격의
Jua 로 대체했다. 자체 호스팅으로 바꾸려면 `public/fonts/` 에 woff2 를 넣고
`tokens.css` 의 `--font-round` 한 줄만 고친다.

**굵은 라운드 폰트 + 동물 마스코트 + 파스텔은 심사자가 보기에 아동 대상 앱의 신호다.**
연령 등급 판단에 웹사이트의 시각적 톤이 근거로 쓰인다. 성인 학습자 대상으로 확정되면
`tokens.css` 에서 `--font-display` 를 `var(--font-sans)` 로 내린다.

### 한글 아웃라인 조판의 함정

히어로의 `고루/고루` 는 `-webkit-text-stroke` 를 쓴다. 두 가지를 지켜야 한다.

- **채운 줄에는 스트로크를 걸지 않는다.** 먹색 글자에 같은 색 스트로크를 두르면
  획이 번져 `ㄹ` 안쪽 여백을 메우고 `ㅜ` 와 붙어 뭉갠다.
- **자간을 음수로 주지 않는다.** 스트로크가 글자를 양옆으로 넓히므로 그만큼
  되돌려줘야 `고` 와 `루` 가 겹치지 않는다. 두 줄에 같은 값을 걸어야 폭이 맞는다.

---

## 마스코트

`components/Mascot.tsx` 의 인라인 SVG. `currentColor` 를 쓰므로 부모에서
`color: var(--accent)` 만 주면 앱 색이 따라온다. 배경 이미지로 넣으면 색 교체가
불가능해 인라인으로 둔다.

**지금 도형은 확정 시안이 아니라 자리를 잡아두는 기하 도형이다.** 64 그리드 ·
원형 머리 · 먹색 눈 · 종을 가르는 특징 하나. 실제 시안이 나오면 이 파일만 교체한다.

알려진 한계 — 차이차이와 테리테리가 둘 다 강아지다. 귀 모양과 얼굴 윤곽으로
구분했지만 실제 시안에서는 더 확실한 차이가 필요하다. 히어로 일러스트의 동물들과도
아직 그림체가 다르다.

---

## 이미지와 아이콘

`app/` 폴더의 파일명 규칙만 맞추면 Next.js 가 메타 태그를 붙인다.

| 파일 | 쓰이는 곳 | 상태 |
|---|---|---|
| `app/favicon.ico` | 브라우저 탭 | 있음 (16·32·48·64·128·256) |
| `app/opengraph-image.jpg` | 공유 미리보기 | 있음 (1200×630) |
| `app/apple-icon.png` | iOS 홈 화면 (180×180) | **없음** |
| `app/icon.png` + `manifest.ts` | Android · PWA | **없음** |

`output: "export"` 에서는 `next/image` 최적화가 꺼지므로 히어로 일러스트는 크기별
파일을 미리 만들어 `srcset` 으로 고르게 한다(`public/hero-tree-*`).

공유 카드는 **이미지에 글자가 박혀 있다.** 태그라인이 바뀌면 다시 만들어야 한다.

`metadataBase` 는 프로덕션이 아닐 때 배포 자신의 주소를 쓴다. 도메인 연결 전에도
프리뷰 배포에서 `og:image` 를 받을 수 있게 하기 위한 것이다.

### 스토어 뱃지

`public/badge/` 의 공식 아트워크를 그대로 쓴다. 색·비율 변경은 Apple·Google 양쪽
가이드라인 위반이다. Apple 은 검정·흰색만, Google 은 단일 아트워크만 제공한다.

구글 공식 PNG 는 250px 중 위아래 29px 이 규정 여백이라 버튼 자체는 192px 다.
두 파일에 같은 높이를 주면 구글 뱃지만 작아 보이므로 CSS 에서 보정한다.

---

## 배포

Vercel. 퍼블릭 레포이며 정적 HTML이라 소스 공개 리스크는 없다.
`.env` / API 키를 넣을 일이 생기면 `.gitignore` 를 먼저 확인한다 — 퍼블릭 레포는
커밋 히스토리에 한 번 들어간 내용이 삭제 후에도 조회된다.
