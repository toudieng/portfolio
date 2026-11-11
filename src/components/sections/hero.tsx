"use client";

import { AnimatePresence, m, useReducedMotion } from "framer-motion";
import { ArrowDown, ArrowRight, Download, Mail, MapPin } from "lucide-react";
import { GithubIcon } from "@/components/icons";
import { useEffect, useState } from "react";
import { HeroBackground } from "@/components/hero-background";
import { Button } from "@/components/ui/button";
import type { Dictionary } from "@/content/dictionary";
import { contact, heroWords, site } from "@/content/profile";
import type { Locale } from "@/lib/i18n";

const ease = [0.2, 0.8, 0.2, 1] as const;

function SplitName({ text, delay = 0 }: { text: string; delay?: number }) {
  return (
    <span aria-hidden className="inline-block">
      {text.split("").map((char, i) => (
        <m.span
          key={i}
          className="inline-block"
          initial={{ y: "110%", opacity: 0, rotate: 6 }}
          animate={{ y: "0%", opacity: 1, rotate: 0 }}
          transition={{ duration: 0.8, ease, delay: delay + i * 0.045 }}
        >
          {char === " " ? " " : char}
        </m.span>
      ))}
    </span>
  );
}

function RotatingWord({ words }: { words: string[] }) {
  const [index, setIndex] = useState(0);
  const reduce = useReducedMotion();
  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % words.length), 2400);
    return () => clearInterval(id);
  }, [words.length, reduce]);

  return (
    <span className="relative inline-grid align-bottom" aria-live="off">
      {/* reserve width of the longest word */}
      <span className="invisible col-start-1 row-start-1 whitespace-nowrap">
        {words.reduce((a, b) => (a.length > b.length ? a : b))}
      </span>
      <AnimatePresence mode="wait" initial={false}>
        <m.span
          key={words[index]}
          className="text-gradient animate-shine col-start-1 row-start-1 whitespace-nowrap font-semibold"
          initial={{ y: "60%", opacity: 0, filter: "blur(6px)" }}
          animate={{ y: "0%", opacity: 1, filter: "blur(0px)" }}
          exit={{ y: "-60%", opacity: 0, filter: "blur(6px)" }}
          transition={{ duration: 0.45, ease }}
        >
          {words[index]}
        </m.span>
      </AnimatePresence>
    </span>
  );
}

function CodeCard({ locale }: { locale: Locale }) {
  const fr = locale === "fr";
  const lines: [string, string][] = [
    ["role", fr ? '"Étudiante en informatique"' : '"Computer Science student"'],
    ["school", '"UCAD — Dakar"'],
    ["degree", fr ? '"Master SI Répartis"' : '"MSc Distributed IS"'],
    ["stack", '["React", "Next.js", "Django", "Flutter"]'],
    ["data", '["PostgreSQL", "MySQL", "Oracle"]'],
    ["languages", fr ? '["Français", "Anglais"]' : '["French", "English"]'],
  ];
  return (
    <m.div
      initial={{ opacity: 0, y: 30, rotate: -2 }}
      animate={{ opacity: 1, y: 0, rotate: 0 }}
      transition={{ duration: 1, ease, delay: 0.9 }}
      className="ring-gradient glass relative w-full max-w-md rounded-2xl p-5 font-mono text-[13px] leading-relaxed shadow-2xl"
      aria-hidden
    >
      <div className="mb-4 flex items-center gap-1.5">
        <span className="size-2.5 rounded-full bg-[#ff5f57]" />
        <span className="size-2.5 rounded-full bg-[#febc2e]" />
        <span className="size-2.5 rounded-full bg-[#28c840]" />
        <span className="ml-3 text-xs text-muted">astou.ts</span>
      </div>
      <p>
        <span className="text-primary">const</span> <span className="text-accent">astou</span>{" "}
        <span className="text-muted">=</span> {"{"}
      </p>
      {lines.map(([k, v], i) => (
        <m.p
          key={k}
          className="pl-5"
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.2 + i * 0.12, duration: 0.4 }}
        >
          <span className="text-foreground/90">{k}</span>
          <span className="text-muted">: </span>
          <span className="text-accent/90">{v}</span>
          <span className="text-muted">,</span>
        </m.p>
      ))}
      <p>
        {"}"}
        <span className="ml-0.5 inline-block h-4 w-2 translate-y-0.5 animate-pulse bg-primary" />
      </p>
    </m.div>
  );
}

export function Hero({ t, locale }: { t: Dictionary; locale: Locale }) {
  return (
    <section id="top" className="relative isolate flex min-h-[100svh] items-center overflow-hidden pt-24 pb-16">
      <HeroBackground />

      <div className="relative mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-12 px-5 sm:px-8 lg:grid-cols-[1.25fr_1fr]">
        <div>
          <m.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
            className="glass inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-medium text-foreground/85"
          >
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full rounded-full bg-accent animate-pulse-ring" />
              <span className="relative inline-flex size-2 rounded-full bg-accent" />
            </span>
            {t.hero.badge}
          </m.p>

          <m.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15, duration: 0.6 }}
            className="mt-6 text-base text-muted sm:text-lg"
          >
            {t.hero.hello}
          </m.p>

          <h1 className="font-display mt-1 overflow-hidden pb-2 text-[clamp(3rem,11vw,7.5rem)] font-bold leading-[0.9]">
            <span className="sr-only">Astou Dieng — {t.hero.role}</span>
            <SplitName text="Astou" delay={0.2} />
            <br />
            <span className="text-gradient animate-shine">
              <SplitName text="Dieng" delay={0.45} />
            </span>
          </h1>

          <m.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.7, ease }}
            className="font-display mt-5 text-xl font-medium text-foreground sm:text-2xl"
          >
            {t.hero.lead} <RotatingWord words={heroWords[locale]} />
          </m.p>

          <p className="rise mt-4 max-w-xl text-pretty text-base leading-relaxed text-muted sm:text-lg">
            {t.hero.pitch}
          </p>

          <m.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.7, ease }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <Button asChild size="lg">
              <a href="#projects">
                {t.hero.ctaProjects}
                <ArrowRight className="transition-transform group-hover/btn:translate-x-1" />
              </a>
            </Button>
            <Button asChild variant="outline" size="lg">
              <a href={site.cv} download="Astou_DIENG_CV.pdf">
                <Download className="transition-transform group-hover/btn:translate-y-0.5" />
                {t.hero.ctaCv}
              </a>
            </Button>
          </m.div>

          <m.ul
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3, duration: 0.7 }}
            className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted"
          >
            <li>
              <a href={contact.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 transition hover:text-foreground">
                <GithubIcon className="size-4" /> toudieng
              </a>
            </li>
            <li>
              <a href={`mailto:${contact.email}`} className="inline-flex items-center gap-1.5 transition hover:text-foreground">
                <Mail className="size-4" /> {contact.email}
              </a>
            </li>
            <li className="inline-flex items-center gap-1.5">
              <MapPin className="size-4" /> {contact.location}
            </li>
          </m.ul>
        </div>

        <div className="hidden justify-end lg:flex">
          <CodeCard locale={locale} />
        </div>
      </div>

      <a
        href="#about"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-xs uppercase tracking-[0.2em] text-muted transition hover:text-foreground sm:flex"
      >
        {t.hero.scroll}
        <m.span animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.8 }}>
          <ArrowDown className="size-4" />
        </m.span>
      </a>
    </section>
  );
}
