"use client";

import { useState } from "react";
import Image from "next/image";
import { Camera, ChevronDown } from "lucide-react";

export interface AccordionItem {
  title: string;
  body: string;
}

/*
 * Image + single-open accordion — a photo on one side, a list of click-to-expand
 * rows on the other (top row open by default; opening one closes the rest; rows
 * animate via the grid-rows 0fr to 1fr trick; collapsed rows are inert). Breaks
 * up text-only sections. The media column stretches to the list height. Pass
 * imageSide="right" to flip the photo.
 *
 * Two additions over the library version:
 *
 * 1. `image` is optional. With no photography yet, a required src would mean
 *    either a broken image or blocking the section on a photo shoot; without
 *    one it renders a designed placeholder carrying the shot brief, the same
 *    way PhotoSlot does. Adding the photo later is one prop.
 * 2. `onDark` reskins the whole thing for a navy band. The library version is
 *    light-band only (g4 text, g2 borders, p0 hover), which is invisible on
 *    navy.
 */
export function ImageAccordion({
  image,
  alt,
  brief,
  items,
  imageSide = "left",
  onDark = false,
}: {
  /** Omit to render the placeholder instead. */
  image?: string;
  /** Required whenever `image` is set. */
  alt?: string;
  /** The shot we need, shown in the placeholder until the photo lands. */
  brief: string;
  items: AccordionItem[];
  imageSide?: "left" | "right";
  onDark?: boolean;
}) {
  const [openIdx, setOpenIdx] = useState(0);
  const toggle = (i: number) => setOpenIdx((cur) => (cur === i ? -1 : i));

  const summary = onDark
    ? "text-n0 hover:text-s2 focus-visible:ring-n0 border-p3"
    : "text-p4 hover:text-s4 focus-visible:ring-s4 border-n4";
  const summaryHover = onDark ? "hover:bg-p4" : "hover:bg-n2";
  const chevron = onDark ? "text-s2" : "text-s3";
  const body = onDark ? "text-n3" : "text-g3";

  return (
    <div className="ImageAccordion grid items-stretch gap-6 md:gap-8 lg:grid-cols-2 lg:gap-12">
      <div
        className={`ImageAccordionMedia shadow-theme relative h-full min-h-[20rem] overflow-hidden rounded-2xl ${imageSide === "right" ? "lg:order-2" : ""}`}
      >
        {image ? (
          <Image
            src={image}
            alt={alt ?? ""}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
        ) : (
          <div
            className={`ImageAccordionPlaceholder flex size-full items-center justify-center bg-linear-to-br ${
              onDark
                ? "from-p3 to-p5 border-p3 border"
                : "from-p0 via-n2 to-s1 border-n4 border"
            }`}
          >
            <div className="ImageAccordionPlaceholderInner flex flex-col items-center gap-3 px-6 text-center">
              <span
                className={`ImageAccordionPlaceholderIcon shadow-theme-sm flex size-14 items-center justify-center rounded-full ${
                  onDark ? "bg-p4 text-s2" : "bg-n0 text-p4"
                }`}
              >
                <Camera className="size-6" aria-hidden="true" />
              </span>
              <span
                className={`ImageAccordionPlaceholderBrief max-w-[20rem] text-sm ${
                  onDark ? "text-n3" : "text-g3"
                }`}
              >
                {brief}
              </span>
            </div>
          </div>
        )}
      </div>

      <div className="ImageAccordionList flex flex-col lg:py-6">
        {items.map((item, i) => {
          const isOpen = openIdx === i;
          return (
            <div key={item.title} className="AccordionItem">
              <button
                type="button"
                onClick={() => toggle(i)}
                aria-expanded={isOpen}
                className={`AccordionSummary ${summary} ${isOpen ? "" : summaryHover} flex w-full cursor-pointer items-center justify-between gap-4 border-b px-4 py-5 text-left text-lg font-semibold transition-colors duration-300 focus-visible:rounded-xs focus-visible:ring-2 focus-visible:outline-none`}
              >
                {item.title}
                <ChevronDown
                  aria-hidden="true"
                  className={`AccordionChevron ${chevron} size-5 shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                />
              </button>
              <div
                inert={!isOpen}
                className={`AccordionReveal grid transition-all duration-500 ease-out ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
              >
                <div className="overflow-hidden">
                  <div className="AccordionBody flex flex-col items-start gap-3 px-4 pt-4 pb-6">
                    <p className={`AccordionBodyText ${body}`}>{item.body}</p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
