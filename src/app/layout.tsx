import type { Metadata } from "next";
import { Inter, Bebas_Neue } from "next/font/google";
import "./globals.css";
import Providers from "../components/Providers";
import ParallaxBackground from "../components/ParallaxBackground";
import SmoothPageScroll from "../components/SmoothPageScroll";
import TopRightControls from "../components/TopRightControls";

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
  title: "Sebastián Carrasco — portfolio",
  description: "Portfolio de Sebastián Carrasco.",
  metadataBase: new URL("https://scarrasco.com"),
  icons: [
    { rel: "icon", type: "image/svg+xml", url: "/favicon.svg?v=3" },
  ],
  alternates: { canonical: "/" },
  applicationName: "Sebastián Carrasco - Ingeniero Civil Informático",
  authors: [{ name: "Sebastián Carrasco", url: "https://scarrasco.com" }],
  keywords: [
    "Sebastián Carrasco",
    "Ingeniero Civil Informático",
    "Desarrollador",
    "Portafolio",
    "Next.js",
    "Desarrollo Web",
  ],
  openGraph: {
    title: "Sebastián Carrasco — Ingeniero Civil Informático",
    description: "Portfolio de Sebastián Carrasco.",
    type: "website",
    url: "/",
    siteName: "scarrasco.com",
    images: [
      {
        url: "/profile_image.webp",
        width: 900,
        height: 975,
        alt: "Foto de perfil de Sebastián Carrasco",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sebastián Carrasco — Ingeniero Civil Informático",
    description: "Portfolio de Sebastián Carrasco.",
    images: [
      {
        url: "/profile_image.webp",
        alt: "Foto de perfil de Sebastián Carrasco",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                var root = document.documentElement;
                var theme = null, accent = null;
                try {
                  theme = localStorage.getItem('theme');
                  accent = localStorage.getItem('accent');
                } catch (e) {}
                // Predeterminado: oscuro + ámbar (mismo criterio que ThemeContext)
                root.classList.add(theme === 'light' ? 'theme-light' : 'theme-dark');
                if (accent !== 'purple') root.classList.add('accent-amber');
              })();
            `,
          }}
        />
      </head>
      <body className={`${inter.variable} ${bebas.variable} antialiased bg-background text-foreground`}>
        <Providers>
          <SmoothPageScroll />
          <ParallaxBackground speed={0.35} />
          <TopRightControls />
          {children}
        </Providers>
      </body>
    </html>
  );
}
