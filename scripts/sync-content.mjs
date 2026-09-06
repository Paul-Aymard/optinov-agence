/**
 * SYNCHRONISATION DU CONTENU : tableau de bord (Payload, sur Render) -> site.
 *
 * Le tableau de bord est LA source de vérité. Ce script lit son API et écrit
 * des fichiers JSON dans content/generated/ (ignorés par Git), que les modules
 * de content/ importent. Il tourne :
 *   - au build (npm run build) : Cloudflare reconstruit le site à chaque
 *     modification enregistrée dans le tableau de bord (Deploy Hook) ;
 *   - avant le serveur de développement (npm run dev), en mode optionnel ;
 *   - à la demande (npm run sync).
 *
 * CE QU'IL ÉCRIT
 *   content/generated/site.json          paramètres du site (coordonnées, réseaux…)
 *   content/generated/blog.json          articles, corps en HTML
 *   content/generated/realisations.json  fiches du portfolio publiées
 *   content/generated/temoignages.json
 *   content/generated/equipe.json
 *   content/generated/faq.json
 *   content/generated/services.json      illustrations des pages Services
 *
 * SI LE TABLEAU DE BORD EST INJOIGNABLE
 *   Au build, on ÉCHOUE : Cloudflare garde alors la version précédente du
 *   site en ligne, ce qui vaut mieux qu'un site reconstruit avec un contenu
 *   silencieusement périmé ou vide. Le service Render gratuit met jusqu'à une
 *   minute à se réveiller : chaque requête réessaie cinq fois.
 *   Avec --optionnel (ou SYNC_OPTIONNEL=1), on garde les fichiers existants,
 *   ou on écrit des fichiers vides s'il n'y en a pas encore : c'est le mode
 *   du développement local, où l'on veut pouvoir lancer le site sans réseau.
 *
 * IMAGES
 *   Le tableau de bord décline chaque image en trois tailles (vignette 400,
 *   carte 800, grande 1600). On garde les trois adresses : le site choisit.
 */
import fs from 'node:fs'
import path from 'node:path'

const DASH = (process.env.DASHBOARD_URL || 'https://optinov-dashboard.onrender.com').replace(/\/$/, '')
const OPTIONNEL = process.argv.includes('--optionnel') || process.env.SYNC_OPTIONNEL === '1'
const ROOT = process.cwd()
const GENERE = path.join(ROOT, 'content/generated')
const SERVICES_JSON = path.join(GENERE, 'services.json')

const SERVICES = ['communication-visuelle', 'communication-digitale', 'marketing-strategie', 'automatisation-ia', 'photo-video']
const EMPLACEMENTS = ['img1', 'img2', 'img3']

/* Ce que contiennent les fichiers tant que rien n'a été synchronisé. */
const VIDES = {
  'site.json': {},
  'blog.json': [],
  'realisations.json': [],
  'temoignages.json': [],
  'equipe.json': [],
  'faq.json': [],
}

// ------------------------------------------------------------------ Réseau

async function fetchJSON(url, { attempts = 5, timeoutMs = 70000 } = {}) {
  let derniere
  for (let i = 1; i <= attempts; i++) {
    try {
      const ctrl = new AbortController()
      const t = setTimeout(() => ctrl.abort(), timeoutMs)
      const res = await fetch(url, { signal: ctrl.signal })
      clearTimeout(t)
      if (!res.ok) throw new Error('HTTP ' + res.status)
      return await res.json()
    } catch (e) {
      derniere = e
      console.warn(`[sync] tentative ${i}/${attempts} échouée (${url}) : ${e}`)
      if (i < attempts) await new Promise((r) => setTimeout(r, 6000))
    }
  }
  throw new Error(`Tableau de bord injoignable : ${url} (${derniere})`)
}

// ------------------------------------------------------------------ Images

const urlTaille = (media, taille) => media?.sizes?.[taille]?.url || media?.url || ''

/** Une image sous ses trois tailles, ou null si l'emplacement est vide. */
function image(media) {
  if (!media || typeof media !== 'object' || !media.url) return null
  return {
    url: urlTaille(media, 'grande'),
    carte: urlTaille(media, 'carte'),
    vignette: urlTaille(media, 'vignette'),
    alt: media.alt || '',
    largeur: media.width ?? null,
    hauteur: media.height ?? null,
  }
}

// ---------------------------------------- Corps d'article : Lexical -> HTML

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

