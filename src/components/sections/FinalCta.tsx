import { Phone } from "lucide-react";
import { Button } from "@/components/Button";
import { ImageBackdrop } from "@/components/ImageBackdrop";
import { site } from "@/lib/site";
import { images } from "@/lib/images";
import { BOOK_ANCHOR } from "@/lib/nav";

/*
 * Closing band. Someone who has read this far has already decided the company
 * seems reasonable and is looking for the last nudge, so this repeats the offer
 * and the two ways to act, and nothing else.
 */
export function FinalCta() {
  return (
    <section className="FinalCta from-p4 to-p5 shadow-theme-xl relative z-10 isolate overflow-hidden bg-linear-to-br">
      {/* `medium` rather than the default: the copy sits on its own glass card
          below, so the band no longer has to carry the contrast on its own and
          the photograph gets to show through. */}
      <ImageBackdrop image={images.finalCtaBackground} scrim="medium" />
      <div className="FinalCtaInner section-pad max-w-section relative z-10 mx-auto">
        {/* Glass, not a solid fill: the point of lightening the scrim was to
            see the photo, and a solid card would put it straight back behind a
            box. Genuine overlay is the sanctioned use of transparency here. */}
        <div className="FinalCtaCard border-p2/40 bg-p5/70 mx-auto flex max-w-3xl flex-col items-center gap-6 rounded-2xl border p-8 text-center shadow-theme-xl backdrop-blur-md md:p-12">
          <h2 className="FinalCtaTitle text-n0 max-w-[20ch] text-balance">
            Find Out What&apos;s Actually in Your Sewer Line
          </h2>
          <p className="FinalCtaBody text-n3 max-w-text text-lg">
            See what&apos;s actually going on in your line, and get an honest
            answer about whether you need to do anything about it. Most of the
            time, you don&apos;t.
          </p>
          <div className="FinalCtaActions mt-2 flex flex-wrap justify-center gap-4">
            <Button as="a" href={BOOK_ANCHOR}>
              Book Your Inspection
            </Button>
            <Button as="a" href={site.contact.phoneHref} variant="onDark">
              <Phone className="size-5" aria-hidden="true" />
              {site.contact.phoneDisplay}
            </Button>
          </div>
          <p className="FinalCtaNote text-n3 text-sm">
            Evenings and Saturdays. No destination charge within{" "}
            {site.pricing.freeRadiusMiles} miles of {site.pricing.radiusOrigin}.
          </p>
        </div>
      </div>
    </section>
  );
}
