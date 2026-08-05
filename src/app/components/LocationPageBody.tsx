import Image from "next/image";
import Link from "next/link";
import { Icon } from "./Icon";
import { Logo } from "./Logo";
import { LottieIcon } from "./LottieIcon";
import { OpeningStatus } from "./OpeningStatus";
import { ReviewMarqueeSection } from "./ReviewMarqueeSection";
import { SiteHeader } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";
import { MobileStickyActions } from "./MobileStickyActions";
import { MobileUseCarousel } from "./MobileUseCarousel";
import { PriceCard } from "./PriceCard";
import { HomePriceToggle } from "./HomePriceToggle";
import {
  locations,
  priceItems,
  trustItems,
  reviewsForLocation,
  buildLocalBusinessJsonLd,
  useCases,
  mobileUseCaseStories,
  mobilePriceTeasers,
  contactInfo,
  type Location,
} from "../data/site-data";
import { absoluteUrl } from "../seo";

function LocationJsonLd({ location }: { location: Location }) {
  const schema = buildLocalBusinessJsonLd(location);

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

function LocationBreadcrumbJsonLd({ location }: { location: Location }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Waschbar", item: absoluteUrl("/") },
      {
        "@type": "ListItem",
        position: 2,
        name: `Waschsalon ${location.city}`,
        item: absoluteUrl(location.href),
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
      question: `Gilt die Waschbar Mitgliedskarte auch in ${location.city}?`,
      answer: `Ja. Mit der Waschbar Mitgliedskarte kannst du das SB-Wasch-Abo nutzen: 10 Waschgänge und 10 Trocknergänge für 29,99 € im Monat.`,
    },
  ];

  return (
    <>
      <LocationJsonLd location={location} />
      <LocationFaqJsonLd faqs={locationFaqs} />
      <LocationBreadcrumbJsonLd location={location} />
      <main className="site-shell">
        <SiteHeader />

        <div className="hero-sticky-wrap">
        <section className="hero">
          <div className="hero-copy">
            <h1 className="location-hero-title">Waschsalon {location.city}</h1>
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
              <Image
                className="mobile-hero-speed-badge"
                src="/images/waschbar-29min-badge.webp"
                alt=""
                width={1254}
                height={1254}
                priority
              />
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
          primaryLabel="Abo heute sichern"
          primaryHref="/angebote/kundenkarte-guthaben"
          primaryIcon="card"
          phoneHref={`tel:${contactInfo.phoneHref}`}
          mapsHref={location.mapsUrl}
        />

        <section
          className="trust-proof"
          aria-label={`${location.name} Standort- und Serviceversprechen`}
        >
          <article>
            <LottieIcon src="/animations/wait.json" label="Uhr Animation" />
            <span>Jetzt einplanen</span>
            <strong>Täglich 06:00 - 24:00 Uhr</strong>
          </article>
          <article>
            <LottieIcon src="/animations/washing-machine.json" label="Waschmaschine Animation" />
            <span>Self-Service</span>
            <strong>Waschen und trocknen direkt vor Ort</strong>
          </article>
          <article>
            <Icon name="pin" />
            <span>Adresse</span>
            <strong>{location.address}</strong>
          </article>
        </section>

        <section className="section seo-intro">
          <div className="seo-intro-logo">
            <Logo />
          </div>
          <h2>
            Waschsalon {location.city}
            <br />
            {location.audienceLabel}
          </h2>
          <p>{location.longAngle}</p>
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
                <LottieIcon src="/animations/wait.json" label="Ohne Termin Animation" />
                <div>
                  <strong>Ohne Termin</strong>
                  <span>Einfach vorbeikommen.</span>
                </div>
              </div>
              <div>
                <LottieIcon src="/animations/washing-machine-2.json" label="Große Trommeln Animation" />
                <div>
                  <strong>Große Trommeln</strong>
                  <span>Bis 15 kg waschen.</span>
                </div>
              </div>
              <div>
                <LottieIcon src="/animations/laundry-2.json" label="Self-Service Animation" />
                <div>
                  <strong>Self-Service</strong>
                  <span>Selbst erledigen.</span>
                </div>
              </div>
              <div>
                <LottieIcon src="/animations/credit-card-2.json" label="Mitgliedskarte Animation" />
                <div>
                  <strong>Mitgliedskarte</strong>
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
              <LottieIcon src="/animations/wait.json" label="Ohne Termin Animation" />
              <div>
                <strong>Ohne Termin</strong>
                <span>Einfach vorbeikommen und starten.</span>
              </div>
            </div>
            <div>
              <LottieIcon src="/animations/washing-machine-2.json" label="Große Trommeln Animation" />
              <div>
                <strong>Große Trommeln</strong>
                <span>Waschen bis 15 kg, direkt vor Ort trocknen.</span>
              </div>
            </div>
            <div>
              <LottieIcon src="/animations/laundry-2.json" label="Self-Service Animation" />
              <div>
                <strong>Self-Service</strong>
                <span>Waschen und trocknen selbst erledigen.</span>
              </div>
            </div>
            <div>
              <LottieIcon src="/animations/credit-card-2.json" label="Mitgliedskarte Animation" />
              <div>
                <strong>Mitgliedskarte</strong>
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
            ob sie frei ist. Für regelmäßige Waschtage kannst du mit der
            Waschbar Mitgliedskarte auf das SB-Wasch-Abo wechseln: 10 Waschgänge
            und 10 Trocknergänge für 29,99 € im Monat.
          </p>
          {location.slug === "heidelberg" ? (
            <HomePriceToggle items={priceItems} />
          ) : (
            <div className="price-grid">
              {priceItems.map((item) => (
                <PriceCard item={item} key={item.title} />
              ))}
            </div>
          )}
        </section>

        <section className="section use-case-section" id="waesche">
          <div className="use-case-scene">
            <Image
              src="/images/waschbar-use-cases-scene-v2.webp"
              alt={`Waschbar ${location.city} mit Bettdecken, Wäschekorb, Sportkleidung und Sachen für Haustiere`}
              width={1672}
              height={941}
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
          id="ausstattung"
          aria-label={`Pet Station und Cleaning Station in ${location.city}`}
        >
          <div className="mobile-feature-heading">
            <p className="section-kicker">Spezialstationen</p>
            <h2>Extra sauber für besondere Wäsche in {location.city}</h2>
          </div>
          <div className="feature-stage-intro">
            <p className="section-kicker">Spezialstationen</p>
            <h2>
              Wir haben spezielle Maschinen, in denen du Tierdecken und
              Reinigungsutensilien waschen kannst – so wird alles
              hygienischer sauber.
            </h2>
          </div>
          <div className="feature-stage">
            <Image
              src="/images/waschbar-pet-cleaning-section-v2.webp"
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
                <p className="section-kicker">Reinigungsutensilien</p>
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
          <div className="rabattkarte-abo-showcase">
            <div className="rabattkarte-abo-offer">
              <div className="rabattkarte-abo-kicker">
                <span aria-hidden="true" />
                Mitgliedskarte
                <span aria-hidden="true" />
              </div>
              <h2>SB-Wasch-Abo</h2>
              <div className="rabattkarte-abo-price">
                <strong>29,99 €</strong>
                <span>
                  statt <s>85 €</s>
                </span>
              </div>
              <div className="rabattkarte-abo-includes" aria-label="Enthalten im SB-Wasch-Abo">
                <span>
                  <LottieIcon src="/animations/washing-machine.json" label="Waschgang Animation" />
                  <strong>10 Waschgänge</strong>
                </span>
                <span>
                  <LottieIcon src="/animations/laundry-2.json" label="Trockner Animation" />
                  <strong>10 Trocknergänge</strong>
                </span>
              </div>
              <Image
                className="rabattkarte-abo-card-image"
                src="/images/generated/waschbar-rabattkarte-product-cutout.png"
                alt={`Waschbar Mitgliedskarte für das SB-Wasch-Abo in ${location.city}`}
                width={1535}
                height={1024}
                sizes="(max-width: 700px) 96vw, 720px"
              />
              <div className="rabattkarte-abo-savings" aria-label="Spare über 60 Prozent mit Mitgliedskarte">
                <strong>Spare über</strong>
                <b>60%</b>
                <span>mit Mitgliedskarte</span>
              </div>
            </div>
            <div className="rabattkarte-abo-explainer">
              <h2>
                <span>Mehr waschen.</span>
                <span>Weniger zahlen.</span>
              </h2>
              <p>
                Unser neues SB-Wasch-Abo mit Mitgliedskarte gibt dir jeden Monat
                ein festes Kontingent - zum fairen Fixpreis und mit{" "}
                <strong>über 60% Ersparnis.</strong>
              </p>
              <div className="rabattkarte-abo-steps" aria-label="So funktioniert das SB-Wasch-Abo">
                <article>
                  <span className="rabattkarte-step-number">1</span>
                  <Icon name="card" />
                  <div>
                    <h3>Mitgliedskarte nutzen</h3>
                    <p>Mit deiner Mitgliedskarte meldest du dich an der Maschine an.</p>
                  </div>
                </article>
                <article>
                  <span className="rabattkarte-step-number">2</span>
                  <Icon name="washer" />
                  <div>
                    <h3>Wasch/Trockner starten</h3>
                    <p>Starte Wasch- oder Trocknergänge wie gewohnt an unseren modernen Maschinen.</p>
                  </div>
                </article>
                <article>
                  <span className="rabattkarte-step-number">3</span>
                  <Icon name="wallet-plus" />
                  <div>
                    <h3>monatliches Kontingent sparen</h3>
                    <p>Du nutzt dein monatliches Kontingent und sparst über 60% gegenüber Einzelpreisen.</p>
                  </div>
                </article>
              </div>
              <Link className="rabattkarte-abo-cta" href="/angebote/kundenkarte-guthaben">
                <Icon name="card" />
                <span>
                  <strong>SB-Wasch-Abo heute sichern!</strong>
                  <small>Mehr waschen. Weniger zahlen.</small>
                </span>
              </Link>
            </div>
          </div>
        </section>

        <ReviewMarqueeSection
          reviews={cityReviews}
          title={`Beispielstimmen aus ${location.city}.`}
          subtitle={`Stimmen rund um Waschbar ${location.city}: große Wäsche, Alltagswäsche und Spezialstationen.`}
          mapsUrl={location.mapsUrl}
        />

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
                  src="/images/waschbar-faq-entrance-real.webp"
                  alt={`Waschbar ${location.city} Innenraum mit Holzwand, Logo, Kassenautomat und Eingang`}
                  fill
                  sizes="(max-width: 900px) 100vw, 56vw"
                />
              </div>
              <div className="faq-media-small">
                <Image
                  src="/images/waschbar-faq-machines-real.webp"
                  alt={`Waschbar ${location.city} Waschmaschinen mit Pet Station und Cleaning Station`}
                  fill
                  sizes="(max-width: 900px) 50vw, 26vw"
                />
              </div>
              <div className="faq-media-small">
                <Image
                  src="/images/waschbar-faq-dryers-real.webp"
                  alt={`Waschbar ${location.city} Trocknerwand mit Dry Bereich`}
                  fill
                  sizes="(max-width: 900px) 50vw, 26vw"
                />
              </div>
              <div className="faq-media-small">
                <Image
                  src="/images/waschbar-faq-storefront-real.webp"
                  alt={`Waschbar ${location.city} Eingang mit Leuchtschild`}
                  fill
                  sizes="(max-width: 900px) 50vw, 26vw"
                />
              </div>
              <div className="faq-media-small">
                <Image
                  src="/images/waschbar-faq-wash-wall-real.webp"
                  alt={`Waschbar ${location.city} Waschmaschinenreihe mit Wash-Beschriftung`}
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
