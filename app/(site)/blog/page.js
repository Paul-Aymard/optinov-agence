import Link from "next/link";
import { articles, categories, getCategorie } from "@/content/blog";
import { Breadcrumb, Reveal, WhatsAppFloat } from "@/components/Ui";

/** Blog — liste (G7) — CDC §6.7 */
export const metadata = {
  title: "Blog — Communication, marketing et IA",
  description:
    "Guides pratiques, comparatifs et études de cas sur la communication, le marketing digital, l'automatisation IA et la carte de visite digitale.",
  alternates: { canonical: "/blog" },
};

export default function Blog() {
  const aLaUne = articles.find((a) => a.aLaUne) ?? articles[0];
  const autres = articles.filter((a) => a.slug !== aLaUne.slug);

  return (
    <>
      <Breadcrumb items={[{ nom: "Blog", href: "/blog" }]} />

      <section className="hero hero--page">
        <div className="container">
          <Reveal>
            <span className="eyebrow">Le blog</span>
            <h1>Ce que nous apprenons, nous l&apos;écrivons</h1>
            <p className="lead">
              Guides pratiques, comparatifs et retours de terrain sur la communication et
              le digital en Afrique francophone.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Article à la une */}
      <section className="section">
        <div className="container">
          <Reveal className="card card--project" style={{ padding: 0 }}>
            <div className="hero__grid" style={{ gap: 0, alignItems: "stretch" }}>
              <div className="thumb" style={{ borderRadius: "var(--r-lg) 0 0 var(--r-lg)", margin: 0, aspectRatio: "auto", minHeight: "18rem" }}>
                Illustration de l’article
              </div>
              <div style={{ padding: "clamp(1.5rem, 3vw, 2.5rem)", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                <span className="tag">À la une · {getCategorie(aLaUne.categorie)?.label}</span>
                <h2>{aLaUne.titre}</h2>
                <p>{aLaUne.extrait}</p>
                <p className="meta">
                  <span>{aLaUne.tempsLecture} min de lecture</span>
                </p>
                <div style={{ marginTop: "1rem" }}>
                  <Link className="btn btn--gold btn--sm" href={`/blog/${aLaUne.slug}`}>
                    Lire l&apos;article
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Catégories — filtres (liens indexables plutôt que boutons JS, SEO-006) */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <nav className="filters" aria-label="Catégories du blog">
            <Link className="btn btn--sm btn--navy" href="/blog" style={{ borderRadius: "100px" }}>
              Toutes les catégories
            </Link>
            {categories.map((c) => (
              <Link key={c.id} className="btn btn--sm btn--ghost" href={`/blog?categorie=${c.id}`} style={{ borderRadius: "100px" }}>
                {c.label}
              </Link>
            ))}
          </nav>

          <div className="grid grid-3">
            {autres.map((a) => (
              <Reveal key={a.slug} className="card card--project">
                <div className="thumb">Illustration</div>
                <div className="card__body">
                  <span className="tag">{getCategorie(a.categorie)?.label}</span>
                  <h3 style={{ fontSize: "1.15rem" }}>{a.titre}</h3>
                  <p>{a.extrait}</p>
                  <p className="meta">
                    <span>{a.tempsLecture} min</span>
                  </p>
                  <Link className="link-arrow" href={`/blog/${a.slug}`}>Lire l&apos;article</Link>
                </div>
              </Reveal>
            ))}
          </div>

          <p className="form-note" style={{ marginTop: "2rem" }}>
            Pagination et filtrage serveur par catégorie : à brancher sur le CMS
            (§9.2, « Blog »). Calendrier éditorial : 2 à 4 articles par mois (SEO-009).
          </p>
        </div>
      </section>

      {/* Bloc newsletter */}
      <section className="section section--alt">
        <div className="container" style={{ maxWidth: "44rem", textAlign: "center" }}>
          <Reveal>
            <span className="eyebrow">Newsletter</span>
            <h2>Un e-mail par mois, pas davantage</h2>
            <p className="lead">
              Nos analyses sur la communication et le digital, sans promotion déguisée.
              Le formulaire est en pied de page.
            </p>
          </Reveal>
        </div>
      </section>

      <WhatsAppFloat contexte="un article du blog" />
    </>
  );
}
