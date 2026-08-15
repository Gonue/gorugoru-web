import { Unconfirmed } from "./LegalShell";
import type { GoruApp } from "@/lib/apps";
import { COMPANY, DRAFT } from "@/lib/company";
import type { LegalProfile } from "@/lib/legal";

/** 사실관계는 lib/legal.ts 의 프로필에서 온다. 여기에 직접 적어 넣지 말 것. */
export function PrivacyDoc({
  app,
  profile,
}: {
  app: GoruApp;
  profile: LegalProfile;
}) {
  return (
    <>
      <div className="prose__intro">
        <p>
          본 개인정보처리방침은 {COMPANY.legalName}(이하 &lsquo;운영자&rsquo;)가
          운영하는 <strong>{app.name}</strong>({app.romanized}) 앱에 적용됩니다.
          운영자는 「개인정보 보호법」 등 관련 법령을 준수하며, 이용자의 개인정보를
          본 방침에 따라 처리합니다.
        </p>
        <p>
          {profile.accountRequired
            ? "본 앱은 이용을 위해 계정 생성이 필요합니다."
            : "본 앱은 계정 생성이나 로그인 없이 이용할 수 있으며, 이름·생년월일·전화번호 등 이용자를 직접 식별하는 정보를 수집하지 않습니다."}
        </p>
      </div>

      <h2 id="s1">1. 수집하는 개인정보 항목</h2>
      <p>
        {app.name} 앱은 다음 항목을 수집합니다. 이 목록은 본 앱이 실제로 수집하는
        항목만을 기재한 것이며, 고루고루의 다른 앱과 다를 수 있습니다.
      </p>

      <div className="legal-table-wrap">
        <table className="legal-table">
          <thead>
            <tr>
              <th scope="col">구분</th>
              <th scope="col">항목</th>
              <th scope="col">이용 목적</th>
              <th scope="col">보유 기간</th>
            </tr>
          </thead>
          <tbody>
            {profile.collected.map((row) => (
              <tr key={row.category}>
                <th scope="row">
                  {row.category}
                  <br />
                  <small>{row.required ? "필수" : "선택"}</small>
                  <Unconfirmed confirmed={row.confirmed} />
                </th>
                <td>{row.items.join(", ")}</td>
                <td>{row.purpose}</td>
                <td>{row.retention}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h3>수집 방법</h3>
      <ul>
        {profile.collected.map((row) => (
          <li key={row.category}>
            {row.category} — {row.method}
          </li>
        ))}
      </ul>
      <p className="prose__note">
        선택 항목의 수집에 동의하지 않아도 앱의 기본 기능을 이용할 수 있습니다.
      </p>

      <h2 id="s2">2. 개인정보의 처리 목적</h2>
      <p>
        운영자는 수집한 개인정보를 위 표에 기재된 목적 범위 내에서만 이용합니다.
        목적이 변경되는 경우 「개인정보 보호법」 제18조에 따라 별도의 동의를 받는
        등 필요한 조치를 이행합니다.
      </p>

      <h2 id="s3">3. 개인정보의 보유 및 이용 기간</h2>
      <p>
        운영자는 위 표에 기재된 기간이 지나면 지체 없이 해당 개인정보를 파기합니다.
        다만 관련 법령에서 보존을 요구하는 경우에는 해당 기간 동안 보관합니다.
      </p>
      <ul>
        <li>소비자의 불만 또는 분쟁 처리에 관한 기록 — 3년 (전자상거래법)</li>
        <li>
          앱 이용 기록 및 접속 로그 — 3개월 (통신비밀보호법)
          <Unconfirmed confirmed={false} />
        </li>
      </ul>

      <h2 id="s4">4. 개인정보의 제3자 제공</h2>
      {profile.thirdPartyProvisions.length === 0 ? (
        <p>
          운영자는 {app.name} 앱에서 수집한 개인정보를 제3자에게 제공하지 않습니다.
          법령에 따라 수사기관의 적법한 요청이 있는 경우 등 「개인정보 보호법」
          제17조·제18조가 정한 예외에 해당하는 경우에 한해 제공될 수 있습니다.
        </p>
      ) : (
        <ul>
          {profile.thirdPartyProvisions.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      )}

      <h2 id="s5">5. 개인정보 처리의 위탁</h2>
      <p>
        운영자는 원활한 서비스 제공을 위해 다음과 같이 개인정보 처리 업무를
        위탁하고 있습니다. 위탁 계약 시 개인정보가 안전하게 관리되도록 필요한
        사항을 규정하고 있습니다.
      </p>

      <div className="legal-table-wrap">
        <table className="legal-table">
          <thead>
            <tr>
              <th scope="col">수탁자</th>
              <th scope="col">위탁 업무</th>
              <th scope="col">처리 항목</th>
              <th scope="col">국외 이전</th>
            </tr>
          </thead>
          <tbody>
            {profile.processors.map((p) => (
              <tr key={p.name}>
                <th scope="row">
                  {p.name}
                  <br />
                  <small>{p.provider}</small>
                  <Unconfirmed confirmed={p.confirmed} />
                </th>
                <td>{p.purpose}</td>
                <td>{p.handles}</td>
                <td>{p.transferredTo ?? "없음"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="prose__note">
        각 수탁자의 개인정보 처리 방침은 다음에서 확인할 수 있습니다.{" "}
        {profile.processors.map((p, i) => (
          <span key={p.name}>
            {i > 0 ? " · " : null}
            <a href={p.policyUrl} rel="noreferrer noopener" target="_blank">
              {p.provider}
            </a>
          </span>
        ))}
      </p>

      <h2 id="s6">6. 개인정보의 국외 이전</h2>
      <p>
        위 표에 국외 이전 국가가 기재된 수탁자의 경우, 해당 국가의 서버에
        개인정보가 저장·처리됩니다. 이전되는 항목과 목적은 위 표에 기재된 범위와
        같으며, 이전 시점은 해당 기능이 동작하는 시점입니다.
      </p>

      <h2 id="s7">7. 이용자의 권리와 행사 방법</h2>
      <p>
        이용자는 언제든지 자신의 개인정보에 대한 열람·정정·삭제·처리정지를
        요구할 수 있습니다. 아래 방법 중 하나를 이용해 주시기 바랍니다.
      </p>
      <ul>
        <li>
          앱 내 데이터 초기화 — 학습 기록을 포함한 앱 내 데이터를 이용자가 직접
          삭제할 수 있습니다.
          <Unconfirmed confirmed={false} />
        </li>
        <li>앱 삭제 — 기기에 저장된 데이터가 함께 삭제됩니다.</li>
        <li>
          이메일 요청 —{" "}
          <a href={`mailto:${COMPANY.privacyEmail}`}>{COMPANY.privacyEmail}</a>{" "}
          로 요청하시면 접수 후 10일 이내에 처리 결과를 회신합니다.
        </li>
      </ul>

      <h2 id="s8">8. 만 14세 미만 아동의 개인정보</h2>
      {profile.childDirected === null ? (
        <>
          <p>
            {app.name} 앱의 대상 연령대가 확정되면 본 항목의 내용이 확정됩니다.
          </p>
          {DRAFT ? (
            <div className="pending">
              <strong>확정 필요</strong>
              대상 연령대에 따라 본 항목의 요구사항이 달라집니다. 만 14세 미만을
              대상으로 하는 경우 법정대리인의 동의 절차가 필요하며, 미국 배포 시
              COPPA, EU 배포 시 GDPR-K, Google Play &lsquo;가족&rsquo; 카테고리
              정책이 추가로 적용됩니다.
            </div>
          ) : null}
        </>
      ) : profile.childDirected ? (
        <p>
          {app.name} 앱은 만 14세 미만 아동도 이용할 수 있도록 설계되었습니다.
          운영자는 만 14세 미만 아동의 개인정보를 수집하기 전에 법정대리인의 동의를
          받으며, 법정대리인은 아동의 개인정보에 대한 열람·정정·삭제를 요구할 수
          있습니다.
        </p>
      ) : (
        <p>
          {app.name} 앱은 만 14세 미만 아동을 대상으로 하지 않으며, 만 14세 미만
          아동의 개인정보를 의도적으로 수집하지 않습니다. 만 14세 미만 아동의
          개인정보가 수집된 사실을 알게 된 경우 지체 없이 파기합니다.
        </p>
      )}

      <h2 id="s9">9. 개인정보의 파기</h2>
      <p>
        보유 기간이 지나거나 처리 목적이 달성된 개인정보는 지체 없이 파기합니다.
        전자적 파일 형태의 정보는 복구할 수 없는 기술적 방법으로 삭제하고, 그
        외의 기록물은 파쇄 또는 소각합니다.
      </p>

      <h2 id="s10">10. 개인정보의 안전성 확보 조치</h2>
      <ul>
        <li>전송 구간 암호화 — 앱과 서버 간 통신에 HTTPS를 적용합니다.</li>
        <li>접근 권한 최소화 — 개인정보에 접근할 수 있는 인원을 제한합니다.</li>
        <li>
          수집 최소화 — 서비스 제공에 필요한 최소한의 정보만 수집하며, 이용자를
          직접 식별하는 정보는 수집하지 않습니다.
        </li>
      </ul>

      <h2 id="s11">11. 자동 수집 장치의 운영 및 거부</h2>
      <p>
        운영자는 광고 식별자(IDFA / 광고 ID)를 수집하지 않습니다.
        <Unconfirmed confirmed={false} /> 이용자는 기기 설정에서 광고 추적을
        제한할 수 있습니다.
      </p>
      <ul>
        <li>iOS — 설정 &gt; 개인 정보 보호 및 보안 &gt; 추적</li>
        <li>Android — 설정 &gt; 개인정보 보호 &gt; 광고</li>
      </ul>

      <h2 id="s12">12. 개인정보 보호책임자 및 권익침해 구제방법</h2>
      <p>
        개인정보 처리에 관한 문의, 불만 처리, 피해 구제는 아래로 연락해 주시기
        바랍니다.
      </p>
      <ul>
        {COMPANY.privacyOfficer ? (
          <li>개인정보 보호책임자 — {COMPANY.privacyOfficer}</li>
        ) : null}
        <li>
          이메일 —{" "}
          <a href={`mailto:${COMPANY.privacyEmail}`}>{COMPANY.privacyEmail}</a>
        </li>
      </ul>
      <p>
        개인정보 침해에 대한 신고나 상담이 필요한 경우 아래 기관에 문의할 수
        있습니다.
      </p>
      <ul>
        <li>개인정보분쟁조정위원회 — 1833-6972 (privacy.go.kr)</li>
        <li>개인정보침해 신고센터 — 118 (privacy.kisa.or.kr)</li>
        <li>대검찰청 사이버수사과 — 1301 (spo.go.kr)</li>
        <li>경찰청 사이버범죄 신고시스템 — 182 (ecrm.police.go.kr)</li>
      </ul>

      <h2 id="s13">13. 방침의 변경</h2>
      <p>
        본 방침의 내용이 변경되는 경우 변경 사항의 시행 7일 전부터 본 페이지를
        통해 공지합니다. 이용자에게 불리한 변경의 경우에는 30일 전부터
        공지합니다.
      </p>
      {profile.previousDates.length > 0 ? (
        <ul>
          {profile.previousDates.map((d) => (
            <li key={d}>이전 버전 시행일 — {d}</li>
          ))}
        </ul>
      ) : null}
    </>
  );
}
