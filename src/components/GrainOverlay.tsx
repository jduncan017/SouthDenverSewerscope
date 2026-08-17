/*
 * Grain overlay (see globals `.bg-grain`). Drop into any relatively-positioned
 * section with a flat/gradient fill to add subtle texture; it sits absolutely
 * behind the content, so give the content wrapper `relative z-10` so it stays
 * crisp. One fixed treatment for every band — by design it takes no props and
 * is NOT configurable, so the grain stays consistent across all bands (never
 * special-case per fill).
 */
export function GrainOverlay() {
  return (
    <div
      aria-hidden="true"
      className="GrainOverlay bg-grain pointer-events-none absolute inset-0 opacity-[0.06] mix-blend-overlay"
    />
  );
}
