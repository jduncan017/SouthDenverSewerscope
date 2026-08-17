import { trustPoints } from "@/lib/content";

/*
 * Credibility strip directly under the hero. Four short proofs, no headings.
 *
 * Icon beside the label rather than above it, which halves the band's height
 * and keeps it reading as a strip between two full sections rather than as a
 * section of its own. Hairline rules separate the four at desktop, where they
 * sit on one row; at narrower widths the grid wraps and the rules come off,
 * since a divider at the end of a wrapped row reads as a mistake.
 */
export function TrustBar() {
  return (
    <section className="TrustBar bg-s0 border-s1 border-b">
      {/* The wide rail, not max-w-section: at 1200px the four columns are too
          narrow for these labels to hold one line, and a strip whose whole
          point is being short cannot afford two-line labels. A full width
          visual band is exactly what the wide variant is for. */}
      <div className="TrustBarInner max-w-section-wide mx-auto grid grid-cols-1 gap-x-4 gap-y-5 px-6 py-8 sm:grid-cols-2 md:px-16 md:py-10 lg:grid-cols-4 lg:gap-0 lg:divide-x lg:divide-s2 lg:px-12">
        {trustPoints.map(({ icon: Icon, label }) => (
          <div
            key={label}
            // Left aligned at every width. Centering each cell to its own
            // label width made the row read as ragged rather than as a rank
            // of four, and left matches the rest of the page.
            className="TrustItem flex items-center justify-start gap-3 lg:px-3"
          >
            <span className="TrustItemIcon bg-n0 text-s4 shadow-theme-sm flex size-10 shrink-0 items-center justify-center rounded-full">
              <Icon className="size-5" aria-hidden="true" />
            </span>
            {/* No text-balance here: it splits labels that fit on one line into
                two balanced ones, which is the opposite of what a short strip
                wants. Let them run and wrap only if they genuinely must. */}
            <span className="TrustItemLabel text-p4 text-base font-semibold">
              {label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
