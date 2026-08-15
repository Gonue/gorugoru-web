import type { GoruApp } from "@/lib/apps";

/**
 * 스토어 다운로드 뱃지. 아트워크는 공식 파일 그대로 쓴다 — 색·비율 변경은
 * 양쪽 가이드라인 위반이다. URL 이 없으면 링크 없이 흐리게만 보여준다.
 */
type Badge = {
  href: string | null;
  src: string;
  className: string;
  alt: string;
};

export function StoreBadges({ app }: { app: GoruApp }) {
  if (!app.stores) return null;

  const badges: Badge[] = [
    {
      href: app.stores.appStore,
      src: "/badge/app-store-ko.svg",
      className: "badge badge--apple",
      alt: "App Store에서 다운로드",
    },
    {
      href: app.stores.playStore,
      src: "/badge/google-play-ko.png",
      className: "badge badge--google",
      alt: "Google Play에서 다운로드",
    },
  ];

  return (
    <span className="lineup__stores">
      {badges.map((b) =>
        b.href ? (
          <a
            key={b.src}
            href={b.href}
            className="badge-link"
            target="_blank"
            rel="noreferrer noopener"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className={b.className} src={b.src} alt={`${app.name} ${b.alt}`} />
          </a>
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={b.src}
            className={`${b.className} badge--pending`}
            src={b.src}
            alt=""
          />
        ),
      )}
    </span>
  );
}
