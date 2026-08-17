import { Phone } from "lucide-react";
import { SectionWrapper } from "@/components/SectionWrapper";
import { Button } from "@/components/Button";
import { site } from "@/lib/site";

export default function NotFound() {
  return (
    <SectionWrapper tone="white" maxWidth="section">
      <div className="NotFoundPanel max-w-text flex flex-col items-start gap-6">
        <p className="NotFoundCode font-heading text-n5 text-5xl font-extrabold">
          404
        </p>
        <h1 className="NotFoundTitle text-balance">
          That Page Went Down the Drain
        </h1>
        <p className="NotFoundBody text-g3">
          The link you followed doesn&apos;t exist. Everything about our sewer
          inspections, our pricing, and our service area is on the home page, or
          you can just call and ask.
        </p>
        <div className="NotFoundActions flex flex-wrap gap-4">
          <Button as="link" href="/">
            Back to the Home Page
          </Button>
          <Button as="a" href={site.contact.phoneHref} variant="secondary">
            <Phone className="size-5" aria-hidden="true" />
            {site.contact.phoneDisplay}
          </Button>
        </div>
      </div>
    </SectionWrapper>
  );
}
