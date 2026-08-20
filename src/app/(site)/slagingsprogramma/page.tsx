import type { Metadata } from "next";
import { Container, ButtonLink, SectionHeading } from "@/components/ui";
import { PageHeader } from "@/components/page-header";
import { Waardestapel, ProgrammaCTA, SchaarstePill } from "@/components/programma-secties";
import { ArrowRight, Check, Users, Clock, Target } from "@/components/icons";
import { programma, plekken } from "@/config/programma";

export const metadata: Metadata = {
  title: "Het Wiskunde Slagingsprogramma — 12 weken naar een voldoende",
  description:
    "Week voor week: hoe het 12-wekenprogramma examentraining wiskunde is opgebouwd. Van diagnostische toets tot proefexamens, met een vaste docent en een plan op maat.",
  alternates: { canonical: "/slagingsprogramma" },
};

const fases = [
  {
    weken: "Week 0",
    titel: "Diagnose",
    body: "Vóór de start maakt uw kind de diagnostische toets. Die laat precies zien welke onderdelen ontbreken — vaak stof uit klas 3 of 4 die nooit is rechtgezet. Op basis daarvan bepalen we het exacte niveau waarop we beginnen.",
    punten: ["Diagnostische toets", "Persoonlijke gatenkaart", "Indeling op niveau"],
  },
  {
    weken: "Week 1 – 4",
    titel: "De basis herstellen",
    body: "We beginnen niet bij de examenstof, maar bij wat eronder ligt. Zonder een stevige basis blijft elke examentraining dweilen met de kraan open. Twee keer per week twee uur, met huiswerk in kleine, behapbare stukken.",
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
    body: "Oude examens, examenstrategie en de valkuilen per opgavetype. Uw kind leert niet alleen de stof, maar ook hoe je een examen aanpakt: tijdsindeling, puntenpakken en wanneer je een vraag beter kunt overslaan.",
    punten: ["Oude examens oefenen", "Examenstrategie", "Werken onder tijdsdruk"],
  },
  {
    weken: "Week 11 – 12",
    titel: "Proefexamens en rust",
    body: "Volledige proefexamens onder echte omstandigheden, plus de faalangst- en examenstresstraining. Vlak voor het examen belt de success coach persoonlijk — zodat uw kind ontspannen en voorbereid de zaal in loopt.",
    punten: ["Volledige proefexamens", "Faalangsttraining", "Persoonlijk belmoment"],
  },
];

const weekritme = [
  { icon: Clock, titel: "2× per week 2 uur", body: "Vaste momenten, online, zonder reistijd." },
  { icon: Users, titel: "Op maat ingedeeld", body: "Precies op het niveau van uw kind afgestemd." },
  { icon: Target, titel: "Elke 2 weken 1-op-1", body: "Persoonlijk gesprek met de success coach." },
];

export default function SlagingsprogrammaPage() {
  return (
    <>
      <PageHeader
        eyebrow="Het programma"
        title={programma.naam}
        intro={`${programma.duurWeken} weken, ${programma.lesurenTotaal} lesuren, één doel: uw kind slaagt voor het eindexamen wiskunde. Hieronder ziet u precies hoe het is opgebouwd.`}
      >
        <ButtonLink href="/slagingscheck">
          Vraag een gratis Slagingscheck aan
          <ArrowRight className="h-[18px] w-[18px]" />
        </ButtonLink>
        <SchaarstePill />
      </PageHeader>

      {/* Weekritme */}
      <section className="py-20">
        <Container>
          <div className="grid gap-6 md:grid-cols-3">
            {weekritme.map((w) => (
              <div key={w.titel} className="rounded-2xl border border-line bg-white p-7">
                <div className="mb-5 grid h-12 w-12 place-items-center rounded-xl bg-green-soft">
                  <w.icon className="h-6 w-6 text-green-deep" />
                </div>
                <h3 className="font-display text-[1.2rem] font-semibold text-ink">{w.titel}</h3>
                <p className="mt-2 text-[15px] text-ink-soft">{w.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Week voor week */}
      <section className="pb-20">
        <Container>
          <SectionHeading
            eyebrow="Week voor week"
            title="Hoe de 12 weken zijn opgebouwd."
            intro="Geen stortvloed aan informatie in de laatste weken, maar een opbouw die begint bij wat er echt ontbreekt."
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

      {/* Wat er in zit */}
      <section className="pb-20">
        <Container>
          <SectionHeading center eyebrow="Wat er in zit" title="Alles bij elkaar." />
          <div className="mt-12">
            <Waardestapel />
          </div>
        </Container>
      </section>

      <ProgrammaCTA
        title="Past dit bij uw kind?"
        body={`Dat weten we na één gesprek. Er zijn ${plekken.beschikbaar} plekken beschikbaar voor de groep die ${programma.start} start.`}
      />
    </>
  );
}
