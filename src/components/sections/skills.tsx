import { Activity, BookOpen, Code2, Database, Heart, KanbanSquare, Languages, PenLine, Server, Sparkles } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { SpotlightCard } from "@/components/spotlight-card";
import { Badge } from "@/components/ui/badge";
import type { Dictionary } from "@/content/dictionary";
import { interests, languages, skillGroups, strengths, type SkillGroup } from "@/content/profile";
import type { Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

const icons = { code: Code2, database: Database, server: Server, kanban: KanbanSquare } as const;

const layout: Record<string, string> = {
  dev: "lg:col-span-2",
  data: "lg:row-span-2",
  sys: "",
  pm: "",
};

function GroupCard({ group, locale, index }: { group: SkillGroup; locale: Locale; index: number }) {
  const Icon = icons[group.icon];
  return (
    <Reveal delay={index * 0.08} className={cn("h-full", layout[group.id])}>
      <SpotlightCard className="group flex h-full flex-col p-6 transition-colors duration-300 hover:border-[color:var(--primary)] sm:p-7">
        <div className="flex items-center gap-3">
          <span className="grid size-11 place-items-center rounded-xl bg-primary-soft text-primary transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110">
            <Icon className="size-5" />
          </span>
          <h3 className="font-display text-xl font-semibold">{group.title[locale]}</h3>
        </div>
        <ul className="mt-5 space-y-2.5 text-sm leading-relaxed text-muted">
          {group.items.map((item) => (
            <li key={item.fr} className="flex gap-2.5">
              <span className="mt-2 size-1.5 shrink-0 rounded-full bg-accent" />
              {item[locale]}
            </li>
          ))}
        </ul>
        {group.id === "data" && (
          <pre
            aria-hidden
            className="mt-6 overflow-hidden rounded-2xl border border-border bg-background/60 p-4 font-mono text-[12px] leading-relaxed text-muted"
          >
            <span className="text-primary">SELECT</span> skill{"\n"}
            <span className="text-primary">FROM</span> astou{"\n"}
            <span className="text-primary">WHERE</span> domain = <span className="text-accent">&apos;data&apos;</span>;
          </pre>
        )}
        {group.tags.length > 0 && (
          <div className="mt-auto flex flex-wrap gap-1.5 pt-6">
            {group.tags.map((tag) => (
              <Badge key={tag} className="transition hover:-translate-y-0.5 hover:border-[color:var(--accent)]">
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </SpotlightCard>
    </Reveal>
  );
}

export function Skills({ t, locale }: { t: Dictionary; locale: Locale }) {
  const allTags = Array.from(new Set(skillGroups.flatMap((g) => g.tags)));

  return (
    <section id="skills" className="relative scroll-mt-24 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading index="02" kicker={t.skills.kicker} title={t.skills.title} />
      </div>

      {/* Infinite tech marquee */}
      <div
        aria-hidden
        className="relative mb-12 overflow-hidden border-y border-border py-4 [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]"
      >
        <div className="flex w-max animate-marquee gap-8 hover:[animation-play-state:paused]">
          {[...allTags, ...allTags].map((tag, i) => (
            <span key={i} className="font-display flex items-center gap-8 text-2xl font-semibold text-foreground/70 sm:text-3xl">
              {tag}
              <Sparkles className="size-4 text-accent" />
            </span>
          ))}
        </div>
      </div>

      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-4 px-5 sm:px-8 md:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map((g, i) => (
          <GroupCard key={g.id} group={g} locale={locale} index={i} />
        ))}

        <Reveal delay={0.1} className="h-full">
          <SpotlightCard className="h-full p-6 sm:p-7">
            <h3 className="font-display flex items-center gap-2 text-lg font-semibold">
              <Sparkles className="size-4 text-accent" /> {t.skills.strengths}
            </h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {strengths.map((s) => (
                <li key={s.fr}>
                  <Badge variant="accent" className="px-3 py-1 text-[13px]">
                    {s[locale]}
                  </Badge>
                </li>
              ))}
            </ul>
          </SpotlightCard>
        </Reveal>

        <Reveal delay={0.15} className="h-full">
          <SpotlightCard className="h-full p-6 sm:p-7">
            <h3 className="font-display flex items-center gap-2 text-lg font-semibold">
              <Languages className="size-4 text-accent" /> {t.skills.languages}
            </h3>
            <ul className="mt-5 space-y-4">
              {languages.map((l) => (
                <li key={l.name.fr}>
                  <div className="mb-1.5 flex justify-between text-sm">
                    <span>{l.name[locale]}</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-primary-soft" aria-hidden>
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-[#3b6cff] to-[#f5b547]"
                      style={{ width: `${l.level}%` }}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </SpotlightCard>
        </Reveal>

        <Reveal delay={0.2} className="h-full">
          <SpotlightCard className="h-full p-6 sm:p-7">
            <h3 className="font-display flex items-center gap-2 text-lg font-semibold">
              <Heart className="size-4 text-accent" /> {t.skills.interests}
            </h3>
            <ul className="mt-4 grid grid-cols-3 gap-2">
              {interests.map((it, i) => {
                const Icon = [BookOpen, PenLine, Activity][i] ?? Heart;
                return (
                  <li
                    key={it.fr}
                    className="flex flex-col items-center gap-2 rounded-2xl border border-border bg-background/40 px-2 py-4 text-sm"
                  >
                    <Icon className="size-5 text-primary" aria-hidden />
                    {it[locale]}
                  </li>
                );
              })}
            </ul>
          </SpotlightCard>
        </Reveal>
      </div>
    </section>
  );
}
