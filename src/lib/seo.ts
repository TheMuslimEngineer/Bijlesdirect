import type { Metadata } from "next";
import { site } from "@/lib/site";

/**
 * Metadata voor één pagina: titel, omschrijving, canonieke link en de
 * deelgegevens (Open Graph) die WhatsApp, Facebook en LinkedIn tonen.
 *
 * Gebruik dit op elke pagina. Zonder eigen deelgegevens erft een pagina die
 * van de homepage, en dan toont een gedeelde link naar /premium de titel en
 * het adres van de homepage.
 *
 * De deelafbeelding hoort hier niet bij: die komt uit het bestand
 * `opengraph-image.tsx` in de map van de pagina (of van een bovenliggende map).
 */
export function paginaMeta({
  titel,
  omschrijving,
  pad,
  merkInTitel = true,
  indexeren = true,
}: {
  /** De paginatitel zonder merknaam; " | ExamenDocent" komt er automatisch achter. */
  titel: string;
  /** Liefst tussen de 110 en 155 tekens: langer kapt Google af. */
  omschrijving: string;
  /** Het pad van de pagina, bijvoorbeeld "/premium". */
  pad: string;
  /** false = de titel staat er al compleet (zoals op de homepage). */
  merkInTitel?: boolean;
  /** false = niet in Google, links op de pagina wel volgen. */
  indexeren?: boolean;
}): Metadata {
  return {
    title: merkInTitel ? titel : { absolute: titel },
    description: omschrijving,
    alternates: { canonical: pad },
    openGraph: {
      type: "website",
      locale: "nl_NL",
      siteName: site.name,
      url: pad,
      title: titel,
      description: omschrijving,
    },
    twitter: {
      card: "summary_large_image",
      title: titel,
      description: omschrijving,
    },
    ...(indexeren ? {} : { robots: { index: false, follow: true } }),
  };
}
