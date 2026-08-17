import { site } from "@/lib/site";
import { faqs, allServices } from "@/lib/content";
import { images } from "@/lib/images";

/*
 * Structured data. For a local trades business this is not a nice to have: the
 * Plumber/LocalBusiness node is what feeds the map pack and the knowledge
 * panel, and the FAQPage node is what can win extra vertical space on a results
 * page against competitors who did not bother.
 *
 * Everything reads from site.ts and content.ts, so the markup can never claim
 * an hour, a price, or an answer that differs from what is rendered on screen.
 */

const BUSINESS_ID = `${site.url}/#business`;

export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Plumber",
    "@id": BUSINESS_ID,
    name: site.name,
    legalName: site.legalName,
    description: `Sewer camera inspections for South Denver homeowners, buyers, and realtors. ${site.tagline}.`,
    url: site.url,
    logo: `${site.url}/Logos/PNG/Logo.png`,
    // A real photograph, not the logo. Google uses `image` for the rich result
    // thumbnail and a logo on white makes a poor one.
    image: [`${site.url}${images.heroBackground.src}`],
    telephone: site.contact.phoneDisplay,
    email: site.contact.email,
    priceRange: "$$",
    currenciesAccepted: "USD",
    paymentAccepted: "Cash, Check, Credit Card",
    // A service area business: we travel to the customer, so there is no
    // storefront street address to publish.
    address: {
      "@type": "PostalAddress",
      addressLocality: site.pricing.radiusOrigin,
      addressRegion: "CO",
      addressCountry: "US",
    },
    // Coordinates for Littleton, CO. A service area business still wants these:
    // they are what lets Google place the business on a map and judge proximity
    // for "near me" queries when there is no street address to geocode.
    geo: {
      "@type": "GeoCoordinates",
      latitude: 39.6133,
      longitude: -105.0166,
    },
    serviceArea: {
      "@type": "GeoCircle",
      geoMidpoint: {
        "@type": "GeoCoordinates",
        latitude: 39.6133,
        longitude: -105.0166,
      },
      geoRadius: String(site.pricing.freeRadiusMiles * 1609),
    },
    ...(site.mapEmbedUrl ? { hasMap: site.mapEmbedUrl } : {}),
    ...(site.social.google ? { sameAs: [site.social.google] } : {}),
    areaServed: [...site.serviceArea.primary, ...site.serviceArea.extended].map(
      (name) => ({ "@type": "City", name, containedInPlace: "Colorado, US" }),
    ),
    openingHoursSpecification: site.openingHoursSpec.map((spec) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: spec.days,
      opens: spec.opens,
      closes: spec.closes,
    })),
    founder: {
      "@type": "Person",
      name: site.owner.name,
      jobTitle: site.owner.role,
    },
    makesOffer: allServices.map((service) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: service.title,
        description: service.blurb,
      },
    })),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Sewer Inspection Services",
      itemListElement: [
        {
          "@type": "Offer",
          name: "Sewer Scope Inspection",
          price: String(site.pricing.scopePromo),
          priceCurrency: "USD",
          description: `Full main line camera inspection, normally $${site.pricing.scopeStandard}.`,
        },
      ],
    },
  };
}

export function faqSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: { "@type": "Answer", text: faq.a },
    })),
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${site.url}/#website`,
    url: site.url,
    name: site.name,
    publisher: { "@id": BUSINESS_ID },
  };
}
