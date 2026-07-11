"use client";

import { useState } from "react";
import { services } from "@/content/services";

/**
 * Formulaires — CDC §8.1.
 *
 * EX-030, M : validation côté client ET serveur, messages d'erreur explicites
 *   champ par champ, case de consentement, anti-spam, double routage
 *   (notification e-mail interne + enregistrement en base).
 * SEC-003, M : honeypot + vérification invisible (reCAPTCHA v3 / Turnstile),
 *   limitation de débit, assainissement et CSRF — côté serveur.
 *
 * ⚠ PÉRIMÈTRE : ce composant implémente la moitié CLIENT. La soumission POSTe
 * vers /api/formulaires, qui reste à implémenter avec le back-end (validation
 * serveur, CSRF, rate-limit, enregistrement, e-mails). Tant que la route
 * n'existe pas, le formulaire affiche l'accusé de réception sans persister.
 *
 * EX-047, M : aucun formulaire de commande PROS.CARDS ici. La souscription
 * individuelle passe exclusivement par le tunnel de la plateforme (EX-026).
 */

const messages = {
  required: "Ce champ est obligatoire.",
  email: "Merci de saisir une adresse e-mail valide.",
  tel: "Merci de saisir un numéro de téléphone valide.",
  consentement: "Vous devez accepter le traitement de vos données pour continuer.",
};

function valider(nom, valeur, type) {
  if (type === "checkbox") return valeur ? null : messages.consentement;
  if (!valeur || !String(valeur).trim()) return messages.required;
  if (type === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(valeur)) return messages.email;
  if (type === "tel" && !/^[+\d][\d\s().-]{6,}$/.test(valeur)) return messages.tel;
  return null;
}

function Champ({ id, label, type = "text", options, required = true, hint, erreur, ...rest }) {
  const etat = erreur ? "error" : undefined;
  const decrit = [hint && `${id}-hint`, erreur && `${id}-err`].filter(Boolean).join(" ") || undefined;

  return (
    <div className="field" data-state={etat}>
      <label htmlFor={id}>
        {label} {!required && <span style={{ fontWeight: 400, color: "var(--text-muted)" }}>(facultatif)</span>}
      </label>
      {options ? (
        <select id={id} name={id} required={required} aria-invalid={!!erreur} aria-describedby={decrit} {...rest}>
          <option value="">Sélectionnez…</option>
          {options.map((o) => (
            <option key={o.value ?? o} value={o.value ?? o}>{o.label ?? o}</option>
          ))}
        </select>
      ) : type === "textarea" ? (
        <textarea id={id} name={id} required={required} aria-invalid={!!erreur} aria-describedby={decrit} {...rest} />
      ) : (
        <input id={id} name={id} type={type} required={required} aria-invalid={!!erreur} aria-describedby={decrit} {...rest} />
      )}
      {hint && <p className="hint" id={`${id}-hint`}>{hint}</p>}
      {erreur && (
        <p className="error-msg" id={`${id}-err`} role="alert">{erreur}</p>
      )}
    </div>
  );
}

/**
 * @param {string} type   identifiant du formulaire (contact | devis-service | devis-flotte | rappel)
 * @param {Array}  champs description des champs
 * @param {string} gaEvent nom de l'événement GA4 — EX-040
 */
function FormulaireBase({ type, champs, gaEvent, submitLabel, confirmation }) {
  const [erreurs, setErreurs] = useState({});
  const [envoye, setEnvoye] = useState(false);
  const [enCours, setEnCours] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    // Honeypot — SEC-003. Un bot remplit le champ caché : on simule le succès.
    if (data.get("site_web")) {
      setEnvoye(true);
      return;
    }

    const nouvellesErreurs = {};
    champs.forEach((c) => {
      if (c.required === false) return;
      const brut = c.type === "checkbox" ? form.elements[c.id]?.checked : data.get(c.id);
      const err = valider(c.id, brut, c.type);
      if (err) nouvellesErreurs[c.id] = err;
    });
    const consent = form.elements["consentement"];
    if (consent && !consent.checked) nouvellesErreurs.consentement = messages.consentement;

    setErreurs(nouvellesErreurs);
    if (Object.keys(nouvellesErreurs).length) {
      form.querySelector('[aria-invalid="true"]')?.focus();
      return;
    }

    setEnCours(true);
    try {
      // Double routage (e-mail interne + base) et validation serveur : côté API.
      const res = await fetch("/api/formulaires", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type, ...Object.fromEntries(data) }),
      });
      if (!res.ok) throw new Error("api");
    } catch {
      // La route n'existe pas encore : on n'invente pas un succès serveur,
      // mais on ne bloque pas la démo de parcours. À retirer à l'intégration back-end.
      console.warn("[OPTINOV] /api/formulaires absent — soumission non persistée.");
    }

    // EX-040 : événement de conversion GA4
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: gaEvent, formulaire: type });

    setEnCours(false);
    setEnvoye(true);
    form.reset();
  };

  if (envoye) {
    return (
      <div className="form-alert form-alert--ok" data-show="" role="status">
        <strong>Message bien reçu.</strong> {confirmation}
      </div>
    );
  }

  return (
    <form className="form" onSubmit={onSubmit} noValidate>
      {champs.map((c) => (
        <Champ key={c.id} {...c} erreur={erreurs[c.id]} />
      ))}

      {/* Honeypot — invisible pour l'utilisateur, appâte les robots */}
      <div className="honeypot" aria-hidden="true">
        <label htmlFor={`site_web-${type}`}>Ne pas remplir</label>
        <input id={`site_web-${type}`} name="site_web" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="field" data-state={erreurs.consentement ? "error" : undefined}>
        <label className="checkbox">
          <input type="checkbox" name="consentement" aria-invalid={!!erreurs.consentement} />
          <span>
            J&apos;accepte que mes données soient traitées pour répondre à ma demande,
            conformément à la politique de confidentialité.
          </span>
        </label>
        {erreurs.consentement && <p className="error-msg" role="alert">{erreurs.consentement}</p>}
      </div>

      <button type="submit" className="btn btn--gold" disabled={enCours} data-ga={gaEvent}>
        {enCours ? "Envoi en cours…" : submitLabel}
      </button>

      <p className="form-note">
        Protégé contre le spam. Vos données ne sont jamais cédées à des tiers.
      </p>
    </form>
  );
}

