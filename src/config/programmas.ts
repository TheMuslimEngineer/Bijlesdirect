/**
 * De programmaladder — alle programma's van Bijlesdirect.
 *
 * ▸ Allemaal op dezelfde methode: groepjes van 5, diagnose vooraf, vaste docent.
 *   Alleen duur, tempo en belofte verschillen.
 *
 * ▸ Zet `actief: false` om een programma te tonen als "volgend seizoen".
 *   Zo staat de ladder er wel, zonder iets te beloven wat nog niet wordt geleverd.
 */

export type GarantieNiveau = "tevredenheid" | "voortgang" | "resultaat";

export type ProgrammaItem = {
  slug: string;
  naam: string;
  periode: string;
  duur: string;
  prijs: number;
  /** Eén zin: voor wie is dit en wat levert het op. */
  belofte: string;
  garantie: GarantieNiveau;
  /** Staat dit programma dit seizoen open voor inschrijving? */
  actief: boolean;
  /** Het vlaggenschip — krijgt extra nadruk. */
  vlaggenschip?: boolean;
  /** Instapprogramma — lage drempel, eerste kennismaking. */
  instap?: boolean;
  href?: string;
};

export const garantieLabels: Record<GarantieNiveau, { label: string; uitleg: string }> = {
  tevredenheid: {
    label: "Tevredenheidsgarantie",
    uitleg:
      "Niet tevreden na de eerste week? Dan betalen we het volledige bedrag terug, zonder gedoe.",
  },
  voortgang: {
    label: "Voortgangsgarantie",
    uitleg:
      "Meetbare vooruitgang op de hertoets, of we trainen kosteloos door tot die vooruitgang er wel is.",
  },
  resultaat: {
    label: "Slagingsgarantie",
    uitleg:
      "Slaagt uw kind niet, dan trainen we gratis door tot de herkansing. Lukt het dan nog niet, dan krijgt u uw geld terug.",
  },
};

export const programmas: ProgrammaItem[] = [
  {
    slug: "toetsweek-sprint",
    naam: "Toetsweek Sprint",
    periode: "3× per jaar",
    duur: "2 weken",
    prijs: 395,
    belofte:
      "Gericht naar één toetsweek toewerken. De laagdrempelige manier om te ervaren hoe wij werken.",
    garantie: "tevredenheid",
    actief: true,
    instap: true,
  },
  {
    slug: "zomer-opfris",
    naam: "Zomer Opfris",
    periode: "juli / augustus",
    duur: "3 weken",
    prijs: 795,
    belofte:
      "De zomer gebruiken om achterstand weg te werken, zodat het nieuwe schooljaar met een schone lei begint.",
    garantie: "tevredenheid",
    actief: false,
  },
  {
    slug: "inhaalprogramma",
    naam: "Inhaalprogramma klas 4/5",
    periode: "2 groepen per jaar",
    duur: "10 weken",
    prijs: 995,
    belofte:
      "De gaten dichten vóór het examenjaar begint — zodat uw kind niet met achterstand aan het laatste jaar start.",
    garantie: "voortgang",
    actief: false,
  },
  {
    slug: "examenjaar-fundament",
    naam: "Examenjaar Fundament",
    periode: "september – kerst",
    duur: "14 weken",
    prijs: 1450,
    belofte:
      "Het examenjaar goed beginnen: eerst de basis stevig maken, ruim vóór de examenstress toeslaat.",
    garantie: "voortgang",
    actief: false,
  },
  {
    slug: "slagingsprogramma",
    naam: "Het Wiskunde Slagingsprogramma",
    periode: "februari – examen",
    duur: "12 weken",
    prijs: 2450,
    belofte:
      "Het volledige traject naar een voldoende op het eindexamen — met slagingsgarantie.",
    garantie: "resultaat",
    actief: true,
    vlaggenschip: true,
    href: "/slagingsprogramma",
  },
  {
    slug: "herkansingssprint",
    naam: "Herkansingssprint",
    periode: "juni",
    duur: "2,5 week",
    prijs: 895,
    belofte:
      "Alles op alles voor de herkansing. Kort, gericht en volledig op het examen toegespitst.",
    garantie: "tevredenheid",
    actief: true,
  },
];

/**
 * Weergavevolgorde: begint bij het eindpunt (herkansing en examen) en werkt
 * terug naar de vroegste voorbereiding. Zo staat het zwaarste programma bovenaan.
 */
export const programmasOpVolgorde = [
  "herkansingssprint",
  "slagingsprogramma",
  "toetsweek-sprint",
  "inhaalprogramma",
  "examenjaar-fundament",
  "zomer-opfris",
]
  .map((slug) => programmas.find((p) => p.slug === slug))
  .filter((p): p is ProgrammaItem => Boolean(p));

export const actieveProgrammas = programmas.filter((p) => p.actief);
export const komendeProgrammas = programmas.filter((p) => !p.actief);
