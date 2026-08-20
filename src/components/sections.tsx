import { Container, ButtonLink, Stars, cn } from "@/components/ui";
import { stats, site, type Review } from "@/lib/site";

export function ReviewPlatforms({ className }: { className?: string }) {
  const link = "font-semibold text-green-deep underline-offset-2 hover:underline";
  return (
    <p className={cn("text-[14px] text-muted", className)}>
      Lees onze reviews ook op{" "}
      <a href={site.trustpilotUrl} target="_blank" rel="noopener noreferrer" className={link}>
        Trustpilot
      </a>{" "}
      en{" "}
      <a href={site.googleUrl} target="_blank" rel="noopener noreferrer" className={link}>
        Google
      </a>
      .
    </p>
  );
}

export function StatsBand() {
  return (
    <Container>
      <div className="grid grid-cols-2 gap-8 rounded-[28px] bg-green px-8 py-14 text-center text-white md:grid-cols-4 md:px-11 md:py-16">
        {stats.map((s) => (
          <div key={s.label}>
            <div className="font-display text-[clamp(2.4rem,4.4vw,3.5rem)] font-semibold leading-none">
              {s.value}
            </div>
            <div className="mt-2.5 text-[14.5px] text-white/80">{s.label}</div>
          </div>
        ))}
      </div>
    </Container>
  );
}

export function FinalCTA({
  title = "Klaar om uw kind een voorsprong te geven?",
  body = "Vraag vandaag de gratis Slagingscheck aan. We denken vrijblijvend met u mee — zonder verplichtingen.",
}: {
  title?: string;
  body?: string;
}) {
  return (
    <section className="py-20">
      <Container>
        <div className="relative overflow-hidden rounded-[28px] bg-ink px-8 py-16 text-center text-white sm:px-12">
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(circle at 80% 20%, rgba(14,107,79,0.45), transparent 55%)",
            }}
          />
          <div className="relative">
            <h2 className="text-[clamp(1.9rem,4vw,3rem)] text-white">{title}</h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-white/80">{body}</p>
            <div className="mt-8 flex flex-wrap justify-center gap-3.5">
              <ButtonLink href="/slagingscheck" variant="white">
                Vraag gratis Slagingscheck aan
              </ButtonLink>
              <ButtonLink
                href="https://wa.me/31642942121"
                variant="ghost"
                className="border-white/30 text-white hover:border-white"
              >
                Stuur een WhatsApp
              </ButtonLink>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export function ReviewCard({ review }: { review: Review }) {
  return (
    <figure className="flex h-full flex-col rounded-2xl border border-line bg-white p-6 shadow-[0_8px_24px_-18px_rgba(27,26,22,0.3)]">
      <figcaption className="font-display text-[1.05rem] font-semibold text-ink">{review.name}</figcaption>
      <Stars count={review.stars} className="my-2.5" />
      <p className="text-[1.05rem] font-semibold text-ink">{review.title}</p>
      <blockquote className="mt-2 flex-1 text-[15px] leading-relaxed text-ink-soft">{review.body}</blockquote>
      <p className="mt-4 text-[13px] text-muted">Datum van ervaring: {review.date}</p>
    </figure>
  );
}
