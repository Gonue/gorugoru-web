import { APPS } from "@/lib/apps";

/** lib/apps.ts 에서 `[data-app]` 색 규칙을 생성한다. 색의 원본은 CSS 가 아니라 데이터다. */
export function AppTokens() {
  const css = APPS.map(
    (app) => `[data-app="${app.slug}"]{--bg:${app.bg};--accent:${app.accent}}`,
  ).join("");

  return <style>{css}</style>;
}
