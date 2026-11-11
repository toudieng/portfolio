import { ImageResponse } from "next/og";
import { getDictionary } from "@/content/dictionary";
import { isLocale, locales } from "@/lib/i18n";

export const alt = "Astou Dieng — Portfolio";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function OgImage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = getDictionary(isLocale(locale) ? locale : "fr");
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          color: "#e8ecf8",
          background:
            "radial-gradient(circle at 10% 10%, rgba(59,108,255,0.55), transparent 45%), radial-gradient(circle at 95% 90%, rgba(245,181,71,0.45), transparent 45%)",
          backgroundColor: "#070b1a",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: 999,
              background: "linear-gradient(135deg,#3b6cff,#f5b547)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 30,
              fontWeight: 700,
              color: "white",
            }}
          >
            AD
          </div>
          <div style={{ fontSize: 28, color: "#9aa6c4" }}>{t.hero.badge}</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 120, fontWeight: 800, letterSpacing: -4, lineHeight: 1 }}>Astou Dieng</div>
          <div style={{ fontSize: 44, marginTop: 20, color: "#f5b547" }}>{t.hero.role}</div>
        </div>
        <div style={{ fontSize: 26, color: "#9aa6c4" }}>Web · Mobile · Data · github.com/toudieng</div>
      </div>
    ),
    size,
  );
}
