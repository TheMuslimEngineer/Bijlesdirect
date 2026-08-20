import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import type { Database } from "./types";

/**
 * Supabase-client voor server-componenten en route-handlers.
 *
 * Er is nog geen inlog, dus er staat niets in de cookies. De koppeling zit er
 * wel al in, zodat authenticatie later toegevoegd kan worden zonder dat de
 * aanroepen hoeven te veranderen.
 */
export async function maakServerClient() {
  const cookieStore = await cookies();

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options),
            );
          } catch {
            // Aangeroepen vanuit een server-component: daar mag niet naar
            // cookies geschreven worden. Onschadelijk zolang er geen sessie is.
          }
        },
      },
    },
  );
}

/** Is Supabase geconfigureerd? Zonder sleutels slaan we het opslaan gewoon over. */
export function supabaseBeschikbaar() {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
  );
}
