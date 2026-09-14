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

export const metadata: Metadata = {
  metadataBase: new URL("https://ubuildgroup.ca"),
  title: "U Build Group | Manitoba Construction Companies",
  description:
    "U Build Group connects specialized construction companies serving communities across Manitoba.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "U Build Group",
    description: "Specialized construction companies, working from one Manitoba office.",
    url: "/",
    siteName: "U Build Group",
    locale: "en_CA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "U Build Group",
    description: "Specialized construction companies, working from one Manitoba office.",
  },
  icons: { icon: "/brand/ubuild-group-mark.png" },
  manifest: "/manifest.webmanifest",
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "U Build Group",
  url: "https://ubuildgroup.ca",
  logo: "https://ubuildgroup.ca/brand/ubuild-group-mark.png",
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
