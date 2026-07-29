/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Export statique : le site est 100 % SSG (aucune fonction serveur / route API).
  // Produit un dossier `out/` déployable sur n'importe quel hébergeur statique
  // (Cloudflare Pages, Netlify en mode statique, etc.).
  output: "export",

  // En export statique, l'optimiseur d'images serveur n'est pas disponible.
  // (Le site n'utilise pas next/image de toute façon.)
  images: { unoptimized: true },

  // SEC-002 : les en-têtes de sécurité ne sont PAS gérés par next.config en export
  // statique — ils sont portés par l'hébergeur :
  //   - Cloudflare Pages : public/_headers
  //   - Netlify          : netlify.toml
};

export default nextConfig;
