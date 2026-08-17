import Image from "next/image";
import Link from "next/link";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { site } from "@/lib/site";
import { navLinks } from "@/lib/nav";
// The full list, not just the three bookable ones: the footer is where the
// long tail of service names stays crawlable without cluttering the page.
import { allServices } from "@/lib/content";

/*
 * Site footer. On a one page site the footer is where the local SEO signals
 * live: the full service area list, the hours, and a real phone number and
 * email as text rather than an image. Navy band, white logo, four columns
 * collapsing to one on mobile.
 */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="SiteFooter bg-p4 text-n3">
      <div className="FooterInner max-w-section-wide mx-auto grid gap-12 px-6 py-16 md:grid-cols-2 md:px-16 lg:grid-cols-4 lg:px-20">
        <div className="FooterBrand flex flex-col gap-5">
          <Image
            src="/Logos/SVG/Logo-White.svg"
            alt={site.name}
            width={671}
            height={195}
            className="h-11 w-auto"
          />
          <p className="FooterBlurb max-w-text text-sm">
            Straight answers about your sewer line, from a South Denver plumber
            with {site.owner.yearsExperience} years in the trade. No fear
            tactics, no high pressure sales, no surprises on the invoice.
          </p>
          <div className="FooterContact flex flex-col gap-2 text-sm">
            <a
              href={site.contact.phoneHref}
              className="FooterPhone text-n0 hover:text-s2 focus-visible:ring-n0 inline-flex items-center gap-2 font-semibold transition-colors duration-300 focus-visible:rounded-xs focus-visible:ring-2 focus-visible:outline-none"
            >
              <Phone className="size-4 shrink-0" aria-hidden="true" />
              {site.contact.phoneDisplay}
            </a>
            <a
              href={`mailto:${site.contact.email}`}
              className="FooterEmail hover:text-s2 focus-visible:ring-n0 inline-flex items-center gap-2 transition-colors duration-300 focus-visible:rounded-xs focus-visible:ring-2 focus-visible:outline-none"
            >
              <Mail className="size-4 shrink-0" aria-hidden="true" />
              {site.contact.email}
            </a>
            <p className="FooterBase inline-flex items-center gap-2">
              <MapPin className="size-4 shrink-0" aria-hidden="true" />
              Based in {site.pricing.radiusOrigin}, Colorado
            </p>
          </div>
        </div>

        <div className="FooterServices flex flex-col gap-4">
          <h3 className="FooterHeading text-n0 text-sm font-bold tracking-[0.12em] uppercase">
            Services
          </h3>
          <ul className="FooterList flex flex-col gap-2">
            {allServices.map((service) => (
              <li key={service.title}>
                <a
                  href="#services"
                  className="FooterLink hover:text-s2 focus-visible:ring-n0 text-sm transition-colors duration-300 focus-visible:rounded-xs focus-visible:ring-2 focus-visible:outline-none"
                >
                  {service.title}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="FooterAreas flex flex-col gap-4">
          <h3 className="FooterHeading text-n0 text-sm font-bold tracking-[0.12em] uppercase">
            Service Area
          </h3>
          <p className="FooterAreaList text-sm">
            {site.serviceArea.primary.join(", ")},{" "}
            {site.serviceArea.extended.join(", ")}, and the surrounding Denver
            metro.
          </p>
          <p className="FooterAreaNote text-n2 text-sm">
            No destination charge within {site.pricing.freeRadiusMiles} miles of{" "}
            {site.pricing.radiusOrigin}.
          </p>
        </div>

        <div className="FooterHours flex flex-col gap-4">
          <h3 className="FooterHeading text-n0 text-sm font-bold tracking-[0.12em] uppercase">
            Hours
          </h3>
          <ul className="FooterHoursList flex flex-col gap-2">
            {site.hours.map(({ days, time }) => (
              <li
                key={days}
                className="FooterHoursItem flex items-start gap-2 text-sm"
              >
                <Clock className="mt-1 size-4 shrink-0" aria-hidden="true" />
                <span>
                  <span className="text-n0 block font-semibold">{days}</span>
                  {time}
                </span>
              </li>
            ))}
          </ul>
          <nav aria-label="Footer" className="FooterNav mt-2">
            <ul className="FooterNavList flex flex-wrap gap-x-4 gap-y-2">
              {navLinks.map(({ label, href }) => (
                <li key={href}>
                  <a
                    href={href}
                    className="FooterLink hover:text-s2 focus-visible:ring-n0 text-sm transition-colors duration-300 focus-visible:rounded-xs focus-visible:ring-2 focus-visible:outline-none"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      <div className="FooterBar border-p3 border-t">
        <div className="FooterBarInner max-w-section-wide mx-auto flex flex-col gap-3 px-6 py-6 text-sm md:flex-row md:items-center md:justify-between md:px-16 lg:px-20">
          <p className="FooterCopyright">
            &copy; {year} {site.name}. Operated by {site.legalName}. Licensed and
            insured in Colorado.
          </p>
          <Link
            href="/privacy"
            className="FooterPrivacy hover:text-s2 focus-visible:ring-n0 transition-colors duration-300 focus-visible:rounded-xs focus-visible:ring-2 focus-visible:outline-none"
          >
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  );
}
