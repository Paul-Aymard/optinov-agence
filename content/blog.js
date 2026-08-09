import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";

/**
 * Blog — le contenu vit désormais dans des fichiers Markdown (content/blog/*.md),
 * éditables depuis le tableau de bord (CMS). Ce module les lit au build.
 * Les 3 pages qui l'utilisent (liste, article, sitemap) sont côté serveur.
 */

/** Catégories éditoriales — CDC §6.7 */
export const categories = [
  { id: "branding", label: "Communication & branding", service: "communication-visuelle" },
  { id: "marketing-digital", label: "Marketing digital", service: "communication-digitale" },
  { id: "ia", label: "Intelligence artificielle & automatisation", service: "automatisation-ia" },
  { id: "carte-digitale", label: "Carte de visite digitale & networking", service: null },
  { id: "agence", label: "Coulisses & actualités", service: null },
];

const BLOG_DIR = path.join(process.cwd(), "content/blog");

function chargerArticles() {
  let fichiers = [];
  try {
    fichiers = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".md"));
  } catch {
    return [];
  }

  const items = fichiers.map((f) => {
    const slug = f.replace(/\.md$/, "");
    const { data, content } = matter(fs.readFileSync(path.join(BLOG_DIR, f), "utf8"));
    return {
      slug,
      titre: data.titre ?? slug,
      categorie: data.categorie || "agence",
      extrait: data.extrait ?? "",
      tempsLecture: Number(data.tempsLecture) || 5,
      date: data.date || "",
      auteur: data.auteur || "L'équipe OPTINOV",
      aLaUne: Boolean(data.aLaUne),
      serviceLie: data.serviceLie || null,
      landingLiee: data.landingLiee || null,
      image: data.image || null,
      // Corps Markdown converti en HTML (vide tant que l'article n'est pas rédigé).
      corps: content.trim() ? marked.parse(content) : "",
    };
  });

  // À la une en premier, puis les plus récents (par date décroissante).
  return items.sort((a, b) => {
    if (a.aLaUne !== b.aLaUne) return a.aLaUne ? -1 : 1;
    return String(b.date).localeCompare(String(a.date));
  });
}

export const articles = chargerArticles();

export const getArticle = (slug) => articles.find((a) => a.slug === slug);
export const getCategorie = (id) => categories.find((c) => c.id === id);

/** §5.3 : chaque page service renvoie vers 2 articles liés */
export const articlesParService = (serviceSlug) =>
  articles.filter((a) => a.serviceLie === serviceSlug).slice(0, 2);
