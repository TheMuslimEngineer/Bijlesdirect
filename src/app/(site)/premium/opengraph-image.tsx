import { maakDeelafbeelding } from "@/lib/deelafbeelding";
import { premiumGarantie } from "@/config/programma";

export const alt = "Premium 1-op-1 examentraining wiskunde";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return maakDeelafbeelding({
    titel: "Premium 1-op-1 examentraining wiskunde",
    ondertitel: `Voor leerlingen die een ${premiumGarantie.cijfer} of hoger willen halen.`,
  });
}
