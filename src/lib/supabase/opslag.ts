/**
 * Inzendingen wegschrijven naar de database.
 *
 * Uitgangspunt: dit mag nóóit een aanvraag tegenhouden. De notificatiemail is
 * het kritieke pad — zo werkt Adam in de praktijk. Gaat de database plat of
 * verandert er iets aan het schema, dan komt de lead nog steeds binnen en
 * loggen we hier alleen een fout. Daarom geeft niets uit dit bestand een
 * exception door naar de route-handler.
 */

import { maakServerClient, supabaseBeschikbaar } from "./server";
import type { AanvraagInsert, BerichtInsert } from "./types";
import { bepaalMarkering, bepaalRoute } from "@/components/slagingscheck/questions";
import type { Antwoorden } from "@/components/slagingscheck/types";

/** Zet de antwoorden om naar een databaseregel. */
function naarRij(a: Antwoorden): AanvraagInsert {
  return {
    route: bepaalRoute(a),
    markering: bepaalMarkering(a),

    voor_wie: a.voorWie ?? "ouder",
    klas: a.klas ?? "anders",
    vak: a.vak ?? null,
    cijfer: a.cijfer ?? null,
    sinds: a.sinds ?? null,
    doel: a.doel ?? null,
    eerder_bijles: a.eerderBijles ?? null,
    wat_werkte_niet: a.watWerkteNiet ?? [],
    wat_werkte_niet_anders: a.watWerkteNietAnders || null,
    grootste_probleem: a.grootsteProbleem ?? [],
    ouder_pijn: a.ouderPijn ?? [],
    beschikbaarheid: a.beschikbaarheid ?? null,

    gevraagd_niveau: a.gevraagdNiveau ?? null,
    gevraagde_vakken: a.gevraagdeVakken ?? [],
    gevraagd_vak_anders: a.gevraagdVakAnders || null,
    wil_aanbeveling: a.wilAanbeveling ?? false,

    naam: a.naam ?? "",
    email: a.email ?? "",
    telefoon: a.telefoon || null,
    naam_leerling: a.naamLeerling || null,
    school: a.school || null,
    opmerking: a.opmerking || null,
  };
}

/** Bewaart een Slagingscheck-aanvraag. Geeft terug of het gelukt is. */
export async function bewaarAanvraag(a: Antwoorden): Promise<boolean> {
  if (!supabaseBeschikbaar()) return false;
  try {
    const supabase = await maakServerClient();
    const { error } = await supabase.from("slagingscheck_aanvragen").insert(naarRij(a));
    if (error) {
      console.error("[opslag] aanvraag niet bewaard:", error.message);
      return false;
    }
    return true;
  } catch (err) {
    console.error("[opslag] onverwachte fout bij bewaren aanvraag:", err);
    return false;
  }
}

/** Bewaart een contactbericht of docent-aanmelding. */
export async function bewaarBericht(bericht: BerichtInsert): Promise<boolean> {
  if (!supabaseBeschikbaar()) return false;
  try {
    const supabase = await maakServerClient();
    const { error } = await supabase.from("berichten").insert(bericht);
    if (error) {
      console.error("[opslag] bericht niet bewaard:", error.message);
      return false;
    }
    return true;
  } catch (err) {
    console.error("[opslag] onverwachte fout bij bewaren bericht:", err);
    return false;
  }
}
