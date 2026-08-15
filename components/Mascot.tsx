import type { ReactNode } from "react";
import type { MascotKey } from "@/lib/apps";

/**
 * 마스코트 도형. 확정 시안이 아니라 자리를 잡아두는 기하 도형이다.
 * `currentColor` 를 쓰므로 부모에서 `color: var(--accent)` 만 주면 앱 색이 따라온다.
 */

const MASCOTS: Record<MascotKey, ReactNode> = {
  // 독수리
  eagle: (
    <>
      <path className="m-fill m-back" d="M22 20C14 8 4 8 2 16c-2 9 4 20 12 26 0-8 2-16 8-22Z" />
      <path className="m-fill m-back" d="M42 20C50 8 60 8 62 16c2 9-4 20-12 26 0-8-2-16-8-22Z" />
      <circle className="m-fill" cx="32" cy="30" r="17" />
      <path className="m-ink" d="M20.6 23.4a1.9 1.9 0 0 1 2.5-1.1l5.2 2.1a1.9 1.9 0 1 1-1.4 3.5l-5.2-2.1a1.9 1.9 0 0 1-1.1-2.4Z" />
      <path className="m-ink" d="M43.4 23.4a1.9 1.9 0 0 0-2.5-1.1l-5.2 2.1a1.9 1.9 0 1 0 1.4 3.5l5.2-2.1a1.9 1.9 0 0 0 1.1-2.4Z" />
      <circle className="m-ink" cx="26" cy="31.5" r="2.7" />
      <circle className="m-ink" cx="38" cy="31.5" r="2.7" />
      <path className="m-paper m-edge" d="M25 36.5h14l-5.6 11a1.9 1.9 0 0 1-3.4-.2Z" />
    </>
  ),

  // 나비
  butterfly: (
    <>
      <path className="m-fill" d="M30 24C24 8 8 6 6 18c-1.6 10 10 15 24 13Z" />
      <path className="m-fill" d="M34 24C40 8 56 6 58 18c1.6 10-10 15-24 13Z" />
      <path className="m-fill m-back" d="M30 32c-8-1-18 3-15 12 2.6 7.6 12 2 15-6Z" />
      <path className="m-fill m-back" d="M34 32c8-1 18 3 15 12-2.6 7.6-12 2-15-6Z" />
      <rect className="m-ink" x="30" y="15" width="4" height="37" rx="2" />
      <path className="m-line" d="M30.5 16c-2.5-4-6-5.6-9.5-5M33.5 16c2.5-4 6-5.6 9.5-5" />
      <circle className="m-ink" cx="20.4" cy="10.6" r="2.3" />
      <circle className="m-ink" cx="43.6" cy="10.6" r="2.3" />
    </>
  ),

  // 코알라
  koala: (
    <>
      <circle className="m-fill" cx="13" cy="22" r="11" />
      <circle className="m-fill" cx="51" cy="22" r="11" />
      <circle className="m-paper" cx="13" cy="22" r="5.5" />
      <circle className="m-paper" cx="51" cy="22" r="5.5" />
      <circle className="m-fill" cx="32" cy="34" r="18" />
      <circle className="m-ink" cx="25" cy="31" r="3" />
      <circle className="m-ink" cx="39" cy="31" r="3" />
      <path className="m-ink" d="M32 36c4.4 0 7 2.6 7 6.4S35.7 50 32 50s-7-3.8-7-7.6S27.6 36 32 36Z" />
    </>
  ),

  // 새
  bird: (
    <>
      <path className="m-fill m-back" d="M24 42c-6 3-14 8-18 15 9 1 20-5 25-13Z" />
      <circle className="m-fill" cx="30" cy="32" r="17" />
      <circle className="m-fill m-back" cx="25" cy="14" r="4.4" />
      <circle className="m-fill m-back" cx="33" cy="11.5" r="3.4" />
      <circle className="m-ink" cx="35" cy="29" r="3.2" />
      <path className="m-ink" d="M45 27.5l12 4.2a1.4 1.4 0 0 1 0 2.6L45 38.5Z" />
    </>
  ),

  // 부엉이
  owl: (
    <>
      <path className="m-fill" d="M14 20l3-12 10 8Z" />
      <path className="m-fill" d="M50 20l-3-12-10 8Z" />
      <path className="m-fill" d="M32 12c11 0 19 8 19 19s-8 21-19 21-19-10-19-21 8-19 19-19Z" />
      <circle className="m-paper" cx="23.5" cy="30" r="9" />
      <circle className="m-paper" cx="40.5" cy="30" r="9" />
      <circle className="m-ink" cx="23.5" cy="30" r="4" />
      <circle className="m-ink" cx="40.5" cy="30" r="4" />
      <path className="m-ink" d="M32 36.5l4 6a1.4 1.4 0 0 1-1.2 2.2h-5.6A1.4 1.4 0 0 1 28 42.5Z" />
    </>
  ),

  // 강아지(차이차이) — 늘어진 귀
  "dog-floppy": (
    <>
      <ellipse className="m-fill m-back" cx="11" cy="34" rx="8" ry="15" transform="rotate(-10 11 34)" />
      <ellipse className="m-fill m-back" cx="53" cy="34" rx="8" ry="15" transform="rotate(10 53 34)" />
      <circle className="m-fill" cx="32" cy="31" r="18" />
      <circle className="m-ink" cx="25" cy="29" r="3" />
      <circle className="m-ink" cx="39" cy="29" r="3" />
      <ellipse className="m-paper" cx="32" cy="41" rx="10" ry="8" />
      <ellipse className="m-ink" cx="32" cy="37.5" rx="4" ry="3.1" />
      <path className="m-line" d="M32 41v3.2M32 44.4c-1.6 2-4.4 2-5.6 0M32 44.4c1.6 2 4.4 2 5.6 0" />
    </>
  ),

  // 고양이
  cat: (
    <>
      <path className="m-fill" d="M14 30 12 11l17 8Z" />
      <path className="m-fill" d="M50 30 52 11l-17 8Z" />
      <circle className="m-fill" cx="32" cy="33" r="18" />
      <ellipse className="m-ink" cx="24.5" cy="31" rx="2.7" ry="3.6" />
      <ellipse className="m-ink" cx="39.5" cy="31" rx="2.7" ry="3.6" />
      <path className="m-ink" d="M32 38.5l3.2 3.6a1.2 1.2 0 0 1-.9 2h-4.6a1.2 1.2 0 0 1-.9-2Z" />
      <path className="m-line" d="M22 39l-9-2M22 43l-8 2M42 39l9-2M42 43l8 2" />
    </>
  ),

  // 강아지(테리테리) — 차이차이와는 각진 귀·얼굴로 구분한다
  "dog-terrier": (
    <>
      <path className="m-fill m-back" d="M16 17 7 22l5 20 9-9Z" />
      <path className="m-fill m-back" d="M48 17l9 5-5 20-9-9Z" />
      <rect className="m-fill" x="15" y="13" width="34" height="37" rx="11" />
      <circle className="m-ink" cx="25" cy="28.5" r="2.9" />
      <circle className="m-ink" cx="39" cy="28.5" r="2.9" />
      <path className="m-paper" d="M22 37h20v4c0 5.5-4.5 9.5-10 9.5S22 46.5 22 41Z" />
      <ellipse className="m-ink" cx="32" cy="37.5" rx="3.8" ry="2.9" />
      <path className="m-line" d="M32 41v3.4" />
    </>
  ),

  // 벌
  bee: (
    <>
      <ellipse className="m-paper m-edge" cx="17" cy="24" rx="9" ry="6" transform="rotate(-28 17 24)" />
      <ellipse className="m-paper m-edge" cx="47" cy="24" rx="9" ry="6" transform="rotate(28 47 24)" />
      <ellipse className="m-fill" cx="32" cy="38" rx="15" ry="16" />
      <rect className="m-ink" x="18.5" y="31" width="27" height="5" rx="2.5" />
      <rect className="m-ink" x="21" y="42" width="22" height="5" rx="2.5" />
      <circle className="m-ink" cx="32" cy="16" r="8" />
      <circle className="m-paper" cx="29" cy="15" r="2.1" />
      <circle className="m-paper" cx="35" cy="15" r="2.1" />
      <path className="m-line" d="M28 9c-2-3-5-4-8-3M36 9c2-3 5-4 8-3" />
    </>
  ),
};

type MascotProps = {
  name: MascotKey;
  /** 생략하면 장식으로 취급해 감춘다 */
  label?: string;
  className?: string;
};

export function Mascot({ name, label, className }: MascotProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={className ? `mascot ${className}` : "mascot"}
      role="img"
      aria-hidden={label ? undefined : true}
      aria-label={label}
      focusable="false"
    >
      {label ? <title>{label}</title> : null}
      {MASCOTS[name]}
    </svg>
  );
}
