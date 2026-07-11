import { TODO } from "./site";

/**
 * Univers Services — CDC §2.3.1 et §6.4 (gabarit commun G4).
 * Chaque service suit la structure imposée : hero, problématique (3 douleurs),
 * notre réponse (+ livrables), bénéfices, processus, réalisations liées, FAQ, CTA.
 */
export const services = [
  {
    slug: "communication-visuelle",
    titre: "Communication visuelle",
    icone: "◆",
    accroche: "Une identité que l'on reconnaît avant même de lire votre nom.",
    h1: "Communication visuelle : une marque que l'on reconnaît",
    sousTitre:
      "Identité de marque, logo, charte graphique et supports print conçus pour durer et pour vendre.",
    description:
      "Identité de marque, logos, chartes graphiques, supports print et design éditorial.",
    livrablesTypes: ["Logo & charte graphique", "Supports print", "Design éditorial"],
    douleurs: [
      {
        titre: "Votre marque ne vous ressemble plus",
        texte:
          "L'entreprise a grandi, le logo est resté. Vos supports racontent celle que vous étiez il y a cinq ans.",
      },
      {
        titre: "Chaque support part dans sa direction",
        texte:
          "Deux bleus différents, trois polices, un logo étiré. Sans charte, chaque prestataire réinvente votre image.",
      },
      {
        titre: "Vos concurrents paraissent plus solides",
        texte:
          "À offre égale, celui dont les supports inspirent confiance emporte le rendez-vous. L'image n'est pas un décor.",
      },
    ],
    reponse: {
      texte:
        "Nous partons de votre positionnement, pas d'une planche d'inspiration. L'atelier de cadrage fixe ce que la marque doit dire, à qui, et ce qu'elle ne dira jamais. La création vient après — et se juge à cette aune. Vous repartez avec un système complet : des règles écrites, des fichiers sources, et des gabarits que vos équipes utilisent sans nous.",
      livrables: [
        "Plateforme de marque et territoire visuel",
        "Logo principal, variantes et déclinaisons (fond clair, fond sombre, monochrome, favicon)",
        "Charte graphique complète : couleurs, typographies, iconographie, règles d'usage",
        "Papeterie : carte de visite, papier en-tête, signature e-mail",
        "Supports print : flyers, plaquettes, roll-up, PLV",
        "Fichiers sources ouverts et gabarits réutilisables",
      ],
    },
    benefices: [
      { titre: "Une image cohérente partout", preuve: "Un seul système de règles, appliqué du flyer au post Instagram." },
      { titre: "Des équipes autonomes", preuve: "Gabarits livrés : vos supports courants se produisent sans l'agence." },
      { titre: "Une marque qui vieillit bien", preuve: "Aucune tendance graphique éphémère : le système tient plusieurs années." },
      { titre: "Un actif transmissible", preuve: "Fichiers sources et droits cédés — votre identité vous appartient." },
    ],
    processus: [
      { titre: "Brief & audit", texte: "Atelier de cadrage, analyse de l'existant et du paysage concurrentiel.", delai: TODO },
      { titre: "Conception", texte: "Territoires visuels explorés, puis une direction retenue et travaillée.", delai: TODO },
      { titre: "Validation", texte: "Deux allers-retours d'ajustement sur la direction choisie.", delai: TODO },
      { titre: "Production", texte: "Déclinaison sur l'ensemble des supports et rédaction de la charte.", delai: TODO },
      { titre: "Livraison & suivi", texte: "Remise des sources, passation aux équipes, accompagnement au déploiement.", delai: TODO },
    ],
    faq: [
      { q: "Combien de propositions de logo présentez-vous ?", r: "Trois territoires visuels distincts au premier jalon, puis une seule direction approfondie. Multiplier les pistes dilue la réflexion plus qu'il ne rassure." },
      { q: "Cédez-vous les fichiers sources ?", r: "Oui, systématiquement, ainsi que les droits d'exploitation. Vous n'êtes jamais captif de l'agence pour modifier vos propres supports." },
      { q: "Gérez-vous l'impression ?", r: "Nous préparons les fichiers aux normes de vos imprimeurs et pouvons piloter la production et le contrôle qualité si vous le souhaitez." },
      { q: "Quel est le délai moyen pour une identité complète ?", r: "Le calendrier est arrêté au brief, selon le périmètre et la réactivité des validations." },
    ],
    secteurs: ["visuel"],
  },
  {
    slug: "communication-digitale",
    titre: "Communication digitale",
    icone: "◈",
    accroche: "Des réseaux sociaux qui construisent une audience, pas qui la louent.",
    h1: "Communication digitale : une présence qui travaille pour vous",
    sousTitre:
      "Réseaux sociaux, création de contenus, community management et campagnes sponsorisées pilotées par les résultats.",
    description:
      "Gestion des réseaux sociaux, création de contenus, community management, campagnes sponsorisées.",
    livrablesTypes: ["Stratégie éditoriale", "Community management", "Campagnes sponsorisées"],
    douleurs: [
      { titre: "Vous publiez sans savoir pourquoi", texte: "Un post par semaine parce qu'il en faut un. Aucune ligne, aucun objectif, aucune mesure." },
      { titre: "Votre audience ne se transforme jamais en clients", texte: "Beaucoup de vues, peu de messages. Le contenu plaît mais ne déclenche rien." },
      { titre: "La publicité coûte sans rapporter", texte: "Des budgets engagés sans ciblage réfléchi, sans test, sans lecture des résultats." },
    ],
    reponse: {
      texte:
        "Nous construisons une ligne éditoriale rattachée à vos objectifs commerciaux, puis nous la tenons. Chaque format a une intention : faire connaître, faire préférer, faire agir. Les campagnes sponsorisées ne viennent qu'ensuite, pour amplifier ce qui fonctionne déjà en organique — jamais pour compenser ce qui ne fonctionne pas.",
      livrables: [
        "Audit des comptes et de la concurrence",
        "Stratégie éditoriale : piliers de contenu, ton, formats, fréquence",
        "Calendrier éditorial mensuel validé à l'avance",
        "Production des contenus : visuels, vidéos courtes, copywriting",
        "Community management : publication, modération, réponse aux messages",
        "Campagnes sponsorisées : ciblage, création, arbitrage budgétaire, tests",
        "Reporting mensuel commenté avec recommandations",
      ],
    },
    benefices: [
      { titre: "Une ligne claire", preuve: "Vos publications se reconnaissent sans lire le nom du compte." },
      { titre: "Des leads, pas des vues", preuve: "Chaque campagne est tracée jusqu'au formulaire ou au message WhatsApp." },
      { titre: "Un budget publicitaire justifié", preuve: "Coût par lead suivi mois après mois, arbitrages documentés." },
      { titre: "Une charge en moins", preuve: "Vos équipes valident, nous produisons et publions." },
    ],
    processus: [
      { titre: "Brief & audit", texte: "Objectifs commerciaux, analyse des comptes existants et des concurrents.", delai: TODO },
      { titre: "Conception", texte: "Ligne éditoriale, piliers de contenu, maquettes des formats récurrents.", delai: TODO },
      { titre: "Validation", texte: "Calendrier du premier mois validé avant toute production.", delai: TODO },
      { titre: "Production", texte: "Création des contenus, programmation, lancement des campagnes.", delai: TODO },
      { titre: "Mesure & suivi", texte: "Reporting mensuel, ajustement de la ligne et des budgets.", delai: TODO },
    ],
    faq: [
      { q: "Sur quels réseaux faut-il être présent ?", r: "Sur ceux où se trouvent vos clients, rarement sur tous. L'audit tranche cette question avant que le premier contenu soit produit." },
      { q: "Qui valide les publications ?", r: "Vous. Le calendrier éditorial est validé à l'avance, publication par publication, dans un espace partagé." },
      { q: "Le budget publicitaire est-il inclus ?", r: "Non. Nos honoraires couvrent la stratégie, la création et le pilotage ; le budget média est versé directement aux régies." },
      { q: "À partir de quand voit-on des résultats ?", r: "L'organique demande de la constance ; le sponsorisé produit des signaux plus rapides. Les jalons sont fixés au brief." },
    ],
    secteurs: ["digital"],
  },
  {
    slug: "marketing-strategie",
    titre: "Marketing & stratégie",
    icone: "▲",
    accroche: "Savoir à qui vous parlez avant de décider quoi dire.",
    h1: "Marketing & stratégie : décider avant de dépenser",
    sousTitre:
      "Positionnement, plans de communication, stratégie de marque et lancement de produits.",
    description:
      "Positionnement, plans de communication, stratégie de marque, lancement de produits.",
    livrablesTypes: ["Positionnement", "Plan de communication", "Lancement produit"],
    douleurs: [
      { titre: "Vous parlez à tout le monde, donc à personne", texte: "Un discours généraliste qui n'accroche aucun segment en particulier." },
      { titre: "Vos actions ne s'additionnent pas", texte: "Une campagne ici, un salon là, un flyer ailleurs. Aucun effet cumulé." },
      { titre: "Vous ne savez pas ce qui marche", texte: "Sans indicateurs définis à l'avance, chaque bilan devient une affaire d'opinion." },
    ],
    reponse: {
      texte:
        "Nous posons les fondations avant les outils : qui achète, pourquoi, contre qui vous vous battez, et ce qui vous rend préférable. Le plan de communication qui en découle est daté, budgété et mesurable. Chaque action y trouve sa place ou n'y figure pas.",
      livrables: [
        "Étude de marché et analyse concurrentielle",
        "Segmentation client et personas documentés",
        "Positionnement et proposition de valeur",
        "Plateforme de marque : mission, promesse, preuves, ton",
        "Plan de communication annuel daté et budgété",
        "Tableau de bord d'indicateurs et rituel de pilotage",
        "Plan de lancement produit le cas échéant",
      ],
    },
    benefices: [
      { titre: "Un discours qui accroche", preuve: "Un message par segment, testé avant d'être diffusé." },
      { titre: "Des arbitrages rapides", preuve: "Le plan tranche à l'avance : ce qui est fait, ce qui ne l'est pas." },
      { titre: "Un budget qui produit", preuve: "Chaque euro est rattaché à un objectif et à un indicateur." },
      { titre: "Une équipe alignée", preuve: "Commerce, communication et direction lisent le même document." },
    ],
    processus: [
      { titre: "Brief & immersion", texte: "Entretiens dirigeants, commerciaux et clients ; analyse des données existantes.", delai: TODO },
      { titre: "Diagnostic", texte: "Marché, concurrence, forces et angles morts de la marque.", delai: TODO },
      { titre: "Conception", texte: "Positionnement, personas, plateforme de marque.", delai: TODO },
      { titre: "Validation", texte: "Atelier de restitution et arbitrages avec la direction.", delai: TODO },
      { titre: "Plan & suivi", texte: "Plan de communication daté, indicateurs, points de pilotage.", delai: TODO },
    ],
    faq: [
      { q: "Faut-il une stratégie avant de refaire son logo ?", r: "Oui. Une identité visuelle traduit un positionnement ; sans lui, elle ne traduit qu'un goût. Nous refusons régulièrement des refontes tant que le cadrage n'est pas fait." },
      { q: "Travaillez-vous avec nos équipes internes ?", r: "Systématiquement. Le plan est construit en atelier avec vos commerciaux : ce sont eux qui connaissent les objections réelles." },
      { q: "Le plan est-il figé pour un an ?", r: "Non. Il est révisé aux points de pilotage trimestriels en fonction des indicateurs." },
      { q: "Quel est le coût d'une mission de cadrage ?", r: "Le périmètre est chiffré après un premier échange gratuit." },
    ],
    secteurs: ["marketing"],
  },
  {
    slug: "automatisation-ia",
    titre: "Automatisation IA",
    icone: "⬡",
    accroche: "Rendre à vos équipes les heures que la saisie leur prend.",
    h1: "Automatisation IA : des heures rendues à vos équipes",
    sousTitre:
      "Chatbots, workflows automatisés, assistants IA et intégration d'outils no-code, déployés sur des cas d'usage mesurables.",
    description:
      "Chatbots, workflows automatisés, assistants IA, intégration d'outils no-code.",
    livrablesTypes: ["Chatbot & assistant IA", "Workflows automatisés", "Intégrations no-code"],
    douleurs: [
      { titre: "Vos équipes recopient des données", texte: "Du formulaire au tableur, du tableur au CRM. Des heures par semaine, sans valeur ajoutée." },
      { titre: "Les demandes clients attendent", texte: "Les mêmes questions, chaque jour, traitées manuellement aux heures de bureau." },
      { titre: "L'IA vous intrigue sans convaincre", texte: "Beaucoup de promesses, peu de cas d'usage chiffrés dans votre métier." },
    ],
    reponse: {
      texte:
        "Nous commençons par cartographier vos processus et par chiffrer le temps réellement passé. Seuls les cas d'usage dont le gain est mesurable sont automatisés. Chaque automatisation est documentée, supervisée et reprise en main par vos équipes — nous ne construisons pas de dépendance.",
      livrables: [
        "Cartographie des processus et chiffrage du temps passé",
        "Sélection des cas d'usage par gain estimé",
        "Chatbot ou assistant IA entraîné sur vos contenus",
        "Workflows automatisés entre vos outils (CRM, e-mail, tableurs, facturation)",
        "Intégrations no-code supervisées et documentées",
        "Formation des équipes et documentation d'exploitation",
        "Tableau de bord des gains de temps constatés",
      ],
    },
    benefices: [
      { titre: "Des heures récupérées", preuve: "Gain mesuré avant/après sur chaque processus automatisé." },
      { titre: "Une réponse 24 h / 24", preuve: "Les questions récurrentes traitées sans intervention humaine." },
      { titre: "Moins d'erreurs de saisie", preuve: "Les données circulent entre outils sans recopie manuelle." },
      { titre: "Une équipe qui reprend la main", preuve: "Documentation et formation livrées ; l'agence n'est pas un point de blocage." },
    ],
    processus: [
      { titre: "Brief & cartographie", texte: "Observation des processus, mesure du temps réellement passé.", delai: TODO },
      { titre: "Sélection & conception", texte: "Priorisation des cas d'usage par gain, conception des workflows.", delai: TODO },
      { titre: "Validation", texte: "Prototype testé sur un périmètre restreint avant généralisation.", delai: TODO },
      { titre: "Déploiement", texte: "Mise en production, intégration aux outils existants, supervision.", delai: TODO },
      { titre: "Formation & suivi", texte: "Passation aux équipes, documentation, mesure des gains.", delai: TODO },
    ],
    faq: [
      { q: "Nos données sont-elles envoyées à des tiers ?", r: "Le choix des modèles et de leur hébergement fait partie du cadrage. Les traitements sensibles peuvent rester sur des infrastructures que vous maîtrisez." },
      { q: "Faut-il remplacer nos outils actuels ?", r: "Non. L'automatisation se branche sur l'existant. Remplacer un outil est une décision séparée, qui ne relève pas de la mission." },
      { q: "Et si le gain n'est pas au rendez-vous ?", r: "Le prototype est testé sur un périmètre restreint avant tout déploiement. Un cas d'usage qui ne tient pas ses promesses n'est pas généralisé." },
      { q: "Quel retour sur investissement peut-on attendre ?", r: "Il est chiffré cas par cas, à partir du temps réellement mesuré en phase de cartographie." },
    ],
    secteurs: ["ia"],
  },
  {
    slug: "photo-video",
    titre: "Photo & vidéo",
    icone: "◉",
    accroche: "Des images qui vous ressemblent, pas des banques d'images.",
    h1: "Photo & vidéo : montrer plutôt que promettre",
    sousTitre:
      "Shootings corporate, captation d'événements, films institutionnels et publicitaires, motion design.",
    description:
      "Shootings corporate, captation d'événements, vidéos institutionnelles et publicitaires, motion design.",
    livrablesTypes: ["Shooting corporate", "Film institutionnel", "Motion design"],
    douleurs: [
      { titre: "Vos visuels viennent d'une banque d'images", texte: "Des sourires génériques que vos concurrents utilisent aussi. Personne n'y croit." },
      { titre: "Vos vidéos ne sont pas regardées", texte: "Trois minutes d'institutionnel là où trente secondes suffisaient." },
      { titre: "Vos événements ne laissent aucune trace", texte: "Des mois de préparation, quelques photos floues au téléphone." },
    ],
    reponse: {
      texte:
        "Nous préparons avant de filmer : intention, message, plan de tournage, découpage des formats. Un même tournage alimente le site, les réseaux et les supports commerciaux, parce que les formats sont pensés en amont plutôt que recadrés après coup.",
      livrables: [
        "Note d'intention et plan de tournage",
        "Shooting corporate : équipe, locaux, produits, portraits",
        "Captation d'événements et reportage",
        "Films institutionnels et publicitaires",
        "Formats courts déclinés pour les réseaux sociaux (vertical, sous-titré)",
        "Motion design et habillage graphique",
        "Photothèque organisée, retouchée et libre de droits",
      ],
    },
    benefices: [
      { titre: "Une image authentique", preuve: "Vos locaux, vos équipes, vos clients — jamais de banque d'images." },
      { titre: "Un tournage, plusieurs usages", preuve: "Site, réseaux et supports commerciaux alimentés par la même session." },
      { titre: "Des vidéos regardées jusqu'au bout", preuve: "Formats calibrés par plateforme, sous-titrés par défaut." },
      { titre: "Un patrimoine visuel", preuve: "Photothèque organisée et cédée, réutilisable des années." },
    ],
    processus: [
      { titre: "Brief & repérage", texte: "Intention, message, repérage des lieux et contraintes techniques.", delai: TODO },
      { titre: "Conception", texte: "Plan de tournage, découpage, moodboard, casting interne.", delai: TODO },
      { titre: "Validation", texte: "Story-board et planning validés avant mobilisation des équipes.", delai: TODO },
      { titre: "Production", texte: "Tournage, prises de vue, captation son.", delai: TODO },
      { titre: "Livraison & suivi", texte: "Montage, étalonnage, déclinaison des formats, remise de la photothèque.", delai: TODO },
    ],
    faq: [
      { q: "Combien de temps dure un shooting corporate ?", r: "Généralement une demi-journée à une journée, selon le nombre de portraits et de lieux." },
      { q: "Les images sont-elles libres de droits ?", r: "Les droits d'exploitation vous sont cédés pour les usages définis au contrat. Les autorisations de droit à l'image des personnes filmées sont collectées lors du tournage." },
      { q: "Fournissez-vous les rushs ?", r: "Sur demande, avec la photothèque triée. Les rushs bruts représentent un volume important : leur remise est prévue au contrat." },
      { q: "Pouvez-vous filmer un événement au pied levé ?", r: "Une captation sans repérage est possible mais dégrade la qualité. Nous préférons un repérage, même court, la veille." },
    ],
    secteurs: ["photo-video"],
  },
];

/** Sixième carte de la grille d'accueil — §6.1 section 3 : « 5 services + accompagnement » */
export const accompagnement = {
  slug: "contact",
  titre: "Accompagnement des entreprises",
  icone: "✦",
  accroche: "Conseil, audits, formation des équipes et direction artistique externalisée.",
  href: "/contact",
};

export const getService = (slug) => services.find((s) => s.slug === slug);
