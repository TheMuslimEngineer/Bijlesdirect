import type { Metadata } from "next";
import { Container, Stars } from "@/components/ui";
import { PageHeader } from "@/components/page-header";
import { StatsBand, ReviewPlatforms } from "@/components/sections";
import { ProgrammaCTA } from "@/components/programma-secties";
import { ReviewsGrid } from "@/components/reviews-grid";
import { reviews, rating } from "@/lib/site";

export const metadata: Metadata = {
  title: "Reviews — wat ouders over Bijlesdirect zeggen",
  description:
    "Lees ervaringen van ouders en leerlingen. Bijlesdirect wordt beoordeeld met een 4,9 uit 5 op basis van 100+ reviews — over hogere cijfers, gehaalde examens en meer zelfvertrouwen.",
  alternates: { canonical: "/reviews" },
};

export default function ReviewsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Wat ouders zeggen"
        title="Beoordeeld met een 4,9 door ouders."
        intro="Het resultaat telt — maar ook hoe uw kind zich onderweg voelt. Dit is wat ouders over onze begeleiding vertellen."
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

      <section className="pb-20">
        <StatsBand />
      </section>

      <ProgrammaCTA title="Sluit u aan bij 500+ tevreden gezinnen?" />
    </>
  );
}
