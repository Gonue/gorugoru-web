import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { AppTokens } from "@/components/AppTokens";
import { ADSENSE_CLIENT, COMPANY, SITE } from "@/lib/company";
import "./styles/tokens.css";
import "./styles/base.css";
import "./styles/mascot.css";
import "./styles/brand.css";
import "./styles/legal.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.baseUrl),
  title: {
    default: `고루고루 — ${SITE.tagline}`,
    template: `%s | 고루고루`,
  },
  description: SITE.intro,
  applicationName: "고루고루",
  authors: [{ name: COMPANY.legalName }],
  openGraph: {
    type: "website",
    locale: "ko_KR",
    siteName: "고루고루",
    title: `고루고루 — ${SITE.tagline}`,
    description: SITE.intro,
    url: SITE.url,
  },
  /* og:image 는 app/opengraph-image.jpg 가 붙인다. 카드 종류만 지정하면 된다. */
  twitter: { card: "summary_large_image" },
  /*
   * 파비콘은 app/favicon.ico 규약을 쓰지 않고 public/ + 명시 선언으로 간다.
   * 규약을 쓰면 href 에 배포마다 달라지는 캐시 버스팅 쿼리가 붙는데,
   * 구글은 "파비콘 URL 은 고정이어야 하고 자주 바꾸면 안 된다"고 요구한다.
   * 매 배포마다 URL 이 바뀌면 검색결과 파비콘이 자리를 못 잡는다.
   * https://developers.google.com/search/docs/appearance/favicon-in-search
   */
  icons: {
    icon: { url: "/favicon.ico", sizes: "any" },
    apple: { url: "/apple-touch-icon.png", sizes: "180x180" },
  },
  // 심사 봇이 읽어야 하므로 색인을 막지 않는다
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#EDEDF2",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko">
      <head>
        {/* 폰트는 CDN. 못 받아도 tokens.css 의 시스템 폰트 폴백으로 이어진다. */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="preconnect" href="https://cdn.jsdelivr.net" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.css"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Jua&display=swap"
        />
        <AppTokens />
        {/*
          애드센스 로더. 소유권 확인·심사용이다 — 구글이 루트 도메인 <head> 에서 이 태그를
          찾는다. 광고 단위가 없으므로 이 사이트에 광고가 뜨지는 않는다. async 라 렌더를
          막지 않는다.
        */}
        <script
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`}
          crossOrigin="anonymous"
        />
      </head>
      <body>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
