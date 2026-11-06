import { maakDeelafbeelding } from "@/lib/deelafbeelding";
import { programma } from "@/config/programma";
import { vakken, vindVak } from "@/content/vakken";

export const alt = "Examentraining wiskunde bij ExamenDocent";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return vakken.map((v) => ({ vak: v.slug }));
}

export default async function Image({ params }: { params: Promise<{ vak: string }> }) {
  const v = vindVak((await params).vak);
  return maakDeelafbeelding({
    titel: v ? `Examentraining ${v.vak} voor ${v.niveau}` : "Examentraining wiskunde",
    ondertitel: `Voor het centraal examen in ${programma.examenMaand} ${programma.examenjaar}. Met slagingsgarantie.`,
  });
}