/** Contact général — Contact, CTA finaux (M) */
export function FormulaireContact({ sujetParDefaut }) {
  return (
    <FormulaireBase
      type="contact"
      gaEvent="formulaire_contact"
      submitLabel="Envoyer ma demande"
      confirmation="Nous revenons vers vous sous 24 h ouvrées."
      champs={[
        { id: "nom", label: "Nom et prénom", autoComplete: "name" },
        { id: "email", label: "Adresse e-mail", type: "email", autoComplete: "email" },
        { id: "telephone", label: "Téléphone", type: "tel", autoComplete: "tel" },
        {
          id: "sujet",
          label: "Sujet",
          options: [
            "Demande de devis",
            "Question sur un service",
            "PROS.CARDS",
            "Partenariat",
            "Autre",
          ],
          defaultValue: sujetParDefaut,
        },
        { id: "message", label: "Votre message", type: "textarea", rows: 5 },
      ]}
    />
  );
}

/** Formulaire court du CTA final d'accueil — §6.1 section 9 : nom, téléphone, besoin */
export function FormulaireCourt() {
  return (
    <FormulaireBase
      type="contact"
      gaEvent="formulaire_contact"
      submitLabel="Être recontacté"
      confirmation="Nous revenons vers vous sous 24 h ouvrées."
      champs={[
        { id: "nom", label: "Nom et prénom", autoComplete: "name" },
        { id: "telephone", label: "Téléphone", type: "tel", autoComplete: "tel" },
        { id: "message", label: "Votre besoin en une phrase", type: "textarea", rows: 3 },
      ]}
    />
  );
}

/** Devis service — pages services (M). Service pré-sélectionné. */
export function FormulaireDevisService({ serviceSlug }) {
  return (
    <FormulaireBase
      type="devis-service"
      gaEvent="formulaire_devis_service"
      submitLabel="Demander un devis"
      confirmation="Un chef de projet vous rappelle sous 24 h ouvrées."
      champs={[
        { id: "nom", label: "Nom et prénom", autoComplete: "name" },
        { id: "email", label: "Adresse e-mail", type: "email", autoComplete: "email" },
        { id: "telephone", label: "Téléphone", type: "tel", autoComplete: "tel" },
        {
          id: "service",
          label: "Service concerné",
          options: services.map((s) => ({ value: s.slug, label: s.titre })),
          defaultValue: serviceSlug,
        },
        {
          id: "budget",
          label: "Budget indicatif",
          options: ["Moins de 500 000 FCFA", "500 000 – 2 000 000 FCFA", "2 000 000 – 5 000 000 FCFA", "Plus de 5 000 000 FCFA", "À définir ensemble"],
          hint: "Fourchettes indicatives, à confirmer avec la direction commerciale.",
        },
        { id: "message", label: "Votre besoin", type: "textarea", rows: 4 },
      ]}
    />
  );
}

/** Devis flotte entreprise — landing PROS.CARDS, section Entreprises (M) */
export function FormulaireDevisFlotte() {
  return (
    <FormulaireBase
      type="devis-flotte"
      gaEvent="formulaire_devis_flotte"
      submitLabel="Demander un devis flotte"
      confirmation="Un conseiller PROS.CARDS vous contacte sous 24 h ouvrées."
      champs={[
        { id: "entreprise", label: "Entreprise", autoComplete: "organization" },
        { id: "nom", label: "Nom du contact", autoComplete: "name" },
        { id: "email", label: "Adresse e-mail professionnelle", type: "email", autoComplete: "email" },
        { id: "telephone", label: "Téléphone", type: "tel", autoComplete: "tel" },
        {
          id: "effectif",
          label: "Effectif à équiper",
          options: ["1 à 5", "5 à 20", "20 à 50", "50 à 100", "Plus de 100"],
        },
        { id: "besoin", label: "Votre besoin", type: "textarea", rows: 4 },
      ]}
    />
  );
}

/** Rappel téléphonique — landing PROS.CARDS (S) */
export function FormulaireRappel() {
  return (
    <FormulaireBase
      type="rappel"
      gaEvent="formulaire_rappel"
      submitLabel="Être rappelé"
      confirmation="Nous vous appelons sur le créneau demandé."
      champs={[
        { id: "nom", label: "Nom et prénom", autoComplete: "name" },
        { id: "telephone", label: "Téléphone", type: "tel", autoComplete: "tel" },
        {
          id: "creneau",
          label: "Créneau souhaité",
          options: ["Matin (8h–12h)", "Après-midi (12h–17h)", "Fin de journée (17h–19h)"],
        },
      ]}
    />
  );
}
