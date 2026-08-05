import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Icon } from "../components/Icon";
import { PriceCard } from "../components/PriceCard";
import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";
import { locations, priceItems, rabattkarteFaqs } from "../data/site-data";
import { absoluteUrl } from "../seo";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Waschbar Mitgliedskarte | SB-Wasch-Abo für 29,99 €",
  description:
    "Mit der Waschbar Mitgliedskarte nutzt du das SB-Wasch-Abo in Heidelberg: 10 Waschgänge und 10 Trocknergänge je 20 Minuten für 29,99 € im Monat.",
  alternates: {
    canonical: "/rabattkarte",
  },
  openGraph: {
    title: "Waschbar Mitgliedskarte | SB-Wasch-Abo für 29,99 €",
    description:
      "Das erste SB-Wasch-Abo in Heidelberg: 10 Waschgänge und 10 Trocknergänge je 20 Minuten für 29,99 € im Monat.",
    url: absoluteUrl("/rabattkarte"),
    type: "website",
    images: ["/images/rabattkarte-hero-latest.webp"],
  },
};

const aboRows = [
  {
    label: "Preis",
    value: "29,99 €",
    detail: "statt regulär 85 €",
    accent: "Fixpreis",
    note: "monatlich",
    progress: "100%",
  },
  {
    label: "Waschen",
    value: "10 Waschgänge",
    detail: "für deine regelmäßigen Waschtage",
    accent: "inklusive",
    note: "im Abo",
    progress: "78%",
  },
  {
    label: "Trocknen",
    value: "10 Trocknergänge",
    detail: "je 20 Minuten",
    accent: "inklusive",
    note: "im Abo",
    progress: "78%",
  },
  {
    label: "Ersparnis",
    value: "über 60%",
    detail: "gegenüber Einzelpreisen",
    accent: "sparen",
    note: "mit Karte",
    progress: "86%",
  },
];

const processSteps = [
  {
    icon: "mail",
    title: "Abo anfragen",
    copy: "Formular ausfüllen und deinen Waschbar Standort auswählen.",
  },
  {
    icon: "card",
    title: "Vertrag erhalten",
    copy: "Wir senden dir den Vertrag bequem per E-Mail zu.",
  },
  {
    icon: "shield",
    title: "Online bestätigen",
    copy: "Vertrag prüfen und digital akzeptieren.",
  },
  {
    icon: "card-hand",
    title: "Karte erhalten",
    copy: "Deine Mitgliedskarte kommt innerhalb von ca. 4 Tagen zu dir nach Hause.",
  },
  {
    icon: "washer",
    title: "Abo nutzen",
    copy: "Mitgliedskarte an der Maschine nutzen und dein monatliches Kontingent starten.",
  },
];

function RabattkarteJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Product",
        name: "Waschbar Mitgliedskarte – SB-Wasch-Abo",
        description:
          "Das SB-Wasch-Abo mit der Waschbar Mitgliedskarte: 10 Waschgänge und 10 Trocknergänge je 20 Minuten für 29,99 € im Monat, gültig in Heidelberg und Ludwigshafen.",
        brand: { "@type": "Brand", name: "Waschbar" },
        url: absoluteUrl("/rabattkarte"),
        offers: {
          "@type": "Offer",
          price: "29.99",
          priceCurrency: "EUR",
          availability: "https://schema.org/InStock",
          url: absoluteUrl("/rabattkarte"),
          seller: { "@id": `${absoluteUrl("/")}#organization` },
        },
      },
      {
        "@type": "FAQPage",
        mainEntity: rabattkarteFaqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Waschbar", item: absoluteUrl("/") },
          {
            "@type": "ListItem",
            position: 2,
            name: "Mitgliedskarte",
            item: absoluteUrl("/rabattkarte"),
          },
        ],
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

const getItItems = [
  {
    icon: "washer",
    title: "10 Waschgänge",
    copy: "Jeden Monat für deine regelmäßigen Waschtage inklusive.",
  },
  {
    icon: "clock",
    title: "10 Trocknergänge",
    copy: "Je 20 Minuten trocknen - direkt an unseren modernen Maschinen.",
  },
  {
    icon: "percent",
    title: "Über 60% sparen",
    copy: "Für 29,99 € im Monat statt regulär 85 € Einzelpreis.",
  },
];

