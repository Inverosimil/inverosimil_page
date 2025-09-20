"use client";
import React from "react";
import { useTheme } from "../context/ThemeContext";
import { useLocale } from "../context/LocaleContext";

export default function InlineControls() {
  const { theme, toggleTheme } = useTheme();
  const { locale, setLocale } = useLocale();

  return (
    <div className="flex items-center gap-4 text-xs">
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
        className="inline-flex items-center justify-center w-7 h-7 rounded-full text-foreground/60 hover:text-accent transition-colors duration-200 hover:bg-accent/10"
        aria-label="Cambiar tema"
        title="Cambiar tema"
      >
        <img 
          src={theme === "dark" ? "/icons/darkmode.svg" : "/icons/lightmode.svg"} 
          alt="" 
          className="w-4 h-4 brightness-0 contrast-200 dark:brightness-200 dark:contrast-0"
        />
      </button>
      <div className="flex items-center gap-0.5">
        <button
          type="button"
          onClick={() => setLocale("es")}
          className={`px-2 py-1 text-[11px] font-medium transition-colors rounded-sm ${
            locale === "es" 
              ? "text-accent" 
              : "text-foreground/50 hover:text-foreground/80"
          }`}
          aria-label="Español"
          title="Español"
        >
          ES
        </button>
        <span className="text-foreground/30 text-[10px]">|</span>
        <button
          type="button"
          onClick={() => setLocale("en")}
          className={`px-2 py-1 text-[11px] font-medium transition-colors rounded-sm ${
            locale === "en" 
              ? "text-accent" 
              : "text-foreground/50 hover:text-foreground/80"
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
