/**
 * Lignes — affiche chaque phrase sur sa propre ligne (demande direction).
 *
 * On ne coupe QUE sur une ponctuation de fin de phrase (. ! ?) précédée d'une
 * minuscule / d'un chiffre / d'une ponctuation fermante, suivie d'un espace puis
 * d'une majuscule ou d'un guillemet ouvrant. Un point précédé d'une MAJUSCULE
 * n'est jamais coupé : les sigles pointés comme « V.I.S.I.O.N. » et
 * « PROS.CARDS » restent donc intacts.
 *
 * Composant serveur (pas de "use client") : le découpage se fait au build,
 * le HTML reste statique — aucun JavaScript envoyé au navigateur.
 */
export function Lignes({ children }) {
  if (typeof children !== "string") return children;

  const SEP = "";
  const marque = children.replace(
    /([a-zà-ÿ0-9»)\]"'’])([.!?]+)\s+(?=[A-ZÀ-Ÿ«"'“])/gu,
    `$1$2${SEP}`
  );
  const phrases = marque.split(SEP).map((p) => p.trim()).filter(Boolean);

  if (phrases.length <= 1) return children;
  return phrases.map((p, i) => (
    <span key={i} className="phrase">
      {p}
    </span>
  ));
}
