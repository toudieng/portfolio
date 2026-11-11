"use client";

import { useEffect, useRef } from "react";

/**
 * Hero background: CSS mesh-gradient blobs + subtle masked grid + a lightweight
 * canvas "constellation" (particles linked by thin lines, reacting to the pointer).
 * The canvas pauses when off-screen / tab hidden, and renders a single static
 * frame when the user prefers reduced motion.
 */
export function HeroBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = 0;
    let height = 0;
    let frame = 0;
    let running = false;
    const pointer = { x: -9999, y: -9999 };

    type P = { x: number; y: number; vx: number; vy: number; r: number; warm: boolean };
    let particles: P[] = [];

    const readColors = () => {
      const s = getComputedStyle(document.documentElement);
      return { primary: s.getPropertyValue("--primary").trim(), accent: s.getPropertyValue("--accent").trim() };
    };
    let colors = readColors();

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.min(width < 640 ? 35 : 80, Math.floor((width * height) / 16000));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        r: Math.random() * 1.4 + 0.6,
        warm: Math.random() < 0.22,
      }));
    };

    const LINK = 130;
    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        if (!reduce) {
          // gentle repulsion from the pointer
          const dx = p.x - pointer.x;
          const dy = p.y - pointer.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < 140 * 140 && d2 > 0.01) {
            const f = (1 - Math.sqrt(d2) / 140) * 0.6;
            p.x += (dx / Math.sqrt(d2)) * f;
            p.y += (dy / Math.sqrt(d2)) * f;
          }
          p.x += p.vx;
          p.y += p.vy;
          if (p.x < 0 || p.x > width) p.vx *= -1;
          if (p.y < 0 || p.y > height) p.vy *= -1;
        }
        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j];
          const dx = p.x - q.x;
          const dy = p.y - q.y;
          const d = Math.hypot(dx, dy);
          if (d < LINK) {
            ctx.globalAlpha = (1 - d / LINK) * 0.35;
            ctx.strokeStyle = colors.primary;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.stroke();
          }
        }
        ctx.globalAlpha = 0.9;
        ctx.fillStyle = p.warm ? colors.accent : colors.primary;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    };

    const loop = () => {
      draw();
      frame = requestAnimationFrame(loop);
    };
    const start = () => {
      if (running || reduce || !ready) return;
      running = true;
      frame = requestAnimationFrame(loop);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(frame);
    };

    resize();
    // Defer the first paint/animation so it never competes with hydration & LCP
    const idle = (cb: () => void) =>
      typeof window.requestIdleCallback === "function"
        ? window.requestIdleCallback(cb, { timeout: 2500 })
        : setTimeout(cb, 1200);
    let ready = false;
    idle(() => {
      ready = true;
      draw();
      start();
    });

    const io = new IntersectionObserver(([entry]) => (entry.isIntersecting ? start() : stop()));
    io.observe(canvas);
    const onVisibility = () => (document.hidden ? stop() : start());
    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
    };
    const onResize = () => {
      resize();
      draw();
    };
    // Re-read colors when the theme class changes
    const mo = new MutationObserver(() => {
      colors = readColors();
      if (reduce) draw();
    });
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      stop();
      io.disconnect();
      mo.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* mesh gradient blobs */}
      <div
        className="absolute -left-[15%] -top-[20%] size-[70vmax] rounded-full opacity-70 blur-[100px] animate-blob will-change-transform"
        style={{ background: "radial-gradient(circle, var(--glow-1), transparent 65%)" }}
      />
      <div
        className="absolute -right-[20%] top-[10%] size-[55vmax] rounded-full opacity-70 blur-[110px] animate-blob-slow will-change-transform"
        style={{ background: "radial-gradient(circle, var(--glow-2), transparent 65%)" }}
      />
      <div
        className="absolute bottom-[-30%] left-[30%] size-[45vmax] rounded-full opacity-50 blur-[120px] animate-blob will-change-transform"
        style={{ background: "radial-gradient(circle, var(--glow-1), transparent 70%)", animationDelay: "-8s" }}
      />
      {/* subtle grid, faded at the edges */}
      <div className="absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_70%_60%_at_50%_40%,#000_30%,transparent_80%)]" />
      {/* constellation */}
      <canvas ref={canvasRef} className="absolute inset-0 size-full" />
      {/* fade into page */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-background" />
    </div>
  );
}
