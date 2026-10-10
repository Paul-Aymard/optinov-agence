/**
 * Méthode V.I.S.I.O.N. et architecture d'accueil orientée croissance.
 * Refonte demandée par la direction OPTINOV (juillet 2026) : la page d'accueil
 * ne présente plus une liste de prestations mais un parcours de croissance,
 * dont la méthode propriétaire V.I.S.I.O.N. est le fil conducteur.
 */
import { TODO } from "./site";

/** §2 — Les défis que rencontrent de nombreuses entreprises (grille de 6 cartes) */
export const defis = [
  { icone: "◎", titre: "Une visibilité insuffisante", texte: "Vos futurs clients ne vous trouvent pas, ou ne mesurent pas ce que vous valez." },
  { icone: "◆", titre: "Une image qui manque d'impact", texte: "Votre image ne reflète pas votre professionnalisme ni vos ambitions." },
  { icone: "▚", titre: "Une communication dispersée", texte: "Vos supports, vos messages et vos canaux ne parlent pas d'une même voix." },
  { icone: "⬡", titre: "Des outils peu connectés", texte: "Vos équipes jonglent entre des outils qui ne se parlent pas, et l'activité ralentit." },
  { icone: "◇", titre: "Des opportunités inexploitées", texte: "Sans stratégie ni suivi, des opportunités vous échappent sans que vous le sachiez." },
  { icone: "▲", titre: "Une croissance difficile à accélérer", texte: "Malgré vos efforts, passer un nouveau cap reste difficile." },
];

/** §4 — Les 6 étapes de la méthode V.I.S.I.O.N. */
export const etapesVision = [
  {
    lettre: "V",
    titre: "Voir",
    accroche: "Comprendre avant d'agir.",
    texte: "Nous analysons votre entreprise, votre marché, vos objectifs et vos défis afin d'identifier les meilleures opportunités de développement.",
    resultat: "Une vision claire de votre situation.",
  },
  {
    lettre: "I",
    titre: "Imaginer",
    accroche: "Concevoir une stratégie adaptée.",
    texte: "Nous définissons les orientations les plus pertinentes pour répondre à vos enjeux et atteindre vos objectifs.",
    resultat: "Une feuille de route cohérente et réaliste.",
  },
  {
    lettre: "S",
    titre: "Structurer",
    accroche: "Construire les bonnes fondations.",
    texte: "Nous organisons les outils, les supports et les solutions qui permettront de mettre votre stratégie en œuvre.",
    resultat: "Un écosystème solide et cohérent.",
  },
  {
    lettre: "I",
    titre: "Implémenter",
    accroche: "Passer à l'action.",
    texte: "Nous réalisons les solutions prévues avec rigueur, créativité et exigence de qualité.",
    resultat: "Des projets livrés avec professionnalisme et orientés vers la performance.",
  },
  {
    lettre: "O",
    titre: "Optimiser",
    accroche: "Améliorer en continu.",
    texte: "Nous analysons les résultats, mesurons les performances et ajustons les actions pour obtenir un impact durable.",
    resultat: "Une amélioration continue de vos performances.",
  },
  {
    lettre: "N",
    titre: "Nourrir votre croissance",
    accroche: "Vous accompagner dans la durée.",
    texte: "Nous continuons à faire évoluer vos outils, vos stratégies et vos solutions afin que votre entreprise reste performante face aux nouveaux défis.",
    resultat: "Une relation durable fondée sur la confiance et la croissance.",
  },
];

/** §5 — Les 4 piliers : ce que la méthode permet d'accomplir (résultats, pas services) */
export const piliers = [
  {
    id: "visibilite",
    icone: "🚀",
    titre: "Développez votre visibilité",
    accroche: "Soyez trouvé, puis choisi.",
    texte: "Une entreprise performante est une entreprise visible. Nous renforçons votre présence sur les canaux les plus pertinents pour attirer de nouvelles opportunités.",
    moyens: ["Sites internet", "Référencement naturel (SEO)", "Google Business Profile", "Réseaux sociaux", "Campagnes digitales", "Landing pages", "PROS.CARDS"],
    resultat: "Une présence digitale plus forte et davantage d'opportunités.",
  },
  {
    id: "image",
    icone: "🎯",
    titre: "Renforcez votre image de marque",
    accroche: "Inspirez confiance dès le premier regard.",
    texte: "Votre image est souvent votre premier contact avec un client. Nous concevons une identité professionnelle cohérente qui reflète vos valeurs et vos ambitions.",
    moyens: ["Identité visuelle", "Logo", "Charte graphique", "Supports commerciaux", "Brochures", "Signalétique"],
    resultat: "Une marque plus crédible, plus mémorable et plus attractive.",
  },
  {
    id: "valorisation",
    icone: "📸",
    titre: "Valorisez votre entreprise",
    accroche: "Montrez ce que vous faites, en images.",
    texte: "Les images racontent votre histoire avant même que vous ne preniez la parole. Nous produisons des contenus qui mettent en valeur votre entreprise, vos équipes et vos réalisations.",
    moyens: ["Photographie professionnelle", "Production vidéo", "Interviews", "Reportages", "Prises de vue par drone", "Motion design"],
    resultat: "Une communication plus engageante et une image renforcée.",
  },
  {
    id: "digitalisation",
    icone: "⚙️",
    titre: "Travaillez plus intelligemment",
    accroche: "Faites du digital et de l'IA vos alliés au quotidien.",
    texte: "La croissance passe aussi par une meilleure organisation. Nous vous accompagnons dans la digitalisation de vos activités pour gagner du temps et simplifier vos processus.",
    moyens: ["Solutions d'automatisation", "CRM", "Applications web et mobiles", "Tableaux de bord", "Solutions basées sur l'IA"],
    resultat: "Des équipes plus efficaces et une entreprise prête à évoluer.",
  },
];

