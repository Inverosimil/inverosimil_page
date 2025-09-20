import Link from "next/link";
import React from "react";
import Reveal from "./Reveal";

export default function ProjectCard({ title, description, href, stack }: { title: string; description: string; href?: string; stack?: string[] }) {
  return (
    <Reveal>
      <div className="card rounded-md p-4 sm:p-5 transition-colors">
        <div className="flex items-center justify-between gap-4">
          <h3 className="text-foreground/95 font-semibold">{title}</h3>
          {href ? (
            <Link className="link text-xs" href={href} target="_blank" rel="noreferrer">
              ↗ demo
            </Link>
          ) : null}
        </div>
        <p className="mt-2 text-foreground/80 text-sm">{description}</p>
        {stack && stack.length ? (
          <div className="mt-3 flex flex-wrap gap-2">
            {stack.map((t) => (
              <span key={t} className="tag text-[11px] px-2.5 py-1 bg-accent/10 text-accent border border-accent/30 rounded-full">
                {t}
              </span>
            ))}
          </div>
        ) : null}
      </div>
    </Reveal>
  );
} 
