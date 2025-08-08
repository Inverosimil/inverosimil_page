"use client";
import React, { createContext, useContext, useEffect, useState } from "react";

export type Locale = "es" | "en";

type LocaleContextValue = {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: (key: string) => string;
};

const LocaleContext = createContext<LocaleContextValue | undefined>(undefined);

const messages: Record<Locale, Record<string, string>> = {
  es: {
    "nav.brand": "inverosímil",
    "nav.sobre": "sobre",
    "nav.proyectos": "proyectos",
    "nav.experiencia": "experiencia",
    "nav.contacto": "contacto",
    "hero.title": "diseño y construyo experiencias digitales limpias y veloces",
    "hero.subtitle": "Desarrollo software con enfoque en performance, DX y seguridad. Interfaces claras, sistemas robustos y detalles que importan.",
    "cta.proyectos": "ver proyectos",
    "cta.contacto": "contacto rápido",
    "section.sobre": "sobre-mi",
    "section.proyectos": "proyectos",
    "section.experiencia": "experiencia",
    "section.contacto": "contacto",
    "footer.made": "hecho con next.js",
  },
  en: {
    "nav.brand": "inverosímil",
    "nav.sobre": "about",
    "nav.proyectos": "projects",
    "nav.experiencia": "experience",
    "nav.contacto": "contact",
    "hero.title": "I design and build clean and fast digital experiences",
    "hero.subtitle": "I develop software focused on performance, DX and security. Clear interfaces, robust systems and meaningful details.",
    "cta.proyectos": "view projects",
    "cta.contacto": "quick contact",
    "section.sobre": "about-me",
    "section.proyectos": "projects",
    "section.experiencia": "experience",
    "section.contacto": "contact",
    "footer.made": "built with next.js",
  },
};

function getInitialLocale(): Locale {
  if (typeof window === "undefined") return "es";
  try {
    const stored = window.localStorage.getItem("locale");
    if (stored === "es" || stored === "en") return stored as Locale;
  } catch {}
  const lang = navigator.language?.toLowerCase() || "es";
  return lang.startsWith("en") ? "en" : "es";
}

export const LocaleProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [locale, setLocaleState] = useState<Locale>("es");

  useEffect(() => {
    setLocaleState(getInitialLocale());
  }, []);

  const setLocale = (l: Locale) => {
    setLocaleState(l);
    try { window.localStorage.setItem("locale", l); } catch {}
  };

  const t = (key: string) => messages[locale]?.[key] ?? key;

  const value: LocaleContextValue = { locale, setLocale, t };

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
};

export function useLocale() {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error("useLocale debe usarse dentro de LocaleProvider");
  return ctx;
} 