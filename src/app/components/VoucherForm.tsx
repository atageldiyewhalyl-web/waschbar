"use client";

import { useRef, useState, type FormEvent } from "react";
import { Icon } from "./Icon";
import { locations } from "../data/site-data";

const defaultLeadEndpoint =
  "https://srnynewvauzymnljqskj.supabase.co/functions/v1/voucher-lead";
const leadEndpoint = (
  process.env.NEXT_PUBLIC_LEAD_CAPTURE_ENDPOINT || defaultLeadEndpoint
).replace(/\/$/, "");

export function VoucherForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [step, setStep] = useState(1);
  const [lead, setLead] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    street: "",
    postalCode: "",
    city: "",
    location: "",
    consentEmail: false,
    consentEmailMarketing: false,
    consentMarketing: false,
  });

  const steps = [
    "Standort",
    "Kontakt",
    "Adresse",
  ];

  const updateLead = (name: keyof typeof lead, value: string | boolean) => {
    setLead((currentLead) => ({ ...currentLead, [name]: value }));
  };

  const validateVisibleStep = () => {
    const fields = formRef.current?.querySelectorAll<HTMLInputElement | HTMLSelectElement>(
      "[data-step-panel] input, [data-step-panel] select",
    );

    if (!fields) return true;

    for (const field of Array.from(fields)) {
      if (!field.checkValidity()) {
        field.reportValidity();
        return false;
      }
    }

    return true;
  };

  const goToNextStep = () => {
    if (step === 1 && !lead.location) {
      setSubmitError("Bitte wähle deinen Waschbar Standort aus.");
      return;
    }
    if (!validateVisibleStep()) return;
    setSubmitError("");
    setStep((currentStep) => Math.min(currentStep + 1, steps.length));
  };

  const goToPreviousStep = () => {
    setSubmitError("");
    setStep((currentStep) => Math.max(currentStep - 1, 1));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validateVisibleStep()) return;

    setSubmitError("");
    setSubmitting(true);

    const payload = {
      firstName: lead.firstName.trim(),
      lastName: lead.lastName.trim(),
      email: lead.email.trim(),
      phone: lead.phone.trim(),
      street: lead.street.trim(),
      postalCode: lead.postalCode.trim(),
      city: lead.city.trim(),
      location: lead.location.trim(),
      consentEmail: lead.consentEmail,
      consentEmailMarketing: lead.consentEmailMarketing,
      consentMarketing: lead.consentMarketing,
      pageUrl: window.location.href,
    };

    try {
      const response = await fetch(leadEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok || result?.ok !== true) {
        throw new Error(
          typeof result?.error === "string" && result.error.trim()
            ? result.error
            : "Anfrage fehlgeschlagen",
        );
      }
      setSubmitted(true);
    } catch (error) {
      console.error("Voucher form submission failed", error);
      setSubmitError(
        "Deine Anfrage konnte nicht gesendet werden. Bitte versuche es erneut.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="voucher-ticket-form voucher-form-success" id="formular">
        <Icon name="card" />
        <h2>Fast geschafft!</h2>
        <p>
          Danke für deine Anfrage. Wir melden uns bei dir mit den nächsten
          Schritten zum SB-Wasch-Abo und deiner Waschbar Mitgliedskarte.
        </p>
      </div>
    );
  }

  return (
    <form className="voucher-ticket-form" id="formular" ref={formRef} onSubmit={handleSubmit}>
      <h2>SB-Wasch-Abo anfragen</h2>

      <div className="voucher-stepper" aria-label="Formular Fortschritt">
        {steps.map((stepLabel, index) => (
          <span
            className={index + 1 <= step ? "is-active" : ""}
            key={stepLabel}
            aria-current={index + 1 === step ? "step" : undefined}
          >
            {index + 1}
          </span>
        ))}
      </div>

      {step > 1 && (
        <p className="voucher-step-copy">
          {step === 2 &&
          "Damit wir dir den Vertrag schicken und Rückfragen schnell klären können."}
          {step === 3 &&
          "Die Adresse brauchen wir für deine Mitgliedskarte per Post."}
        </p>
      )}

      {step === 1 && (
        <div data-step-panel>
          <fieldset className="voucher-location-choice">
            <legend>Dein Standort</legend>
            <div className="voucher-location-options">
              {locations.map((location) => (
                <button
                  className={lead.location === location.slug ? "is-selected" : ""}
                  key={location.slug}
                  type="button"
                  onClick={() => {
                    updateLead("location", location.slug);
                    setSubmitError("");
                  }}
                >
                  <Icon name={location.slug === "heidelberg" ? "heidelberg" : "ludwigshafen"} />
                  <span>{location.city}</span>
                </button>
              ))}
            </div>
          </fieldset>
        </div>
      )}

      {step === 2 && (
        <div data-step-panel>
          <div className="voucher-field-row">
            <label className="voucher-field">
              <span>Vorname</span>
              <input
                type="text"
                name="firstName"
                autoComplete="given-name"
                required
                value={lead.firstName}
                onChange={(event) => updateLead("firstName", event.target.value)}
              />
            </label>
            <label className="voucher-field">
              <span>Nachname</span>
              <input
                type="text"
                name="lastName"
                autoComplete="family-name"
                required
                value={lead.lastName}
                onChange={(event) => updateLead("lastName", event.target.value)}
              />
            </label>
          </div>
          <label className="voucher-field">
            <span>E-Mail-Adresse</span>
            <input
              type="email"
              name="email"
              autoComplete="email"
              required
              value={lead.email}
              onChange={(event) => updateLead("email", event.target.value)}
            />
          </label>
          <label className="voucher-field">
            <span>Mobilnummer</span>
            <input
              type="tel"
              name="phone"
              autoComplete="tel"
              required
              value={lead.phone}
              onChange={(event) => updateLead("phone", event.target.value)}
            />
          </label>
        </div>
      )}

      {step === 3 && (
        <div data-step-panel>
          <label className="voucher-field">
            <span>Straße und Hausnummer</span>
            <input
              type="text"
              name="street"
              autoComplete="street-address"
              required
              value={lead.street}
              onChange={(event) => updateLead("street", event.target.value)}
            />
          </label>
          <div className="voucher-field-row">
            <label className="voucher-field">
              <span>PLZ</span>
              <input
                type="text"
                name="postalCode"
                inputMode="numeric"
                autoComplete="postal-code"
                required
                value={lead.postalCode}
                onChange={(event) => updateLead("postalCode", event.target.value)}
              />
            </label>
            <label className="voucher-field">
              <span>Stadt</span>
              <input
                type="text"
                name="addressCity"
                autoComplete="address-level2"
                required
                value={lead.city}
                onChange={(event) => updateLead("city", event.target.value)}
              />
            </label>
          </div>
          <label className="voucher-checkbox">
            <input
              type="checkbox"
              name="consentEmail"
              required
              checked={lead.consentEmail}
              onChange={(event) => updateLead("consentEmail", event.target.checked)}
            />
            <span>
              Ich möchte Informationen zum SB-Wasch-Abo erhalten und bin
              einverstanden, dass Waschbar mich dazu kontaktiert. <strong>*</strong>
            </span>
          </label>
          <label className="voucher-checkbox">
            <input
              type="checkbox"
              name="consentMarketing"
              checked={lead.consentMarketing}
              onChange={(event) => updateLead("consentMarketing", event.target.checked)}
            />
            <span>
              Ich bin einverstanden, dass meine Daten zur Kampagnenmessung an
              Google/Meta übermittelt werden.
            </span>
          </label>
          <label className="voucher-checkbox">
            <input
              type="checkbox"
              name="consentEmailMarketing"
              checked={lead.consentEmailMarketing}
              onChange={(event) => updateLead("consentEmailMarketing", event.target.checked)}
            />
            <span>
              Ich möchte regelmäßig per E-Mail Angebote, Erinnerungen und Aktionen
              von Waschbar erhalten. Ich kann mich jederzeit über den Abmeldelink
              in jeder E-Mail abmelden.
            </span>
          </label>
        </div>
      )}

      {submitError && <p className="voucher-error">{submitError}</p>}

      <div className="voucher-form-actions">
        {step > 1 && (
          <button
            className="button voucher-back"
            type="button"
            onClick={goToPreviousStep}
            disabled={submitting}
          >
            Zurück
          </button>
        )}
        {step < steps.length ? (
          <button className="button button-primary voucher-submit" type="button" onClick={goToNextStep}>
            Weiter <Icon name="card" />
          </button>
        ) : (
          <button
            className="button button-primary voucher-submit"
            type="submit"
            disabled={submitting}
          >
            {submitting ? "Wird gesendet..." : "Infos & Vertrag anfragen"}{" "}
            <Icon name="card" />
          </button>
        )}
      </div>
      <p className="voucher-note">
        <strong>*</strong> Pflichtfeld. Ohne diese Einwilligung können wir dir
        keine Informationen zum SB-Wasch-Abo zusenden.
      </p>
    </form>
  );
}
