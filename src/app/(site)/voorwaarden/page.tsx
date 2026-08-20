import type { Metadata } from "next";
import { Container } from "@/components/ui";
import { PageHeader } from "@/components/page-header";
import { site } from "@/lib/site";
import { programma, prijzen, garantie, euro } from "@/config/programma";

export const metadata: Metadata = {
  title: "Algemene voorwaarden",
  description:
    "De algemene voorwaarden van Bijlesdirect, inclusief de volledige voorwaarden van de slagingsgarantie.",
  alternates: { canonical: "/voorwaarden" },
};

export default function VoorwaardenPage() {
  return (
    <>
      <PageHeader eyebrow="Juridisch" title="Algemene voorwaarden" intro="Laatst bijgewerkt: juli 2026" />
      <Container className="py-16">
        <div className="prose prose-lg mx-auto max-w-3xl prose-headings:font-display">
          <h2>1. Definities</h2>
          <p>
            In deze voorwaarden wordt verstaan onder &ldquo;Bijlesdirect&rdquo; de onderneming met
            KvK-nummer {site.kvk}, onder &ldquo;opdrachtgever&rdquo; de ouder of verzorger die een
            overeenkomst aangaat, en onder &ldquo;het programma&rdquo; {programma.naam}.
          </p>

          <h2>2. Het programma</h2>
          <p>
            Het programma bestaat uit {programma.duurWeken} weken begeleiding met in totaal{" "}
            {programma.lesurenTotaal} lesuren ({programma.lessenPerWeek} × {programma.urenPerLes} uur per
            week) in groepen van maximaal {programma.maxPerGroep} leerlingen, aangevuld met de onderdelen
            zoals beschreven op de pagina Prijs &amp; garantie. Alle lessen worden online gegeven.
          </p>

          <h2>3. Aanmelding en Slagingscheck</h2>
          <p>
            Aanmelding verloopt via de gratis en vrijblijvende Slagingscheck. Een overeenkomst komt tot
            stand nadat de opdrachtgever akkoord gaat met het voorstel en de diagnostische toets is
            afgenomen. Bijlesdirect behoudt zich het recht voor een leerling niet toe te laten wanneer het
            programma naar oordeel van Bijlesdirect niet passend is.
          </p>

          <h2>4. Tarieven en betaling</h2>
          <p>
            De deelnamekosten bedragen {euro(prijzen.programma)}, te voldoen in één termijn of in{" "}
            {prijzen.termijnen.aantal} termijnen van {euro(prijzen.termijnen.bedrag)} zonder extra kosten.
            De variant Premium 1-op-1 bedraagt {euro(prijzen.premium)}. Betaling vindt plaats na de
            Slagingscheck en vóór aanvang van het programma, tenzij schriftelijk anders overeengekomen.
          </p>

          <h2>5. Slagingsgarantie</h2>
          <p>De garantie op het groepsprogramma is getrapt opgebouwd:</p>
          <ol>
            {garantie.stappen.map((s) => (
              <li key={s.stap}>
                <strong>{s.titel}</strong> {s.body}
              </li>
            ))}
          </ol>
          <p>De garantie geldt uitsluitend wanneer aan alle onderstaande voorwaarden is voldaan:</p>
          <ul>
            {garantie.voorwaarden.map((v) => (
              <li key={v}>{v}</li>
            ))}
          </ul>
          <p>
            {garantie.toelichting} De garantie heeft betrekking op het behalen van een voldoende voor het
            eindexamen wiskunde. Voor de variant Premium 1-op-1 geldt geen cijfergarantie; daar wordt het
            leerdoel individueel vastgesteld na de diagnostische toets.
          </p>
          <p>
            Terugbetaling vindt plaats binnen 30 dagen na bekendmaking van de herkansingsuitslag, na
            overlegging van het officiële resultaat.
          </p>

          <h2>6. Annulering en afwezigheid</h2>
          <p>
            Gemiste lessen kunnen worden teruggekeken via de opnames. Omdat het programma als geheel wordt
            aangeboden, leiden individueel gemiste lessen niet tot restitutie. Bij langdurige ziekte of
            bijzondere omstandigheden zoeken we in overleg naar een passende oplossing.
          </p>

          <h2>7. Aansprakelijkheid</h2>
          <p>
            Bijlesdirect spant zich maximaal in om het afgesproken resultaat te behalen. Buiten de hierboven
            omschreven slagingsgarantie is de aansprakelijkheid beperkt tot het bedrag van de betreffende
            dienst.
          </p>

          <h2>8. Contact</h2>
          <p>
            Vragen over deze voorwaarden? Neem contact op via{" "}
            <a href={`mailto:${site.email}`}>{site.email}</a> of {site.phoneDisplay}.
          </p>

          <p className="text-sm">
            <em>
              Dit is een algemene basisversie. Laat de definitieve voorwaarden — en in het bijzonder de
              garantiebepaling — vóór livegang juridisch controleren.
            </em>
          </p>
        </div>
      </Container>
    </>
  );
}