export default function RabattkartePage() {
  return (
    <main className="site-shell rabatt-page">
      <RabattkarteJsonLd />
      <SiteHeader />

      <section className="rabatt-hero">
        <div className="rabatt-hero-copy">
          <h1>
            <span>SB-Wasch-Abo mit</span>
            <span>Waschbar Mitgliedskarte</span>
          </h1>
          <h2>Mehr waschen. Weniger zahlen.</h2>
          <p>
            Das erste SB-Wasch-Abo in Heidelberg: Für 29,99 € im Monat bekommst
            du 10 Waschgänge und 10 Trocknergänge je 20 Minuten. Deine
            Mitgliedskarte kommt bequem zu dir nach Hause und ist dein Zugang zum
            monatlichen Kontingent.
          </p>
          <div className="rabatt-hero-actions">
            <a className="button button-primary" href="#ablauf">
              Ablauf ansehen
            </a>
            <Link className="button rabatt-button-secondary" href="/angebote/kundenkarte-guthaben">
              Abo heute sichern <Icon name="card" />
            </Link>
          </div>
        </div>

        <div className="rabatt-hero-visual" aria-label="Waschbar Mitgliedskarte im Waschsalon">
          <Image
            src="/images/rabattkarte-hero-latest.webp"
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
            src="/images/rabattkarte-terminal-wall-realistic.webp"
            alt="Realistischer Waschbar Kassenautomat mit Waschmittelstation"
            width={1024}
            height={1536}
            sizes="(max-width: 900px) 78vw, 34vw"
          />
        </div>
        <div className="rabatt-process-copy">
          <p className="section-kicker">Ablauf</p>
          <h2>So kommst du zu deinem SB-Wasch-Abo</h2>
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
        <p className="section-kicker rabatt-bonus-kicker">SB-Wasch-Abo</p>

        <div className="rabatt-bonus-summary">
          <div className="rabatt-bonus-heading">
            <h2>Ein monatliches Kontingent zum fairen Fixpreis.</h2>
            <p>
              Statt jedes Mal einzeln zu zahlen, nutzt du dein Abo-Kontingent
              direkt mit der Waschbar Mitgliedskarte. Ideal, wenn du regelmäßig
              wäschst und deine Kosten klar planen möchtest.
            </p>
          </div>
          <div className="rabatt-bonus-max" aria-label="Über 60 Prozent Ersparnis">
            <span>spare</span>
            <strong>60%</strong>
            <span>und mehr</span>
          </div>
        </div>

        <div className="rabatt-bonus-ladder">
          {aboRows.map((row) => (
            <article key={row.label}>
              <div className="rabatt-bonus-load">
                <span>{row.label}</span>
                <strong>{row.value}</strong>
              </div>
              <div className="rabatt-bonus-flow">
                <span style={{ width: row.progress }} />
              </div>
              <div className="rabatt-bonus-credit">
                <span>Im Abo</span>
                <strong>{row.detail}</strong>
              </div>
              <div className="rabatt-bonus-percent">
                <strong>{row.accent}</strong>
                <span>{row.note}</span>
              </div>
            </article>
          ))}
        </div>

        <section className="price-section rabatt-price-section" aria-label="Preise mit Mitgliedskarte">
          <p className="section-kicker">Preise</p>
          <h2>Klare Preise für Waschen und Trocknen</h2>
          <p className="section-copy">
            Am Terminal wählst du die passende Maschine aus und siehst sofort,
            ob sie frei ist. Mit dem SB-Wasch-Abo nutzt du jeden Monat 10
            Waschgänge und 10 Trocknergänge je 20 Minuten für 29,99 €.
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
          <p className="section-kicker">Enthalten</p>
          <h2>Alles drin für deine regelmäßigen Waschtage</h2>
          <p>
            Anfrage senden, Vertrag per E-Mail bestätigen und schon bekommst du
            deine Mitgliedskarte per Post. Danach kannst du dein monatliches
            Kontingent direkt im Waschsalon nutzen.
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
            SB-Wasch-Abo heute sichern! <Icon name="card" />
          </Link>
        </div>
      </section>

      <section className="section faq-section" id="faq">
        <div className="faq-copy">
          <p className="section-kicker">FAQ</p>
          <h2>Häufige Fragen zum SB-Wasch-Abo</h2>
          <span className="section-rule" aria-hidden="true" />
          <div className="faq-list">
            {rabattkarteFaqs.map((faq) => (
              <details className="faq-item" key={faq.question}>
                <summary>
                  <span className="faq-question">{faq.question}</span>
                  <span className="faq-toggle" aria-hidden="true" />
                </summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
