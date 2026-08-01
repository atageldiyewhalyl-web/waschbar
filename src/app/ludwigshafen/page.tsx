import type { Metadata } from "next";
import { LocationPageBody } from "../components/LocationPageBody";
import { absoluteUrl } from "../seo";

export const dynamic = "force-static";
export const revalidate = 86400;

export const metadata: Metadata = {
  title: "Waschsalon Ludwigshafen | Waschbar SB Waschsalon",
  description:
    "Waschbar Ludwigshafen, Prinzregentenstraße 60 - SB Waschsalon für Familien und Pendler. Moderne Maschinen, faire Preise, täglich 06:00-24:00 Uhr geöffnet.",
  alternates: {
    canonical: "/ludwigshafen",
  },
  openGraph: {
    title: "Waschsalon Ludwigshafen | Waschbar",
    description:
      "SB Waschsalon in Ludwigshafen am Rhein, Prinzregentenstraße 60. Moderne Maschinen, faire Preise, täglich 06:00-24:00 Uhr geöffnet.",
    images: ["/images/waschbar-location-ludwigshafen-premium.webp"],
    type: "website",
    url: absoluteUrl("/ludwigshafen"),
    locale: "de_DE",
    siteName: "Waschbar",
  },
};

export default function LudwigshafenPage() {
  return <LocationPageBody slug="ludwigshafen" />;
}
