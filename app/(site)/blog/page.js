import Link from "next/link";
import { articles, categories, getCategorie } from "@/content/blog";
import { Breadcrumb, Reveal, WhatsAppFloat } from "@/components/Ui";
import BlogListe, { MetaArticle } from "@/components/BlogListe";

/** Blog — liste (G7) — CDC §6.7 */
export const metadata = {
  title: "Blog — Communication, marketing et IA",
  description:
    "Guides pratiques, comparatifs et études de cas sur la communication, le marketing digital, l'automatisation IA et la carte de visite digitale.",
  alternates: { canonical: "/blog" },
};

export default function Blog() {
  // Tant qu'aucun article n'est publié dans le tableau de bord, la page
  // affiche un état d'attente plutôt qu'un article inventé.
  const aLaUne = articles.find((a) => a.aLaUne) ?? articles[0] ?? null;
  const autres = aLaUne ? articles.filter((a) => a.slug !== aLaUne.slug) : [];

  return (
    <>
      <Breadcrumb items={[{ nom: "Blog", href: "/blog" }]} />

      <section className="hero hero--page">
        <div className="container">
          <Reveal>
            <span className="eyebrow">Le blog</span>
            <h1>Ce que nous apprenons, nous l&apos;écrivons</h1>
            <p className="lead">
              Guides pratiques, comparatifs et retours d&apos;expérience sur la communication
              et le digital en Afrique de l&apos;Ouest.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Article à la une — seulement s'il existe au moins un article.
          Présentation inspirée de skyrocketmonster.com/fr/blog (demande direction). */}
      {aLaUne && (
      <section className="section blog-une-section">
        <div className="container">
          <Reveal as="article" className="blog-une">
            <Link href={`/blog/${aLaUne.slug}`} className="blog-une__img" tabIndex={-1} aria-hidden="true">
              {aLaUne.image ? <img src={aLaUne.image} alt="" /> : <span>OPTINOV</span>}
            </Link>
            <div className="blog-une__texte">
              <span className="blog-carte__cat">À la une · {getCategorie(aLaUne.categorie)?.label}</span>
              <h2>{aLaUne.titre}</h2>
              {aLaUne.extrait && <p>{aLaUne.extrait}</p>}
              <MetaArticle date={aLaUne.date} tempsLecture={aLaUne.tempsLecture} />
              <Link className="btn btn--gold blog-une__btn" href={`/blog/${aLaUne.slug}`}>
                Lire l&apos;article <span className="blog-fleche" aria-hidden="true">→</span>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
      )}

      {/* Catégories en pastilles, grille de 3 colonnes, pagination par flèches.
          Le corps HTML des articles n'est pas envoyé au navigateur avec la liste. */}
      <section className="section" style={{ paddingTop: aLaUne ? ".5rem" : undefined }}>
        <div className="container">
          {autres.length > 0 && <BlogListe articles={autres.map(({ corps, ...carte }) => carte)} categories={categories} />}

          {articles.length === 0 && (
            <p className="empty-state">
              Nos premiers articles sont en cours de rédaction. Revenez bientôt, ou
              écrivez-nous dès maintenant pour en discuter.
            </p>
          )}
        </div>
      </section>

      {/* Bloc newsletter */}
      <section className="section section--alt">
        <div className="container" style={{ maxWidth: "44rem", textAlign: "center" }}>
          <Reveal>
            <span className="eyebrow">Newsletter</span>
            <h2>Un e-mail par mois, pas davantage</h2>
            <p className="lead">
              Nos analyses sur la communication et le digital, sans publicité déguisée.
              Inscrivez-vous en bas de page.
            </p>
          </Reveal>
        </div>
      </section>

      <WhatsAppFloat contexte="un article du blog" />
    </>
  );
}
