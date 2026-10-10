import { projets, sectionsRealisations } from "@/content/realisations";
import { Breadcrumb, Reveal, CtaBand, WhatsAppFloat } from "@/components/Ui";
import RealisationsSections from "@/components/RealisationsSections";

/** Réalisations (G6) — CDC §6.6 */
export const metadata = {
  title: "Réalisations et études de cas",
  description:
    "Identité de marque, campagnes digitales, automatisation, photo et vidéo : nos projets récents, leurs objectifs et les résultats obtenus.",
  alternates: { canonical: "/realisations" },
};

export default function Realisations() {
  return (
    <>
      <Breadcrumb items={[{ nom: "Réalisations", href: "/realisations" }]} />

      <section className="hero hero--page">
        <div className="container">
          <Reveal>
            <span className="eyebrow">Réalisations</span>
            <h1>Ce que nous avons livré, et ce que ça a produit</h1>
            <p className="lead">
              Chaque projet est présenté avec son contexte, notre réponse et les résultats
              obtenus. Sans arrondir les chiffres.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container">
          {projets.length > 0 ? (
            /* Sections et sens de défilement pilotés depuis le tableau de bord.
               Seuls les champs utiles aux vignettes partent au navigateur. */
            <RealisationsSections
              sections={sectionsRealisations}
              projets={projets.map(({ slug, client, visuel, sections }) => ({ slug, client, visuel, sections }))}
            />
          ) : (
            <p className="empty-state">
              Nos études de cas sont en cours de publication.
              <br />
              <span style={{ fontSize: ".9rem" }}>
                En attendant, parlons directement de votre projet.
              </span>
            </p>
          )}
        </div>
      </section>

      <section className="section section--alt">
        <div className="container">
          <CtaBand
            titre="Vous avez un projet similaire ?"
            texte="Décrivez-le en deux lignes. Nous vous dirons franchement si nous sommes les bons interlocuteurs."
            contexte="un projet similaire à vos réalisations"
          />
        </div>
      </section>

      <WhatsAppFloat contexte="vos réalisations" />
    </>
  );
}
