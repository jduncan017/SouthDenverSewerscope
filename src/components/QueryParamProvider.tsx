"use client";

import {
  createContext,
  useContext,
  useSyncExternalStore,
  type ReactNode,
} from "react";

const QueryParamContext = createContext<string>("");

/*
 * The query string is external state that exists on the client and not on the
 * server, which is exactly what useSyncExternalStore is for: React renders the
 * server snapshot ("") during hydration and swaps in the real value after,
 * without a mismatch and without a setState inside an effect.
 *
 * Captured once at module level rather than read per call, so it survives
 * client navigation that would otherwise drop the params from the URL. The
 * snapshot must also be referentially stable, or React would re-render forever.
 */
let captured: string | null = null;

function getSnapshot() {
  captured ??= window.location.search.replace(/^\?/, "");
  return captured;
}

// The value never changes after first load, so there is nothing to subscribe to.
const subscribe = () => () => {};
const getServerSnapshot = () => "";

/**
 * Returns the stored query string (without leading "?") captured on first load.
 * Append this to internal navigation to carry UTM / gclid / tracking params
 * across pages. This site runs Google Ads traffic, so keeping those params
 * attached through every click is what makes conversion attribution work.
 */
export function usePersistedQueryString() {
  return useContext(QueryParamContext);
}

/**
 * Given an internal path (e.g. "/privacy") and the persisted query string,
 * returns the path with query params appended. Fragment-only hrefs ("#pricing")
 * are left alone — appending a query to a bare hash would reload the page.
 */
export function appendQueryString(path: string, qs: string) {
  if (!qs || path.startsWith("#")) return path;
  const separator = path.includes("?") ? "&" : "?";
  return `${path}${separator}${qs}`;
}

export function QueryParamProvider({ children }: { children: ReactNode }) {
  // Read from window.location rather than useSearchParams() so this root
  // provider does not opt the whole client tree out of static rendering, which
  // keeps interactive sections in the server HTML (SEO + faster first paint).
  const persisted = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );

  return (
    <QueryParamContext.Provider value={persisted}>
      {children}
    </QueryParamContext.Provider>
  );
}
