import Image from "next/image";
import type { TeamMember } from "../team-data";

type TeamMemberCardProps = {
  member: TeamMember;
  sizes: string;
};

export function TeamMemberCard({ member, sizes }: TeamMemberCardProps) {
  return (
    <article className="team-person-card">
      <div className="team-photo-frame">
        <Image
          src={member.image}
          alt={`${member.name}, ${member.role ?? "U Build Group team member"}`}
          fill
          sizes={sizes}
        />
      </div>
      <div className="team-person-copy">
        <h2>{member.name}</h2>
        {member.role ? <p>{member.role}</p> : <p className="role-pending">Role to be confirmed</p>}
      </div>
    </article>
  );
}
