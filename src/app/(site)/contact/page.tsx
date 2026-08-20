import type { Metadata } from "next";
import { Container } from "@/components/ui";
import { PageHeader } from "@/components/page-header";
import { MessageForm } from "@/components/message-form";
import { Phone, Mail, WhatsApp, Clock } from "@/components/icons";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact — neem contact op met Bijlesdirect",
  description:
    "Vragen over de examentraining wiskunde of het Slagingsprogramma? Bel, mail of WhatsApp Bijlesdirect, of stuur een bericht via het contactformulier.",
  alternates: { canonical: "/contact" },
};

const channels = [
  { icon: Phone, label: "Telefoon", value: site.phoneDisplay, href: site.phoneHref },
  { icon: WhatsApp, label: "WhatsApp", value: "Stuur een bericht", href: site.whatsapp },
  { icon: Mail, label: "E-mail", value: site.email, href: `mailto:${site.email}` },
];

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="We helpen u graag verder."
        intro="Liever even persoonlijk overleggen? Bel of WhatsApp ons direct, of laat een bericht achter. We reageren snel — meestal binnen één werkdag."
      />

      <section className="py-20">
        <Container>
          <div className="grid items-start gap-12 lg:grid-cols-[0.85fr_1fr] lg:gap-16">
            <div>
              <div className="grid gap-4">
                {channels.map((c) => (
                  <a
                    key={c.label}
                    href={c.href}
                    className="flex items-center gap-4 rounded-2xl border border-line bg-white p-5 transition-all hover:-translate-y-0.5 hover:border-green"
                  >
                    <span className="grid h-12 w-12 flex-none place-items-center rounded-xl bg-green-soft text-green-deep">
                      <c.icon className="h-[22px] w-[22px]" />
                    </span>
                    <span>
                      <span className="block text-[13px] font-semibold uppercase tracking-[0.08em] text-muted">
                        {c.label}
                      </span>
                      <span className="block text-[1.05rem] font-medium text-ink">{c.value}</span>
                    </span>
                  </a>
                ))}
              </div>

              <div className="mt-6 flex items-start gap-3 rounded-2xl bg-sand p-5">
                <Clock className="mt-0.5 h-5 w-5 flex-none text-green" />
                <div>
                  <p className="font-medium text-ink">Bereikbaarheid</p>
                  <p className="text-[15px] text-ink-soft">{site.hours}</p>
                  <p className="mt-2 text-sm text-muted">KVK {site.kvk}</p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="kop-tekst text-2xl text-ink">Stuur een bericht</h2>
              <p className="mb-6 mt-2 text-ink-soft">Vul het formulier in en we nemen snel contact met u op.</p>
              <MessageForm kind="contact" />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
