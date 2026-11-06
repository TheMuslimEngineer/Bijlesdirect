"use client";

/**
 * De schermen van de Slagingscheck — één vraag per scherm.
 *
 * Elk scherm krijgt de stapdefinitie uit `questions.ts` en de huidige
 * antwoorden. De schermen bevatten geen vraagteksten en geen vertakkingslogica.
 */

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { cn } from "@/components/ui";
import { ArrowRight, Check } from "@/components/icons";
import type { Antwoorden, Stap } from "./types";
import { persoonlijk } from "./types";
import { geruststellingVoor, grafiekVoor, statistiekVoor } from "./questions";
import adamHeadshot from "../../../public/images/adam-headshot.webp";

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
  reactie,
  kopRef,
}: {
  id: string;
  vraag: string;
  toelichting?: string;
  /** Korte zin boven de vraag die reageert op het vorige antwoord. */
  reactie?: string;
  kopRef: React.RefObject<HTMLHeadingElement | null>;
}) {
  return (
    // data-vraagkop: het formulier lijnt de review uit met wat hierna komt.
    <div data-vraagkop>
      {reactie && (
        <p className="mb-4 text-[15.5px] font-medium leading-snug text-green-deep">{reactie}</p>
      )}
      <h1
        id={`vraag-${id}`}
        ref={kopRef}
        tabIndex={-1}
        className="text-[clamp(1.5rem,4.5vw,2.125rem)] text-ink outline-none"
      >
        {vraag}
      </h1>
      {toelichting && <p className="mt-3 text-[15px] text-muted">{toelichting}</p>}
    </div>
  );
}

/**
 * Eén antwoordkaart. Groot raakvlak (min. 56px), geen hover-afhankelijke
 * informatie — de meeste bezoekers zitten op hun telefoon.
 */
