/**
 * Examenklaar, het enige aanbod van ExamenDocent — centrale configuratie.
 *
 * ▸ Dit is de enige plek waar prijzen, plekken en data staan.
 *   Pas hier aan en de hele website volgt automatisch.
 */

/**
 * ═══════════════════════════════════════════════════════════════
 * SEIZOEN — dit wisselt per schooljaar. Pas het hier aan, nergens anders.
 * ═══════════════════════════════════════════════════════════════
 *
 * Elke verwijzing naar een maand of deadline op de site leest hieruit.
 * Schrijf in teksten dus nooit "februari", maar `seizoen.startMaand`.
 */
export const seizoen = {
  /** De maand waarin de eerstvolgende examengroep begint. */
  startMaand: "februari",
  start: "half februari",
  startVolledig: "half februari 2027",

  /** Tot wanneer men zich kan inschrijven voor die groep. */
  inschrijvingSluit: "1 februari",
  inschrijvingSluitVolledig: "1 februari 2027",
  /** Staat de inschrijving nu open? Op false zetten zodra de groep vol of begonnen is. */
  inschrijvingOpen: true,

  /** De examen- en herkansingsperiode van dit schooljaar. */
  examenMaand: "mei",
  herkansingMaand: "juni",
};

export const programma = {
  naam: "Examenklaar",
  subregel: "12 weken begeleiding op maat. Geslaagd, of uw geld terug.",

  duurWeken: 12,
  lesurenTotaal: 48,
  lessenPerWeek: 2,
  urenPerLes: 2,
  maxPerGroep: 5,

  /** Data komen uit `seizoen` hierboven — nooit hier hardcoden. */
  ...seizoen,
};

/**
 * Schaarste — werk `geboekt` bij zodra er een inschrijving binnenkomt, dan
 * telt de rest van de site vanzelf mee. Dit is de enige plek waar de
 * beschikbaarheid staat.
 *
 * Bewust `geboekt` (aantal inschrijvingen) en niet `beschikbaar` (aantal
 * vrije plekken): dat is het getal dat je zelf natuurlijk noemt ("er zijn nu
 * twee inschrijvingen"), en het voorkomt de omgekeerde fout — per ongeluk het
 * aantal boekingen invullen op de plek van het aantal vrije plekken.
 */
export const plekken = {
  // Groepsprogramma
  totaal: 20,
  groepen: 4,
  geboekt: 13,
  get beschikbaar() {
    return this.totaal - this.geboekt;
  },
  // Premium 1-op-1
  premiumTotaal: 3,
  premiumGeboekt: 1,
  get premiumBeschikbaar() {
    return this.premiumTotaal - this.premiumGeboekt;
  },
};

/**
 * Schaarste tonen we pas zodra er echt plekken bezet zijn.
 *
 * "Nog 20 van de 20 beschikbaar" leest namelijk als "niemand heeft geboekt" —
 * precies het tegenovergestelde van wat een schaarstemelding moet doen.
 */
export const toonSchaarste = {
  groep: plekken.beschikbaar < plekken.totaal,
  premium: plekken.premiumBeschikbaar < plekken.premiumTotaal,
};

export type SchaarsteNiveau = "groen" | "geel" | "rood";

/**
 * Kleur van het bolletje in de schaarste-pill, op basis van het aandeel
 * plekken dat nog vrij is — niet van het absolute aantal, zodat dit voor
 * het groepsprogramma (20) en Premium (3) allebei klopt.
 *
 *  > 40% nog vrij  → groen  (ruim plek)
 *  > 15% nog vrij  → geel   (wordt krap)
 * ≤ 15% nog vrij  → rood   (bijna vol)
 */
export function schaarsteNiveau(beschikbaar: number, totaal: number): SchaarsteNiveau {
  if (totaal <= 0) return "rood";
  const aandeel = beschikbaar / totaal;
  if (aandeel > 0.4) return "groen";
  if (aandeel > 0.15) return "geel";
  return "rood";
}

