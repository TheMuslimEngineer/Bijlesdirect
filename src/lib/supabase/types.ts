/**
 * Databasetypen — GEGENEREERD, niet met de hand aanpassen.
 *
 * Opnieuw genereren na een migratie:
 *   npx supabase gen types typescript --project-id zqhybtvaiaucdbbtvhlp > src/lib/supabase/types.ts
 */

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      berichten: {
        Row: {
          aangemaakt_op: string;
          bericht: string | null;
          email: string;
          id: number;
          naam: string;
          soort: string;
          telefoon: string | null;
          vakken: string | null;
        };
        Insert: {
          aangemaakt_op?: string;
          bericht?: string | null;
          email: string;
          id?: never;
          naam: string;
          soort: string;
          telefoon?: string | null;
          vakken?: string | null;
        };
        Update: {
          aangemaakt_op?: string;
          bericht?: string | null;
          email?: string;
          id?: never;
          naam?: string;
          soort?: string;
          telefoon?: string | null;
          vakken?: string | null;
        };
        Relationships: [];
      };
      slagingscheck_aanvragen: {
        Row: {
          aangemaakt_op: string;
          beschikbaarheid: string | null;
          cijfer: string | null;
          doel: string | null;
          eerder_bijles: string | null;
          email: string;
          gevraagd_niveau: string | null;
          gevraagd_vak_anders: string | null;
          gevraagde_vakken: string[];
          grootste_probleem: string[];
          id: number;
          klas: string;
          markering: string | null;
          naam: string;
          naam_leerling: string | null;
          opmerking: string | null;
          ouder_pijn: string[];
          route: string;
          school: string | null;
          sinds: string | null;
          telefoon: string | null;
          vak: string | null;
          voor_wie: string;
          wat_werkte_niet: string[];
          wat_werkte_niet_anders: string | null;
          wil_aanbeveling: boolean;
        };
        Insert: {
          aangemaakt_op?: string;
          beschikbaarheid?: string | null;
          cijfer?: string | null;
          doel?: string | null;
          eerder_bijles?: string | null;
          email: string;
          gevraagd_niveau?: string | null;
          gevraagd_vak_anders?: string | null;
          gevraagde_vakken?: string[];
          grootste_probleem?: string[];
          id?: never;
          klas: string;
          markering?: string | null;
          naam: string;
          naam_leerling?: string | null;
          opmerking?: string | null;
          ouder_pijn?: string[];
          route: string;
          school?: string | null;
          sinds?: string | null;
          telefoon?: string | null;
          vak?: string | null;
          voor_wie: string;
          wat_werkte_niet?: string[];
          wat_werkte_niet_anders?: string | null;
          wil_aanbeveling?: boolean;
        };
        Update: Record<string, never>;
        Relationships: [];
      };
    };
    Views: { [_ in never]: never };
    Functions: { [_ in never]: never };
    Enums: { [_ in never]: never };
    CompositeTypes: { [_ in never]: never };
  };
};

export type AanvraagInsert = Database["public"]["Tables"]["slagingscheck_aanvragen"]["Insert"];
export type BerichtInsert = Database["public"]["Tables"]["berichten"]["Insert"];
