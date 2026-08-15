import Link from "next/link";
import { LEGAL_APPS } from "@/lib/apps";
import { COMPANY, SITE } from "@/lib/company";

export function BrandHeader() {
  return (
    <header className="brand-header">
      <div className="shell brand-header__inner">
        <p className="brand-header__logo">
          <Link href="/">고루고루</Link>
        </p>
        <nav className="brand-nav" aria-label="주요 메뉴">
          <Link href="/#about">소개</Link>
          <Link href="/#apps">앱</Link>
          <Link href="/#contact">문의</Link>
          <Link href="/legal">정책</Link>
        </nav>
      </div>
    </header>
  );
}

export function BrandFooter() {
  return (
    <footer className="brand-footer" id="contact">
      <div className="shell">
        <div className="brand-footer__grid">
          <section>
            <h2>문의</h2>
            <ul>
              <li>
                개인정보 관련{" "}
                <a href={`mailto:${COMPANY.privacyEmail}`}>
                  {COMPANY.privacyEmail}
                </a>
              </li>
              <li>
                앱 문의{" "}
                <a href={`mailto:${COMPANY.supportEmail}`}>
                  {COMPANY.supportEmail}
                </a>
              </li>
            </ul>
          </section>

          <section>
            <h2>정책</h2>
            <ul>
              {LEGAL_APPS.map((app) => (
                <li key={app.slug}>
                  {app.name}{" "}
                  <Link href={`/legal/privacy/${app.slug}`}>
                    개인정보처리방침
                  </Link>
                  {" · "}
                  <Link href={`/legal/terms/${app.slug}`}>이용약관</Link>
                </li>
              ))}
              <li>
                <Link href="/legal">정책 문서 전체 보기</Link>
              </li>
            </ul>
          </section>

        </div>

        <div className="brand-footer__base">
          <span>
            {COMPANY.legalName} · {SITE.tagline}
          </span>
          <span>{SITE.url.replace("https://", "")}</span>
        </div>
      </div>
    </footer>
  );
}
