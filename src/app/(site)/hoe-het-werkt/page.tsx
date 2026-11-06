import type { Metadata } from "next";
import Image from "next/image";
import { Container, ButtonLink } from "@/components/ui";
import { PageHeader } from "@/components/page-header";
import { ProgrammaCTA } from "@/components/programma-secties";
import { ArrowRight, Check } from "@/components/icons";
import { programma } from "@/config/programma";
import onlineLes from "../../../../public/images/online-les.webp";
import docentTeam from "../../../../public/images/docent-team.webp";

export const metadata: Metadata = {
  title: "Onze aanpak bij examentraining wiskunde",
  description:
    "Diagnose, plan, begeleiding en garantie. Zo werkt Examenklaar, en waarom losse bijlesuren zelden het onderliggende probleem oplossen.",
  alternates: { canonical: "/hoe-het-werkt" },
};

const fasen = [
  {
    titel: "Diagnose",
    body: "We beginnen met meten. De diagnostische toets laat precies zien welke onderdelen ontbreken, meestal stof uit een eerder leerjaar die nooit is rechtgezet. Zonder die meting is elk bijlesuur een gok.",
    punten: ["Diagnostische toets vóór de start", "Persoonlijke gatenkaart", "Groepsindeling op niveau"],
  },
  {
    titel: "Het plan",
    body: `Binnen 48 uur ligt er een examenplan tot mei: welke onderwerpen wanneer, met welk huiswerk en welke tussendoelen. U hoeft niets uit te zoeken, te printen of te plannen.`,
    punten: ["Examenplan tot aan mei", "Huiswerk in kleine stappen", "Heldere tussendoelen"],
  },
  {
    titel: "De begeleiding",
    body: `${programma.duurWeken} weken lang twee keer per week les, met een success coach die de voortgang bewaakt en uw kind elke week persoonlijk spreekt. U krijgt elke week een kort rapport. Meer hoeft u niet te doen.`,
    punten: ["2× per week 2 uur les", "Wekelijks 1-op-1 gesprek", "Wekelijks ouderrapport"],
  },
  {
    titel: "De garantie",
    body: "Omdat we de diagnose, het plan en de uitvoering in handen hebben, durven we het risico te dragen. Slaagt uw kind niet, dan trainen we gratis door tot de herkansing. Lukt het dan nog niet, dan krijgt u uw geld terug.",
    punten: ["Gratis doortrainen bij zakken", "Volledige terugbetaling daarna", "Voorwaarden vooraf duidelijk"],
  },
];

const docentPunten = [
  {
    titel: "Academisch afgestudeerd",
    body: "Een universitaire graad in wiskunde, natuurkunde of een technische studie.",
  },
  {
    titel: "Werkzaam in het vak",
    body: "Naast het lesgeven actief in hun vakgebied. Ze weten dus ook waar de examenstof in de praktijk voor dient.",
  },
  {
    titel: "Zelf geselecteerd en getraind",
    body: "Elke docent doorloopt onze selectie en wordt getraind op onze examenmethode.",
  },
];

