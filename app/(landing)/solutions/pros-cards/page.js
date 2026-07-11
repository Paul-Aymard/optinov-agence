import { site, lienTel, lienEmail, lienWhatsApp, lienPlateforme, estRenseigne } from "@/content/site";
import {
  douleursPapier, pointsSolution, etapes, comparatif,
  avantages, casUsage, offres, faqProsCards, temoignagesProsCards, prixIndicatif,
} from "@/content/prosCards";
import {
  Reveal, Accordion, FaqJsonLd, JsonLd, Tabs, Carousel,
} from "@/components/Ui";
import FiltresFonctionnalites from "@/components/FiltresFonctionnalites";
import StickyCta from "@/components/StickyCta";
import { FormulaireDevisFlotte, FormulaireRappel } from "@/components/Forms";

/**
 * Landing PROS.CARDS (G5) — CDC §7
 *
 * ┌─ FRONTIÈRE SITE / PLATEFORME (§7.3, EX-026) ────────────────────────┐
 * │ L'inscription, le paiement, l'activation automatique, le tableau de │
 * │ bord et la gestion des cartes relèvent de la PLATEFORME PROS.CARDS. │
 * │ Cette page ne développe AUCUN tunnel de paiement : chaque CTA       │
 * │ individuel redirige vers le tunnel d'inscription avec l'offre       │
 * │ pré-sélectionnée et les paramètres de suivi (UTM / GA4 inter-domaines).│
 * │ Seuls subsistent ici : le devis flotte et la demande de rappel.     │
 * └────────────────────────────────────────────────────────────────────┘
 */
export const metadata = {
  title: "PROS.CARDS — La carte de visite digitale",
  description:
    "Une seule carte, toutes vos coordonnées, pour toujours. Partage NFC ou QR code, mise à jour instantanée, statistiques de consultation.",
  alternates: { canonical: "/solutions/pros-cards" },
  openGraph: {
    title: "PROS.CARDS — La carte de visite digitale",
    description: "Une seule carte. Toutes vos coordonnées. Pour toujours.",
  },
};

/**
 * EX-026 : construit l'URL du tunnel d'inscription avec l'offre
 * pré-sélectionnée et les paramètres de suivi inter-domaines.
 */
function urlInscription(offreId, source) {
  // Tant que l'URL du tunnel n'est pas arrêtée, on ne fabrique pas de lien mort :
  // le visiteur est dirigé vers le devis flotte / contact plutôt que vers un 404.
  if (!estRenseigne(site.prosCards.inscription)) return "#devis-flotte";

  const params = new URLSearchParams({
    offre: offreId,
    utm_source: "site-optinov",
    utm_medium: "landing",
    utm_campaign: "pros-cards",
    utm_content: source,
  });
  return `${site.prosCards.inscription}?${params}`;
}

