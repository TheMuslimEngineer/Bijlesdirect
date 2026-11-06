import { maakDeelafbeelding } from "@/lib/deelafbeelding";

export const alt = "Privacyverklaring van ExamenDocent";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return maakDeelafbeelding({ titel: "Privacyverklaring", ondertitel: "Hoe ExamenDocent met uw gegevens omgaat." });
}
