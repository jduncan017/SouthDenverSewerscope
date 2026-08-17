import { type ReactNode } from "react";
import { ChevronDown } from "lucide-react";

export interface Faq {
  q: string;
  a: ReactNode;
  /** Plain-text answer for the FAQPage JSON-LD, when `a` carries markup. */
  plain?: string;
}

/*
 * FAQ accordion — native <details>/<summary>, so it is accessible and needs no
 * JS or client boundary; the chevron rotates when a row is open. Built on the
 * white card surface.
 */
export function FaqAccordion({ items }: { items: Faq[] }) {
  return (
    <div className="FaqAccordion flex flex-col gap-3">
      {items.map(({ q, a }, i) => (
        <details
          key={i}
          className="FaqItem group border-n4 bg-n0 hover:bg-n2 shadow-theme rounded-2xl border px-6 transition-colors duration-300 md:px-8"
        >
          <summary className="FaqQuestion text-p4 focus-visible:ring-s4 flex cursor-pointer list-none items-center justify-between gap-4 py-6 text-base font-semibold focus-visible:rounded-xs focus-visible:ring-2 focus-visible:outline-none [&::-webkit-details-marker]:hidden">
            {q}
            <ChevronDown
              aria-hidden="true"
              className="FaqChevron text-s3 size-5 shrink-0 transition-transform duration-300 group-open:rotate-180"
            />
          </summary>
          <div className="FaqAnswer text-g3 border-s2 mb-6 border-l-2 pl-4">
            {a}
          </div>
        </details>
      ))}
    </div>
  );
}
