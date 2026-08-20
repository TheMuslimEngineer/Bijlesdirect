import { Container, ButtonLink } from "@/components/ui";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

// Staat buiten de (site)-groep — onbekende adressen vallen niet binnen een
// segment, dus header en footer horen hier expliciet bij.
export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main id="main" className="flex-1">
        <section className="py-24 sm:py-32">
          <Container>
            <div className="mx-auto max-w-xl text-center">
              <div className="font-display text-[clamp(4rem,12vw,8rem)] font-semibold leading-none text-green">404</div>
              <h1 className="mt-4 text-[clamp(1.75rem,3.5vw,2.5rem)] text-ink">Deze pagina bestaat niet.</h1>
              <p className="mt-4 text-lg text-ink-soft">
                Mogelijk is de pagina verplaatst of verwijderd. Ga terug naar de homepage of vraag direct de
                gratis Slagingscheck aan.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3.5">
                <ButtonLink href="/">Terug naar home</ButtonLink>
                <ButtonLink href="/slagingscheck" variant="ghost">
                  Gratis Slagingscheck aanvragen
                </ButtonLink>
              </div>
            </div>
          </Container>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
