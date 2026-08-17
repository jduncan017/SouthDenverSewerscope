import { Check, Phone } from "lucide-react";
import { SectionWrapper } from "@/components/SectionWrapper";
import { SectionHeader } from "@/components/SectionHeader";
import { Badge } from "@/components/Badge";
import { Button } from "@/components/Button";
import { FadeIn } from "@/components/FadeIn";
import { otherServices } from "@/lib/content";
import { site } from "@/lib/site";
import { BOOK_ANCHOR, CONTACT_ANCHOR } from "@/lib/nav";

/*
 * One price, stated plainly, and everything else pointed at a conversation.
 *
 * Three priced tiers made this read as a menu and asked a cold visitor to
 * choose between things they cannot tell apart yet. The scope is the only
 * service we can honestly price sight unseen, so it is the only one with a
 * number on it, and the card spends its space on what that number buys.
 */

const INCLUDES = [
  "The entire main line, out to where it meets the city main",
  "Full video recording, yours to keep",
  "A live walkthrough of the footage on the monitor",
  "A written summary for your file or your realtor",
  "A firm price before we start, and no surprises after",
];

export function Pricing() {
  return (
    <SectionWrapper id="pricing" tone="white">
      <SectionHeader
        eyebrow="Pricing"
        title="Sewer Scope Inspection Cost"
        description="If a company will not tell you what something costs until a technician is standing in your driveway, there is usually a reason. Here is ours, in public."
        align="center"
      />

      <div className="PricingBody mx-auto mt-16 grid max-w-5xl items-start gap-6 lg:grid-cols-[1.4fr_1fr]">
        <FadeIn className="h-full">
          <article className="PricingMain border-s3 bg-n0 shadow-theme-xl relative flex h-full flex-col gap-6 rounded-2xl border-2 p-8 md:p-10">
            <Badge
              tone="greenSolid"
              size="sm"
              className="PricingBadge absolute -top-3 left-8"
            >
              {site.pricing.promoLabel}
            </Badge>

            <div className="PricingMainHead flex flex-col gap-3">
              <h3 className="PricingMainName text-2xl">
                Sewer Scope Inspection
              </h3>
              <div className="PricingMainPrice flex items-baseline gap-3">
                <span className="PricingMainWas text-g3 text-2xl line-through">
                  ${site.pricing.scopeStandard}
                </span>
                <span className="PricingMainNow font-heading text-p4 text-5xl font-extrabold tracking-tight">
                  ${site.pricing.scopePromo}
                </span>
              </div>
              <p className="PricingMainCadence text-g3 text-base">
                Flat rate for a standard residential main line.
              </p>
            </div>

            <ul className="PricingMainList flex flex-col gap-3">
              {INCLUDES.map((item) => (
                <li
                  key={item}
                  className="PricingMainItem text-g3 flex items-start gap-3"
                >
                  <Check
                    className="text-s3 mt-1 size-5 shrink-0"
                    aria-hidden="true"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="PricingMainActions mt-auto pt-2">
              <Button as="a" href={BOOK_ANCHOR} className="w-full">
                Book an Inspection
              </Button>
            </div>
          </article>
        </FadeIn>

        <FadeIn delay={120} className="h-full">
          <article className="PricingOther border-n4 bg-n2 flex h-full flex-col gap-5 rounded-2xl border p-8">
            <h3 className="PricingOtherName text-xl">Everything Else</h3>
            <p className="PricingOtherBody text-g3">
              Drain cleaning, locating, and repair work all depend on what the
              line is actually doing, so we quote them once we have looked
              rather than guessing at a number now.
            </p>
            <ul className="PricingOtherList flex flex-col gap-2">
              {otherServices.map((service) => (
                <li
                  key={service.title}
                  className="PricingOtherItem text-g3 text-base"
                >
                  {service.title}
                </li>
              ))}
            </ul>
            <div className="PricingOtherActions mt-auto pt-2 flex flex-col gap-3">
              <Button as="a" href={CONTACT_ANCHOR} variant="secondary" className="w-full">
                Contact Us for Pricing
              </Button>
              <Button
                as="a"
                href={site.contact.phoneHref}
                variant="ghost"
                className="w-full"
              >
                <Phone className="size-5" aria-hidden="true" />
                {site.contact.phoneDisplay}
              </Button>
            </div>
          </article>
        </FadeIn>
      </div>

      <p className="PricingFootnote text-g3 mx-auto mt-8 max-w-5xl text-sm">
        *Destination charges may apply to locations more than{" "}
        {site.pricing.freeRadiusMiles} miles from {site.pricing.radiusOrigin},
        CO.
      </p>
    </SectionWrapper>
  );
}
