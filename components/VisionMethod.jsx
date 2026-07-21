"use client";

import { useState } from "react";
import { etapesVision } from "@/content/vision";

/**
 * Méthode V.I.S.I.O.N. — frise interactive (desktop) + cartes verticales (mobile).
 * Recommandation UX de la direction : chaque lettre s'anime au survol et affiche
 * sa description ; sur mobile, les six étapes s'empilent en cartes.
 *
 * Deux rendus coexistent, bascule en CSS (pas de calcul de largeur en JS,
 * donc rien à recalculer au redimensionnement) :
 *   .vision__desktop  — frise cliquable + panneau de détail
 *   .vision__mobile   — les 6 cartes empilées
 */
export default function VisionMethod() {
  const [actif, setActif] = useState(0);
  const e = etapesVision[actif];

  return (
    <div className="vision">
      {/* ---------- Frise interactive (desktop / tablette) ---------- */}
      <div className="vision__desktop">
        <ol className="vision__frise" role="tablist" aria-label="Les six étapes de la méthode V.I.S.I.O.N.">
          {etapesVision.map((et, i) => (
            <li key={i}>
              <button
                type="button"
                role="tab"
                aria-selected={actif === i}
                aria-controls="vision-detail"
                className="vision__node"
                data-active={actif === i}
                onClick={() => setActif(i)}
                onMouseEnter={() => setActif(i)}
              >
                <span className="vision__lettre" aria-hidden="true">{et.lettre}</span>
                <span className="vision__nom">{et.titre}</span>
              </button>
            </li>
          ))}
        </ol>

        <div className="vision__detail" id="vision-detail" role="tabpanel">
          <div className="vision__detail-num" aria-hidden="true">{e.lettre}</div>
          <div>
            <h3>{e.titre} — <span>{e.accroche}</span></h3>
            <p>{e.texte}</p>
            <p className="vision__resultat"><strong>Résultat :</strong> {e.resultat}</p>
          </div>
        </div>
      </div>

      {/* ---------- Cartes verticales (mobile) ---------- */}
      <ol className="vision__mobile">
        {etapesVision.map((et, i) => (
          <li key={i} className="vision__carte">
            <div className="vision__carte-tete">
              <span className="vision__lettre" aria-hidden="true">{et.lettre}</span>
              <h3>{et.titre}</h3>
            </div>
            <p className="vision__accroche">{et.accroche}</p>
            <p>{et.texte}</p>
            <p className="vision__resultat"><strong>Résultat :</strong> {et.resultat}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
