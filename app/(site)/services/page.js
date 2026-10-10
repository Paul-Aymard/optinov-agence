import Link from "next/link";
import { temoignages, lienRdv } from "@/content/site";
import { services } from "@/content/services";
import { getPageService } from "@/content/servicesPages";
import imagesServices from "@/content/generated/services.json";
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
    "Identité de marque, communication digitale, marketing & stratégie, automatisation & IA, photo & vidéo : cinq expertises au service de vos résultats.",
  alternates: { canonical: "/services" },
};

/**
 * Carte d'un service (hub) — factorisée pour les 2 rangées.
 *
 * PDF « NOUVELLE MODIF AGENCE » : au survol, la carte se retourne et montre au
 * dos une image (« Dos de la carte » dans le tableau de bord) et un bouton
 * « Découvrir ». Sans image, le dos prend la couleur du service. Sur écran
 * tactile (pas de survol), la carte ne se retourne pas : la face avant garde
 * son lien « Découvrir ».
 */
function carteServiceHub(s) {
  const image = imagesServices[s.slug]?.carte || "";
  const accent = getPageService(s.slug)?.accentVar || "--or";
  return (
    <Reveal key={s.slug} className="carte-flip" style={{ "--accent": `var(${accent})` }}>
      <div className="carte-flip__inner">
        <div className="card carte-flip__avant">
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
        </div>
        {/* Dos : décor + raccourci souris ; le lien accessible est sur la face avant. */}
        <div className="carte-flip__dos" aria-hidden="true">
          {image ? <img src={image} alt="" loading="lazy" /> : <span className="carte-flip__nom">{s.titre}</span>}
          <Link className="carte-flip__btn" href={`/services/${s.slug}`} tabIndex={-1}>
            Découvrir <span>→</span>
          </Link>
        </div>
      </div>
    </Reveal>
  );
}

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
              De l&apos;identité de votre marque jusqu&apos;à la campagne diffusée, nous couvrons
              tout ce qui fait qu&apos;une communication produit des résultats. Une seule
              équipe, un seul interlocuteur.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Grille des 5 services */}
      <section className="section">
        <div className="container">
          {/* Rangée du haut : 2 cartes larges */}
          <div className="grid grid-2 solutions-grille">
            {services.slice(0, 2).map(carteServiceHub)}
          </div>
          {/* Rangée du bas : les 3 autres */}
          <div className="grid grid-3 solutions-grille solutions-grille--bas">
            {services.slice(2).map(carteServiceHub)}
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
              C&apos;est le cas de la plupart de nos clients au départ. Nous commençons
              alors par un diagnostic de votre communication, pour vous dire clairement
              par où commencer.
            </p>
            <div className="btn-group" style={{ marginTop: "1.5rem" }}>
              <a className="btn btn--gold" href={lienRdv()} data-ga="cta_rdv">Demander un diagnostic</a>
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
            <h2>Trois questions qu&apos;on nous pose souvent</h2>
          </Reveal>
          <Accordion items={faqCourteServices} variante="fondu" />
          <p style={{ marginTop: "2rem", textAlign: "center" }}>
            <Link className="link-arrow" href="/faq">Voir toutes les questions</Link>
          </p>
        </div>
      </section>

      <FaqJsonLd items={faqCourteServices} />
      <WhatsAppFloat contexte="le choix d'un service" />
    </>
  );
}
