import Link from "next/link";
import { APPS, PHASE_LABEL } from "@/lib/apps";
import { DoubleName } from "./DoubleName";
import { Mascot } from "./Mascot";
import { StoreBadges } from "./StoreBadges";

/** 행에 호버하면 그 행이 해당 앱의 `--bg` 로 채워진다. 활성 상태는 배경 반전으로만 표현한다. */
export function Lineup() {
  return (
    <ol className="lineup">
      {APPS.map((app) => (
        <li
          key={app.slug}
          className="lineup__row roll-host"
          data-app={app.slug}
          data-phase={app.phase}
        >
          <span className="lineup__mascot">
            <Mascot name={app.mascot} label={app.mascotLabel} />
          </span>

          <span className="lineup__name">
            <DoubleName name={app.name} />
          </span>

          <span className="lineup__lang">{app.language ?? "언어 미정"}</span>

          <span className="lineup__phase">{PHASE_LABEL[app.phase]}</span>

          <StoreBadges app={app} />

          {app.hasLegalDocs ? (
            <span className="lineup__docs">
              <Link href={`/legal/privacy/${app.slug}`}>
                개인정보처리방침
              </Link>
              <Link href={`/legal/terms/${app.slug}`}>이용약관</Link>
            </span>
          ) : null}
        </li>
      ))}
    </ol>
  );
}
