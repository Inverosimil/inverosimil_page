"use client";
import React from "react";
import { useLocale } from "../context/LocaleContext";
import SideIndex from "./SideIndex";
import InlineControls from "./InlineControls";
import SocialLinks from "./SocialLinksNew";
import Reveal from "./Reveal";

export default function IntroSidebar() {
  const { t } = useLocale();
  const rawName = t("hero.name").trim();
  const nameParts = rawName.split(/\s+/);
  const firstToken = nameParts[0] ?? "";
  const restTokens = nameParts.slice(1).join(" ");
  const nameBroken = restTokens ? `${firstToken}\n${restTokens}` : rawName;

  return (
    <aside id="inicio" className="md:sticky md:top-16 self-start">
      <div className="md:h-[calc(100vh-4rem)] flex flex-col justify-between">
        {/* Top: info */}
        <div>
          <Reveal>
            <p className="text-sm text-foreground/60 mb-1">
              {t("hero.greeting")}
            </p>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="font-display text-5xl sm:text-6xl md:text-7xl leading-[0.9] text-accent whitespace-pre-wrap">
              {nameBroken}
            </h1>
          </Reveal>
          <Reveal delay={140}>
            <p className="mt-3 text-foreground/80 text-base">
              {t("hero.profession")}
            </p>
          </Reveal>
          <Reveal delay={200}>
            <p className="mt-3 max-w-md text-foreground/80 text-sm sm:text-base">
              {t("hero.description")}
            </p>
          </Reveal>
        </div>

        {/* Middle: index centered vertically */}
        <Reveal delay={240}>
          <div className="hidden md:flex justify-start">
            <SideIndex />
          </div>
        </Reveal>

        {/* Bottom: social links and controls */}
        <div>
          <Reveal delay={280}>
            <SocialLinks
              github="https://github.com/inverosimil"
              linkedin="https://www.linkedin.com/in/inverosimil"
              instagram="https://instagram.com/_.inverosimil._"
              whatsapp="https://wa.me/56950146865"
              email="mailto:hello@inverosimil.dev"
              className="pt-2"
            />
          </Reveal>
          <Reveal delay={320}>
            <InlineControls />
          </Reveal>
        </div>
      </div>
    </aside>
  );
}
