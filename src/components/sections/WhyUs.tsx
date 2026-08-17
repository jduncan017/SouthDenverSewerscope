import { SectionWrapper } from "@/components/SectionWrapper";
import { SectionHeader } from "@/components/SectionHeader";
import { ImageAccordion } from "@/components/ImageAccordion";
import { values } from "@/lib/content";
import { images } from "@/lib/images";

/*
 * The differentiator band, and the most important section on the page after the
 * hero.
 *
 * The heading carries "sewer inspection" because this is the one section on the
 * page whose H2 was pure attitude. "We Are Not Car Salesmen" was memorable and
 * completely unsearchable: no keyword, no service, no location, and it framed
 * the whole section as a rebuttal to an accusation nobody made. The current
 * heading claims the same ground positively and is something a person actually
 * types into Google.
 *
 * Photo plus expandable rows rather than six cards: it puts a face and a job
 * site next to the promises, which is the whole point of the section, and it
 * lets each standard carry real detail without dumping six paragraphs on
 * someone who is scanning.
 */
export function WhyUs() {
  return (
    <SectionWrapper
      id="how-it-works"
      tone="navyDeep"
      elevation="raised"
      maxWidth="wide"
    >
      <SectionHeader
        eyebrow="How We Work"
        title="What an Honest Sewer Inspection Looks Like"
        description="An inspection is only worth what you can trust about it. Here are five things we do on every job, and every one of them is something you can hold us to."
        onDark
      />
      <div className="WhyUsBody mt-16">
        <ImageAccordion
          onDark
          image={images.monitorWalkthrough.src || undefined}
          alt={images.monitorWalkthrough.alt}
          brief={images.monitorWalkthrough.brief}
          items={values}
        />
      </div>
    </SectionWrapper>
  );
}
