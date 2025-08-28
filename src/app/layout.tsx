import type { Metadata } from "next";
import { Inter, Bebas_Neue } from "next/font/google";
import "./globals.css";
import Providers from "../components/Providers";
import ParallaxBackground from "../components/ParallaxBackground";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const bebas = Bebas_Neue({
  variable: "--font-display",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "inverosímil — portfolio",
  description: "Portfolio minimalista, oscuro y hacker de inverosímil.",
  metadataBase: new URL("https://inverosimil.dev"),
  icons: [{ rel: "icon", url: "/favicon.svg" }],
  openGraph: {
    title: "inverosímil — portfolio",
    description: "Portfolio minimalista, oscuro y hacker de inverosímil.",
    type: "website",
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: "inverosímil — portfolio",
    description: "Portfolio minimalista, oscuro y hacker de inverosímil.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className="scroll-smooth theme-light">
      <body className={`${inter.variable} ${bebas.variable} antialiased bg-background text-foreground`}>
        <Providers>
          <ParallaxBackground speed={0.35} />
          {children}
        </Providers>
      </body>
    </html>
  );
}
