"use client";
import React from "react";
import { useLocale } from "../context/LocaleContext";
import SideIndex from "./SideIndex";

export default function IntroSidebar() {
  const { t } = useLocale();

  return (
    <aside id="inicio" className="md:sticky md:top-16 self-start">
      <div className="md:h-[calc(100vh-4rem)] flex flex-col gap-6">
        {/* Top: info */}
        <div>
          <p className="text-sm text-foreground/60 mb-1">{t("hero.greeting")}</p>
          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl leading-[0.9] text-accent">
            {t("hero.name")}
          </h1>
          <p className="mt-3 text-foreground/80 text-base">
            {t("hero.profession")} — {t("hero.brand")}
          </p>
          <p className="mt-3 max-w-md text-foreground/80 text-sm sm:text-base">
            {t("hero.description")}
          </p>
        </div>

        {/* Middle: index centered vertically */}
        <div className="flex-1 hidden md:flex items-center">
          <SideIndex />
        </div>

        {/* Bottom: social links */}
        <div className="mt-auto pt-2 flex gap-4 text-sm">
          <a className="link" href="https://github.com/inverosimil" target="_blank" rel="noreferrer">GitHub</a>
          <a className="link" href="https://x.com/inverosimil" target="_blank" rel="noreferrer">X/Twitter</a>
          <a className="link" href="https://www.linkedin.com/in/inverosimil" target="_blank" rel="noreferrer">LinkedIn</a>
        </div>
      </div>
    </aside>
  );
}
