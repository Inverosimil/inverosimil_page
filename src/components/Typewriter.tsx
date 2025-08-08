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
  const indexRef = useRef<number>(0);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    setOutput("");
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
    if (!cursor) return;
    const blink = window.setInterval(() => setShowCursor((v) => !v), 500) as unknown as number;
    return () => window.clearInterval(blink);
  }, [cursor]);

  return (
    <span className={className} aria-live="polite">
      {output}
      {cursor && <span className="inline-block w-2 -mb-[2px]">{showCursor ? "▍" : " "}</span>}
    </span>
  );
} 