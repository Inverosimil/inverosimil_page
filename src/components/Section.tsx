import React from "react";
import Reveal from "./Reveal";

export default function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="w-full px-0 sm:px-0 py-20 sm:py-24 scroll-mt-16">
      <Reveal>
        <h2 className="text-lg sm:text-xl mb-5 tracking-tight text-accent neon">$ {title}</h2>
      </Reveal>
      <Reveal delay={100}>
        <div className="space-y-4 text-sm sm:text-base leading-relaxed text-foreground/90">{children}</div>
      </Reveal>
    </section>
  );
}
