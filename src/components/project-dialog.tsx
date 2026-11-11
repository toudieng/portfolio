"use client";

import { ExternalLink } from "lucide-react";
import { GithubIcon } from "@/components/icons";
import { ProjectCover as Cover } from "@/components/project-cover";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import type { Dictionary } from "@/content/dictionary";
import type { Project } from "@/content/profile";
import type { Locale } from "@/lib/i18n";

function ProjectDetail({ project, index, t, locale }: { project: Project; index: number; t: Dictionary; locale: Locale }) {
  const hasExtra = project.description || project.role || project.features?.length || project.tech?.length;
  return (
    <div className="p-5 sm:p-7">
      <Cover project={project} index={index} large />
      <div className="mt-6 flex flex-wrap items-center gap-2">
        {project.tags.map((tag) => (
          <Badge key={tag.fr} variant="primary">
            {tag[locale]}
          </Badge>
        ))}
        {project.year && <Badge variant="accent">{project.year}</Badge>}
      </div>
      <DialogTitle className="font-display mt-4 text-3xl font-bold sm:text-4xl">{project.title[locale]}</DialogTitle>
      <DialogDescription className="mt-3 text-base leading-relaxed text-muted">
        {project.description?.[locale] ?? project.summary[locale]}
      </DialogDescription>

      {project.role && (
        <div className="mt-6">
          <h4 className="font-mono text-xs uppercase tracking-[0.2em] text-accent">{t.projects.role}</h4>
          <p className="mt-2 text-sm leading-relaxed">{project.role[locale]}</p>
        </div>
      )}
      {project.features && project.features.length > 0 && (
        <div className="mt-6">
          <h4 className="font-mono text-xs uppercase tracking-[0.2em] text-accent">{t.projects.features}</h4>
          <ul className="mt-2 space-y-1.5 text-sm">
            {project.features.map((f) => (
              <li key={f.fr} className="flex gap-2.5">
                <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" />
                {f[locale]}
              </li>
            ))}
          </ul>
        </div>
      )}
      {project.tech && project.tech.length > 0 && (
        <div className="mt-6">
          <h4 className="font-mono text-xs uppercase tracking-[0.2em] text-accent">{t.projects.stack}</h4>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {project.tech.map((tech) => (
              <Badge key={tech}>{tech}</Badge>
            ))}
          </div>
        </div>
      )}
      {!hasExtra && <p className="mt-6 text-sm italic text-muted">{t.projects.soon}</p>}

      {(project.github || project.demo) && (
        <div className="mt-8 flex flex-wrap gap-3">
          {project.github && (
            <Button asChild>
              <a href={project.github} target="_blank" rel="noreferrer">
                <GithubIcon /> {t.projects.code}
              </a>
            </Button>
          )}
          {project.demo && (
            <Button asChild variant="outline">
              <a href={project.demo} target="_blank" rel="noreferrer">
                <ExternalLink /> {t.projects.demo}
              </a>
            </Button>
          )}
        </div>
      )}
    </div>
  );
}

export function ProjectDialog({
  project,
  index,
  t,
  locale,
  onClose,
}: {
  project: Project;
  index: number;
  t: Dictionary;
  locale: Locale;
  onClose: () => void;
}) {
  return (
    <Dialog defaultOpen onOpenChange={(open) => !open && onClose()}>
      <DialogContent closeLabel={t.projects.close}>
        <ProjectDetail project={project} index={index} t={t} locale={locale} />
      </DialogContent>
    </Dialog>
  );
}
