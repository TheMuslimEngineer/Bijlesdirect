/**
 * De losse contentblokken van de oudergids.
 *
 * Teksten letterlijk uit `docs/oudergids-gepersonaliseerd.md`. Variabelen
 * ({leerling}, {cijfer}, {vak}, {niveau}) worden ingevuld door `assemble()`.
 */

import type { Blok } from "./types";

/* ── Opening — één van de drie, op basis van het cijfer ── */

export const openingen: Record<"laag" | "midden" | "hoog", Blok> = {
  laag: {
    id: "opening-laag",
    kop: "Dank u wel — we bellen u binnen één werkdag.",
    regels: [
      {
        soort: "alinea",
        tekst:
          "U gaf aan dat {leerling} op dit moment {cijfer} staat voor {vak}. Ter context: ongeveer een kwart van alle {niveau}-kandidaten haalt een onvoldoende voor dit vak. Dit is dus verre van uitzonderlijk — maar het betekent wel dat er werk aan de winkel is, en dat gerichte hulp op dit moment meer verschil maakt dan later.",
      },
      {
        soort: "alinea",
        tekst:
          "Tot we elkaar spreken, hierbij alvast iets waar u vanavond al iets aan heeft. Het gaat niet over wiskunde. Het gaat over de gesprekken thuis.",
      },
    ],
  },
  midden: {
    id: "opening-midden",
    kop: "Dank u wel — we bellen u binnen één werkdag.",
    regels: [
      {
        soort: "alinea",
        tekst:
          "U gaf aan dat {leerling} {cijfer} staat voor {vak}. Dat is een lastige plek: dicht genoeg bij de streep om te denken dat het vanzelf goed komt, en ver genoeg ervandaan om het niet zeker te weten. In de praktijk gaat het bij dit soort cijfers vaak om een beperkt aantal onderwerpen waar structureel punten verloren gaan — en dat is goed op te lossen.",
      },
      {
        soort: "alinea",
        tekst:
          "Tot we elkaar spreken, hierbij alvast iets waar u vanavond al iets aan heeft. Het gaat niet over wiskunde. Het gaat over de gesprekken thuis.",
      },
    ],
  },
  hoog: {
    id: "opening-hoog",
    kop: "Dank u wel — we bellen u binnen één werkdag.",
    regels: [
      {
        soort: "alinea",
        tekst:
          "U gaf aan dat {leerling} het op zich redt voor {vak}, maar dat het cijfer omhoog moet voor de vervolgstudie. Dat is een ander vraagstuk dan een onvoldoende wegwerken: het gaat niet om gaten dichten, maar om de laatste punten pakken die het verschil maken tussen een zes en een acht. Daar is een andere aanpak voor nodig, en die bespreken we in het gesprek.",
      },
      {
        soort: "alinea",
        tekst:
          "Tot die tijd: hieronder een paar dingen die thuis vaak het verschil maken — juist bij leerlingen die het eigenlijk wél kunnen.",
      },
    ],
  },
};

/* ── De drie vaste tips — altijd ── */

