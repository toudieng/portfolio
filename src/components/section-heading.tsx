import { Reveal } from "@/components/reveal";
import { cn } from "@/lib/utils";

export function SectionHeading({
  index,
  kicker,
  title,
  subtitle,
  className,
}: {
  index: string;
  kicker: string;
  title: string;
  subtitle?: string;
  className?: string;
}) {
  return (
    <Reveal className={cn("mb-12 max-w-3xl sm:mb-16", className)}>
      <p className="mb-4 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.25em] text-accent">
        <span className="text-muted">{index}</span>
        <span className="h-px w-10 bg-gradient-to-r from-accent to-transparent" />
        {kicker}
      </p>
      <h2 className="font-display text-balance text-4xl font-bold leading-[1.05] sm:text-5xl md:text-6xl">{title}</h2>
      {subtitle ? <p className="mt-4 text-base text-muted sm:text-lg">{subtitle}</p> : null}
    </Reveal>
  );
}
