/**
 * Landelijke cijfers voor de Slagingscheck. Eén keer per jaar bijwerken.
 *
 * Bron: Examenmonitor VO 2025 (DUO), tabel 28: het aandeel leerlingen met een
 * onvoldoende voor wiskunde bij het centraal examen (CE), alle wiskundevakken
 * samen, per niveau. Verschenen als bijlage bij de Kamerbrief over de
 * eindexamenresultaten 2025 (blg-1215399).
 *
 * Het CBS publiceert geen cijfers per vak; daarom deze bron. Ter vergelijking:
 * een onvoldoende als eindcijfer (schoolexamen en centraal examen samen) hadden
 * in 2025 22,1% (HAVO) en 14,6% (VWO). In 2024 was het CE-cijfer 19,5% (HAVO)
 * en 15,0% (VWO); 2025 lag hoger, deels door een strengere normering.
 */

export const wiskundeOnvoldoende = {
  /** Het jaar van het eindexamen. */
  jaar: 2025,
  /** Percentage leerlingen met een onvoldoende voor het centraal examen wiskunde. */
  havo: 27.9,
  vwo: 20.2,
};
