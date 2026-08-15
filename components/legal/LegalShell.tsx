import type { ReactNode } from "react";
import Link from "next/link";
import { CompanyFacts } from "@/components/CompanyFacts";
import { Mascot } from "@/components/Mascot";
import type { GoruApp } from "@/lib/apps";
import { COMPANY, DRAFT } from "@/lib/company";
import { DOC_TITLE, formatEffectiveDate, type DocKind } from "@/lib/legal";

/**
 * 정책 페이지 껍데기. 파스텔·마스코트·노이즈는 헤더 스트립 안에만 두고 본문은 흰 배경이다.
 * 이 트리에 클라이언트 컴포넌트를 넣지 말 것 — JS 없이 전부 읽혀야 한다.
 */
type LegalShellProps = {
  /** 공통 문서면 null */
  app: GoruApp | null;
  kind: DocKind;
  effectiveDate: string | null;
  lastRevised?: string | null;
  children: ReactNode;
};

export function LegalShell({
  app,
  kind,
  effectiveDate,
  lastRevised,
  children,
}: LegalShellProps) {
  const docTitle = DOC_TITLE[kind];

  return (
    <>
      <a className="skip" href="#doc">
        본문으로 건너뛰기
      </a>

      {DRAFT ? (
        <div className="draft-banner" role="note">
          <div className="shell draft-banner__inner">
            <strong>초안</strong> 이 문서는 법무 검토를 받기 전의 초안입니다. 앱
            출시 및 스토어 제출 전에 확정된 내용으로 교체됩니다. ※ 표시된 항목은
            실제 앱 구현과 대조 확인이 끝나지 않은 항목입니다.
          </div>
        </div>
      ) : null}

      <header className="legal-top">
        <div className="shell legal-top__inner">
          <span className="legal-top__logo">
            <Link href="/">고루고루</Link>
          </span>
          <nav className="legal-top__nav" aria-label="정책 문서">
            <Link href="/legal">문서 목록</Link>
            <Link href="/">브랜드 소개</Link>
          </nav>
        </div>
      </header>

      <div className="legal-strip" data-app={app?.slug}>
        <div className="shell legal-strip__inner">
          <div>
            <h1>
              <span className="legal-strip__app">
                {app ? app.name : COMPANY.brandName}
              </span>
              <span className="legal-strip__doc">{docTitle}</span>
            </h1>
            <p className="legal-strip__dates">
              <span>시행일 {formatEffectiveDate(effectiveDate)}</span>
              {lastRevised ? <span>최종 개정 {lastRevised}</span> : null}
            </p>
          </div>
          {app ? (
            <div className="legal-strip__mascot">
              <Mascot name={app.mascot} label={`${app.name} 마스코트`} />
            </div>
          ) : null}
        </div>
      </div>

      <main className="prose" id="doc">
        <div className="shell">
          <div className="prose__inner">{children}</div>
        </div>
      </main>

      <footer className="legal-footer">
        <div className="shell">
          <CompanyFacts includeContact />
          <p className="legal-footer__links">
            {app ? (
              <>
                <Link href={`/legal/privacy/${app.slug}`}>
                  {app.name} 개인정보처리방침
                </Link>
                <Link href={`/legal/terms/${app.slug}`}>
                  {app.name} 이용약관
                </Link>
              </>
            ) : (
              <Link href="/legal">정책 문서 전체 보기</Link>
            )}
          </p>
        </div>
      </footer>
    </>
  );
}

/** 구현과 대조하지 않은 항목 표시 */
export function Unconfirmed({ confirmed }: { confirmed: boolean }) {
  if (confirmed || !DRAFT) return null;
  return (
    <span className="unconfirmed" title="구현 대조 확인 전">
      ※
    </span>
  );
}
