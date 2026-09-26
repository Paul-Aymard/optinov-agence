import Link from "next/link";
import { chiffresCles, logosClients, temoignages, lienRdv } from "@/content/site";
import {
  defis, piliers, objectifs, solutionsAccueil,
  pourquoiOptinov, faqAccueil,
} from "@/content/vision";
import { projets } from "@/content/realisations";
import { Reveal, Carousel, Accordion, FaqJsonLd, WhatsAppFloat } from "@/components/Ui";
import VisionMethod from "@/components/VisionMethod";
import { FormulaireCourt } from "@/components/Forms";
import { Lignes, Vision } from "@/components/Lignes";

/**
 * Accueil (G1) — refonte « parcours de croissance » demandée par la direction.
 * La page n'est plus une liste de prestations : elle déroule un récit centré
 * sur la méthode propriétaire V.I.S.I.O.N., du problème au résultat.
 *
 * Architecture (12 sections) :
 *  1 Hero  ·  1b Sélecteur d'objectif  ·  2 Problème (6 défis)  ·
 *  3 « La croissance ne s'improvise pas »  ·  4 Méthode V.I.S.I.O.N.  ·
 *  5 Les 4 piliers (résultats)  ·  6 Nos solutions  ·  7 Réalisations via VISION  ·
 *  8 Nos clients  ·  9 Pourquoi OPTINOV  ·  10 FAQ  ·  11 CTA final
 *
 * « Nos clients » précède « Pourquoi OPTINOV » à la demande du client : la
 * preuve par les références vient avant l'argumentaire.
 */
export const metadata = {
  title: { absolute: "OPTINOV — La méthode V.I.S.I.O.N. pour votre croissance" },
  description:
    "Votre croissance commence par une vision claire. Découvrez V.I.S.I.O.N., la méthode OPTINOV qui transforme vos ambitions en résultats durables, à Abidjan.",
  alternates: { canonical: "/" },
};

const CTA_PROJET = "Parlons de votre projet";

/** Carte d'une solution (grille d'accueil) — factorisée pour les 2 rangées. */
function carteSolution(s) {
  return (
    <Reveal key={s.titre} className="card">
      <div className="etape-tags" aria-label={`Étapes V.I.S.I.O.N. : ${s.etapes.join(", ")}`}>
        {s.etapes.map((l, i) => <span key={i} aria-hidden="true">{l}</span>)}
      </div>
      <h3 style={{ fontSize: "1.15rem" }}>{s.titre}</h3>
      <p><Lignes>{s.accroche}</Lignes></p>
      <ul style={{ fontSize: ".85rem", color: "var(--text-muted)", margin: "0 0 1rem" }}>
        {s.items.slice(0, 5).map((it) => <li key={it}>{it}</li>)}
      </ul>
      <Link className="link-arrow" href={s.href}>
        {s.produit ? "Découvrir PROS.CARDS" : "En savoir plus"}
        <span className="sr-only"> — {s.titre}</span>
      </Link>
    </Reveal>
  );
}

/** Carte « Notre différence » — factorisée pour les 2 rangées. */
function cartePourquoi(p) {
  return (
    <Reveal key={p.titre} className="card">
      <h3 style={{ fontSize: "1.1rem" }}>{p.titre}</h3>
      <p><Lignes>{p.texte}</Lignes></p>
    </Reveal>
  );
}

