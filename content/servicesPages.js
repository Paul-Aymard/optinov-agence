/**
 * Contenu narratif des pages Services — refonte « 5 actes » (fichier direction).
 * Chaque service devient une expérience courte, immersive et rythmée :
 *   Acte 1 (hero) · Actes 2-4 (le récit) · Acte 5 (manifeste + CTA) · Transition.
 *
 * Ce fichier ne remplace pas content/services.js (conservé pour la grille
 * d'accueil, la FAQ, les réalisations liées et le JSON-LD) : il l'enrichit.
 * La couleur d'accent (règle 80/20) est portée par accentVar.
 */
export const pagesServices = {
  /* ============================ SERVICE 01 ============================ */
  "communication-visuelle": {
    verbe: "Créer",
    accroche: "La naissance de votre identité.",
    architecture: "Un atelier de création",
    accentVar: "--accent-visuelle",
    visionLettres: "I · S · I",
    visionEtapes: "Imaginer · Structurer · Implémenter",
    heroTitre: "Une idée prend vie",
    heroParas: [
      "Chaque grande marque commence par une idée.",
      "Avant de dessiner un logo, nous cherchons à comprendre votre entreprise : sa vision, ses valeurs, ses ambitions et ce qui la rend unique.",
      "C'est de cette réflexion que naît une identité authentique et durable.",
    ],
    heroCta: { label: "Créer mon identité", href: "#devis" },
    actes: [
      {
        titre: "L'identité prend forme",
        paras: [
          "Une identité forte ne se résume pas à un logo.",
          "Elle repose sur un ensemble d'éléments qui parlent d'une seule voix.",
        ],
        liste: [
          { cle: "Logo" }, { cle: "Couleurs" }, { cle: "Typographies" },
          { cle: "Univers graphique" }, { cle: "Charte graphique" },
          { cle: "Supports de communication" },
        ],
        chute: "Chaque élément renforce la personnalité de votre marque.",
      },
      {
        titre: "Votre marque prend la parole",
        paras: [
          "Une identité réussie fonctionne partout.",
          "De l'écran du téléphone à l'enseigne, en passant par vos cartes de visite, vos réseaux sociaux et vos brochures, votre image reste cohérente et se reconnaît tout de suite.",
        ],
      },
      {
        titre: "La preuve par nos réalisations",
        paras: [
          "Chaque projet est différent. Chaque identité raconte une histoire.",
          "Découvrez comment nous avons aidé des entreprises, des institutions, des commerçants et des entrepreneurs à créer leur image.",
        ],
        chute: "Nos réalisations parlent mieux que nous.",
        realisations: true,
      },
    ],
    manifeste: {
      titre: "Donnez une identité à vos ambitions",
      paras: [
        "Une entreprise remarquable commence par une identité remarquable.",
        "Nous ne créons pas seulement des visuels : nous construisons une image qui inspire confiance, affirme votre différence et accompagne votre développement.",
      ],
      ctaPrincipal: { label: "Créer mon identité visuelle", href: "#devis" },
      ctaSecondaire: { label: "Découvrir nos réalisations", href: "/realisations" },
    },
    transition: {
      paras: [
        "Une identité forte ne change rien… tant qu'elle n'est pas vue.",
        "Faites rayonner votre marque auprès des bonnes personnes, au bon moment et sur les bons canaux.",
      ],
      bouton: { label: "Découvrir la Communication digitale", href: "/services/communication-digitale" },
    },
  },

  /* ============================ SERVICE 02 ============================ */
  "communication-digitale": {
    verbe: "Diffuser",
    accroche: "Le parcours de vos futurs clients.",
    architecture: "Le voyage d'un prospect",
    accentVar: "--accent-digitale",
    visionLettres: "I · O · N",
    visionEtapes: "Implémenter · Optimiser · Nourrir",
    heroTitre: "La première rencontre",
    heroParas: [
      "Tout commence par un premier clic.",
      "Vos futurs clients vous découvrent bien avant de vous rencontrer : une recherche Google, une publication, une recommandation.",
      "La vraie question : que voient-ils quand ils tombent sur votre entreprise ?",
    ],
    heroCta: { label: "Développer ma visibilité", href: "#devis" },
    actes: [
      {
        titre: "Chaque point de contact compte",
        paras: [
          "Votre présence digitale ne se limite pas à un réseau social.",
          "Elle repose sur plusieurs canaux qui travaillent ensemble, chacun avec son rôle.",
        ],
        liste: [
          { icone: "🌐", cle: "Site internet", valeur: "Inspirer confiance" },
          { icone: "📱", cle: "Réseaux sociaux", valeur: "Créer la proximité" },
          { icone: "📍", cle: "Google Business", valeur: "Être trouvé facilement" },
          { icone: "📢", cle: "Publicités", valeur: "Générer des opportunités" },
          { icone: "✉️", cle: "Emailing", valeur: "Fidéliser vos contacts" },
        ],
        chute: "Ensemble, ils donnent de vous une image professionnelle et cohérente.",
      },
      {
        titre: "De la visibilité à la confiance",
        paras: [
          "Être visible ne suffit plus.",
          "Vos contenus doivent rassurer, convaincre et donner envie de passer à l'action.",
          "Nous créons des publications et des campagnes qui renforcent votre crédibilité et transforment l'intérêt en prise de contact.",
        ],
        parcours: ["Découverte", "Intérêt", "Confiance", "Contact"],
      },
      {
        titre: "Des résultats concrets",
        paras: ["Une communication digitale efficace produit des effets mesurables."],
        checklist: [
          "Plus de visibilité", "Plus d'engagement", "Plus de demandes",
          "Plus de notoriété", "Plus d'opportunités commerciales",
        ],
        realisations: true,
      },
    ],
    manifeste: {
      titre: "Faites grandir votre présence digitale",
      paras: [
        "Chaque publication est une occasion de convaincre. Chaque jour sans stratégie digitale laisse le terrain à vos concurrents.",
        "Construisons ensemble une communication qui attire vos futurs clients et les transforme en clients fidèles.",
      ],
      ctaPrincipal: { label: "Développer ma communication digitale", href: "#devis" },
      ctaSecondaire: { label: "Demander un diagnostic", href: "/contact" },
    },
    transition: {
      paras: [
        "Être visible est une étape. Grandir est un choix.",
        "Transformez votre visibilité en une stratégie qui accélère durablement votre développement.",
      ],
      bouton: { label: "Découvrir Marketing & stratégie", href: "/services/marketing-strategie" },
    },
  },

  /* ============================ SERVICE 03 ============================ */
  "marketing-strategie": {
    verbe: "Orienter",
    accroche: "Donnez une direction claire à votre entreprise.",
    architecture: "Le cockpit du dirigeant",
    accentVar: "--accent-marketing",
    visionLettres: "V · I · O",
    visionEtapes: "Voir · Imaginer · Optimiser",
    heroTitre: "Savoir où vous voulez aller",
    heroParas: [
      "Une entreprise avance mieux lorsqu'elle sait où elle va.",
      "Vous avez des idées. Des projets. Des objectifs.",
      "Notre rôle est de vous aider à faire les bons choix pour développer votre activité.",
    ],
    heroCta: { label: "Construire ma stratégie", href: "#devis" },
    actes: [
      {
        titre: "Faire les bons choix",
        paras: [
          "Toutes les décisions n'ont pas le même impact.",
          "Faut-il lancer un nouveau service ? Communiquer davantage ? Cibler de nouveaux clients ?",
          "Nous analysons votre situation pour vous aider à choisir les bonnes priorités.",
        ],
      },
      {
        titre: "Passer à l'action",
        paras: [
          "Une bonne idée ne suffit pas. Il faut un plan.",
          "Nous construisons avec vous une feuille de route claire : quoi faire, quand et comment.",
        ],
        chute: "Chaque action vous rapproche de vos objectifs.",
      },
      {
        titre: "Voir les résultats",
        paras: ["Une bonne stratégie produit des résultats."],
        checklist: [
          "Plus de visibilité", "Plus de clients", "Une meilleure organisation",
          "Des actions plus efficaces", "Une croissance durable",
        ],
        chute: "Nous suivons vos résultats et ajustons les actions quand c'est nécessaire.",
        realisations: true,
      },
    ],
    manifeste: {
      titre: "Faisons grandir votre entreprise",
      paras: [
        "Chaque entreprise peut évoluer.",
        "Avec un cap clair, chaque décision devient une occasion de progresser.",
        "Construisons ensemble une stratégie adaptée à vos ambitions.",
      ],
      ctaPrincipal: { label: "Construire ma stratégie", href: "#devis" },
      ctaSecondaire: { label: "Demander un diagnostic", href: "/contact" },
    },
    transition: {
      paras: [
        "Une bonne stratégie mérite une organisation tout aussi performante.",
        "Découvrez comment améliorer votre fonctionnement, gagner du temps et automatiser les tâches répétitives.",
      ],
      bouton: { label: "Découvrir Performance & automatisation", href: "/services/automatisation-ia" },
    },
  },

  /* ============================ SERVICE 04 ============================ */
  "automatisation-ia": {
    verbe: "Optimiser",
    accroche: "Travaillez mieux. Gagnez du temps. Développez votre entreprise.",
    architecture: "Une entreprise qui fonctionne simplement",
    accentVar: "--accent-performance",
    visionLettres: "S · I · O · N",
    visionEtapes: "Structurer · Implémenter · Optimiser · Nourrir",
    heroTitre: "Retrouvez du temps pour l'essentiel",
    heroParas: [
      "Votre entreprise mérite plus de temps pour grandir.",
      "Chaque jour, des heures partent dans les e-mails, les devis, la recherche d'informations et les relances clients.",
      "Et si une partie de ces tâches se faisait toute seule ? Vous auriez enfin le temps de vous concentrer sur l'essentiel : développer votre activité.",
    ],
    heroCta: { label: "Améliorer mon organisation", href: "#devis" },
    actes: [
      {
        titre: "Une entreprise plus simple à gérer",
        paras: ["Lorsque votre organisation est bien pensée, tout devient plus fluide."],
        checklist: [
          "Les demandes sont mieux suivies",
          "Les informations sont centralisées",
          "Les équipes travaillent ensemble plus facilement",
          "Les oublis diminuent",
          "Les clients obtiennent des réponses plus rapidement",
        ],
        chute: "Vous travaillez avec plus de sérénité, sans avoir l'impression de courir après le temps.",
      },
      {
        titre: "Des solutions adaptées à votre entreprise",
        paras: [
          "Chaque entreprise est différente.",
          "C'est pourquoi nous mettons en place des outils adaptés à votre façon de travailler.",
        ],
        liste: [
          { icone: "📅", cle: "Organisation des rendez-vous" },
          { icone: "👥", cle: "Suivi des clients" },
          { icone: "📄", cle: "Gestion des documents" },
          { icone: "📊", cle: "Tableaux de bord" },
          { icone: "🔄", cle: "Automatisation des tâches répétitives" },
          { icone: "🤖", cle: "Assistants intelligents" },
        ],
        chute: "Des solutions simples qui vous aident à travailler plus efficacement au quotidien.",
      },
      {
        titre: "Plus de performance, moins de contraintes",
        paras: [
          "Quand les tâches répétitives prennent moins de place, votre entreprise devient plus performante.",
          "Vous gagnez en temps, en efficacité, en confort de travail, en qualité de service et en capacité à vous développer.",
        ],
        chute: "Votre équipe se concentre sur les missions qui créent réellement de la valeur.",
      },
    ],
    manifeste: {
      titre: "Faites évoluer votre façon de travailler",
      paras: [
        "La performance ne consiste pas à travailler davantage. Elle consiste à travailler plus intelligemment.",
        "En simplifiant votre organisation et en automatisant ce qui peut l'être, vous préparez votre entreprise à grandir durablement.",
      ],
      ctaPrincipal: { label: "Optimiser mon entreprise", href: "#devis" },
      ctaSecondaire: { label: "Parler à un expert", href: "/contact" },
    },
    transition: {
      paras: [
        "Une entreprise performante mérite aussi d'être remarquée.",
        "Découvrez comment la photo et la vidéo permettent de valoriser vos événements, vos équipes et vos réalisations.",
      ],
      bouton: { label: "Découvrir Photo & Vidéo Corporate", href: "/services/photo-video" },
    },
  },

  /* ============================ SERVICE 05 ============================ */
  "photo-video": {
    verbe: "Immortaliser",
    accroche: "Faites vivre votre entreprise à travers des images qui marquent.",
    architecture: "Les moments qui racontent votre entreprise",
    accentVar: "--or",
    universSombre: true,
    visionLettres: "I · N",
    visionEtapes: "Implémenter · Nourrir",
    heroTitre: "Chaque événement raconte une histoire",
    heroParas: [
      "Les plus beaux moments de votre entreprise méritent d'être conservés.",
      "Une conférence. Une inauguration. Un séminaire. Une formation. Une remise de prix.",
      "Ces instants passent rapidement, mais les images permettent de les faire vivre encore longtemps.",
    ],
    heroCta: { label: "Planifier la couverture de mon événement", href: "#devis" },
    actes: [
      {
        titre: "Nous capturons l'essentiel",
        paras: ["Au-delà des photos et des vidéos, nous mettons en valeur ce qui fait la richesse de votre événement."],
        checklist: [
          "Les échanges", "Les émotions", "Les moments forts",
          "Les équipes", "Les invités", "Les détails qui font la différence",
        ],
        chute: "Chaque image raconte une partie de votre histoire.",
      },
      {
        titre: "Des contenus qui continuent à vous servir",
        paras: [
          "Vos images ne restent pas dans un dossier. Elles deviennent des outils de communication.",
        ],
        liste: [
          { icone: "📱", cle: "Réseaux sociaux" },
          { icone: "🌐", cle: "Site internet" },
          { icone: "📑", cle: "Rapports d'activité" },
          { icone: "🖼️", cle: "Supports de communication" },
          { icone: "🎬", cle: "Films récapitulatifs" },
        ],
        chute: "Un seul événement peut alimenter votre communication pendant plusieurs semaines.",
      },
      {
        titre: "Valorisez votre image",
        paras: [
          "Une entreprise qui montre ce qu'elle fait inspire davantage confiance.",
          "Des images professionnelles permettent de :",
        ],
        checklist: [
          "renforcer votre crédibilité",
          "valoriser vos équipes",
          "mettre en avant vos réalisations",
          "communiquer avec plus d'impact",
        ],
        chute: "Une belle image reste plus longtemps en mémoire qu'un long discours.",
        realisations: true,
      },
    ],
    manifeste: {
      // Mise en scène PDF « NOUVELLE MODIF AGENCE » : bande noire, forme orange
      // et caméra codées dans le site (et non une image du tableau de bord).
      camera: true,
      titre: "Faisons rayonner votre entreprise",
      paras: [
        "Chaque événement est une occasion de renforcer votre image.",
        "Nous vous accompagnons pour créer des contenus qui mettent en valeur votre entreprise avant, pendant et après chaque temps fort.",
      ],
      ctaPrincipal: { label: "Couvrir mon prochain événement", href: "#devis" },
      ctaSecondaire: { label: "Découvrir nos réalisations", href: "/realisations" },
    },
    transition: {
      paras: [
        "Derrière chaque projet réussi se trouve une méthode.",
        "Découvrez comment la méthode V.I.S.I.O.N. guide chacun de nos projets, de la première idée jusqu'aux résultats.",
      ],
      bouton: { label: "Découvrir la méthode V.I.S.I.O.N.", href: "/#methode" },
    },
  },
};

export const getPageService = (slug) => pagesServices[slug];
