import { notFound } from "next/navigation";
import { CursorGlow } from "@/components/cursor-glow";
import { Navbar } from "@/components/navbar";
import { About } from "@/components/sections/about";
import { Contact } from "@/components/sections/contact";
import { Footer } from "@/components/sections/footer";
import { Hero } from "@/components/sections/hero";
import { Journey } from "@/components/sections/journey";
import { Projects } from "@/components/sections/projects";
import { Skills } from "@/components/sections/skills";
import { getDictionary } from "@/content/dictionary";
import { isLocale } from "@/lib/i18n";

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = getDictionary(locale);

  return (
    <>
      <CursorGlow />
      <Navbar t={t} locale={locale} />
      <main id="main" className="relative">
        <Hero t={t} locale={locale} />
        <About t={t} />
        <Skills t={t} locale={locale} />
        <Projects t={t} locale={locale} />
        <Journey t={t} locale={locale} />
        <Contact t={t} />
      </main>
      <Footer t={t} />
    </>
  );
}
