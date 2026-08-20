/**
 * Stelt de gepersonaliseerde oudergids samen uit de losse blokken.
 *
 * Volgorde: opening (op cijfer) → drie vaste tips → maximaal twee modules
 * (in de volgorde waarin de ouder ze aanvinkte) → eventueel de faalangstmodule
 * → afsluiting. Vult de leerling zelf in, dan komt er een kortere gids in
 * je-vorm, gericht op wat de leerling deze week zelf kan doen.
 */

import type { Antwoorden } from "@/components/slagingscheck/types";
import { afsluiting, faalangst, leerlingGids, modules, openingen, tips } from "./blokken";
import type { Blok, Gids } from "./types";

export type { Blok, Gids, Regel } from "./types";
export { delen } from "./types";

const vakNamen: Record<string, string> = {
  wiskunde_a: "wiskunde A",
  wiskunde_b: "wiskunde B",
  wiskunde_c: "wiskunde C",
  wiskunde_d: "wiskunde D",
};

// We vragen een bandbreedte, geen exact cijfer — dus noemen we ook een
// bandbreedte terug. Een verzonnen "5,2" zou de ouder meteen opvallen.
const cijferNamen: Record<string, string> = {
  onder_4: "onder de 4",
  "4_5": "tussen de 4 en 5",
  "5_55": "tussen de 5 en 5,5",
  "55_65": "tussen de 5,5 en 6,5",
  boven_65: "boven de 6,5",
};

const niveauNamen: Record<string, string> = {
  examen_havo: "HAVO",
  examen_vwo: "VWO",
};

/** Vult {leerling}, {vak}, {cijfer} en {niveau} in, met nette terugvallen. */
function vulIn(tekst: string, a: Antwoorden): string {
  // Vult de leerling zelf in, dan staat zijn naam in `naam` en niet in `naamLeerling`.
  const eigenVoornaam = a.naam?.trim().split(" ")[0];
  const leerling =
    a.naamLeerling?.trim() ||
    (a.voorWie === "leerling" ? eigenVoornaam || "je" : "uw kind");
  return tekst
    .replaceAll("{leerling}", leerling)
    .replaceAll("{vak}", (a.vak && vakNamen[a.vak]) || "wiskunde")
    .replaceAll("{cijfer}", (a.cijfer && cijferNamen[a.cijfer]) || "rond de streep")
    .replaceAll("{niveau}", (a.klas && niveauNamen[a.klas]) || "examen");
}

function persoonlijk(blok: Blok, a: Antwoorden): Blok {
  return {
    ...blok,
    kop: blok.kop ? vulIn(blok.kop, a) : undefined,
    regels: blok.regels.map((r) => ({ ...r, tekst: vulIn(r.tekst, a) })),
  };
}

function kiesOpening(a: Antwoorden): Blok {
  if (a.cijfer === "onder_4" || a.cijfer === "4_5") return openingen.laag;
  if (a.cijfer === "boven_65") return openingen.hoog;
  return openingen.midden;
}

/**
 * De gids hoort bij de hoofdroute. Wie via een zijroute binnenkomt, krijgt geen
 * gids — daar past een kort, eerlijk bevestigingsscherm beter.
 */
export function assemble(a: Antwoorden): Gids | null {
  if (a.klas === "voorexamen" || a.klas === "anders" || a.vak === "ander_vak") return null;

  if (a.voorWie === "leerling") {
    return {
      titel: "Wat je deze week al kunt doen",
      blokken: leerlingGids.map((b) => persoonlijk(b, a)),
    };
  }

  const gekozenModules = (a.ouderPijn ?? [])
    .map((sleutel) => modules[sleutel])
    .filter((m): m is Blok => Boolean(m))
    .slice(0, 2);

  const blokken: Blok[] = [
    kiesOpening(a),
    ...tips,
    ...gekozenModules,
    ...((a.grootsteProbleem ?? []).includes("faalangst") ? [faalangst] : []),
    afsluiting,
  ];

  return {
    titel: "Wat u deze week al kunt doen — zonder dat het ruzie wordt",
    blokken: blokken.map((b) => persoonlijk(b, a)),
  };
}
