import type { Metadata, Viewport } from "next";
import { bodyFont, headingFont } from "@/fonts";
import { QueryParamProvider } from "@/components/QueryParamProvider";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MobileCtaBar } from "@/components/layout/MobileCtaBar";
import { site } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  /*
   * Title stays under ~60 characters so Google shows all of it, and leads with
   * the search term rather than the brand: nobody is searching the brand yet.
   * Description stays under ~155 for the same reason, and front loads the
   * price and the towns, which are the two things that earn the click.
   */
  title: {
    default: "Sewer Scope Inspections in Littleton & South Denver | SDS",
    template: `%s | ${site.name}`,
  },
  description: `Sewer scope inspections from $${site.pricing.scopePromo} in Littleton, Highlands Ranch, Centennial and Lone Tree. Watch the camera with us, keep the video. Evenings and Saturdays.`,
  applicationName: site.name,
  authors: [{ name: site.owner.name }],
  // Google ignores this tag; Bing and a few others still read it. Cheap to
  // keep, worth nothing on its own. The ranking work is the H1, the headings,
  // the city names in body copy, and the LocalBusiness schema.
  keywords: [
    "sewer scope Littleton",
    "sewer scope Denver",
    "sewer camera inspection Littleton",
    "sewer line inspection Highlands Ranch",
    "pre purchase sewer inspection Denver",
    "sewer scope Centennial",
    "sewer scope Lone Tree",
    "drain cleaning South Denver",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: site.url,
    siteName: site.name,
    title: "Sewer Scope Inspections in Littleton & South Denver",
    description: `Sewer scope inspections from $${site.pricing.scopePromo}. You watch the camera with us and keep the video. ${site.tagline}.`,
  },
  twitter: {
    card: "summary_large_image",
    title: "Sewer Scope Inspections in Littleton & South Denver",
    description: `Sewer scope inspections from $${site.pricing.scopePromo} across South Denver. ${site.tagline}.`,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  /*
   * The filled brand mark. Note that src/app/favicon.ico was deleted along with
   * this change: Next's file convention beats the metadata config, so the
   * create-next-app default was silently winning over anything set here.
   */
  icons: {
    icon: "/Logos/PNG/Icon-Filled.png",
    shortcut: "/Logos/PNG/Icon-Filled.png",
    apple: "/Logos/PNG/Icon-Filled.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#092745",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${bodyFont.variable} ${headingFont.variable} scroll-smooth antialiased`}
    >
      {/*
        The bottom padding reserves room for MobileCtaBar, which is fixed to the
        viewport bottom on phones. Without it the bar would cover the last line
        of the footer.
      */}
      <body className="font-body flex min-h-screen flex-col pb-20 lg:pb-0">
        <QueryParamProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <MobileCtaBar />
        </QueryParamProvider>
      </body>
    </html>
  );
}
