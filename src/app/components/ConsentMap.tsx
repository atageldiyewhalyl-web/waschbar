"use client";

import Link from "next/link";
import { useConsent } from "./ConsentProvider";

export function ConsentMap({ src, title }: { src: string; title: string }) {
  const { choices, allowExternalMedia } = useConsent();

  if (choices.externalMedia) {
    return (
      <iframe
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        src={src}
        title={title}
      />
    );
  }

  return (
    <div className="consent-map" role="group" aria-label={`${title} – externe Karte blockiert`}>
      <div className="consent-map-pin" aria-hidden="true">⌖</div>
      <strong>Google Maps ist deaktiviert</strong>
      <p>
        Beim Laden werden Daten an Google übertragen. Details stehen in unserer{" "}
        <Link href="/datenschutz">Datenschutzerklärung</Link>.
      </p>
      <button onClick={allowExternalMedia} type="button">Google Maps zulassen</button>
    </div>
  );
}
