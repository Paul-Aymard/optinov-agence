import Link from "next/link";
import { notFound } from "next/navigation";
import { site, lienRdv, lienWhatsApp, estRenseigne } from "@/content/site";
import { services, getService } from "@/content/services";
import { projetsParService } from "@/content/realisations";
import { articlesParService } from "@/content/blog";
import {
  Breadcrumb, Reveal, Accordion, FaqJsonLd, JsonLd, WhatsAppFloat,
} from "@/components/Ui";
import { FormulaireDevisService } from "@/components/Forms";

/** SSG des 5 pages services — SEO-006 (rendu serveur, zéro dépendance JS) */
export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) return {};
  return {
    // SEO-003 : title ≤ 60 caractères, meta description ≤ 155
    title: `${s.titre} à Abidjan`,
    description: s.sousTitre.slice(0, 155),
    alternates: { canonical: `/services/${s.slug}` },
    openGraph: { title: `${s.titre} — OPTINOV Agence`, description: s.sousTitre },
  };
}

/**
 * Pages Services (G4) — CDC §6.4, gabarit commun.
 * Blocs imposés : 1 Hero · 2 Problématique · 3 Notre réponse · 4 Bénéfices ·
 * 5 Processus · 6 Réalisations liées · 7 FAQ service · 8 CTA final.
 * UX : un CTA par écran, preuves avant tarifs, vocabulaire client.
 */
