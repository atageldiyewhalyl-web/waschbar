"use client";

import Link from "next/link";
import Script from "next/script";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

const CONSENT_STORAGE_KEY = "waschbar_consent_v1";
const CONSENT_VERSION = 1;
const CONSENT_LIFETIME_MS = 180 * 24 * 60 * 60 * 1000;

const GOOGLE_ANALYTICS_ID = "G-0E5Z13JD69";
const GOOGLE_ADS_ID = "AW-18362633854";
const META_PIXEL_ID = "937114909420037";

export type ConsentChoices = {
  analytics: boolean;
  marketing: boolean;
  externalMedia: boolean;
};

type StoredConsent = ConsentChoices & {
  version: number;
  decidedAt: string;
  expiresAt: string;
};

type ConsentContextValue = {
  choices: ConsentChoices;
  hasDecision: boolean;
  openSettings: () => void;
  allowExternalMedia: () => void;
};

type GoogleConsentState = "granted" | "denied";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    fbq?: ((...args: unknown[]) => void) & {
      callMethod?: (...args: unknown[]) => void;
      queue?: unknown[][];
      loaded?: boolean;
      version?: string;
      push?: (...args: unknown[]) => void;
    };
    _fbq?: Window["fbq"];
  }
}

const defaultChoices: ConsentChoices = {
  analytics: false,
  marketing: false,
  externalMedia: false,
};

const ConsentContext = createContext<ConsentContextValue | null>(null);

function parseStoredConsent(): StoredConsent | null {
  try {
    const rawConsent = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    if (!rawConsent) return null;

    const parsed = JSON.parse(rawConsent) as Partial<StoredConsent>;
    const isValid =
      parsed.version === CONSENT_VERSION &&
      typeof parsed.analytics === "boolean" &&
      typeof parsed.marketing === "boolean" &&
      typeof parsed.externalMedia === "boolean" &&
      typeof parsed.decidedAt === "string" &&
      typeof parsed.expiresAt === "string" &&
      Date.parse(parsed.expiresAt) > Date.now();

    if (!isValid) {
      window.localStorage.removeItem(CONSENT_STORAGE_KEY);
      return null;
    }

    return parsed as StoredConsent;
  } catch {
    window.localStorage.removeItem(CONSENT_STORAGE_KEY);
    return null;
  }
}

function persistConsent(choices: ConsentChoices) {
  const decidedAt = new Date();
  const storedConsent: StoredConsent = {
    ...choices,
    version: CONSENT_VERSION,
    decidedAt: decidedAt.toISOString(),
    expiresAt: new Date(decidedAt.getTime() + CONSENT_LIFETIME_MS).toISOString(),
  };

  try {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(storedConsent));
  } catch {
    // The current page can still respect the choice when browser storage is unavailable.
  }
}

function ensureGoogleConsentApi() {
  window.dataLayer = window.dataLayer || [];
  window.gtag =
    window.gtag ||
    function gtag(...args: unknown[]) {
      window.dataLayer?.push(args);
    };
}

function updateGoogleConsent(choices: ConsentChoices) {
  ensureGoogleConsentApi();
  const analyticsStorage: GoogleConsentState = choices.analytics ? "granted" : "denied";
  const advertisingStorage: GoogleConsentState = choices.marketing ? "granted" : "denied";

  window.gtag?.("consent", "update", {
    analytics_storage: analyticsStorage,
    ad_storage: advertisingStorage,
    ad_user_data: advertisingStorage,
    ad_personalization: advertisingStorage,
  });
}

function deleteFirstPartyTrackingCookies() {
  const cookieNames = document.cookie
    .split(";")
    .map((cookie) => cookie.split("=")[0]?.trim())
    .filter(
      (name): name is string =>
        Boolean(name) &&
        (name === "_ga" ||
          name.startsWith("_ga_") ||
          name.startsWith("_gcl_") ||
          name === "_fbp" ||
          name === "_fbc"),
    );

  for (const name of cookieNames) {
    document.cookie = `${name}=; Max-Age=0; Path=/; SameSite=Lax`;
    document.cookie = `${name}=; Max-Age=0; Path=/; Domain=.${window.location.hostname}; SameSite=Lax`;
  }
}

