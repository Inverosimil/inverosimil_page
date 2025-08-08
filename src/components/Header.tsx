"use client";
import Link from "next/link";
import React from "react";
import { useTheme } from "../context/ThemeContext";
import { useLocale } from "../context/LocaleContext";

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const { locale, setLocale, t } = useLocale();

  return (
    <header className="fixed top-0 left-0 right-0 z-30 backdrop-blur supports-[backdrop-filter]:bg-white/70 dark:supports-[backdrop-filter]:bg-black/30 bg-white/80 dark:bg-black/60 border-b border-accent/10">
      <nav className="max-w-5xl mx-auto px-6 sm:px-8 h-14 flex items-center justify-between">
        <Link href="#" className="font-semibold tracking-tight text-accent">
          {t("nav.brand")}
        </Link>
        <div className="flex items-center gap-4 text-xs">
          <Link className="link" href="#sobre">{t("nav.sobre")}</Link>
          <Link className="link" href="#proyectos">{t("nav.proyectos")}</Link>
          <Link className="link" href="#experiencia">{t("nav.experiencia")}</Link>
          <Link className="link" href="#contacto">{t("nav.contacto")}</Link>
          <span className="mx-1 text-foreground/40">|</span>
          <button
            type="button"
            onClick={toggleTheme}
            className="px-2 py-1 rounded border border-accent/30 hover:border-accent/60 text-[12px]"
            aria-label="Cambiar tema"
            title="Cambiar tema"
          >
            {theme === "dark" ? "🌙" : "☀️"}
          </button>
          <div className="flex items-center gap-1 border border-accent/30 rounded overflow-hidden">
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