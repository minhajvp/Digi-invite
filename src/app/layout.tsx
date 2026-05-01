import type { Metadata } from "next";
import { Inter, Playfair_Display, Great_Vibes, Cinzel, Pinyon_Script, Cormorant_Garamond, Montserrat } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });
const greatVibes = Great_Vibes({ weight: "400", subsets: ["latin"], variable: "--font-great-vibes" });

const cinzel = Cinzel({ subsets: ["latin"], variable: "--font-cinzel" });
const pinyonScript = Pinyon_Script({ weight: "400", subsets: ["latin"], variable: "--font-pinyon" });
const cormorant = Cormorant_Garamond({ weight: ["300", "400", "500", "600", "700"], subsets: ["latin"], variable: "--font-cormorant" });
const montserrat = Montserrat({ subsets: ["latin"], variable: "--font-montserrat" });

export const metadata: Metadata = {
  metadataBase: new URL('https://www.diginvite.in'),
  title: {
    default: "Diginvite | Premium Digital Invitations",
    template: "%s | Diginvite"
  },
  description: "Create stunning digital invitations for your special events with Diginvite. Premium 3D animations, music, and seamless RSVP tracking.",
  keywords: ["digital invitations", "online wedding cards", "digital wedding invitation Kerala", "RSVP tracking", "3D wedding cards", "housewarming invitations"],
  authors: [{ name: "Diginvite Team" }],
  creator: "Diginvite",
  publisher: "Diginvite",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "Diginvite | Premium Digital Invitations",
    description: "Create stunning digital invitations with 3D animations and music.",
    url: "https://www.diginvite.in",
    siteName: "Diginvite",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Diginvite | Premium Digital Invitations",
    description: "Create stunning digital invitations with 3D animations and music.",
    creator: "@diginvite",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: "https://www.diginvite.in",
  },
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
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Diginvite",
              "url": "https://www.diginvite.in",
              "logo": "https://www.diginvite.in/icon.png",
              "sameAs": [
                "https://www.instagram.com/we.unlocked",
                "https://www.linkedin.com/company/weunlocked"
              ],
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+91-8714123703",
                "contactType": "customer service"
              }
            })
          }}
        />
      </head>
      <body className={`${inter.variable} ${playfair.variable} ${greatVibes.variable} ${cinzel.variable} ${pinyonScript.variable} ${cormorant.variable} ${montserrat.variable} antialiased font-sans`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