export default function Accueil() {
  return (
    <div className="accueil">
      {/* ---------- 1. Hero ---------- */}
      {/* Pas de photo d'ensemble de l'entreprise (décision direction) : hero
          pleine largeur, sans visuel à droite. */}
      <section className="hero hero--home hero--sansvisuel">
        <div className="container">
          <Reveal>
            <span className="eyebrow">OPTINOV · Communication &amp; croissance</span>
            <h1>Votre croissance commence par une vision claire.</h1>
            <p className="lead">
              <Lignes>Les entreprises qui réussissent ne se contentent pas de communiquer : elles suivent une méthode. Découvrez comment OPTINOV transforme vos ambitions en résultats durables.</Lignes>
            </p>
            <div className="btn-group" style={{ marginTop: "1.8rem" }}>
              <a className="btn btn--gold" href="#methode"><Vision>Découvrir la méthode V.I.S.I.O.N.</Vision></a>
              <a className="btn btn--navy" href="#contact">{CTA_PROJET}</a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------- 1b. Sélecteur d'objectif de croissance ---------- */}
      <section className="section" style={{ paddingBlock: "clamp(2rem, 4vw, 3rem)" }}>
        <div className="container">
          <Reveal className="section-head center" style={{ marginBottom: "1.75rem" }}>
            <h2 style={{ fontSize: "1.4rem" }}>Quel est votre objectif de croissance ?</h2>
            <p className="lead"><Lignes>Choisissez votre priorité : la méthode V.I.S.I.O.N. vous montre comment nous vous y menons.</Lignes></p>
          </Reveal>
          <Reveal className="objectifs">
            {objectifs.map((o) => (
              <a key={o.label} className="objectif" href={o.ancre}>
                <span className="emoji" aria-hidden="true">{o.emoji}</span>
                {o.label}
              </a>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ---------- 2. Pourquoi tant d'entreprises peinent à se développer ---------- */}
      <section className="section section--alt section--constat">
        <div className="container">
          <Reveal className="section-head center section-head--ligne">
            <span className="eyebrow">Le constat</span>
            <h2 className="titre-1ligne">Pourquoi tant d&apos;entreprises peinent-elles à se développer&nbsp;?</h2>
            <p className="lead">
              Beaucoup investissent dans des actions isolées — un logo, un site, une
              campagne — utiles, mais qui produisent rarement leur plein potentiel
              lorsqu&apos;elles ne s&apos;inscrivent pas dans une{" "}
              <strong className="mot-vision">vision d&apos;ensemble</strong>.
            </p>
          </Reveal>
          <div className="grid grid-3">
            {defis.map((d) => (
              <Reveal key={d.titre} className="card card--constat">
                <h3>{d.titre}</h3>
                <p><Lignes>{d.texte}</Lignes></p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- 3. La croissance ne s'improvise pas ---------- */}
      <section className="section">
        <div className="container" style={{ maxWidth: "48rem", textAlign: "center" }}>
          <Reveal>
            <span className="eyebrow">Notre conviction</span>
            <h2>La croissance ne s&apos;improvise pas.</h2>
            <p className="lead">
              <Lignes>Une croissance durable ne repose pas sur une succession d&apos;actions isolées, mais sur une vision claire, une stratégie adaptée et une exécution maîtrisée. C&apos;est pourquoi nous avons développé une méthode qui accompagne les entreprises à chaque étape de leur évolution.</Lignes>
            </p>
            <p style={{ marginTop: "1.5rem" }}>
              <a className="link-arrow" href="#methode"><Vision>Découvrez la méthode V.I.S.I.O.N.</Vision></a>
            </p>
          </Reveal>
        </div>
      </section>

      {/* ---------- 4. La méthode V.I.S.I.O.N. ---------- */}
      <section className="section section--navy" id="methode">
        <div className="container">
          <Reveal className="section-head center">
            <span className="eyebrow">Notre méthode propriétaire</span>
            <h2><Vision>Découvrez la méthode V.I.S.I.O.N.</Vision></h2>
            <p className="lead">
              Six étapes qui donnent du sens à chaque action et assurent la cohérence
              de chaque projet — de la réflexion stratégique à l&apos;amélioration continue.
            </p>
          </Reveal>
          <Reveal>
            <VisionMethod />
          </Reveal>
          <div className="center" style={{ marginTop: "2.5rem" }}>
            <a className="btn btn--gold" href="#piliers">Ce que cette méthode permet</a>
          </div>
        </div>
      </section>

      {/* ---------- 5. Ce que cette méthode vous permet d'accomplir (4 piliers) ---------- */}
      <section className="section" id="piliers">
        <div className="container">
          <Reveal className="section-head center section-head--ligne">
            <span className="eyebrow">Les résultats</span>
            <h2 className="titre-1ligne">Ce que la méthode vous permet d&apos;accomplir</h2>
            <p className="lead">
              <Lignes>Une méthode n&apos;a de valeur que par ses résultats. Nos expertises ne sont pas une fin&nbsp;: ce sont des moyens au service de votre croissance.</Lignes>
            </p>
          </Reveal>
          <div className="grid grid-4 piliers-grid">
            {piliers.map((p) => (
              <Reveal key={p.id} className="card pilier" id={`pilier-${p.id}`} style={{ scrollMarginTop: "90px" }}>
                <span className="emoji" aria-hidden="true">{p.icone}</span>
                <h3>{p.titre}</h3>
                <p className="pilier__accroche">{p.accroche}</p>
                <div className="pilier__details">
                  <p><Lignes>{p.texte}</Lignes></p>
                  <ul>
                    {p.moyens.map((m) => <li key={m}>{m}</li>)}
                  </ul>
                  <p className="pilier__resultat">
                    <strong>Résultat&nbsp;:</strong> {p.resultat}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- 6. Nos solutions (reliées aux étapes V.I.S.I.O.N.) ---------- */}
      <section className="section section--alt" id="solutions">
        <div className="container">
          <Reveal className="section-head center section-head--ligne">
            <span className="eyebrow">Nos solutions</span>
            <h2 className="titre-1ligne">Des solutions pensées pour chaque étape de votre croissance</h2>
            <p className="lead">
              <Lignes>Chaque solution s&apos;intègre naturellement à la méthode V.I.S.I.O.N. Les pastilles indiquent les étapes qu&apos;elle sert.</Lignes>
            </p>
          </Reveal>
          {/* Rangée du haut : 2 cartes larges (paysage) sur toute la largeur */}
          <div className="grid grid-2 solutions-grille">
            {solutionsAccueil.slice(0, 2).map(carteSolution)}
          </div>
          {/* Rangée du bas : les 3 autres cartes, sur toute la largeur */}
          <div className="grid grid-3 solutions-grille solutions-grille--bas">
            {solutionsAccueil.slice(2).map(carteSolution)}
          </div>
        </div>
      </section>

      {/* ---------- 7. Des projets qui donnent vie aux ambitions ---------- */}
      <section className="section">
        <div className="container cartes-anim">
          <Reveal className="section-head center section-head--ligne">
            <span className="eyebrow">Réalisations</span>
            <h2 className="titre-1ligne">Des projets qui donnent vie aux ambitions de nos clients</h2>
            <p className="lead">
              <Lignes>Nos études de cas ne montrent pas seulement un résultat&nbsp;: elles racontent le projet à travers les étapes de V.I.S.I.O.N., pour montrer la méthode réellement appliquée.</Lignes>
            </p>
          </Reveal>

          {/* Rappel de la méthode en action */}
          <Reveal className="center vision-mini" style={{ justifyContent: "center", marginBottom: "2.5rem" }}>
            <span>Voir&nbsp;: le besoin</span>
            <span>Imaginer&nbsp;: la stratégie</span>
            <span>Structurer&nbsp;: les supports</span>
            <span>Implémenter&nbsp;: la réalisation</span>
            <span>Optimiser&nbsp;: le suivi</span>
            <span>Nourrir&nbsp;: l&apos;accompagnement</span>
          </Reveal>

          {projets.length > 0 ? (
            <Carousel label="Réalisations récentes">
              {projets.slice(0, 6).map((p) => (
                <article className="card card--project" key={p.slug}>
                  <div className="thumb">{p.client}</div>
                  <div className="card__body">
                    <span className="tag">{p.typeMission}</span>
                    <h3>{p.client}</h3>
                    <p>{p.extrait}</p>
                    <Link className="link-arrow" href={`/realisations/${p.slug}`}>Découvrir l&apos;étude de cas</Link>
                  </div>
                </article>
              ))}
            </Carousel>
          ) : (
            <p className="empty-state">
              Nos études de cas sont en cours de publication.
              <br />
              <span style={{ fontSize: ".9rem" }}>Le prochain projet pourrait être le vôtre.</span>
            </p>
          )}

          <div className="center" style={{ marginTop: "2rem" }}>
            <Link className="btn btn--ghost" href="/realisations">Découvrir nos réalisations</Link>
          </div>
        </div>
      </section>

      {/* ---------- 8. Nos clients ---------- */}
      {(chiffresCles.length > 0 || logosClients.length > 0 || temoignages.length > 0) ? (
        <section className="section section--alt">
          <div className="container">
            <Reveal className="section-head center">
              <span className="eyebrow">Nos clients</span>
              <h2>La confiance de nos clients, notre fierté</h2>
            </Reveal>
            {chiffresCles.length > 0 && (
              <div className="stats" style={{ marginBottom: "2.5rem" }}>
                {chiffresCles.map((c) => (
                  <Reveal key={c.label} className="stat">
                    <div className="stat__num">{c.num}</div>
                    <div className="stat__label">{c.label}</div>
                  </Reveal>
                ))}
              </div>
            )}
            {logosClients.length > 0 && (
              <div className="marquee" aria-label="Nos clients">
                <div className="marquee__track">
                  {[...logosClients, ...logosClients].map((l, i) => <span key={i}>{l.nom}</span>)}
                </div>
              </div>
            )}
            {temoignages.length > 0 && (
              <Carousel label="Témoignages clients">
                {temoignages.map((t, i) => (
                  <figure className="quote" key={i}>
                    <blockquote>{t.verbatim}</blockquote>
                    <figcaption>
                      <span className="avatar" aria-hidden="true">{t.nom.slice(0, 2)}</span>
                      <span><strong>{t.nom}</strong><span>{t.fonction} · {t.entreprise}</span></span>
                    </figcaption>
                  </figure>
                ))}
              </Carousel>
            )}
          </div>
        </section>
      ) : (
        <section className="section section--alt">
          <div className="container" style={{ maxWidth: "72rem", textAlign: "center" }}>
            <Reveal>
              <span className="eyebrow">Nos clients</span>
              {/* Même titre que la variante garnie : sans lui, la demande du
                  client resterait invisible tant qu'aucune référence n'est
                  publiée dans le tableau de bord. */}
              <h2 className="titre-1ligne">La confiance de nos clients, notre fierté</h2>
              <p className="lead">
                <Lignes>Et si le prochain logo affiché ici était le vôtre ? Nous serions heureux de découvrir votre entreprise et de mettre la méthode V.I.S.I.O.N. au service de vos ambitions.</Lignes>
              </p>
            </Reveal>
          </div>
        </section>
      )}

      {/* ---------- 9. Pourquoi choisir OPTINOV ---------- */}
      <section className="section">
        <div className="container">
          <Reveal className="section-head center">
            <span className="eyebrow">Notre différence</span>
            <h2>Pourquoi choisir OPTINOV&nbsp;?</h2>
          </Reveal>
          {/* Rangée du haut : 2 cartes larges sur toute la largeur */}
          <div className="grid grid-2 cartes-anim solutions-grille">
            {pourquoiOptinov.slice(0, 2).map(cartePourquoi)}
          </div>
          {/* Rangée du bas : les 3 autres cartes */}
          <div className="grid grid-3 cartes-anim solutions-grille solutions-grille--bas">
            {pourquoiOptinov.slice(2).map(cartePourquoi)}
          </div>
        </div>
      </section>

      {/* ---------- 10. FAQ (orientée méthode) ---------- */}
      <section className="section section--alt">
        <div className="container" style={{ maxWidth: "56rem" }}>
          <Reveal className="section-head center">
            <span className="eyebrow">Questions fréquentes</span>
            <h2>Vous avez des questions&nbsp;? Nous avons les réponses.</h2>
          </Reveal>
          <Accordion items={faqAccueil} />
          <p className="center" style={{ marginTop: "2rem" }}>
            <Link className="link-arrow" href="/faq">Consulter la FAQ complète</Link>
          </p>
        </div>
      </section>

      {/* ---------- 11. CTA final ---------- */}
      <section className="section" id="contact">
        <div className="container">
          <div className="cta-band cta-band--compact">
            <div className="hero__grid">
              <div>
                <h2><Vision>Prêt à appliquer la méthode V.I.S.I.O.N. à votre entreprise&nbsp;?</Vision></h2>
                <p className="lead">
                  <Lignes>Chaque grande réussite commence par un premier échange. Parlons de vos objectifs&nbsp;: nous vous montrerons comment nous vous y menons.</Lignes>
                </p>
                <div className="btn-group" style={{ marginTop: "1.5rem" }}>
                  <a className="btn btn--gold" href={lienRdv()} data-ga="cta_rdv">{CTA_PROJET}</a>
                  <Link className="btn btn--ghost" href="/contact">Nous contacter</Link>
                </div>
              </div>
              <div className="form-card">
                <h3 style={{ fontSize: "1.2rem" }}>Décrivez votre projet</h3>
                <FormulaireCourt />
              </div>
            </div>
          </div>
        </div>
      </section>

      <FaqJsonLd items={faqAccueil} />
      <WhatsAppFloat contexte="la méthode V.I.S.I.O.N. et mon projet de croissance" />
    </div>
  );
}
