import { Container, ButtonLink, cn } from "@/components/ui";
import { rating, gezinnen, site, type Faq } from "@/lib/site";
import { ArrowRight, Check, Users } from "@/components/icons";
import { Gloed } from "@/components/muis-gloed";
import {
  programma,
  plekken,
  prijzen,
  waardestapel,
  garantie,
  toonSchaarste,
  schaarsteNiveau,
  euro,
} from "@/config/programma";

/**
 * Bewijsbalk — beantwoordt "wie zijn jullie en waarom zou ik jullie geloven"
 * meteen onder de hero.
 *
 * Bewust geen kaartenrij: dit zijn vier feiten, geen vier producten. Een rij
 * kaarten geeft ze meer gewicht dan ze nodig hebben en maakt van de pagina
 * weer een raster.
 */
export function Bewijsbalk({ className }: { className?: string }) {
  const feiten = [
    { kop: `${rating.score}/5`, uitleg: `gemiddeld uit ${rating.count}+ reviews` },
    { kop: String(gezinnen), uitleg: `gezinnen geholpen sinds ${site.opgericht}` },
    { kop: "98%", uitleg: "haalde een beter cijfer in 2025" },
  ];
  return (
    <div className={cn("border-y border-line bg-sand/60", className)}>
      <Container>
        <dl className="grid gap-x-8 gap-y-7 py-9 sm:grid-cols-3">
          {feiten.map((f) => (
            <div key={f.uitleg} className="flex items-baseline gap-3">
              <dt className="font-display text-[1.75rem] font-semibold leading-none text-green-deep">
                {f.kop}
              </dt>
              <dd className="text-[14.5px] leading-snug text-ink-soft">{f.uitleg}</dd>
            </div>
          ))}
        </dl>
      </Container>
    </div>
  );
}

/**
 * Inschrijfstatus-badge. Zo ziet een ouder meteen dat er ingeschreven wordt en
 * dat een plek dus niet vanzelfsprekend is.
 */
export function InschrijfBadge({
  label,
  open,
  className,
}: {
  label: string;
  open: boolean;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[12.5px] font-medium",
        open ? "bg-green-soft text-green-deep" : "bg-sand-2 text-muted",
        className,
      )}
    >
      {open && <span className="h-1.5 w-1.5 rounded-full bg-green" aria-hidden />}
      {label}
    </span>
  );
}

/**
 * Schaarste-pill: "Nog X van de Y plekken beschikbaar".
 *
 * Verbergt zichzelf zolang alle plekken nog vrij zijn — zie `toonSchaarste`
 * in de config voor het waarom.
 */
export function SchaarstePill({
  className,
  variant = "groep",
}: {
  className?: string;
  variant?: "groep" | "premium";
}) {
  const premium = variant === "premium";

  if (!(premium ? toonSchaarste.premium : toonSchaarste.groep)) return null;

  const beschikbaar = premium ? plekken.premiumBeschikbaar : plekken.beschikbaar;
  const totaal = premium ? plekken.premiumTotaal : plekken.totaal;

  // Groen = nog ruim plek, geel = wordt krap, rood = bijna vol.
  // Premium heeft maar 3 plekken: daar is nooit "ruim plek", dus minstens geel.
  const basis = schaarsteNiveau(beschikbaar, totaal);
  const niveau = premium && basis === "groen" ? "geel" : basis;
  const stipKleur = {
    groen: "bg-green",
    geel: "bg-gold",
    rood: "bg-red",
  }[niveau];

  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-line bg-white px-4 py-2 text-[13.5px] font-medium text-ink",
        className,
      )}
    >
      <span className="relative flex h-2 w-2" aria-hidden>
        <span className={cn("absolute inline-flex h-full w-full rounded-full opacity-60", stipKleur)} />
        <span className={cn("relative inline-flex h-2 w-2 rounded-full", stipKleur)} />
      </span>
      Nog {beschikbaar} van de {totaal} {premium ? "Premium-plekken" : "plekken"} beschikbaar
    </span>
  );
}

