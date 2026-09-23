"use client";
import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

export type Theme = "light" | "dark";
export type Accent = "purple" | "amber";

type ThemeContextValue = {
  theme: Theme;
  accent: Accent;
  setTheme: (t: Theme) => void;
  toggleTheme: () => void;
  toggleAccent: () => void;
};

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

// Las clases se aplican también en el script inline de layout.tsx (antes del
// primer paint); si cambias nombres o claves de localStorage, cámbialos allí.
function applyThemeClass(theme: Theme) {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  root.classList.remove("theme-light", "theme-dark");
  root.classList.add(theme === "dark" ? "theme-dark" : "theme-light");
}

function applyAccentClass(accent: Accent) {
  if (typeof document === "undefined") return;
  document.documentElement.classList.toggle("accent-amber", accent === "amber");
}

// Predeterminado: oscuro + ámbar. Solo se respeta lo que el visitante eligió antes.
const defaultTheme: Theme = "dark";
const defaultAccent: Accent = "amber";

function getInitialTheme(): Theme {
  if (typeof window === "undefined") return defaultTheme;
  try {
    const stored = window.localStorage.getItem("theme");
    if (stored === "light" || stored === "dark") return stored as Theme;
  } catch {}
  return defaultTheme;
}

function getInitialAccent(): Accent {
  if (typeof window === "undefined") return defaultAccent;
  try {
    const stored = window.localStorage.getItem("accent");
    if (stored === "purple" || stored === "amber") return stored;
  } catch {}
  return defaultAccent;
}

function persist(key: string, value: string) {
  try {
    window.localStorage.setItem(key, value);
  } catch {}
}

/** Destello radial desde el punto del clic al cambiar tema o paleta. */
export function flashSwitchAt(x: number, y: number) {
  const root = document.documentElement;
  root.style.setProperty("--switch-x", `${x}px`);
  root.style.setProperty("--switch-y", `${y}px`);
  root.classList.remove("theme-switching");
  root.getBoundingClientRect(); // fuerza reinicio de la animación en clics rápidos
  root.classList.add("theme-switching");
  window.setTimeout(() => root.classList.remove("theme-switching"), 550);
}

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<Theme>(defaultTheme);
  const [accent, setAccentState] = useState<Accent>(defaultAccent);

  useEffect(() => {
    const initialTheme = getInitialTheme();
    const initialAccent = getInitialAccent();
    setThemeState(initialTheme);
    setAccentState(initialAccent);
    applyThemeClass(initialTheme);
    applyAccentClass(initialAccent);
  }, []);

  const setTheme = useCallback((nextTheme: Theme) => {
    setThemeState(nextTheme);
    applyThemeClass(nextTheme);
    persist("theme", nextTheme);
  }, []);

  const toggleTheme = useCallback(() => {
    setThemeState((currentTheme) => {
      const nextTheme = currentTheme === "dark" ? "light" : "dark";
      applyThemeClass(nextTheme);
      persist("theme", nextTheme);
      return nextTheme;
    });
  }, []);

  const toggleAccent = useCallback(() => {
    setAccentState((currentAccent) => {
      const nextAccent = currentAccent === "amber" ? "purple" : "amber";
      applyAccentClass(nextAccent);
      persist("accent", nextAccent);
      return nextAccent;
    });
  }, []);

  const value = useMemo<ThemeContextValue>(
    () => ({ theme, accent, setTheme, toggleTheme, toggleAccent }),
    [theme, accent, setTheme, toggleTheme, toggleAccent]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme debe usarse dentro de ThemeProvider");
  return ctx;
}
