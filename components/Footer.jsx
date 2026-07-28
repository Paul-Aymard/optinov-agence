"use client";

import Link from "next/link";
import { site, nav, lienTel, lienTelFixe, lienEmail, socialsRenseignes, estRenseigne } from "@/content/site";
import { openCookiePrefs } from "./CookieBanner";

/** Footer 4 colonnes — EX-003, M */
export default function Footer() {
  const servicesLinks = nav.find((n) => n.label === "Services")?.sub ?? [];

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">
          {/* Colonne 1 — présentation courte + coordonnées */}
          <div>
            <Link href="/" className="footer__logo" aria-label="OPTINOV — accueil">
              <img src="/logo-optinov.png" alt="OPTINOV" width="200" height="50" />
            </Link>
            <p style={{ marginTop: "1.1rem" }}>
              Pôle communication du groupe OPTINOV. Communication, marketing et
              transformation digitale à {site.ville}.
            </p>
            <ul>
              <li>{estRenseigne(site.adresse) ? site.adresse : `${site.ville}, ${site.pays}`}</li>
              {estRenseigne(site.telephone) && (
                <li>
                  <a href={lienTel()}>{site.telephone}</a>
                </li>
              )}
              {estRenseigne(site.telephoneFixe) && (
                <li>
                  <a href={lienTelFixe()}>{site.telephoneFixe}</a>
                </li>
              )}
              {estRenseigne(site.email) && (
                <li>
                  <a href={lienEmail()}>{site.email}</a>
                </li>
              )}
            </ul>
            {/* Les réseaux dont l'URL n'est pas encore arrêtée ne sont pas affichés :
                un lien mort dans le footer se propage sur les 32 pages (REC-01). */}
            {socialsRenseignes().length > 0 && (
              <div className="socials">
                {socialsRenseignes().map((s) => (
                  <a key={s.label} href={s.href} aria-label={s.label} target="_blank" rel="noopener noreferrer">
                    {s.court}
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Colonne 2 — Services */}
          <div>
            <h4>Nos services</h4>
            <ul>
              {servicesLinks.map((s) => (
                <li key={s.href}>
                  <Link href={s.href}>{s.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Colonne 3 — Solutions / Réalisations / Blog / FAQ */}
          <div>
            <h4>Découvrir</h4>
            <ul>
              <li><Link href="/solutions">Nos solutions</Link></li>
              <li><Link href="/solutions/pros-cards">PROS.CARDS</Link></li>
              <li><Link href="/realisations">Réalisations</Link></li>
              <li><Link href="/blog">Blog</Link></li>
              <li><Link href="/faq">FAQ</Link></li>
              <li><Link href="/a-propos">À propos</Link></li>
            </ul>
          </div>

          {/* Colonne 4 — newsletter + réseaux sociaux */}
          <div>
            <h4>Newsletter</h4>
            <p style={{ fontSize: ".88rem" }}>
              Nos analyses sur la communication et le digital en Afrique de l&apos;Ouest.
              Un e-mail par mois, pas davantage.
            </p>
            <NewsletterForm />
          </div>
        </div>

        {/* Signature de marque : les six étapes de V.I.S.I.O.N. */}
        <p className="footer__vision" aria-label="Méthode V.I.S.I.O.N.">
          {["Voir", "Imaginer", "Structurer", "Implémenter", "Optimiser", "Nourrir"].map((mot, i) => (
            <span key={mot}>
              <b>{mot[0]}</b>{mot.slice(1)}
              {i < 5 && <i aria-hidden="true">·</i>}
            </span>
          ))}
        </p>

        {/* Ligne inférieure — EX-003 */}
        <div className="footer__bottom">
          <p style={{ margin: 0 }}>
            © {new Date().getFullYear()} OPTINOV Group — Tous droits réservés
          </p>
          <ul>
            <li><Link href="/mentions-legales">Mentions légales</Link></li>
            <li><Link href="/politique-de-confidentialite">Politique de confidentialité</Link></li>
            <li>
              {/* Lien « Gérer mes cookies » permanent — EX-046 */}
              <button type="button" onClick={openCookiePrefs}>Gérer mes cookies</button>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

/** Newsletter, double opt-in — EX-037, S */
function NewsletterForm() {
  return (
    <form
      className="form"
      style={{ gap: ".7rem" }}
      onSubmit={(e) => {
        e.preventDefault();
        const f = e.currentTarget;
        // TODO back-end : POST vers l'outil d'e-mailing [À compléter], double opt-in
        f.querySelector("[data-alert]").setAttribute("data-show", "");
        f.reset();
      }}
    >
      <label className="sr-only" htmlFor="nl-email">Adresse e-mail</label>
      <input id="nl-email" name="email" type="email" required placeholder="votre@email.com" />
      <label className="checkbox">
        <input type="checkbox" name="consentement" required />
        <span>J&apos;accepte de recevoir la newsletter et j&apos;ai lu la politique de confidentialité.</span>
      </label>
      <button type="submit" className="btn btn--gold btn--sm" data-ga="newsletter_submit">
        S&apos;inscrire
      </button>
      <p className="form-alert form-alert--ok" data-alert style={{ fontSize: ".8rem" }}>
        Merci. Un e-mail de confirmation vient de vous être envoyé.
      </p>
    </form>
  );
}
