import { Archivo, Inter } from "next/font/google";

/*
 * ===========================================
 * FONTS — South Denver Sewerscope
 * ===========================================
 * Archivo: all headings (H1-H6, applied via the base layer). A tight, heavy
 *   grotesque chosen to match the logo wordmark. Unlike the library's default
 *   (Cormorant, a serif), this brand is a trades brand, so headings run BOLD:
 *   the weights in globals.css base layer are set accordingly.
 * Inter: body text (screen-readability first, design-system rule).
 *
 * These two faces plus the 24 palette hexes in globals.css are the only
 * per-client values in the whole design system. See docs/design-system.md.
 */

// Body font — Inter (300/400/500/600)
export const bodyFont = Inter({
  subsets: ["latin"],
  variable: "--font-body-face",
  weight: ["300", "400", "500", "600"],
});

// Heading font — Archivo (500/600/700/800). Heavy end carries the display
// headings; 500/600 covers small functional headings and the Eyebrow.
export const headingFont = Archivo({
  subsets: ["latin"],
  variable: "--font-heading-face",
  weight: ["500", "600", "700", "800"],
});
