import { type ReactNode } from "react";
import { type RoundedSize, roundedClasses } from "./shared-styles";

/*
 * The site's card surface — one consistent treatment so every card speaks the
 * same language (design system §4). Default look: a soft n0->n2 gradient (to
 * the bottom-right), hairline n4 border, theme shadow, lg radius, lg padding.
 *
 * Overridable design dimensions are typed props (padding / shadow / rounded)
 * like the `Wrapper` primitive; `className` is for additive styling (width,
 * margin, flex layout, etc.). This avoids needing tailwind-merge to resolve
 * conflicting utilities — change a default via its prop, not a competing class.
 */

type CardPadding = "none" | "sm" | "md" | "lg" | "xl";
type CardShadow = "none" | "sm" | "md" | "xl";

const paddingClasses: Record<CardPadding, string> = {
  none: "",
  sm: "p-6 md:p-6",
  md: "p-6 md:p-8",
  lg: "p-6 md:p-10",
  xl: "p-8 md:p-12",
};

const shadowClasses: Record<CardShadow, string> = {
  none: "",
  sm: "shadow-theme-sm",
  md: "shadow-theme",
  xl: "shadow-theme-xl",
};

export function CardWrapper({
  children,
  padding = "lg",
  shadow = "md",
  rounded = "lg",
  as: Tag = "div",
  className = "",
}: {
  children: ReactNode;
  padding?: CardPadding;
  shadow?: CardShadow;
  rounded?: RoundedSize;
  as?: keyof React.JSX.IntrinsicElements;
  className?: string;
}) {
  return (
    <Tag
      className={`CardWrapper from-n0 to-n2 border-n4 border bg-linear-to-br ${shadowClasses[shadow]} ${paddingClasses[padding]} ${roundedClasses[rounded]} ${className}`.trim()}
    >
      {children}
    </Tag>
  );
}
