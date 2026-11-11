"use client";

import { AnimatePresence, m, useMotionValueEvent, useScroll } from "framer-motion";
import { Menu, Moon, Sun, X } from "lucide-react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import type { Dictionary } from "@/content/dictionary";
import type { Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

const ids = ["about", "skills", "projects", "journey", "contact"] as const;

function ThemeToggle({ label }: { label: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const dark = !mounted || resolvedTheme === "dark";
  return (
    <button
      type="button"
      onClick={() => setTheme(dark ? "light" : "dark")}
      aria-label={label}
      title={label}
      className="glass relative grid size-10 place-items-center overflow-hidden rounded-full text-foreground transition hover:text-accent"
    >
      <AnimatePresence mode="wait" initial={false}>
        <m.span
          key={dark ? "moon" : "sun"}
          initial={{ y: 16, opacity: 0, rotate: -60 }}
          animate={{ y: 0, opacity: 1, rotate: 0 }}
          exit={{ y: -16, opacity: 0, rotate: 60 }}
          transition={{ duration: 0.25 }}
        >
          {dark ? <Moon className="size-4" /> : <Sun className="size-4" />}
        </m.span>
      </AnimatePresence>
    </button>
  );
}

function LangSwitch({ locale, label }: { locale: Locale; label: string }) {
  return (
    <div role="group" aria-label={label} className="glass flex h-10 items-center rounded-full p-1 text-xs font-semibold">
      {(["fr", "en"] as const).map((l) => (
        <Link
          key={l}
          href={`/${l}`}
          hrefLang={l}
          lang={l}
          aria-current={l === locale ? "true" : undefined}
          className={cn(
            "relative grid h-8 w-9 place-items-center rounded-full uppercase transition-colors",
            l === locale ? "text-white" : "text-muted hover:text-foreground",
          )}
        >
          {l === locale && (
            <m.span layoutId="lang-pill" className="absolute inset-0 rounded-full bg-[#2b55e6]" />
          )}
          <span className="relative">{l}</span>
        </Link>
      ))}
    </div>
  );
}

export function Navbar({ t, locale }: { t: Dictionary; locale: Locale }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("");
  const { scrollY, scrollYProgress } = useScroll();
  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 24));

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && setActive(e.target.id));
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <a
        href="#main"
        className="fixed left-4 top-4 z-[80] -translate-y-20 rounded-full bg-[#2b55e6] px-4 py-2 text-sm font-medium text-white transition focus:translate-y-0"
      >
        {t.nav.skip}
      </a>
      <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5">
        <nav
          aria-label="Main"
          className={cn(
            "mx-auto flex max-w-6xl items-center justify-between gap-3 rounded-full px-3 py-2 transition-all duration-500 sm:px-4",
            scrolled ? "glass shadow-lg shadow-black/5" : "border border-transparent",
          )}
        >
          <a href="#top" className="group flex items-center gap-2.5">
            <span className="font-display grid size-10 place-items-center rounded-full bg-gradient-to-br from-[#3b6cff] to-[#f5b547] text-sm font-bold text-white shadow-lg transition-transform duration-500 group-hover:rotate-[360deg]">
              AD
            </span>
            <span className="font-display hidden text-base font-semibold sm:block">Astou Dieng</span>
          </a>

          <ul className="hidden items-center gap-1 md:flex">
            {ids.map((id) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  aria-current={active === id ? "true" : undefined}
                  className={cn(
                    "relative rounded-full px-3.5 py-2 text-sm transition-colors",
                    active === id ? "text-foreground" : "text-muted hover:text-foreground",
                  )}
                >
                  {active === id && (
                    <m.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full bg-primary-soft"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span className="relative">{t.nav[id]}</span>
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <LangSwitch locale={locale} label={t.nav.language} />
            <ThemeToggle label={t.nav.theme} />
            <button
              type="button"
              className="glass grid size-10 place-items-center rounded-full md:hidden"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? t.nav.close : t.nav.menu}
              onClick={() => setOpen((o) => !o)}
            >
              {open ? <X className="size-4" /> : <Menu className="size-4" />}
            </button>
          </div>
        </nav>

        <AnimatePresence>
          {open && (
            <m.div
              id="mobile-menu"
              initial={{ opacity: 0, y: -12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.98 }}
              transition={{ duration: 0.25 }}
              className="glass mx-auto mt-2 max-w-6xl rounded-3xl p-3 md:hidden"
            >
              <ul className="flex flex-col">
                {ids.map((id, i) => (
                  <m.li
                    key={id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.04 * i }}
                  >
                    <a
                      href={`#${id}`}
                      onClick={() => setOpen(false)}
                      className="font-display flex items-center justify-between rounded-2xl px-4 py-3 text-lg font-medium hover:bg-primary-soft"
                    >
                      {t.nav[id]}
                      <span className="font-mono text-xs text-muted">0{i + 1}</span>
                    </a>
                  </m.li>
                ))}
              </ul>
            </m.div>
          )}
        </AnimatePresence>
      </header>
      {/* reading progress */}
      <m.div
        aria-hidden
        style={{ scaleX: scrollYProgress }}
        className="fixed inset-x-0 top-0 z-[55] h-0.5 origin-left bg-gradient-to-r from-[#3b6cff] to-[#f5b547]"
      />
    </>
  );
}
