import type { Metadata } from "next";
import { SiteHeader } from "../components/SiteHeader";
import { SiteFooter } from "../components/SiteFooter";
import { contactInfo, locations } from "../data/site-data";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Datenschutzerklärung | Waschbar",
  description:
    "Datenschutzerklärung von Waschbar Heidelberg und Waschbar Ludwigshafen gemäß DSGVO.",
  alternates: {
    canonical: "/datenschutz",
  },
  robots: {
    index: false,
    follow: true,
  },
};

const accessData = [
  "IP-Adresse",
  "Datum und Uhrzeit der Anfrage",
  "Browsertyp und Browserversion",
  "Betriebssystem",
  "Referrer-URL",
  "Besuchte Seiten",
];

const rights = [
  "Recht auf Auskunft (Art. 15 DSGVO)",
  "Recht auf Berichtigung (Art. 16 DSGVO)",
  "Recht auf Löschung (Art. 17 DSGVO)",
  "Recht auf Einschränkung der Verarbeitung (Art. 18 DSGVO)",
  "Recht auf Datenübertragbarkeit (Art. 20 DSGVO)",
  "Recht auf Widerspruch gegen die Verarbeitung (Art. 21 DSGVO)",
  "Recht auf Widerruf einer erteilten Einwilligung (Art. 7 Abs. 3 DSGVO)",
  "Recht auf Beschwerde bei einer Datenschutzaufsichtsbehörde (Art. 77 DSGVO)",
];

