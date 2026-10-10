# Recette — modifications « NOUVELLE MODIF AGENCE » (octobre 2026)

Fiche pour le testeur. Branche : `regroupement-tableau`.
Pour chaque ligne : cocher ✅ si le comportement attendu est observé, sinon noter
la page, la taille d'écran, le navigateur et une capture.

Tailles à tester au minimum : **téléphone** (360 à 390 px), **tablette** (768 px),
**ordinateur** (1366 px et plus). Navigateurs : Chrome, Safari (iPhone), Edge.

---

## 0. Lancer le projet en local

```bash
# 1. Tableau de bord (dossier tableau/, port 3001) — nécessite tableau/.env
cd tableau
npm ci
npm run dev -- -p 3001

# 2. Site (racine du dépôt, port 3000), alimenté par le tableau de bord local
cd ..
npm ci
DASHBOARD_URL=http://localhost:3001 node scripts/sync-content.mjs
npm run dev
```

Site : http://localhost:3000 — Tableau de bord : http://localhost:3001/admin

---

## 1. Tout le site

| # | À vérifier | Attendu | ✅ |
|---|---|---|---|
| 1.1 | Couleur orange | Partout l'orange PROS.CARDS **#fc6303** (boutons, liens, titres de section), plus l'ancien orange | |
| 1.2 | Menu : bouton PROS.CARDS | Logo « Pros.Cards — Transformation Digitale » dans une pastille blanche ; ouvre **https://pros.cards/** dans un nouvel onglet | |
| 1.3 | Menu mobile | Le logo Pros.Cards apparaît aussi dans le tiroir du menu | |
| 1.4 | Pied de page | Espacement régulier entre toutes les lignes (adresse, téléphones, liens) | |
| 1.5 | Débordement | Aucune page ne défile à l'horizontale sur téléphone | |

## 2. Accueil

| # | À vérifier | Attendu | ✅ |
|---|---|---|---|
| 2.1 | « Le constat » (6 blocs bleu nuit) | Au survol : léger soulèvement, trait orange fin à gauche, reflet discret. **Plus de grand halo orange** | |
| 2.2 | « Les résultats » (4 blocs) | Un bloc ne s'ouvre **que sous le curseur** ; les autres restent fermés et ne s'étirent pas ; il se referme en partant ; animation fluide | |
| 2.3 | Idem au clavier | Touche Tab : le bloc qui a le focus s'ouvre | |
| 2.4 | Pastilles V.I.S.I.O.N. (section Réalisations) | Initiale de chaque étape en orange ; les étapes s'allument une à une en boucle ; la boucle s'arrête au survol | |
| 2.5 | « Nos clients » | Visible seulement s'il y a des logos (ou des témoignages) dans le tableau de bord. Logos en gris, en couleur au survol ; plus de 5 logos = bandeau qui défile | |
| 2.6 | FAQ de l'accueil | Animation « glisse » : la réponse arrive de la gauche, trait orange sous la question | |

## 3. Page « Nos services »

| # | À vérifier | Attendu | ✅ |
|---|---|---|---|
| 3.1 | Survol d'une carte (ordinateur) | La carte se retourne : au dos, l'image « Dos de la carte » (tableau de bord) et un bouton blanc **DÉCOUVRIR →** qui mène à la page du service | |
| 3.2 | Carte sans image au dos | Le dos prend la couleur du service (vert, bleu, violet, orange…) avec le nom du service | |
| 3.3 | Téléphone / tablette tactile | La carte ne se retourne pas ; le lien « Découvrir » de la face avant fonctionne | |
| 3.4 | FAQ | Animation « fondu » : la réponse sort d'un flou | |

## 4. Pages de chaque service (×5)

| # | À vérifier | Attendu | ✅ |
|---|---|---|---|
| 4.1 | Menu « Nos services » à gauche (ordinateur) | Liste des 5 services, le service affiché dans sa couleur avec un trait ; le menu reste visible en faisant défiler | |
| 4.2 | Idem tablette / téléphone | Les 5 services en pastilles sur plusieurs lignes, toutes visibles | |
| 4.3 | Blocs 01 · 02 · 03 | Carte de texte (trait, grand numéro et liseré dans la couleur du service), image à côté, alternée gauche / droite ; dernier bloc sur panneau gris | |
| 4.4 | Performance & automatisation, bloc 02 | Pastilles alternées pointillées vertes / noires (comme la maquette) | |
| 4.5 | Images des blocs | Celles du tableau de bord (« Images des pages Services ») ; sinon un cadre « ILLUSTRATION » | |
| 4.6 | FAQ | Animation « accent » : barre et fond teinté dans la couleur du service | |

