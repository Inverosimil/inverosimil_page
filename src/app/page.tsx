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
          <Section id="sobre" title="sobre-mi">
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
                  <p className="font-semibold">Desarrollador Fullstack — Dinámica Plataforma</p>
                  <p className="text-foreground/75 text-sm">
                    Parte del equipo de Data Science, desarrollando tecnologías de análisis de datos y gestión de información. 
                    Además, desarrollo y levanto productos web especializados para clientes.
                  </p>
                </div>
                <span className="text-foreground/60 text-xs">Mar 2025 — ahora</span>
              </li>
              <li className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-semibold">Desarrollador de Software — Licorería Donde Franco</p>
                  <p className="text-foreground/75 text-sm">
                    Desarrollo de aplicaciones para la gestión interna, incluyendo sistemas de inventario y puntos de venta.
                  </p>
                </div>
                <span className="text-foreground/60 text-xs">Sep 2023 — Feb 2024</span>
              </li>
              <li className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-semibold">Practicante T.I. — Viña Undurraga</p>
                  <p className="text-foreground/75 text-sm">
                    Diagnóstico y actualización de infraestructura informática; desarrollo de software para mejorar procesos internos; 
                    administración de bases de datos y soporte técnico.
                  </p>
                </div>
                <span className="text-foreground/60 text-xs">Dic 2021 — Feb 2022</span>
              </li>
            </ul>
          </Section>

          

          {/* Footer dentro de la columna derecha */}
          <footer className="border-t border-accent/10">
            <div className="max-w-5xl px-0 sm:px-0 h-16 text-xs flex items-center justify-between">
              <span className="text-foreground/60">© {new Date().getFullYear()} inverosímil</span>
              <span className="text-foreground/60">hecho con next.js</span>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
}
