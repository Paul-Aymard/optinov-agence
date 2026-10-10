import Link from "next/link";
import { chiffresCles, equipe, valeurs } from "@/content/site";
import { Breadcrumb, Reveal, CtaBand, WhatsAppFloat } from "@/components/Ui";
import { Lignes } from "@/components/Lignes";

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
            <h1>Une seule équipe pour toute votre communication</h1>
            <p className="lead">
              Nous sommes le pôle communication du groupe OPTINOV, à Abidjan. Nous
              travaillons pour des dirigeants qui attendent plus que de belles images&nbsp;:
              des résultats concrets et mesurables.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Notre histoire — récit court, 150-200 mots, première personne du pluriel */}
      <section className="section">
        <div className="container hero__grid">
          <Reveal>
            <span className="eyebrow">Notre histoire</span>
            <h2>Née d&apos;une conviction</h2>
            <p>
              <Lignes>Les entreprises qui marquent leur époque ne communiquent pas plus que les autres. Elles communiquent mieux.</Lignes>
            </p>
            <p>
              <Lignes>Pourtant, la communication reste souvent éclatée : une agence pour le logo, une autre pour le site, un prestataire pour les réseaux sociaux, un autre pour les vidéos. Les actions se multiplient, la vision se disperse.</Lignes>
            </p>
            <p>
              <Lignes>Nous avons créé OPTINOV pour changer cela. Notre nom dit notre ambition : «&nbsp;Optez pour l&apos;Innovation&nbsp;». La communication ne doit pas être une suite de prestations, mais un vrai levier de croissance.</Lignes>
            </p>
            <p>
              <Lignes>Nous accompagnons les entreprises qui veulent aller plus loin que la simple visibilité : construire une marque forte, rendre leur communication cohérente, moderniser leurs outils et faire de chaque action un investissement utile.</Lignes>
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
              Notre mission&nbsp;: donner aux entreprises d&apos;Afrique de l&apos;Ouest une image
              à la hauteur de leurs ambitions, et les outils pour en mesurer les résultats.
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
          {/* Valeurs en cercles (maquette direction) : anneau orange en pointillés
              qui tourne lentement, et s'accélère au survol. */}
          <div className="valeurs-cercles">
            {valeurs.map((v) => (
              <Reveal key={v.titre} className="valeur-cercle">
                <div className="valeur-cercle__disque">
                  <h3>{v.titre}</h3>
                  <p><Lignes>{v.texte}</Lignes></p>
                </div>
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
              <h2>Les visages derrière vos projets</h2>
            </Reveal>
            <div className="grid grid-4">
              {equipe.map((m) => (
                <Reveal key={m.nom} className="card card--project">
                  <div className="thumb" style={m.photo ? { overflow: "hidden" } : undefined}>
                    {m.photo ? (
                      <img src={m.photo.carte || m.photo.url} alt={m.photo.alt || m.nom} loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    ) : (
                      m.nom
                    )}
                  </div>
                  <div className="card__body">
                    <h3 style={{ fontSize: "1.1rem" }}>{m.nom}</h3>
                    <p className="meta"><span>{m.role}</span></p>
                    {m.linkedin && (
                      <a className="link-arrow" href={m.linkedin} target="_blank" rel="noopener noreferrer">
                        LinkedIn<span className="sr-only"> de {m.nom}</span>
                      </a>
                    )}
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
            texte="Nos bureaux sont à Abidjan. Passez nous voir, le café est offert."
            contexte="une rencontre avec l'équipe"
          />
        </div>
      </section>

      <WhatsAppFloat contexte="une présentation d'OPTINOV" />
    </>
  );
}
