import type { Metadata } from "next";
import { Container, ButtonLink, SectionHeading, Eyebrow } from "@/components/ui";
import { PageHeader } from "@/components/page-header";
import { ProgrammaCTA } from "@/components/programma-secties";
import { ProgrammaLadder } from "@/components/programma-kaarten";
import { ArrowRight, Check, Users, Target, Shield } from "@/components/icons";
import { programmasOpVolgorde, garantieLabels } from "@/config/programmas";

export const metadata: Metadata = {
  title: "Alle programma's — van toetsweek tot eindexamen",
  description:
    "Van een korte Toetsweek Sprint tot het volledige Slagingsprogramma. Allemaal dezelfde methode: persoonlijke begeleiding op maat, diagnose vooraf en een vaste docent.",
  alternates: { canonical: "/programmas" },
};

const gemeenschappelijk = [
  { icon: Users, titel: "Op uw kind afgestemd", body: "Altijd op precies het juiste niveau ingedeeld." },
  { icon: Target, titel: "Diagnose vooraf", body: "We meten eerst waar de gaten zitten." },
  { icon: Check, titel: "Vaste docent", body: "Bevoegd, ervaren en steeds dezelfde." },
  { icon: Shield, titel: "Altijd een garantie", body: "Passend bij wat we kunnen meten." },
];

export default function ProgrammasPage() {
  return (
    <>
      <PageHeader
        eyebrow="Alle programma's"
        title="Eén methode, zes momenten in het schooljaar."
        intro="Elk programma draait op dezelfde manier: persoonlijke begeleiding op precies het juiste niveau, een diagnose vooraf en een vaste docent. Alleen de duur, het tempo en de belofte verschillen."
      >
        <ButtonLink href="/slagingscheck">
          Vraag een gratis Slagingscheck aan
          <ArrowRight className="h-[18px] w-[18px]" />
        </ButtonLink>
      </PageHeader>

      {/* Wat overal hetzelfde is */}
      <section className="py-20">
        <Container>
          <SectionHeading
            center
            eyebrow="Dezelfde basis"
            title="Wat in elk programma hetzelfde blijft."
          />
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {gemeenschappelijk.map((g) => (
              <div key={g.titel} className="rounded-2xl border border-line bg-white p-7">
                <div className="mb-5 grid h-12 w-12 place-items-center rounded-xl bg-green-soft">
                  <g.icon className="h-6 w-6 text-green-deep" />
                </div>
                <h3 className="font-display text-[1.15rem] font-semibold text-ink">{g.titel}</h3>
                <p className="mt-1.5 text-[15px] text-ink-soft">{g.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* De ladder */}
      <section className="pb-20">
        <Container>
          <SectionHeading
            eyebrow="Door het schooljaar heen"
            title="Van korte sprint tot volledig examentraject."
            intro="Veel ouders beginnen klein en groeien mee. Na elk programma bespreken we samen of — en wat — een volgende stap zou zijn."
          />
          <div className="mt-12">
            <ProgrammaLadder items={programmasOpVolgorde} />
          </div>
          <p className="mt-6 text-center text-sm text-muted">
            Programma&apos;s met &ldquo;volgend seizoen&rdquo; zijn nog niet open voor inschrijving. Vraag
            gerust de Slagingscheck aan — dan laten we het weten zodra ze starten.
          </p>
        </Container>
      </section>

      {/* De garantieladder */}
      <section className="pb-20">
        <Container>
          <div className="rounded-[28px] bg-sand px-7 py-14 sm:px-11">
            <div className="mx-auto max-w-2xl text-center">
              <Eyebrow>Onze garanties</Eyebrow>
              <h2 className="mt-3 text-[clamp(1.75rem,3.4vw,2.5rem)] text-ink">
                Hoe langer het traject, hoe verder onze belofte gaat.
              </h2>
              <p className="mt-4 text-[1.05rem] text-ink-soft">
                We beloven nooit iets wat we niet kunnen meten. Bij een sprint van twee weken kunnen we
                geen eindcijfer garanderen — bij een traject van twaalf weken wel.
              </p>
            </div>
            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {(["tevredenheid", "voortgang", "resultaat"] as const).map((niveau, i) => {
                const g = garantieLabels[niveau];
                return (
                  <div key={niveau} className="rounded-2xl bg-white p-7">
                    <div className="mb-4 grid h-10 w-10 place-items-center rounded-full bg-green font-display text-[15px] font-semibold text-white">
                      {i + 1}
                    </div>
                    <h3 className="font-display text-[1.15rem] font-semibold text-ink">{g.label}</h3>
                    <p className="mt-2 text-[14.5px] text-ink-soft">{g.uitleg}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </Container>
      </section>

      <ProgrammaCTA
        title="Weten welk programma past?"
        body="Tijdens de gratis Slagingscheck kijken we samen naar de situatie van uw kind en welk traject daarbij hoort — ook als dat een korter of goedkoper programma is."
        secundair={{ label: "Bekijk het Slagingsprogramma", href: "/slagingsprogramma" }}
      />
    </>
  );
}
