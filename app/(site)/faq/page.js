import Link from "next/link";
import { toutesLesQuestions } from "@/content/faq";
import { Breadcrumb, Reveal, FaqJsonLd, CtaBand, WhatsAppFloat } from "@/components/Ui";
import FaqSearch from "@/components/FaqSearch";

/** FAQ (G8) — CDC §6.8 */
export const metadata = {
  title: "FAQ — OPTINOV, tarifs et PROS.CARDS",
  description:
    "Méthodes, tarifs, délais, PROS.CARDS, support : les réponses aux questions que l'on nous pose le plus souvent.",
  alternates: { canonical: "/faq" },
};

export default function Faq() {
  return (
    <>
      <Breadcrumb items={[{ nom: "FAQ", href: "/faq" }]} />

      <section className="hero hero--page">
        <div className="container">
          <Reveal>
            <span className="eyebrow eyebrow--faq">FAQ</span>
            <h1>Les questions qu&apos;on nous pose vraiment</h1>
            <p className="lead">
              Nos réponses, sans détour. Si la vôtre n&apos;y figure pas, elle mérite
              qu&apos;on en parle de vive voix.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container" style={{ maxWidth: "56rem" }}>
          <FaqSearch />
        </div>
      </section>

      <section className="section section--alt">
        <div className="container">
          <CtaBand
            titre="Vous n’avez pas trouvé ?"
            texte="Posez-nous la question directement. Nous répondons à tout le monde, même à ceux qui ne deviendront pas clients."
            contexte="une question restée sans réponse"
          />
        </div>
      </section>

      {/* SEO-012 : balisage Schema.org FAQPage sur l'ensemble des questions */}
      <FaqJsonLd items={toutesLesQuestions} />
      <WhatsAppFloat contexte="une question" />
    </>
  );
}
