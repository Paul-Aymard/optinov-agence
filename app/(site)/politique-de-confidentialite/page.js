import Link from "next/link";
import { site, TODO } from "@/content/site";
import { Breadcrumb, Reveal } from "@/components/Ui";

/**
 * Politique de confidentialité (G10) — CDC §6.10 et SEC-007
 * Rédaction conforme à la loi ivoirienne n° 2013-450 (ARTCI) et au RGPD pour
 * les visiteurs de l'UE. Les durées de conservation et le contact du référent
 * restent [À compléter] : ils engagent juridiquement la direction.
 */
export const metadata = {
  title: "Politique de confidentialité",
  description:
    "Données collectées, finalités, base légale, conservation, droits et cookies. Conformité loi n° 2013-450 (Côte d'Ivoire) et RGPD.",
  alternates: { canonical: "/politique-de-confidentialite" },
  robots: { index: true, follow: false },
};

export default function PolitiqueConfidentialite() {
  return (
    <>
      <Breadcrumb items={[{ nom: "Politique de confidentialité", href: "/politique-de-confidentialite" }]} />

      <section className="section">
        <div className="container">
          <Reveal className="prose" style={{ marginInline: "auto" }}>
            <h1>Politique de confidentialité</h1>
            <p className="meta"><span>Dernière mise à jour : {TODO}</span></p>

            <p className="notice">
              <strong>À valider par la direction.</strong> Ce document décrit les traitements
              effectivement mis en œuvre par le site tel qu&apos;il est développé. Les durées
              de conservation, l&apos;identité du référent et les sous-traitants doivent être
              arrêtés avant mise en ligne (SEC-007).
            </p>

            <h2>1. Responsable de traitement</h2>
            <p>
              OPTINOV Agence, {site.adresse}, {site.ville}, {site.pays}. Contact du référent
              en matière de protection des données : {TODO}.
            </p>

            <h2>2. Données collectées et finalités</h2>
            <table className="compare" style={{ minWidth: 0 }}>
              <thead>
                <tr>
                  <th scope="col">Traitement</th>
                  <th scope="col">Données</th>
                  <th scope="col">Base légale</th>
                  <th scope="col">Conservation</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">Formulaire de contact et de devis</th>
                  <td>Nom, e-mail, téléphone, entreprise, message</td>
                  <td>Consentement / mesures précontractuelles</td>
                  <td>{TODO}</td>
                </tr>
                <tr>
                  <th scope="row">Demande de rappel</th>
                  <td>Nom, téléphone, créneau souhaité</td>
                  <td>Consentement</td>
                  <td>{TODO}</td>
                </tr>
                <tr>
                  <th scope="row">Newsletter</th>
                  <td>Adresse e-mail</td>
                  <td>Consentement (double opt-in)</td>
                  <td>Jusqu&apos;au désabonnement</td>
                </tr>
                <tr>
                  <th scope="row">Mesure d&apos;audience</th>
                  <td>Identifiants de navigation, pages consultées</td>
                  <td>Consentement</td>
                  <td>{TODO}</td>
                </tr>
              </tbody>
            </table>

            <h2>3. Minimisation</h2>
            <p>
              Les formulaires ne collectent que les données nécessaires au traitement de votre
              demande. Aucun champ facultatif n&apos;est exigé, et aucune donnée sensible
              n&apos;est demandée.
            </p>

            <h2>4. Destinataires et sous-traitants</h2>
            <p>
              Vos données sont traitées par les équipes d&apos;OPTINOV Agence. Les
              sous-traitants (hébergeur, outil d&apos;e-mailing, CRM, outils de mesure) et les
              éventuels transferts hors Côte d&apos;Ivoire sont listés ici : {TODO}.
            </p>

            <h2>5. Cookies</h2>
            <p>
              Aucun cookie non essentiel n&apos;est déposé avant votre consentement. Trois
              catégories : nécessaires (toujours actifs), mesure d&apos;audience, marketing.
              Vous pouvez modifier vos choix à tout moment via le lien « Gérer mes cookies »
              en pied de page. Vos consentements sont journalisés.
            </p>

            <h2>6. Vos droits</h2>
            <p>
              Conformément à la loi ivoirienne n° 2013-450 relative à la protection des données
              à caractère personnel et, pour les visiteurs de l&apos;Union européenne, au
              Règlement général sur la protection des données, vous disposez des droits
              d&apos;accès, de rectification, d&apos;effacement, de limitation, d&apos;opposition
              et de portabilité de vos données.
            </p>
            <p>
              Pour les exercer, écrivez à {site.email}. Une réponse vous est apportée dans les
              délais légaux. Vous pouvez également introduire une réclamation auprès de
              l&apos;Autorité de régulation des télécommunications de Côte d&apos;Ivoire
              (ARTCI) ou, si vous résidez dans l&apos;Union européenne, auprès de votre autorité
              de contrôle nationale.
            </p>

            <h2>7. Sécurité</h2>
            <p>
              Le site est servi exclusivement en HTTPS. Les formulaires sont protégés contre le
              spam et les soumissions automatisées. Les accès au back-office sont soumis à une
              authentification forte et journalisés. Les données sont sauvegardées
              quotidiennement.
            </p>

            <h2>8. PROS.CARDS</h2>
            <p>
              La plateforme PROS.CARDS constitue un service distinct de ce site. Les données
              que vous y communiquez (compte, paiement, contenu de votre carte) sont régies par
              la politique de confidentialité et les conditions générales propres à la
              plateforme : {TODO}.
            </p>

            <h2>9. Contact</h2>
            <p>
              Toute question relative à cette politique peut être adressée à {site.email} ou via{" "}
              <Link href="/contact">notre formulaire de contact</Link>.
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
