import { Container, ButtonLink, Eyebrow, cn } from "@/components/ui";
import { ArrowRight, Check, Shield, Users } from "@/components/icons";
import { Gloed } from "@/components/muis-gloed";
import {
  programma,
  plekken,
  prijzen,
  waardestapel,
  garantie,
  euro,
} from "@/config/programma";

/** Schaarste-pill: "Nog X van de Y plekken beschikbaar" — voor het groeps- of Premium-programma. */
export function SchaarstePill({
  className,
  variant = "groep",
}: {
  className?: string;
  variant?: "groep" | "premium";
}) {
  const premium = variant === "premium";
  const beschikbaar = premium ? plekken.premiumBeschikbaar : plekken.beschikbaar;
  const totaal = premium ? plekken.premiumTotaal : plekken.totaal;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-line bg-white px-4 py-2 text-[13.5px] font-medium text-ink",
        className,
      )}
    >
      <span className="relative flex h-2 w-2" aria-hidden>
        <span className="absolute inline-flex h-full w-full rounded-full bg-gold opacity-60" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-gold" />
      </span>
      Nog {beschikbaar} van de {totaal} {premium ? "Premium-plekken" : "plekken"} beschikbaar
    </span>
  );
}

/** De getrapte garantie, met voorwaarden zichtbaar. */
export function GarantieBlok({ compact = false }: { compact?: boolean }) {
  return (
    <div className="overflow-hidden rounded-[28px] border border-line bg-white">
      <div className="grid lg:grid-cols-[1.1fr_0.9fr]">
        <div className="p-8 sm:p-10">
          <div className="mb-5 grid h-12 w-12 place-items-center rounded-xl bg-green-soft">
            <Shield className="h-6 w-6 text-green-deep" />
          </div>
          <Eyebrow>Onze garantie</Eyebrow>
          <h2 className="mt-3 text-[clamp(1.6rem,3vw,2.25rem)] text-ink">
            Wij durven dit op papier te zetten.
          </h2>
          <ol className="mt-7 grid gap-5">
            {garantie.stappen.map((s) => (
              <li key={s.stap} className="flex gap-4">
                <span className="grid h-8 w-8 flex-none place-items-center rounded-full bg-green font-display text-[15px] font-semibold text-white">
                  {s.stap}
                </span>
                <div>
                  <p className="font-display text-[1.15rem] font-semibold text-ink">{s.titel}</p>
                  <p className="mt-1 text-[15.5px] text-ink-soft">{s.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div className="border-t border-line bg-sand p-8 sm:p-10 lg:border-l lg:border-t-0">
          <p className="font-display text-lg font-semibold text-ink">Voorwaarden</p>
          <ul className="mt-4 grid gap-2.5">
            {garantie.voorwaarden.map((v) => (
              <li key={v} className="flex items-start gap-2.5 text-[15px] text-ink-soft">
                <Check className="mt-0.5 h-[18px] w-[18px] flex-none text-green" />
                {v}
              </li>
            ))}
          </ul>
          <p className="mt-5 border-t border-line pt-5 text-[14.5px] italic text-muted">
            {garantie.toelichting}
          </p>
          {!compact && (
            <ButtonLink href="/prijs-en-garantie" variant="ghost" className="mt-6 w-full">
              Lees de volledige voorwaarden
            </ButtonLink>
          )}
        </div>
      </div>
    </div>
  );
}

/** De volledige waardestapel met totaalwaarde en prijs. */
export function Waardestapel({ toonCta = true }: { toonCta?: boolean }) {
  return (
    <div>
      <div className="grid gap-4 md:grid-cols-2">
        {waardestapel.map((item, i) => (
          <div
            key={item.titel}
            className="stapel-kaart flex gap-4 rounded-2xl border border-line bg-white p-6"
          >
            <span className="grid h-8 w-8 flex-none place-items-center rounded-full bg-green-soft font-display text-[14px] font-semibold text-green-deep">
              {i + 1}
            </span>
            <div className="flex-1">
              <div className="flex items-start justify-between gap-3">
                <h3 className="font-display text-[1.15rem] font-semibold text-ink">{item.titel}</h3>
                <span className="stapel-prijs whitespace-nowrap font-display text-[15px] font-semibold text-muted">
                  {item.waarde === null ? "Inbegrepen" : euro(item.waarde)}
                </span>
              </div>
              <p className="mt-2 text-[15px] text-ink-soft">{item.beschrijving}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Totaal + prijs */}
      <div className="mt-6 overflow-hidden rounded-[28px] border border-line">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line bg-sand px-8 py-5">
          <span className="text-[1.05rem] font-medium text-ink-soft">Totale waarde</span>
          <span className="font-display text-[1.6rem] font-semibold text-muted line-through decoration-muted/50">
            {euro(prijzen.totaleWaarde)}
          </span>
        </div>
        <div className="bg-green px-8 py-9 text-white">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-[15px] text-white/80">Uw investering</p>
              <p className="mt-1 font-display text-[clamp(2.5rem,5vw,3.5rem)] font-semibold leading-none">
                {euro(prijzen.programma)}
              </p>
              <p className="mt-2 text-[15px] text-white/80">
                of {prijzen.termijnen.aantal} termijnen van {euro(prijzen.termijnen.bedrag)}
              </p>
            </div>
            {toonCta && (
              <ButtonLink href="/slagingscheck" variant="white">
                Vraag een gratis Slagingscheck aan
                <ArrowRight className="h-[18px] w-[18px]" />
              </ButtonLink>
            )}
          </div>
        </div>
      </div>

      {/* De vergelijking */}
      <div className="mt-6 rounded-2xl border border-line bg-sand p-7">
        <p className="text-[1.05rem] text-ink-soft">
          Een afgestudeerde bèta-professional inhuren voor {programma.lesurenTotaal} lesuren kost
          losstaand al <b className="font-semibold text-ink">{euro(prijzen.lesurenLosseWaarde)}</b>. Dan
          heeft u nog geen diagnose, geen studieplan, geen coach, geen ouderrapport — en geen garantie.
        </p>
      </div>
    </div>
  );
}

/** Slot-CTA met schaarste en deadline. */
export function ProgrammaCTA({
  title = "Klaar om dit uit handen te geven?",
  body,
  secundair = { label: "Liever volledig 1-op-1?", href: "/premium" },
  schaarste,
}: {
  title?: string;
  body?: string;
  /** Tweede knop. Geef `null` om hem te verbergen (bijv. op de pagina waar hij naartoe wijst). */
  secundair?: { label: string; href: string } | null;
  /** Tekst in de schaarste-pill bovenaan. Geef `null` om de pill te verbergen. */
  schaarste?: string | null;
}) {
  const standaard = `De eerstvolgende groep start ${programma.start}. Inschrijving sluit ${programma.inschrijvingSluit}, zodat we ${programma.duurWeken} volle weken hebben vóór het examen.`;
  return (
    <section className="py-20">
      <Container>
        {/* Donker vlak: hier heeft een gloed genoeg tonale ruimte om te werken. */}
        <Gloed
          className="relative overflow-hidden rounded-[28px] bg-ink px-8 py-16 text-center text-white [--gloed-kleur:rgb(14_107_79_/_0.55)] [--gloed-straal:520px] sm:px-12"
        >
          {/* Rustpositie van het licht; de muisgloed komt hier bovenop. */}
          <div
            className="pointer-events-none absolute inset-0 -z-10"
            style={{
              background:
                "radial-gradient(circle at 80% 20%, rgba(14,107,79,0.45), transparent 55%)",
            }}
          />
          <div className="relative">
            {schaarste !== null && (
              <div className="mb-6 flex justify-center">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-[13.5px] font-medium text-white/90">
                  <Users className="h-4 w-4" />
                  {schaarste ?? `Nog ${plekken.beschikbaar} van de ${plekken.totaal} plekken beschikbaar`}
                </span>
              </div>
            )}
            <h2 className="text-[clamp(1.9rem,4vw,3rem)] text-white">{title}</h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-white/80">{body ?? standaard}</p>
            <div className="mt-8 flex flex-wrap justify-center gap-3.5">
              <ButtonLink href="/slagingscheck" variant="white">
                Vraag een gratis Slagingscheck aan
                <ArrowRight className="h-[18px] w-[18px]" />
              </ButtonLink>
              {secundair && (
                <ButtonLink
                  href={secundair.href}
                  variant="ghost"
                  className="border-white/30 text-white hover:border-white"
                >
                  {secundair.label}
                </ButtonLink>
              )}
            </div>
            <p className="mt-6 text-[14px] text-white/60">
              Een gratis gesprek van 30 minuten. Geen verplichtingen.
            </p>
          </div>
        </Gloed>
      </Container>
    </section>
  );
}
