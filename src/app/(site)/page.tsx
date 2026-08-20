import type { Metadata } from "next";
import Link from "next/link";
import { Container, ButtonLink, Eyebrow, SectionHeading, Stars } from "@/components/ui";
import { ReviewCard, ReviewPlatforms } from "@/components/sections";
import {
  SchaarstePill,
  GarantieBlok,
  Waardestapel,
  ProgrammaCTA,
} from "@/components/programma-secties";
import {
  ArrowRight,
  Calendar,
  Bell,
  ClipboardCheck,
  Mail,
  Repeat,
  TrendUp,
  HelpCircle,
  Target,
} from "@/components/icons";
import { reviews, rating, site, faqs } from "@/lib/site";
import { programma, prijzen, plekken, euro } from "@/config/programma";
import { programmasOpVolgorde } from "@/config/programmas";

export const metadata: Metadata = {
  title: "Slagen voor het eindexamen wiskunde — gegarandeerd, of geld terug",
  description:
    "Het Wiskunde Slagingsprogramma: 12 weken examentraining voor HAVO en VWO, met een vaste docent en een diagnose vooraf. Slaagt uw kind niet, dan trainen we gratis door tot de herkansing — en lukt het dan nog niet, dan krijgt u uw geld terug.",
  alternates: { canonical: "/" },
};

const pijnpunten = [
  { icon: Repeat, text: "Elke week opnieuw moeten pushen om het huiswerk gedaan te krijgen" },
  { icon: HelpCircle, text: "U kunt de stof zelf niet meer helpen" },
  { icon: TrendUp, text: "Al eerder bijles gehad — het hielp een paar weken en zakte daarna terug" },
  { icon: Calendar, text: "Het is bijna februari en er staat nog steeds een onvoldoende" },
];

const overnemen = [
  { icon: Calendar, titel: "Wij plannen", body: "U hoeft geen agenda's te puzzelen." },
  { icon: Bell, titel: "Wij sporen aan", body: "Het herinneren en controleren doen wij, niet u." },
  { icon: ClipboardCheck, titel: "Wij bewaken het huiswerk", body: "We zien of het gedaan is en sturen bij." },
  { icon: Mail, titel: "U krijgt het weekrapport", body: "Meer hoeft u niet te doen." },
];

