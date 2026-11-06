import type { Metadata } from "next";
import { paginaMeta } from "@/lib/seo";
import Link from "next/link";
import Image from "next/image";
import { Container, ButtonLink, SectionHeading, Stars } from "@/components/ui";
import { ReviewCard, ReviewPlatforms } from "@/components/sections";
import {
  ProgrammaCTA,
  Bewijsbalk,
  Waardestapel,
  GarantieBlok,
  SchaarstePill,
  FaqLijst,
} from "@/components/programma-secties";
import { VakTypewriter } from "@/components/vak-typewriter";
import { ArrowRight } from "@/components/icons";
import { reviews, rating, site, gezinnen, faqs } from "@/lib/site";
import { programma, plekken } from "@/config/programma";
import adamHeadshot from "../../../public/images/adam-headshot.webp";
import onlineLes from "../../../public/images/online-les.webp";
import stapGesprek from "../../../public/images/stap-gesprek.webp";
import stapPlan from "../../../public/images/stap-plan.webp";
import stapVoortgang from "../../../public/images/stap-voortgang.webp";

/**
 * De homepage is de verkooppagina van Examenklaar, ons enige programma.
 *
 * Alles wat een ouder nodig heeft om te beslissen staat hier: herkenning, wat we
 * overnemen, de waardestapel, de garantie en de grootste bezwaren. De
 * week-voor-week opbouw en de volledige FAQ staan op /slagingsprogramma.
 */
export const metadata: Metadata = paginaMeta({
  titel: "Examentraining wiskunde HAVO en VWO | ExamenDocent",
  omschrijving:
    `Examentraining wiskunde voor HAVO 5 en VWO 6: ${programma.duurWeken} weken in een klein groepje, met een vaste docent en een plan op maat. Met slagingsgarantie.`,
  pad: "/",
  merkInTitel: false,
});

/* Wie we zijn, voor Google. Geen sterrenbeoordeling: zie gestructureerde-data.tsx. */
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      name: site.name,
      url: site.domain,
      inLanguage: "nl",
    },
    {
      "@type": "EducationalOrganization",
      name: site.name,
      url: site.domain,
      logo: `${site.domain}/brand-icon.png`,
      description: site.description,
      telephone: site.phone,
      email: site.email,
      areaServed: { "@type": "Country", name: "Nederland" },
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "customer service",
        telephone: site.phone,
        email: site.email,
        availableLanguage: "nl",
      },
      parentOrganization: { "@type": "Organization", name: "Bijlesdirect", url: site.bijlesdirectUrl },
    },
  ],
};

/* De herkenningsregels: de situatie thuis bij een kind in het examenjaar. */
const pijnpunten = [
  {
    text: "Elke week dezelfde discussie over huiswerk, en u bent degene die moet pushen",
  },
  {
    text: "U wilt helpen, maar deze stof kunt u zelf niet meer uitleggen",
  },
  {
    text: "Er is al bijles geweest. Het hielp een paar weken en zakte daarna terug",
  },
  {
    text: `Er staat een onvoldoende voor wiskunde, en het examen in ${programma.examenMaand} komt elke week dichterbij`,
  },
];

/* Het onderscheid in drie getallen. Komt uit de config, zodat het klopt. */
const eenDing = [
  { getal: "1", kop: "vak", uitleg: "Wiskunde A, B en C. Geen andere vakken." },
  {
    getal: "1",
    kop: "programma",
    uitleg: `${programma.duurWeken} weken en ${programma.lesurenTotaal} lesuren, vlak vóór het examen.`,
  },
  {
    getal: String(plekken.totaal),
    kop: "plekken",
    uitleg: `In groepjes van maximaal ${programma.maxPerGroep}. Vol is vol.`,
  },
];

const overnemen = [
  {
    titel: "Wij plannen",
    body: "Geen agenda's puzzelen, geen docent zoeken. Wij regelen het rooster en de docent.",
  },
  {
    titel: "Wij motiveren",
    body: "Aansporen is niet langer uw taak. Blijft uw kind hangen, dan trekken wij eraan.",
  },
  {
    titel: "Wij bewaken het huiswerk",
    body: "Wij zien of het gedaan is en sturen bij. U hoeft er niet meer naar te vragen.",
  },
  {
    titel: "U leest alleen het weekrapport",
    body: "Elke week één kort bericht: wat is gedaan, hoe gaat het, wat is de trend.",
  },
];

