/**
 * De Slagingscheck — vragen, tekstvarianten en vertakkingslogica.
 *
 * Dit is het enige bestand dat je aanpast als de vragen veranderen. De
 * formuliercomponent leest hieruit en bevat zelf geen vraagteksten of logica.
 *
 * Teksten zijn letterlijk overgenomen uit `docs/slagingscheck-formulier.md`,
 * Deel A. Waar de ouder en de leerling anders worden aangesproken staat een
 * `{ u, je }`-paar; alle overige teksten gelden voor beiden.
 */

import type {
  Antwoorden,
  Markering,
  Route,
  Stap,
  StapId,
  ContactVeld,
} from "./types";

/* ─────────────────────────────────────────────────────────
   Herbruikbare bouwstenen
   ───────────────────────────────────────────────────────── */

/** Cijferopties — ook gebruikt in zijroute D, zodat de ernst per vak vergelijkbaar blijft. */
const cijferOpties = [
  { waarde: "onder_4", label: "Onder de 4" },
  { waarde: "4_5", label: "Tussen de 4 en 5" },
  { waarde: "5_55", label: "Tussen de 5 en 5,5" },
  { waarde: "55_65", label: "Tussen de 5,5 en 6,5" },
  {
    waarde: "boven_65",
    label: "Boven de 6,5 — maar het moet hoger voor de vervolgstudie",
  },
];

/** Vakkenlijst voor de zijroutes. In D zonder wiskunde, in E inclusief wiskunde. */
const andereVakken = [
  { waarde: "natuurkunde", label: "Natuurkunde" },
  { waarde: "scheikunde", label: "Scheikunde" },
  { waarde: "biologie", label: "Biologie" },
  { waarde: "economie", label: "Economie" },
  { waarde: "bedrijfseconomie", label: "Bedrijfseconomie" },
  { waarde: "nederlands", label: "Nederlands" },
  { waarde: "engels", label: "Engels" },
  { waarde: "duits_frans", label: "Duits / Frans" },
  { waarde: "geschiedenis", label: "Geschiedenis" },
  { waarde: "aardrijkskunde", label: "Aardrijkskunde" },
  { waarde: "anders", label: "Anders, namelijk…", vrijeTekst: true },
];

const contactVeld = {
  naam: { naam: "naam", label: { u: "Uw naam", je: "Je naam" }, type: "text", autoComplete: "name", placeholder: "Voor- en achternaam", verplicht: true },
  email: { naam: "email", label: "E-mailadres", type: "email", autoComplete: "email", placeholder: "naam@email.nl", verplicht: true },
  telefoon: { naam: "telefoon", label: "Telefoonnummer", type: "tel", autoComplete: "tel", placeholder: "06 1234 5678", verplicht: true },
  telefoonOptioneel: { naam: "telefoon", label: "Telefoonnummer (optioneel)", type: "tel", autoComplete: "tel", placeholder: "06 1234 5678", verplicht: false },
  // Alleen de ouder vult twee namen in. Vult de leerling zelf in, dan is
  // "Je naam" hierboven al de naam van de leerling.
  naamLeerling: { naam: "naamLeerling", label: "Naam van de leerling", type: "text", placeholder: "Voornaam", verplicht: true, alleenVoor: "ouder" },
  school: { naam: "school", label: "School (optioneel)", type: "text", placeholder: "Naam van de school", verplicht: false },
} satisfies Record<string, ContactVeld>;

/* ─────────────────────────────────────────────────────────
   De stappen
   ───────────────────────────────────────────────────────── */

