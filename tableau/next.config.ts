import { withPayload } from '@payloadcms/next/withPayload'
import type { NextConfig } from 'next'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

/*
  Le tableau de bord vit dans tableau/, à côté du site (dépôt commun). Next
  trouverait le package-lock.json du site au-dessus et prendrait la racine du
  dépôt pour la sienne : on lui fixe explicitement ce dossier-ci.
*/
const ICI = path.dirname(fileURLToPath(import.meta.url))

const nextConfig: NextConfig = {
  outputFileTracingRoot: ICI,
  turbopack: { root: ICI },

  images: {
    // Images servies par Payload depuis le disque (développement local).
    localPatterns: [
      {
        pathname: '/api/media/file/**',
      },
    ],
  },

  /*
    Le build de production passe par Webpack (voir `npm run build`). Ces alias
    permettent à Webpack de résoudre les imports `.js` vers des sources `.ts`,
    comme le fait Payload dans ses propres paquets.
  */
  webpack: (webpackConfig) => {
    webpackConfig.resolve.extensionAlias = {
      '.cjs': ['.cts', '.cjs'],
      '.js': ['.ts', '.tsx', '.js', '.jsx'],
      '.mjs': ['.mts', '.mjs'],
    }

    return webpackConfig
  },
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
