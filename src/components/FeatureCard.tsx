import { type ReactNode } from "react";
import { type LucideIcon } from "lucide-react";
import { IconBubble } from "@/components/IconBubble";
import { cardSurface } from "@/components/shared-styles";

/*
 * Feature card — the canonical icon + title + body content card (built on the
 * shared cardSurface). `size` scales the icon, title, and padding together for
 * the grid it sits in: sm = compact 4-up, md = 3-up, lg = roomy 2-up. `footer`
 * is an optional bottom-pinned slot (e.g. a link or a price). Body content is
 * passed as children, so it can be a paragraph, an address, a list, etc.
 */
type FeatureCardSize = "sm" | "md" | "lg";

const SIZES: Record<
  FeatureCardSize,
  { icon: "sm" | "md" | "lg"; title: string; pad: string }
> = {
  sm: { icon: "sm", title: "text-xl", pad: "p-6 md:p-8" },
  md: { icon: "md", title: "text-2xl", pad: "p-8" },
  lg: { icon: "lg", title: "text-2xl", pad: "p-8 md:p-10" },
};

export function FeatureCard({
  icon,
  iconTone = "navy",
  title,
  children,
  footer,
  size = "md",
  titleLines,
  className = "",
}: {
  icon: LucideIcon;
  iconTone?: "navy" | "green" | "solid" | "light";
  title: ReactNode;
  children: ReactNode;
  footer?: ReactNode;
  size?: FeatureCardSize;
  /*
   * Reserve this many lines of title height. In a grid where some titles wrap
   * and others do not, the heads end up different heights and every body below
   * them starts at a different y. Set this to the longest title's line count
   * and the whole row lines up. Only worth it on a row of sibling cards.
   */
  titleLines?: 2 | 3;
  className?: string;
}) {
  const s = SIZES[size];
  // 1.4em per line. Not the base layer's 1.2 for headings: the text-* size
  // tokens carry their own line-height and the utility on this h3 wins.
  const titleMinHeight =
    titleLines === 3
      ? "sm:min-h-[4.2em]"
      : titleLines === 2
        ? "sm:min-h-[2.8em]"
        : "";
  return (
    <article
      className={`FeatureCard ${cardSurface} ${s.pad} flex h-full flex-col gap-4 ${className}`.trim()}
    >
      {/* Icon sits inline with the title (the sitewide treatment). items-center
          keeps the bubble optically centered when the title runs to two lines,
          and text-balance evens those lines out instead of leaving an orphan. */}
      <div className="FeatureCardHead flex items-center gap-3">
        <IconBubble icon={icon} size={s.icon} tone={iconTone} />
        <h3
          className={`FeatureCardTitle ${s.title} ${titleMinHeight} flex min-w-0 items-center text-balance`}
        >
          {title}
        </h3>
      </div>
      {children}
      {footer && <div className="FeatureCardFooter mt-auto">{footer}</div>}
    </article>
  );
}
