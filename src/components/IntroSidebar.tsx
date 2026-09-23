"use client";

import React from "react";
import { cvFile, socialLinks } from "../content/portfolio";
import { useLocale } from "../context/LocaleContext";
import { localeMotion } from "../utils/localeMotion";
import SideIndex from "./SideIndex";
import InlineControls from "./InlineControls";
import SocialLinks from "./SocialLinksNew";
import Reveal from "./Reveal";
import { DownloadIcon } from "./icons";

export default function IntroSidebar() {
  const { t } = useLocale();
  const rawName = t("hero.name").trim();
  const nameParts = rawName.split(/\s+/);
  const firstToken = nameParts[0] ?? "";
  const restTokens = nameParts.slice(1).join(" ");
  const nameBroken = restTokens ? `${firstToken}\n${restTokens}` : rawName;

  return (
    <aside id="inicio" className="md:sticky md:top-16 md:bottom-16 self-start">
      <div className="md:h-[calc(100vh-4rem)] flex flex-col justify-between pb-16">
        {/* Top: info */}
        <div {...localeMotion("sidebar-intro")}>
          <Reveal>
            <p className="locale-animated text-sm text-foreground/70 mb-1">
              {t("hero.greeting")}
            </p>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="font-display text-6xl sm:text-7xl md:text-7xl leading-[0.95] text-accent whitespace-pre-wrap">
              {nameBroken}
            </h1>
          </Reveal>
          <Reveal delay={140}>
            <p className="locale-animated locale-delay-2 mt-3 text-foreground text-base font-medium">
              {t("hero.profession")}
            </p>
          </Reveal>
          <Reveal delay={200}>
            <p className="locale-animated locale-delay-3 mt-3 max-w-md text-foreground/80 text-sm sm:text-base">
              {t("hero.description")}
            </p>
          </Reveal>
          <Reveal delay={240}>
            <a
              href={cvFile.href}
              download={cvFile.downloadName}
              className="inline-flex items-center gap-3 mt-6 text-base text-accent hover:text-accent/80 transition-colors font-medium group"
            >
              <span className="locale-animated locale-delay-4">{t("cta.cv")}</span>
              <DownloadIcon className="w-5 h-5 ext-icon" />
            </a>
          </Reveal>
        </div>

        {/* Middle: index centered vertically */}
        <Reveal delay={280}>
          <div {...localeMotion("sidebar-index")} className="hidden md:flex justify-start">
            <SideIndex />
          </div>
        </Reveal>

        {/* Bottom: social links and controls */}
        <div className="locale-static">
          <Reveal delay={320}>
            <SocialLinks {...socialLinks} className="mt-8 sm:mt-6" />
          </Reveal>
          <Reveal delay={360}>
            <div className="mt-4 hidden sm:block">
              <InlineControls />
            </div>
          </Reveal>
        </div>
      </div>
    </aside>
  );
}
