"use client";

import { m, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";
import { ArrowUpRight, ExternalLink, Star } from "lucide-react";
import dynamic from "next/dynamic";
import { ProjectCover as Cover } from "@/components/project-cover";
import { useState } from "react";
import { GithubIcon } from "@/components/icons";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Dictionary } from "@/content/dictionary";
import { contact, projects, type Project } from "@/content/profile";
import type { Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

// Loaded on demand: keeps Radix Dialog out of the initial bundle
const ProjectDialog = dynamic(() => import("@/components/project-dialog").then((mod) => mod.ProjectDialog), {
  ssr: false,
});


function ProjectCard({
  project,
  index,
  t,
  locale,
  onOpen,
  className,
  large,
}: {
  project: Project;
  index: number;
  t: Dictionary;
  locale: Locale;
  onOpen: () => void;
  className?: string;
  large?: boolean;
}) {
  // subtle 3D tilt
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const mx = useMotionValue(50);
  const my = useMotionValue(50);
  const srx = useSpring(rx, { stiffness: 200, damping: 20 });
  const sry = useSpring(ry, { stiffness: 200, damping: 20 });
  const glow = useMotionTemplate`radial-gradient(380px circle at ${mx}% ${my}%, var(--primary-soft), transparent 50%)`;

  return (
    <Reveal delay={(index % 3) * 0.08} className={cn("h-full [perspective:1200px]", className)}>
      <m.article
        style={{ rotateX: srx, rotateY: sry }}
        onPointerMove={(e) => {
          if (e.pointerType !== "mouse") return;
          const r = e.currentTarget.getBoundingClientRect();
          const px = (e.clientX - r.left) / r.width;
          const py = (e.clientY - r.top) / r.height;
          ry.set((px - 0.5) * 6);
          rx.set((0.5 - py) * 6);
          mx.set(px * 100);
          my.set(py * 100);
        }}
        onPointerLeave={() => {
          rx.set(0);
          ry.set(0);
        }}
        className="group relative flex h-full flex-col rounded-3xl border border-border bg-elevated/60 p-4 backdrop-blur-sm transition-[border-color,box-shadow] duration-300 hover:border-[color:var(--primary)] hover:shadow-[0_30px_80px_-30px_var(--primary)] sm:p-5"
      >
        <m.div aria-hidden style={{ background: glow }} className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        <Cover project={project} index={index} large={large} />
        <div className="relative flex flex-1 flex-col px-1 pt-5">
          <div className="flex items-start justify-between gap-3">
            <h3 className="font-display text-xl font-semibold sm:text-2xl">
              {/* Stretched button: the whole card opens the detail dialog */}
              <button
                type="button"
                onClick={onOpen}
                className="text-left after:absolute after:inset-0 after:rounded-3xl after:content-[''] focus-visible:outline-none focus-visible:after:outline focus-visible:after:outline-2 focus-visible:after:outline-[color:var(--accent)]"
              >
                {project.title[locale]}
                <span className="sr-only"> — {t.projects.details}</span>
              </button>
            </h3>
            <span className="grid size-9 shrink-0 place-items-center rounded-full border border-border text-muted transition-all duration-300 group-hover:rotate-45 group-hover:border-[color:var(--accent)] group-hover:text-accent">
              <ArrowUpRight className="size-4" />
            </span>
          </div>
          {(project.featured || project.year) && (
            <p className="mt-1 flex items-center gap-2 font-mono text-xs text-muted">
              {project.year}
              {project.featured && (
                <span className="inline-flex items-center gap-1 rounded-full bg-accent-soft px-2 py-0.5 font-sans font-medium text-accent">
                  <Star className="size-3 fill-current" aria-hidden /> {t.projects.featured}
                </span>
              )}
            </p>
          )}
          <p className="mt-2 text-sm leading-relaxed text-muted">{project.summary[locale]}</p>
          <div className="mt-auto flex flex-wrap items-center gap-1.5 pt-5">
            {project.tags.map((tag) => (
              <Badge key={tag.fr} variant="primary">
                {tag[locale]}
              </Badge>
            ))}
            {project.tech?.map((tech) => (
              <Badge key={tech}>{tech}</Badge>
            ))}
          </div>
          {(project.github || project.demo) && (
            <div className="relative z-10 mt-4 flex gap-2">
              {project.github && (
                <Button asChild variant="outline" size="sm">
                  <a href={project.github} target="_blank" rel="noreferrer">
                    <GithubIcon /> {t.projects.code}
                  </a>
                </Button>
              )}
              {project.demo && (
                <Button asChild variant="outline" size="sm">
                  <a href={project.demo} target="_blank" rel="noreferrer">
                    <ExternalLink /> {t.projects.demo}
                  </a>
                </Button>
              )}
            </div>
          )}
        </div>
      </m.article>
    </Reveal>
  );
}


export function Projects({ t, locale }: { t: Dictionary; locale: Locale }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const current = openIndex !== null ? projects[openIndex] : null;

  return (
    <section id="projects" className="relative mx-auto max-w-6xl scroll-mt-24 px-5 py-20 sm:px-8 sm:py-28">
      <SectionHeading index="03" kicker={t.projects.kicker} title={t.projects.title} subtitle={t.projects.subtitle} />

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((p, i) => (
          <ProjectCard
            key={p.slug}
            project={p}
            index={i}
            t={t}
            locale={locale}
            onOpen={() => setOpenIndex(i)}
            className={i === 0 && p.featured ? "lg:col-span-2" : undefined}
            large={p.featured}
          />
        ))}

        <Reveal delay={0.16} className="h-full">
          <a
            href={contact.github}
            target="_blank"
            rel="noreferrer"
            className="group flex h-full min-h-56 flex-col justify-between rounded-3xl border border-dashed border-border p-6 transition hover:border-[color:var(--accent)] hover:bg-accent-soft"
          >
            <GithubIcon className="size-9 text-foreground transition-transform duration-500 group-hover:-rotate-12 group-hover:scale-110" />
            <div>
              <p className="font-display text-2xl font-semibold">github.com/toudieng</p>
              <p className="mt-1 flex items-center gap-1 text-sm text-muted">
                {t.projects.more}
                <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </p>
            </div>
          </a>
        </Reveal>
      </div>

      {current && openIndex !== null && (
        <ProjectDialog project={current} index={openIndex} t={t} locale={locale} onClose={() => setOpenIndex(null)} />
      )}
    </section>
  );
}
