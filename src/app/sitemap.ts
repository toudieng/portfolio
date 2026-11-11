import type { MetadataRoute } from "next";
import { site } from "@/content/profile";
import { locales } from "@/lib/i18n";

export default function sitemap(): MetadataRoute.Sitemap {
  return locales.map((locale) => ({
    url: `${site.url}/${locale}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: locale === "fr" ? 1 : 0.9,
    alternates: { languages: Object.fromEntries(locales.map((l) => [l, `${site.url}/${l}`])) },
  }));
}
