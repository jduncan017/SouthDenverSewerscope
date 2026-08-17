import { JsonLd } from "@/components/JsonLd";
import { Hero } from "@/components/sections/Hero";
import { TrustBar } from "@/components/sections/TrustBar";
import { Services } from "@/components/sections/Services";
import { WhyUs } from "@/components/sections/WhyUs";
import { Pricing } from "@/components/sections/Pricing";
import { ServiceArea } from "@/components/sections/ServiceArea";
import { About } from "@/components/sections/About";
import { FaqSection } from "@/components/sections/FaqSection";
import { GetInTouch } from "@/components/sections/GetInTouch";
import { FinalCta } from "@/components/sections/FinalCta";
import { faqSchema, localBusinessSchema, websiteSchema } from "@/lib/schema";

/*
 * The landing page. Ordered as a single argument rather than a menu of
 * sections: what it is (hero) -> why believe you (trust, services, process) ->
 * why you and not the other guy (why us) -> what it costs (pricing) -> do you
 * come to me (area) -> who are you (about) -> what am I still unsure about
 * (faq) -> get in touch -> last nudge.
 *
 * There is no separate How It Works band. Three of its four steps restated the
 * hero checklist almost word for word, and the How We Work section makes the
 * same points with more force and a photograph beside them, so the nav item now
 * points there.
 *
 * Bands alternate flat and raised down the page so no two elevated sections sit
 * against each other.
 */
export default function Home() {
  return (
    <>
      <JsonLd data={localBusinessSchema()} />
      <JsonLd data={websiteSchema()} />
      <JsonLd data={faqSchema()} />

      <Hero />
      <TrustBar />
      <Services />
      <WhyUs />
      <Pricing />
      <ServiceArea />
      <About />
      <FaqSection />
      <GetInTouch />
      <FinalCta />
    </>
  );
}
