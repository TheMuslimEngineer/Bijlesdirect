import type { Metadata } from "next";
import { paginaMeta } from "@/lib/seo";
import { Container, ButtonLink } from "@/components/ui";
import { PageHeader } from "@/components/page-header";
import { FinalCTA } from "@/components/sections";
import { FaqLijst } from "@/components/programma-secties";
import { ArrowRight } from "@/components/icons";
import { faqs, faqTekst } from "@/lib/site";

export const metadata: Metadata = paginaMeta({
  titel: "Veelgestelde vragen over Examenklaar",
  omschrijving:
    "Antwoord op de meestgestelde vragen over onze examentraining wiskunde: prijs, garantie, groepsgrootte, online les en de gratis Slagingscheck.",
  pad: "/faq",
});

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: faqTekst(f.a) },
  })),
};

export default function FaqPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <PageHeader
        title="Veelgestelde vragen"
        intro="Staat uw vraag er niet bij? Bel of app ons gerust."
      >
        <ButtonLink href="/contact" variant="ghost">
          Stel uw vraag
          <ArrowRight className="h-[18px] w-[18px]" />
        </ButtonLink>
      </PageHeader>

      <section className="py-20">
        <Container>
          <FaqLijst vragen={faqs} />
        </Container>
      </section>

      <FinalCTA />
    </>
  );
}
