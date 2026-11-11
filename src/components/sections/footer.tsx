import { ArrowUp, Mail } from "lucide-react";
import { GithubIcon } from "@/components/icons";
import type { Dictionary } from "@/content/dictionary";
import { contact } from "@/content/profile";

export function Footer({ t }: { t: Dictionary }) {
  return (
    <footer className="relative border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-5 py-8 text-sm text-muted sm:flex-row sm:px-8">
        <p>
          © {new Date().getFullYear()} <span className="font-display font-semibold text-foreground">Astou Dieng</span>.{" "}
          {t.footer.rights}
        </p>
        <div className="flex items-center gap-2">
          <a
            href={contact.github}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="grid size-9 place-items-center rounded-full transition hover:bg-primary-soft hover:text-foreground"
          >
            <GithubIcon className="size-4" />
          </a>
          <a
            href={`mailto:${contact.email}`}
            aria-label="Email"
            className="grid size-9 place-items-center rounded-full transition hover:bg-primary-soft hover:text-foreground"
          >
            <Mail className="size-4" />
          </a>
          <a
            href="#top"
            aria-label={t.footer.top}
            className="glass ml-2 grid size-9 place-items-center rounded-full transition hover:-translate-y-0.5 hover:text-accent"
          >
            <ArrowUp className="size-4" />
          </a>
        </div>
      </div>
    </footer>
  );
}
