/**
 * De Slagingscheck — vragen, tekstvarianten en vertakkingslogica.
 *
 * Dit is het enige bestand dat je aanpast als de vragen veranderen. De
 * formuliercomponent leest hieruit en bevat zelf geen vraagteksten of logica.
 *
 * Het doel van dit formulier is dat de ouder zich begrepen voelt en betrokken
 * raakt, niet dat we alles weten. Vak, eerdere bijles, school en voorkeursmoment
 * vraagt Adam in het gesprek. Voeg hier dus alleen een vraag toe als die de ouder
 * ook iets geeft.
 *
 * Schrijf eenvoudig Nederlands (taalniveau B1): veel ouders hebben zelf moeite
 * met de taal. Korte zinnen, gewone woorden, geen beeldspraak.
 *
 * Waar de ouder en de leerling anders worden aangesproken staat een
 * `{ u, je }`-paar. `{kind}` wordt de voornaam van het kind.
 */

import { seizoen } from "@/config/programma";
import { gemiddeldePuntenErbij, site } from "@/lib/site";
import { wiskundeOnvoldoende } from "@/config/examencijfers";
import type { Antwoorden, Cijfer, ContactVeld, Markering, Route, Stap, StapId, Tekst } from "./types";
import { persoonlijk } from "./types";

/* ─────────────────────────────────────────────────────────
   Herbruikbare bouwstenen
   ───────────────────────────────────────────────────────── */

/** Vakkenlijst voor de zijroute: wat wordt er gevraagd, naast wiskunde op de hoofdroute. */
const vakken = [
  { waarde: "wiskunde", label: "Wiskunde" },
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
  { waarde: "anders", label: "Een ander vak, namelijk:", vrijeTekst: true },
];

const contactVeld = {
  naam: { naam: "naam", label: { u: "Uw naam", je: "Je naam" }, type: "text", autoComplete: "name", placeholder: "Voornaam en achternaam", verplicht: true },
  email: { naam: "email", label: "E-mailadres", type: "email", autoComplete: "email", placeholder: "naam@email.nl", verplicht: true },
  telefoon: { naam: "telefoon", label: "Telefoonnummer", type: "tel", autoComplete: "tel", placeholder: "06 1234 5678", verplicht: true },
  telefoonOptioneel: { naam: "telefoon", label: "Telefoonnummer (niet verplicht)", type: "tel", autoComplete: "tel", placeholder: "06 1234 5678", verplicht: false },
  voornaamKind: { naam: "naamLeerling", label: "Voornaam van uw kind", type: "text", placeholder: "Voornaam", verplicht: true },
} satisfies Record<string, ContactVeld>;

/** Reageert op het cijfer: de ouder moet merken dat er iemand meeleest. */
function reactieOpCijfer(a: Antwoorden): Tekst {
  if (a.cijfer === "onder_4" || a.cijfer === "4_5") {
    return {
      u: "Zo'n cijfer komt veel voor. U bent dus echt niet de enige.",
      je: "Zo'n cijfer komt veel voor. Je bent dus echt niet de enige.",
    };
  }
  if (a.cijfer === "boven_65") {
    return {
      u: "Slagen lukt dus wel. Maar {kind} wil een hoger cijfer.",
      je: "Slagen lukt dus wel. Maar je wilt een hoger cijfer.",
    };
  }
  return {
    u: "{kind} zit dicht bij een voldoende. Het kan nog twee kanten op.",
    je: "Je zit dicht bij een voldoende. Het kan nog twee kanten op.",
  };
}

/* ─────────────────────────────────────────────────────────
   De stappen
   ───────────────────────────────────────────────────────── */

