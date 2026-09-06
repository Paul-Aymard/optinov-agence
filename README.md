# OPTINOV Agence — Site internet & landing PROS.CARDS

Implémentation du Cahier des Charges v1.1 (juillet 2026).
Stack : **scénario B du §14.1** — Next.js 16 (App Router, SSG) + React 19.

---

## Démarrer

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # build de production (32 pages prérendues)
npm start        # sert le build
```

Node.js ≥ 20 requis.

---

## Arborescence (§5.1)

| Route | Gabarit | Fichier |
|---|---|---|
| `/` | G1 Accueil | `app/(site)/page.js` |
| `/agence` | G2 Institutionnel | `app/(site)/agence/page.js` |
| `/services` | G3 Hub | `app/(site)/services/page.js` |
| `/services/{5 slugs}` | G4 Service | `app/(site)/services/[slug]/page.js` |
| `/solutions` | G3 Hub | `app/(site)/solutions/page.js` |
| `/solutions/pros-cards` | G5 Landing | `app/(landing)/solutions/pros-cards/page.js` |
| `/realisations` (+ `/{slug}`) | G6 Portfolio | `app/(site)/realisations/` |
| `/blog` (+ `/{slug}`) | G7 Blog | `app/(site)/blog/` |
| `/faq` | G8 FAQ | `app/(site)/faq/page.js` |
| `/contact` | G9 Contact | `app/(site)/contact/page.js` |
| `/mentions-legales`, `/politique-de-confidentialite` | G10 Légal | `app/(site)/` |

Deux **groupes de routes** portent les deux headers sans changer les URL :
`(site)` → header complet (EX-001) ; `(landing)` → header allégé (EX-020).

---

## Organisation

```
app/          routes et layouts
components/   design system (§10.5) + composants métier
content/      contenus
  site.js         coordonnées, réseaux, témoignages, équipe (depuis le tableau de bord), navigation, méthode, valeurs
  services.js     les 5 services au gabarit G4 (dans le code)
  servicesPages.js textes des pages services (dans le code)
  prosCards.js    les 14 sections de la landing, offres, FAQ PROS.CARDS (dans le code)
  realisations.js portfolio (depuis le tableau de bord), filtres service × secteur
  blog.js         catégories, articles (depuis le tableau de bord)
  faq.js          4 thèmes, questions (depuis le tableau de bord)
  generated/      fichiers JSON écrits par la synchronisation (dont services.json) — ignorés par Git
