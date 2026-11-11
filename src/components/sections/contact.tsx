"use client";

import { Check, Copy, Mail, MapPin, Phone, Send } from "lucide-react";
import { useState } from "react";
import { GithubIcon, LinkedinIcon } from "@/components/icons";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { SpotlightCard } from "@/components/spotlight-card";
import { Button } from "@/components/ui/button";
import type { Dictionary } from "@/content/dictionary";
import { contact } from "@/content/profile";

function CopyRow({
  icon: Icon,
  label,
  value,
  href,
  t,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  href?: string;
  t: Dictionary;
}) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard unavailable */
    }
  };
  return (
    <div className="group flex items-center gap-4 rounded-2xl border border-border bg-background/40 p-4 transition hover:border-[color:var(--primary)]">
      <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-primary-soft text-primary">
        <Icon className="size-5" />
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-xs uppercase tracking-wider text-muted">{label}</p>
        {href ? (
          <a href={href} className="block truncate font-medium hover:text-accent">
            {value}
          </a>
        ) : (
          <p className="truncate font-medium">{value}</p>
        )}
      </div>
      {href && (
        <button
          type="button"
          onClick={copy}
          className="grid size-9 shrink-0 place-items-center rounded-full text-muted transition hover:bg-primary-soft hover:text-foreground"
          aria-label={`${copied ? t.contact.copied : t.contact.copy} — ${label}`}
        >
          {copied ? <Check className="size-4 text-accent" /> : <Copy className="size-4" />}
        </button>
      )}
      <span className="sr-only" aria-live="polite">
        {copied ? t.contact.copied : ""}
      </span>
    </div>
  );
}

export function Contact({ t }: { t: Dictionary }) {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const body = `${form.message}\n\n— ${form.name}${form.email ? ` (${form.email})` : ""}`;
    window.location.href = `mailto:${contact.email}?subject=${encodeURIComponent(
      `${t.contact.subject} — ${form.name}`,
    )}&body=${encodeURIComponent(body)}`;
  };

  const field =
    "w-full rounded-2xl border border-border bg-background/50 px-4 py-3 text-base text-foreground placeholder:text-muted/70 outline-none transition focus:border-[color:var(--primary)] focus:ring-4 focus:ring-[color:var(--primary-soft)]";

  return (
    <section id="contact" className="relative mx-auto max-w-6xl scroll-mt-24 px-5 py-20 sm:px-8 sm:py-28">
      {/* halo */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/3 -z-10 size-[min(40rem,100vw)] -translate-x-1/2 rounded-full blur-[120px]"
        style={{ background: "radial-gradient(circle, var(--glow-1), transparent 65%)", opacity: 0.5 }}
      />
      <SectionHeading index="05" kicker={t.contact.kicker} title={t.contact.title} subtitle={t.contact.subtitle} />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_1.15fr]">
        <Reveal className="space-y-3">
          <CopyRow icon={Mail} label={t.contact.email} value={contact.email} href={`mailto:${contact.email}`} t={t} />
          <CopyRow icon={Phone} label={t.contact.phone} value={contact.phone} href={contact.phoneHref} t={t} />
          <CopyRow icon={MapPin} label={t.contact.location} value={contact.location} t={t} />
          <div className="flex gap-3 pt-3">
            <Button asChild variant="outline">
              <a href={contact.github} target="_blank" rel="noreferrer">
                <GithubIcon /> GitHub
              </a>
            </Button>
            {contact.linkedin && (
              <Button asChild variant="outline">
                <a href={contact.linkedin} target="_blank" rel="noreferrer">
                  <LinkedinIcon /> LinkedIn
                </a>
              </Button>
            )}
          </div>
        </Reveal>

        <Reveal delay={0.12}>
          <SpotlightCard className="ring-gradient p-6 sm:p-8">
            <form onSubmit={onSubmit} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block space-y-2">
                  <span className="text-sm font-medium">{t.contact.name}</span>
                  <input
                    required
                    name="name"
                    autoComplete="name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder={t.contact.namePh}
                    className={field}
                  />
                </label>
                <label className="block space-y-2">
                  <span className="text-sm font-medium">{t.contact.email}</span>
                  <input
                    required
                    type="email"
                    name="email"
                    autoComplete="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder={t.contact.emailPh}
                    className={field}
                  />
                </label>
              </div>
              <label className="block space-y-2">
                <span className="text-sm font-medium">{t.contact.message}</span>
                <textarea
                  required
                  name="message"
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder={t.contact.messagePh}
                  className={`${field} resize-y`}
                />
              </label>
              <Button type="submit" size="lg" className="w-full sm:w-auto">
                {t.contact.send}
                <Send className="transition-transform group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-1" />
              </Button>
              <p className="text-xs text-muted">{t.contact.note}</p>
            </form>
          </SpotlightCard>
        </Reveal>
      </div>
    </section>
  );
}
