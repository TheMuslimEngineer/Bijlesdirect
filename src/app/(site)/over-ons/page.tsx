import type { Metadata } from "next";
import { paginaMeta } from "@/lib/seo";
import Image from "next/image";
import { Container, ButtonLink, SectionHeading } from "@/components/ui";
import { PageHeader } from "@/components/page-header";
import { ProgrammaCTA } from "@/components/programma-secties";
import { ArrowRight } from "@/components/icons";
import { site, gezinnen } from "@/lib/site";
import adamPortret from "../../../../public/images/adam-portret.webp";
import abdulrahmanPortret from "../../../../public/images/abdulrahman-portret.webp";

export const metadata: Metadata = paginaMeta({
  titel: "Over ons: het team achter ExamenDocent",
  omschrijving:
    "ExamenDocent is een klein, persoonlijk team dat zich volledig richt op examentraining wiskunde voor HAVO en VWO. Lees waarom we die keuze maakten.",
  pad: "/over-ons",
});

/**
 * Het team. Bewust naast elkaar en even groot: ExamenDocent is een team, niet
 * één persoon. Nieuwe docent erbij? Voeg hier een item toe.
 */
const team = [
  {
    naam: "Adam",
    rol: "Oprichter",
    foto: adamPortret,
    // Gezicht zit hoog in de foto — iets boven het midden uitsnijden.
    fotoPositie: "object-[center_30%]",
    bio: "Hij sloeg een klas over en behaalde vroeg zijn diploma in Aeronautical Engineering, waarmee hij een sterke basis in bètavakken legde. Met meer dan 8 jaar ervaring in bijles is hij gepassioneerd om zijn kennis en vaardigheden over te dragen.",
  },
  {
    naam: "AbdulRahman",
    rol: "Hoofddocent wiskunde",
    foto: abdulrahmanPortret,
    fotoPositie: "object-center",
    bio: "Met een propedeuse in de lerarenopleiding wiskunde en een achtergrond in wiskunde aan de universiteit kent hij het vak van twee kanten: de stof zelf, en hoe je die uitlegt. Hij geeft al 7 jaar les.",
  },
];

export default function OverOnsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Over ExamenDocent"
        title="Een klein team dat één ding doet"
        intro="ExamenDocent doet één ding: examenkandidaten HAVO en VWO door het eindexamen wiskunde helpen. Geen andere vakken, geen losse bijlesuren. Eén programma, en daar gaat al onze aandacht naartoe."
      >
        <ButtonLink href="/slagingscheck">
          Vraag een gratis Slagingscheck aan
          <ArrowRight className="h-[18px] w-[18px]" />
        </ButtonLink>
      </PageHeader>

      <section className="py-20">
        <Container>
          <div className="max-w-3xl">
            <div>
              <SectionHeading title="Waarom wij kozen voor wiskunde" />
              <div className="mt-6 space-y-4 text-lg text-ink-soft">
                <p>
                  Sinds {site.opgericht}, het jaar dat ExamenDocent officieel begon, hielpen we{" "}
                  {gezinnen} gezinnen. Dat begon breed: bijna elk vak, elk niveau. Maar in die{" "}
                  {gezinnen} trajecten zagen we telkens hetzelfde patroon terugkomen. Het grootste
                  verschil maakten we bij één specifieke groep: examenkandidaten die vastliepen op
                  wiskunde.
                </p>
                <p>
                  Wiskunde is het grootste examenvak van Nederland, en tegelijk het vak waar het
                  docententekort het hardst voelbaar is. Duizenden leerlingen per jaar gaan het examen in
                  met een onvoldoende. Het probleem zit meestal in een basis die eerder is blijven
                  liggen.
                </p>
                <p>
                  Daarom hebben we gekozen voor één programma dat we tot in detail beheersen, met een
                  garantie. Die durven we te geven omdat we bij {gezinnen} gezinnen hebben gezien wat
                  werkt. En bij wie het niet werkt: die zeggen we af, ook als dat ons een klant kost.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Het team — naast elkaar, even groot. */}
      <section className="pb-20">
        <Container>
          <SectionHeading
            title="Het team"
            intro="Een klein team, en dat is een keuze. U weet altijd met wie u te maken heeft."
          />
          <div className="mt-12 grid max-w-4xl gap-6 md:grid-cols-2">
            {team.map((lid) => (
              <article
                key={lid.naam}
                className="overflow-hidden rounded-[24px] border border-line bg-white"
              >
                <Image
                  src={lid.foto}
                  alt={`${lid.naam}, ${lid.rol.toLowerCase()} bij ExamenDocent`}
                  placeholder="blur"
                  sizes="(max-width: 768px) 100vw, 440px"
                  className={`aspect-[5/6] w-full object-cover ${lid.fotoPositie}`}
                />
                <div className="p-7 sm:p-8">
                  <h3 className="text-[1.4rem] text-ink">{lid.naam}</h3>
                  <p className="mt-1 text-[14px] font-medium text-green-deep">{lid.rol}</p>
                  <p className="mt-4 text-[15.5px] leading-relaxed text-ink-soft">{lid.bio}</p>
                </div>
              </article>
            ))}
          </div>
          <p className="mt-8 max-w-2xl text-[15px] text-muted">
            Het Slagingscheck-gesprek voert Adam zelf. Daarna koppelen we uw kind aan de docent die
            past. Direct iets vragen?{" "}
            <a href={site.phoneHref} className="font-semibold text-ink hover:text-green">
              {site.phoneDisplay}
            </a>{" "}
            ·{" "}
            <a href={`mailto:${site.email}`} className="font-semibold text-ink hover:text-green">
              {site.email}
            </a>
          </p>
        </Container>
      </section>

      <ProgrammaCTA />
    </>
  );
}
