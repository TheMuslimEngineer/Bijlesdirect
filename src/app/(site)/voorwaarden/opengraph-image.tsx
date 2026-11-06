import { maakDeelafbeelding } from "@/lib/deelafbeelding";

export const alt = "Algemene voorwaarden van ExamenDocent";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return maakDeelafbeelding({ titel: "Algemene voorwaarden", ondertitel: "Inclusief de voorwaarden van de slagingsgarantie." });
}
