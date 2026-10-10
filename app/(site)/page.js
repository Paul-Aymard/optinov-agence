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
              <Lignes>Les entreprises qui grandissent ne communiquent pas au hasard : elles suivent une méthode. La nôtre transforme vos ambitions en résultats concrets et durables.</Lignes>
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
            <h2 style={{ fontSize: "1.4rem" }}>Quelle est votre priorité aujourd&apos;hui ?</h2>
            <p className="lead"><Lignes>Choisissez un objectif : nous vous montrons comment l&apos;atteindre.</Lignes></p>
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
              Beaucoup d&apos;entreprises multiplient les actions isolées&nbsp;: un logo,
              un site, une campagne. Chacune est utile, mais sans{" "}
              <strong className="mot-vision">vision d&apos;ensemble</strong>, elles donnent
              rarement tout leur potentiel.
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
              <Lignes>Elle repose sur trois choses : une vision claire, une stratégie adaptée et une exécution maîtrisée. C&apos;est pour cela que nous avons créé une méthode qui vous accompagne à chaque étape.</Lignes>
            </p>
            <p style={{ marginTop: "1.5rem" }}>
              <a className="link-arrow" href="#methode">Voir la méthode étape par étape</a>
            </p>
          </Reveal>
        </div>
      </section>

      {/* ---------- 4. La méthode V.I.S.I.O.N. ---------- */}
      <section className="section section--navy" id="methode">
        <div className="container">
          <Reveal className="section-head center">
            <span className="eyebrow">Notre méthode</span>
            <h2><Vision>La méthode V.I.S.I.O.N.</Vision></h2>
            <p className="lead">
              Six étapes pour que chaque action ait un sens et que tout votre projet
              reste cohérent, du premier diagnostic au suivi dans la durée.
            </p>
          </Reveal>
          <Reveal>
            <VisionMethod />
          </Reveal>
          <div className="center" style={{ marginTop: "2.5rem" }}>
            <a className="btn btn--gold" href="#piliers">Ce que la méthode vous apporte</a>
          </div>
        </div>
      </section>

      {/* ---------- 5. Ce que cette méthode vous permet d'accomplir (4 piliers) ---------- */}
      <section className="section" id="piliers">
        <div className="container">
          <Reveal className="section-head center section-head--ligne">
            <span className="eyebrow">Les résultats</span>
            <h2 className="titre-1ligne">Ce que la méthode vous permet d&apos;obtenir</h2>
            <p className="lead">
              <Lignes>Une méthode ne vaut que par ses résultats. Nos expertises sont des moyens, votre croissance est le but.</Lignes>
            </p>
          </Reveal>
          <div className="grid grid-4 piliers-grid">
            {piliers.map((p) => (
              /* tabIndex : le bloc s'ouvre aussi au clavier (Tab), comme au survol. */
              <Reveal key={p.id} className="card pilier" id={`pilier-${p.id}`} tabIndex={0} style={{ scrollMarginTop: "90px" }}>
                <span className="emoji" aria-hidden="true">{p.icone}</span>
                <h3>{p.titre}</h3>
                <p className="pilier__accroche">{p.accroche}</p>
                <div className="pilier__details">
                  <div className="pilier__inner">
                    <p><Lignes>{p.texte}</Lignes></p>
                    <ul>
                      {p.moyens.map((m) => <li key={m}>{m}</li>)}
                    </ul>
                    <p className="pilier__resultat">
                      <strong>Résultat&nbsp;:</strong> {p.resultat}
                    </p>
                  </div>
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
            <h2 className="titre-1ligne">Nos solutions, étape par étape</h2>
            <p className="lead">
              <Lignes>Les lettres au-dessus de chaque solution indiquent les étapes de la méthode qu&apos;elle couvre.</Lignes>
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
              <Lignes>Chaque étude de cas raconte le projet étape par étape, pour montrer la méthode V.I.S.I.O.N. appliquée sur le terrain.</Lignes>
            </p>
          </Reveal>

          {/* Rappel de la méthode en action : les étapes s'allument tour à tour,
              comme un projet qui avance (initiale V.I.S.I.O.N. en orange). */}
          <Reveal className="center vision-mini vision-mini--parcours" style={{ justifyContent: "center", marginBottom: "2.5rem" }}>
            {[
              ["Voir", "le besoin"],
              ["Imaginer", "la stratégie"],
              ["Structurer", "les supports"],
              ["Implémenter", "la réalisation"],
              ["Optimiser", "le suivi"],
              ["Nourrir", "l'accompagnement"],
            ].map(([verbe, objet]) => (
              <span key={verbe}>
                <b>{verbe[0]}</b>{verbe.slice(1)}&nbsp;: {objet}
              </span>
            ))}
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
            {/* Logos depuis le tableau de bord (collection « Clients »). Jusqu'à
                5 logos : une rangée fixe ; au-delà, un bandeau qui défile. */}
            {logosClients.length > 0 && (
              <div
                className={logosClients.length > 5 ? "marquee logos-clients" : "logos-clients logos-clients--fixe"}
                aria-label="Nos clients"
              >
                <ul className="marquee__track">
                  {(logosClients.length > 5 ? [...logosClients, ...logosClients] : logosClients).map((l, i) => {
                    const doublon = i >= logosClients.length;
                    const logo = <img src={l.src} alt={doublon ? "" : l.nom} loading="lazy" />;
                    return (
                      <li key={i} aria-hidden={doublon || undefined}>
                        {l.lien ? (
                          <a href={l.lien} target="_blank" rel="noopener noreferrer" tabIndex={doublon ? -1 : undefined}>{logo}</a>
                        ) : logo}
                      </li>
                    );
                  })}
                </ul>
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
      ) : null /* Décision direction : section masquée tant qu'elle est vide. */}

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
            <h2>Vos questions, nos réponses</h2>
          </Reveal>
          <Accordion items={faqAccueil} variante="glisse" />
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
                <h2>Prêt à faire grandir votre entreprise&nbsp;?</h2>
                <p className="lead">
                  <Lignes>Tout commence par un échange. Parlez-nous de vos objectifs&nbsp;: nous vous montrons comment les atteindre avec la méthode V.I.S.I.O.N.</Lignes>
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