function LegalList({ items }: { items: string[] }) {
  return (
    <ul className="legal-list">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

export default function DatenschutzPage() {
  return (
    <>
      <main className="site-shell">
        <SiteHeader />

        <section className="section legal-page">
          <p className="section-kicker">Datenschutz</p>
          <h1 className="legal-title">Datenschutzerklärung</h1>

          <article className="legal-article">
            <section>
              <h2>1. Verantwortliche Stellen</h2>
              <p>
                Verantwortlich für die Datenverarbeitung auf dieser Website sind die Betreiber
                der beiden Waschbar Standorte:
              </p>
              {locations.map((location) => (
                <address key={location.slug} className="legal-address">
                  {location.name}
                  <br />
                  {location.street}
                  <br />
                  {location.postalCode} {location.addressLocality}
                  <br />
                  Die vollständigen Angaben zur Vertretung (Geschäftsführung) und zum
                  Handelsregistereintrag finden Sie im Impressum {location.city}.
                </address>
              ))}
              <p>
                Kontakt:
                <br />
                E-Mail:{" "}
                <a href={`mailto:${contactInfo.email}`}>{contactInfo.email}</a>
                <br />
                Telefon:{" "}
                <a href={`tel:${contactInfo.phoneHref}`}>{contactInfo.phone}</a>
              </p>
            </section>

            <section>
              <h2>2. Allgemeine Hinweise zur Datenverarbeitung</h2>
              <p>
                Wir verarbeiten personenbezogene Daten nur, soweit dies zur Bereitstellung
                dieser Website sowie zur Beantwortung von Anfragen erforderlich ist. Die
                Verarbeitung erfolgt auf Grundlage der Datenschutz-Grundverordnung (DSGVO).
              </p>
            </section>

            <section>
              <h2>3. Hosting und Zugriffsdaten</h2>
              <p>
                Diese Website wird bei Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789,
                USA, gehostet. Beim Aufruf der Website erfasst unser Hosting-Anbieter
                automatisch technische Zugriffsdaten, insbesondere:
              </p>
              <LegalList items={accessData} />
              <p>
                Diese Daten werden ausschließlich zur Sicherstellung eines störungsfreien
                Betriebs sowie zur Gewährleistung der Sicherheit unserer Website verarbeitet
                und dienen nicht dazu, Rückschlüsse auf Ihre Person zu ziehen. Rechtsgrundlage
                ist Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an einem sicheren und
                stabilen Betrieb der Website).
              </p>
              <p>
                Weitere Informationen:{" "}
                <a
                  href="https://vercel.com/legal/privacy-policy"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  https://vercel.com/legal/privacy-policy
                </a>
              </p>
            </section>

            <section>
              <h2>4. Google Maps</h2>
              <p>
                Auf den Standortseiten binden wir Kartenmaterial des Dienstes Google Maps
                ein, um Ihnen Anfahrt und Standort anschaulich darzustellen. Anbieter ist
                Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland
                (&quot;Google&quot;).
              </p>
              <p>
                Beim Aufruf einer Seite mit eingebundener Google-Maps-Karte wird bereits vor
                einer Interaktion eine Verbindung zu Servern von Google hergestellt, wobei
                Ihre IP-Adresse an Google übermittelt werden kann. Die Nutzung erfolgt im
                Interesse einer ansprechenden Darstellung unserer Standorte und einer
                leichten Auffindbarkeit auf Karten gemäß Art. 6 Abs. 1 lit. f DSGVO.
              </p>
              <p>
                Weitere Informationen zur Datenverarbeitung durch Google:{" "}
                <a
                  href="https://policies.google.com/privacy"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  https://policies.google.com/privacy
                </a>
              </p>
            </section>

            <section>
              <h2>5. Kontaktaufnahme</h2>
              <p>
                Wenn Sie uns per E-Mail oder Telefon kontaktieren, verarbeiten wir die von
                Ihnen übermittelten Daten (z. B. Name, Kontaktdaten, Inhalt Ihrer Anfrage)
                ausschließlich zur Bearbeitung Ihres Anliegens. Rechtsgrundlage ist Art. 6
                Abs. 1 lit. b DSGVO, sofern Ihre Anfrage vorvertraglichen Maßnahmen dient,
                andernfalls Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an der
                Beantwortung von Anfragen).
              </p>
            </section>

            <section>
              <h2>6. Newsletter-Anmeldung</h2>
              <p>
                Auf unserer Website findet sich ein Eingabefeld für eine Newsletter-Anmeldung.
                Diese Funktion ist derzeit nicht mit einem Versanddienst verbunden: Es werden
                aktuell keine E-Mail-Adressen gespeichert oder verarbeitet. Sobald ein
                Newsletter-Versand technisch aktiviert wird, wird diese Datenschutzerklärung
                um die entsprechenden Angaben zu Anbieter, Zweck und Rechtsgrundlage der
                Verarbeitung ergänzt.
              </p>
            </section>

            <section>
              <h2>7. Cookies und lokale Speicherung</h2>
              <p>
                Diese Website setzt keine Analyse- oder Marketing-Cookies ein. Es werden
                keine Tracking- oder Werbedienste Dritter genutzt.
              </p>
            </section>

            <section>
              <h2>8. Schriftarten</h2>
              <p>
                Wir verwenden die Schriftart Geist. Diese wird über next/font automatisch
                beim Erstellen der Website lokal eingebunden und von unserem eigenen
                Hosting-Anbieter ausgeliefert. Beim Aufruf unserer Website wird keine
                Verbindung zu Servern von Google Fonts oder anderen externen
                Schriftart-Anbietern hergestellt.
              </p>
            </section>

            <section>
              <h2>9. Ihre Rechte</h2>
              <p>Ihnen stehen nach der DSGVO folgende Rechte zu:</p>
              <LegalList items={rights} />
            </section>

            <section>
              <h2>10. Datenübermittlung in Drittländer</h2>
              <p>
                Einzelne der von uns eingesetzten Dienstleister (u. a. Vercel Inc. und
                Google Ireland Limited als Teil des Google-Konzerns) verarbeiten Daten auch
                außerhalb der Europäischen Union bzw. des Europäischen Wirtschaftsraums.
                Eine solche Übermittlung erfolgt nur, sofern hierfür eine
                datenschutzrechtliche Grundlage besteht, insbesondere ein
                Angemessenheitsbeschluss der EU-Kommission oder geeignete Garantien wie
                EU-Standardvertragsklauseln gemäß Art. 44 ff. DSGVO.
              </p>
            </section>

            <section>
              <h2>11. Speicherdauer</h2>
              <p>
                Personenbezogene Daten werden nur so lange gespeichert, wie dies zur
                Erfüllung des jeweiligen Verarbeitungszwecks erforderlich ist oder
                gesetzliche Aufbewahrungspflichten bestehen.
              </p>
            </section>

            <section>
              <h2>12. Aktualität und Änderung dieser Datenschutzerklärung</h2>
              <p>
                Diese Datenschutzerklärung ist aktuell gültig. Aufgrund geänderter
                gesetzlicher Vorgaben oder Änderungen unseres Angebots kann eine
                Aktualisierung erforderlich werden.
              </p>
              <p>Stand: Juli 2026</p>
            </section>
          </article>
        </section>

        <SiteFooter />
      </main>
    </>
  );
}