scripts/sync-content.mjs  la synchronisation tableau de bord -> site
app/globals.css   design system complet (palette §10.1)
```

---

## Tableau de bord

Le contenu éditorial se gère dans le tableau de bord Payload, hébergé sur
Render : <https://optinov-dashboard.onrender.com/admin> (l'adresse `/admin`
du site y redirige). Son code vit dans le dépôt `optinov-tableau`.

**Ce que le tableau de bord pilote** : articles du blog, illustrations des
pages Services, réalisations du portfolio, témoignages, équipe, FAQ, et les
paramètres du site (coordonnées, horaires, réseaux sociaux, liens PROS.CARDS,
mentions légales). Le reste (textes des services, landing PROS.CARDS,
méthode, valeurs) reste dans le code.

**Comment une modification arrive sur le site.** Le site est statique : à
chaque enregistrement dans le tableau de bord, celui-ci appelle le Deploy
Hook de Cloudflare (regroupé : un seul appel deux minutes après le dernier
enregistrement). Cloudflare relance alors `npm run build`, dont la première
étape, `scripts/sync-content.mjs`, lit l'API du tableau de bord et écrit les
fichiers de `content/generated/`. La modification est en ligne quelques
minutes plus tard.

**Les formulaires** (contact, devis service, devis flotte PROS.CARDS, rappel)
envoient chaque message dans la rubrique « Demandes » du tableau de bord, qui
prévient l'agence par e-mail et accuse réception au prospect. L'adresse du
tableau de bord est figée au build par `NEXT_PUBLIC_DASHBOARD_URL` (par défaut
l'adresse Render). Si l'envoi échoue, le visiteur en est informé et renvoyé
vers WhatsApp : jamais de faux « message bien reçu ».

**Si le tableau de bord est injoignable au build**, la synchronisation
échoue volontairement : Cloudflare garde la version précédente en ligne
plutôt que de publier un site au contenu vide ou périmé. Le service Render
gratuit met jusqu'à une minute à se réveiller ; le script réessaie cinq fois.

**En local**, `npm run dev` lance d'abord la synchronisation en mode
optionnel : sans réseau, le site démarre avec le dernier contenu synchronisé
(ou vide). Pour viser un tableau de bord lancé sur ce PC :

```bash
DASHBOARD_URL=http://localhost:3000 npm run sync
```

---

## Exigences couvertes

**Fonctionnel** — EX-001 à 004 (nav, footer, fil d'Ariane), EX-010/011/012/013/015
(portfolio, filtres combinables persistés dans l'URL, avant/après), EX-016/017 (FAQ),
EX-020/021/022/025/026 (landing, CTA sticky, redirections tunnel), EX-030 (validation
client, honeypot, consentement), EX-033/034 (WhatsApp contextuel, tel:/mailto:),
EX-044/045/046 (cookies), EX-047 (aucun formulaire de commande PROS.CARDS).

**SEO** — SEO-001 (un H1/page), SEO-002 (URLs), SEO-003 (title ≤ 60, description ≤ 155 :
vérifié sur les 18 pages), SEO-004 (`sitemap.xml`, `robots.txt`, canonicals), SEO-005
(Organization, LocalBusiness, Service, Product+Offer, Article, FAQPage, BreadcrumbList),
SEO-006 (SSG : tout le contenu est dans le HTML servi, JS désactivé compris), SEO-007/008
(maillage en silos, ancres descriptives), SEO-010 (Open Graph).

**UX/UI** — UX-001 à 009 : palette et contrastes, polices auto-hébergées via `next/font`,
`prefers-reduced-motion`, cibles ≥ 44 px, navigation clavier, ARIA, breakpoints
360/768/1024/1280/1536.

**Sécurité** — SEC-002 (en-têtes dans `next.config.mjs`), honeypot côté client.

---

## Ce qui n'est PAS fait, et pourquoi

Ces points sont hors de ce que le code seul peut livrer. Ils doivent être tranchés ou
branchés avant recette.

| Sujet | État | Exigence |
|---|---|---|
| **Route `/api/formulaires`** | Absente. Les formulaires valident, tracent l'événement GA4 et affichent l'accusé de réception, mais **ne persistent rien**. | EX-030, EX-031 |
| **Validation serveur, CSRF, rate-limit, reCAPTCHA/Turnstile** | Non implémentés (dépendent de l'API). | SEC-003 |
| **GTM / GA4 / Meta Pixel** | Aucun conteneur posé : les identifiants n'existent pas encore. Le code pousse déjà les événements dans `window.dataLayer` et le bandeau cookies bloque tout tag avant consentement. | EX-040 à 044 |
| **Back-office / CMS** | Hors du périmètre du code livré. Les contenus sont dans `content/`. | §9 |
| **Prise de rendez-vous** | Outil non arbitré (Cal.com auto-hébergé ou Calendly). | EX-035 |
| **Newsletter double opt-in** | Outil d'e-mailing non arbitré. | EX-037 |
| **Carte Google Maps** | Façade posée, iframe non chargée : elle dépose des cookies tiers et doit attendre le consentement. | EX-044 |
| **Images réelles** | Toutes les zones visuelles sont des emplacements. Aucune banque d'images (§6.2). Le passage à `next/image` (WebP/AVIF, srcset, lazy-loading) se fait à la fourniture des visuels. | SEO-011, PERF-001 |
| **Multilingue** | V1 en français. L'architecture supporte l'ajout d'`app/[locale]` sans refonte. | §8.8 |
| **Pagination et filtrage serveur du blog** | Liste complète affichée ; à brancher sur le CMS. | §6.7 |

### Valeurs `[À compléter]`

Conformément au §1.3, aucune valeur factuelle n'a été inventée : tarifs PROS.CARDS,
chiffres clés, coordonnées, KPI, noms de clients, témoignages et projets du portfolio
affichent `[À compléter]`. Le CDC pose lui-même ces trous : « Montants [À compléter] »
(§7.2), « délais indicatifs [À compléter] » (§6.4), « Contenus juridiques [À compléter]
par la direction » (§6.10).

La **copie éditoriale** (douleurs client, bénéfices, processus, réponses FAQ) a en
revanche été rédigée : c'est du travail de conception attendu du prestataire.

Ce que le CDC fournit a bien été repris : les H1 proposés (§6.1, §7.2), la méthode
Écouter → Concevoir → Déployer → Mesurer, les noms des trois offres, les catégories du
blog, les territoires sémantiques du §11.2, et le délai de réponse « sous 24 h ouvrées »
(proposition du §6.9, à valider au kick-off).

#### Les placeholders ne contaminent jamais les liens

Une valeur `[À compléter]` placée dans un `href` produit un lien mort : le navigateur la
traite comme une URL relative. Les helpers de `content/site.js` (`lienRdv`, `lienTel`,
`lienEmail`, `lienWhatsApp`, `lienPlateforme`, `socialsRenseignes`) font retomber tout
lien non renseigné sur `/contact`, et masquent les réseaux sociaux sans URL. Le texte
affiché continue de signaler `[À compléter]` à l'éditeur.

Vérifié : aucun `href` contenant « compléter » sur les 14 pages testées.

`grep -r "À compléter" content/` liste tout ce qui reste à renseigner.

### Points à trancher par le chef de projet (§17, règle de gouvernance)

1. **Fil d'Ariane sur la landing PROS.CARDS.** EX-004 l'impose « sur toutes les pages hors
   accueil ». Le §5.3 interdit tout lien sortant dans le corps de la landing. Les deux se
   contredisent. **Choix provisoire : pas de fil d'Ariane sur la landing** — la conversion
   prime. À confirmer.
2. **Fourchettes de budget** du formulaire de devis service : valeurs en FCFA proposées,
   à valider par la direction commerciale.
3. `npm audit` signale 2 vulnérabilités modérées sur `postcss`, transitivement via Next.
   Le correctif proposé (`next@9.3.3`) est une régression majeure inacceptable. À revoir
   à la prochaine mineure de Next.

---

## Vérifications passées

```
32/32 pages prérendues statiquement
18/18 pages : un seul <h1>, title ≤ 60, description ≤ 155, canonical, Open Graph
21/21 routes testées : 200 attendu, 404 sur URL inconnue
0 tag de mesure chargé avant consentement
Contenu des accordéons, onglets et grilles filtrées présent dans le HTML servi
```

Restent à exécuter en recette (§15) : REC-02 (revue visuelle), REC-05 (Lighthouse),
REC-06 (axe/WAVE, lecteur d'écran), REC-11 (multi-navigateurs).
