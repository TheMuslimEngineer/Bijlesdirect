import { maakDeelafbeelding } from "@/lib/deelafbeelding";

export const alt = "ExamenDocent: examentraining wiskunde voor HAVO en VWO";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return maakDeelafbeelding({
    titel: "Uw kind slaagt voor het eindexamen wiskunde",
    ondertitel: "Examentraining voor HAVO en VWO. Geslaagd, of uw geld terug.",
  });
}
