"use client";

import { useState } from "react";

export function SocialComingSoon({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  const [show, setShow] = useState(false);

  return (
    <span className="social-coming-soon">
      <button
        type="button"
        aria-label={`${label} (bald verfügbar)`}
        onClick={() => setShow((value) => !value)}
        onBlur={() => setShow(false)}
      >
        {children}
      </button>
      {show && <span className="social-tooltip">Bald verfügbar</span>}
    </span>
  );
}
