"use client";

import { useState, type FormEvent } from "react";
import { Icon } from "./Icon";
import { locations } from "../data/site-data";

export function VoucherForm() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitError("");
    setSubmitting(true);

    const formData = new FormData(event.currentTarget);
    const lead = {
      firstName: String(formData.get("firstName") || "").trim(),
      lastName: String(formData.get("lastName") || "").trim(),
      email: String(formData.get("email") || "").trim(),
      phone: String(formData.get("phone") || "").trim(),
      street: String(formData.get("street") || "").trim(),
      postalCode: String(formData.get("postalCode") || "").trim(),
      city: String(formData.get("addressCity") || "").trim(),
      location: String(formData.get("location") || "").trim(),
      consentEmail: formData.get("consentEmail") === "on",
      consentEmailMarketing: formData.get("consentEmailMarketing") === "on",
      consentMarketing: formData.get("consentMarketing") === "on",
      pageUrl: window.location.href,
    };

    try {
      const response = await fetch("/api/voucher-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(lead),
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok || result?.ok !== true) {
        throw new Error("Anfrage fehlgeschlagen");
      }
      setSubmitted(true);
    } catch {
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
    <form className="voucher-ticket-form" id="formular" onSubmit={handleSubmit}>
      <h2>SB-Wasch-Abo anfragen</h2>
      <div className="voucher-field-row">
        <label className="voucher-field">
          <span>Vorname</span>
          <input type="text" name="firstName" autoComplete="given-name" required />
        </label>
        <label className="voucher-field">
          <span>Nachname</span>
          <input type="text" name="lastName" autoComplete="family-name" required />
        </label>
      </div>
      <div className="voucher-field-row">
        <label className="voucher-field">
          <span>E-Mail-Adresse</span>
          <input type="email" name="email" autoComplete="email" required />
        </label>
        <label className="voucher-field">
          <span>Mobilnummer</span>
          <input type="tel" name="phone" autoComplete="tel" required />
        </label>
      </div>
      <label className="voucher-field">
        <span>Straße und Hausnummer</span>
        <input type="text" name="street" autoComplete="street-address" required />
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
          />
        </label>
        <label className="voucher-field">
          <span>Stadt</span>
          <input type="text" name="addressCity" autoComplete="address-level2" required />
        </label>
      </div>
      <label className="voucher-field">
        <span>Dein Standort</span>
        <select name="location" required defaultValue="">
          <option value="" disabled>
            Bitte wählen
          </option>
          {locations.map((location) => (
            <option key={location.slug} value={location.slug}>
              {location.city}
            </option>
          ))}
        </select>
      </label>

      <label className="voucher-checkbox">
        <input type="checkbox" name="consentEmail" required />
        <span>
          Ich möchte Informationen zum SB-Wasch-Abo erhalten und bin
          einverstanden, dass Waschbar mich dazu kontaktiert. <strong>*</strong>
        </span>
      </label>
      <label className="voucher-checkbox">
        <input type="checkbox" name="consentMarketing" />
        <span>
          Ich bin einverstanden, dass meine Daten zur Kampagnenmessung an
          Google/Meta übermittelt werden.
        </span>
      </label>
      <label className="voucher-checkbox">
        <input type="checkbox" name="consentEmailMarketing" />
        <span>
          Ich möchte regelmäßig per E-Mail Angebote, Erinnerungen und Aktionen
          von Waschbar erhalten. Ich kann mich jederzeit über den Abmeldelink
          in jeder E-Mail abmelden.
        </span>
      </label>

      {submitError && <p className="voucher-error">{submitError}</p>}

      <button
        className="button button-primary voucher-submit"
        type="submit"
        disabled={submitting}
      >
        {submitting ? "Wird gesendet..." : "Jetzt SB-Wasch-Abo anfragen"}{" "}
        <Icon name="card" />
      </button>
      <p className="voucher-note">
        <strong>*</strong> Pflichtfeld. Ohne diese Einwilligung können wir dir
        keine Informationen zum SB-Wasch-Abo zusenden.
      </p>
    </form>
  );
}
