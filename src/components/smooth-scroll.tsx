"use client";

import { useEffect } from "react";

/** Lenis smooth scroll — skipped entirely when the user prefers reduced motion. */
export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    let destroyed = false;
    let lenis: { raf: (t: number) => void; destroy: () => void } | null = null;

    // Loaded lazily so it stays out of the critical JS bundle
    import("lenis").then(({ default: Lenis }) => {
      if (destroyed) return;
      const instance = new Lenis({ duration: 1.1, smoothWheel: true, anchors: { offset: -72 } });
      lenis = instance;
      const raf = (time: number) => {
        instance.raf(time);
        frame = requestAnimationFrame(raf);
      };
      frame = requestAnimationFrame(raf);
    });

    return () => {
      destroyed = true;
      cancelAnimationFrame(frame);
      lenis?.destroy();
    };
  }, []);

  return null;
}
