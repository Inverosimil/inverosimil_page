import Section from "../components/Section";
import ProjectCard from "../components/ProjectCard";
import Hero from "../components/Hero";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Hero />

      {/* Sobre */}
      <Section id="sobre" title="sobre-mi">
        <p>
          Soy ingeniero de software orientado a producto. Trabajo con <b>TypeScript</b>, <b>Next.js</b>, <b>Node</b>, y despliegues en <b>Vercel</b> y <b>Docker</b>.
        </p>
        <p>
          Disfruto diseñar arquitecturas simples, crear componentes reutilizables y escribir código legible. Minimalismo no es carencia: es intención.
        </p>
      </Section>

      {/* Proyectos */}
      <Section id="proyectos" title="proyectos">
        <div className="grid sm:grid-cols-2 gap-4">
          <ProjectCard
            title="CLI monitor"
            description="CLI interactiva para monitorear servicios y logs con UI tipo TUI."
            stack={["Node", "TypeScript", "Inquirer", "zx"]}
          />
          <ProjectCard
            title="Hackerfolio"
            description="Plantilla de portfolio minimalista con tema morado y blanco."
            href="#"
            stack={["Next.js", "Tailwind", "Vercel"]}
          />
          <ProjectCard
            title="Renderless UI kit"
            description="Componentes sin estilos, accesibles y controlables, para construir UIs a medida."
            stack={["React", "TS", "A11y"]}
          />
          <ProjectCard
            title="Webperf toolkit"
            description="Herramientas para medir y mejorar Web Vitals en CI/CD."
            stack={["Lighthouse CI", "Playwright", "Node"]}
          />
        </div>
      </Section>

      {/* Experiencia */}
      <Section id="experiencia" title="experiencia">
        <ul className="space-y-3">
          <li className="flex items-start justify-between gap-4">
            <div>
              <p className="font-semibold">Senior Frontend Engineer — Producto X</p>
              <p className="text-foreground/75 text-sm">Liderazgo técnico, diseño de componentes, performance, A/B testing.</p>
            </div>
            <span className="text-foreground/60 text-xs">2022 — ahora</span>
          </li>
          <li className="flex items-start justify-between gap-4">
            <div>
              <p className="font-semibold">Full‑stack Engineer — Startup Y</p>
              <p className="text-foreground/75 text-sm">MVPs, APIs, despliegues en Vercel/Docker, analítica.</p>
            </div>
            <span className="text-foreground/60 text-xs">2020 — 2022</span>
          </li>
        </ul>
      </Section>

      {/* Contacto */}
      <Section id="contacto" title="contacto">
        <p>
          ¿Tienes un proyecto interesante? Escribe a <a className="link" href="mailto:hello@inverosimil.dev">hello@inverosimil.dev</a> o envíame un DM.
        </p>
        <div className="mt-4 flex gap-4 text-sm">
          <a className="link" href="https://github.com/inverosimil" target="_blank" rel="noreferrer">GitHub</a>
          <a className="link" href="https://x.com/inverosimil" target="_blank" rel="noreferrer">X/Twitter</a>
          <a className="link" href="https://www.linkedin.com/in/inverosimil" target="_blank" rel="noreferrer">LinkedIn</a>
        </div>
      </Section>

      {/* Footer */}
      <footer className="border-t border-accent/10">
        <div className="max-w-5xl mx-auto px-6 sm:px-8 h-16 text-xs flex items-center justify-between">
          <span className="text-foreground/60">© {new Date().getFullYear()} inverosímil</span>
          <span className="text-foreground/60">hecho con next.js</span>
        </div>
      </footer>
    </div>
  );
}
