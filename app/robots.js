import { site } from "@/content/site";

// Requis avec `output: export` : route générée statiquement au build.
export const dynamic = "force-static";

/** robots.txt propre — SEO-004, M */
export default function robots() {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/api/"] }],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
