export type RoundedSize = "xs" | "sm" | "md" | "lg" | "xl" | "none";

/*
 * Border-radius scale (keys are the project's semantic sizes; the Tailwind
 * radius names on the right differ because Tailwind's md/lg are 6px/8px):
 *   xs: 2px  |  sm: 4px  |  md: 8px  |  lg: 16px  |  xl: 100px (pill)
 */
export const roundedClasses: Record<RoundedSize, string> = {
  none: "",
  xs: "rounded-xs",
  sm: "rounded-sm",
  md: "rounded-lg",
  lg: "rounded-2xl",
  xl: "rounded-[100px]",
};

/*
 * The canonical content-card surface (marketing / content cards): white fill,
 * hairline border, theme shadow, 2xl radius. One source so the cards don't
 * drift. Compose with layout utilities at the call site:
 * className={`Foo ${cardSurface} flex ...`}.
 */
export const cardSurface = "bg-n0 border-n4 shadow-theme rounded-2xl border";
