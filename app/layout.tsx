import type { Metadata } from "next";
import { Archivo, Space_Grotesk } from "next/font/google";
import "./globals.css";

const archivo = Archivo({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const siteDescription =
  "U Build Group brings together U Build Construction Division and Everett Construction Group, serving construction projects across Manitoba.";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.ubuildgroup.ca"),
  title: "U Build Group | Manitoba Construction Companies",
  description: siteDescription,
  alternates: { canonical: "/" },
  openGraph: {
    title: "U Build Group",
    description: siteDescription,
    url: "/",
    siteName: "U Build Group",
    locale: "en_CA",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "U Build Group",
    description: siteDescription,
  },
  icons: { icon: { url: "/brand/u-mark-blue.svg", type: "image/svg+xml", sizes: "any" } },
  manifest: "/manifest.webmanifest",
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://www.ubuildgroup.ca/#organization",
  sameAs: ["https://www.instagram.com/ubuild_group/"],
  name: "U Build Group",
  description: siteDescription,
  url: "https://www.ubuildgroup.ca",
  logo: "https://www.ubuildgroup.ca/brand/u-mark-blue.svg",
  telephone: "+1-204-977-1956",
  email: "info@ubuildconstruction.ca",
  address: {
    "@type": "PostalAddress",
    streetAddress: "#21, 75th Avenue South",
    addressLocality: "Stony Mountain",
    addressRegion: "MB",
    postalCode: "R0C 3A0",
    addressCountry: "CA",
  },
  areaServed: { "@type": "AdministrativeArea", name: "Manitoba" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className={`${archivo.variable} ${spaceGrotesk.variable}`}>
        <a className="skip-link" href="#main-content">Skip to main content</a>
        {children}
      </body>
    </html>
  );
}
