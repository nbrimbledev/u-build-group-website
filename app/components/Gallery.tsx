"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { GalleryPhoto } from "../gallery-data";

export function Gallery({ photos }: { photos: GalleryPhoto[] }) {
  const [selected, setSelected] = useState(0);
  const [orderedPhotos, setOrderedPhotos] = useState(photos);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      const shuffled = [...photos];
      for (let index = shuffled.length - 1; index > 0; index -= 1) {
        const swap = Math.floor(Math.random() * (index + 1));
        [shuffled[index], shuffled[swap]] = [shuffled[swap], shuffled[index]];
      }
      setOrderedPhotos(shuffled);
    });
    return () => cancelAnimationFrame(frame);
  }, [photos]);
  const dialog = useRef<HTMLDialogElement>(null);
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const opener = useRef<HTMLAnchorElement | null>(null);
  const oldOverflow = useRef("");
  const scrollLocked = useRef(false);
  const photo = orderedPhotos[selected];
  const move = (direction: number) => setSelected((current) => (current + direction + photos.length) % (photos.length || 1));

  useEffect(() => () => { if (scrollLocked.current) document.body.style.overflow = oldOverflow.current; }, []);

  function close() {
    dialog.current?.close();
  }

  if (!photos.length) return <p className="gallery-empty">No photographs are available yet. Please check back soon.</p>;

  return (
    <>
      <div className="gallery-grid">
        {orderedPhotos.map((item, index) => {
          const ratio = item.width && item.height ? item.width / item.height : 1.6;
          return (
          <a key={item.id} href={item.src} className="gallery-card" style={{ flexGrow: ratio, flexBasis: `${ratio * 280}px` }} aria-label={`Enlarge photograph ${index + 1}: ${item.alt}`} aria-haspopup="dialog" onClick={(event) => {
            if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || !dialog.current?.showModal) return;
            event.preventDefault();
            opener.current = event.currentTarget;
            setSelected(index);
            oldOverflow.current = document.body.style.overflow;
            document.body.style.overflow = "hidden";
            scrollLocked.current = true;
            dialog.current?.showModal();
          }}>
            <span className="gallery-photo-frame" style={{ aspectRatio: ratio }}>
              <GalleryImage src={index === 0 ? item.src : item.thumbnail ?? item.src} alt={item.alt} fill priority={index === 0} sizes={index === 0 ? "(max-width: 600px) 92vw, (max-width: 1344px) 95vw, 1280px" : "(max-width: 600px) 92vw, (max-width: 1344px) 46vw, 628px"} style={{ objectPosition: item.focus === "lower" ? "center 70%" : undefined }} />
              <span className="gallery-enlarge" aria-hidden="true">↗</span>
            </span>
          </a>
            );
        })}
      </div>
      <dialog className="gallery-lightbox" ref={dialog} aria-label="Project photograph viewer" onClose={() => {
        document.body.style.overflow = oldOverflow.current;
        scrollLocked.current = false;
        opener.current?.focus();
      }} onClick={(event) => { if (event.target === event.currentTarget) close(); }} onKeyDown={(event) => {
        if (event.key === "ArrowRight") { event.preventDefault(); move(1); }
        if (event.key === "ArrowLeft") { event.preventDefault(); move(-1); }
      }}>
        <div className="gallery-lightbox-inner">
          <div className="gallery-lightbox-bar"><span aria-live="polite">{selected + 1} / {photos.length}</span><button autoFocus onClick={close} aria-label="Close photograph">Close ×</button></div>
          <div className="gallery-lightbox-image" onTouchStart={(event) => { touchStart.current = { x: event.touches[0].clientX, y: event.touches[0].clientY }; }} onTouchEnd={(event) => {
            if (!touchStart.current) return;
            const dx = event.changedTouches[0].clientX - touchStart.current.x;
            const dy = event.changedTouches[0].clientY - touchStart.current.y;
            if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) move(dx < 0 ? 1 : -1);
            touchStart.current = null;
          }}>
            {photo && <GalleryImage retry key={photo.id} src={photo.src} alt={photo.alt} fill sizes="94vw" />}
          </div>
          <div className="gallery-lightbox-bar"><button onClick={() => move(-1)} aria-label="Previous photograph">← Previous</button><button onClick={() => move(1)} aria-label="Next photograph">Next →</button></div>
        </div>
      </dialog>
    </>
  );
}

function GalleryImage({ retry = false, ...props }: React.ComponentProps<typeof Image> & { retry?: boolean }) {
  const [failed, setFailed] = useState(false);
  const [attempt, setAttempt] = useState(0);
  if (failed) return (
    <span className="gallery-image-error" role="status">
      <span>This photograph couldn’t load.</span>
      <span>{props.alt}</span>
      {retry && <button type="button" onClick={(event) => {
        event.preventDefault();
        event.stopPropagation();
        setAttempt((value) => value + 1);
        setFailed(false);
      }}>Try again</button>}
    </span>
  );
  return <Image {...props} alt={props.alt} key={attempt} onError={() => setFailed(true)} />;
}
