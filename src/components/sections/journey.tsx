"use client";

import { m, useScroll, useSpring } from "framer-motion";
import { GraduationCap } from "lucide-react";
import { useRef } from "react";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { SpotlightCard } from "@/components/spotlight-card";
import { Badge } from "@/components/ui/badge";
import type { Dictionary } from "@/content/dictionary";
import { timeline } from "@/content/profile";
import type { Locale } from "@/lib/i18n";

export function Journey({ t, locale }: { t: Dictionary; locale: Locale }) {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 55%"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <section id="journey" className="relative mx-auto max-w-6xl scroll-mt-24 px-5 py-20 sm:px-8 sm:py-28">
      <SectionHeading index="04" kicker={t.journey.kicker} title={t.journey.title} />

      <ol ref={ref} className="relative ml-4 sm:ml-0">
        {/* rail */}
        <div aria-hidden className="absolute bottom-0 left-0 top-0 w-px bg-border sm:left-1/2" />
        <m.div
          aria-hidden
          style={{ scaleY }}
          className="absolute bottom-0 left-0 top-0 w-px origin-top bg-gradient-to-b from-[#3b6cff] via-[#6f93ff] to-[#f5b547] sm:left-1/2"
        />

        {timeline.map((item, i) => {
          const right = i % 2 === 1;
          return (
            <li key={item.title.fr} className="relative grid pb-14 last:pb-0 sm:grid-cols-2 sm:gap-16">
              {/* node */}
              <span
                aria-hidden
                className="absolute left-0 top-6 z-10 grid size-9 -translate-x-1/2 place-items-center rounded-full border border-border bg-background text-accent shadow-[0_0_0_6px_var(--bg)] sm:left-1/2"
              >
                {item.current && <span className="absolute inset-0 rounded-full bg-accent/40 animate-pulse-ring" />}
                <GraduationCap className="size-4" />
              </span>

              <Reveal
                y={30}
                className={right ? "pl-10 sm:col-start-2 sm:pl-0" : "pl-10 sm:col-start-1 sm:pl-0 sm:text-right"}
              >
                <SpotlightCard className="p-6 sm:p-7">
                  <div className={`flex flex-wrap items-center gap-2 ${right ? "" : "sm:justify-end"}`}>
                    <span className="font-mono text-sm text-accent">{item.period[locale]}</span>
                    {item.current && <Badge variant="primary">{t.journey.current}</Badge>}
                  </div>
                  <h3 className="font-display mt-2 text-2xl font-semibold leading-tight">{item.title[locale]}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{item.place[locale]}</p>
                </SpotlightCard>
              </Reveal>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
