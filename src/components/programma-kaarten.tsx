import Link from "next/link";
import { ArrowRight, Shield } from "@/components/icons";
import { garantieLabels, type ProgrammaItem } from "@/config/programmas";
import { euro } from "@/config/programma";

/** Eén programmakaart uit de ladder. */
export function ProgrammaKaart({ p }: { p: ProgrammaItem }) {
  const garantie = garantieLabels[p.garantie];

  const inhoud = (
    <>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="font-display text-[1.3rem] font-semibold text-ink">{p.naam}</h3>
            {p.vlaggenschip && (
              <span className="rounded-full bg-gold px-2.5 py-0.5 text-[11.5px] font-semibold text-white">
                Vlaggenschip
              </span>
            )}
            {p.instap && (
              <span className="rounded-full bg-green-soft px-2.5 py-0.5 text-[11.5px] font-semibold text-green-deep">
                Maak kennis
              </span>
            )}
          </div>
          <p className="mt-1 text-[13.5px] text-muted">
            {p.periode} · {p.duur}
          </p>
        </div>
        <span className="whitespace-nowrap font-display text-[1.6rem] font-semibold text-ink">
          {euro(p.prijs)}
        </span>
      </div>

      <p className="mt-3 flex-1 text-[15px] text-ink-soft">{p.belofte}</p>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-line px-3 py-1 text-[12.5px] font-medium text-ink-soft">
          <Shield className="h-3.5 w-3.5 text-green" />
          {garantie.label}
        </span>
        {!p.actief && (
          <span className="rounded-full bg-sand-2 px-3 py-1 text-[12.5px] font-medium text-muted">
            Volgend seizoen
          </span>
        )}
      </div>

      {p.actief && p.href && (
        <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-green">
          Bekijk het programma
          <ArrowRight className="h-4 w-4" />
        </span>
      )}
    </>
  );

  const basis =
    "flex h-full flex-col rounded-2xl border p-7 transition-all " +
    (p.actief
      ? "border-line bg-white hover:-translate-y-1 hover:shadow-[0_18px_50px_-24px_rgba(27,26,22,0.28)]"
      : "border-line/70 bg-sand/50");

  if (p.actief && p.href) {
    return (
      <Link href={p.href} className={basis}>
        {inhoud}
      </Link>
    );
  }
  return <div className={basis}>{inhoud}</div>;
}

/** Het volledige raster met programmakaarten. */
export function ProgrammaLadder({ items }: { items: ProgrammaItem[] }) {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {items.map((p) => (
        <ProgrammaKaart key={p.slug} p={p} />
      ))}
    </div>
  );
}
