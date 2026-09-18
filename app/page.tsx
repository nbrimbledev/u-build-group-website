import Image from "next/image";
import { DivisionGateway } from "./components/DivisionGateway";
import { Reveal } from "./components/Reveal";
import {
  sharedOffice,
  socialLinks,
  statistics,
} from "./site-data";

function ExternalLinkIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" width="18" height="18">
      <path d="M8 16 16 8M9 8h7v7" />
    </svg>
  );
}

export default function Home() {
  return (
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
                  U Build Group brings together separate Manitoba sister companies with distinct mandates and a foundation shaped by hands-on leadership.
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
            <iframe
              src="/manitoba-map.html"
              title="Selected U Build Group communities and project locations across Manitoba"
              loading="lazy"
            />
          </Reveal>

          <Reveal className="mobile-service-summary">
            <article className="service-summary is-ubuild">
              <h3>U Build Construction Division</h3>
              <p>Serves construction projects elsewhere across Manitoba.</p>
              <a href="https://www.ubuildconstruction.ca" target="_blank" rel="noopener noreferrer">
                Visit company site
                <span className="visually-hidden"> (opens in a new tab)</span>
                <ExternalLinkIcon />
              </a>
            </article>
            <article className="service-summary is-everett">
              <h3>Everett Construction Group</h3>
              <p>Focuses on northern, remote and First Nations communities.</p>
              <a href="https://www.everettconstructiongroup.ca/" target="_blank" rel="noopener noreferrer">
                Visit company site
                <span className="visually-hidden"> (opens in a new tab)</span>
                <ExternalLinkIcon />
              </a>
            </article>
            <article className="service-summary is-properties">
              <h3>U Build Developments</h3>
              <p>Owns the commercial building at 9158 Quarry Road in Stony Mountain. Current tenants are Tim Hortons, Esso and Stony Mountain Convenience.</p>
              <a
                href="https://maps.google.com/?q=9158%20Quarry%20Rd%2C%20Stony%20Mountain%2C%20MB%20R0C%203A0"
                target="_blank"
                rel="noopener noreferrer"
              >
                View property location
                <span className="visually-hidden"> (opens in a new tab)</span>
                <ExternalLinkIcon />
              </a>
            </article>
          </Reveal>

          <Reveal className="division-record">
            <div className="division-record-heading">
              <div>
                <h3>U Build Projects, by the numbers.</h3>
                {/* <p>These figures belong to U Build Construction Division and are shown here as one operating company’s record.</p> */}
              </div>
              {/* <a href="https://www.ubuildconstruction.ca" target="_blank" rel="noopener noreferrer">
                View U Build Construction Division
                <span className="visually-hidden"> (opens in a new tab)</span>
                <ExternalLinkIcon />
              </a> */}
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

      <footer className="site-footer">
        <div className="footer-grid">
          <div>
            <Image src="/brand/u-mark-blue.svg" width={58} height={58} alt="" />
            <strong className="footer-brand">U Build Group</strong>
          </div>
          <div>
            <h2>Companies</h2>
            <a href="https://www.ubuildconstruction.ca" target="_blank" rel="noopener noreferrer">U Build Construction Division</a>
            <a href="https://www.everettconstructiongroup.ca/" target="_blank" rel="noopener noreferrer">Everett Construction Group</a>
            <span>U Build Developments</span>
          </div>
          <div>
            <h2>Shared office</h2>
            <a href={sharedOffice.phoneHref}>{sharedOffice.phone}</a>
            <a href={sharedOffice.emailHref}>{sharedOffice.email}</a>
            <a href={sharedOffice.mapHref} target="_blank" rel="noopener noreferrer">
              {sharedOffice.addressLines[0]}<br />{sharedOffice.addressLines[1]}
            </a>
          </div>
          <div>
            <h2>Social</h2>
            <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer">U Build Group Instagram</a>
            <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer">U Build Construction Division LinkedIn</a>
            <a href={socialLinks.facebook} target="_blank" rel="noopener noreferrer">Facebook</a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 U Build Group. All rights reserved.</span>
          <span>Stony Mountain, Manitoba</span>
        </div>
      </footer>
    </main>
  );
}
