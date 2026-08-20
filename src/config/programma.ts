/**
 * Het Wiskunde Slagingsprogramma — centrale configuratie.
 *
 * ▸ Dit is de enige plek waar prijzen, plekken en data staan.
 *   Pas hier aan en de hele website volgt automatisch.
 */

export const programma = {
  naam: "Het Wiskunde Slagingsprogramma",
  subregel: "12 weken · persoonlijke begeleiding op maat · geslaagd of geld terug",

  duurWeken: 12,
  lesurenTotaal: 48,
  lessenPerWeek: 2,
  urenPerLes: 2,
  maxPerGroep: 5,

  /** Startdatum en inschrijfdeadline — pas hier aan per groep. */
  start: "half februari",
  startVolledig: "half februari 2027",
  inschrijvingSluit: "1 februari",
  inschrijvingSluitVolledig: "1 februari 2027",
  examenMaand: "mei",
  herkansingMaand: "juni",
};

/**
 * Schaarste — werk het aantal resterende plekken bij zodra er wordt ingeschreven.
 * Dit is de enige plek waar de beschikbaarheid staat; de hele site leest hieruit.
 */
export const plekken = {
  // Groepsprogramma
  totaal: 20,
  groepen: 4,
  beschikbaar: 20,
  // Premium 1-op-1
  premiumTotaal: 3,
  premiumBeschikbaar: 3,
};

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
 * handen neemt (de coach), dan zicht en rust, en pas daarna het gemak.
 */
export const waardestapel: WaardeItem[] = [
  {
    id: "examentraining",
    titel: "48 uur examentraining",
    beschrijving:
      "Twee keer per week twee uur les van een afgestudeerde bèta-professional — geen student met een bijbaantje. Waar we beginnen bepaalt de diagnostische toets: eerst de achterstand écht wegwerken, geen stortvloed aan stof op het laatste moment.",
    // 48 uur × €65 — marktconform uurtarief voor een bevoegde bèta-docent.
    waarde: 3120,
  },
  {
    id: "herkansing",
    titel: "Herkansingstraject bij zakken",
    beschrijving:
      "Slaagt uw kind niet, dan trainen we gratis door tot de herkansing in juni. Geen nieuwe factuur, geen nieuw gesprek — we gaan gewoon verder.",
    // Circa 14 uur doortrainen tot de herkansing, tegen hetzelfde uurtarief.
    waarde: 890,
  },
  {
    id: "coach",
    titel: "Persoonlijke Student Success Coach",
    beschrijving:
      "Maakt het studieplan, houdt de voortgang bij en spreekt uw kind elke twee weken één-op-één. Zorgt dat de motivatie hoog blijft en is dagelijks bereikbaar via WhatsApp als uw kind vastloopt op een opgave.",
    // Zes 1-op-1 gesprekken plus studieplan en dagelijkse bereikbaarheid;
    // losse studiecoaching gaat voor €60–90 per uur.
    waarde: 999,
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
    // Twaalf geschreven voortgangsrapportages.
    waarde: 297,
  },
  {
    id: "faalangst",
    titel: "Faalangst- en examenstresstraining",
    beschrijving:
      "Een korte module plus een persoonlijk belmoment vlak vóór het examen. Want kennis alleen is niet genoeg als je dichtklapt.",
    // Losse faalangsttrainingen liggen tussen €150 en €500.
    waarde: 197,
  },
  {
    id: "examen-ai",
    titel: "Onbeperkte toegang tot de examen-AI",
    beschrijving:
      "Getraind op duizenden examenvragen en getest door ons docententeam. Dag en nacht beschikbaar, twaalf weken lang.",
    // Circa €33 per maand over drie maanden. Bewust boven een algemeen
    // AI-abonnement (€20–25), want dit is een vakspecifiek examenmodel — maar
    // niet zó ver erboven dat een ouder het niet meer kan narekenen.
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

/** Prijzen. Alle bedragen in hele euro's. */
export const prijzen = {
  programma: 2450,
  termijnen: { aantal: 3, bedrag: 850 },
  premium: 5950,
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

/** Hulpfunctie: bedragen als € 2.450 (Nederlandse notatie, zonder centen). */
export function euro(bedrag: number): string {
  return "€" + bedrag.toLocaleString("nl-NL");
}
