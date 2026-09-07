/** true 로 두면 초안 배너와 미확정 항목의 ※ 표시가 켜진다. */
export const DRAFT = false;

export const SITE_DOMAIN = "gorugoru.app";

/** 프로덕션이 아니면 배포 자신의 주소를 쓴다 — 도메인 연결 전에도 og:image 를 받을 수 있다. */
function resolveBaseUrl(): string {
  const canonical = `https://${SITE_DOMAIN}`;
  if (process.env.VERCEL_ENV === "production") return canonical;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return canonical;
}

export const COMPANY = {
  /** 개인정보처리자 표기. 법인 설립 전에는 법인명을 쓰지 않는다. */
  legalName: "고루고루",
  brandName: "고루고루",
  brandNameRoman: "Gorugoru",
  storeDeveloperName: "Gorugoru",

  /** 사업자등록 후 채운다. null 이면 해당 줄이 렌더되지 않는다. */
  representative: null as string | null,
  businessNumber: null as string | null,
  privacyOfficer: null as string | null,

  privacyEmail: `privacy@${SITE_DOMAIN}`,
  supportEmail: `support@${SITE_DOMAIN}`,
} as const;

/**
 * 애드센스 게시자 ID. 실제 광고는 unse.gorugoru.app 에서만 나가지만, 애드센스는
 * 사이트 소유권 확인과 심사를 루트 도메인 기준으로 하므로 랜딩에도 로더 스니펫과
 * ads.txt 가 있어야 한다. 이 사이트에는 광고 단위를 두지 않는다.
 */
export const ADSENSE_CLIENT = "ca-pub-5133545115355844";

/** 같은 도메인 아래 다른 서비스. 심사 크롤러가 루트에서 출발해도 찾을 수 있게 푸터에 건다. */
export const SERVICES = [
  {
    name: "고루고루 운세",
    href: "https://unse.gorugoru.app",
    description: "사주·오늘의 운세·인도 점성술 계산기",
  },
] as const;

export const SITE = {
  /** 정식 주소 — 사이트맵·canonical 용 */
  url: `https://${SITE_DOMAIN}`,
  /** 메타 태그의 절대 URL 기준 */
  baseUrl: resolveBaseUrl(),
  tagline: "세상의 말을 고루고루",
  intro:
    "고루고루는 언어마다 하나씩, 캐릭터와 함께 배우는 언어 학습 앱을 만듭니다. 영어의 잉글잉글부터 아랍어의 라비라비까지, 언어는 달라도 배우는 재미는 같도록 만들고 있습니다.",
} as const;
