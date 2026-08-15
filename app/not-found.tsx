import type { Metadata } from "next";
import Link from "next/link";
import { BrandFooter, BrandHeader } from "@/components/BrandChrome";

export const metadata: Metadata = {
  title: "페이지를 찾을 수 없습니다",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <>
      <BrandHeader />
      <main className="hero noise">
        <div className="shell hero__inner">
          <div>
            <h1 className="hero__display">
              <span aria-hidden>404</span>
              <span className="sr-only">404 — 페이지를 찾을 수 없습니다</span>
            </h1>
            <p className="hero__tagline">주소를 찾을 수 없습니다.</p>
            <p className="hero__intro">
              찾으시는 정책 문서는 <Link href="/legal">정책 문서 목록</Link>에서
              확인할 수 있습니다.
            </p>
          </div>
        </div>
      </main>
      <BrandFooter />
    </>
  );
}
