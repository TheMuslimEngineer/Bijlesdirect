"use client";

/**
 * De schermen van de Slagingscheck — één vraag per scherm.
 *
 * Elk scherm krijgt de stapdefinitie uit `questions.ts` en de huidige
 * antwoorden. De schermen bevatten geen vraagteksten en geen vertakkingslogica.
 */

import { useEffect, useRef, useState } from "react";
import { cn } from "@/components/ui";
import { ArrowRight, Check } from "@/components/icons";
import type { Antwoorden, Optie, Stap, VoorWie } from "./types";
import { tekst, zichtbareVelden } from "./types";

/* ── Gedeelde bouwstenen ───────────────────────────────── */

const veldClass =
  "w-full rounded-xl border border-line bg-cream px-3.5 py-3 text-[16px] text-ink transition-shadow focus:border-green focus:outline-none focus:ring-[3px] focus:ring-green-soft";
const labelClass = "mb-1.5 block text-[13px] font-semibold text-ink-soft";

const primaireKnop =
  "inline-flex min-h-[52px] items-center justify-center gap-2 rounded-full bg-green px-7 py-3.5 text-base font-semibold text-white transition-colors duration-150 hover:bg-green-deep disabled:cursor-not-allowed disabled:opacity-60";

export function Vraagkop({
  id,
  vraag,
  toelichting,
  kopRef,
}: {
  id: string;
  vraag: string;
  toelichting?: string;
  kopRef: React.RefObject<HTMLHeadingElement | null>;
}) {
  return (
    <>
      <h1
        id={`vraag-${id}`}
        ref={kopRef}
        tabIndex={-1}
        className="text-[clamp(1.5rem,4.5vw,2.125rem)] text-ink outline-none"
      >
        {vraag}
      </h1>
      {toelichting && <p className="mt-3 text-[15px] text-muted">{toelichting}</p>}
    </>
  );
}

/**
 * Eén antwoordkaart. Groot raakvlak (min. 56px), geen hover-afhankelijke
 * informatie — de meeste bezoekers zitten op hun telefoon.
 */
function OptieKaart({
  optie,
  gekozen,
  cijfer,
  voorWie,
  onKies,
  soort,
}: {
  optie: Optie;
  gekozen: boolean;
  cijfer: number;
  voorWie: VoorWie;
  onKies: () => void;
  soort: "radio" | "checkbox";
}) {
  return (
    <button
      type="button"
      role={soort}
      aria-checked={gekozen}
      onClick={onKies}
      className={cn(
        "group flex min-h-[56px] w-full items-center gap-3.5 rounded-2xl border px-4 py-3.5 text-left transition-colors duration-150",
        gekozen
          ? "border-green bg-green-soft"
          : "border-line bg-paper hover:border-green/40 hover:bg-sand/50",
      )}
    >
      <span
        className={cn(
          "grid h-7 w-7 flex-none place-items-center text-[13px] font-semibold transition-colors",
          soort === "radio" ? "rounded-full" : "rounded-lg",
          gekozen ? "bg-green text-white" : "bg-sand text-muted",
        )}
        aria-hidden
      >
        {gekozen ? <Check className="h-4 w-4" /> : cijfer <= 9 ? cijfer : ""}
      </span>
      <span className="text-[16px] leading-snug text-ink">{tekst(optie.label, voorWie)}</span>
    </button>
  );
}

export function Voortgangsbalk({ percentage }: { percentage: number }) {
  return (
    <div className="flex items-center gap-3">
      <div
        className="h-1.5 flex-1 overflow-hidden rounded-full bg-sand-2"
        role="progressbar"
        aria-valuenow={percentage}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Voortgang van de Slagingscheck"
      >
        <div
          className="h-full rounded-full bg-green transition-[width] duration-300 ease-out motion-reduce:transition-none"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <span className="w-10 flex-none text-right text-[12.5px] font-semibold tabular-nums text-muted">
        {percentage}%
      </span>
    </div>
  );
}

/* ── Scherm: enkelvoudige keuze ────────────────────────── */

export function KeuzeScherm({
  stap,
  antwoorden,
  kopRef,
  onKies,
}: {
  stap: Extract<Stap, { soort: "keuze" }>;
  antwoorden: Antwoorden;
  kopRef: React.RefObject<HTMLHeadingElement | null>;
  onKies: (waarde: string) => void;
}) {
  const voorWie = antwoorden.voorWie ?? "ouder";
  const huidig = antwoorden[stap.veld] as string | undefined;

  return (
    <div>
      <Vraagkop
        id={stap.id}
        vraag={tekst(stap.vraag, voorWie)}
        toelichting={stap.toelichting ? tekst(stap.toelichting, voorWie) : undefined}
        kopRef={kopRef}
      />
      <div className="mt-7 grid gap-2.5" role="radiogroup" aria-labelledby={`vraag-${stap.id}`}>
        {stap.opties.map((optie, i) => (
          <OptieKaart
            key={optie.waarde}
            optie={optie}
            soort="radio"
            gekozen={huidig === optie.waarde}
            cijfer={i + 1}
            voorWie={voorWie}
            onKies={() => onKies(optie.waarde)}
          />
        ))}
      </div>
    </div>
  );
}

