"use client";

import { useState } from "react";
import type { TeamMember } from "../team-data";
import { TeamMemberCard } from "./TeamMemberCard";

type TeamCarouselProps = {
  members: readonly TeamMember[];
};

function PauseIcon({ paused }: { paused: boolean }) {
  return paused ? (
    <svg aria-hidden="true" viewBox="0 0 24 24" width="18" height="18">
      <path d="m8 5 11 7-11 7V5Z" />
    </svg>
  ) : (
    <svg aria-hidden="true" viewBox="0 0 24 24" width="18" height="18">
      <path d="M8 5v14M16 5v14" />
    </svg>
  );
}

// Backup concept retained by request. This component is not imported by the live team page.
export function TeamCarousel({ members }: TeamCarouselProps) {
  const [paused, setPaused] = useState(false);

  return (
    <div className="team-carousel" data-paused={paused ? "true" : "false"}>
      <div className="team-carousel-controls">
        <p>
          <span className="team-carousel-desktop-copy">Move through the group continuously, or pause to take a closer look.</span>
          <span className="team-carousel-mobile-copy">Swipe through the team one portrait at a time.</span>
          <span className="team-carousel-reduced-copy">Scroll through the team one portrait at a time.</span>
        </p>
        <button type="button" onClick={() => setPaused((current) => !current)} aria-pressed={paused}>
          <PauseIcon paused={paused} />
          {paused ? "Resume" : "Pause"}
        </button>
      </div>
      <div className="team-carousel-viewport" aria-label="U Build Group team">
        <div className="team-carousel-track">
          <div className="team-carousel-sequence" role="list">
            {members.map((member) => (
              <div role="listitem" key={member.name}>
                <TeamMemberCard member={member} sizes="(max-width: 700px) 72vw, 310px" />
              </div>
            ))}
          </div>
          <div className="team-carousel-sequence" aria-hidden="true">
            {members.map((member) => (
              <div key={`duplicate-${member.name}`}>
                <TeamMemberCard member={member} sizes="(max-width: 700px) 72vw, 310px" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
