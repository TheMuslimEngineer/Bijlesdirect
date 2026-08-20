import type { Metadata } from "next";
import { Container, ButtonLink, SectionHeading, Eyebrow } from "@/components/ui";
import { PageHeader } from "@/components/page-header";
import { ProgrammaCTA, SchaarstePill } from "@/components/programma-secties";
import { ArrowRight, Check, Target, Users, Clock } from "@/components/icons";
import { programma, prijzen, plekken, euro } from "@/config/programma";

export const metadata: Metadata = {
  title: "Premium 1-op-1 — examentraining wiskunde op het hoogste niveau",
  description: `Volledig individuele examentraining wiskunde: ${programma.lesurenTotaal} uur 1-op-1 voor leerlingen met een hoger doel, zoals een numerus fixus-studie. Slechts ${plekken.premiumTotaal} plekken beschikbaar.`,
  alternates: { canonical: "/premium" },
};

const voorWie = [
  {
    titel: "Een numerus fixus-studie",
    body: "Geneeskunde, tandheelkunde of een technische studie met selectie: daar telt niet of uw kind slaagt, maar met welk cijfer.",
  },
  {
    titel: "Een specifiek cijferdoel",
    body: "Uw kind heeft geen 5,5 nodig maar een 7 of 8 — voor het profiel, de vervolgstudie of het eigen gevoel van kunnen.",
  },
  {
    titel: "Een uitzonderlijke situatie",
    body: "Langdurige ziekte, een wisseling van school of een leerachterstand die om volledig individuele aandacht vraagt.",
  },
];

const verschillen = [
  { punt: `${programma.lesurenTotaal} uur volledig 1-op-1`, groep: false },
  { punt: "Lestempo en onderwerpen volledig op maat", groep: false },
  { punt: "Cijferdoel individueel afgesproken na de diagnose", groep: false },
  { punt: "Flexibel in te plannen, ook buiten vaste blokken", groep: false },
  { punt: "Persoonlijke Student Success Coach", groep: true },
  { punt: "Onbeperkte toegang tot de examen-AI", groep: true },
  { punt: "Wekelijks ouderrapport", groep: true },
  { punt: "Faalangst- en examenstresstraining", groep: true },
];

export default function PremiumPage() {
  return (
    <>
      <PageHeader
        eyebrow="Premium 1-op-1"
        title="Voor wie meer wil dan slagen."
        intro="Hetzelfde programma, volledig individueel. Niet omdat een groep tekortschiet, maar omdat het doel hoger ligt."
      >
        <ButtonLink href="/slagingscheck">
          Vraag een gratis Slagingscheck aan
          <ArrowRight className="h-[18px] w-[18px]" />
        </ButtonLink>
        <SchaarstePill variant="premium" />
      </PageHeader>

      {/* Prijsblok */}
      <section className="py-20">
        <Container>
          <div className="mx-auto max-w-3xl overflow-hidden rounded-[28px] border border-line">
            <div className="bg-green px-8 py-10 text-center text-white">
              <div className="mx-auto mb-5 grid h-14 w-14 place-items-center rounded-2xl bg-white/15">
                <Target className="h-7 w-7 text-white" />
              </div>
              <p className="text-[15px] text-white/80">Premium 1-op-1</p>
              <p className="mt-2 font-display text-[clamp(2.5rem,5vw,3.5rem)] font-semibold leading-none">
                {euro(prijzen.premium)}
              </p>
              <p className="mt-3 text-[15px] text-white/80">
                {programma.lesurenTotaal} uur volledig individueel · {programma.duurWeken} weken ·{" "}
nog {plekken.premiumBeschikbaar} van de {plekken.premiumTotaal} plekken beschikbaar
              </p>
            </div>
            <div className="grid gap-4 bg-white p-8 sm:grid-cols-3">
              {[
                { icon: Clock, label: `${programma.lesurenTotaal} uur 1-op-1` },
                { icon: Users, label: "Eigen vaste docent" },
                { icon: Target, label: "Eigen cijferdoel" },
              ].map((x) => (
                <div key={x.label} className="flex items-center gap-3">
                  <span className="grid h-10 w-10 flex-none place-items-center rounded-xl bg-green-soft">
                    <x.icon className="h-5 w-5 text-green-deep" />
                  </span>
                  <span className="text-[15px] font-medium text-ink">{x.label}</span>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Voor wie */}
      <section className="pb-20">
        <Container>
          <SectionHeading center eyebrow="Voor wie" title="Wanneer is dit de juiste keuze?" />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {voorWie.map((v) => (
              <div key={v.titel} className="rounded-2xl border border-line bg-white p-8">
                <h3 className="font-display text-[1.2rem] font-semibold text-ink">{v.titel}</h3>
                <p className="mt-2.5 text-[15px] text-ink-soft">{v.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Wat is anders */}
      <section className="pb-20">
        <Container>
          <div className="mx-auto max-w-3xl">
            <SectionHeading eyebrow="Het verschil" title="Wat krijgt u extra?" />
            <ul className="mt-10 grid gap-3">
              {verschillen.map((v) => (
                <li
                  key={v.punt}
                  className="flex items-center justify-between gap-4 rounded-xl border border-line bg-white px-5 py-4"
                >
                  <span className="flex items-center gap-3 text-[15.5px] text-ink">
                    <Check className="h-[18px] w-[18px] flex-none text-green" />
                    {v.punt}
                  </span>
                  {!v.groep && (
                    <span className="whitespace-nowrap rounded-full bg-gold/15 px-3 py-1 text-[12px] font-semibold text-[#8a5d12]">
                      Alleen Premium
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      {/* Eerlijke noot over de garantie */}
      <section className="pb-20">
        <Container>
          <div className="mx-auto max-w-3xl rounded-[28px] bg-sand px-8 py-10">
            <Eyebrow>Eerlijk over het cijferdoel</Eyebrow>
            <h2 className="mt-3 text-[clamp(1.4rem,2.6vw,1.9rem)] text-ink">
              Wij beloven geen cijfer dat we niet kunnen waarmaken.
            </h2>
            <p className="mt-4 text-[15.5px] text-ink-soft">
              Bij het groepsprogramma geven we een slagingsgarantie: uw kind haalt een voldoende, of we
              trainen gratis door tot de herkansing. Bij Premium ligt het doel hoger en persoonlijker — een
              7, een 8, of een score die past bij de selectie waarvoor uw kind zich inschrijft.
            </p>
            <p className="mt-4 text-[15.5px] text-ink-soft">
              Zo&apos;n doel spreken we individueel af tijdens de Slagingscheck, ná de diagnostische toets. Pas dan
              weten we wat realistisch is. Een harde cijfergarantie op voorhand zou een loze belofte zijn —
              en die doen we niet.
            </p>
          </div>
        </Container>
      </section>

      <ProgrammaCTA
        title="Benieuwd wat haalbaar is?"
        body="Tijdens de gratis Slagingscheck bespreken we het doel van uw kind en wat daarvoor nodig is."
        schaarste={`Nog ${plekken.premiumBeschikbaar} van de ${plekken.premiumTotaal} Premium-plekken beschikbaar`}
        secundair={{ label: "Bekijk het groepsprogramma", href: "/slagingsprogramma" }}
      />
    </>
  );
}
