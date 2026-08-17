import type { Metadata } from "next";
import { SectionWrapper } from "@/components/SectionWrapper";
import { SectionHeader } from "@/components/SectionHeader";
import { BulletItem } from "@/components/Bullet";
import { site } from "@/lib/site";

/*
 * Privacy policy. Required in practice: Google Ads expects a landing page that
 * collects personal information to link to one, and the contact form collects
 * a name, phone, and email.
 *
 * >>> NOT LEGAL ADVICE. <<< This is a plain English description of what the
 * site actually does, written to match the code. Have it reviewed before
 * launch, and update it the moment the site starts doing something else with
 * the data (a CRM, an email list, call recording).
 */
export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${site.name} handles the information you send through this website.`,
  robots: { index: true, follow: true },
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <SectionWrapper tone="white" maxWidth="section">
      <div className="PrivacyBody max-w-text flex flex-col gap-8">
        <SectionHeader
          eyebrow="Legal"
          title="Privacy Policy"
          description={`Short version: we use what you send us to get back to you about your sewer line, and nothing else. We do not sell your information, and we do not add you to a mailing list.`}
        />

        <p className="PrivacyUpdated text-g3 text-sm">
          Last updated August 2026.
        </p>

        <section className="PrivacySection flex flex-col gap-4">
          <h2 className="text-2xl">What We Collect</h2>
          <p className="text-g3">
            When you fill in the form on this site, we collect the name, phone
            number, email address, city, service type, and message you type into
            it. If you call or text us, we have your phone number. That is all
            we ask for, and none of it is required to browse the site.
          </p>
          <p className="text-g3">
            Our web host records standard technical information for every
            visitor, such as an IP address, browser type, and which pages were
            requested. This is ordinary server logging and we do not use it to
            identify anyone.
          </p>
        </section>

        <section className="PrivacySection flex flex-col gap-4">
          <h2 className="text-2xl">Why We Collect It</h2>
          <ul className="flex flex-col gap-3">
            <BulletItem>
              To reply to your request and schedule your inspection.
            </BulletItem>
            <BulletItem>
              To confirm whether your address falls inside our no trip charge
              area before you book.
            </BulletItem>
            <BulletItem>
              To send you the video and written summary after an inspection.
            </BulletItem>
            <BulletItem>
              To keep basic records of work we have done, which we are required
              to do as a licensed plumbing business.
            </BulletItem>
          </ul>
        </section>

        <section className="PrivacySection flex flex-col gap-4">
          <h2 className="text-2xl">Who Sees It</h2>
          <p className="text-g3">
            {site.owner.name} and anyone working directly on your job. We use a
            small number of ordinary service providers to run the website and
            the booking calendar, and your information passes through them only
            so they can do that work. We do not sell your information, and we do
            not share it with anyone who wants to market to you.
          </p>
        </section>

        <section className="PrivacySection flex flex-col gap-4">
          <h2 className="text-2xl">Advertising and Analytics</h2>
          <p className="text-g3">
            We advertise on Google. If you arrived here from an ad, the link you
            clicked carried tracking parameters, and those parameters travel with
            you as you move around this page so we can tell which ads bring us
            real customers. Google may also set its own cookies through those
            services, which are governed by Google&apos;s privacy policy rather
            than ours. You can block or clear cookies in your browser settings at
            any time, and the site will still work.
          </p>
        </section>

        <section className="PrivacySection flex flex-col gap-4">
          <h2 className="text-2xl">How Long We Keep It</h2>
          <p className="text-g3">
            Inquiries that do not turn into work are kept for about a year, in
            case you come back. Records of completed jobs are kept as long as we
            are required to keep business records. You can ask us to delete your
            information at any time, and we will unless we are legally required
            to hold it.
          </p>
        </section>

        <section className="PrivacySection flex flex-col gap-4">
          <h2 className="text-2xl">Contact Us About Your Information</h2>
          <p className="text-g3">
            Email{" "}
            <a
              href={`mailto:${site.contact.email}`}
              className="text-s4 hover:text-s5 focus-visible:ring-s4 font-semibold underline underline-offset-4 focus-visible:rounded-xs focus-visible:ring-2 focus-visible:outline-none"
            >
              {site.contact.email}
            </a>{" "}
            or call{" "}
            <a
              href={site.contact.phoneHref}
              className="text-s4 hover:text-s5 focus-visible:ring-s4 font-semibold underline underline-offset-4 focus-visible:rounded-xs focus-visible:ring-2 focus-visible:outline-none"
            >
              {site.contact.phoneDisplay}
            </a>{" "}
            and ask for {site.owner.name}. {site.name} is operated by{" "}
            {site.legalName} in {site.pricing.radiusOrigin}, Colorado.
          </p>
        </section>
      </div>
    </SectionWrapper>
  );
}
