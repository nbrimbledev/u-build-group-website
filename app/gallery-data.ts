import descriptions from "./data/gallery-descriptions.json";
import synced from "./data/gallery-synced.json";
import construction from "./data/construction-projects.json";

export type GalleryPhoto = {
  id: string;
  width?: number;
  height?: number;
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
  { id: "original-coop", src: "/project-carousel/coop-academy-pharmacy.webp", width: 1920, height: 1440, sourceUrl: "https://www.ubuildconstruction.ca/projects/coop-academy-pharmacy.webp", title: "Co-op Academy Pharmacy", alt: "Co-op Academy Pharmacy project", featured: true },
  { id: "original-hero", src: "/project-carousel/hero.jpg", width: 1938, height: 1103, title: "École Regent Day Care", alt: "Timber roof framing at the École Regent Day Care construction site", featured: true },
  { id: "original-kelsey", src: "/project-carousel/kelsey-estates.webp", width: 1920, height: 1440, sourceUrl: "https://www.ubuildconstruction.ca/projects/kelsey-estates.webp", title: "Kelsey Estates", alt: "Kelsey Estates project", featured: true },
  { id: "original-stony", src: "/project-carousel/stony-mountain-commercial-rental-units.webp", width: 1920, height: 1080, sourceUrl: "https://www.ubuildconstruction.ca/projects/stony-mountain-commercial-rental-units.webp", title: "Stony Mountain commercial rental units", alt: "Commercial rental units in Stony Mountain", featured: true },
  { id: "original-westhawk", src: "/project-carousel/west-hawk-lake.webp", width: 960, height: 1280, sourceUrl: "https://www.ubuildconstruction.ca/projects/west-hawk-lake.webp", title: "West Hawk Lake", alt: "West Hawk Lake project", featured: true, focus: "lower" },
];

// Current Construction photos take precedence over saved original copies.
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
const describedSynced = synced.map((photo) => ({
  ...photo,
  alt: (descriptions as Record<string, string>)[photo.id] ||
    (/^(?:DJI|IMG|DSC|PXL|PHOTO)[ _-]*\d/i.test(photo.alt) || !photo.alt.trim()
      ? "Photograph from the U Build Group gallery" : photo.alt),
}));
const currentProjectTitles = new Set(construction.map(photo => photo.title.toLowerCase().trim()));
const permanentPhotos = uniquePhotos([
  ...construction,
  ...originalPhotos.filter(photo => !currentProjectTitles.has(photo.title.toLowerCase().trim())),
]);
export const galleryPhotos = uniquePhotos([...permanentPhotos, ...describedSynced]);
// Only explicitly featured OneDrive photos join the permanent project reel.
const newHeroPhotos = describedSynced.filter((photo: GalleryPhoto) => photo.featured);
export const heroPhotos = uniquePhotos([...permanentPhotos, ...newHeroPhotos]);
