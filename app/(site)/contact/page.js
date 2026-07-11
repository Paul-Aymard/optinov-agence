import { site, estRenseigne, lienRdv, lienTel, lienEmail, lienWhatsApp, socialsRenseignes } from "@/content/site";
import { Breadcrumb, Reveal, WhatsAppFloat } from "@/components/Ui";
import { FormulaireContact } from "@/components/Forms";

/**
 * Contact (G9) — CDC §6.9
 * Tous les canaux en une page, sans friction. Formulaire 1 colonne, 5 champs max.
 * EX-034 : téléphone et e-mail cliquables (tel:, mailto:).
 */
export const metadata = {
  title: "Contact — Parlons de votre projet",
  description:
    "Téléphone, e-mail, WhatsApp, rendez-vous en ligne : tous nos canaux de contact. Nous répondons sous 24 h ouvrées.",
  alternates: { canonical: "/contact" },
};

export default function Contact() {
  return (
    <>
      <Breadcrumb items={[{ nom: "Contact", href: "/contact" }]} />

      <section className="hero hero--page">
        <div className="container">
          <Reveal>
            <span className="eyebrow">Contact</span>
            <h1>Parlons de votre projet</h1>
            <p className="lead">
              Trente minutes suffisent pour savoir si nous sommes faits pour travailler
              ensemble. Choisissez le canal qui vous arrange.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container hero__grid">
          {/* Formulaire principal — 1 colonne, 5 champs */}
          <Reveal className="form-card">
            <h2 style={{ fontSize: "1.4rem" }}>Écrivez-nous</h2>
            <p style={{ fontSize: ".9rem", color: "var(--text-muted)" }}>
              Réponse annoncée : {site.delaiReponse}
            </p>
            <FormulaireContact />
          </Reveal>

          {/* Coordonnées directes */}
          <Reveal>
            <h2 style={{ fontSize: "1.4rem" }}>Nous joindre directement</h2>

            {/* Chaque coordonnée n'apparaît qu'une fois renseignée. */}
            <div className="stack" style={{ marginBottom: "2rem" }}>
              {estRenseigne(site.telephone) && (
                <p>
                  <strong>Téléphone</strong>
                  <br />
                  <a href={lienTel()} data-ga="clic_telephone">{site.telephone}</a>
                </p>
              )}
              {estRenseigne(site.email) && (
                <p>
                  <strong>E-mail</strong>
                  <br />
                  <a href={lienEmail()} data-ga="clic_email">{site.email}</a>
                </p>
              )}
              <p>
                <strong>Adresse</strong>
                <br />
                {estRenseigne(site.adresse) && (
                  <>
                    {site.adresse}
                    <br />
                  </>
                )}
                {site.ville}, {site.pays}
              </p>
              {estRenseigne(site.horaires) && (
                <p>
                  <strong>Horaires</strong>
                  <br />
                  {site.horaires}
                </p>
              )}
            </div>

            <div className="btn-group">
              {estRenseigne(site.whatsapp) && (
                <a
                  className="btn btn--wa"
                  href={lienWhatsApp()}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-ga="clic_whatsapp"
                >
                  Écrire sur WhatsApp
                </a>
              )}
              {estRenseigne(site.rdvUrl) && (
                <a className="btn btn--gold" href={lienRdv()} data-ga="cta_rdv">
                  Prendre rendez-vous
                </a>
              )}
            </div>

            {/* Réseaux sociaux — masqués tant que les URL ne sont pas renseignées */}
            {socialsRenseignes().length > 0 && (
              <>
                <h3 style={{ fontSize: "1.05rem", marginTop: "2rem" }}>Nous suivre</h3>
                <div className="socials" style={{ filter: "invert(1) hue-rotate(180deg)" }}>
                  {socialsRenseignes().map((s) => (
                    <a key={s.label} href={s.href} aria-label={s.label} target="_blank" rel="noopener noreferrer">
                      {s.court}
                    </a>
                  ))}
                </div>
              </>
            )}
          </Reveal>
        </div>
      </section>

      {/* Carte Google Maps intégrée.
          EX-044 / RGPD : l'iframe Maps dépose des cookies tiers. Elle n'est donc
          chargée qu'après consentement, via une façade cliquable. À brancher sur
          l'état du consentement une fois GTM en place. */}
      <section className="section section--alt">
        <div className="container">
          <Reveal className="hero-visual" style={{ aspectRatio: "21/9" }}>
            <p className="ph">
              Nos bureaux — {site.ville}, {site.pays}
            </p>
          </Reveal>
        </div>
      </section>

      <WhatsAppFloat contexte="une prise de contact" />
    </>
  );
}