export default function LandingProsCards() {
  // SEO-005 : Product + Offer
  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "PROS.CARDS",
    description: "Carte de visite digitale et interactive en libre-service.",
    brand: { "@type": "Brand", name: "OPTINOV Agence" },
    offers: offres.map((o) => ({
      "@type": "Offer",
      name: o.nom,
      // Le prix reste [À compléter] : on ne publie pas de donnée structurée fausse.
      priceCurrency: "XOF",
      availability: "https://schema.org/InStock",
    })),
  };

  return (
    <>
      {/* ---------- 1. Hero ---------- */}
      <section className="pc-hero">
        <div className="container hero__grid">
          <Reveal>
            <span className="eyebrow">PROS.CARDS par OPTINOV Agence</span>
            <h1>Une seule carte.<br />Toutes vos coordonnées.<br />Pour toujours.</h1>
            <p className="lead">
              La carte de visite digitale que vous créez vous-même, en quelques minutes,
              et que vous modifiez quand vous voulez. Partagée d&apos;un geste, jamais périmée.
            </p>
            <div className="btn-group" style={{ marginTop: "1.8rem" }}>
              <a
                className="btn btn--gold"
                href={urlInscription("professionnel", "hero")}
                data-ga="cta_creer_carte_hero"
              >
                Créer ma carte en quelques minutes
              </a>
              <a className="btn btn--ghost" href="#demo">Voir la démo</a>
            </div>
            <ul className="reassure">
              <li>Activation immédiate après paiement</li>
              <li>Sans application à installer</li>
              <li>Compatible tous smartphones</li>
            </ul>
          </Reveal>

          <Reveal>
            <div className="phone" role="img" aria-label="Carte PROS.CARDS affichée sur un smartphone, partage par NFC ou QR code">
              <div className="phone__card">
                <div className="av" aria-hidden="true">PC</div>
                <b>Votre nom</b>
                <em>Votre fonction · Votre entreprise</em>
              </div>
              <div className="phone__rows">
                <div className="phone__row">Appeler</div>
                <div className="phone__row">Enregistrer le contact</div>
                <div className="phone__row">Voir mes réalisations</div>
                <div className="phone__row">Prendre rendez-vous</div>
              </div>
              <div className="phone__nfc"><span>Approchez · NFC / QR</span></div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------- 2. Problématique ---------- */}
      <section className="section">
        <div className="container">
          <Reveal className="section-head center">
            <span className="eyebrow">Le constat</span>
            <h2>Votre carte papier travaille contre vous</h2>
          </Reveal>
          <div className="grid grid-3">
            {douleursPapier.map((d) => (
              <Reveal key={d.titre} className="card card--flat">
                <h3>{d.titre}</h3>
                <p>{d.texte}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- 3. Solution ---------- */}
      <section className="section section--alt">
        <div className="container">
          <Reveal className="section-head center">
            <span className="eyebrow">La solution</span>
            <h2>PROS.CARDS, en trois points</h2>
          </Reveal>
          <div className="grid grid-3">
            {pointsSolution.map((p) => (
              <Reveal key={p.titre} className="card">
                <div className="card__icon" aria-hidden="true">◆</div>
                <h3>{p.titre}</h3>
                <p>{p.texte}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- 4. Fonctionnement ---------- */}
      <section className="section section--navy">
        <div className="container">
          <Reveal className="section-head center">
            <span className="eyebrow">Comment ça marche</span>
            <h2>Quatre étapes, aucune attente</h2>
          </Reveal>
          <div className="steps">
            {etapes.map((e) => (
              <Reveal key={e.titre} className="step">
                <h3>{e.titre}</h3>
                <p>{e.texte}</p>
              </Reveal>
            ))}
          </div>
          <div className="center" style={{ marginTop: "2.5rem" }}>
            <a className="btn btn--gold" href={urlInscription("professionnel", "fonctionnement")} data-ga="cta_creer_carte_etapes">
              Créer ma carte
            </a>
          </div>
        </div>
      </section>

      {/* ---------- 5. Fonctionnalités ---------- */}
      <section className="section" id="fonctionnalites">
        <div className="container">
          <Reveal className="section-head center">
            <span className="eyebrow">Fonctionnalités</span>
            <h2>Tout ce que votre carte sait faire</h2>
          </Reveal>
          <FiltresFonctionnalites />
        </div>
      </section>

      {/* ---------- 6. Pourquoi abandonner la carte papier ---------- */}
      <section className="section section--alt">
        <div className="container">
          <Reveal className="section-head center">
            <span className="eyebrow">Comparatif</span>
            <h2>Pourquoi abandonner la carte papier</h2>
          </Reveal>
          <Reveal className="table-wrap">
            <table className="compare">
              <caption className="sr-only">
                Comparaison entre la carte de visite papier et PROS.CARDS
              </caption>
              <thead>
                <tr>
                  <th scope="col">Critère</th>
                  <th scope="col">Carte papier</th>
                  <th scope="col">PROS.CARDS</th>
                </tr>
              </thead>
              <tbody>
                {comparatif.map((c) => (
                  <tr key={c.critere}>
                    <th scope="row">{c.critere}</th>
                    <td className="no">{c.papier}</td>
                    <td className="yes">{c.pros}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Reveal>
        </div>
      </section>

      {/* ---------- 7. Avantages ---------- */}
      <section className="section">
        <div className="container">
          <Reveal className="section-head center">
            <span className="eyebrow">Avantages</span>
            <h2>Quatre raisons de basculer</h2>
          </Reveal>
          <div className="grid grid-4">
            {avantages.map((a) => (
              <Reveal key={a.titre} className="card">
                <div className="card__icon" aria-hidden="true">✓</div>
                <h3 style={{ fontSize: "1.05rem" }}>{a.titre}</h3>
                <p>{a.texte}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- 8. Démonstration ---------- */}
      <section className="section section--navy" id="demo">
        <div className="container hero__grid">
          <Reveal>
            <span className="eyebrow">Démonstration</span>
            <h2>Voyez-la fonctionner</h2>
            <p className="lead">
              Une vraie carte PROS.CARDS, en conditions réelles. Ouvrez-la, faites défiler,
              enregistrez le contact.
            </p>
            <div className="btn-group" style={{ marginTop: "1.5rem" }}>
              <a className="btn btn--gold" href={lienPlateforme("demo")} data-ga="cta_demo">Essayer la démo</a>
            </div>
          </Reveal>
          <Reveal>
            <div className="hero-visual" style={{ aspectRatio: "16/9" }}>
              <p className="ph">
                Vidéo de démonstration PROS.CARDS
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------- 9. Cas d'utilisation ---------- */}
      <section className="section">
        <div className="container">
          <Reveal className="section-head center">
            <span className="eyebrow">Cas d&apos;utilisation</span>
            <h2>Pour qui, concrètement</h2>
          </Reveal>
          <Tabs
            items={casUsage.map((c) => ({
              id: c.id,
              label: c.label,
              panel: (
                <div className="hero__grid" style={{ paddingTop: "1rem" }}>
                  <div>
                    <h3>{c.titre}</h3>
                    <p>{c.texte}</p>
                  </div>
                  <ul style={{ display: "grid", gap: ".7rem", paddingLeft: "1.1em" }}>
                    {c.points.map((p) => (
                      <li key={p}>{p}</li>
                    ))}
                  </ul>
                </div>
              ),
            }))}
          />
        </div>
      </section>

      {/* ---------- 10. Tarifs ---------- */}
      <section className="section section--alt" id="tarifs">
        <div className="container">
          <Reveal className="section-head center">
            <span className="eyebrow">Tarifs</span>
            <h2>Trois offres, aucune surprise</h2>
            <p className="lead">
              Montants et options NFC administrables depuis le back-office (EX-023).
            </p>
          </Reveal>

          <div className="grid grid-3">
            {offres.map((o) => (
              <Reveal
                key={o.id}
                className={`card price-card${o.misEnAvant ? " price-card--featured" : ""}`}
              >
                {o.badge && <span className="badge">{o.badge}</span>}
                <h3>{o.nom}</h3>
                <p style={{ fontSize: ".9rem" }}>{o.pitch}</p>
                {/* Montants [À compléter] au CDC §7.2 : on affiche « Tarif à venir »
                    plutôt qu'un prix inventé, et on masque la périodicité. */}
                <div className="price">
                  {prixIndicatif(o.prix)}
                  {estRenseigne(o.prix) && <small>{o.periode}</small>}
                </div>
                <ul>
                  {o.inclus.map((i) => (
                    <li key={i}>{i}</li>
                  ))}
                  {o.exclus.map((i) => (
                    <li key={i} data-off="">{i}</li>
                  ))}
                </ul>
                <p style={{ fontSize: ".82rem", color: "var(--text-muted)" }}>{o.nfc}</p>

                {/* EX-026 : CTA vers le tunnel avec offre pré-sélectionnée.
                    L'offre Entreprise passe par le devis flotte, pas par le tunnel. */}
                {o.devis ? (
                  <a className="btn btn--navy btn--block" href="#devis-flotte" data-ga={`cta_devis_flotte_${o.id}`}>
                    {o.cta}
                  </a>
                ) : (
                  <a
                    className={`btn btn--block ${o.misEnAvant ? "btn--gold" : "btn--ghost"}`}
                    href={urlInscription(o.id, "grille-tarifaire")}
                    data-ga={`cta_commencer_${o.id}`}
                  >
                    {o.cta}
                  </a>
                )}
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- 11. Témoignages — masqués tant qu'aucun verbatim réel ---------- */}
      {temoignagesProsCards.length > 0 && (
        <section className="section">
          <div className="container">
            <Reveal className="section-head center">
              <span className="eyebrow">Témoignages</span>
              <h2>Ils ont abandonné le papier</h2>
            </Reveal>
            <Carousel label="Témoignages clients PROS.CARDS">
              {temoignagesProsCards.map((t, i) => (
                <figure className="quote" key={i}>
                  <blockquote>{t.verbatim}</blockquote>
                  <figcaption>
                    <span className="avatar" aria-hidden="true">{t.nom.slice(0, 2)}</span>
                    <span>
                      <strong>{t.nom}</strong>
                      <span>{t.fonction} · {t.entreprise}</span>
                    </span>
                  </figcaption>
                </figure>
              ))}
            </Carousel>
          </div>
        </section>
      )}

      {/* ---------- 12. FAQ ---------- */}
      <section className="section section--alt" id="faq">
        <div className="container" style={{ maxWidth: "56rem" }}>
          <Reveal className="section-head center">
            <span className="eyebrow">FAQ</span>
            <h2>Vos questions, nos réponses</h2>
          </Reveal>
          <Accordion items={faqProsCards} />
        </div>
      </section>

      {/* ---------- 13. CTA / Inscription ---------- */}
      <section className="section section--navy" id="devis-flotte">
        <div className="container hero__grid">
          <Reveal>
            <span className="eyebrow">Passer à l&apos;action</span>
            <h2>Créez votre carte, ou équipez votre équipe</h2>
            <p className="lead">
              À titre individuel, tout se fait en libre-service : compte créé, paiement
              validé, carte disponible. Pour une équipe, un conseiller vous accompagne.
            </p>
            <div className="btn-group" style={{ marginTop: "1.5rem" }}>
              <a className="btn btn--gold" href={urlInscription("professionnel", "cta-final")} data-ga="cta_creer_compte_final">
                Créer mon compte
              </a>
              <a
                className="btn btn--wa"
                href={lienWhatsApp("PROS.CARDS")}
                target="_blank"
                rel="noopener noreferrer"
                data-ga="clic_whatsapp"
              >
                WhatsApp direct
              </a>
            </div>

            <div style={{ marginTop: "2.5rem" }}>
              <h3 style={{ color: "#fff", fontSize: "1.15rem" }}>Être rappelé</h3>
              <div className="form-card" style={{ marginTop: "1rem" }}>
                <FormulaireRappel />
              </div>
            </div>
          </Reveal>

          <Reveal>
            <div className="form-card">
              <h3 style={{ fontSize: "1.2rem" }}>Devis flotte entreprise</h3>
              <p style={{ fontSize: ".9rem", color: "var(--text-muted)" }}>
                Vous équipez 5 commerciaux ou 100 ? La tarification est dégressive.
              </p>
              <FormulaireDevisFlotte />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------- 14. Contact ---------- */}
      <section className="section">
        <div className="container" style={{ maxWidth: "48rem", textAlign: "center" }}>
          <Reveal>
            <span className="eyebrow">Contact</span>
            <h2>Une plateforme, une équipe, une ville</h2>
            <p className="lead">
              PROS.CARDS est développée, exploitée et supportée par OPTINOV Agence, à Abidjan.
              Abonnements, licences, paiements et support client : tout est géré ici.
            </p>
            {(estRenseigne(site.telephone) || estRenseigne(site.email)) && (
              <p style={{ marginTop: "1.5rem" }}>
                {estRenseigne(site.telephone) && <a href={lienTel()}>{site.telephone}</a>}
                {estRenseigne(site.telephone) && estRenseigne(site.email) && " · "}
                {estRenseigne(site.email) && <a href={lienEmail()}>{site.email}</a>}
              </p>
            )}
          </Reveal>
        </div>
      </section>

      <FaqJsonLd items={faqProsCards} />
      <JsonLd data={productJsonLd} />
      <StickyCta />
    </>
  );
}
