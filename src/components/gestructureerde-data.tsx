import { site } from "@/lib/site";

/**
 * Gestructureerde data (schema.org) voor Google.
 *
 * Bewust géén sterrenbeoordeling (AggregateRating): de reviews op de site gaan
 * over Bijlesdirect, deels over andere vakken, en zijn niet over één cursus
 * gegeven. Google ziet zo'n beoordeling dan als misleidend. Opnieuw toevoegen
 * zodra ExamenDocent eigen reviews heeft (Google Bedrijfsprofiel).
 */
export function JsonLd({ data }: { data: object }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

/** Het kruimelpad voor Google, gelijk aan het zichtbare kruimelpad op de pagina. */
export function kruimelpadData(items: { naam: string; pad: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.naam,
      item: `${site.domain}${item.pad === "/" ? "" : item.pad}`,
    })),
  };
}

/** De aanbieder, zoals die in elke cursus terugkomt. */
export const aanbieder = {
  "@type": "EducationalOrganization",
  name: site.name,
  url: site.domain,
};
