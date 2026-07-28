import Link from "next/link";
import { Logo } from "./Logo";

export function CampaignFooter() {
  return (
    <footer className="campaign-footer">
      <Logo light />
      <div className="campaign-footer-legal">
        <p>© {new Date().getFullYear()} Waschbar. Alle Rechte vorbehalten.</p>
        <nav aria-label="Rechtliches">
          <Link href="/datenschutz">Datenschutz</Link>
        </nav>
      </div>
    </footer>
  );
}
