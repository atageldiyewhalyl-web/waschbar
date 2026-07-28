"use client";

import { useEffect, useState } from "react";

type Status = "open" | "closed";

function getBerlinStatus(): Status {
  const parts = new Intl.DateTimeFormat("de-DE", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "Europe/Berlin",
  }).formatToParts(new Date());

  const hour = Number(parts.find((part) => part.type === "hour")?.value ?? 0);
  const minute = Number(parts.find((part) => part.type === "minute")?.value ?? 0);
  const minutesNow = hour * 60 + minute;

  return minutesNow >= 6 * 60 && minutesNow < 22 * 60 ? "open" : "closed";
}

export function OpeningStatus() {
  const [status, setStatus] = useState<Status>("open");

  useEffect(() => {
    const updateStatus = () => setStatus(getBerlinStatus());

    updateStatus();
    const interval = window.setInterval(updateStatus, 60 * 1000);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <span className="status-pill" data-status={status}>
      {status === "open" ? "Geöffnet" : "Geschlossen"}
    </span>
  );
}
