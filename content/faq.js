import genere from "./generated/faq.json";

/**
 * FAQ générale — CDC §6.8 (gabarit G8).
 * Les questions viennent du tableau de bord (collection « FAQ »), groupées ici
 * par thème dans l'ordre fixé ci-dessous. Accordéons accessibles au clavier
 * (EX-016), balisage Schema.org FAQPage (SEO-012), contenu administrable (EX-017).
 */

/** Les quatre thèmes, dans l'ordre d'affichage (mêmes identifiants que le tableau de bord). */
const THEMES = [
  { id: "agence", titre: "OPTINOV & méthode" },
  { id: "tarifs", titre: "Tarifs & délais" },
  { id: "pros-cards", titre: "PROS.CARDS" },
  { id: "support", titre: "Support & suivi" },
];

const brut = Array.isArray(genere) ? genere : [];

export const themesFaq = THEMES.map((t) => ({
  ...t,
  questions: brut.filter((x) => x.theme === t.id && x.q && x.r).map((x) => ({ q: x.q, r: x.r })),
})).filter((t) => t.questions.length > 0);

/** Toutes les questions à plat, pour le balisage FAQPage et la recherche instantanée */
export const toutesLesQuestions = themesFaq.flatMap((t) =>
  t.questions.map((q) => ({ ...q, theme: t.titre, themeId: t.id }))
);

/** Sous-ensemble affiché sur le hub Services — §6.3 : « FAQ courte (3 questions) » */
export const faqCourteServices = [
  ...(themesFaq.find((t) => t.id === "agence")?.questions.slice(0, 1) ?? []),
  ...(themesFaq.find((t) => t.id === "tarifs")?.questions.slice(0, 2) ?? []),
].slice(0, 3);
