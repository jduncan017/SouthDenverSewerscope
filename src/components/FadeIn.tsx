"use client";

import { useRef, useEffect, useState, type ReactNode } from "react";

/*
 * Single-play scroll reveal — fades + lifts its children once, the first time
 * they cross into view (the observer unobserves after firing, so it never
 * replays on scroll-back). `delay` staggers siblings (header -> cards -> footer,
 * or a per-row card cascade). Renders a transparent block wrapper, so apply it
 * to flex/auto-placed grid children; don't wrap an element that carries
 * grid-placement or `order-*` classes (the wrapper, not the child, becomes the
 * track item).
 *
 * Reduced-motion users get the reveal instantly rather than never: the observer
 * still fires, and the globals media query zeroes the transition duration, so
 * the element snaps to visible with no movement. Visitors with JavaScript off
 * are covered by the <noscript> rule in globals.css, which pins every .FadeIn
 * to fully visible so the page can never render as blank blocks.
 */
interface FadeInProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  /** Direction the content travels in from: "up" (default) or "left". */
  from?: "up" | "left";
}

export function FadeIn({
  children,
  delay = 0,
  className = "",
  from = "up",
}: FadeInProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      // Negative bottom margin shrinks the trigger zone up from the viewport
      // bottom, so the element must scroll ~120px past first-appearance before
      // it reveals (it lands nearer mid-screen instead of firing on entry).
      { threshold: 0, rootMargin: "0px 0px -120px 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`FadeIn transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        visible
          ? "translate-x-0 translate-y-0 opacity-100"
          : from === "left"
            ? "-translate-x-8 opacity-0"
            : "translate-y-8 opacity-0"
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
