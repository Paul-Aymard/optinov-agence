import Link from "next/link";
import { temoignages, lienRdv } from "@/content/site";
import { services } from "@/content/services";
import { faqCourteServices } from "@/content/faq";
import { Breadcrumb, Reveal, Accordion, FaqJsonLd, WhatsAppFloat } from "@/components/Ui";

/**
 * Hub Services (G3) — CDC §6.3
 * Objectif : router chaque visiteur vers le bon service en un clic.
 * Cartes de hauteur égale, libellés identiques au menu, un seul niveau de clic.
 */
export const metadata = {
  title: "Nos services",
  description:
    "Identité de marque, réseaux sociaux, stratégie marketing, automatisation IA, photo et vidéo : cinq expertises au service de vos résultats.",
  alternates: { canonical: "/services" },
};

export default function HubServices() {
  return (
    <>
      <Breadcrumb items={[{ nom: "Nos services", href: "/services" }]} />

      <section className="hero hero--page">
        <div className="container">
          <Reveal>
            <span className="eyebrow">Nos services</span>
            <h1>Cinq expertises, une chaîne complète</h1>
            <p className="lead">
              De la plateforme de marque à la campagne diffusée, nous couvrons tout ce qui
              fait qu&apos;une communication produit des résultats — et rien de ce qui ne
              sert qu&apos;à remplir un devis.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Grille des 5 services */}
      <section className="section">
        <div className="container">
          <div className="grid grid-3">
            {services.map((s) => (
              <Reveal key={s.slug} className="card">
                <div className="card__icon" aria-hidden="true">{s.icone}</div>
                <h3>{s.titre}</h3>
                <p>{s.description}</p>
                <ul>
                  {s.livrablesTypes.map((l) => (
                    <li key={l}>{l}</li>
                  ))}
                </ul>
                <Link className="link-arrow" href={`/services/${s.slug}`}>
                  Découvrir<span className="sr-only"> {s.titre}</span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Bloc « Vous ne savez pas par où commencer ? »
          Le témoignage transversal n'apparaît qu'une fois un verbatim réel recueilli. */}
      <section className="section section--navy">
        <div className={`container${temoignages.length > 0 ? " hero__grid" : ""}`}>
          <Reveal>
            <span className="eyebrow">Par où commencer ?</span>
            <h2>Vous ne savez pas de quel service vous avez besoin ?</h2>
            <p className="lead">
              C&apos;est le cas de la plupart de nos clients au premier rendez-vous. Nous
              commençons alors par un audit de communication : trente minutes pour
              comprendre, un document pour trancher.
            </p>
            <div className="btn-group" style={{ marginTop: "1.5rem" }}>
              <a className="btn btn--gold" href={lienRdv()} data-ga="cta_rdv">Demander un audit</a>
              <Link className="btn btn--ghost" href="/contact">Nous écrire</Link>
            </div>
          </Reveal>
          {temoignages.length > 0 && (
            <Reveal>
              <figure className="quote">
                <blockquote>{temoignages[0].verbatim}</blockquote>
                <figcaption>
                  <span className="avatar" aria-hidden="true">{temoignages[0].nom.slice(0, 2)}</span>
                  <span>
                    <strong>{temoignages[0].nom}</strong>
                    <span>{temoignages[0].fonction}</span>
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          )}
        </div>
      </section>

      {/* FAQ courte — 3 questions */}
      <section className="section">
        <div className="container" style={{ maxWidth: "56rem" }}>
          <Reveal className="section-head center">
            <span className="eyebrow">Questions fréquentes</span>
            <h2>Trois réponses avant de nous appeler</h2>
          </Reveal>
          <Accordion items={faqCourteServices} />
          <p style={{ marginTop: "2rem", textAlign: "center" }}>
            <Link className="link-arrow" href="/faq">Consulter la FAQ complète</Link>
          </p>
        </div>
      </section>

      <FaqJsonLd items={faqCourteServices} />
      <WhatsAppFloat contexte="le choix d'un service" />
    </>
  );
}
