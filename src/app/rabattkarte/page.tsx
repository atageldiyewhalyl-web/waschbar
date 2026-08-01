import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Icon } from "../components/Icon";
import { PriceCard } from "../components/PriceCard";
import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";
import { locations, priceItems } from "../data/site-data";
import { absoluteUrl } from "../seo";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Waschbar Rabattkarte | Bis zu 25% Ladebonus",
  description:
    "Die Waschbar Rabattkarte bekommst du direkt im Waschsalon am Terminal. Guthaben bar, mit Karte oder kontaktlos aufladen und Bonusguthaben sofort nutzen.",
  alternates: {
    canonical: "/rabattkarte",
  },
  openGraph: {
    title: "Waschbar Rabattkarte | Bis zu 25% Ladebonus",
    description:
      "Rabattkarte im Waschsalon kaufen, Guthaben aufladen und bis zu 25% Bonusguthaben erhalten.",
    url: absoluteUrl("/rabattkarte"),
    type: "website",
    images: ["/images/rabattkarte-hero-latest.png"],
  },
};

const bonusRows = [
  { load: "10 €", credit: "11,00 €", bonus: "10%", progress: "40%" },
  { load: "20 €", credit: "23,00 €", bonus: "15%", progress: "60%" },
  { load: "30 €", credit: "36,00 €", bonus: "20%", progress: "80%" },
  { load: "50 €", credit: "62,50 €", bonus: "25%", progress: "100%" },
];

const processSteps = [
  {
    icon: "card",
    title: "Karte kaufen",
    copy: "Rabattkarte direkt am Kassenautomaten im Waschsalon erhalten.",
  },
  {
    icon: "wallet-plus",
    title: "Guthaben aufladen",
    copy: "Betrag wählen und bar, mit Karte oder kontaktlos aufladen.",
  },
  {
    icon: "gift",
    title: "Bonus wird gutgeschrieben",
    copy: "Dein Bonusguthaben wird automatisch auf die Karte geladen.",
  },
  {
    icon: "washer",
    title: "Maschine auswählen",
    copy: "Waschmaschine oder Trockner am Terminal wählen und starten.",
  },
  {
    icon: "shield",
    title: "Mit Karte bezahlen",
    copy: "Rabattkarte ans Lesegerät halten und Zahlung bestätigen.",
  },
];

const getItItems = [
  {
    icon: "card-hand",
    title: "Am Kassenautomaten",
    copy: "Karte direkt vor Ort kaufen, aufladen und sofort nutzen.",
  },
  {
    icon: "wallet-plus",
    title: "Bar, Karte, kontaktlos",
    copy: "Guthaben flexibel aufladen: bar, per Karte oder kontaktlos.",
  },
  {
    icon: "shield",
    title: "Keine App, keine Anmeldung",
    copy: "Einfach Karte nutzen. Kein Konto, kein Abo, kein Aufwand.",
  },
];

