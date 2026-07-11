import Link from "next/link";
import { chiffresCles, logosClients, temoignages, methode, lienRdv, lienWhatsApp } from "@/content/site";
import { services, accompagnement } from "@/content/services";
import { articles } from "@/content/blog";
import { projets } from "@/content/realisations";
import { Reveal, Carousel, CtaBand, WhatsAppFloat } from "@/components/Ui";
import { FormulaireCourt } from "@/components/Forms";

/**
 * Accueil (G1) — CDC §6.1
 * Objectif : comprendre en moins de 10 secondes qui est OPTINOV et orienter
 * vers l'un des deux univers (Services ou PROS.CARDS).
 *
 * Bonnes pratiques appliquées : un seul H1 ; CTA principal répété toutes les
 * 2 sections ; sections courtes scannables ; aucune vidéo autoplay avec son.
 */
export const metadata = {
  // `absolute` : l'accueil ne doit pas répéter « | OPTINOV Agence ».
  title: { absolute: "OPTINOV Agence — Agence de communication à Abidjan" },
  // SEO-003 : meta description ≤ 155 caractères
  description:
    "Agence de communication à Abidjan : identité de marque, réseaux sociaux, marketing, automatisation IA, photo et vidéo. Et PROS.CARDS.",
  alternates: { canonical: "/" },
};

