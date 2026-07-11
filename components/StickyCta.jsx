"use client";

import { useEffect } from "react";
import { lienPlateforme } from "@/content/site";

/** CTA sticky mobile en bas d'écran — EX-022, M (visible < 768 px, cf. CSS) */
export default function StickyCta() {
  useEffect(() => {
    document.body.classList.add("has-sticky-cta");
    return () => document.body.classList.remove("has-sticky-cta");
  }, []);

  return (
    <div className="sticky-cta">
      <a
        className="btn btn--gold btn--block"
        href={lienPlateforme("inscription")}
        data-ga="cta_creer_carte_sticky"
      >
        Créer ma carte
      </a>
    </div>
  );
}
