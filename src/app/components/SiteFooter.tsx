import Link from "next/link";
import { Icon } from "./Icon";
import { Logo } from "./Logo";
import { GoogleLogo } from "./GoogleLogo";
import { SocialComingSoon } from "./SocialComingSoon";
import { contactInfo, locations } from "../data/site-data";

export function SiteFooter() {
  return (
    <footer className="footer">
      <div className="footer-brand">
        <Logo light />
        <p>
          Moderne Selbstbedienungs-Waschsalons in Heidelberg und
          Ludwigshafen. Sauber, schnell und einfach.
        </p>
        <div className="socials" aria-label="Social Links">
          <SocialComingSoon label="Instagram">
            <Icon name="instagram" />
          </SocialComingSoon>
          <SocialComingSoon label="Facebook">
            <Icon name="facebook" />
          </SocialComingSoon>
          <a
            href={locations[0].mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Waschbar auf Google Maps öffnen"
          >
            <GoogleLogo />
          </a>
        </div>
      </div>
      <div>
        <h2>Navigation</h2>
        <Link href="/#standorte">Standorte</Link>
        <Link href="/heidelberg">Waschbar Heidelberg</Link>
        <Link href="/ludwigshafen">Waschbar Ludwigshafen</Link>
        <Link href="/#preise">Preise</Link>
        <Link href="/#kundenkarte">Kundenkarte</Link>
        <Link href="/#ausstattung">Ausstattung</Link>
        <Link href="/#bewertungen">Bewertungen</Link>
        <Link href="/#faq">FAQ</Link>
      </div>
      <div>
        <h2>Service</h2>
        <Link href="/#faq">Häufige Fragen</Link>
        <Link href="/#preise">Preise</Link>
        <Link href="/#kundenkarte">Kundenkarte</Link>
        <Link href="/#ausstattung">Pet Station</Link>
        <Link href="/#ausstattung">Cleaning Station</Link>
      </div>
      <div>
        <h2>Kontakt</h2>
        <p>Heidelberg: Rohrbacher Str. 83-85</p>
        <p>Ludwigshafen: Prinzregentenstraße 60</p>
        <p>Täglich 06:00 - 22:00 Uhr</p>
        <p>
          <a href={`tel:${contactInfo.phoneHref}`}>{contactInfo.phone}</a>
        </p>
        <p>
          <a href={`mailto:${contactInfo.email}`}>{contactInfo.email}</a>
        </p>
      </div>
      <form className="newsletter">
        <h2>Bleib informiert!</h2>
        <p>Erhalte News und Aktionen rund um Waschbar.</p>
        <label>
          <span>E-Mail-Adresse</span>
          <input type="email" placeholder="Deine E-Mail-Adresse" />
          <button type="submit" aria-label="Newsletter abonnieren">
            <Icon name="mail" />
          </button>
        </label>
      </form>

      <div className="footer-legal">
        <p>© {new Date().getFullYear()} Waschbar. Alle Rechte vorbehalten.</p>
        <nav aria-label="Rechtliches">
          <Link href="/datenschutz">Datenschutz</Link>
        </nav>
      </div>
    </footer>
  );
}
