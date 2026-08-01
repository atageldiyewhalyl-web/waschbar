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

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "10 € Gratis-Guthaben | Waschbar Heidelberg & Ludwigshafen",
  description:
    "Sichere dir 10 € Gratis-Guthaben für deine erste Wäsche bei Waschbar. Einfach eintragen, Code erhalten und vor Ort einlösen.",
  robots: {
    index: false,
    follow: false,
  },
};

const proofItems = [
  {
    animation: "/animations/open-gift.json",
    title: "10 € gratis sichern",
    copy: "Deine ersten 10 € Wäsche gehen auf uns.",
  },
  {
    animation: "/animations/credit-card-2.json",
    title: "Rabattkarte vor Ort",
    copy: "Du bekommst dein Guthaben auf deine Waschbar Rabattkarte.",
  },
  {
    animation: "/animations/sale.json",
    title: "Danach weiter sparen",
    copy: "Mit Ladebonus erhältst du bis zu 25% mehr Guthaben.",
  },
];

const steps = [
  {
    icon: "card-hand",
    title: "Eintragen",
    copy: "Formular ausfüllen und Standort wählen.",
  },
  {
    icon: "mail",
    title: "Code erhalten",
    copy: "Gutschein-Code direkt per E-Mail erhalten.",
  },
  {
    icon: "pin",
    title: "Vor Ort einlösen",
    copy: "Code zeigen und 10 € Guthaben nutzen.",
  },
];

export default function KundenkarteGuthabenPage() {
  return (
    <main className="campaign-page">
      <CampaignHeader />

      <section className="campaign-hero">
        <div className="campaign-hero-bg">
          <Image
            className="campaign-hero-bg-desktop"
            src="/images/waschbar-rabattkarte-hero-wall.png"
            alt=""
            fill
            priority
            sizes="100vw"
          />
          <Image
            className="campaign-hero-bg-mobile"
            src="/images/Waschbar angebot phone.png"
            alt=""
            fill
            priority
            sizes="100vw"
          />
        </div>

        <div className="campaign-hero-copy">
          <div className="campaign-offer-band" aria-label="10 Euro Gratis-Guthaben Angebot">
            <div>
              <span>Willkommensguthaben</span>
              <span className="campaign-offer-amount">
                <strong>10 €</strong>
                <em>gratis</em>
              </span>
            </div>
            <p>
              Für deine erste Wäsche bei Waschbar. Danach weiter sparen mit bis
              zu 25% Ladebonus.
            </p>
            <p>
              Sichere dir jetzt 10 € Gratis-Guthaben. Einfach eintragen, Code
              erhalten und vor Ort einlösen.
            </p>
          </div>
        </div>

        <div className="campaign-hero-form">
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
        <h2>
          <span className="campaign-steps-title-line">In 3 Schritten zu deinem</span>
          <span className="campaign-steps-title-line">Gratis-Guthaben</span>
        </h2>
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

      <ReviewMarqueeSection
        reviews={reviews}
        title="Beispielstimmen aus dem Waschsalon."
        subtitle="Stimmen aus Heidelberg, Ludwigshafen und der Rhein-Neckar-Region."
      />

      <FaqSection />

      <CampaignFooter />
    </main>
  );
}
