import Image from "next/image";
import Link from "next/link";
import { Logo } from "./Logo";

export function CampaignFooter() {
  return (
    <footer className="campaign-footer">
      <Logo light />
      <div className="campaign-footer-legal">
        <p>© {new Date().getFullYear()} Waschbar. Alle Rechte vorbehalten.</p>
        <a
          className="footer-credit"
          href="https://xn--nll-hoa.com"
          target="_blank"
          rel="noopener noreferrer nofollow"
        >
          <span>Site made by</span>
          <Image
            src="/images/null-logo-white.png"
            alt="nüll.com"
            width={360}
            height={138}
          />
        </a>
        <nav aria-label="Rechtliches">
          <Link href="/impressum">Impressum</Link>
          <Link href="/datenschutz">Datenschutz</Link>
        </nav>
      </div>
    </footer>
  );
}
