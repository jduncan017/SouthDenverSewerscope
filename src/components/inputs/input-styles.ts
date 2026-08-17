/*
 * Shared input styling, on the brand ramp for light (white) backgrounds, which
 * is where the form kit is used. Error states use Tailwind red since the brand
 * palette has no dedicated error hue — the one sanctioned exception to the
 * never-hardcode-a-color rule.
 */
export const inputBase =
  "w-full text-base text-g4 bg-n0 border border-n5 rounded-lg placeholder:text-g2 transition-colors";

export const inputFocus =
  "focus:outline-none focus:ring-2 focus:ring-s4 focus:border-s4";

export const inputDisabled =
  "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-n2";

export const inputError =
  "border-red-500 focus:ring-red-400 focus:border-red-500";

export const inputPadding = "px-4 py-3";

export const labelBase = "text-sm font-semibold text-p4";

export const errorBase = "text-sm text-red-600";

export const helperBase = "text-sm text-g3";
