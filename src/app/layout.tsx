import type { Metadata } from "next";
import { Inter, Playfair_Display, Great_Vibes, Cinzel, Pinyon_Script, Cormorant_Garamond, Montserrat } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });
const greatVibes = Great_Vibes({ weight: "400", subsets: ["latin"], variable: "--font-great-vibes" });

const cinzel = Cinzel({ subsets: ["latin"], variable: "--font-cinzel" });
const pinyonScript = Pinyon_Script({ weight: "400", subsets: ["latin"], variable: "--font-pinyon" });
const cormorant = Cormorant_Garamond({ weight: ["300", "400", "500", "600", "700"], subsets: ["latin"], variable: "--font-cormorant" });
const montserrat = Montserrat({ subsets: ["latin"], variable: "--font-montserrat" });

export const metadata: Metadata = {
  title: "Digital Event Invitations",
  description: "Premium digital invitations for your special events.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable} ${greatVibes.variable} ${cinzel.variable} ${pinyonScript.variable} ${cormorant.variable} ${montserrat.variable} antialiased font-sans`}>
        {children}
      </body>
    </html>
  );
}
