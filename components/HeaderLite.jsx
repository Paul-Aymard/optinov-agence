"use client";

import Link from "next/link";
import { useState } from "react";
import { lienPlateforme } from "@/content/site";
import { ancres } from "@/content/prosCards";

/**
 * Header allégé de la landing PROS.CARDS — EX-020, M
 * - Logo OPTINOV × PROS.CARDS (seul retour au site global avec le footer)
 * - Ancres internes : Fonctionnalités, Tarifs, FAQ
 * - Lien « Connexion » vers l'espace client de la plateforme (EX-052)
 * - CTA unique « Créer ma carte » toujours visible
 *
 * UX-020 : le smooth scroll et l'offset du header sticky sont gérés en CSS
 * (`scroll-behavior: smooth` + `scroll-padding-top`), ce qui respecte
 * automatiquement `prefers-reduced-motion` (UX-005).
 */
export default function HeaderLite() {
  const [open, setOpen] = useState(false);

  return (
    <header className="header header--lite">
      <div className="container header__inner">
        <Link href="/" className="logo" aria-label="OPTINOV — retour au site">
          <span className="logo__mark" aria-hidden="true">OP</span>
          <span>
            OPTINOV <span style={{ color: "var(--or-600)" }}>×</span> PROS.CARDS
            <small>Carte de visite digitale</small>
          </span>
        </Link>

        <nav className="nav" id="menu-principal" aria-label="Sections de la page">
          <ul>
            {ancres.map((a) => (
              <li key={a.href}>
                <a href={a.href} onClick={() => setOpen(false)}>{a.label}</a>
              </li>
            ))}
            <li>
              <a href={lienPlateforme("connexion")} rel="noopener noreferrer">Connexion</a>
            </li>
          </ul>

          <div className="nav__cta">
            <a className="btn btn--gold btn--block" href={lienPlateforme("inscription")} data-ga="cta_creer_carte">
              Créer ma carte
            </a>
          </div>
        </nav>

        {/* EX-026 : redirige vers le tunnel d'inscription de la plateforme */}
        <a className="btn btn--gold" href={lienPlateforme("inscription")} data-ga="cta_creer_carte">
          Créer ma carte
        </a>

        <button
          type="button"
          className="burger"
          aria-expanded={open}
          aria-controls="menu-principal"
          onClick={() => {
            setOpen((v) => !v);
            document.body.classList.toggle("menu-open");
          }}
        >
          <span aria-hidden="true" />
          <span className="sr-only">{open ? "Fermer le menu" : "Ouvrir le menu"}</span>
        </button>
      </div>
    </header>
  );
}
