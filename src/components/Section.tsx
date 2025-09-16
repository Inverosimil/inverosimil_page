import React from "react";
import Reveal from "./Reveal";

export default function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="w-full px-0 sm:px-0 py-16 sm:py-12 scroll-mt-16">
      <Reveal>
        <h2 className="font-display text-3xl sm:text-4xl leading-[0.95] mb-6 tracking-tight text-accent">
          {title}
        </h2>
      </Reveal>
      <Reveal delay={100}>
        <div className="space-y-5 sm:space-y-6 text-sm sm:text-base leading-relaxed text-foreground/90">{children}</div>
      </Reveal>
    </section>
  );
}
