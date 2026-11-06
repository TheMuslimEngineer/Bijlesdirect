import { maakDeelafbeelding } from "@/lib/deelafbeelding";
import { programma } from "@/config/programma";

export const alt = "Examenklaar, het examenprogramma wiskunde van ExamenDocent";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return maakDeelafbeelding({
    titel: `${programma.naam}: ${programma.duurWeken} weken examentraining wiskunde`,
    ondertitel: "In een klein groepje, met een vaste docent en een plan op maat.",
  });
}
