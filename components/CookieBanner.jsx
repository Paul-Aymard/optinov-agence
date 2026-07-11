"use client";

import { useEffect, useState } from "react";

/**
 * Bandeau de consentement — EX-045, M / EX-046, M
 * - Accepter / Refuser / Personnaliser à poids visuel égal (les trois sont des
 *   boutons de même taille ; « Accepter » n'est pas mis en avant).
 * - Catégories : nécessaires (toujours actifs), mesure d'audience, marketing.
 * - Journalisation du consentement (date, version, choix).
 * - EX-044 : aucun tag non essentiel ne se déclenche avant consentement.
 *   `window.dataLayer` n'est alimenté qu'après un choix explicite.
 */

const CLE = "optinov_consent";
const VERSION = 1;

export function openCookiePrefs() {
  window.dispatchEvent(new CustomEvent("optinov:cookies:open"));
}

export function lireConsentement() {
  if (typeof window === "undefined") return null;
  try {
    const brut = localStorage.getItem(CLE);
    if (!brut) return null;
    const c = JSON.parse(brut);
    return c.version === VERSION ? c : null;
  } catch {
    return null;
  }
}

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const [prefsOuvertes, setPrefsOuvertes] = useState(false);
  const [audience, setAudience] = useState(false);
  const [marketing, setMarketing] = useState(false);

  useEffect(() => {
    if (!lireConsentement()) setVisible(true);
    const onOpen = () => {
      const c = lireConsentement();
      setAudience(!!c?.audience);
      setMarketing(!!c?.marketing);
      setPrefsOuvertes(true);
      setVisible(true);
    };
    window.addEventListener("optinov:cookies:open", onOpen);
    return () => window.removeEventListener("optinov:cookies:open", onOpen);
  }, []);

  const enregistrer = (choix) => {
    const consentement = {
      version: VERSION,
      date: new Date().toISOString(),
      necessaires: true,
      ...choix,
    };
    localStorage.setItem(CLE, JSON.stringify(consentement));

    // EX-044 : les tags ne sont poussés qu'après consentement explicite.
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "consentement_cookies",
      mesure_audience: consentement.audience ? "granted" : "denied",
      marketing: consentement.marketing ? "granted" : "denied",
    });

    setVisible(false);
    setPrefsOuvertes(false);
  };

  if (!visible) return null;

  return (
    <div
      className="cookie"
      data-open=""
      role="dialog"
      aria-modal="false"
      aria-labelledby="cookie-titre"
      aria-describedby="cookie-desc"
    >
      <h2 id="cookie-titre">Votre choix en matière de cookies</h2>
      <p id="cookie-desc">
        Nous utilisons des cookies nécessaires au fonctionnement du site. Avec votre accord,
        nous mesurons également l&apos;audience et l&apos;efficacité de nos campagnes. Aucun
        cookie non essentiel n&apos;est déposé avant votre consentement.
      </p>

      <div className="cookie__actions">
        <button
          type="button"
          className="btn btn--ghost"
          onClick={() => enregistrer({ audience: true, marketing: true })}
        >
          Accepter
        </button>
        <button
          type="button"
          className="btn btn--ghost"
          onClick={() => enregistrer({ audience: false, marketing: false })}
        >
          Refuser
        </button>
        <button
          type="button"
          className="btn btn--ghost"
          aria-expanded={prefsOuvertes}
          onClick={() => setPrefsOuvertes((v) => !v)}
        >
          Personnaliser
        </button>
      </div>

      <div className="cookie__prefs" {...(prefsOuvertes ? { "data-open": "" } : {})}>
        <label className="checkbox">
          <input type="checkbox" checked disabled readOnly />
          <span>
            Cookies nécessaires
            <small>Sécurité, préférences et fonctionnement du site. Toujours actifs.</small>
          </span>
        </label>
        <label className="checkbox">
          <input type="checkbox" checked={audience} onChange={(e) => setAudience(e.target.checked)} />
          <span>
            Mesure d&apos;audience
            <small>Google Analytics 4 : pages vues, parcours, conversions.</small>
          </span>
        </label>
        <label className="checkbox">
          <input type="checkbox" checked={marketing} onChange={(e) => setMarketing(e.target.checked)} />
          <span>
            Marketing
            <small>Meta Pixel : mesure et ciblage de nos campagnes publicitaires.</small>
          </span>
        </label>
        <div>
          <button
            type="button"
            className="btn btn--gold btn--sm"
            onClick={() => enregistrer({ audience, marketing })}
          >
            Enregistrer mes choix
          </button>
        </div>
      </div>
    </div>
  );
}
