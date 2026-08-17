import { Quote } from "lucide-react";
import { SectionWrapper } from "@/components/SectionWrapper";
import { SectionHeader } from "@/components/SectionHeader";
import { PhotoSlot } from "@/components/PhotoSlot";
import { Button } from "@/components/Button";
import { BulletItem } from "@/components/Bullet";
import { site } from "@/lib/site";
import { images } from "@/lib/images";
import { BOOK_ANCHOR } from "@/lib/nav";

/*
 * The owner section. A two person operation cannot compete with the big shops
 * on fleet size or ad spend, so it competes on the thing they structurally
 * cannot offer: the person who answers the phone is the person who does the
 * work, every time. Naming him and putting his face on the page is the
 * cheapest trust we will ever buy.
 */
export function About() {
  return (
    <SectionWrapper tone="white">
      <div className="AboutGrid grid items-center gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
        <PhotoSlot
          ratio="tall"
          src={images.ownerPortrait.src || undefined}
          alt={images.ownerPortrait.alt}
          brief={images.ownerPortrait.brief}
          className="AboutPhoto"
        />

        <div className="AboutCopy flex flex-col gap-8">
          <SectionHeader
            eyebrow="Who You Are Calling"
            title={`Meet ${site.owner.name}`}
            description={`${site.owner.yearsExperience} years running camera and clearing lines across the Denver metro. ${site.owner.name.split(" ")[0]} started ${site.name} with his brother James so he could do the work the way he always thought it should be done: show people what's actually there, explain it plainly, and let them decide.`}
          />

          <ul className="AboutPoints flex flex-col gap-3">
            <BulletItem>
              Every inspection is run by {site.owner.name} personally. No
              dispatcher, no rotating crew, and nobody who has to hit a sales
              number that day.
            </BulletItem>
            <BulletItem>
              Our work comes from referrals and from realtors who send us every
              client. That only happens if you&apos;re straight with people the
              first time.
            </BulletItem>
          </ul>

          <blockquote className="AboutQuote border-s3 bg-s0 rounded-2xl border-l-4 p-6 md:p-8">
            <Quote className="AboutQuoteMark text-s3 size-6" aria-hidden="true" />
            <p className="AboutQuoteText text-p4 mt-3 text-lg font-medium text-balance">
              I treat every house like it belongs to someone in my family.
              That means showing you what&apos;s really down there and telling you
              the truth about it, even when the truth is that you don&apos;t need
              me.
            </p>
            <footer className="AboutQuoteAttribution text-g3 mt-4 text-sm">
              {site.owner.name}, {site.owner.role}
            </footer>
          </blockquote>

          <div className="AboutActions">
            <Button as="a" href={BOOK_ANCHOR}>
              Book With Frank
            </Button>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
