"use client";
import React, { useEffect, useRef } from "react";

// `speed` es la fracción del scroll que recorre la rejilla de puntos: 0.25 hace
// que avance a un cuarto de la velocidad del contenido.
export default function ParallaxBackground({ speed = 0.25 }: { speed?: number }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const lastY = useRef<number>(0);
  const pointerRafRef = useRef<number | null>(null);
  const lastPointer = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      el.setAttribute("data-ready", "true");
      return;
    }

    const update = () => {
      const y = -window.scrollY * speed;
      if (y !== lastY.current) {
        el.style.setProperty("--bg-offset", `${y.toFixed(2)}px`);
        lastY.current = y;
      }
      rafRef.current = null;
    };

    const onScroll = () => {
      if (rafRef.current == null) {
        rafRef.current = window.requestAnimationFrame(update);
      }
    };

    // Inicial
    update();
    // Trigger background reveal animation once mounted
    el.setAttribute("data-ready", "true");

    window.addEventListener("scroll", onScroll, { passive: true });

    const applyPointer = () => {
      pointerRafRef.current = null;
      if (!lastPointer.current) return;
      const { x, y } = lastPointer.current;
      // Lente de puntos alrededor del puntero
      el.style.setProperty("--mx", `${Math.round(x)}px`);
      el.style.setProperty("--my", `${Math.round(y)}px`);
    };

    const onPointerMove = (e: PointerEvent) => {
      lastPointer.current = { x: e.clientX, y: e.clientY };
      if (pointerRafRef.current == null) {
        pointerRafRef.current = window.requestAnimationFrame(applyPointer);
      }
    };

    const onPointerLeave = () => {
      lastPointer.current = null;
      el.style.setProperty("--mx", `-10000px`);
      el.style.setProperty("--my", `-10000px`);
    };

    // `pointerleave` no dispara en window; el <html> sí recibe mouseleave al salir de la ventana.
    const root = document.documentElement;
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    root.addEventListener("mouseleave", onPointerLeave);

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("pointermove", onPointerMove);
      root.removeEventListener("mouseleave", onPointerLeave);
      if (pointerRafRef.current) cancelAnimationFrame(pointerRafRef.current);
    };
  }, [speed]);

  return <div ref={ref} className="code-grid" aria-hidden />;
}
