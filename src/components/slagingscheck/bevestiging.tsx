"use client";

/**
 * Het scherm ná verzenden.
 *
 * Op de hoofdroute krijgt de ouder meteen de gepersonaliseerde oudergids te
 * lezen — dezelfde tekst die per e-mail wordt nagestuurd. Via een zijroute is
 * er geen gids; daar past een korte, eerlijke bevestiging beter.
 */

import Link from "next/link";
import { site } from "@/lib/site";
import { Check, WhatsApp } from "@/components/icons";
import { assemble, delen, type Blok } from "@/content/oudergids";
import type { Antwoorden, Route } from "./types";

function Regels({ blok }: { blok: Blok }) {
  return (
    <div className="mt-3 space-y-3.5">
      {blok.regels.map((regel, i) => {
        if (regel.soort === "citaat") {
          return (
            <p
              key={i}
              className="border-l-[3px] border-green pl-4 text-[17px] italic leading-relaxed text-ink"
            >
              “{regel.tekst}”
            </p>
          );
        }
        if (regel.soort === "noot") {
          return (
            <p key={i} className="rounded-xl bg-green-soft px-4 py-3 text-[15px] leading-relaxed text-green-deep">
              {regel.tekst}
            </p>
          );
        }
        return (
          <p key={i} className="whitespace-pre-line text-[16.5px] leading-relaxed text-ink-soft">
            {delen(regel.tekst).map((deel, j) =>
              deel.vet ? (
                <strong key={j} className="font-semibold text-ink">
                  {deel.tekst}
                </strong>
              ) : (
                <span key={j}>{deel.tekst}</span>
              ),
            )}
          </p>
        );
      })}
    </div>
  );
}

const zijrouteTekst: Record<Exclude<Route, "hoofdroute">, { kop: string; body: string }> = {
  inhaalprogramma: {
    kop: "Bedankt. We nemen contact met u op.",
    body: "Samen kijken we wat we voor uw kind kunnen doen. U krijgt geen nieuwsbrief. Alleen dit bericht.",
  },
  ander_niveau: {
    kop: "Dank u wel. Dit helpt ons echt.",
    body: "Zo weten we waar ouders hulp bij zoeken. Gaan we dit ook doen? Dan hoort u het van ons.",
  },
};

export function Bevestiging({ antwoorden, route }: { antwoorden: Antwoorden; route: Route }) {
  const gids = assemble(antwoorden);
  const jeVorm = antwoorden.voorWie === "leerling";

  return (
    <div className="mx-auto w-full max-w-[600px] px-6 pb-24 pt-10 sm:pt-16">
      <div className="flex items-center gap-3">
        <span className="grid h-11 w-11 flex-none place-items-center rounded-full bg-green text-white">
          <Check className="h-6 w-6" />
        </span>
        <p className="text-[13px] font-semibold uppercase tracking-[0.12em] text-green">
          Aanvraag ontvangen
        </p>
      </div>

      {gids ? (
        <>
          <h1 className="mt-6 text-[clamp(1.6rem,4.5vw,2.25rem)] text-ink">{gids.blokken[0].kop}</h1>
          <Regels blok={{ ...gids.blokken[0], kop: undefined }} />

          <div className="mt-10 rounded-3xl border border-line bg-paper p-6 sm:p-8">
            <p className="text-[13px] font-semibold uppercase tracking-[0.12em] text-green">
              {jeVorm ? "Alvast voor jou" : "Alvast voor u"}
            </p>
            <h2 className="kop-tekst mt-3 text-[clamp(1.35rem,3.5vw,1.75rem)] text-ink">{gids.titel}</h2>
            <p className="mt-3 text-[15px] text-muted">
              {jeVorm
                ? "Je krijgt dit ook per e-mail. Dan kun je het later nog eens lezen."
                : "U krijgt dit ook per e-mail. Dan kunt u het later nog eens lezen."}
            </p>

            <div className="mt-8 space-y-9">
              {gids.blokken.slice(1).map((blok) => (
                <section key={blok.id}>
                  {blok.kop && <h3 className="text-[19px] text-ink">{blok.kop}</h3>}
                  <Regels blok={blok} />
                </section>
              ))}
            </div>
          </div>
        </>
      ) : (
        <>
          <h1 className="mt-6 text-[clamp(1.6rem,4.5vw,2.25rem)] text-ink">
            {zijrouteTekst[route as Exclude<Route, "hoofdroute">].kop}
          </h1>
          <p className="mt-4 text-[17px] leading-relaxed text-ink-soft">
            {zijrouteTekst[route as Exclude<Route, "hoofdroute">].body}
          </p>
          <p className="mt-4 text-[17px] leading-relaxed text-ink-soft">
            Zoekt u nu al bijles?{" "}
            <a
              href={site.bijlesdirectUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-green-deep underline underline-offset-4 hover:text-green"
            >
              Kijk bij Bijlesdirect
            </a>
            , waar ExamenDocent bij hoort.
          </p>
        </>
      )}

      <div className="mt-10 flex flex-wrap items-center gap-3">
        <a
          href={site.whatsapp}
          className="inline-flex min-h-[52px] items-center gap-2 rounded-full bg-green px-6 text-[15px] font-semibold text-white transition-colors hover:bg-green-deep"
        >
          <WhatsApp className="h-5 w-5" />
          Nu al een vraag? Stuur een WhatsApp
        </a>
        <Link
          href="/"
          className="inline-flex min-h-[52px] items-center rounded-full border border-line px-6 text-[15px] font-semibold text-ink-soft transition-colors hover:border-ink hover:text-ink"
        >
          Terug naar de website
        </Link>
      </div>

      <p className="mt-6 text-[13px] text-muted">
        Of bel{" "}
        <a href={site.phoneHref} className="font-semibold text-ink hover:text-green">
          {site.phoneDisplay}
        </a>
        .
      </p>
    </div>
  );
}
