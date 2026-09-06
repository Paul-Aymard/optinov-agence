"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { projets, filtresServices, filtresSecteurs } from "@/content/realisations";

/**
 * Grille filtrable du portfolio — EX-010, M / EX-011, M
 * - Filtres combinables service × secteur, sans rechargement de page.
 * - État des filtres conservé dans l'URL (partage possible) — §6.6 UX.
 * - Lazy-loading des vignettes (loading="lazy" sur les <img> réelles).
 */
/** Ne monter ce composant que si `projets` n'est pas vide (cf. app/(site)/realisations). */
export default function PortfolioGrid() {
  const router = useRouter();
  const params = useSearchParams();

  const [service, setService] = useState(params.get("service") ?? "tous");
  const [secteur, setSecteur] = useState(params.get("secteur") ?? "tous");

  // Synchronise l'URL sans recharger la page
  useEffect(() => {
    const q = new URLSearchParams();
    if (service !== "tous") q.set("service", service);
    if (secteur !== "tous") q.set("secteur", secteur);
    const qs = q.toString();
    router.replace(qs ? `/realisations?${qs}` : "/realisations", { scroll: false });
  }, [service, secteur, router]);

  const visibles = projets.filter(
    (p) =>
      (service === "tous" || p.services.includes(service)) &&
      (secteur === "tous" || p.secteur === secteur)
  );

  return (
    <>
      <div className="filters" role="group" aria-label="Filtrer par type de service">
        <button type="button" aria-pressed={service === "tous"} onClick={() => setService("tous")}>
          Tous les services
        </button>
        {filtresServices.map((f) => (
          <button key={f.id} type="button" aria-pressed={service === f.id} onClick={() => setService(f.id)}>
            {f.label}
          </button>
        ))}
      </div>

      <div className="filters" role="group" aria-label="Filtrer par secteur d'activité">
        <button type="button" aria-pressed={secteur === "tous"} onClick={() => setSecteur("tous")}>
          Tous les secteurs
        </button>
        {filtresSecteurs.map((f) => (
          <button key={f.id} type="button" aria-pressed={secteur === f.id} onClick={() => setSecteur(f.id)}>
            {f.label}
          </button>
        ))}
      </div>

      <p role="status" className="form-note" style={{ marginBottom: "1.5rem" }}>
        {visibles.length} projet{visibles.length > 1 ? "s" : ""} affiché{visibles.length > 1 ? "s" : ""}.
      </p>

      {visibles.length === 0 ? (
        <p className="empty-state">
          Aucun projet ne correspond à ces filtres. Essayez une autre combinaison.
        </p>
      ) : (
        <div className="grid grid-3">
          {visibles.map((p) => (
            <article className="card card--project" key={p.slug}>
              <div className="thumb" style={p.visuel ? { overflow: "hidden" } : undefined}>
                {p.visuel ? (
                  <img src={p.visuel.carte || p.visuel.url} alt={p.visuel.alt || p.titre} loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                ) : (
                  p.client
                )}
              </div>
              <div className="card__body">
                <span className="tag">{p.typeMission}</span>
                <h3>{p.client}</h3>
                <p>{p.extrait}</p>
                <p className="meta">
                  <span>{p.annee}</span>
                  <span>{filtresSecteurs.find((s) => s.id === p.secteur)?.label}</span>
                </p>
                <Link className="link-arrow" href={`/realisations/${p.slug}`}>
                  Voir le projet<span className="sr-only"> {p.client}</span>
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}
    </>
  );
}