export const tips: Blok[] = [
  {
    id: "tip-1",
    kop: "1. Vervang de dagelijkse vraag door één vast moment",
    regels: [
      {
        soort: "alinea",
        tekst:
          "“Heb je je huiswerk al gemaakt?” is de meest gestelde vraag in Nederlandse huiskamers, en de minst effectieve. Niet omdat het een slechte vraag is, maar omdat de dagelijkse herhaling het gesprek verandert in controle — en controle roept weerstand op.",
      },
      {
        soort: "alinea",
        tekst:
          "Spreek in plaats daarvan één vast moment per week af waarop u samen kijkt hoe het staat. Zondagavond, tien minuten. De rest van de week vraagt u niets.",
      },
      {
        soort: "alinea",
        tekst:
          "Dat voelt eerst ongemakkelijk. Maar u ruilt zeven korte confrontaties in voor één rustig gesprek — en dat gesprek levert doorgaans meer op dan die zeven bij elkaar.",
      },
    ],
  },
  {
    id: "tip-2",
    kop: "2. Vraag naar de eerste stap, niet naar het eindresultaat",
    regels: [
      {
        soort: "alinea",
        tekst:
          "“Je moet echt harder gaan werken” is waar, en tegelijk volstrekt nutteloos. Het benoemt een probleem waar uw kind zelf ook al van weet, zonder een aanknopingspunt te geven.",
      },
      { soort: "alinea", tekst: "Vraag in plaats daarvan:" },
      { soort: "citaat", tekst: "Wat is het eerste wat je zou moeten doen?" },
      {
        soort: "alinea",
        tekst:
          "Die vraag doet twee dingen tegelijk. Ze maakt een berg werk terug tot één handeling — en uitstelgedrag zit bijna altijd in het begínnen, niet in het doen. En ze legt de regie bij uw kind, waardoor het geen opdracht is die u geeft maar een plan dat het zelf maakt.",
      },
    ],
  },
  {
    id: "tip-3",
    kop: "3. Reageer op een cijfer met nieuwsgierigheid, niet met een oordeel",
    regels: [
      {
        soort: "alinea",
        tekst:
          "Er komt weer een onvoldoende binnen. De natuurlijke reactie is teleurstelling, en die is volkomen begrijpelijk.",
      },
      {
        soort: "alinea",
        tekst:
          "Maar teleurstelling sluit het gesprek. Uw kind gaat zich verdedigen of trekt zich terug, en u komt niet te weten wat er werkelijk misging.",
      },
      { soort: "alinea", tekst: "Probeer:" },
      { soort: "citaat", tekst: "Welke vragen gingen er mis? Was het de stof, of de tijd?" },
      {
        soort: "alinea",
        tekst:
          "Dat is geen softe reactie — u neemt het cijfer volkomen serieus. Alleen richt u de aandacht op het probleem in plaats van op de persoon. En u komt iets te weten waar u iets mee kunt.",
      },
    ],
  },
];

/* ── Modules — maximaal twee, op basis van ouderPijn ── */

