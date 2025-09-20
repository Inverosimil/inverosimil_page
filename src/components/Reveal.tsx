"use client";
import React, { useEffect, useRef, useState } from "react";

export default function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);
  const timeoutRef = useRef<number | null>(null);
  const raf1Ref = useRef<number | null>(null);
  const raf2Ref = useRef<number | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          const trigger = () => {
            raf1Ref.current = window.requestAnimationFrame(() => {
              raf2Ref.current = window.requestAnimationFrame(() => setVisible(true));
            });
          };
          if (delay > 0) {
            timeoutRef.current = window.setTimeout(trigger, delay) as unknown as number;
          } else {
            trigger();
          }
          io.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
      if (raf1Ref.current) window.cancelAnimationFrame(raf1Ref.current);
      if (raf2Ref.current) window.cancelAnimationFrame(raf2Ref.current);
    };
  }, [delay]);

  return (
    <div
      ref={ref}
      className={`${className} transform-gpu will-change-transform ${visible ? "opacity-100 translate-y-0 scale-100 blur-0" : "opacity-0 translate-y-4 scale-95 blur-[2px]"}`}
      style={{
        transition: "opacity 700ms cubic-bezier(.22,1,.36,1), transform 700ms cubic-bezier(.22,1,.36,1), filter 700ms cubic-bezier(.22,1,.36,1)",
      }}
    >
      {children}
    </div>
  );
} 