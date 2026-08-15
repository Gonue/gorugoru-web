import { BrandFooter, BrandHeader } from "@/components/BrandChrome";
import { Lineup } from "@/components/Lineup";
import { SITE } from "@/lib/company";

export default function Home() {
  return (
    <>
      <a className="skip" href="#apps">
        앱 라인업으로 건너뛰기
      </a>

      <BrandHeader />

      <section className="hero noise" aria-labelledby="hero-title">
        <div className="shell hero__inner">
          <div>
            {/* 두 span 이 이어져 "고루고루" 가 된다 — sr-only 사본을 두면 H1 이 두 벌 된다 */}
            <h1 className="hero__display" id="hero-title">
              <span>고루</span>
              <span>고루</span>
            </h1>
            <p className="hero__tagline">{SITE.tagline}</p>
            <p className="hero__intro">
              언어마다 하나씩, 캐릭터와 함께 배우는 언어 학습 앱을 만듭니다.
            </p>
          </div>

          {/* output: "export" 에서는 이미지 최적화가 꺼지므로 크기별 파일을 미리 만들어 둔다 */}
          <picture className="hero__art">
            <source
              type="image/webp"
              srcSet="/hero-tree-512.webp 512w, /hero-tree-1024.webp 1024w"
              sizes="(max-width: 860px) min(70vw, 380px), min(38vw, 520px)"
            />
            <img
              src="/hero-tree-1024.png"
              alt="고루고루의 아홉 마스코트가 한 그루 나무에 모여 있는 그림"
              width={814}
              height={892}
              decoding="async"
              fetchPriority="high"
            />
          </picture>
        </div>
      </section>

      <main>
        <section className="section" id="about" aria-labelledby="about-title">
          <div className="shell about">
            <div>
              <p className="section__label" id="about-title">
                About
              </p>
              <p className="section__lead">
                한 가지 언어만 잘하지 않습니다.
              </p>
            </div>
            <dl className="about__notes">
              <div className="about__note">
                <dt>언어마다 하나씩</dt>
                <dd>
                  영어의 잉글잉글부터 아랍어의 라비라비까지, 언어는 달라도 배우는
                  재미는 같도록 만들고 있습니다.
                </dd>
              </div>
            </dl>
          </div>
        </section>

        <section className="section" id="apps" aria-labelledby="apps-title">
          <div className="shell">
            <p className="section__label" id="apps-title">
              Apps
            </p>
            <Lineup />
            <p className="lineup__note">
              언어가 &lsquo;미정&rsquo; 인 앱은 마스코트와 이름만 확정된
              상태입니다.
            </p>
          </div>
        </section>
      </main>

      <BrandFooter />
    </>
  );
}
