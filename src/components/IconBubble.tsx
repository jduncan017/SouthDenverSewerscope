import { type LucideIcon } from "lucide-react";

/*
 * Icon bubble — a brand-tinted rounded square holding one icon, the consistent
 * treatment for service / method / value / feature icons. Size maps the bubble,
 * icon, and radius together; tone covers light bands (navy, green), dark cards
 * (solid), and navy bands (light).
 */
type IconBubbleSize = "sm" | "md" | "lg";
type IconBubbleTone = "navy" | "green" | "solid" | "light";

const SIZES: Record<IconBubbleSize, string> = {
  sm: "size-11 rounded-xl [&>svg]:size-5",
  md: "size-12 rounded-2xl [&>svg]:size-6",
  lg: "size-14 rounded-2xl [&>svg]:size-7",
};

const TONES: Record<IconBubbleTone, string> = {
  navy: "bg-p0 text-p4",
  green: "bg-s0 text-s4",
  solid: "bg-s3 text-n0",
  light: "bg-n0 text-p4",
};

export function IconBubble({
  icon: Icon,
  size = "md",
  tone = "navy",
  className = "",
}: {
  icon: LucideIcon;
  size?: IconBubbleSize;
  tone?: IconBubbleTone;
  className?: string;
}) {
  return (
    <span
      className={`IconBubble ${SIZES[size]} ${TONES[tone]} flex shrink-0 items-center justify-center ${className}`.trim()}
    >
      <Icon aria-hidden="true" />
    </span>
  );
}
