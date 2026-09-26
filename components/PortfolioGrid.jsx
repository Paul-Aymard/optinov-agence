"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { projets, filtresServices, filtresSecteurs } from "@/content/realisations";

/**
 * Grille du portfolio, groupée par service — EX-010, M / EX-011, M
 *
 * Présentation demandée par le client (PDF « MODIF OPTINOV AGENCE ») : un
 * bandeau de catégorie arrondi, puis une rangée de quatre vignettes, et ainsi
 * de suite pour chaque service. Les boutons de filtre par service ont donc
 * disparu : le groupement fait le même travail, en montrant tout d'un coup.
 *
 * Ce qui est conservé :
 * - le filtre par secteur, qui croise une autre dimension que le groupement ;
 * - le paramètre ?service= dans l'URL, pour que les liens venant des pages
 *   service continuent d'ouvrir directement la bonne catégorie ;
 * - le lazy-loading des vignettes.
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

  const duSecteur = projets.filter((p) => secteur === "tous" || p.secteur === secteur);

  // Un groupe par service, dans l'ordre de la charte ; les groupes vides sont
  // retirés pour ne pas afficher un bandeau suivi d'une rangée blanche.
  const groupes = filtresServices
    .filter((f) => service === "tous" || service === f.id)
    .map((f) => ({ ...f, projets: duSecteur.filter((p) => p.services.includes(f.id)) }))
    .filter((g) => g.projets.length > 0);

  const total = groupes.reduce((n, g) => n + g.projets.length, 0);

  return (
    <>
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

      {/* Une catégorie ouverte par un lien entrant : de quoi revenir à la vue complète. */}
      {service !== "tous" && (
        <p style={{ marginBottom: "1.5rem" }}>
          <button type="button" className="link-arrow" onClick={() => setService("tous")}>
            Voir toutes les catégories
          </button>
        </p>
      )}

      <p role="status" className="form-note" style={{ marginBottom: "2.5rem" }}>
        {total} projet{total > 1 ? "s" : ""} affiché{total > 1 ? "s" : ""}.
      </p>

      {total === 0 ? (
        <p className="empty-state">
          Aucun projet ne correspond à ce secteur. Essayez-en un autre.
        </p>
      ) : (
        groupes.map((g) => (
          <section className="ptf-groupe" key={g.id} aria-labelledby={`ptf-${g.id}`}>
            <h2 className="ptf-categorie" id={`ptf-${g.id}`}>{g.label}</h2>
            <div className="grid ptf-grille cartes-anim">
              {g.projets.map((p) => (
                <article className="card card--project" key={`${g.id}-${p.slug}`}>
                  <div className="thumb thumb--zoom">
                    {p.visuel ? (
                      <img
                        src={p.visuel.carte || p.visuel.url}
                        alt={p.visuel.alt || p.titre}
                        loading="lazy"
                      />
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
          </section>
        ))
      )}
    </>
  );
}
