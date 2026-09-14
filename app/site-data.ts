export const sharedOffice = {
  phone: "(204) 977-1956",
  phoneHref: "tel:+12049771956",
  email: "info@ubuildconstruction.ca",
  emailHref: "mailto:info@ubuildconstruction.ca",
  fax: "(204) 344-5097",
  addressLines: ["#21, 75th Avenue South", "Stony Mountain, MB R0C 3A0"],
  mapHref:
    "https://maps.google.com/?q=%2321%2C%2075th%20Avenue%20South%2C%20Stony%20Mountain%2C%20MB%20R0C%203A0",
} as const;

export const statistics = [
  { value: "32+", label: "Designs delivered" },
  { value: "327", label: "Construction projects" },
  { value: "189", label: "Renovation projects" },
  { value: "553", label: "Satisfied clients" },
] as const;

export const projects = [
  { name: "Cairns Children’s Centre", location: "Winnipeg, MB", category: "Renovation", division: "construction" },
  { name: "LCG Trucking Headquarters", location: "Stony Mountain, MB", category: "Design build", division: "construction" },
  { name: "École Regent Day Care", location: "Winnipeg, MB", category: "Contract build", division: "construction" },
  { name: "Winkler Elementary School", location: "Winkler, MB", category: "Building envelope", division: "construction" },
  { name: "Regent Park School Addition", location: "Winnipeg, MB", category: "Contract build", division: "construction" },
  { name: "Walmart Grocery Pick-up", location: "Winnipeg, MB", category: "Renovation", division: "construction" },
  { name: "Technical Vocational High School", location: "Winnipeg, MB", category: "Contract build", division: "construction" },
  { name: "Cecil Rhodes School", location: "Winnipeg, MB", category: "Building envelope", division: "construction" },
  { name: "East St. Paul Arena", location: "East St. Paul, MB", category: "Design build", division: "construction" },
  { name: "Townhouse Exterior Retrofit", location: "Winnipeg, MB", category: "Renovation", division: "everett" },
] as const;

export const announcements = [
  {
    division: "U Build Developments",
    accent: "properties",
    title: "Third division in formation",
    body: "The group is organizing its ownership and leasing work under a dedicated division for multi-family, commercial and land holdings.",
    href: "#companies",
  },
  {
    division: "U Build Construction Division",
    accent: "construction",
    title: "New division website live",
    body: "The division’s project record, service information and careers page are now available at ubuildconstruction.ca.",
    href: "https://www.ubuildconstruction.ca",
  },
  {
    division: "Everett Construction Group",
    accent: "everett",
    title: "Northern project capacity expanded",
    body: "Everett has expanded crew capacity for northern and remote community projects this season.",
    href: "https://www.everettconstructiongroup.ca/",
  },
] as const;

export const socialLinks = {
  instagram: "https://www.instagram.com/ubuild_group/",
  linkedin: "https://ca.linkedin.com/company/u-build-construction",
  facebook: "https://www.facebook.com/profile.php?id=61552947026587",
} as const;
