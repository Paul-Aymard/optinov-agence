import { TODO } from "./site";

/**
 * Landing PROS.CARDS — CDC §7 (gabarit G5).
 *
 * FRONTIÈRE DE PÉRIMÈTRE (§7.3) : l'inscription, le paiement, l'activation
 * automatique, le tableau de bord et la gestion des cartes relèvent de la
 * PLATEFORME PROS.CARDS et sont hors périmètre de ce site. Aucun tunnel de
 * paiement n'est développé ici (EX-026). La landing ne fait que rediriger,
 * avec l'offre pré-sélectionnée et les paramètres de suivi.
 */

/** Ancres du header allégé — EX-020 */
export const ancres = [
  { label: "Fonctionnalités", href: "#fonctionnalites" },
  { label: "Tarifs", href: "#tarifs" },
  { label: "FAQ", href: "#faq" },
];

/** §7.2 — 2. Problématique */
export const douleursPapier = [
  { titre: "Perdue ou jetée", texte: "Huit cartes papier sur dix finissent à la poubelle. La vôtre comprise." },
  { titre: "Obsolète à la moindre mise à jour", texte: "Un numéro change, un poste évolue : la boîte entière part au recyclage." },
  { titre: "Aucune donnée sur son utilisation", texte: "Vous distribuez sans jamais savoir qui vous a consulté, ni quand." },
];

/** §7.2 — 3. Solution */
export const pointsSolution = [
  { titre: "Votre profil digital complet", texte: "Coordonnées, réseaux, documents, vidéos, paiement, rendez-vous : tout sur une page à votre nom." },
  { titre: "Partagé en un geste", texte: "Une carte NFC que l'on approche, un QR code que l'on scanne. Aucune application à installer." },
  { titre: "Créé et géré par vous", texte: "Un tableau de bord intuitif, une modification prise en compte instantanément. Sans intermédiaire." },
];

/** §7.2 — 4. Fonctionnement (4 étapes) */
export const etapes = [
  { titre: "Choisissez votre offre", texte: "Essentiel, Professionnel ou Entreprise, selon vos besoins." },
  { titre: "Créez votre compte et payez en ligne", texte: "Un formulaire court, un paiement sécurisé sur la plateforme." },
  { titre: "Votre compte est activé instantanément", texte: "Aucune validation manuelle, aucun délai d'attente." },
  { titre: "Créez et personnalisez votre carte", texte: "Depuis votre tableau de bord, modifiable à tout moment avec prise en compte instantanée." },
];

/** §7.2 — 5. Fonctionnalités, filtrables par profil */
export const fonctionnalites = [
  { titre: "Carte digitale personnalisée", icone: "◈", profils: ["independant", "entreprise"] },
  { titre: "Carte NFC physique", icone: "◉", profils: ["independant", "entreprise"] },
  { titre: "QR Code", icone: "▦", profils: ["independant", "entreprise"] },
  { titre: "Partage instantané des coordonnées (vCard)", icone: "⇄", profils: ["independant", "entreprise"] },
  { titre: "Réseaux sociaux", icone: "◎", profils: ["independant", "entreprise"] },
  { titre: "Présentation de l'entreprise", icone: "▲", profils: ["entreprise"] },
  { titre: "Documents PDF, flyers, catalogues et plaquettes", icone: "▤", profils: ["independant", "entreprise"] },
  { titre: "Vidéos de présentation", icone: "▷", profils: ["independant", "entreprise"] },
  { titre: "Liens de paiement", icone: "◇", profils: ["independant"] },
  { titre: "Prise de rendez-vous", icone: "◷", profils: ["independant", "entreprise"] },
  { titre: "Formulaires", icone: "▣", profils: ["independant", "entreprise"] },
  { titre: "Appel et e-mail en 1 clic", icone: "☏", profils: ["independant", "entreprise"] },
  { titre: "Statistiques de consultation", icone: "◱", profils: ["independant", "entreprise"] },
  { titre: "Tableau de bord intuitif", icone: "⬒", profils: ["independant", "entreprise"] },
  { titre: "Création et personnalisation en autonomie", icone: "✎", profils: ["independant", "entreprise"] },
  { titre: "Mises à jour en temps réel", icone: "↻", profils: ["independant", "entreprise"] },
  { titre: "Gestion des collaborateurs", icone: "⬡", profils: ["entreprise"] },
];

