/* eslint-disable @next/next/no-html-link-for-pages -- Native links also support Vinext. */
import { SiteHeader, SiteFooter } from "./components/SiteChrome";

export default function NotFound() {
  return <>
    <SiteHeader />
    <main id="main-content" className="gallery-section">
      <div className="gallery-heading"><h1>Page not found.</h1></div>
      <p>This address may have changed. You can return to the Group homepage or browse the gallery.</p>
      <p><a className="company-jump" href="/">Return to homepage</a></p>
      <p><a className="company-jump" href="/gallery">Browse gallery</a></p>
    </main>
    <SiteFooter />
  </>;
}
