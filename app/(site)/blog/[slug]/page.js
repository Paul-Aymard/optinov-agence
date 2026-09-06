import Link from "next/link";
import { notFound } from "next/navigation";
import { articles, getArticle, getCategorie } from "@/content/blog";
import { getService } from "@/content/services";
import { site, estRenseigne } from "@/content/site";
import { Breadcrumb, Reveal, JsonLd, WhatsAppFloat } from "@/components/Ui";

// Export statique : seules les pages listées existent (les autres → 404).
export const dynamicParams = false;

export function generateStaticParams() {
  // L'export statique exige au moins un chemin : sans article, on en génère
  // un factice que la page renvoie en 404 (slug inconnu).
  if (articles.length === 0) return [{ slug: "a-venir" }];
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const a = getArticle(slug);
  if (!a) return {};
  return {
    title: a.titre.slice(0, 43),
    description: a.extrait.slice(0, 155),
    alternates: { canonical: `/blog/${a.slug}` },
    openGraph: { type: "article", title: a.titre, description: a.extrait },
  };
}

/**
 * Article de blog (G7) — CDC §6.7
 * Fil d'Ariane · H1 · métadonnées · sommaire ancré · corps enrichi · bloc auteur ·
 * CTA contextuel (service lié) · articles similaires · partage social (EX-038).
 * SEO-005 : Schema.org Article. SEO-007 : lien contextuel vers la page service.
 */
export default async function Article({ params }) {
  const { slug } = await params;
  const a = getArticle(slug);
  if (!a) notFound();

  const cat = getCategorie(a.categorie);
  const service = a.serviceLie ? getService(a.serviceLie) : null;
  const similaires = articles.filter((x) => x.categorie === a.categorie && x.slug !== a.slug).slice(0, 3);
  const urlArticle = `${site.url}/blog/${a.slug}`;

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: a.titre,
    description: a.extrait,
    author: { "@type": "Organization", name: site.nom },
    publisher: { "@type": "Organization", name: site.nom },
    mainEntityOfPage: urlArticle,
  };

  return (
    <>
      <Breadcrumb
        items={[
          { nom: "Blog", href: "/blog" },
          { nom: a.titre, href: `/blog/${a.slug}` },
        ]}
      />

      <article className="section">
        <div className="container">
          <Reveal style={{ maxWidth: "68ch", marginInline: "auto" }}>
            <span className="tag">{cat?.label}</span>
            <h1>{a.titre}</h1>
            <p className="meta" style={{ marginBottom: "2rem" }}>
              <span>Par {a.auteur}</span>
              <span>{a.tempsLecture} min de lecture</span>
            </p>
          </Reveal>

          <Reveal className="hero-visual" style={{ aspectRatio: "16/9", maxWidth: "68ch", marginInline: "auto", overflow: "hidden" }}>
            {a.image ? (
              <img src={a.image} alt={a.titre} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            ) : (
              <p className="ph">Illustration de l’article</p>
            )}
          </Reveal>

          <div className="prose" style={{ marginInline: "auto", marginTop: "2.5rem" }}>
            {/* Le corps est rédigé en phase 2 « Contenus » (§16) puis servi par le CMS.
                Le sommaire ancré sera généré à partir de ses H2. Tant qu'il n'existe
                pas, on affiche l'accroche et un état « à paraître » plutôt qu'un
                sommaire pointant vers des sections vides. */}
            {estRenseigne(a.corps) ? (
              <div dangerouslySetInnerHTML={{ __html: a.corps }} />
            ) : (
              <>
                <p style={{ fontSize: "1.1rem" }}>{a.extrait}</p>
                <p className="notice">
                  <strong>Article à paraître.</strong> Cette analyse est en cours de
                  rédaction. Pour en discuter dès maintenant, écrivez-nous.
                </p>
              </>
            )}

            {/* SEO-007 : lien contextuel descendant vers la page service ou la landing */}
            {service && (
              <p className="notice">
                <strong>Pour aller plus loin :</strong> découvrez notre offre{" "}
                <Link href={`/services/${service.slug}`}>{service.titre}</Link>.
              </p>
            )}
            {a.landingLiee && (
              <p className="notice">
                <strong>Pour aller plus loin :</strong> découvrez{" "}
                <Link href={a.landingLiee}>PROS.CARDS, la carte de visite digitale</Link>.
              </p>
            )}

            {/* Partage social — EX-038, S */}
            <div style={{ marginTop: "2.5rem", borderTop: "1px solid var(--border)", paddingTop: "1.5rem" }}>
              <h2 style={{ fontSize: "1rem", marginTop: 0 }}>Partager cet article</h2>
              <div className="btn-group">
                <a className="btn btn--sm btn--ghost" href={`https://wa.me/?text=${encodeURIComponent(`${a.titre} ${urlArticle}`)}`} target="_blank" rel="noopener noreferrer">WhatsApp</a>
                <a className="btn btn--sm btn--ghost" href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(urlArticle)}`} target="_blank" rel="noopener noreferrer">LinkedIn</a>
                <a className="btn btn--sm btn--ghost" href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(urlArticle)}`} target="_blank" rel="noopener noreferrer">Facebook</a>
                <a className="btn btn--sm btn--ghost" href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(urlArticle)}&text=${encodeURIComponent(a.titre)}`} target="_blank" rel="noopener noreferrer">X</a>
              </div>
            </div>

            {/* Bloc auteur */}
            <div className="form-card" style={{ marginTop: "2.5rem", display: "flex", gap: "1.2rem", alignItems: "center" }}>
              <span className="avatar" aria-hidden="true">OP</span>
              <div>
                <strong>{a.auteur}</strong>
                <p style={{ margin: 0, fontSize: ".88rem", color: "var(--text-muted)" }}>
                  {site.nom} — {site.baseline}
                </p>
              </div>
            </div>
          </div>
        </div>
      </article>

      {/* Articles similaires */}
      {similaires.length > 0 && (
        <section className="section section--alt">
          <div className="container">
            <h2>À lire également</h2>
            <div className="grid grid-3">
              {similaires.map((s) => (
                <Reveal key={s.slug} className="card">
                  <span className="tag">{s.tempsLecture} min</span>
                  <h3 style={{ fontSize: "1.1rem" }}>{s.titre}</h3>
                  <p>{s.extrait}</p>
                  <Link className="link-arrow" href={`/blog/${s.slug}`}>Lire</Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      <JsonLd data={articleJsonLd} />
      <WhatsAppFloat contexte={cat?.label ?? "un article"} />
    </>
  );
}
