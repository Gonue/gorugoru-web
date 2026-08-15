import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { AppTokens } from "@/components/AppTokens";
import { COMPANY, SITE } from "@/lib/company";
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
      </head>
      <body>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
