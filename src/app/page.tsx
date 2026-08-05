import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { LottieIcon } from "./components/LottieIcon";
import { Logo } from "./components/Logo";
import { OpeningStatus } from "./components/OpeningStatus";
import { Icon } from "./components/Icon";
import { MobileUseCarousel } from "./components/MobileUseCarousel";
import { ReviewMarqueeSection } from "./components/ReviewMarqueeSection";
import { FaqSection } from "./components/FaqSection";
import { HomePriceToggle } from "./components/HomePriceToggle";
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
        department: locations.map((location) => ({
          "@id": `${absoluteUrl(location.href)}#business`,
        })),
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
                Abo heute sichern <Icon name="card" />
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
          primaryLabel="Abo heute sichern"
          primaryHref="/angebote/kundenkarte-guthaben"
          primaryIcon="card"
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
          <HomePriceToggle items={priceItems} />
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
                alt="Waschbar Mitgliedskarte"
                width={1535}
                height={1024}
                sizes="(max-width: 700px) 82vw, 560px"
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
