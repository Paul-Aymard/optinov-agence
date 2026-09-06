import genere from "./generated/blog.json";

/**
 * Blog — les articles viennent du tableau de bord (Payload) et sont écrits
 * dans content/generated/blog.json par scripts/sync-content.mjs, au build.
 * Le corps est déjà en HTML. Tant que rien n'a été synchronisé, la liste est
 * vide : le site affiche un état d'attente, jamais un article inventé.
 */

/** Catégories éditoriales — CDC §6.7 (mêmes identifiants que le tableau de bord) */
export const categories = [
  { id: "branding", label: "Communication & branding", service: "communication-visuelle" },
  { id: "marketing-digital", label: "Marketing digital", service: "communication-digitale" },
  { id: "ia", label: "Intelligence artificielle & automatisation", service: "automatisation-ia" },
  { id: "carte-digitale", label: "Carte de visite digitale & networking", service: null },
  { id: "agence", label: "Coulisses & actualités", service: null },
];

const brut = Array.isArray(genere) ? genere : [];

/** À la une en premier, puis les plus récents (par date décroissante). */
export const articles = brut
  .map((a) => ({
    slug: a.slug,
    titre: a.titre,
    categorie: a.categorie || "agence",
    extrait: a.extrait || "",
    tempsLecture: Number(a.tempsLecture) || 5,
    date: a.date || "",
    auteur: a.auteur || "L'équipe OPTINOV",
    aLaUne: Boolean(a.aLaUne),
    serviceLie: a.serviceLie || null,
    landingLiee: a.landingLiee || null,
    // Image de couverture : grande pour la page article, carte pour les listes.
    image: a.image?.url || null,
    imageCarte: a.image?.carte || a.image?.url || null,
    imageAlt: a.image?.alt || "",
    corps: a.corps || "",
  }))
  .sort((a, b) => {
    if (a.aLaUne !== b.aLaUne) return a.aLaUne ? -1 : 1;
    return String(b.date).localeCompare(String(a.date));
  });

export const getArticle = (slug) => articles.find((a) => a.slug === slug);
export const getCategorie = (id) => categories.find((c) => c.id === id);

/** §5.3 : chaque page service renvoie vers 2 articles liés */
export const articlesParService = (serviceSlug) =>
  articles.filter((a) => a.serviceLie === serviceSlug).slice(0, 2);
