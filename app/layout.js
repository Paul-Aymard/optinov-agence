import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import CookieBanner from "@/components/CookieBanner";
import { JsonLd } from "@/components/Ui";
import { site } from "@/content/site";

/**
 * UX-002, M : titres serif éditoriale (Playfair Display), corps sans-serif
 * lisible (Inter). next/font télécharge, auto-héberge et sous-ensemble les
 * woff2 au build — aucune requête vers Google au runtime — et applique
 * font-display: swap. Conforme aussi à PERF-003 (polices préchargées).
 *
 * Le header et le footer sont portés par les layouts de groupe :
 *   app/(site)     → header complet     (EX-001)
 *   app/(landing)  → header allégé      (EX-020)
 */
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});
const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  weight: ["700"],
  variable: "--font-playfair",
});

/** SEO-003 : gabarits de title par type de page ; OG/Twitter — SEO-010 */
export const metadata = {
  metadataBase: new URL(site.url),
  // SEO-003 : title ≤ 60 caractères. Le gabarit ajoute « | OPTINOV Agence »
  // (17 caractères) : le titre propre à chaque page doit donc tenir en 43.
  title: {
    default: "OPTINOV Agence — Communication & marketing",
    template: "%s | OPTINOV Agence",
  },
  description:
    "Agence de communication à Abidjan : identité de marque, réseaux sociaux, marketing, automatisation IA, photo et vidéo. Découvrez aussi PROS.CARDS, la carte de visite digitale.",
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: "OPTINOV Agence",
    url: site.url,
    images: [{ url: "/og-default.png", width: 1200, height: 630, alt: "OPTINOV Agence" }],
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

export const viewport = {
  themeColor: "#1B2A4A",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  // SEO-005 : Organization + LocalBusiness
  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": ["Organization", "LocalBusiness"],
    name: site.nom,
    description: site.baseline,
    url: site.url,
    telephone: site.telephone,
    email: site.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.adresse,
      addressLocality: site.ville,
      addressCountry: "CI",
    },
    areaServed: "Côte d'Ivoire",
    sameAs: site.socials.map((s) => s.href),
  };

  return (
    <html lang="fr" className={`${inter.variable} ${playfair.variable}`}>
      <body>
        <a className="skip-link" href="#contenu">Aller au contenu principal</a>
        {children}
        <CookieBanner />
        <JsonLd data={orgJsonLd} />
      </body>
    </html>
  );
}
