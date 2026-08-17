import { type ReactNode } from "react";

/*
 * Section eyebrow — small uppercase kicker with a leading rule and green
 * gradient-fill text (light -> dark to the bottom-right, via bg-clip). Two
 * variants by background: `dark` (deeper green, for white/neutral bands) and
 * `light` (lighter green, for navy bands). Pair with a section heading.
 *
 * Sized at text-sm, not the library's text-lg: that size was tuned for a serif
 * display face, and Archivo bold uppercase at text-lg competes with the H2 it
 * is supposed to introduce. Eyebrows are peripheral text, which is exactly what
 * text-sm is reserved for.
 */
type EyebrowVariant = "light" | "dark";
type EyebrowAs = "p" | "h1" | "h2" | "h3";

const VARIANTS: Record<EyebrowVariant, { text: string; rule: string }> = {
  dark: { text: "from-s3 to-s5", rule: "bg-s3" },
  light: { text: "from-s1 to-s2", rule: "bg-s2" },
};

export function Eyebrow({
  children,
  variant = "dark",
  as: Tag = "p",
  className = "",
}: {
  children: ReactNode;
  variant?: EyebrowVariant;
  as?: EyebrowAs;
  className?: string;
}) {
  const v = VARIANTS[variant];
  return (
    <Tag
      className={`Eyebrow font-heading inline-flex items-center gap-3 text-sm font-bold tracking-[0.12em] uppercase ${className}`}
    >
      <span
        className={`EyebrowRule h-px w-8 shrink-0 ${v.rule}`}
        aria-hidden="true"
      />
      <span
        className={`EyebrowText bg-linear-to-br bg-clip-text text-transparent ${v.text}`}
      >
        {children}
      </span>
    </Tag>
  );
}