export default function RabattkartePage() {
  return (
    <main className="site-shell rabatt-page">
      <SiteHeader />

      <section className="rabatt-hero">
        <div className="rabatt-hero-copy">
          <h1>
            <span>Mit der Rabattkarte</span>
            <span>sparst du bis zu 25%</span>
          </h1>
          <h2>Kaufen. Aufladen. Waschen.</h2>
          <p>
            Die Waschbar Rabattkarte bekommst du direkt im Salon am Terminal.
            Lade Guthaben bar, mit Karte oder kontaktlos auf und nutze dein
            Bonusguthaben sofort in Heidelberg und Ludwigshafen.
          </p>
          <div className="rabatt-hero-actions">
            <a className="button button-primary" href="#ablauf">
              Ablauf ansehen
            </a>
            <Link className="button rabatt-button-secondary" href="/angebote/kundenkarte-guthaben">
              10 € Gratis sichern <Icon name="gift" />
            </Link>
          </div>
        </div>

        <div className="rabatt-hero-visual" aria-label="Waschbar Rabattkarte im Waschsalon">
          <Image
            src="/images/rabattkarte-hero-latest.png"
            alt="Waschbar Logo an Holzlamellenwand"
            fill
            priority
            sizes="100vw"
          />
        </div>
      </section>

      <section className="rabatt-process section" id="ablauf">
        <div className="rabatt-process-visual">
          <Image
            src="/images/rabattkarte-terminal-wall-realistic.png"
            alt="Realistischer Waschbar Kassenautomat mit Waschmittelstation"
            width={1024}
            height={1536}
            sizes="(max-width: 900px) 78vw, 34vw"
          />
        </div>
        <div className="rabatt-process-copy">
          <p className="section-kicker">Ablauf</p>
          <h2>So funktioniert die Karte</h2>
          <div className="rabatt-step-list">
            {processSteps.map((step, index) => (
              <article key={step.title}>
                <span className="rabatt-step-number">{index + 1}</span>
                <span className="rabatt-step-icon">
                  <Icon name={step.icon} />
                </span>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.copy}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="rabatt-bonus section" id="bonus">
        <p className="section-kicker rabatt-bonus-kicker">Ladebonus</p>

        <div className="rabatt-bonus-summary">
          <div className="rabatt-bonus-heading">
            <h2>Mehr aufladen. Mehr Guthaben bekommen.</h2>
            <p>
              Dein Bonus wird automatisch gutgeschrieben. Du lädst einen Betrag
              auf und nutzt das höhere Guthaben direkt für Waschen oder Trocknen.
            </p>
          </div>
          <div className="rabatt-bonus-max" aria-label="Bis zu 25 Prozent Ladebonus">
            <span>bis zu</span>
            <strong>25%</strong>
            <span>Ladebonus</span>
          </div>
        </div>

        <div className="rabatt-bonus-ladder">
          {bonusRows.map((row) => (
            <article key={row.load}>
              <div className="rabatt-bonus-load">
                <span>Du lädst</span>
                <strong>{row.load}</strong>
              </div>
              <div className="rabatt-bonus-flow">
                <span style={{ width: row.progress }} />
              </div>
              <div className="rabatt-bonus-credit">
                <span>Du erhältst</span>
                <strong>{row.credit} Guthaben</strong>
              </div>
              <div className="rabatt-bonus-percent">
                <strong>{row.bonus}</strong>
                <span>Bonus</span>
              </div>
            </article>
          ))}
        </div>

        <section className="price-section rabatt-price-section" aria-label="Preise mit Rabattkarte">
          <p className="section-kicker">Preise</p>
          <h2>Klare Preise für Waschen und Trocknen</h2>
          <p className="section-copy">
            Am Terminal wählst du die passende Maschine aus und siehst sofort,
            ob sie frei ist. Mit der Waschbar Rabattkarte lädst du Guthaben auf
            und erhältst je nach Ladebetrag bis zu 25% Bonusguthaben.
          </p>
          <div className="price-grid">
            {priceItems.map((item) => (
              <PriceCard item={item} key={item.title} />
            ))}
          </div>
        </section>
      </section>

      <section className="rabatt-get section">
        <div className="rabatt-get-heading">
          <p className="section-kicker">Vor Ort erhältlich</p>
          <h2>Hol dir die Rabattkarte direkt im Waschsalon</h2>
          <p>
            Kein Konto, keine App, keine Anmeldung. Karte am Automaten holen,
            Guthaben aufladen und direkt mit Bonus bezahlen.
          </p>
        </div>

        <div className="rabatt-get-flow">
          {getItItems.map((item, index) => (
            <article key={item.title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <Icon name={item.icon} />
              <div>
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="maps-proof-grid rabatt-location-maps" aria-label="Waschbar Standorte auf Google Maps">
          {locations.map((location) => (
            <article className="maps-card" key={location.slug}>
              <iframe
                src={location.mapEmbedUrl}
                title={`${location.name} auf Google Maps`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
              <div className="maps-card-footer">
                <Icon name="pin" />
                <div>
                  <span>{location.city}</span>
                  <strong>{location.address}</strong>
                </div>
                <a
                  href={location.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Google Maps öffnen
                </a>
              </div>
            </article>
          ))}
        </div>

        <div className="rabatt-offer-cta">
          <Link className="button button-primary" href="/angebote/kundenkarte-guthaben">
            Jetzt 10 € Gratis-Guthaben sichern! <Icon name="gift" />
          </Link>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
