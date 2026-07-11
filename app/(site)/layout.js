import Header from "@/components/Header";
import Footer from "@/components/Footer";

/** Site global : header complet (EX-001) + footer 4 colonnes (EX-003). */
export default function SiteLayout({ children }) {
  return (
    <>
      <Header />
      <main id="contenu">{children}</main>
      <Footer />
    </>
  );
}
