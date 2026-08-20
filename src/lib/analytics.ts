/**
 * Dunne meetlaag.
 *
 * De componenten roepen alleen `track()` aan. Wil je later Plausible, GA4 of
 * iets anders aanhangen, dan pas je uitsluitend dit bestand aan.
 */

export type Gebeurtenis =
  | "slagingscheck_start"
  | "slagingscheck_step_view"
  | "slagingscheck_submit"
  | "slagingscheck_exit";

type Eigenschappen = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    plausible?: (naam: string, opties?: { props: Eigenschappen }) => void;
  }
}

export function track(gebeurtenis: Gebeurtenis, eigenschappen: Eigenschappen = {}) {
  if (typeof window === "undefined") return;

  // Zolang er nog geen analyticsdienst hangt, blijft dit stil in productie en
  // zichtbaar tijdens ontwikkeling.
  if (process.env.NODE_ENV === "development") {
    console.debug("[track]", gebeurtenis, eigenschappen);
  }

  window.plausible?.(gebeurtenis, { props: eigenschappen });
  window.dataLayer?.push({ event: gebeurtenis, ...eigenschappen });
}
