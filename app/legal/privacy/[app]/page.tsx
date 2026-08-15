import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LegalShell } from "@/components/legal/LegalShell";
import { PrivacyDoc } from "@/components/legal/PrivacyDoc";
import { LEGAL_APPS, getApp } from "@/lib/apps";
import { getLegalProfile } from "@/lib/legal";

// 스토어에 제출하는 URL. 공통 페이지가 아니라 이 앱별 페이지를 등록해야 한다.

type Props = { params: Promise<{ app: string }> };

export function generateStaticParams() {
  return LEGAL_APPS.map((app) => ({ app: app.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { app: slug } = await params;
  const app = getApp(slug);
  if (!app) return {};

  return {
    title: `${app.name} 개인정보처리방침`,
    description: `${app.name}(${app.romanized}) 앱의 개인정보 수집·이용·보유에 관한 처리방침입니다.`,
    alternates: { canonical: `/legal/privacy/${app.slug}` },
  };
}

export default async function Page({ params }: Props) {
  const { app: slug } = await params;
  const app = getApp(slug);
  const profile = getLegalProfile(slug);

  if (!app || !app.hasLegalDocs || !profile) notFound();

  return (
    <LegalShell app={app} kind="privacy" effectiveDate={profile.effectiveDate}>
      <PrivacyDoc app={app} profile={profile} />
    </LegalShell>
  );
}