function textNode(n) {
  let t = esc(n.text ?? '')
  const f = n.format || 0
  if (f & 1) t = `<strong>${t}</strong>`
  if (f & 2) t = `<em>${t}</em>`
  if (f & 8) t = `<u>${t}</u>`
  if (f & 4) t = `<s>${t}</s>`
  if (f & 16) t = `<code>${t}</code>`
  return t
}
const childrenHTML = (node) => (node.children || []).map(nodeHTML).join('')
function nodeHTML(n) {
  switch (n.type) {
    case 'text':
      return textNode(n)
    case 'linebreak':
      return '<br/>'
    case 'paragraph': {
      const c = childrenHTML(n)
      return c ? `<p>${c}</p>` : ''
    }
    case 'heading': {
      const tag = /^h[1-6]$/.test(n.tag) ? n.tag : 'h2'
      return `<${tag}>${childrenHTML(n)}</${tag}>`
    }
    case 'quote':
      return `<blockquote>${childrenHTML(n)}</blockquote>`
    case 'list': {
      const tag = n.listType === 'number' ? 'ol' : 'ul'
      return `<${tag}>${childrenHTML(n)}</${tag}>`
    }
    case 'listitem':
      return `<li>${childrenHTML(n)}</li>`
    case 'link': {
      const url = n.fields?.url || n.url || '#'
      const externe = /^https?:\/\//.test(url) ? ' target="_blank" rel="noopener noreferrer"' : ''
      return `<a href="${esc(url)}"${externe}>${childrenHTML(n)}</a>`
    }
    case 'horizontalrule':
      return '<hr/>'
    case 'upload': {
      const img = image(n.value)
      return img ? `<figure><img src="${esc(img.url)}" alt="${esc(img.alt)}" loading="lazy"/></figure>` : ''
    }
    default:
      return childrenHTML(n)
  }
}
const lexicalToHTML = (body) => (!body || !body.root ? '' : (body.root.children || []).map(nodeHTML).join('\n'))

// -------------------------------------------------------------- Transformations

const texte = (v) => (typeof v === 'string' ? v.trim() : '')

function siteDepuis(p) {
  return {
    nom: texte(p.nom),
    baseline: texte(p.baseline),
    telephone: texte(p.telephone),
    telephoneFixe: texte(p.telephoneFixe),
    whatsapp: texte(p.whatsapp),
    email: texte(p.email),
    adresse: texte(p.adresse),
    ville: texte(p.ville),
    pays: texte(p.pays),
    horaires: texte(p.horaires),
    delaiReponse: texte(p.delaiReponse),
    rdvUrl: texte(p.rdvUrl),
    reseaux: {
      linkedin: texte(p.reseaux?.linkedin),
      instagram: texte(p.reseaux?.instagram),
      facebook: texte(p.reseaux?.facebook),
    },
    prosCards: {
      inscription: texte(p.prosCards?.inscription),
      connexion: texte(p.prosCards?.connexion),
      demo: texte(p.prosCards?.demo),
    },
    rccm: texte(p.rccm),
    directeurPublication: texte(p.directeurPublication),
    hebergeur: texte(p.hebergeur),
  }
}

function servicesDepuis(data) {
  const out = {}
  for (const s of SERVICES) {
    const grp = data?.[s] || {}
    out[s] = {}
    for (const e of EMPLACEMENTS) out[s][e] = image(grp[e])?.url || ''
  }
  return out
}

const articleDepuis = (d) => ({
  slug: texte(d.slug) || String(d.id),
  titre: texte(d.titre) || String(d.id),
  categorie: texte(d.categorie) || 'agence',
  extrait: texte(d.extrait),
  tempsLecture: Number(d.tempsLecture) || 5,
  date: d.date ? String(d.date).slice(0, 10) : '',
  auteur: texte(d.auteur) || "L'équipe OPTINOV",
  aLaUne: Boolean(d.aLaUne),
  serviceLie: texte(d.serviceLie) || null,
  landingLiee: texte(d.landingLiee) || null,
  image: image(d.image),
  corps: lexicalToHTML(d.body),
})

const realisationDepuis = (d) => ({
  slug: texte(d.slug) || String(d.id),
  titre: texte(d.titre),
  client: texte(d.client),
  annee: texte(d.annee),
  services: Array.isArray(d.services) ? d.services : [],
  secteur: texte(d.secteur),
  extrait: texte(d.extrait),
  contexte: texte(d.contexte),
  objectifs: (d.objectifs || []).map((o) => texte(o?.texte)).filter(Boolean),
  reponse: texte(d.reponse),
  resultats: (d.resultats || [])
    .map((r) => ({ valeur: texte(r?.valeur), label: texte(r?.label) }))
    .filter((r) => r.valeur && r.label),
  temoignage: {
    verbatim: texte(d.temoignage?.verbatim),
    nom: texte(d.temoignage?.nom),
    fonction: texte(d.temoignage?.fonction),
  },
  visuel: image(d.visuel),
  galerie: (d.galerie || []).map(image).filter(Boolean),
  avantApres: Boolean(d.avantApres?.activer) && Boolean(image(d.avantApres?.avant)) && Boolean(image(d.avantApres?.apres)),
  avant: image(d.avantApres?.avant),
  apres: image(d.avantApres?.apres),
  etudeDeCas: Boolean(d.etudeDeCas),
})