export const stappen: Record<StapId, Stap> = {
  /* ── Hoofdroute ─────────────────────────────────────── */

  voor_wie: {
    id: "voor_wie",
    soort: "keuze",
    vraag: "Voor wie vult u dit in?",
    /* Verwachting meteen zetten: hoelang duurt dit en wat levert het op. */
    toelichting:
      "Het zijn een paar korte vragen. U bent in 2 minuten klaar. Daarna belt Adam u. Hij zegt u eerlijk of het kan lukken.",
    veld: "voorWie",
    opties: [
      { waarde: "ouder", label: "Voor mijn kind" },
      { waarde: "leerling", label: "Voor mezelf. Ik ben de leerling." },
    ],
  },

  // Vroeg in de stroom, zodat alle vragen hierna over dit kind gaan en niet over
  // "uw kind". Geen contactgegeven, dus geen drempel.
  naam_kind: {
    id: "naam_kind",
    soort: "contact",
    vraag: "Hoe heet uw kind?",
    toelichting: "Alleen de voornaam is genoeg. Het gaat om uw kind, niet om een cijfer.",
    velden: [contactVeld.voornaamKind],
    knop: "Verder",
  },

  klas: {
    id: "klas",
    soort: "keuze",
    vraag: { u: "In welke klas zit {kind}?", je: "In welke klas zit je?" },
    veld: "klas",
    opties: [
      { waarde: "examen_havo", label: "HAVO 5 (examenjaar)" },
      { waarde: "examen_vwo", label: "VWO 6 (examenjaar)" },
      { waarde: "voorexamen", label: "HAVO 4, VWO 4 of VWO 5" },
      { waarde: "anders", label: "Iets anders (ander niveau of ander vak)" },
    ],
  },

  // Na de klas: hoe het landelijk gaat. Eén getal, een plaatje, en direct de
  // uitweg. De tekst staat in `statistiekVoor`, omdat die van de klas afhangt.
  landelijk: {
    id: "landelijk",
    soort: "statistiek",
    knop: "Verder",
  },

  cijfer: {
    id: "cijfer",
    soort: "keuze",
    vraag: { u: "Welk cijfer heeft {kind} nu voor wiskunde?", je: "Welk cijfer heb je nu voor wiskunde?" },
    toelichting: "Ongeveer is goed.",
    veld: "cijfer",
    opties: [
      { waarde: "onder_4", label: "Lager dan een 4" },
      { waarde: "4_5", label: "Tussen een 4 en een 5" },
      { waarde: "5_55", label: "Tussen een 5 en een 5,5" },
      { waarde: "55_65", label: "Tussen een 5,5 en een 6,5" },
      {
        waarde: "boven_65",
        label: {
          u: "Hoger dan een 6,5, maar {kind} heeft een hoger cijfer nodig voor een studie",
          je: "Hoger dan een 6,5, maar ik heb een hoger cijfer nodig voor een studie",
        },
      },
    ],
  },

  // Direct na het cijfer: laat zien waar dit kind naartoe kan. Persoonlijk door
  // de naam en het eigen cijfer, eerlijk door de kanttekening eronder.
  grafiek: {
    id: "grafiek",
    soort: "grafiek",
    reactie: reactieOpCijfer,
    vraag: { u: "Zo kan het gaan voor {kind}", je: "Zo kan het gaan voor jou" },
    toelichting: `Leerlingen die bij ons les hebben, gaan gemiddeld ${gemiddeldePuntenErbij} punten omhoog.`,
    noot: {
      u: "Dit is een gemiddelde, geen belofte. Wat haalbaar is voor {kind}, hoort u van Adam.",
      je: "Dit is een gemiddelde, geen belofte. Wat haalbaar is voor jou, hoor je van Adam.",
    },
    bron: "Gemiddelde van leerlingen van Bijlesdirect. ExamenDocent hoort bij Bijlesdirect.",
    knop: "Verder",
  },

  // De belangrijkste vraag van het formulier: hier voelt de ouder zich gezien.
  // De waarden pushen, stof, wakker en geen_zicht bepalen de tips in de oudergids.
  ouder_pijn: {
    id: "ouder_pijn",
    soort: "meerkeuze",
    vraag: "En u? Wat herkent u?",
    toelichting: "Kies alles wat klopt. Er is geen fout antwoord.",
    veld: "ouderPijn",
    opties: [
      { waarde: "pushen", label: "Ik moet steeds zeggen dat {kind} moet leren. Dat geeft ruzie." },
      { waarde: "stof", label: "Ik wil helpen, maar ik snap de wiskunde zelf niet." },
      { waarde: "wakker", label: "Ik maak me veel zorgen. Ik slaap er slecht van." },
      { waarde: "geen_zicht", label: "{kind} zegt alleen: ‘Het gaat wel.’ Ik weet niet wat er echt aan de hand is." },
      { waarde: "schuld", label: "Ik denk soms: had ik dit eerder moeten zien?" },
      { waarde: "moed", label: "{kind} denkt zelf dat het niet gaat lukken." },
      { waarde: "faalangst", label: "{kind} raakt in paniek bij een toets." },
    ],
  },

  // Direct na de zorgen: laat de ouder voelen dat die zorgen gehoord zijn, en wat
  // wij er concreet aan doen. De regels per zorg staan in `geruststellingen`.
  geruststelling: {
    id: "geruststelling",
    soort: "geruststelling",
    // Bewust alleen de kop: rustig en duidelijk, de ouder niet overspoelen.
    vraag: "U hoeft dit niet meer alleen te doen.",
    citaat: "Ik bel u zelf. Samen kijken we wat {kind} nodig heeft. En ik zeg u eerlijk of het kan lukken.",
    afzender: "Adam, eigenaar van ExamenDocent",
    knop: "Verder",
  },

  // De leerling die zelf invult, krijgt dezelfde vraag over zichzelf.
  grootste_probleem: {
    id: "grootste_probleem",
    soort: "meerkeuze",
    vraag: "Wat herken je?",
    toelichting: "Kies alles wat klopt. Er is geen fout antwoord.",
    veld: "grootsteProbleem",
    opties: [
      { waarde: "snapt_stof_niet", label: "Ik snap de wiskunde niet meer" },
      { waarde: "plannen", label: "Ik weet niet waar ik moet beginnen" },
      { waarde: "motivatie", label: "Ik heb vaak geen zin om te leren" },
      { waarde: "faalangst", label: "Ik raak in paniek bij een toets" },
      { waarde: "fouten_examen", label: "Ik kan het wel, maar bij de toets gaat het mis" },
      { waarde: "moed", label: "Ik denk dat ik het gewoon niet kan" },
    ],
  },

  // Laat de ouder de uitkomst voor zich zien. Voor Adam het beste aanknopingspunt
  // in het gesprek: dit is waar het volgens de ouder zelf om gaat.
  droom: {
    id: "droom",
    soort: "keuze",
    // De ouder heeft net de geruststelling gelezen; de leerling nog niet.
    reactie: () => ({
      u: "En nu een fijne vraag.",
      je: "Dat is zwaar. En meestal is het niet jouw schuld.",
    }),
    vraag: {
      u: `Stel: het is ${seizoen.herkansingMaand} en {kind} is geslaagd. Wat is dan het mooiste voor u?`,
      je: `Stel: het is ${seizoen.herkansingMaand} en je bent geslaagd. Wat is dan het mooiste voor jou?`,
    },
    veld: "droom",
    opties: [
      { waarde: "rust", label: "Er is weer rust in huis" },
      { waarde: "zelfvertrouwen", label: { u: "{kind} gelooft weer in zichzelf", je: "Ik geloof weer in mezelf" } },
      { waarde: "toekomst", label: { u: "{kind} kan verder met school of studie", je: "Ik kan verder met school of studie" } },
      { waarde: "last", label: "Ik hoef me geen zorgen meer te maken" },
    ],
  },

  contact: {
    id: "contact",
    soort: "contact",
    reactie: () => ({ u: "Daar helpen wij u graag bij.", je: "Daar helpen we je graag bij." }),
    vraag: { u: "Hoe kan Adam u bereiken?", je: "Hoe kan Adam je bereiken?" },
    toelichting: {
      u: "Adam belt u binnen 1 werkdag. Hij zegt u eerlijk of {kind} kan slagen. Na deze stap krijgt u meteen tips voor deze week.",
      je: "Adam belt je binnen 1 werkdag. Hij zegt je eerlijk of je kunt slagen. Na deze stap krijg je meteen tips voor deze week.",
    },
    velden: [contactVeld.naam, contactVeld.telefoon, contactVeld.email],
    knop: "Ja, Adam mag mij bellen",
  },

  /* ── Zijroute — klas 4 of 5 ─────────────────────────── */

  inhaal_bericht: {
    id: "inhaal_bericht",
    soort: "bericht",
    vraag: { u: "Fijn dat u er nu al mee bezig bent.", je: "Fijn dat je er nu al mee bezig bent." },
    alinea: [
      "Wij helpen alleen leerlingen in het examenjaar. Voor HAVO 4, VWO 4 en VWO 5 hebben we geen programma.",
      {
        u: "Zoekt u nu al 1-op-1 bijles? Dat kan bij Bijlesdirect, waar ExamenDocent bij hoort.",
        je: "Zoek je nu al 1-op-1 bijles? Dat kan bij Bijlesdirect, waar ExamenDocent bij hoort.",
      },
      {
        u: "Of laat uw gegevens achter. Dan denken we met u mee. U zit nergens aan vast.",
        je: "Of laat je gegevens achter. Dan denken we met je mee. Je zit nergens aan vast.",
      },
    ],
    knop: "Mijn gegevens achterlaten",
    link: { label: "Naar Bijlesdirect", href: site.bijlesdirectUrl },
  },

  inhaal_contact: {
    id: "inhaal_contact",
    soort: "contact",
    vraag: { u: "Hoe kunnen we u bereiken?", je: "Hoe kunnen we je bereiken?" },
    toelichting: {
      u: "We nemen contact met u op. Samen kijken we wat we voor {kind} kunnen doen.",
      je: "We nemen contact met je op. Samen kijken we wat we voor je kunnen doen.",
    },
    velden: [contactVeld.naam, contactVeld.email, contactVeld.telefoonOptioneel],
    knop: "Versturen",
  },

  /* ── Zijroute — ander niveau of ander vak ───────────── */

  niveau_bericht: {
    id: "niveau_bericht",
    soort: "bericht",
    vraag: "Wij helpen alleen met wiskunde in het examenjaar van HAVO en VWO.",
    alinea: [
      "Zo kunnen we echt goed helpen. Maar we willen weten waar nog meer vraag naar is.",
      {
        u: "Zoekt u nu al bijles? Dat kan bij Bijlesdirect, waar ExamenDocent bij hoort.",
        je: "Zoek je nu al bijles? Dat kan bij Bijlesdirect, waar ExamenDocent bij hoort.",
      },
      {
        u: "Of beantwoord nog 2 korte vragen. Dan laten we het u weten als we meer gaan doen.",
        je: "Of beantwoord nog 2 korte vragen. Dan laten we het je weten als we meer gaan doen.",
      },
    ],
    knop: "Ja, dat wil ik",
    link: { label: "Naar Bijlesdirect", href: site.bijlesdirectUrl },
  },

  gevraagd_niveau: {
    id: "gevraagd_niveau",
    soort: "keuze",
    vraag: { u: "Op welk niveau zit {kind}?", je: "Op welk niveau zit je?" },
    veld: "gevraagdNiveau",
    opties: [
      { waarde: "vmbo_bb", label: "VMBO basis" },
      { waarde: "vmbo_kb", label: "VMBO kader" },
      { waarde: "vmbo_gl", label: "VMBO gemengd" },
      { waarde: "vmbo_tl", label: "VMBO theoretisch" },
      { waarde: "mbo", label: "MBO" },
      { waarde: "onderbouw", label: "HAVO of VWO, klas 1, 2 of 3" },
      { waarde: "anders", label: "Iets anders, bijvoorbeeld het examenjaar met een ander vak" },
    ],
  },

  niveau_vak: {
    id: "niveau_vak",
    soort: "meerkeuze",
    vraag: "Om welk vak gaat het?",
    toelichting: { u: "U mag meer dan 1 vak kiezen.", je: "Je mag meer dan 1 vak kiezen." },
    veld: "gevraagdeVakken",
    andersVeld: "gevraagdVakAnders",
    opties: vakken,
  },

  niveau_contact: {
    id: "niveau_contact",
    soort: "contact",
    vraag: { u: "Hoe kunnen we u bereiken?", je: "Hoe kunnen we je bereiken?" },
    toelichting: {
      u: "We laten het u weten als we dit gaan doen. U krijgt geen nieuwsbrief.",
      je: "We laten het je weten als we dit gaan doen. Je krijgt geen nieuwsbrief.",
    },
    velden: [contactVeld.naam, contactVeld.email, contactVeld.telefoonOptioneel],
    knop: "Zet mij op de lijst",
  },
};

