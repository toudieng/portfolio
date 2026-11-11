import { GraduationCap, MapPin } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { SpotlightCard } from "@/components/spotlight-card";
import type { Dictionary } from "@/content/dictionary";
import { contact, languages, projects } from "@/content/profile";

export function About({ t }: { t: Dictionary }) {
  const stats = [
    { value: projects.length, label: t.about.stats.projects },
    { value: 2, label: t.about.stats.degrees },
    { value: languages.length, label: t.about.stats.languages },
  ];

  return (
    <section id="about" className="relative mx-auto max-w-6xl scroll-mt-24 px-5 py-20 sm:px-8 sm:py-28">
      <SectionHeading index="01" kicker={t.about.kicker} title={t.about.title} />

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.2fr_1fr] lg:gap-12">
        <Reveal className="space-y-5 text-pretty text-lg leading-relaxed text-muted">
          <p className="text-foreground">{t.about.p1}</p>
          <p>{t.about.p2}</p>
          <p>{t.about.p3}</p>
        </Reveal>

        <Reveal delay={0.15}>
          <SpotlightCard className="ring-gradient relative overflow-hidden p-6 sm:p-8">
            <div
              aria-hidden
              className="pointer-events-none absolute -right-16 -top-16 size-56 rounded-full blur-3xl"
              style={{ background: "radial-gradient(circle, var(--glow-2), transparent 70%)" }}
            />
            <div className="relative flex items-center gap-4">
              <span className="font-display grid size-16 place-items-center rounded-2xl bg-gradient-to-br from-[#3b6cff] to-[#f5b547] text-2xl font-bold text-white shadow-xl">
                AD
              </span>
              <div>
                <p className="font-display text-xl font-semibold">Astou Dieng</p>
                <p className="flex items-center gap-1.5 text-sm text-muted">
                  <MapPin className="size-3.5" /> {t.about.based} {contact.location}
                </p>
              </div>
            </div>

            <div className="relative mt-6 flex items-start gap-3 rounded-2xl border border-border bg-background/40 p-4 text-sm">
              <GraduationCap className="mt-0.5 size-5 shrink-0 text-accent" />
              <p>
                <span className="font-medium text-foreground">Master SIR · UCAD</span>
                <br />
                <span className="text-muted">Université Cheikh Anta Diop de Dakar</span>
              </p>
            </div>

            <dl className="relative mt-6 grid grid-cols-3 gap-3">
              {stats.map((s) => (
                <div key={s.label} className="rounded-2xl border border-border bg-background/40 p-3 text-center sm:p-4">
                  <dt className="sr-only">{s.label}</dt>
                  <dd className="font-display text-3xl font-bold text-gradient sm:text-4xl">{s.value}</dd>
                  <dd className="mt-1 text-[11px] leading-tight text-muted sm:text-xs">{s.label}</dd>
                </div>
              ))}
            </dl>
          </SpotlightCard>
        </Reveal>
      </div>
    </section>
  );
}
