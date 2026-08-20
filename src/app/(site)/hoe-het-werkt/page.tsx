import type { Metadata } from "next";
import Image from "next/image";
import { Container, ButtonLink, Eyebrow } from "@/components/ui";
import { PageHeader } from "@/components/page-header";
import { ProgrammaCTA, GarantieBlok } from "@/components/programma-secties";
import { ArrowRight, Check, Calendar, Bell, ClipboardCheck, Mail, Cap, Target, Shield } from "@/components/icons";
import { programma } from "@/config/programma";
import adamLesgeven from "../../../../public/images/adam-lesgeven.webp";

export const metadata: Metadata = {
  title: "Onze aanpak — waarom dit anders is dan losse bijlesuren",
  description:
    "Diagnose, plan, begeleiding en garantie. Zo werkt het Wiskunde Slagingsprogramma — en waarom losse bijlesuren zelden het onderliggende probleem oplossen.",
  alternates: { canonical: "/hoe-het-werkt" },
};

const fasen = [
  {
    titel: "Diagnose",
    body: "We beginnen niet met lesgeven, maar met meten. De diagnostische toets laat precies zien welke onderdelen ontbreken — meestal stof uit een eerder leerjaar die nooit is rechtgezet. Zonder die kaart is elke bijlesuur een gok.",
    punten: ["Diagnostische toets vóór de start", "Persoonlijke gatenkaart", "Groepsindeling op niveau"],
  },
  {
    titel: "Het plan",
    body: `Binnen 48 uur ligt er een examenplan tot mei: welke onderwerpen wanneer, met welk huiswerk en welke tussendoelen. U hoeft niets uit te zoeken, te printen of te plannen.`,
    punten: ["Examenplan tot aan mei", "Huiswerk in kleine stappen", "Heldere tussendoelen"],
  },
  {
    titel: "De begeleiding",
    body: `${programma.duurWeken} weken lang twee keer per week les, met een success coach die de voortgang bewaakt en uw kind elke twee weken persoonlijk spreekt. U krijgt elke week een kort rapport — meer hoeft u niet te doen.`,
    punten: ["2× per week 2 uur les", "Tweewekelijks 1-op-1 gesprek", "Wekelijks ouderrapport"],
  },
  {
    titel: "De garantie",
    body: "Omdat we de diagnose, het plan én de uitvoering in handen hebben, durven we het risico te dragen. Slaagt uw kind niet, dan trainen we gratis door tot de herkansing. Lukt het dan nog niet, dan krijgt u uw geld terug.",
    punten: ["Gratis doortrainen bij zakken", "Volledige terugbetaling daarna", "Voorwaarden vooraf duidelijk"],
  },
];

const docentPunten = [
  {
    icon: Cap,
    titel: "Academisch afgestudeerd",
    body: "Een universitaire graad in wiskunde, natuurkunde of een technische studie — geen student die er zelf nog middenin zit.",
  },
  {
    icon: Target,
    titel: "Werkzaam in het vak",
    body: "Naast het lesgeven actief in hun vakgebied. Dat merkt u: ze kennen niet alleen de examenstof, maar ook waar die goed voor is.",
  },
  {
    icon: Shield,
    titel: "Zelf geselecteerd en getraind",
    body: "Elke docent doorloopt onze selectie en wordt getraind op onze examenmethode — niemand staat zomaar voor de klas.",
  },
];

const overnemen = [
  { icon: Calendar, titel: "Wij plannen", body: "U hoeft geen agenda's te puzzelen." },
  { icon: Bell, titel: "Wij sporen aan", body: "Het herinneren en controleren doen wij, niet u." },
  { icon: ClipboardCheck, titel: "Wij bewaken het huiswerk", body: "We zien of het gedaan is en sturen bij." },
  { icon: Mail, titel: "U krijgt het weekrapport", body: "Meer hoeft u niet te doen." },
];

export default function HoeHetWerktPage() {
  return (
    <>
      <PageHeader
        eyebrow="Onze aanpak"
        title="Waarom dit werkt waar losse bijlesuren stoppen."
        intro="Bijles per week behandelt de stof van deze week. Wij pakken de oorzaak aan — en nemen het regelwerk bij u weg."
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
              src={adamLesgeven}
              alt="Adam geeft online examentraining wiskunde"
              placeholder="blur"
              priority
              sizes="(max-width: 1200px) 100vw, 1152px"
              className="max-h-[440px] w-full object-cover object-center"
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
          <div className="mx-auto max-w-2xl text-center">
            <Eyebrow>Onze docenten</Eyebrow>
            <h2 className="mt-3 text-[clamp(1.75rem,3.4vw,2.5rem)] text-ink">
              Geen student met een bijbaantje.
            </h2>
            <p className="mt-4 text-[1.05rem] text-ink-soft">
              Als wij &ldquo;bevoegde bèta-docent&rdquo; zeggen, bedoelen we dat letterlijk: een
              afgestudeerde professional met een bèta-achtergrond — niet zomaar iemand die toevallig
              goed is in wiskunde.
            </p>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-3">
            {docentPunten.map((p) => (
              <div key={p.titel} className="rounded-2xl border border-line bg-white p-6">
                <div className="mb-4 grid h-11 w-11 place-items-center rounded-xl bg-green-soft">
                  <p.icon className="h-5 w-5 text-green-deep" />
                </div>
                <h3 className="font-display text-[1.1rem] font-semibold text-ink">{p.titel}</h3>
                <p className="mt-1.5 text-[14.5px] text-ink-soft">{p.body}</p>
              </div>
            ))}
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

      {/* Wij nemen het over */}
      <section className="pb-20">
        <Container>
          <div className="rounded-[28px] bg-sand px-7 py-14 sm:px-11">
            <div className="mx-auto max-w-2xl text-center">
              <Eyebrow>Het regelwerk</Eyebrow>
              <h2 className="mt-3 text-[clamp(1.75rem,3.4vw,2.5rem)] text-ink">
                Wij nemen het zware deel over.
              </h2>
              <p className="mt-4 text-[1.05rem] text-ink-soft">
                Het zwaarste aan bijles is niet de les. Het is het geregel eromheen — en dat halen we bij u
                weg.
              </p>
            </div>
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {overnemen.map((o) => (
                <div key={o.titel} className="rounded-2xl bg-white p-6">
                  <div className="mb-4 grid h-11 w-11 place-items-center rounded-xl bg-green-soft">
                    <o.icon className="h-[22px] w-[22px] text-green-deep" />
                  </div>
                  <h3 className="font-display text-[1.15rem] font-semibold text-ink">{o.titel}</h3>
                  <p className="mt-1.5 text-[14.5px] text-ink-soft">{o.body}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Garantie */}
      <section className="pb-20">
        <Container>
          <GarantieBlok />
        </Container>
      </section>

      <ProgrammaCTA />
    </>
  );
}
