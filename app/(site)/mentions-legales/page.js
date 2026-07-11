import { site, TODO } from "@/content/site";
import { Breadcrumb, Reveal } from "@/components/Ui";

/**
 * Mentions légales (G10) — CDC §6.10
 * ⚠ Contenus juridiques [À compléter] par la direction OPTINOV.
 * Aucune mention légale n'est rédigée par le prestataire : la structure ci-dessous
 * énumère les rubriques obligatoires, à remplir avant mise en ligne (REC-01).
 * Pas de bouton WhatsApp flottant sur les pages légales (EX-033).
 */
export const metadata = {
  title: "Mentions légales",
  description: "Mentions légales du site OPTINOV Agence : éditeur, hébergeur, propriété intellectuelle.",
  alternates: { canonical: "/mentions-legales" },
  robots: { index: true, follow: false },
};

const rubriques = [
  { titre: "Éditeur du site", contenu: `Raison sociale : ${TODO}. Le site ${site.url} est édité par OPTINOV Agence, pôle communication du groupe OPTINOV.` },
  { titre: "Forme juridique et capital social", contenu: TODO },
  { titre: "Numéro RCCM", contenu: site.rccm },
  { titre: "Siège social", contenu: `${site.adresse}, ${site.ville}, ${site.pays}` },
  { titre: "Directeur de la publication", contenu: site.directeurPublication },
  { titre: "Contact", contenu: `Téléphone : ${site.telephone} — E-mail : ${site.email}` },
  { titre: "Hébergeur", contenu: `${site.hebergeur}. Raison sociale, adresse et téléphone de l'hébergeur : ${TODO}.` },
  {
    titre: "Propriété intellectuelle",
    contenu:
      "L'ensemble des contenus du site (textes, images, vidéos, logos, chartes graphiques, code source) est protégé par le droit de la propriété intellectuelle. Toute reproduction ou représentation, totale ou partielle, sans autorisation écrite préalable, est interdite. La marque PROS.CARDS et la plateforme associée sont la propriété d'OPTINOV Agence.",
  },
  {
    titre: "Crédits",
    contenu: `Conception et réalisation : ${TODO}. Photographies : ${TODO}.`,
  },
  {
    titre: "Données personnelles et cookies",
    contenu:
      "Les traitements de données personnelles réalisés depuis ce site sont décrits dans la politique de confidentialité, accessible depuis le pied de page.",
  },
];

export default function MentionsLegales() {
  return (
    <>
      <Breadcrumb items={[{ nom: "Mentions légales", href: "/mentions-legales" }]} />

      <section className="section">
        <div className="container">
          <Reveal className="prose" style={{ marginInline: "auto" }}>
            <h1>Mentions légales</h1>

            <p className="notice">
              <strong>À compléter avant mise en ligne.</strong> Le contenu juridique de cette
              page relève de la direction d&apos;OPTINOV Group (CDC §6.10). Les rubriques
              obligatoires sont en place ; leurs valeurs restent à renseigner.
            </p>

            {rubriques.map((r) => (
              <section key={r.titre}>
                <h2>{r.titre}</h2>
                <p>{r.contenu}</p>
              </section>
            ))}
          </Reveal>
        </div>
      </section>
    </>
  );
}
