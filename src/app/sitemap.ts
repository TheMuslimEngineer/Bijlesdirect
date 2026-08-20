import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { getAllPosts } from "@/lib/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.domain;
  const now = new Date();

  const routes: { path: string; priority: number }[] = [
    { path: "", priority: 1 },
    { path: "/slagingsprogramma", priority: 0.9 },
    { path: "/prijs-en-garantie", priority: 0.9 },
    { path: "/programmas", priority: 0.8 },
    { path: "/hoe-het-werkt", priority: 0.8 },
    { path: "/premium", priority: 0.7 },
    { path: "/reviews", priority: 0.7 },
    { path: "/over-ons", priority: 0.6 },
    { path: "/faq", priority: 0.6 },
    { path: "/contact", priority: 0.5 },
    { path: "/docent-worden", priority: 0.5 },
    { path: "/blog", priority: 0.6 },
    { path: "/privacy", priority: 0.3 },
    { path: "/voorwaarden", priority: 0.3 },
  ];

  const staticRoutes = routes.map((r) => ({
    url: `${base}${r.path}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: r.priority,
  }));

  const blogRoutes = getAllPosts().map((p) => ({
    url: `${base}/blog/${p.slug}`,
    lastModified: new Date(p.date),
    changeFrequency: "yearly" as const,
    priority: 0.5,
  }));

  return [...staticRoutes, ...blogRoutes];
}
