"use client";
import Image from "next/image";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useLocale } from "../context/LocaleContext";
import Typewriter from "./Typewriter";

export default function Hero() {
  const { t } = useLocale();

  // Forzar el nombre en dos líneas y reservar espacio desde el inicio
  const [line1, line2] = useMemo(() => {
    const raw = t("hero.name").trim();
    if (!raw) return ["", ""];
    const parts = raw.split(/\s+/);
    if (parts.length >= 2) {
      const mid = Math.ceil(parts.length / 2);
      return [parts.slice(0, mid).join(" "), parts.slice(mid).join(" ")];
    }
    const mid = Math.ceil(raw.length / 2);
    return [raw.slice(0, mid), raw.slice(mid)];
  }, [t]);
  const fullName = useMemo(() => `${line1}\n${line2}`.trimEnd(), [line1, line2]);

  // Medir altura de la columna izquierda y aplicarla a la foto
  const leftRef = useRef<HTMLDivElement | null>(null);
  const [leftHeight, setLeftHeight] = useState<number | null>(null);

  useEffect(() => {
    const measure = () => {
      const h = leftRef.current?.offsetHeight ?? null;
      setLeftHeight(h);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  return (
    <section id="inicio" className="relative min-h-[100svh] flex items-center">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 w-full py-16">
        {/* Cabecera con foto a la derecha */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center md:justify-items-center">
          {/* Columna izquierda: textos */}
          <div ref={leftRef} className="w-full">
            <p className="text-sm sm:text-base text-foreground/60 mb-2">{t("hero.greeting")}</p>
            <h1 className="relative font-display text-5xl sm:text-7xl md:text-8xl leading-[0.95] font-normal tracking-tight mb-3 text-accent">
              {/* Placeholder invisible para reservar el alto de dos líneas */}
              <span aria-hidden className="block whitespace-pre opacity-0 select-none pointer-events-none">
                {line1 + "\n" + line2}
              </span>
              {/* Contenido tipeado superpuesto */}
              <Typewriter
                text={fullName}
                restartKey={fullName}
                className="absolute inset-0 block whitespace-pre"
              />
            </h1>
            <p className="text-lg sm:text-xl text-foreground/80 mb-6">
              {t("hero.profession")}
            </p>
            <p className="max-w-xl text-foreground/80 text-sm sm:text-base mb-6">
              {t("hero.description")}
            </p>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <a
                href="/cv.pdf"
                download
                className="px-6 py-3 text-sm rounded-lg border border-accent bg-accent text-white hover:opacity-90 transition-opacity font-medium"
              >
                {t("cta.cv")}
              </a>
            </div>
          </div>

          {/* Columna derecha: foto sin marco, centrada y con altura igual a la columna izquierda */}
          <div className="relative w-full md:justify-self-center">
            <div
              className="relative mx-auto w-64 h-80 sm:w-72 md:w-80"
              style={leftHeight ? { height: leftHeight } : undefined}
            >
              <div className="absolute inset-0 rounded-[2rem] overflow-hidden shadow-2xl">
                <Image
                  src="/profile_image.png"
                  alt="Foto de perfil"
                  fill
                  sizes="(max-width: 768px) 18rem, 22rem"
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 