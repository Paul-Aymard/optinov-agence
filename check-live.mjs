import { chromium } from "playwright-core";
const EDGE = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";
const URL = process.env.URL ?? "https://optinov-agence.vercel.app";
const nav = await chromium.launch({ executablePath: EDGE, headless: true });
const ctx = await nav.newContext();
const page = await ctx.newPage();
try {
  await page.goto(URL, { waitUntil: "networkidle", timeout: 60000 });
  await page.waitForTimeout(3500); // laisse passer le checkpoint anti-bot
  const r = await page.evaluate(() => ({
    titre: document.title,
    h1: document.querySelector("h1")?.textContent?.trim(),
    aVision: !!document.querySelector(".vision__frise, .vision__mobile"),
    aObjectifs: document.querySelectorAll(".objectif").length,
    aSignature: !!document.querySelector(".footer__vision"),
  }));
  console.log("URL      :", URL);
  console.log("Titre    :", r.titre);
  console.log("H1       :", r.h1);
  console.log("Frise VISION présente :", r.aVision ? "OUI" : "NON");
  console.log("Sélecteur d'objectifs :", r.aObjectifs, "objectifs");
  console.log("Signature footer      :", r.aSignature ? "OUI" : "NON");
} catch (e) {
  console.log("Erreur:", e.message.slice(0, 80));
}
await nav.close();
