"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { site, nav, lienRdv, lienWhatsApp, estRenseigne } from "@/content/site";

/** Largeur a partir de laquelle la navigation complete tient sur une ligne.
 *  Mesure reelle : logo 216 + liens 659 + CTA 127 + gouttieres 80 = ~1163 px.
 *  En dessous, on bascule sur le tiroir (burger). */
const BP_DESKTOP = "(min-width: 1180px)";

/**
 * Header fixe (sticky) — EX-001, M
 * Tiroir mobile / tablette — EX-002, M
 * Méga-menu Services / Solutions, navigable au clavier (UX-008).
 */
export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [openSub, setOpenSub] = useState(null);
  const navRef = useRef(null);
  const burgerRef = useRef(null);

  // Referme tout au changement de page
  useEffect(() => {
    setMenuOpen(false);
    setOpenSub(null);
  }, [pathname]);

  // Le tiroir n'existe pas sur grand ecran : on le referme au passage en desktop,
  // sinon <body> reste verrouille avec un burger devenu invisible.
  useEffect(() => {
    const mq = window.matchMedia(BP_DESKTOP);
    const onChange = (e) => { if (e.matches) setMenuOpen(false); };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  // Verrouille le scroll quand le tiroir est ouvert (html + body : iOS ignore body seul)
  useEffect(() => {
    document.documentElement.classList.toggle("menu-open", menuOpen);
    document.body.classList.toggle("menu-open", menuOpen);
    return () => {
      document.documentElement.classList.remove("menu-open");
      document.body.classList.remove("menu-open");
    };
  }, [menuOpen]);

  // Échap referme ; clic extérieur referme le sous-menu
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") {
        setOpenSub(null);
        if (menuOpen) {
          setMenuOpen(false);
          burgerRef.current?.focus();
        }
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
  }, [menuOpen]);

  const isCurrent = (href) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="header" data-menu={menuOpen ? "open" : "closed"}>
      {/* Voile : ferme le tiroir au clic a cote (UX-008). Sous le tiroir, sous la barre. */}
      <div
        className="nav-voile"
        hidden={!menuOpen}
        onClick={() => setMenuOpen(false)}
        aria-hidden="true"
      />

      <div className="container header__inner">
        {/* Logo officiel OPTINOV (public/logo-optinov.png, 800×200, fond transparent). */}
        <Link href="/" className="logo" aria-label="OPTINOV — accueil">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo-optinov.png" alt="OPTINOV" className="logo__img" width="216" height="54" />
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
              ) : item.externe ? (
                <li key={item.href}>
                  <a className="nav__pros" href={item.href} target="_blank" rel="noopener noreferrer" data-ga="cta_pros_cards">
                    {item.label}
                  </a>
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

          {/* CTA repliés dans le tiroir — EX-002 */}
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
        <a className="btn btn--gold header__cta" href={lienRdv()} data-ga="cta_rdv">
          {estRenseigne(site.rdvUrl) ? "Prendre rendez-vous" : "Nous contacter"}
        </a>

        <button
          type="button"
          className="burger"
          ref={burgerRef}
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
