"use client";
import React, { useEffect, useRef, useState } from "react";
import { useTheme } from "../context/ThemeContext";
import { useLocale } from "../context/LocaleContext";

export default function TopRightControls() {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const { theme, toggleTheme } = useTheme();
  const { locale, setLocale } = useLocale();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      const el = wrapperRef.current;
      if (!el) return;
      if (!el.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [open]);

  return (
    <div
      ref={wrapperRef}
      className="sm:hidden fixed z-50"
      style={{ top: "calc(env(safe-area-inset-top, 0px) + 0.75rem)", right: "calc(env(safe-area-inset-right, 0px) + 0.75rem)" }}
    >
      <div
        aria-expanded={open}
        className={`border border-accent/20 backdrop-blur bg-background/90 shadow-md flex items-center gap-2 overflow-hidden relative ${
          open ? "w-48 h-10 rounded-full pr-11" : "w-10 h-10 rounded-full"
        }`}
        style={{
          transformOrigin: "top right",
          transition: "width 340ms cubic-bezier(.22,1,.36,1), height 340ms cubic-bezier(.22,1,.36,1), box-shadow 280ms ease, background-color 280ms ease, transform 280ms ease",
          transform: open ? "scale(1.02)" : "scale(1)"
        }}
      >
        {open ? (
          <>
            {/* Equal spacing: theme | languages | close */}
            <div className="flex items-center gap-3 flex-grow justify-end">
              <button
                type="button"
                aria-label="Cambiar tema"
                title="Cambiar tema"
                onClick={(e) => {
                  const root = document.documentElement;
                  root.style.setProperty("--switch-x", `${e.clientX}px`);
                  root.style.setProperty("--switch-y", `${e.clientY}px`);
                  root.classList.add("theme-switching");
                  window.setTimeout(() => root.classList.remove("theme-switching"), 550);
                  toggleTheme();
                }}
                className="inline-flex items-center justify-center w-9 h-9 rounded-full hover:bg-accent/10"
              >
                <img
                  src={theme === "dark" ? "/icons/darkmode.svg" : "/icons/lightmode.svg"}
                  alt=""
                  className="w-5 h-5 brightness-0 contrast-200 dark:brightness-200 dark:contrast-0"
                />
              </button>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setLocale("es")}
                  className={`px-2.5 py-1.5 text-[12px] font-medium rounded-sm transition-colors ${
                    locale === "es" ? "text-accent" : "text-foreground/60 hover:text-foreground"
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
                  className={`px-2.5 py-1.5 text-[12px] font-medium rounded-sm transition-colors ${
                    locale === "en" ? "text-accent" : "text-foreground/60 hover:text-foreground"
                  }`}
                  aria-label="English"
                  title="English"
                >
                  EN
                </button>
              </div>
            </div>

            <button
              type="button"
              aria-label="Cerrar ajustes"
              title="Cerrar"
              onClick={() => setOpen(false)}
              className="absolute right-0 top-1/2 -translate-y-1/2 inline-flex items-center justify-center w-10 h-10 rounded-full hover:bg-accent/10"
            >
              <img src="/icons/close.svg" className="w-5 h-5 rotate-0 transition-transform duration-200 brightness-0 contrast-200 dark:brightness-200 dark:contrast-0" alt="" />
            </button>
          </>
        ) : (
          <button
            type="button"
            aria-label="Abrir ajustes"
            title="Ajustes"
            onClick={() => setOpen(true)}
            className="w-full h-full inline-flex items-center justify-center"
          >
            <img src="/icons/menu.svg" className="w-5 h-5 transition-transform duration-200 brightness-0 contrast-200 dark:brightness-200 dark:contrast-0" alt="" />
          </button>
        )}
      </div>
    </div>
  );
}