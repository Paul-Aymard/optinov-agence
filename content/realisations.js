import { TODO } from "./site";

/**
 * Portfolio — CDC §6.6 (gabarit G6).
 * Les projets réels sont [À compléter] : ils seront saisis au back-office
 * (champs structurés : client, secteur, services, année, visuels, résultats).
 * La structure ci-dessous fixe le modèle de données attendu du CMS.
 */

/** Filtres par type de service — EX-011 */
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

/**
 * Gabarit d'un projet. Les 6 entrées ci-dessous sont des emplacements
 * structurés, non des références inventées : chaque valeur factuelle
 * (nom du client, chiffres, verbatim) reste [À compléter].
 */
const gabaritProjet = (i, services, secteur) => ({
  slug: `projet-${i}`,
  client: TODO,
  titre: TODO,
  annee: TODO,
  // Le type de mission se déduit du service principal : ce n'est pas une donnée
  // factuelle à arrêter, mais une conséquence du champ « services » (§9.2).
  typeMission: filtresServices.find((f) => f.id === services[0])?.label ?? TODO,
  services, // ids de filtresServices
  secteur, // id de filtresSecteurs
  extrait: TODO,
  contexte: TODO,
  objectifs: [TODO, TODO, TODO],
  reponse: TODO,
  resultats: [
    { valeur: TODO, label: TODO },
    { valeur: TODO, label: TODO },
    { valeur: TODO, label: TODO },
  ],
  temoignage: { verbatim: TODO, nom: TODO, fonction: TODO },
  // EX-013 : module avant/après, activé projet par projet au back-office
  avantApres: i % 2 === 1,
  // EX-014 : gabarit éditorial « étude de cas longue »
  etudeDeCas: i <= 2,
});

/**
 * Aucun projet réel n'a encore été fourni. Le portfolio affiche un état vide
 * digne plutôt que six fiches remplies de « [À compléter] ».
 *
 * Pour publier un projet, ajouter ici un objet au format de `gabaritProjet`
 * en remplaçant chaque TODO par la valeur réelle — ou brancher le CMS (§9.2).
 * Exemple : gabaritProjet(1, ["visuel", "photo-video"], "btp")
 */
export const projets = [];

export const getProjet = (slug) => projets.find((p) => p.slug === slug);

/** Réalisations liées à une page service — §5.3 : 2 réalisations par page service */
export const projetsParService = (serviceId) =>
  projets.filter((p) => p.services.includes(serviceId)).slice(0, 2);
