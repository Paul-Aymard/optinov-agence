"use client";

import Link from "next/link";
import { useState } from "react";

/**
 * Liste du blog — présentation inspirée de skyrocketmonster.com/fr/blog
 * (PDF « NOUVELLE MODIF AGENCE ») : pastilles de catégories, grille de
 * 3 colonnes, pagination par flèches. Au survol, l'image zoome et la flèche
 * de la carte glisse.
 *
 * Le filtre et la pagination se font côté navigateur : le site est exporté en
 * statique, il n'y a pas de serveur pour lire ?categorie=. Chaque article garde
 * sa propre page indexable (/blog/[slug]), listée dans le sitemap.
 */
const PAR_PAGE = 6;

const formatDate = (iso) => {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });
};

export function MetaArticle({ date, tempsLecture }) {
  const jour = formatDate(date);
  return (
    <p className="blog-meta">
      {jour && <time dateTime={date}>{jour}</time>}
      {jour && <span aria-hidden="true">|</span>}
      <span>{tempsLecture} min de lecture</span>
    </p>
  );
}

export default function BlogListe({ articles, categories }) {
  const [categorie, setCategorie] = useState("tous");
  const [page, setPage] = useState(0);

  // On ne propose que les catégories qui ont au moins un article.
  const utilisees = categories.filter((c) => articles.some((a) => a.categorie === c.id));
  const filtres = categorie === "tous" ? articles : articles.filter((a) => a.categorie === categorie);
  const nbPages = Math.max(1, Math.ceil(filtres.length / PAR_PAGE));
  const visibles = filtres.slice(page * PAR_PAGE, (page + 1) * PAR_PAGE);
  const label = (id) => categories.find((c) => c.id === id)?.label ?? "";

  const choisir = (id) => {
    setCategorie(id);
    setPage(0);
  };

  return (
    <>
      {utilisees.length > 1 && (
        <div className="blog-pastilles" role="group" aria-label="Filtrer par catégorie">
          <button type="button" aria-pressed={categorie === "tous"} onClick={() => choisir("tous")}>
            Tous
          </button>
          {utilisees.map((c) => (
            <button key={c.id} type="button" aria-pressed={categorie === c.id} onClick={() => choisir(c.id)}>
              {c.label}
            </button>
          ))}
        </div>
      )}

      <div className="blog-grille" aria-live="polite">
        {visibles.map((a) => (
          <article key={a.slug} className="blog-carte">
            <Link href={`/blog/${a.slug}`} className="blog-carte__lien">
              <div className="blog-carte__img">
                {a.imageCarte ? (
                  <img src={a.imageCarte} alt={a.imageAlt || ""} loading="lazy" />
                ) : (
                  <span aria-hidden="true">OPTINOV</span>
                )}
              </div>
              <span className="blog-carte__cat">{label(a.categorie)}</span>
              <h3>{a.titre}</h3>
              {a.extrait && <p className="blog-carte__extrait">{a.extrait}</p>}
              <div className="blog-carte__pied">
                <MetaArticle date={a.date} tempsLecture={a.tempsLecture} />
                <span className="blog-fleche" aria-hidden="true">→</span>
              </div>
            </Link>
          </article>
        ))}
      </div>

      {nbPages > 1 && (
        <nav className="blog-pagination" aria-label="Pages d'articles">
          <button
            type="button"
            className="blog-pagination__btn"
            onClick={() => setPage((p) => p - 1)}
            disabled={page === 0}
            aria-label="Articles précédents"
          >
            ‹
          </button>
          <span className="blog-pagination__num">
            {page + 1} / {nbPages}
          </span>
          <button
            type="button"
            className="blog-pagination__btn"
            onClick={() => setPage((p) => p + 1)}
            disabled={page >= nbPages - 1}
            aria-label="Articles suivants"
          >
            ›
          </button>
        </nav>
      )}
    </>
  );
}
