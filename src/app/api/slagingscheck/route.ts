import { NextResponse } from "next/server";
import { slagingscheckSchema, eersteFoutmelding } from "@/components/slagingscheck/schema";
import {
  bepaalMarkering,
  bepaalRoute,
  label,
  optieLabels,
} from "@/components/slagingscheck/questions";
import type { Antwoorden } from "@/components/slagingscheck/types";
import { assemble, delen, type Gids } from "@/content/oudergids";
import { escapeHtml, mailAdres, omlijst, verstuur } from "@/lib/mail";
import { bewaarAanvraag } from "@/lib/supabase/opslag";
import { programma } from "@/config/programma";
import { site } from "@/lib/site";

/* ─────────────────────────────────────────────────────────
   Onderwerp — houdt echte leads en marktdata gescheiden
   ───────────────────────────────────────────────────────── */

const markeringTekst = {
  extra_screening: "extra screening",
  premium_kandidaat: "premium-kandidaat",
} as const;

function onderwerp(a: Antwoorden): string {
  const route = bepaalRoute(a);
  const wie = a.naamLeerling?.trim() || a.naam;
  const niveau = a.klas === "examen_vwo" ? "VWO" : a.klas === "examen_havo" ? "HAVO" : "";
  // Zijroute E heeft een eigen vakkenlijst (inclusief wiskunde), zijroute D niet.
  const vakstap = route === "ander_niveau" ? "niveau_vak" : "gevraagde_vakken";
  const vakken = optieLabels(vakstap, a.gevraagdeVakken).join(", ") || a.gevraagdVakAnders || "onbekend";

  switch (route) {
    case "hoofdroute": {
      const markering = bepaalMarkering(a);
      const staart = markering ? ` (${markeringTekst[markering]})` : "";
      return `[LEAD] Slagingscheck — ${wie}, ${niveau}, ${label(a.vak)}, staat ${label(a.cijfer)}${staart}`;
    }
    case "inhaalprogramma":
      return `[LEAD] Inhaalprogramma — ${wie}, klas 4 of 5`;
    case "ander_vak":
      return `[VRAAG] Ander vak — ${vakken}${niveau ? `, ${niveau} examen` : ""}`;
    case "ander_niveau":
      return `[VRAAG] Ander niveau — ${label(a.gevraagdNiveau)}, ${vakken}`;
  }
}

/* ─────────────────────────────────────────────────────────
   Notificatiemail — het volledige profiel, netjes opgemaakt
   ───────────────────────────────────────────────────────── */

function profielRegels(a: Antwoorden): [string, string][] {
  const route = bepaalRoute(a);
  const regels: [string, string][] = [
    ["Ingevuld door", a.voorWie === "leerling" ? "de leerling zelf" : "de ouder"],
    ["Klas", label(a.klas)],
  ];

  if (route === "ander_niveau") {
    regels.push(["Gevraagd niveau", label(a.gevraagdNiveau)]);
    regels.push(["Gevraagde vakken", optieLabels("niveau_vak", a.gevraagdeVakken).join(", ") || "—"]);
    if (a.gevraagdVakAnders) regels.push(["Toelichting vak", a.gevraagdVakAnders]);
  } else if (route === "ander_vak") {
    regels.push(["Gevraagde vakken", optieLabels("gevraagde_vakken", a.gevraagdeVakken).join(", ") || "—"]);
    if (a.gevraagdVakAnders) regels.push(["Toelichting vak", a.gevraagdVakAnders]);
    regels.push(["Huidig cijfer", label(a.cijfer)]);
    regels.push(["Wil aanbeveling", a.wilAanbeveling ? "ja" : "nee"]);
  } else {
    if (a.vak) regels.push(["Vak", label(a.vak)]);
    if (a.cijfer) regels.push(["Huidig cijfer", label(a.cijfer)]);
    if (a.sinds) regels.push(["Loopt", label(a.sinds)]);
    if (a.doel) regels.push(["Doel", label(a.doel)]);
    if (a.eerderBijles) regels.push(["Eerder bijles", label(a.eerderBijles)]);
    if (a.watWerkteNiet?.length) {
      regels.push(["Wat werkte niet", optieLabels("wat_werkte_niet", a.watWerkteNiet).join(" · ")]);
    }
    if (a.watWerkteNietAnders) regels.push(["Toelichting daarop", a.watWerkteNietAnders]);
    if (a.grootsteProbleem?.length) {
      regels.push(["Grootste probleem", optieLabels("grootste_probleem", a.grootsteProbleem).join(" · ")]);
    }
    if (a.ouderPijn?.length) {
      regels.push(["Waar de ouder tegenaan loopt", optieLabels("ouder_pijn", a.ouderPijn).join(" · ")]);
    }
    if (a.beschikbaarheid) regels.push(["Liefst bellen", label(a.beschikbaarheid)]);
  }

  // Vult de leerling zelf in, dan is er maar één naam — die van de leerling.
  const leerlingVultZelfIn = a.voorWie === "leerling";
  regels.push(
    ["—", "—"],
    [leerlingVultZelfIn ? "Naam leerling" : "Naam ouder", a.naam ?? "—"],
    ["E-mail", a.email ?? "—"],
    ["Telefoon", a.telefoon || "—"],
  );
  if (!leerlingVultZelfIn) regels.push(["Naam leerling", a.naamLeerling || "—"]);
  regels.push(["School", a.school || "—"], ["Opmerking", a.opmerking || "—"]);
  return regels;
}