/* ── Scherm: meerkeuze ─────────────────────────────────── */

export function MeerkeuzeScherm({
  stap,
  antwoorden,
  kopRef,
  onWissel,
  onAnders,
  onVerder,
}: {
  stap: Extract<Stap, { soort: "meerkeuze" }>;
  antwoorden: Antwoorden;
  kopRef: React.RefObject<HTMLHeadingElement | null>;
  onWissel: (waarde: string) => void;
  onAnders: (waarde: string) => void;
  onVerder: () => void;
}) {
  const voorWie = antwoorden.voorWie ?? "ouder";
  const gekozen = (antwoorden[stap.veld] as string[] | undefined) ?? [];
  const andersActief = stap.opties.some((o) => o.vrijeTekst && gekozen.includes(o.waarde));
  const andersWaarde = stap.andersVeld
    ? ((antwoorden[stap.andersVeld] as string | undefined) ?? "")
    : "";

  return (
    <div>
      <Vraagkop
        id={stap.id}
        vraag={tekst(stap.vraag, voorWie)}
        toelichting={stap.toelichting ? tekst(stap.toelichting, voorWie) : undefined}
        kopRef={kopRef}
      />
      <div className="mt-7 grid gap-2.5" role="group" aria-labelledby={`vraag-${stap.id}`}>
        {stap.opties.map((optie, i) => (
          <OptieKaart
            key={optie.waarde}
            optie={optie}
            soort="checkbox"
            gekozen={gekozen.includes(optie.waarde)}
            cijfer={i + 1}
            voorWie={voorWie}
            onKies={() => onWissel(optie.waarde)}
          />
        ))}
      </div>

      {andersActief && stap.andersVeld && (
        <div className="mt-3">
          <label htmlFor={`${stap.id}-anders`} className="sr-only">
            Vul aan
          </label>
          <input
            id={`${stap.id}-anders`}
            className={veldClass}
            value={andersWaarde}
            onChange={(e) => onAnders(e.target.value)}
            placeholder="Vul hier aan"
            autoFocus
          />
        </div>
      )}

      <div className="mt-7">
        <button type="button" onClick={onVerder} disabled={gekozen.length === 0} className={primaireKnop}>
          Verder
          <ArrowRight className="h-[18px] w-[18px]" />
        </button>
        {gekozen.length === 0 && (
          <p className="mt-2.5 text-[13px] text-muted">Kies er minstens één.</p>
        )}
      </div>
    </div>
  );
}

/* ── Scherm: eerlijk tussenbericht bij een zijroute ────── */

export function BerichtScherm({
  stap,
  antwoorden,
  kopRef,
  onVerder,
}: {
  stap: Extract<Stap, { soort: "bericht" }>;
  antwoorden: Antwoorden;
  kopRef: React.RefObject<HTMLHeadingElement | null>;
  onVerder: () => void;
}) {
  const voorWie = antwoorden.voorWie ?? "ouder";

  return (
    <div>
      <Vraagkop id={stap.id} vraag={tekst(stap.vraag, voorWie)} kopRef={kopRef} />
      <div className="mt-5 space-y-4">
        {stap.alinea.map((a, i) => (
          <p key={i} className="text-[17px] leading-relaxed text-ink-soft">
            {tekst(a, voorWie)}
          </p>
        ))}
      </div>
      <div className="mt-8 flex flex-wrap items-center gap-3">
        <button type="button" onClick={onVerder} className={primaireKnop}>
          {tekst(stap.knop, voorWie)}
          <ArrowRight className="h-[18px] w-[18px]" />
        </button>
        {stap.link && (
          <a
            href={stap.link.href}
            className="inline-flex min-h-[52px] items-center rounded-full border border-line px-6 text-[15px] font-semibold text-ink-soft transition-colors hover:border-ink hover:text-ink"
          >
            {tekst(stap.link.label, voorWie)}
          </a>
        )}
      </div>
    </div>
  );
}

/* ── Scherm: contactgegevens ───────────────────────────── */

