import categories from "./data/careers.json";
export const jobCategories = categories;
export const GENERAL_APPLICATION = "General Application";
export const MAX_RESUME_SIZE = 3 * 1024 * 1024;
export const MAX_COVER_LETTER_SIZE = 1024 * 1024;
export const careersEmail = "careers@ubuildconstruction.ca";
export const roleValue = (category: string, title: string) => `${category} ${title}`;
export const validRoles = new Set([
  ...jobCategories.filter((category) => category.applicationsOpen).flatMap((category) => category.roles.map((role) => roleValue(category.name, role.title))),
  GENERAL_APPLICATION,
]);
