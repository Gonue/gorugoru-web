import type { Metadata } from "next";
import Link from "next/link";
import { CompanyFacts } from "@/components/CompanyFacts";
import { Mascot } from "@/components/Mascot";
import { APPS, LEGAL_APPS, PHASE_LABEL } from "@/lib/apps";
import { COMPANY } from "@/lib/company";

export const metadata: Metadata = {
  title: "정책 문서",
  description:
    "고루고루와 각 앱의 개인정보처리방침 및 이용약관 목록입니다.",
  alternates: { canonical: "/legal" },
};

/** 사람이 문서를 찾을 때 쓰는 목록. 스토어에는 각 앱의 하위 페이지를 제출한다. */
export default function Page() {
  const pending = APPS.filter((app) => !app.hasLegalDocs);

  return (
    <>
      <a className="skip" href="#doc">
        본문으로 건너뛰기
      </a>

      <header className="legal-top">
        <div className="shell legal-top__inner">
          <span className="legal-top__logo">
            <Link href="/">고루고루</Link>
          </span>
          <nav className="legal-top__nav" aria-label="주요 메뉴">
            <Link href="/">브랜드 소개</Link>
          </nav>
        </div>
      </header>

      <div className="legal-strip">
        <div className="shell legal-strip__inner">
          <div>
            <h1>
              <span className="legal-strip__app">{COMPANY.brandName}</span>
              <span className="legal-strip__doc">정책 문서</span>
            </h1>
          </div>
        </div>
      </div>

      <main className="prose" id="doc">
        <div className="shell">
          <div className="prose__inner">
            <div className="prose__intro">
              <p>
                각 앱의 개인정보처리방침과 이용약관입니다. 앱마다 수집하는 항목과
                사용하는 SDK가 다르므로, 이용 중인 앱의 문서를 확인해 주시기
                바랍니다.
              </p>
            </div>

            <h2>앱별 문서</h2>
            <ul className="doc-list">
              {LEGAL_APPS.map((app) => (
                <li key={app.slug} className="doc-list__row" data-app={app.slug}>
                  <span className="doc-list__mascot">
                    <Mascot name={app.mascot} label={app.mascotLabel} />
                  </span>
                  <span className="doc-list__name">
                    {app.name}
                    <small>{app.language ?? "언어 미정"}</small>
                  </span>
                  <span className="doc-list__links">
                    <Link href={`/legal/privacy/${app.slug}`}>
                      개인정보처리방침
                    </Link>
                    <Link href={`/legal/terms/${app.slug}`}>이용약관</Link>
                  </span>
                </li>
              ))}
            </ul>

            <h2>공통 문서</h2>
            <p>
              앱 전반에 적용되는 원칙을 정리한 문서입니다. 개별 앱의 문서가 본
              문서와 다르게 정한 사항이 있는 경우 개별 앱의 문서가 우선합니다.
            </p>
            <ul>
              <li>
                <Link href="/legal/privacy">고루고루 개인정보처리방침 (공통)</Link>
              </li>
              <li>
                <Link href="/legal/terms">고루고루 이용약관 (공통)</Link>
              </li>
            </ul>

            {pending.length > 0 ? (
              <>
                <h2>문서 준비 중인 앱</h2>
                <p>
                  아래 앱은 아직 출시 준비 단계이며, 출시 시점에 문서가
                  게시됩니다.
                </p>
                <ul>
                  {pending.map((app) => (
                    <li key={app.slug}>
                      {app.name} — {PHASE_LABEL[app.phase]}
                    </li>
                  ))}
                </ul>
              </>
            ) : null}

            <h2>문의</h2>
            <ul>
              <li>
                개인정보 관련 —{" "}
                <a href={`mailto:${COMPANY.privacyEmail}`}>
                  {COMPANY.privacyEmail}
                </a>
              </li>
              <li>
                앱 문의 —{" "}
                <a href={`mailto:${COMPANY.supportEmail}`}>
                  {COMPANY.supportEmail}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </main>

      <footer className="legal-footer">
        <div className="shell">
          <CompanyFacts />
        </div>
      </footer>
    </>
  );
}
