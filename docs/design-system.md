# South Denver Sewerscope Design System

> Ported from `dns-component-library/design-system/design-system.md`. This is the
> binding reference for design work on this site. When a rule here conflicts with
> a quick styling instinct, the rule wins. Implementation lives in
> `src/app/globals.css` (`@theme` tokens + base layer) and `src/fonts/index.ts`.

The whole point of the setup: **a rebrand is two edits (fonts + 24 hexes) and
every component follows automatically.** The moment a component hardcodes a
color, that promise is gone.

---

## 1. Typography

| Role | Font | Weights | Token |
|---|---|---|---|
| Headings (H1 to H6) | **Archivo** | 500 / 600 / 700 / 800 | `font-heading` |
| Body (everything else) | **Inter** | 300 / 400 / 500 / 600 | `font-body` |

Archivo was chosen to match the logo wordmark, a heavy tight grotesque. Inter is
the body font because it is designed for screens; never set body copy in the
display face.

**Two heading roles.** *Display* headings use Archivo (the h1 to h6 base default)
for section and marketing titles. *Functional* headings use Inter via the
`heading-ui` utility for compact, app-like contexts (form section titles). Rule
of thumb: Archivo for the title that sets the tone, Inter where smaller heading
text must stay crisp.

### Rules

- **Headings always use Capital Case** (Title Case: capitalize principal words;
  articles, short prepositions, and conjunctions stay lowercase unless first or
  last).
- **Never use em or en dashes in copy. Ever.** Rephrase with a comma, period,
  colon, or question mark. Applies to all user-facing text including meta
  descriptions. (Code comments are exempt.)
- **Never center-align body text** longer than about two lines. Centering is fine
  for short headlines and taglines.
- **Progressive disclosure:** the most important text is the largest. H1
  dominant, then H2, H3, body. Body copy is the smallest text on the page
  (meta and captions excepted).
- **One H1 per page.** H1 to H2 to H3 in sequence, never skip a level for size
  reasons. Adjust the size, not the hierarchy.
- **Line height:** headings 1.2 · large text (`text-lg` and up) 1.4 · body 1.6.
- **Copy size floor:** real content never goes below `text-base`. `text-sm` is
  for peripheral text only (meta lines, chips, eyebrows, fine print). `text-xs`
  is banned.

### Heading weights — DEPARTURE FROM THE LIBRARY

The library sets H1 and H2 at regular 400, which is correct for Cormorant, a
serif display face. Archivo is a grotesque and this is a trades brand, so the
display levels run bold and the large sizes take negative tracking to stop them
looking airy:

| Level | Size token | Weight | Tracking |
|---|---|---|---|
| h1 | `text-5xl` | 800 | -0.02em |
| h2 | `text-4xl` | 700 | -0.02em |
| h3 | `text-3xl` | 700 | -0.01em |
| h4 | `text-2xl` | 600 | normal |
| h5 | `text-xl` | 600 | normal |
| h6 | `text-lg` | 600 | normal |

Headings default to `p4` (brand navy), not grey. Navy is the logo color and
carrying it into every heading is what makes the page read as one brand.

The `Eyebrow` is `text-sm` here, not the library's `text-lg`. That size was tuned
for a serif; Archivo bold uppercase at `text-lg` competes with the H2 it is meant
to introduce.

### Type scale (responsive golden ratio)

Base size is responsive: **16px mobile · 17px tablet (>=768px) · 18px desktop
(>=1024px)** at normal browser settings, via a `--text-scale` factor on rem-based
tokens. **The root font size is never overridden**, so user font-size preferences
scale type, spacing, and widths together. All sizes are golden ratio quarter
steps. Don't invent ad-hoc sizes.

| Token | Heading | @16px | @17px | @18px |
|---|---|---|---|---|
| `text-sm` | | 14 | ~15 | ~16 |
| `text-base` | body | 16 | 17 | 18 |
| `text-lg` | h6 | 23 | ~24 | ~26 |
| `text-xl` | h5 | 26 | ~28 | ~29 |
| `text-2xl` | h4 | 29 | ~31 | ~33 |
| `text-3xl` | h3 | 33 | ~35 | ~37 |
| `text-4xl` | h2 | 37 | ~39 | ~42 |
| `text-5xl` | h1 | 42 | ~45 | ~47 |

