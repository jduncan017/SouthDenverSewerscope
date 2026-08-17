import { type ReactNode } from "react";
import { GrainOverlay } from "@/components/GrainOverlay";

/*
 * Section band — the single place a section's background + elevation live, so
 * section CONTENT components stay band-agnostic and the page decides how each
 * is treated (pass `tone` / `elevation` as props from the page). Renders the
 * <section> (padding + optional tone gradient + elevation shadow), the grain on
 * raised bands, and the centered inner container (max-width + the z-10 that
 * keeps content above the grain). Tone gradients follow the lighting rule
 * (lighter top-left -> darker bottom-right). Padding derives from elevation
 * (raised -> section-pad, flat -> section-pad-xl) unless overridden.
 */
export type SectionTone = "white" | "neutral" | "green" | "navy" | "navyDeep";
export type SectionElevation = "flat" | "raised" | "recessed";

export interface SectionBandProps {
  tone?: SectionTone;
  elevation?: SectionElevation;
}

const TONE: Record<SectionTone, string> = {
  white: "",
  neutral: "bg-linear-to-br from-n1 to-n3",
  green: "bg-linear-to-br from-n0 to-s1",
  navy: "bg-linear-to-br from-p3 to-p4",
  navyDeep: "bg-linear-to-br from-p4 to-p5",
};

export function SectionWrapper({
  children,
  tone = "white",
  elevation = "flat",
  padding,
  maxWidth = "section",
  className = "",
  innerClassName = "",
  id,
}: SectionBandProps & {
  children: ReactNode;
  /** Override the elevation-derived vertical padding. */
  padding?: "sm" | "default" | "xl";
  /** `full` lets content span the band's full padded width (e.g. a scroller). */
  maxWidth?: "section" | "wide" | "full";
  className?: string;
  innerClassName?: string;
  /** Anchor target id (adds scroll-margin so the navbar doesn't overlap). */
  id?: string;
}) {
  const raised = elevation === "raised";
  const recessed = elevation === "recessed";
  const resolvedPad = padding ?? (elevation === "flat" ? "xl" : "default");
  const padClass =
    resolvedPad === "xl"
      ? "section-pad-xl"
      : resolvedPad === "sm"
        ? "section-pad-sm"
        : "section-pad";
  const elevationClass = raised
    ? "shadow-theme-xl relative z-10"
    : recessed
      ? "shadow-inset-band relative z-10"
      : "";
  const maxWidthClass =
    maxWidth === "full"
      ? "max-w-none"
      : maxWidth === "wide"
        ? "max-w-section-wide"
        : "max-w-section";

  return (
    <section
      id={id}
      className={`${className} ${id ? "scroll-mt-24" : ""} ${padClass} ${TONE[tone]} ${elevationClass}`.trim()}
    >
      {raised && <GrainOverlay />}
      <div
        className={`${innerClassName} ${maxWidthClass} mx-auto ${
          raised || recessed ? "relative z-10" : ""
        }`.trim()}
      >
        {children}
      </div>
    </section>
  );
}
