"use client";

import { createBrowserClient } from "@supabase/ssr";
import type { Database } from "./types";

/**
 * Supabase-client voor de browser.
 *
 * De publishable key hoort hier thuis: hij is publiek en geeft alleen toegang
 * tot wat het RLS-beleid toestaat — inzendingen wegschrijven, niets teruglezen.
 */
export function maakBrowserClient() {
  return createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
  );
}
