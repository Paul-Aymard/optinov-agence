"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { site, lienRdv, lienWhatsApp, estRenseigne } from "@/content/site";
import { Lignes } from "@/components/Lignes";

/* ------------------------------------------------------------------ *
 * Fil d'Ariane — EX-004, M — balisé Schema.org BreadcrumbList
 * ------------------------------------------------------------------ */
export function Breadcrumb({ items }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [{ nom: "Accueil", href: "/" }, ...items].map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.nom,
      item: `${site.url}${it.href}`,
    })),
  };

  return (
    <nav className="breadcrumb" aria-label="Fil d'Ariane">
      <div className="container">
        <ol>
          <li><Link href="/">Accueil</Link></li>
          {items.map((it, i) => (
            <li key={it.href}>
              {i === items.length - 1 ? (
                <span aria-current="page">{it.nom}</span>
              ) : (
                <Link href={it.href}>{it.nom}</Link>
              )}
            </li>
          ))}
        </ol>
      </div>
      <JsonLd data={jsonLd} />
    </nav>
  );
}

/* ------------------------------------------------------------------ *
 * Données structurées — SEO-005, M
 * ------------------------------------------------------------------ */
export function JsonLd({ data }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/* ------------------------------------------------------------------ *
 * Apparition au scroll — UX-003, S / UX-005, M (prefers-reduced-motion
 * est géré en CSS ; l'observer ne s'exécute qu'une fois par élément)
 * ------------------------------------------------------------------ */
export function Reveal({ children, as: Tag = "div", className = "", ...rest }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <Tag ref={ref} data-reveal="" className={className} {...rest}>
      {children}
    </Tag>
  );
}

/* ------------------------------------------------------------------ *
 * Accordéon accessible au clavier — EX-016, M
 * ------------------------------------------------------------------ */
