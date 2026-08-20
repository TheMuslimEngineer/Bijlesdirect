import type { Metadata } from "next";
import { Container, SectionHeading } from "@/components/ui";
import { PageHeader } from "@/components/page-header";
import { MessageForm } from "@/components/message-form";
import { Check, Clock, Users, Target, Sparkles } from "@/components/icons";
import { programma } from "@/config/programma";

export const metadata: Metadata = {
  title: "Docent worden — bevoegde wiskundedocenten gezocht",
  description:
    "Geef online examentraining wiskunde aan HAVO- en VWO-examenkandidaten. Kleine groepen, kant-en-klaar curriculum, marktconforme vergoeding. Meld je aan bij Bijlesdirect.",
  alternates: { canonical: "/docent-worden" },
};

const voordelen = [
  {
    icon: Target,
    title: "Eén vak, één doel",
    body: "Geen versnipperde bijlesuren over vijf vakken. Jij doet waar je goed in bent: examentraining wiskunde.",
  },
  {
    icon: Users,
    title: "Kleine groepen op niveau",
    body: `Maximaal ${programma.maxPerGroep} leerlingen, allemaal met dezelfde gaten — ingedeeld op basis van een diagnostische toets.`,
  },
  {
    icon: Sparkles,
    title: "Curriculum ligt klaar",
    body: "Lesmateriaal, opgaven en proefexamens zijn er al. Jij hoeft geen avonden te besteden aan voorbereiding.",
  },
  {
    icon: Clock,
    title: "Vaste blokken, online",
    body: "Twee vaste momenten per week, vanuit huis. Geen reistijd, duidelijke planning.",
  },
];

const zoekenWe = [
  "Bevoegd docent wiskunde, of vergevorderd in een bèta-studie met aantoonbare leservaring",
  "Ervaring met examenstof HAVO en/of VWO",
  "Beschikbaar op twee vaste momenten per week gedurende twaalf weken",
  "Je kunt uitleggen zonder de leerling te overladen",
];

export default function DocentWordenPage() {
  return (
    <>
      <PageHeader
        eyebrow="Werken bij Bijlesdirect"
        title="Word examentrainer wiskunde."
        intro="Wij zoeken bevoegde wiskundedocenten die examenkandidaten door hun laatste, belangrijkste maanden loodsen. Klein team, korte lijnen, en een programma dat staat."
      />

      <section className="py-20">
        <Container>
          <div className="grid items-start gap-12 lg:grid-cols-[1fr_0.9fr] lg:gap-16">
            <div>
              <SectionHeading eyebrow="Waarom bij ons" title="Lesgeven zonder de rompslomp." />
              <div className="mt-10 grid gap-6 sm:grid-cols-2">
                {voordelen.map((v) => (
                  <div key={v.title} className="rounded-2xl border border-line bg-white p-6">
                    <div className="mb-4 grid h-[46px] w-[46px] place-items-center rounded-[13px] bg-green-soft">
                      <v.icon className="h-[22px] w-[22px] text-green-deep" />
                    </div>
                    <h3 className="text-[1.2rem]">{v.title}</h3>
                    <p className="mt-2 text-[15px] text-ink-soft">{v.body}</p>
                  </div>
                ))}
              </div>

              <div className="mt-10 rounded-2xl bg-sand p-7">
                <h3 className="font-display text-[1.2rem] font-semibold text-ink">Wie we zoeken</h3>
                <ul className="mt-4 grid gap-2.5">
                  {zoekenWe.map((z) => (
                    <li key={z} className="flex items-start gap-2.5 text-[15px] text-ink-soft">
                      <Check className="mt-0.5 h-[18px] w-[18px] flex-none text-green" />
                      {z}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div>
              <h2 className="kop-tekst text-2xl text-ink">Meld je aan</h2>
              <p className="mb-6 mt-2 text-ink-soft">
                Vertel kort iets over jezelf en je ervaring. We nemen binnen enkele werkdagen contact op.
              </p>
              <MessageForm kind="docent" />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
