import type { Metadata } from "next";
import { SiteHeader } from "../components/SiteHeader";
import { SiteFooter } from "../components/SiteFooter";
import { contactInfo } from "../data/site-data";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Impressum | Waschbar",
  description:
    "Impressum der Waschbar Unternehmensgruppe GmbH. Angaben gemäß § 5 TMG.",
  alternates: {
    canonical: "/impressum",
  },
  robots: {
    index: false,
    follow: true,
  },
};

const liabilityContent = [
  "Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen. Als Diensteanbieter sind wir gemäß § 7 Abs. 1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.",
  "Unsere Website enthält Links zu externen Webseiten Dritter (z. B. Google Maps), auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Links umgehend entfernen.",
  "Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.",
];

export default function ImpressumPage() {
  return (
    <>
      <main className="site-shell">
        <SiteHeader />

        <section className="section legal-page">
          <p className="section-kicker">Impressum</p>
          <h1 className="legal-title">Impressum</h1>

          <article className="legal-article">
            <section>
              <h2>Angaben gemäß § 5 TMG</h2>
              <address className="legal-address">
                Waschbar Unternehmensgruppe GmbH
                <br />
                Markircherstraße 14-16
                <br />
                68229 Mannheim
                <br />
                Deutschland
              </address>
              <p>Vertreten durch den Geschäftsführer Mahmut Cevik.</p>
            </section>

            <section>
              <h2>Handelsregister</h2>
              <p>
                Handelsregister: HRB 758129
                <br />
                Registergericht: Amtsgericht Mannheim
              </p>
            </section>

            <section>
              <h2>Kontakt</h2>
              <p>
                Telefon:{" "}
                <a href={`tel:${contactInfo.phoneHref}`}>{contactInfo.phone}</a>
                <br />
                E-Mail:{" "}
                <a href={`mailto:${contactInfo.email}`}>{contactInfo.email}</a>
              </p>
            </section>

            <section>
              <h2>Umsatzsteuer-ID</h2>
              <p>
                Umsatzsteuer-Identifikationsnummer gemäß § 27a Umsatzsteuergesetz:
                <br />
                DE463052415
              </p>
              <p>
                Steuernummer:
                <br />
                37002/24166
              </p>
            </section>

            <section>
              <h2>Verantwortlich für den Inhalt gemäß § 18 Abs. 2 MStV</h2>
              <address className="legal-address">
                Mahmut Cevik
                <br />
                Markircherstraße 14-16
                <br />
                68229 Mannheim
              </address>
            </section>

            <section>
              <h2>Haftung für Inhalte</h2>
              <p>{liabilityContent[0]}</p>
            </section>

            <section>
              <h2>Haftung für Links</h2>
              <p>{liabilityContent[1]}</p>
            </section>

            <section>
              <h2>Urheberrecht</h2>
              <p>{liabilityContent[2]}</p>
            </section>

            <section>
              <h2>EU-Streitschlichtung</h2>
              <p>
                Die Europäische Kommission stellt eine Plattform zur
                Online-Streitbeilegung (OS) bereit:{" "}
                <a
                  href="https://ec.europa.eu/consumers/odr/"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  https://ec.europa.eu/consumers/odr/
                </a>
                . Unsere E-Mail-Adresse finden Sie oben im Impressum.
              </p>
            </section>

            <section>
              <h2>Verbraucherstreitbeilegung</h2>
              <p>
                Wir sind nicht bereit und nicht verpflichtet, an
                Streitbeilegungsverfahren vor einer
                Verbraucherschlichtungsstelle teilzunehmen.
              </p>
            </section>
          </article>
        </section>

        <SiteFooter />
      </main>
    </>
  );
}
