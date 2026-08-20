import type { Metadata } from "next";
import { Container, ButtonLink } from "@/components/ui";
import { Check } from "@/components/icons";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Bedankt voor uw aanvraag",
  description: "We hebben uw aanvraag ontvangen en nemen snel contact met u op.",
  robots: { index: false, follow: false },
  alternates: { canonical: "/bedankt" },
};

export default function BedanktPage() {
  return (
    <section className="py-24 sm:py-28">
      <Container>
        <div className="mx-auto max-w-xl text-center">
          <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-green-soft">
            <Check className="h-10 w-10 text-green-deep" />
          </div>
          <h1 className="mt-7 text-[clamp(2rem,4vw,3rem)] text-ink">Bedankt voor uw aanvraag.</h1>
          <p className="mt-4 text-lg text-ink-soft">
            We hebben uw aanvraag goed ontvangen en nemen binnen één werkdag persoonlijk contact met u op
            — op het moment dat u heeft aangegeven. U ontvangt daarnaast direct een bevestiging per
            e-mail.
          </p>

          <div className="mt-9 rounded-2xl border border-line bg-sand p-7 text-left">
            <p className="font-display text-[1.15rem] font-semibold text-ink">Wat er nu gebeurt</p>
            <ol className="mt-4 grid gap-4">
              {[
                "Een gesprek van ongeveer 30 minuten over waar uw kind vastloopt.",
                "Past het programma? Dan volgt de diagnostische toets.",
                "Binnen 48 uur ligt er een persoonlijk examenplan klaar.",
              ].map((s, i) => (
                <li key={s} className="flex gap-3.5">
                  <span className="grid h-7 w-7 flex-none place-items-center rounded-full bg-green text-[13px] font-semibold text-white">
                    {i + 1}
                  </span>
                  <span className="text-[15.5px] text-ink-soft">{s}</span>
                </li>
              ))}
            </ol>
          </div>

          <p className="mt-6 text-ink-soft">
            Liever direct contact? Bel{" "}
            <a href={site.phoneHref} className="font-semibold text-green-deep hover:underline">
              {site.phoneDisplay}
            </a>{" "}
            of stuur ons een{" "}
            <a href={site.whatsapp} className="font-semibold text-green-deep hover:underline">
              WhatsApp
            </a>
            .
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-3.5">
            <ButtonLink href="/slagingsprogramma">Bekijk het programma</ButtonLink>
            <ButtonLink href="/" variant="ghost">
              Terug naar home
            </ButtonLink>
          </div>
        </div>
      </Container>
    </section>
  );
}
