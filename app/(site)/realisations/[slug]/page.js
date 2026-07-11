import Link from "next/link";
import { notFound } from "next/navigation";
import { projets, getProjet, filtresSecteurs } from "@/content/realisations";
import { TODO } from "@/content/site";
import { Breadcrumb, Reveal, AvantApres, WhatsAppFloat } from "@/components/Ui";
import { FormulaireContact } from "@/components/Forms";

export function generateStaticParams() {
  return projets.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const p = getProjet(slug);
  if (!p) return {};
  return {
    title: `${p.client} — Étude de cas`,
    description: p.extrait,
    alternates: { canonical: `/realisations/${p.slug}` },
  };
}

/**
 * Fiche projet — EX-012, M : contexte, objectifs, réponse OPTINOV, visuels,
 * résultats chiffrés. EX-013 (avant/après), EX-014 (étude de cas longue),
 * EX-015 (CTA contextualisé de fin de fiche).
 * UX : navigation projet précédent / suivant.
 */
export default async function FicheProjet({ params }) {
  const { slug } = await params;
  const p = getProjet(slug);
  if (!p) notFound();

  const i = projets.findIndex((x) => x.slug === slug);
  const precedent = projets[i - 1];
  const suivant = projets[i + 1];
  const secteur = filtresSecteurs.find((s) => s.id === p.secteur)?.label;

  return (
    <>
      <Breadcrumb
        items={[
          { nom: "Réalisations", href: "/realisations" },
          { nom: p.client === TODO ? "Projet" : p.client, href: `/realisations/${p.slug}` },
        ]}
      />

      <section className="hero hero--page">
        <div className="container">
          <Reveal>
            <span className="eyebrow">{secteur} · {p.annee}</span>
            <h1>{p.titre}</h1>
            <p className="lead">{p.extrait}</p>
          </Reveal>
        </div>
      </section>

      {/* Galerie / visuel principal */}
      <section className="section">
        <div className="container">
          <Reveal className="hero-visual" style={{ aspectRatio: "16/9" }}>
            <p className="ph">Galerie haute qualité — visuels et vidéos<br />{TODO}</p>
          </Reveal>
        </div>
      </section>

      {/* Contexte · Objectifs · Réponse */}
      <section className="section">
        <div className="container hero__grid">
          <Reveal className="prose">
            <h2>Le contexte</h2>
            <p>{p.contexte}</p>

            <h2>Notre réponse</h2>
            <p>{p.reponse}</p>
          </Reveal>

          <Reveal className="form-card">
            <h3 style={{ fontSize: "1.15rem" }}>Objectifs</h3>
            <ul style={{ display: "grid", gap: ".6rem", paddingLeft: "1.1em" }}>
              {p.objectifs.map((o, k) => (
                <li key={k}>{o}</li>
              ))}
            </ul>
            <h3 style={{ fontSize: "1.15rem", marginTop: "1.5rem" }}>Mission</h3>
            <p className="meta"><span>{p.typeMission}</span><span>{p.annee}</span></p>
          </Reveal>
        </div>
      </section>

      {/* Avant / Après — EX-013, S */}
      {p.avantApres && (
        <section className="section section--alt">
          <div className="container" style={{ maxWidth: "60rem" }}>
            <Reveal className="section-head center">
              <span className="eyebrow">Avant / Après</span>
              <h2>La refonte, curseur en main</h2>
            </Reveal>
            <Reveal>
              <AvantApres avant="Avant" apres="Après" />
            </Reveal>
            <p className="form-note center" style={{ marginTop: "1rem" }}>
              Visuels avant/après du projet : {TODO}
            </p>
          </div>
        </section>
      )}

      {/* Résultats chiffrés */}
      <section className="section section--navy">
        <div className="container">
          <Reveal className="section-head center">
            <span className="eyebrow">Résultats</span>
            <h2>Ce que le projet a produit</h2>
          </Reveal>
          <div className="stats">
            {p.resultats.map((r, k) => (
              <Reveal key={k} className="stat">
                <div className="stat__num" style={{ color: "#fff" }}>{r.valeur}</div>
                <div className="stat__label" style={{ color: "#b9c2d4" }}>{r.label}</div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Témoignage client */}
      <section className="section">
        <div className="container" style={{ maxWidth: "48rem" }}>
          <Reveal>
            <figure className="quote">
              <blockquote>{p.temoignage.verbatim}</blockquote>
              <figcaption>
                <span className="avatar" aria-hidden="true">—</span>
                <span>
                  <strong>{p.temoignage.nom}</strong>
                  <span>{p.temoignage.fonction}</span>
                </span>
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </section>

      {/* Navigation projet précédent / suivant */}
      <section className="section section--alt">
        <div className="container">
          <div className="grid grid-2">
            {precedent ? (
              <Link className="card" href={`/realisations/${precedent.slug}`}>
                <span className="tag">Projet précédent</span>
                <h3 style={{ fontSize: "1.1rem" }}>{precedent.client}</h3>
              </Link>
            ) : <div />}
            {suivant && (
              <Link className="card" href={`/realisations/${suivant.slug}`} style={{ textAlign: "right" }}>
                <span className="tag">Projet suivant</span>
                <h3 style={{ fontSize: "1.1rem" }}>{suivant.client}</h3>
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* EX-015 : CTA contextualisé de fin de fiche */}
      <section className="section">
        <div className="container hero__grid">
          <Reveal>
            <h2>Vous avez un projet similaire ?</h2>
            <p className="lead">
              Nous partons de votre contexte, pas de ce que nous avons déjà fait ailleurs.
              Racontez-nous le vôtre.
            </p>
          </Reveal>
          <Reveal className="form-card">
            <FormulaireContact sujetParDefaut="Demande de devis" />
          </Reveal>
        </div>
      </section>

      <WhatsAppFloat contexte={`le projet ${p.client === TODO ? "présenté" : p.client}`} />
    </>
  );
}
