"use client";

import {
  useCallback,
  useRef,
  useSyncExternalStore,
  type ReactNode,
} from "react";

export interface TabItem {
  /** Doubles as the anchor target, so `#<id>` deep links to this tab. */
  id: string;
  label: string;
  /*
   * Shown instead of `label` below the sm breakpoint. Two tabs sharing a phone
   * width is not much room, and a wrapped tab label makes the strip twice as
   * tall as it needs to be. The accessible name stays the full `label`.
   */
  shortLabel?: string;
  /*
   * A RENDERED element (<Phone />), not a component reference (Phone). This is
   * a client component, and a function cannot cross the server boundary as a
   * prop, so the icon has to arrive already rendered. The server-rendered
   * cards elsewhere take the component itself; this one cannot.
   */
  icon?: ReactNode;
  content: ReactNode;
}

/*
 * Folder tabs — the browser-tab treatment, where the active tab sits proud of
 * the panel and reads as the front sheet of a folder. The join is done with a
 * negative bottom margin plus no bottom border on the active tab, so its fill
 * paints over the panel's top border and the two become one shape. The panel
 * keeps its top-right corner rounded and drops the top-left, where the first
 * tab already provides the curve.
 *
 * THE URL HASH IS THE SOURCE OF TRUTH for which tab is open, not local state.
 * Other sections of the page link straight to a tab (the pricing card's "tell
 * us what is happening" goes to the message form), and a tab that is `hidden`
 * cannot be an anchor target, so those links would otherwise scroll to nothing.
 * Driving it from the hash makes deep links work, makes the open tab shareable,
 * and keeps selection out of an effect: clicking a tab rewrites the hash and
 * the component re-reads it, rather than setting state and separately syncing
 * the URL. Selection is read through useSyncExternalStore so the server renders
 * the first tab and the client corrects after hydration without a mismatch.
 *
 * Every panel stays mounted and inactive ones use the `hidden` attribute (which
 * also removes them from the accessibility tree). That costs a little markup
 * and buys two things worth more: anything typed into a form in one tab
 * survives a trip to another, and all panel content ships in the server HTML
 * rather than appearing only after a click.
 *
 * Keyboard: arrow keys plus Home and End, per the WAI-ARIA tabs pattern.
 */

// replaceState does not fire hashchange, so tab clicks notify subscribers here.
const listeners = new Set<() => void>();
const emit = () => listeners.forEach((l) => l());

function subscribe(onChange: () => void) {
  listeners.add(onChange);
  window.addEventListener("hashchange", onChange);
  return () => {
    listeners.delete(onChange);
    window.removeEventListener("hashchange", onChange);
  };
}

const getSnapshot = () => window.location.hash;
const getServerSnapshot = () => "";

export function Tabs({
  items,
  ariaLabel,
  className = "",
}: {
  items: TabItem[];
  /** Names the tablist for screen readers. */
  ariaLabel: string;
  className?: string;
}) {
  const hash = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const fromHash = items.findIndex((item) => `#${item.id}` === hash);
  const active = fromHash >= 0 ? fromHash : 0;

  const select = useCallback(
    (i: number) => {
      // replaceState rather than assigning location.hash: assigning would make
      // the browser jump the page to the anchor on every tab click.
      window.history.replaceState(null, "", `#${items[i]!.id}`);
      emit();
    },
    [items],
  );

  function onKeyDown(e: React.KeyboardEvent) {
    const last = items.length - 1;
    let next: number | null = null;
    if (e.key === "ArrowRight") next = active === last ? 0 : active + 1;
    if (e.key === "ArrowLeft") next = active === 0 ? last : active - 1;
    if (e.key === "Home") next = 0;
    if (e.key === "End") next = last;
    if (next === null) return;
    e.preventDefault();
    select(next);
    tabRefs.current[next]?.focus();
  }

  return (
    <div className={`Tabs ${className}`.trim()}>
      {/* Zero height scroll targets, so `#<id>` both lands here and opens the
          matching tab. They sit above the strip so the tabs stay in view. */}
      {items.map((item) => (
        <span
          key={item.id}
          id={item.id}
          aria-hidden="true"
          className="TabAnchor block scroll-mt-28"
        />
      ))}

      <div
        role="tablist"
        aria-label={ariaLabel}
        onKeyDown={onKeyDown}
        className="TabList flex gap-1"
      >
        {items.map((item, i) => {
          const selected = i === active;
          return (
            <button
              key={item.id}
              ref={(el) => {
                tabRefs.current[i] = el;
              }}
              type="button"
              role="tab"
              id={`tab-${item.id}`}
              aria-selected={selected}
              aria-controls={`panel-${item.id}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => select(i)}
              aria-label={item.label}
              className={`Tab border-n4 focus-visible:ring-s4 flex items-center gap-2 rounded-t-2xl border border-b-0 px-4 py-3 text-base font-semibold whitespace-nowrap transition-colors duration-300 focus-visible:ring-2 focus-visible:outline-none md:px-5 ${
                selected
                  ? "bg-n0 text-p4 relative z-10 -mb-px"
                  : "bg-n2 text-g3 hover:bg-n3 hover:text-p4"
              }`}
            >
              {/* The icon is the first thing to go on a narrow screen: it is
                  decoration, and the label is the thing being chosen. */}
              {item.icon && (
                <span className="TabIcon hidden shrink-0 sm:flex">
                  {item.icon}
                </span>
              )}
              {item.shortLabel && (
                <span className="TabLabelShort sm:hidden">
                  {item.shortLabel}
                </span>
              )}
              <span
                className={item.shortLabel ? "TabLabel hidden sm:inline" : ""}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>

      {items.map((item, i) => (
        <div
          key={item.id}
          role="tabpanel"
          id={`panel-${item.id}`}
          aria-labelledby={`tab-${item.id}`}
          hidden={i !== active}
          // The floor keeps the frame from collapsing around a short panel and
          // takes some of the jump out of switching between panels of very
          // different heights.
          className="TabPanel bg-n0 border-n4 shadow-theme rounded-b-2xl rounded-tr-2xl border p-6 md:min-h-[28rem] md:p-8"
        >
          {item.content}
        </div>
      ))}
    </div>
  );
}
