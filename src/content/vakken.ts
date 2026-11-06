/**
 * De vakpagina's onder /examentraining/[vak].
 *
 * Ouders en leerlingen zoeken heel specifiek ("examentraining wiskunde b vwo").
 * Elke pagina heeft daarom eigen inhoud: wat er op het centraal examen komt,
 * waar leerlingen punten verliezen en hoe Examenklaar daarop inspeelt.
 *
 * De examenstof komt uit de syllabi centraal examen 2027 van het College voor
 * Toetsen en Examens (examenblad.nl, versie 2, juli 2025), tabel 1.3 en
 * hoofdstuk 2. Elk jaar in september controleren of er iets is veranderd
 * (Septembermededeling), en `bron` en de tekst zo nodig bijwerken.
 *
 * Schrijfregels: eenvoudig Nederlands (B1), "u" tegen de ouder, geen
 * gedachtestreepjes, en geen zin die al op een andere pagina staat.
 */

export type Niveau = "HAVO" | "VWO";

export type Vak = {
  slug: string;
  /** "wiskunde B" */
  vak: string;
  niveau: Niveau;
  /** De examenklas: "HAVO 5" of "VWO 6". */
  klas: string;
  /** Omschrijving voor Google (110 tot 155 tekens). */
  omschrijving: string;
  intro: string;
  /** Wat er op het centraal examen komt, in gewone taal. */
  examenstof: { kop: string; uitleg: string }[];
  /** Wat alleen in het schoolexamen zit, als dat er is. */
  alleenSchoolexamen?: string;
  puntenVerlies: { kop: string; uitleg: string }[];
  aanpak: string;
  /** De syllabus waar de examenstof uit komt. */
  bron: { naam: string; url: string };
};

