import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container, ButtonLink, SectionHeading } from "@/components/ui";
import { PageHeader } from "@/components/page-header";
import { ProgrammaCTA, SchaarstePill } from "@/components/programma-secties";
import { ArrowRight } from "@/components/icons";
import { JsonLd, kruimelpadData, aanbieder } from "@/components/gestructureerde-data";
import { programma, prijzen } from "@/config/programma";
import { wiskundeOnvoldoende, vanDe100 } from "@/config/examencijfers";
import { vakken, vindVak, vakNaam } from "@/content/vakken";
import { paginaMeta } from "@/lib/seo";
import { site } from "@/lib/site";

/*
 * Eén pagina per vak en niveau, bijvoorbeeld /examentraining/wiskunde-b-vwo.
 * De inhoud staat in src/content/vakken.ts. Het aanbod is overal hetzelfde
 * (Examenklaar); wat per pagina verschilt is de examenstof en waar leerlingen
 * bij dat vak punten verliezen.
 */

type Props = { params: Promise<{ vak: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return vakken.map((v) => ({ vak: v.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const v = vindVak((await params).vak);
  if (!v) return {};
  return paginaMeta({
    titel: `Examentraining ${v.vak} ${v.niveau}`,
    omschrijving: v.omschrijving,
    pad: `/examentraining/${v.slug}`,
  });
}

const linkStijl = "font-semibold text-green-deep underline underline-offset-4 hover:text-green";

export default async function VakPagina({ params }: Props) {
  const v = vindVak((await params).vak);
  if (!v) notFound();

  const naam = vakNaam(v);
  const pad = `/examentraining/${v.slug}`;
  const landelijk = vanDe100(v.niveau === "HAVO" ? wiskundeOnvoldoende.havo : wiskundeOnvoldoende.vwo);
  const anderen = vakken.filter((x) => x.slug !== v.slug);

  const data = [
    kruimelpadData([
      { naam: "Home", pad: "/" },
      { naam: "Examentraining wiskunde", pad: "/slagingsprogramma" },
      { naam, pad },
    ]),
    {
      "@context": "https://schema.org",
      "@type": "Course",
      name: `Examentraining ${naam}`,
      description: v.omschrijving,
      url: `${site.domain}${pad}`,
      inLanguage: "nl",
      educationalLevel: v.klas,
      provider: aanbieder,
      hasCourseInstance: {
        "@type": "CourseInstance",
        courseMode: "Online",
        courseWorkload: `PT${programma.lesurenTotaal}H`,
      },
      offers: {
        "@type": "Offer",
        price: prijzen.programma,
        priceCurrency: "EUR",
        category: "Paid",
        url: `${site.domain}/prijs-en-garantie`,
      },
    },
  ];

  return (
    <>
      <JsonLd data={data} />

      <PageHeader
        kruimels={[
          { label: "Home", href: "/" },
          { label: "Examentraining wiskunde", href: "/slagingsprogramma" },
          { label: naam },
        ]}
        title={`Examentraining ${v.vak} voor ${v.niveau}`}
        intro={v.intro}
      >
        <ButtonLink href="/slagingscheck">
          Vraag een gratis Slagingscheck aan
          <ArrowRight className="h-[18px] w-[18px]" />
        </ButtonLink>
        <SchaarstePill />
      </PageHeader>

      {/* De examenstof, uit de officiële syllabus */}
      <section className="py-20">
        <Container>
          <SectionHeading
            title="Wat er op het centraal examen komt"
            intro={`Het centraal examen ${v.vak} ${v.niveau} is in ${programma.examenMaand} ${programma.examenjaar}. Dit zijn de onderwerpen.`}
          />
          <ul className="mt-10 grid max-w-4xl gap-x-10 gap-y-7 sm:grid-cols-2">
            {v.examenstof.map((s) => (
              <li key={s.kop}>
                <h3 className="font-display text-[1.2rem] font-semibold text-ink">{s.kop}</h3>
                <p className="mt-1 text-[15.5px] text-ink-soft">{s.uitleg}</p>
              </li>
            ))}
          </ul>
          {v.alleenSchoolexamen && (
            <p className="mt-8 max-w-3xl text-[15.5px] text-ink-soft">{v.alleenSchoolexamen}</p>
          )}
          <p className="mt-6 max-w-3xl text-sm text-muted">
            Bron:{" "}
            <a href={v.bron.url} className="underline underline-offset-4 hover:text-green" rel="noopener">
              {v.bron.naam}
            </a>
            , College voor Toetsen en Examens.
          </p>
        </Container>
      </section>

      {/* Waar het bij dit vak misgaat */}
      <section className="pb-20">
        <Container>
          <SectionHeading title="Waar leerlingen punten verliezen" />
          <ol className="mt-10 grid max-w-5xl gap-8 md:grid-cols-3">
            {v.puntenVerlies.map((p, i) => (
              <li key={p.kop} className="border-t border-line pt-5">
                <p className="font-display text-[15px] font-semibold text-green-deep">{i + 1}</p>
                <h3 className="mt-1 font-display text-[1.2rem] font-semibold text-ink">{p.kop}</h3>
                <p className="mt-2 text-[15.5px] text-ink-soft">{p.uitleg}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* Hoe Examenklaar daarop inspeelt */}
      <section className="pb-20">
        <Container>
          <div className="max-w-3xl">
            <h2 className="text-[clamp(1.6rem,3vw,2.1rem)] text-ink">Hoe wij uw kind voorbereiden</h2>
            <p className="mt-4 text-[1.05rem] leading-relaxed text-ink-soft">{v.aanpak}</p>
            <p className="mt-4 text-[1.05rem] leading-relaxed text-ink-soft">
              Uw kind volgt {programma.duurWeken} weken les in een groepje van maximaal{" "}
              {programma.maxPerGroep} leerlingen, met een vaste docent. Wij plannen, sporen aan en
              sturen u elke week een kort rapport.{" "}
              <Link href="/slagingsprogramma" className={linkStijl}>
                Zo werkt het programma
              </Link>
              , en{" "}
              <Link href="/prijs-en-garantie" className={linkStijl}>
                dit zijn de prijs en de garantie
              </Link>
              .
            </p>
          </div>
        </Container>
      </section>

      {/* Landelijk cijfer: herkenning, met de uitweg erbij */}
      <section className="pb-20">
        <Container>
          <div className="max-w-3xl rounded-[24px] bg-sand px-8 py-9">
            <p className="font-display text-[clamp(1.3rem,2.4vw,1.6rem)] leading-snug text-ink">
              In {wiskundeOnvoldoende.jaar} haalden {landelijk.tekst} van de 100 {v.niveau}-leerlingen een
              onvoldoende voor het centraal examen wiskunde.
            </p>
            <p className="mt-3 text-[15.5px] text-ink-soft">
              Dat cijfer geldt voor alle wiskundevakken samen. Waar uw kind staat, weet u na de gratis
              Slagingscheck.
            </p>
            <p className="mt-3 text-sm text-muted">Bron: DUO, Examenmonitor VO {wiskundeOnvoldoende.jaar}.</p>
          </div>
        </Container>
      </section>

      {/* De andere vakken: handig voor ouders, en voor Google */}
      <section className="pb-4">
        <Container>
          <h2 className="text-[clamp(1.4rem,2.6vw,1.8rem)] text-ink">Examentraining voor de andere wiskundevakken</h2>
          <ul className="mt-5 flex flex-wrap gap-3">
            {anderen.map((x) => (
              <li key={x.slug}>
                <Link
                  href={`/examentraining/${x.slug}`}
                  className="inline-flex rounded-full border border-line bg-white px-5 py-2.5 text-[15px] font-medium text-ink transition-colors hover:border-ink"
                >
                  {vakNaam(x)}
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <ProgrammaCTA />
    </>
  );
}
