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
type LocaleLayoutSnapshot = Map<string, DOMRect>;

const messages: Record<Locale, Record<string, string>> = {
  es: {
    "section.sobre": "Sobre mí",
    "section.proyectos": "Proyectos",
    "section.experiencia": "Experiencia",
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
    "aria.palette": "Cambiar paleta de color",
    "aria.open_settings": "Abrir ajustes",
    "aria.close_settings": "Cerrar ajustes",
  },
  en: {
    "section.sobre": "About me",
    "section.proyectos": "Projects",
    "section.experiencia": "Experience",
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
    "aria.palette": "Change color palette",
    "aria.open_settings": "Open settings",
    "aria.close_settings": "Close settings",
  },
};

// Predeterminado en español; solo se respeta lo que el visitante eligió antes.
function getInitialLocale(): Locale {
  if (typeof window === "undefined") return "es";

  try {
    const stored = window.localStorage.getItem("locale");
    if (stored === "es" || stored === "en") return stored;
  } catch {}

  return "es";
}

function captureLocaleLayout(): LocaleLayoutSnapshot {
  const elements = Array.from(document.querySelectorAll<HTMLElement>("[data-locale-motion]"));
  const snapshot: LocaleLayoutSnapshot = new Map();

  elements.forEach((element) => {
    const motionKey = element.dataset.localeMotion;
    if (!motionKey) return;
    snapshot.set(motionKey, element.getBoundingClientRect());
  });

  return snapshot;
}

function animateLocaleLayout(previousRects: LocaleLayoutSnapshot) {
  const animations: Animation[] = [];
  const elements = Array.from(document.querySelectorAll<HTMLElement>("[data-locale-motion]"));

  elements.forEach((element) => {
    const motionKey = element.dataset.localeMotion;
    if (!motionKey) return;

    const previousRect = previousRects.get(motionKey);
    if (!previousRect) return;

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

function restartLocaleTextAnimation(root: HTMLElement) {
  root.classList.remove("locale-switching");
  root.getBoundingClientRect(); // Force style flush so rapid toggles replay keyframes.
  root.classList.add("locale-switching");
}

export const LocaleProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [locale, setLocaleState] = useState<Locale>("es");
  const currentLocaleRef = useRef<Locale>("es");
  const localeAnimationRunRef = useRef(0);
  const localeAnimationTimeoutsRef = useRef<number[]>([]);
  const localeAnimationFramesRef = useRef<number[]>([]);
  const localeLayoutAnimationsRef = useRef<Animation[]>([]);

  const stopLocaleAnimation = useCallback(() => {
    localeAnimationTimeoutsRef.current.forEach((timeoutId) => window.clearTimeout(timeoutId));
    localeAnimationFramesRef.current.forEach((frameId) => window.cancelAnimationFrame(frameId));
    localeLayoutAnimationsRef.current.forEach((animation) => animation.cancel());
    localeAnimationTimeoutsRef.current = [];
    localeAnimationFramesRef.current = [];
    localeLayoutAnimationsRef.current = [];
    document.documentElement.classList.remove("locale-switching");
  }, []);

  useEffect(() => {
    const initialLocale = getInitialLocale();
    currentLocaleRef.current = initialLocale;
    setLocaleState(initialLocale);
    document.documentElement.setAttribute("lang", initialLocale);
  }, []);

  const setLocale = useCallback((nextLocale: Locale) => {
    if (currentLocaleRef.current === nextLocale) return;

    const animationRun = localeAnimationRunRef.current + 1;
    localeAnimationRunRef.current = animationRun;
    stopLocaleAnimation();

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      currentLocaleRef.current = nextLocale;
      setLocaleState(nextLocale);
      document.documentElement.setAttribute("lang", nextLocale);
      try {
        window.localStorage.setItem("locale", nextLocale);
      } catch {}

      return;
    }

    const root = document.documentElement;

    const applyLocale = () => {
      currentLocaleRef.current = nextLocale;
      flushSync(() => setLocaleState(nextLocale));
      document.documentElement.setAttribute("lang", nextLocale);
      try {
        window.localStorage.setItem("locale", nextLocale);
      } catch {}
    };

    const previousRects = captureLocaleLayout();
    applyLocale();
    restartLocaleTextAnimation(root);

    const firstFrame = window.requestAnimationFrame(() => {
      localeAnimationFramesRef.current = localeAnimationFramesRef.current.filter((id) => id !== firstFrame);
      if (localeAnimationRunRef.current !== animationRun) return;

      const secondFrame = window.requestAnimationFrame(() => {
        localeAnimationFramesRef.current = localeAnimationFramesRef.current.filter((id) => id !== secondFrame);
        if (localeAnimationRunRef.current !== animationRun) return;

        localeLayoutAnimationsRef.current = animateLocaleLayout(previousRects);
      });

      localeAnimationFramesRef.current.push(secondFrame);
    });

    localeAnimationFramesRef.current.push(firstFrame);

    const cleanupTimeout = window.setTimeout(() => {
      if (localeAnimationRunRef.current === animationRun) {
        stopLocaleAnimation();
      }
    }, localeSwitchDuration);
    localeAnimationTimeoutsRef.current.push(cleanupTimeout);
  }, [stopLocaleAnimation]);

  const t = useCallback((key: string) => messages[locale]?.[key] ?? key, [locale]);

  const value = useMemo<LocaleContextValue>(() => ({ locale, setLocale, t }), [locale, setLocale, t]);

  useEffect(() => {
    return () => {
      localeAnimationRunRef.current += 1;
      stopLocaleAnimation();
    };
  }, [stopLocaleAnimation]);

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
};

export function useLocale() {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error("useLocale debe usarse dentro de LocaleProvider");
  return ctx;
}
