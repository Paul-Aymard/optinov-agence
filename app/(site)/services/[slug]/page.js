import Link from "next/link";
import { notFound } from "next/navigation";
import { site, lienRdv, lienWhatsApp } from "@/content/site";
import { services, getService } from "@/content/services";
import { getPageService } from "@/content/servicesPages";
import { projetsParService } from "@/content/realisations";
import {
  Breadcrumb, Reveal, Accordion, FaqJsonLd, JsonLd, WhatsAppFloat,
} from "@/components/Ui";
import { FormulaireDevisService } from "@/components/Forms";
import { Lignes, Vision } from "@/components/Lignes";

/** SSG des 5 pages services — SEO-006 (rendu serveur, zéro dépendance JS) */
// Export statique : seules les pages listées existent (les autres → 404).
export const dynamicParams = false;

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
    openGraph: { title: `${s.titre} — OPTINOV`, description: s.sousTitre },
  };
}

/**
 * Pages Services (G4) — refonte « 5 actes » (fichier direction).
 * Récit court et rythmé : Hero · trois actes · manifeste · transition.
 * On conserve la FAQ (Schema.org), le formulaire de devis et le JSON-LD Service.
 * La couleur d'accent propre au service est portée par --accent (règle 80/20).
 */
export default async function PageService({ params }) {
  const { slug } = await params;
  const s = getService(slug);
  const p = getPageService(slug);
  if (!s || !p) notFound();

  const realisations = projetsParService(s.secteurs[0]);

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

  const RealisationsGrid = () =>
    realisations.length > 0 ? (
      <div className="grid grid-2" style={{ marginTop: "2rem" }}>
        {realisations.map((r) => (
          <Reveal key={r.slug} className="card card--project">
            <div className="thumb">{r.client}</div>
            <div className="card__body">
              <span className="tag">{r.typeMission}</span>
              <h3>{r.client}</h3>
              <p>{r.extrait}</p>
              <Link className="link-arrow" href={`/realisations/${r.slug}`}>Voir l&apos;étude de cas</Link>
            </div>
          </Reveal>
        ))}
      </div>
    ) : null;

  return (
    <div
      className={`service-page${p.universSombre ? " service-page--sombre" : ""}`}
      data-service={slug}
      style={{ "--accent": `var(${p.accentVar})` }}
    >
      <Breadcrumb
        items={[
          { nom: "Nos services", href: "/services" },
          { nom: s.titre, href: `/services/${s.slug}` },
        ]}
      />

      {/* ACTE 1 — HERO */}
      <section className="svc-hero">
        <div className="container">
          <Reveal>
            <span className="eyebrow svc-verbe">{p.verbe} — {s.titre}</span>
            <h1>{p.heroTitre}</h1>
            <p className="svc-vision">
              Cette solution active les étapes <b>{p.visionLettres}</b> de la méthode <b className="vision-mot">V.I.S.I.O.N.</b>
              <span>{p.visionEtapes}</span>
            </p>
            {p.accroche && <p className="svc-accroche">{p.accroche}</p>}
            {p.heroParas.map((t, i) => (
              <p key={i} className={i === 0 ? "lead" : undefined}><Lignes>{t}</Lignes></p>
            ))}
            <div className="btn-group" style={{ marginTop: "1.8rem" }}>
              <a className="btn btn--accent" href={p.heroCta.href} data-ga="cta_devis">
                {p.heroCta.label}
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ACTES 2 · 3 · 4 — le récit */}
      {p.actes.map((acte, i) => (
        <section
          key={acte.titre}
          className={`svc-acte section${i % 2 === 0 ? " section--alt" : ""}${i % 2 === 1 ? " svc-acte--inverse" : ""}`}
        >
          <div className="container svc-acte__grid">
            <div className="svc-acte__texte">
              <Reveal className="svc-acte__head">
                <h2>{acte.titre}</h2>
              </Reveal>
              <Reveal className="svc-acte__body">
                {acte.paras.map((t, j) => (
                  <p key={j}><Lignes>{t}</Lignes></p>
                ))}

                {acte.liste && (
                  <ul className="svc-liste">
                    {acte.liste.map((it) => (
                      <li key={it.cle}>
                        {it.icone && <span className="svc-liste__ic" aria-hidden="true">{it.icone}</span>}
                        <span className="svc-liste__cle">{it.cle}</span>
                        {it.valeur && <span className="svc-liste__val">{it.valeur}</span>}
                      </li>
                    ))}
                  </ul>
                )}

                {acte.checklist && (
                  <ul className="svc-check">
                    {acte.checklist.map((c) => (
                      <li key={c}>{c}</li>
                    ))}
                  </ul>
                )}

                {acte.parcours && (
                  <div className="svc-parcours" aria-hidden="true">
                    {acte.parcours.map((etape, k) => (
                      <span key={etape} className="svc-parcours__etape">
                        {etape}
                        {k < acte.parcours.length - 1 && <i>→</i>}
                      </span>
                    ))}
                  </div>
                )}

                {acte.chute && <p className="svc-chute"><Lignes>{acte.chute}</Lignes></p>}
                {acte.realisations && <RealisationsGrid />}
              </Reveal>
            </div>

            {/* Cadre où insérer une illustration — alterné gauche/droite selon l'acte */}
            <Reveal className="svc-acte__media">
              <div className="ph-media" aria-hidden="true">Illustration</div>
            </Reveal>
          </div>
        </section>
      ))}

      {/* ACTE 5 — MANIFESTE + CTA */}
      <section className="svc-manifeste">
        <div className="container">
          <Reveal className="section-head center">
            <h2>{p.manifeste.titre}</h2>
            {p.manifeste.paras.map((t, i) => (
              <p key={i} className={i === 0 ? "lead" : undefined}><Lignes>{t}</Lignes></p>
            ))}
            <div className="btn-group" style={{ justifyContent: "center", marginTop: "1.8rem" }}>
              <a className="btn btn--accent" href={p.manifeste.ctaPrincipal.href} data-ga="cta_devis">
                {p.manifeste.ctaPrincipal.label}
              </a>
              <a className="btn btn--ghost" href={p.manifeste.ctaSecondaire.href}>
                {p.manifeste.ctaSecondaire.label}
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FAQ service — Schema.org FAQPage (SEO conservé) */}
      <section className="section section--alt">
        <div className="container" style={{ maxWidth: "56rem" }}>
          <Reveal className="section-head center">
            <span className="eyebrow eyebrow--faq">FAQ</span>
            <h2>Questions fréquentes</h2>
          </Reveal>
          <Accordion items={s.faq} />
        </div>
      </section>

      {/* Formulaire de devis contextualisé (#devis) */}
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

      {/* TRANSITION — pont vers le service suivant (fil narratif du site) */}
      <section className="svc-transition">
        <div className="container">
          <Reveal className="center">
            {p.transition.paras.map((t, i) => (
              <p key={i} className={i === 0 ? "svc-transition__lead" : undefined}><Lignes>{t}</Lignes></p>
            ))}
            <Link className="btn btn--accent btn--lg" href={p.transition.bouton.href}>
              <Vision>{p.transition.bouton.label}</Vision> <span aria-hidden="true">→</span>
            </Link>
          </Reveal>
        </div>
      </section>

      <FaqJsonLd items={s.faq} />
      <JsonLd data={serviceJsonLd} />
      <WhatsAppFloat contexte={s.titre} />
    </div>
  );
}
