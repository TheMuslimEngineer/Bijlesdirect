import type { Metadata } from "next";
import { paginaMeta } from "@/lib/seo";
import { Container, ButtonLink, SectionHeading } from "@/components/ui";
import { PageHeader } from "@/components/page-header";
import {
  Waardestapel,
  ProgrammaCTA,
  SchaarstePill,
  InschrijfBadge,
  Bewijsbalk,
} from "@/components/programma-secties";
import { ArrowRight, Check } from "@/components/icons";
import { programma, prijzen, plekken, euro } from "@/config/programma";
import { ReviewCard, ReviewPlatforms } from "@/components/sections";
import { rating, site, reviews } from "@/lib/site";
import { vakken, vakNaam } from "@/content/vakken";
import Link from "next/link";

/**
 * De verdieping op de homepage: week voor week hoe Examenklaar werkt, met de
 * volledige FAQ.
 */
export const metadata: Metadata = paginaMeta({
  titel: `${programma.naam}: ${programma.duurWeken} weken examentraining wiskunde`,
  omschrijving:
    `Eerst een diagnose, dan ${programma.duurWeken} weken les met een vaste docent en elke week een rapport voor u. Slaagt uw kind niet, dan trainen we gratis door.`,
  pad: "/slagingsprogramma",
});

/** Course-schema hoort bij dit programma, dus bij deze pagina. */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Course",
  name: programma.naam,
  description:
    "12-wekenprogramma examentraining wiskunde voor examenkandidaten HAVO en VWO, met persoonlijke begeleiding op maat en een slagingsgarantie.",
  provider: {
    "@type": "EducationalOrganization",
    name: "ExamenDocent",
    url: site.domain,
  },
  url: `${site.domain}/slagingsprogramma`,
  inLanguage: "nl",
  educationalLevel: "HAVO 5 en VWO 6",
  hasCourseInstance: {
    "@type": "CourseInstance",
    courseMode: "Online",
    courseWorkload: `PT${programma.lesurenTotaal}H`,
  },
  offers: {
    "@type": "Offer",
    price: prijzen.programma,
    priceCurrency: "EUR",
    category: "Paid",
    url: `${site.domain}/prijs-en-garantie`,
  },
};

const fases = [
  {
    weken: "Week 0",
    titel: "Diagnose",
    body: "Vóór de start maakt uw kind de diagnostische toets. Die laat precies zien welke onderdelen ontbreken, vaak stof uit klas 3 of 4 die nooit is rechtgezet. Op basis daarvan bepalen we het exacte niveau waarop we beginnen.",
    punten: ["Diagnostische toets", "Persoonlijke gatenkaart", "Indeling op niveau"],
  },
  {
    weken: "Week 1 – 4",
    titel: "De basis herstellen",
    body: "We beginnen bij wat onder de examenstof ligt. Zonder een stevige basis blijft elke examentraining dweilen met de kraan open. Twee keer per week twee uur, met huiswerk in kleine, behapbare stukken.",
    punten: ["Ontbrekende basis wegwerken", "Rekenvaardigheid opbouwen", "Vaste weekstructuur"],
  },
  {
    weken: "Week 5 – 6",
    titel: "Examenstof en hertoets",
    body: "Nu de basis staat, gaan we de examenonderwerpen in. In week 6 volgt de hertoets: dezelfde meting als bij de start, zodat u zwart-op-wit ziet wat er is veranderd. Het is ook het moment om bij te sturen als iets achterblijft.",
    punten: ["Kern van de examenstof", "Hertoets na 6 weken", "Bijsturen waar nodig"],
  },
  {
    weken: "Week 7 – 10",
    titel: "Examentraining en techniek",
    body: "Oude examens, examenstrategie en de valkuilen per opgavetype. Uw kind leert ook hoe je een examen aanpakt: tijdsindeling, puntenpakken en wanneer je een vraag beter kunt overslaan.",
    punten: ["Oude examens oefenen", "Examenstrategie", "Werken onder tijdsdruk"],
  },
  {
    weken: "Week 11 – 12",
    titel: "Proefexamens en rust",
    body: "Volledige proefexamens onder echte omstandigheden, plus de faalangst- en examenstresstraining. Vlak voor het examen belt de success coach persoonlijk. Zo loopt uw kind ontspannen en voorbereid de zaal in.",
    punten: ["Volledige proefexamens", "Faalangsttraining", "Persoonlijk belmoment"],
  },
];

/* Drie reviews die elk iets anders bewijzen: de uitkomst, de twijfel over
   online, en de kwaliteit van de uitleg. Op titel gekozen — er zijn twee
   reviewers die Samira heten. */
