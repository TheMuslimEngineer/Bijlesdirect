/**
 * Eén plek voor het versturen van e-mail.
 *
 * Zonder `RESEND_API_KEY` (lokaal of in een preview) wordt er niets verstuurd
 * maar wel gelogd, zodat formulieren gewoon te testen zijn.
 */

import { Resend } from "resend";
import { site } from "@/lib/site";

export function escapeHtml(s: string) {
  return s.replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c] as string,
  );
}

export type Bericht = {
  to: string;
  replyTo?: string;
  subject: string;
  html: string;
  text: string;
};

export function mailAdres() {
  return {
    naarBijlesdirect: process.env.INTAKE_TO ?? site.email,
    van: process.env.INTAKE_FROM ?? "Bijlesdirect <onboarding@resend.dev>",
  };
}

/**
 * Verstuurt een bericht. Geeft `false` terug als er geen sleutel is ingesteld —
 * de aanroeper bepaalt zelf of dat een fout is.
 */
export async function verstuur(bericht: Bericht): Promise<{ ok: boolean; bezorgd: boolean }> {
  const apiKey = process.env.RESEND_API_KEY;
  const { van } = mailAdres();

  if (!apiKey) {
    console.info(`[mail] geen RESEND_API_KEY — niet verstuurd:\n${bericht.subject}\n\n${bericht.text}`);
    return { ok: true, bezorgd: false };
  }

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from: van,
    to: bericht.to,
    replyTo: bericht.replyTo,
    subject: bericht.subject,
    html: bericht.html,
    text: bericht.text,
  });

  if (error) {
    console.error("[mail] Resend-fout:", error);
    return { ok: false, bezorgd: false };
  }
  return { ok: true, bezorgd: true };
}

/** Merkomlijsting rond de inhoud van een klantmail. */
export function omlijst(inhoud: string) {
  return `
  <div style="font-family:Arial,Helvetica,sans-serif;max-width:600px;margin:0 auto;color:#1b1a16">
    <div style="background:#0e6b4f;padding:22px 28px;border-radius:14px 14px 0 0">
      <span style="color:#ffffff;font-size:20px;font-weight:bold;letter-spacing:-0.02em">Bijlesdirect</span>
    </div>
    <div style="background:#fbfaf6;padding:28px;border:1px solid #e6e0d4;border-top:0;border-radius:0 0 14px 14px">
      ${inhoud}
      <p style="font-size:13px;color:#8a8270;margin:26px 0 0">
        Bijlesdirect · <a href="${site.phoneHref}" style="color:#0a5340">${site.phoneDisplay}</a> ·
        <a href="${site.whatsapp}" style="color:#0a5340">WhatsApp</a>
      </p>
    </div>
  </div>`;
}