/**
 * « Ce que je changerais encore » : le sélecteur d'objectif de croissance.
 * Le dirigeant choisit son objectif ; chaque objectif ancre vers le pilier
 * correspondant, puis vers la méthode. Chaque objectif renvoie à un pilier (§5).
 */
export const objectifs = [
  { emoji: "🚀", label: "Être plus visible", ancre: "#pilier-visibilite" },
  { emoji: "🎯", label: "Renforcer mon image", ancre: "#pilier-image" },
  { emoji: "📸", label: "Valoriser mon entreprise", ancre: "#pilier-valorisation" },
  { emoji: "⚙️", label: "Gagner en efficacité", ancre: "#pilier-digitalisation" },
];

/** §6 — Nos solutions, chacune reliée à une ou plusieurs étapes de V.I.S.I.O.N. */
export const solutionsAccueil = [
  {
    titre: "Communication digitale",
    href: "/services/communication-digitale",
    accroche: "Développez votre visibilité et générez de nouvelles opportunités.",
    etapes: ["I", "S", "O"],
    items: ["Sites internet", "Landing pages", "SEO", "Google Business Profile", "Community management", "Publicité digitale", "Email marketing", "PROS.CARDS"],
  },
  {
    titre: "Communication visuelle",
    href: "/services/communication-visuelle",
    accroche: "Donnez à votre entreprise une identité forte et cohérente.",
    etapes: ["I", "S"],
    items: ["Logo", "Charte graphique", "Cartes de visite", "Flyers", "Plaquettes", "Catalogues", "Affiches", "Signalétique"],
  },
  {
    titre: "Photo & Vidéo Corporate",
    href: "/services/photo-video",
    accroche: "Mettez en valeur votre entreprise grâce à des contenus qui captent l'attention.",
    etapes: ["S", "N"],
    items: ["Photographie", "Production vidéo", "Films institutionnels", "Interviews", "Reportages", "Drone", "Motion design"],
  },
  {
    titre: "Performance & automatisation",
    href: "/services/automatisation-ia",
    accroche: "Faites du digital un véritable levier de performance.",
    etapes: ["O", "N"],
    items: ["Automatisation de tâches", "Intelligence artificielle", "CRM", "Applications web", "Applications mobiles", "Tableaux de bord"],
  },
  {
    titre: "PROS.CARDS",
    href: "/solutions/pros-cards",
    accroche: "Bien plus qu'une carte de visite digitale : partagez votre identité professionnelle, moderne et toujours à jour.",
    etapes: ["V", "I", "S", "O", "N"],
    items: ["Carte digitale interactive", "Partage NFC / QR", "Statistiques", "Espace entreprise"],
    produit: true,
  },
];

/** §8 — Pourquoi choisir OPTINOV */
export const pourquoiOptinov = [
  { titre: "Une méthode éprouvée", texte: "Chaque projet suit le même chemin, du diagnostic au suivi." },
  { titre: "Une vision stratégique", texte: "Nous commençons par comprendre votre entreprise avant de proposer la moindre solution." },
  { titre: "Un accompagnement global", texte: "Communication, marketing, contenus, digital et IA réunis chez un seul partenaire." },
  { titre: "Des solutions intégrées", texte: "Nos expertises se complètent : tout fonctionne ensemble et évolue avec vous." },
  { titre: "Une relation durable", texte: "Nous travaillons avec vous dans la durée, en confiance." },
];

/** §10 — FAQ orientée méthode (affichée sur l'accueil) */
export const faqAccueil = [
  { q: "Comment démarre une collaboration avec OPTINOV ?", r: "Par un premier échange. Nous prenons le temps de comprendre votre entreprise, vos objectifs et vos difficultés avant de proposer quoi que ce soit." },
  { q: "Combien de temps avant de démarrer ?", r: "Cela dépend de votre projet, mais cette première phase reste courte : quelques échanges et une analyse ciblée suffisent pour vous présenter une feuille de route claire." },
  { q: "Que comprend la méthode V.I.S.I.O.N. ?", r: "Six étapes : Voir, Imaginer, Structurer, Implémenter, Optimiser, Nourrir votre croissance. Elle garantit une démarche claire, cohérente et évolutive pour chacun de nos projets." },
  { q: "Faites-vous seulement de la communication ?", r: "Non. Nous intervenons aussi en marketing, création de contenus, digital, automatisation et intelligence artificielle." },
  { q: "Que se passe-t-il après la livraison ?", r: "Nous mesurons les résultats réels et ajustons ce qui doit l'être. Un projet livré est un point de départ, pas une fin." },
  { q: "Travaillez-vous uniquement en Côte d'Ivoire ?", r: "Non. Nous sommes basés à Abidjan et accompagnons aussi des entreprises dans toute l'Afrique de l'Ouest et au-delà." },
  { q: "Comment obtenir un devis ?", r: "Contactez-nous par le formulaire, WhatsApp ou téléphone. Après un premier échange, vous recevez une proposition adaptée à votre besoin." },
];
