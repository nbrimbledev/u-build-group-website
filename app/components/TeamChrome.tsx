/* eslint-disable @next/next/no-html-link-for-pages -- Vinext currently throws a client hook error when next/link is used in this server component. */
import Image from "next/image";
import { sharedOffice } from "../site-data";

export function TeamHeader() {
  return (
    <header className="team-site-header">
      <a className="portfolio-brand" href="/" aria-label="U Build Group home">
        <span className="portfolio-brand-mark">
          <Image src="/brand/u-mark-blue.svg" alt="" width={44} height={44} priority />
        </span>
        <span>U Build Group</span>
      </a>
      <nav className="team-primary-nav" aria-label="Main navigation">
        <a href="/#companies">Companies</a>
        <a href="/#group">The group</a>
        <a href="/#reach">Where we operate</a>
      </nav>
      <a className="team-home-link" href="/">Group home</a>
    </header>
  );
}

export function TeamBanner() {
  return (
    <figure className="team-banner-frame">
      <Image
        src="/team/group.jpg"
        alt="The U Build Group team standing together in the Stony Mountain office"
        width={2800}
        height={811}
        priority
        sizes="(max-width: 700px) 94vw, 1180px"
      />
    </figure>
  );
}

export function TeamFooter() {
  return (
    <footer className="team-footer">
      <div className="team-footer-brand">
        <Image src="/brand/u-mark-blue.svg" width={46} height={46} alt="" />
        <div>
          <strong>U Build Group</strong>
          <span>Stony Mountain, Manitoba</span>
        </div>
      </div>
      <div className="team-footer-contact">
        <a href={sharedOffice.phoneHref}>{sharedOffice.phone}</a>
        <a href={sharedOffice.emailHref}>{sharedOffice.email}</a>
      </div>
    </footer>
  );
}
