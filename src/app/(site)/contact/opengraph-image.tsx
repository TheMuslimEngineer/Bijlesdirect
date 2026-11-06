import { maakDeelafbeelding } from "@/lib/deelafbeelding";
import { site } from "@/lib/site";

export const alt = "Contact met ExamenDocent";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return maakDeelafbeelding({
    titel: "Bel, app of mail ons",
    ondertitel: `${site.phoneDisplay} of ${site.email}`,
  });
}
