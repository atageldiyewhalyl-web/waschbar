"use client";

import { useConsent } from "./ConsentProvider";

export function ConsentSettingsButton({ className = "" }: { className?: string }) {
  const { openSettings } = useConsent();

  return (
    <button className={`consent-settings-link ${className}`.trim()} onClick={openSettings} type="button">
      Cookie-Einstellungen
    </button>
  );
}
