"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Page Réalisations en sections (PDF « NOUVELLE MODIF AGENCE ») : un bandeau
 * arrondi par section, puis une rangée d'images carrées avec le nom du client
 * dessous, encadrée de flèches ‹ ›.
 *
 * Les sections viennent du tableau de bord (« Sections de réalisations ») avec
 * leur sens de défilement. À partir de 4 images, la rangée défile toute seule,
 * en boucle, dans le sens choisi ; elle se met en pause au survol et quand un
 * visiteur utilise les flèches. Jusqu'à 3 images, la rangée reste fixe.
 */

const VITESSE = 28; // px par seconde, défilement automatique
const SEUIL_DEFILEMENT = 4; // la rangée défile à partir de la 4ᵉ image

function Vignette({ projet }) {
  const img = projet.visuel?.carte || projet.visuel?.url;
  return (
    <Link href={`/realisations/${projet.slug}`} className="rea-carte">
      <span className="rea-carte__img">
        {img ? (
          <img src={img} alt={projet.visuel?.alt || ""} loading="lazy" draggable="false" />
        ) : (
          <span aria-hidden="true">{projet.client.charAt(0)}</span>
        )}
      </span>
      <span className="rea-carte__titre">{projet.client}</span>
    </Link>
  );
}

function Rangee({ section }) {
  const { projets, sens } = section;
  const defile = projets.length >= SEUIL_DEFILEMENT;

  const fenetre = useRef(null);
  const piste = useRef(null);
  const etat = useRef({ x: 0, cible: null, pause: false, dernier: 0 });
  const [mouvementReduit, setMouvementReduit] = useState(false);
  // Rangée fixe : les flèches n'apparaissent que si les vignettes débordent (petit écran).
  const [deborde, setDeborde] = useState(defile);

  useEffect(() => {
    if (defile) return;
    const f = fenetre.current;
    if (!f) return;
    const mesurer = () => setDeborde(f.scrollWidth > f.clientWidth + 1);
    mesurer();
    const ro = new ResizeObserver(mesurer);
    ro.observe(f);
    return () => ro.disconnect();
  }, [defile]);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setMouvementReduit(mq.matches);
    const maj = () => setMouvementReduit(mq.matches);
    mq.addEventListener("change", maj);
    return () => mq.removeEventListener("change", maj);
  }, []);

  // Largeur d'une vignette + l'écart : le pas des flèches.
  const pas = useCallback(() => {
    const carte = piste.current?.querySelector(".rea-carte");
    if (!carte) return 0;
    const gap = parseFloat(getComputedStyle(piste.current).columnGap) || 0;
    return carte.getBoundingClientRect().width + gap;
  }, []);

  // Boucle d'animation : la piste contient les vignettes deux fois, on ramène
  // la position dans [−moitié, 0] pour un défilement sans couture.
  useEffect(() => {
    if (!defile) return;
    let raf;
    const e = etat.current;
    const tick = (t) => {
      const dt = e.dernier ? Math.min((t - e.dernier) / 1000, 0.05) : 0;
      e.dernier = t;
      const moitie = (piste.current?.scrollWidth || 0) / 2;
      if (moitie > 0) {
        if (e.cible !== null) {
          // Clic sur une flèche : glissement amorti jusqu'à la vignette suivante.
          const reste = e.cible - e.x;
          if (Math.abs(reste) < 0.5) {
            e.x = e.cible;
            e.cible = null;
          } else {
            e.x += reste * Math.min(1, dt * 9);
          }
        } else if (!e.pause && !mouvementReduit) {
          // « gauche-droite » : les images glissent vers la droite.
          e.x += (sens === "droite-gauche" ? -1 : 1) * VITESSE * dt;
        }
        if (e.x > 0) {
          e.x -= moitie;
          if (e.cible !== null) e.cible -= moitie;
        } else if (e.x < -moitie) {
          e.x += moitie;
          if (e.cible !== null) e.cible += moitie;
        }
        piste.current.style.transform = `translate3d(${e.x}px,0,0)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [defile, sens, mouvementReduit]);

  const deplacer = (direction) => {
    const e = etat.current;
    if (defile) {
      e.cible = (e.cible ?? e.x) - direction * pas();
    } else {
      fenetre.current?.scrollBy({ left: direction * pas(), behavior: "smooth" });
    }
  };

  const liste = defile ? [...projets, ...projets] : projets;

  return (
    <div
      className={`rea-rangee${defile ? " rea-rangee--defile" : ""}${deborde ? "" : " rea-rangee--sans-fleches"}`}
      onMouseEnter={() => (etat.current.pause = true)}
      onMouseLeave={() => (etat.current.pause = false)}
      onFocus={() => (etat.current.pause = true)}
      onBlur={() => (etat.current.pause = false)}
    >
      <button type="button" className="rea-fleche" onClick={() => deplacer(-1)} aria-label={`Réalisations précédentes — ${section.titre}`}>
        ‹
      </button>
      <div className="rea-fenetre" ref={fenetre}>
        <div className="rea-piste" ref={piste}>
          {liste.map((p, i) => (
            // La seconde copie (boucle) est masquée aux lecteurs d'écran et au clavier.
            <div key={`${p.slug}-${i}`} className="rea-item" aria-hidden={i >= projets.length || undefined} inert={i >= projets.length || undefined}>
              <Vignette projet={p} />
            </div>
          ))}
        </div>
      </div>
      <button type="button" className="rea-fleche" onClick={() => deplacer(1)} aria-label={`Réalisations suivantes — ${section.titre}`}>
        ›
      </button>
    </div>
  );
}

/**
 * @param sections  [{ id, titre, sens }] depuis le tableau de bord
 * @param projets   réalisations publiées (avec leurs identifiants de sections)
 */
export default function RealisationsSections({ sections, projets }) {
  const groupes = sections
    .map((s) => ({ ...s, projets: projets.filter((p) => p.sections.includes(s.id)) }))
    .filter((g) => g.projets.length > 0);

  // Une réalisation rattachée à aucune section ne doit pas disparaître du site.
  const sansSection = projets.filter((p) => !p.sections.some((id) => sections.some((s) => s.id === id)));
  if (sansSection.length > 0) {
    const dernier = groupes[groupes.length - 1];
    groupes.push({
      id: "autres",
      titre: groupes.length ? "Autres réalisations" : "Nos réalisations",
      // On alterne avec la section précédente, comme dans le PDF.
      sens: dernier?.sens === "gauche-droite" ? "droite-gauche" : "gauche-droite",
      projets: sansSection,
    });
  }

  return groupes.map((g) => (
    <section className="rea-section" key={g.id} aria-labelledby={`rea-${g.id}`}>
      <h2 className="rea-bandeau" id={`rea-${g.id}`}>{g.titre}</h2>
      <Rangee section={g} />
    </section>
  ));
}
