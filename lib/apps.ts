/** 앱 라인업의 원본. 색·마스코트·정책 문서 보유 여부가 전부 여기서 나온다. */

export type MascotKey =
  | "eagle"
  | "butterfly"
  | "koala"
  | "bird"
  | "owl"
  | "dog-floppy"
  | "cat"
  | "dog-terrier"
  | "bee";

export type AppPhase = "development" | "planned";

export type GoruApp = {
  /** URL·레포명과 동일하게 유지한다 */
  slug: string;
  /** AA-AA 반복형(짝수 글자)이어야 한다 */
  name: string;
  romanized: string;
  language: string | null;
  mascot: MascotKey;
  mascotLabel: string;
  /** 명도를 맞추고 hue 만 돌린다 */
  bg: string;
  accent: string;
  phase: AppPhase;
  hasLegalDocs: boolean;
  /** null 이면 뱃지 없음. URL 이 null 이면 뱃지만 보이고 링크는 안 걸린다. */
  stores: { appStore: string | null; playStore: string | null } | null;
};

export const APPS: GoruApp[] = [
  {
    slug: "engleengle",
    name: "잉글잉글",
    romanized: "Engleengle",
    language: "영어",
    mascot: "eagle",
    mascotLabel: "독수리",
    bg: "#CFDCEF",
    accent: "#2F6FC4",
    phase: "development",
    hasLegalDocs: true,
    stores: { appStore: null, playStore: null },
  },
  {
    slug: "rabirabi",
    name: "라비라비",
    romanized: "Rabirabi",
    language: "아랍어",
    mascot: "butterfly",
    mascotLabel: "나비",
    bg: "#E9D3E4",
    accent: "#9B4F8C",
    phase: "development",
    hasLegalDocs: true,
    stores: { appStore: null, playStore: null },
  },
  {
    slug: "korikori",
    name: "코리코리",
    romanized: "Korikori",
    language: null,
    mascot: "koala",
    mascotLabel: "코알라",
    bg: "#D7DED2",
    accent: "#5A7A55",
    phase: "planned",
    hasLegalDocs: false,
    stores: null,
  },
  {
    slug: "toritori",
    name: "토리토리",
    romanized: "Toritori",
    language: null,
    mascot: "bird",
    mascotLabel: "새",
    bg: "#F0E0C8",
    accent: "#B07B32",
    phase: "planned",
    hasLegalDocs: false,
    stores: null,
  },
  {
    slug: "surisuri",
    name: "수리수리",
    romanized: "Surisuri",
    language: null,
    mascot: "owl",
    mascotLabel: "부엉이",
    bg: "#D9D3EC",
    accent: "#6155A8",
    phase: "planned",
    hasLegalDocs: false,
    stores: null,
  },
  {
    slug: "chaichai",
    name: "차이차이",
    romanized: "Chaichai",
    language: "중국어",
    mascot: "dog-floppy",
    mascotLabel: "강아지",
    bg: "#F2D3CD",
    accent: "#C2544A",
    phase: "planned",
    hasLegalDocs: false,
    stores: null,
  },
  {
    slug: "penipeni",
    name: "페니페니",
    romanized: "Penipeni",
    language: "일본어",
    mascot: "cat",
    mascotLabel: "고양이",
    bg: "#E6E1CB",
    accent: "#8A7B3E",
    phase: "planned",
    hasLegalDocs: false,
    stores: null,
  },
  {
    slug: "teriteri",
    name: "테리테리",
    romanized: "Teriteri",
    language: "이탈리아어",
    mascot: "dog-terrier",
    mascotLabel: "강아지",
    bg: "#CFE4DB",
    accent: "#3E8874",
    phase: "planned",
    hasLegalDocs: false,
    stores: null,
  },
  {
    slug: "beriberi",
    name: "버리버리",
    romanized: "Beriberi",
    language: "글로벌 / 세계사",
    mascot: "bee",
    mascotLabel: "벌",
    bg: "#F3E6B4",
    accent: "#A08420",
    phase: "planned",
    hasLegalDocs: false,
    stores: null,
  },
];

export const PHASE_LABEL: Record<AppPhase, string> = {
  development: "출시 예정",
  planned: "준비 중",
};

export function getApp(slug: string): GoruApp | undefined {
  return APPS.find((app) => app.slug === slug);
}

export const LEGAL_APPS = APPS.filter((app) => app.hasLegalDocs);

/** 홀수 글자 이름이 들어오면 조판이 깨지므로 빌드를 멈춘다. */
export function splitRepeat(name: string): [string, string] {
  const chars = Array.from(name);
  if (chars.length % 2 !== 0) {
    throw new Error(
      `앱 이름은 AA-AA 반복형이어야 합니다(짝수 글자). 받은 값: "${name}"`,
    );
  }
  const half = chars.length / 2;
  return [chars.slice(0, half).join(""), chars.slice(half).join("")];
}
