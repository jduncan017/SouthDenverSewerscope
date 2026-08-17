/*
 * ============================================================================
 * SOUTH DENVER SEWERSCOPES — single source of truth for business facts
 * ============================================================================
 * Every phone number, price, city, and hour on the site reads from here. Change
 * a value once and it updates the page copy, the footer, the JSON-LD, and the
 * lead notification email together.
 *
 * >>> PLACEHOLDERS TO REPLACE BEFORE LAUNCH — search for TODO <<<
 * Facts sourced from the discovery call (docs/discoverycall.md, 2026-08-10).
 */

const PHONE_DISPLAY = "(720) 772-8674";
const PHONE_E164 = "+17207728674";

export const site = {
  name: "South Denver Sewerscope",
  shortName: "SDS",
  legalName: "New Day Plumbing and Drain LLC",
  tagline: "Friendly Service at a Fair Price",
  url: "https://southdenversewerscope.com",
  owner: {
    // Spelled Menkel. The discovery call transcript renders it "Manko"; that is
    // an auto-transcription error, and the transcript is left as recorded.
    name: "Frank Menkel",
    role: "Owner and Lead Technician",
    yearsExperience: 15,
  },

  contact: {
    phoneDisplay: PHONE_DISPLAY,
    phoneHref: `tel:${PHONE_E164}`,
    smsHref: `sms:${PHONE_E164}`,
    email: "Frank@SouthDenverSewerscope.com",
  },

  /*
   * Cal.com booking. Set NEXT_PUBLIC_CAL_LINK to the real "user/event" slug
   * (e.g. "south-denver-sewerscope/sewer-scope") once the account exists; the
   * booking section falls back to a call-and-form panel until then, so the page
   * is never broken by a missing integration.
   */
  booking: {
    calLink: process.env.NEXT_PUBLIC_CAL_LINK ?? "",
    eventLabel: "Sewer Scope Inspection",
    durationMinutes: 60,
  },

  /*
   * Availability. The business runs evenings and weekends for now (Frank works
   * days elsewhere), which the site treats as a FEATURE rather than a
   * limitation: those are the hours homeowners are actually home.
   */
  hours: [
    { days: "Monday to Friday", time: "5:00 PM to 9:00 PM" },
    { days: "Saturday", time: "7:00 AM to 7:00 PM" },
    { days: "Sunday", time: "By Appointment" },
  ],
  // Machine-readable form for the LocalBusiness JSON-LD.
  openingHoursSpec: [
    {
      days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "17:00",
      closes: "21:00",
    },
    { days: ["Saturday"], opens: "07:00", closes: "19:00" },
  ],

  /*
   * Pricing. Standard rate is $150 (matches what Frank's current company
   * charges, so it is defensible). The $100 promo is the ad-campaign offer:
   * running it as a limited-time sale rather than the list price keeps the
   * business from being anchored cheap forever.
   */
  pricing: {
    scopeStandard: 150,
    scopePromo: 100,
    // No published destination fee. Frank quotes the further jobs himself, so
    // the site says "destination charges may apply" and never names a number
    // it would then have to honour.
    freeRadiusMiles: 15,
    radiusOrigin: "Littleton",
    // TODO(launch): update the promo window each month it runs, or set to null
    // to hide every promo badge and revert the site to standard pricing.
    promoLabel: "Limited Time Offer",
  },

  /*
   * Service area. No trip charge inside roughly a 15-mile radius of Littleton;
   * everything else in the Denver metro (as far north as Broomfield, as far
   * south as Castle Rock) carries the flat trip charge.
   */
  /*
   * Service area map. NO API KEY AND NO GOOGLE CLOUD ACCOUNT NEEDED for this.
   * The Maps Embed API needs a key; this is the other thing, the share link
   * that maps.google.com hands you from its own UI:
   *
   *   1. Open Google Maps and search "Littleton, CO" (or drag to the view you
   *      want, zoomed out enough to show the metro).
   *   2. Share -> Embed a map -> copy the HTML.
   *   3. Paste JUST the src="..." value between the quotes below. It is a long
   *      https://www.google.com/maps/embed?pb=... URL.
   *
   * Leave it empty and the section renders a placeholder instead.
   */
  mapEmbedUrl:
    "https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d52710.10000545019!2d-105.02112711641713!3d39.60995142919864!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sus!4v1786993028774!5m2!1sen!2sus",

  serviceArea: {
    primary: [
      "Littleton",
      "Highlands Ranch",
      "Centennial",
      "Lone Tree",
      "Lakewood",
      "Englewood",
      "Greenwood Village",
      "Ken Caryl",
      "Columbine",
      "Cherry Hills Village",
      "Sheridan",
      "South Denver",
    ],
    extended: [
      "Parker",
      "Castle Rock",
      "Castle Pines",
      "Aurora",
      "Golden",
      "Morrison",
      "Arvada",
      "Wheat Ridge",
      "Westminster",
      "Broomfield",
    ],
  },

  social: {
    // TODO(launch): add the Google Business Profile URL once verified. This is
    // the single highest-value listing for a local trades business running ads.
    google: "",
  },
} as const;

export type Site = typeof site;

/** "$150" — prices on this site are always whole dollars. */
export function usd(amount: number) {
  return `$${amount}`;
}