/**
 * Eén regel met alle velden, gescheiden door puntkomma's. Zo kan Adam de
 * aanvragen per kwartaal uit zijn mailbox filteren en in een sheet plakken,
 * zolang er nog geen database achter zit.
 */
function dataRegel(a: Antwoorden): string {
  const velden = [
    new Date().toISOString().slice(0, 10),
    bepaalRoute(a),
    bepaalMarkering(a) ?? "",
    a.voorWie ?? "",
    a.klas ?? "",
    a.gevraagdNiveau ?? "",
    a.vak ?? "",
    (a.gevraagdeVakken ?? []).join("|"),
    a.gevraagdVakAnders ?? "",
    a.cijfer ?? "",
    a.sinds ?? "",
    a.doel ?? "",
    a.eerderBijles ?? "",
    (a.watWerkteNiet ?? []).join("|"),
    (a.grootsteProbleem ?? []).join("|"),
    (a.ouderPijn ?? []).join("|"),
    a.beschikbaarheid ?? "",
    a.school ?? "",
  ];
  return "DATA;" + velden.map((v) => String(v).replace(/;/g, ",")).join(";");
}

function notificatie(a: Antwoorden) {
  const regels = profielRegels(a);
  const markering = bepaalMarkering(a);

  const kop = markering
    ? `<p style="font-family:sans-serif;display:inline-block;background:#e4f0ea;color:#0a5340;border-radius:999px;padding:6px 14px;font-size:13px;font-weight:bold;margin:0 0 14px">
         ${markering === "extra_screening" ? "Extra screening — cijfer onder de 5" : "Premium-kandidaat — cijfer boven de 6,5"}
       </p>`
    : "";

  const html = `
    ${kop}
    <h2 style="font-family:sans-serif;margin:0 0 14px">${escapeHtml(onderwerp(a))}</h2>
    <table style="font-family:sans-serif;border-collapse:collapse;font-size:14px">
      ${regels
        .map(([k, v]) =>
          k === "—"
            ? `<tr><td colspan="2" style="padding:10px 0"><hr style="border:0;border-top:1px solid #e6e0d4"></td></tr>`
            : `<tr><td style="padding:5px 16px 5px 0;color:#6f6a5e;vertical-align:top;white-space:nowrap">${k}</td><td style="padding:5px 0"><strong>${escapeHtml(v)}</strong></td></tr>`,
        )
        .join("")}
    </table>
    <p style="font-family:sans-serif;color:#6f6a5e;font-size:13px;margin-top:18px">
      Programma: start ${programma.start}, inschrijving sluit ${programma.inschrijvingSluit}.
    </p>
    <pre style="font-family:monospace;font-size:11px;color:#8a8270;background:#f3efe6;padding:10px;border-radius:8px;white-space:pre-wrap">${escapeHtml(dataRegel(a))}</pre>
  `;

  const text = [
    onderwerp(a),
    "",
    ...regels.map(([k, v]) => (k === "—" ? "—" : `${k}: ${v}`)),
    "",
    dataRegel(a),
  ].join("\n");

  return { html, text };
}

/* ─────────────────────────────────────────────────────────
   Bevestigingsmail — dezelfde oudergids als op het scherm
   ───────────────────────────────────────────────────────── */

function gidsHtml(gids: Gids) {
  return gids.blokken
    .map((blok) => {
      const kop = blok.kop
        ? `<h2 style="font-size:18px;margin:26px 0 8px;color:#1b1a16">${escapeHtml(blok.kop)}</h2>`
        : "";
      const regels = blok.regels
        .map((r) => {
          const inhoud = delen(r.tekst)
            .map((d) =>
              d.vet
                ? `<strong>${escapeHtml(d.tekst)}</strong>`
                : escapeHtml(d.tekst).replace(/\n/g, "<br>"),
            )
            .join("");
          if (r.soort === "citaat") {
            return `<p style="font-size:15px;line-height:1.6;color:#1b1a16;font-style:italic;border-left:3px solid #0e6b4f;padding-left:14px;margin:12px 0">“${inhoud}”</p>`;
          }
          if (r.soort === "noot") {
            return `<p style="font-size:14px;line-height:1.6;color:#0a5340;background:#e4f0ea;border-radius:10px;padding:12px 14px;margin:12px 0">${inhoud}</p>`;
          }
          return `<p style="font-size:15px;line-height:1.65;color:#403d35;margin:0 0 12px">${inhoud}</p>`;
        })
        .join("");
      return kop + regels;
    })
    .join("");
}