/* ─────────────────────────────────────────────────────────
   Vertakkingslogica — declaratief, op basis van de antwoorden
   ───────────────────────────────────────────────────────── */

/** Geeft de volgende stap, of `"klaar"` als het formulier verzonden mag worden. */
export function volgendeStap(huidige: StapId, a: Antwoorden): StapId | "klaar" {
  const leerling = a.voorWie === "leerling";

  switch (huidige) {
    case "voor_wie":
      // De leerling die zelf invult, geeft zijn naam bij de contactgegevens.
      return leerling ? "klas" : "naam_kind";

    case "naam_kind":
      return "klas";

    case "klas":
      // Bij "iets anders" is er geen passend landelijk cijfer.
      if (a.klas === "anders") return "niveau_bericht";
      return "landelijk";

    case "landelijk":
      if (a.klas === "voorexamen") return "inhaal_bericht";
      return "cijfer";

    case "cijfer":
      return "grafiek";

    case "grafiek":
      return leerling ? "grootste_probleem" : "ouder_pijn";

    case "ouder_pijn":
      return "geruststelling";

    case "geruststelling":
    case "grootste_probleem":
      return "droom";

    case "droom":
      return "contact";

    case "contact":
      return "klaar";

    // Zijroute — klas 4 of 5: geen apart programma, wel contact vastleggen
    case "inhaal_bericht":
      return "inhaal_contact";
    case "inhaal_contact":
      return "klaar";

    // Zijroute — ander niveau of ander vak: vraag vastleggen
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
  return "hoofdroute";
}

/** Interne markering voor de notificatiemail. Alleen relevant op de hoofdroute. */
export function bepaalMarkering(a: Antwoorden): Markering {
  if (bepaalRoute(a) !== "hoofdroute") return null;
  if (a.cijfer === "onder_4" || a.cijfer === "4_5") return "extra_screening";
  if (a.cijfer === "boven_65") return "premium_kandidaat";
  return null;
}

/* ─────────────────────────────────────────────────────────
   De landelijke cijfers na de klasvraag
   ───────────────────────────────────────────────────────── */

/** "bijna 28" of "ruim 20": een percentage nooit stilletjes naar boven afronden. */
function vanDe100(procent: number) {
  const heel = Math.round(procent);
  const woord = heel - procent > 0.05 ? "bijna " : procent - heel > 0.05 ? "ruim " : "";
  return { heel, tekst: `${woord}${heel}` };
}

export type Statistiek =
  | { soort: "een"; kop: string; aantal: number; uitweg: Tekst; bron: string }
  | { soort: "twee"; kop: string; tegels: { label: string; tekst: string }[]; uitweg: Tekst; bron: string };

const BRON = `Bron: DUO, Examenmonitor VO ${wiskundeOnvoldoende.jaar}. Onvoldoende voor het centraal examen wiskunde.`;

/** Hoeveel leerlingen een onvoldoende haalden voor het examen wiskunde, passend bij de klas. */
export function statistiekVoor(a: Antwoorden): Statistiek | null {
  const havo = vanDe100(wiskundeOnvoldoende.havo);
  const vwo = vanDe100(wiskundeOnvoldoende.vwo);

  if (a.klas === "examen_havo" || a.klas === "examen_vwo") {
    const isHavo = a.klas === "examen_havo";
    const deel = isHavo ? havo : vwo;
    return {
      soort: "een",
      kop: `In ${wiskundeOnvoldoende.jaar} haalden ${deel.tekst} van de 100 ${isHavo ? "HAVO" : "VWO"}-leerlingen een onvoldoende voor het examen wiskunde.`,
      aantal: deel.heel,
      uitweg: {
        u: "Met de juiste hulp hoeft {kind} daar niet bij te horen.",
        je: "Met de juiste hulp hoef jij daar niet bij te horen.",
      },
      bron: BRON,
    };
  }
  if (a.klas === "voorexamen") {
    // Het examen komt nog; we weten niet of het HAVO of VWO wordt, dus beide.
    return {
      soort: "twee",
      kop: "Veel leerlingen halen een onvoldoende voor het examen wiskunde.",
      tegels: [
        { label: `HAVO, examen ${wiskundeOnvoldoende.jaar}`, tekst: havo.tekst },
        { label: `VWO, examen ${wiskundeOnvoldoende.jaar}`, tekst: vwo.tekst },
      ],
      uitweg: {
        u: "Daarom is het goed dat u er nu al naar kijkt.",
        je: "Daarom is het goed dat je er nu al naar kijkt.",
      },
      bron: BRON,
    };
  }
  return null;
}

/* ─────────────────────────────────────────────────────────
   De geruststelling na de ouderpijn
   ───────────────────────────────────────────────────────── */

/**
 * Per aangevinkte zorg: wat wij eraan doen. Alleen wat echt in het programma
 * zit (coach en docent, weekrapport, diagnostische toets, examenstresstraining,
 * proefexamens onder tijd). Schrijf eenvoudig Nederlands.
 */
const geruststellingen: Record<string, { kop: string; tekst: string }> = {
  pushen: {
    kop: "Ruzie over het huiswerk?",
    tekst: "Wij herinneren {kind} aan het werk. Dat hoeft u niet meer te doen.",
  },
  stof: {
    kop: "Snapt u de wiskunde zelf niet?",
    tekst: "Dat hoeft ook niet. Dat doet de docent van {kind}.",
  },
  wakker: {
    kop: "Veel zorgen?",
    tekst: "U krijgt elke week een kort bericht. Zo ziet u hoe het gaat.",
  },
  geen_zicht: {
    kop: "Weet u niet wat er echt speelt?",
    tekst: "Een toets aan het begin laat precies zien wat {kind} mist.",
  },
  schuld: {
    kop: "Had u het eerder moeten zien?",
    tekst: "Nee. Een gat in de basis is moeilijk te zien. Daarom meten wij het eerst.",
  },
  moed: {
    kop: "Gelooft {kind} er zelf niet meer in?",
    tekst: "We beginnen bij wat {kind} al kan. Zo komt het vertrouwen terug.",
  },
  faalangst: {
    kop: "Paniek bij een toets?",
    tekst: "In ons programma zit een training tegen examenstress. En we oefenen met de klok erbij.",
  },
};

/** De geruststellingen bij de aangevinkte zorgen, in de volgorde van aanvinken. Hooguit drie. */
export function geruststellingVoor(a: Antwoorden) {
  return (a.ouderPijn ?? [])
    .map((sleutel) => geruststellingen[sleutel])
    .filter((g): g is { kop: string; tekst: string } => Boolean(g))
    .slice(0, 3);
}

/* ─────────────────────────────────────────────────────────
   De grafiek na de cijfervraag
   ───────────────────────────────────────────────────────── */

/** Welke cijfers bij elk antwoord horen. "Lager dan 4" tekenen we als 3 tot 4. */
const cijferBand: Record<Cijfer, { van: number; tot: number; label: string }> = {
  onder_4: { van: 3, tot: 4, label: "lager dan 4" },
  "4_5": { van: 4, tot: 5, label: "4 tot 5" },
  "5_55": { van: 5, tot: 5.5, label: "5 tot 5,5" },
  "55_65": { van: 5.5, tot: 6.5, label: "5,5 tot 6,5" },
  boven_65: { van: 6.5, tot: 7.5, label: "hoger dan 6,5" },
};

const alsCijfer = (n: number) => n.toLocaleString("nl-NL", { maximumFractionDigits: 1 });

/** De twee staven van de grafiek: nu, en nu plus de gemiddelde stijging (hooguit een 10). */
export function grafiekVoor(a: Antwoorden) {
  if (!a.cijfer) return null;
  const nu = cijferBand[a.cijfer];
  const van = Math.min(10, nu.van + gemiddeldePuntenErbij);
  const tot = Math.min(10, nu.tot + gemiddeldePuntenErbij);
  return {
    erbij: gemiddeldePuntenErbij,
    nu: { waarde: (nu.van + nu.tot) / 2, label: nu.label },
    straks: { waarde: (van + tot) / 2, label: `${alsCijfer(van)} tot ${alsCijfer(tot)}` },
  };
}

/** Is dit de laatste stap vóór verzenden? */
export function isLaatsteStap(huidige: StapId, a: Antwoorden): boolean {
  return volgendeStap(huidige, a) === "klaar";
}

/* ─────────────────────────────────────────────────────────
   Leesbare labels — voor de notificatiemail
   ───────────────────────────────────────────────────────── */

export const leesbaar: Record<string, string> = {
  // klas
  examen_havo: "Examenklas HAVO",
  examen_vwo: "Examenklas VWO",
  voorexamen: "Klas 4 of 5",
  // cijfer
  onder_4: "onder de 4",
  "4_5": "tussen de 4 en 5",
  "5_55": "tussen de 5 en 5,5",
  "55_65": "tussen de 5,5 en 6,5",
  boven_65: "boven de 6,5",
  // niveau (zijroute)
  vmbo_bb: "VMBO basis",
  vmbo_kb: "VMBO kader",
  vmbo_gl: "VMBO gemengd",
  vmbo_tl: "VMBO theoretisch",
  mbo: "MBO",
  onderbouw: "Onderbouw HAVO/VWO",
  anders: "Anders",
};

/** Zet een opgeslagen waarde om naar leesbare tekst voor de mail. */
export function label(waarde: string | undefined): string {
  if (!waarde) return "—";
  return leesbaar[waarde] ?? waarde;
}

/** Zoekt het getoonde label van een optie op, zoals de invuller het zag. */
export function optieLabels(stapId: StapId, waarden: string[] = [], a: Antwoorden = {}): string[] {
  const stap = stappen[stapId];
  if (!("opties" in stap)) return waarden;
  return waarden.map((w) => {
    const optie = stap.opties.find((o) => o.waarde === w);
    return optie ? persoonlijk(optie.label, a) : w;
  });
}
