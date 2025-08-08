import React from "react";
import Reveal from "./Reveal";

export default function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="max-w-4xl mx-auto px-6 sm:px-8 py-32 min-h-[60svh]">
      <Reveal>
        <h2 className="text-xl sm:text-2xl mb-6 tracking-tight text-accent neon">$ {title}</h2>
      </Reveal>
      <Reveal delay={100}>
        <div className="space-y-4 text-sm sm:text-base leading-relaxed text-foreground/90">{children}</div>
      </Reveal>
    </section>
  );
} 