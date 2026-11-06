import type { Metadata } from "next";
import { Container, ButtonLink, SectionHeading } from "@/components/ui";
import { PageHeader } from "@/components/page-header";
import { Waardestapel, GarantieBlok, ProgrammaCTA } from "@/components/programma-secties";
import { ArrowRight, Target } from "@/components/icons";
import { programma, prijzen, plekken, toonSchaarste, euro, premiumGarantie } from "@/config/programma";

export const metadata: Metadata = {
  title: `Prijs en garantie van ${programma.naam}`,
  description: `Het volledige programma kost ${euro(prijzen.programma)} of ${prijzen.termijnen.aantal} termijnen van ${euro(prijzen.termijnen.bedrag)}. Slaagt uw kind niet, dan trainen we gratis door tot de herkansing. Lukt het dan nog niet, dan krijgt u uw geld terug.`,
  alternates: { canonical: "/prijs-en-garantie" },
};

const betaalopties = [
  {
    titel: "In één keer",
    bedrag: euro(prijzen.programma),
    body: "Het volledige programma, in één betaling vóór de start.",
  },
  {
    titel: `In ${prijzen.termijnen.aantal} termijnen`,
    bedrag: `${prijzen.termijnen.aantal} × ${euro(prijzen.termijnen.bedrag)}`,
    body: `Gespreid betalen over de looptijd van het programma. In totaal ${euro(prijzen.termijnenTotaal)}.`,
  },
];

