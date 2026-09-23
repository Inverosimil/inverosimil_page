"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useLocale } from "../context/LocaleContext";

const SECTION_IDS = ["sobre", "proyectos", "experiencia"] as const;
const smoothScrollMaxDuration = 620;
const smoothScrollMinDuration = 400;

type SectionId = typeof SECTION_IDS[number];

function easeInOutQuart(progress: number) {
  return progress < 0.5
    ? 8 * progress * progress * progress * progress
    : 1 - Math.pow(-2 * progress + 2, 4) / 2;
}

export default function SideIndex() {
  const { t } = useLocale();
  const scrollAnimationRef = useRef<number | null>(null);
  const restoreScrollBehaviorRef = useRef<(() => void) | null>(null);
  const labels = useMemo(
    () => ({
      sobre: t("section.sobre"),
      proyectos: t("section.proyectos"),
      experiencia: t("section.experiencia"),
    }),
    [t]
  );

  const [active, setActive] = useState<SectionId>("sobre");

  useEffect(() => {
    let ticking = false;

    const getActiveByCenter = (): SectionId => {
      const viewportCenter = window.innerHeight / 2;

      const atTop = window.scrollY <= 2;
      if (atTop) return "sobre";
      const atBottom = window.scrollY + window.innerHeight >= (document.documentElement.scrollHeight - 2);
      if (atBottom) return "experiencia";

      let bestId: SectionId = "sobre";
      let bestDist = Number.POSITIVE_INFINITY;
      for (const id of SECTION_IDS) {
        const el = document.getElementById(id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        const center = rect.top + rect.height / 2;
        const dist = Math.abs(center - viewportCenter);
        if (dist < bestDist) {
          bestDist = dist;
          bestId = id;
        }
      }
      return bestId;
    };

    const update = () => {
      const next = getActiveByCenter();
      setActive((prev) => (prev === next ? prev : next));
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(update);
        ticking = true;
      }
    };

    const onResize = onScroll;

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);

    update();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  useEffect(() => {
    return () => {
      if (scrollAnimationRef.current != null) {
        window.cancelAnimationFrame(scrollAnimationRef.current);
      }

      restoreScrollBehaviorRef.current?.();
    };
  }, []);

  const handleClick = (id: SectionId) => (e: React.MouseEvent) => {
    e.preventDefault(); // Evitar que cambie el hash en la URL
    
    const element = document.getElementById(id);
    if (!element) return;

    if (scrollAnimationRef.current != null) {
      window.cancelAnimationFrame(scrollAnimationRef.current);
      scrollAnimationRef.current = null;
    }

    restoreScrollBehaviorRef.current?.();

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const scrollMarginTop = Number.parseFloat(window.getComputedStyle(element).scrollMarginTop) || 0;
    const startY = window.scrollY;
    const maxY = document.documentElement.scrollHeight - window.innerHeight;
    const targetY = Math.max(
      0,
      Math.min(window.scrollY + element.getBoundingClientRect().top - scrollMarginTop, maxY)
    );

    if (prefersReducedMotion) {
      window.scrollTo({ top: targetY, behavior: "auto" });
      return;
    }

    const root = document.documentElement;
    const previousScrollBehavior = root.style.scrollBehavior;
    root.style.scrollBehavior = "auto";
    restoreScrollBehaviorRef.current = () => {
      root.style.scrollBehavior = previousScrollBehavior;
      restoreScrollBehaviorRef.current = null;
    };

    const distance = targetY - startY;
    const duration = Math.min(
      smoothScrollMaxDuration,
      Math.max(smoothScrollMinDuration, Math.abs(distance) * 0.32)
    );
    const startTime = performance.now();

    const step = (currentTime: number) => {
      const progress = Math.min((currentTime - startTime) / duration, 1);
      window.scrollTo({ top: startY + distance * easeInOutQuart(progress), behavior: "auto" });

      if (progress < 1) {
        scrollAnimationRef.current = window.requestAnimationFrame(step);
        return;
      }

      scrollAnimationRef.current = null;
      restoreScrollBehaviorRef.current?.();
    };

    scrollAnimationRef.current = window.requestAnimationFrame(step);
  };

  return (
    <nav aria-label="Índice de secciones" className="hidden md:block">
      <ul className="space-y-1 text-sm">
        {SECTION_IDS.map((id) => {
          const isActive = active === id;
          return (
            <li key={id}>
              <a
                href={`#${id}`}
                onClick={handleClick(id)}
                aria-current={isActive ? "location" : undefined}
                data-active={isActive ? "true" : "false"}
                className={
                  "sideindex-link group flex items-center gap-2 py-1.5 transition-colors " +
                  (isActive ? "text-foreground font-medium" : "text-foreground/70 hover:text-foreground")
                }
              >
                <span aria-hidden className={"sideindex-dash"} />
                <span className="locale-animated sideindex-label">{labels[id]}</span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
