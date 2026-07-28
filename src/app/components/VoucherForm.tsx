"use client";

import { useState, type FormEvent } from "react";
import { Icon } from "./Icon";
import { locations } from "../data/site-data";

export function VoucherForm() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="voucher-ticket-form voucher-form-success" id="formular">
        <Icon name="gift" />
        <h2>Fast geschafft!</h2>
        <p>
          Sobald der Versand aktiv ist, erhältst du deinen Gutschein-Code
          per E-Mail zugeschickt. Zeig ihn einfach in deinem Waschbar-Standort
          vor, um deine Kundenkarte mit 6,50 € Startguthaben abzuholen.
        </p>
      </div>
    );
  }

  return (
    <form className="voucher-ticket-form" id="formular" onSubmit={handleSubmit}>
      <h2>Jetzt anmelden</h2>
      <label className="voucher-field">
        <span>Vorname</span>
        <input type="text" name="firstName" autoComplete="given-name" required />
      </label>
      <label className="voucher-field">
        <span>E-Mail-Adresse</span>
        <input type="email" name="email" autoComplete="email" required />
      </label>
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
          Ich möchte den Gutschein per E-Mail erhalten. <strong>*</strong>
        </span>
      </label>
      <label className="voucher-checkbox">
        <input type="checkbox" name="consentMarketing" />
        <span>
          Ich bin einverstanden, dass meine Daten zur Kampagnenmessung an
          Google/Meta übermittelt werden.
        </span>
      </label>

      <button className="button button-primary voucher-submit" type="submit">
        6,50 € sichern <Icon name="gift" />
      </button>
      <p className="voucher-note">
        <strong>*</strong> Pflichtfeld. Ohne diese Einwilligung können wir dir
        den Gutschein nicht zusenden.
      </p>
    </form>
  );
}
