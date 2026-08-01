import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { LottieIcon } from "./components/LottieIcon";
import { Logo } from "./components/Logo";
import { OpeningStatus } from "./components/OpeningStatus";
import { Icon } from "./components/Icon";
import { MobileUseCarousel } from "./components/MobileUseCarousel";
import { PriceCard } from "./components/PriceCard";
import { ReviewMarqueeSection } from "./components/ReviewMarqueeSection";
import { FaqSection } from "./components/FaqSection";
import { SiteHeader } from "./components/SiteHeader";
import { SiteFooter } from "./components/SiteFooter";
import { MobileStickyActions } from "./components/MobileStickyActions";
import { absoluteUrl } from "./seo";
import {
  locations,
  machineSizes,
  priceItems,
  reviews,
  useCases,
  mobileUseCaseStories,
  mobilePriceTeasers,
  mobileKundenkarteBenefits,
  contactInfo,
  faqs,
} from "./data/site-data";

export const dynamic = "force-static";
export const revalidate = 86400;

export const metadata: Metadata = {
  title: "Waschsalon Heidelberg & Ludwigshafen | Waschbar",
  description:
    "Waschbar ist dein moderner SB Waschsalon in Heidelberg und Ludwigshafen. Waschen, trocknen und große Wäsche täglich von 06:00 bis 24:00 Uhr.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Waschsalon Heidelberg & Ludwigshafen | Waschbar",
    description:
      "Moderne Maschinen, faire Preise und Self-Service in Heidelberg und Ludwigshafen.",
    url: absoluteUrl("/"),
    type: "website",
    images: ["/images/waschbar-hero-background-v2.webp"],
  },
};

function JsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${absoluteUrl("/")}#organization`,
        name: "Waschbar",
        description:
          "Waschbar betreibt moderne SB Waschsalons in Heidelberg und Ludwigshafen.",
        areaServed: ["Heidelberg", "Ludwigshafen am Rhein"],
        url: absoluteUrl("/"),
        logo: absoluteUrl("/images/waschbar-logo-transparent.webp"),
        sameAs: locations.map((location) => location.mapsUrl),
      },
      {
        "@type": "WebSite",
        "@id": `${absoluteUrl("/")}#website`,
        name: "Waschbar",
        url: absoluteUrl("/"),
        inLanguage: "de-DE",
        publisher: { "@id": `${absoluteUrl("/")}#organization` },
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
            <h1>
              Waschbar macht deinen Waschtag
              <span>einfach, schnell und stressfrei.</span>
            </h1>
            <div className="mobile-hero-status">
              <OpeningStatus />
              <span>Täglich 06-24 Uhr</span>
            </div>
            <div className="hero-actions">
              <a className="button button-primary" href="/angebote/kundenkarte-guthaben">
                10 € Gratis sichern <Icon name="gift" />
              </a>
              <a className="hero-secondary-link" href="#preise">
                Preise ansehen
              </a>
            </div>
            <div className="hero-stats" aria-label="Waschbar Kennzahlen">
              <div>
                <strong>2</strong>
                <span>Standorte in der Region</span>
              </div>
              <div>
                <strong>29 Min</strong>
                <span>Ø Waschzeit pro Ladung</span>
              </div>
            </div>
          </div>
          <div className="hero-media">
            <Image
              className="hero-base-image"
              src="/images/waschbar-hero-background-v2.webp"
              alt="Waschbar SB Waschsalon Logo an Holzlamellenwand mit Waschbar Tragetasche"
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
                src="/images/waschbar-hero-logo.webp"
                alt=""
                fill
                priority
                sizes="100vw"
              />
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
              <h1>
                SB Waschsalon
                <span>Heidelberg & Ludwigshafen</span>
              </h1>
              <p>
                Ideal für Studierende, Wohngemeinschaften, Monteure und die
                wöchentliche Großwäsche für jedermann.
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
          primaryLabel="10 € Gratis sichern"
          primaryHref="/angebote/kundenkarte-guthaben"
          primaryIcon="gift"
          phoneHref={`tel:${contactInfo.phoneHref}`}
          mapsHref={locations[0].mapsUrl}
        />

        <section className="trust-proof" aria-label="Waschbar Standort- und Serviceversprechen">
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
            <LottieIcon src="/animations/coming-soon.json" label="Uhr Animation" />
            <span>29 Minuten</span>
            <strong>In nur 29 min zur sauberen Wäsche</strong>
          </article>
        </section>

        <section className="section seo-intro">
          <div className="seo-intro-logo">
            <Logo />
          </div>
          <h2>
            SB Waschsalon
            <br />
            in Heidelberg &amp; Ludwigshafen
          </h2>
          <p>
            Waschbar ist dein moderner Selbstbedienungs-Waschsalon in
            Heidelberg und Ludwigshafen. An beiden Standorten erwarten dich
            leistungsstarke Waschmaschinen und Trockner sowie faire Preise
            und Self-Service. Ideal für Studierende, Wohngemeinschaften,
            Monteure und die wöchentliche Großwäsche für jedermann. Kein
            Termin, keine Wartezeit. Täglich von 06:00 bis 24:00 Uhr
            geöffnet.
          </p>
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
              src="/images/waschbar-use-cases-scene-v2.webp"
              alt="Bettdecken, Wäschekorb, Reinigungsutensilien und Sachen für Haustiere vor blauem Hintergrund"
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

        <section className="feature-band" id="ausstattung" aria-label="Pet Station und Cleaning Station">
          <div className="mobile-feature-heading">
            <p className="section-kicker">Spezialstationen</p>
            <h2>Extra sauber für besondere Wäsche</h2>
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
              alt="Waschmaschine mit Hund, Tierdecke und Reinigungsutensilien im modernen Waschbar Waschsalon"
              fill
              sizes="100vw"
            />
            <article className="feature-panel feature-panel-pet">
              <Icon name="paw" />
              <p className="section-kicker">Spezialwäsche</p>
              <h2>Pet Station</h2>
              <p className="feature-panel-copy">
                Für Hundedecken, Tierbetten und Textilien, die du getrennt von
                deiner Alltagswäsche reinigen möchtest.
              </p>
              <a href="#faq">Mehr erfahren</a>
            </article>
            <article className="feature-panel feature-panel-cleaning">
              <Icon name="shirt" />
              <p className="section-kicker">Reinigungsutensilien</p>
              <h2>Cleaning Station</h2>
              <p className="feature-panel-copy">
                Für Wischmopps, Putztücher und weitere Reinigungsutensilien,
                die hygienisch sauber werden sollen.
              </p>
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
          <h2>
            <span className="price-heading-line">Klare Preise für</span>{" "}
            <span className="price-heading-line">Waschen und Trocknen</span>
          </h2>
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

        <section className="section kundenkarte" id="kundenkarte">
          <div className="kundenkarte-card">
            <div className="kundenkarte-heading">
              <p className="section-kicker">Rabattkarte</p>
              <h2>
                <span className="kundenkarte-heading-line">Bis zu 25% Ladebonus mit der</span>
                <span className="kundenkarte-heading-line kundenkarte-heading-accent">
                  Waschbar Rabattkarte
                </span>
              </h2>
            </div>
            <div className="kundenkarte-hero">
              <Image
                src="/images/card.webp"
                alt="Waschbar Rabattkarte mit Waschmaschinen, Handtuechern und Waschmittel"
                fill
                priority={false}
                sizes="100vw"
              />
              <div className="kundenkarte-benefits" aria-label="Vorteile der Waschbar Rabattkarte">
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
            <div className="kundenkarte-seo-text">
              <p>
                <strong>Deine Waschbar Rabattkarte.</strong> Mehr waschen.
                Weniger zahlen.{" "}
                Mit der Waschbar Rabattkarte sparst du bei jedem Waschgang und
                jeder Trocknung automatisch über dein Bonusguthaben – egal ob
                in Heidelberg oder Ludwigshafen. Du lädst vor Ort Guthaben auf
                und zahlst direkt am Terminal bargeldlos. Die Karte gibt es direkt im Waschsalon:
                kein Abo, keine Anmeldung, keine App.
              </p>
              <div className="kundenkarte-page-action">
                <Link className="button button-primary" href="/rabattkarte">
                  Mehr zur Rabattkarte
                </Link>
              </div>
            </div>
            <div className="mobile-kundenkarte-dashboard">
              <div className="mobile-kundenkarte-copy">
                <p className="section-kicker">Rabattkarte</p>
                <h2>
                  <span className="mobile-kundenkarte-title-line">Bis zu 25% mit der</span>
                  <span className="mobile-kundenkarte-title-line mobile-kundenkarte-title-accent">
                    Waschbar Rabattkarte
                  </span>
                </h2>
                <p>
                  Mehr waschen, weniger zahlen: Hol dir die Rabattkarte, lade
                  Guthaben auf und erhalte automatisch bis zu 25 % Bonusguthaben.
                </p>
              </div>
              <div className="mobile-kundenkarte-savings">
                <div className="mobile-kundenkarte-visual">
                  <Image
                    src="/images/waschbar-kundenkarte-mobile-dashboard-bg.webp"
                    alt="Moderne Waschmaschinen mit Handtuechern als Hintergrund fuer die Rabattkarte"
                    fill
                    sizes="100vw"
                  />
                  <Image
                    className="mobile-kundenkarte-card-image"
                    src="/images/waschbar-kundenkarte-real-card.webp"
                    alt="Waschbar Rabattkarte"
                    width={1535}
                    height={868}
                  />
                  <div className="mobile-kundenkarte-discount" aria-label="Bis zu 25 Prozent Ladebonus">
                    <strong>25%</strong>
                    <span>Bonus</span>
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
                <Link className="mobile-kundenkarte-cta" href="/rabattkarte">
                  <Icon name="pin" />
                  Mehr zur Rabattkarte
                </Link>
              </div>
            </div>
          </div>
        </section>

        <ReviewMarqueeSection
          reviews={reviews}
          title="Beispielstimmen aus dem Waschsalon."
          subtitle="Stimmen aus Heidelberg, Ludwigshafen und der Rhein-Neckar-Region."
          mapsUrl={locations[0].mapsUrl}
        />

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

        <FaqSection />

        <SiteFooter />
        </div>
      </main>
    </>
  );
}
