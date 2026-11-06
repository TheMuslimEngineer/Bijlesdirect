import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    /* /bedankt staat niet in disallow: Google moet de pagina kunnen lezen om
       de noindex te zien. */
    rules: { userAgent: "*", allow: "/", disallow: ["/api/"] },
    sitemap: `${site.domain}/sitemap.xml`,
  };
}