export const stappen: Record<StapId, Stap> = {
  /* ── Hoofdroute ─────────────────────────────────────── */

  voor_wie: {
    id: "voor_wie",
    soort: "keuze",
    vraag: "Voor wie zoekt u hulp?",
    veld: "voorWie",
    opties: [
      { waarde: "ouder", label: "Voor mijn kind" },
      { waarde: "leerling", label: "Voor mezelf, ik ben de leerling" },
    ],
  },

  klas: {
    id: "klas",
    soort: "keuze",
    vraag: { u: "In welke klas zit uw kind?", je: "In welke klas zit je?" },
    veld: "klas",
    opties: [
      { waarde: "examen_havo", label: "Examenklas HAVO" },
      { waarde: "examen_vwo", label: "Examenklas VWO" },
      { waarde: "voorexamen", label: "Klas 4 of 5 (nog geen examenjaar)" },
      { waarde: "anders", label: "Anders" },
    ],
  },

  vak: {
    id: "vak",
    soort: "keuze",
    vraag: "Om welk vak gaat het?",
    veld: "vak",
    opties: [
      { waarde: "wiskunde_a", label: "Wiskunde A" },
      { waarde: "wiskunde_b", label: "Wiskunde B" },
      { waarde: "wiskunde_c", label: "Wiskunde C" },
      { waarde: "wiskunde_d", label: "Wiskunde D" },
      { waarde: "ander_vak", label: "Een ander vak" },
    ],
  },

  cijfer: {
    id: "cijfer",
    soort: "keuze",
    vraag: "Welk cijfer staat er nu ongeveer?",
    veld: "cijfer",
    opties: cijferOpties,
  },

  // Alleen bij een cijfer onder de 5. Bepaalt hoe diep de gaten zitten.
  sinds: {
    id: "sinds",
    soort: "keuze",
    vraag: "Sinds wanneer loopt dit?",
    veld: "sinds",
    opties: [
      { waarde: "dit_jaar", label: "Sinds dit schooljaar" },
      { waarde: "langer_dan_jaar", label: "Al langer dan een jaar" },
      { waarde: "sinds_onderbouw", label: "Eigenlijk al sinds de onderbouw" },
    ],
  },

  // Alleen bij een cijfer boven de 6,5 — de premium 1-op-1 doelgroep.
  doel: {
    id: "doel",
    soort: "keuze",
    vraag: "Wat is het doel?",
    veld: "doel",
    opties: [
      { waarde: "numerus_fixus", label: "Een studie met numerus fixus (geneeskunde, tandheelkunde, e.d.)" },
      { waarde: "beta_studie", label: "Een technische of bèta-studie met een cijfereis" },
      { waarde: "hoog_slagen", label: "Zo hoog mogelijk slagen, zonder specifieke eis" },
    ],
  },

  eerder_bijles: {
    id: "eerder_bijles",
    soort: "keuze",
    vraag: {
      u: "Heeft uw kind al eerder bijles gehad?",
      je: "Heb je al eerder bijles gehad?",
    },
    veld: "eerderBijles",
    opties: [
      { waarde: "nee", label: "Nee, dit is de eerste keer" },
      { waarde: "ja_hielp_niet", label: "Ja, maar het hielp niet genoeg" },
      { waarde: "ja_hielp_wel", label: "Ja, en dat hielp wel — maar het is gestopt" },
    ],
  },

  wat_werkte_niet: {
    id: "wat_werkte_niet",
    soort: "meerkeuze",
    vraag: "Wat werkte er toen niet?",
    toelichting: "Meerdere antwoorden mogelijk.",
    veld: "watWerkteNiet",
    andersVeld: "watWerkteNietAnders",
    opties: [
      { waarde: "uitleg", label: "De uitleg sloot niet aan" },
      { waarde: "structuur", label: "Er was te weinig structuur of planning" },
      { waarde: "huiswerk", label: "Het huiswerk werd toch niet gemaakt" },
      { waarde: "vrijblijvend", label: "Het was te vrijblijvend" },
      { waarde: "te_veel_vakken", label: "Het ging over te veel vakken tegelijk" },
      { waarde: "anders", label: "Anders, namelijk…", vrijeTekst: true },
    ],
  },

  grootste_probleem: {
    id: "grootste_probleem",
    soort: "meerkeuze",
    vraag: "Wat is op dit moment het grootste probleem?",
    toelichting: "Meerdere antwoorden mogelijk.",
    veld: "grootsteProbleem",
    opties: [
      { waarde: "snapt_stof_niet", label: { u: "Snapt de stof niet", je: "Ik snap de stof niet" } },
      { waarde: "plannen", label: { u: "Weet niet hoe te beginnen of te plannen", je: "Ik weet niet hoe ik moet beginnen of plannen" } },
      { waarde: "motivatie", label: { u: "Motivatie ontbreekt", je: "Ik kom er niet toe" } },
      { waarde: "faalangst", label: { u: "Faalangst of dichtklappen bij toetsen", je: "Ik klap dicht bij toetsen" } },
      { waarde: "uitval_docent", label: { u: "Loopt achter door uitval van de docent op school", je: "Ik loop achter door uitval van de docent op school" } },
      { waarde: "fouten_examen", label: { u: "Kan het wel, maar maakt te veel fouten op het examen", je: "Ik kan het wel, maar maak te veel fouten" } },
    ],
  },

  // Verkoopt niets, maar laat de ouder zich gezien voelen. Alleen bij ouders.
  ouder_pijn: {
    id: "ouder_pijn",
    soort: "meerkeuze",
    vraag: "Waar loopt ú tegenaan?",
    toelichting: "Meerdere antwoorden mogelijk.",
    veld: "ouderPijn",
    opties: [
      { waarde: "pushen", label: "Ik moet constant pushen en dat geeft spanning thuis" },
      { waarde: "stof", label: "Ik kan de stof zelf niet meer helpen" },
      { waarde: "wakker", label: "Ik weet niet of het goed komt en lig er wakker van" },
      { waarde: "geen_zicht", label: "Ik heb geen zicht op wat er precies misgaat" },
    ],
  },

  contact: {
    id: "contact",
    soort: "contact",
    vraag: { u: "Waar kunnen we u bereiken?", je: "Waar kunnen we je bereiken?" },
    toelichting: {
      u: "We bellen u binnen één werkdag. Uw gegevens gebruiken we alleen hiervoor.",
      je: "We bellen je binnen één werkdag. Je gegevens gebruiken we alleen hiervoor.",
    },
    velden: [
      contactVeld.naam,
      contactVeld.email,
      contactVeld.telefoon,
      contactVeld.naamLeerling,
      contactVeld.school,
    ],
    knop: "Verder",
  },

  beschikbaarheid: {
    id: "beschikbaarheid",
    soort: "afsluiting",
    vraag: "Wanneer schikt het gesprek?",
    veld: "beschikbaarheid",
    opties: [
      { waarde: "overdag", label: "Doordeweeks overdag" },
      { waarde: "avond", label: "Doordeweeks 's avonds" },
      { waarde: "weekend", label: "In het weekend" },
      { waarde: "maakt_niet_uit", label: "Bel maar wanneer het uitkomt" },
    ],
    opmerkingLabel: "Iets wat we alvast moeten weten? (optioneel)",
    knop: "Vraag de Slagingscheck aan",
  },

  /* ── Zijroute A — klas 4 of 5 ───────────────────────── */

  inhaal_bericht: {
    id: "inhaal_bericht",
    soort: "bericht",
    vraag: { u: "Goed dat u er nu al bij bent.", je: "Goed dat je er nu al bij bent." },
    alinea: [
      {
        u: "De Slagingscheck is bedoeld voor examenkandidaten. Maar voor klas 4 en 5 hebben we het Inhaalprogramma: tien weken gericht werken aan de basis, zodat het examenjaar geen inhaalrace wordt.",
        je: "De Slagingscheck is bedoeld voor examenkandidaten. Maar voor klas 4 en 5 hebben we het Inhaalprogramma: tien weken gericht werken aan de basis, zodat je examenjaar geen inhaalrace wordt.",
      },
    ],
    knop: "Houd me op de hoogte",
    link: { label: "Bekijk het Inhaalprogramma", href: "/programmas" },
  },

  inhaal_contact: {
    id: "inhaal_contact",
    soort: "contact",
    vraag: { u: "Waar kunnen we u bereiken?", je: "Waar kunnen we je bereiken?" },
    toelichting: "We laten het weten zodra de volgende groep van het Inhaalprogramma start.",
    velden: [contactVeld.naam, contactVeld.email, contactVeld.telefoonOptioneel, contactVeld.naamLeerling],
    knop: "Houd me op de hoogte",
  },

  /* ── Zijroute D — ander vak ─────────────────────────── */

  vak_bericht: {
    id: "vak_bericht",
    soort: "bericht",
    vraag: "We geven op dit moment alleen wiskunde.",
    alinea: [
      "Dat is een bewuste keuze — daar zit het grootste docententekort en daar halen we de beste resultaten. Maar we willen uitbreiden, en welk vak er als volgende bij komt bepalen we op basis van de vraag.",
      {
        u: "Helpt u ons kiezen? Nog drie korte vragen — en u hoort het als eerste zodra we dit vak aanbieden.",
        je: "Help je ons kiezen? Nog drie korte vragen — en je hoort het als eerste zodra we dit vak aanbieden.",
      },
    ],
    knop: "Ja, ik help mee",
  },

  gevraagde_vakken: {
    id: "gevraagde_vakken",
    soort: "meerkeuze",
    vraag: "Om welk vak of welke vakken gaat het?",
    toelichting: "Meerdere antwoorden mogelijk.",
    veld: "gevraagdeVakken",
    andersVeld: "gevraagdVakAnders",
    opties: andereVakken,
  },

  vak_cijfer: {
    id: "vak_cijfer",
    soort: "keuze",
    vraag: "Welk cijfer staat er nu ongeveer?",
    veld: "cijfer",
    opties: cijferOpties,
  },

  vak_contact: {
    id: "vak_contact",
    soort: "contact",
    vraag: { u: "Waar kunnen we u bereiken?", je: "Waar kunnen we je bereiken?" },
    toelichting: "Alleen om te laten weten zodra we dit vak aanbieden. Geen nieuwsbrief.",
    velden: [contactVeld.naam, contactVeld.email, contactVeld.telefoonOptioneel, contactVeld.naamLeerling],
    knop: "Zet me op de lijst",
    vinkje: {
      veld: "wilAanbeveling",
      label: {
        u: "Ik hoor het ook graag als u iemand kunt aanbevelen die dit vak nu al goed geeft.",
        je: "Ik hoor het ook graag als jullie iemand kunnen aanbevelen die dit vak nu al goed geeft.",
      },
    },
  },

  /* ── Zijroute E — ander niveau ──────────────────────── */

  niveau_bericht: {
    id: "niveau_bericht",
    soort: "bericht",
    vraag: "We richten ons nu volledig op de bovenbouw van HAVO en VWO.",
    alinea: [
      "Daardoor kunnen we daar écht het verschil maken. Maar we kijken naar uitbreiding, en de vraag bepaalt waarheen.",
      {
        u: "Twee korte vragen, dan houden we u op de hoogte.",
        je: "Twee korte vragen, dan houden we je op de hoogte.",
      },
    ],
    knop: "Ja, ik help mee",
  },

  gevraagd_niveau: {
    id: "gevraagd_niveau",
    soort: "keuze",
    vraag: { u: "Welk niveau en welke klas zit uw kind?", je: "Welk niveau en welke klas zit je?" },
    veld: "gevraagdNiveau",
    opties: [
      { waarde: "vmbo_bb", label: "VMBO basis" },
      { waarde: "vmbo_kb", label: "VMBO kader" },
      { waarde: "vmbo_gl", label: "VMBO gemengd" },
      { waarde: "vmbo_tl", label: "VMBO theoretisch" },
      { waarde: "mbo", label: "MBO" },
      { waarde: "onderbouw", label: "Onderbouw HAVO/VWO" },
      { waarde: "anders", label: "Anders" },
    ],
  },

  niveau_vak: {
    id: "niveau_vak",
    soort: "meerkeuze",
    vraag: "Om welk vak gaat het?",
    toelichting: "Meerdere antwoorden mogelijk.",
    veld: "gevraagdeVakken",
    andersVeld: "gevraagdVakAnders",
    opties: [{ waarde: "wiskunde", label: "Wiskunde" }, ...andereVakken],
  },

  niveau_contact: {
    id: "niveau_contact",
    soort: "contact",
    vraag: { u: "Waar kunnen we u bereiken?", je: "Waar kunnen we je bereiken?" },
    toelichting: "Alleen om te laten weten zodra we dit niveau aanbieden. Geen nieuwsbrief.",
    velden: [contactVeld.naam, contactVeld.email, contactVeld.telefoonOptioneel, contactVeld.naamLeerling],
    knop: "Zet me op de lijst",
  },
};