Sizing a heading *down* with a utility (a card `h3` at `text-xl`) is fine; never
skip heading *levels* for size.

**Button Text** — 19px at normal rems (fixed, does not scale), weight 500,
line-height 1.4, loose tracking. Labels in Capital Case, never wrapped. Utility:
`button-text`.

---

## 2. Layout and Spacing

| Constraint | Value | Utility |
|---|---|---|
| Standard section content | 1200px | `max-w-section` |
| Wide sections (nav, footer, bands) | 1400px | `max-w-section-wide` |
| Widest rail (navbar, announcement) | 1800px | `max-w-section-x-wide` |
| Body text / prose | **720px max** | `max-w-text` |

Every section gets a max width. Within a section, paragraphs get their own
`max-w-text`. Use `max-w-text`, **not** Tailwind's `max-w-prose`.

### Section padding

| Breakpoint | Top/Bottom | Left/Right |
|---|---|---|
| Mobile | 64px | 24px |
| Tablet (>=768px) | 80px | 64px |
| Desktop (>=1024px) | 120px | 80px |

`.section-pad` is the standard; `.section-pad-sm` for short transitional bands;
`.section-pad-xl` for flat content sections, which lack a raised band's built-in
separation and so get more air. `SectionWrapper` picks one from `elevation`
unless you override `padding`. More breathing room than feels necessary is
correct.

### Spacing scale — never invent numbers

**1 · 2 · 4 · 8 · 16 · 24 · 32 · 40 · 48 · 64 · 80 · 96 · 120px**, then +40px
increments.

| px | 4 | 8 | 16 | 24 | 32 | 40 | 48 | 64 | 80 | 96 | 120 |
|---|---|---|---|---|---|---|---|---|---|---|---|
| class suffix | `1` | `2` | `4` | `6` | `8` | `10` | `12` | `16` | `20` | `24` | `30` |

Card grids use `gap-6` (24px). Gaps inside a card are `gap-4` (16px).

---

## 3. Color

Tokens in `globals.css` — **never hardcode a hex in a component.**

### The ramps

Convention: **0 = lightest, 5 = darkest.** Need a lighter or darker shade? Use
the solid `0`/`5` token, **never fake one with opacity over an assumed
background** — that only holds where you control what is behind it and breaks
over gradients and tints. Reserve transparency for genuine glass and overlay.

| Ramp | Role | Budget |
|---|---|---|
| `n0`-`n5` | Cool neutrals. `n0`/`n1` white, `n1` is the page background | 60-70% with greys |
| `p0`-`p5` | Navy. Navbar, footer, dark bands, headings. **`p4` is the logo navy** | 20-30% |
| `g0`-`g5` | Greys for text and borders. `g5` is pure black on this brand | with neutrals |
| `s0`-`s5` | Green. **`s3` is the logo green and the protected CTA fill** | 10-15% max |

`n0` and `n1` are both pure white. This is a clean white-page brand rather than a
cream one, so the two lightest neutral steps collapse; `n2` upward carry the
cool grey progression.

### The CTA color is protected — DEPARTURE FROM THE LIBRARY

The library reserves the `p3` fill for calls to action. On this brand the p ramp
is the logo navy and it already carries the navbar, the footer, and every dark
band, so a navy button would be the same color as the chrome around it.

**`s3` (brand green) is the protected CTA fill.** Book, call, submit. Never use a
green fill decoratively. `Button`'s `primary` variant is the only thing that
should paint it, and `navy` exists for the rare second-rank filled action on a
white band. Green as a *text* color (links, prices, the hero accent word) is
fine; the protected use is the filled surface.

### Contrast (WCAG AA, 4.5:1 for body text) — measured, not guessed

On white (`n0`/`n1`):

| Foreground | Ratio | Verdict |
|---|---|---|
| `g5` #000000 | 21:1 | body text, maximum emphasis |
| `p4` #092745 | 15.2:1 | headings, the default |
| `g4` #2e2e2e | 13.6:1 | body text |
| `p3` #1d4a76 | 9.2:1 | body text, links |
| `g3` #565656 | 7.3:1 | secondary/meta text, the body default |
| `s4` #35621d | 7.2:1 | green text needing strict AA |
| `s3` #457e26 | 4.9:1 | green accent text, links, prices |
| `p2` #7e9ab8 | 2.9:1 | never as text on white |
| `g2` #a3a3a3 | 2.5:1 | borders and placeholders only |
| `s2` #a6c888 | 1.9:1 | never as text on white |
| `g1` #d4d4d4 | 1.5:1 | borders only |

