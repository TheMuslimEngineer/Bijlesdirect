/**
 * De Slagingscheck — datamodel.
 *
 * Eén antwoordobject dat door de hele stroom wordt meegedragen. Dit formulier
 * vraagt bewust weinig: vak, eerdere bijles, school en voorkeursmoment vraagt
 * Adam in het gesprek.
 */

/** Welke weg de invuller door het formulier neemt. Afgeleid uit de antwoorden. */
export type Route = "hoofdroute" | "inhaalprogramma" | "ander_niveau";

/** Bepaalt de aanspreekvorm in álle volgende schermen. */
export type VoorWie = "ouder" | "leerling";

export type Klas = "examen_havo" | "examen_vwo" | "voorexamen" | "anders";
export type Cijfer = "onder_4" | "4_5" | "5_55" | "55_65" | "boven_65";
export type Droom = "rust" | "zelfvertrouwen" | "toekomst" | "last";
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
  naamLeerling?: string; // bij de ouder al vroeg gevraagd, zodat de vragen persoonlijk worden
  klas?: Klas;
  cijfer?: Cijfer;

  // hoofdroute
  ouderPijn?: string[]; // alleen bij voorWie === 'ouder'
  grootsteProbleem?: string[]; // alleen bij voorWie === 'leerling'
  droom?: Droom;

  // zijroute: ander niveau of ander vak (vraagregistratie voor later)
  gevraagdNiveau?: GevraagdNiveau;
  gevraagdeVakken?: string[];
  gevraagdVakAnders?: string;

  // altijd
  naam?: string;
  email?: string;
  telefoon?: string;

  // anti-spam
  website?: string;
};

/** Interne markering voor de notificatiemail — bepaalt hoe Adam het gesprek voorbereidt. */
export type Markering = "extra_screening" | "premium_kandidaat" | null;

/**
 * Tekst die verschilt per aanspreekvorm. Eén string = geldt voor beide.
 * `{kind}` wordt de voornaam van het kind, zie `persoonlijk`.
 */
export type Tekst = string | { u: string; je: string };

export function tekst(t: Tekst, voorWie: VoorWie = "ouder"): string {
  return typeof t === "string" ? t : voorWie === "ouder" ? t.u : t.je;
}

/** De voornaam zoals we hem aanspreken, ook als de ouder hem met een kleine letter typte. */
export function voornaamKind(a: Antwoorden): string {
  const voornaam = a.naamLeerling?.trim().split(/\s+/)[0];
  if (!voornaam) return "uw kind";
  return voornaam.charAt(0).toUpperCase() + voornaam.slice(1);
}

/** De tekst voor deze invuller: juiste aanspreekvorm, met de naam van het kind erin. */
export function persoonlijk(t: Tekst, a: Antwoorden): string {
  return tekst(t, a.voorWie ?? "ouder").replaceAll("{kind}", voornaamKind(a));
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
  | "naam_kind"
  | "klas"
  | "landelijk"
  | "cijfer"
  | "grafiek"
  | "ouder_pijn"
  | "geruststelling"
  | "grootste_probleem"
  | "droom"
  | "contact"
  // zijroute — klas 4/5
  | "inhaal_bericht"
  | "inhaal_contact"
  // zijroute — ander niveau of ander vak
  | "niveau_bericht"
  | "gevraagd_niveau"
  | "niveau_vak"
  | "niveau_contact";

/** Korte zin boven de vraag die reageert op het vorige antwoord. */
type Reactie = (a: Antwoorden) => Tekst;

export type Stap =
  | {
      id: StapId;
      soort: "keuze"; // enkelvoudig — klikken slaat op en gaat door
      vraag: Tekst;
      toelichting?: Tekst;
      reactie?: Reactie;
      opties: Optie[];
      veld: keyof Antwoorden;
    }
  | {
      id: StapId;
      soort: "meerkeuze"; // meerdere antwoorden, expliciete Verder-knop
      vraag: Tekst;
      toelichting?: Tekst;
      reactie?: Reactie;
      opties: Optie[];
      veld: keyof Antwoorden;
      andersVeld?: keyof Antwoorden;
    }
  | {
      id: StapId;
      soort: "statistiek"; // landelijke cijfers na de klasvraag; de inhoud volgt uit de klas
      knop: Tekst;
    }
  | {
      id: StapId;
      soort: "grafiek"; // persoonlijke grafiek: waar het kind nu staat en waar het naartoe kan
      vraag: Tekst;
      toelichting?: Tekst;
      reactie?: Reactie;
      /** Eerlijke kanttekening onder de grafiek. */
      noot: Tekst;
      /** Waar het getal vandaan komt, klein onderaan. */
      bron: Tekst;
      knop: Tekst;
    }
  | {
      id: StapId;
      soort: "geruststelling"; // na de ouderpijn: wat wij doen aan precies die zorgen
      vraag: Tekst;
      toelichting?: Tekst;
      reactie?: Reactie;
      /** Persoonlijke zin van Adam onderaan, met zijn foto. */
      citaat: Tekst;
      afzender: string;
      knop: Tekst;
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
      reactie?: Reactie;
      /** Welke velden dit scherm toont. */
      velden: ContactVeld[];
      knop: Tekst;
    };

export type ContactVeld = {
  naam: keyof Antwoorden;
  label: Tekst;
  type: "text" | "email" | "tel";
  autoComplete?: string;
  placeholder?: string;
  verplicht: boolean;
};
