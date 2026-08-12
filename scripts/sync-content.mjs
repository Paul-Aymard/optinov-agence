/**
 * Synchronisation du contenu depuis le tableau de bord (Payload/Render) vers
 * les fichiers du site, exécutée AU BUILD.
 *   - Images des services  -> content/images/services.json (fusion : le dashboard
 *     est prioritaire, sinon on garde la valeur existante)
 *   - Articles du blog     -> content/blog/<slug>.md (ajout/màj ; ne supprime pas
 *     les articles existants)
 *
 * Robuste : si le dashboard est injoignable (ex. service Render endormi), on
 * réessaie, puis on GARDE le contenu existant sans faire échouer le build.
 */
import fs from 'node:fs'
import path from 'node:path'

const DASH = (process.env.DASHBOARD_URL || 'https://optinov-dashboard.onrender.com').replace(/\/$/, '')
const ROOT = process.cwd()
const BLOG_DIR = path.join(ROOT, 'content/blog')
const SERVICES_JSON = path.join(ROOT, 'content/images/services.json')
const SERVICES = [
  'communication-visuelle',
  'communication-digitale',
  'marketing-strategie',
  'automatisation-ia',
  'photo-video',
]

async function fetchJSON(url, { attempts = 4, timeoutMs = 70000 } = {}) {
  for (let i = 1; i <= attempts; i++) {
    try {
      const ctrl = new AbortController()
      const t = setTimeout(() => ctrl.abort(), timeoutMs)
      const res = await fetch(url, { signal: ctrl.signal })
      clearTimeout(t)
      if (!res.ok) throw new Error('HTTP ' + res.status)
      return await res.json()
    } catch (e) {
      console.warn(`[sync] tentative ${i}/${attempts} échouée (${url}) : ${e}`)
      if (i < attempts) await new Promise((r) => setTimeout(r, 6000))
    }
  }
  return null
}

// ---- Conversion du corps Lexical (dashboard) en HTML ----
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
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
    case 'text': return textNode(n)
    case 'linebreak': return '<br/>'
    case 'paragraph': { const c = childrenHTML(n); return c ? `<p>${c}</p>` : '' }
    case 'heading': { const tag = /^h[1-6]$/.test(n.tag) ? n.tag : 'h2'; return `<${tag}>${childrenHTML(n)}</${tag}>` }
    case 'quote': return `<blockquote>${childrenHTML(n)}</blockquote>`
    case 'list': { const tag = n.listType === 'number' ? 'ol' : 'ul'; return `<${tag}>${childrenHTML(n)}</${tag}>` }
    case 'listitem': return `<li>${childrenHTML(n)}</li>`
    case 'link': { const url = n.fields?.url || n.url || '#'; return `<a href="${esc(url)}">${childrenHTML(n)}</a>` }
    default: return childrenHTML(n)
  }
}
const lexicalToHTML = (body) => (!body || !body.root ? '' : (body.root.children || []).map(nodeHTML).join('\n'))

const urlOf = (v) => (v && typeof v === 'object' ? v.url || '' : typeof v === 'string' ? v : '')
const yamlStr = (s) => `"${String(s).replace(/\\/g, '\\\\').replace(/"/g, '\\"')}"`

async function syncServices() {
  const data = await fetchJSON(`${DASH}/api/globals/service-images?depth=1`)
  if (!data) {
    console.warn('[sync] services : dashboard injoignable — on garde services.json existant.')
    return
  }
  let current = {}
  try { current = JSON.parse(fs.readFileSync(SERVICES_JSON, 'utf8')) } catch {}
  const out = {}
  for (const s of SERVICES) {
    const cur = current[s] || { img1: '', img2: '', img3: '' }
    const grp = data[s] || {}
    const pick = (k) => urlOf(grp[k]) || cur[k] || '' // dashboard prioritaire, sinon existant
    out[s] = { img1: pick('img1'), img2: pick('img2'), img3: pick('img3') }
  }
  fs.mkdirSync(path.dirname(SERVICES_JSON), { recursive: true })
  fs.writeFileSync(SERVICES_JSON, JSON.stringify(out, null, 2) + '\n')
  console.log('[sync] services.json mis à jour depuis le dashboard.')
}

async function syncBlog() {
  const data = await fetchJSON(`${DASH}/api/blog?limit=200&depth=2&sort=-date`)
  if (!data || !Array.isArray(data.docs)) {
    console.warn('[sync] blog : dashboard injoignable — on garde les articles existants.')
    return
  }
  if (!data.docs.length) {
    console.log('[sync] blog : aucun article dans le dashboard (rien à ajouter).')
    return
  }
  fs.mkdirSync(BLOG_DIR, { recursive: true })
  for (const d of data.docs) {
    const slug = (d.slug || '').trim() || String(d.id)
    const image = urlOf(d.image)
    const lines = [
      '---',
      `titre: ${yamlStr(d.titre || slug)}`,
      `categorie: ${yamlStr(d.categorie || 'agence')}`,
      d.date ? `date: ${yamlStr(String(d.date).slice(0, 10))}` : null,
      image ? `image: ${yamlStr(image)}` : null,
      `extrait: ${yamlStr(d.extrait || '')}`,
      `tempsLecture: ${Number(d.tempsLecture) || 5}`,
      `auteur: ${yamlStr(d.auteur || "L'équipe OPTINOV")}`,
      `aLaUne: ${Boolean(d.aLaUne)}`,
      d.serviceLie ? `serviceLie: ${yamlStr(d.serviceLie)}` : null,
      d.landingLiee ? `landingLiee: ${yamlStr(d.landingLiee)}` : null,
      '---',
      '',
      lexicalToHTML(d.body),
      '',
    ].filter((x) => x !== null)
    fs.writeFileSync(path.join(BLOG_DIR, `${slug}.md`), lines.join('\n'))
    console.log(`[sync] article écrit : ${slug}.md`)
  }
}

try {
  console.log(`[sync] Synchronisation depuis ${DASH} …`)
  await syncServices()
  await syncBlog()
  console.log('[sync] Terminé.')
} catch (e) {
  // Ne JAMAIS faire échouer le build à cause de la sync.
  console.warn('[sync] Erreur non bloquante :', String(e))
}
