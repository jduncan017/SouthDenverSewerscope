/*
 * ============================================================================
 * PHOTOGRAPHY — every image on the site, in one place
 * ============================================================================
 *
 * HOW TO ADD A PHOTO
 *   1. Drop the file anywhere under `public/`.
 *   2. Put the path in the `src` below, written from the public root:
 *        src: "/denver-sewerscopes-hero.webp"
 *   3. Write the `alt`. That is it. Nothing else needs touching.
 *
 * Leave `src` as "" and the site still works: photo positions render a designed
 * placeholder showing the `brief`, and the two background sections fall back to
 * their flat brand gradient. So this file can be filled in one image at a time
 * as the shots come in, and nothing is ever half broken in between.
 *
 * FORMAT: WebP, exported at display size (design system §5). The backgrounds
 * are full bleed, so give those roughly 2400px wide; the portraits only ever
 * render about 600px wide.
 */

export interface SiteImage {
  /** Path from the public root, e.g. "/photos/frank.webp". Empty = not shot. */
  src: string;
  /**
   * Alt text. Leave empty for the background images: they are decorative, sit
   * behind a heavy overlay, and every word over them is already real text, so
   * describing them would only add noise for a screen reader.
   */
  alt: string;
  /** The shot we need. Shown in the placeholder until `src` is filled in. */
  brief: string;
}

export const images = {
  /** Full bleed behind the hero. Sits under a heavy navy gradient, so choose
   *  something with clear shapes rather than fine detail. */
  heroBackground: {
    src: "/denver-sewerscopes-hero.webp",
    alt: "",
    brief:
      "Hero background. A camera reel at an open cleanout, or a van and equipment on a South Denver driveway. Shot wide, with room on the left where the headline sits.",
  },

  /** Full bleed behind the closing call to action. */
  finalCtaBackground: {
    src: "/denver-sewerscopes-tunnel.webp",
    alt: "",
    brief:
      "Closing band background. The monitor showing pipe interior, or a wide shot of a residential street in Littleton. Anything with depth reads well this dark.",
  },

  /** The owner, in the About section. */
  ownerPortrait: {
    src: "/frank-3.webp",
    alt: "Frank Menkel, owner of South Denver Sewerscopes",
    brief:
      "Portrait of Frank Menkel. On site in work clothes beside the camera reel beats a studio headshot every time.",
  },

  /** Beside the accordion in the How We Work section. */
  monitorWalkthrough: {
    src: "/denver-sewerscope-4.webp",
    alt: "Frank Menkel showing a homeowner the sewer camera footage on the monitor",
    brief:
      "Frank and a homeowner at the camera monitor, both looking at the screen. This is the shot that whole section is arguing for, so it is the highest priority photo on the site.",
  },
} as const satisfies Record<string, SiteImage>;

export type ImageKey = keyof typeof images;
