import { Fragment } from "react";

/**
 * Helpers de mise en forme du texte (composants serveur, zéro JavaScript client).
 *
 * - Lignes : affiche chaque phrase sur sa propre ligne. On ne coupe QUE sur une
 *   fin de phrase (. ! ?) précédée d'une minuscule/chiffre/ponctuation fermante et
 *   suivie d'un espace puis d'une majuscule. Un point précédé d'une MAJUSCULE n'est
 *   jamais coupé : les sigles pointés « V.I.S.I.O.N. » et « PROS.CARDS » restent intacts.
 * - Vision : met « V.I.S.I.O.N. » en évidence (gras) dans un titre, un bouton, etc.
 *
 * Les deux surlignent automatiquement « V.I.S.I.O.N. ».
 */

const VISION = "V.I.S.I.O.N.";
const SEP = "";
const COUPE = /([a-zà-ÿ0-9»)\]"'’])([.!?]+)\s+(?=[A-ZÀ-Ÿ«"'“])/gu;

/** Met « V.I.S.I.O.N. » en gras dans une chaîne ; renvoie la chaîne ou un tableau de nœuds. */
function surlignerVision(texte, cle) {
  if (typeof texte !== "string" || !texte.includes(VISION)) return texte;
  const parts = texte.split(VISION);
  const out = [];
  parts.forEach((p, i) => {
    if (p) out.push(<Fragment key={`${cle}-t${i}`}>{p}</Fragment>);
    if (i < parts.length - 1) {
      out.push(
        <b key={`${cle}-v${i}`} className="vision-mot">
          {VISION}
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

/** Chaque phrase sur sa propre ligne + « V.I.S.I.O.N. » en gras. */
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
