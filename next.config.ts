import type { NextConfig } from "next";

/**
 * 정적 내보내기. trailingSlash 는 기본값(false)을 유지한다 — true 로 켜면
 * /legal/privacy/engleengle 에 308 리다이렉트가 붙어 심사 봇이 놓칠 수 있다.
 */
const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
};

export default nextConfig;
