"use client";
import React from "react";
import { useTheme } from "../context/ThemeContext";
import { useLocale } from "../context/LocaleContext";

export default function InlineControls() {
  const { theme, toggleTheme } = useTheme();
  const { locale, setLocale } = useLocale();

  return (
    <div className="flex items-center gap-3 text-xs">
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
        className="inline-flex items-center justify-center w-8 h-8 rounded-lg border border-accent/20 hover:border-accent/40 text-foreground/70 hover:text-accent transition-all duration-200 bg-transparent hover:bg-accent/5"
        aria-label="Cambiar tema"
        title="Cambiar tema"
      >
        <img 
          src={theme === "dark" ? "/icons/darkmode.svg" : "/icons/lightmode.svg"} 
          alt="" 
          className="w-4 h-4 brightness-0 contrast-200 dark:brightness-200 dark:contrast-0"
        />
      </button>
      <div className="flex items-center gap-1 border border-accent/20 rounded-lg overflow-hidden bg-transparent hover:bg-accent/5 transition-colors">
        <button
          type="button"
          onClick={() => setLocale("es")}
          className={`px-3 py-1.5 text-[12px] font-medium transition-colors ${
            locale === "es" 
              ? "bg-accent text-white" 
              : "text-foreground/70 hover:text-accent hover:bg-accent/10"
          }`}
          aria-label="Español"
          title="Español"
        >
          ES
        </button>
        <button
          type="button"
          onClick={() => setLocale("en")}
          className={`px-3 py-1.5 text-[12px] font-medium transition-colors ${
            locale === "en" 
              ? "bg-accent text-white" 
              : "text-foreground/70 hover:text-accent hover:bg-accent/10"
          }`}
          aria-label="English"
          title="English"
        >
          EN
        </button>
      </div>
    </div>
  );
}