export default function HoeHetWerktPage() {
  return (
    <>
      <PageHeader
        eyebrow="Onze aanpak"
        title="Waarom dit werkt waar losse bijlesuren stoppen"
        intro="Gewone bijles behandelt de stof van deze week. Wij zoeken eerst uit waar het echt misgaat, en nemen u het regelwerk uit handen."
      >
        <ButtonLink href="/slagingscheck">
          Vraag een gratis Slagingscheck aan
          <ArrowRight className="h-[18px] w-[18px]" />
        </ButtonLink>
        <ButtonLink href="/slagingsprogramma" variant="ghost">
          Bekijk het programma
        </ButtonLink>
      </PageHeader>

      {/* Foto */}
      <section className="pt-16">
        <Container>
          <figure className="relative overflow-hidden rounded-[28px] border border-line">
            <Image
              src={onlineLes}
              alt="Schermbeeld van een online les: de docent werkt een som uit op het digitale bord, naast een opgave uit het lesboek"
              placeholder="blur"
              priority
              sizes="(max-width: 1200px) 100vw, 1152px"
              className="w-full"
            />
            <figcaption className="absolute bottom-4 left-4 rounded-full bg-ink/80 px-4 py-1.5 text-[13px] font-medium text-white backdrop-blur">
              Een online les in de praktijk
            </figcaption>
          </figure>
        </Container>
      </section>

      {/* Wie geeft er les */}
      <section className="py-20">
        <Container>
          <div className="max-w-2xl">
            <h2 className="text-[clamp(1.75rem,3.4vw,2.5rem)] text-ink">Wie er lesgeeft</h2>
            <p className="mt-4 text-[1.05rem] text-ink-soft">
              Als wij &ldquo;bevoegde bèta-docent&rdquo; zeggen, bedoelen we dat letterlijk: een
              afgestudeerde professional met een bèta-achtergrond, die het vak heeft gestudeerd en het
              kan uitleggen.
            </p>
          </div>
          {/* Bewust geen derde kaartenrij: één echte docent naast de eisen
              zegt meer dan drie identieke kaarten. */}
          <div className="mt-12 grid gap-10 md:grid-cols-[minmax(0,320px)_1fr] md:items-center md:gap-14">
            <figure>
              <Image
                src={docentTeam}
                alt="AbdulRahman, hoofddocent wiskunde bij ExamenDocent"
                placeholder="blur"
                sizes="(max-width: 768px) 100vw, 320px"
                className="aspect-[4/5] w-full rounded-[24px] border border-line object-cover object-top"
              />
              <figcaption className="mt-4">
                <p className="font-display text-[1.15rem] font-semibold text-ink">AbdulRahman</p>
                <p className="text-[14px] font-medium text-green-deep">Onze hoofddocent wiskunde</p>
                <p className="mt-2 text-[14px] leading-relaxed text-muted">
                  Propedeuse lerarenopleiding wiskunde · wiskunde aan de universiteit · al 7 jaar
                  docent
                </p>
              </figcaption>
            </figure>
            <ul className="grid gap-5">
              {docentPunten.map((p) => (
                <li key={p.titel}>
                  <div>
                    <h3 className="font-display text-[1.15rem] font-semibold text-ink">{p.titel}</h3>
                    <p className="mt-1 text-[15px] text-ink-soft">{p.body}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      {/* De vier fasen */}
      <section className="py-20">
        <Container>
          <div className="grid gap-12">
            {fasen.map((f, i) => (
              <div key={f.titel} className="grid items-start gap-8 md:grid-cols-[auto_1fr] md:gap-12">
                <span className="grid h-16 w-16 flex-none place-items-center rounded-2xl bg-green-soft font-display text-2xl font-semibold text-green-deep">
                  {i + 1}
                </span>
                <div className="max-w-2xl">
                  <h2 className="text-[clamp(1.5rem,2.6vw,2rem)] text-ink">{f.titel}</h2>
                  <p className="mt-3 text-lg text-ink-soft">{f.body}</p>
                  <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-2.5">
                    {f.punten.map((p) => (
                      <li key={p} className="flex items-center gap-2 text-[15px] font-medium text-ink">
                        <Check className="h-[18px] w-[18px] text-green" />
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <ProgrammaCTA
        title="Zo weet u binnen dertig minuten waar u aan toe bent"
        body="De Slagingscheck is de eerste stap van precies deze aanpak: eerst meten, dan pas praten over het programma. Ook als daar uitkomt dat u ons niet nodig heeft."
        recap={[
          "We kijken samen naar de cijfers, de toetsen en wat er thuis gebeurt",
          "U hoort een eerlijk oordeel: is slagen haalbaar, en is dit programma daarvoor de juiste weg",
          "Past het? Dan volgt de diagnostische toets en binnen 48 uur het plan",
          "Past het niet? Dan zeggen we dat, en bent u dertig minuten verder",
        ]}
      />
    </>
  );
}

