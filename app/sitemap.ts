import type { MetadataRoute } from "next";
import { galleryPhotos } from "./gallery-data";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: "https://www.ubuildgroup.ca/gallery", lastModified: new Date("2026-09-25"), changeFrequency: "weekly", priority: 0.8, images: galleryPhotos.map((photo) => new URL(photo.src, "https://www.ubuildgroup.ca").href) },
    {
      url: "https://www.ubuildgroup.ca",
      lastModified: new Date("2026-09-25"),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: "https://www.ubuildgroup.ca/team",
      lastModified: new Date("2026-09-25"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];
}
