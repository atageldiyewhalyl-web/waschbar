import Link from "next/link";
import { Icon } from "./Icon";
import { Logo } from "./Logo";
import { MobileNav } from "./MobileNav";
import { locations } from "../data/site-data";

export function SiteHeader() {
  return (
    <header className="topbar">
      <Logo />
      <Logo light />
      <nav aria-label="Hauptnavigation">
        <div className="nav-item">
          <Link href="/#standorte">Standorte</Link>
          <div className="nav-dropdown" aria-label="Standort wählen">
            {locations.map((location) => (
              <Link href={location.href} key={location.slug}>
                <Icon name={location.city.toLowerCase()} />
                {location.city}
              </Link>
            ))}
          </div>
        </div>
        <Link href="/#preise">Preise</Link>
        <Link href="/rabattkarte">Rabattkarte</Link>
        <Link href="/#bewertungen">Bewertungen</Link>
        <Link href="/#faq">FAQ</Link>
      </nav>
      <Link className="nav-cta" href="/angebote/kundenkarte-guthaben">
        10 € Gratis sichern <Icon name="gift" />
      </Link>
      <MobileNav />
    </header>
  );
}
