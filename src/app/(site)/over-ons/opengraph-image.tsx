import { maakDeelafbeelding } from "@/lib/deelafbeelding";

export const alt = "Het team van ExamenDocent";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return maakDeelafbeelding({
    titel: "Het team achter ExamenDocent",
    ondertitel: "Een klein team dat zich volledig richt op examentraining wiskunde.",
  });
}
