/**
 * De losse contentblokken van de oudergids.
 *
 * Geschreven in eenvoudig Nederlands (taalniveau B1), omdat veel ouders zelf
 * moeite hebben met de taal: korte zinnen, gewone woorden, geen beeldspraak.
 * De inhoud volgt `docs/oudergids-gepersonaliseerd.md`. Variabelen ({leerling},
 * {cijfer}, {niveau}, {onvoldoende}, {jaar}) worden ingevuld door `assemble()`.
 */

import type { Blok } from "./types";

const naarDeTips = {
  soort: "alinea",
  tekst: "Hieronder vindt u alvast een paar tips voor thuis. Ze gaan niet over wiskunde. Ze gaan over de gesprekken thuis.",
} as const;

/* ── Opening — één van de drie, op basis van het cijfer ── */

export const openingen: Record<"laag" | "midden" | "hoog", Blok> = {
  laag: {
    id: "opening-laag",
    kop: "Dank u wel. Adam belt u binnen 1 werkdag.",
    regels: [
      {
        soort: "alinea",
        tekst:
          "U schreef dat {leerling} nu {cijfer} staat voor wiskunde. Dat komt vaak voor. Bij het examen van {jaar} haalden {onvoldoende} van de 100 {niveau}-leerlingen een onvoldoende voor wiskunde. Toch is het goed om nu iets te doen. Hulp werkt nu beter dan later.",
      },
      naarDeTips,
    ],
  },
  midden: {
    id: "opening-midden",
    kop: "Dank u wel. Adam belt u binnen 1 werkdag.",
    regels: [
      {
        soort: "alinea",
        tekst:
          "U schreef dat {leerling} nu {cijfer} staat voor wiskunde. Dat is dicht bij een voldoende. Daarom lijkt het of het vanzelf goed komt. Maar zeker is dat niet. Vaak gaat het mis bij een paar onderwerpen. Dat is goed op te lossen.",
      },
      naarDeTips,
    ],
  },
  hoog: {
    id: "opening-hoog",
    kop: "Dank u wel. Adam belt u binnen 1 werkdag.",
    regels: [
      {
        soort: "alinea",
        tekst:
          "U schreef dat {leerling} voldoende staat voor wiskunde. Maar {leerling} heeft een hoger cijfer nodig voor een studie. Dan gaat het niet om slagen. Het gaat om de laatste punten: van een 6 naar een 8. Daar is een andere aanpak voor nodig. Dat bespreken we in het gesprek.",
      },
      {
        soort: "alinea",
        tekst: "Hieronder vindt u alvast een paar tips voor thuis. Ze helpen juist bij leerlingen die het eigenlijk wel kunnen.",
      },
    ],
  },
};

/* ── De drie vaste tips — altijd ── */

