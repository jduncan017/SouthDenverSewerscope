import { Check, Phone } from "lucide-react";
import { Button } from "@/components/Button";
import { Badge } from "@/components/Badge";
import { ImageBackdrop } from "@/components/ImageBackdrop";
import { site } from "@/lib/site";
import { images } from "@/lib/images";
import { BOOK_ANCHOR } from "@/lib/nav";

/*
 * The hero. This page is a Google Ads landing page, so the fold has to answer
 * four things before anything else: what we do, what it costs, that we come to
 * your part of town, and how to book. The offer card on the right carries the
 * price and the inclusions rather than a stock photo, because the price is the
 * strongest thing we have to say and no photograph of a pipe outperforms it.
 *
 * Its own band, not a SectionWrapper: the hero owns a bespoke two column layout
 * and the deepest elevation on the page.
 */

const INCLUDED = [
  "The full length of your main line, out to the city main",
  "The full video recording, yours to keep",
  "A live walkthrough of the footage with you",
  "A written summary for your file or your realtor",
  `No destination charge within ${site.pricing.freeRadiusMiles} miles of ${site.pricing.radiusOrigin}`,
];

export function Hero() {
  return (
    <section className="Hero from-p4 to-p5 shadow-theme-xl relative isolate overflow-hidden bg-linear-to-br">
      {/* priority: with a photo set, this is the page's LCP element. */}
      <ImageBackdrop image={images.heroBackground} priority scrim="leftHeavy" />
      <div className="HeroInner section-pad max-w-section-wide relative z-10 mx-auto">
        <div className="HeroGrid grid items-center gap-12 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
          <div className="HeroCopy animate-hero-in-left flex flex-col gap-6">
            {/* The eyebrow carries the towns. It&apos;s the first text in the
                document after the nav, it is real content rather than
                decoration, and it answers "do they come to me" before the
                headline has to. */}
            <p className="HeroEyebrow text-s2 flex items-center gap-3 text-sm font-bold tracking-[0.12em] uppercase">
              <span
                className="HeroEyebrowRule bg-s2 h-px w-8 shrink-0"
                aria-hidden="true"
              />
              Littleton, Highlands Ranch, Centennial, Lone Tree
            </p>

            {/*
              THE H1 CARRIES THE KEYWORD. It used to read "See Exactly What Is
              In Your Sewer Line", which is good copy and completely
              unsearchable: no service term, no location, on the single
              strongest on-page signal there is. The emotional line still leads
              the subhead, where it does the same persuading and costs nothing.
            */}
            {/* The one place the type scale is overridden: a landing page hero is a
                display moment, and text-5xl tops out at ~45px which reads small
                against a full bleed photograph. */}
            <h1 className="HeroTitle text-n0 max-w-[16ch] text-balance text-5xl leading-[1.05] md:text-[3.25rem] lg:text-[4rem]">
              <span className="text-s2">Sewer Scope</span> Inspections in South
              Denver
            </h1>

            <p className="HeroSubtitle text-n3 max-w-text text-base md:text-lg">
              See exactly what&apos;s in your sewer line. We scope the whole
              line while you watch every foot with us on the monitor. Then the
              video is yours to keep, along with a straight answer about what it
              means.
            </p>

            <div className="HeroCtas mt-2 flex flex-wrap items-center gap-4">
              <Button as="a" href={BOOK_ANCHOR}>
                Book Your Inspection
              </Button>
              <Button as="a" href={site.contact.phoneHref} variant="onDark">
                <Phone className="size-5" aria-hidden="true" />
                {site.contact.phoneDisplay}
              </Button>
            </div>

            <p className="HeroReassurance text-n3 text-sm">
              Evening and Saturday appointments, because you shouldn&apos;t have to
              take a day off work to find out what&apos;s under your yard.
            </p>
          </div>

          <div className="HeroOffer bg-n0 shadow-theme-xl flex flex-col gap-6 rounded-2xl p-8 md:p-10">
            <div className="HeroOfferHead flex flex-col gap-3">
              <Badge tone="greenSolid" size="md">
                {site.pricing.promoLabel}
              </Badge>
              <div className="HeroOfferPrice flex items-baseline gap-3">
                <span className="HeroOfferAmount font-heading text-p4 text-5xl font-extrabold tracking-tight">
                  ${site.pricing.scopePromo}
                </span>
                <span className="HeroOfferWas text-g3 text-lg line-through">
                  ${site.pricing.scopeStandard}
                </span>
              </div>
              <h2 className="HeroOfferTitle text-xl">
                Full Sewer Scope Inspection
              </h2>
            </div>

            <ul className="HeroOfferList flex flex-col gap-3">
              {INCLUDED.map((item) => (
                <li
                  key={item}
                  className="HeroOfferItem text-g3 flex items-start gap-3 text-base"
                >
                  <Check
                    className="text-s3 mt-1 size-5 shrink-0"
                    aria-hidden="true"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <Button as="a" href={BOOK_ANCHOR} className="w-full">
              Book Online
            </Button>

            <p className="HeroOfferFinePrint text-g3 text-sm">
              About {site.booking.durationMinutes} minutes on site. We confirm
              the price with you before any work starts.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
