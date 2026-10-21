import type { Metadata } from "next";
import Link from "next/link";
import { ConsentSettingsButton } from "../components/ConsentSettingsButton";
import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";
import { contactInfo } from "../data/site-data";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Datenschutzerklärung & Cookie-Informationen | Waschbar",
  description:
    "Informationen zum Datenschutz, zu Cookies, Google Analytics, Google Ads, Meta Pixel und Google Maps bei Waschbar.",
  alternates: { canonical: "/datenschutz" },
  robots: { index: false, follow: true },
};

const accessData = [
  "IP-Adresse",
  "Datum und Uhrzeit der Anfrage",
  "aufgerufene Seite bzw. Datei und übertragene Datenmenge",
  "Referrer-URL",
  "Browsertyp, Browserversion und Betriebssystem",
  "Statuscode der Serverantwort",
];

const rights = [
  "Auskunft über Ihre personenbezogenen Daten (Art. 15 DSGVO)",
  "Berichtigung unrichtiger Daten (Art. 16 DSGVO)",
  "Löschung Ihrer Daten (Art. 17 DSGVO)",
  "Einschränkung der Verarbeitung (Art. 18 DSGVO)",
  "Datenübertragbarkeit (Art. 20 DSGVO)",
  "Widerspruch gegen Verarbeitungen auf Grundlage von Art. 6 Abs. 1 lit. e oder f DSGVO (Art. 21 DSGVO)",
  "Widerruf einer Einwilligung mit Wirkung für die Zukunft (Art. 7 Abs. 3 DSGVO)",
  "Beschwerde bei einer Datenschutzaufsichtsbehörde (Art. 77 DSGVO)",
];

