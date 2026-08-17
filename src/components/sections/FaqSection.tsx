import { SectionWrapper } from "@/components/SectionWrapper";
import { SectionHeader } from "@/components/SectionHeader";
import { FaqAccordion } from "@/components/FaqAccordion";
import { faqs } from "@/lib/content";
import { site } from "@/lib/site";
import { CONTACT_ANCHOR } from "@/lib/nav";

/*
 * FAQ. The same entries feed the FAQPage structured data in page.tsx, so the
 * answer Google shows is always word for word the answer on the page.
 */
export function FaqSection() {
  return (
    <SectionWrapper id="faq" tone="neutral" elevation="raised">
      <SectionHeader
        eyebrow="Questions"
        title="Sewer Scope Questions, Answered"
        description="If yours isn't here, call and ask. We'd rather answer it now than have you find out on the day."
      />
      <div className="FaqBody mx-auto mt-16 max-w-4xl">
        <FaqAccordion items={faqs} />
        <p className="FaqFooter text-g3 mt-8">
          Still deciding?{" "}
          <a
            href={site.contact.phoneHref}
            className="FaqFooterPhone text-s4 hover:text-s5 focus-visible:ring-s4 font-semibold underline underline-offset-4 focus-visible:rounded-xs focus-visible:ring-2 focus-visible:outline-none"
          >
            Call {site.contact.phoneDisplay}
          </a>{" "}
          or{" "}
          <a
            href={CONTACT_ANCHOR}
            className="FaqFooterLink text-s4 hover:text-s5 focus-visible:ring-s4 font-semibold underline underline-offset-4 focus-visible:rounded-xs focus-visible:ring-2 focus-visible:outline-none"
          >
            send us a message
          </a>
          .
        </p>
      </div>
    </SectionWrapper>
  );
}
