"use client";

import { useEffect, useRef, useState } from "react";

export function LocationMap() {
  const container = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (!container.current) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setVisible(true); observer.disconnect(); }
    }, { rootMargin: "200px" });
    observer.observe(container.current);
    return () => observer.disconnect();
  }, []);
  return (
    <div ref={container}>
      {visible ? <iframe src="/manitoba-map.html" title="Selected U Build Group communities and project locations across Manitoba" /> :
        <button type="button" className="service-map-placeholder" onClick={() => setVisible(true)}>Load project locations map</button>}
      <noscript><a href="/manitoba-map.html">View project locations across Manitoba</a></noscript>
    </div>
  );
}
