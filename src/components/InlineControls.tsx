"use client";

import React from "react";
import { flashSwitchAt, useTheme } from "../context/ThemeContext";
import { useLocale } from "../context/LocaleContext";
import { PaletteIcon, ThemeIcon } from "./icons";
import { usePlayOnce } from "../utils/playOnce";

const iconButtonClass =
  "inline-flex items-center justify-center w-9 h-9 sm:w-7 sm:h-7 rounded-full text-foreground/70 hover:text-accent transition-colors duration-200 hover:bg-accent/10";

function localeButtonClass(active: boolean) {
  return `px-2.5 py-1.5 sm:px-2 sm:py-1 text-[12px] sm:text-[11px] font-medium transition-colors rounded-sm ${
    active ? "text-accent" : "text-foreground/70 hover:text-foreground"
  }`;
}

export default function InlineControls() {
  const { theme, accent, toggleTheme, toggleAccent } = useTheme();
  const { locale, setLocale, t } = useLocale();
  const playPalette = usePlayOnce(940);

  return (
    <div className="flex items-center gap-4 text-xs sm:text-xs">
      <button
        type="button"
        onClick={(e) => {
          flashSwitchAt(e.clientX, e.clientY);
          toggleTheme();
        }}
        className={iconButtonClass}
        aria-label={t("aria.theme")}
        aria-pressed={theme === "dark"}
        title={t("aria.theme")}
      >
        <ThemeIcon className="w-5 h-5 sm:w-4 sm:h-4" />
      </button>
      <div className="flex items-center gap-1 sm:gap-0.5">
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
        onPointerEnter={playPalette}
        onFocus={playPalette}
        onClick={(e) => {
          playPalette(e);
          flashSwitchAt(e.clientX, e.clientY);
          toggleAccent();
        }}
        className={`palette-btn ${iconButtonClass}`}
        aria-label={t("aria.palette")}
        aria-pressed={accent === "amber"}
        title={t("aria.palette")}
      >
        <PaletteIcon className="w-5 h-5 sm:w-4 sm:h-4" />
      </button>
    </div>
  );
}
