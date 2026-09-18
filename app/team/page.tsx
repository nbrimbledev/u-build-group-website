import type { Metadata } from "next";
import { TeamBanner, TeamFooter, TeamHeader } from "../components/TeamChrome";
import { TeamGrid } from "../components/TeamGrid";
import { Reveal } from "../components/Reveal";
import { teamMembers } from "../team-data";

export const metadata: Metadata = {
  title: "Meet the Team | U Build Group",
  description: "Meet the people working across the U Build Group companies.",
  alternates: { canonical: "/team" },
};

export default function TeamPage() {
  return (
    <main className="team-page team-page-grid" id="main-content">
      <TeamHeader />
      <section className="team-hero" aria-labelledby="team-page-title">
        <div className="team-hero-copy">
          <h1 id="team-page-title">Meet the people behind U Build Group.</h1>
          <p>One group, built through the people who lead its companies and support their work across Manitoba.</p>
        </div>
        <TeamBanner />
      </section>

      <section className="team-roster-section" aria-labelledby="team-roster-title">
        <Reveal>
          <div className="team-section-heading">
            <h2 id="team-roster-title">Working across the group.</h2>
            <p>Meet the shared team supporting U Build Group companies and their work throughout Manitoba.</p>
          </div>
        </Reveal>
        {/*
          Carousel backup retained in app/components/TeamCarousel.tsx.
          To restore it, replace TeamGrid below with TeamCarousel using the same members.
        */}
        <TeamGrid members={teamMembers} />
      </section>
      <TeamFooter />
    </main>
  );
}