## 5. Photo & Vidéo Corporate

| # | À vérifier | Attendu | ✅ |
|---|---|---|---|
| 5.1 | Section « Faisons rayonner votre entreprise » | Bande noire, forme orange (tracé de la direction) et caméra ; la forme et la caméra dépassent au-dessus et au-dessous de la bande ; rien ne bouge | |
| 5.2 | Texte et boutons | À droite dans un cadre gris foncé, deux boutons côte à côte | |
| 5.3 | Téléphone | La forme et la caméra passent au-dessus du texte | |

## 6. Réalisations

| # | À vérifier | Attendu | ✅ |
|---|---|---|---|
| 6.1 | Sections | Une section par « Section de réalisations » du tableau de bord, dans l'ordre choisi ; titre dans un cadre arrondi | |
| 6.2 | Vignettes | Images carrées, nom du client dessous ; clic = fiche de la réalisation | |
| 6.3 | 4 réalisations ou plus dans une section | La rangée défile toute seule dans le sens choisi ; pause au survol | |
| 6.4 | 3 réalisations ou moins | Rangée fixe ; flèches visibles seulement si les vignettes débordent (téléphone) | |
| 6.5 | Flèches ‹ › | Font avancer / reculer d'une vignette | |
| 6.6 | Réalisation sans section | Apparaît dans une dernière section « Autres réalisations » | |

## 7. Blog

| # | À vérifier | Attendu | ✅ |
|---|---|---|---|
| 7.1 | Article à la une | Image à gauche, catégorie, titre, extrait, date et temps de lecture, bouton « Lire l'article » | |
| 7.2 | Pastilles de catégories | Filtrent réellement les articles ; « Tous » revient à la liste complète | |
| 7.3 | Grille | 3 colonnes (ordinateur), 2 (tablette), 1 (téléphone) | |
| 7.4 | Survol d'un article | L'image zoome, la carte se soulève, la flèche glisse à droite | |
| 7.5 | Pagination | 6 articles par page, flèches ‹ › (à vérifier avec plus de 7 articles) | |

## 8. À propos et FAQ

| # | À vérifier | Attendu | ✅ |
|---|---|---|---|
| 8.1 | « Nos valeurs » | 4 cercles avec anneau orange en pointillés qui tourne ; plus vite au survol ; 4 colonnes / 2×2 / 1 selon l'écran | |
| 8.2 | Page FAQ | Animation « cartes » : chaque question est une carte, liseré orange quand elle est ouverte, réponse qui se déroule | |
| 8.3 | Landing PROS.CARDS | Animation « rebond » de la FAQ | |

## 9. Tableau de bord

| # | À vérifier | Attendu | ✅ |
|---|---|---|---|
| 9.1 | Contenus › Sections de réalisations | Les 3 sections du PDF existent ; on peut en ajouter une 4ᵉ, la renommer, l'ordonner, la masquer, choisir le sens | |
| 9.2 | Contenus › Réalisations | Champ « Sections de la page Réalisations » : rattacher une fiche à une ou plusieurs sections | |
| 9.3 | Contenus › Clients (logos) | Ajouter un logo (et un lien facultatif) ; un lien sans http(s):// est refusé | |
| 9.4 | Images des pages Services | Nouvel emplacement « Dos de la carte » pour chaque service | |
| 9.5 | Répercussion sur le site | Après publication, le site reconstruit affiche les changements | |

---

## Points connus (ne pas remonter)

- **En local**, les images de démo du tableau de bord sont cassées : leurs adresses
  pointent vers le port 3000 au lieu de 3001. Données de test locales uniquement.
- **Console du navigateur** : des erreurs 404 sur des fichiers `__next.….txt`
  (préchargement de Next.js 16 en export statique). La navigation fonctionne ;
  seul le préchargement des pages est perdu. Comportement du framework, présent
  avant ces modifications.
- **Textes** : la réécriture d'ensemble n'est pas encore faite (étape suivante).
- **Logo du pied de page** : en attente du fichier du designer.

## Vérifications automatiques déjà passées (10 octobre 2026)

19 pages × 6 largeurs (360, 390, 768, 1024, 1366, 1536 px) : aucun débordement
horizontal, aucune erreur JavaScript, un seul `<h1>` par page, toutes les images
ont un texte alternatif, aucun texte sous 11 px, 19 liens internes valides, tous
les blocs animés apparaissent au défilement. Build : 26 pages générées sans erreur.
