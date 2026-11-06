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
import { bepaalMarkering, bepaalRoute, optieLabels } from "@/components/slagingscheck/questions";
import type { Antwoorden } from "@/components/slagingscheck/types";

/** Zet de antwoorden om naar een databaseregel. */
function naarRij(a: Antwoorden): AanvraagInsert {
  return {
    route: bepaalRoute(a),
    markering: bepaalMarkering(a),

    voor_wie: a.voorWie ?? "ouder",
    klas: a.klas ?? "anders",
    cijfer: a.cijfer ?? null,
    grootste_probleem: a.grootsteProbleem ?? [],
    ouder_pijn: a.ouderPijn ?? [],

    gevraagd_niveau: a.gevraagdNiveau ?? null,
    gevraagde_vakken: a.gevraagdeVakken ?? [],
    gevraagd_vak_anders: a.gevraagdVakAnders || null,

    naam: a.naam ?? "",
    email: a.email ?? "",
    telefoon: a.telefoon || null,
    naam_leerling: a.naamLeerling || null,
    // De droom-vraag heeft geen eigen kolom; zo hoeft de database niet te wijzigen.
    opmerking: a.droom ? `Het mooiste na het slagen: ${optieLabels("droom", [a.droom], a)[0]}` : null,
  };
}

/** Bewaart een Slagingscheck-aanvraag. Geeft terug of het gelukt is. */
export async function bewaarAanvraag(a: Antwoorden): Promise<boolean> {
  if (!supabaseBeschikbaar()) {
    console.warn(
      "[opslag] Supabase niet ingesteld — aanvraag NIET bewaard. " +
        "Ontbrekend: NEXT_PUBLIC_SUPABASE_URL en/of NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY.",
    );
    return false;
  }
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
  if (!supabaseBeschikbaar()) {
    console.warn("[opslag] Supabase niet ingesteld — bericht NIET bewaard.");
    return false;
  }
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
