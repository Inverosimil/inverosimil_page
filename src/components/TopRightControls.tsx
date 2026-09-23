"use client";

import React, { useEffect, useRef, useState } from "react";
import { flashSwitchAt, useTheme } from "../context/ThemeContext";
import { useLocale } from "../context/LocaleContext";
import { CloseIcon, PaletteIcon, SettingsIcon, ThemeIcon } from "./icons";

const iconButtonClass = "inline-flex items-center justify-center w-9 h-9 rounded-full hover:bg-accent/10 hover:text-accent transition-colors";

function localeButtonClass(active: boolean) {
  return `px-2.5 py-1.5 text-[12px] font-medium rounded-sm transition-colors ${
    active ? "text-accent" : "text-foreground/70 hover:text-foreground"
  }`;
}

export default function TopRightControls() {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const { theme, accent, toggleTheme, toggleAccent } = useTheme();
  const { locale, setLocale, t } = useLocale();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const onDown = (e: PointerEvent) => {
      const el = wrapperRef.current;
      if (el && !el.contains(e.target as Node)) setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onDown);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onDown);
    };
  }, [open]);

  return (
    <div
      ref={wrapperRef}
      className="locale-static sm:hidden fixed z-50"
      style={{ top: "calc(env(safe-area-inset-top, 0px) + 0.75rem)", right: "calc(env(safe-area-inset-right, 0px) + 0.75rem)" }}
    >
      <div
        className={`border border-accent/20 backdrop-blur bg-background/90 shadow-md flex items-center gap-2 overflow-hidden relative rounded-full h-10 ${
          open ? "w-64 pr-11" : "w-10"
        }`}
        style={{
          transformOrigin: "top right",
          transition: "width 340ms cubic-bezier(.22,1,.36,1), box-shadow 280ms ease, background-color 280ms ease, transform 280ms ease",
          transform: open ? "scale(1.02)" : "scale(1)",
        }}
      >
        {open ? (
          <>
            <div className="flex items-center gap-2 flex-grow justify-end">
              <button
                type="button"
                aria-label={t("aria.theme")}
                aria-pressed={theme === "dark"}
                title={t("aria.theme")}
                onClick={(e) => {
                  flashSwitchAt(e.clientX, e.clientY);
                  toggleTheme();
                }}
                className={iconButtonClass}
              >
                <ThemeIcon className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => setLocale("es")}
                  aria-pressed={locale === "es"}
                  className={localeButtonClass(locale === "es")}
                  aria-label="Español"
                  title="Español"
                >
                  ES
                </button>
                <span aria-hidden className="text-foreground/40 text-[10px]">|</span>
                <button
                  type="button"
                  onClick={() => setLocale("en")}
                  aria-pressed={locale === "en"}
                  className={localeButtonClass(locale === "en")}
                  aria-label="English"
                  title="English"
                >
                  EN
                </button>
              </div>

              <button
                type="button"
                aria-label={t("aria.palette")}
                aria-pressed={accent === "amber"}
                title={t("aria.palette")}
                onClick={(e) => {
                  flashSwitchAt(e.clientX, e.clientY);
                  toggleAccent();
                }}
                className={iconButtonClass}
              >
                <PaletteIcon className="w-5 h-5" />
              </button>
            </div>

            <button
              type="button"
              aria-label={t("aria.close_settings")}
              title={t("aria.close_settings")}
              onClick={() => setOpen(false)}
              className="absolute right-0 top-1/2 -translate-y-1/2 inline-flex items-center justify-center w-10 h-10 rounded-full hover:bg-accent/10 hover:text-accent transition-colors"
            >
              <CloseIcon className="w-5 h-5" />
            </button>
          </>
        ) : (
          <button
            type="button"
            aria-label={t("aria.open_settings")}
            aria-expanded={open}
            title={t("aria.open_settings")}
            onClick={() => setOpen(true)}
            className="w-full h-full inline-flex items-center justify-center hover:text-accent transition-colors"
          >
            <SettingsIcon className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  );
}
