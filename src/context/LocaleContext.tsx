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
    "nav.brand": "Sebastián Carrasco",
    "nav.sobre": "sobre",
    "nav.proyectos": "proyectos",
    "nav.experiencia": "experiencia",
    "nav.contacto": "contacto",
    "section.inicio": "inicio",
    "hero.greeting": "Hola, soy",
    "hero.name": "Sebastián Carrasco",
    "hero.profession": "Ingeniero Civil Informático",
    "hero.description": "Transformo requerimientos complejos en soluciones digitales claras, eficientes y escalables.",
    "cta.cv": "Descargar CV",
    "section.sobre": "Sobre mi",
    "section.proyectos": "Proyectos",
    "section.experiencia": "Experiencia",
    "section.contacto": "contacto",
    "footer.made": "hecho con next.js",
  },
  en: {
    "nav.brand": "Sebastián Carrasco",
    "nav.sobre": "about",
    "nav.proyectos": "projects",
    "nav.experiencia": "experience",
    "nav.contacto": "contact",
    "section.inicio": "home",
    "hero.greeting": "Hi, I’m",
    "hero.name": "Sebastián Carrasco",
    "hero.profession": "Computer Science Engineer",
    "hero.description": "I transform complex requirements into clear, efficient and scalable digital solutions.",
    "cta.cv": "Download CV",
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