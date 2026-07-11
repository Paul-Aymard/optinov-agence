import Link from "next/link";

/** 404 — REC-01 : aucun lien mort, mais une sortie utile si l'URL est erronée. */
export const metadata = { title: "Page introuvable" };

export default function NotFound() {
  return (
    <main id="contenu" className="section" style={{ minHeight: "70vh", display: "grid", placeItems: "center" }}>
      <div className="container center" style={{ maxWidth: "40rem" }}>
        <span className="eyebrow">Erreur 404</span>
        <h1>Cette page n&apos;existe pas</h1>
        <p className="lead">
          Le lien est peut-être obsolète, ou l&apos;adresse comporte une faute de frappe.
        </p>
        <div className="btn-group" style={{ justifyContent: "center", marginTop: "2rem" }}>
          <Link className="btn btn--gold" href="/">Retour à l&apos;accueil</Link>
          <Link className="btn btn--ghost" href="/contact">Nous contacter</Link>
        </div>
      </div>
    </main>
  );
}