On the navy band (`p4`):

| Foreground | Ratio | Verdict |
|---|---|---|
| `n0` white | 15.2:1 | headings on dark |
| `n3` #e9edf1 | 12.9:1 | body text on dark, the default |
| `s2` #a6c888 | 8.1:1 | the hero accent word and light eyebrows |

On the `p3` card inside a navy band (WhyUs value cards):

| Foreground | Ratio | Verdict |
|---|---|---|
| `n0` white | 9.2:1 | card titles |
| `n3` #e9edf1 | 7.8:1 | card body |

The CTA combo, white on `s3`, is **4.9:1** — over the AA threshold for normal
text, and button text is 19px medium anyway.

Don't guess on new combos. Check them.

---

## 4. Components

- **Centralized styles.** Every color and text style comes from the `@theme`
  tokens. One change updates the whole site.
- **Named elements.** Every `className` starts with a PascalCase semantic name
  before the utilities: `className="NavBar flex items-center px-4"`. The names
  carry no styles; they exist so you can tell what you are looking at in the DOM
  inspector and inside long Tailwind strings. **Never attach CSS to them.**
- **One Button.** Every button on the site is a variant of `Button.tsx`. No
  wrapper button components. A modal trigger is `useDisclosure` + `Button` +
  `Modal` composed at the call site.
- **Card surface.** `CardWrapper` (gradient card) and `cardSurface` in
  `shared-styles.ts` (flat white content card) are the two card treatments.
  Reach for one instead of hand-rolling a bordered, shadowed box.
- **Shadows — exactly three elevation steps**, all 25% black, rem-based:
  - `shadow-theme-sm` (2px 2px 4px) — buttons, except the navbar CTA, which sits
    in an already-shadowed bar and takes the `flat` prop
  - `shadow-theme` (4px 4px 8px) — cards, images, the nav bar
  - `shadow-theme-xl` (8px 8px 16px) — the hero and every other section after it
    (alternating; sections in between stay flat)
- **Interactive states — all three, every time:**
  - `hover:` — it is clickable
  - `active:` — the press registered
  - `focus-visible:` — **never skipped.** Standard ring
    `focus-visible:ring-2 focus-visible:ring-s4 focus-visible:ring-offset-2`;
    on navy bands use `ring-n0` with `ring-offset-p4` so it stays legible
- **Button spec:** Button Text type · 24px x / 12px y padding · pill radius ·
  300ms transition on every variant.

### Section bands

`SectionWrapper` owns background and elevation so section *content* stays
band-agnostic and the page decides the treatment. Tones: `white`, `neutral`,
`green`, `navy`, `navyDeep`. Tone gradients follow the lighting rule (lighter
top-left to darker bottom-right).

---

## 5. Images and Performance

- **WebP** for raster images.
- **Export at display size.** `next/image` with correct `sizes` handles
  responsive variants; still start from a sanely-sized source.
- **Lazy load below the fold** (the `next/image` default). Only the LCP image
  gets `priority`.
- Unshot photo positions use `<PhotoSlot>`, whose `brief` prop names the shot
  needed. It swaps to a real `next/image` by adding `src`.

---

## The Short Version

1. Left-align body text. Headings in Capital Case. No em or en dashes, ever.
2. Sections max 1200px (1400px wide variant); body text max 720px.
3. Inter for body; Archivo for headings, and headings run bold on this brand.
4. Two hues plus neutrals. **A green fill means "do something here"** and nothing
   else.
5. Check contrast against the tables above. Don't guess.
6. Generous section padding (64/80/120). More than feels needed.
7. Spacing only from the scale: 1·2·4·8·16·24·32·40·48·64·80·96·120.
8. WebP, display-sized, lazy-loaded images.
9. Never hardcode a color in a component. The audit in `README.md` should print
   nothing but the two documented Cal.com hexes.
