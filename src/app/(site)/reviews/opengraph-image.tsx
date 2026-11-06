import { maakDeelafbeelding } from "@/lib/deelafbeelding";
import { rating } from "@/lib/site";

export const alt = "Ervaringen van ouders met ExamenDocent";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return maakDeelafbeelding({
    titel: "Wat ouders over ons vertellen",
    ondertitel: `Gemiddeld een ${rating.score} uit ${rating.count}+ reviews.`,
  });
}