export const modules: Record<string, Blok> = {
  pushen: {
    id: "module-pushen",
    kop: "Waarom pushen op den duur averechts werkt",
    regels: [
      {
        soort: "alinea",
        tekst:
          "Als u de motor bent, hoeft uw kind dat niet te zijn. Hoe meer u duwt, hoe minder eigen verantwoordelijkheid er nodig is — en hoe harder u moet blijven duwen. Dat is geen onwil van uw kind; het is hoe het werkt.",
      },
      {
        soort: "alinea",
        tekst:
          "De uitweg is niet loslaten (dat voelt als opgeven en werkt meestal ook niet), maar **het duwen verplaatsen naar iemand anders**. Iemand buiten het gezin die het huiswerk bewaakt, herinnert en erop terugkomt.",
      },
      {
        soort: "alinea",
        tekst:
          "Zolang u degene bent die aanspoort, is elk gesprek over school ook een gesprek over gehoorzaamheid. Zodra iemand anders die rol overneemt, kunt u weer gewoon ouder zijn — en dat is precies de rol waarin u het meeste voor uw kind betekent.",
      },
      {
        soort: "noot",
        tekst:
          "Dit is trouwens ook wat wij standaard overnemen: het herinneren en controleren loopt bij ons via de docent naar de leerling, niet via u.",
      },
    ],
  },
  stof: {
    id: "module-stof",
    kop: "Hoe u helpt zonder de stof te kennen",
    regels: [
      {
        soort: "alinea",
        tekst:
          "Veel ouders voelen zich machteloos zodra de wiskunde voorbij hun eigen niveau gaat. Begrijpelijk — maar inhoudelijke hulp is niet waar u het verschil maakt.",
      },
      {
        soort: "alinea",
        tekst: "Drie dingen die niets met wiskunde te maken hebben en toch aantoonbaar helpen:",
      },
      {
        soort: "alinea",
        tekst:
          "**Vraag uw kind het u uit te leggen.** “Leg me eens uit wat je nu aan het doen bent.” U hoeft het niet te begrijpen. Uitleggen dwingt uw kind om te ordenen wat het weet, en juist daar wordt zichtbaar wat nog niet zit. Dat u het zelf niet snapt, maakt niet uit — het effect zit in het vertellen.",
      },
      {
        soort: "alinea",
        tekst:
          "**Bewaak de omstandigheden, niet de inhoud.** Een vaste plek, een vast tijdstip, telefoon in een andere kamer. Dat is uw terrein, en het scheelt meer dan mensen denken.",
      },
      {
        soort: "alinea",
        tekst:
          "**Zorg dat er iemand is die het wél kan.** Uw taak is niet om de docent te zijn, maar om ervoor te zorgen dat er een goede docent is.",
      },
    ],
  },
  wakker: {
    id: "module-wakker",
    kop: "Waar u wél invloed op heeft",
    regels: [
      {
        soort: "alinea",
        tekst:
          "De onzekerheid is het zwaarste deel. Niet het cijfer zelf, maar het niet weten of het nog goed komt — en het gevoel dat u er weinig aan kunt doen.",
      },
      {
        soort: "alinea",
        tekst:
          "Wat helpt, is de aandacht verplaatsen van iets wat u niet kunt beïnvloeden (het examen in mei) naar iets wat wel meetbaar is (of het beter gaat dan vorige maand).",
      },
      {
        soort: "alinea",
        tekst:
          "**Kijk naar de richting, niet naar het niveau.** Eén cijfer zegt weinig. Drie cijfers achter elkaar zeggen alles. Zolang de lijn omhoog loopt, is er geen reden tot paniek — ook niet als het cijfer nog onvoldoende is.",
      },
      {
        soort: "alinea",
        tekst:
          "**Spreek af wanneer u zich zorgen máákt.** Klinkt vreemd, maar het werkt: bepaal vooraf welk signaal betekent dat er iets moet veranderen (bijvoorbeeld: twee toetsen op rij geen verbetering). Tot dat moment hoeft u niets te doen. Dat geeft uw hoofd toestemming om te rusten.",
      },
      {
        soort: "alinea",
        tekst:
          "**Zorg dat iemand anders het overzicht bewaakt.** Wat de meeste onrust wegneemt, is niet zelf beter opletten — maar weten dat er iemand is die het bijhoudt en aan de bel trekt als het nodig is.",
      },
    ],
  },
  geen_zicht: {
    id: "module-geen-zicht",
    kop: "Drie vragen die wél iets opleveren",
    regels: [
      {
        soort: "alinea",
        tekst:
          "“Hoe ging het?” levert “goed” op. “Hoe gaat wiskunde?” levert “wel oké” op. Dat is geen onwil — het zijn te grote vragen om zinnig te beantwoorden.",
      },
      { soort: "alinea", tekst: "Deze drie werken beter:" },
      {
        soort: "alinea",
        tekst:
          "**“Welk onderwerp doen jullie nu?”** Concreet en feitelijk, dus makkelijk te beantwoorden. En u weet meteen waar het over gaat.",
      },
      {
        soort: "alinea",
        tekst:
          "**“Wat ging er mis bij de vragen die je fout had?”** Dit onderscheidt de vier oorzaken die er werkelijk toe doen: de stof niet snappen, de vraag niet begrijpen, tijdgebrek, of slordigheid. Die vragen om totaal verschillende oplossingen — en zonder dat onderscheid weet niemand wat er moet gebeuren.",
      },
      {
        soort: "alinea",
        tekst:
          "**“Wat zou je nodig hebben om dit wél te kunnen?”** Vaak komt hier een verrassend helder antwoord uit. Kinderen weten meestal beter dan ze laten merken wat er ontbreekt.",
      },
      {
        soort: "noot",
        tekst:
          "In ons gesprek stellen we in feite een uitgebreide versie van deze vragen — en de diagnostische toets maakt zichtbaar wat er zonder toets nooit boven tafel komt.",
      },
    ],
  },
};

/* ── Extra module — alleen bij faalangst ── */

export const faalangst: Blok = {
  id: "module-faalangst",
  kop: "Als uw kind dichtklapt bij toetsen",
  regels: [
    {
      soort: "alinea",
      tekst:
        "Dat een kind de stof kent en het bij de toets tóch niet laat zien, is frustrerend voor iedereen — en het is veel gewoner dan het voelt.",
    },
    { soort: "alinea", tekst: "Drie dingen die in de praktijk verschil maken:" },
    {
      soort: "alinea",
      tekst:
        "**Zorg dat “geoefend” ook echt oefenen ónder tijdsdruk betekent.** Wie thuis rustig sommen maakt maar nooit met een klok, oefent iets anders dan wat er in de examenzaal gebeurt. Toetsen onder tijd maken is een vaardigheid op zich, en die is te trainen.",
    },
    {
      soort: "alinea",
      tekst:
        "**Bouw een vast rijtje voor het begin van elke toets.** Eerst alles doorlezen, dan beginnen met de makkelijkste vraag. Één succesvolle vraag aan het begin verandert de rest van het uur.",
    },
    {
      soort: "alinea",
      tekst:
        "**Verlaag de inzet in uw eigen woorden.** Als uw kind al gespannen is, voegt “dit is heel belangrijk” niets toe behalve druk. Het weet dat het belangrijk is.",
    },
    {
      soort: "alinea",
      tekst:
        "Zit het dieper — echt dichtklappen, blackout, hevige spanning dagen van tevoren — bespreek dat dan met de mentor of de huisarts. Dat is geen studieprobleem meer, en dan is de juiste hulp een andere dan bijles.",
    },
    {
      soort: "noot",
      tekst:
        "In ons programma zit een korte training rond examenstress, plus een persoonlijk belmoment vlak vóór het examen.",
    },
  ],
};

