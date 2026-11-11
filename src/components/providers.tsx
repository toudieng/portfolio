"use client";

import { LazyMotion, MotionConfig } from "framer-motion";
import { ThemeProvider } from "next-themes";
import { SmoothScroll } from "@/components/smooth-scroll";

const loadFeatures = () => import("@/components/motion-features").then((mod) => mod.default);

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
      {/* Animation features are code-split and loaded after first paint */}
      <LazyMotion features={loadFeatures} strict>
        <MotionConfig reducedMotion="user">
          <SmoothScroll />
          {children}
        </MotionConfig>
      </LazyMotion>
    </ThemeProvider>
  );
}
