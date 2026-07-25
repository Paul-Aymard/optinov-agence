import { TODO } from "./site";

/** Catégories éditoriales — CDC §6.7 */
export const categories = [
  { id: "branding", label: "Communication & branding", service: "communication-visuelle" },
  { id: "marketing-digital", label: "Marketing digital", service: "communication-digitale" },
  { id: "ia", label: "Intelligence artificielle & automatisation", service: "automatisation-ia" },
  { id: "carte-digitale", label: "Carte de visite digitale & networking", service: null },
  { id: "agence", label: "Coulisses & actualités", service: null },
];

/**
 * Articles — §6.7 et §11.4 (2 à 4 articles/mois les 6 premiers mois).
 * Les titres ci-dessous couvrent les trois territoires sémantiques du §11.2.
 * Le corps des articles reste à rédiger en phase 2 « Contenus » (§16).
 */
export const articles = [
  {
    slug: "creer-identite-de-marque-pme",
    titre: "Comment créer une identité de marque qui tient dix ans",
    categorie: "branding",
    extrait:
      "Un logo n'est pas une identité. Ce que recouvre réellement une plateforme de marque, et pourquoi la sauter coûte plus cher que de la faire.",
    tempsLecture: 8,
    date: TODO,
    auteur: "L'équipe OPTINOV",
    aLaUne: true,
    // SEO-007 : lien contextuel descendant vers la page service
    serviceLie: "communication-visuelle",
    corps: TODO,
  },
  {
    slug: "carte-de-visite-digitale-guide",
    titre: "Carte de visite digitale : le guide complet pour les professionnels",
    categorie: "carte-digitale",
    extrait:
      "NFC, QR code, vCard : ce qui change concrètement par rapport au papier, et comment choisir la bonne solution.",
    tempsLecture: 12,
    date: TODO,
    auteur: "L'équipe OPTINOV",
    aLaUne: false,
    serviceLie: null,
    landingLiee: "/solutions/pros-cards",
    corps: TODO,
  },
  {
    slug: "automatisation-ia-entreprise",
    titre: "Automatisation IA en entreprise : par où commencer sans se tromper",
    categorie: "ia",
    extrait:
      "Cartographier avant d'automatiser. Trois cas d'usage à gain rapide, et ceux qu'il vaut mieux laisser aux humains.",
    tempsLecture: 10,
    date: TODO,
    auteur: "L'équipe OPTINOV",
    aLaUne: false,
    serviceLie: "automatisation-ia",
    corps: TODO,
  },
  {
    slug: "strategie-communication-pme",
    titre: "Stratégie de communication pour PME : le plan en une page",
    categorie: "marketing-digital",
    extrait:
      "Un plan de communication ne fait pas trente pages. Voici la trame que nous utilisons avec nos clients dirigeants.",
    tempsLecture: 7,
    date: TODO,
    auteur: "L'équipe OPTINOV",
    aLaUne: false,
    serviceLie: "marketing-strategie",
    corps: TODO,
  },
  {
    slug: "community-management-abidjan",
    titre: "Community management à Abidjan : ce qui fonctionne vraiment",
    categorie: "marketing-digital",
    extrait:
      "Les spécificités du marché ivoirien : usages mobiles, WhatsApp, formats courts. Retour d'expérience terrain.",
    tempsLecture: 6,
    date: TODO,
    auteur: "L'équipe OPTINOV",
    aLaUne: false,
    serviceLie: "communication-digitale",
    corps: TODO,
  },
  {
    slug: "carte-nfc-vs-papier",
    titre: "Carte NFC ou carte papier : le vrai calcul sur trois ans",
    categorie: "carte-digitale",
    extrait:
      "Réimpressions, mouvements d'effectif, contacts perdus. Le coût réel de la carte papier pour une équipe commerciale.",
    tempsLecture: 5,
    date: TODO,
    auteur: "L'équipe OPTINOV",
    aLaUne: false,
    serviceLie: null,
    landingLiee: "/solutions/pros-cards",
    corps: TODO,
  },
];

export const getArticle = (slug) => articles.find((a) => a.slug === slug);
export const getCategorie = (id) => categories.find((c) => c.id === id);

/** §5.3 : chaque page service renvoie vers 2 articles liés */
export const articlesParService = (serviceSlug) =>
  articles.filter((a) => a.serviceLie === serviceSlug).slice(0, 2);
