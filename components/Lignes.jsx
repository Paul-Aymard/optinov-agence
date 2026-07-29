import { Fragment } from "react";

/**
 * Helpers de mise en forme du texte (composants serveur, zéro JavaScript client).
 *
 * - Lignes : affiche chaque phrase sur sa propre ligne. On ne coupe QUE sur une
 *   fin de phrase (. ! ?) précédée d'une minuscule/chiffre/ponctuation fermante et
 *   suivie d'un espace puis d'une majuscule. Un point précédé d'une MAJUSCULE n'est
 *   jamais coupé : les sigles pointés « V.I.S.I.O.N. » et « PROS.CARDS » restent intacts.
 * - Vision : met « V.I.S.I.O.N. » en évidence (orange) dans un titre, un bouton, etc.
 *
 * Les deux mettent automatiquement « V.I.S.I.O.N. » en orange.
 */

// Séparateur interne : un saut de ligne, absent des chaînes de texte (mono-ligne).
const SEP = "\n";
const COUPE = /([a-zà-ÿ0-9»)\]"'’])([.!?]+)\s+(?=[A-ZÀ-Ÿ«"'“])/gu;

/** Met « V.I.S.I.O.N. » en évidence (orange) dans une chaîne. */
function surlignerVision(texte, cle) {
  if (typeof texte !== "string" || !texte.includes("V.I.S.I.O.N.")) return texte;
  const parts = texte.split("V.I.S.I.O.N.");
  const out = [];
  parts.forEach((p, i) => {
    if (p) out.push(<Fragment key={`${cle}-t${i}`}>{p}</Fragment>);
    if (i < parts.length - 1) {
      out.push(
        <b key={`${cle}-v${i}`} className="vision-mot">
          V.I.S.I.O.N.
        </b>
      );
    }
  });
  return out;
}

/** Met « V.I.S.I.O.N. » en évidence dans un texte simple (titre, bouton, badge…). */
export function Vision({ children }) {
  if (typeof children !== "string") return children;
  return surlignerVision(children, "v");
}

/** Chaque phrase sur sa propre ligne + « V.I.S.I.O.N. » en orange. */
export function Lignes({ children }) {
  if (typeof children !== "string") return children;

  const phrases = children
    .replace(COUPE, `$1$2${SEP}`)
    .split(SEP)
    .map((p) => p.trim())
    .filter(Boolean);

  if (phrases.length <= 1) return surlignerVision(children.trim(), "l");

  return phrases.map((p, i) => (
    <span key={i} className="phrase">
      {surlignerVision(p, `l${i}`)}
    </span>
  ));
}
