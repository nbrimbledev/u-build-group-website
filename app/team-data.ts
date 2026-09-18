export type TeamMember = {
  name: string;
  role?: string;
  image: string;
};

export const teamMembers: readonly TeamMember[] = [
  { name: "Brody", role: "President", image: "/team/brody.jpg" },
  { name: "Richard", role: "Vice President", image: "/team/richard.jpg" },
  { name: "Kristen", role: "Chief Safety Officer", image: "/team/kristen.jpg" },
  { name: "Ahmad", role: "Project Manager", image: "/team/ahmad.jpg" },
  { name: "Candice", role: "Office Manager", image: "/team/candice.jpg" },
  { name: "Jay", role: "Operations Manager", image: "/team/jay.jpg" },
  { name: "Lucas", role: "Project Manager", image: "/team/lucas.jpg" },
  { name: "Lindsay", role: "Chief Financial Officer", image: "/team/lindsay.jpg" },
  { name: "Junior", role: "Project Manager", image: "/team/junior.jpg" },
  { name: "Angie", role: "Accounting Manager", image: "/team/angie.jpg" },
  { name: "Andy", role: "Chief Estimator", image: "/team/andy.jpg" },
  { name: "Connell", role: "Pre-construction Manager", image: "/team/connell.jpg" },
  { name: "Khaldon", role: "Project Manager", image: "/team/khaldon.jpg" },
] as const;