export default async function PageService({ params }) {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) notFound();

  const realisations = projetsParService(s.secteurs[0]);
  const billets = articlesParService(s.slug);

  // SEO-005 : Schema.org Service
  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: s.titre,
    description: s.description,
    serviceType: s.titre,
    provider: { "@type": "Organization", name: site.nom, url: site.url },
    areaServed: { "@type": "Country", name: "Côte d'Ivoire" },
  };

  return (
    <>
      <Breadcrumb
        items={[
          { nom: "Nos services", href: "/services" },
          { nom: s.titre, href: `/services/${s.slug}` },
        ]}
      />

      {/* 1. Hero */}
      <section className="hero hero--page">
        <div className="container hero__grid">
          <Reveal>
            <span className="eyebrow">{s.titre}</span>
            <h1>{s.h1}</h1>
            <p className="lead">{s.sousTitre}</p>
            <div className="btn-group" style={{ marginTop: "1.8rem" }}>
              <a className="btn btn--gold" href="#devis" data-ga="cta_devis">Demander un devis</a>
            </div>
          </Reveal>
          <Reveal>
            <div className="hero-visual">
              <p className="ph">{s.titre}</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 2. Problématique — 3 douleurs, du point de vue du persona */}
      <section className="section">
        <div className="container">
          <Reveal className="section-head center">
            <span className="eyebrow">Le problème</span>
            <h2>Si vous vous reconnaissez ici, parlons-en</h2>
          </Reveal>
          <div className="grid grid-3">
            {s.douleurs.map((d) => (
              <Reveal key={d.titre} className="card card--flat">
                <h3>{d.titre}</h3>
                <p>{d.texte}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Notre réponse — texte 60 % + liste livrables 40 % */}
      <section className="section section--alt">
        <div className="container hero__grid">
          <Reveal>
            <span className="eyebrow">Notre réponse</span>
            <h2>Comment nous procédons</h2>
            <p>{s.reponse.texte}</p>
          </Reveal>
          <Reveal className="form-card">
            <h3 style={{ fontSize: "1.15rem" }}>Ce que vous recevez</h3>
            <ul style={{ display: "grid", gap: ".6rem", paddingLeft: "1.1em", margin: 0 }}>
              {s.reponse.livrables.map((l) => (
                <li key={l}>{l}</li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* 4. Bénéfices — chacun avec sa phrase de preuve */}
      <section className="section">
        <div className="container">
          <Reveal className="section-head center">
            <span className="eyebrow">Bénéfices</span>
            <h2>Ce que cela change pour vous</h2>
          </Reveal>
          <div className="grid grid-4">
            {s.benefices.map((b) => (
              <Reveal key={b.titre} className="card">
                <div className="card__icon" aria-hidden="true">✓</div>
                <h3 style={{ fontSize: "1.05rem" }}>{b.titre}</h3>
                <p>{b.preuve}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Processus — timeline, délais indicatifs [À compléter] */}
      <section className="section section--navy">
        <div className="container">
          <Reveal className="section-head center">
            <span className="eyebrow">Processus</span>
            <h2>Du brief à la livraison</h2>
          </Reveal>
          <div className="steps">
            {s.processus.map((p) => (
              <Reveal key={p.titre} className="step">
                <h3>{p.titre}</h3>
                <p>{p.texte}</p>
                {/* Délais indicatifs [À compléter] au CDC §6.4 : la ligne
                    n'apparaît qu'une fois les délais arrêtés. */}
                {estRenseigne(p.delai) && (
                  <p style={{ color: "var(--or)", fontSize: ".82rem", marginTop: ".4rem" }}>
                    Délai : {p.delai}
                  </p>
                )}
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Réalisations et articles liés — §5.3.
             Chaque bloc n'apparaît que s'il a du contenu à montrer. */}
      {(realisations.length > 0 || billets.length > 0) && (
        <section className="section">
          <div className="container">
            {realisations.length > 0 && (
              <>
                <Reveal className="section-head">
                  <span className="eyebrow">Réalisations</span>
                  <h2>Deux projets de ce type</h2>
                </Reveal>
                <div className="grid grid-2">
                  {realisations.map((p) => (
                    <Reveal key={p.slug} className="card card--project">
                      <div className="thumb">{p.client}</div>
                      <div className="card__body">
                        <span className="tag">{p.typeMission}</span>
                        <h3>{p.client}</h3>
                        <p>{p.extrait}</p>
                        <Link className="link-arrow" href={`/realisations/${p.slug}`}>Voir l&apos;étude de cas</Link>
                      </div>
                    </Reveal>
                  ))}
                </div>
              </>
            )}

            {billets.length > 0 && (
              <>
                <Reveal className="section-head" style={{ marginTop: realisations.length > 0 ? "3rem" : 0 }}>
                  <span className="eyebrow">Le blog</span>
                  <h2>À lire sur le sujet</h2>
                </Reveal>
                <div className="grid grid-2">
                  {billets.map((a) => (
                    <Reveal key={a.slug} className="card">
                      <span className="tag">{a.tempsLecture} min</span>
                      <h3 style={{ fontSize: "1.1rem" }}>{a.titre}</h3>
                      <p>{a.extrait}</p>
                      <Link className="link-arrow" href={`/blog/${a.slug}`}>Lire l&apos;article</Link>
                    </Reveal>
                  ))}
                </div>
              </>
            )}
          </div>
        </section>
      )}

      {/* 7. FAQ service — 3 à 5 questions, Schema.org FAQPage */}
      <section className="section section--alt">
        <div className="container" style={{ maxWidth: "56rem" }}>
          <Reveal className="section-head center">
            <span className="eyebrow">FAQ</span>
            <h2>Questions fréquentes</h2>
          </Reveal>
          <Accordion items={s.faq} />
        </div>
      </section>

      {/* 8. CTA final — formulaire contextualisé, service pré-sélectionné */}
      <section className="section" id="devis">
        <div className="container hero__grid">
          <Reveal>
            <h2>Parlons de votre projet {s.titre.toLowerCase()}</h2>
            <p className="lead">
              Décrivez votre besoin en quelques lignes. Un chef de projet vous rappelle
              sous 24 h ouvrées, avec des questions précises plutôt qu&apos;un devis type.
            </p>
            <div className="btn-group" style={{ marginTop: "1.5rem" }}>
              <a
                className="btn btn--wa"
                href={lienWhatsApp(s.titre)}
                target="_blank"
                rel="noopener noreferrer"
                data-ga="clic_whatsapp"
              >
                Écrire sur WhatsApp
              </a>
              <a className="btn btn--ghost" href={lienRdv()} data-ga="cta_rdv">Prendre rendez-vous</a>
            </div>
          </Reveal>
          <Reveal className="form-card">
            <FormulaireDevisService serviceSlug={s.slug} />
          </Reveal>
        </div>
      </section>

      <FaqJsonLd items={s.faq} />
      <JsonLd data={serviceJsonLd} />
      <WhatsAppFloat contexte={s.titre} />
    </>
  );
}
