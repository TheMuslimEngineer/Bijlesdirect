/**
 * De oudergids — bouwstenen.
 *
 * De gids wordt na het verzenden meteen op het scherm getoond én per e-mail
 * nagestuurd. Beide gebruiken dezelfde blokken, zodat de tekst op één plek staat.
 *
 * In `tekst` mag `**vet**` staan; `regels()` splitst dat uit zodat zowel React
 * als de e-mail-HTML het kan weergeven zonder markdown-bibliotheek.
 */

export type Regel =
  | { soort: "alinea"; tekst: string }
  | { soort: "sub"; tekst: string } // tussenkopje binnen een blok
  | { soort: "citaat"; tekst: string } // de zin die u letterlijk kunt zeggen
  | { soort: "noot"; tekst: string }; // terzijde over onze eigen aanpak

export type Blok = {
  id: string;
  kop?: string;
  regels: Regel[];
};

export type Gids = {
  titel: string;
  blokken: Blok[];
};

/** Splitst `**vet**` uit een regel, voor React en voor de e-mail. */
export function delen(tekst: string): { vet: boolean; tekst: string }[] {
  return tekst
    .split(/(\*\*[^*]+\*\*)/g)
    .filter(Boolean)
    .map((deel) =>
      deel.startsWith("**") && deel.endsWith("**")
        ? { vet: true, tekst: deel.slice(2, -2) }
        : { vet: false, tekst: deel },
    );
}