export type WaardeItem = {
  /** Stabiele sleutel — de volgorde in de lijst mag veranderen, deze niet. */
  id: string;
  titel: string;
  beschrijving: string;
  /**
   * Losse marktwaarde in euro's, of `null` als het onderdeel geen geloofwaardige
   * losse prijs heeft. Dan tonen we "Inbegrepen" in plaats van een bedrag.
   *
   * Vuistregel: elk bedrag moet je tegenover een ouder kunnen verdedigen met een
   * echte marktvergelijking. Eén ongeloofwaardig getal zet ook de geloofwaardige
   * getallen op losse schroeven.
   */
  waarde: number | null;
};

/**
 * De waardestapel — op volgorde van wat het meest waard is vóór de ouder,
 * niet op prijs en niet op onze interne opbouw.
 *
 * De redenering: eerst wat de uitslag bepaalt (de lessen), dan wat de uitslag
 * verzekert (het herkansingstraject), dan wat de ouder het zwaarste werk uit
 * handen neemt (de coach), dan wat de spanning wegneemt (faalangsttraining),
 * dan zicht op de voortgang (diagnose en ouderrapport), en pas daarna het gemak.
 */
export const waardestapel: WaardeItem[] = [
  {
    id: "examentraining",
    titel: "48 uur examentraining",
    beschrijving:
      "4 uur les per week van een afgestudeerde bèta-professional, geen student met een bijbaantje. De diagnostische toets bepaalt waar we beginnen: eerst de achterstand wegwerken, daarna pas de examenstof.",
    // 48 uur × €65 — marktconform uurtarief voor een bevoegde bèta-docent.
    waarde: 3120,
  },
  {
    id: "herkansing",
    titel: "Herkansingstraject bij zakken",
    beschrijving:
      "Slaagt uw kind niet, dan trainen we gratis door tot de herkansing in juni. Geen nieuwe factuur, geen nieuw gesprek. We gaan gewoon verder.",
    // Circa 14 uur doortrainen tot de herkansing, tegen hetzelfde uurtarief.
    waarde: 890,
  },
  {
    id: "coach",
    titel: "Persoonlijke Student Success Coach",
    beschrijving:
      "Maakt het studieplan, houdt de voortgang bij en spreekt uw kind elke week één-op-één. Zorgt dat de motivatie hoog blijft en is dagelijks bereikbaar via WhatsApp als uw kind vastloopt op een opgave.",
    // Twaalf wekelijkse 1-op-1 gesprekken plus studieplan en dagelijkse
    // bereikbaarheid; losse studiecoaching gaat voor €60–90 per uur.
    waarde: 950,
  },
  {
    id: "faalangst",
    titel: "Faalangst- en examenstresstraining",
    beschrijving:
      "Een korte module plus een persoonlijk belmoment vlak vóór het examen. Want kennis alleen is niet genoeg als je dichtklapt.",
    // Een losse faalangsttraining kost gemiddeld €395.
    waarde: 395,
  },
  {
    id: "diagnose",
    titel: "Diagnostische toets + hertoets na 6 weken",
    beschrijving:
      "Brengt precies in kaart waar de gaten zitten, bepaalt het niveau van uw kind, en meet halverwege zwart-op-wit de vooruitgang.",
    // Twee afnames inclusief analyse en terugkoppeling.
    waarde: 230,
  },
  {
    id: "ouderrapport",
    titel: "Wekelijks ouderrapport",
    beschrijving:
      "Elke week een kort, helder overzicht: wat is behandeld, hoe gaat het, en wat is de trend. U hoeft niets te vragen of te controleren.",
    // Tijdsinvestering van twaalf geschreven voortgangsrapportages.
    waarde: 150,
  },
  {
    id: "examen-ai",
    titel: "Onbeperkte toegang tot de examen-AI",
    beschrijving:
      "Getraind op duizenden examenvragen en getest door ons docententeam. Dag en nacht beschikbaar, twaalf weken lang.",
    // Circa €33 per maand over drie maanden. Bewust boven een algemeen
    // AI-abonnement (€20–25), want dit is een vakspecifiek examenmodel — maar
    // niet zo ver erboven dat een ouder het niet meer kan narekenen.
    waarde: 99,
  },
  {
    id: "opnames",
    titel: "Alle lessen opgenomen",
    beschrijving:
      "Ziek geweest of even een herhaling nodig? Uw kind kijkt elke les onbeperkt terug.",
    // Bewust laag gehouden: circa €20 per maand over drie maanden, het tarief
    // van een gewoon opnameabonnement. Het gaat hier wel om de eigen lessen van
    // uw kind, niet om algemene uitlegvideo's.
    waarde: 60,
  },
];

