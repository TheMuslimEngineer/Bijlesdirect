import { maakDeelafbeelding } from "@/lib/deelafbeelding";

export const alt = "De gratis Slagingscheck van ExamenDocent";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return maakDeelafbeelding({
    titel: "De gratis Slagingscheck",
    ondertitel: "In twee minuten aangevraagd. Daarna weet u waar uw kind staat.",
  });
}
