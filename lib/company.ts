/** 법무 검토 전까지 true — 초안 배너와 미확정 항목의 ※ 표시가 켜진다. */
export const DRAFT = true;

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

export const SITE = {
  /** 정식 주소 — 사이트맵·canonical 용 */
  url: `https://${SITE_DOMAIN}`,
  /** 메타 태그의 절대 URL 기준 */
  baseUrl: resolveBaseUrl(),
  tagline: "세상의 말을 고루고루",
  intro:
    "고루고루는 언어마다 하나씩, 캐릭터와 함께 배우는 언어 학습 앱을 만듭니다. 영어의 잉글잉글부터 아랍어의 라비라비까지, 언어는 달라도 배우는 재미는 같도록 만들고 있습니다.",
} as const;