function gidsText(gids: Gids) {
  return gids.blokken
    .map((blok) =>
      [blok.kop ?? "", ...blok.regels.map((r) => r.tekst.replace(/\*\*/g, ""))]
        .filter(Boolean)
        .join("\n\n"),
    )
    .join("\n\n---\n\n");
}

function bevestiging(a: Antwoorden) {
  const gids = assemble(a);
  const jeVorm = a.voorWie === "leerling";

  if (!gids) {
    // Zijroute: kort en eerlijk, geen gids.
    const body = `
      <h1 style="font-size:22px;margin:0 0 12px;color:#1b1a16">Dank u wel — we hebben het genoteerd.</h1>
      <p style="font-size:15px;line-height:1.65;color:#403d35;margin:0 0 14px">
        We houden bij welke vakken en niveaus het vaakst gevraagd worden. Dat bepaalt waar we als
        volgende uitbreiden — en u bent een van de eersten die het hoort.
      </p>
      <p style="font-size:15px;line-height:1.65;color:#403d35;margin:0">
        Heeft u tussentijds een vraag? Bel of WhatsApp gerust.
      </p>`;
    return {
      subject: "Dank u wel — we hebben het genoteerd | Bijlesdirect",
      html: omlijst(body),
      text: "Dank u wel — we hebben het genoteerd.\n\nWe houden bij welke vakken en niveaus het vaakst gevraagd worden en laten het weten zodra we uitbreiden.\n\nBijlesdirect · " + site.phoneDisplay,
    };
  }

  const body = `
    <h1 style="font-size:22px;margin:0 0 18px;color:#1b1a16">${escapeHtml(gids.titel)}</h1>
    ${gidsHtml(gids)}`;

  return {
    subject: jeVorm
      ? "Je Slagingscheck staat gepland — en alvast dit"
      : "Uw Slagingscheck staat gepland — en alvast dit",
    html: omlijst(body),
    text: `${gids.titel}\n\n${gidsText(gids)}`,
  };
}

/* ─────────────────────────────────────────────────────────
   De route
   ───────────────────────────────────────────────────────── */

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Ongeldige aanvraag." }, { status: 400 });
  }

  const parsed = slagingscheckSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: eersteFoutmelding(parsed.error) }, { status: 400 });
  }

  // Na validatie staat vast dat naam en e-mail gevuld zijn; `Antwoorden` houdt
  // ze optioneel omdat ze tijdens het invullen nog leeg mogen zijn.
  const ingevuld = parsed.data;
  const a: Antwoorden = ingevuld;

  // Honeypot: bot vulde het verborgen veld in → doe alsof het lukte, doe niets.
  if (a.website) return NextResponse.json({ ok: true });

  const { naarBijlesdirect } = mailAdres();
  const melding = notificatie(a);

  // Wegschrijven naar de database. Bewust vóór de mail, maar niet blokkerend:
  // mislukt het, dan gaat de aanvraag gewoon door via de mail.
  const bewaard = await bewaarAanvraag(a);

  // 1) Melding naar Bijlesdirect — dit mag niet misgaan.
  let bezorgd = false;
  try {
    const resultaat = await verstuur({
      to: naarBijlesdirect,
      replyTo: ingevuld.email,
      subject: onderwerp(a),
      html: melding.html,
      text: melding.text,
    });
    if (!resultaat.ok) {
      return NextResponse.json(
        { error: "Versturen mislukt. Bel of WhatsApp ons gerust direct." },
        { status: 502 },
      );
    }
    bezorgd = resultaat.bezorgd;
  } catch (err) {
    console.error("[slagingscheck] onverwachte fout:", err);
    return NextResponse.json({ error: "Er ging iets mis. Probeer het later opnieuw." }, { status: 500 });
  }

  // 2) Bevestiging met de oudergids — mag falen zonder de aanvraag te blokkeren.
  try {
    const mail = bevestiging(a);
    await verstuur({
      to: ingevuld.email,
      replyTo: naarBijlesdirect,
      subject: mail.subject,
      html: mail.html,
      text: mail.text,
    });
  } catch (err) {
    console.error("[slagingscheck] bevestigingsmail mislukt:", err);
  }

  return NextResponse.json({ ok: true, delivered: bezorgd, stored: bewaard });
}
