import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { GoogleTagManager } from "@next/third-parties/google";
import { absoluteUrl, siteUrl } from "./seo";
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
  metadataBase: new URL(siteUrl),
  applicationName: "Waschsalon Heidelberg & Ludwigshafen | Waschbar",
  title: "Waschsalon Heidelberg & Ludwigshafen | Waschbar",
  description:
    "Moderne Selbstbedienungs-Waschsalons in Heidelberg und Ludwigshafen: waschen, trocknen, Pet Station, Cleaning Station und große Maschinen.",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1,
    "max-video-preview": -1,
  },
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
    images: ["/images/waschbar-hero-logo.webp"],
    type: "website",
    url: absoluteUrl("/"),
    locale: "de_DE",
    siteName: "Waschbar",
  },
  twitter: {
    card: "summary_large_image",
    title: "Waschsalon Heidelberg & Ludwigshafen | Waschbar",
    description:
      "Self-Service waschen und trocknen in Heidelberg und Ludwigshafen.",
    images: ["/images/waschbar-hero-logo.webp"],
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
      <GoogleTagManager gtmId="GTM-P73HPKDZ" />
      <body className="min-h-full flex flex-col">
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-P73HPKDZ"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {children}
      </body>
    </html>
  );
}