export function Accordion({ items, defaultOpen = -1 }) {
  const [open, setOpen] = useState(defaultOpen);
  const base = useId();

  return (
    <div className="accordion">
      {items.map((it, i) => {
        const ouvert = open === i;
        return (
          <div className="accordion__item" key={i}>
            <h3 style={{ margin: 0 }}>
              <button
                type="button"
                className="accordion__btn"
                aria-expanded={ouvert}
                aria-controls={`${base}-panel-${i}`}
                id={`${base}-btn-${i}`}
                onClick={() => setOpen(ouvert ? -1 : i)}
              >
                <span>{it.q}</span>
                <span className="plus" aria-hidden="true" />
              </button>
            </h3>
            <div
              className="accordion__panel"
              id={`${base}-panel-${i}`}
              role="region"
              aria-labelledby={`${base}-btn-${i}`}
              {...(ouvert ? { "data-open": "" } : {})}
            >
              <p style={{ margin: 0 }}><Lignes>{it.r}</Lignes></p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/** Balisage Schema.org FAQPage — SEO-012, M */
export function FaqJsonLd({ items }) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: items.map((it) => ({
          "@type": "Question",
          name: it.q,
          acceptedAnswer: { "@type": "Answer", text: it.r },
        })),
      }}
    />
  );
}

/* ------------------------------------------------------------------ *
 * Onglets accessibles (flèches gauche/droite) — cas d'usage PROS.CARDS
 *
 * `items` : [{ id, label, panel: ReactNode }]. Le panneau est passé sous
 * forme d'élément JSX déjà construit, et non de fonction de rendu : un
 * composant serveur ne peut pas passer de fonction à un composant client.
 * ------------------------------------------------------------------ */
export function Tabs({ items }) {
  const [actif, setActif] = useState(0);
  const base = useId();
  const refs = useRef([]);

  const onKeyDown = (e) => {
    const n = items.length;
    let next = null;
    if (e.key === "ArrowRight") next = (actif + 1) % n;
    if (e.key === "ArrowLeft") next = (actif - 1 + n) % n;
    if (e.key === "Home") next = 0;
    if (e.key === "End") next = n - 1;
    if (next !== null) {
      e.preventDefault();
      setActif(next);
      refs.current[next]?.focus();
    }
  };

  return (
    <>
      <div className="tabs" role="tablist" onKeyDown={onKeyDown}>
        {items.map((it, i) => (
          <button
            key={it.id}
            type="button"
            role="tab"
            id={`${base}-tab-${i}`}
            aria-selected={actif === i}
            aria-controls={`${base}-panel-${i}`}
            tabIndex={actif === i ? 0 : -1}
            ref={(el) => (refs.current[i] = el)}
            onClick={() => setActif(i)}
          >
            {it.label}
          </button>
        ))}
      </div>
      {items.map((it, i) => (
        <div
          key={it.id}
          role="tabpanel"
          id={`${base}-panel-${i}`}
          aria-labelledby={`${base}-tab-${i}`}
          hidden={actif !== i}
          tabIndex={0}
        >
          {it.panel}
        </div>
      ))}
    </>
  );
}

/* ------------------------------------------------------------------ *
 * Carrousel à défilement natif (scroll-snap) + boutons de navigation
 * ------------------------------------------------------------------ */
export function Carousel({ children, label }) {
  const ref = useRef(null);
  const faireDefiler = (dir) => {
    const el = ref.current;
    if (!el) return;
    el.scrollBy({ left: dir * (el.clientWidth * 0.8), behavior: "smooth" });
  };

  return (
    <div className="carousel">
      <div className="carousel__track" ref={ref} tabIndex={0} role="group" aria-label={label}>
        {children}
      </div>
      <div className="carousel__nav">
        <button type="button" onClick={() => faireDefiler(-1)} aria-label="Élément précédent">←</button>
        <button type="button" onClick={() => faireDefiler(1)} aria-label="Élément suivant">→</button>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * Comparateur avant / après — EX-013, S
 * ------------------------------------------------------------------ */
export function AvantApres({ avant = "Avant", apres = "Après" }) {
  const [pos, setPos] = useState(50);
  return (
    <div className="ba">
      <div className="ba__layer ba__before">{avant}</div>
      <div className="ba__layer ba__after" style={{ clipPath: `inset(0 0 0 ${pos}%)` }}>{apres}</div>
      <div className="ba__handle" style={{ left: `${pos}%` }} aria-hidden="true" />
      <input
        type="range"
        min="0"
        max="100"
        value={pos}
        onChange={(e) => setPos(Number(e.target.value))}
        aria-label="Comparer avant et après"
      />
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * WhatsApp flottant — EX-033, M
 * Message pré-rempli contextuel selon la page d'origine.
 * ------------------------------------------------------------------ */
export function WhatsAppFloat({ contexte }) {
  // Sans numéro renseigné, pas de bouton flottant : un bouton WhatsApp qui
  // n'ouvre pas WhatsApp est pire que pas de bouton du tout.
  if (!estRenseigne(site.whatsapp)) return null;

  return (
    <a
      className="wa-float"
      href={lienWhatsApp(contexte)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Nous écrire sur WhatsApp"
      data-ga="clic_whatsapp"
    >
      <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M17.47 14.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.48-1.75-1.65-2.05-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.6-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.01-1.04 2.47s1.06 2.86 1.21 3.06c.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.69.63.71.22 1.36.19 1.87.12.57-.09 1.75-.72 2-1.41.25-.7.25-1.29.17-1.42-.07-.13-.27-.2-.57-.35z" />
        <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.2-1.15l-.3-.18-3.1.81.83-3.02-.2-.31A8.2 8.2 0 1 1 12 20.2z" />
      </svg>
    </a>
  );
}

/* ------------------------------------------------------------------ *
 * Section bandeau CTA réutilisable
 * ------------------------------------------------------------------ */
export function CtaBand({ titre, texte, contexte }) {
  return (
    <Reveal className="cta-band">
      <h2>{titre}</h2>
      <p className="lead">{texte}</p>
      <div className="btn-group" style={{ marginTop: "1.5rem" }}>
        {estRenseigne(site.rdvUrl) && (
          <a className="btn btn--gold" href={lienRdv()} data-ga="cta_rdv">Prendre rendez-vous</a>
        )}
        {estRenseigne(site.whatsapp) && (
          <a
            className="btn btn--wa"
            href={lienWhatsApp(contexte)}
            target="_blank"
            rel="noopener noreferrer"
            data-ga="clic_whatsapp"
          >
            Écrire sur WhatsApp
          </a>
        )}
        {/* Devient le CTA principal quand la prise de rendez-vous n'est pas branchée */}
        <Link className={`btn ${estRenseigne(site.rdvUrl) ? "btn--ghost" : "btn--gold"}`} href="/contact">
          Nous contacter
        </Link>
      </div>
    </Reveal>
  );
}
