"use client";
import React from "react";
import { useLocale } from "../context/LocaleContext";
import SideIndex from "./SideIndex";
import Typewriter from "./Typewriter";
import InlineControls from "./InlineControls";
import SocialLinks from "./SocialLinksNew";

export default function IntroSidebar() {
  const { t } = useLocale();

  return (
    <aside id="inicio" className="md:sticky md:top-16 self-start">
      <div className="md:h-[calc(100vh-4rem)] flex flex-col gap-6">
        {/* Top: info */}
        <div>
          <p className="text-sm text-foreground/60 mb-1">
            <Typewriter text={t("hero.greeting")} restartKey={t("nav.brand") + "-" + t("hero.greeting")} speed={18} startDelay={50} />
          </p>
          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl leading-[0.9] text-accent">
            <Typewriter text={t("hero.name")} restartKey={t("hero.name")} speed={16} startDelay={120} cursor={false} />
          </h1>
          <p className="mt-3 text-foreground/80 text-base">
            <Typewriter text={`${t("hero.profession")} — ${t("hero.brand")}`} restartKey={t("hero.profession") + t("hero.brand")} speed={14} startDelay={220} />
          </p>
          <p className="mt-3 max-w-md text-foreground/80 text-sm sm:text-base">
            <Typewriter text={t("hero.description")} restartKey={t("hero.description")} speed={12} startDelay={320} />
          </p>
        </div>

        {/* Middle: index centered vertically */}
        <div className="flex-1 hidden md:flex items-center">
          <SideIndex />
        </div>

        {/* Bottom: social links */}
        <SocialLinks
          github="https://github.com/inverosimil"
          linkedin="https://www.linkedin.com/in/inverosimil"
          instagram="https://instagram.com/_.inverosimil._"
          whatsapp="https://wa.me/56950146865"
          email="mailto:hello@inverosimil.dev"
          className="mt-auto pt-2"
        />
        <InlineControls />
      </div>
    </aside>
  );
}
