import type { TeamMember } from "../team-data";
import { TeamMemberCard } from "./TeamMemberCard";

type TeamGridProps = {
  members: readonly TeamMember[];
};

export function TeamGrid({ members }: TeamGridProps) {
  return (
    <div className="team-grid" role="list" aria-label="U Build Group team">
      {members.map((member) => (
        <div role="listitem" key={member.name}>
          <TeamMemberCard
            member={member}
            sizes="(max-width: 700px) 46vw, (max-width: 980px) 31vw, 280px"
          />
        </div>
      ))}
    </div>
  );
}