const temoignageDepuis = (d) => ({
  verbatim: texte(d.verbatim),
  nom: texte(d.nom),
  fonction: texte(d.fonction),
  entreprise: texte(d.entreprise),
})

const membreDepuis = (d) => ({
  nom: texte(d.nom),
  role: texte(d.role),
  photo: image(d.photo),
  linkedin: texte(d.linkedin),
})

const questionDepuis = (d) => ({
  theme: texte(d.theme) || 'agence',
  q: texte(d.question),
  r: texte(d.reponse),
})

// ------------------------------------------------------------------ Écriture

function ecrire(nom, contenu) {
  fs.mkdirSync(GENERE, { recursive: true })
  fs.writeFileSync(path.join(GENERE, nom), JSON.stringify(contenu, null, 2) + '\n')
}

/** Garantit que chaque fichier attendu existe, vide s'il le faut (mode optionnel). */
function garantirLesFichiers() {
  fs.mkdirSync(GENERE, { recursive: true })
  for (const [nom, vide] of Object.entries(VIDES)) {
    const f = path.join(GENERE, nom)
    if (!fs.existsSync(f)) fs.writeFileSync(f, JSON.stringify(vide, null, 2) + '\n')
  }
  if (!fs.existsSync(SERVICES_JSON)) {
    fs.mkdirSync(path.dirname(SERVICES_JSON), { recursive: true })
    fs.writeFileSync(SERVICES_JSON, JSON.stringify(servicesDepuis({}), null, 2) + '\n')
  }
}

async function synchroniser() {
  console.log(`[sync] Synchronisation depuis ${DASH} …`)

  // Une première requête seule : elle réveille le service Render s'il dort.
  const parametres = await fetchJSON(`${DASH}/api/globals/parametres?depth=0`)

  const [services, blog, realisations, temoignages, equipe, faq] = await Promise.all([
    fetchJSON(`${DASH}/api/globals/service-images?depth=1`),
    fetchJSON(`${DASH}/api/blog?limit=200&depth=1&sort=-date`),
    fetchJSON(`${DASH}/api/realisations?limit=200&depth=1&sort=ordre&where[publiee][equals]=true`),
    fetchJSON(`${DASH}/api/temoignages?limit=200&depth=0&sort=ordre`),
    fetchJSON(`${DASH}/api/equipe?limit=200&depth=1&sort=ordre`),
    fetchJSON(`${DASH}/api/faq?limit=500&depth=0&sort=ordre`),
  ])

  ecrire('site.json', siteDepuis(parametres || {}))
  ecrire('blog.json', (blog?.docs || []).map(articleDepuis))
  ecrire('realisations.json', (realisations?.docs || []).map(realisationDepuis))
  ecrire('temoignages.json', (temoignages?.docs || []).map(temoignageDepuis))
  ecrire('equipe.json', (equipe?.docs || []).map(membreDepuis))
  ecrire('faq.json', (faq?.docs || []).map(questionDepuis))

  fs.mkdirSync(path.dirname(SERVICES_JSON), { recursive: true })
  fs.writeFileSync(SERVICES_JSON, JSON.stringify(servicesDepuis(services), null, 2) + '\n')

  console.log(
    `[sync] Terminé : ${blog?.docs?.length ?? 0} article(s), ${realisations?.docs?.length ?? 0} réalisation(s), ` +
      `${temoignages?.docs?.length ?? 0} témoignage(s), ${equipe?.docs?.length ?? 0} membre(s), ${faq?.docs?.length ?? 0} question(s).`,
  )
}

try {
  await synchroniser()
} catch (e) {
  if (OPTIONNEL) {
    console.warn(`[sync] ${e.message}`)
    console.warn('[sync] Mode optionnel : on garde le contenu déjà présent (ou des fichiers vides).')
    garantirLesFichiers()
  } else {
    console.error(`[sync] ÉCHEC : ${e.message}`)
    console.error('[sync] Le build est interrompu : la version précédente du site reste en ligne.')
    process.exit(1)
  }
}
