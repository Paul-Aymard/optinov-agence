import { site } from "@/content/site";
import { services } from "@/content/services";
import { projets } from "@/content/realisations";
import { articles } from "@/content/blog";

/** Sitemap XML généré automatiquement — SEO-004, M */
export default function sitemap() {
  const url = (chemin, priority, changeFrequency) => ({
    url: `${site.url}${chemin}`,
    lastModified: new Date(),
    changeFrequency,
    priority,
  });

  return [
    url("/", 1, "weekly"),
    url("/agence", 0.7, "monthly"),
    url("/services", 0.9, "monthly"),
    ...services.map((s) => url(`/services/${s.slug}`, 0.8, "monthly")),
    url("/solutions", 0.7, "monthly"),
    url("/solutions/pros-cards", 1, "weekly"),
    url("/realisations", 0.8, "weekly"),
    ...projets.map((p) => url(`/realisations/${p.slug}`, 0.6, "monthly")),
    url("/blog", 0.8, "daily"),
    ...articles.map((a) => url(`/blog/${a.slug}`, 0.6, "monthly")),
    url("/faq", 0.6, "monthly"),
    url("/contact", 0.7, "monthly"),
    url("/mentions-legales", 0.2, "yearly"),
    url("/politique-de-confidentialite", 0.2, "yearly"),
  ];
}
