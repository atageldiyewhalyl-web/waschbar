import Image from "next/image";
import { Icon } from "./Icon";
import { faqs, locations } from "../data/site-data";

export function FaqSection() {
  return (
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
              src="/images/waschbar-faq-entrance-real.jpeg"
              alt="Waschbar Innenraum mit Holzwand, Logo, Kassenautomat und Eingang"
              fill
              sizes="(max-width: 900px) 100vw, 56vw"
            />
          </div>
          <div className="faq-media-small">
            <Image
              src="/images/waschbar-faq-machines-real.jpeg"
              alt="Waschbar Waschmaschinen mit Pet Station und Cleaning Station"
              fill
              sizes="(max-width: 900px) 50vw, 26vw"
            />
          </div>
          <div className="faq-media-small">
            <Image
              src="/images/waschbar-faq-dryers-real.jpeg"
              alt="Waschbar Trocknerwand mit Dry Bereich"
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
  );
}
