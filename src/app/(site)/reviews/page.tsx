import type { Metadata } from "next";
import { paginaMeta } from "@/lib/seo";
import { Container, Stars } from "@/components/ui";
import { PageHeader } from "@/components/page-header";
import { ReviewPlatforms } from "@/components/sections";
import { ProgrammaCTA } from "@/components/programma-secties";
import { ReviewsGrid } from "@/components/reviews-grid";
import { reviews, rating } from "@/lib/site";

export const metadata: Metadata = paginaMeta({
  titel: "Ervaringen en reviews van ouders",
  omschrijving:
    "Lees wat ouders over onze begeleiding vertellen: over hogere cijfers, een gehaald examen en meer zelfvertrouwen. Gemiddeld beoordeeld met een 4,9.",
  pad: "/reviews",
});

export default function ReviewsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Wat ouders zeggen"
        title="Ouders geven ons gemiddeld een 4,9"
        intro="Het cijfer telt, en hoe uw kind zich onderweg voelt ook. Dit vertellen ouders over onze begeleiding."
      >
        <div className="flex flex-col gap-5">
          <div className="flex items-center gap-3">
            <Stars />
            <span className="text-[15px] font-medium text-ink">
              {rating.score} / 5 gemiddeld · {rating.count}+ reviews
            </span>
          </div>
          <ReviewPlatforms />
        </div>
      </PageHeader>

      <section className="py-20">
        <Container>
          <ReviewsGrid reviews={reviews} />
        </Container>
      </section>

      <ProgrammaCTA />
    </>
  );
}
