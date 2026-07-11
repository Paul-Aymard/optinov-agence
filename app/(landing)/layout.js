import HeaderLite from "@/components/HeaderLite";
import Footer from "@/components/Footer";

/**
 * Landing PROS.CARDS — §7.1 : header allégé, retour au site global
 * uniquement via le logo et le footer. Aucun lien sortant dans le corps
 * de page hors ancres internes et CTA de conversion (§5.3).
 */
export default function LandingLayout({ children }) {
  return (
    <>
      <HeaderLite />
      <main id="contenu">{children}</main>
      <Footer />
    </>
  );
}
