/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // PERF-001..007 : formats modernes servis automatiquement par next/image
  images: {
    formats: ["image/avif", "image/webp"],
  },

  // SEC-002 : en-têtes de sécurité.
  // NOTE : en production, ces en-têtes doivent être portés par le reverse proxy
  // ou le CDN, pas seulement par Next.js. La CSP ci-dessous est un socle à
  // durcir une fois GTM/GA4/Meta Pixel branchés (§8.6) — 'unsafe-inline' est
  // requis par GTM et devra être remplacé par un nonce.
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },
};

export default nextConfig;
