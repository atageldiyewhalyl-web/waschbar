import { Icon } from "./Icon";

type MobileStickyActionsProps = {
  primaryLabel: string;
  primaryHref: string;
  primaryExternal?: boolean;
  primaryIcon?: string;
  phoneHref: string;
  mapsHref: string;
};

export function MobileStickyActions({
  primaryLabel,
  primaryHref,
  primaryExternal = false,
  primaryIcon = "pin",
  phoneHref,
  mapsHref,
}: MobileStickyActionsProps) {
  return (
    <div className="mobile-sticky-actions" aria-label="Schnellaktionen">
      <a
        className="mobile-sticky-main"
        href={primaryHref}
        target={primaryExternal ? "_blank" : undefined}
        rel={primaryExternal ? "noopener noreferrer" : undefined}
      >
        <Icon name={primaryIcon} />
        {primaryLabel}
      </a>
      <a
        className="mobile-sticky-icon"
        href={phoneHref}
        aria-label="Anrufen"
      >
        <Icon name="phone" />
      </a>
      <a
        className="mobile-sticky-icon"
        href={mapsHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Route auf Karte öffnen"
      >
        <Icon name="pin" />
      </a>
    </div>
  );
}
