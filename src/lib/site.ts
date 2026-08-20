/**
 * Bijlesdirect — algemene site-inhoud.
 *
 * ▸ Programma-inhoud (prijs, plekken, waardestapel, garantie) staat in
 *   `src/config/programma.ts`. Hier staan bedrijfsgegevens, reviews en FAQ.
 */

import { prijzen, euro, garantie, programma } from "@/config/programma";

export const site = {
  name: "Bijlesdirect",
  domain: "https://bijlesdirect.nl",
  tagline: "Examentraining wiskunde — HAVO & VWO",
  description:
    "Slagen voor het eindexamen wiskunde, gegarandeerd. 12 weken examentraining voor HAVO en VWO, met een vaste docent en een diagnose vooraf. Slaagt uw kind niet, dan trainen we gratis door tot de herkansing — en lukt het dan nog niet, dan krijgt u uw geld terug.",
  phone: "+31 6 42942121",
  phoneHref: "tel:+31642942121",
  phoneDisplay: "06 4294 2121",
  email: "info@bijlesdirect.nl",
  whatsapp: "https://wa.me/31642942121",
  hours: "ma–vr 9:00–21:00",
  kvk: "94485038",
  trustpilotUrl: "https://www.trustpilot.com/review/bijlesdirect.nl",
  googleUrl: "https://www.google.com/search?q=Bijlesdirect+Reviews",
};

/** Klantenportaal voor bestaande leerlingen — staat alleen in de footer. */
export const portaal = {
  loginUrl: "https://app.tutorbird.com/",
  loginWidgetSrc:
    "https://app.tutorbird.com/Widget/v4/Widget.ashx?settings=eyJTY2hvb2xJRCI6InNjaF9GMVFKWCIsIldlYnNpdGVJRCI6Indic196UHNKeCIsIldlYnNpdGVCbG9ja0lEIjoid2JiX2hESk5KeiJ9",
};

/** Kerncijfers — werk deze bij zodra de aantallen veranderen. */
export const stats = [
  { value: "4,9★", label: "gemiddelde beoordeling" },
  { value: "500+", label: "gezinnen geholpen" },
  { value: "100+", label: "reviews van ouders en leerlingen" },
  { value: "98%", label: "betere cijfers in 2025" },
] as const;

export const rating = { score: "4,9", outOf: "5", count: 100 };

/** Hoofdnavigatie — maximaal 5 items, plus de CTA-knop rechts. */
export const nav = [
  { label: "Het programma", href: "/slagingsprogramma" },
  { label: "Aanpak", href: "/hoe-het-werkt" },
  { label: "Prijs & garantie", href: "/prijs-en-garantie" },
  { label: "Reviews", href: "/reviews" },
  { label: "Over ons", href: "/over-ons" },
] as const;

export type Review = {
  name: string;
  stars: number;
  title: string;
  body: string;
  date: string;
  /** true = gaat over wiskunde, examens of de bovenbouw — deze tonen we eerst. */
  relevant?: boolean;
};

/**
 * Reviews — echte reviews van ouders en leerlingen (Trustpilot, Google, WhatsApp).
 * De reviews met `relevant: true` gaan over wiskunde, examens of de bovenbouw en
 * staan bovenaan; de overige volgen daarna.
 */
