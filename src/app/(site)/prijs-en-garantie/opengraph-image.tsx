import { maakDeelafbeelding } from "@/lib/deelafbeelding";
import { prijzen, euro } from "@/config/programma";

export const alt = "Prijs en slagingsgarantie van Examenklaar";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return maakDeelafbeelding({
    titel: "Wat het kost, en wat u terugkrijgt als het niet lukt",
    ondertitel: `${euro(prijzen.programma)}, of ${prijzen.termijnen.aantal} termijnen van ${euro(prijzen.termijnen.bedrag)}. Met slagingsgarantie.`,
  });
}
