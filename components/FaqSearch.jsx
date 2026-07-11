"use client";

import { useMemo, useState } from "react";
import { themesFaq } from "@/content/faq";
import { Accordion } from "@/components/Ui";

/** Recherche instantanée + accordéons par thème — §6.8, EX-016 */

// Recherche insensible à la casse et aux accents : « délais » trouve « delais ».
// U+0300..U+036F = bloc des diacritiques combinants isolés par normalize("NFD").
const normalise = (s) =>
  s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");

export default function FaqSearch() {
  const [q, setQ] = useState("");

  const resultats = useMemo(() => {
    const terme = normalise(q.trim());
    if (!terme) return themesFaq;
    return themesFaq
      .map((t) => ({
        ...t,
        questions: t.questions.filter(
          (item) => normalise(item.q).includes(terme) || normalise(item.r).includes(terme)
        ),
      }))
      .filter((t) => t.questions.length > 0);
  }, [q]);

  const total = resultats.reduce((n, t) => n + t.questions.length, 0);
  const totalGlobal = themesFaq.reduce((n, t) => n + t.questions.length, 0);

  return (
    <>
      <div className="field" style={{ maxWidth: "32rem", marginInline: "auto", marginBottom: "3rem" }}>
        <label htmlFor="faq-recherche">Rechercher une question</label>
        <input
          id="faq-recherche"
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Ex. tarifs, délais, PROS.CARDS…"
          autoComplete="off"
        />
        <p className="hint" role="status">
          {q ? `${total} résultat${total > 1 ? "s" : ""}` : `${totalGlobal} questions`}
        </p>
      </div>

      {total === 0 ? (
        <p className="empty-state">
          Aucune question ne correspond à « {q} ». Reformulez, ou posez-nous directement la question.
        </p>
      ) : (
        resultats.map((t) => (
          <section key={t.id} id={t.id} style={{ marginBottom: "3.5rem" }}>
            <h2>{t.titre}</h2>
            <Accordion items={t.questions} />
          </section>
        ))
      )}
    </>
  );
}