const bewijsReviews = ["Een 8,2 voor wiskunde!", "Erg tevreden", "Bijles bij Bijlesdirect"]
  .map((titel) => reviews.find((r) => r.title === titel))
  .filter((r): r is (typeof reviews)[number] => Boolean(r));

const weekritme = [
  { titel: "2× per week 2 uur", body: "Vaste momenten, online, zonder reistijd." },
  { titel: "Op maat ingedeeld", body: "Precies op het niveau van uw kind afgestemd." },
  { titel: "Elke week 1-op-1", body: "Persoonlijk gesprek met de success coach." },
];

export default function SlagingsprogrammaPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <PageHeader
        kruimels={[
          { label: "Home", href: "/" },
          { label: programma.naam },
        ]}
        eyebrow={programma.naam}
        title="Examentraining wiskunde voor HAVO en VWO: uw kind slaagt, of u krijgt uw geld terug"
        intro={`${programma.duurWeken} weken, ${programma.lesurenTotaal} lesuren, één doel. Hieronder ziet u week voor week hoe het is opgebouwd, wat het kost en waarom wij het risico durven te dragen in plaats van u.`}
      >
        <ButtonLink href="/slagingscheck">
          Vraag een gratis Slagingscheck aan
          <ArrowRight className="h-[18px] w-[18px]" />
        </ButtonLink>
        <InschrijfBadge
          label={programma.inschrijvingOpen ? "Inschrijving open" : "Inschrijving gesloten"}
          open={programma.inschrijvingOpen}
        />
        <SchaarstePill />
      </PageHeader>

      {/* Bewijs vóór het verhaal: wie hier vanuit Google binnenkomt kent ons
          niet en scant eerst of we serieus zijn. */}
      <Bewijsbalk />

      {/* WAAROM HET MISGAAT — verhuisd van de homepage; dit gaat specifiek
          over examenkandidaten en hoort daarom bij dit programma. */}
      <section className="py-20">
        <Container>
          <div className="mx-auto max-w-3xl">
            <h2 className="text-[clamp(1.9rem,4vw,2.75rem)] text-ink">
              U weet allang dat het niet vanzelf goedkomt
            </h2>
            <div className="mt-8 space-y-4 text-lg text-ink-soft">
              <p>
                Er staat een onvoldoende voor wiskunde en de examendatum staat al in de agenda. U
                heeft het er thuis vaak genoeg over gehad: u zegt dat het zo niet langer kan, uw
                kind zegt dat het goedkomt.
              </p>
              <p>
                En &apos;s avonds ligt u wakker met dezelfde vraag. Gaat dit lukken? Of zitten we in
                juni tegenover een mentor die zegt dat het jaar over moet?
              </p>
              <p>
                Het vervelendste is dat u het niet zelf kunt oplossen. De stof van vwo 6 legt u niet
                even uit. Meer achter uw kind aan zitten heeft al bewezen niet te werken. Dat levert
                ruzie op, geen cijfers. En de school heeft dertig andere leerlingen.
              </p>
              <p>
                Dus doet u het enige wat u nog kunt: hopen dat het meevalt, en ondertussen elke
                cijferupdate opendoen met het idee dat het deze keer misschien anders is. Zo wacht
                u eigenlijk tot mei het voor u beslist.
              </p>
              <p className="text-ink">
                En dan is er nog wat u waarschijnlijk tegen niemand zegt. Dat u soms boos wordt op uw
                eigen kind en zich daarna schuldig voelt. Dat u zich afvraagt of u het eerder had
                moeten zien. Dat u om elf uur &apos;s avonds nog zit te rekenen hoeveel punten er nog
                bij moeten, terwijl uw kind allang slaapt.
              </p>
            </div>

            <div className="mt-10 rounded-[24px] bg-white p-8 sm:p-10">
              <h3 className="text-[clamp(1.4rem,2.8vw,1.9rem)] text-ink">
                Maar het ligt niet aan uw kind.
              </h3>
              <p className="mt-4 text-lg text-ink-soft">
                De meeste examenkandidaten zakken niet op de moeilijke stof van dit jaar. Ze zakken op
                een basis die drie jaar geleden is blijven liggen, zonder dat iemand ooit precies
                heeft gecontroleerd waar het is misgegaan.
              </p>
              <p className="mt-4 text-lg text-ink-soft">
                Het is een gat in de opbouw. En een gat kun je meten, en daarna dichten.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Weekritme */}
      <section className="pb-20">
        <Container>
          <ul className="grid gap-6 border-y border-line py-8 md:grid-cols-3">
            {weekritme.map((w) => (
              <li key={w.titel}>
                <p className="font-display text-[1.2rem] font-semibold text-ink">{w.titel}</p>
                <p className="mt-1 text-[15px] text-ink-soft">{w.body}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Week voor week */}
      <section className="pb-20">
        <Container>
          <SectionHeading
            title="Hoe de 12 weken zijn opgebouwd"
            intro="We beginnen bij wat er ontbreekt en bouwen van daaruit op. Zo komt er in de laatste weken geen stortvloed aan stof."
          />
          <div className="mt-12 grid gap-6">
            {fases.map((f, i) => (
              <div
                key={f.titel}
                className="grid gap-6 rounded-[24px] border border-line bg-white p-8 md:grid-cols-[200px_1fr]"
              >
                <div>
                  <span className="inline-flex rounded-full bg-green-soft px-3.5 py-1.5 text-[13px] font-semibold text-green-deep">
                    {f.weken}
                  </span>
                  <h3 className="mt-3 font-display text-[1.35rem] font-semibold text-ink">{f.titel}</h3>
                </div>
                <div>
                  <p className="text-[15.5px] text-ink-soft">{f.body}</p>
                  <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
                    {f.punten.map((p) => (
                      <li key={p} className="flex items-center gap-2 text-[14.5px] font-medium text-ink">
                        <Check className="h-[17px] w-[17px] flex-none text-green" />
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
                <span className="sr-only">Fase {i + 1}</span>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Wat er in zit — de waardestapel met de prijsonderbouwing eronder */}
      <section className="pb-20" id="wat-u-krijgt">
        <Container>
          <SectionHeading title="Wat er in het programma zit" />
          <div className="mt-12">
            <Waardestapel />
          </div>
        </Container>
      </section>

      {/* Per vak: elke combinatie van vak en niveau heeft een eigen pagina met de
          examenstof. Handig voor ouders, en zo vindt Google ze ook. */}
      <section className="pb-20">
        <Container>
          <h2 className="text-[clamp(1.4rem,2.6vw,1.8rem)] text-ink">Examentraining per vak</h2>
          <p className="mt-3 max-w-2xl text-[15.5px] text-ink-soft">
            Wat er op het centraal examen komt en waar leerlingen punten verliezen, per vak en niveau.
          </p>
          <ul className="mt-5 flex flex-wrap gap-3">
            {vakken.map((x) => (
              <li key={x.slug}>
                <Link
                  href={`/examentraining/${x.slug}`}
                  className="inline-flex rounded-full border border-line bg-white px-5 py-2.5 text-[15px] font-medium text-ink transition-colors hover:border-ink"
                >
                  {vakNaam(x)}
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Sociaal bewijs staat bewust hier: direct na de prijs, precies waar de
          twijfel piekt. */}
      <section className="pb-20">
        <Container>
          <SectionHeading title="Wat ouders zeggen" />
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {bewijsReviews.map((r, i) => (
              <ReviewCard key={i} review={r} />
            ))}
          </div>
          <div className="mt-8 flex flex-col items-start gap-4">
            <ButtonLink href="/reviews" variant="ghost">
              Lees alle {rating.count}+ reviews
              <ArrowRight className="h-[18px] w-[18px]" />
            </ButtonLink>
            <ReviewPlatforms />
          </div>
        </Container>
      </section>

      {/* De garantie in het kort. De volledige uitleg en voorwaarden staan op
          /prijs-en-garantie, de vragen op /faq: zo staat elk blok op één plek. */}
      <section className="pb-20">
        <Container>
          <div className="max-w-3xl">
            <h2 className="text-[clamp(1.6rem,3vw,2.1rem)] text-ink">De garantie</h2>
            <p className="mt-4 text-[1.05rem] leading-relaxed text-ink-soft">
              Slaagt uw kind niet voor wiskunde, dan begeleiden we gratis door tot de herkansing in{" "}
              {programma.herkansingMaand}. Zakt uw kind ook dan, dan krijgt u het volledige bedrag
              terug. Daar horen voorwaarden bij die u vooraf kent.
            </p>
            <p className="mt-4 text-[1.05rem] text-ink-soft">
              <a href="/prijs-en-garantie#garantie" className="font-semibold text-green-deep underline underline-offset-4 hover:text-green">
                Lees de voorwaarden
              </a>{" "}
              of bekijk de{" "}
              <a href="/faq" className="font-semibold text-green-deep underline underline-offset-4 hover:text-green">
                veelgestelde vragen
              </a>
              .
            </p>
          </div>
        </Container>
      </section>

      {/* Trigger 5 — de twee toekomsten. Een ouder koopt niet twaalf weken
          les; ze koopt welke juni het wordt. */}
      <section className="pb-20">
        <Container>
          <div className="mx-auto max-w-4xl">
            <h2 className="text-[clamp(1.7rem,3.2vw,2.3rem)] text-ink">
              In {programma.herkansingMaand} is er één van deze twee waar
            </h2>
            <div className="mt-10 grid gap-6 md:grid-cols-2">
              <div className="rounded-[24px] border border-line bg-sand/60 p-8">
                <p className="font-display text-[1.2rem] font-semibold text-ink">
                  Er verandert niets
                </p>
                <p className="mt-3 text-[15.5px] leading-relaxed text-ink-soft">
                  De uitslag komt binnen. U wist het al een beetje, en dat maakt het niet lichter.
                  Er volgt een gesprek over herkansen of overdoen, een zomer die geen zomer wordt,
                  en een kind dat inmiddels gelooft dat het gewoon niet goed is in wiskunde. Dat
                  laatste blijft nog jaren hangen.
                </p>
              </div>
              <div className="rounded-[24px] border border-green/25 bg-green-soft/50 p-8">
                <p className="font-display text-[1.2rem] font-semibold text-green-deep">
                  U heeft op tijd gebeld
                </p>
                <p className="mt-3 text-[15.5px] leading-relaxed text-ink-soft">
                  De uitslag komt binnen en het is gelukt. Maar het echte verschil zat eerder: vanaf
                  week drie hoefde u niet meer te vragen of het huiswerk af was, want dat stond in
                  uw rapport. De ruzies stopten. En uw kind ontdekte iets wat het niet meer kwijtraakt:
                  dat het wiskunde gewoon kan, als iemand het goed uitlegt.
                </p>
              </div>
            </div>
            <p className="mt-8 max-w-2xl text-[1.05rem] text-ink-soft">
              Wat het verschil maakt tussen die twee juni&apos;s? Of iemand op tijd heeft gemeten
              waar het misging.
            </p>
          </div>
        </Container>
      </section>

      {/* Stap 11 — de kosten van wachten. Geen verzonnen urgentie: de
          examendatum ligt echt vast en de groep is echt eindig. */}
      <section className="pb-20">
        <Container>
          <div className="mx-auto max-w-3xl rounded-[28px] border border-line bg-sand px-8 py-12 sm:px-11">
            <h2 className="text-[clamp(1.6rem,3vw,2.1rem)] text-ink">
              Eén ding kunnen wij niet voor u regelen: tijd
            </h2>
            <div className="mt-5 space-y-4 text-[1.05rem] leading-relaxed text-ink-soft">
              <p>
                De examendatum in {programma.examenMaand} ligt vast. Wij kunnen het programma
                niet inkorten en de stof niet kleiner maken. Daarom werken we met één groep die{" "}
                {programma.start} begint, met {plekken.totaal} plekken. De groepjes blijven klein,
                en elke docent kan maar een beperkt aantal leerlingen volgen.
              </p>
              <p>
                Wacht u tot na {programma.inschrijvingSluit}, dan begint de groep zonder uw kind. Er
                komt dit schooljaar geen tweede start, want {programma.duurWeken} weken passen maar
                één keer vóór het examen. Zo werkt de schoolkalender nu eenmaal.
              </p>
              <p className="text-ink">
                <b className="font-semibold">
                  Het gesprek kost u dertig minuten en nul euro.
                </b>{" "}
                Blijkt daaruit dat dit programma niet past, of dat uw kind het zonder ons redt, dan
                zeggen we dat. Dan heeft u alsnog een eerlijk antwoord op de vraag die u wakker
                houdt.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <ProgrammaCTA
        recap={[
          `${programma.duurWeken} weken, ${programma.lesurenTotaal} lesuren examentraining wiskunde`,
          "Diagnose vooraf, een vaste bèta-docent en een groepje op uw kinds niveau",
          "Elke week een 1-op-1 gesprek met de success coach, plus uw weekrapport",
          `${euro(prijzen.programma)} in één keer, of ${prijzen.termijnen.aantal} termijnen van ${euro(prijzen.termijnen.bedrag)}`,
          "Zakt uw kind? Dan trainen we gratis door tot de herkansing. Lukt het dan nog niet, dan krijgt u alles terug.",
        ]}
        title="Past dit bij uw kind?"
        body={`Dat weten we na één gesprek. Er zijn ${plekken.beschikbaar} plekken beschikbaar voor de groep die ${programma.start} start.`}
        secundair={null}
      />
    </>
  );
}
