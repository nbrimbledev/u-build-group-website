/* eslint-disable @next/next/no-html-link-for-pages -- Native anchors support both Next.js and Vinext. */
import Image from "next/image";
import { sharedOffice, socialLinks } from "../site-data";

const navigation = [
  { href: "/#company-routes", label: "Companies" },
  { href: "/#reach", label: "Locations" },
  { href: "/team", label: "Team" },
  { href: "/gallery", label: "Gallery" },
  { href: "/careers", label: "Careers" },
];

export function SiteHeader({ active }: { active?: "team" | "gallery" | "careers" }) {
  return (
    <header className="portfolio-header">
      <a className="portfolio-brand" href="/" aria-label="U Build Group home">
        <span className="portfolio-brand-mark">
          <Image src="/brand/u-mark-blue.svg" alt="" width={44} height={44} priority />
        </span>
        <span>U Build Group</span>
      </a>
      <nav aria-label="Main navigation">
        {navigation.map(({ href, label }) => (
          <a key={href} href={href} aria-current={href === `/${active}` ? "page" : undefined}>{label}</a>
        ))}
      </nav>
      <a className="portfolio-phone" href={sharedOffice.phoneHref}>{sharedOffice.phone}</a>
    </header>
  );
}

export function SiteFooter() {
  return (
      <footer className="site-footer">
        <div className="footer-grid">
          <div>
            <Image src="/brand/u-mark-blue.svg" width={58} height={58} alt="" />
            <strong className="footer-brand">U Build Group</strong>
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
  );
}
