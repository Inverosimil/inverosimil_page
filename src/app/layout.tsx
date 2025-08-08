import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "../components/Providers";
import ParallaxBackground from "../components/ParallaxBackground";
import SideIndex from "../components/SideIndex";
import TopRightControls from "../components/TopRightControls";

const inter = Inter({
  variable: "--font-inter",
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
      <body className={`${inter.variable} antialiased bg-background text-foreground`}>
        <Providers>
          <ParallaxBackground speed={0.35} />
          <SideIndex />
          <TopRightControls />
          {children}
        </Providers>
      </body>
    </html>
  );
}
