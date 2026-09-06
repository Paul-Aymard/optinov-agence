import genere from "./generated/realisations.json";

/**
 * Portfolio — CDC §6.6 (gabarit G6).
 * Les fiches viennent du tableau de bord (collection « Réalisations ») ; seules
 * les fiches cochées « Publiée » sont synchronisées, dans content/generated/.
 */

/** Filtres par type de service — EX-011 (mêmes identifiants que le tableau de bord) */
export const filtresServices = [
  { id: "visuel", label: "Communication visuelle" },
  { id: "digital", label: "Communication digitale" },
  { id: "marketing", label: "Marketing & stratégie" },
  { id: "ia", label: "Performance & automatisation" },
  { id: "photo-video", label: "Photo & vidéo" },
];

/** Filtres par secteur d'activité — EX-011 */
export const filtresSecteurs = [
  { id: "btp", label: "BTP" },
  { id: "distribution", label: "Distribution" },
  { id: "immobilier", label: "Immobilier" },
  { id: "sante", label: "Santé" },
  { id: "institution", label: "Institution" },
  { id: "services", label: "Services" },
];

const brut = Array.isArray(genere) ? genere : [];

export const projets = brut.map((p) => ({
  slug: p.slug,
  client: p.client,
  titre: p.titre,
  annee: p.annee,
  // Le type de mission se déduit du premier service choisi (§9.2).
  typeMission: filtresServices.find((f) => f.id === p.services?.[0])?.label ?? "",
  services: p.services || [],
  secteur: p.secteur,
  extrait: p.extrait,
  contexte: p.contexte,
  objectifs: p.objectifs || [],
  reponse: p.reponse,
  resultats: p.resultats || [],
  temoignage: p.temoignage || { verbatim: "", nom: "", fonction: "" },
  visuel: p.visuel || null,
  galerie: p.galerie || [],
  // EX-013 : module avant/après, activé fiche par fiche au tableau de bord
  avantApres: Boolean(p.avantApres),
  avant: p.avant || null,
  apres: p.apres || null,
  // EX-014 : gabarit éditorial « étude de cas longue »
  etudeDeCas: Boolean(p.etudeDeCas),
}));

export const getProjet = (slug) => projets.find((p) => p.slug === slug);

/** Réalisations liées à une page service — §5.3 : 2 réalisations par page service */
export const projetsParService = (serviceId) =>
  projets.filter((p) => p.services.includes(serviceId)).slice(0, 2);
