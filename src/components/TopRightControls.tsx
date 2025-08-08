"use client";
import React from "react";
import { useTheme } from "../context/ThemeContext";
import { useLocale } from "../context/LocaleContext";

export default function TopRightControls() {
  const { theme, toggleTheme } = useTheme();
  const { locale, setLocale } = useLocale();

  return (
    <div className="fixed top-3 right-4 z-40 flex items-center gap-2 text-xs">
      <button
        type="button"
        onClick={toggleTheme}
        className="px-2 py-1 rounded border border-accent/30 hover:border-accent/60 text-[12px] bg-background/60 backdrop-blur"
        aria-label="Cambiar tema"
        title="Cambiar tema"
      >
        {theme === "dark" ? "🌙" : "☀️"}
      </button>
      <div className="flex items-center gap-1 border border-accent/30 rounded overflow-hidden bg-background/60 backdrop-blur">
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
  );
} 