function initialiseMetaPixel() {
  if (window.fbq) {
    window.fbq("consent", "grant");
    return;
  }

  const fbq: NonNullable<Window["fbq"]> = (...args: unknown[]) => {
    if (fbq.callMethod) {
      fbq.callMethod(...args);
    } else {
      fbq.queue?.push(args);
    }
  };

  fbq.queue = [];
  fbq.loaded = true;
  fbq.version = "2.0";
  fbq.push = fbq;
  window.fbq = fbq;
  window._fbq = fbq;

  const script = document.createElement("script");
  script.async = true;
  script.src = "https://connect.facebook.net/en_US/fbevents.js";
  script.dataset.consentService = "meta-pixel";
  document.head.appendChild(script);

  fbq("consent", "grant");
  fbq("init", META_PIXEL_ID);
  fbq("track", "PageView");
}

function CookieSettings({
  choices,
  onSave,
  onClose,
}: {
  choices: ConsentChoices;
  onSave: (choices: ConsentChoices) => void;
  onClose: () => void;
}) {
  const [draft, setDraft] = useState(choices);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const previouslyFocused = document.activeElement;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    closeButtonRef.current?.focus();
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      if (previouslyFocused instanceof HTMLElement) previouslyFocused.focus();
    };
  }, [onClose]);

  return (
    <div className="consent-modal-backdrop" role="presentation" onMouseDown={onClose}>
      <section
        aria-labelledby="cookie-settings-title"
        aria-modal="true"
        className="consent-modal"
        role="dialog"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="consent-modal-heading">
          <div>
            <p className="consent-eyebrow">Datenschutz-Einstellungen</p>
            <h2 id="cookie-settings-title">Du entscheidest, was geladen wird.</h2>
          </div>
          <button
            aria-label="Einstellungen schließen"
            className="consent-close"
            onClick={onClose}
            ref={closeButtonRef}
            type="button"
          >
            ×
          </button>
        </div>

        <p className="consent-intro">
          Optionale Dienste bleiben aus, bis du zustimmst. Deine Auswahl kannst du jederzeit über
          „Cookie-Einstellungen“ im Footer ändern.
        </p>

        <div className="consent-options">
          <div className="consent-option">
            <div>
              <strong>Notwendig</strong>
              <p>Speichert ausschließlich deine Auswahl für sechs Monate.</p>
            </div>
            <span className="consent-always-on">Immer aktiv</span>
          </div>

          <label className="consent-option">
            <div>
              <strong>Statistik</strong>
              <p>Google Analytics hilft uns zu verstehen, wie die Website genutzt wird.</p>
            </div>
            <input
              checked={draft.analytics}
              onChange={(event) => setDraft((current) => ({ ...current, analytics: event.target.checked }))}
              type="checkbox"
            />
          </label>

          <label className="consent-option">
            <div>
              <strong>Marketing</strong>
              <p>Google Ads und Meta Pixel messen Kampagnen und erfolgreiche Abo-Anfragen.</p>
            </div>
            <input
              checked={draft.marketing}
              onChange={(event) => setDraft((current) => ({ ...current, marketing: event.target.checked }))}
              type="checkbox"
            />
          </label>

          <label className="consent-option">
            <div>
              <strong>Externe Medien</strong>
              <p>Google Maps wird erst nach deiner Freigabe eingebettet.</p>
            </div>
            <input
              checked={draft.externalMedia}
              onChange={(event) =>
                setDraft((current) => ({ ...current, externalMedia: event.target.checked }))
              }
              type="checkbox"
            />
          </label>
        </div>

        <p className="consent-details-link">
          Details zu Anbietern, Daten, Speicherdauer und Widerruf findest du in unserer{" "}
          <Link href="/datenschutz">Datenschutzerklärung</Link>.
        </p>

        <div className="consent-modal-actions">
          <button className="consent-button consent-button-secondary" onClick={() => onSave(defaultChoices)} type="button">
            Nur notwendige
          </button>
          <button className="consent-button consent-button-primary" onClick={() => onSave(draft)} type="button">
            Auswahl speichern
          </button>
        </div>
      </section>
    </div>
  );
}

