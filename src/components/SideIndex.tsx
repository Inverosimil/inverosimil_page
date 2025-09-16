"use client";
import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useLocale } from "../context/LocaleContext";

const SECTION_IDS = ["sobre", "proyectos", "experiencia"] as const;

type SectionId = typeof SECTION_IDS[number];

export default function SideIndex() {
  const { t } = useLocale();
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

  const handleClick = (id: SectionId) => () => {
    setActive(id);
    window.setTimeout(() => {
      const evt = new Event("scroll");
      window.dispatchEvent(evt);
    }, 350);
  };

  return (
    <nav aria-label="Índice de secciones" className="hidden md:block">
      <ul className="space-y-1 text-sm">
        {SECTION_IDS.map((id) => {
          const isActive = active === id;
          return (
            <li key={id}>
              <Link
                href={`#${id}`}
                onClick={handleClick(id)}
                aria-current={isActive ? "true" : undefined}
                data-active={isActive ? "true" : "false"}
                className={
                  "sideindex-link group flex items-center gap-2 py-1.5 transition-colors " +
                  (isActive ? "text-foreground font-medium" : "text-foreground/60 hover:text-foreground/80")
                }
              >
                <span aria-hidden className={"sideindex-dash text-accent"}>—</span>
                <span className={"sideindex-label"}>{labels[id]}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