/** §7.2 — 6. Tableau comparatif */
export const comparatif = [
  { critere: "Coût récurrent", papier: "Réimpression à chaque changement", pros: "Un abonnement, des mises à jour illimitées" },
  { critere: "Mise à jour", papier: "Impossible : la carte est figée", pros: "Instantanée, depuis votre tableau de bord" },
  { critere: "Écologie", papier: "Papier imprimé, souvent jeté", pros: "Une carte NFC réutilisable, zéro réimpression" },
  { critere: "Image", papier: "Standard, difficile à différencier", pros: "Profil complet : vidéos, documents, réseaux" },
  { critere: "Traçabilité", papier: "Aucune donnée", pros: "Statistiques de consultation détaillées" },
  { critere: "Richesse du contenu", papier: "Nom, fonction, téléphone", pros: "Documents, vidéos, paiement, rendez-vous, formulaires" },
];

/** §7.2 — 7. Avantages */
export const avantages = [
  { titre: "Image moderne", texte: "Un geste qui marque, un profil qui inspire confiance." },
  { titre: "Autonomie totale", texte: "Création immédiate, modifications instantanées, sans intermédiaire." },
  { titre: "Économies récurrentes", texte: "Plus de réimpression à chaque mouvement d'effectif." },
  { titre: "Pilotage par les statistiques", texte: "Qui vous consulte, quand, sur quel contenu." },
];

/** §7.2 — 9. Cas d'utilisation (3 onglets) */
export const casUsage = [
  {
    id: "entreprises",
    label: "Entreprises",
    titre: "Une flotte de cartes, une seule marque",
    texte:
      "Le responsable crée un compte Entreprise, souscrit sa formule et devient administrateur de son espace. Il crée les comptes de ses collaborateurs — chacun personnalise sa propre carte — et peut créer, modifier, suspendre ou supprimer les cartes de son équipe. La cohérence de marque est tenue sans contrôler chaque carte à la main.",
    points: [
      "Espace administrateur dédié",
      "Création des comptes collaborateurs",
      "Suspension immédiate au départ d'un salarié",
      "Cohérence graphique sur toute la flotte",
    ],
  },
  {
    id: "independants",
    label: "Indépendants",
    titre: "L'image d'une grande structure, seul",
    texte:
      "Consultant, avocat, architecte, coach : votre carte rassemble votre présentation, vos réalisations, vos documents et votre agenda. Elle se crée en quelques minutes et se met à jour aussi vite.",
    points: [
      "Image premium immédiate",
      "Tout-en-un : documents, vidéos, rendez-vous",
      "Carte créée en quelques minutes",
      "Aucun intermédiaire, aucun délai",
    ],
  },
  {
    id: "commerciaux",
    label: "Commerciaux",
    titre: "Aucun contact perdu sur le terrain",
    texte:
      "Un geste suffit pour transmettre vos coordonnées, même sans réseau chez votre interlocuteur. Les statistiques de consultation vous disent quels prospects sont revenus sur votre profil.",
    points: [
      "Partage terrain instantané (NFC / QR)",
      "Statistiques de consultation par carte",
      "Formulaire de rappel intégré",
      "Aucun contact perdu",
    ],
  },
];

/**
 * §7.2 — 10. Tarifs. Administrable depuis le back-office (EX-023).
 * Montants [À compléter] : ils doivent être arrêtés par la direction.
 * Le CTA redirige vers le tunnel d'inscription avec l'offre pré-sélectionnée (EX-026).
 */
