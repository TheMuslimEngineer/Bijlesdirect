import type { Metadata } from "next";
import { paginaMeta } from "@/lib/seo";
import { Container, ButtonLink, SectionHeading } from "@/components/ui";
import { PageHeader } from "@/components/page-header";
import { ProgrammaCTA, SchaarstePill } from "@/components/programma-secties";
import { ArrowRight, Check } from "@/components/icons";
import { programma, prijzen, plekken, toonSchaarste, euro, premiumGarantie } from "@/config/programma";

export const metadata: Metadata = paginaMeta({
  titel: "Premium 1-op-1 examentraining wiskunde",
  omschrijving:
    `${programma.lesurenTotaal} uur 1-op-1 examentraining wiskunde voor leerlingen met een hoger doel, zoals een numerus fixus-studie. Garantie op een ${premiumGarantie.cijfer} of hoger, na selectie.`,
  pad: "/premium",
});

const voorWie = [
  {
    titel: "Een numerus fixus-studie",
    body: "Geneeskunde, tandheelkunde of een technische studie met selectie: daar telt het cijfer waarmee uw kind slaagt.",
  },
  {
    titel: "Een specifiek cijferdoel",
    body: "Uw kind heeft geen 5,5 nodig maar een 8 of hoger, voor het profiel, de vervolgstudie of het eigen gevoel van kunnen.",
  },
  {
    titel: "Een uitzonderlijke situatie",
    body: "Langdurige ziekte, een wisseling van school of een leerachterstand die om volledig individuele aandacht vraagt.",
  },
];

