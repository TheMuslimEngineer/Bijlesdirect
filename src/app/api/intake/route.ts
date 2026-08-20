import { NextResponse } from "next/server";
import { z } from "zod";
import { escapeHtml, mailAdres, verstuur } from "@/lib/mail";

/**
 * Losse berichten: het contactformulier en de docent-aanmelding.
 *
 * De Slagingscheck heeft een eigen route (`/api/slagingscheck`), omdat daar een
 * volledig profiel en een gepersonaliseerde bevestigingsmail bij horen.
 */

const schema = z.object({
  type: z.enum(["contact", "docent"]).default("contact"),
  naam: z.string().trim().min(1, "Vul uw naam in.").max(120),
  email: z.string().trim().email("Vul een geldig e-mailadres in.").max(160),
  telefoon: z.string().trim().max(40).optional().or(z.literal("")),
  leerling: z.string().trim().max(120).optional().or(z.literal("")),
  school: z.string().trim().max(160).optional().or(z.literal("")),
  niveau: z.string().trim().max(40).optional().or(z.literal("")),
  vak: z.string().trim().max(60).optional().or(z.literal("")),
  vakken: z.string().trim().max(200).optional().or(z.literal("")),
  bericht: z.string().trim().max(4000).optional().or(z.literal("")),
  website: z.string().optional(), // honeypot — echte gebruikers laten dit leeg
});

const onderwerpen: Record<string, string> = {
  contact: "Nieuw contactbericht",
  docent: "Nieuwe docent-aanmelding",
};

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Ongeldige aanvraag." }, { status: 400 });
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    const issue = parsed.error.issues[0];
    const labels: Record<string, string> = {
      naam: "uw naam",
      email: "een geldig e-mailadres",
      telefoon: "een telefoonnummer",
      bericht: "een bericht",
    };
    const ruw = issue?.message ?? "";
    const technisch = /expected|received|invalid input|too big|too small|nan/i.test(ruw);
    const veld = typeof issue?.path?.[0] === "string" ? issue.path[0] : "";
    const melding = ruw && !technisch ? ruw : `Vul ${labels[veld] ?? "alle verplichte velden"} in.`;
    return NextResponse.json({ error: melding }, { status: 400 });
  }

  const data = parsed.data;

  // Honeypot: bot vulde het verborgen veld in → doe alsof het lukte, doe niets.
  if (data.website) return NextResponse.json({ ok: true });

  const regels: [string, string][] = [
    ["Type", data.type],
    ["Naam", data.naam],
    ["E-mail", data.email],
    ["Telefoon", data.telefoon || "—"],
    ["Naam leerling", data.leerling || "—"],
    ["School", data.school || "—"],
    ["Niveau", data.niveau || "—"],
    ["Vak", data.vak || "—"],
    ["Vakken (docent)", data.vakken || "—"],
    ["Bericht", data.bericht || "—"],
  ];

  const html = `
    <h2 style="font-family:sans-serif">${onderwerpen[data.type]}</h2>
    <table style="font-family:sans-serif;border-collapse:collapse">
      ${regels
        .map(
          ([k, v]) =>
            `<tr><td style="padding:6px 14px 6px 0;color:#6f6a5e;vertical-align:top">${k}</td><td style="padding:6px 0"><strong>${escapeHtml(v)}</strong></td></tr>`,
        )
        .join("")}
    </table>`;
  const text = regels.map(([k, v]) => `${k}: ${v}`).join("\n");

  try {
    const resultaat = await verstuur({
      to: mailAdres().naarBijlesdirect,
      replyTo: data.email,
      subject: `${onderwerpen[data.type]} — ${data.naam}`,
      html,
      text,
    });
    if (!resultaat.ok) {
      return NextResponse.json(
        { error: "Versturen mislukt. Bel of WhatsApp ons gerust direct." },
        { status: 502 },
      );
    }
    return NextResponse.json({ ok: true, delivered: resultaat.bezorgd });
  } catch (err) {
    console.error("[intake] onverwachte fout:", err);
    return NextResponse.json({ error: "Er ging iets mis. Probeer het later opnieuw." }, { status: 500 });
  }
}
