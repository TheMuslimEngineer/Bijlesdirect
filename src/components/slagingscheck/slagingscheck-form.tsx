"use client";

/**
 * De Slagingscheck — één vraag per scherm, met vertakkingen.
 *
 * Dit bestand bevat alléén de toestand en de navigatie. De vragen staan in
 * `questions.ts`, de schermen in `stap-schermen.tsx`. Wie een vraag wil
 * aanpassen, hoeft hier niets te veranderen.
 */

import { useCallback, useEffect, useReducer, useRef } from "react";
import Link from "next/link";
import { BrandLogo } from "@/components/logo";
import { site } from "@/lib/site";
import { ArrowRight } from "@/components/icons";
import { track } from "@/lib/analytics";
import {
  bepaalMarkering,
  bepaalRoute,
  isLaatsteStap,
  pad,
  stappen,
  volgendeStap,
  voortgang,
} from "./questions";
import { bewaar, herstel, wis } from "./opslag";
import {
  AfsluitingScherm,
  BerichtScherm,
  ContactScherm,
  KeuzeScherm,
  MeerkeuzeScherm,
  Voortgangsbalk,
  useFocusOpKop,
} from "./stap-schermen";
import { Bevestiging } from "./bevestiging";
import type { Antwoorden, StapId } from "./types";

/* ── Toestand ──────────────────────────────────────────── */

type Status = "invullen" | "versturen" | "fout" | "verzonden";

type Toestand = {
  stap: StapId;
  antwoorden: Antwoorden;
  status: Status;
  fout: string;
  /** Pas waar zodra een eerdere invulling is teruggehaald — daarvóór mag er
   *  niets bewaard worden, anders wist de lege beginstaat de voortgang. */
  gereed: boolean;
};

type Actie =
  | { type: "zet"; veld: keyof Antwoorden; waarde: unknown }
  | { type: "wissel"; veld: keyof Antwoorden; waarde: string }
  | { type: "verder" }
  | { type: "terug" }
  | { type: "hervat"; stap: StapId; antwoorden: Antwoorden }
  | { type: "gereed" }
  | { type: "versturen" }
  | { type: "fout"; melding: string }
  | { type: "verzonden" };

const begin: Toestand = {
  stap: "voor_wie",
  antwoorden: {},
  status: "invullen",
  fout: "",
  gereed: false,
};

function reducer(t: Toestand, actie: Actie): Toestand {
  switch (actie.type) {
    case "zet":
      return { ...t, antwoorden: { ...t.antwoorden, [actie.veld]: actie.waarde }, fout: "" };

    case "wissel": {
      const huidig = (t.antwoorden[actie.veld] as string[] | undefined) ?? [];
      const nieuw = huidig.includes(actie.waarde)
        ? huidig.filter((w) => w !== actie.waarde)
        : [...huidig, actie.waarde];
      return { ...t, antwoorden: { ...t.antwoorden, [actie.veld]: nieuw }, fout: "" };
    }

    case "verder": {
      const volgende = volgendeStap(t.stap, t.antwoorden);
      if (volgende === "klaar") return t; // het versturen loopt via de API-actie
      return { ...t, stap: volgende, fout: "" };
    }

    case "terug": {
      const route = pad(t.antwoorden);
      const index = route.indexOf(t.stap);
      if (index <= 0) return t;
      return { ...t, stap: route[index - 1], fout: "" };
    }

    case "hervat":
      return { ...t, stap: actie.stap, antwoorden: actie.antwoorden, gereed: true };

    case "gereed":
      return { ...t, gereed: true };

    case "versturen":
      return { ...t, status: "versturen", fout: "" };

    case "fout":
      return { ...t, status: "fout", fout: actie.melding };

    case "verzonden":
      return { ...t, status: "verzonden" };
  }
}

/* ── Component ─────────────────────────────────────────── */

