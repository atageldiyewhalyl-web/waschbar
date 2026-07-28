import Image from "next/image";
import Link from "next/link";
import { LottieIcon } from "./components/LottieIcon";
import { OpeningStatus } from "./components/OpeningStatus";
import { Icon } from "./components/Icon";
import { GoogleLogo } from "./components/GoogleLogo";
import { MobileUseCarousel } from "./components/MobileUseCarousel";
import { SiteHeader } from "./components/SiteHeader";
import { SiteFooter } from "./components/SiteFooter";
import { MobileStickyActions } from "./components/MobileStickyActions";
import {
  locations,
  trustItems,
  machineSizes,
  priceItems,
  reviews,
  useCases,
  mobileUseCaseStories,
  mobilePriceTeasers,
  mobileKundenkarteBenefits,
  contactInfo,
} from "./data/site-data";

export const dynamic = "force-static";
export const revalidate = 86400;

const faqs = [
  {
    question: "Ist Waschbar ein SB Waschsalon?",
    answer:
      "Ja. Waschbar ist ein Selbstbedienungs-Waschsalon. Du wäschst und trocknest deine Wäsche direkt vor Ort an modernen Maschinen.",
    icon: "washer",
  },
  {
    question: "Kann ich große Textilien waschen?",
    answer:
      "Ja. Die großen Maschinen eignen sich für größere Wäschestücke wie Decken, Bettwäsche, Handtücher oder Arbeitskleidung.",
    icon: "stack",
  },
  {
    question: "Gibt es eine Waschbar Kundenkarte?",
    answer:
      "Ja. Mit der Kundenkarte erhältst du 10% Rabatt auf jeden Einkauf und kannst Guthaben für spätere Besuche aufladen.",
    icon: "card",
  },
];

function JsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        name: "Waschbar",
        description:
          "Waschbar betreibt moderne SB Waschsalons in Heidelberg und Ludwigshafen.",
        areaServed: ["Heidelberg", "Ludwigshafen am Rhein"],
        url: "/",
        sameAs: locations.map((location) => location.mapsUrl),
      },
      {
        "@type": "FAQPage",
        mainEntity: faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
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

export default function Home() {
  return (
    <>
      <JsonLd />
      <main className="site-shell">
        <SiteHeader />

        <div className="hero-sticky-wrap">
        <section className="hero">
          <div className="hero-copy">
            <p className="eyebrow">SB Waschsalon Heidelberg & Ludwigshafen</p>
            <h1>
              Waschsalon Heidelberg
              <span>Ludwigshafen</span>
            </h1>
            <p className="hero-text">
              Waschbar ist dein SB Waschsalon in Heidelberg und Ludwigshafen:
              moderne Waschmaschinen und Trockner, faire Preise und
              Self-Service für Alltagswäsche, Bettdecken und große Textilien
              - täglich von 06:00 bis 24:00 Uhr geöffnet.
            </p>
            <div className="mobile-hero-status">
              <OpeningStatus />
              <span>Täglich 06-24 Uhr</span>
            </div>
            <div className="hero-actions">
              <a className="button button-primary" href="#standorte">
                Standort finden <Icon name="pin" />
              </a>
              <a className="button button-secondary" href="#preise">
                Preise ansehen
              </a>
            </div>
            <ul className="trust-list" aria-label="Waschbar Vorteile">
              {trustItems.map(([label, icon]) => (
                <li key={label}>
                  <Icon name={icon} />
                  {label}
                </li>
              ))}
            </ul>
          </div>
          <div className="hero-media">
            <Image
              className="hero-base-image"
              src="/images/waschbar-hero-logo.png"
              alt="Moderner Waschbar SB Waschsalon mit Holzlamellen, Eingang und Waschmaschinen"
              fill
              priority
              sizes="100vw"
            />
          </div>
        </section>
        </div>

        <div className="hero-follow">
        <section className="mobile-static-hero" aria-label="Waschbar Startbereich">
          <div className="mobile-static-hero-layer" aria-hidden="true">
            <div className="mobile-static-hero-image">
              <Image
                src="/images/waschbar-hero-logo.png"
                alt=""
                fill
                priority
                sizes="100vw"
              />
            </div>
          </div>
          <div className="mobile-static-hero-content">
            <article className="mobile-static-hero-panel">
              <p className="eyebrow">Waschbar</p>
              <h1>
                SB Waschsalon
                <span>Heidelberg & Ludwigshafen</span>
              </h1>
              <p>
                Moderne Maschinen, faire Preise und Self-Service für deine
                Alltagswäsche, Decken und große Textilien.
              </p>
              <div className="mobile-hero-status">
                <span className="status-pill" data-status="open">Geöffnet</span>
                <span>Täglich 06-24 Uhr</span>
              </div>
            </article>
          </div>
        </section>

        <section className="mobile-home-flow" aria-label="Waschbar mobile Schnellzugriff">
          <div className="mobile-location-scroll">
            {locations.map((location) => (
              <Link
                className="mobile-location-card"
                href={location.href}
                key={`${location.slug}-mobile-card`}
              >
                <div className="mobile-location-image">
                  <Image
                    src={location.image}
                    alt={`${location.name} Innenansicht`}
                    fill
                    sizes="72vw"
                  />
                </div>
                <div className="mobile-location-body">
                  <h2>{location.city}</h2>
                  <p>{location.street}</p>
                  <span>
                    <strong>Geöffnet</strong>
                    <small>06-24 Uhr</small>
                  </span>
                </div>
              </Link>
            ))}
          </div>

          <div className="mobile-price-teasers" aria-label="Preise">
            {mobilePriceTeasers.map((item) => (
              <a href="#preise" className="mobile-price-chip" key={item.label}>
                <LottieIcon src={item.animation} label={`${item.label} Animation`} />
                <span>{item.label}</span>
                <strong>
                  {item.prefix && <small>{item.prefix}</small>}
                  {item.value}
                </strong>
                {item.meta && <em>{item.meta}</em>}
              </a>
            ))}
          </div>
        </section>

        <MobileStickyActions
          primaryLabel="Standort finden"
          primaryHref="#standorte"
          phoneHref={`tel:${contactInfo.phoneHref}`}
          mapsHref={locations[0].mapsUrl}
        />

        <section className="trust-proof" aria-label="Waschbar Standort- und Serviceversprechen">
          <article>
            <Icon name="clock" />
            <span>Jetzt einplanen</span>
            <strong><OpeningStatus /> Täglich 06:00 - 24:00 Uhr</strong>
          </article>
          <article>
            <Icon name="washer" />
            <span>Self-Service</span>
            <strong>Waschen und trocknen direkt vor Ort</strong>
          </article>
          <article>
            <Icon name="pin" />
            <span>Zwei Standorte</span>
            <strong>Heidelberg und Ludwigshafen</strong>
          </article>
        </section>

        <section className="section location-section" id="standorte">
          <p className="section-kicker">Standort wählen</p>
          <h2>Moderne Maschinen an beiden Standorten</h2>
          <div className="location-grid">
            {locations.map((location) => (
              <article className="location-card" id={location.city.toLowerCase()} key={location.name}>
                <div className="location-image">
                  <Image
                    src={location.image}
                    alt={`${location.name} Innenansicht`}
                    width={640}
                    height={480}
                    sizes="(max-width: 900px) 100vw, 38vw"
                  />
                </div>
                <div className="location-content">
                  <h3>{location.name}</h3>
                  <p>{location.address}</p>
                  <div className="open-row">
                    <OpeningStatus />
                    <strong>06:00 - 24:00 Uhr</strong>
                  </div>
                  <p className="location-angle">{location.angle}</p>
                  <div className="machine-row" aria-label="Maschinengrößen">
                    {machineSizes.map(([size]) => (
                      <span key={`${location.name}-${size}`}>{size}</span>
                    ))}
                  </div>
                  <div className="location-actions">
                    <Link href={location.href} aria-label={`${location.name} ansehen`}>
                      Standort ansehen
                    </Link>
                    <a
                      href={location.mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${location.name} auf Google Maps öffnen`}
                    >
                      Google Maps öffnen
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
          <a className="all-locations" href="#kontakt">
            Alle Standortinfos ansehen <Icon name="pin" />
          </a>
        </section>

        <section className="section use-case-section" id="waesche">
          <div className="use-case-scene">
            <Image
              src="/images/waschbar-use-cases-scene.png"
              alt="Moderner Waschsalon mit Bettdecken, Wäschekorb, Sportkleidung und Haustiertextilien"
              width={1680}
              height={945}
              sizes="100vw"
            />
            <div className="use-case-heading">
              <p className="section-kicker">Wofür Waschbar gedacht ist</p>
              <h2>Self-Service Waschen für echte Alltagssituationen</h2>
            </div>
            <div className="use-case-callouts">
              {useCases.map((item, index) => (
                <article
                  className={`use-case-callout use-case-callout-${item.modifier}`}
                  key={item.title}
                >
                  <div className="use-case-icon-row">
                    <span>{index + 1}</span>
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.copy}</p>
                </article>
              ))}
            </div>
          </div>
          <MobileUseCarousel stories={mobileUseCaseStories} />
        </section>

        <section className="feature-band" id="ausstattung" aria-label="Pet Station und Cleaning Station">
          <div className="mobile-feature-heading">
            <p className="section-kicker">Spezialstationen</p>
            <h2>Extra sauber für besondere Textilien</h2>
          </div>
          <div className="feature-stage">
            <Image
              src="/images/waschbar-pet-cleaning-section.png"
              alt="Pet Station und Cleaning Station im modernen Waschbar Waschsalon"
              fill
              sizes="100vw"
            />
            <article className="feature-panel feature-panel-pet">
              <Icon name="paw" />
              <p className="section-kicker">Spezialwäsche</p>
              <h2>Pet Station</h2>
              <p>Für Tierdecken und Haustiertextilien.</p>
              <a href="#faq">Mehr erfahren</a>
            </article>
            <article className="feature-panel feature-panel-cleaning">
              <Icon name="shirt" />
              <p className="section-kicker">Starke Textilien</p>
              <h2>Cleaning Station</h2>
              <p>Für Arbeitskleidung und stark beanspruchte Wäsche.</p>
              <a href="#faq">Mehr erfahren</a>
            </article>
          </div>
          <div className="feature-proof-row" aria-label="Vorteile der Spezialstationen">
            <article>
              <Icon name="shield" />
              <div>
                <strong>Hygienisch sauber</strong>
                <span>Gründliche Reinigung für höchste Ansprüche</span>
              </div>
            </article>
            <article>
              <Icon name="washer" />
              <div>
                <strong>Moderne Maschinen</strong>
                <span>Leistungsstarke Technik für beste Ergebnisse</span>
              </div>
            </article>
            <article>
              <Icon name="drop" />
              <div>
                <strong>Schonend & effektiv</strong>
                <span>Pflege, die fasertief reinigt und schützt</span>
              </div>
            </article>
            <article>
              <Icon name="leaf" />
              <div>
                <strong>Nachhaltig sauber</strong>
                <span>Effizienter Verbrauch für eine saubere Zukunft</span>
              </div>
            </article>
          </div>
        </section>

        <section className="section price-section" id="preise">
          <p className="section-kicker">Preise</p>
          <h2>Klare Preise für Waschen und Trocknen</h2>
          <p className="section-copy">
            Am Terminal wählst du die passende Maschine aus und siehst sofort,
            ob sie frei ist. Die folgenden Preise orientieren sich an der
            aktuellen Anzeige vor Ort.
          </p>
          <div className="price-grid">
            {priceItems.map((item) => (
              <article
                className={item.featured ? "price-card price-card-featured" : "price-card"}
                key={item.title}
              >
                <div className="price-card-top">
                  <LottieIcon src={item.animation} label={`${item.title} Animation`} />
                  {item.featured && <span>Beliebt für große Wäsche</span>}
                </div>
                <h3>{item.title}</h3>
                <p>{item.subtitle}</p>
                <div className="price-value">
                  <strong>{item.price}</strong>
                  <span>{item.meta}</span>
                </div>
              </article>
            ))}
          </div>
          <p className="price-note">
            <span aria-hidden="true">◆</span>
            <span>
              Waschmittel und Weichspüler werden am Terminal mit 0,00 € angezeigt. Maßgeblich ist immer die Anzeige am Standort.
            </span>
          </p>
        </section>

        <section className="section kundenkarte" id="kundenkarte">
          <div className="kundenkarte-card">
            <div className="kundenkarte-heading">
              <p className="section-kicker">Kundenkarte</p>
              <h2>
                10% Rabatt mit der
                <span>Waschbar Kundenkarte</span>
              </h2>
            </div>
            <div className="kundenkarte-hero">
              <Image
                src="/images/waschbar-kundenkarte-ai-section.png"
                alt="Waschbar Kundenkarte mit Waschmaschinen, Handtuechern und Waschmittel"
                fill
                priority={false}
                sizes="100vw"
              />
              <div className="kundenkarte-benefits" aria-label="Vorteile der Waschbar Kundenkarte">
                <span>
                  <Icon name="card" />
                  <strong>Bargeldlos bezahlen</strong>
                </span>
                <span>
                  <Icon name="tag" />
                  <strong>Bei jedem Einkauf sparen</strong>
                </span>
              </div>
            </div>
            <p className="kundenkarte-seo-text">
              Die Waschbar Kundenkarte ist die praktische Bezahlkarte für unseren SB
              Waschsalon in Heidelberg und Ludwigshafen. Einfach an einem unserer
              Standorte aufladen und bargeldlos an Waschmaschine, Trockner und
              Wertstoffautomat bezahlen – ganz ohne Münzgeld oder App. Kundenkarten-Inhaber
              sparen dauerhaft 10% Rabatt auf jeden Waschgang und jede Trocknung. Die
              Karte ist kostenlos erhältlich, sofort einsatzbereit und lässt sich jederzeit
              am Terminal vor Ort wieder aufladen.
            </p>
            <div className="mobile-kundenkarte-dashboard">
              <div className="mobile-kundenkarte-copy">
                <p className="section-kicker">Kundenkarte</p>
                <h2>
                  <span className="mobile-kundenkarte-title-line">10% sparen</span>
                  <span className="mobile-kundenkarte-title-line">mit der Waschbar</span>
                  <span className="mobile-kundenkarte-title-line mobile-kundenkarte-title-accent">
                    Kundenkarte
                  </span>
                </h2>
                <p>
                  Einmal Karte holen, Guthaben aufladen und bei jedem Waschgang
                  automatisch sparen.
                </p>
              </div>
              <div className="mobile-kundenkarte-savings">
                <div className="mobile-kundenkarte-visual">
                  <Image
                    src="/images/waschbar-kundenkarte-mobile-dashboard-bg.png"
                    alt="Moderne Waschmaschinen mit Handtuechern als Hintergrund fuer die Kundenkarte"
                    fill
                    sizes="100vw"
                  />
                  <Image
                    className="mobile-kundenkarte-card-image"
                    src="/images/waschbar-kundenkarte-real-card.png"
                    alt="Waschbar Kundenkarte"
                    width={560}
                    height={350}
                  />
                  <div className="mobile-kundenkarte-discount" aria-label="10 Prozent Rabatt">
                    <strong>10%</strong>
                    <span>Rabatt</span>
                  </div>
                </div>
                <div className="mobile-kundenkarte-benefits">
                  {mobileKundenkarteBenefits.map((benefit) => (
                    <div className="mobile-kundenkarte-benefit" key={benefit.title}>
                      <LottieIcon
                        src={benefit.animation}
                        label={`${benefit.title} Animation`}
                        respectReducedMotion={false}
                      />
                      <div>
                        <strong>{benefit.title}</strong>
                        <span>{benefit.text}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <a className="mobile-kundenkarte-cta" href="#standorte">
                  <Icon name="pin" />
                  Kundenkarte im Salon holen
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="section review-section" id="bewertungen">
          <div className="review-showcase">
            <div className="review-visual">
              <Image
                src="/images/waschbar-reviews-laundry-scene.png"
                alt="Waschbar Waschsalon mit modernen Waschmaschinen"
                fill
                sizes="(max-width: 980px) 100vw, 54vw"
              />
              <div className="review-visual-copy">
                <p className="section-kicker">Bewertungen</p>
                <h2>Kundenstimmen</h2>
                <p className="review-visual-subtitle">
                  Echte Google Bewertungen aus Heidelberg.
                </p>
                <span className="review-google-source">
                  <GoogleLogo className="google-logo google-logo-large" />
                  Google Bewertungen
                </span>
              </div>
              <div className="review-proof-badge">
                <Icon name="washer" />
                <span>
                  <strong>Sauber. Schnell. Selbstbedient.</strong>
                  <small>Moderne Maschinen in Heidelberg und Ludwigshafen.</small>
                </span>
              </div>
            </div>
            <div className="review-list" aria-label="Google Bewertungen">
              {reviews.map((review, index) => {
                const location = locations[review.locationIndex];

                return (
                  <article
                    className={index === 0 ? "review-card review-card-featured" : "review-card"}
                    key={review.name}
                  >
                    <div className="review-card-top">
                      <div className="reviewer">
                        <Image
                          src={review.avatar}
                          alt={`Profilbild ${review.initial}`}
                          width={52}
                          height={52}
                        />
                        <div>
                          <strong>{review.name}</strong>
                          <small>{review.city}</small>
                        </div>
                      </div>
                      <span className="google-badge" aria-label="Google Bewertung">
                        <GoogleLogo className="google-logo" />
                        Google
                      </span>
                    </div>
                    <div className="review-stars-row">
                      <span className="stars" aria-label="5 von 5 Sternen">★★★★★</span>
                      <small>{review.age}</small>
                    </div>
                    <p>&ldquo;{review.quote}&rdquo;</p>
                    <a
                      href={location.mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Auf Google ansehen
                    </a>
                  </article>
                );
              })}
              <div className="review-actions">
                <a
                  href={locations[0].mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Bewertungen Heidelberg ansehen
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="maps-proof section" id="kontakt">
          <div className="maps-proof-copy">
            <p className="section-kicker">Google Maps & Standortvertrauen</p>
            <h2>Direkt zum offiziellen Google Business Profil</h2>
            <p>
              Für lokale Suchanfragen zählen konsistente Standortdaten. Deshalb
              verlinkt Waschbar klar auf die Google Maps Profile, damit Adresse,
              Route, Öffnungszeiten, Fotos und Bewertungen aus einer
              nachvollziehbaren Quelle erreichbar sind.
            </p>
          </div>
          <div className="maps-proof-grid">
            {locations.map((location) => (
              <article
                className="maps-card"
                key={`${location.name}-maps`}
              >
                <iframe
                  src={location.mapEmbedUrl}
                  title={`${location.name} Google Maps Standort`}
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
        </section>

        <section className="section faq-section" id="faq">
          <div className="faq-showcase">
            <div className="faq-copy">
              <p className="section-kicker">FAQ</p>
              <h2>Häufige Fragen</h2>
              <span className="section-rule" aria-hidden="true" />
              <h3>Alles Wichtige vor deinem Besuch</h3>
              <p>
                Hier findest du Antworten auf die häufigsten Fragen rund um
                unseren SB-Waschsalon, unsere Services und deinen Besuch.
              </p>

              <div className="faq-list">
                {faqs.map((faq) => (
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

            <div className="faq-media-grid" aria-label="Waschbar Eindrücke">
              <div className="faq-media-large">
                <Image
                  src="/images/waschbar-faq-support-strip.png"
                  alt="Waschbar Innenraum mit Waschmaschinen, Handtüchern und Waschmittel"
                  fill
                  sizes="(max-width: 900px) 100vw, 56vw"
                />
              </div>
              <div className="faq-media-small">
                <Image
                  src="/images/waschbar-kundenkarte-real-product.png"
                  alt="Waschbar Kundenkarte"
                  fill
                  sizes="(max-width: 900px) 50vw, 26vw"
                />
              </div>
              <div className="faq-media-small">
                <Image
                  src="/images/waschbar-use-cases-scene.png"
                  alt="Wäschekorb mit großen Textilien im Waschsalon"
                  fill
                  sizes="(max-width: 900px) 50vw, 26vw"
                />
              </div>
            </div>
          </div>

          <aside className="faq-location-strip" aria-label="Standort finden">
            <div className="faq-location-intro">
              <Icon name="pin" />
              <div>
                <strong>Standort finden</strong>
                <p>Finde deinen nächsten Waschbar SB-Waschsalon in deiner Nähe.</p>
              </div>
            </div>
            <div className="faq-location-actions">
              {locations.map((location) => (
                <a
                  href={location.mapsUrl}
                  key={`${location.city}-faq`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icon name={location.city.toLowerCase()} />
                  <span>{location.city}</span>
                </a>
              ))}
            </div>
          </aside>
        </section>

        <SiteFooter />
        </div>
      </main>
    </>
  );
}
