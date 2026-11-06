import { maakDeelafbeelding } from "@/lib/deelafbeelding";
import { getAllSlugs, getPost } from "@/lib/blog";

export const alt = "Artikel op het blog van ExamenDocent";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const post = getPost((await params).slug);
  return maakDeelafbeelding({
    titel: post?.meta.title ?? "Blog van ExamenDocent",
    ondertitel: "Blog van ExamenDocent",
  });
}
