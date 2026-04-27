"use client";

import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { flushSync } from "react-dom";

export type Locale = "es" | "en";

type LocaleContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
};

const LocaleContext = createContext<LocaleContextValue | undefined>(undefined);
const localeLayoutDuration = 520;
const localeSwitchDuration = 650;
const localeLayoutDeltaThreshold = 2;

const messages: Record<Locale, Record<string, string>> = {
  es: {
    "nav.brand": "Sebastián Carrasco",
    "nav.sobre": "sobre",
    "nav.proyectos": "proyectos",
    "nav.experiencia": "experiencia",
    "nav.contacto": "contacto",
    "section.inicio": "inicio",
    "section.sobre": "Sobre mi",
    "section.proyectos": "Proyectos",
    "section.experiencia": "Experiencia",
    "section.contacto": "contacto",
    "hero.greeting": "Hola, soy",
    "hero.name": "Sebastián Carrasco",
    "hero.profession": "Ingeniero Civil Informático",
    "hero.description": "Transformo requerimientos complejos en soluciones tecnológicas claras, eficientes y escalables.",
    "cta.cv": "Descargar CV",
    "about.tech_title": "Tecnologías favoritas",
    "alt.profile": "Foto de perfil de Sebastián Carrasco",
    "alt.asesor": "Captura de AsesorDeSalud",
    "alt.terrainvicta": "Captura de TerraINVicta",
    "aria.theme": "Cambiar tema",
    "aria.open_settings": "Abrir ajustes",
    "aria.close_settings": "Cerrar ajustes",
  },
  en: {
    "nav.brand": "Sebastián Carrasco",
    "nav.sobre": "about",
    "nav.proyectos": "Projects",
    "nav.experiencia": "Experience",
    "nav.contacto": "contact",
    "section.inicio": "home",
    "section.sobre": "About me",
    "section.proyectos": "Projects",
    "section.experiencia": "Experience",
    "section.contacto": "contact",
    "hero.greeting": "Hi, I’m",
    "hero.name": "Sebastián Carrasco",
    "hero.profession": "Computer Civil Engineer",
    "hero.description": "I transform complex requirements into clear, efficient and scalable digital solutions.",
    "cta.cv": "Download CV",
    "about.tech_title": "Favorite technologies",
    "alt.profile": "Profile picture of Sebastián Carrasco",
    "alt.asesor": "AsesorDeSalud screenshot",
    "alt.terrainvicta": "TerraINVicta screenshot",
    "aria.theme": "Change theme",
    "aria.open_settings": "Open settings",
    "aria.close_settings": "Close settings",
  },
};

function getInitialLocale(): Locale {
  if (typeof window === "undefined") return "es";

  try {
    const stored = window.localStorage.getItem("locale");
    if (stored === "es" || stored === "en") return stored;
  } catch {}

  const lang = navigator.language?.toLowerCase() || "es";
  return lang.startsWith("en") ? "en" : "es";
}

function captureLocaleLayout() {
  const elements = Array.from(document.querySelectorAll<HTMLElement>("[data-locale-motion]"));
  return new Map(elements.map((element) => [element, element.getBoundingClientRect()]));
}

function animateLocaleLayout(previousRects: Map<HTMLElement, DOMRect>) {
  const animations: Animation[] = [];

  previousRects.forEach((previousRect, element) => {
    const currentRect = element.getBoundingClientRect();
    const deltaX = previousRect.left - currentRect.left;
    const deltaY = previousRect.top - currentRect.top;

    if (
      Math.abs(deltaX) < localeLayoutDeltaThreshold &&
      Math.abs(deltaY) < localeLayoutDeltaThreshold
    ) {
      return;
    }

    animations.push(
      element.animate(
        [
          { transform: `translate(${deltaX}px, ${deltaY}px)` },
          { transform: "translate(0, 0)" },
        ],
        {
          duration: localeLayoutDuration,
          easing: "cubic-bezier(.22,1,.36,1)",
        }
      )
    );
  });

  return animations;
}

export const LocaleProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [locale, setLocaleState] = useState<Locale>("es");
  const localeAnimationTimeoutsRef = useRef<number[]>([]);
  const localeAnimationFramesRef = useRef<number[]>([]);
  const localeLayoutAnimationsRef = useRef<Animation[]>([]);

  const clearLocaleAnimation = useCallback(() => {
    localeAnimationTimeoutsRef.current.forEach((timeoutId) => window.clearTimeout(timeoutId));
    localeAnimationFramesRef.current.forEach((frameId) => window.cancelAnimationFrame(frameId));
    localeLayoutAnimationsRef.current.forEach((animation) => animation.cancel());
    localeAnimationTimeoutsRef.current = [];
    localeAnimationFramesRef.current = [];
    localeLayoutAnimationsRef.current = [];
    document.documentElement.classList.remove("locale-switching");
  }, []);

  useEffect(() => {
    setLocaleState(getInitialLocale());
  }, []);

  const setLocale = useCallback((nextLocale: Locale) => {
    clearLocaleAnimation();

    if (locale === nextLocale) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setLocaleState(nextLocale);
      try {
        window.localStorage.setItem("locale", nextLocale);
      } catch {}

      return;
    }

    const root = document.documentElement;
    root.classList.add("locale-switching");

    const applyLocale = () => {
      flushSync(() => setLocaleState(nextLocale));
      document.documentElement.setAttribute("lang", nextLocale);
      try {
        window.localStorage.setItem("locale", nextLocale);
      } catch {}
    };

    const previousRects = captureLocaleLayout();
    applyLocale();

    const firstFrame = window.requestAnimationFrame(() => {
      const secondFrame = window.requestAnimationFrame(() => {
        localeLayoutAnimationsRef.current = animateLocaleLayout(previousRects);
        localeAnimationFramesRef.current = localeAnimationFramesRef.current.filter((id) => id !== secondFrame);
      });

      localeAnimationFramesRef.current.push(secondFrame);
      localeAnimationFramesRef.current = localeAnimationFramesRef.current.filter((id) => id !== firstFrame);
    });

    localeAnimationFramesRef.current.push(firstFrame);

    const cleanupTimeout = window.setTimeout(() => {
      clearLocaleAnimation();
    }, localeSwitchDuration);
    localeAnimationTimeoutsRef.current.push(cleanupTimeout);
  }, [clearLocaleAnimation, locale]);

  const t = useCallback((key: string) => messages[locale]?.[key] ?? key, [locale]);

  const value = useMemo<LocaleContextValue>(() => ({ locale, setLocale, t }), [locale, setLocale, t]);

  useEffect(() => {
    document.documentElement.setAttribute("lang", locale);
  }, [locale]);

  useEffect(() => {
    return clearLocaleAnimation;
  }, [clearLocaleAnimation]);

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
};

export function useLocale() {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error("useLocale debe usarse dentro de LocaleProvider");
  return ctx;
}
