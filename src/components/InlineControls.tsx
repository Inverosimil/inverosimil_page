"use client";
import React from "react";
import { useTheme } from "../context/ThemeContext";
import { useLocale } from "../context/LocaleContext";

export default function InlineControls() {
  const { theme, toggleTheme } = useTheme();
  const { locale, setLocale } = useLocale();

  return (
    <div className="mt-2 flex items-center gap-2 text-xs">
      <button
        type="button"
        onClick={(e) => {
          const root = document.documentElement;
          root.style.setProperty("--switch-x", `${e.clientX}px`);
          root.style.setProperty("--switch-y", `${e.clientY}px`);
          root.classList.add("theme-switching");
          window.setTimeout(() => root.classList.remove("theme-switching"), 550);
          toggleTheme();
        }}
        className="px-2 py-1 rounded border border-accent/30 hover:border-accent/60 text-[12px] bg-background/60 backdrop-blur"
        aria-label="Cambiar tema"
        title="Cambiar tema"
      >
        <span
          className={`inline-block transition-transform duration-300 ease-out ${
            theme === "dark" ? "rotate-0 scale-100" : "rotate-[-20deg] scale-105"
          }`}
        >
          {theme === "dark" ? "🌙" : "☀️"}
        </span>
      </button>
      <div className="flex items-center gap-1 border border-accent/30 rounded overflow-hidden bg-background/60 backdrop-blur">
        <button
          type="button"
          onClick={() => setLocale("es")}
          className={`px-2 py-1 text-[12px] ${locale === "es" ? "bg-accent text-white" : "hover:bg-accent/10"}`}
          aria-label="Español"
          title="Español"
        >
          ES
        </button>
        <button
          type="button"
          onClick={() => setLocale("en")}
          className={`px-2 py-1 text-[12px] ${locale === "en" ? "bg-accent text-white" : "hover:bg-accent/10"}`}
          aria-label="English"
          title="English"
        >
          EN
        </button>
      </div>
    </div>
  );
}
