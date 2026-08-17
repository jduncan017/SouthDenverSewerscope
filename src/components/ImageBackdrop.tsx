import Image from "next/image";
import { GrainOverlay } from "@/components/GrainOverlay";
import { type SiteImage } from "@/lib/images";

/*
 * Full bleed photo backdrop for a dark band. Renders the photo, a navy gradient
 * that both dims it and deepens toward the bottom right, and the sitewide
 * grain. Drop it as the first child of a `relative` section and give that
 * section's content `relative z-10`.
 *
 * The section keeps its own flat navy gradient underneath, so this works
 * whether or not a photo exists: with no `src` the overlay simply sits on navy
 * and the band looks exactly as it did before. No conditional styling at the
 * call site, and no half-broken state while we wait on photography.
 *
 * ON THE SCRIM STRENGTH. The light end of the gradient sets the worst case
 * contrast for any white text over it. Measured against white:
 *
 *   `strong` (default, 80% at the light end)
 *       bright photo ~4.7:1 · mid tone ~9:1 · safe with any photo at all
 *   `medium` (65% at the light end)
 *       mid tone ~5.7:1 · bright photo ~3.1:1, which FAILS
 *
 * `strong` is the default: it holds up whatever gets dropped in, at the cost of
 * the photo reading as texture more than as a picture. Use `medium` only where
 * the photo is mid tone or darker, or where the text has its own backing (the
 * closing band puts its copy on a glass card, which is what earns it `medium`).
 *
 * `leftHeavy` is the hero treatment: nearly solid navy on the left where the
 * headline sits, falling away to 30% on the right so the photograph actually
 * reads. It only runs left to right ABOVE `lg`, because that is the breakpoint
 * where the hero splits into columns. Below it the hero is stacked and the copy
 * spans the full width, so a left to right gradient would drop the end of every
 * line onto the bright side. Stacked, it runs top to bottom and stays dark
 * throughout.
 */
const SCRIM = {
  strong: "bg-linear-to-br from-p4/80 via-p4/88 to-p5/96",
  medium: "bg-linear-to-br from-p4/65 via-p4/78 to-p5/92",
  leftHeavy:
    "bg-linear-to-b from-p4/88 to-p5/94 lg:bg-linear-to-r lg:from-p5/96 lg:via-p4/72 lg:to-p4/30",
} as const;

export function ImageBackdrop({
  image,
  priority = false,
  scrim = "strong",
  desktopPhotoOnly = false,
}: {
  image: SiteImage;
  /** Set on the hero, whose photo is the page's LCP element. */
  priority?: boolean;
  /*
   * Skip the photo below lg. A wide landscape shot inside a tall stacked
   * column gets cropped by object-cover to a meaningless sliver, and under the
   * scrim it reads as no photo at all. Sections that would rather render their
   * own image at those widths set this; the scrim and the band's own gradient
   * still carry the treatment, so nothing looks broken.
   */
  desktopPhotoOnly?: boolean;
  /** See the note above before reaching for `medium`. */
  scrim?: keyof typeof SCRIM;
}) {
  return (
    <>
      {image.src && (
        <Image
          src={image.src}
          alt={image.alt}
          fill
          priority={priority}
          // The 1px branch is deliberate: it makes the browser pick the
          // smallest srcset entry at widths where the photo is hidden, rather
          // than downloading a full size image it will never paint.
          sizes={
            desktopPhotoOnly ? "(min-width: 1024px) 100vw, 1px" : "100vw"
          }
          className={`ImageBackdropPhoto object-cover ${desktopPhotoOnly ? "hidden lg:block" : ""}`}
        />
      )}
      <div
        aria-hidden="true"
        className={`ImageBackdropScrim ${SCRIM[scrim]} absolute inset-0`}
      />
      <GrainOverlay />
    </>
  );
}