export const reviews: Review[] = [
  {
    name: "Moeder van Emine",
    stars: 5,
    title: "Een 8,2 voor wiskunde!",
    body: "Emine heeft haar cijfer voor wiskunde: een 8,2! We waren zó blij en zó verrast — we zijn trots op haar. En natuurlijk dank aan haar wiskundedocent Abdulrahman, die haar volop heeft geleerd en getraind. Nogmaals dankjewel hiervoor!",
    date: "12 mei 2026",
    relevant: true,
  },
  {
    name: "Sylvia Roos-d'Arnaud",
    stars: 5,
    title: "Mark is geslaagd!",
    body: "Dank voor je uitstekende lessen. Mark is geslaagd — hij heeft een 6,5 voor biologie op zijn examen gehaald!",
    date: "12 juni 2026",
    relevant: true,
  },
  {
    name: "Samira",
    stars: 5,
    title: "Met allemaal voldoendes over naar havo 5",
    body: "Romaisa heeft haar cijfer terug: een 5,6 — terwijl het gemiddelde van de toets een 4 was, dus goed gedaan! Ze is met allemaal voldoendes over naar havo 5. Waarschijnlijk doen we volgend jaar weer beroep op jullie. Voor nu: bedankt voor jullie hulp!",
    date: "11 juni 2026",
    relevant: true,
  },
  {
    name: "Selvinaz Ates",
    stars: 5,
    title: "Wij zijn super tevreden van hun bijlessen!",
    body: "Mijn zoon krijgt sinds 2 jaar regelmatig bijles van Adam of van zijn collega's. Mijn zoon zou in 2023 wegens 4/5 onvoldoendes bijna blijven zitten. Ik heb de situatie met Adam besproken en met een strakke planning en goede hulp hebben zij hem geholpen. Dankzij hen heeft hij alle vakken opgekrikt en is hij overgegaan naar de 3e klas van de middelbare school. Ze zijn erg aardig en weten heel goed hoe ze met kinderen moeten omgaan; ze houden rekening met hun gevoelens en persoonlijkheid, en ook met de zorgen van de ouders. Ik en mijn zoon van 14 zijn er super blij mee!",
    date: "1 maart 2025",
    relevant: true,
  },
  {
    name: "Omar Ghouzli",
    stars: 5,
    title: "Bijles bij Bijlesdirect",
    body: "Hele goede bijles, ik had bijles voor wiskunde. Het is 1-op-1 bijles en er wordt heel goed uitleg gegeven. Meester Adam legt het nog beter uit dan mijn wiskundedocent. Als je je kind of jezelf op bijles wilt hebben, moet je hier zijn!",
    date: "1 augustus 2025",
    relevant: true,
  },
  {
    name: "Tugba Gunes-Halici",
    stars: 5,
    title: "Beste die er is!",
    body: "Wij zijn mega blij met Bijlesdirect! Super fijne begeleiding en coaching op alle vakken. Het meedenken en samen zoeken naar oplossingen als het even niet lukt. Flexibel, behulpzaam en geduldig. Ze doen er alles aan om het maximale uit je kind te halen. Kortom: het beste adres voor het opkrikken van cijfers! Wij zijn dankbaar voor de kracht die ons kind krijgt en zien dit terug in de schoolcijfers.",
    date: "24 februari 2025",
    relevant: true,
  },
  {
    name: "Samira",
    stars: 5,
    title: "Erg tevreden",
    body: "Adam kan wiskunde op zo'n manier uitleggen dat m'n dochter het begrijpt. Wat erg fijn is. Ondanks dat ik twijfels had over online bijles, heeft Adam het tegendeel bewezen. Dat gaat hartstikke goed.",
    date: "4 maart 2025",
    relevant: true,
  },
  {
    name: "Moeder van Ousama",
    stars: 5,
    title: "Hij is over — ik ben trots",
    body: "Hij is over! Gelukkig, hij heeft het goed gedaan. Ik ben trots — dank je wel voor al jullie hulp. Tot na de vakantie!",
    date: "26 juni 2026",
    relevant: true,
  },
  {
    name: "Iqra Said",
    stars: 5,
    title: "Betrouwbaar",
    body: "Zeker een van de meest betrouwbare plekken als het gaat om de kwaliteit van de lessen. Er wordt veel tijd besteed aan wat je kind echt moeilijk vindt en de lessen zijn heel doelgericht. Als ouder word je regelmatig op de hoogte gebracht van verbeteringen en aandachtspunten. Héél fijn!",
    date: "24 februari 2025",
    relevant: true,
  },

  // ── Overige reviews (andere vakken en niveaus) ──────────────────
  {
    name: "Sab",
    stars: 5,
    title: "Beste bijles",
    body: "Mijn dochter had eerst best veel moeite met rekenen en dat maakte haar ook onzeker. Sinds ze bijles krijgt zie ik echt verschil. Ze snapt het beter en durft weer te proberen, ook als het fout gaat. Dat geeft mij als ouder weer hoop en rust. Ben echt blij met deze hulp en zou Bijlesdirect zeker aanraden aan andere ouders.",
    date: "1 januari 2026",
  },
  {
    name: "Judith van der Maas",
    stars: 5,
    title: "Blij met Bijlesdirect",
    body: "Onze twee dochters hebben nu een paar maanden bijles en gaan hier met plezier naartoe. Ze begrijpen de lesstof van de vakken waar ze moeite mee hebben nu veel beter, en op school zie je dat ze vooruitgang boeken. De juf geeft na elke bijles een duidelijke reflectie van wat ze gedaan hebben, met huiswerk om thuis te oefenen. Erg fijn. Wij zijn erg blij met Bijlesdirect.",
    date: "28 februari 2025",
  },
  {
    name: "Moeder van Milan",
    stars: 5,
    title: "We zien zo'n groot verschil in onze zoon",
    body: "Echt heel erg bedankt voor al je hulp en begeleiding, Adam. Je team heeft ons enorm geholpen, tijdens en buiten de lessen. We zien zo'n groot verschil in onze zoon — we zijn je enorm dankbaar!",
    date: "24 april 2026",
  },
  {
    name: "Talha Ercanli",
    stars: 5,
    title: "Duidelijke vooruitgang en meer zelfvertrouwen",
    body: "Mijn dochter heeft met veel plezier bijles gevolgd. We hebben duidelijke vooruitgang gezien in haar resultaten en vooral in haar zelfvertrouwen.",
    date: "11 februari 2026",
  },
  {
    name: "Douwe Brouwers",
    stars: 5,
    title: "Echt top!",
    body: "Echt top! Zelf een aantal weken bijles gehad, alles wordt netjes geregeld en er wordt goed meegedacht hoe je het beste begeleid kan worden!",
    date: "31 maart 2026",
  },
  {
    name: "Anisa",
    stars: 5,
    title: "Ik zal jullie zeker aanbevelen aan anderen",
    body: "Heel veel dank voor je hulp! We weten je te vinden als er weer bijles nodig is. Onze middelste gaat na de zomer naar de brugklas — mocht hij bijles voor wiskunde nodig hebben, dan schakelen we jullie zeker weer in. En ik zal jullie ook aanbevelen aan anderen!",
    date: "26 januari 2026",
  },
  {
    name: "Aziza",
    stars: 5,
    title: "Mijn zoon en dochter hebben bijles",
    body: "Mijn zoon en dochter hebben bijles gekregen en beiden gingen met veel plezier naar de les. Bijles wordt op een professionele manier aangeboden en de kinderen krijgen veel lesstof aangeboden.",
    date: "6 maart 2025",
  },
  {
    name: "Moeder van Ilyas",
    stars: 5,
    title: "Hij zegt dat je goed uitlegt",
    body: "Ilyas heeft heel fijne les van jou gekregen — hij zegt dat je goed uitleg geeft. Bedankt!",
    date: "22 mei 2026",
  },
  {
    name: "Ouder van Arsheea",
    stars: 5,
    title: "Goed voorbereid op de doorstroomtoetsen",
    body: "Als eerste wil ik zeggen dat ik heel blij ben met de bijles — Maham is een toppertje. Arsheea is door Maham goed voorbereid op de doorstroomtoetsen. Voor extra steun richting de middelbare school gaan we door met de lessen. Nogmaals bedankt voor alles!",
    date: "24 januari 2026",
  },
  {
    name: "Lianna Maasland",
    stars: 5,
    title: "Paar weken bijles gehad",
    body: "Onze zoon heeft een paar weken bijles gehad als voorbereiding op zijn Cito-toetsen. Het intakegesprek hebben we als prettig ervaren en gedurende het hele proces werd steeds met ons meegedacht. We konden altijd goed terecht met vragen en daar werd de tijd voor genomen. We zijn er heel blij mee geweest.",
    date: "1 december 2024",
  },
  {
    name: "Hasan Huseyin Barhan",
    stars: 4,
    title: "Ze hebben mij goed geholpen",
    body: "Ze hebben mij goed geholpen met mijn huiswerk en toetsen, en mijn niveau is omhooggegaan. In groep 8 ben ik in anderhalve maand van basis naar tl/havo gegaan, en nu doe ik kader/tl. Zo goed hebben zij mij op school geholpen.",
    date: "1 maart 2025",
  },
  {
    name: "Selma Halici - Barhan",
    stars: 4,
    title: "Mijn zoon is zeer tevreden",
    body: "Mijn zoon is zeer tevreden met de omgang en de steun in zijn bijles. Ik voel en zie als ouder dat mijn zoon ook positiever is geworden.",
    date: "10 april 2025",
  },
  {
    name: "Ecrin",
    stars: 5,
    title: "Het heeft me heel erg geholpen",
    body: "Het heeft me heel erg geholpen. We hebben alles geoefend en het is fijn dat alles goed wordt uitgelegd.",
    date: "17 maart 2025",
  },
  {
    name: "Nana",
    stars: 5,
    title: "Goede uitleg",
    body: "Hij heeft alles stap voor stap uitgelegd en nam ook de tijd om voorbeelden te tekenen als ik iets niet snapte.",
    date: "8 maart 2025",
  },
  {
    name: "Mohammed Boudount",
    stars: 5,
    title: "De bijles heeft mij goed geholpen",
    body: "De bijles heeft mij goed geholpen om mijn cijfers omhoog te halen en beter te plannen.",
    date: "8 maart 2025",
  },
  {
    name: "Emaan",
    stars: 5,
    title: "Heel fijn bedrijf!",
    body: "Heel fijn bedrijf! Ze zijn heel professioneel en weten wat ze doen. Ik merkte meteen een verschil!",
    date: "12 februari 2026",
  },
  {
    name: "Faye",
    stars: 5,
    title: "Bedankt voor alle hulp dit jaar",
    body: "Heel erg bedankt voor alle hulp dit jaar!",
    date: "3 juli 2026",
  },
  {
    name: "Hasan",
    stars: 5,
    title: "Dankuwel voor alles",
    body: "Dankuwel voor alles, meester Adam!",
    date: "17 april 2026",
  },
  {
    name: "Leerling",
    stars: 5,
    title: "Betere cijfers sinds de bijles",
    body: "Sinds ik bijles van Bijlesdirect krijg, heb ik nu betere cijfers in vakken waar ik eerst moeite mee had.",
    date: "2 maart 2025",
  },
  {
    name: "Leerling",
    stars: 5,
    title: "Zeer tevreden met de bijles",
    body: "Zeer tevreden met de bijles die ik krijg. Ik heb al mijn onvoldoendes dankzij hen kunnen wegwerken.",
    date: "1 maart 2025",
  },
];

