/**
 * Worker Cloudflare — sert le site statique (dossier out/) ET fournit le
 * connecteur de connexion GitHub du tableau de bord (Decap CMS).
 *
 * - /api/auth      → redirige vers l'autorisation GitHub
 * - /api/callback  → échange le code contre un jeton et le renvoie au dashboard
 * - tout le reste  → fichiers statiques du site (binding ASSETS)
 *
 * Secrets requis (configurés dans Cloudflare, PAS dans le code) :
 *   GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET
 */

const GITHUB_AUTHORIZE = "https://github.com/login/oauth/authorize";
const GITHUB_TOKEN = "https://github.com/login/oauth/access_token";

function page(body) {
  return new Response(`<!doctype html><html><head><meta charset="utf-8"></head><body>${body}</body></html>`, {
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    // On normalise les éventuels doubles slashes (//api/auth → /api/auth).
    const pathname = url.pathname.replace(/\/{2,}/g, "/");

    // 1) Démarrage de la connexion : redirection vers GitHub
    if (pathname === "/api/auth") {
      if (!env.GITHUB_CLIENT_ID) {
        return page("<p>Configuration manquante : GITHUB_CLIENT_ID.</p>");
      }
      const params = new URLSearchParams({
        client_id: env.GITHUB_CLIENT_ID,
        redirect_uri: `${url.origin}/api/callback`,
        scope: "repo",
        state: crypto.randomUUID(),
      });
      return Response.redirect(`${GITHUB_AUTHORIZE}?${params.toString()}`, 302);
    }

    // 2) Retour de GitHub : on échange le code contre un jeton d'accès
    if (pathname === "/api/callback") {
      const code = url.searchParams.get("code");
      if (!code) return page("<p>Code d'autorisation manquant.</p>");

      let data;
      try {
        const res = await fetch(GITHUB_TOKEN, {
          method: "POST",
          headers: { "content-type": "application/json", accept: "application/json" },
          body: JSON.stringify({
            client_id: env.GITHUB_CLIENT_ID,
            client_secret: env.GITHUB_CLIENT_SECRET,
            code,
          }),
        });
        data = await res.json();
      } catch (e) {
        return page(`<p>Erreur d'échange du jeton : ${String(e)}</p>`);
      }

      const ok = Boolean(data && data.access_token);
      const payload = ok
        ? `authorization:github:success:${JSON.stringify({ token: data.access_token, provider: "github" })}`
        : `authorization:github:error:${JSON.stringify(data)}`;

      // Renvoi du jeton au dashboard via postMessage (protocole Decap CMS)
      return page(`<script>
        (function () {
          function receiveMessage(e) {
            window.opener && window.opener.postMessage(${JSON.stringify(payload)}, e.origin);
            window.removeEventListener("message", receiveMessage, false);
          }
          window.addEventListener("message", receiveMessage, false);
          window.opener && window.opener.postMessage("authorizing:github", "*");
        })();
      </script>`);
    }

    // 3) Tout le reste : fichiers statiques du site
    return env.ASSETS.fetch(request);
  },
};
