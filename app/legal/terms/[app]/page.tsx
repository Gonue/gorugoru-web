import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LegalShell } from "@/components/legal/LegalShell";
import { TermsDoc } from "@/components/legal/TermsDoc";
import { LEGAL_APPS, getApp } from "@/lib/apps";
import { getLegalProfile } from "@/lib/legal";

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
    title: `${app.name} 이용약관`,
    description: `${app.name}(${app.romanized}) 앱의 이용 조건과 절차, 운영자와 이용자의 권리·의무를 정한 약관입니다.`,
    alternates: { canonical: `/legal/terms/${app.slug}` },
  };
}

export default async function Page({ params }: Props) {
  const { app: slug } = await params;
  const app = getApp(slug);
  const profile = getLegalProfile(slug);

  if (!app || !app.hasLegalDocs || !profile) notFound();

  return (
    <LegalShell app={app} kind="terms" effectiveDate={profile.effectiveDate}>
      <TermsDoc app={app} profile={profile} />
    </LegalShell>
  );
}
