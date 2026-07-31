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
            <h2>Née d&apos;une conviction</h2>
            <p>
              <Lignes>Les entreprises qui marquent leur époque ne communiquent pas davantage. Elles communiquent mieux.</Lignes>
            </p>
            <p>
              <Lignes>Pourtant, dans de nombreuses organisations, la communication reste fragmentée. Une agence conçoit le logo. Une autre réalise le site internet. Les réseaux sociaux sont confiés à un prestataire, les vidéos à un autre, le marketing à un troisième.</Lignes>
            </p>
            <p>
              <Lignes>Les actions se multiplient, mais la vision se disperse.</Lignes>
            </p>
            <p>
              <Lignes>Nous avons créé OPTINOV avec une conviction forte : la communication ne doit pas être une succession de prestations. Elle doit devenir un véritable levier de croissance.</Lignes>
            </p>
            <p>
              <Lignes>Notre nom traduit cette ambition : OPTINOV, pour «&nbsp;Optez pour l&apos;Innovation&nbsp;».</Lignes>
            </p>
            <p>
              <Lignes>Nous accompagnons les entreprises qui veulent aller au-delà de la simple visibilité. Celles qui souhaitent construire une marque forte, harmoniser leur communication, moderniser leurs outils et faire de chaque action un investissement créateur de valeur.</Lignes>
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
                <p><Lignes>{v.texte}</Lignes></p>
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