export const tips: Blok[] = [
  {
    id: "tip-1",
    kop: "1. Vraag niet elke dag naar het huiswerk",
    regels: [
      {
        soort: "alinea",
        tekst:
          "Veel ouders vragen elke dag: ‘Heb je je huiswerk al gemaakt?’ Dat is logisch. Maar elke dag dezelfde vraag voelt voor uw kind als controle. Dan gaat uw kind zich verzetten.",
      },
      {
        soort: "alinea",
        tekst:
          "Kies liever één vast moment in de week. Bijvoorbeeld zondagavond, tien minuten. Dan kijkt u samen hoe het gaat. De rest van de week vraagt u niets.",
      },
      {
        soort: "alinea",
        tekst: "Dat voelt eerst raar. Maar één rustig gesprek helpt meer dan zeven keer vragen.",
      },
    ],
  },
  {
    id: "tip-2",
    kop: "2. Vraag naar de eerste stap",
    regels: [
      {
        soort: "alinea",
        tekst:
          "‘Je moet harder werken’ is waar. Maar het helpt niet. Uw kind weet dat zelf ook al. Het weet alleen niet waar het moet beginnen.",
      },
      { soort: "alinea", tekst: "Vraag daarom:" },
      { soort: "citaat", tekst: "Wat is het eerste dat je gaat doen?" },
      {
        soort: "alinea",
        tekst:
          "Zo wordt een grote berg werk één kleine stap. Beginnen is vaak het moeilijkste. En uw kind bedenkt het plan zelf. Dan is het geen opdracht van u.",
      },
    ],
  },
  {
    id: "tip-3",
    kop: "3. Wees nieuwsgierig bij een slecht cijfer",
    regels: [
      {
        soort: "alinea",
        tekst: "Er komt weer een onvoldoende. U bent teleurgesteld. Dat is normaal.",
      },
      {
        soort: "alinea",
        tekst:
          "Maar als u boos of teleurgesteld reageert, stopt het gesprek. Uw kind gaat zich verdedigen of zegt niets meer. Dan weet u nog steeds niet wat er misging.",
      },
      { soort: "alinea", tekst: "Vraag liever:" },
      { soort: "citaat", tekst: "Welke vragen gingen fout? Snapte je het niet, of had je te weinig tijd?" },
      {
        soort: "alinea",
        tekst:
          "Zo neemt u het cijfer serieus. Maar u praat over het probleem, niet over uw kind. En u hoort iets waar u mee verder kunt.",
      },
    ],
  },
];

/* ── Modules — maximaal twee, op basis van ouderPijn ── */