function LegalList({ items }: { items: string[] }) {
  return (
    <ul className="legal-list">
      {items.map((item) => <li key={item}>{item}</li>)}
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
          <h1 className="legal-title">Datenschutzerklärung & Cookie-Informationen</h1>

          <article className="legal-article">
            <section>
              <h2>1. Verantwortlicher</h2>
              <address className="legal-address">
                Waschbar Unternehmensgruppe GmbH<br />
                Markircherstraße 14-16<br />
                68229 Mannheim<br />
                Deutschland
              </address>
              <p>
                Vertreten durch den Geschäftsführer Mahmut Cevik. Weitere Unternehmensangaben
                finden Sie im <Link href="/impressum">Impressum</Link>.
              </p>
              <p>
                E-Mail: <a href={`mailto:${contactInfo.email}`}>{contactInfo.email}</a><br />
                Telefon: <a href={`tel:${contactInfo.phoneHref}`}>{contactInfo.phone}</a>
              </p>
            </section>

            <section>
              <h2>2. Hosting und Server-Protokolle</h2>
              <p>
                Diese Website wird über Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789,
                USA, bereitgestellt. Beim Seitenaufruf werden technisch erforderliche
                Server-Protokolldaten verarbeitet:
              </p>
              <LegalList items={accessData} />
              <p>
                Zweck ist die sichere, stabile und schnelle Bereitstellung der Website sowie die
                Abwehr von Missbrauch. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO. Unser
                berechtigtes Interesse liegt im sicheren Betrieb unseres Online-Angebots. Die
                Protokolldaten werden nach den für den Hosting-Dienst geltenden Fristen gelöscht,
                sofern ein sicherheitsrelevanter Vorfall keine längere Aufbewahrung erfordert.
              </p>
              <p>
                Informationen von Vercel: <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noreferrer noopener">Datenschutzerklärung</a>
                {" und "}<a href="https://vercel.com/legal/dpa" target="_blank" rel="noreferrer noopener">Auftragsverarbeitung</a>.
              </p>
            </section>

            <section>
              <h2>3. Einwilligungsverwaltung</h2>
              <p>
                Beim ersten Besuch können Sie auswählen, ob Statistik, Marketing und externe
                Medien geladen werden dürfen. Ohne Ihre Zustimmung bleiben diese Dienste
                deaktiviert. Ihre Entscheidung wird mit Datum, Ablaufzeit und den gewählten
                Kategorien für sechs Monate im lokalen Speicher Ihres Browsers unter dem Schlüssel
                <code>waschbar_consent_v1</code> gespeichert. Die Speicherung ist erforderlich,
                damit die Website Ihre Auswahl beachtet (§ 25 Abs. 2 Nr. 2 TDDDG); Rechtsgrundlage
                für die damit verbundene Verarbeitung ist Art. 6 Abs. 1 lit. f DSGVO.
              </p>
              <p>
                Sie können eine Einwilligung jederzeit mit Wirkung für die Zukunft ändern oder
                widerrufen. Bereits erfolgte Verarbeitungen bleiben rechtmäßig. Öffnen Sie dazu{" "}
                <ConsentSettingsButton className="legal-consent-button" />. Bei einem Widerruf
                deaktivieren wir die betreffenden Dienste und löschen erreichbare First-Party-
                Tracking-Cookies. Cookies, die ein Drittanbieter bereits auf dessen eigener Domain
                gesetzt hat, können Sie zusätzlich in den Einstellungen Ihres Browsers löschen.
              </p>
            </section>

            <section>
              <h2>4. Statistik mit Google Analytics</h2>
              <p>
                Nach Ihrer Einwilligung verwenden wir Google Analytics 4 von Google Ireland
                Limited, Gordon House, Barrow Street, Dublin 4, Irland. Dabei können insbesondere
                aufgerufene Seiten, ungefähre Standortdaten, Geräte- und Browserinformationen,
                Referrer, Interaktionen und pseudonyme Kennungen verarbeitet werden. Wir nutzen die
                Auswertung, um Reichweite und Nutzung unserer Website zu verstehen und sie zu
                verbessern. Die Google-Analytics-Kennung dieser Website lautet <code>G-0E5Z13JD69</code>.
              </p>
              <p>
                Rechtsgrundlagen sind Ihre Einwilligung nach Art. 6 Abs. 1 lit. a DSGVO und § 25
                Abs. 1 TDDDG. Google Analytics wird erst nach Ihrer Auswahl geladen. Wir haben
                Werbepersonalisierung und Google Signals in der Website-Konfiguration für diese
                Kategorie deaktiviert. Google verwendet standardmäßig die First-Party-Cookies{" "}
                <code>_ga</code> und <code>_ga_*</code>, um Nutzer und Sitzungen zu unterscheiden;
                die Standardlaufzeit beträgt bis zu zwei Jahre. Die konkrete Speicherdauer kann
                durch Browserbegrenzungen oder unsere Kontoeinstellungen kürzer sein.
              </p>
              <p>
                Weitere Informationen: <a href="https://policies.google.com/privacy" target="_blank" rel="noreferrer noopener">Google Datenschutzerklärung</a>
                {" und "}<a href="https://support.google.com/analytics/answer/11397207" target="_blank" rel="noreferrer noopener">Cookie-Nutzung von Google Analytics</a>.
              </p>
            </section>

            <section>
              <h2>5. Kampagnenmessung mit Google Ads und Meta Pixel</h2>
              <p>
                Wenn Sie „Marketing“ erlauben, setzen wir Google Ads Conversion Tracking von
                Google Ireland Limited und das Meta Pixel von Meta Platforms Ireland Limited,
                Merrion Road, Dublin 4, D04 X2K5, Irland, ein. Die Dienste helfen uns festzustellen,
                ob ein Anzeigenkontakt zu einem Websitebesuch oder zu einer abgeschlossenen
                Abo-Anfrage geführt hat. Dabei werden keine Inhalte Ihrer Formularfelder an Google
                oder Meta übermittelt.
              </p>
              <p>
                Verarbeitet werden können insbesondere Seitenaufrufe, Interaktionen, Zeitstempel,
                Referrer, Werbe-Klick-Kennungen, IP-Adresse sowie Geräte- und Browserdaten. Google
                kann Cookies mit dem Präfix <code>_gcl_</code> setzen. Meta verwendet insbesondere{" "}
                <code>_fbp</code> und, sofern eine Facebook-Klick-Kennung vorhanden ist, <code>_fbc</code>;
                diese Cookies haben typischerweise eine Laufzeit von bis zu 90 Tagen. Unsere
                Google-Ads-Kennung lautet <code>AW-18362633854</code>, die Meta-Pixel-Kennung{" "}
                <code>937114909420037</code>.
              </p>
              <p>
                Rechtsgrundlagen sind Ihre Einwilligung nach Art. 6 Abs. 1 lit. a DSGVO und § 25
                Abs. 1 TDDDG. Die Dienste werden erst nach Zustimmung geladen. Google und Meta
                können die Daten nach ihren Bedingungen auch für eigene Zwecke verarbeiten und mit
                vorhandenen Kontodaten verknüpfen. Informationen finden Sie in der{" "}
                <a href="https://policies.google.com/privacy" target="_blank" rel="noreferrer noopener">Datenschutzerklärung von Google</a>
                {" und der "}<a href="https://www.facebook.com/privacy/policy/" target="_blank" rel="noreferrer noopener">Datenschutzerklärung von Meta</a>.
              </p>
            </section>

            <section>
              <h2>6. Google Maps</h2>
              <p>
                Auf unseren Seiten befinden sich zunächst blockierte Einbettungen von Google Maps,
                einem Dienst der Google Ireland Limited. Erst wenn Sie „Externe Medien“ erlauben
                oder eine Karte ausdrücklich über die Schaltfläche freigeben, stellt Ihr Browser
                eine Verbindung zu Google her. Dabei können insbesondere IP-Adresse,
                Geräteinformationen, aufgerufene Seite und gegebenenfalls Standortdaten sowie
                Google-Cookies verarbeitet werden.
              </p>
              <p>
                Zweck ist die interaktive Darstellung unserer Standorte und die Routenplanung.
                Rechtsgrundlagen sind Ihre Einwilligung nach Art. 6 Abs. 1 lit. a DSGVO und § 25
                Abs. 1 TDDDG. Externe Links zu Google Maps öffnen Sie freiwillig; beim Aufruf
                verlassen Sie unsere Website. Weitere Informationen finden Sie in der{" "}
                <a href="https://policies.google.com/privacy" target="_blank" rel="noreferrer noopener">Datenschutzerklärung von Google</a>.
              </p>
            </section>

            <section>
              <h2>7. SB-Wasch-Abo-Anfrage</h2>
              <p>
                Wenn Sie das Anfrageformular nutzen, verarbeiten wir Vor- und Nachname,
                E-Mail-Adresse, Telefonnummer, Anschrift, gewünschten Standort, Ihre Bestätigung
                der Anfrage, optionale Einwilligungen, Zeitpunkt, Formularversion, gehashte technische
                Nachweisdaten und die aufgerufene Seite. Pflichtangaben sind erforderlich, um Ihre
                Anfrage zu bearbeiten, Ihnen Vertragsunterlagen zu senden und die Mitgliedskarte
                vorzubereiten. Ohne diese Angaben ist eine Bearbeitung nicht möglich.
              </p>
              <p>
                Rechtsgrundlage für die Bearbeitung der Abo-Anfrage ist Art. 6 Abs. 1 lit. b DSGVO
                (vorvertragliche Maßnahmen und gegebenenfalls Vertragserfüllung). Soweit Sie
                zusätzlich E-Mail-Marketing auswählen, ist Art. 6 Abs. 1 lit. a DSGVO die
                Rechtsgrundlage; diese Einwilligung ist freiwillig und jederzeit widerrufbar.
              </p>
              <p>
                Zur Speicherung und technischen Verarbeitung nutzen wir Supabase Pte. Ltd., 970 Toa
                Payoh North #07-04, Singapore 318992. Für den E-Mail-Versand nutzen wir Resend,
                einen Dienst der Plus Five Five, Inc., 2261 Market Street #5039, San Francisco,
                CA 94114, USA. Außerdem erhalten die für
                Vertrieb und technische Betreuung zuständigen internen bzw. beauftragten Empfänger
                Zugriff, soweit dies für die Bearbeitung erforderlich ist. Informationen:{" "}
                <a href="https://supabase.com/privacy" target="_blank" rel="noreferrer noopener">Supabase Privacy Policy</a>
                {" und "}<a href="https://resend.com/legal/privacy-policy" target="_blank" rel="noreferrer noopener">Resend Privacy Policy</a>.
              </p>
              <p>
                Erfolgt kein Vertragsschluss, löschen wir die Anfrage, sobald sie abschließend
                bearbeitet ist und keine gesetzlichen oder rechtlichen Gründe für eine weitere
                Aufbewahrung bestehen. Bei einem Vertrag gelten zusätzlich die handels- und
                steuerrechtlichen Aufbewahrungsfristen. Einwilligungsnachweise bewahren wir so lange
                auf, wie dies zum Nachweis der rechtmäßigen Verarbeitung erforderlich ist.
              </p>
            </section>

            <section>
              <h2>8. Kontaktaufnahme und Newsletter-Feld</h2>
              <p>
                Bei einer Kontaktaufnahme per E-Mail oder Telefon verarbeiten wir Ihre Angaben zur
                Bearbeitung des Anliegens. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO, wenn es
                um einen Vertrag oder vorvertragliche Maßnahmen geht, andernfalls Art. 6 Abs. 1
                lit. f DSGVO. Unser berechtigtes Interesse liegt in der Beantwortung Ihrer Anfrage.
                Die Daten werden gelöscht, wenn das Anliegen erledigt ist und keine
                Aufbewahrungspflicht oder ein anderer Rechtsgrund entgegensteht.
              </p>
              <p>
                Das Newsletter-Feld im Footer ist derzeit nicht an einen Versanddienst angebunden;
                über dieses Feld werden aktuell keine E-Mail-Adressen übertragen oder gespeichert.
                Vor einer Aktivierung ergänzen wir diese Erklärung und richten ein geeignetes
                Einwilligungs- und Abmeldeverfahren ein.
              </p>
            </section>

            <section>
              <h2>9. Schriftarten</h2>
              <p>
                Wir verwenden die Schriftart Geist über <code>next/font</code>. Die Dateien werden
                beim Erstellen der Website lokal eingebunden und über unser Hosting ausgeliefert.
                Beim Seitenaufruf entsteht dadurch keine Verbindung zu Google Fonts.
              </p>
            </section>

            <section>
              <h2>10. Empfänger, Drittlandübermittlungen und Schutzmaßnahmen</h2>
              <p>
                Zusätzlich zu den jeweils genannten Anbietern können IT-, Hosting-, Versand- und
                Beratungsdienstleister Daten erhalten, soweit dies für ihre Aufgabe erforderlich
                ist. Dienstleister, die Daten in unserem Auftrag verarbeiten, werden vertraglich
                nach Art. 28 DSGVO gebunden.
              </p>
              <p>
                Bei US-Anbietern oder international tätigen Unternehmensgruppen kann eine
                Verarbeitung außerhalb der EU bzw. des EWR stattfinden. Sie erfolgt – soweit
                einschlägig – auf Grundlage eines Angemessenheitsbeschlusses der EU-Kommission,
                insbesondere des EU-US Data Privacy Framework, oder geeigneter Garantien wie den
                EU-Standardvertragsklauseln nach Art. 46 DSGVO. Nähere Angaben finden Sie in den
                verlinkten Datenschutzhinweisen der Anbieter.
              </p>
            </section>

            <section>
              <h2>11. Ihre Rechte</h2>
              <LegalList items={rights} />
              <p>
                Zur Ausübung Ihrer Rechte genügt eine Nachricht an{" "}
                <a href={`mailto:${contactInfo.email}`}>{contactInfo.email}</a>. Zuständige
                Aufsichtsbehörde für unseren Sitz ist der Landesbeauftragte für den Datenschutz und
                die Informationsfreiheit Baden-Württemberg. Eine Beschwerde ist auch bei jeder
                anderen nach Art. 77 DSGVO zuständigen Aufsichtsbehörde möglich.
              </p>
              <p>
                <a href="https://www.baden-wuerttemberg.datenschutz.de/" target="_blank" rel="noreferrer noopener">
                  Landesbeauftragter für den Datenschutz und die Informationsfreiheit Baden-Württemberg
                </a>
              </p>
            </section>

            <section>
              <h2>12. Automatisierte Entscheidungen</h2>
              <p>
                Eine ausschließlich automatisierte Entscheidungsfindung einschließlich Profiling
                im Sinne von Art. 22 DSGVO findet nicht statt.
              </p>
            </section>

            <section>
              <h2>13. Aktualität</h2>
              <p>
                Wir passen diese Erklärung an, wenn sich Dienste, Verarbeitungen oder rechtliche
                Anforderungen ändern.
              </p>
              <p>Stand: 21. Oktober 2026</p>
            </section>
          </article>
        </section>

        <SiteFooter />
      </main>
    </>
  );
}
