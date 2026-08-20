import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui";
import { PageHeader } from "@/components/page-header";
import { FinalCTA } from "@/components/sections";
import { ArrowRight, Clock } from "@/components/icons";
import { getAllPosts, formatDate } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog — studietips & advies voor ouders",
  description:
    "Praktische tips over leren, plannen, examens en motivatie. Lees het blog van Bijlesdirect en help uw kind verder op school.",
  alternates: { canonical: "/blog" },
};

export default function BlogPage() {
  const posts = getAllPosts();
  const [featured, ...rest] = posts;

  return (
    <>
      <PageHeader
        eyebrow="Blog"
        title="Studietips & advies voor ouders."
        intro="Praktische artikelen over leren, plannen, examens en motivatie — geschreven door onze docenten."
      />

      <section className="py-20">
        <Container>
          {posts.length === 0 ? (
            <p className="text-center text-ink-soft">Binnenkort verschijnen hier de eerste artikelen.</p>
          ) : (
            <div className="grid gap-10">
              {featured && (
                <Link
                  href={`/blog/${featured.slug}`}
                  className="group grid overflow-hidden rounded-[28px] border border-line bg-white transition-all hover:-translate-y-1 hover:shadow-[0_24px_60px_-30px_rgba(27,26,22,0.35)] lg:grid-cols-2"
                >
                  <div
                    className="min-h-[240px] p-10"
                    style={{ background: "linear-gradient(140deg, var(--color-green-soft), var(--color-sand-2))" }}
                  >
                    <span className="inline-block rounded-full bg-white/70 px-3 py-1 text-xs font-semibold text-green-deep">
                      Uitgelicht
                    </span>
                  </div>
                  <div className="flex flex-col justify-center p-10">
                    <div className="flex items-center gap-3 text-[13px] text-muted">
                      <span className="font-semibold text-green">{featured.category}</span>
                      <span>{formatDate(featured.date)}</span>
                    </div>
                    <h2 className="mt-3 font-display text-[clamp(1.5rem,2.6vw,2rem)] font-semibold text-ink">
                      {featured.title}
                    </h2>
                    <p className="mt-3 text-ink-soft">{featured.description}</p>
                    <span className="mt-5 inline-flex items-center gap-1.5 font-semibold text-green">
                      Lees verder
                      <ArrowRight className="h-[18px] w-[18px] transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </div>
                </Link>
              )}

              {rest.length > 0 && (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {rest.map((post) => (
                    <Link
                      key={post.slug}
                      href={`/blog/${post.slug}`}
                      className="group flex flex-col rounded-2xl border border-line bg-white p-7 transition-all hover:-translate-y-1 hover:shadow-[0_18px_50px_-24px_rgba(27,26,22,0.28)]"
                    >
                      <div className="flex items-center gap-3 text-[13px] text-muted">
                        <span className="font-semibold text-green">{post.category}</span>
                        <span className="inline-flex items-center gap-1">
                          <Clock className="h-3.5 w-3.5" /> {post.readingTime} min
                        </span>
                      </div>
                      <h3 className="mt-3 font-display text-[1.3rem] font-semibold text-ink">{post.title}</h3>
                      <p className="mt-2 flex-1 text-[15px] text-ink-soft">{post.description}</p>
                      <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-green">
                        Lees verder
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                      </span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )}
        </Container>
      </section>

      <FinalCTA />
    </>
  );
}
