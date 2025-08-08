"use client";
import React, { useEffect, useRef } from "react";

export default function ParallaxBackground({ speed = 0.35 }: { speed?: number }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const lastY = useRef<number>(0);

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
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [speed]);

  return <div ref={ref} className="code-grid" aria-hidden />;
} 