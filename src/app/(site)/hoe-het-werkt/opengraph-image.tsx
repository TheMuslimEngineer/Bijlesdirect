import { maakDeelafbeelding } from "@/lib/deelafbeelding";

export const alt = "Zo werkt de examentraining wiskunde van ExamenDocent";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return maakDeelafbeelding({
    titel: "Zo werkt onze examentraining wiskunde",
    ondertitel: "Eerst meten waar het misgaat, dan een plan tot aan het examen.",
  });
}
