import { ArrowRight } from "lucide-react";
import { SectionWrapper } from "@/components/SectionWrapper";
import { SectionHeader } from "@/components/SectionHeader";
import { IconBubble } from "@/components/IconBubble";
import { Button } from "@/components/Button";
import { FadeIn } from "@/components/FadeIn";
import { primaryService, otherServices } from "@/lib/content";
import { BOOK_ANCHOR } from "@/lib/nav";

/*
 * What we do, split left and right: the headline service on one side, the rest
 * of the trade on the other.
 *
 * NO PRICE AND NO INCLUSIONS LIST HERE. Both used to live in three places at
 * once (hero card, this section, pricing section), which meant a visitor read
 * the same five bullets and the same $100 three times before reaching the
 * booking form. Each section now has one job: this one says what we do, the
 * pricing section says what it costs, and the hero says both because it is the
 * fold and has to.
 */
export function Services() {
  const Icon = primaryService.icon;

  return (
    <SectionWrapper id="services" tone="white">
      <SectionHeader
        eyebrow="What We Do"
        title="Sewer Work, Done Straight"
        description="Everything starts with the camera. We'd rather show you the inside of your line and let you decide what to do about it."
        align="center"
      />

      {/* items-start, not stretch: the other-services list is naturally taller,
          and stretching the scope card to match left a wide band of empty white
          between its blurb and its button. */}
      <div className="ServicesGrid mt-16 grid items-start gap-8 lg:grid-cols-[1.15fr_1fr] lg:gap-12">
        <FadeIn>
          <article className="PrimaryService border-s3 bg-n0 shadow-theme-xl flex flex-col gap-5 rounded-2xl border-2 p-8 md:p-10">
            <IconBubble icon={Icon} size="lg" tone="solid" />
            <h3 className="PrimaryServiceTitle text-2xl text-balance">
              {primaryService.title}
            </h3>
            <p className="PrimaryServiceBlurb text-g3 text-lg">
              {primaryService.blurb}
            </p>
            <div className="PrimaryServiceActions pt-2">
              <Button as="a" href={BOOK_ANCHOR}>
                Book an Inspection
                <ArrowRight className="size-5" aria-hidden="true" />
              </Button>
            </div>
          </article>
        </FadeIn>

        <FadeIn delay={120}>
          <div className="OtherServices border-n4 bg-n2 flex flex-col gap-5 rounded-2xl border p-8 md:p-10">
            <h3 className="OtherServicesTitle text-xl">
              Other Services We Offer
            </h3>
            <ul className="OtherServicesList flex flex-col gap-5">
              {otherServices.map((service) => (
                <li
                  key={service.title}
                  className="OtherService flex items-start gap-3"
                >
                  <IconBubble icon={service.icon} size="sm" tone="navy" />
                  <div className="OtherServiceBody flex flex-col gap-0.5">
                    <h4 className="OtherServiceTitle text-p4 text-base font-semibold">
                      {service.title}
                    </h4>
                    <p className="OtherServiceBlurb text-g3 text-base">
                      {service.blurb}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </FadeIn>
      </div>
    </SectionWrapper>
  );
}