const verschillen = [
  { punt: `${programma.lesurenTotaal} uur volledig 1-op-1`, groep: false },
  { punt: "Lestempo en onderwerpen volledig op maat", groep: false },
  { punt: `Garantie op een ${premiumGarantie.cijfer} of hoger`, groep: false },
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
        title="Voor wie meer wil dan slagen"
        intro="Hetzelfde programma, volledig individueel. Voor leerlingen met een hoger doel."
      >
        <ButtonLink href="/slagingscheck">
          Vraag een gratis Slagingscheck aan
          <ArrowRight className="h-[18px] w-[18px]" />
        </ButtonLink>
        <SchaarstePill variant="premium" />
      </PageHeader>


      {/* Herkenning: bij Premium is de zorg niet zakken, maar te laag
          eindigen voor de studie waar het kind zijn zinnen op heeft gezet. */}
      <section className="py-20">
        <Container>
          <div className="mx-auto max-w-3xl">
            <h2 className="text-[clamp(1.7rem,3.4vw,2.4rem)] text-ink">
              Uw kind haalt het wel. Daar gaat het niet om
            </h2>
            <div className="mt-8 space-y-4 text-[1.05rem] leading-relaxed text-ink-soft">
              <p>
                Er staat een zes, misschien een zeven. Niemand op school maakt zich zorgen. En
                precies daarom krijgt uw kind ook geen extra aandacht. De school is er voor de
                leerlingen die dreigen te zakken.
              </p>
              <p>
                Maar u weet waar het over gaat. Uw kind heeft een studie in het hoofd waar geselecteerd
                wordt. En het verschil tussen die zes en een acht bepaalt of die deur open of dicht
                gaat.
              </p>
              <p className="text-ink">
                Dat gesprek voert u nu al maanden thuis, en meestal eindigt het met: we zien het wel.
                Alleen zien we het niet wel. In mei wordt het cijfer definitief, en daarna telt geen
                enkel argument meer mee.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Prijsblok */}
      <section className="py-20">
        <Container>
          <div className="mx-auto max-w-3xl overflow-hidden rounded-[28px] border border-line">
            <div className="bg-green px-8 py-10 text-center text-white">
              <p className="text-[15px] text-white/80">Premium 1-op-1</p>
              <p className="mt-2 font-display text-[clamp(2.5rem,5vw,3.5rem)] font-semibold leading-none">
                {euro(prijzen.premium)}
              </p>
              <p className="mt-2 text-[15px] text-white/80">
                of {prijzen.premiumTermijnen.aantal} termijnen van {euro(prijzen.premiumTermijnen.bedrag)}
              </p>
              <p className="mt-3 text-[15px] text-white/80">
                {programma.lesurenTotaal} uur volledig individueel · {programma.duurWeken} weken
                {toonSchaarste.premium &&
                  ` · nog ${plekken.premiumBeschikbaar} van de ${plekken.premiumTotaal} plekken beschikbaar`}
              </p>
            </div>
            <ul className="grid gap-4 bg-white p-8 sm:grid-cols-3">
              {[
                `${programma.lesurenTotaal} uur 1-op-1`,
                "Eigen vaste docent",
                `Garantie op een ${premiumGarantie.cijfer}`,
              ].map((label) => (
                <li key={label} className="flex items-center gap-2.5 text-[15px] font-medium text-ink">
                  <Check className="h-[18px] w-[18px] flex-none text-green" />
                  {label}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      {/* Voor wie */}
      <section className="pb-20">
        <Container>
          <SectionHeading title="Voor wie is dit?" />
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
            <SectionHeading title="Wat krijgt u extra?" />
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

      {/* De cijfergarantie. Alleen geloofwaardig omdat we vooraf selecteren:
          daarom staan de garantie en de selectie in één blok. */}
      <section className="pb-20">
        <Container>
          <div className="mx-auto max-w-3xl rounded-[28px] bg-sand px-8 py-10">
            <h2 className="text-[clamp(1.4rem,2.6vw,1.9rem)] text-ink">
              Wij garanderen een {premiumGarantie.cijfer} of hoger
            </h2>
            <p className="mt-4 text-[15.5px] text-ink-soft">
              Bij Premium gaat het om een hoog cijfer. Daarom geven we hier een
              cijfergarantie: uw kind haalt een {premiumGarantie.cijfer} of hoger voor het eindexamen
              wiskunde.
            </p>
            <ol className="mt-6 grid gap-4">
              {premiumGarantie.stappen.map((s) => (
                <li key={s.stap} className="flex gap-4">
                  <span className="grid h-8 w-8 flex-none place-items-center rounded-full bg-green font-display text-[15px] font-semibold text-white">
                    {s.stap}
                  </span>
                  <div>
                    <p className="font-display text-[1.1rem] font-semibold text-ink">{s.titel}</p>
                    <p className="mt-0.5 text-[15.5px] text-ink-soft">{s.body}</p>
                  </div>
                </li>
              ))}
            </ol>

            <div className="mt-8 border-t border-line pt-7">
              <h3 className="font-display text-[1.2rem] font-semibold text-ink">
                Daarom laten we niet iedereen toe.
              </h3>
              <p className="mt-2 text-[15.5px] text-ink-soft">
                Een {premiumGarantie.cijfer} is niet voor elke leerling haalbaar in{" "}
                {programma.duurWeken} weken. In de Slagingscheck en met de diagnostische toets kijken we
                of het voor uw kind haalbaar is. Alleen dan bieden we een plek aan, met garantie. Is het
                niet haalbaar, dan zeggen we dat eerlijk.
              </p>
              <p className="mt-5 font-display text-[1.05rem] font-semibold text-ink">Voorwaarden</p>
              <ul className="mt-3 grid gap-2">
                {premiumGarantie.voorwaarden.map((v) => (
                  <li key={v} className="flex items-start gap-2.5 text-[15px] text-ink-soft">
                    <Check className="mt-0.5 h-[18px] w-[18px] flex-none text-green" />
                    {v}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      {/* Stap 11 — de inzet. Bij Premium is die anders dan bij het
          groepsprogramma: niet slagen, maar het cijfer zelf. */}
      <section className="pb-20">
        <Container>
          <div className="mx-auto max-w-3xl rounded-[28px] border border-line bg-white px-8 py-12 sm:px-11">
            <h2 className="text-[clamp(1.5rem,2.8vw,2rem)] text-ink">
              Bij een selectiestudie telt het cijfer
            </h2>
            <div className="mt-5 space-y-4 text-[1.05rem] leading-relaxed text-ink-soft">
              <p>
                Een 6 en een 8 leveren allebei een diploma op. Maar ze leveren niet dezelfde keuze
                op.
              </p>
              <p>
                Daarom houden we het bij {plekken.premiumTotaal} plekken per jaar. Volledig 1-op-1,{" "}
                {programma.lesurenTotaal} uur, één docent die het hele traject bij uw kind blijft.
                Meer dan {plekken.premiumTotaal} kunnen we niet doen zonder dat het ten koste gaat
                van precies datgene waarvoor u komt.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <ProgrammaCTA
        recap={[
          `${programma.lesurenTotaal} uur volledig 1-op-1 met één vaste bèta-docent`,
          `Garantie op een ${premiumGarantie.cijfer} of hoger, na toelating via onze selectie`,
          "Lestempo, onderwerpen en planning volledig op uw kind afgestemd",
          `${euro(prijzen.premium)} · ${plekken.premiumBeschikbaar} van de ${plekken.premiumTotaal} plekken nog vrij`,
        ]}
        title="Benieuwd wat haalbaar is?"
        body={`In de gratis Slagingscheck kijken we of een ${premiumGarantie.cijfer} haalbaar is voor uw kind. Is dat zo, dan bieden we een plek aan, met garantie. Is het niet haalbaar, dan hoort u dat eerlijk.`}
        schaarste={
          toonSchaarste.premium
            ? `Nog ${plekken.premiumBeschikbaar} van de ${plekken.premiumTotaal} Premium-plekken beschikbaar`
            : null
        }
        secundair={{ label: "Bekijk het groepsprogramma", href: "/slagingsprogramma" }}
      />
    </>
  );
}
