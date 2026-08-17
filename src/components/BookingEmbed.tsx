"use client";

import { useEffect } from "react";
import Cal, { getCalApi } from "@calcom/embed-react";

/*
 * Cal.com inline booking calendar. Themed to the brand on mount via the embed
 * UI API, which is the only supported way to restyle the iframe: it is a cross
 * origin document, so our stylesheet cannot reach inside it.
 *
 * The brand colours are passed as literal hexes because this API takes a hex
 * string, not a CSS variable. That is the one place on the site where a colour
 * is hardcoded outside globals.css, so if the palette ever changes, this needs
 * changing with it.
 */
const CAL_BRAND_LIGHT = "#457E26"; // s3, the CTA green
const CAL_BRAND_DARK = "#092745"; // p4, the brand navy

export function BookingEmbed({ calLink }: { calLink: string }) {
  useEffect(() => {
    let cancelled = false;
    void (async () => {
      const cal = await getCalApi();
      if (cancelled) return;
      cal("ui", {
        cssVarsPerTheme: {
          light: { "cal-brand": CAL_BRAND_LIGHT },
          dark: { "cal-brand": CAL_BRAND_DARK },
        },
        hideEventTypeDetails: false,
        layout: "month_view",
      });
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <Cal
      calLink={calLink}
      className="BookingEmbed w-full"
      style={{ width: "100%", height: "100%", overflow: "scroll" }}
      config={{ layout: "month_view" }}
    />
  );
}
