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

function shuffledImages() {
  const images = [...projectImages];

  for (let index = images.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [images[index], images[swapIndex]] = [images[swapIndex], images[index]];
  }

  return images;
}

function fillSequence(images: ProjectImage[]) {
  return [...images, ...images.slice(0, 2)];
}

const initialRows = [
  fillSequence(projectImages),
  fillSequence([...projectImages].reverse()),
];

export function HeroProjectCarousel() {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [rows, setRows] = useState(initialRows);
  const [isInView, setIsInView] = useState(false);
  const [isPageVisible, setIsPageVisible] = useState(true);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setRows([
        fillSequence(shuffledImages()),
        fillSequence(shuffledImages()),
      ]);
    });

    return () => window.cancelAnimationFrame(frame);
  }, []);

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
