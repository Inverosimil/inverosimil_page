"use client";
import React, { useEffect, useRef, useState } from "react";

export default function Typewriter({
  text,
  speed = 20,
  startDelay = 200,
  cursor = true,
  restartKey,
  className,
}: {
  text: string;
  speed?: number;
  startDelay?: number;
  cursor?: boolean;
  restartKey?: string | number;
  className?: string;
}) {
  const [output, setOutput] = useState<string>("");
  const [showCursor, setShowCursor] = useState<boolean>(true);
  const [isTyping, setIsTyping] = useState<boolean>(true);
  const indexRef = useRef<number>(0);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    setOutput("");
    setIsTyping(true);
    setShowCursor(true);
    indexRef.current = 0;
    if (intervalRef.current) {
      window.clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    const start = window.setTimeout(() => {
      intervalRef.current = window.setInterval(() => {
        const i = indexRef.current;
        if (i >= text.length) {
          if (intervalRef.current) window.clearInterval(intervalRef.current);
          intervalRef.current = null;
          setIsTyping(false);
          setShowCursor(false); // ocultar cursor al terminar
          return;
        }
        setOutput((prev) => prev + text.charAt(i));
        indexRef.current = i + 1;
      }, speed) as unknown as number;
    }, startDelay) as unknown as number;

    return () => {
      window.clearTimeout(start);
      if (intervalRef.current) window.clearInterval(intervalRef.current);
    };
  }, [restartKey, text, speed, startDelay]);

  useEffect(() => {
    if (!cursor || !isTyping) return;
    const blink = window.setInterval(() => setShowCursor((v) => !v), 500) as unknown as number;
    return () => window.clearInterval(blink);
  }, [cursor, isTyping]);

  return (
    <span className="relative inline-block align-baseline">
      {/* Fantasma invisible para reservar espacio y evitar layout shift */}
      <span className={`invisible pointer-events-none select-none ${className ?? ""}`} aria-hidden="true">
        {text}
      </span>
      {/* Texto animado encima, ocupando el mismo rectángulo */}
      <span className={`absolute inset-0 ${className ?? ""}`} aria-live="polite">
        {output}
        {cursor && isTyping && (
          <span className="inline-block w-2 -mb-[2px]">{showCursor ? "▍" : " "}</span>
        )}
      </span>
    </span>
  );
}