/* ── Afsluiting — altijd ── */

export const afsluiting: Blok = {
  id: "afsluiting",
  kop: "En dan nu even niets.",
  regels: [
    {
      soort: "alinea",
      tekst:
        "U heeft het formulier ingevuld en daarmee het belangrijkste gedaan. Wij bellen u binnen één werkdag voor de Slagingscheck: dertig minuten waarin we in kaart brengen waar {leerling} staat, en waarin u een eerlijk antwoord krijgt op de vraag of slagen in twaalf weken haalbaar is.",
    },
    {
      soort: "alinea",
      tekst: "Is het niet haalbaar, dan zeggen we dat ook. Dat is de reden dat we deze gesprekken voeren.",
    },
    { soort: "alinea", tekst: "Tot snel,\n**Adam** — Bijlesdirect" },
  ],
};

/* ── Leerlingvariant — als de leerling zelf het formulier invult ── */

export const leerlingGids: Blok[] = [
  {
    id: "leerling-opening",
    kop: "Dankjewel — we bellen je binnen één werkdag.",
    regels: [
      {
        soort: "alinea",
        tekst:
          "Dat je dit zelf regelt zegt meer dan je denkt. De meeste aanvragen komen van ouders; jij bent er zelf achteraan gegaan.",
      },
      {
        soort: "alinea",
        tekst:
          "Tot we elkaar spreken: drie dingen die je deze week al kunt doen. Ze kosten je bij elkaar geen half uur.",
      },
    ],
  },
  {
    id: "leerling-tip-1",
    kop: "1. Begin bij de makkelijkste som, niet bij de eerste",
    regels: [
      {
        soort: "alinea",
        tekst:
          "Uitstellen zit bijna nooit in het werk zelf, maar in het beginnen. Zoek daarom eerst een opgave waarvan je zeker weet dat je hem kunt. Eén som die lukt, verandert het uur dat erop volgt.",
      },
    ],
  },
  {
    id: "leerling-tip-2",
    kop: "2. Kijk je fouten na op oorzaak, niet op antwoord",
    regels: [
      {
        soort: "alinea",
        tekst:
          "Zet achter elke fout één woord: **stof** (ik snapte het niet), **vraag** (ik las hem verkeerd), **tijd** of **slordig**. Na tien opgaven zie je je eigen patroon — en dat patroon bepaalt wat je moet oefenen.",
      },
      {
        soort: "noot",
        tekst: "Neem dat lijstje mee naar het gesprek. Dan hebben we meteen iets om op te bouwen.",
      },
    ],
  },
  {
    id: "leerling-tip-3",
    kop: "3. Oefen één keer per week met de klok erbij",
    regels: [
      {
        soort: "alinea",
        tekst:
          "Rustig sommen maken en een examen maken zijn twee verschillende vaardigheden. Zet één keer per week een wekker op de tijd die je op het examen krijgt. Dat went sneller dan je denkt.",
      },
    ],
  },
  {
    id: "leerling-afsluiting",
    kop: "En dan nu even niets.",
    regels: [
      {
        soort: "alinea",
        tekst:
          "We bellen je binnen één werkdag. In dat gesprek van dertig minuten kijken we waar je staat en krijg je een eerlijk antwoord op de vraag of slagen in twaalf weken haalbaar is. Is het niet haalbaar, dan zeggen we dat ook.",
      },
      { soort: "alinea", tekst: "Tot snel,\n**Adam** — Bijlesdirect" },
    ],
  },
];
