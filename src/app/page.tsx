import Section from "../components/Section";
import Reveal from "../components/Reveal";
// import ProjectCard from "../components/ProjectCard"; // no longer used
import IntroSidebar from "../components/IntroSidebar";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Layout de dos columnas al estilo portfolio: intro izquierda (sticky) + contenido derecha (scroll) */}
      <div className="max-w-6xl mx-auto px-6 sm:px-8 grid md:grid-cols-2 md:grid-cols-[1fr_1.6fr] lg:grid-cols-[1fr_2fr] gap-8 md:gap-10 pt-6 items-start">
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
            <Reveal>
              <p>
                Soy <span className="soft-underline cursor-default">Ingeniero Civil Informático</span> con experiencia en desarrollo web, software y diseño gráfico. Me apasiona crear soluciones innovadoras que optimicen procesos y <span className="soft-underline cursor-default">generen verdadero valor</span> para las empresas.
              </p>
            </Reveal>
            <Reveal delay={80}>
              <p>
                He trabajado en proyectos tan diversos como sistemas de administración, dashboards interactivos, análisis de datos, juegos y configuración de redes y hardware. Siempre con un mismo objetivo: <span className="soft-underline cursor-default">que cada proyecto sea funcional, eficiente y centrado en el usuario</span>.
              </p>
            </Reveal>
            <Reveal delay={160}>
              <p>
                Mi forma de trabajar combina atención al detalle, <span className="soft-underline cursor-default">comprensión profunda</span> del problema y una <span className="soft-underline cursor-default">orientación clara</span> al cliente, lo que me permite <span className="soft-underline cursor-default">proponer soluciones</span> prácticas y creativas.
              </p>
            </Reveal>
            <Reveal delay={200}>
              <p>
                Creo firmemente que la tecnología es una herramienta poderosa para <span className="soft-underline cursor-default">transformar ideas en realidades</span>. Fuera del trabajo, encuentro inspiración en el automovilismo, los cubos de Rubik y el deporte, pasiones que alimentan mi curiosidad, disciplina y perseverancia.
              </p>
            </Reveal>
            
            {/* Tecnologías favoritas */}
            <Reveal delay={240}>
              <div className="mt-6">
                <h3 className="text-lg font-semibold text-foreground mb-3">Tecnologías favoritas</h3>
                <div className="flex flex-wrap gap-2">
                  {[
                    "TypeScript",
                    "Next.js",
                    "React",
                    "Node.js",
                    "Tailwind CSS",
                    "PostgreSQL",
                    "Python",
                    "Git",
                  ].map((tech) => (
                    <span key={tech} className="tag text-sm px-3 py-1.5 bg-accent/10 text-accent border border-accent/30 rounded-full font-medium hover:bg-accent/20 hover:border-accent/50 cursor-default">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          </Section>

          {/* Proyectos */}
          <Section id="proyectos" title="Proyectos">
            <div className="flex flex-col gap-4 sm:gap-5">
              {/* AsesorDeSalud */}
              <Reveal>
                <a
                  href="https://asesordesalud.cl/"
                  target="_blank"
                  rel="noreferrer"
                  className="group block rounded-xl border border-transparent bg-transparent hover:bg-accent/5 transition-colors p-4 sm:p-5"
                >
                  <div className="grid grid-cols-[1fr_24ch] gap-6 items-center">
                    <div className="min-w-0">
                      <p className="font-semibold text-foreground group-hover:text-accent transition-colors flex items-center gap-2">
                        Landing page AsesorDeSalud
                        <img src="/icons/redirect.svg" alt="" className="w-4 h-4 opacity-60 group-hover:opacity-100 transition-opacity" />
                      </p>
                      <p className="mt-1 text-foreground/75 text-sm sm:text-[0.95rem]">
                        Realicé una landing page para un asesor de salud que apoya a sus clientes con la elección de planes de salud en función de sus necesidades específicas. 
                      </p>
                      <p className="mt-1 text-foreground/75 text-sm sm:text-[0.95rem]">
                        Tuve que cubrir desde el diseño hasta el desarrollo de la landing page. Incluyendo propuesta y diseño del nuevo logo.
                      </p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {[
                          "Web Standard",
                          "JavaScript",
                          "HTML",
                          "CSS",
                          "Vercel",
                          "Figma",
                          "Adobe Photoshop",
                          "Adobe Illustrator",
                        ].map((t) => (
                          <span key={t} className="tag text-[11px] px-2.5 py-1 bg-accent/10 text-accent border border-accent/30 rounded-full hover:bg-accent/20 hover:border-accent/50 cursor-default">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="project-media w-full bg-muted/30 rounded-md border border-accent/20 overflow-hidden shrink-0 transform-gpu scale-100 group-hover:scale-110">
                      <img src="/projects/asesordesalud.png" alt="AsesorDeSalud" className="w-full h-auto object-cover" />
                    </div>
                  </div>
                </a>
              </Reveal>

              {/* Hackerfolio */}
              <Reveal delay={80}>
                <div className="group block rounded-xl border border-transparent bg-transparent hover:bg-accent/5 transition-colors p-4 sm:p-5">
                <div className="grid grid-cols-[1fr_24ch] gap-6 items-center">
                  <div className="min-w-0">
                    <p className="font-semibold text-foreground group-hover:text-accent transition-colors">
                      Hackerfolio
                    </p>
                    <p className="mt-1 text-foreground/75 text-sm sm:text-[0.95rem]">
                      Plantilla de portfolio minimalista con tema morado y blanco.
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {[
                        "Next.js",
                        "Tailwind",
                        "Vercel",
                      ].map((t) => (
                        <span key={t} className="tag text-[11px] px-2.5 py-1 bg-accent/10 text-accent border border-accent/30 rounded-full hover:bg-accent/20 hover:border-accent/50 cursor-default">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="project-media w-full bg-muted/30 rounded-md border border-accent/20 overflow-hidden shrink-0 transform-gpu scale-100 group-hover:scale-110">
                    <img src="/projects/hackerfolio.png" alt="Hackerfolio" className="w-full h-auto object-cover" />
                  </div>
                </div>
                </div>
              </Reveal>

              {/* Renderless UI kit */}
              <Reveal delay={160}>
                <div className="group block rounded-xl border border-transparent bg-transparent hover:bg-accent/5 transition-colors p-4 sm:p-5">
                <div className="grid grid-cols-[1fr_24ch] gap-6 items-center">
                  <div className="min-w-0">
                    <p className="font-semibold text-foreground group-hover:text-accent transition-colors">
                      Renderless UI kit
                    </p>
                    <p className="mt-1 text-foreground/75 text-sm sm:text-[0.95rem]">
                      Componentes sin estilos, accesibles y controlables, para construir UIs a medida.
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {[
                        "React",
                        "TS",
                        "A11y",
                      ].map((t) => (
                        <span key={t} className="tag text-[11px] px-2.5 py-1 bg-accent/10 text-accent border border-accent/30 rounded-full hover:bg-accent/20 hover:border-accent/50 cursor-default">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="project-media w-full bg-muted/30 rounded-md border border-accent/20 overflow-hidden shrink-0 transform-gpu scale-100 group-hover:scale-110">
                    <img src="/projects/renderless-ui.png" alt="Renderless UI Kit" className="w-full h-auto object-cover" />
                  </div>
                </div>
                </div>
              </Reveal>

              {/* Webperf toolkit */}
              <Reveal delay={240}>
                <div className="group block rounded-xl border border-transparent bg-transparent hover:bg-accent/5 transition-colors p-4 sm:p-5">
                <div className="grid grid-cols-[1fr_24ch] gap-6 items-center">
                  <div className="min-w-0">
                    <p className="font-semibold text-foreground group-hover:text-accent transition-colors">
                      Webperf toolkit
                    </p>
                    <p className="mt-1 text-foreground/75 text-sm sm:text-[0.95rem]">
                      Herramientas para medir y mejorar Web Vitals en CI/CD.
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {[
                        "Lighthouse CI",
                        "Playwright",
                        "Node",
                      ].map((t) => (
                        <span key={t} className="tag text-[11px] px-2.5 py-1 bg-accent/10 text-accent border border-accent/30 rounded-full hover:bg-accent/20 hover:border-accent/50 cursor-default">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="project-media w-full bg-muted/30 rounded-md border border-accent/20 overflow-hidden shrink-0 transform-gpu scale-100 group-hover:scale-110">
                    <img src="/projects/webperf-toolkit.png" alt="Webperf Toolkit" className="w-full h-auto object-cover" />
                  </div>
                </div>
                </div>
              </Reveal>
            </div>
          </Section>

          {/* Experiencia */}
          <Section id="experiencia" title="Experiencia">
            <div className="flex flex-col gap-4 sm:gap-5">
              {/* Dinámica Plataforma */}
              <Reveal>
                <a
                  href="https://www.dinamicaplataforma.com/"
                  target="_blank"
                  rel="noreferrer"
                  className="group block rounded-xl border border-transparent bg-transparent hover:bg-accent/5 transition-colors p-4 sm:p-5"
                >
                  <div className="grid grid-cols-[1fr_17ch] gap-8 items-start">
                    <div className="min-w-0">
                      <p className="font-semibold text-foreground group-hover:text-accent transition-colors flex items-center gap-2">
                        Desarrollador Fullstack — Dinámica Plataforma
                        <img src="/icons/redirect.svg" alt="" className="w-4 h-4 opacity-60 group-hover:opacity-100 transition-opacity" />
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
                          <span key={t} className="tag text-[11px] px-2.5 py-1 bg-accent/10 text-accent border border-accent/30 rounded-full hover:bg-accent/20 hover:border-accent/50 cursor-default">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                    <span className="text-foreground/60 text-xs sm:text-sm whitespace-nowrap shrink-0 tabular-nums justify-self-end self-start">
                      Mar 2025 — Actualmente
                    </span>
                  </div>
                </a>
              </Reveal>

              {/* Licorería Donde Franco */}
              <Reveal delay={80}>
                <div className="group block rounded-xl border border-transparent bg-transparent hover:bg-accent/5 transition-colors p-4 sm:p-5">
                <div className="grid grid-cols-[1fr_17ch] gap-8 items-start">
                  <div className="min-w-0">
                    <p className="font-semibold text-foreground group-hover:text-accent transition-colors">
                      Desarrollador de Software y T.I. — Dist y Com Luis Jara
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
                        <span key={t} className="tag text-[11px] px-2.5 py-1 bg-accent/10 text-accent border border-accent/30 rounded-full hover:bg-accent/20 hover:border-accent/50 cursor-default">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                  <span className="text-foreground/60 text-xs sm:text-sm whitespace-nowrap shrink-0 tabular-nums justify-self-end self-start">
                    Sep 2023 — Feb 2024
                  </span>
                </div>
                </div>
              </Reveal>

              {/* Viña Undurraga */}
              <Reveal delay={160}>
                <a
                  href="https://www.undurraga.cl"
                  target="_blank"
                  rel="noreferrer"
                  className="group block rounded-xl border border-transparent bg-transparent hover:bg-accent/5 transition-colors p-4 sm:p-5"
                >
                <div className="grid grid-cols-[1fr_17ch] gap-8 items-start">
                  <div className="min-w-0">
                    <p className="font-semibold text-foreground group-hover:text-accent transition-colors flex items-center gap-2">
                      Practicante T.I. — Viña Undurraga
                      <img src="/icons/redirect.svg" alt="" className="w-4 h-4 opacity-60 group-hover:opacity-100 transition-opacity" />
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
                        <span key={t} className="tag text-[11px] px-2.5 py-1 bg-accent/10 text-accent border border-accent/30 rounded-full hover:bg-accent/20 hover:border-accent/50 cursor-default">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                  <span className="text-foreground/60 text-xs sm:text-sm whitespace-nowrap shrink-0 tabular-nums justify-self-end self-start">
                    Dic 2021 — Feb 2022
                  </span>
                </div>
                </a>
              </Reveal>
            </div>
          </Section>

          

          {/* Footer eliminado por solicitud */}
        </main>
      </div>
    </div>
  );
}
