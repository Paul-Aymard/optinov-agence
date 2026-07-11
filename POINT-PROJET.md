# OPTINOV Agence — Point sur le projet

**Date :** 10 juillet 2026
**Objet :** site internet officiel + landing page PROS.CARDS
**Référence :** Cahier des Charges v1.1 (juillet 2026)
**Emplacement du code :** `C:\Users\Junior Draxler\optinov-agence`

---

## 1. En une phrase

Le site est développé, il fonctionne, et il est prêt à être déployé. Il attend les
valeurs factuelles que seule la direction OPTINOV peut arrêter, et le branchement
de trois briques techniques (formulaires, mesure d'audience, back-office).

---

## 2. Choix structurants

| Décision | Ce qui a été retenu | Pourquoi |
|---|---|---|
| Stack | **Next.js 16 + React 19**, App Router, génération statique | Scénario B recommandé au §14.1 : performance, sécurité, cohérence avec l'écosystème OPTINOV (React/Node) |
| Deux en-têtes | Groupes de routes `(site)` et `(landing)` | Permet le header complet (EX-001) et le header allégé de la landing (EX-020) sans changer les URL |
| Contenus | Isolés dans `content/`, un fichier par domaine | Chaque module devient un modèle Strapi/Directus sans retoucher les gabarits |
| Valeurs manquantes | Sections masquées plutôt que « [À compléter] » affiché | Le site paraît fini sans qu'aucune donnée soit inventée |

---

## 3. Ce qui est livré

**26 pages prérendues statiquement**, couvrant l'intégralité de l'arborescence du §5.1 :
accueil, à propos, hub services, 5 pages services, hub solutions, landing PROS.CARDS,
réalisations, blog + 6 articles, FAQ, contact, mentions légales, politique de
confidentialité, plus `sitemap.xml`, `robots.txt` et une page 404.

**Le design system du §10** est complet : palette navy `#1B2A4A` / or `#B8860B`, polices
Playfair Display et Inter auto-hébergées (aucun appel à Google au chargement), animations
respectant `prefers-reduced-motion`, cibles tactiles de 44 px, navigation clavier,
points de rupture 360 / 768 / 1024 / 1280 / 1536.

**La landing PROS.CARDS** reprend les 14 sections du §7.2, avec son CTA sticky mobile,
son filtre de fonctionnalités par profil, ses onglets de cas d'usage et son tableau
comparatif. La frontière du §7.3 est tenue : **aucun tunnel de paiement n'est développé**,
les CTA redirigent vers la plateforme avec l'offre pré-sélectionnée et les paramètres UTM.

---

## 4. Ce qui a été vérifié, pas supposé

Chaque point ci-dessous a été mesuré sur le site en fonctionnement, pas déduit du code.

```
26/26  pages générées sans erreur au build
20/20  pages : HTTP 200, un seul <h1>, title ≤ 60 car., description ≤ 155 car.
       0 lien mort (href contenant un placeholder)
       0 tag de mesure chargé avant consentement
       0 appel à Google Fonts
       contenu des accordéons, onglets et grilles filtrées présent dans le HTML servi
```

**Trois défauts trouvés et corrigés en cours de route :**

1. Une fonction de rendu était passée d'un composant serveur à un composant client —
   le build refusait de passer.
2. Le `<title>` de l'accueil faisait 98 caractères et celui de la landing 74, contre
   60 maximum imposés par SEO-003. Cinq meta descriptions dépassaient 155 caractères.
3. **Le plus grave :** les mentions « [À compléter] » étaient placées dans des attributs
   `href`. Le bouton « Prendre rendez-vous », présent sur les 26 pages, menait à une
   erreur 404. Idem pour le téléphone, l'e-mail, WhatsApp et les réseaux sociaux.
   Échec direct de REC-01. Corrigé par des helpers dans `content/site.js` : un lien non
   renseigné retombe sur `/contact`, et les réseaux sans URL ne s'affichent pas.

---

## 5. Contenus : ce qui est rédigé, ce qui attend la direction

**Rédigé** (travail de conception attendu du prestataire) : les douleurs client de
chaque page service, les bénéfices et leurs phrases de preuve, les étapes de processus,
les 20 réponses de la FAQ générale, les 12 questions de la FAQ PROS.CARDS, le récit
« Notre histoire », les accroches et titres de section.

**Repris du CDC** : les H1 proposés aux §6.1 et §7.2, la méthode Écouter → Concevoir →
Déployer → Mesurer, les noms des trois offres, les catégories du blog, les territoires
sémantiques du §11.2, le délai de réponse « sous 24 h ouvrées » (proposition du §6.9,
**à valider au kick-off**).

**En attente de la direction** — le CDC les marque lui-même `[À compléter]` :

| Élément | Où le renseigner |
|---|---|
| Téléphone, WhatsApp, e-mail, adresse, horaires | `content/site.js` |
| URL du tunnel d'inscription et de l'espace client PROS.CARDS | `content/site.js` |
| Outil de prise de rendez-vous (Cal.com ou Calendly) | `content/site.js` |
| Prix des trois offres PROS.CARDS | `content/prosCards.js` |
| Chiffres clés, logos clients, témoignages, équipe | `content/site.js` |
| Projets du portfolio | `content/realisations.js` |
| RCCM, directeur de publication, hébergeur | `content/site.js` |
| Durées de conservation des données | page politique de confidentialité |

Tant que ces valeurs manquent, les sections concernées **se masquent d'elles-mêmes**.
Les tarifs affichent « Tarif à venir ». Le portfolio affiche « Nos études de cas sont
en cours de publication ». Rien n'est inventé.

Pour tout lister : `grep -r "À compléter" content/`

---

## 6. Ce qui n'est pas fait

| Sujet | État | Exigence |
|---|---|---|
| Route `/api/formulaires` | **Absente.** Les formulaires valident, tracent l'événement et affichent l'accusé de réception, mais ne persistent rien. | EX-030, EX-031 |
| Validation serveur, CSRF, rate-limit, reCAPTCHA | Non implémentés (dépendent de l'API) | SEC-003 |
| GTM / GA4 / Meta Pixel | Aucun conteneur posé, faute d'identifiants. Le code pousse déjà les événements dans `window.dataLayer` et le bandeau cookies bloque tout tag avant consentement. | EX-040 à 044 |
| Back-office / CMS | Hors du code livré. Contenus dans `content/`. | §9 |
| Newsletter double opt-in | Outil d'e-mailing non arbitré | EX-037 |
| Carte Google Maps | Façade posée, iframe non chargée (cookies tiers) | EX-044 |
| Images réelles | Emplacements en place. Aucune banque d'images (§6.2). Passage à `next/image` à la fourniture des visuels. | SEO-011 |
| Multilingue | V1 en français. Architecture prête pour `app/[locale]`. | §8.8 |

---

## 7. Points à trancher par le chef de projet

Conformément à la règle de gouvernance du §17, ces zones d'ombre remontent plutôt que
d'être tranchées par le prestataire.

1. **Fil d'Ariane sur la landing PROS.CARDS.** EX-004 l'impose « sur toutes les pages
   hors accueil ». Le §5.3 interdit tout lien sortant dans le corps de la landing.
   Les deux exigences se contredisent. *Choix provisoire : pas de fil d'Ariane sur la
   landing, la conversion primant.* À confirmer par écrit.

2. **Fourchettes de budget** du formulaire de devis service : des valeurs en FCFA sont
   proposées, à valider par la direction commerciale.

3. **`npm audit`** signale deux vulnérabilités modérées sur `postcss`, embarqué par Next.
   Le correctif proposé est une rétrogradation vers `next@9.3.3`, une majeure de 2020 :
   inacceptable. À revoir à la prochaine mineure de Next.

---

## 8. Commandes utiles

```bash
cd "C:\Users\Junior Draxler\optinov-agence"

npm install       # installer les dépendances
npm run dev       # serveur de développement — http://localhost:3000
npm run build     # build de production
npm start         # servir le build
npm run deploy    # déployer sur Vercel (session CLI déjà active)
```

**État Vercel :** le CLI est installé et la session est ouverte
(compte `christkangah14-2952`). Le déploiement n'a **pas** été lancé. Pour publier :
`npx vercel --prod --yes` — l'URL obtenue sera du type `optinov-agence.vercel.app`.

**État Git :** un dépôt a été initialisé et les 43 fichiers indexés, mais **aucun commit
n'a été créé**. Rien n'est encore enregistré dans l'historique.

---

## 9. Avant toute mise en ligne publique

Trois choses qu'un visiteur remarquerait immédiatement, et qu'il faut assumer ou corriger :

- Les formulaires n'envoient rien à personne.
- Il n'y a ni portfolio, ni témoignages, ni chiffres clés.
- Les tarifs PROS.CARDS affichent « Tarif à venir ».

Pour une démonstration interne ou une présentation client, c'est acceptable à condition
de le dire. Pour une mise en production, la recette du §15 (REC-01 à REC-13) doit être
exécutée, en particulier REC-03 (formulaires de bout en bout), REC-05 (Lighthouse),
REC-06 (accessibilité) et REC-09 (cookies).
