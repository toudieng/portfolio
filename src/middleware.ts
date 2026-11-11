import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, locales } from "@/lib/i18n";

function preferredLocale(req: NextRequest) {
  const header = req.headers.get("accept-language") ?? "";
  const langs = header.split(",").map((part) => part.split(";")[0].trim().slice(0, 2).toLowerCase());
  return langs.find((l) => (locales as readonly string[]).includes(l)) ?? defaultLocale;
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const hasLocale = locales.some((l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`));
  if (hasLocale) return NextResponse.next();

  const url = req.nextUrl.clone();
  url.pathname = `/${preferredLocale(req)}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  // Skip Next internals, API routes and any file with an extension (images, pdf, sitemap.xml…)
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