export default function Accueil() {
  return (
    <>
      {/* ---------- 1. Hero ---------- */}
      <section className="hero hero--home">
        <div className="container hero__grid">
          <Reveal>
            <span className="eyebrow">Pôle communication du groupe OPTINOV</span>
            <h1>Votre communication mérite une agence qui pense résultats</h1>
            <p className="lead">
              Nous concevons des marques que l&apos;on reconnaît, des campagnes qui
              convertissent et des outils qui font gagner du temps. À Abidjan, pour toute
              l&apos;Afrique francophone.
            </p>
            <div className="btn-group" style={{ marginTop: "1.8rem" }}>
              <Link className="btn btn--navy" href="/services">Découvrir nos services</Link>
              <a className="btn btn--gold" href={lienRdv()} data-ga="cta_rdv">Prendre rendez-vous</a>
            </div>
          </Reveal>
          <Reveal>
            <div className="hero-visual">
              <p className="ph">Photo équipe OPTINOV</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------- 2. Bandeau de confiance ----------
           Masqué tant que les chiffres clés et les logos ne sont pas fournis. */}
      {(chiffresCles.length > 0 || logosClients.length > 0) && (
        <section className="trustbar">
          <div className="container">
            {chiffresCles.length > 0 && (
              <div className="stats">
                {chiffresCles.map((c) => (
                  <div key={c.label} className="stat">
                    <div className="stat__num">{c.num}</div>
                    <div className="stat__label">{c.label}</div>
                  </div>
                ))}
              </div>
            )}
            {logosClients.length > 0 && (
              <div className="marquee" aria-label="Ils nous font confiance">
                <div className="marquee__track">
                  {[...logosClients, ...logosClients].map((l, i) => (
                    <span key={i}>{l.nom}</span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* ---------- 3. Nos services ---------- */}
      <section className="section">
        <div className="container">
          <Reveal className="section-head center">
            <span className="eyebrow">Nos services</span>
            <h2>Six expertises, une seule exigence</h2>
            <p className="lead">
              De la stratégie à la production, nous couvrons la chaîne complète — sans
              jamais sous-traiter ce qui fait la différence.
            </p>
          </Reveal>

          <div className="grid grid-3">
            {services.map((s) => (
              <Reveal key={s.slug} className="card">
                <div className="card__icon" aria-hidden="true">{s.icone}</div>
                <h3>{s.titre}</h3>
                <p>{s.accroche}</p>
                <Link className="link-arrow" href={`/services/${s.slug}`}>
                  En savoir plus<span className="sr-only"> sur {s.titre}</span>
                </Link>
              </Reveal>
            ))}
            <Reveal className="card">
              <div className="card__icon" aria-hidden="true">{accompagnement.icone}</div>
              <h3>{accompagnement.titre}</h3>
              <p>{accompagnement.accroche}</p>
              <Link className="link-arrow" href={accompagnement.href}>
                En savoir plus<span className="sr-only"> sur l&apos;accompagnement</span>
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------- 4. Solution PROS.CARDS ---------- */}
      <section className="section section--navy">
        <div className="container hero__grid">
          <Reveal>
            <div className="phone" role="img" aria-label="Aperçu d'une carte de visite digitale PROS.CARDS sur smartphone">
              {/* Maquette : libellés génériques, pas de personne fictive nommée */}
              <div className="phone__card">
                <div className="av" aria-hidden="true">▪</div>
                <b>Votre nom</b>
                <em>Votre fonction · Votre entreprise</em>
              </div>
              <div className="phone__rows">
                <div className="phone__row">Appeler</div>
                <div className="phone__row">Enregistrer le contact</div>
                <div className="phone__row">Prendre rendez-vous</div>
              </div>
              <div className="phone__nfc"><span>Approchez · NFC</span></div>
            </div>
          </Reveal>
          <Reveal>
            <span className="eyebrow">Nos solutions</span>
            <h2>La carte de visite est morte.<br />Vive PROS.CARDS.</h2>
            <ul style={{ listStyle: "none", padding: 0, display: "grid", gap: "1.1rem", margin: "1.5rem 0 2rem" }}>
              <li><strong style={{ color: "#fff" }}>Partagée en un geste</strong><br />NFC ou QR code, sans application à installer.</li>
              <li><strong style={{ color: "#fff" }}>Modifiable à tout moment</strong><br />Une mise à jour, prise en compte instantanément.</li>
              <li><strong style={{ color: "#fff" }}>Pilotée par les statistiques</strong><br />Vous savez enfin qui vous a consulté.</li>
            </ul>
            <Link className="btn btn--gold" href="/solutions/pros-cards" data-ga="cta_pros_cards">
              Découvrir PROS.CARDS
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ---------- 5. Méthode ---------- */}
      <section className="section section--alt">
        <div className="container">
          <Reveal className="section-head center">
            <span className="eyebrow">Notre méthode</span>
            <h2>Quatre étapes, aucune zone d&apos;ombre</h2>
          </Reveal>
          <div className="steps">
            {methode.map((m) => (
              <Reveal key={m.titre} className="step">
                <h3>{m.titre}</h3>
                <p>{m.texte}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- 6. Réalisations — masquée tant qu'aucun projet n'est publié ---------- */}
      {projets.length > 0 && (
        <section className="section">
          <div className="container">
            <Reveal className="section-head">
              <span className="eyebrow">Réalisations</span>
              <h2>Ce que nous avons livré récemment</h2>
            </Reveal>
            <Carousel label="Réalisations récentes">
              {projets.slice(0, 6).map((p) => (
                <article className="card card--project" key={p.slug}>
                  <div className="thumb">{p.client}</div>
                  <div className="card__body">
                    <span className="tag">{p.typeMission}</span>
                    <h3>{p.client}</h3>
                    <p>{p.extrait}</p>
                    <Link className="link-arrow" href={`/realisations/${p.slug}`}>
                      Voir le projet
                    </Link>
                  </div>
                </article>
              ))}
            </Carousel>
            <div style={{ marginTop: "2rem" }}>
              <Link className="btn btn--ghost" href="/realisations">Voir toutes nos réalisations</Link>
            </div>
          </div>
        </section>
      )}

      {/* ---------- 7. Témoignages — masquée tant qu'aucun verbatim réel ---------- */}
      {temoignages.length > 0 && (
        <section className="section section--alt">
          <div className="container">
            <Reveal className="section-head center">
              <span className="eyebrow">Témoignages</span>
              <h2>Ce qu&apos;en disent nos clients</h2>
            </Reveal>
            <Carousel label="Témoignages clients">
              {temoignages.map((t, i) => (
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

      {/* ---------- 8. Derniers articles ---------- */}
      <section className="section">
        <div className="container">
          <Reveal className="section-head">
            <span className="eyebrow">Le blog</span>
            <h2>Nos analyses</h2>
          </Reveal>
          <div className="grid grid-3">
            {articles.slice(0, 3).map((a) => (
              <Reveal key={a.slug} className="card card--project">
                <div className="thumb">Illustration article</div>
                <div className="card__body">
                  <span className="tag">{a.categorie}</span>
                  <h3 style={{ fontSize: "1.15rem" }}>{a.titre}</h3>
                  <p className="meta"><span>{a.tempsLecture} min de lecture</span></p>
                  <Link className="link-arrow" href={`/blog/${a.slug}`}>Lire l&apos;article</Link>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- 9. CTA final ---------- */}
      <section className="section section--alt">
        <div className="container">
          <div className="cta-band">
            <div className="hero__grid">
              <div>
                <h2>Parlons de votre projet</h2>
                <p className="lead">
                  Trente minutes pour comprendre votre contexte. Si nous ne sommes pas le
                  bon partenaire, nous vous le dirons.
                </p>
                <div className="btn-group" style={{ marginTop: "1.5rem" }}>
                  <a
                    className="btn btn--wa"
                    href={lienWhatsApp("mon projet")}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-ga="clic_whatsapp"
                  >
                    Écrire sur WhatsApp
                  </a>
                  <a className="btn btn--gold" href={lienRdv()} data-ga="cta_rdv">
                    Prendre rendez-vous
                  </a>
                </div>
              </div>
              <div className="form-card">
                <h3 style={{ fontSize: "1.2rem" }}>Ou laissez-nous un mot</h3>
                <FormulaireCourt />
              </div>
            </div>
          </div>
        </div>
      </section>

      <WhatsAppFloat contexte="mon projet de communication" />
    </>
  );
}
