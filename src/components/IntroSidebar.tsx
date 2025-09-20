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
    <aside id="inicio" className="md:sticky md:top-16 md:bottom-16 self-start">
      <div className="md:h-[calc(100vh-4rem)] flex flex-col justify-between pb-16">
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
              <p className="mt-3 text-foreground text-base font-medium">
                {t("hero.profession")}
              </p>
            </Reveal>
          <Reveal delay={200}>
            <p className="mt-3 max-w-md text-foreground/80 text-sm sm:text-base">
              {t("hero.description")}
            </p>
          </Reveal>
          <Reveal delay={240}>
            <a
              href="/documents/Sebastián_Carrasco_CV.pdf"
              download="Sebastián_Carrasco_CV.pdf"
              className="inline-flex items-center gap-2 mt-4 text-sm text-accent hover:text-accent/80 transition-colors font-medium group"
            >
              <span className="cursor-pointer">{t("cta.cv")}</span>
              <img src="/icons/download.svg" alt="" className="w-4 h-4 opacity-60 group-hover:opacity-100 transition-opacity brightness-0 contrast-200 dark:brightness-200 dark:contrast-0" />
            </a>
          </Reveal>
        </div>

        {/* Middle: index centered vertically */}
        <Reveal delay={280}>
          <div className="hidden md:flex justify-start">
            <SideIndex />
          </div>
        </Reveal>

        {/* Bottom: social links and controls */}
        <div>
          <Reveal delay={320}>
            <SocialLinks
              github="https://github.com/inverosimil"
              linkedin="https://www.linkedin.com/in/sebastian-carrasco-álvarez"
              instagram="https://instagram.com/_.inverosimil._"
              whatsapp="https://wa.me/56950146865?text=Hola%20Sebastián,%20quiero%20hacerte%20una%20consulta."
              email="mailto:contacto@scarrasco.com?subject=Consulta&body=Hola%20Sebastián,%20quiero%20hacerte%20una%20consulta."
              className="pt-2"
            />
          </Reveal>
          <Reveal delay={360}>
            <div className="mt-4">
              <InlineControls />
            </div>
          </Reveal>
        </div>
      </div>
    </aside>
  );
}
