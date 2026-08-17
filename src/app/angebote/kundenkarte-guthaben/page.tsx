import type { Metadata } from "next";
import Image from "next/image";
import { CampaignFooter } from "../../components/CampaignFooter";
import { CampaignHeader } from "../../components/CampaignHeader";
import { Icon } from "../../components/Icon";
import { LottieIcon } from "../../components/LottieIcon";
import { FaqSection } from "../../components/FaqSection";
import { ReviewMarqueeSection } from "../../components/ReviewMarqueeSection";
import { VoucherForm } from "../../components/VoucherForm";
import { reviews } from "../../data/site-data";
import { absoluteUrl } from "../../seo";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "SB-Wasch-Abo mit Mitgliedskarte | Waschbar Heidelberg",
  description:
    "Sichere dir das erste SB-Wasch-Abo in Heidelberg: 10 Waschgänge und 10 Trocknergänge für 29,99 € im Monat mit Waschbar Mitgliedskarte.",
  alternates: { canonical: "/angebote/kundenkarte-guthaben" },
  robots: {
    index: false,
    follow: false,
  },
};

const proofItems = [
  {
    animation: "/animations/washing-machine.json",
    title: "10 Waschgänge",
    copy: "Monatliches Kontingent für deine regelmäßigen Waschtage.",
  },
  {
    animation: "/animations/laundry-2.json",
    title: "10 Trocknergänge",
    copy: "Je 20 Minuten trocknen - direkt an unseren modernen Maschinen.",
  },
  {
    animation: "/animations/sale.json",
    title: "Über 60% sparen",
    copy: "Für 29,99 € im Monat statt regulär 85 € Einzelpreis.",
  },
];

const steps = [
  {
    image: "/images/generated/abo-step-form.png",
    title: "Formular ausfüllen",
    copy: "Fülle unser Online-Formular aus und wähle deinen Waschbar Standort aus.",
  },
  {
    image: "/images/generated/abo-step-email.png",
    title: "Vertrag per E-Mail",
    copy: "Wir senden dir deinen persönlichen Vertrag bequem per E-Mail zu.",
  },
  {
    image: "/images/generated/abo-step-contract.png",
    title: "Vertrag akzeptieren",
    copy: "Prüfe den Vertrag und akzeptiere ihn einfach online mit deiner digitalen Unterschrift.",
  },
  {
    image: "/images/generated/abo-step-delivery.png",
    badge: "in ca. 4 Tagen",
    title: "Mitgliedskarte nach Hause",
    copy: "Deine Waschbar Mitgliedskarte erhältst du innerhalb von ca. 4 Tagen bequem per Post.",
  },
  {
    image: "/images/generated/abo-step-use.png",
    title: "Abo nutzen",
    copy: "Karte an der Maschine nutzen und dein monatliches Kontingent starten.",
  },
];

const salonPerks = [
  {
    icon: "clock",
    title: "Täglich 06-24 Uhr",
    copy: "Waschen, wenn es in deinen Alltag passt.",
  },
  {
    icon: "washer",
    title: "Moderne große Maschinen",
    copy: "Ideal für Wochenwäsche, Bettwäsche und Arbeitskleidung.",
  },
  {
    icon: "sparkle",
    title: "Sauberer SB-Waschsalon",
    copy: "Helle Räume, klare Bedienung und gepflegte Maschinen.",
  },
];

function CampaignJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${absoluteUrl("/angebote/kundenkarte-guthaben")}#webpage`,
    url: absoluteUrl("/angebote/kundenkarte-guthaben"),
    name: "SB-Wasch-Abo mit Mitgliedskarte | Waschbar Heidelberg",
    isPartOf: { "@id": `${absoluteUrl("/")}#website` },
    about: { "@id": `${absoluteUrl("/heidelberg")}#business` },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export default function KundenkarteGuthabenPage() {
  return (
    <main className="campaign-page">
      <CampaignJsonLd />
      <CampaignHeader />

      <section className="campaign-hero">
        <div className="campaign-hero-bg">
          <Image
            className="campaign-hero-bg-desktop"
            src="/images/generated/waschbar-abo-hero-wall-card-wide.png"
            alt=""
            fill
            priority
            sizes="100vw"
          />
          <Image
            className="campaign-hero-bg-mobile"
            src="/images/Waschbar angebot phone.webp"
            alt=""
            fill
            priority
            sizes="100vw"
          />
        </div>

        <div className="campaign-hero-copy">
          <div className="campaign-offer-band" aria-label="SB-Wasch-Abo Angebot">
            <span className="campaign-offer-pill">Das erste SB-Wasch-Abo in Heidelberg</span>
            <div className="campaign-offer-price">
              <strong>29,99 €</strong>
              <em>im Monat</em>
            </div>
            <p className="campaign-offer-old-price">statt 85 €</p>
            <div className="campaign-offer-chips" aria-label="Im Abo enthalten">
              <span>
                <span className="campaign-offer-animation">
                  <LottieIcon src="/animations/washing-machine.json" label="Waschmaschine Animation" />
                </span>
                <strong>10 Waschgänge</strong>
              </span>
              <span>
                <span className="campaign-offer-animation">
                  <LottieIcon src="/animations/laundry-2.json" label="Trockner Animation" />
                </span>
                <span className="campaign-offer-chip-copy">
                  <strong>10 Trocknergänge</strong>
                  <small>je 20 Minuten</small>
                </span>
              </span>
            </div>
            <div className="campaign-offer-saving">
              <span className="campaign-offer-saving-icon">
                <LottieIcon src="/animations/sale.json" label="Sparen Animation" />
              </span>
              <strong>Spare über 60% mit Mitgliedskarte</strong>
            </div>
          </div>
        </div>

        <section className="campaign-salon-proof" aria-label="Warum Waschbar">
          <div className="campaign-salon-photos">
            <span className="campaign-salon-photo campaign-salon-photo-main">
              <Image
                src="/images/waschbar-faq-machines-real.webp"
                alt="Moderne Waschmaschinen im Waschbar SB-Waschsalon"
                fill
                sizes="(max-width: 640px) 84vw, 240px"
              />
            </span>
            <span className="campaign-salon-photo">
              <Image
                src="/images/waschbar-faq-entrance-real.webp"
                alt="Eingang des Waschbar SB-Waschsalons"
                fill
                sizes="(max-width: 640px) 36vw, 140px"
              />
            </span>
          </div>
          <div className="campaign-salon-copy">
            <p>Warum Waschbar?</p>
            <div className="campaign-salon-perks">
              {salonPerks.map((perk) => (
                <article key={perk.title}>
                  <span><Icon name={perk.icon} /></span>
                  <div>
                    <strong>{perk.title}</strong>
                    <small>{perk.copy}</small>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <div className="campaign-hero-form">
          <div className="campaign-form-reassurance">
            <Icon name="shield" />
            <div>
              <strong>Keine Zahlung jetzt</strong>
              <span>Du bekommst zuerst alle Infos und den Vertrag per E-Mail.</span>
            </div>
          </div>
          <VoucherForm />
        </div>
      </section>

      <section className="campaign-proof" aria-label="Vorteile des Angebots">
        {proofItems.map((item) => (
          <article key={item.title}>
            <span className="campaign-proof-icon">
              <LottieIcon src={item.animation} label={`${item.title} Animation`} />
            </span>
            <div>
              <strong>{item.title}</strong>
              <span className="campaign-proof-copy">{item.copy}</span>
            </div>
          </article>
        ))}
      </section>

      <section className="campaign-steps" aria-label="So funktioniert's">
        <p className="section-kicker">So einfach geht&apos;s</p>
        <h2>So kommst du zu deinem SB-Wasch-Abo</h2>
        <p className="campaign-steps-intro">
          Anfragen, Vertrag bestätigen, Mitgliedskarte erhalten und direkt loswaschen.
        </p>
        <div className="campaign-timeline">
          {steps.map((step, index) => (
            <article className="campaign-timeline-step" key={step.title}>
              <span className="campaign-timeline-number">{index + 1}</span>
              {step.badge && <span className="campaign-timeline-badge">{step.badge}</span>}
              <span className="campaign-timeline-visual">
                <Image
                  className="campaign-timeline-art"
                  src={step.image}
                  alt=""
                  fill
                  sizes="(max-width: 640px) 150px, 170px"
                />
              </span>
              <h3>{step.title}</h3>
              <p>{step.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <ReviewMarqueeSection
        reviews={reviews}
        title="Beispielstimmen aus dem Waschsalon."
        subtitle="Stimmen aus Heidelberg, Ludwigshafen und der Rhein-Neckar-Region."
      />

      <FaqSection campaignCta />

      <CampaignFooter />
    </main>
  );
}
