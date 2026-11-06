import { maakDeelafbeelding } from "@/lib/deelafbeelding";

export const alt = "Word examentrainer wiskunde bij ExamenDocent";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return maakDeelafbeelding({
    titel: "Word examentrainer wiskunde",
    ondertitel: "Online lesgeven aan examenkandidaten HAVO en VWO.",
  });
}
