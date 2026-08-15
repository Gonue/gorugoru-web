import { splitRepeat } from "@/lib/apps";

/**
 * AA-AA 이름을 앞뒤 절반으로 쪼개 색을 다르게 준다.
 * 호버(`.roll-host`)하면 롤업으로 두 덩어리의 색이 자리를 바꾼다.
 */
export function DoubleName({ name }: { name: string }) {
  const [head, tail] = splitRepeat(name);

  return (
    <span className="dbl">
      <Unit text={head} />
      <Unit text={tail} flip />
    </span>
  );
}

function Unit({ text, flip }: { text: string; flip?: boolean }) {
  return (
    <span className={flip ? "dbl__unit dbl__unit--flip" : "dbl__unit"}>
      <span className="dbl__face">{text}</span>
      {/* 굴러 올라오는 글자는 CSS content 로 넣는다 — DOM 에 두면 앱 이름이 원문에 두 벌 남는다 */}
      <span
        className="dbl__face dbl__face--in"
        aria-hidden
        style={{ "--face": JSON.stringify(text) } as React.CSSProperties}
      />
    </span>
  );
}
