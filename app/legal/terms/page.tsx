import type { Metadata } from "next";
import Link from "next/link";
import { LegalShell } from "@/components/legal/LegalShell";
import { LEGAL_APPS } from "@/lib/apps";
import { COMPANY } from "@/lib/company";

export const metadata: Metadata = {
  title: "고루고루 이용약관 (공통)",
  description:
    "고루고루의 앱 전반에 공통으로 적용되는 이용 조건입니다. 앱별 약관은 각 앱의 하위 페이지를 확인하세요.",
  alternates: { canonical: "/legal/terms" },
};

/** 공통 문서 — 스토어에는 등록하지 않는다. */
export default function Page() {
  return (
    <LegalShell app={null} kind="terms" effectiveDate={null}>
      <div className="prose__intro">
        <p>
          본 문서는 {COMPANY.legalName}가 제공하는 앱 전반에 공통으로 적용되는
          이용 조건입니다. 개별 앱의 약관이 본 문서와 다르게 정한 사항이 있는
          경우 개별 앱의 약관이 우선합니다.
        </p>
      </div>

      <h2>앱별 이용약관</h2>
      <ul>
        {LEGAL_APPS.map((app) => (
          <li key={app.slug}>
            <Link href={`/legal/terms/${app.slug}`}>{app.name} 이용약관</Link>
            {app.language ? ` — ${app.language}` : null}
          </li>
        ))}
      </ul>

      <h2>공통 사항</h2>
      <ol>
        <li>
          <strong>서비스의 성격</strong> — 각 앱은 언어 학습을 돕는 도구이며,
          특정 시험 성적이나 어학 능력 향상을 보장하지 않습니다.
        </li>
        <li>
          <strong>결제와 환불</strong> — 유료 상품이 있는 앱의 결제와 환불은 Apple
          App Store 및 Google Play 스토어의 정책에 따릅니다.
        </li>
        <li>
          <strong>지식재산권</strong> — 앱, 학습 콘텐츠, 마스코트 캐릭터, 상표,
          디자인에 대한 권리는 운영자에게 귀속됩니다. 이용자의 학습 데이터는 이용자에게
          귀속됩니다.
        </li>
        <li>
          <strong>준거법과 관할</strong> — 대한민국 법령을 준거법으로 하며, 관할
          법원은 「민사소송법」에 따라 정합니다.
        </li>
      </ol>

      <h2>문의</h2>
      <p>
        <a href={`mailto:${COMPANY.supportEmail}`}>{COMPANY.supportEmail}</a>
      </p>
    </LegalShell>
  );
}