/* ─────────────────────────────────────────────────────────
   Vertakkingslogica — declaratief, op basis van de antwoorden
   ───────────────────────────────────────────────────────── */

/** Geeft de volgende stap, of `"klaar"` als het formulier verzonden mag worden. */
export function volgendeStap(huidige: StapId, a: Antwoorden): StapId | "klaar" {
  switch (huidige) {
    case "voor_wie":
      return "klas";

    case "klas":
      if (a.klas === "voorexamen") return "inhaal_bericht"; // zijroute A
      if (a.klas === "anders") return "niveau_bericht"; // zijroute E
      return "vak";

    case "vak":
      if (a.vak === "ander_vak") return "vak_bericht"; // zijroute D
      return "cijfer";

    case "cijfer":
      if (a.cijfer === "onder_4" || a.cijfer === "4_5") return "sinds";
      if (a.cijfer === "boven_65") return "doel";
      return "eerder_bijles";

    case "sinds":
    case "doel":
      return "eerder_bijles";

    case "eerder_bijles":
      if (a.eerderBijles === "ja_hielp_niet") return "wat_werkte_niet";
      return "grootste_probleem";

    case "wat_werkte_niet":
      return "grootste_probleem";

    case "grootste_probleem":
      // De ouderpijn-vraag slaan we over als de leerling zelf invult.
      return a.voorWie === "ouder" ? "ouder_pijn" : "contact";

    case "ouder_pijn":
      return "contact";

    case "contact":
      return "beschikbaarheid";

    case "beschikbaarheid":
      return "klaar";

    // Zijroute A — doorverwijzing naar het Inhaalprogramma
    case "inhaal_bericht":
      return "inhaal_contact";
    case "inhaal_contact":
      return "klaar";

    // Zijroute D — ander vak: vraag vastleggen
    case "vak_bericht":
      return "gevraagde_vakken";
    case "gevraagde_vakken":
      return "vak_cijfer";
    case "vak_cijfer":
      return "vak_contact";
    case "vak_contact":
      return "klaar";

    // Zijroute E — ander niveau: vraag vastleggen
    case "niveau_bericht":
      return "gevraagd_niveau";
    case "gevraagd_niveau":
      return "niveau_vak";
    case "niveau_vak":
      return "niveau_contact";
    case "niveau_contact":
      return "klaar";
  }
}

