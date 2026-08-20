/**
 * De Slagingscheck — datamodel.
 *
 * Eén antwoordobject dat door de hele stroom wordt meegedragen. Welke velden
 * gevuld zijn hangt af van de route: de hoofdroute levert een volledig profiel,
 * de zijroutes alleen wat nodig is om de vraag te meten en contact te houden.
 */

/** Welke weg de invuller door het formulier neemt. Afgeleid uit de antwoorden. */
export type Route = "hoofdroute" | "inhaalprogramma" | "ander_vak" | "ander_niveau";

/** Bepaalt de aanspreekvorm in álle volgende schermen. */
export type VoorWie = "ouder" | "leerling";

export type Klas = "examen_havo" | "examen_vwo" | "voorexamen" | "anders";
export type Vak = "wiskunde_a" | "wiskunde_b" | "wiskunde_c" | "wiskunde_d" | "ander_vak";
export type Cijfer = "onder_4" | "4_5" | "5_55" | "55_65" | "boven_65";
export type Sinds = "dit_jaar" | "langer_dan_jaar" | "sinds_onderbouw";
export type Doel = "numerus_fixus" | "beta_studie" | "hoog_slagen";
export type EerderBijles = "nee" | "ja_hielp_niet" | "ja_hielp_wel";
export type Beschikbaarheid = "overdag" | "avond" | "weekend" | "maakt_niet_uit";
export type GevraagdNiveau =
  | "vmbo_bb"
  | "vmbo_kb"
  | "vmbo_gl"
  | "vmbo_tl"
  | "mbo"
  | "onderbouw"
  | "anders";

export type Antwoorden = {
  voorWie?: VoorWie;
  klas?: Klas;
  vak?: Vak;
  cijfer?: Cijfer;

  // hoofdroute
  sinds?: Sinds; // alleen bij cijfer onder_4 | 4_5
  doel?: Doel; // alleen bij cijfer boven_65
  eerderBijles?: EerderBijles;
  watWerkteNiet?: string[]; // alleen bij ja_hielp_niet
  watWerkteNietAnders?: string;
  grootsteProbleem?: string[];
  ouderPijn?: string[]; // alleen bij voorWie === 'ouder'
  beschikbaarheid?: Beschikbaarheid;

  // zijroute D — ander vak (vraagregistratie voor toekomstige uitbreiding)
  gevraagdeVakken?: string[];
  gevraagdVakAnders?: string;
  wilAanbeveling?: boolean;

  // zijroute E — ander niveau
  gevraagdNiveau?: GevraagdNiveau;

  // altijd
  naam?: string;
  email?: string;
  telefoon?: string;
  naamLeerling?: string;
  school?: string;
  opmerking?: string;

  // anti-spam
  website?: string;
};

/** Interne markering voor de notificatiemail — bepaalt hoe Adam het gesprek voorbereidt. */
export type Markering = "extra_screening" | "premium_kandidaat" | null;

/** Tekst die verschilt per aanspreekvorm. Eén string = geldt voor beide. */
export type Tekst = string | { u: string; je: string };

export function tekst(t: Tekst, voorWie: VoorWie = "ouder"): string {
  return typeof t === "string" ? t : voorWie === "ouder" ? t.u : t.je;
}

export type Optie = {
  waarde: string;
  label: Tekst;
  /** Toont een vrij tekstveld zodra deze optie is gekozen. */
  vrijeTekst?: boolean;
};

export type StapId =
  // hoofdroute
  | "voor_wie"
  | "klas"
  | "vak"
  | "cijfer"
  | "sinds"
  | "doel"
  | "eerder_bijles"
  | "wat_werkte_niet"
  | "grootste_probleem"
  | "ouder_pijn"
  | "contact"
  | "beschikbaarheid"
  // zijroute A — klas 4/5
  | "inhaal_bericht"
  | "inhaal_contact"
  // zijroute D — ander vak
  | "vak_bericht"
  | "gevraagde_vakken"
  | "vak_cijfer"
  | "vak_contact"
  // zijroute E — ander niveau
  | "niveau_bericht"
  | "gevraagd_niveau"
  | "niveau_vak"
  | "niveau_contact";

export type Stap =
  | {
      id: StapId;
      soort: "keuze"; // enkelvoudig — klikken slaat op en gaat door
      vraag: Tekst;
      toelichting?: Tekst;
      opties: Optie[];
      veld: keyof Antwoorden;
    }
  | {
      id: StapId;
      soort: "meerkeuze"; // meerdere antwoorden, expliciete Verder-knop
      vraag: Tekst;
      toelichting?: Tekst;
      opties: Optie[];
      veld: keyof Antwoorden;
      andersVeld?: keyof Antwoorden;
    }
  | {
      id: StapId;
      soort: "bericht"; // eerlijk tussenscherm bij een zijroute
      vraag: Tekst;
      alinea: Tekst[];
      knop: Tekst;
      /** Optionele tweede knop die naar een pagina op de site leidt. */
      link?: { label: Tekst; href: string };
    }
  | {
      id: StapId;
      soort: "contact";
      vraag: Tekst;
      toelichting?: Tekst;
      /** Welke velden dit scherm toont; de hoofdroute vraagt meer dan de zijroutes. */
      velden: ContactVeld[];
      knop: Tekst;
      /** Extra vinkje onderaan (zijroute D). */
      vinkje?: { veld: keyof Antwoorden; label: Tekst };
    }
  | {
      id: StapId;
      soort: "afsluiting"; // laatste scherm vóór verzenden
      vraag: Tekst;
      opties: Optie[];
      veld: keyof Antwoorden;
      opmerkingLabel: Tekst;
      knop: Tekst;
    };

export type ContactVeld = {
  naam: keyof Antwoorden;
  label: Tekst;
  type: "text" | "email" | "tel";
  autoComplete?: string;
  placeholder?: string;
  verplicht: boolean;
  /**
   * Toon dit veld alleen bij deze aanspreekvorm. Weglaten = altijd tonen.
   * Nodig omdat de ouder én zichzelf én de leerling invult, terwijl de
   * leerling die het zelf doet maar één naam heeft.
   */
  alleenVoor?: VoorWie;
};

/** De velden die bij deze aanspreekvorm horen. */
export function zichtbareVelden(velden: ContactVeld[], voorWie: VoorWie): ContactVeld[] {
  return velden.filter((v) => !v.alleenVoor || v.alleenVoor === voorWie);
}
