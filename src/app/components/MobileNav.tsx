"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { Icon } from "./Icon";
import { locations, contactInfo } from "../data/site-data";

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const close = () => setOpen(false);

  const panel = (
    <div className={open ? "mobile-nav-panel is-open" : "mobile-nav-panel"} aria-hidden={!open}>
        <nav className="mobile-nav-links" aria-label="Mobile Hauptnavigation">
          <Link href="/#standorte" onClick={close}>
            Standorte
          </Link>
          <div className="mobile-nav-sublinks">
            {locations.map((location) => (
              <Link href={location.href} key={location.slug} onClick={close}>
                <Icon name={location.city.toLowerCase()} />
                {location.city}
              </Link>
            ))}
          </div>
          <Link href="/#preise" onClick={close}>
            Preise
          </Link>
          <Link href="/rabattkarte" onClick={close}>
            Rabattkarte
          </Link>
          <Link href="/#bewertungen" onClick={close}>
            Bewertungen
          </Link>
          <Link href="/#faq" onClick={close}>
            FAQ
          </Link>
        </nav>

        <div className="mobile-nav-footer">
          <Link className="button button-primary" href="/angebote/kundenkarte-guthaben" onClick={close}>
            10 € Gratis sichern <Icon name="gift" />
          </Link>
          <a className="mobile-nav-phone" href={`tel:${contactInfo.phoneHref}`}>
            <Icon name="phone" />
            {contactInfo.phone}
          </a>
        </div>
    </div>
  );

  return (
    <>
      <button
        className="mobile-menu-toggle"
        type="button"
        aria-label={open ? "Menü schließen" : "Menü öffnen"}
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        <span className={open ? "mobile-menu-lines is-open" : "mobile-menu-lines"} aria-hidden="true">
          <span />
          <span />
          <span />
        </span>
      </button>

      {mounted ? createPortal(panel, document.body) : null}
    </>
  );
}
