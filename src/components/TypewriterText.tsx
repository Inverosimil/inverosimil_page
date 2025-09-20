"use client";
import React from 'react';
import { useTypewriter } from '../hooks/useTypewriter';

interface TypewriterTextProps {
  text: string;
  speed?: number;
  delay?: number;
  className?: string;
  showCursor?: boolean;
  wordByWord?: boolean;
}

export default function TypewriterText({ 
  text, 
  speed = 50, 
  delay = 0, 
  className = "",
  showCursor = true,
  wordByWord = false
}: TypewriterTextProps) {
  const { displayText, isTyping } = useTypewriter(text, { speed, delay, wordByWord });

  const typed = displayText;
  const remaining = text.slice(typed.length);

  return (
    <span className={className}>
      <span>{typed}</span>
      {showCursor && isTyping && (
        <span className="inline-block w-0.5 h-4 bg-current ml-1 align-baseline animate-pulse" />
      )}
      <span className="pointer-events-none select-none" style={{ color: "transparent" }} aria-hidden="true">
        {remaining}
      </span>
    </span>
  );
}
