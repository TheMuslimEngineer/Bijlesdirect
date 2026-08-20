import type { Metadata } from "next";
import { Container, ButtonLink } from "@/components/ui";
import { PageHeader } from "@/components/page-header";
import { FinalCTA } from "@/components/sections";
import { ArrowRight } from "@/components/icons";
import { faqs, faqTekst } from "@/lib/site";

export const metadata: Metadata = {
  title: "Veelgestelde vragen over het Slagingsprogramma",
  description:
    "Antwoord op de meestgestelde vragen over onze examentraining wiskunde: prijs, garantie, groepsgrootte, online lesgeven en wat de gratis Slagingscheck inhoudt.",
  alternates: { canonical: "/faq" },
};

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
        eyebrow="Veelgestelde vragen"
        title="Alles wat u wilt weten."
        intro="Staat uw vraag er niet bij? Bel of WhatsApp ons gerust — we helpen u graag persoonlijk verder."
      >
        <ButtonLink href="/contact" variant="ghost">
          Stel uw vraag
          <ArrowRight className="h-[18px] w-[18px]" />
        </ButtonLink>
      </PageHeader>

      <section className="py-20">
        <Container>
          <div className="mx-auto max-w-3xl divide-y divide-line overflow-hidden rounded-2xl border border-line bg-white">
            {faqs.map((f) => (
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
        </Container>
      </section>

      <FinalCTA />
    </>
  );
}
