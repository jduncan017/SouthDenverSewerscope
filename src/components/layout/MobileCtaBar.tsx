"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { CalendarCheck, Phone } from "lucide-react";
import { site } from "@/lib/site";
import { BOOK_ANCHOR } from "@/lib/nav";

/*
 * Fixed bottom action bar, phones only (hidden from md up, where the navbar
 * already shows the phone number and the booking button). Most of this site's
 * traffic arrives from a phone tapping a Google ad, and on that device the two
 * things that convert are a dial button and a booking link.
 *
 * IT STAYS HIDDEN UNTIL THE HERO IS SCROLLED PAST. On a 390px screen the navbar
 * CTA, the two hero buttons and this bar put five calls to action on screen at
 * once, three of which said "Book Online". The hero's own buttons are the
 * contextual pair: they sit directly under the pitch, at the moment somebody is
 * actually persuaded. This bar exists to catch the visitor who is deep in the
 * page, has decided, and is nowhere near a button. Above the fold it is pure
 * duplication, so it waits.
 *
 * It watches the hero element rather than a fixed scroll offset, so it tracks
 * the real layout at any viewport height. Only the home page has a hero, so the
 * deferral is keyed off the route: everywhere else (privacy, 404) the bar shows
 * immediately, which is also the safe default.
 *
 * The layout reserves matching bottom padding on <body> so this bar can never
 * sit on top of the footer's last line.
 */
export function MobileCtaBar() {
  const pathname = usePathname();
  const defersToHero = pathname === "/";
  const [heroPassed, setHeroPassed] = useState(false);
  const shown = !defersToHero || heroPassed;

  useEffect(() => {
    if (!defersToHero) return;
    const hero = document.querySelector(".Hero");
    if (!hero) return;
    const observer = new IntersectionObserver(
      ([entry]) => setHeroPassed(!entry?.isIntersecting),
      { threshold: 0 },
    );
    observer.observe(hero);
    return () => observer.disconnect();
  }, [defersToHero]);

  return (
    <div
      /* Out of tab order and off the accessibility tree while it is off screen,
         so a keyboard user never lands on a button they cannot see. */
      inert={!shown}
      className={`MobileCtaBar border-p3 bg-p4 fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 gap-3 border-t px-4 py-3 transition-transform duration-300 md:hidden ${
        shown ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <a
        href={site.contact.phoneHref}
        className="MobileCtaCall bg-linear-to-br from-s3 to-s4 text-n0 shadow-theme-sm active:from-s5 active:to-s5 focus-visible:ring-n0 focus-visible:ring-offset-p4 flex items-center justify-center gap-2 rounded-[100px] px-4 py-3 text-base font-semibold tracking-loose whitespace-nowrap transition-colors duration-300 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
      >
        <Phone className="size-5" aria-hidden="true" />
        Call Now
      </a>
      <a
        href={BOOK_ANCHOR}
        className="MobileCtaBook border-n0 bg-n0 text-p4 shadow-theme-sm active:bg-p1 focus-visible:ring-n0 focus-visible:ring-offset-p4 flex items-center justify-center gap-2 rounded-[100px] border px-4 py-3 text-base font-semibold tracking-loose whitespace-nowrap transition-colors duration-300 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
      >
        <CalendarCheck className="size-5" aria-hidden="true" />
        Book Online
      </a>
    </div>
  );
}
