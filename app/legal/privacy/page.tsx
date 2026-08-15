import type { Metadata } from "next";
import Link from "next/link";
import { LegalShell } from "@/components/legal/LegalShell";
import { LEGAL_APPS } from "@/lib/apps";
import { COMPANY } from "@/lib/company";

export const metadata: Metadata = {
  title: "고루고루 개인정보처리방침 (공통)",
  description:
    "고루고루의 앱 전반에 공통으로 적용되는 개인정보 처리 원칙입니다. 앱별 처리방침은 각 앱의 하위 페이지를 확인하세요.",
  alternates: { canonical: "/legal/privacy" },
};

/** 공통 문서 — 스토어에는 등록하지 않는다. */
export default function Page() {
  return (
    <LegalShell app={null} kind="privacy" effectiveDate={null}>
      <div className="prose__intro">
        <p>
          본 문서는 {COMPANY.legalName}가 운영하는 앱 전반에 공통으로 적용되는
          개인정보 처리 원칙입니다.
        </p>
        <p>
          <strong>
            개별 앱이 실제로 수집하는 항목은 앱마다 다릅니다.
          </strong>{" "}
          이용 중인 앱의 처리방침을 확인해 주시기 바랍니다.
        </p>
      </div>

      <h2>앱별 개인정보처리방침</h2>
      <ul>
        {LEGAL_APPS.map((app) => (
          <li key={app.slug}>
            <Link href={`/legal/privacy/${app.slug}`}>
              {app.name} 개인정보처리방침
            </Link>
            {app.language ? ` — ${app.language}` : null}
          </li>
        ))}
      </ul>

      <h2>공통 처리 원칙</h2>
      <ol>
        <li>
          <strong>최소 수집</strong> — 서비스 제공에 필요한 최소한의 정보만
          수집합니다. 이름, 생년월일, 전화번호, 주소 등 이용자를 직접 식별하는
          정보는 수집하지 않습니다.
        </li>
        <li>
          <strong>목적 제한</strong> — 수집한 정보는 각 앱의 처리방침에 기재된
          목적 범위 내에서만 이용합니다.
        </li>
        <li>
          <strong>제3자 제공 금지</strong> — 법령에 근거한 경우를 제외하고
          개인정보를 제3자에게 제공하거나 판매하지 않습니다.
        </li>
        <li>
          <strong>앱별 분리 기재</strong> — 각 앱의 처리방침에는 해당 앱이 실제로
          수집하는 항목과 실제로 사용하는 SDK만 기재합니다.
        </li>
      </ol>

      <h2>문의처</h2>
      <ul>
        {COMPANY.privacyOfficer ? (
          <li>개인정보 보호책임자 — {COMPANY.privacyOfficer}</li>
        ) : null}
        <li>
          이메일 —{" "}
          <a href={`mailto:${COMPANY.privacyEmail}`}>{COMPANY.privacyEmail}</a>
        </li>
      </ul>
      <p className="prose__note">
        주소는 기재하지 않습니다. 서면 통지가 필요한 경우 위 이메일로 요청해
        주시기 바랍니다.
      </p>
    </LegalShell>
  );
}
