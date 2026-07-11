"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { site, nav, lienRdv, lienWhatsApp, estRenseigne } from "@/content/site";

/**
 * Header fixe (sticky) — EX-001, M
 * Menu mobile burger plein écran — EX-002, M
 * Méga-menu Services / Solutions, navigable au clavier (UX-008).
 */
export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [openSub, setOpenSub] = useState(null);
  const navRef = useRef(null);

  // Referme tout au changement de page
  useEffect(() => {
    setMenuOpen(false);
    setOpenSub(null);
  }, [pathname]);

  // Verrouille le scroll quand le panneau mobile est ouvert
  useEffect(() => {
    document.body.classList.toggle("menu-open", menuOpen);
    return () => document.body.classList.remove("menu-open");
  }, [menuOpen]);

  // Échap referme ; clic extérieur referme le sous-menu
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") {
        setOpenSub(null);
        setMenuOpen(false);
      }
    };
    const onClick = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) setOpenSub(null);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("click", onClick);
    };
  }, []);

  const isCurrent = (href) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="header">
      <div className="container header__inner">
        <Link href="/" className="logo" aria-label="OPTINOV Agence — accueil">
          <span className="logo__mark" aria-hidden="true">OP</span>
          <span>
            OPTINOV
            <small>Agence</small>
          </span>
        </Link>

        <nav className="nav" id="menu-principal" ref={navRef} aria-label="Navigation principale">
          <ul>
            {nav.map((item) =>
              item.sub ? (
                <li
                  key={item.href}
                  className="has-sub"
                  data-open={openSub === item.href ? "true" : "false"}
                  onMouseEnter={() => setOpenSub(item.href)}
                  onMouseLeave={() => setOpenSub(null)}
                >
                  <button
                    type="button"
                    aria-expanded={openSub === item.href}
                    aria-controls={`submenu-${item.label}`}
                    onClick={() => setOpenSub(openSub === item.href ? null : item.href)}
                  >
                    {item.label}
                  </button>
                  <ul className="submenu" id={`submenu-${item.label}`}>
                    <li>
                      <Link href={item.href} aria-current={pathname === item.href ? "page" : undefined}>
                        Tous les {item.label.toLowerCase()}
                      </Link>
                    </li>
                    {item.sub.map((s) => (
                      <li key={s.href}>
                        <Link href={s.href} aria-current={pathname === s.href ? "page" : undefined}>
                          {s.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
              ) : (
                <li key={item.href}>
                  <Link href={item.href} aria-current={isCurrent(item.href) ? "page" : undefined}>
                    {item.label}
                  </Link>
                </li>
              )
            )}
          </ul>

          {/* CTA repliés dans le panneau mobile — EX-002 */}
          <div className="nav__cta">
            {estRenseigne(site.whatsapp) && (
              <a
                className="btn btn--wa btn--block"
                href={lienWhatsApp()}
                target="_blank"
                rel="noopener noreferrer"
                data-ga="cta_whatsapp"
              >
                WhatsApp
              </a>
            )}
            <a className="btn btn--gold btn--block" href={lienRdv()} data-ga="cta_rdv">
              {estRenseigne(site.rdvUrl) ? "Prendre rendez-vous" : "Nous contacter"}
            </a>
          </div>
        </nav>

        {/* CTA permanent or, à droite — EX-001 */}
        {/* Sans module de RDV branché (EX-035), le CTA mène au formulaire de contact. */}
        <a className="btn btn--gold" href={lienRdv()} data-ga="cta_rdv">
          {estRenseigne(site.rdvUrl) ? "Prendre rendez-vous" : "Nous contacter"}
        </a>

        <button
          type="button"
          className="burger"
          aria-expanded={menuOpen}
          aria-controls="menu-principal"
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span aria-hidden="true" />
          <span className="sr-only">{menuOpen ? "Fermer le menu" : "Ouvrir le menu"}</span>
        </button>
      </div>
    </header>
  );
}
