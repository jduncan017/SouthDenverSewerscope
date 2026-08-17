/*
 * The page IA. This is a one page site, so every nav target is an in-page
 * anchor and the ids here must match the `id` prop on the matching
 * SectionWrapper. Kept in one place so the navbar, the mobile menu, and the
 * footer can never drift out of sync with each other or with the page.
 */
export const navLinks = [
  { label: "Services", href: "#services" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Pricing", href: "#pricing" },
  { label: "Service Area", href: "#areas" },
  { label: "FAQ", href: "#faq" },
] as const;

/*
 * Booking and contact are one section with two tabs. BOOK_ANCHOR lands on the
 * section; CONTACT_ANCHOR targets the message tab by id, which both scrolls
 * there and opens that tab (see Tabs, where the hash drives selection). Keep
 * these in step with the tab ids in GetInTouch.
 */
export const BOOK_ANCHOR = "#book";
export const CONTACT_ANCHOR = "#contact";
