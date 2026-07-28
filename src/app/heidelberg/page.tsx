import type { Metadata } from "next";
import { LocationPageBody } from "../components/LocationPageBody";

export const dynamic = "force-static";
export const revalidate = 86400;

export const metadata: Metadata = {
  title: "Waschsalon Heidelberg | Waschbar SB Waschsalon",
  description:
    "Waschbar Heidelberg, Rohrbacher Str. 83-85 - SB Waschsalon für Studierende, WGs und große Wäsche. Moderne Maschinen, faire Preise, täglich 06:00-22:00 Uhr geöffnet.",
  alternates: {
    canonical: "/heidelberg",
  },
  openGraph: {
    title: "Waschsalon Heidelberg | Waschbar",
    description:
      "SB Waschsalon in Heidelberg, Rohrbacher Str. 83-85. Moderne Maschinen, faire Preise, täglich 06:00-22:00 Uhr geöffnet.",
    images: ["/images/waschbar-location-heidelberg-premium.png"],
    type: "website",
  },
};

export default function HeidelbergPage() {
  return <LocationPageBody slug="heidelberg" />;
}
