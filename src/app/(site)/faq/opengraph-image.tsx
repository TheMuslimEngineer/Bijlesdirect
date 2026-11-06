import { maakDeelafbeelding } from "@/lib/deelafbeelding";

export const alt = "Veelgestelde vragen over Examenklaar";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return maakDeelafbeelding({
    titel: "Veelgestelde vragen over Examenklaar",
    ondertitel: "Over prijs, garantie, groepsgrootte en online les.",
  });
}
