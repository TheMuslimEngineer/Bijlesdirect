import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { site } from "@/lib/site";

/*
 * De lettertypes staan in src/app/fonts en worden niet meer tijdens de build
 * bij Google opgehaald. Op Hostinger brak de build daarop: Turbopack kon het
 * antwoord van Google niet verwerken ("next/font/google queries have exactly
 * one entry"). Het zijn de Latijnse variabele bestanden van Google Fonts
 * (SIL Open Font License), dezelfde die de site eerder via Google kreeg.
 * Alle tekst op de site valt binnen de Latijnse tekenset.
 */

/**
 * Fraunces als variabele font, mét zijn drie extra assen:
 *
 * ▸ `opsz`  — optische grootte (9–144). Bepaalt de snede: bij grote koppen
 *             fijnere haarlijnen en meer contrast, bij kleine tekst juist niet.
 *             Zonder deze as staat alles op 14, de waarde voor lopende tekst.
 * ▸ `SOFT`  — verzacht de uiteinden. Past bij "premium maar warm".
 * ▸ `WONK`  — de eigenzinnige alternatieve letters. Alleen op het accentwoord
 *             in de hero, zie `.kop-wonk` in globals.css.
 *
 * De waarden staan in globals.css, zodat de typografie op één plek te sturen is.
 */
const fraunces = localFont({
  variable: "--font-fraunces",
  src: [
    { path: "./fonts/fraunces-latin.woff2", weight: "100 900", style: "normal" },
    { path: "./fonts/fraunces-latin-italic.woff2", weight: "100 900", style: "italic" },
  ],
  display: "swap",
  // Fraunces is een schreefletter: de tijdelijke vervanger moet dat ook zijn.
  adjustFontFallback: "Times New Roman",
});

const inter = localFont({
  variable: "--font-inter",
  src: [{ path: "./fonts/inter-latin.woff2", weight: "100 900", style: "normal" }],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.domain),
  title: {
    default: "ExamenDocent | Examentraining wiskunde met slagingsgarantie",
    template: "%s | ExamenDocent",
  },
  description: site.description,
  /* Er is één aanbod, dus de hele site richt zich op dezelfde zoektermen. */
  keywords: [
    "examentraining wiskunde",
    "examentraining wiskunde havo",
    "examentraining wiskunde vwo",
    "eindexamen wiskunde",
    "online examentraining wiskunde",
    "slagingsgarantie examen",
  ],
  openGraph: {
    type: "website",
    locale: "nl_NL",
    siteName: "ExamenDocent",
    title: "ExamenDocent | Examentraining wiskunde met slagingsgarantie",
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: "ExamenDocent | Examentraining wiskunde met slagingsgarantie",
    description: site.description,
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="nl" className={`${fraunces.variable} ${inter.variable} h-full`}>
      <body className="flex min-h-full flex-col bg-cream">{children}</body>
    </html>
  );
}
