import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container, ButtonLink } from "@/components/ui";
import { FinalCTA } from "@/components/sections";
import { ArrowRight, Clock } from "@/components/icons";
import { getAllSlugs, getPost, formatDate, getAllPosts } from "@/lib/blog";
import { site } from "@/lib/site";

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: post.meta.title,
    description: post.meta.description,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      type: "article",
      title: post.meta.title,
      description: post.meta.description,
      publishedTime: post.meta.date,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const related = getAllPosts()
    .filter((p) => p.slug !== slug)
    .slice(0, 2);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.meta.title,
    description: post.meta.description,
    datePublished: post.meta.date,
    author: { "@type": "Organization", name: post.meta.author },
    publisher: { "@type": "Organization", name: "Bijlesdirect" },
    mainEntityOfPage: `${site.domain}/blog/${slug}`,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <article>
        <header className="border-b border-line bg-sand">
          <Container className="py-16 sm:py-20">
            <div className="mx-auto max-w-3xl">
              <Link href="/blog" className="inline-flex items-center gap-1.5 text-sm font-semibold text-green hover:underline">
                <ArrowRight className="h-4 w-4 rotate-180" /> Terug naar blog
              </Link>
              <div className="mt-5 flex items-center gap-3 text-[13.5px] text-muted">
                <span className="font-semibold text-green">{post.meta.category}</span>
                <span>{formatDate(post.meta.date)}</span>
                <span className="inline-flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" /> {post.meta.readingTime} min lezen
                </span>
              </div>
              <h1 className="mt-3 text-[clamp(2rem,4.4vw,3.25rem)] text-ink">{post.meta.title}</h1>
              <p className="mt-4 text-lg text-ink-soft">{post.meta.description}</p>
            </div>
          </Container>
        </header>

        <Container className="py-16">
          <div
            className="prose prose-lg mx-auto max-w-3xl prose-headings:font-display prose-a:font-medium prose-a:no-underline hover:prose-a:underline"
            dangerouslySetInnerHTML={{ __html: post.html }}
          />

          <div className="mx-auto mt-12 max-w-3xl rounded-2xl border border-line bg-green-soft/40 p-7 text-center">
            <h2 className="kop-tekst text-xl text-ink">Kan uw kind wel wat hulp gebruiken?</h2>
            <p className="mt-2 text-ink-soft">Vraag de gratis, vrijblijvende Slagingscheck aan en ontdek wat we kunnen betekenen.</p>
            <div className="mt-5">
              <ButtonLink href="/slagingscheck">Vraag een gratis Slagingscheck aan</ButtonLink>
            </div>
          </div>
        </Container>
      </article>

      {related.length > 0 && (
        <Container className="pb-8">
          <h2 className="kop-tekst mb-6 text-2xl text-ink">Lees ook</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {related.map((p) => (
              <Link
                key={p.slug}
                href={`/blog/${p.slug}`}
                className="group rounded-2xl border border-line bg-white p-7 transition-all hover:-translate-y-1 hover:shadow-[0_18px_50px_-24px_rgba(27,26,22,0.28)]"
              >
                <span className="text-[13px] font-semibold text-green">{p.category}</span>
                <h3 className="mt-2 font-display text-xl font-semibold text-ink">{p.title}</h3>
                <p className="mt-2 text-[15px] text-ink-soft">{p.description}</p>
              </Link>
            ))}
          </div>
        </Container>
      )}

      <FinalCTA />
    </>
  );
}
