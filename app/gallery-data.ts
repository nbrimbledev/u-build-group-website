import synced from "./data/gallery-synced.json";
import construction from "./data/construction-projects.json";

export type GalleryPhoto = {
  id: string;
  sourceUrl?: string;
  src: string;
  thumbnail?: string;
  title: string;
  alt: string;
  featured?: boolean;
  focus?: "lower";
};

// These original photographs remain even when the SharePoint folder changes.
export const originalPhotos: GalleryPhoto[] = [
  { id: "original-coop", src: "/project-carousel/coop-academy-pharmacy.webp", sourceUrl: "https://www.ubuildconstruction.ca/projects/coop-academy-pharmacy.webp", title: "Co-op Academy Pharmacy", alt: "Co-op Academy Pharmacy project", featured: true },
  { id: "original-hero", src: "/project-carousel/hero.jpg", title: "École Regent Day Care", alt: "Timber roof framing at the École Regent Day Care construction site", featured: true },
  { id: "original-kelsey", src: "/project-carousel/kelsey-estates.webp", sourceUrl: "https://www.ubuildconstruction.ca/projects/kelsey-estates.webp", title: "Kelsey Estates", alt: "Kelsey Estates project", featured: true },
  { id: "original-stony", src: "/project-carousel/stony-mountain-commercial-rental-units.webp", sourceUrl: "https://www.ubuildconstruction.ca/projects/stony-mountain-commercial-rental-units.webp", title: "Stony Mountain commercial rental units", alt: "Commercial rental units in Stony Mountain", featured: true },
  { id: "original-westhawk", src: "/project-carousel/west-hawk-lake.webp", sourceUrl: "https://www.ubuildconstruction.ca/projects/west-hawk-lake.webp", title: "West Hawk Lake", alt: "West Hawk Lake project", featured: true, focus: "lower" },
];

// The four originals already on the Construction page keep their existing copies.
// Both displays use the full source collection, without counting those photos twice.
function uniquePhotos(photos: GalleryPhoto[]): GalleryPhoto[] {
  const seen = new Set<string>();
  return photos.filter((photo) => {
    const key = photo.sourceUrl ?? photo.src;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}
const permanentPhotos = uniquePhotos([...originalPhotos, ...construction]);
export const galleryPhotos = uniquePhotos([...permanentPhotos, ...synced]);
// Only explicitly featured OneDrive photos join the permanent project reel.
const newHeroPhotos = synced.filter((photo: GalleryPhoto) => photo.featured);
export const heroPhotos = uniquePhotos([...permanentPhotos, ...newHeroPhotos]);
