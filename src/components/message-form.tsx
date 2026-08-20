"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { site } from "@/lib/site";
import { cn } from "@/components/ui";

const fieldClass =
  "w-full rounded-xl border border-line bg-cream px-3.5 py-3 text-[15px] text-ink transition-shadow focus:border-green focus:outline-none focus:ring-[3px] focus:ring-green-soft";
const labelClass = "mb-1.5 block text-[13px] font-semibold text-ink-soft";

export function MessageForm({ kind }: { kind: "contact" | "docent" }) {
  const router = useRouter();
  const [status, setStatus] = useState<"idle" | "submitting" | "error">("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setError("");
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());
    try {
      const res = await fetch("/api/intake", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, type: kind }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error ?? "Er ging iets mis. Probeer het opnieuw.");
      }
      router.push("/bedankt");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Er ging iets mis.");
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="rounded-2xl border border-line bg-white p-7 shadow-[0_18px_50px_-24px_rgba(27,26,22,0.28)]"
    >
      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <label htmlFor="naam" className={labelClass}>Naam</label>
          <input id="naam" name="naam" className={fieldClass} placeholder="Voor- en achternaam" autoComplete="name" required />
        </div>
        <div>
          <label htmlFor="telefoon" className={labelClass}>Telefoon</label>
          <input id="telefoon" name="telefoon" type="tel" inputMode="tel" className={fieldClass} placeholder="06 1234 5678" autoComplete="tel" required={kind === "docent"} />
        </div>
      </div>

      <div className="mt-3">
        <label htmlFor="email" className={labelClass}>E-mailadres</label>
        <input id="email" name="email" type="email" inputMode="email" className={fieldClass} placeholder="naam@email.nl" autoComplete="email" required />
      </div>

      {kind === "docent" && (
        <div className="mt-3">
          <label htmlFor="vakken" className={labelClass}>Welke vakken en niveaus geef je les?</label>
          <input id="vakken" name="vakken" className={fieldClass} placeholder="Bijv. wiskunde & natuurkunde, havo/vwo" required />
        </div>
      )}

      <div className="mt-3">
        <label htmlFor="bericht" className={labelClass}>
          {kind === "docent" ? "Vertel kort iets over jezelf" : "Uw bericht"}
        </label>
        <textarea
          id="bericht"
          name="bericht"
          rows={5}
          className={cn(fieldClass, "resize-y")}
          placeholder={kind === "docent" ? "Je ervaring, opleiding en motivatie…" : "Waar kunnen we u mee helpen?"}
          required
        />
      </div>

      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />

      {status === "error" && (
        <p role="alert" className="mt-3 rounded-lg bg-[#fdecec] px-3.5 py-2.5 text-sm text-[#a3271f]">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-green px-6 py-3.5 text-base font-semibold text-white shadow-[0_10px_24px_-10px_rgba(14,107,79,0.6)] transition-all duration-150 hover:bg-green-deep disabled:cursor-not-allowed disabled:opacity-70"
      >
        {status === "submitting"
          ? "Bezig met versturen…"
          : kind === "docent"
            ? "Verstuur mijn aanmelding"
            : "Verstuur bericht"}
      </button>

      <p className="mt-3 text-center text-[12.5px] text-muted">
        Of bel direct:{" "}
        <a href={site.phoneHref} className="font-semibold text-ink hover:text-green">
          {site.phoneDisplay}
        </a>{" "}
        · {site.hours}
      </p>
    </form>
  );
}
