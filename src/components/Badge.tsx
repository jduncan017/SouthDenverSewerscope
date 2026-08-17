import { type ReactNode } from "react";
import { type LucideIcon } from "lucide-react";

/*
 * Badge — the sitewide pill for short status/meta labels (the pricing "Most
 * Booked" flag, the service-area no-trip-charge chips, the promo tag). Not a
 * control: never make it clickable.
 */
const toneClasses = {
  neutral: "bg-n3 text-g4",
  grey: "bg-g1 text-g4",
  navy: "bg-p0 text-p4",
  navySolid: "bg-p4 text-n0",
  green: "bg-s0 text-s4",
  greenSolid: "bg-s3 text-n0",
} as const;

const sizeClasses = {
  sm: "px-2 py-0.5",
  md: "px-3 py-1",
  lg: "px-3 py-1.5",
} as const;

const iconSize = { sm: "size-3.5", md: "size-4", lg: "size-4" } as const;

export type BadgeTone = keyof typeof toneClasses;

export function Badge({
  children,
  tone = "neutral",
  size = "sm",
  icon: Icon,
  className = "",
}: {
  children: ReactNode;
  tone?: BadgeTone;
  size?: keyof typeof sizeClasses;
  icon?: LucideIcon;
  className?: string;
}) {
  return (
    <span
      // w-fit so a badge dropped into a flex COLUMN keeps its natural width
      // instead of being stretched edge to edge by the default align-stretch.
      className={`Badge inline-flex w-fit shrink-0 items-center gap-1.5 rounded-full text-sm font-medium ${toneClasses[tone]} ${sizeClasses[size]} ${className}`.trim()}
    >
      {Icon && <Icon className={iconSize[size]} aria-hidden="true" />}
      {children}
    </span>
  );
}
