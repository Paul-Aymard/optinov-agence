/**
 * Données transverses du site.
 * CDC v1.1 — les valeurs « [À compléter] » sont laissées telles quelles,
 * conformément à la convention de lecture (§1.3) : elles doivent être
 * arrêtées par la direction OPTINOV, pas inventées par le prestataire.
 */

export const TODO = "[À compléter]";

export const site = {
  nom: "OPTINOV Agence",
  baseline: "Communication · Marketing · Transformation digitale",
  url: "https://optinov-agence.com",
  ville: "Abidjan",
  pays: "Côte d'Ivoire",
  adresse: TODO,
  telephone: TODO,
  email: TODO,
  // EX-033 : lien wa.me pré-rempli, message contextuel injecté par page
  whatsapp: TODO, // format international sans "+", ex. 2250700000000
  horaires: TODO,
  // §6.9 : « délai de réponse annoncé ([À compléter], proposition : sous 24 h ouvrées) ».
  // La proposition du CDC est reprise telle quelle, à valider au kick-off.
  delaiReponse: "sous 24 h ouvrées",
  rccm: TODO,
  directeurPublication: TODO,
  hebergeur: TODO,
  // EX-035 : outil de prise de rendez-vous à arbitrer (Cal.com auto-hébergé ou Calendly)
  rdvUrl: TODO,
  // EX-026 / EX-052 : tunnel d'inscription et espace client de la plateforme PROS.CARDS
  prosCards: {
    connexion: TODO,
    inscription: TODO,
    demo: TODO,
  },
  socials: [
    { label: "LinkedIn", court: "in", href: TODO },
    { label: "Instagram", court: "ig", href: TODO },
    { label: "Facebook", court: "fb", href: TODO },
  ],
};

/* ------------------------------------------------------------------ *
 * Liens sûrs.
 *
 * Une valeur [À compléter] ne doit JAMAIS finir dans un attribut href :
 * le navigateur la traiterait comme une URL relative et le lien mènerait
 * à un 404 (REC-01 : « 0 erreur 404 interne »).
 *
 * Tant qu'une coordonnée n'est pas renseignée, le lien retombe sur la page
 * Contact — la page reste utilisable, et le texte affiché continue de
 * signaler « [À compléter] » à l'éditeur.
 * ------------------------------------------------------------------ */

const REPLI = "/contact";

/** true si la valeur a été arrêtée par la direction */
export const estRenseigne = (v) => Boolean(v) && v !== TODO;

export const lienRdv = () => (estRenseigne(site.rdvUrl) ? site.rdvUrl : REPLI);

export const lienTel = () =>
  estRenseigne(site.telephone) ? `tel:${site.telephone.replace(/[^\d+]/g, "")}` : REPLI;

export const lienEmail = () => (estRenseigne(site.email) ? `mailto:${site.email}` : REPLI);

/** EX-033 : wa.me pré-rempli, message contextuel selon la page d'origine */
export const lienWhatsApp = (contexte) => {
  if (!estRenseigne(site.whatsapp)) return REPLI;
  const message = contexte
    ? `Bonjour OPTINOV, je vous contacte au sujet de : ${contexte}.`
    : "Bonjour OPTINOV, je souhaite échanger sur mon projet.";
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
};

/** EX-052 : points d'entrée vers la plateforme PROS.CARDS (connexion, inscription, démo) */
export const lienPlateforme = (cle) =>
  estRenseigne(site.prosCards[cle]) ? site.prosCards[cle] : REPLI;

/** Réseaux sociaux effectivement renseignés — on n'affiche pas de lien mort */
export const socialsRenseignes = () => site.socials.filter((s) => estRenseigne(s.href));

/**
 * Chiffres clés — bandeau de confiance (§6.1, section 2).
 * Vide tant que la direction n'a pas arrêté les valeurs : les sections qui les
 * consomment se masquent d'elles-mêmes plutôt que d'afficher « [À compléter] ».
 * Format attendu : { num: "120", label: "Projets livrés" }
 */
export const chiffresCles = [];

/** Logos clients du carrousel — <Image> réels à fournir. Format : { nom, src } */
export const logosClients = [];

/** Témoignages clients — §6.1 section 7. Format : { verbatim, nom, fonction, entreprise } */
export const temoignages = [];

/** Membres de l'équipe — §6.2. Format : { nom, role, photo, linkedin } */
export const equipe = [];

/** Navigation principale — EX-001 */
export const nav = [
  { label: "Accueil", href: "/" },
  { label: "À propos", href: "/agence" },
  {
    label: "Services",
    href: "/services",
    sub: [
      { label: "Communication visuelle", href: "/services/communication-visuelle" },
      { label: "Communication digitale", href: "/services/communication-digitale" },
      { label: "Marketing & stratégie", href: "/services/marketing-strategie" },
      { label: "Automatisation IA", href: "/services/automatisation-ia" },
      { label: "Photo & vidéo", href: "/services/photo-video" },
    ],
  },
  {
    label: "Solutions",
    href: "/solutions",
    sub: [{ label: "PROS.CARDS", href: "/solutions/pros-cards" }],
  },
  { label: "Réalisations", href: "/realisations" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

/** Méthode — §6.1 section 5 */
export const methode = [
  { titre: "Écouter", texte: "Nous partons de vos objectifs commerciaux, pas de nos habitudes créatives." },
  { titre: "Concevoir", texte: "Stratégie, message et création sont pensés ensemble, jamais séparément." },
  { titre: "Déployer", texte: "Production, diffusion et mise en ligne dans les délais annoncés." },
  { titre: "Mesurer", texte: "Chaque action est suivie par des indicateurs partagés avec vous." },
];

/** Valeurs — §6.2 */
export const valeurs = [
  { titre: "Exigence", texte: "Un livrable sort quand il est juste, pas quand il est fini." },
  { titre: "Transparence", texte: "Un devis lisible, un calendrier tenu, des résultats montrés tels quels." },
  { titre: "Proximité", texte: "Un interlocuteur unique, joignable, qui connaît votre dossier." },
  { titre: "Curiosité", texte: "L'IA et l'automatisation entrent dans nos process avant d'entrer dans nos offres." },
];