/**
 * Prijzen. Alle bedragen in hele euro's.
 *
 * Let op: 3 × €850 = €2.550, dus gespreid betalen is €100 duurder dan in één
 * keer. Daarom noemt de site bij de termijnen ook het totaal.
 */
export const prijzen = {
  programma: 2450,
  premium: 5950,
  termijnen: { aantal: 3, bedrag: 850 },
  /** Premium in termijnen: 3 × €1.983 = €5.949, dus niet duurder dan in één keer. */
  premiumTermijnen: { aantal: 3, bedrag: 1983 },
  /** Wat een ouder in totaal betaalt bij gespreid betalen. */
  get termijnenTotaal() {
    return this.termijnen.aantal * this.termijnen.bedrag;
  },
  /** Opgeteld uit de waardestapel, zodat het totaal nooit los kan lopen. */
  totaleWaarde: waardestapel.reduce((som, item) => som + (item.waarde ?? 0), 0),
  /** Losse marktwaarde van alleen de lesuren — gebruikt in de prijsvergelijking. */
  lesurenLosseWaarde: waardestapel.find((i) => i.id === "examentraining")?.waarde ?? 0,
};

/** De getrapte garantie — altijd in deze volgorde tonen. */
export const garantie = {
  stappen: [
    {
      stap: 1,
      titel: "Slaagt uw kind niet voor wiskunde?",
      body: "Dan begeleiden we gratis door tot de herkansing in juni. We geven niet op halverwege.",
    },
    {
      stap: 2,
      titel: "Zakt uw kind bij de herkansing alsnog?",
      body: "Dan krijgt u het volledige bedrag terug. Zonder discussie.",
    },
  ],
  voorwaarden: [
    "Minimaal 90% van de lessen bijgewoond",
    "Alle opgegeven proefexamens gemaakt en ingeleverd",
    "Deelname aan de diagnostische toets en de hertoets na zes weken",
  ],
  toelichting:
    "Waarom die voorwaarden? Omdat wij verantwoordelijk zijn voor de begeleiding, en uw kind voor het meedoen. Zo weten we allebei waar we aan toe zijn.",
};

/**
 * De garantie bij Premium 1-op-1: een 8 of hoger (besluit Adam, 6-11-2026).
 * Alleen voor leerlingen die via de selectie zijn toegelaten.
 *
 * Aanname, nog te bevestigen: dezelfde opbouw als de slagingsgarantie
 * (doortrainen tot de herkansing, daarna geld terug), gemeten op het cijfer
 * voor het centraal examen wiskunde. Vóór livegang juridisch laten toetsen.
 */
export const premiumGarantie = {
  cijfer: 8,
  stappen: [
    {
      stap: 1,
      titel: "Haalt uw kind geen 8?",
      body: `Dan begeleiden we gratis door tot de herkansing in ${seizoen.herkansingMaand}.`,
    },
    {
      stap: 2,
      titel: "Ook bij de herkansing geen 8?",
      body: "Dan krijgt u het volledige bedrag terug.",
    },
  ],
  voorwaarden: ["Toegelaten via onze selectie", ...garantie.voorwaarden],
};

/** Hulpfunctie: bedragen als € 2.450 (Nederlandse notatie, zonder centen). */
export function euro(bedrag: number): string {
  return "€" + bedrag.toLocaleString("nl-NL");
}
