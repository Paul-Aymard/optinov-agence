# Déployer le site vitrine sur Vercel

Guide pas à pas pour mettre le front OPTINOV en ligne sur [Vercel](https://vercel.com).
Il ne suppose aucune connaissance préalable de Vercel. Comptez une heure la
première fois.

Ce guide ne traite **que du front**. La base de données (Neon) et le tableau de
bord feront l'objet d'une étape suivante — la dernière section dit ce qui
restera à faire.

---

## 1. Où en est le site aujourd'hui

| | Aujourd'hui | Après ce guide |
| --- | --- | --- |
| Hébergement | Cloudflare Workers | Vercel |
| Adresse | `optinov-agence.christkangah14.workers.dev` | `<votre-projet>.vercel.app`, puis votre domaine |
| Type de site | 100 % statique (`output: "export"`) | inchangé |
| Contenus | lus au build sur le tableau de bord Render | inchangé (pour l'instant) |

Le site est **entièrement statique** : `npm run build` produit un dossier `out/`
avec des fichiers HTML déjà calculés. Aucun code ne tourne côté serveur. C'est
une très bonne nouvelle pour Vercel : le déploiement est simple et le site sera
rapide.

---

## 2. Quatre choses à savoir avant de commencer

Ces quatre points sont la raison d'être de ce guide. Si vous branchez le dépôt
sur Vercel sans les traiter, le déploiement échouera ou le site sera cassé
d'une manière peu visible.

### 2.1. Le build échoue si le tableau de bord ne répond pas — et c'est le cas

`npm run build` lance d'abord `scripts/sync-content.mjs`, qui va chercher les
contenus (blog, réalisations, FAQ, témoignages, paramètres) sur le tableau de
bord. **Si le tableau de bord ne répond pas, le script s'arrête et le build
échoue.** C'est voulu : mieux vaut garder l'ancienne version en ligne qu'en
publier une vide.

Or le tableau de bord Render **ne répond plus actuellement**. Le premier
déploiement Vercel échouerait donc, sans rapport avec Vercel.

La solution est à la section 4.3 : une variable `SYNC_OPTIONNEL` qui rend cette
synchronisation facultative, le temps de la bascule.

### 2.2. `public/_headers` et `public/_redirects` ne servent à rien sur Vercel

Ces deux fichiers sont un format Cloudflare / Netlify. Vercel les **ignore
complètement**. Sans rien faire, vous perdriez :

- les en-têtes de sécurité (`X-Frame-Options`, `Strict-Transport-Security`…) ;
- la redirection `/agence` → `/a-propos` ;
- la redirection `/admin` vers le tableau de bord.

Il faut les réécrire dans un fichier `vercel.json` — voir section 3.2.

### 2.3. L'adresse du site est écrite en dur dans le code

Dans `content/site.js`, `site.url` vaut aujourd'hui l'adresse Cloudflare. Cette
valeur alimente les URL canoniques, le `sitemap.xml`, le `robots.txt`, les
balises Open Graph et les données structurées.

Si vous ne la changez pas, **le site Vercel dira à Google que la vraie adresse
est celle de Cloudflare**. C'est le piège le plus coûteux du lot, parce qu'il
ne se voit pas à l'œil nu. Voir section 3.3.

### 2.4. Node 22 est requis

Le dépôt contient un fichier `.node-version` qui indique `22`. Vercel le lit
automatiquement. Vérifiez simplement, après le premier build, que les journaux
mentionnent bien Node 22.

---

## 3. Préparer le dépôt (trois modifications)

À faire sur une branche dédiée, depuis votre terminal :

```bash
cd "C:\Users\HP\OneDrive\Documents\optinov-agence" && git checkout -b deploiement-vercel
```

### 3.1. Vérifier que le build tourne en local

```bash
npm run build
```

S'il échoue sur `[sync] Tableau de bord injoignable`, c'est le point 2.1.
Confirmez-le en le relançant en mode facultatif :

```bash
npx cross-env SYNC_OPTIONNEL=1 npm run build
```

Sous PowerShell, sans `cross-env` :

```bash
$env:SYNC_OPTIONNEL = "1"; npm run build
```

Si cette seconde commande réussit, le dépôt est sain : seul le tableau de bord
manque à l'appel.

### 3.2. Créer `vercel.json`

À la racine du dépôt, à côté de `package.json`. Ce fichier remplace
`public/_headers` et `public/_redirects`.

```json
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" },
        { "key": "X-Frame-Options", "value": "SAMEORIGIN" },
        { "key": "Strict-Transport-Security", "value": "max-age=63072000; includeSubDomains; preload" },
        { "key": "Permissions-Policy", "value": "camera=(), microphone=(), geolocation=()" }
      ]
    }
  ],
  "redirects": [
    { "source": "/agence", "destination": "/a-propos", "permanent": true },
    { "source": "/admin", "destination": "https://optinov-dashboard.onrender.com/admin", "permanent": false },
    { "source": "/admin/:chemin*", "destination": "https://optinov-dashboard.onrender.com/admin", "permanent": false }
  ]
}
```

Ne supprimez pas `public/_headers` ni `public/_redirects` : ils restent utiles
tant que Cloudflare sert encore le site, et ils ne gênent pas Vercel.

> Quand le tableau de bord quittera Render, les deux redirections `/admin`
> devront pointer vers sa nouvelle adresse — ici et dans `public/_redirects`.

### 3.3. Rendre l'adresse du site configurable

Dans `content/site.js`, remplacez la ligne qui fixe l'adresse :

```js
  // L'adresse du site lui-même n'est pas un contenu : elle reste dans le code.
  url: "https://optinov-agence.christkangah14.workers.dev",
```

par :

```js
  // L'adresse du site n'est pas un contenu : elle vient de l'hébergeur, pour
  // que les URL canoniques, le sitemap et les balises Open Graph suivent
  // automatiquement le domaine servi.
  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://optinov-agence.christkangah14.workers.dev").replace(/\/$/, ""),
```

Le repli garde l'ancienne adresse : rien ne casse si la variable est absente.
Vous poserez `NEXT_PUBLIC_SITE_URL` sur Vercel à la section 4.3.

### 3.4. Commiter

```bash
git add vercel.json content/site.js && git commit -m "Deploiement Vercel : en-tetes, redirections et adresse du site configurable"
```

Puis poussez la branche et ouvrez la pull request :

```bash
git push -u origin deploiement-vercel
```

Vercel sait déployer une branche non fusionnée (voir 4.4), mais le plus simple
est de fusionner dans `main` avant de continuer.

---

## 4. Créer le projet sur Vercel

### 4.1. Créer le compte

Allez sur [vercel.com/signup](https://vercel.com/signup) et choisissez
**Continue with GitHub**. Connectez-vous avec le compte GitHub qui a accès au
dépôt `christ544/Optinov-agence`.

L'offre **Hobby** (gratuite) suffit largement pour ce site. Elle interdit
l'usage commercial au sens strict ; si le site est celui d'une agence qui
facture, prévoyez l'offre **Pro** (20 $ par mois et par membre) — c'est un
point à trancher avec le propriétaire du dépôt, pas un blocage technique.

### 4.2. Importer le dépôt

1. Sur le tableau de bord Vercel : **Add New…** → **Project**.
2. Dans la liste des dépôts GitHub, cherchez **Optinov-agence**.
   - S'il n'apparaît pas : cliquez **Adjust GitHub App Permissions** et donnez
     à Vercel l'accès à ce dépôt. Un dépôt privé n'est jamais visible par
     défaut.
3. Cliquez **Import**.

Sur l'écran de configuration, Vercel détecte Next.js tout seul. **Ne touchez à
rien** : le préréglage gère déjà `output: "export"` et sait qu'il doit servir
le dossier `out/`.

- Framework Preset : `Next.js`
- Build Command : `npm run build` (valeur par défaut)
- Output Directory : laisser vide (détection automatique)
- Install Command : `npm install` (valeur par défaut)

### 4.3. Poser les variables d'environnement

**Avant** de lancer le premier déploiement, dépliez **Environment Variables** et
ajoutez les trois lignes suivantes. Cochez les trois environnements
(Production, Preview, Development) pour chacune.

| Nom | Valeur | À quoi ça sert |
| --- | --- | --- |
| `SYNC_OPTIONNEL` | `1` | Rend la synchronisation des contenus facultative, pour que le build n'échoue pas tant que le tableau de bord est hors service (point 2.1). **À retirer** dès que le tableau de bord répond. |
| `NEXT_PUBLIC_SITE_URL` | l'adresse finale du site | Alimente les URL canoniques, le sitemap et les balises Open Graph (point 2.3). |
| `NEXT_PUBLIC_DASHBOARD_URL` | `https://optinov-dashboard.onrender.com` | Adresse où les formulaires du site envoient les demandes. |

Pour `NEXT_PUBLIC_SITE_URL` : si vous n'avez pas encore branché votre nom de
domaine, mettez l'adresse `.vercel.app` que Vercel vous attribue, puis
corrigez-la à la section 6. Sans barre oblique finale.

Une quatrième variable, `DASHBOARD_URL`, n'est utile que si le tableau de bord
change d'adresse : par défaut le script vise déjà Render.

### 4.4. Déployer

Cliquez **Deploy**. Comptez deux à quatre minutes.

Ensuite, chaque `git push` sur `main` redéploie automatiquement la production,
et chaque push sur une autre branche crée un **aperçu** : une adresse temporaire
pour faire valider une modification avant de la publier. C'est très pratique
pour montrer les retouches au client.

---

## 5. Vérifier que tout est bon

Ouvrez l'adresse `.vercel.app` et contrôlez, dans cet ordre :

1. **La page d'accueil s'affiche**, l'orange est le bon (`#ee7217`), la méthode
   V.I.S.I.O.N. s'anime.
2. **Les cinq pages services répondent** : `/services/communication-visuelle`,
   `/services/communication-digitale`, `/services/marketing-strategie`,
   `/services/automatisation-ia`, `/services/photo-video`.
3. **`/agence` redirige vers `/a-propos`** — cela valide `vercel.json`.
4. **`/sitemap.xml` et `/robots.txt`** affichent bien votre nouvelle adresse et
   non celle de Cloudflare — cela valide le point 2.3.
5. **Les en-têtes de sécurité sont là.** Dans un terminal :

   ```bash
   curl -sI https://votre-site.vercel.app | grep -i "x-frame-options\|strict-transport\|x-content-type"
   ```

   Les trois lignes doivent apparaître. Sinon, `vercel.json` n'est pas à la
   racine du dépôt, ou n'a pas été commité.
6. **Une page inexistante affiche bien la page 404** du site.

Si le tableau de bord est toujours hors service, il est normal que le blog, les
réalisations, la FAQ et les témoignages soient vides : les pages existent mais
annoncent que les contenus sont en cours de publication.

---

## 6. Brancher le nom de domaine

1. Projet Vercel → **Settings** → **Domains** → **Add**.
2. Saisissez le domaine (par exemple `optinov.ci` et `www.optinov.ci`).
3. Vercel affiche les enregistrements DNS à créer chez votre registrar :
   - un `A` sur `76.76.21.21` pour le domaine nu,
   - un `CNAME` vers `cname.vercel-dns.com` pour le `www`.
4. Créez-les chez le registrar. La propagation prend de quelques minutes à
   quelques heures.
5. Le certificat HTTPS est émis automatiquement, sans rien à faire.

**Une fois le domaine actif**, revenez dans **Settings → Environment Variables**
et corrigez `NEXT_PUBLIC_SITE_URL` avec l'adresse définitive, puis redéployez
(**Deployments** → dernier déploiement → **⋯** → **Redeploy**). Sans ce
redéploiement, le sitemap continuerait d'annoncer l'ancienne adresse.

Pensez aussi à mettre à jour `SITE_URL` côté tableau de bord si une variable y
pointe vers l'ancienne adresse.

---

## 7. Reconstruire le site après une modification du contenu

Le site étant statique, une modification faite dans le tableau de bord
n'apparaît en ligne qu'après une reconstruction. Sur Cloudflare, un « Deploy
Hook » s'en chargeait. Même principe sur Vercel :

1. **Settings** → **Git** → **Deploy Hooks**.
2. Créez un hook : nom `tableau-de-bord`, branche `main`.
3. Copiez l'adresse produite (elle ressemble à
   `https://api.vercel.com/v1/integrations/deploy/prj_xxx/yyy`).
4. Renseignez-la dans la variable `SITE_DEPLOY_HOOK` du tableau de bord, à la
   place de l'ancienne adresse Cloudflare.

Cette adresse est un secret : la connaître permet de déclencher un
déploiement. Ne la mettez pas dans le dépôt.

---

## 8. Si quelque chose ne va pas

| Symptôme | Cause la plus probable |
| --- | --- |
| Build échoué, `[sync] Tableau de bord injoignable` | La variable `SYNC_OPTIONNEL` manque, ou n'est pas cochée pour l'environnement Production. |
| Build très long puis échec | Le tableau de bord répond lentement : le script réessaie cinq fois avec 70 s d'attente. Posez `SYNC_OPTIONNEL=1`. |
| Le site s'affiche mais sans blog, FAQ ni réalisations | Normal si le tableau de bord ne répond pas. Les contenus reviendront à la reconstruction suivante. |
| `/agence` renvoie une 404 | `vercel.json` absent de la racine, ou non commité. |
| Le sitemap annonce l'adresse Cloudflare | `NEXT_PUBLIC_SITE_URL` absente, ou posée après le dernier déploiement : il faut redéployer. |
| Le dépôt n'apparaît pas à l'import | Vercel n'a pas accès au dépôt privé : **Adjust GitHub App Permissions**. |
| Les formulaires ne mènent nulle part | `NEXT_PUBLIC_DASHBOARD_URL` absente, ou tableau de bord hors service. |

Les journaux complets sont dans **Deployments** → le déploiement concerné →
**Building**. La cause réelle est presque toujours dans les vingt dernières
lignes.

---

## 9. Ce qui restera à faire ensuite

Ce guide met le **front** en ligne. Le site reste alimenté par le tableau de
bord Render, aujourd'hui hors service. L'étape suivante :

1. Créer la base PostgreSQL sur [Neon](https://neon.tech).
2. Redéployer le tableau de bord Payload (dépôt `optinov-tableau`) en le
   pointant sur cette base, et lancer les migrations.
3. Recréer les comptes et ressaisir les contenus, si l'ancienne base n'est pas
   récupérable.
4. Sur le site : retirer la variable `SYNC_OPTIONNEL`, mettre `DASHBOARD_URL` et
   `NEXT_PUBLIC_DASHBOARD_URL` à la nouvelle adresse, mettre à jour les deux
   redirections `/admin` de `vercel.json`, puis redéployer.

Tant que l'étape 4 n'est pas faite, le site se construit sans contenu éditorial
plutôt que d'échouer — c'est le rôle de `SYNC_OPTIONNEL`.

Un point d'attention pour cette suite : les images publiées jusqu'ici vivent sur
Cloudinary, et l'accès à ce compte appartient au propriétaire du dépôt. Sans
lui, les illustrations déjà en ligne seront à recharger.
