import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/site";

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
const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["SOFT", "WONK", "opsz"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.domain),
  title: {
    default: "Bijlesdirect — Examentraining wiskunde met slagingsgarantie",
    template: "%s | Bijlesdirect",
  },
  description: site.description,
  keywords: [
    "examentraining wiskunde havo",
    "examentraining wiskunde vwo",
    "bijles wiskunde examen",
    "wiskunde B examentraining",
    "eindexamen wiskunde hulp",
    "examentraining wiskunde online",
    "wiskunde bijles examenjaar",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "nl_NL",
    url: site.domain,
    siteName: "Bijlesdirect",
    title: "Bijlesdirect — Examentraining wiskunde met slagingsgarantie",
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: "Bijlesdirect — Examentraining wiskunde met slagingsgarantie",
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
