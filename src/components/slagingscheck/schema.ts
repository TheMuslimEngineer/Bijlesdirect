/**
 * Eén validatieschema, gebruikt door zowel het formulier als de API-route.
 *
 * De vragen zelf zijn los gevalideerd (je kunt geen antwoord geven dat niet in
 * `questions.ts` staat), dus hier bewaken we vooral de vrije invoer: naam,
 * e-mail, telefoon en de open velden.
 */

import { z } from "zod";

const kort = (max: number) => z.string().trim().max(max);
const optioneel = (max: number) => kort(max).optional().or(z.literal(""));

export const slagingscheckSchema = z.object({
  // Antwoorden op de gesloten vragen — vrij van vorm, want de bron is een
  // vaste optielijst. De server zet ze om naar leesbare tekst via `leesbaar`.
  voorWie: z.enum(["ouder", "leerling"]),
  klas: z.enum(["examen_havo", "examen_vwo", "voorexamen", "anders"]),
  cijfer: z.enum(["onder_4", "4_5", "5_55", "55_65", "boven_65"]).optional(),
  droom: z.enum(["rust", "zelfvertrouwen", "toekomst", "last"]).optional(),
  gevraagdNiveau: z
    .enum(["vmbo_bb", "vmbo_kb", "vmbo_gl", "vmbo_tl", "mbo", "onderbouw", "anders"])
    .optional(),

  grootsteProbleem: z.array(kort(60)).max(10).optional(),
  ouderPijn: z.array(kort(60)).max(10).optional(),
  gevraagdeVakken: z.array(kort(60)).max(20).optional(),
  gevraagdVakAnders: optioneel(200),

  // Contactgegevens
  naam: kort(120).min(1, "Vul uw naam in."),
  email: kort(160).email("Dit e-mailadres klopt niet. Kijk het nog even na."),
  telefoon: optioneel(40),
  naamLeerling: optioneel(120),

  // Anti-spam — echte bezoekers laten dit leeg.
  website: z.string().optional(),
});

export type SlagingscheckInvoer = z.infer<typeof slagingscheckSchema>;

/** Nederlandse foutmelding bij een mislukte validatie, zonder zod-jargon. */
export function eersteFoutmelding(fout: z.ZodError): string {
  const issue = fout.issues[0];
  const labels: Record<string, string> = {
    naam: "uw naam",
    email: "een geldig e-mailadres",
    telefoon: "een telefoonnummer",
    naamLeerling: "de voornaam van uw kind",
  };
  const ruw = issue?.message ?? "";
  const technisch = /expected|received|invalid|too big|too small|nan|required/i.test(ruw);
  const veld = typeof issue?.path?.[0] === "string" ? issue.path[0] : "";
  if (ruw && !technisch) return ruw;
  return `Vul ${labels[veld] ?? "alle verplichte velden"} in.`;
}
