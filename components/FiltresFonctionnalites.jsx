"use client";

import { useState } from "react";
import { fonctionnalites } from "@/content/prosCards";

/** §7.2 section 5 : filtrage visuel par profil (Indépendant / Entreprise) */
export default function FiltresFonctionnalites() {
  const [profil, setProfil] = useState("tous");

  const filtres = [
    { id: "tous", label: "Toutes les fonctionnalités" },
    { id: "independant", label: "Indépendant" },
    { id: "entreprise", label: "Entreprise" },
  ];

  const visibles = fonctionnalites.filter(
    (f) => profil === "tous" || f.profils.includes(profil)
  );

  return (
    <>
      <div className="filters" role="group" aria-label="Filtrer les fonctionnalités par profil">
        {filtres.map((f) => (
          <button
            key={f.id}
            type="button"
            aria-pressed={profil === f.id}
            onClick={() => setProfil(f.id)}
          >
            {f.label}
          </button>
        ))}
      </div>

      <p className="sr-only" role="status">
        {visibles.length} fonctionnalités affichées.
      </p>

      <div className="grid grid-4">
        {visibles.map((f) => (
          <div className="card" key={f.titre}>
            <div className="card__icon" aria-hidden="true">{f.icone}</div>
            <h3 style={{ fontSize: "1rem", marginBottom: 0 }}>{f.titre}</h3>
          </div>
        ))}
      </div>
    </>
  );
}
