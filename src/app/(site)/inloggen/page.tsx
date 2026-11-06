import type { Metadata } from "next";
import { Container } from "@/components/ui";
import { PageHeader } from "@/components/page-header";
import { PortaalWidget } from "@/components/portaal-widget";
import { site, portaal } from "@/lib/site";

export const metadata: Metadata = {
  title: "Inloggen op het portaal",
  description:
    "Log in op het leerlingportaal van ExamenDocent: bekijk je lessen, je rooster en je huiswerk.",
  alternates: { canonical: "/inloggen" },
  // Een inlogpagina heeft geen zoekwaarde en hoeft niet in Google.
  robots: { index: false, follow: true },
};

export default function InloggenPage() {
  return (
    <>
      <PageHeader
        eyebrow="Voor huidige leerlingen"
        title="Inloggen op het portaal"
        intro="Bekijk je lessen, je rooster en wat er van je verwacht wordt. Ook ouders kunnen hier meekijken."
      />

      <section className="py-16 sm:py-20">
        <Container>
          <div className="mx-auto max-w-xl">
            <PortaalWidget />

            <div className="mt-10 border-t border-line pt-8">
              <p className="font-display text-[1.15rem] font-semibold text-ink">
                Lukt het inloggen niet?
              </p>
              <p className="mt-2 text-[15.5px] text-ink-soft">
                Bent u uw wachtwoord kwijt, dan kunt u er in het inlogscherm zelf een nieuwe
                aanvragen. Komt u er niet uit? Bel of app ons, dan lossen we het samen op.
              </p>
              <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-[15px]">
                <a href={site.phoneHref} className="font-semibold text-green hover:text-green-deep">
                  {site.phoneDisplay}
                </a>
                <a
                  href={site.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-green hover:text-green-deep"
                >
                  WhatsApp
                </a>
                <a
                  href={portaal.loginUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted hover:text-ink"
                >
                  Rechtstreeks naar TutorBird
                </a>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
