"use client";

import { m, type HTMLMotionProps } from "framer-motion";

/** Fade/slide-in when the element scrolls into view (disabled by MotionConfig for reduced motion). */
export function Reveal({
  delay = 0,
  y = 24,
  className,
  children,
  ...rest
}: { delay?: number; y?: number } & HTMLMotionProps<"div">) {
  return (
    <m.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1], delay }}
      className={className}
      {...rest}
    >
      {children}
    </m.div>
  );
}
