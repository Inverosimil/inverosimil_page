"use client";
import React, { useEffect, useRef } from "react";

export default function ParallaxBackground({ speed = 0.35 }: { speed?: number }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const lastY = useRef<number>(0);
  const pointerRafRef = useRef<number | null>(null);
  const lastPointer = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const update = () => {
      const y = -window.scrollY * speed;
      if (y !== lastY.current) {
        el.style.setProperty("--bg-offset", `${Math.round(y)}px`);
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

    window.addEventListener("scroll", onScroll, { passive: true });

    const applyPointer = () => {
      if (!el || !lastPointer.current) {
        pointerRafRef.current = null;
        return;
      }
      const { x, y } = lastPointer.current;
      // Set CSS variables used by the masked overlay
      el.style.setProperty("--mx", `${Math.round(x)}px`);
      el.style.setProperty("--my", `${Math.round(y)}px`);
      pointerRafRef.current = null;
    };

    const onPointerMove = (e: PointerEvent | MouseEvent) => {
      lastPointer.current = { x: (e as PointerEvent).clientX, y: (e as PointerEvent).clientY };
      if (pointerRafRef.current == null) {
        pointerRafRef.current = window.requestAnimationFrame(applyPointer);
      }
    };

    const onPointerLeave = () => {
      lastPointer.current = null;
      el.style.setProperty("--mx", `-10000px`);
      el.style.setProperty("--my", `-10000px`);
    };

    window.addEventListener("pointermove", onPointerMove as (e: Event) => void, { passive: true });
    window.addEventListener("pointerleave", onPointerLeave as (e: Event) => void, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("pointermove", onPointerMove as (e: Event) => void);
      window.removeEventListener("pointerleave", onPointerLeave as (e: Event) => void);
      if (pointerRafRef.current) cancelAnimationFrame(pointerRafRef.current);
    };
  }, [speed]);

  return <div ref={ref} className="code-grid" aria-hidden />;
} 
