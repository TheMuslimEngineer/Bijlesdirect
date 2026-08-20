"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { nav, site } from "@/lib/site";
import { ButtonLink, cn } from "@/components/ui";
import { Phone } from "@/components/icons";
import { BrandLogo } from "@/components/logo";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 backdrop-blur-md transition-[border-color,box-shadow] duration-300",
        scrolled
          ? "border-b border-line bg-cream/85 shadow-[0_6px_24px_-18px_rgba(0,0,0,0.3)]"
          : "border-b border-transparent bg-cream/80",
      )}
    >
      <div className="mx-auto flex h-[74px] w-full max-w-6xl items-center justify-between px-6">
        <BrandLogo />

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Hoofdmenu">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-[15px] font-medium text-ink-soft transition-colors hover:text-green"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={site.phoneHref}
            className="hidden items-center gap-2 text-[15px] font-semibold text-ink sm:flex"
          >
            <Phone className="h-[18px] w-[18px] text-green" />
            <span className="hidden md:inline">{site.phoneDisplay}</span>
          </a>
          <span className="hidden sm:block">
            <ButtonLink href="/slagingscheck" className="whitespace-nowrap px-5 py-3 text-[15px]">
              Gratis Slagingscheck
            </ButtonLink>
          </span>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Menu sluiten" : "Menu openen"}
            aria-expanded={open}
            className="grid h-11 w-11 place-items-center rounded-xl border border-line text-ink lg:hidden"
          >
            <span className="relative block h-3.5 w-5">
              <span className={cn("absolute left-0 h-0.5 w-5 bg-ink transition-all", open ? "top-1.5 rotate-45" : "top-0")} />
              <span className={cn("absolute left-0 top-1.5 h-0.5 w-5 bg-ink transition-all", open && "opacity-0")} />
              <span className={cn("absolute left-0 h-0.5 w-5 bg-ink transition-all", open ? "top-1.5 -rotate-45" : "top-3")} />
            </span>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          "overflow-hidden border-t border-line bg-cream transition-[max-height] duration-300 lg:hidden",
          open ? "max-h-[480px]" : "max-h-0 border-t-transparent",
        )}
      >
        <nav className="flex flex-col gap-1 px-6 py-4" aria-label="Mobiel menu">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-3 text-base font-medium text-ink-soft hover:bg-sand"
            >
              {item.label}
            </Link>
          ))}
          <div className="mt-3 flex flex-col gap-2.5">
            <ButtonLink href="/slagingscheck" className="w-full">
              Vraag een gratis Slagingscheck aan
            </ButtonLink>
            <a
              href={site.phoneHref}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-line py-3.5 font-semibold text-ink"
            >
              <Phone className="h-[18px] w-[18px] text-green" /> {site.phoneDisplay}
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
