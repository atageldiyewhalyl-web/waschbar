export function Icon({ name }: { name: string }) {
  return (
    <span className="icon" aria-hidden="true">
      {name === "pin" && (
        <svg viewBox="0 0 24 24">
          <path d="M12 21s7-6.1 7-12A7 7 0 0 0 5 9c0 5.9 7 12 7 12Z" />
          <circle cx="12" cy="9" r="2.5" />
        </svg>
      )}
      {name === "shield" && (
        <svg viewBox="0 0 24 24">
          <path d="M12 3 19 6v5c0 4.7-2.8 8-7 10-4.2-2-7-5.3-7-10V6l7-3Z" />
          <path d="m9 12 2 2 4-5" />
        </svg>
      )}
      {name === "leaf" && (
        <svg viewBox="0 0 24 24">
          <path d="M20 4c-8.5.4-13.8 4.3-15 11.5C8.4 16.1 14 14.8 20 4Z" />
          <path d="M5 20c2.2-4.2 5.4-7.3 10-9.4" />
        </svg>
      )}
      {name === "clock" && (
        <svg viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="8" />
          <path d="M12 8v5l3 2" />
        </svg>
      )}
      {name === "basket" && (
        <svg viewBox="0 0 24 24">
          <path d="M5 10h14l-1.4 9H6.4L5 10Z" />
          <path d="M8 10 12 4l4 6" />
          <path d="M9 14h.1M12 14h.1M15 14h.1" />
        </svg>
      )}
      {name === "card" && (
        <svg viewBox="0 0 24 24">
          <rect x="4" y="6" width="16" height="12" rx="2" />
          <path d="M4 10h16M8 15h4" />
        </svg>
      )}
      {name === "card-hand" && (
        <svg viewBox="0 0 24 24">
          <rect x="8" y="4.5" width="12" height="7.5" rx="1.4" />
          <path d="M10.5 8h7" />
          <path d="M4 17.5v-3.2c0-1.3.8-2.5 2-3l2.2-.9c.8-.3 1.7.1 2 .9.3.7-.1 1.5-.8 1.8l-1.2.5" />
          <path d="M8 18.5h5.6c1 0 2-.4 2.7-1.1l2.9-2.9c.6-.6.6-1.5.1-2.1-.5-.6-1.4-.7-2-.2l-2.8 2.1H10" />
        </svg>
      )}
      {name === "wallet-plus" && (
        <svg viewBox="0 0 24 24">
          <path d="M5 7.5h12.5A2.5 2.5 0 0 1 20 10v8.5H6.5A2.5 2.5 0 0 1 4 16V7.8c0-1.2.8-2.2 2-2.5l9.2-1.7c1-.2 1.8.5 1.8 1.5v2.4" />
          <path d="M20 12h-4.2a2.2 2.2 0 0 0 0 4.4H20" />
          <path d="M16.2 14.2h.1" />
          <path d="M8.5 12.5h4M10.5 10.5v4" />
        </svg>
      )}
      {name === "reload" && (
        <svg viewBox="0 0 24 24">
          <path d="M19 8a7.5 7.5 0 0 0-13.1-2.2L4 8" />
          <path d="M4 4.5V8h3.5" />
          <path d="M5 16a7.5 7.5 0 0 0 13.1 2.2L20 16" />
          <path d="M20 19.5V16h-3.5" />
        </svg>
      )}
      {name === "shirt" && (
        <svg viewBox="0 0 24 24">
          <path d="M9 4 6 6 3 8l3 4 2-1v9h8v-9l2 1 3-4-3-2-3-2a4 4 0 0 1-6 0Z" />
        </svg>
      )}
      {name === "stack" && (
        <svg viewBox="0 0 24 24">
          <rect x="4" y="5" width="16" height="4" rx="1.5" />
          <path d="M4 9v3.5A1.5 1.5 0 0 0 5.5 14h13a1.5 1.5 0 0 0 1.5-1.5V9" />
          <path d="M4 13v4.5A1.5 1.5 0 0 0 5.5 19h13a1.5 1.5 0 0 0 1.5-1.5V13" />
        </svg>
      )}
      {name === "heidelberg" && (
        <svg viewBox="0 0 24 24">
          <path d="M12 2v6" />
          <path d="M12 2l-2 6h4Z" />
          <path d="M10 8v14h4V8" />
          <path d="M12 11v1" />
          <path d="M6 14v8h4v-8" />
          <path d="M14 14v8h4v-8" />
          <path d="M6 14l2-4 2 4" />
          <path d="M14 14l2-4 2 4" />
          <path d="M4 22h16" />
        </svg>
      )}
      {name === "ludwigshafen" && (
        <svg viewBox="0 0 24 24">
          <path d="M3 22h18" />
          <path d="M5 22V10l5-3v5l5-3v5l4-3v12" />
          <path d="M7 6v4" />
          <path d="M12 7v5" />
          <path d="M8 17h2" />
          <path d="M13 17h2" />
        </svg>
      )}
      {name === "tag" && (
        <svg viewBox="0 0 24 24">
          <path d="M20 13 13 20 4 11V4h7l9 9Z" />
          <circle cx="8.5" cy="8.5" r="1.5" />
        </svg>
      )}
      {name === "washer" && (
        <svg viewBox="0 0 24 24">
          <rect x="5" y="3" width="14" height="18" rx="2" />
          <circle cx="12" cy="13" r="5" />
          <path d="M9 13c1.8 1.4 4.2 1.4 6 0M8 6h.1M11 6h5" />
        </svg>
      )}
      {name === "percent" && (
        <svg viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="8.5" />
          <path d="m8.5 15.5 7-7" />
          <circle cx="9" cy="9" r="1.1" />
          <circle cx="15" cy="15" r="1.1" />
        </svg>
      )}
      {name === "gift" && (
        <svg viewBox="0 0 24 24">
          <rect x="4" y="9" width="16" height="11" rx="1.4" />
          <path d="M3.5 9h17M12 9v11" />
          <path d="M12 9H8.3a2.3 2.3 0 1 1 2.3-2.3C10.6 8 12 9 12 9Z" />
          <path d="M12 9h3.7A2.3 2.3 0 1 0 13.4 6.7C13.4 8 12 9 12 9Z" />
        </svg>
      )}
      {name === "sparkle" && (
        <svg viewBox="0 0 24 24">
          <path d="M12 3 14 9l6 3-6 3-2 6-2-6-6-3 6-3 2-6Z" />
          <path d="M19 4v4M17 6h4M5 16v3M3.5 17.5h3" />
        </svg>
      )}
      {name === "paw" && (
        <svg viewBox="0 0 24 24">
          <circle cx="7.5" cy="9" r="2" />
          <circle cx="12" cy="6.8" r="2" />
          <circle cx="16.5" cy="9" r="2" />
          <circle cx="9.4" cy="13.4" r="1.8" />
          <circle cx="14.6" cy="13.4" r="1.8" />
          <path d="M7.8 18.4c.8-2.6 2.2-4 4.2-4s3.4 1.4 4.2 4c.3 1-.5 2-1.6 2H9.4c-1.1 0-1.9-1-1.6-2Z" />
        </svg>
      )}
      {name === "drop" && (
        <svg viewBox="0 0 24 24">
          <path d="M12 3s6 6.4 6 11a6 6 0 0 1-12 0c0-4.6 6-11 6-11Z" />
          <path d="M9 15.2c1.7 1.2 4.3 1.2 6 0" />
        </svg>
      )}
      {name === "mail" && (
        <svg viewBox="0 0 24 24">
          <rect x="4" y="6" width="16" height="12" rx="2" />
          <path d="m5 8 7 5 7-5" />
        </svg>
      )}
      {name === "phone" && (
        <svg viewBox="0 0 24 24">
          <path d="M7.2 4.5 9.8 9l-2 1.4c1.2 2.5 3.3 4.6 5.8 5.8l1.4-2 4.5 2.6c.5.3.7.9.5 1.4-.5 1.4-1.8 2.3-3.2 2.3C9.5 20.5 3.5 14.5 3.5 7.2c0-1.4.9-2.7 2.3-3.2.5-.2 1.1 0 1.4.5Z" />
        </svg>
      )}
      {name === "bus" && (
        <svg viewBox="0 0 24 24">
          <rect x="4" y="4" width="16" height="12" rx="2" />
          <path d="M4 12h16" />
          <path d="M8 16v2M16 16v2" />
          <circle cx="8" cy="18.2" r="0.1" />
          <circle cx="16" cy="18.2" r="0.1" />
          <path d="M7 8h2M11 8h2M15 8h2" />
        </svg>
      )}
      {name === "parking" && (
        <svg viewBox="0 0 24 24">
          <rect x="4" y="3" width="16" height="18" rx="2" />
          <path d="M9 16V7h3.5a2.75 2.75 0 0 1 0 5.5H9" />
        </svg>
      )}
      {name === "instagram" && (
        <svg viewBox="0 0 24 24">
          <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.2" cy="6.8" r="0.6" fill="currentColor" stroke="none" />
        </svg>
      )}
      {name === "facebook" && (
        <svg viewBox="0 0 24 24">
          <path d="M14.5 21v-7.2h2.4l.4-2.8h-2.8V9.2c0-.8.2-1.4 1.4-1.4h1.5V5.3c-.3 0-1.1-.1-2.1-.1-2.1 0-3.5 1.3-3.5 3.6v2.1H9.3v2.8h2.5V21" />
        </svg>
      )}
    </span>
  );
}
