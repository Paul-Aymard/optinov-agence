import Link from "next/link";
import { TODO } from "@/content/site";
import { Breadcrumb, Reveal, CtaBand, WhatsAppFloat } from "@/components/Ui";

/**
 * Hub Solutions (G3) — CDC §6.5
 * Page volontairement courte : la conversion se joue sur la landing PROS.CARDS.
 * L'architecture prévoit l'ajout d'autres solutions sans refonte.
 */
export const metadata = {
  title: "Nos solutions numériques",
  description:
    "Les produits numériques développés par OPTINOV, à commencer par PROS.CARDS, la carte de visite digitale en libre-service.",
  alternates: { canonical: "/solutions" },
};

export default function HubSolutions() {
  return (
    <>
      <Breadcrumb items={[{ nom: "Solutions", href: "/solutions" }]} />

      <section className="hero hero--page">
        <div className="container">
          <Reveal>
            <span className="eyebrow">Solutions</span>
            <h1>Nos solutions numériques</h1>
            <p className="lead">
              Quand un besoin revient chez tous nos clients, nous en faisons un produit.
              Développé, exploité et supporté par OPTINOV, depuis Abidjan.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Carte PROS.CARDS grand format */}
      <section className="section">
        <div className="container">
          <Reveal className="card" style={{ padding: 0, overflow: "hidden" }}>
            <div className="hero__grid" style={{ alignItems: "stretch", gap: 0 }}>
              <div style={{ padding: "clamp(1.75rem, 4vw, 3.25rem)", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                <span className="tag">Disponible</span>
                <h2>PROS.CARDS</h2>
                <p className="lead">
                  La carte de visite digitale et interactive, en libre-service. Vous choisissez
                  votre offre, créez votre compte, payez en ligne — et votre carte se crée en
                  quelques minutes, modifiable à tout moment.
                </p>
                <ul style={{ display: "grid", gap: ".5rem", margin: "1.25rem 0 1.75rem", paddingLeft: "1.1em" }}>
                  <li>Partage instantané par NFC ou QR code</li>
                  <li>Documents, vidéos, paiement, prise de rendez-vous</li>
                  <li>Statistiques de consultation</li>
                  <li>Espace administrateur pour les équipes commerciales</li>
                </ul>
                <div>
                  <Link className="btn btn--gold" href="/solutions/pros-cards" data-ga="cta_pros_cards">
                    Découvrir PROS.CARDS
                  </Link>
                </div>
              </div>
              <div className="section--navy" style={{ display: "grid", placeItems: "center", padding: "3rem 1rem" }}>
                <div className="phone" role="img" aria-label="Carte de visite digitale PROS.CARDS sur smartphone">
                  <div className="phone__card">
                    <div className="av" aria-hidden="true">PC</div>
                    <b>{TODO}</b>
                    <em>{TODO}</em>
                  </div>
                  <div className="phone__rows">
                    <div className="phone__row">Appeler</div>
                    <div className="phone__row">Enregistrer le contact</div>
                    <div className="phone__row">Voir le catalogue</div>
                  </div>
                  <div className="phone__nfc"><span>Approchez · NFC</span></div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Teasing — hub évolutif */}
      <section className="section section--alt">
        <div className="container" style={{ maxWidth: "48rem", textAlign: "center" }}>
          <Reveal>
            <span className="eyebrow">Bientôt</span>
            <h2>D&apos;autres solutions arrivent</h2>
            <p className="lead">
              Nos prochains produits naissent des besoins que nous rencontrons sur le terrain.
              Inscrivez-vous pour être prévenu à leur sortie.
            </p>
            <p style={{ marginTop: "1.5rem" }}>
              <Link className="btn btn--ghost" href="/contact">Être tenu informé</Link>
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <CtaBand
            titre="Un besoin qu’aucun outil ne couvre ?"
            texte="Nous développons aussi des solutions sur mesure. Décrivez-nous le problème."
            contexte="une solution numérique sur mesure"
          />
        </div>
      </section>

      <WhatsAppFloat contexte="les solutions OPTINOV" />
    </>
  );
}