export function ConsentProvider({ children }: { children: ReactNode }) {
  const [choices, setChoices] = useState<ConsentChoices>(defaultChoices);
  const [hasDecision, setHasDecision] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    const storedConsent = parseStoredConsent();
    let isActive = true;

    queueMicrotask(() => {
      if (!isActive) return;
      if (storedConsent) {
        setChoices({
          analytics: storedConsent.analytics,
          marketing: storedConsent.marketing,
          externalMedia: storedConsent.externalMedia,
        });
        setHasDecision(true);
      }
      setIsReady(true);
    });

    return () => {
      isActive = false;
    };
  }, []);

  useEffect(() => {
    if (!isReady || !hasDecision) return;

    updateGoogleConsent(choices);

    if (choices.analytics) {
      window.gtag?.("config", GOOGLE_ANALYTICS_ID, {
        anonymize_ip: true,
        allow_google_signals: false,
        allow_ad_personalization_signals: false,
      });
    }

    if (choices.marketing) {
      window.gtag?.("config", GOOGLE_ADS_ID);
      initialiseMetaPixel();
    } else {
      window.fbq?.("consent", "revoke");
    }
  }, [choices, hasDecision, isReady]);

  const saveChoices = useCallback((nextChoices: ConsentChoices) => {
    const analyticsWasRevoked = choices.analytics && !nextChoices.analytics;
    const marketingWasRevoked = choices.marketing && !nextChoices.marketing;

    persistConsent(nextChoices);
    setChoices(nextChoices);
    setHasDecision(true);
    setShowSettings(false);

    if (analyticsWasRevoked || marketingWasRevoked) {
      deleteFirstPartyTrackingCookies();
    }
  }, [choices]);

  const allowExternalMedia = useCallback(() => {
    saveChoices({ ...choices, externalMedia: true });
  }, [choices, saveChoices]);

  useEffect(() => {
    const openSettings = () => setShowSettings(true);
    window.addEventListener("waschbar:open-consent", openSettings);
    return () => window.removeEventListener("waschbar:open-consent", openSettings);
  }, []);

  const contextValue = useMemo<ConsentContextValue>(
    () => ({
      choices,
      hasDecision,
      openSettings: () => setShowSettings(true),
      allowExternalMedia,
    }),
    [allowExternalMedia, choices, hasDecision],
  );

  const shouldLoadGoogleTag = hasDecision && (choices.analytics || choices.marketing);

  return (
    <ConsentContext.Provider value={contextValue}>
      {children}

      {shouldLoadGoogleTag && (
        <Script
          id="waschbar-google-tag"
          onLoad={() => {
            updateGoogleConsent(choices);
            if (choices.analytics) {
              window.gtag?.("config", GOOGLE_ANALYTICS_ID, {
                anonymize_ip: true,
                allow_google_signals: false,
                allow_ad_personalization_signals: false,
              });
            }
            if (choices.marketing) window.gtag?.("config", GOOGLE_ADS_ID);
          }}
          src={`https://www.googletagmanager.com/gtag/js?id=${
            choices.analytics ? GOOGLE_ANALYTICS_ID : GOOGLE_ADS_ID
          }`}
          strategy="afterInteractive"
        />
      )}

      {isReady && !hasDecision && (
        <section aria-label="Cookie-Einwilligung" className="consent-banner" role="region">
          <div className="consent-banner-copy">
            <p className="consent-eyebrow">Deine Privatsphäre</p>
            <h2>Optionale Dienste nur mit deiner Zustimmung.</h2>
            <p>
              Wir verwenden notwendige Speicherung für deine Auswahl. Statistik, Marketing und Google Maps
              laden wir erst, wenn du zustimmst. Mehr in der <Link href="/datenschutz">Datenschutzerklärung</Link>.
            </p>
          </div>
          <div className="consent-banner-actions">
            <button className="consent-button consent-button-primary" onClick={() => saveChoices(defaultChoices)} type="button">
              Nur notwendige
            </button>
            <button className="consent-button consent-button-secondary" onClick={() => setShowSettings(true)} type="button">
              Einstellungen
            </button>
            <button
              className="consent-button consent-button-primary"
              onClick={() => saveChoices({ analytics: true, marketing: true, externalMedia: true })}
              type="button"
            >
              Alle akzeptieren
            </button>
          </div>
        </section>
      )}

      {showSettings && (
        <CookieSettings choices={choices} onClose={() => setShowSettings(false)} onSave={saveChoices} />
      )}
    </ConsentContext.Provider>
  );
}

export function useConsent() {
  const context = useContext(ConsentContext);
  if (!context) throw new Error("useConsent must be used inside ConsentProvider");
  return context;
}

export function trackLeadConversion() {
  const storedConsent = parseStoredConsent();
  if (!storedConsent?.marketing) return;

  window.gtag?.("event", "conversion", {
    send_to: `${GOOGLE_ADS_ID}/CZNbCPSSwdwcEP6c_rNE`,
    value: 1,
    currency: "EUR",
  });
  window.fbq?.("track", "Lead", {
    content_name: "SB-Wasch-Abo Form Success",
    content_category: "Website Lead",
    lead_type: "Kundenkarte Guthaben",
  });
}
