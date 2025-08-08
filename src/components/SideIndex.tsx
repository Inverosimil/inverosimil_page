"use client";
import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useLocale } from "../context/LocaleContext";

const SECTION_IDS = ["inicio", "sobre", "proyectos", "experiencia", "contacto"] as const;

type SectionId = typeof SECTION_IDS[number];

export default function SideIndex() {
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

      // Overrides para extremos del documento
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

    const onResize = onScroll;

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);

    // Inicializar
    update();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  const handleClick = (id: SectionId) => () => {
    // Feedback inmediato
    setActive(id);
    // Revalidar tras el scroll suave
    window.setTimeout(() => {
      const evt = new Event("scroll");
      window.dispatchEvent(evt);
    }, 350);
  };

  return (
    <aside className="hidden md:flex fixed left-6 top-1/2 -translate-y-1/2 z-30">
      <nav aria-label="Índice de secciones">
        <ul className="space-y-2 text-base">
          {SECTION_IDS.map((id) => {
            const isActive = active === id;
            return (
              <li key={id}>
                <Link
                  href={`#${id}`}
                  onClick={handleClick(id)}
                  aria-current={isActive ? "true" : undefined}
                  className={
                    "block px-3 py-1.5 rounded transition-all duration-300 ease-out will-change-transform " +
                    (isActive
                      ? "ml-4 translate-x-1 text-foreground opacity-100 font-semibold"
                      : "translate-x-0 text-foreground/60 hover:text-foreground/80")
                  }
                >
                  {isActive ? "—— " : "— "}
                  {labels[id]}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
} 