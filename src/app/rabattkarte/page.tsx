import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Icon } from "../components/Icon";
import { PriceCard } from "../components/PriceCard";
import { SiteFooter } from "../components/SiteFooter";
import { ConsentMap } from "../components/ConsentMap";
import { SiteHeader } from "../components/SiteHeader";
import { locations, priceItems, rabattkarteFaqs } from "../data/site-data";
import { absoluteUrl } from "../seo";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Waschbar Mitgliedskarte | 10 % Rabatt + 6,50 € Startguthaben",
  description:
    "Mit der Waschbar Mitgliedskarte sparst du 10 % auf jeden Waschgang und Trockner. Zeitlich begrenzt: 6,50 € Startguthaben beim Kauf, ein Waschgang und 10 Minuten Trocknen gratis.",
  alternates: {
    canonical: "/rabattkarte",
  },
  openGraph: {
    title: "Waschbar Mitgliedskarte | 10 % Rabatt + 6,50 € Startguthaben",
    description:
      "10 % Rabatt auf jeden Einkauf. Zeitlich begrenzt: 6,50 € Startguthaben beim Kauf der Mitgliedskarte.",
    url: absoluteUrl("/rabattkarte"),
    type: "website",
    images: ["/images/rabattkarte-hero-latest.webp"],
  },
};

const aboRows = [
  {
    label: "Rabatt",
    value: "10 %",
    detail: "auf jeden Einkauf",
    accent: "sparen",
    note: "mit Karte",
    progress: "100%",
  },
  {
    label: "Startguthaben",
    value: "6,50 €",
    detail: "beim Kauf der Karte geschenkt",
    accent: "gratis",
    note: "zeitlich begrenzt",
    progress: "86%",
  },
  {
    label: "Waschen",
    value: "1 Waschgang",
    detail: "7-kg-Trommel mit dem Startguthaben",
    accent: "gratis",
    note: "zum Start",
    progress: "70%",
  },
  {
    label: "Trocknen",
    value: "10 Minuten",
    detail: "Trockner mit dem Startguthaben",
    accent: "gratis",
    note: "zum Start",
    progress: "44%",
  },
];

const processSteps = [
  {
    icon: "card-hand",
    title: "Karte im Waschsalon kaufen",
    copy: "Die Mitgliedskarte bekommst du direkt vor Ort in Heidelberg oder Ludwigshafen.",
  },
  {
    icon: "wallet-plus",
    title: "6,50 € Startguthaben erhalten",
    copy: "Zeitlich begrenzt ist beim Kauf ein Waschgang und 10 Minuten Trocknen gratis.",
  },
  {
    icon: "washer",
    title: "Waschen und 10 % sparen",
    copy: "Mit der Karte an der Maschine bezahlen und bei jedem Einkauf 10 % Rabatt erhalten.",
  },
];

function RabattkarteJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Product",
        name: "Waschbar Mitgliedskarte",
        description:
          "Die Waschbar Mitgliedskarte: 10 % Rabatt auf jeden Einkauf, zeitlich begrenzt mit 6,50 € Startguthaben beim Kauf. Gültig in Heidelberg und Ludwigshafen.",
        brand: { "@type": "Brand", name: "Waschbar" },
        url: absoluteUrl("/rabattkarte"),
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
    icon: "percent",
    title: "10 % Rabatt",
    copy: "Auf jeden Waschgang und jeden Trockner, bei jedem Einkauf.",
  },
  {
    icon: "washer",
    title: "1 Waschgang gratis",
    copy: "Zeitlich begrenzt mit dem 6,50 € Startguthaben beim Kauf der Karte.",
  },
  {
    icon: "clock",
    title: "10 Min. Trocknen gratis",
    copy: "Ebenfalls im Startguthaben enthalten - direkt an unseren modernen Trocknern.",
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
            <span>10 % Rabatt mit der</span>
            <span>Waschbar Mitgliedskarte</span>
          </h1>
          <h2>Mehr waschen. Weniger zahlen.</h2>
          <p>
            Mit der Waschbar Mitgliedskarte sparst du bei jedem Einkauf 10 %.
            Zeitlich begrenzt schenken wir dir beim Kauf der Karte 6,50 €
            Startguthaben: ein Waschgang und 10 Minuten Trocknen gratis.
          </p>
          <div className="rabatt-hero-actions">
            <a className="button button-primary" href="#ablauf">
              Ablauf ansehen
            </a>
            <Link className="button rabatt-button-secondary" href="/#standorte">
              Standort finden <Icon name="pin" />
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
          <h2>So kommst du zu deiner Mitgliedskarte</h2>
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
        <p className="section-kicker rabatt-bonus-kicker">Mitgliedskarte</p>

        <div className="rabatt-bonus-summary">
          <div className="rabatt-bonus-heading">
            <h2>10 % Rabatt bei jedem Einkauf.</h2>
            <p>
              Du zahlst mit der Waschbar Mitgliedskarte an der Maschine und
              sparst bei jedem Waschgang und jedem Trockner 10 %. Ideal, wenn
              du regelmäßig wäschst.
            </p>
          </div>
          <div className="rabatt-bonus-max" aria-label="10 Prozent Rabatt">
            <span>spare</span>
            <strong>10%</strong>
            <span>bei jedem Einkauf</span>
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
                <span>Mit Karte</span>
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
            ob sie frei ist. Mit der Mitgliedskarte zahlst du auf alle Preise
            10 % weniger.
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
          <h2>Das bekommst du mit der Mitgliedskarte</h2>
          <p>
            Karte im Waschsalon kaufen, Startguthaben nutzen und ab dem ersten
            Waschgang sparen.
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
              <ConsentMap
                src={location.mapEmbedUrl}
                title={`${location.name} auf Google Maps`}
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
          <Link className="button button-primary" href="/#standorte">
            Mitgliedskarte im Waschsalon holen <Icon name="card" />
          </Link>
        </div>
      </section>

      <section className="section faq-section" id="faq">
        <div className="faq-copy">
          <p className="section-kicker">FAQ</p>
          <h2>Häufige Fragen zur Mitgliedskarte</h2>
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

      <section className="section">
        <aside className="faq-location-strip" aria-label="Ratgeber">
          <div className="faq-location-intro">
            <Icon name="book" />
            <div>
              <strong>Mehr Tipps rund ums Waschen</strong>
              <p>Kostenvergleich und Tipps aus dem Waschbar Ratgeber.</p>
            </div>
          </div>
          <div className="faq-location-actions">
            <Link href="/ratgeber/waschsalon-oder-eigene-waschmaschine-kosten">
              <Icon name="book" />
              <span>Waschsalon oder eigene Waschmaschine: Kostenvergleich</span>
            </Link>
            <Link href="/ratgeber/sb-waschsalon-erster-besuch-ablauf">
              <Icon name="book" />
              <span>SB-Waschsalon: Der erste Besuch Schritt für Schritt</span>
            </Link>
            <Link href="/ratgeber/hundedecke-tierdecke-waschen">
              <Icon name="book" />
              <span>Hundedecke und Tierdecke waschen</span>
            </Link>
          </div>
        </aside>
      </section>

      <SiteFooter />
    </main>
  );
}