function OptieKaart({
  label,
  gekozen,
  cijfer,
  onKies,
  soort,
}: {
  label: string;
  gekozen: boolean;
  cijfer: number;
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
      <span className="text-[16px] leading-snug text-ink">{label}</span>
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
  const huidig = antwoorden[stap.veld] as string | undefined;

  return (
    <div>
      <Vraagkop
        id={stap.id}
        vraag={persoonlijk(stap.vraag, antwoorden)}
        toelichting={stap.toelichting ? persoonlijk(stap.toelichting, antwoorden) : undefined}
        reactie={stap.reactie ? persoonlijk(stap.reactie(antwoorden), antwoorden) : undefined}
        kopRef={kopRef}
      />
      <div className="mt-7 grid gap-2.5" role="radiogroup" aria-labelledby={`vraag-${stap.id}`}>
        {stap.opties.map((optie, i) => (
          <OptieKaart
            key={optie.waarde}
            label={persoonlijk(optie.label, antwoorden)}
            soort="radio"
            gekozen={huidig === optie.waarde}
            cijfer={i + 1}
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
  const gekozen = (antwoorden[stap.veld] as string[] | undefined) ?? [];
  const andersActief = stap.opties.some((o) => o.vrijeTekst && gekozen.includes(o.waarde));
  const andersWaarde = stap.andersVeld
    ? ((antwoorden[stap.andersVeld] as string | undefined) ?? "")
    : "";

  return (
    <div>
      <Vraagkop
        id={stap.id}
        vraag={persoonlijk(stap.vraag, antwoorden)}
        toelichting={stap.toelichting ? persoonlijk(stap.toelichting, antwoorden) : undefined}
        reactie={stap.reactie ? persoonlijk(stap.reactie(antwoorden), antwoorden) : undefined}
        kopRef={kopRef}
      />
      <div className="mt-7 grid gap-2.5" role="group" aria-labelledby={`vraag-${stap.id}`}>
        {stap.opties.map((optie, i) => (
          <OptieKaart
            key={optie.waarde}
            label={persoonlijk(optie.label, antwoorden)}
            soort="checkbox"
            gekozen={gekozen.includes(optie.waarde)}
            cijfer={i + 1}
            onKies={() => onWissel(optie.waarde)}
          />
        ))}
      </div>

      {andersActief && stap.andersVeld && (
        <div className="mt-3">
          <label htmlFor={`${stap.id}-anders`} className="sr-only">
            Schrijf het vak op
          </label>
          <input
            id={`${stap.id}-anders`}
            className={veldClass}
            value={andersWaarde}
            onChange={(e) => onAnders(e.target.value)}
            placeholder="Schrijf hier het vak"
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
          <p className="mt-2.5 text-[13px] text-muted">Kies minstens één antwoord.</p>
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
  return (
    <div>
      <Vraagkop id={stap.id} vraag={persoonlijk(stap.vraag, antwoorden)} kopRef={kopRef} />
      <div className="mt-5 space-y-4">
        {stap.alinea.map((a, i) => (
          <p key={i} className="text-[17px] leading-relaxed text-ink-soft">
            {persoonlijk(a, antwoorden)}
          </p>
        ))}
      </div>
      <div className="mt-8 flex flex-wrap items-center gap-3">
        <button type="button" onClick={onVerder} className={primaireKnop}>
          {persoonlijk(stap.knop, antwoorden)}
          <ArrowRight className="h-[18px] w-[18px]" />
        </button>
        {stap.link && (
          <a
            href={stap.link.href}
            // Een link naar een andere site opent apart, zodat dit formulier blijft staan.
            {...(stap.link.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            className="inline-flex min-h-[52px] items-center rounded-full border border-line px-6 text-[15px] font-semibold text-ink-soft transition-colors hover:border-ink hover:text-ink"
          >
            {persoonlijk(stap.link.label, antwoorden)}
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
  const [aangeraakt, setAangeraakt] = useState(false);

  const velden = stap.velden;
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
        vraag={persoonlijk(stap.vraag, antwoorden)}
        toelichting={stap.toelichting ? persoonlijk(stap.toelichting, antwoorden) : undefined}
        reactie={stap.reactie ? persoonlijk(stap.reactie(antwoorden), antwoorden) : undefined}
        kopRef={kopRef}
      />
      <div className="mt-7 grid gap-3.5">
        {velden.map((veld) => (
          <div key={String(veld.naam)}>
            <label htmlFor={String(veld.naam)} className={labelClass}>
              {persoonlijk(veld.label, antwoorden)}
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

      {aangeraakt && (ontbreekt.length > 0 || emailOngeldig) && (
        <p role="alert" className="mt-4 rounded-lg bg-[#fdecec] px-3.5 py-2.5 text-sm text-[#a3271f]">
          {emailOngeldig
            ? "Dit e-mailadres klopt niet. Kijk het nog even na."
            : `Vul dit nog in: ${ontbreekt.map((v) => persoonlijk(v.label, antwoorden).toLowerCase()).join(", ")}.`}
        </p>
      )}

      <div className="mt-7">
        <button type="submit" disabled={bezig} className={primaireKnop}>
          {bezig ? "Even geduld…" : persoonlijk(stap.knop, antwoorden)}
          {!bezig && <ArrowRight className="h-[18px] w-[18px]" />}
        </button>
      </div>
    </form>
  );
}

/* ── Scherm: landelijke cijfers na de klasvraag ──────────── */

/**
 * Honderd stippen, waarvan `gekleurd` in goud: "zoveel van de 100". Een
 * plaatje is makkelijker te begrijpen dan een percentage, ook voor ouders die
 * moeite hebben met de taal. Goud en geen rood: het is informatie, geen alarm.
 */
function HonderdStippen({ gekleurd }: { gekleurd: number }) {
  const [getekend, setGetekend] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setGetekend(true), 300);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="grid w-full max-w-[300px] grid-cols-10 gap-1.5" aria-hidden>
      {Array.from({ length: 100 }, (_, i) => {
        // De gekleurde stippen staan achteraan: het plaatje leest als "de meesten halen het".
        const isGekleurd = i >= 100 - gekleurd;
        return (
          <span
            key={i}
            className={cn(
              "aspect-square rounded-full transition-colors duration-500 motion-reduce:transition-none",
              isGekleurd && getekend ? "bg-gold" : "bg-green-soft",
            )}
            style={isGekleurd ? { transitionDelay: `${(i - (100 - gekleurd)) * 25}ms` } : undefined}
          />
        );
      })}
    </div>
  );
}

export function StatistiekScherm({
  stap,
  antwoorden,
  kopRef,
  onVerder,
}: {
  stap: Extract<Stap, { soort: "statistiek" }>;
  antwoorden: Antwoorden;
  kopRef: React.RefObject<HTMLHeadingElement | null>;
  onVerder: () => void;
}) {
  const s = statistiekVoor(antwoorden);

  return (
    <div>
      {s && (
        <>
          <Vraagkop id={stap.id} vraag={s.kop} kopRef={kopRef} />

          <figure className="mt-7 rounded-2xl border border-line bg-white p-5 sm:p-6" aria-label={s.kop}>
            {s.soort === "een" ? (
              <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:gap-8">
                <HonderdStippen gekleurd={s.aantal} />
                <ul className="grid gap-2 text-[14.5px] text-ink-soft">
                  <li className="flex items-center gap-2">
                    <span className="h-3 w-3 rounded-full bg-gold" aria-hidden />
                    onvoldoende
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-3 w-3 rounded-full bg-green-soft ring-1 ring-green/20" aria-hidden />
                    voldoende
                  </li>
                </ul>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                {s.tegels.map((t) => (
                  <div key={t.label} className="rounded-xl bg-sand p-4">
                    <p className="font-display text-[1.75rem] font-semibold leading-none text-ink">{t.tekst}</p>
                    <p className="mt-1.5 text-[14px] text-ink-soft">van de 100 haalden een onvoldoende</p>
                    <p className="mt-3 text-[14px] font-semibold text-ink">{t.label}</p>
                  </div>
                ))}
              </div>
            )}
          </figure>

          <p className="mt-5 text-[16px] font-medium leading-relaxed text-ink">
            {persoonlijk(s.uitweg, antwoorden)}
          </p>
          <p className="mt-2 text-[12.5px] leading-relaxed text-muted">{s.bron}</p>
        </>
      )}

      <div className="mt-7">
        <button type="button" onClick={onVerder} className={primaireKnop}>
          {persoonlijk(stap.knop, antwoorden)}
          <ArrowRight className="h-[18px] w-[18px]" />
        </button>
      </div>
    </div>
  );
}

/* ── Scherm: geruststelling na de ouderpijn ────────────── */

export function GeruststellingScherm({
  stap,
  antwoorden,
  kopRef,
  onVerder,
}: {
  stap: Extract<Stap, { soort: "geruststelling" }>;
  antwoorden: Antwoorden;
  kopRef: React.RefObject<HTMLHeadingElement | null>;
  onVerder: () => void;
}) {
  const regels = geruststellingVoor(antwoorden);

  return (
    <div>
      <Vraagkop
        id={stap.id}
        vraag={persoonlijk(stap.vraag, antwoorden)}
        toelichting={stap.toelichting ? persoonlijk(stap.toelichting, antwoorden) : undefined}
        reactie={stap.reactie ? persoonlijk(stap.reactie(antwoorden), antwoorden) : undefined}
        kopRef={kopRef}
      />

      {regels.length > 0 && (
        <ul className="mt-7 grid gap-3">
          {regels.map((r, i) => (
            <li
              key={r.kop}
              className="animate-stap flex items-start gap-3.5 rounded-2xl border border-line bg-white p-4 sm:p-5"
              // Eén voor één in beeld: elke zorg krijgt even zijn eigen moment.
              style={{ animationDelay: `${150 + i * 150}ms` }}
            >
              <span className="grid h-8 w-8 flex-none place-items-center rounded-full bg-green-soft">
                <Check className="h-4 w-4 text-green-deep" />
              </span>
              <div>
                <p className="text-[15.5px] font-semibold text-ink">{persoonlijk(r.kop, antwoorden)}</p>
                <p className="mt-1 text-[15px] leading-relaxed text-ink-soft">
                  {persoonlijk(r.tekst, antwoorden)}
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}

      <figure
        className="animate-stap mt-6 flex items-center gap-4 rounded-2xl bg-sand px-5 py-4 sm:px-6"
        style={{ animationDelay: `${150 + regels.length * 150}ms` }}
      >
        <Image
          src={adamHeadshot}
          alt="Adam"
          placeholder="blur"
          sizes="64px"
          className="h-16 w-16 flex-none rounded-full object-cover"
        />
        <div>
          <blockquote className="text-[15.5px] leading-relaxed text-ink">
            &ldquo;{persoonlijk(stap.citaat, antwoorden)}&rdquo;
          </blockquote>
          <figcaption className="mt-1.5 text-[13px] text-muted">{stap.afzender}</figcaption>
        </div>
      </figure>

      <div className="mt-7">
        <button type="button" onClick={onVerder} className={primaireKnop}>
          {persoonlijk(stap.knop, antwoorden)}
          <ArrowRight className="h-[18px] w-[18px]" />
        </button>
      </div>
    </div>
  );
}

/* ── Scherm: persoonlijke grafiek na de cijfervraag ────── */

/** Het cijfer waarop een toets voldoende is. */
const VOLDOENDE = 5.5;

export function GrafiekScherm({
  stap,
  antwoorden,
  kopRef,
  onVerder,
}: {
  stap: Extract<Stap, { soort: "grafiek" }>;
  antwoorden: Antwoorden;
  kopRef: React.RefObject<HTMLHeadingElement | null>;
  onVerder: () => void;
}) {
  const data = grafiekVoor(antwoorden);
  // De staven groeien even na het openen van het scherm, zodat het oog de stijging ziet.
  const [getekend, setGetekend] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setGetekend(true), 150);
    return () => clearTimeout(t);
  }, []);

  const staven = data
    ? [
        { naam: "Nu", ...data.nu, balk: "bg-sand-2", tekst: "text-ink-soft" },
        { naam: "Met onze hulp", ...data.straks, balk: "bg-green", tekst: "text-green-deep" },
      ]
    : [];

  return (
    <div>
      <Vraagkop
        id={stap.id}
        vraag={persoonlijk(stap.vraag, antwoorden)}
        toelichting={stap.toelichting ? persoonlijk(stap.toelichting, antwoorden) : undefined}
        reactie={stap.reactie ? persoonlijk(stap.reactie(antwoorden), antwoorden) : undefined}
        kopRef={kopRef}
      />

      {data && (
        <figure
          className="mt-7 rounded-2xl border border-line bg-white px-5 pb-5 pt-5 sm:px-7"
          aria-label={`Nu: ${data.nu.label}. Met onze hulp gemiddeld: ${data.straks.label}.`}
        >
          <span className="inline-flex rounded-full bg-green-soft px-3 py-1 text-[13px] font-semibold text-green-deep">
            Gemiddeld +{data.erbij} punten
          </span>

          <div className="relative mt-10 h-[200px]" aria-hidden>
            {/* De voldoende-lijn: zo ziet de ouder meteen of het kind erboven komt. */}
            <div
              className="absolute inset-x-0 border-t-2 border-dashed border-green/35"
              style={{ bottom: `${VOLDOENDE * 10}%` }}
            >
              <span className="absolute -top-[22px] left-0 text-[12.5px] font-medium text-muted">
                voldoende
              </span>
            </div>

            <div className="absolute inset-0 flex items-end justify-around">
              {staven.map((s) => {
                const hoogte = getekend ? `${s.waarde * 10}%` : "0%";
                return (
                  <div key={s.naam} className="relative h-full w-[34%]">
                    <div
                      className={cn(
                        "absolute bottom-0 w-full rounded-t-xl transition-[height] duration-700 ease-out motion-reduce:transition-none",
                        s.balk,
                      )}
                      style={{ height: hoogte }}
                    />
                    <span
                      className={cn(
                        "absolute w-full text-center font-display text-[15px] font-semibold transition-[bottom] duration-700 ease-out motion-reduce:transition-none",
                        s.tekst,
                      )}
                      style={{ bottom: `calc(${hoogte} + 8px)` }}
                    >
                      {/* Wit vlak, zodat de voldoende-lijn het getal niet doorkruist. */}
                      <span className="rounded-md bg-white px-1.5">{s.label}</span>
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-3 flex justify-around border-t border-line pt-3 text-[14px] font-medium text-ink-soft" aria-hidden>
            {staven.map((s) => (
              <span key={s.naam} className="w-[34%] text-center">
                {s.naam}
              </span>
            ))}
          </div>
        </figure>
      )}

      <p className="mt-5 text-[15px] leading-relaxed text-ink-soft">{persoonlijk(stap.noot, antwoorden)}</p>
      <p className="mt-2 text-[12.5px] text-muted">{persoonlijk(stap.bron, antwoorden)}</p>

      <div className="mt-7">
        <button type="button" onClick={onVerder} className={primaireKnop}>
          {persoonlijk(stap.knop, antwoorden)}
          <ArrowRight className="h-[18px] w-[18px]" />
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