export const modules: Record<string, Blok> = {
  pushen: {
    id: "module-pushen",
    kop: "Waarom steeds pushen niet werkt",
    regels: [
      {
        soort: "alinea",
        tekst:
          "Als u steeds duwt, hoeft uw kind dat zelf niet te doen. Hoe meer u duwt, hoe minder uw kind zelf doet. En hoe meer u moet blijven duwen. Dat is geen onwil. Zo werkt het gewoon.",
      },
      {
        soort: "alinea",
        tekst:
          "Helemaal stoppen met duwen helpt meestal ook niet. Beter is: **laat iemand anders het duwen doen.** Iemand buiten het gezin. Die let op het huiswerk en herinnert uw kind eraan.",
      },
      {
        soort: "alinea",
        tekst:
          "Dan hoeft u niet meer de strenge ouder te zijn. U kunt weer gewoon ouder zijn. En daar heeft uw kind u het meest nodig.",
      },
      {
        soort: "noot",
        tekst: "Dit nemen wij altijd van u over. Wij herinneren en controleren uw kind. Dat hoeft u niet meer te doen.",
      },
    ],
  },
  stof: {
    id: "module-stof",
    kop: "Zo helpt u, ook als u de wiskunde niet snapt",
    regels: [
      {
        soort: "alinea",
        tekst:
          "Veel ouders voelen zich machteloos als ze de wiskunde zelf niet snappen. Dat is begrijpelijk. Maar u hoeft de wiskunde niet uit te leggen. U kunt op een andere manier helpen.",
      },
      { soort: "alinea", tekst: "Drie dingen die echt helpen:" },
      {
        soort: "alinea",
        tekst:
          "**Laat uw kind het aan u uitleggen.** Zeg: ‘Leg eens uit wat je nu doet.’ U hoeft het niet te snappen. Door uit te leggen ziet uw kind zelf wat het nog niet begrijpt.",
      },
      {
        soort: "alinea",
        tekst:
          "**Zorg voor een vaste plek en een vaste tijd.** Een rustige plek om te leren. Elke dag op hetzelfde moment. De telefoon in een andere kamer. Dat helpt meer dan u denkt.",
      },
      {
        soort: "alinea",
        tekst:
          "**Zorg dat er iemand is die de wiskunde wel kan uitleggen.** U hoeft niet de docent te zijn. U zorgt dat er een goede docent is.",
      },
    ],
  },
  wakker: {
    id: "module-wakker",
    kop: "Waar u wel iets aan kunt doen",
    regels: [
      {
        soort: "alinea",
        tekst:
          "Het zwaarste is niet het cijfer. Het zwaarste is dat u niet weet of het goed komt. En dat u denkt dat u niets kunt doen.",
      },
      {
        soort: "alinea",
        tekst: "Het examen in mei kunt u niet veranderen. Maar u kunt wel kijken of het beter gaat dan vorige maand.",
      },
      {
        soort: "alinea",
        tekst:
          "**Kijk of het beter gaat.** Eén cijfer zegt weinig. Drie cijfers na elkaar zeggen veel. Gaan de cijfers omhoog? Dan hoeft u niet in paniek te raken. Ook niet als het nog een onvoldoende is.",
      },
      {
        soort: "alinea",
        tekst:
          "**Spreek met uzelf af wanneer u zich zorgen gaat maken.** Bijvoorbeeld: als twee toetsen na elkaar niet beter gaan. Tot dat moment hoeft u niets te doen. Dan kan uw hoofd rusten.",
      },
      {
        soort: "alinea",
        tekst:
          "**Laat iemand anders opletten.** Dit geeft de meeste rust: weten dat iemand alles bijhoudt. En dat die persoon u waarschuwt als het nodig is.",
      },
    ],
  },
  geen_zicht: {
    id: "module-geen-zicht",
    kop: "Drie vragen die wel een antwoord geven",
    regels: [
      {
        soort: "alinea",
        tekst:
          "U vraagt: ‘Hoe ging het?’ Uw kind zegt: ‘Goed.’ U vraagt: ‘Hoe gaat wiskunde?’ Uw kind zegt: ‘Wel oké.’ Dat is geen onwil. Deze vragen zijn te groot om goed te beantwoorden.",
      },
      { soort: "alinea", tekst: "Deze drie vragen werken beter:" },
      {
        soort: "alinea",
        tekst:
          "**‘Welk onderwerp hebben jullie nu?’** Deze vraag is makkelijk te beantwoorden. En u weet meteen waar het over gaat.",
      },
      {
        soort: "alinea",
        tekst:
          "**‘Wat ging er mis bij de vragen die je fout had?’** Er zijn vier mogelijke oorzaken. Uw kind snapt de stof niet. Of snapt de vraag niet. Of had te weinig tijd. Of was slordig. Elke oorzaak heeft een andere oplossing nodig.",
      },
      {
        soort: "alinea",
        tekst:
          "**‘Wat heb je nodig om dit wel te kunnen?’** Vaak krijgt u hier een duidelijk antwoord op. Kinderen weten vaak goed wat ze missen.",
      },
      {
        soort: "noot",
        tekst: "In ons gesprek stellen we deze vragen ook, maar uitgebreider. En de toets aan het begin laat zien wat er echt misgaat.",
      },
    ],
  },
};

/* ── Extra module — alleen bij faalangst ── */

export const faalangst: Blok = {
  id: "module-faalangst",
  kop: "Als uw kind in paniek raakt bij toetsen",
  regels: [
    {
      soort: "alinea",
      tekst: "Uw kind kent de stof. Maar bij de toets lukt het niet. Dat is heel vervelend. En het komt veel vaker voor dan u denkt.",
    },
    { soort: "alinea", tekst: "Drie dingen die helpen:" },
    {
      soort: "alinea",
      tekst:
        "**Laat uw kind oefenen met een klok erbij.** Thuis rustig sommen maken is anders dan een toets met weinig tijd. Werken met weinig tijd kun je leren.",
    },
    {
      soort: "alinea",
      tekst:
        "**Maak een vast begin voor elke toets.** Eerst alles lezen. Dan beginnen met de makkelijkste vraag. Lukt de eerste vraag? Dan gaat de rest ook beter.",
    },
    {
      soort: "alinea",
      tekst: "**Zeg niet dat het heel belangrijk is.** Uw kind weet dat al. Het geeft alleen meer spanning.",
    },
    {
      soort: "alinea",
      tekst:
        "Is de angst heel groot? Is uw kind dagen van tevoren al heel gespannen? Of weet het bij de toets helemaal niets meer? Praat dan met de mentor of de huisarts. Dan is er andere hulp nodig dan bijles.",
    },
    {
      soort: "noot",
      tekst: "In ons programma zit een korte training tegen examenstress. Vlak voor het examen belt de coach uw kind ook nog persoonlijk.",
    },
  ],
};