const stappen = [
  {
    titel: "Gratis Slagingscheck (30 minuten)",
    body: "We brengen in kaart waar uw kind staat en geven een eerlijk antwoord: is slagen haalbaar? Zo niet, dan zeggen we dat ook.",
    icoon: stapGesprek,
  },
  {
    titel: "Binnen 48 uur het plan",
    body: `Diagnostische toets, een persoonlijke gatenkaart en een examenplan tot ${programma.examenMaand}. U hoeft niets uit te zoeken.`,
    icoon: stapPlan,
  },
  {
    titel: `${programma.duurWeken} weken begeleiding`,
    body: "Twee keer per week les, wekelijkse voortgang, tot aan het examen. Inclusief coach en ouderrapport.",
    icoon: stapVoortgang,
  },
];

/**
 * De drie reviews op de homepage: allemaal over wiskunde, want dat is wat we
 * verkopen. Op titel gekozen, omdat er twee reviewers zijn die Samira heten. Deze
 * titels moeten exact overeenkomen met `reviews` in site.ts.
 */
const homepageReviews = ["Een 8,2 voor wiskunde!", "Erg tevreden", "Bijles bij Bijlesdirect"];

export default function HomePage() {
  const topReviews = homepageReviews
    .map((titel) => reviews.find((r) => r.title === titel))
    .filter((r): r is (typeof reviews)[number] => Boolean(r));

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* HERO — data en aantallen komen uit config/programma.ts. Schrijf hier dus
          nooit een maand voluit. */}
      <section className="border-b border-line bg-sand">
        <Container className="py-16 sm:py-20">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-[clamp(2.1rem,5vw,3.75rem)] text-ink">
              Uw kind slaagt voor het eindexamen{" "}
              <span className="whitespace-nowrap">
                <VakTypewriter />.
              </span>{" "}
              <em className="kop-wonk font-display italic text-green">Gegarandeerd</em>, of u krijgt
              uw geld terug.
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-[clamp(1.05rem,1.7vw,1.25rem)] text-ink-soft">
              {programma.duurWeken} weken examentraining in een klein groepje op het niveau van uw
              kind, met een vaste docent en een plan op maat. En zonder dat u nog hoeft te pushen of
              wakker te liggen: het plannen, aansporen en controleren nemen wij over.
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

            <div className="mt-6 flex flex-wrap items-center justify-center gap-x-3 gap-y-2">
              <SchaarstePill />
              <span className="text-[14.5px] text-ink-soft">
                Start {programma.start} · inschrijving sluit {programma.inschrijvingSluit}
              </span>
            </div>

            <a
              href="#reviews"
              className="mt-6 inline-flex flex-wrap items-center justify-center gap-x-3 gap-y-2 rounded-full px-2 py-1 transition-opacity hover:opacity-75"
            >
              <Stars />
              <span className="text-[15px] text-ink-soft underline decoration-line underline-offset-4">
                <b className="text-ink">{rating.score} gemiddeld</b> · {rating.count}+ reviews ·{" "}
                {gezinnen} gezinnen geholpen sinds {site.opgericht}
              </span>
            </a>
          </div>
        </Container>
      </section>

      <Bewijsbalk />

      {/* HERKENBARE SITUATIE */}
      <section className="py-20">
        <Container>
          <div className="rounded-[28px] bg-sand px-7 py-14 sm:px-11">
            <div className="mx-auto max-w-3xl">
              <h2 className="text-[clamp(1.75rem,3.4vw,2.5rem)] text-ink">Herkent u dit?</h2>
              <ul className="mt-10 grid gap-4 sm:grid-cols-2">
                {pijnpunten.map((p) => (
                  <li key={p.text} className="rounded-2xl border border-line bg-white p-5 text-[15.5px] text-ink">
                    {p.text}
                  </li>
                ))}
              </ul>
              {/* Laag 2 van de pijnstapel: wat een ouder wel voelt maar niet
                  hardop zegt. Dit verzinnen we niet — het is de reden dat ze
                  hier is. Direct gevolgd door de uitweg; nooit los. */}
              <div className="mt-10 max-w-2xl border-t border-line pt-9">
                <p className="text-[1.05rem] leading-relaxed text-ink-soft">
                  En dan is er nog wat u waarschijnlijk niet hardop zegt. Dat u soms boos wordt op
                  uw eigen kind, en zich daarna schuldig voelt over die boosheid. Dat u zich afvraagt
                  of u het eerder had moeten zien. Dat u om elf uur &apos;s avonds nog ligt te
                  rekenen hoeveel punten er nog bij moeten, terwijl uw kind allang slaapt.
                </p>
                <p className="mt-4 text-[1.05rem] leading-relaxed text-ink-soft">
                  Zo gaat het maand na maand door, tot het examen die vraag voor u beantwoordt.
                </p>
                <p className="mt-7 font-display text-[clamp(1.3rem,2.4vw,1.75rem)] text-ink">
                  Tenzij er nu iemand meekijkt.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Een echt beeld tussen het probleem en de oplossing — de homepage was
          tot onderaan toe tekst. */}
      <section className="pb-20">
        <Container>
          <figure className="relative overflow-hidden rounded-[28px] border border-line">
            <Image
              src={onlineLes}
              alt="Schermbeeld van een online les: de docent werkt een som uit op het digitale bord, naast een opgave uit het lesboek"
              placeholder="blur"
              sizes="(max-width: 1200px) 100vw, 1152px"
              className="w-full"
            />
            <figcaption className="absolute bottom-4 left-4 rounded-full bg-ink/80 px-4 py-1.5 text-[13px] font-medium text-white backdrop-blur">
              Een les in de praktijk: online, zonder reistijd
            </figcaption>
          </figure>
        </Container>
      </section>

      {/* EEN DING — hier zit het onderscheid. Geen menu om uit te kiezen: één vak,
          één programma, een vast aantal plekken. */}
      <section className="pb-20">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:gap-16">
            <div>
              <h2 className="text-[clamp(1.75rem,3.4vw,2.5rem)] text-ink">
                Wij doen maar één ding: uw kind door het eindexamen wiskunde helpen
              </h2>
              <div className="mt-6 space-y-4 text-[1.05rem] leading-relaxed text-ink-soft">
                <p>
                  De meeste bureaus bieden alles: elk vak, elk niveau, elk moment van het jaar. Dan
                  mag u zelf uitzoeken wat uw kind nodig heeft, en bij wie.
                </p>
                <p>
                  Bij ons valt er niets uit te zoeken. Er is één programma, één prijs en één garantie.
                  De enige vraag is of het bij uw kind past, en die beantwoorden we samen met u.
                </p>
                <p className="text-ink">
                  Al onze aandacht gaat naar dat ene examen in {programma.examenMaand}. Daarom durven
                  we er ons eigen geld op in te zetten.
                </p>
              </div>
            </div>
            <dl className="divide-y divide-line rounded-[28px] bg-sand px-7 py-3 sm:px-9">
              {eenDing.map((d) => (
                <div key={d.kop} className="flex items-center gap-6 py-6">
                  <dt className="flex w-[108px] flex-none flex-col">
                    <span className="font-display text-[2.75rem] font-semibold leading-none text-green-deep">
                      {d.getal}
                    </span>
                    <span className="mt-1.5 text-[14px] font-medium text-ink">{d.kop}</span>
                  </dt>
                  <dd className="text-[15px] leading-snug text-ink-soft">{d.uitleg}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Container>
      </section>

      {/* WIJ NEMEN HET OVER */}
      <section className="pb-20">
        <Container>
          <SectionHeading
            title="Wij nemen het zware deel over"
            intro="Wat ouders het meest uitput, is het geregel: een docent zoeken, roosters afstemmen en elke week weer aansporen. Dat doen wij."
          />
          {/* Bewust geen kaarten: dit zijn vier korte regels. Ze als volwaardige
              kaarten zetten geeft ze meer gewicht dan ze hebben — en maakt van de
              homepage één lange rij identieke vakjes. */}
          <ul className="mt-10 grid max-w-4xl gap-x-10 gap-y-6 sm:grid-cols-2">
            {overnemen.map((o) => (
              <li key={o.titel}>
                <div>
                  <h3 className="font-display text-[1.15rem] font-semibold text-ink">{o.titel}</h3>
                  <p className="mt-1 text-[15px] text-ink-soft">{o.body}</p>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-12 rounded-[24px] bg-green px-8 py-10 text-center text-white">
            <p className="font-display text-[clamp(1.3rem,2.6vw,1.9rem)]">
              Een hoger cijfer, en weer rust in huis.
            </p>
          </div>
        </Container>
      </section>

      {/* ZO WERKT HET */}
      <section className="pb-20">
        <Container>
          <SectionHeading title="Hoe het werkt" />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {stappen.map((s, i) => (
              <div key={s.titel} className="rounded-2xl border border-line bg-white p-8">
                <div className="mx-auto mb-5 flex w-fit flex-col items-center gap-2.5">
                  <span className="grid h-7 w-7 place-items-center rounded-full bg-green-soft font-display text-[13px] font-semibold text-green-deep">
                    {i + 1}
                  </span>
                  <Image src={s.icoon} alt="" aria-hidden className="h-16 w-16" />
                </div>
                <h3 className="text-[1.25rem]">{s.titel}</h3>
                <p className="mt-2.5 text-[15.5px] text-ink-soft">{s.body}</p>
              </div>
            ))}
          </div>
          <div className="mt-8">
            <ButtonLink href="/slagingsprogramma" variant="ghost">
              Bekijk het programma week voor week
              <ArrowRight className="h-[18px] w-[18px]" />
            </ButtonLink>
          </div>
        </Container>
      </section>

      {/* WAT ER IN ZIT — de methode is de waardestapel. */}
      <section className="pb-20" id="wat-u-krijgt">
        <Container>
          <SectionHeading title={`Wat er in ${programma.naam} zit`} intro={programma.subregel} />
          <div className="mt-12">
            <Waardestapel />
          </div>
          <p className="mt-6 text-[15px] text-ink-soft">
            Geen 5,5 nodig, maar een 8? Examenklaar kan ook volledig 1-op-1, met garantie op een 8 of hoger.{" "}
            <Link href="/premium" className="font-semibold text-green-deep hover:underline">
              Bekijk Premium 1-op-1
            </Link>
          </p>
        </Container>
      </section>

      {/* DE GARANTIE */}
      <section className="pb-20">
        <Container>
          <GarantieBlok />
        </Container>
      </section>

      {/* BEWIJS */}
      <section id="reviews" className="scroll-mt-24 pb-20">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading title="Wat ouders zeggen" />
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
          <div className="mt-8 flex flex-col items-start gap-5">
            <ButtonLink href="/reviews" variant="ghost">
              Lees alle reviews
              <ArrowRight className="h-[18px] w-[18px]" />
            </ButtonLink>
            <ReviewPlatforms />
          </div>
        </Container>
      </section>

      {/* BEZWAREN — de vijf die we het vaakst horen; de rest staat op /faq. */}
      <section className="pb-20">
        <Container>
          <SectionHeading title="Veelgestelde vragen" />
          <FaqLijst vragen={faqs.slice(0, 5)} className="mt-10" />
          <div className="mt-8">
            <ButtonLink href="/faq" variant="ghost">
              Bekijk alle vragen
              <ArrowRight className="h-[18px] w-[18px]" />
            </ButtonLink>
          </div>
        </Container>
      </section>

      {/* WIE HET GESPREK VOERT — één naam en één gezicht vlak vóór de CTA,
          zodat "één gesprek" niet anoniem blijft. */}
      <section className="pb-20">
        <Container>
          <div className="mx-auto flex max-w-3xl flex-col items-center gap-7 text-center sm:flex-row sm:items-start sm:gap-8 sm:text-left">
            <Image
              src={adamHeadshot}
              alt="Adam, eigenaar van ExamenDocent"
              placeholder="blur"
              sizes="132px"
              className="h-[132px] w-[132px] flex-none rounded-full object-cover"
            />
            <div>
              <p className="text-[1.15rem] leading-relaxed text-ink">
                &ldquo;Dat gesprek voer ik zelf. Ik kijk met u naar de cijfers en de toetsen, en zeg
                daarna eerlijk of wij het verschil kunnen maken, ook als dat antwoord nee is.&rdquo;
              </p>
              <p className="mt-4 text-[15px] text-muted">
                <b className="font-semibold text-ink">Adam</b> · eigenaar ·{" "}
                <Link href="/over-ons" className="underline decoration-line underline-offset-4 hover:text-ink">
                  meer over ons
                </Link>
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* SLOT */}
      <ProgrammaCTA
        title="Het begint met één gesprek"
        body="Dertig minuten, gratis en vrijblijvend. Daarna weet u waar uw kind staat en of slagen haalbaar is. Ook als het antwoord is dat u ons niet nodig heeft."
        recap={[
          "U vult in twee minuten een paar vragen in over uw kind",
          "Adam belt u binnen één werkdag",
          "U krijgt een eerlijk oordeel: is slagen haalbaar, en is dit programma daarvoor de juiste weg",
          "Geen verkooppraatje en geen verplichting. Past het niet, dan zeggen we dat",
        ]}
        secundair={{ label: "Bekijk het programma", href: "/slagingsprogramma" }}
      />
    </>
  );
}

