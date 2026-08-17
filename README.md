# South Denver Sewerscopes

Single page marketing site for a South Denver sewer camera inspection business,
built to run as a Google Ads landing page. Next.js 16 (App Router, Turbopack) +
Tailwind v4, built from the DigitalNova component library.

```bash
npm run dev     # http://localhost:3000
npm run build
npm run lint
```

## Before Launch

Everything below is a real blocker. The site renders and builds without any of
it, which is deliberate (nothing is broken while you wait on the client), but a
campaign should not go live until these are done.

| What | Where | Why it blocks |
|---|---|---|
| **Real phone number** | `src/lib/site.ts`, `PHONE_DISPLAY` / `PHONE_E164` | Currently `(720) 555-0199`, a reserved fictional number. It appears in the navbar, hero, footer, forms, and the LocalBusiness schema. |
| **Lead email delivery** | `.env.local`: `RESEND_API_KEY`, `LEAD_FROM_EMAIL` | Without it the form returns success but the lead is only written to the server log with a `[LEAD:UNDELIVERED]` marker. Paid leads would be recoverable but easily missed. |
| **Cal.com link** | `.env.local`: `NEXT_PUBLIC_CAL_LINK` | The booking section falls back to a call-or-message panel until this is set. |
| **Domain** | `src/lib/site.ts`, `url` | Feeds canonical URLs, sitemap, OG tags, and JSON-LD. |
| **Mailbox** | `src/lib/site.ts`, `contact.email` | `info@southdenversewerscopes.com` does not exist yet. |
| **Privacy policy review** | `src/app/privacy/page.tsx` | Written to describe what the code actually does, but it is not legal advice. |
| **Verify the licensed and insured claim** | `src/lib/content.ts`, footer, privacy page | Stated as fact in several places. Confirm the Colorado license is current under New Day Plumbing and Drain LLC. |

Optional but high value:

- The service area map. Set `mapEmbedUrl` in `src/lib/site.ts` to a Google Maps
  share embed URL. **No API key and no Google Cloud account**: open Google Maps,
  Share, "Embed a map", and copy the `src` out of the HTML it gives you.
- Photography. **`src/lib/images.ts` is the shot list and the only file you edit
  to add a photo**: drop the file anywhere under `public/`, put the path in
  `src`, write the `alt`. Every entry has a `brief` describing the shot needed, which
  is what renders in the placeholder until the photo lands, so the site is never
  half broken while you work through them one at a time.

  The highest value shot by far is Frank and a homeowner at the camera monitor
  (`monitorWalkthrough`). That whole "How We Work" section argues you get to
  watch the footage; a photo of exactly that is the proof.

  The two full bleed backgrounds sit under a heavy navy scrim. It defaults to
  `strong`, which is safe behind any photo. Once a real photo is in, you can try
  `scrim="medium"` on that section for more of the image, but only if the photo
  is mid tone or darker: see the contrast note in `ImageBackdrop.tsx`.
- A verified Google Business Profile, then set `site.social.google`. For a local
  trades business this outranks almost everything else on this list.

## How It Is Put Together

```
src/
  app/
    page.tsx          the landing page: section order and JSON-LD
    layout.tsx        fonts, metadata, navbar/footer/mobile CTA shell
    globals.css       the design system (24 brand hexes + structural tokens)
    api/lead/route.ts contact form intake
    privacy/          required for Google Ads
    opengraph-image.tsx, sitemap.ts, robots.ts
  components/         primitives cloned from dns-component-library
    sections/         one file per band on the page
  lib/
    site.ts           every business fact: phone, prices, hours, service area
    content.ts        services, process, values, FAQs (reused by JSON-LD)
    schema.ts         LocalBusiness / FAQPage / WebSite structured data
    nav.ts            the anchor IA
  fonts/              Archivo (headings) + Inter (body)
```

`site.ts` and `content.ts` are the two files to edit for a copy or pricing
change. Nothing else hardcodes a price, an hour, or a city.

## Design System

Cloned from `dns-component-library` (see its `HOW-TO-USE.md`). The two per-client
values are the fonts in `src/fonts/index.ts` and the 24 palette hexes in
`globals.css`. The binding rules are in `docs/design-system.md`.

Brand anchors from the logo: navy `#092745` (`p4`) and green `#457E26` (`s3`).

Two documented departures from the library defaults, both in
`docs/design-system.md`:

1. **Headings run bold.** The library's weights are tuned for a serif display
   face; Archivo is a grotesque and this is a trades brand.
2. **The protected CTA fill is green, not the primary ramp.** Navy carries the
   navbar, the footer, and every dark band, so a navy button would be the same
   color as the chrome around it. See the comment at the top of `Button.tsx`.

Before shipping a change, this should print nothing but the two documented
Cal.com hexes (they configure a cross origin iframe, which CSS cannot reach):

```bash
grep -rnE "#[0-9a-fA-F]{3,8}\b" src/components
grep -rhoE '\b(bg|text|border|ring|from|to)-(blue|green|indigo|slate|zinc|gray|neutral)-[0-9]{2,3}\b' src/
```

## Ads Notes

- UTM and `gclid` parameters are captured on first load by `QueryParamProvider`
  and appended to internal navigation, so attribution survives a click into the
  privacy page and back. They are also submitted with every lead as `source`.
- The mobile sticky bar (`MobileCtaBar`) is the primary conversion path on
  phones. Treat it as load bearing.
- The `$100` promo is a limited time offer everywhere it appears, driven by
  `site.pricing.scopePromo` and `promoLabel`. Ending the promo means changing
  those two values, not hunting through copy.
# SouthDenverSewerscope
