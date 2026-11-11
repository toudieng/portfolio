"use client";

import { useRef } from "react";
import { cn } from "@/lib/utils";

/** Card with a soft radial light following the pointer (CSS-only paint, JS only sets two vars). */
export function SpotlightCard({ className, children, ...rest }: React.HTMLAttributes<HTMLDivElement>) {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <div
      ref={ref}
      onPointerMove={(e) => {
        const el = ref.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        el.style.setProperty("--x", `${e.clientX - r.left}px`);
        el.style.setProperty("--y", `${e.clientY - r.top}px`);
      }}
      className={cn("spotlight rounded-3xl border border-border bg-elevated/60 backdrop-blur-sm", className)}
      {...rest}
    >
      {children}
    </div>
  );
}
