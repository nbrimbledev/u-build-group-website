import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://ubuildgroup.ca",
      lastModified: new Date("2026-09-18"),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: "https://ubuildgroup.ca/team",
      lastModified: new Date("2026-09-18"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];
}