export function SlagingscheckForm() {
  const [t, dispatch] = useReducer(reducer, begin);
  const kopRef = useFocusOpKop(t.stap);
  const vertraging = useRef<ReturnType<typeof setTimeout> | null>(null);

  const stap = stappen[t.stap];
  const percentage = voortgang(t.stap, t.antwoorden);
  const eersteStap = pad(t.antwoorden).indexOf(t.stap) <= 0;
  const bezig = t.status === "versturen";

  /* Hervatten van een onderbroken invulling. */
  useEffect(() => {
    const bewaard = herstel();
    if (bewaard && stappen[bewaard.stap]) {
      dispatch({ type: "hervat", stap: bewaard.stap, antwoorden: bewaard.antwoorden });
    } else {
      dispatch({ type: "gereed" });
    }
    track("slagingscheck_start");
  }, []);

  /* Elke stapwissel: meten en tussentijds bewaren. */
  useEffect(() => {
    if (!t.gereed || t.status === "verzonden") return;
    track("slagingscheck_step_view", { stap: t.stap, voortgang: percentage });
    // Een leeg formulier hoeft niet bewaard te worden.
    if (Object.keys(t.antwoorden).length > 0) bewaar(t.antwoorden, t.stap);
  }, [t.gereed, t.stap, t.antwoorden, t.status, percentage]);

  useEffect(() => () => {
    if (vertraging.current) clearTimeout(vertraging.current);
  }, []);

  const verstuur = useCallback(async () => {
    dispatch({ type: "versturen" });
    const route = bepaalRoute(t.antwoorden);
    try {
      const res = await fetch("/api/slagingscheck", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(t.antwoorden),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error ?? "Er ging iets mis. Probeer het opnieuw.");
      }
      wis();
      track("slagingscheck_submit", {
        route,
        markering: bepaalMarkering(t.antwoorden) ?? "geen",
      });
      if (route !== "hoofdroute") track("slagingscheck_exit", { route });
      dispatch({ type: "verzonden" });
    } catch (err) {
      dispatch({
        type: "fout",
        melding: err instanceof Error ? err.message : "Er ging iets mis.",
      });
    }
  }, [t.antwoorden]);

  /** Verder gaan, of versturen als dit de laatste stap was. */
  const verder = useCallback(() => {
    if (isLaatsteStap(t.stap, t.antwoorden)) {
      void verstuur();
      return;
    }
    dispatch({ type: "verder" });
  }, [t.stap, t.antwoorden, verstuur]);

  /** Enkelvoudige keuze: opslaan, even laten zien, dan door. */
  const kiesEnDoor = useCallback(
    (veld: keyof Antwoorden, waarde: string) => {
      dispatch({ type: "zet", veld, waarde });
      if (vertraging.current) clearTimeout(vertraging.current);
      vertraging.current = setTimeout(() => dispatch({ type: "verder" }), 250);
    },
    [],
  );

  /* Toetsenbord: cijfers kiezen, Enter verder, Backspace terug. */
  useEffect(() => {
    if (t.status === "verzonden") return;

    function opToets(e: KeyboardEvent) {
      const doel = e.target as HTMLElement | null;
      const inVeld =
        doel instanceof HTMLInputElement ||
        doel instanceof HTMLTextAreaElement ||
        doel instanceof HTMLSelectElement;

      if (e.key === "Backspace" && !inVeld && !eersteStap) {
        e.preventDefault();
        dispatch({ type: "terug" });
        return;
      }
      if (inVeld || e.metaKey || e.ctrlKey || e.altKey) return;

      if (e.key === "Enter") {
        if ("opties" in stap && stap.soort === "keuze") return; // keuze gaat vanzelf door
        e.preventDefault();
        verder();
        return;
      }

      const cijfer = Number(e.key);
      if (!Number.isInteger(cijfer) || cijfer < 1 || cijfer > 9) return;
      if (!("opties" in stap)) return;
      const optie = stap.opties[cijfer - 1];
      if (!optie) return;
      e.preventDefault();
      if (stap.soort === "meerkeuze") dispatch({ type: "wissel", veld: stap.veld, waarde: optie.waarde });
      else if (stap.soort === "keuze") kiesEnDoor(stap.veld, optie.waarde);
      else dispatch({ type: "zet", veld: stap.veld, waarde: optie.waarde });
    }

    window.addEventListener("keydown", opToets);
    return () => window.removeEventListener("keydown", opToets);
  }, [stap, eersteStap, verder, kiesEnDoor, t.status]);

  if (t.status === "verzonden") {
    return <Bevestiging antwoorden={t.antwoorden} route={bepaalRoute(t.antwoorden)} />;
  }

  return (
    <div className="flex min-h-dvh flex-col">
      {/* Kleine balk: alleen het logo en een uitweg. Verder niets. */}
      <header className="sticky top-0 z-10 border-b border-line bg-cream/90 backdrop-blur">
        <div className="mx-auto flex w-full max-w-[600px] items-center justify-between gap-4 px-6 py-3.5">
          <BrandLogo />
          <Link
            href="/"
            className="rounded-full px-2 py-1 text-[13px] font-medium text-muted transition-colors hover:text-ink"
          >
            Later verder
          </Link>
        </div>
        <div className="mx-auto w-full max-w-[600px] px-6 pb-3">
          <Voortgangsbalk percentage={percentage} />
        </div>
      </header>

      <div className="mx-auto flex w-full max-w-[600px] flex-1 flex-col px-6 pb-16 pt-10 sm:pt-14">
        {/* De key zorgt voor een zachte overgang bij elke stapwissel. */}
        <div key={t.stap} className="animate-stap" aria-live="polite">
          {stap.soort === "keuze" && (
            <KeuzeScherm
              stap={stap}
              antwoorden={t.antwoorden}
              kopRef={kopRef}
              onKies={(waarde) => kiesEnDoor(stap.veld, waarde)}
            />
          )}

          {stap.soort === "meerkeuze" && (
            <MeerkeuzeScherm
              stap={stap}
              antwoorden={t.antwoorden}
              kopRef={kopRef}
              onWissel={(waarde) => dispatch({ type: "wissel", veld: stap.veld, waarde })}
              onAnders={(waarde) =>
                stap.andersVeld && dispatch({ type: "zet", veld: stap.andersVeld, waarde })
              }
              onVerder={verder}
            />
          )}

          {stap.soort === "bericht" && (
            <BerichtScherm stap={stap} antwoorden={t.antwoorden} kopRef={kopRef} onVerder={verder} />
          )}

          {stap.soort === "contact" && (
            <ContactScherm
              stap={stap}
              antwoorden={t.antwoorden}
              kopRef={kopRef}
              bezig={bezig}
              onVeld={(veld, waarde) => dispatch({ type: "zet", veld, waarde })}
              onVerder={verder}
            />
          )}

          {stap.soort === "afsluiting" && (
            <AfsluitingScherm
              stap={stap}
              antwoorden={t.antwoorden}
              kopRef={kopRef}
              bezig={bezig}
              onKies={(waarde) => dispatch({ type: "zet", veld: stap.veld, waarde })}
              onOpmerking={(waarde) => dispatch({ type: "zet", veld: "opmerking", waarde })}
              onVerder={verder}
            />
          )}
        </div>

        {t.status === "fout" && (
          <p role="alert" className="mt-6 rounded-xl bg-[#fdecec] px-4 py-3 text-[15px] text-[#a3271f]">
            {t.fout} Uw antwoorden staan er nog — probeer het opnieuw, of{" "}
            <a href={site.whatsapp} className="font-semibold underline">
              stuur ons een WhatsApp
            </a>
            .
          </p>
        )}

        {/* Honeypot — bots vullen dit, mensen zien het niet. */}
        <input
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          className="hidden"
          onChange={(e) => dispatch({ type: "zet", veld: "website", waarde: e.target.value })}
        />

        <div className="mt-auto pt-10">
          {!eersteStap && (
            <button
              type="button"
              onClick={() => dispatch({ type: "terug" })}
              className="inline-flex items-center gap-1.5 text-[14px] font-medium text-muted transition-colors hover:text-ink"
            >
              <ArrowRight className="h-4 w-4 rotate-180" />
              Terug
            </button>
          )}
          <p className="mt-4 text-[12.5px] leading-relaxed text-muted">
            Gratis en vrijblijvend. Uw antwoorden gebruiken we alleen om het gesprek voor te
            bereiden — zie ons{" "}
            <Link href="/privacy" className="underline hover:text-ink">
              privacybeleid
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
