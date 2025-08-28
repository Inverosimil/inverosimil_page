"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useTheme } from "../context/ThemeContext";
import { useLocale } from "../context/LocaleContext";

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const { locale, setLocale, t } = useLocale();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const id = window.requestAnimationFrame(() => setLoaded(true));
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <header
      data-loaded={loaded}
      className="site-header fixed top-0 left-0 right-0 z-30 backdrop-blur supports-[backdrop-filter]:bg-white/70 dark:supports-[backdrop-filter]:bg-black/30 bg-white/80 dark:bg-black/60 border-b border-accent/10"
    >
      <div className="header-progress" aria-hidden />
      <nav className="max-w-5xl mx-auto px-6 sm:px-8 h-14 flex items-center justify-between">
        <Link href="#" className="header-brand font-semibold tracking-tight text-accent font-display text-xl">
          {t("nav.brand")}
        </Link>
        <div className="nav-stagger flex items-center gap-4 text-xs">
          <Link className="link nav-i" href="#sobre" style={{ ["--i" as any]: 0 }}>{t("nav.sobre")}</Link>
          <Link className="link nav-i" href="#proyectos" style={{ ["--i" as any]: 1 }}>{t("nav.proyectos")}</Link>
          <Link className="link nav-i" href="#experiencia" style={{ ["--i" as any]: 2 }}>{t("nav.experiencia")}</Link>
          <Link className="link nav-i" href="#contacto" style={{ ["--i" as any]: 3 }}>{t("nav.contacto")}</Link>
          <span className="mx-1 text-foreground/40 nav-i" style={{ ["--i" as any]: 4 }}>|</span>
          <button
            type="button"
            onClick={toggleTheme}
            className="px-2 py-1 rounded border border-accent/30 hover:border-accent/60 text-[12px] nav-i"
            aria-label="Cambiar tema"
            title="Cambiar tema"
            style={{ ["--i" as any]: 5 }}
          >
            {theme === "dark" ? "🌙" : "☀️"}
          </button>
          <div className="flex items-center gap-1 border border-accent/30 rounded overflow-hidden nav-i" style={{ ["--i" as any]: 6 }}>
            <button
              type="button"
              onClick={() => setLocale("es")}
              className={`px-2 py-1 text-[12px] ${locale === "es" ? "bg-accent text-white" : "hover:bg-accent/10"}`}
              aria-label="Español"
            >
              ES
            </button>
            <button
              type="button"
              onClick={() => setLocale("en")}
              className={`px-2 py-1 text-[12px] ${locale === "en" ? "bg-accent text-white" : "hover:bg-accent/10"}`}
              aria-label="English"
            >
              EN
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
} 