export type Faq = {
  q: string;
  /** Eén alinea, of meerdere als het antwoord daarom vraagt. */
  a: string | string[];
};

/** Zet een antwoord om naar platte tekst — voor de JSON-LD van de FAQ-pagina. */
export function faqTekst(a: Faq["a"]): string {
  return Array.isArray(a) ? a.join(" ") : a;
}

/** De garantievoorwaarden als opsomming binnen een lopende zin. */
const voorwaardenInZin = garantie.voorwaarden
  .map((v) => v.charAt(0).toLowerCase() + v.slice(1))
  .join("; ");

/** Bezwaren van ouders — gebruikt op de homepage (eerste 5) en /faq (allemaal). */
export const faqs: Faq[] = [
  {
    q: "We hebben al bijles gehad, dat hielp niet.",
    a: "Dat horen we vaak — en meestal om dezelfde reden. Losse bijlesuren behandelen de stof van deze week, terwijl het probleem drie jaar geleden is ontstaan. Wij beginnen daarom met een diagnostische toets die precies laat zien wélke basis ontbreekt, en bouwen het programma daaromheen. Geen bijles per week, maar een plan tot aan het examen.",
  },
  {
    q: "Mijn kind heeft het al zo druk.",
    a: "Daarom knippen we alles op in kleine, behapbare stappen: niet 'oefen hoofdstuk 7', maar 'maak deze vijf opgaven'. Twee vaste momenten per week, alles online, geen reistijd. En het plannen, herinneren en controleren doen wij — dat scheelt uw kind (en u) juist tijd en energie.",
  },
  {
    q: "Werkt online wel?",
    a: "Ja, en beter dan veel ouders verwachten. Onze lessen zijn interactief en persoonlijk, met een vaste docent die uw kind écht leert kennen. Alle lessen worden opgenomen, dus terugkijken kan altijd. Geen reistijd betekent bovendien dat uw kind de energie in de stof steekt in plaats van in het heen en weer reizen.",
  },
  {
    q: `Is ${euro(prijzen.programma)} niet veel geld?`,
    a: `Dat is een reële vraag. Een afgestudeerde bèta-professional inhuren voor 48 lesuren kost losstaand al ${euro(prijzen.lesurenLosseWaarde)}. Dan heeft u nog geen diagnose, geen studieplan, geen coach, geen wekelijks ouderrapport — en geen garantie. Wij bieden het complete pakket voor minder dan de losse lesuren, en nemen het risico op ons.`,
  },
  {
    q: "Hoe werkt de slagingsgarantie precies?",
    a: [
      `In twee stappen. Slaagt uw kind niet voor wiskunde, dan trainen we gratis door tot de herkansing in ${programma.herkansingMaand} — geen nieuwe factuur, geen nieuw gesprek. Zakt uw kind bij die herkansing alsnog, dan krijgt u het volledige bedrag terug.`,
      `Er zijn ${garantie.voorwaarden.length} voorwaarden, en die noemen we liever nu dan achteraf: ${voorwaardenInZin}.`,
      "Waarom die voorwaarden? Omdat wij verantwoordelijk zijn voor de begeleiding en uw kind voor het meedoen. Zonder die afspraak kunnen we een garantie niet waarmaken; mét die afspraak durven we het risico wél te dragen.",
      "Het is ook de reden dat we de Slagingscheck doen. Denken we dat slagen niet haalbaar is, dan zeggen we dat vooraf in plaats van u een garantie te verkopen waar we zelf niet in geloven.",
    ],
  },
  {
    q: "Wat als mijn kind afhaakt?",
    a: "Daar is het programma op gebouwd. De success coach spreekt uw kind elke twee weken één-op-één, is dagelijks bereikbaar via WhatsApp, en u ziet in het weekrapport meteen wanneer iets stokt. Bovendien werkt de garantievoorwaarde van 90% aanwezigheid twee kanten op: ze houdt ons scherp én geeft uw kind een reden om door te gaan.",
  },
  {
    q: "Voor welke niveaus en vakken is dit programma?",
    a: "Voor examenkandidaten wiskunde op HAVO en VWO — wiskunde A, B en C. Zit uw kind nog niet in het examenjaar, of is er hulp nodig richting één toetsweek? Dan is een van onze kortere programma's wellicht passender; die vindt u op de pagina Alle programma's.",
  },
  {
    q: "Wie staat er voor de klas?",
    a: [
      "Een afgestudeerde bèta-professional. Geen student met een bijbaantje.",
      "Concreet betekent dat: een universitaire graad in wiskunde, natuurkunde of een technische studie, en daarnaast werkzaam in het eigen vakgebied. Uw kind krijgt dus iemand die de stof niet alleen beheerst, maar ook weet waar die in de praktijk voor dient.",
      "Het verschil zit vooral in de didactiek. Iemand die zelf goed is in wiskunde kan het daarom nog niet uitleggen aan een zeventienjarige die is vastgelopen. Onze docenten hebben leservaring voor een groep: ze zien aan een gezicht of het is geland, ze weten welke fout tien leerlingen op dezelfde manier maken, en ze kunnen dezelfde uitleg op drie manieren geven.",
      "Elke docent doorloopt onze eigen selectie en wordt getraind op de examenmethode. En het is de hele twaalf weken dezelfde docent, zodat uw kind niet elke maand opnieuw hoeft uit te leggen waar het vastloopt.",
    ],
  },
  {
    q: "Hoe groot zijn de groepjes?",
    a: [
      "Maximaal vijf leerlingen, en — belangrijker nog — allemaal op hetzelfde niveau. Die indeling maken we op basis van de diagnostische toets.",
      "Dat aantal is een bewuste keuze, en wel om deze reden: juist doordat we niet één-op-één werken, kunnen we een afgestudeerde docent inhuren én zijn tarief betalen. Bij aanbieders die per uur goedkoper zijn, zit er meestal een student voor de klas — iemand die het vak misschien wel begrijpt, maar de didactische ervaring mist om het over te brengen.",
      "Tegelijk is vijf klein genoeg dat uw kind individuele aandacht houdt; de docent weet precies waar ieder van de vijf staat. En vijf leerlingen met dezelfde gaten werkt beter dan drie met verschillende: de docent lost één probleem vijf keer tegelijk op, in plaats van vijf losse problemen.",
    ],
  },
  {
    q: "Wat is de Slagingscheck en wat gebeurt erna?",
    a: "De Slagingscheck is een gratis gesprek van ongeveer 30 minuten waarin we in kaart brengen waar uw kind staat, en u een eerlijk antwoord geven op de vraag of slagen haalbaar is. Zo niet, dan zeggen we dat ook. Past het programma? Dan volgt de diagnostische toets en ligt er binnen 48 uur een persoonlijk examenplan. Er is geen enkele verplichting.",
  },
];
