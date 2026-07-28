import Image from "next/image";
import Link from "next/link";
import { Icon } from "./Icon";
import { GoogleLogo } from "./GoogleLogo";
import { LottieIcon } from "./LottieIcon";
import { OpeningStatus } from "./OpeningStatus";
import { SiteHeader } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";
import { MobileStickyActions } from "./MobileStickyActions";
import { MobileUseCarousel } from "./MobileUseCarousel";
import {
  locations,
  priceItems,
  trustItems,
  reviewsForLocation,
  buildLocalBusinessJsonLd,
  useCases,
  mobileUseCaseStories,
  mobilePriceTeasers,
  mobileKundenkarteBenefits,
  contactInfo,
  type Location,
} from "../data/site-data";

function LocationJsonLd({ location }: { location: Location }) {
  const schema = buildLocalBusinessJsonLd(location);

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

function LocationFaqJsonLd({ faqs }: { faqs: Array<{ question: string; answer: string }> }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function LocationPageBody({
  slug,
}: {
  slug: "heidelberg" | "ludwigshafen";
}) {
  const locationIndex = locations.findIndex((entry) => entry.slug === slug);
  const location = locations[locationIndex];
  const otherLocation = locations[locationIndex === 0 ? 1 : 0];
  const cityReviews = reviewsForLocation(locationIndex);

  const stationAnswer = [
    location.hasPetStation ? `eine Pet Station (${location.petStationCopy})` : null,
    location.hasCleaningStation ? `eine Cleaning Station (${location.cleaningStationCopy})` : null,
  ]
    .filter(Boolean)
    .join(" sowie ");

  const locationFaqs = [
    {
      question: `Ist Waschbar ${location.city} ein SB Waschsalon?`,
      answer: `Ja. Waschbar ${location.city} ist ein Selbstbedienungs-Waschsalon. Du wäschst und trocknest deine Wäsche direkt vor Ort an modernen Maschinen, ganz ohne Termin.`,
    },
    {
      question: `Wie sind die Öffnungszeiten bei Waschbar ${location.city}?`,
      answer: "Täglich von 06:00 bis 24:00 Uhr geöffnet, auch an Sonn- und Feiertagen.",
    },
    {
      question: `Wie komme ich zum Standort ${location.city}?`,
      answer: `${location.transitCopy} Die genaue Adresse lautet ${location.address}.`,
    },
    {
      question: `Gibt es Parkmöglichkeiten am Standort ${location.city}?`,
      answer: location.parkingCopy,
    },
    ...(stationAnswer
      ? [
          {
            question: `Gibt es Spezialstationen bei Waschbar ${location.city}?`,
            answer: `An diesem Standort findest du ${stationAnswer}.`,
          },
        ]
      : []),
    {
      question: `Gilt die Waschbar Kundenkarte auch in ${location.city}?`,
      answer: `Ja. Die Waschbar Kundenkarte gilt an beiden Standorten und bringt dir 10% Rabatt auf jeden Waschgang und jede Trocknung.`,
    },
  ];

  return (
    <>
      <LocationJsonLd location={location} />
      <LocationFaqJsonLd faqs={locationFaqs} />
      <main className="site-shell">
        <SiteHeader />

        <div className="hero-sticky-wrap">
        <section className="hero">
          <div className="hero-copy">
            <p className="eyebrow">SB Waschsalon {location.city}</p>
            <h1>
              Waschsalon {location.city}
              <span>{location.audienceLabel}</span>
            </h1>
            <p className="hero-text">{location.longAngle}</p>
            <div className="hero-actions">
              <a
                className="button button-primary"
                href={location.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Route planen <Icon name="pin" />
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
              src={location.image}
              alt={`${location.name} Innenansicht`}
              fill
              priority
              sizes="100vw"
            />
          </div>
        </section>
        </div>

        <div className="hero-follow">
        <section className="mobile-static-hero" aria-label={`${location.name} Startbereich`}>
          <div className="mobile-static-hero-layer" aria-hidden="true">
            <div className="mobile-static-hero-image">
              <Image src={location.image} alt="" fill priority sizes="100vw" />
            </div>
          </div>
          <div className="mobile-static-hero-content">
            <article className="mobile-static-hero-panel">
              <p className="eyebrow">SB Waschsalon {location.city}</p>
              <h1>
                Waschsalon {location.city}
                <span>{location.audienceLabel}</span>
              </h1>
              <p>{location.angle}</p>
              <div className="mobile-hero-status">
                <OpeningStatus />
                <span>Täglich 06-24 Uhr</span>
              </div>
            </article>
          </div>
        </section>

        <section className="mobile-home-flow" aria-label={`Waschbar ${location.city} Schnellzugriff`}>
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
          primaryLabel="Route planen"
          primaryHref={location.mapsUrl}
          primaryExternal
          phoneHref={`tel:${contactInfo.phoneHref}`}
          mapsHref={location.mapsUrl}
        />

        <section
          className="trust-proof"
          aria-label={`${location.name} Standort- und Serviceversprechen`}
        >
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
            <span>Adresse</span>
            <strong>{location.address}</strong>
          </article>
        </section>

        {location.processSteps && (
          <section className="section process-section" aria-label={`So läuft dein Waschtag in ${location.city} ab`}>
            <p className="section-kicker">So einfach geht&apos;s</p>
            <h2>So läuft dein Waschtag in {location.city} ab</h2>
            <div className="process-steps">
              {location.processSteps.map((step, index) => (
                <article className="process-step" key={step.title}>
                  <span className="process-step-number">{index + 1}</span>
                  <h3>{step.title}</h3>
                  <p>{step.copy}</p>
                </article>
              ))}
            </div>
          </section>
        )}

        <section className="section overview-section" id="anfahrt">
          <p className="section-kicker">Standort & Anfahrt</p>
          <h2>Standort {location.city}</h2>
          <p className="section-copy overview-subtitle">Alles Wichtige vor deinem Besuch.</p>

          <div className="mobile-overview">
            <div className="mobile-overview-map">
              <iframe
                src={location.mapEmbedUrl}
                title={`${location.name} Google Maps Standort`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
              <div className="mobile-overview-map-footer">
                <div>
                  <span>{location.city}</span>
                  <strong>{location.street}</strong>
                </div>
                <a href={location.mapsUrl} target="_blank" rel="noopener noreferrer">
                  <Icon name="pin" />
                  Route planen
                </a>
              </div>
            </div>
            <div className="mobile-overview-scroll">
              <article className="mobile-overview-card">
                <div className="mobile-overview-card-head">
                  <Icon name="pin" />
                  <h3>Adresse</h3>
                </div>
                <p>
                  {location.street}
                  <br />
                  {location.postalCode} {location.addressLocality}
                </p>
                <a href={location.mapsUrl} target="_blank" rel="noopener noreferrer">
                  In Google Maps öffnen
                </a>
              </article>
              <article className="mobile-overview-card">
                <div className="mobile-overview-card-head">
                  <Icon name="clock" />
                  <h3>Öffnungszeiten</h3>
                </div>
                <p>
                  Täglich 06:00 - 24:00 Uhr
                  <br />
                  Auch an Sonn- und Feiertagen geöffnet.
                </p>
              </article>
              <article className="mobile-overview-card">
                <div className="mobile-overview-card-head">
                  <Icon name="bus" />
                  <h3>Anfahrt</h3>
                </div>
                <p>{location.transitCopy}</p>
              </article>
              <article className="mobile-overview-card">
                <div className="mobile-overview-card-head">
                  <Icon name="parking" />
                  <h3>Parken</h3>
                </div>
                <p>{location.parkingCopy}</p>
              </article>
            </div>
            <div className="mobile-overview-strip">
              <div>
                <Icon name="shield" />
                <div>
                  <strong>Ohne Termin</strong>
                  <span>Einfach vorbeikommen.</span>
                </div>
              </div>
              <div>
                <Icon name="washer" />
                <div>
                  <strong>Große Trommeln</strong>
                  <span>Bis 15 kg waschen.</span>
                </div>
              </div>
              <div>
                <Icon name="drop" />
                <div>
                  <strong>Self-Service</strong>
                  <span>Selbst erledigen.</span>
                </div>
              </div>
              <div>
                <Icon name="card" />
                <div>
                  <strong>Kundenkarte</strong>
                  <span>Bargeldlos zahlen.</span>
                </div>
              </div>
            </div>
          </div>

          <div className="overview-layout">
            <div className="overview-map">
              <iframe
                src={location.mapEmbedUrl}
                title={`${location.name} Google Maps Standort`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
              <a
                className="button button-primary overview-map-cta"
                href={location.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Route planen <Icon name="pin" />
              </a>
            </div>
            <div className="overview-cards">
              <article className="overview-card">
                <div className="overview-card-head">
                  <Icon name="pin" />
                  <h3>Adresse</h3>
                </div>
                <p>
                  {location.name}
                  <br />
                  {location.street}
                  <br />
                  {location.postalCode} {location.addressLocality}
                </p>
                <a href={location.mapsUrl} target="_blank" rel="noopener noreferrer">
                  In Google Maps öffnen
                </a>
              </article>
              <article className="overview-card">
                <div className="overview-card-head">
                  <Icon name="clock" />
                  <h3>Öffnungszeiten</h3>
                </div>
                <p>
                  Täglich 06:00 - 24:00 Uhr
                  <br />
                  Auch an Sonn- und Feiertagen geöffnet.
                </p>
              </article>
              <article className="overview-card">
                <div className="overview-card-head">
                  <Icon name="bus" />
                  <h3>Anfahrt</h3>
                </div>
                <p>{location.transitCopy}</p>
              </article>
              <article className="overview-card">
                <div className="overview-card-head">
                  <Icon name="parking" />
                  <h3>Parken</h3>
                </div>
                <p>{location.parkingCopy}</p>
              </article>
            </div>
          </div>
          <div className="overview-strip">
            <div>
              <Icon name="shield" />
              <div>
                <strong>Ohne Termin</strong>
                <span>Einfach vorbeikommen und starten.</span>
              </div>
            </div>
            <div>
              <Icon name="washer" />
              <div>
                <strong>Große Trommeln</strong>
                <span>Waschen bis 15 kg, direkt vor Ort trocknen.</span>
              </div>
            </div>
            <div>
              <Icon name="drop" />
              <div>
                <strong>Self-Service</strong>
                <span>Waschen und trocknen selbst erledigen.</span>
              </div>
            </div>
            <div>
              <Icon name="card" />
              <div>
                <strong>Kundenkarte</strong>
                <span>Bargeldlos zahlen und Vorteile sichern.</span>
              </div>
            </div>
          </div>
        </section>

        <section className="section price-section" id="preise">
          <p className="section-kicker">Preise</p>
          <h2>Klare Preise in {location.city}</h2>
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

        <section className="section use-case-section" id="waesche">
          <div className="use-case-scene">
            <Image
              src="/images/waschbar-use-cases-scene.png"
              alt={`Waschbar ${location.city} mit Bettdecken, Wäschekorb, Sportkleidung und Haustiertextilien`}
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

        <section
          className="feature-band"
          aria-label={`Pet Station und Cleaning Station in ${location.city}`}
        >
          <div className="mobile-feature-heading">
            <p className="section-kicker">Spezialstationen</p>
            <h2>Extra sauber für besondere Textilien in {location.city}</h2>
          </div>
          <div className="feature-stage">
            <Image
              src="/images/waschbar-pet-cleaning-section.png"
              alt={`Pet Station und Cleaning Station bei Waschbar ${location.city}`}
              fill
              sizes="100vw"
            />
            {location.hasPetStation && (
              <article className="feature-panel feature-panel-pet">
                <Icon name="paw" />
                <p className="section-kicker">Spezialwäsche</p>
                <h2>Pet Station</h2>
                <p>{location.petStationCopy}</p>
                <a href="#preise">Mehr erfahren</a>
              </article>
            )}
            {location.hasCleaningStation && (
              <article className="feature-panel feature-panel-cleaning">
                <Icon name="shirt" />
                <p className="section-kicker">Starke Textilien</p>
                <h2>Cleaning Station</h2>
                <p>{location.cleaningStationCopy}</p>
                <a href="#preise">Mehr erfahren</a>
              </article>
            )}
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

        <section className="section kundenkarte" id="kundenkarte">
          <div className="kundenkarte-card">
            <div className="kundenkarte-heading">
              <p className="section-kicker">Kundenkarte</p>
              <h2>
                10% Rabatt bei Waschbar
                <span>{location.city}</span>
              </h2>
            </div>
            <div className="kundenkarte-hero">
              <Image
                src="/images/waschbar-kundenkarte-ai-section.png"
                alt={`Waschbar Kundenkarte am Standort ${location.city} mit Waschmaschinen, Handtüchern und Waschmittel`}
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
              Waschsalon in {location.city}. Einfach vor Ort aufladen und bargeldlos an
              Waschmaschine, Trockner und Wertstoffautomat bezahlen – ganz ohne
              Münzgeld oder App. Kundenkarten-Inhaber sparen dauerhaft 10% Rabatt auf
              jeden Waschgang und jede Trocknung, und die Karte gilt genauso am
              zweiten Waschbar Standort. Kostenlos erhältlich, sofort einsatzbereit
              und jederzeit am Terminal wieder aufladbar.
            </p>
            <div className="mobile-kundenkarte-dashboard">
              <div className="mobile-kundenkarte-copy">
                <p className="section-kicker">Kundenkarte</p>
                <h2>
                  <span className="mobile-kundenkarte-title-line">10% sparen</span>
                  <span className="mobile-kundenkarte-title-line">bei Waschbar</span>
                  <span className="mobile-kundenkarte-title-line mobile-kundenkarte-title-accent">
                    {location.city}
                  </span>
                </h2>
                <p>
                  Einmal Karte holen, Guthaben aufladen und bei jedem Waschgang
                  in {location.city} automatisch sparen.
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
                <a className="mobile-kundenkarte-cta" href={location.mapsUrl} target="_blank" rel="noopener noreferrer">
                  <Icon name="pin" />
                  Kundenkarte in {location.city} holen
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
                alt={`Waschbar Waschsalon ${location.city} mit modernen Waschmaschinen`}
                fill
                sizes="(max-width: 980px) 100vw, 54vw"
              />
              <div className="review-visual-copy">
                <p className="section-kicker">Bewertungen</p>
                <h2>Kundenstimmen aus {location.city}</h2>
                <p className="review-visual-subtitle">
                  Echte Google Bewertungen aus {location.city}.
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
                  <small>{location.reviewProofLine}</small>
                </span>
              </div>
            </div>
            {cityReviews.length > 0 ? (
              <div className="review-list" aria-label={`Google Bewertungen ${location.city}`}>
                {cityReviews.map((review, index) => (
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
                    <a href={location.mapsUrl} target="_blank" rel="noopener noreferrer">
                      Auf Google ansehen
                    </a>
                  </article>
                ))}
                <div className="review-actions">
                  <a href={location.mapsUrl} target="_blank" rel="noopener noreferrer">
                    Bewertungen {location.city} ansehen
                  </a>
                </div>
              </div>
            ) : (
              <div className="no-reviews-card">
                <p>
                  Für Waschbar {location.city} liegen aktuell noch keine
                  Google-Bewertungen vor. Warst du schon da? Teile deine
                  Erfahrung auf Google.
                </p>
                <a
                  className="button button-primary"
                  href={location.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Bewertung abgeben <Icon name="pin" />
                </a>
              </div>
            )}
          </div>
        </section>

        <section className="section faq-section" id="faq">
          <div className="faq-showcase">
            <div className="faq-copy">
              <p className="section-kicker">FAQ</p>
              <h2>Häufige Fragen zu Waschbar {location.city}</h2>
              <span className="section-rule" aria-hidden="true" />
              <h3>Alles Wichtige vor deinem Besuch</h3>
              <p>
                Hier findest du Antworten auf die häufigsten Fragen rund um
                unseren SB-Waschsalon in {location.city}, unsere Services und
                deinen Besuch.
              </p>

              <div className="faq-list">
                {locationFaqs.map((faq) => (
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

            <div className="faq-media-grid" aria-label={`Waschbar ${location.city} Eindrücke`}>
              <div className="faq-media-large">
                <Image
                  src="/images/waschbar-faq-support-strip.png"
                  alt={`Waschbar ${location.city} Innenraum mit Waschmaschinen, Handtüchern und Waschmittel`}
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
        </section>

        <section className="section">
          <aside className="faq-location-strip" aria-label="Weitere Standorte">
            <div className="faq-location-intro">
              <Icon name="pin" />
              <div>
                <strong>Weitere Standorte</strong>
                <p>Entdecke alle Waschbar SB-Waschsalons in deiner Nähe.</p>
              </div>
            </div>
            <div className="faq-location-actions">
              <Link href={otherLocation.href}>
                <Icon name={otherLocation.city.toLowerCase()} />
                <span>{otherLocation.city}</span>
              </Link>
              <Link href="/#standorte">
                <Icon name="pin" />
                <span>Alle Standorte</span>
              </Link>
            </div>
          </aside>
        </section>

        <SiteFooter />
        </div>
      </main>
    </>
  );
}
