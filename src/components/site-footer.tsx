import Link from "next/link";
import { site, portaal } from "@/lib/site";
import { programma } from "@/config/programma";
import { BrandLogo } from "@/components/logo";

const cols = [
  {
    title: "Het programma",
    links: [
      { label: "Het Wiskunde Slagingsprogramma", href: "/slagingsprogramma" },
      { label: "Alle programma's", href: "/programmas" },
      { label: "Onze aanpak", href: "/hoe-het-werkt" },
      { label: "Prijs & garantie", href: "/prijs-en-garantie" },
      { label: "Premium 1-op-1", href: "/premium" },
    ],
  },
  {
    title: "Bijlesdirect",
    links: [
      { label: "Over ons", href: "/over-ons" },
      { label: "Reviews", href: "/reviews" },
      { label: "Veelgestelde vragen", href: "/faq" },
      { label: "Blog", href: "/blog" },
      { label: "Docent worden", href: "/docent-worden" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-line bg-sand">
      <div className="mx-auto w-full max-w-6xl px-6 py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div>
            <BrandLogo />
            <p className="mt-4 max-w-xs text-[15px] text-ink-soft">
              Examentraining wiskunde voor HAVO en VWO. {programma.duurWeken} weken persoonlijke
              begeleiding, met slagingsgarantie.
            </p>
          </div>

          {cols.map((col) => (
            <div key={col.title}>
              <h5 className="mb-4 font-sans text-[13px] font-semibold uppercase tracking-[0.1em] text-muted">
                {col.title}
              </h5>
              {col.links.map((l) => (
                <Link
                  key={l.label}
                  href={l.href}
                  className="mb-2.5 block text-[15px] text-ink-soft transition-colors hover:text-green"
                >
                  {l.label}
                </Link>
              ))}
            </div>
          ))}

          <div>
            <h5 className="mb-4 font-sans text-[13px] font-semibold uppercase tracking-[0.1em] text-muted">
              Contact
            </h5>
            <a href={site.phoneHref} className="mb-2.5 block text-[15px] text-ink-soft hover:text-green">
              {site.phoneDisplay}
            </a>
            <a href={`mailto:${site.email}`} className="mb-2.5 block text-[15px] text-ink-soft hover:text-green">
              {site.email}
            </a>
            <a href={site.whatsapp} className="mb-2.5 block text-[15px] text-ink-soft hover:text-green">
              WhatsApp
            </a>
            <Link href="/contact" className="mb-2.5 block text-[15px] text-ink-soft hover:text-green">
              Contactpagina
            </Link>
            <a
              href={portaal.loginUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mb-2.5 block text-[15px] text-ink-soft hover:text-green"
            >
              Inloggen (huidige leerlingen)
            </a>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-line pt-6 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
          <span>
            © {new Date().getFullYear()} Bijlesdirect · KVK {site.kvk}
          </span>
          <div className="flex gap-5">
            <Link href="/privacy" className="hover:text-green">
              Privacy
            </Link>
            <Link href="/voorwaarden" className="hover:text-green">
              Voorwaarden
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