export const vakken: Vak[] = [
  {
    slug: "wiskunde-a-havo",
    vak: "wiskunde A",
    niveau: "HAVO",
    klas: "HAVO 5",
    omschrijving:
      "Examentraining wiskunde A voor HAVO 5. Lees wat er op het centraal examen komt, waar leerlingen punten verliezen en hoe wij uw kind voorbereiden.",
    intro:
      "Wiskunde A is het wiskundevak voor leerlingen met het profiel Economie en Maatschappij of Natuur en Gezondheid. Het examen gaat over rekenen in echte situaties: tabellen, grafieken, formules en statistiek.",
    examenstof: [
      {
        kop: "Rekenen en algebra",
        uitleg: "Rekenen met getallen, procenten en formules, en formules ombouwen naar een andere vorm.",
      },
      {
        kop: "Tabellen, grafieken en formules",
        uitleg:
          "Bij een tekst een tabel of grafiek maken, gegevens aflezen en vergelijkingen en ongelijkheden oplossen.",
      },
      {
        kop: "Lineaire en exponentiële verbanden",
        uitleg:
          "Groei met elke stap hetzelfde bedrag, of met een vast percentage zoals bij rente. Uw kind moet het verband herkennen, er een formule bij maken en ermee rekenen.",
      },
      {
        kop: "Statistiek",
        uitleg:
          "Data in tabellen en grafieken lezen en beoordelen, data verwerken, verdelingen vergelijken en op basis daarvan een conclusie trekken.",
      },
    ],
    alleenSchoolexamen:
      "Telproblemen en het onderdeel verandering zitten bij wiskunde A HAVO alleen in het schoolexamen.",
    puntenVerlies: [
      {
        kop: "De vraag te snel lezen",
        uitleg:
          "Bijna elke opgave begint met een stuk tekst over een echte situatie. Wie te snel leest, rekent iets anders uit dan er gevraagd wordt.",
      },
      {
        kop: "Een antwoord zonder berekening",
        uitleg:
          "Een goed eindantwoord levert vaak geen of minder punten op als de berekening ontbreekt. Ook met de grafische rekenmachine moet uw kind laten zien hoe het aan het antwoord komt.",
      },
      {
        kop: "Te vroeg afronden",
        uitleg:
          "Afronden doet uw kind pas aan het eind, en precies zoals de vraag aangeeft. Tussendoor afronden kost onnodig punten.",
      },
    ],
    aanpak:
      "Bij wiskunde A gaan punten vaak verloren op lezen en opschrijven. Met de diagnostische toets zien we waar het bij uw kind misgaat: bij procenten en formules uit de onderbouw, of bij het lezen van de vraag. Daarna oefent uw kind met echte examenopgaven en leert het per vraag wat de corrector wil zien.",
    bron: {
      naam: "Syllabus centraal examen 2027, wiskunde A HAVO",
      url: "https://www.examenblad.nl/2027/havo/documenten/syllabus-wiskunde-a-havo",
    },
  },
  {
    slug: "wiskunde-b-havo",
    vak: "wiskunde B",
    niveau: "HAVO",
    klas: "HAVO 5",
    omschrijving:
      "Examentraining wiskunde B voor HAVO 5: functies, meetkunde en differentiëren. Met een diagnose vooraf, een vaste docent en slagingsgarantie.",
    intro:
      "Wiskunde B is het zwaarste wiskundevak op de HAVO. Leerlingen met Natuur en Techniek hebben het altijd. Bij Natuur en Gezondheid en Economie en Maatschappij kiezen sommige leerlingen wiskunde B in plaats van wiskunde A.",
    examenstof: [
      {
        kop: "Functies, grafieken en vergelijkingen",
        uitleg:
          "Machtsfuncties, exponentiële en logaritmische functies, en sinus en cosinus voor dingen die zich herhalen. Daarbij vergelijkingen en ongelijkheden oplossen.",
      },
      {
        kop: "Meetkundige berekeningen",
        uitleg: "Afstanden en hoeken berekenen in figuren, met sinus, cosinus en tangens, en met algebra.",
      },
      {
        kop: "Toegepaste analyse",
        uitleg:
          "Beschrijven hoe een grafiek verandert, de afgeleide bepalen en die gebruiken, bijvoorbeeld om de top van een grafiek te vinden.",
      },
    ],
    puntenVerlies: [
      {
        kop: "Exact rekenen",
        uitleg:
          "Bij veel vragen staat dat het antwoord exact of algebraïsch moet. Een antwoord uit de grafische rekenmachine telt dan niet. Uw kind moet de algebra zelf kunnen.",
      },
      {
        kop: "Algebra uit de onderbouw",
        uitleg:
          "Haakjes wegwerken, rekenen met breuken en machten: dat komt in bijna elke opgave terug. Een gat van twee jaar geleden kost op het examen keer op keer punten.",
      },
      {
        kop: "De afgeleide",
        uitleg:
          "De rekenregels voor de afgeleide moeten zonder twijfelen gaan. Wie daar vastloopt, komt aan de rest van de opgave niet meer toe.",
      },
    ],
    aanpak:
      "Bij wiskunde B bouwt alles op elkaar. De diagnostische toets laat zien welke algebra nog niet zeker zit. Dat werken we eerst weg. Daarna oefent uw kind met examenopgaven waarin exact rekenen steeds terugkomt.",
    bron: {
      naam: "Syllabus centraal examen 2027, wiskunde B HAVO",
      url: "https://www.examenblad.nl/2027/havo/documenten/syllabus-wiskunde-b-havo",
    },
  },
  {
    slug: "wiskunde-a-vwo",
    vak: "wiskunde A",
    niveau: "VWO",
    klas: "VWO 6",
    omschrijving:
      "Examentraining wiskunde A voor VWO 6: algebra, telproblemen, functies, rijen en differentiëren. In een klein groepje, met slagingsgarantie.",
    intro:
      "Wiskunde A kiezen veel leerlingen met het profiel Economie en Maatschappij of Natuur en Gezondheid. Op het VWO is het examen pittig: lange teksten, situaties die uw kind zelf in een formule moet vangen, en ook differentiëren.",
    examenstof: [
      {
        kop: "Algebra en telproblemen",
        uitleg:
          "Rekenen met formules en variabelen, en tellen op hoeveel manieren iets kan, zoals bij combinaties en volgordes.",
      },
      {
        kop: "Functies en grafieken",
        uitleg:
          "Lineaire, kwadratische, machts-, exponentiële en logaritmische functies. Grafieken tekenen en lezen, en vergelijkingen en ongelijkheden oplossen.",
      },
      {
        kop: "Rijen",
        uitleg:
          "Een rij getallen herkennen en beschrijven, bijvoorbeeld een bedrag dat elk jaar met hetzelfde percentage groeit.",
      },
      {
        kop: "Helling en afgeleide",
        uitleg: "Hoe snel iets verandert: de helling van een grafiek bepalen en de afgeleide berekenen en gebruiken.",
      },
    ],
    alleenSchoolexamen:
      "Statistiek en kansrekening horen bij wiskunde A VWO bij het schoolexamen. In het centraal examen komen ze niet voor.",
    puntenVerlies: [
      {
        kop: "Zelf een model maken",
        uitleg:
          "Veel opgaven beschrijven een situatie in woorden. Uw kind moet daar zelf een formule bij opstellen. Dat is lastiger dan rekenen met een formule die al gegeven is.",
      },
      {
        kop: "Opschrijven wat de rekenmachine doet",
        uitleg:
          "Ook met de grafische rekenmachine moet uw kind noteren wat het invoert en wat eruit komt. Alleen het eindantwoord levert vaak niet alle punten op.",
      },
      {
        kop: "Tijd tekort",
        uitleg:
          "Het examen is lang, net als de teksten. Wie bij één opgave blijft hangen, heeft aan het eind te weinig tijd voor de rest.",
      },
    ],
    aanpak:
      "Bij wiskunde A op het VWO zit het verschil vaak in het vertalen van tekst naar wiskunde. Na de diagnostische toets oefent uw kind daar gericht mee: eerst het model opstellen, dan rekenen, dan alles netjes opschrijven. Zo wordt het examen een vast stappenplan.",
    bron: {
      naam: "Syllabus centraal examen 2027, wiskunde A VWO",
      url: "https://www.examenblad.nl/2027/vwo/documenten/syllabus-wiskunde-a-vwo-2027",
    },
  },
  {
    slug: "wiskunde-b-vwo",
    vak: "wiskunde B",
    niveau: "VWO",
    klas: "VWO 6",
    omschrijving:
      "Examentraining wiskunde B voor VWO 6: functies, differentiëren en integreren, goniometrie en meetkunde. Met een vaste docent en slagingsgarantie.",
    intro:
      "Wiskunde B is het zwaarste wiskundevak op het VWO. Leerlingen met Natuur en Techniek hebben het altijd. Ook leerlingen met een ander profiel kiezen het soms, bijvoorbeeld voor een technische studie.",
    examenstof: [
      {
        kop: "Functies, grafieken en vergelijkingen",
        uitleg:
          "Standaardfuncties, inverse functies en asymptoten, en vergelijkingen en ongelijkheden oplossen.",
      },
      {
        kop: "Differentiaal- en integraalrekening",
        uitleg:
          "De eerste en tweede afgeleide, de technieken om te differentiëren, en integralen opstellen en berekenen, bijvoorbeeld voor een oppervlakte.",
      },
      {
        kop: "Goniometrische functies",
        uitleg: "Sinus en cosinus als functie, en goniometrische vergelijkingen oplossen.",
      },
      {
        kop: "Meetkunde met coördinaten",
        uitleg:
          "Figuren in een assenstelsel, rekenen met vectoren en het inproduct, en meetkundige problemen met algebra oplossen.",
      },
    ],
    puntenVerlies: [
      {
        kop: "Exact moet echt exact",
        uitleg:
          "Op het VWO-examen wiskunde B staat bij veel vragen dat het antwoord exact moet. De grafische rekenmachine helpt dan niet. Uw kind moet de algebra zelf foutloos uitvoeren.",
      },
      {
        kop: "Redeneringen die kloppen",
        uitleg:
          "Bij meetkunde en bij vragen die beginnen met \"toon aan\" moet elke stap kloppen en op papier staan. Een gat in de redenering kost punten.",
      },
      {
        kop: "Kleine fouten die doorwerken",
        uitleg:
          "Een minteken of breuk die in stap twee misgaat, werkt door tot het eind van de opgave. Wie de basis zeker heeft, maakt die fouten minder vaak.",
      },
    ],
    aanpak:
      "Bij wiskunde B op het VWO is de algebra de basis van alles. De diagnostische toets laat zien welke technieken nog niet vast zitten. Die oefenen we eerst. Daarna werkt uw kind met examenopgaven op het niveau van het echte examen.",
    bron: {
      naam: "Syllabus centraal examen 2027, wiskunde B VWO",
      url: "https://www.examenblad.nl/2027/vwo/documenten/syllabus-wiskunde-b-vwo-2027",
    },
  },
  {
    slug: "wiskunde-c-vwo",
    vak: "wiskunde C",
    niveau: "VWO",
    klas: "VWO 6",
    omschrijving:
      "Examentraining wiskunde C voor VWO 6: van algebra en verbanden tot logisch redeneren en vorm en ruimte. Met een diagnose vooraf en slagingsgarantie.",
    intro:
      "Wiskunde C is het wiskundevak voor leerlingen met het profiel Cultuur en Maatschappij. In het centraal examen zitten twee onderwerpen die bij wiskunde A ontbreken: logisch redeneren, en vorm en ruimte.",
    examenstof: [
      {
        kop: "Rekenen, algebra en telproblemen",
        uitleg: "Rekenen met getallen en formules, en tellen op hoeveel manieren iets kan.",
      },
      {
        kop: "Verbanden en veranderingen",
        uitleg:
          "Lineaire, kwadratische, machts-, exponentiële en logaritmische verbanden, hoe ze veranderen, en de regelmaat in rijen.",
      },
      {
        kop: "Logisch redeneren",
        uitleg: "Een redenering controleren: volgt de conclusie echt uit wat er gegeven is?",
      },
      {
        kop: "Vorm en ruimte",
        uitleg:
          "Aanzichten en perspectieftekeningen maken van een ruimtelijk voorwerp, en er berekeningen aan doen.",
      },
    ],
    alleenSchoolexamen:
      "Statistiek en kansrekening zitten bij wiskunde C alleen in het schoolexamen.",
    puntenVerlies: [
      {
        kop: "Onderwerpen die nieuw voelen",
        uitleg:
          "Logisch redeneren en vorm en ruimte zijn voor veel leerlingen onbekend terrein. Op het examen tellen ze volledig mee, dus ze verdienen eigen oefentijd.",
      },
      {
        kop: "Lezen wat er staat",
        uitleg:
          "Ook bij wiskunde C begint bijna elke opgave met tekst. Wie een detail mist, zoals een eenheid of een periode, rekent iets anders uit dan gevraagd.",
      },
      {
        kop: "Laten zien hoe",
        uitleg:
          "Bij een berekening telt de uitwerking mee. Wie alleen het antwoord opschrijft, laat punten liggen.",
      },
    ],
    aanpak:
      "Bij wiskunde C werkt het goed om elk onderwerp apart te oefenen voordat uw kind hele examens maakt. De diagnostische toets laat zien welke onderwerpen nog niet goed gaan. Daar beginnen we, zodat er op het examen geen onderdeel meer is dat uw kind verrast.",
    bron: {
      naam: "Syllabus centraal examen 2027, wiskunde C VWO",
      url: "https://www.examenblad.nl/2027/vwo/documenten/syllabus-wiskunde-c-vwo-2027",
    },
  },
];

export function vindVak(slug: string) {
  return vakken.find((v) => v.slug === slug);
}

/** "Wiskunde B VWO", voor koppen en links. */
export function vakNaam(v: Vak) {
  return `${v.vak.charAt(0).toUpperCase()}${v.vak.slice(1)} ${v.niveau}`;
}
