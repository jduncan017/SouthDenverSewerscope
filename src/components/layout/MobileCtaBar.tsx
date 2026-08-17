import { CalendarCheck, Phone } from "lucide-react";
import { site } from "@/lib/site";
import { BOOK_ANCHOR } from "@/lib/nav";

/*
 * Fixed bottom action bar, phones only (hidden from md up, where the navbar
 * already shows the phone number and the booking button). Most of this site's traffic arrives
 * from a phone tapping a Google ad, and on that device the two things that
 * convert are a dial button and a booking link. Keeping them pinned means the
 * visitor never has to scroll back to the header to act.
 *
 * The layout reserves matching bottom padding on <body> so this bar can never
 * sit on top of the footer's last line.
 */
export function MobileCtaBar() {
  return (
    <div className="MobileCtaBar border-p3 bg-p4 fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 gap-3 border-t px-4 py-3 md:hidden">
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
