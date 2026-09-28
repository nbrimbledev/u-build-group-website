import type { Metadata } from "next";
import { SiteHeader, SiteFooter } from "../components/SiteChrome";
import { TeamGrid } from "../components/TeamGrid";
import { teamMembers } from "../team-data";

export const metadata: Metadata = {
  title: "Meet the Team | U Build Group",
  description: "Meet the people behind U Build Group, supporting U Build Construction Division and Everett Construction Group across Manitoba.",
  alternates: { canonical: "/team" },
  openGraph: {
    title: "Meet the Team | U Build Group",
    description: "Meet the people behind U Build Group, supporting U Build Construction Division and Everett Construction Group across Manitoba.",
    url: "/team",
    siteName: "U Build Group",
    locale: "en_CA",
    type: "website",
  },
  twitter: { card: "summary", title: "Meet the Team | U Build Group", description: "Meet the people behind U Build Group, supporting U Build Construction Division and Everett Construction Group across Manitoba." },
};

export default function TeamPage() {
  return (
    <>
      <SiteHeader active="team" />
      <main className="team-page team-page-grid" id="main-content">
        <section className="team-hero" aria-labelledby="team-page-title">
          <div className="team-hero-copy">
            <h1 id="team-page-title">Meet the people behind U Build Group.</h1>
            <p>One group, built through the people who lead its companies and support their work across Manitoba.</p>
          </div>
        </section>

        <section className="team-roster-section" aria-label="Team members">
          {/*
            Carousel backup retained in app/components/TeamCarousel.tsx.
            To restore it, replace TeamGrid below with TeamCarousel using the same members.
          */}
          <TeamGrid members={teamMembers} />
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
