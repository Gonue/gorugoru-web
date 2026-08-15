/**
 * 정책 페이지 본문의 사실관계. 문장은 컴포넌트가 짜고 "무엇을 수집하는지"는 여기서 온다.
 * `confirmed: false` 는 실제 구현과 대조하지 않은 초안이며 화면에 ※ 로 표시된다.
 */

export type Confidence = {
  confirmed: boolean;
};

export type CollectedItem = Confidence & {
  category: string;
  items: string[];
  required: boolean;
  method: string;
  purpose: string;
  retention: string;
};

export type Processor = Confidence & {
  name: string;
  provider: string;
  purpose: string;
  handles: string;
  /** 국외 이전 국가. 없으면 null */
  transferredTo: string | null;
  policyUrl: string;
};

export type LegalProfile = {
  /** null 이면 "출시 시 확정" 으로 표기된다 */
  effectiveDate: string | null;
  previousDates: string[];
  /** null = 미정. 값이 정해지면 아동 관련 조항이 자동으로 확정된다. */
  childDirected: boolean | null;
  accountRequired: boolean;
  collected: CollectedItem[];
  processors: Processor[];
  /** 위탁과는 구분된다 */
  thirdPartyProvisions: string[];
  hasPaidItems: boolean;
};

const BASELINE_COLLECTED: CollectedItem[] = [
  {
    category: "기기 및 앱 이용 정보",
    items: ["기기 식별자(광고 식별자 제외)", "OS 버전", "앱 버전", "언어·지역 설정"],
    required: true,
    method: "앱 실행 시 자동 생성·수집",
    purpose: "서비스 제공, 기기 호환성 대응, 오류 원인 파악",
    retention: "수집일로부터 1년",
    confirmed: false,
  },
  {
    category: "학습 기록",
    items: ["학습 진도", "정답·오답 기록", "학습 시간"],
    required: true,
    method: "이용자의 앱 사용 과정에서 자동 생성",
    purpose: "학습 진도 저장, 복습 문항 추천",
    retention: "이용자가 앱을 삭제하거나 데이터 초기화를 요청할 때까지",
    confirmed: false,
  },
  {
    category: "오류 정보",
    items: ["오류 발생 시점", "오류 로그", "충돌 스택 트레이스"],
    required: true,
    method: "오류 발생 시 자동 전송",
    purpose: "앱 안정성 개선",
    retention: "수집일로부터 90일",
    confirmed: false,
  },
  {
    category: "문의 정보",
    items: ["이메일 주소", "문의 내용"],
    required: false,
    method: "이용자가 이메일로 문의한 경우에 한해 수집",
    purpose: "문의 응대 및 처리 결과 회신",
    retention: "처리 완료 후 3년 (전자상거래법상 소비자 불만·분쟁 처리 기록)",
    confirmed: false,
  },
];

const BASELINE_PROCESSORS: Processor[] = [
  {
    name: "Expo Application Services (EAS Update)",
    provider: "Expo, Inc.",
    purpose: "앱 업데이트 배포",
    handles: "기기 식별자, 앱 버전, OS 버전",
    transferredTo: "미국",
    policyUrl: "https://expo.dev/privacy",
    confirmed: false,
  },
];

export const LEGAL_PROFILES: Record<string, LegalProfile> = {
  engleengle: {
    effectiveDate: null,
    previousDates: [],
    childDirected: null,
    accountRequired: false,
    collected: BASELINE_COLLECTED,
    processors: BASELINE_PROCESSORS,
    thirdPartyProvisions: [],
    hasPaidItems: false,
  },
  rabirabi: {
    effectiveDate: null,
    previousDates: [],
    childDirected: null,
    accountRequired: false,
    collected: BASELINE_COLLECTED,
    processors: BASELINE_PROCESSORS,
    thirdPartyProvisions: [],
    hasPaidItems: false,
  },
};

export function getLegalProfile(slug: string): LegalProfile | undefined {
  return LEGAL_PROFILES[slug];
}

export type DocKind = "privacy" | "terms";

export const DOC_TITLE: Record<DocKind, string> = {
  privacy: "개인정보처리방침",
  terms: "이용약관",
};

export function formatEffectiveDate(date: string | null): string {
  return date ?? "출시 시 확정";
}