export default function PrijsEnGarantiePage() {
  return (
    <>
      <PageHeader
        eyebrow="Prijs & garantie"
        title="Wat het kost, en wat u terugkrijgt als het niet lukt"
        intro="Een vaste prijs voor het hele programma, zonder uurtarieven. Met een garantie die op papier staat."
      >
        <ButtonLink href="/slagingscheck">
          Vraag een gratis Slagingscheck aan
          <ArrowRight className="h-[18px] w-[18px]" />
        </ButtonLink>
      </PageHeader>


      {/* Waardestapel */}
      <section className="py-20">
        <Container>
          <SectionHeading title={`Wat er in ${programma.naam} zit`} intro={programma.subregel} />
          <div className="mt-12">
            <Waardestapel />
          </div>
        </Container>
      </section>

      {/* Betaalopties */}
      <section className="pb-20">
        <Container>
          <SectionHeading title="Betalen" />
          <div className="mt-10 grid max-w-3xl gap-6 sm:grid-cols-2">
            {betaalopties.map((b) => (
              <div key={b.titel} className="rounded-2xl border border-line bg-white p-8 text-center">
                <p className="font-display text-[1.2rem] font-semibold text-ink">{b.titel}</p>
                <p className="mt-3 font-display text-[2rem] font-semibold text-green-deep">
                  {b.bedrag}
                </p>
                <p className="mt-3 text-[15px] text-ink-soft">{b.body}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 max-w-3xl text-sm text-muted">
            De betaling start pas na de Slagingscheck en de diagnostische toets, zodra we samen hebben
            vastgesteld dat het programma past.
          </p>
        </Container>
      </section>

      {/* Garantie */}
      <section className="pb-20" id="garantie">
        <Container>
          <GarantieBlok compact />
        </Container>
      </section>

      {/* Premium */}
      <section className="pb-20">
        <Container>
          <div className="flex flex-wrap items-center justify-between gap-6 rounded-[24px] border border-line bg-sand p-8">
            <div className="flex items-start gap-4">
              <span className="grid h-12 w-12 flex-none place-items-center rounded-xl bg-white">
                <Target className="h-6 w-6 text-green-deep" />
              </span>
              <div>
                <h3 className="font-display text-[1.25rem] font-semibold text-ink">
                  Premium 1-op-1: {euro(prijzen.premium)}
                </h3>
                <p className="mt-1 max-w-xl text-[15px] text-ink-soft">
                  Hetzelfde programma, volledig individueel. Voor leerlingen die geen 5,5 nodig hebben
                  maar een 8 of hoger, bijvoorbeeld voor een numerus fixus-studie. Met garantie op een{" "}
                  {premiumGarantie.cijfer}, na selectie.
                  {toonSchaarste.premium &&
                    ` Nog ${plekken.premiumBeschikbaar} van de ${plekken.premiumTotaal} plekken beschikbaar.`}
                </p>
              </div>
            </div>
            <ButtonLink href="/premium" variant="ghost">
              Meer over Premium
            </ButtonLink>
          </div>
        </Container>
      </section>

      {/* Het prijsbezwaar valt niet op het bedrag, maar op het ontbreken van
          een vergelijking. Dit blok geeft die. */}
      <section className="pb-20">
        <Container>
          <div className="max-w-3xl">
            <h2 className="text-[clamp(1.6rem,3vw,2.1rem)] text-ink">
              {euro(prijzen.programma)} is veel geld. Maar vergeleken waarmee?
            </h2>
            <div className="mt-8 grid gap-4">
              {[
                {
                  kop: "Losse bijlesuren",
                  body: `Een bevoegde bèta-docent inhuren voor ${programma.lesurenTotaal} uur kost losstaand al ${euro(prijzen.lesurenLosseWaarde)}. Dan heeft u nog geen diagnose, geen examenplan, geen coach, geen ouderrapport en geen garantie.`,
                },
                {
                  kop: "Het jaar overdoen",
                  body: "Een jaar langer op school, een jaar later beginnen aan de studie, en een jaar langer dezelfde spanning in huis. Dat is de rekening die u betaalt als het in mei misgaat.",
                },
                {
                  kop: "Niets doen en hopen",
                  body: "Gratis, tot het examen. Daarna is het de duurste optie van de drie, en de enige waar u niets meer aan kunt doen.",
                },
              ].map((r) => (
                <div key={r.kop} className="rounded-2xl border border-line bg-white p-6">
                  <h3 className="font-display text-[1.15rem] font-semibold text-ink">{r.kop}</h3>
                  <p className="mt-1.5 text-[15.5px] text-ink-soft">{r.body}</p>
                </div>
              ))}
            </div>
            <p className="mt-7 text-[1.05rem] leading-relaxed text-ink-soft">
              Wij dragen het risico dat u anders alleen draagt: zakt uw kind, dan trainen we gratis
              door tot de herkansing. Lukt het dan nog niet, dan krijgt u het volledige bedrag terug.
              Van de drie opties hierboven is dit de enige met een bodem erin.
            </p>
          </div>
        </Container>
      </section>

      <section className="pb-4">
        <Container>
          <p className="max-w-3xl text-[15.5px] text-ink-soft">
            De volledige garantievoorwaarden staan in onze{" "}
            <a href="/voorwaarden" className="font-semibold text-green-deep underline underline-offset-4 hover:text-green">
              algemene voorwaarden
            </a>
            . Meer vragen over prijs of garantie? Kijk bij de{" "}
            <a href="/faq" className="font-semibold text-green-deep underline underline-offset-4 hover:text-green">
              veelgestelde vragen
            </a>
            .
          </p>
        </Container>
      </section>

      <ProgrammaCTA
        recap={[
          `${euro(prijzen.programma)} in één keer, of ${prijzen.termijnen.aantal} termijnen van ${euro(prijzen.termijnen.bedrag)}`,
          "De betaling start pas na de Slagingscheck en de diagnostische toets",
          "Zakt uw kind? Dan trainen we gratis door tot de herkansing",
          "Lukt het dan nog niet, dan krijgt u het volledige bedrag terug",
        ]}
        title="Twijfelt u nog?" body="Vraag de gratis Slagingscheck aan. We vertellen eerlijk of dit programma bij uw kind past. En zo niet, dan zeggen we dat ook." />
    </>
  );
}
