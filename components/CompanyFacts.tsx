import { Fragment } from "react";
import { COMPANY } from "@/lib/company";

/** 값이 있는 줄만 렌더하고, 보여줄 게 없으면 블록째 그리지 않는다. */
export function CompanyFacts({
  includeContact = false,
}: {
  /** 정책 페이지에서만 켠다 */
  includeContact?: boolean;
}) {
  const rows: [string, React.ReactNode][] = [];

  if (COMPANY.representative) rows.push(["대표", COMPANY.representative]);
  if (COMPANY.businessNumber)
    rows.push(["사업자등록번호", COMPANY.businessNumber]);
  if (COMPANY.privacyOfficer)
    rows.push(["개인정보 보호책임자", COMPANY.privacyOfficer]);

  if (includeContact) {
    rows.push([
      "문의",
      <a key="mail" href={`mailto:${COMPANY.privacyEmail}`}>
        {COMPANY.privacyEmail}
      </a>,
    ]);
  }

  if (rows.length === 0) return null;

  return (
    /* dl 이 grid 라 dt·dd 가 직계 자식이어야 열이 맞는다 */
    <dl>
      {rows.map(([label, value]) => (
        <Fragment key={label}>
          <dt>{label}</dt>
          <dd>{value}</dd>
        </Fragment>
      ))}
    </dl>
  );
}
