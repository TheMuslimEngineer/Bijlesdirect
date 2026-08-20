/**
 * Tussenopslag van een half ingevuld formulier.
 *
 * Ouders vullen dit vaak op de telefoon in, tussen twee dingen door. Wie
 * terugkomt, hoeft niet opnieuw te beginnen. Na verzenden wissen we alles.
 */

import type { Antwoorden, StapId } from "./types";

const SLEUTEL = "bijlesdirect.slagingscheck.v1";
const HOUDBAAR_MS = 1000 * 60 * 60 * 24 * 7; // een week

type Bewaard = {
  antwoorden: Antwoorden;
  stap: StapId;
  opgeslagenOp: number;
};

export function bewaar(antwoorden: Antwoorden, stap: StapId) {
  if (typeof window === "undefined") return;
  try {
    const payload: Bewaard = { antwoorden, stap, opgeslagenOp: Date.now() };
    window.localStorage.setItem(SLEUTEL, JSON.stringify(payload));
  } catch {
    // Privémodus of vol geheugen — niet erg, het formulier werkt gewoon door.
  }
}

export function herstel(): { antwoorden: Antwoorden; stap: StapId } | null {
  if (typeof window === "undefined") return null;
  try {
    const ruw = window.localStorage.getItem(SLEUTEL);
    if (!ruw) return null;
    const bewaard = JSON.parse(ruw) as Bewaard;
    if (!bewaard?.stap || typeof bewaard.antwoorden !== "object") return null;
    if (Date.now() - bewaard.opgeslagenOp > HOUDBAAR_MS) {
      wis();
      return null;
    }
    return { antwoorden: bewaard.antwoorden, stap: bewaard.stap };
  } catch {
    return null;
  }
}

export function wis() {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(SLEUTEL);
  } catch {
    // niets aan te doen
  }
}
