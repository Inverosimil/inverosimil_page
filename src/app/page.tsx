import Section from "../components/Section";
import ProjectCard from "../components/ProjectCard";
import IntroSidebar from "../components/IntroSidebar";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Layout de dos columnas al estilo portfolio: intro izquierda (sticky) + contenido derecha (scroll) */}
      <div className="max-w-6xl mx-auto px-6 sm:px-8 grid md:grid-cols-2 md:grid-cols-[1fr_1.6fr] lg:grid-cols-[1fr_2fr] gap-8 md:gap-12 pt-12 items-start">
        {/* Intro izquierda */}
        <IntroSidebar />

        {/* Contenido derecha */}
        <main className="min-w-0">
          {/* Sobre */}
          <Section id="sobre" title="Sobre mi">
            {/* Foto arriba a la derecha con texto envolvente (estética consistente, no circular) */}
            <img
              src="/profile_image.png"
              alt="Foto de perfil de Sebastián Carrasco"
              className="float-none sm:float-right block w-32 sm:w-44 md:w-52 rounded-md border border-accent/20 shadow-sm ml-0 sm:ml-6 mb-4 sm:mb-0 select-none pointer-events-none bg-muted/30"
              draggable={false}
              loading="lazy"
            />
            <p>
              Soy desarrollador web con una sólida base en diseño gráfico, lo que me permite combinar la lógica del código con una visión estética y creativa. Me apasiona la tecnología y disfruto enfrentar desafíos complejos, encontrando soluciones innovadoras que optimicen procesos y generen verdadero valor para las empresas.
            </p>
            <p>
              Tengo experiencia en el desarrollo de sistemas de administración, plataformas de análisis de datos y dashboards interactivos, siempre buscando que cada proyecto sea funcional, eficiente y fácil de usar. Mi forma de trabajar se caracteriza por la atención al detalle, la colaboración en equipo y la capacidad de aportar una visión creativa para resolver problemas de manera distinta.
            </p>
            <p>
              Creo firmemente que el desarrollo web es una herramienta poderosa para transformar ideas en soluciones tangibles. Fuera del trabajo, me inspiro en pasiones como el automovilismo, los cubos de Rubik y el deporte, que alimentan mi curiosidad, disciplina y perseverancia.
            </p>
          </Section>

          {/* Proyectos */}
          <Section id="proyectos" title="Proyectos">
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
          <Section id="experiencia" title="Experiencia">
            <div className="flex flex-col gap-4 sm:gap-5">
              {/* Dinámica Plataforma */}
              <a
                href="#"
                target="_blank"
                rel="noreferrer"
                className="group block rounded-xl border border-transparent bg-transparent hover:bg-accent/5 hover:border-accent/30 hover:shadow-sm transition-colors p-4 sm:p-5"
              >
                <div className="grid grid-cols-[1fr_18ch] gap-6 items-start">
                  <div className="min-w-0">
                    <p className="font-semibold text-foreground group-hover:text-accent transition-colors">
                      Desarrollador Fullstack — Dinámica Plataforma
                    </p>
                    <p className="mt-1 text-foreground/75 text-sm sm:text-[0.95rem]">
                      Parte del equipo de Data Science, desarrollando tecnologías de análisis de datos y gestión de información. Además, desarrollo y levanto productos web especializados para clientes.
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {[
                        "TypeScript",
                        "Next.js",
                        "Tailwind",
                        "Node.js",
                        "PostgreSQL",
                        "Python",
                        "Pandas",
                      ].map((t) => (
                        <span key={t} className="text-[11px] px-2.5 py-1 bg-accent/10 text-accent border border-accent/30 rounded-full">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                  <span className="text-foreground/60 text-xs sm:text-sm whitespace-nowrap shrink-0 mt-0.5 justify-self-end tabular-nums">
                    Mar 2025 — ahora
                  </span>
                </div>
              </a>

              {/* Licorería Donde Franco */}
              <a
                href="#"
                target="_blank"
                rel="noreferrer"
                className="group block rounded-xl border border-transparent bg-transparent hover:bg-accent/5 hover:border-accent/30 hover:shadow-sm transition-colors p-4 sm:p-5"
              >
                <div className="grid grid-cols-[1fr_18ch] gap-6 items-start">
                  <div className="min-w-0">
                    <p className="font-semibold text-foreground group-hover:text-accent transition-colors">
                      Desarrollador de Software — Licorería Donde Franco
                    </p>
                    <p className="mt-1 text-foreground/75 text-sm sm:text-[0.95rem]">
                      Desarrollo de aplicaciones para la gestión interna, incluyendo sistemas de inventario y puntos de venta.
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {[
                        "React",
                        "Node.js",
                        "Express",
                        "SQLite",
                        "Tailwind",
                      ].map((t) => (
                        <span key={t} className="text-[11px] px-2.5 py-1 bg-accent/10 text-accent border border-accent/30 rounded-full">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                  <span className="text-foreground/60 text-xs sm:text-sm whitespace-nowrap shrink-0 mt-0.5 justify-self-end tabular-nums">
                    Sep 2023 — Feb 2024
                  </span>
                </div>
              </a>

              {/* Viña Undurraga */}
              <a
                href="https://www.undurraga.cl"
                target="_blank"
                rel="noreferrer"
                className="group block rounded-xl border border-transparent bg-transparent hover:bg-accent/5 hover:border-accent/30 hover:shadow-sm transition-colors p-4 sm:p-5"
              >
                <div className="grid grid-cols-[1fr_18ch] gap-6 items-start">
                  <div className="min-w-0">
                    <p className="font-semibold text-foreground group-hover:text-accent transition-colors">
                      Practicante T.I. — Viña Undurraga
                    </p>
                    <p className="mt-1 text-foreground/75 text-sm sm:text-[0.95rem]">
                      Diagnóstico y actualización de infraestructura informática; desarrollo de software para mejorar procesos internos; administración de bases de datos y soporte técnico.
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {[
                        "Soporte",
                        "Automatización",
                        "SQL Server",
                        "PowerShell",
                      ].map((t) => (
                        <span key={t} className="text-[11px] px-2.5 py-1 bg-accent/10 text-accent border border-accent/30 rounded-full">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                  <span className="text-foreground/60 text-xs sm:text-sm whitespace-nowrap shrink-0 mt-0.5 justify-self-end tabular-nums">
                    Dic 2021 — Feb 2022
                  </span>
                </div>
              </a>
            </div>
          </Section>

          

          {/* Footer eliminado por solicitud */}
        </main>
      </div>
    </div>
  );
}
