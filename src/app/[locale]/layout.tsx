import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import { notFound } from "next/navigation";
import { Providers } from "@/components/providers";
import { getDictionary } from "@/content/dictionary";
import { contact, site } from "@/content/profile";
import { isLocale, locales } from "@/lib/i18n";
import "../globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const display = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display-face",
  display: "swap",
  weight: ["500", "600", "700"],
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#070b1a" },
    { media: "(prefers-color-scheme: light)", color: "#faf8f3" },
  ],
  width: "device-width",
  initialScale: 1,
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = getDictionary(locale);
  return {
    metadataBase: new URL(site.url),
    title: { default: t.meta.title, template: `%s · ${site.name}` },
    description: t.meta.description,
    applicationName: site.name,
    authors: [{ name: site.name, url: contact.github }],
    creator: site.name,
    keywords: [
      "Astou Dieng",
      "portfolio",
      "développeuse",
      "developer",
      "full-stack",
      "UCAD",
      "Dakar",
      "Sénégal",
      "Next.js",
      "React",
      "Django",
      "Flutter",
    ],
    alternates: {
      canonical: `/${locale}`,
      languages: { fr: "/fr", en: "/en", "x-default": "/fr" },
    },
    openGraph: {
      type: "profile",
      locale: locale === "fr" ? "fr_SN" : "en_US",
      alternateLocale: locale === "fr" ? ["en_US"] : ["fr_SN"],
      url: `/${locale}`,
      siteName: site.name,
      title: t.meta.title,
      description: t.meta.description,
      firstName: "Astou",
      lastName: "Dieng",
    },
    twitter: { card: "summary_large_image", title: t.meta.title, description: t.meta.description },
    robots: { index: true, follow: true },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Astou Dieng",
    jobTitle: locale === "fr" ? "Étudiante en informatique" : "Computer Science student",
    email: `mailto:${contact.email}`,
    telephone: contact.phone,
    address: { "@type": "PostalAddress", addressLocality: "Dakar", addressCountry: "SN" },
    alumniOf: { "@type": "CollegeOrUniversity", name: "Université Cheikh Anta Diop (UCAD)" },
    sameAs: [contact.github, contact.linkedin].filter(Boolean),
    url: site.url,
  };

  return (
    <html lang={locale} suppressHydrationWarning className={`${inter.variable} ${display.variable}`}>
      <body className="grain min-h-dvh">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
