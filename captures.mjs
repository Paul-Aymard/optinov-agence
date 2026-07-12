import { chromium } from "playwright-core";

const EDGE = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";
const BASE = process.env.BASE ?? "http://localhost:3100";
const OUT = process.env.OUT ?? "captures";

const CIBLES = [
  { nom: "mobile-360", largeur: 360, hauteur: 780, mobile: true },
  { nom: "tablette-768", largeur: 768, hauteur: 1024, mobile: true },
  { nom: "desktop-1280", largeur: 1280, hauteur: 900, mobile: false },
];

const PAGES = [
  { chemin: "/", nom: "accueil" },
  { chemin: "/solutions/pros-cards", nom: "landing-pros-cards" },
  { chemin: "/services/automatisation-ia", nom: "page-service" },
];

const navigateur = await chromium.launch({ executablePath: EDGE, headless: true });

for (const c of CIBLES) {
  const ctx = await navigateur.newContext({
    viewport: { width: c.largeur, height: c.hauteur },
    isMobile: c.mobile,
    hasTouch: c.mobile,
  });
  for (const p of PAGES) {
    const page = await ctx.newPage();
    await page.goto(BASE + p.chemin, { waitUntil: "networkidle", timeout: 30000 });
    await page.waitForTimeout(600);
    const fichier = `${OUT}/${p.nom}-${c.nom}.png`;
    await page.screenshot({ path: fichier, fullPage: false });
    console.log(`  ${fichier}`);
    await page.close();
  }
  await ctx.close();
}

await navigateur.close();
console.log("\nCaptures terminees.");