export const offres = [
  {
    id: "essentiel",
    nom: "Essentiel",
    prix: TODO,
    periode: "/ mois",
    pitch: "Pour démarrer avec une carte digitale complète.",
    inclus: [
      "Carte digitale personnalisée",
      "QR Code",
      "Partage vCard",
      "Réseaux sociaux",
      "Appel et e-mail en 1 clic",
    ],
    exclus: ["Carte NFC physique", "Statistiques détaillées", "Gestion des collaborateurs"],
    nfc: "Carte NFC physique en option",
    cta: "Commencer maintenant",
    misEnAvant: false,
  },
  {
    id: "professionnel",
    nom: "Professionnel",
    prix: TODO,
    periode: "/ mois",
    pitch: "Pour les indépendants et commerciaux qui prospectent au quotidien.",
    inclus: [
      "Tout l'Essentiel",
      "Carte NFC physique incluse",
      "Documents, catalogues et vidéos",
      "Liens de paiement",
      "Prise de rendez-vous et formulaires",
      "Statistiques de consultation",
    ],
    exclus: ["Gestion des collaborateurs"],
    nfc: "Carte NFC incluse",
    cta: "Commencer maintenant",
    misEnAvant: true,
    badge: "Recommandé",
  },
  {
    id: "entreprise",
    nom: "Entreprise",
    prix: TODO,
    periode: "/ utilisateur / mois",
    pitch: "Pour équiper une équipe de 5 à 100 commerciaux.",
    inclus: [
      "Tout le Professionnel",
      "Espace administrateur entreprise",
      "Création des comptes collaborateurs",
      "Création, modification, suspension et suppression des cartes",
      "Cohérence de marque sur la flotte",
      "Tarification par volume",
      "Conseiller dédié",
    ],
    exclus: [],
    nfc: "Cartes NFC pour toute l'équipe",
    cta: "Demander un devis flotte",
    misEnAvant: false,
    devis: true, // renvoie vers le formulaire de devis flotte, pas vers le tunnel
  },
];

/** §7.2 — 12. FAQ (8 à 12 questions), balisée Schema.org FAQPage */
export const faqProsCards = [
  { q: "Faut-il installer une application ?", r: "Non, ni pour vous ni pour votre interlocuteur. La carte s'ouvre dans le navigateur, sur tous les smartphones." },
  { q: "Tous les téléphones lisent-ils le NFC ?", r: "La quasi-totalité des smartphones récents, iPhone comme Android. Pour les rares appareils sans NFC, le QR code imprimé au dos de la carte prend le relais." },
  { q: "Combien de temps pour créer ma carte ?", r: "Quelques minutes. Le compte est activé automatiquement à la validation du paiement : vous accédez immédiatement à votre tableau de bord." },
  { q: "Puis-je modifier mes informations après coup ?", r: "Autant de fois que vous le souhaitez. Les modifications sont prises en compte instantanément, sans réimpression ni intervention d'OPTINOV." },
  { q: "Qui crée la carte : vous ou OPTINOV ?", r: "Vous. PROS.CARDS est une plateforme en libre-service : OPTINOV Agence développe, exploite et supporte la plateforme, mais n'intervient pas dans la création de votre carte." },
  { q: "Quelles statistiques sont disponibles ?", r: "Le nombre de consultations de votre carte, leur évolution dans le temps, et les contenus les plus consultés. Les statistiques détaillées sont incluses à partir de l'offre Professionnelle." },
  { q: "Comment fonctionne l'offre Entreprise ?", r: "Le responsable crée un compte Entreprise et devient administrateur de son espace. Il crée les comptes de ses collaborateurs, qui personnalisent chacun leur carte, et peut créer, modifier, suspendre ou supprimer les cartes de son équipe." },
  { q: "Que se passe-t-il quand un collaborateur quitte l'entreprise ?", r: "L'administrateur suspend ou supprime sa carte depuis son espace. Le lien cesse immédiatement de fonctionner — contrairement aux cartes papier déjà distribuées." },
  { q: "Quels moyens de paiement acceptez-vous ?", r: "Les moyens de paiement disponibles sont ceux proposés par le tunnel d'inscription de la plateforme." },
  { q: "Puis-je résilier mon abonnement ?", r: "Les conditions de résiliation figurent aux conditions générales de la plateforme PROS.CARDS." },
  { q: "La carte NFC est-elle livrée ?", r: "Oui, à l'adresse indiquée à la souscription, après validation du paiement." },
  { q: "Mes données sont-elles protégées ?", r: "La plateforme est développée, exploitée et supportée par OPTINOV Agence à Abidjan, dans le respect de la loi ivoirienne n° 2013-450 et du RGPD pour les visiteurs de l'Union européenne." },
];

/**
 * Témoignages clients PROS.CARDS — §7.2 section 11 (3 à 6 attendus).
 * Vide tant qu'aucun témoignage réel n'a été recueilli : la section se masque.
 * Format : { verbatim, nom, fonction, entreprise }
 */
export const temoignagesProsCards = [];

/** Un tarif non arrêté s'affiche ainsi plutôt qu'en « [À compléter] » */
export const prixIndicatif = (prix) => (prix === TODO ? "Tarif à venir" : prix);
