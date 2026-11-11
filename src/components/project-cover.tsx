import Image from "next/image";
import type { Project } from "@/content/profile";
import { cn } from "@/lib/utils";

/** Screenshot when `project.image` is set, otherwise an abstract generative cover. */
export function ProjectCover({ project, index, large }: { project: Project; index: number; large?: boolean }) {
  const [a, b] = project.hue;
  return (
    <div
      aria-hidden
      className={cn("relative overflow-hidden rounded-2xl border border-border", large ? "h-52 sm:h-64" : "h-40")}
      style={{
        background: `radial-gradient(120% 90% at 0% 0%, ${a}66, transparent 55%), radial-gradient(120% 90% at 100% 100%, ${b}55, transparent 55%), var(--bg)`,
      }}
    >
      {project.image && (
        <Image
          src={project.image}
          alt=""
          fill
          sizes="(min-width: 1024px) 66vw, (min-width: 768px) 50vw, 100vw"
          className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
        />
      )}
      <div className="absolute inset-0 bg-grid opacity-70 [mask-image:linear-gradient(to_bottom,#000,transparent)]" />
      <div
        className="absolute -bottom-10 -right-6 size-40 rounded-full blur-2xl transition-transform duration-700 group-hover:scale-150"
        style={{ background: `${b}55` }}
      />
      <span className="font-display absolute bottom-2 left-4 text-7xl font-bold text-foreground/10 transition-all duration-500 group-hover:text-foreground/20 sm:text-8xl">
        {String(index + 1).padStart(2, "0")}
      </span>
      <div className="absolute right-4 top-4 flex gap-1.5">
        <span className="size-2 rounded-full" style={{ background: a }} />
        <span className="size-2 rounded-full" style={{ background: b }} />
      </div>
    </div>
  );
}