export function ContactScherm({
  stap,
  antwoorden,
  kopRef,
  onVeld,
  onVerder,
  bezig,
}: {
  stap: Extract<Stap, { soort: "contact" }>;
  antwoorden: Antwoorden;
  kopRef: React.RefObject<HTMLHeadingElement | null>;
  onVeld: (veld: keyof Antwoorden, waarde: string | boolean) => void;
  onVerder: () => void;
  bezig: boolean;
}) {
  const voorWie = antwoorden.voorWie ?? "ouder";
  const [aangeraakt, setAangeraakt] = useState(false);

  const velden = zichtbareVelden(stap.velden, voorWie);
  const ontbreekt = velden.filter((v) => v.verplicht && !String(antwoorden[v.naam] ?? "").trim());
  const emailVeld = velden.find((v) => v.naam === "email");
  const emailOngeldig =
    !!emailVeld && !!antwoorden.email && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(antwoorden.email);

  function verstuur(e: React.FormEvent) {
    e.preventDefault();
    setAangeraakt(true);
    if (ontbreekt.length > 0 || emailOngeldig) return;
    onVerder();
  }

  return (
    <form onSubmit={verstuur} noValidate>
      <Vraagkop
        id={stap.id}
        vraag={tekst(stap.vraag, voorWie)}
        toelichting={stap.toelichting ? tekst(stap.toelichting, voorWie) : undefined}
        kopRef={kopRef}
      />
      <div className="mt-7 grid gap-3.5">
        {velden.map((veld) => (
          <div key={String(veld.naam)}>
            <label htmlFor={String(veld.naam)} className={labelClass}>
              {tekst(veld.label, voorWie)}
            </label>
            <input
              id={String(veld.naam)}
              name={String(veld.naam)}
              type={veld.type}
              inputMode={veld.type === "email" ? "email" : veld.type === "tel" ? "tel" : undefined}
              autoComplete={veld.autoComplete}
              placeholder={veld.placeholder}
              required={veld.verplicht}
              value={String(antwoorden[veld.naam] ?? "")}
              onChange={(e) => onVeld(veld.naam, e.target.value)}
              className={veldClass}
            />
          </div>
        ))}
      </div>

      {stap.vinkje && (
        <label className="mt-4 flex cursor-pointer items-start gap-3 rounded-xl border border-line bg-paper p-3.5">
          <input
            type="checkbox"
            checked={Boolean(antwoorden[stap.vinkje.veld])}
            onChange={(e) => onVeld(stap.vinkje!.veld, e.target.checked)}
            className="mt-0.5 h-5 w-5 flex-none accent-[#0e6b4f]"
          />
          <span className="text-[15px] leading-snug text-ink-soft">
            {tekst(stap.vinkje.label, voorWie)}
          </span>
        </label>
      )}

      {aangeraakt && (ontbreekt.length > 0 || emailOngeldig) && (
        <p role="alert" className="mt-4 rounded-lg bg-[#fdecec] px-3.5 py-2.5 text-sm text-[#a3271f]">
          {emailOngeldig
            ? "Vul een geldig e-mailadres in."
            : `Vul nog even in: ${ontbreekt.map((v) => tekst(v.label, voorWie).toLowerCase()).join(", ")}.`}
        </p>
      )}

      <div className="mt-7">
        <button type="submit" disabled={bezig} className={primaireKnop}>
          {bezig ? "Bezig met versturen…" : tekst(stap.knop, voorWie)}
          {!bezig && <ArrowRight className="h-[18px] w-[18px]" />}
        </button>
      </div>
    </form>
  );
}

/* ── Scherm: afsluiting (beschikbaarheid + opmerking) ──── */

export function AfsluitingScherm({
  stap,
  antwoorden,
  kopRef,
  onKies,
  onOpmerking,
  onVerder,
  bezig,
}: {
  stap: Extract<Stap, { soort: "afsluiting" }>;
  antwoorden: Antwoorden;
  kopRef: React.RefObject<HTMLHeadingElement | null>;
  onKies: (waarde: string) => void;
  onOpmerking: (waarde: string) => void;
  onVerder: () => void;
  bezig: boolean;
}) {
  const voorWie = antwoorden.voorWie ?? "ouder";
  const huidig = antwoorden[stap.veld] as string | undefined;

  return (
    <div>
      <Vraagkop id={stap.id} vraag={tekst(stap.vraag, voorWie)} kopRef={kopRef} />
      <div className="mt-7 grid gap-2.5" role="radiogroup" aria-labelledby={`vraag-${stap.id}`}>
        {stap.opties.map((optie, i) => (
          <OptieKaart
            key={optie.waarde}
            optie={optie}
            soort="radio"
            gekozen={huidig === optie.waarde}
            cijfer={i + 1}
            voorWie={voorWie}
            onKies={() => onKies(optie.waarde)}
          />
        ))}
      </div>

      <div className="mt-5">
        <label htmlFor="opmerking" className={labelClass}>
          {tekst(stap.opmerkingLabel, voorWie)}
        </label>
        <textarea
          id="opmerking"
          rows={3}
          value={antwoorden.opmerking ?? ""}
          onChange={(e) => onOpmerking(e.target.value)}
          className={cn(veldClass, "resize-y")}
          placeholder="Bijvoorbeeld: begrijpt de theorie wel, maar loopt vast bij toepassingsvragen."
        />
      </div>

      <div className="mt-7">
        <button type="button" onClick={onVerder} disabled={bezig || !huidig} className={primaireKnop}>
          {bezig ? "Bezig met versturen…" : tekst(stap.knop, voorWie)}
          {!bezig && <ArrowRight className="h-[18px] w-[18px]" />}
        </button>
      </div>
    </div>
  );
}

/** Verplaatst de focus naar de vraagkop zodra er een nieuw scherm verschijnt. */
export function useFocusOpKop(stapId: string) {
  const kopRef = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    kopRef.current?.focus({ preventScroll: true });
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [stapId]);
  return kopRef;
}
