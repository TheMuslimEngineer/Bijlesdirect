import { maakDeelafbeelding } from "@/lib/deelafbeelding";

export const alt = "Blog van ExamenDocent";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return maakDeelafbeelding({
    titel: "Tips voor het eindexamen wiskunde",
    ondertitel: "Artikelen voor ouders van examenkandidaten.",
  });
}
