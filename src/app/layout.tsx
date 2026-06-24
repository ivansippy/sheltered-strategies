import type { Metadata } from "next";
import { Hanken_Grotesk, Newsreader } from "next/font/google";
import "./globals.css";

const hankenGrotesk = Hanken_Grotesk({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const newsreader = Newsreader({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
});

const SITE_URL = "https://shelteredstrategies.com";
const SITE_NAME = "Sheltered Strategies";
const DESCRIPTION =
  "Speech and language therapy in Durango, CO with teletherapy across Colorado and California. ASHA-certified SLP offering evaluations, articulation and language therapy, and free screenings.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} | Speech-Language Therapy in Durango, CO`,
    template: `%s | ${SITE_NAME}`,
  },
  description: DESCRIPTION,
  keywords: [
    "speech therapy Durango CO",
    "speech-language pathologist Durango",
    "speech therapy Colorado",
    "pediatric speech therapy",
    "language evaluation",
    "articulation therapy",
    "stuttering therapy",
    "Childhood Apraxia of Speech",
    "teletherapy California",
    "CCC-SLP",
  ],
  authors: [{ name: "Avery Sheldon, M.S., CCC-SLP" }],
  creator: SITE_NAME,
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} | Speech-Language Therapy in Durango, CO`,
    description: DESCRIPTION,
    images: [
      {
        url: "/assets/Lions Den.jpg",
        width: 1200,
        height: 1500,
        alt: "Sheltered Strategies speech-language therapy, Durango, CO",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} | Speech-Language Therapy in Durango, CO`,
    description: DESCRIPTION,
    images: ["/assets/Lions Den.jpg"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "MedicalBusiness",
  name: "Sheltered Strategies",
  description: DESCRIPTION,
  url: SITE_URL,
  telephone: "+1-303-323-5773",
  email: "speechtherapy@shelteredstrategies.com",
  priceRange: "$$",
  medicalSpecialty: "SpeechTherapy",
  address: {
    "@type": "PostalAddress",
    streetAddress: "777 Main Ave, Ste. 213A",
    addressLocality: "Durango",
    addressRegion: "CO",
    postalCode: "81301",
    addressCountry: "US",
  },
  areaServed: [
    { "@type": "State", name: "Colorado" },
    { "@type": "State", name: "California" },
  ],
  founder: {
    "@type": "Person",
    name: "Avery Sheldon",
    jobTitle: "Speech-Language Pathologist, CCC-SLP",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${hankenGrotesk.variable} ${newsreader.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
