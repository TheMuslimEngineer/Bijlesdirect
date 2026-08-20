import type { Metadata } from "next";
import { Container, ButtonLink, SectionHeading } from "@/components/ui";
import { PageHeader } from "@/components/page-header";
import { StatsBand } from "@/components/sections";
import { ProgrammaCTA } from "@/components/programma-secties";
import { ArrowRight, Shield, Sparkles, Users } from "@/components/icons";

export const metadata: Metadata = {
  title: "Over ons — waarom wij ons richten op examentraining wiskunde",
  description:
    "Bijlesdirect is een klein, persoonlijk team dat zich volledig richt op examentraining wiskunde voor HAVO en VWO. Lees waarom we die keuze maakten.",
  alternates: { canonical: "/over-ons" },
};

const waarden = [
  {
    icon: Users,
    title: "De juiste klik",
    body: "Onze docenten zijn afgestudeerde bèta-professionals, geen studenten met een bijbaantje. We koppelen uw kind aan iemand die het vak beheerst én er echt voor uw kind is.",
  },
  {
    icon: Sparkles,
    title: "Zelfvertrouwen voorop",
    body: "Een hoger cijfer is het gevolg, niet het doel. We bouwen aan begrip en zelfvertrouwen, zodat uw kind het uiteindelijk zelf kan.",
  },
  {
    icon: Shield,
    title: "Wij dragen het risico",
    body: "Onze garantie is geen marketingtruc, maar een gevolg van hoe we werken: eerst diagnose, dan een plan, dan uitvoering die we zelf in de hand hebben.",
  },
];

export default function OverOnsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Over Bijlesdirect"
        title="Eén vak, één doel, één klein team."
        intro="Bijlesdirect is ontstaan vanuit één overtuiging: elk kind verdient begeleiding die past bij wie het is. Geen massale aanpak, maar persoonlijke aandacht die werkt."
      >
        <ButtonLink href="/slagingscheck">
          Vraag een gratis Slagingscheck aan
          <ArrowRight className="h-[18px] w-[18px]" />
        </ButtonLink>
      </PageHeader>

      <section className="py-20">
        <Container>
          <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <SectionHeading eyebrow="Ons verhaal" title="Waarom wij kozen voor wiskunde." />
              <div className="mt-6 space-y-4 text-lg text-ink-soft">
                <p>
                  Jarenlang gaven we bijles in bijna elk vak en op elk niveau. Dat ging goed — maar we
                  merkten dat we het grootste verschil maakten bij één specifieke groep: examenkandidaten
                  die vastliepen op wiskunde.
                </p>
                <p>
                  Wiskunde is het grootste examenvak van Nederland, en tegelijk het vak waar het
                  docententekort het hardst voelbaar is. Duizenden leerlingen per jaar gaan het examen in
                  met een onvoldoende, terwijl het probleem meestal niet bij dit jaar ligt maar bij een
                  basis die eerder is blijven liggen.
                </p>
                <p>
                  Daarom hebben we gekozen. Niet meer alles voor iedereen, maar één programma dat we tot in
                  detail beheersen — met een garantie die we durven af te geven omdat we weten wat het
                  oplevert.
                </p>
              </div>
            </div>

            <div
              className="grid aspect-[4/3] place-items-center overflow-hidden rounded-[24px] border border-line"
              style={{
                background: "linear-gradient(140deg, var(--color-green-soft), var(--color-sand-2))",
              }}
            >
              <div className="text-center">
                <div className="font-display text-[clamp(3rem,6vw,5rem)] font-semibold text-green-deep">
                  500+
                </div>
                <p className="mt-2 text-ink-soft">geholpen gezinnen en groeiende</p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="pb-20">
        <Container>
          <SectionHeading center eyebrow="Waar we voor staan" title="Onze uitgangspunten." />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {waarden.map((v) => (
              <div key={v.title} className="rounded-2xl border border-line bg-white p-8">
                <div className="mb-5 grid h-[50px] w-[50px] place-items-center rounded-[14px] bg-green-soft">
                  <v.icon className="h-6 w-6 text-green-deep" />
                </div>
                <h3 className="text-[1.3rem]">{v.title}</h3>
                <p className="mt-2.5 text-[15.5px] text-ink-soft">{v.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="pb-20">
        <StatsBand />
      </section>

      <ProgrammaCTA />
    </>
  );
}
