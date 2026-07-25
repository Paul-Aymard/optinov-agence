import Link from "next/link";
import { chiffresCles, equipe, valeurs } from "@/content/site";
import { Breadcrumb, Reveal, CtaBand, WhatsAppFloat } from "@/components/Ui";

/** À propos (G2) — CDC §6.2 */
export const metadata = {
  title: "À propos d'OPTINOV",
  description:
    "Qui sommes-nous : le pôle communication du groupe OPTINOV, basé à Abidjan. Notre histoire, notre vision, nos valeurs et l'équipe qui les porte.",
  alternates: { canonical: "/a-propos" },
};

export default function Agence() {
  return (
    <>
      <Breadcrumb items={[{ nom: "À propos", href: "/a-propos" }]} />

      {/* Hero éditorial */}
      <section className="hero hero--page">
        <div className="container">
          <Reveal>
            <span className="eyebrow">Qui nous sommes</span>
            <h1>Un partenaire qui rend des comptes</h1>
            <p className="lead">
              Nous sommes le pôle communication du groupe OPTINOV. Nous travaillons pour
              des dirigeants qui attendent d&apos;un partenaire autre chose que de belles
              images : des résultats qu&apos;on peut lire.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Notre histoire — récit court, 150-200 mots, première personne du pluriel */}
      <section className="section">
        <div className="container hero__grid">
          <Reveal>
            <span className="eyebrow">Notre histoire</span>
            <h2>Née d&apos;une frustration</h2>
            <p>
              Nous avons commencé par constater ce que beaucoup de dirigeants ivoiriens nous
              disaient en privé : trop de prestataires promettent, facturent, puis disparaissent. Les
              livrables arrivent en retard, les résultats ne se mesurent jamais, et personne
              ne répond quand le téléphone sonne.
            </p>
            <p>
              OPTINOV s&apos;est construite contre cela. Un interlocuteur unique qui
              connaît votre dossier. Des délais contractualisés. Des indicateurs définis avant
              de commencer, pas inventés après coup pour justifier la facture.
            </p>
            <p>
              Nous avons aussi choisi de développer nos propres outils plutôt que de revendre
              ceux des autres. PROS.CARDS est né de cette conviction : quand un besoin revient
              chez tous nos clients, il mérite un produit, pas une prestation répétée.
            </p>
          </Reveal>
          <Reveal>
            <div className="hero-visual">
              <p className="ph">Nos locaux à Abidjan</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Vision & mission */}
      <section className="section section--alt">
        <div className="container">
          <Reveal className="section-head center">
            <span className="eyebrow">Vision &amp; mission</span>
            <h2>Faire de la communication un investissement, pas une dépense</h2>
            <p className="lead">
              Notre mission : donner aux entreprises d&apos;Afrique francophone les moyens
              d&apos;une image à la hauteur de leur ambition, et les outils pour la mesurer.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Valeurs */}
      <section className="section">
        <div className="container">
          <Reveal className="section-head">
            <span className="eyebrow">Nos valeurs</span>
            <h2>Ce sur quoi nous ne transigeons pas</h2>
          </Reveal>
          <div className="grid grid-4">
            {valeurs.map((v) => (
              <Reveal key={v.titre} className="card">
                <h3>{v.titre}</h3>
                <p>{v.texte}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* L'équipe — masquée tant que les portraits ne sont pas fournis */}
      {equipe.length > 0 && (
        <section className="section section--alt">
          <div className="container">
            <Reveal className="section-head center">
              <span className="eyebrow">L&apos;équipe</span>
              <h2>Les visages derrière les livrables</h2>
            </Reveal>
            <div className="grid grid-4">
              {equipe.map((m) => (
                <Reveal key={m.nom} className="card card--project">
                  <div className="thumb">{m.nom}</div>
                  <div className="card__body">
                    <h3 style={{ fontSize: "1.1rem" }}>{m.nom}</h3>
                    <p className="meta"><span>{m.role}</span></p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Chiffres clés — masqués tant qu'ils ne sont pas arrêtés */}
      {chiffresCles.length > 0 && (
        <section className="section">
          <div className="container">
            <div className="stats">
              {chiffresCles.map((c) => (
                <Reveal key={c.label} className="stat">
                  <div className="stat__num">{c.num}</div>
                  <div className="stat__label">{c.label}</div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Bandeau CTA « Rencontrons-nous » */}
      <section className="section section--alt">
        <div className="container">
          <CtaBand
            titre="Rencontrons-nous"
            texte="Nos bureaux sont à Abidjan. Le café est offert, le premier échange aussi."
            contexte="une rencontre avec l'équipe"
          />
        </div>
      </section>

      <WhatsAppFloat contexte="une présentation d'OPTINOV" />
    </>
  );
}
