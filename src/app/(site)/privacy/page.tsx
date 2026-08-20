import type { Metadata } from "next";
import { Container } from "@/components/ui";
import { PageHeader } from "@/components/page-header";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacyverklaring",
  description: "Hoe Bijlesdirect omgaat met uw persoonsgegevens, conform de AVG.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <>
      <PageHeader eyebrow="Juridisch" title="Privacyverklaring" intro="Laatst bijgewerkt: juni 2026" />
      <Container className="py-16">
        <div className="prose prose-lg mx-auto max-w-3xl prose-headings:font-display">
          <p>
            Bijlesdirect (KvK {site.kvk}) hecht veel waarde aan de bescherming van uw persoonsgegevens. In
            deze privacyverklaring leggen we uit welke gegevens we verzamelen, waarom en hoe we daarmee
            omgaan, conform de Algemene verordening gegevensbescherming (AVG).
          </p>

          <h2>Welke gegevens we verzamelen</h2>
          <p>Wanneer u de Slagingscheck aanvraagt of een bericht stuurt, verwerken we de gegevens die u zelf invult, zoals:</p>
          <ul>
            <li>naam van de ouder/verzorger;</li>
            <li>e-mailadres en telefoonnummer;</li>
            <li>het gekozen niveau en vak;</li>
            <li>eventuele aanvullende informatie in uw bericht.</li>
          </ul>

          <h2>Waarvoor we uw gegevens gebruiken</h2>
          <p>We gebruiken uw gegevens uitsluitend om:</p>
          <ul>
            <li>contact met u op te nemen naar aanleiding van uw aanvraag;</li>
            <li>een passend voorstel voor begeleiding te doen;</li>
            <li>onze dienstverlening uit te voeren en te verbeteren.</li>
          </ul>

          <h2>Bewaartermijn</h2>
          <p>
            We bewaren uw gegevens niet langer dan noodzakelijk voor de hierboven genoemde doelen, of zolang
            als wettelijk verplicht is.
          </p>

          <h2>Delen met derden</h2>
          <p>
            We verkopen uw gegevens nooit. We delen ze alleen met partijen die nodig zijn voor onze
            dienstverlening (zoals onze docenten en e-mailprovider), en uitsluitend voor de hierboven
            beschreven doelen.
          </p>

          <h2>Uw rechten</h2>
          <p>
            U heeft het recht om uw gegevens in te zien, te corrigeren of te laten verwijderen. Neem hiervoor
            contact op via{" "}
            <a href={`mailto:${site.email}`}>{site.email}</a>.
          </p>

          <h2>Contact</h2>
          <p>
            Vragen over deze privacyverklaring? Mail naar{" "}
            <a href={`mailto:${site.email}`}>{site.email}</a> of bel {site.phoneDisplay}.
          </p>

          <p className="text-sm">
            <em>
              Dit is een algemene basisversie. Laat de definitieve privacyverklaring vóór livegang
              controleren op uw specifieke situatie.
            </em>
          </p>
        </div>
      </Container>
    </>
  );
}
