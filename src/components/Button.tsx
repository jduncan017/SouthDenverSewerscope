"use client";

import { type ReactNode } from "react";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { type RoundedSize, roundedClasses } from "./shared-styles";
import {
  usePersistedQueryString,
  appendQueryString,
} from "@/components/QueryParamProvider";

export type ButtonVariant =
  | "primary"
  | "navy"
  | "secondary"
  | "onDark"
  | "soft"
  | "ghost";

/*
 * Button spec (design system §4):
 * - "Button Text" type: 19px medium, loose tracking (`button-text` utility);
 *   labels written in Capital Case, never wrapped
 * - Padding: 24px x / 12px y
 * - `shadow-theme-sm` on every variant except ghost (text-only — a floating
 *   pill shadow around bare text looks detached); opt out with `flat` where
 *   the context already carries elevation (e.g. the navbar CTA)
 * - Every variant has hover + active states with a 300ms transition, plus the
 *   standard focus-visible ring (never skipped)
 *
 * THE PROTECTED CTA FILL ON THIS BRAND IS GREEN, NOT NAVY. The library reserves
 * the p-ramp fill for CTAs, but here the p ramp is the logo navy and it already
 * carries the navbar, the footer, and every dark band. A navy button would be
 * the same color as the chrome it sits in. Green (s3, the logo's second color)
 * is the only fill on this palette that reads as "do something here" against
 * both the white page and the navy bands, so `primary` is green and stays
 * reserved for conversion actions: call, book, submit. Never use a green fill
 * decoratively. `navy` exists for the rare second-rank action on a white band.
 */
const buttonBase =
  "Button inline-flex items-center justify-center gap-2 whitespace-nowrap transition-colors duration-300 cursor-pointer";

// md is THE button (Button Text type). sm is for dense chrome only — never a
// marketing CTA.
const sizeClasses = {
  md: "button-text px-6 py-3",
  sm: "text-base font-medium tracking-loose px-4 py-2",
};

const buttonFocus =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-s4 focus-visible:ring-offset-2";

// On a navy band a green ring on a white offset reads as a mistake; the
// white-on-navy variant gets its own ring so keyboard focus stays legible.
const onDarkFocus =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-n0 focus-visible:ring-offset-2 focus-visible:ring-offset-p4";

const variantClasses: Record<ButtonVariant, string> = {
  // The protected CTA treatment: brand green, deepening on hover
  primary:
    "bg-linear-to-br from-s3 to-s4 text-n0 hover:from-s4 hover:to-s5 active:from-s5 active:to-s5",
  // Navy fill — a second-rank filled action on a white band (e.g. the phone
  // number beside a green Book button), where a second green would compete
  navy: "bg-linear-to-br from-p3 to-p4 text-n0 hover:from-p4 hover:to-p5 active:from-p5 active:to-p5",
  // Outline on a solid n0 plate (never transparent — reads consistently over
  // tinted section bgs); fills navy on hover
  secondary:
    "border border-p4 bg-n0 text-p4 hover:bg-p4 hover:text-n0 active:bg-p5 active:border-p5",
  // White pill for use ON a navy band, where both fills above disappear
  onDark:
    "border border-n0 bg-n0 text-p4 hover:bg-p0 hover:border-p0 hover:text-p5 active:bg-p1 active:border-p1",
  // Soft green — looks like a button but lower-emphasis
  soft: "bg-linear-to-br from-s0 to-s1 text-s5 hover:from-s1 hover:to-s2 active:from-s2 active:to-s2",
  // Text-only, for low-emphasis actions (always flat — no shadow)
  ghost:
    "bg-transparent border border-transparent text-p4 hover:bg-p0 hover:border-p1 hover:text-p5 active:bg-p1",
};

const spinnerClasses = "ButtonSpinner h-5 w-5 animate-spin";

type BaseProps = {
  children: ReactNode;
  variant?: ButtonVariant;
  /** sm = dense chrome only; marketing CTAs stay md. */
  size?: "md" | "sm";
  rounded?: RoundedSize;
  /** Skip the theme shadow (for already-elevated contexts like the navbar). */
  flat?: boolean;
  loading?: boolean;
  disabled?: boolean;
  className?: string;
};

type ButtonElementProps = BaseProps & {
  as?: "button";
  type?: "button" | "submit" | "reset";
  href?: never;
} & Omit<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    keyof BaseProps | "type"
  >;

type AnchorElementProps = BaseProps & {
  as: "a";
  href: string;
} & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof BaseProps>;

type LinkElementProps = BaseProps & {
  as: "link";
  href: string;
} & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof BaseProps>;

type ButtonProps = ButtonElementProps | AnchorElementProps | LinkElementProps;

function Spinner() {
  return <Loader2 className={spinnerClasses} aria-hidden="true" />;
}

/**
 * The site's button (design system §4). "Button Text" type, 24px x / 12px y
 * padding, pill radius by default, and hover/active/focus states on every
 * variant with a 300ms transition.
 *
 * Variants: `primary` (brand green — the protected CTA treatment), `navy`,
 * `secondary` (navy outline, fills on hover), `onDark` (white pill for navy
 * bands), `soft`, `ghost` (text-only).
 *
 * One-Button rule: every button on the site is a variant of this component.
 * No wrapper button components — a modal trigger is `useDisclosure` + `Button`
 * + `Modal` composed at the call site.
 */
export function Button(props: ButtonProps) {
  const {
    children,
    as = "button",
    variant = "primary",
    size = "md",
    rounded: rawRounded,
    flat = false,
    loading = false,
    disabled = false,
    className = "",
    ...rest
  } = props;
  const qs = usePersistedQueryString();
  const rounded: RoundedSize = rawRounded ?? "xl";
  const classes = [
    buttonBase,
    sizeClasses[size],
    variant === "onDark" ? onDarkFocus : buttonFocus,
    variantClasses[variant],
    roundedClasses[rounded],
    flat || variant === "ghost" ? "" : "shadow-theme-sm",
    loading ? "pointer-events-none opacity-75" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const content = (
    <>
      {loading && <Spinner />}
      {children}
    </>
  );

  if (as === "button") {
    const { type = "button", ...buttonRest } = rest as Omit<
      ButtonElementProps,
      keyof BaseProps
    >;
    return (
      <button
        type={type}
        disabled={disabled || loading}
        className={`${classes} disabled:cursor-not-allowed disabled:opacity-50`}
        aria-busy={loading || undefined}
        {...buttonRest}
      >
        {content}
      </button>
    );
  }

  const linkDisabledClasses =
    disabled || loading ? "pointer-events-none opacity-50" : "";
  const linkProps = {
    className: `${classes} ${linkDisabledClasses}`,
    "aria-disabled": disabled || loading || undefined,
    "aria-busy": loading || undefined,
    tabIndex: disabled || loading ? -1 : undefined,
  };

  if (as === "link") {
    const { href, ...linkRest } = rest as Omit<
      LinkElementProps,
      keyof BaseProps
    >;
    return (
      <Link href={appendQueryString(href, qs)} {...linkProps} {...linkRest}>
        {content}
      </Link>
    );
  }

  // as === "a" — external links and tel:/mailto: (never rewritten with UTMs)
  const { href, ...anchorRest } = rest as Omit<
    AnchorElementProps,
    keyof BaseProps
  >;
  return (
    <a href={href} {...linkProps} {...anchorRest}>
      {content}
    </a>
  );
}
