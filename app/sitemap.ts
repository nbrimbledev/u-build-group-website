import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: "https://ubuildgroup.ca/gallery", lastModified: new Date("2026-09-24"), changeFrequency: "weekly", priority: 0.8 },
    {
      url: "https://ubuildgroup.ca",
      lastModified: new Date("2026-09-25"),
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
