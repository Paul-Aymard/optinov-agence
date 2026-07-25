import { TODO } from "./site";

/**
 * FAQ générale — CDC §6.8 (gabarit G8).
 * Questions groupées par thème, accordéons accessibles au clavier (EX-016),
 * balisage Schema.org FAQPage (SEO-012), contenu administrable (EX-017).
 */
export const themesFaq = [
  {
    id: "agence",
    titre: "OPTINOV & méthode",
    questions: [
      { q: "Quels types de clients accompagnez-vous ?", r: "Des PME, grandes entreprises, institutions, administrations, entrepreneurs, indépendants et associations. Notre point commun n'est pas la taille mais l'exigence : nous travaillons avec des dirigeants qui attendent des résultats mesurables." },
      { q: "Travaillez-vous en dehors d'Abidjan ?", r: "Oui. Nous sommes basés à Abidjan et intervenons sur l'ensemble du territoire ivoirien et en Afrique francophone. Les missions de conseil et de production digitale se conduisent à distance sans perte de qualité." },
      { q: "Comment se déroule un premier échange ?", r: "Un rendez-vous de trente minutes, sans engagement, pour comprendre votre contexte et vos objectifs. Si nous ne sommes pas le bon partenaire, nous vous le disons à ce moment-là." },
      { q: "Qui sera mon interlocuteur ?", r: "Un chef de projet unique, qui connaît votre dossier et reste joignable pendant toute la mission. Vous ne racontez jamais deux fois la même chose." },
      { q: "Signez-vous des accords de confidentialité ?", r: "Systématiquement, dès que vous le demandez, et avant tout partage d'information sensible." },
    ],
  },
  {
    id: "tarifs",
    titre: "Tarifs & délais",
    questions: [
      { q: "Comment sont établis vos tarifs ?", r: "Au forfait pour les missions à périmètre défini, en abonnement mensuel pour l'accompagnement récurrent. Chaque devis détaille les livrables et le nombre d'allers-retours inclus." },
      { q: "Demandez-vous un acompte ?", r: "Les conditions de règlement sont précisées dans chaque devis, avant tout engagement." },
      { q: "Quels sont vos délais moyens ?", r: "Ils dépendent du périmètre et, surtout, de la réactivité des validations côté client. Le calendrier est contractualisé au brief." },
      { q: "Que se passe-t-il si le périmètre évolue en cours de mission ?", r: "Toute évolution fait l'objet d'un avenant chiffré et validé par écrit avant d'être engagée. Rien n'est produit hors devis." },
      { q: "Combien d'allers-retours sont inclus ?", r: "Deux allers-retours par livrable, précisés au devis. Au-delà, les ajustements sont facturés au temps passé — c'est ce qui nous permet de tenir les délais." },
    ],
  },
  {
    id: "pros-cards",
    titre: "PROS.CARDS",
    questions: [
      { q: "Qu'est-ce que PROS.CARDS ?", r: "Une plateforme de cartes de visite digitales et interactives en libre-service, développée, exploitée et supportée par OPTINOV. Vous choisissez votre offre, créez votre compte, payez en ligne, et votre compte est activé automatiquement." },
      { q: "OPTINOV crée-t-elle ma carte à ma place ?", r: "Non. PROS.CARDS est une plateforme en libre-service : vous créez, personnalisez et modifiez votre carte en toute autonomie depuis votre tableau de bord. OPTINOV administre la plateforme, pas votre contenu." },
      { q: "Faut-il installer une application ?", r: "Ni pour vous, ni pour la personne à qui vous partagez votre carte. Tout se passe dans le navigateur." },
      { q: "Comment équiper une équipe commerciale ?", r: "Via l'offre Entreprise. Le responsable devient administrateur de son espace, crée les comptes de ses collaborateurs et peut créer, modifier, suspendre ou supprimer leurs cartes." },
      { q: "Où trouver les tarifs ?", r: "Sur la page dédiée PROS.CARDS, section Tarifs. Trois offres : Essentiel, Professionnel et Entreprise." },
    ],
  },
  {
    id: "support",
    titre: "Support & suivi",
    questions: [
      // §6.9 : « sous 24 h ouvrées » est la proposition du CDC, à valider au kick-off.
      { q: "Sous quel délai répondez-vous à une demande ?", r: "Sous 24 h ouvrées. Nos horaires d'ouverture figurent sur la page Contact." },
      { q: "Assurez-vous la maintenance après livraison ?", r: "Oui, sur contrat de maintenance : mises à jour, sauvegardes, supervision et corrections. Le détail figure au devis." },
      { q: "Formez-vous nos équipes ?", r: "Chaque livraison inclut une passation. Des sessions de formation complémentaires peuvent être ajoutées au périmètre." },
      { q: "À qui appartiennent les fichiers et le code produits ?", r: "À vous. Fichiers sources, dépôts Git et droits d'exploitation sont cédés à la livraison." },
      { q: "Comment contacter le support PROS.CARDS ?", r: "Le support de la plateforme est assuré par OPTINOV depuis Abidjan. Les canaux de contact figurent dans votre tableau de bord et sur la page Contact." },
    ],
  },
];

/** Sous-ensemble affiché sur le hub Services — §6.3 : « FAQ courte (3 questions) » */
export const faqCourteServices = [
  themesFaq[0].questions[2],
  themesFaq[1].questions[0],
  themesFaq[1].questions[4],
];

/** Toutes les questions à plat, pour le balisage FAQPage et la recherche instantanée */
export const toutesLesQuestions = themesFaq.flatMap((t) =>
  t.questions.map((q) => ({ ...q, theme: t.titre, themeId: t.id }))
);
