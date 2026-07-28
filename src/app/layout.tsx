import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://waschbar.example"
  ),
  applicationName: "Waschsalon Heidelberg & Ludwigshafen | Waschbar",
  title: "Waschsalon Heidelberg & Ludwigshafen | Waschbar",
  description:
    "Moderne Selbstbedienungs-Waschsalons in Heidelberg und Ludwigshafen: waschen, trocknen, Pet Station, Cleaning Station und große Maschinen.",
  keywords: [
    "Waschbar",
    "SB Waschsalon",
    "Waschsalon Heidelberg",
    "Waschsalon Ludwigshafen",
    "Selbstbedienungswaschsalon",
  ],
  openGraph: {
    title: "Waschsalon Heidelberg & Ludwigshafen | Waschbar",
    description:
      "Self-Service waschen und trocknen in Heidelberg und Ludwigshafen.",
    images: ["/images/waschbar-hero-logo.png"],
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="de"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
