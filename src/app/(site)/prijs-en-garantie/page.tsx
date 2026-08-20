import type { Metadata } from "next";
import { Container, ButtonLink, SectionHeading } from "@/components/ui";
import { PageHeader } from "@/components/page-header";
import { Waardestapel, GarantieBlok, ProgrammaCTA } from "@/components/programma-secties";
import { ArrowRight, Check, Target } from "@/components/icons";
import { faqs } from "@/lib/site";
import { programma, prijzen, plekken, euro } from "@/config/programma";

export const metadata: Metadata = {
  title: "Prijs & garantie — Het Wiskunde Slagingsprogramma",
  description: `Het volledige programma kost ${euro(prijzen.programma)} of ${prijzen.termijnen.aantal} termijnen van ${euro(prijzen.termijnen.bedrag)}. Slaagt uw kind niet, dan trainen we gratis door tot de herkansing — en lukt het dan nog niet, dan krijgt u uw geld terug.`,
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
    body: "Gespreid betalen over de looptijd van het programma, zonder extra kosten.",
  },
];

export default function PrijsEnGarantiePage() {
  return (
    <>
      <PageHeader
        eyebrow="Prijs & garantie"
        title="Wat het kost — en wat u terugkrijgt als het niet lukt."
        intro={`Eén programma, één prijs, geen uurtarieven. En een garantie die we zwart-op-wit durven te zetten.`}
      >
        <ButtonLink href="/slagingscheck">
          Vraag een gratis Slagingscheck aan
          <ArrowRight className="h-[18px] w-[18px]" />
        </ButtonLink>
      </PageHeader>

      {/* Waardestapel */}
      <section className="py-20">
        <Container>
          <SectionHeading
            center
            eyebrow="Wat er in zit"
            title={programma.naam}
            intro={programma.subregel}
          />
          <div className="mt-12">
            <Waardestapel />
          </div>
        </Container>
      </section>

      {/* Betaalopties */}
      <section className="pb-20">
        <Container>
          <SectionHeading center eyebrow="Betalen" title="Twee manieren om te betalen." />
          <div className="mx-auto mt-10 grid max-w-3xl gap-6 sm:grid-cols-2">
            {betaalopties.map((b) => (
              <div key={b.titel} className="rounded-2xl border border-line bg-white p-8 text-center">
                <p className="font-display text-[1.2rem] font-semibold text-ink">{b.titel}</p>
                <p className="mt-3 font-display text-[2rem] font-semibold text-green-deep">{b.bedrag}</p>
                <p className="mt-3 text-[15px] text-ink-soft">{b.body}</p>
              </div>
            ))}
          </div>
          <p className="mx-auto mt-6 max-w-3xl text-center text-sm text-muted">
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
                  Premium 1-op-1 — {euro(prijzen.premium)}
                </h3>
                <p className="mt-1 max-w-xl text-[15px] text-ink-soft">
                  Hetzelfde programma, volledig individueel. Voor leerlingen die geen 5,5 nodig hebben
                  maar een 7 of 8 — bijvoorbeeld voor een numerus fixus-studie.{" "}
                  Nog {plekken.premiumBeschikbaar} van de {plekken.premiumTotaal} plekken beschikbaar.
                </p>
              </div>
            </div>
            <ButtonLink href="/premium" variant="ghost">
              Meer over Premium
            </ButtonLink>
          </div>
        </Container>
      </section>

      {/* FAQ over prijs */}
      <section className="pb-4">
        <Container>
          <SectionHeading center eyebrow="Veelgestelde vragen" title="Over prijs en garantie." />
          <div className="mx-auto mt-10 max-w-3xl divide-y divide-line overflow-hidden rounded-2xl border border-line bg-white">
            {faqs.slice(3, 8).map((f) => (
              <details key={f.q} className="group">
                <summary className="flex cursor-pointer items-center justify-between gap-4 px-6 py-5 text-[1.05rem] font-medium text-ink marker:content-none">
                  {f.q}
                  <span className="grid h-7 w-7 flex-none place-items-center rounded-full border border-line text-green transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="px-6 pb-5 text-[15.5px] text-ink-soft">{f.a}</p>
              </details>
            ))}
          </div>
          <p className="mx-auto mt-8 max-w-3xl rounded-2xl bg-green-soft p-6 text-center text-[15.5px] text-green-deep">
            <Check className="mr-2 inline h-[18px] w-[18px]" />
            De volledige garantievoorwaarden staan ook in onze{" "}
            <a href="/voorwaarden" className="font-semibold underline underline-offset-2">
              algemene voorwaarden
            </a>
            .
          </p>
        </Container>
      </section>

      <ProgrammaCTA title="Twijfelt u nog?" body="Vraag de gratis Slagingscheck aan. We vertellen eerlijk of dit programma bij uw kind past — en zo niet, dan zeggen we dat ook." />
    </>
  );
}