/** Uitklapbare veelgestelde vragen. Een antwoord kan uit meerdere alinea's bestaan. */
export function FaqLijst({ vragen, className }: { vragen: Faq[]; className?: string }) {
  return (
    <div
      className={cn(
        "max-w-3xl divide-y divide-line overflow-hidden rounded-2xl border border-line bg-white",
        className,
      )}
    >
      {vragen.map((f) => (
        <details key={f.q} className="group">
          <summary className="flex cursor-pointer items-center justify-between gap-4 px-6 py-5 text-[1.05rem] font-medium text-ink marker:content-none">
            {f.q}
            <span className="grid h-7 w-7 flex-none place-items-center rounded-full border border-line text-green transition-transform group-open:rotate-45">
              +
            </span>
          </summary>
          <div className="space-y-3 px-6 pb-5 text-[15.5px] text-ink-soft">
            {(Array.isArray(f.a) ? f.a : [f.a]).map((alinea, i) => (
              <p key={i}>{alinea}</p>
            ))}
          </div>
        </details>
      ))}
    </div>
  );
}

/** De getrapte garantie, met voorwaarden zichtbaar. */
export function GarantieBlok({ compact = false }: { compact?: boolean }) {
  return (
    <div className="overflow-hidden rounded-[28px] border border-line bg-white">
      <div className="grid lg:grid-cols-[1.1fr_0.9fr]">
        <div className="p-8 sm:p-10">
          <h2 className="text-[clamp(1.6rem,3vw,2.25rem)] text-ink">De garantie</h2>
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
          heeft u nog geen diagnose, geen studieplan, geen coach, geen ouderrapport en geen garantie.
        </p>
      </div>
    </div>
  );
}

/** Slot-CTA met schaarste en deadline. */
export function ProgrammaCTA({
  title = "De eerste stap is een gesprek van dertig minuten",
  body,
  secundair = { label: "Bekijk het programma", href: "/slagingsprogramma" },
  schaarste,
  recap,
}: {
  title?: string;
  body?: string;
  /** Slotherhaling: waar de ouder precies ja tegen zegt. Verschijnt boven de knoppen. */
  recap?: string[];
  /** Tweede knop. Geef `null` om hem te verbergen (bijv. op de pagina waar hij naartoe wijst). */
  secundair?: { label: string; href: string } | null;
  /** Tekst in de schaarste-pill bovenaan. Geef `null` om de pill te verbergen. */
  schaarste?: string | null;
}) {
  const standaard = `De eerstvolgende groep start ${programma.start}. Inschrijving sluit ${programma.inschrijvingSluit}, zodat we ${programma.duurWeken} volle weken hebben vóór het examen.`;

  /* Niets meegegeven? Dan bepaalt de config of de pill zin heeft. */
  const schaarsteTekst =
    schaarste === undefined
      ? toonSchaarste.groep
        ? `Nog ${plekken.beschikbaar} van de ${plekken.totaal} plekken beschikbaar`
        : null
      : schaarste;

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
            {schaarsteTekst && (
              <div className="mb-6 flex justify-center">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-[13.5px] font-medium text-white/90">
                  <Users className="h-4 w-4" />
                  {schaarsteTekst}
                </span>
              </div>
            )}
            <h2 className="text-[clamp(1.9rem,4vw,3rem)] text-white">{title}</h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-white/80">{body ?? standaard}</p>

            {recap && (
              <ul className="mx-auto mt-8 grid max-w-xl gap-2.5 text-left">
                {recap.map((r) => (
                  <li key={r} className="flex items-start gap-3 text-[15.5px] leading-relaxed text-white/85">
                    <Check className="mt-0.5 h-[18px] w-[18px] flex-none text-white/60" />
                    {r}
                  </li>
                ))}
              </ul>
            )}

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
