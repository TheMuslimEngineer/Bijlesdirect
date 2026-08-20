# Bijlesdirect — website

Premium website voor Bijlesdirect, gebouwd met **Next.js 16**, **TypeScript** en **Tailwind CSS v4**.
Ontwerprichting: *Helder & Warm* (crème, ink, groen — Fraunces + Inter).

## Lokaal draaien

```bash
npm install
npm run dev      # http://localhost:3000
```

Productiebuild:

```bash
npm run build
npm start
```

## Zelf content aanpassen

Bijna alle teksten en cijfers staan op één plek, zodat je ze makkelijk zelf kunt bijwerken.

| Wat | Bestand |
| --- | --- |
| Cijfers, reviews, diensten, FAQ, contactgegevens | `src/lib/site.ts` |
| SEO-pagina's per vak & niveau | `src/lib/landing.ts` |
| Blogartikelen | `content/blog/*.md` |

### Cijfers / reviews bijwerken (± elk kwartaal)

Open `src/lib/site.ts` en pas de waarden aan in `stats` (bijv. aantal geholpen gezinnen),
`rating` (beoordeling/aantal) en `reviews` (voeg nieuwe reviews toe of werk ze bij).

### Een blogartikel toevoegen

Maak een nieuw bestand aan in `content/blog/`, bijvoorbeeld `mijn-artikel.md`:

```markdown
---
title: "Titel van het artikel"
description: "Korte samenvatting voor Google en social media."
date: "2026-07-01"
author: "Bijlesdirect"
category: "Studietips"
---

Hier komt de inhoud van het artikel. Gebruik gewone Markdown:

## Een tussenkop

Een alinea met **vetgedrukte** tekst en een [link](/aanmelden).
```

Het artikel verschijnt automatisch op `/blog`. De bestandsnaam wordt de URL
(`/blog/mijn-artikel`).

### Een vak of niveau toevoegen

Voeg een item toe aan de lijst in `src/lib/landing.ts`. Er wordt automatisch een
vindbare pagina aangemaakt op `/bijles/<slug>`, inclusief in de sitemap.

## Formulieren (intake / contact / tutor)

Inzendingen worden per e-mail verstuurd via [Resend](https://resend.com).

1. Maak een gratis Resend-account en API-key aan.
2. Kopieer `.env.example` naar `.env.local` en vul `RESEND_API_KEY` in.
3. Verifieer het domein `bijlesdirect.nl` in Resend en zet `INTAKE_FROM` op een eigen adres.

Zonder API-key blijft het formulier werken: aanvragen worden dan gelogd in plaats van gemaild.

## Structuur

```
src/
  app/            # pagina's (App Router)
    api/intake/   # formulier-endpoint (Resend)
    bijles/[slug] # SEO-landingspagina's
    blog/         # blogoverzicht + artikelen
  components/     # herbruikbare UI
  lib/            # content & data (site.ts, landing.ts, blog.ts)
content/blog/     # blogartikelen (Markdown)
```
