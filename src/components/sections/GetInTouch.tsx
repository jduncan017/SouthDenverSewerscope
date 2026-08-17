import { CalendarCheck, Clock, MapPin, MessageSquare, Phone } from "lucide-react";
import { SectionWrapper } from "@/components/SectionWrapper";
import { SectionHeader } from "@/components/SectionHeader";
import { Tabs } from "@/components/Tabs";
import { BookingEmbed } from "@/components/BookingEmbed";
import { ContactForm } from "@/components/sections/ContactForm";
import { Button } from "@/components/Button";
import { site } from "@/lib/site";

/*
 * Booking and contact, in one section.
 *
 * This was three stacked blocks (option cards, then a calendar, then a form),
 * which was thorough and far too tall: everything a visitor might want was on
 * screen, so nothing was. Tabs collapse the two self-serve paths into one
 * frame, and the phone column sits alongside instead of underneath.
 *
 * Book Now leads because self-serve booking is what takes a job at nine at
 * night with nobody awake to answer it, which is the whole reason the calendar
 * exists. The form is the second tab, not a second section, because it is the
 * fallback for people who will not call and are not ready to pick a time.
 *
 * The phone stays out of the tabs entirely. It is the fastest close and the
 * likeliest action for a homeowner whose drain is backing up right now, so it
 * must never be one click away behind a tab someone did not choose.
 */
export function GetInTouch() {
  const { calLink } = site.booking;

  const bookPanel = calLink ? (
    <BookingEmbed calLink={calLink} />
  ) : (
    <div className="BookingFallback flex flex-col items-start gap-4 py-4">
      <h3 className="BookingFallbackTitle heading-ui text-p4 text-xl">
        Online Booking Is Nearly Live
      </h3>
      <p className="BookingFallbackBody text-g3">
        The calendar is being set up right now. Until it is running, one call or
        text gets you on the schedule just as fast, usually for an evening this
        week or the coming Saturday.
      </p>
      <Button as="a" href={site.contact.phoneHref}>
        <Phone className="size-5" aria-hidden="true" />
        {site.contact.phoneDisplay}
      </Button>
    </div>
  );

  return (
    <SectionWrapper id="book" tone="white">
      <SectionHeader
        eyebrow="Get In Touch"
        title="Book Your Sewer Inspection"
        description={`Pick a time yourself, send us the details, or just call. Whichever you choose, you are dealing with ${site.owner.name}, who is the person who will be doing the work.`}
        align="center"
      />

      <div className="GetInTouchGrid mt-16 grid items-start gap-8 lg:grid-cols-[1.55fr_1fr] lg:gap-12">
        <Tabs
          ariaLabel="Ways to book"
          items={[
            {
              // "booking", not "book": the section itself owns #book, and two
              // elements with the same id makes the anchor ambiguous.
              id: "booking",
              label: "Book Now",
              icon: (
                <CalendarCheck className="size-5 shrink-0" aria-hidden="true" />
              ),
              content: bookPanel,
            },
            {
              // id doubles as the anchor: CONTACT_ANCHOR points here. Not
              // "message", which the form's own textarea already owns.
              id: "contact",
              label: "Send Us a Message",
              shortLabel: "Message",
              icon: (
                <MessageSquare className="size-5 shrink-0" aria-hidden="true" />
              ),
              content: <ContactForm />,
            },
          ]}
        />

        <aside className="ContactAside from-p3 to-p4 shadow-theme flex flex-col gap-6 rounded-2xl bg-linear-to-br p-8 md:p-10">
          <div className="ContactAsideCall flex flex-col gap-2">
            <p className="ContactAsideLabel text-s2 text-sm font-bold tracking-[0.12em] uppercase">
              Rather Just Call?
            </p>
            <a
              href={site.contact.phoneHref}
              className="ContactAsidePhone font-heading text-n0 hover:text-s2 focus-visible:ring-n0 focus-visible:ring-offset-p4 text-3xl font-extrabold tracking-tight transition-colors duration-300 focus-visible:rounded-xs focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
            >
              {site.contact.phoneDisplay}
            </a>
            <p className="ContactAsideNote text-n3 text-base">
              Call or text. It rings {site.owner.name}, not a call center.
            </p>
          </div>

          <hr className="ContactAsideRule border-p2 border-t opacity-40" />

          <div className="ContactAsideHours flex flex-col gap-3">
            <p className="ContactAsideLabel text-s2 text-sm font-bold tracking-[0.12em] uppercase">
              When We Work
            </p>
            <ul className="flex flex-col gap-2">
              {site.hours.map(({ days, time }) => (
                <li
                  key={days}
                  className="ContactAsideHoursItem text-n3 flex items-start gap-2 text-base"
                >
                  <Clock
                    className="text-s2 mt-1 size-4 shrink-0"
                    aria-hidden="true"
                  />
                  <span>
                    <span className="text-n0 font-semibold">{days}</span>{" "}
                    {time}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <hr className="ContactAsideRule border-p2 border-t opacity-40" />

          <div className="ContactAsideArea flex flex-col gap-3">
            <p className="ContactAsideLabel text-s2 text-sm font-bold tracking-[0.12em] uppercase">
              Where We Work
            </p>
            <p className="ContactAsideAreaText text-n3 flex items-start gap-2 text-base">
              <MapPin className="text-s2 mt-1 size-4 shrink-0" aria-hidden="true" />
              <span>
                {site.pricing.radiusOrigin} and the South Denver metro.
                Destination charges may apply beyond{" "}
                {site.pricing.freeRadiusMiles} miles.
              </span>
            </p>
          </div>
        </aside>
      </div>
    </SectionWrapper>
  );
}
