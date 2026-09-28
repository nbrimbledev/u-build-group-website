import { SiteHeader, SiteFooter } from "./components/SiteChrome";
import { LocationMap } from "./components/LocationMap";
import { DivisionGateway } from "./components/DivisionGateway";
import { Reveal } from "./components/Reveal";
import { statistics } from "./site-data";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main id="main-content">
        <DivisionGateway />

        <section className="group-section" id="group" aria-labelledby="group-title">
          <div className="group-brand-watermark" aria-hidden="true" />
          <div className="content-section group-section-content">
            <Reveal>
              <div className="group-intro">
                <div>
                  <h2 id="group-title">A shared foundation for distinct companies.</h2>
                  <p className="lead-copy">
                    U Build Group brings together U Build Construction Division and Everett Construction Group, separate sister companies serving construction projects across Manitoba.
                  </p>
                </div>
                <p className="group-intro-note">
                  Each company works directly with the clients and communities it serves while remaining connected through one Manitoba group.
                </p>
              </div>
            </Reveal>

            <Reveal className="group-foundation">
              <article>
                <h3>Founder-led from the start.</h3>
                <p>
                  U Build Construction Division was founded by Brody Leathwood and Richard Maxwell after years of working together. They remain personally involved throughout the build while the company continues to invest in its people, technology, quality improvement and practical systems that help clients protect schedules and budgets.
                </p>
                <p className="founder-names">Brody Leathwood <span aria-hidden="true">+</span> Richard Maxwell</p>
              </article>
              <article>
                <h3>Separate companies with clear mandates.</h3>
                <p>
                  Everett Construction Group, established in 2020, operates as a separate Indigenous-owned sister company focused on northern, remote and First Nations communities. U Build Developments remains planned for 2026.
                </p>
                <p className="collaboration-note">
                  On northern projects, the companies can collaborate through estimating, project management, coordination, administrative and safety support. Everett continues to operate under its own mandate.
                </p>
                <p className="group-structure">Two active sister companies <span aria-hidden="true">·</span> One planned company</p>
              </article>
            </Reveal>

            <Reveal>
              <section className="core-competencies" aria-labelledby="core-competencies-title">
                <div className="core-competencies-heading">
                  <h3 id="core-competencies-title">Core competencies.</h3>
                  <p>The standards shared across U Build Group.</p>
                </div>
                <div className="core-competencies-grid">
                  <article>
                    <h4><span>Driven</span> in how we approach the work.</h4>
                    <p>We take initiative, solve problems early and keep the work moving.</p>
                  </article>
                  <article>
                    <h4><span>Ethical</span> in how we conduct ourselves.</h4>
                    <p>We communicate openly and make decisions with honesty, fairness and integrity.</p>
                  </article>
                  <article>
                    <h4><span>Dependable</span> in what we deliver.</h4>
                    <p>We arrive prepared, honour our commitments and consistently deliver on expectations.</p>
                  </article>
                </div>
              </section>
            </Reveal>
          </div>
        </section>

        <section className="reach-section" id="reach" aria-labelledby="reach-title">
          <div className="reach-heading-field">
            <div className="group-brand-watermark" aria-hidden="true" />
            <div className="content-section reach-heading-content">
              <Reveal>
                <div className="section-heading split-heading">
                  <h2 id="reach-title">Selected Manitoba locations, with a clear company focus.</h2>
                  <p>The map highlights selected communities, project locations and the group’s first commercial property. Everett Construction Group focuses on northern, remote and First Nations communities, while U Build Construction Division serves projects elsewhere across Manitoba.</p>
                </div>
              </Reveal>
            </div>
          </div>

          <div className="content-section reach-map-content">
            <Reveal className="map-frame service-map">
              <LocationMap />
            </Reveal>

            <Reveal className="division-record">
              <div className="division-record-heading">
                <div>
                  <h3>U Build Projects, by the numbers.</h3>
                </div>
              </div>
              <div className="statistics-grid">
                {statistics.map((statistic) => (
                  <div key={statistic.label}>
                    <strong>{statistic.value}</strong>
                    <span>{statistic.label}</span>
                  </div>
                ))}
              </div>
              <p className="source-note">Source: figures reported by U Build Construction Division and Everett Construction Group.</p>
            </Reveal>
          </div>
        </section>


      </main>
      <SiteFooter />
    </>
  );
}
