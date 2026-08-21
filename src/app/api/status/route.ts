import { NextResponse } from "next/server";

/**
 * Diagnose: wat ziet de server aan omgevingsvariabelen?
 *
 * Bewust alleen ja/nee en de publieke Supabase-URL. Sleutels worden nooit
 * teruggegeven, alleen of ze bestaan en hoe lang ze zijn — genoeg om een
 * typefout of een half geplakte waarde te herkennen.
 *
 * Handig bij het inrichten van een nieuwe omgeving. Mag weg zodra alles draait.
 */
export const dynamic = "force-dynamic";

function aanwezig(waarde: string | undefined) {
  return {
    ingesteld: Boolean(waarde && waarde.trim()),
    lengte: waarde?.trim().length ?? 0,
  };
}

export async function GET() {
  return NextResponse.json({
    supabase: {
      url: process.env.NEXT_PUBLIC_SUPABASE_URL ?? null,
      publishableKey: aanwezig(process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY),
    },
    mail: {
      resendKey: aanwezig(process.env.RESEND_API_KEY),
      intakeTo: process.env.INTAKE_TO ?? null,
      intakeFrom: process.env.INTAKE_FROM ?? null,
    },
    omgeving: process.env.NODE_ENV,
    // Alle sleutels die met NEXT_PUBLIC_ beginnen, alleen de namen.
    publiekeVariabelen: Object.keys(process.env)
      .filter((k) => k.startsWith("NEXT_PUBLIC_"))
      .sort(),
  });
}