/**
 * Het volledige pad dat bij de huidige antwoorden hoort, vanaf de eerste stap.
 * Wordt gebruikt voor de voortgangsbalk en voor de terugknop, zodat er geen
 * aparte geschiedenis bijgehouden hoeft te worden.
 */
export function pad(a: Antwoorden): StapId[] {
  const route: StapId[] = ["voor_wie"];
  let huidige: StapId = "voor_wie";

  // Beveiliging tegen een onbedoelde lus in de logica.
  for (let i = 0; i < 40; i++) {
    const volgende = volgendeStap(huidige, a);
    if (volgende === "klaar") break;
    route.push(volgende);
    huidige = volgende;
  }
  return route;
}

/** Voortgang als percentage — het totaal varieert door de vertakkingen. */
export function voortgang(huidige: StapId, a: Antwoorden): number {
  const p = pad(a);
  const index = p.indexOf(huidige);
  if (index === -1) return 0;
  return Math.round(((index + 1) / p.length) * 100);
}

/** Welke route de invuller heeft genomen — bepaalt de afhandeling en het mailonderwerp. */
export function bepaalRoute(a: Antwoorden): Route {
  if (a.klas === "voorexamen") return "inhaalprogramma";
  if (a.klas === "anders") return "ander_niveau";
  if (a.vak === "ander_vak") return "ander_vak";
  return "hoofdroute";
}

