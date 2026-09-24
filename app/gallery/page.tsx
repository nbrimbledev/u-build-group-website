import type { Metadata } from "next";
import { TeamHeader, TeamFooter } from "../components/TeamChrome";
import { Gallery } from "../components/Gallery";
import { galleryPhotos } from "../gallery-data";

export const metadata: Metadata = {
  title: "Gallery | U Build Group",
  description: "Explore photographs from U Build Group projects across Manitoba.",
  alternates: { canonical: "/gallery" },
};

export default function GalleryPage() {
  return (
    <main id="main-content" className="gallery-page">
      <TeamHeader active="gallery" />
      <section className="gallery-section" aria-labelledby="gallery-title">
        <div className="gallery-heading">
          <div><p className="gallery-eyebrow">U Build Group</p><h1 id="gallery-title">Our work in pictures.</h1></div>
          <p>A closer look at projects across Manitoba.</p>
        </div>
        <Gallery photos={galleryPhotos} />
      </section>
      <TeamFooter />
    </main>
  );
}