const stappen = [
  {
    titel: "Gratis Slagingscheck (30 minuten)",
    body: "We brengen in kaart waar uw kind staat en geven een eerlijk antwoord: is slagen haalbaar? Zo niet, dan zeggen we dat ook.",
  },
  {
    titel: "Binnen 48 uur het plan",
    body: "Diagnostische toets, een persoonlijke gatenkaart en een examenplan tot mei. U hoeft niets uit te zoeken.",
  },
  {
    titel: `${programma.duurWeken} weken begeleiding`,
    body: "Twee keer per week les, wekelijkse voortgang, tot aan het examen. Inclusief coach en ouderrapport.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Course",
  name: programma.naam,
  description:
    "12-wekenprogramma examentraining wiskunde voor examenkandidaten HAVO en VWO, met persoonlijke begeleiding op maat en een slagingsgarantie.",
  provider: {
    "@type": "EducationalOrganization",
    name: "Bijlesdirect",
    url: site.domain,
  },
  offers: {
    "@type": "Offer",
    price: prijzen.programma,
    priceCurrency: "EUR",
    category: "Examentraining wiskunde",
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    reviewCount: rating.count,
    bestRating: "5",
  },
};

export default function HomePage() {
  const topReviews = reviews.filter((r) => r.relevant).slice(0, 3);
  const overigeProgrammas = programmasOpVolgorde.filter((p) => !p.vlaggenschip);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* HERO — de garantie is de kop */}
      <section className="border-b border-line bg-sand">
        <Container className="py-16 sm:py-20">
          <div className="mx-auto max-w-3xl text-center">
            <SchaarstePill />
            <h1 className="mt-6 text-[clamp(2.1rem,5vw,3.75rem)] text-ink">
              Uw kind slaagt voor het eindexamen wiskunde.{" "}
              <em className="kop-wonk font-display italic text-green">Gegarandeerd</em> — of u krijgt
              uw geld terug.
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-[clamp(1.05rem,1.7vw,1.25rem)] text-ink-soft">
              {programma.duurWeken} weken examentraining voor HAVO en VWO, met een vaste docent en een
              volledig plan op maat. En zonder dat u nog hoeft te pushen of wakker te liggen — het
              plannen, aansporen en controleren nemen wij over.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3.5">
              <ButtonLink href="/slagingscheck">
                Vraag een gratis Slagingscheck aan
                <ArrowRight className="h-[18px] w-[18px]" />
              </ButtonLink>
              <ButtonLink href="/slagingsprogramma" variant="ghost">
                Bekijk het programma
              </ButtonLink>
            </div>

            <a
              href="#reviews"
              className="mt-8 inline-flex flex-wrap items-center justify-center gap-x-3 gap-y-2 rounded-full px-2 py-1 transition-opacity hover:opacity-75"
            >
              <Stars />
              <span className="text-[15px] text-ink-soft underline decoration-line underline-offset-4">
                <b className="text-ink">{rating.score} gemiddeld</b> · {rating.count}+ reviews · 500+
                gezinnen geholpen
              </span>
            </a>
          </div>
        </Container>
      </section>

      {/* PATTERN INTERRUPT */}
      <section className="py-20">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <Eyebrow>Even iets rechtzetten</Eyebrow>
            <h2 className="mt-3 text-[clamp(1.9rem,4vw,2.75rem)] text-ink">
              Het ligt niet aan uw kind.
            </h2>
            <p className="mt-6 text-lg text-ink-soft">
              De meeste examenkandidaten zakken niet op de moeilijke stof van dit jaar. Ze zakken op een
              basis die drie jaar geleden is blijven liggen — zonder dat iemand ooit precies heeft
              gecontroleerd wáár het is misgegaan.
            </p>
            <p className="mt-4 text-lg text-ink-soft">
              Geen verwijten, geen paniek. Wat er nodig is, is een diagnose.
            </p>
          </div>
        </Container>
      </section>

      {/* HERKENBARE SITUATIE */}
      <section className="pb-20">
        <Container>
          <div className="rounded-[28px] bg-sand px-7 py-14 sm:px-11">
            <div className="mx-auto max-w-3xl">
              <div className="text-center">
                <Eyebrow>De situatie thuis</Eyebrow>
                <h2 className="mt-3 text-[clamp(1.75rem,3.4vw,2.5rem)] text-ink">Herkent u dit?</h2>
              </div>
              <ul className="mt-10 grid gap-4 sm:grid-cols-2">
                {pijnpunten.map((p) => (
                  <li
                    key={p.text}
                    className="flex items-start gap-3.5 rounded-2xl border border-line bg-white p-5"
                  >
                    <span className="grid h-10 w-10 flex-none place-items-center rounded-xl bg-green-soft">
                      <p.icon className="h-5 w-5 text-green-deep" />
                    </span>
                    <span className="text-[15.5px] text-ink">{p.text}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-9 text-center font-display text-[clamp(1.3rem,2.4vw,1.75rem)] text-ink">
                U hoeft dit niet langer alleen op te lossen.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* WIJ NEMEN HET OVER */}
      <section className="pb-20">
        <Container>
          <SectionHeading
            center
            eyebrow="Wat wij overnemen"
            title="Wij nemen het zware deel over — van u én van uw kind."
            intro="Het zwaarste aan bijles is niet de les. Het is het geregel eromheen: de juiste docent zoeken, roosters afstemmen, en elke week opnieuw moeten aansporen."
          />
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {overnemen.map((o) => (
              <div key={o.titel} className="rounded-2xl border border-line bg-white p-7">
                <div className="mb-5 grid h-12 w-12 place-items-center rounded-xl bg-green-soft">
                  <o.icon className="h-6 w-6 text-green-deep" />
                </div>
                <h3 className="font-display text-[1.2rem] font-semibold text-ink">{o.titel}</h3>
                <p className="mt-2 text-[15px] text-ink-soft">{o.body}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 rounded-[24px] bg-green px-8 py-10 text-center text-white">
            <p className="font-display text-[clamp(1.3rem,2.6vw,1.9rem)]">
              Het resultaat is niet alleen een hoger cijfer. Het is rust in huis.
            </p>
          </div>
        </Container>
      </section>

      {/* HOE HET WERKT */}
      <section className="pb-20">
        <Container>
          <SectionHeading
            center
            eyebrow="Zo werkt het"
            title="In drie stappen geregeld."
            intro="Zo weinig hoeft u te doen."
          />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {stappen.map((s, i) => (
              <div key={s.titel} className="rounded-2xl border border-line bg-white p-8">
                <div className="mb-5 grid h-[46px] w-[46px] place-items-center rounded-[13px] bg-green-soft font-display text-[1.4rem] font-semibold text-green-deep">
                  {i + 1}
                </div>
                <h3 className="text-[1.25rem]">{s.titel}</h3>
                <p className="mt-2.5 text-[15.5px] text-ink-soft">{s.body}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <ButtonLink href="/hoe-het-werkt" variant="ghost">
              Bekijk de volledige aanpak
              <ArrowRight className="h-[18px] w-[18px]" />
            </ButtonLink>
          </div>
        </Container>
      </section>

      {/* DE WAARDESTAPEL — alles wat erin zit */}
      <section className="pb-20" id="wat-u-krijgt">
        <Container>
          <SectionHeading
            center
            eyebrow="Wat u krijgt"
            title={programma.naam}
            intro={`Alles wat nodig is om te slagen, in één programma. ${programma.subregel}`}
          />
          <div className="mt-12">
            <Waardestapel />
          </div>
        </Container>
      </section>

      {/* DE GARANTIE */}
      <section className="pb-20">
        <Container>
          <GarantieBlok />
        </Container>
      </section>

      {/* REVIEWS */}
      <section id="reviews" className="scroll-mt-24 pb-20">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading eyebrow="Wat ouders zeggen" title="Echte ervaringen, echte cijfers." />
            <div className="flex items-center gap-2.5 pb-1">
              <Stars />
              <span className="text-sm text-muted">
                <b className="text-ink">{rating.score}/5</b> · {rating.count}+ reviews
              </span>
            </div>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {topReviews.map((r, i) => (
              <ReviewCard key={i} review={r} />
            ))}
          </div>
          <div className="mt-8 flex flex-col items-center gap-5">
            <ButtonLink href="/reviews" variant="ghost">
              Lees alle reviews
              <ArrowRight className="h-[18px] w-[18px]" />
            </ButtonLink>
            <ReviewPlatforms className="text-center" />
          </div>
        </Container>
      </section>

      {/* BEZWAREN */}
      <section className="pb-20">
        <Container>
          <SectionHeading center eyebrow="Veelgestelde vragen" title="Goed om te weten." />
          <div className="mx-auto mt-10 max-w-3xl divide-y divide-line overflow-hidden rounded-2xl border border-line bg-white">
            {faqs.slice(0, 5).map((f) => (
              <details key={f.q} className="group">
                <summary className="flex cursor-pointer items-center justify-between gap-4 px-6 py-5 text-[1.05rem] font-medium text-ink marker:content-none">
                  {f.q}
                  <span className="grid h-7 w-7 flex-none place-items-center rounded-full border border-line text-green transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <div className="space-y-3 px-6 pb-5 text-[15.5px] text-ink-soft">
                  {(Array.isArray(f.a) ? f.a : [f.a]).map((alinea, i) => (
                    <p key={i}>{alinea}</p>
                  ))}
                </div>
              </details>
            ))}
          </div>
          <div className="mt-8 text-center">
            <ButtonLink href="/faq" variant="ghost">
              Alle veelgestelde vragen
              <ArrowRight className="h-[18px] w-[18px]" />
            </ButtonLink>
          </div>
        </Container>
      </section>

      {/* PREMIUM TEASER */}
      <section className="pb-20">
        <Container>
          <div className="flex flex-wrap items-center justify-between gap-6 rounded-[24px] border border-line bg-white p-8">
            <div className="flex items-start gap-4">
              <span className="grid h-12 w-12 flex-none place-items-center rounded-xl bg-green-soft">
                <Target className="h-6 w-6 text-green-deep" />
              </span>
              <div>
                <h3 className="font-display text-[1.25rem] font-semibold text-ink">
                  Geen 5,5 nodig, maar een 7 of 8?
                </h3>
                <p className="mt-1 max-w-xl text-[15px] text-ink-soft">
                  Voor leerlingen met een hoger doel — bijvoorbeeld een numerus fixus-studie — is er een
                  volledig individuele variant — nog {plekken.premiumBeschikbaar} van de{" "}
                  {plekken.premiumTotaal} plekken beschikbaar.
                </p>
              </div>
            </div>
            <Link
              href="/premium"
              className="inline-flex items-center gap-1.5 whitespace-nowrap font-semibold text-green-deep hover:underline"
            >
              Bekijk Premium 1-op-1
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </Container>
      </section>

      {/* OVERIGE PROGRAMMA'S — bescheiden, onderaan */}
      <section className="pb-20">
        <Container>
          <div className="rounded-[24px] border border-line bg-sand/60 p-8">
            <div className="flex flex-wrap items-baseline justify-between gap-3">
              <div>
                <p className="text-[13px] font-semibold uppercase tracking-[0.12em] text-muted">
                  Ook mogelijk
                </p>
                <p className="mt-1.5 max-w-2xl text-[15px] text-ink-soft">
                  Zit uw kind nog niet in het examenjaar? Dan hebben we kortere programma&apos;s op
                  dezelfde methode — van een toetsweek-sprint tot een opfrisprogramma in de zomer.
                </p>
              </div>
              <Link
                href="/programmas"
                className="inline-flex items-center gap-1.5 whitespace-nowrap text-sm font-semibold text-green-deep hover:underline"
              >
                Bekijk alle programma&apos;s
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <ul className="mt-5 flex flex-wrap gap-2.5">
              {overigeProgrammas.map((p) => (
                <li
                  key={p.slug}
                  className="rounded-full border border-line bg-white px-4 py-2 text-[14px] text-ink-soft"
                >
                  {p.naam} <span className="text-muted">· {euro(p.prijs)}</span>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      <ProgrammaCTA />
    </>
  );
}