/** Interne markering voor de notificatiemail. Alleen relevant op de hoofdroute. */
export function bepaalMarkering(a: Antwoorden): Markering {
  if (bepaalRoute(a) !== "hoofdroute") return null;
  if (a.cijfer === "onder_4" || a.cijfer === "4_5") return "extra_screening";
  if (a.cijfer === "boven_65") return "premium_kandidaat";
  return null;
}

/** Is dit de laatste stap vóór verzenden? */
export function isLaatsteStap(huidige: StapId, a: Antwoorden): boolean {
  return volgendeStap(huidige, a) === "klaar";
}

/* ─────────────────────────────────────────────────────────
   Leesbare labels — voor de notificatiemail en de oudergids
   ───────────────────────────────────────────────────────── */

export const leesbaar: Record<string, string> = {
  // klas
  examen_havo: "Examenklas HAVO",
  examen_vwo: "Examenklas VWO",
  voorexamen: "Klas 4 of 5",
  // vak
  wiskunde_a: "Wiskunde A",
  wiskunde_b: "Wiskunde B",
  wiskunde_c: "Wiskunde C",
  wiskunde_d: "Wiskunde D",
  ander_vak: "Een ander vak",
  // cijfer
  onder_4: "onder de 4",
  "4_5": "tussen de 4 en 5",
  "5_55": "tussen de 5 en 5,5",
  "55_65": "tussen de 5,5 en 6,5",
  boven_65: "boven de 6,5",
  // sinds
  dit_jaar: "sinds dit schooljaar",
  langer_dan_jaar: "al langer dan een jaar",
  sinds_onderbouw: "al sinds de onderbouw",
  // doel
  numerus_fixus: "studie met numerus fixus",
  beta_studie: "technische of bèta-studie met cijfereis",
  hoog_slagen: "zo hoog mogelijk slagen",
  // eerdere bijles
  nee: "nee, eerste keer",
  ja_hielp_niet: "ja, hielp niet genoeg",
  ja_hielp_wel: "ja, hielp wel maar is gestopt",
  // beschikbaarheid
  overdag: "doordeweeks overdag",
  avond: "doordeweeks 's avonds",
  weekend: "in het weekend",
  maakt_niet_uit: "maakt niet uit",
  // niveau (zijroute E)
  vmbo_bb: "VMBO basis",
  vmbo_kb: "VMBO kader",
  vmbo_gl: "VMBO gemengd",
  vmbo_tl: "VMBO theoretisch",
  mbo: "MBO",
  onderbouw: "Onderbouw HAVO/VWO",
  anders: "Anders",
};

/** Zet een opgeslagen waarde om naar leesbare tekst voor mail en gids. */
export function label(waarde: string | undefined): string {
  if (!waarde) return "—";
  return leesbaar[waarde] ?? waarde;
}

/** Zoekt het getoonde label van een optie op — voor meerkeuzevelden in de mail. */
export function optieLabels(stapId: StapId, waarden: string[] = []): string[] {
  const stap = stappen[stapId];
  if (!("opties" in stap)) return waarden;
  return waarden.map((w) => {
    const optie = stap.opties.find((o) => o.waarde === w);
    if (!optie) return w;
    return typeof optie.label === "string" ? optie.label : optie.label.u;
  });
}
