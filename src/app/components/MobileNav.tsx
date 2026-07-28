"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Icon } from "./Icon";
import { locations, contactInfo } from "../data/site-data";

export function MobileNav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const close = () => setOpen(false);

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
          <Link href="/#kundenkarte" onClick={close}>
            Kundenkarte
          </Link>
          <Link href="/#bewertungen" onClick={close}>
            Bewertungen
          </Link>
          <Link href="/#faq" onClick={close}>
            FAQ
          </Link>
        </nav>

        <div className="mobile-nav-footer">
          <Link className="button button-primary" href="/#standorte" onClick={close}>
            Standort finden <Icon name="pin" />
          </Link>
          <a className="mobile-nav-phone" href={`tel:${contactInfo.phoneHref}`}>
            <Icon name="phone" />
            {contactInfo.phone}
          </a>
        </div>
      </div>
    </>
  );
}
