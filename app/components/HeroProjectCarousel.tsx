"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

type ProjectImage = {
  src: string;
  focus?: "lower";
};

const projectImages: ProjectImage[] = [
  { src: "/project-carousel/coop-academy-pharmacy.webp" },
  { src: "/project-carousel/hero.jpg" },
  { src: "/project-carousel/kelsey-estates.webp" },
  { src: "/project-carousel/stony-mountain-commercial-rental-units.webp" },
  { src: "/project-carousel/west-hawk-lake.webp", focus: "lower" },
];

const rows = [
  projectImages,
  [projectImages[2], projectImages[3], projectImages[4], projectImages[0], projectImages[1]],
];

export function HeroProjectCarousel() {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [isPageVisible, setIsPageVisible] = useState(true);

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0.08 },
    );

    observer.observe(carousel);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const updateVisibility = () => setIsPageVisible(document.visibilityState === "visible");
    updateVisibility();
    document.addEventListener("visibilitychange", updateVisibility);
    return () => document.removeEventListener("visibilitychange", updateVisibility);
  }, []);

  const isRunning = isInView && isPageVisible;

  return (
    <div
      ref={carouselRef}
      className="hero-project-carousel"
      data-running={isRunning ? "true" : "false"}
      aria-hidden="true"
    >
      {rows.map((images, rowIndex) => (
        <div
          className={`hero-project-carousel-row ${rowIndex === 0 ? "is-forward" : "is-reverse"}`}
          key={rowIndex}
        >
          <div className="hero-project-carousel-track">
            {[0, 1].map((sequenceIndex) => (
              <div className="hero-project-carousel-sequence" key={sequenceIndex}>
                {images.map((image, imageIndex) => (
                  <span className="hero-project-frame" key={`${image.src}-${imageIndex}`}>
                    <Image
                      src={image.src}
                      alt=""
                      fill
                      className={image.focus === "lower" ? "is-lower-focus" : undefined}
                      sizes="(max-width: 700px) 56vw, 22vw"
                      loading="eager"
                    />
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