/* ── Afsluiting — altijd ── */

export const afsluiting: Blok = {
  id: "afsluiting",
  kop: "Nu hoeft u even niets te doen.",
  regels: [
    {
      soort: "alinea",
      tekst: "U heeft de vragen ingevuld. Daarmee heeft u het belangrijkste gedaan.",
    },
    {
      soort: "alinea",
      tekst:
        "Adam belt u binnen 1 werkdag. Het gesprek duurt 30 minuten. Samen kijkt u waar {leerling} nu staat. En u krijgt een eerlijk antwoord: kan {leerling} slagen in 12 weken?",
    },
    {
      soort: "alinea",
      tekst: "Kan het niet? Dan zeggen we dat ook eerlijk. Daarom voeren we deze gesprekken.",
    },
    { soort: "alinea", tekst: "Tot snel,\n**Adam**, ExamenDocent" },
  ],
};

/* ── Leerlingvariant — als de leerling zelf het formulier invult ── */

export const leerlingGids: Blok[] = [
  {
    id: "leerling-opening",
    kop: "Dankjewel. Adam belt je binnen 1 werkdag.",
    regels: [
      {
        soort: "alinea",
        tekst: "Je regelt dit zelf. Dat is knap. Meestal doen ouders dit. Jij doet het zelf.",
      },
      {
        soort: "alinea",
        tekst: "Hieronder staan drie tips voor deze week. Samen kosten ze minder dan een half uur.",
      },
    ],
  },
  {
    id: "leerling-tip-1",
    kop: "1. Begin met de makkelijkste som",
    regels: [
      {
        soort: "alinea",
        tekst:
          "Beginnen is vaak het moeilijkste. Zoek daarom eerst een som die je zeker kunt. Lukt die? Dan gaat de rest ook makkelijker.",
      },
    ],
  },
  {
    id: "leerling-tip-2",
    kop: "2. Kijk waarom je iets fout had",
    regels: [
      {
        soort: "alinea",
        tekst:
          "Schrijf achter elke fout één woord: **stof** (ik snapte het niet), **vraag** (ik las de vraag verkeerd), **tijd** (ik had te weinig tijd) of **slordig**. Na tien sommen zie je wat vaak misgaat. Dat ga je oefenen.",
      },
      {
        soort: "noot",
        tekst: "Neem dit lijstje mee naar het gesprek. Dan kunnen we meteen beginnen.",
      },
    ],
  },
  {
    id: "leerling-tip-3",
    kop: "3. Oefen 1 keer per week met een klok",
    regels: [
      {
        soort: "alinea",
        tekst:
          "Rustig sommen maken is anders dan een examen maken. Zet 1 keer per week een wekker. Neem net zoveel tijd als op het examen. Je went er snel aan.",
      },
    ],
  },
  {
    id: "leerling-afsluiting",
    kop: "Nu hoef je even niets te doen.",
    regels: [
      {
        soort: "alinea",
        tekst:
          "Adam belt je binnen 1 werkdag. Het gesprek duurt 30 minuten. We kijken waar je nu staat. En je krijgt een eerlijk antwoord: kun je slagen in 12 weken? Kan het niet? Dan zeggen we dat ook.",
      },
      { soort: "alinea", tekst: "Tot snel,\n**Adam**, ExamenDocent" },
    ],
  },
];
