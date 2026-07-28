import type { Metadata } from "next";
import Image from "next/image";
import { CampaignHeader } from "../../components/CampaignHeader";
import { CampaignFooter } from "../../components/CampaignFooter";
import { VoucherForm } from "../../components/VoucherForm";
import { Icon } from "../../components/Icon";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "6,50 € Startguthaben + 10% Rabatt | Waschbar Kundenkarte",
  description:
    "Sichere dir die Waschbar Kundenkarte mit 6,50 € Startguthaben und dauerhaft 10% Rabatt in Heidelberg und Ludwigshafen.",
  robots: {
    index: false,
    follow: false,
  },
};

const proofItems = [
  {
    icon: "gift",
    title: "6,50 € Guthaben geschenkt",
    copy: "Direkt auf deine neue Kundenkarte geladen.",
  },
  {
    icon: "percent",
    title: "Danach dauerhaft 10% Rabatt",
    copy: "Auf jeden Waschgang und jede Trocknung.",
  },
  {
    icon: "pin",
    title: "Einlösbar in Heidelberg & Ludwigshafen",
    copy: "Wähl einfach deinen Standort im Formular.",
  },
];

const ticketBenefits = [
  { icon: "card", label: "Persönliche Waschbar Kundenkarte" },
  { icon: "gift", label: "6,50 € Startguthaben inklusive" },
  { icon: "percent", label: "Dauerhaft 10% Rabatt auf alles" },
];

const steps = [
  {
    icon: "card-hand",
    title: "Hier anmelden",
    copy: "Vorname, E-Mail und Standort eintragen - dauert unter 30 Sekunden.",
  },
  {
    icon: "mail",
    title: "Code per E-Mail erhalten",
    copy: "Wir schicken dir deinen persönlichen Gutschein-Code zu.",
  },
  {
    icon: "pin",
    title: "Im Salon vorzeigen",
    copy: "Code zeigen, Kundenkarte + Guthaben direkt vor Ort abholen.",
  },
];

export default function KundenkarteGuthabenPage() {
  return (
    <main className="campaign-page">
      <CampaignHeader />

      <section className="campaign-hero">
        <div className="campaign-hero-bg">
          <Image
            src="/images/waschbar-kundenkarte-banner-bg.png"
            alt=""
            fill
            priority
            sizes="100vw"
          />
        </div>
        <div className="campaign-hero-copy">
          <span className="campaign-badge">
            <Icon name="sparkle" /> Nur für kurze Zeit
          </span>
          <h1>
            <span className="campaign-hero-amount">6,50 €</span>
            Startguthaben{" "}
            <span className="campaign-hero-plus">+ 10% Rabatt</span>
          </h1>
          <p className="campaign-hero-text">
            Sichere dir jetzt die Waschbar Kundenkarte mit 6,50 € Guthaben
            geschenkt - und spare danach dauerhaft 10% auf jeden Waschgang
            in Heidelberg und Ludwigshafen.
          </p>
          <a className="button button-primary campaign-hero-cta" href="#formular">
            6,50 € sichern <Icon name="gift" />
          </a>
          <div className="campaign-hero-trust">
            <span>
              <Icon name="shield" /> Kostenlos
            </span>
            <span>
              <Icon name="clock" /> 30 Sekunden
            </span>
            <span>
              <Icon name="card" /> Keine Zahlungsdaten
            </span>
          </div>
        </div>
        <div className="campaign-hero-media">
          <div className="campaign-hero-glow" aria-hidden="true" />
          <Image
            src="/images/waschbar-kundenkarte-real-card.png"
            alt="Waschbar Kundenkarte"
            width={560}
            height={350}
            priority
            className="campaign-hero-card"
          />
        </div>
      </section>

      <section className="campaign-proof" aria-label="Vorteile des Angebots">
        {proofItems.map((item) => (
          <article key={item.title}>
            <span className="campaign-proof-icon">
              <Icon name={item.icon} />
            </span>
            <div>
              <strong>{item.title}</strong>
              <span className="campaign-proof-copy">{item.copy}</span>
            </div>
          </article>
        ))}
      </section>

      <section className="campaign-form-section" aria-label="Anmeldung">
        <div className="voucher-ticket">
          <aside className="voucher-ticket-stub">
            <p className="voucher-ticket-kicker">Dein Vorteil</p>
            <p className="voucher-ticket-amount">
              6,50 <span>€</span>
            </p>
            <p className="voucher-ticket-amount-label">Startguthaben geschenkt</p>
            <ul className="voucher-ticket-list">
              {ticketBenefits.map((benefit) => (
                <li key={benefit.label}>
                  <Icon name={benefit.icon} />
                  {benefit.label}
                </li>
              ))}
            </ul>
          </aside>
          <VoucherForm />
        </div>
      </section>

      <section className="campaign-steps" aria-label="So funktioniert's">
        <p className="section-kicker">So einfach geht&apos;s</p>
        <h2>So funktioniert&apos;s</h2>
        <div className="campaign-timeline">
          {steps.map((step, index) => (
            <article className="campaign-timeline-step" key={step.title}>
              <span className="campaign-timeline-icon">
                <Icon name={step.icon} />
              </span>
              <span className="campaign-timeline-number">{index + 1}</span>
              <h3>{step.title}</h3>
              <p>{step.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <CampaignFooter />
    </main>
  );
}
