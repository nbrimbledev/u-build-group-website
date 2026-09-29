import type { Metadata } from "next";
import Image from "next/image";
import { SiteHeader, SiteFooter } from "../components/SiteChrome";
import { CareerApplication } from "../components/CareerApplication";

const description = "Explore careers with U Build Group in Manitoba. Join a shared team supporting our construction companies and apply online with your résumé.";
export const metadata: Metadata = {
  title: "Careers | U Build Group",
  description,
  alternates: { canonical: "/careers" },
  openGraph: { title: "Careers | U Build Group", description, url: "/careers", siteName: "U Build Group", locale: "en_CA", type: "website" },
  twitter: { card: "summary", title: "Careers | U Build Group", description },
};

export default function CareersPage() {
  return <>
    <SiteHeader active="careers" />
    <main id="main-content" className="careers-page">
      <section className="careers-intro" aria-labelledby="careers-title">
        <div>
          <h1 id="careers-title">Build your career with U Build Group.</h1>
          <p>One team, working across our companies. Join U Build Group and support U Build Construction Division and Everett Construction Group as project needs change.</p>
          <a className="company-jump" href="#openings">Explore open roles <svg aria-hidden="true" focusable="false" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 4v16m-6-6 6 6 6-6" /></svg></a>
        </div>
        <figure><Image src="/team/group.jpg" alt="The U Build Group team together at the Stony Mountain office" width={7205} height={2087} quality={90} priority sizes="(max-width: 1280px) 94vw, 1180px" /></figure>
      </section>
      <CareerApplication />
    </main>
    <SiteFooter />
  </>;
}
