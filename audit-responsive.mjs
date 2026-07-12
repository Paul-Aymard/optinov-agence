import { chromium } from "playwright-core";

const EDGE = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";
const BASE = process.env.BASE ?? "https://optinov-agence.vercel.app";

// Points de rupture du CDC §10.4 (UX-007) + un mobile étroit très courant
const LARGEURS = [320, 360, 390, 768, 1024, 1280, 1536];

const PAGES = [
  "/",
  "/agence",
  "/services",
  "/services/automatisation-ia",
  "/solutions",
  "/solutions/pros-cards",
  "/realisations",
  "/blog",
  "/blog/carte-nfc-vs-papier",
  "/faq",
  "/contact",
];

const navigateur = await chromium.launch({ executablePath: EDGE, headless: true });
const problemes = [];

for (const largeur of LARGEURS) {
  const ctx = await navigateur.newContext({
    viewport: { width: largeur, height: 900 },
    deviceScaleFactor: 1,
    isMobile: largeur < 768,
    hasTouch: largeur < 768,
  });

  for (const chemin of PAGES) {
    const page = await ctx.newPage();
    try {
      await page.goto(BASE + chemin, { waitUntil: "networkidle", timeout: 30000 });
      await page.waitForTimeout(400);

      const r = await page.evaluate((vw) => {
        // 1. Défilement horizontal RÉELLEMENT subi par l'utilisateur.
        //    On tente de scroller : si la page bouge, il y a un vrai débordement.
        //    (scrollWidth seul est trompeur : un élément hors écran mais coupé
        //     par overflow-x: clip le gonfle sans que rien ne défile.)
        window.scrollTo(9999, 0);
        const debordement = Math.round(window.scrollX);
        window.scrollTo(0, 0);

        // 2. Éléments visibles qui dépassent du viewport.
        //    On ignore ce qui est volontairement hors écran (menu mobile fermé),
        //    ce qui est dans un conteneur défilant (tableau comparatif, carrousel),
        //    et les éléments coupés par un ancêtre en overflow: clip/hidden.
        const dansConteneurDefilant = (el) => {
          for (let p = el.parentElement; p; p = p.parentElement) {
            const s = getComputedStyle(p);
            if (["auto", "scroll", "clip", "hidden"].includes(s.overflowX)) return true;
          }
          return false;
        };
        const horsEcranVolontaire = (el) => {
          for (let p = el; p; p = p.parentElement) {
            const s = getComputedStyle(p);
            if (s.position === "fixed" && s.transform !== "none") return true;
          }
          return false;
        };

        const coupables = [];
        for (const el of document.querySelectorAll("body *")) {
          const st = getComputedStyle(el);
          if (st.display === "none" || st.visibility === "hidden") continue;
          if (st.overflowX === "auto" || st.overflowX === "scroll") continue;
          if (horsEcranVolontaire(el) || dansConteneurDefilant(el)) continue;
          const b = el.getBoundingClientRect();
          if (b.width === 0) continue;
          const depasse = Math.round(b.right - vw);
          if (depasse > 1) {
            coupables.push({
              sel: el.tagName.toLowerCase() + (el.className && typeof el.className === "string" ? "." + el.className.trim().split(/\s+/).slice(0, 2).join(".") : ""),
              depasse,
              largeur: Math.round(b.width),
            });
          }
        }

        // 3. Cibles tactiles < 44px (UX-008).
        //    Une case a cocher de 22px est conforme si son <label> cliquable
        //    l'englobe et atteint 44px : c'est le label qu'on touche.
        const petites = [];
        for (const el of document.querySelectorAll("a, button, input, select, textarea")) {
          const st = getComputedStyle(el);
          if (st.display === "none" || st.visibility === "hidden") continue;
          const b = el.getBoundingClientRect();
          if (b.width === 0 || b.height === 0) continue;
          if (b.height >= 44 || b.width >= 44) continue;

          const label = el.closest("label");
          if (label) {
            const lb = label.getBoundingClientRect();
            if (lb.height >= 44) continue; // zone tactile portee par le label
          }
          petites.push((el.textContent || el.getAttribute("aria-label") || el.type || el.tagName).trim().slice(0, 30));
        }

        // 4. Texte trop petit
        let minPolice = 99;
        for (const el of document.querySelectorAll("p, li, span, a, button")) {
          const t = (el.textContent || "").trim();
          if (!t) continue;
          const fs = parseFloat(getComputedStyle(el).fontSize);
          if (fs > 0 && fs < minPolice) minPolice = fs;
        }

        return {
          debordement,
          coupables: coupables.slice(0, 5),
          nbPetitesCibles: petites.length,
          exemplesPetites: petites.slice(0, 3),
          minPolice: Math.round(minPolice * 10) / 10,
        };
      }, largeur);

      const p = [];
      if (r.debordement > 1) p.push(`DEBORDEMENT +${r.debordement}px`);
      if (r.coupables.length) p.push(`${r.coupables.length} elem. hors cadre`);
      if (r.nbPetitesCibles > 0) p.push(`${r.nbPetitesCibles} cibles <44px`);
      if (r.minPolice < 12) p.push(`police ${r.minPolice}px`);

      if (p.length) {
        problemes.push({ largeur, chemin, ...r });
        console.log(`[${largeur}px] ${chemin}  ->  ${p.join(" | ")}`);
        r.coupables.forEach((c) => console.log(`        ${c.sel} depasse de ${c.depasse}px (largeur ${c.largeur}px)`));
        if (r.exemplesPetites.length) console.log(`        petites cibles: ${r.exemplesPetites.join(" / ")}`);
      }
    } catch (e) {
      console.log(`[${largeur}px] ${chemin}  ->  ERREUR ${e.message.slice(0, 60)}`);
    }
    await page.close();
  }
  await ctx.close();
}

await navigateur.close();

console.log("\n========================================");
if (problemes.length === 0) {
  console.log("AUCUN PROBLEME DE RESPONSIVITE DETECTE");
  console.log(`${LARGEURS.length} largeurs x ${PAGES.length} pages = ${LARGEURS.length * PAGES.length} combinaisons testees`);
} else {
  console.log(`${problemes.length} combinaison(s) en defaut sur ${LARGEURS.length * PAGES.length}`);
}
