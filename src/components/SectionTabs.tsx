"use client";
import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useLocale } from "../context/LocaleContext";

const SECTION_IDS = ["inicio", "sobre", "proyectos", "experiencia", "contacto"] as const;
type SectionId = typeof SECTION_IDS[number];

export default function SectionTabs() {
  const { t } = useLocale();

  const labels = useMemo(
    () => ({
      inicio: t("section.inicio"),
      sobre: t("section.sobre"),
      proyectos: t("section.proyectos"),
      experiencia: t("section.experiencia"),
      contacto: t("section.contacto"),
    }),
    [t]
  );

  const [active, setActive] = useState<SectionId>("inicio");

  useEffect(() => {
    let ticking = false;

    const getActiveByCenter = (): SectionId => {
      const viewportCenter = window.innerHeight / 2;
      const atTop = window.scrollY <= 2;
      if (atTop) return "inicio";
      const atBottom = window.scrollY + window.innerHeight >= (document.documentElement.scrollHeight - 2);
      if (atBottom) return "contacto";

      let bestId: SectionId = "inicio";
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

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    update();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const handleClick = (id: SectionId) => () => {
    setActive(id);
    window.setTimeout(() => {
      const evt = new Event("scroll");
      window.dispatchEvent(evt);
    }, 350);
  };

  return (
    <nav aria-label="Navegación de secciones" className="w-full">
      <ul className="flex flex-wrap items-center gap-2 sm:gap-3">
        {SECTION_IDS.map((id) => {
          const isActive = active === id;
          return (
            <li key={id}>
              <Link
                href={`#${id}`}
                onClick={handleClick(id)}
                className={
                  "px-3 sm:px-4 py-1.5 rounded-full text-xs sm:text-[13px] border transition-colors " +
                  (isActive
                    ? "border-accent bg-accent text-white"
                    : "border-accent/30 hover:border-accent/60 hover:text-foreground")
                }
              >
                {labels[id]}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}


