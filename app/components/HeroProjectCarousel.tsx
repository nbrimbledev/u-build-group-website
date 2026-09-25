"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

import { heroPhotos, type GalleryPhoto } from "../gallery-data";

function splitRows(photos: GalleryPhoto[]) {
  const groups = new Map<string, GalleryPhoto[]>();
  for (const photo of photos) {
    const project = photo.title.trim().toLocaleLowerCase();
    groups.set(project, [...(groups.get(project) ?? []), photo]);
  }
  const rows: GalleryPhoto[][] = [[], []];
  for (const group of groups.values()) {
    rows[rows[0].length <= rows[1].length ? 0 : 1].push(...group);
  }
  return rows.filter((row) => row.length > 0);
}

function shuffle<T,>(items: T[]) {
  const result = [...items];
  for (let index = result.length - 1; index > 0; index -= 1) {
    const swap = Math.floor(Math.random() * (index + 1));
    [result[index], result[swap]] = [result[swap], result[index]];
  }
  return result;
}

export function HeroProjectCarousel() {
  const [rows, setRows] = useState(() => splitRows(heroPhotos));

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      setRows(splitRows(shuffle(heroPhotos)).map(shuffle));
    });
    return () => cancelAnimationFrame(frame);
  }, []);

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
          <div className="hero-project-carousel-track" style={{ animationDuration: `${(rowIndex === 0 ? 66 : 70) * images.length / 5}s` }}>
            {[0, 1].map((sequenceIndex) => (
              <div className="hero-project-carousel-sequence" key={sequenceIndex}>
                {images.map((image, imageIndex) => (
                  <span className="hero-project-frame" data-project={image.title} key={`${image.src}-${imageIndex}`}>
                    <Image
                      src={image.thumbnail ?? image.src}
                      alt=""
                      quality={60}
                      fetchPriority="low"
                      fill
                      className={image.focus === "lower" ? "is-lower-focus" : undefined}
                      sizes="(max-width: 700px) 56vw, 22vw"
                      loading={imageIndex < 2 ? "eager" : "lazy"}
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
