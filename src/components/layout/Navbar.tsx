"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, Phone, X } from "lucide-react";
import { Button } from "@/components/Button";
import { navLinks, BOOK_ANCHOR } from "@/lib/nav";
import { site } from "@/lib/site";

/*
 * Sitewide navbar. Sticky, because this page runs paid traffic and the booking
 * CTA has to stay one tap away no matter how far down someone has scrolled.
 * Above it sits a slim navy announcement strip carrying the current offer and
 * the hours, which is the two facts an ad visitor is looking for first.
 *
 * Mobile is a disclosure panel rather than a portal drawer: this is one page of
 * anchor links, so the extra machinery of a focus-trapped overlay buys nothing.
 * The panel closes on link click, on Escape, and whenever the viewport grows
 * past the md breakpoint that reveals the desktop links.
 */
export function Navbar() {
  const [open, setOpen] = useState(false);

  // Escape closes the panel, and so does crossing into the desktop layout —
  // otherwise the open panel would linger invisibly behind the desktop nav and
  // keep the body scroll locked.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const desktop = window.matchMedia("(min-width: 768px)");
    const onBreakpoint = () => {
      if (desktop.matches) setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    desktop.addEventListener("change", onBreakpoint);
    return () => {
      window.removeEventListener("keydown", onKey);
      desktop.removeEventListener("change", onBreakpoint);
    };
  }, [open]);

  return (
    <header className="SiteHeader sticky top-0 z-50">
      {/* The offer is the strongest thing we have to say, so it stays visible
          on phones too; only the supporting clauses drop at narrow widths. */}
      <div className="AnnouncementBar bg-p4 text-n2 px-4 py-2 sm:px-6">
        <div className="AnnouncementBarInner max-w-section-x-wide mx-auto flex items-center justify-between gap-4 text-sm">
          <p className="AnnouncementOffer">
            <span className="text-s2 font-semibold">
              Sewer Scopes ${site.pricing.scopePromo}
            </span>{" "}
            <span className="hidden sm:inline">
              this month, normally ${site.pricing.scopeStandard}.
            </span>
            <span className="sm:hidden">
              this month, was ${site.pricing.scopeStandard}
            </span>
          </p>
          <p className="AnnouncementHours hidden lg:block">
            Evenings and All Day Saturday
          </p>
        </div>
      </div>

      <nav
        aria-label="Main"
        className="NavBar bg-n0 shadow-theme border-n3 border-b"
      >
        <div className="NavBarInner max-w-section-x-wide mx-auto flex items-center justify-between gap-6 px-4 py-3 md:px-8 md:py-4">
          <Link
            href="/"
            className="NavLogo focus-visible:ring-s4 shrink-0 rounded-sm focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
            aria-label={`${site.name} home`}
          >
            <Image
              src="/Logos/SVG/Logo.svg"
              alt={site.name}
              width={671}
              height={195}
              priority
              className="h-9 w-auto md:h-12"
            />
          </Link>

          <div className="NavLinks hidden items-center gap-7 lg:flex">
            {navLinks.map(({ label, href }) => (
              <a
                key={href}
                href={href}
                className="NavLink text-p4 hover:text-s4 focus-visible:ring-s4 text-base font-medium transition-colors duration-300 focus-visible:rounded-xs focus-visible:ring-2 focus-visible:outline-none"
              >
                {label}
              </a>
            ))}
          </div>

          <div className="NavActions flex items-center gap-3">
            <a
              href={site.contact.phoneHref}
              className="NavPhone text-p4 hover:text-s4 focus-visible:ring-s4 hidden items-center gap-2 text-base font-semibold transition-colors duration-300 focus-visible:rounded-xs focus-visible:ring-2 focus-visible:outline-none sm:inline-flex"
            >
              <Phone className="size-4" aria-hidden="true" />
              {site.contact.phoneDisplay}
            </a>
            <Button as="a" href={BOOK_ANCHOR} size="sm" flat>
              Book Online
            </Button>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={open ? "Close menu" : "Open menu"}
              className="NavToggle text-p4 hover:bg-p0 focus-visible:ring-s4 -mr-1 rounded-lg p-2 transition-colors duration-300 focus-visible:ring-2 focus-visible:outline-none lg:hidden"
            >
              {open ? (
                <X className="size-6" aria-hidden="true" />
              ) : (
                <Menu className="size-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        {open && (
          <div
            id="mobile-nav"
            className="MobileNav border-n3 bg-n0 animate-fade-in border-t px-4 pt-2 pb-6 lg:hidden"
          >
            <ul className="MobileNavList flex flex-col">
              {navLinks.map(({ label, href }) => (
                <li key={href}>
                  <a
                    href={href}
                    onClick={() => setOpen(false)}
                    className="MobileNavLink text-p4 hover:bg-p0 focus-visible:ring-s4 block rounded-lg px-3 py-3 text-base font-medium transition-colors duration-300 focus-visible:ring-2 focus-visible:outline-none"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
            <a
              href={site.contact.phoneHref}
              onClick={() => setOpen(false)}
              className="MobileNavPhone text-p4 hover:bg-p0 focus-visible:ring-s4 mt-2 flex items-center gap-2 rounded-lg px-3 py-3 text-base font-semibold transition-colors duration-300 focus-visible:ring-2 focus-visible:outline-none"
            >
              <Phone className="size-4" aria-hidden="true" />
              {site.contact.phoneDisplay}
            </a>
          </div>
        )}
      </nav>
    </header>
  );
}
