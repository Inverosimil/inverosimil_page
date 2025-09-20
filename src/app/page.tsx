"use client";
import Section from "../components/Section";
import Reveal from "../components/Reveal";
// import ProjectCard from "../components/ProjectCard"; // no longer used
import IntroSidebar from "../components/IntroSidebar";
import { useLocale } from "../context/LocaleContext";

export default function Home() {
  const { t } = useLocale();
  return (
    <div className="min-h-screen">
      {/* Layout de dos columnas al estilo portfolio: intro izquierda (sticky) + contenido derecha (scroll) */}
      <div className="max-w-6xl mx-auto px-6 sm:px-8 grid md:grid-cols-2 md:grid-cols-[1fr_1.6fr] lg:grid-cols-[1fr_2fr] gap-8 md:gap-10 pt-6 items-start">
        {/* Intro izquierda */}
        <IntroSidebar />

        {/* Contenido derecha */}
        <main className="min-w-0">
          {/* Sobre */}
          <Section id="sobre" title={t("section.sobre")}>
            {/* Foto arriba a la derecha con texto envolvente (estética consistente, no circular) */}
            <img
              src="/profile_image.png"
              alt={t("alt.profile")}
              className="float-none sm:float-right block w-32 sm:w-44 md:w-52 rounded-md border border-accent/20 shadow-sm ml-0 sm:ml-6 mb-4 sm:mb-0 select-none pointer-events-none bg-muted/30"
              draggable={false}
              loading="lazy"
            />
            <Reveal>
              <p dangerouslySetInnerHTML={{ __html: t("about.p1_html") || t("about.p1") }} />
            </Reveal>
            <Reveal delay={80}>
              <p dangerouslySetInnerHTML={{ __html: t("about.p2_html") || t("about.p2") }} />
            </Reveal>
            <Reveal delay={160}>
              <p dangerouslySetInnerHTML={{ __html: t("about.p3_html") || t("about.p3") }} />
            </Reveal>
            <Reveal delay={200}>
              <p dangerouslySetInnerHTML={{ __html: t("about.p4_html") || t("about.p4") }} />
            </Reveal>
            
            {/* Tecnologías favoritas */}
            <Reveal delay={240}>
              <div className="mt-6">
                <h3 className="text-lg font-semibold text-foreground mb-3">{t("about.tech_title")}</h3>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Cursor",
                    "Next.js",
                    "Astro",
                    "Python",
                    "PostgreSQL",
                    "Vercel",
                    "Supabase",
                    "GitHub",
                    "Figma",
                    "Adobe Photoshop",
                    "Cloudflare",
                  ].map((tech) => (
                    <span key={tech} className="tag text-sm px-3 py-1.5 bg-accent/10 text-accent rounded-full font-medium hover:bg-accent/20 cursor-default">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          </Section>

          {/* Proyectos */}
          <Section id="proyectos" title={t("section.proyectos")}>
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
                        {t("projects.asesor.title")}
                        <img src="/icons/redirect.svg" alt="" className="w-4 h-4 opacity-60 group-hover:opacity-100 transition-opacity brightness-0 contrast-200 dark:brightness-200 dark:contrast-0" />
                      </p>
                      <p className="mt-1 text-foreground/75 text-sm sm:text-[0.95rem]" dangerouslySetInnerHTML={{ __html: t("projects.asesor.p1_html") || t("projects.asesor.p1") }} />
                      <p className="mt-1 text-foreground/75 text-sm sm:text-[0.95rem]" dangerouslySetInnerHTML={{ __html: t("projects.asesor.p2_html") || t("projects.asesor.p2") }} />
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
                          <span key={t} className="tag text-[11px] px-2.5 py-1 bg-accent/10 text-accent rounded-full hover:bg-accent/20 cursor-default">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="project-media w-full bg-muted/30 rounded-md border border-accent/20 overflow-hidden shrink-0 transform-gpu scale-100 group-hover:scale-110">
                      <img src="/projects/asesordesalud.png" alt={t("alt.asesor")} className="w-full h-auto object-cover" />
                    </div>
                  </div>
                </a>
              </Reveal>

              {/* TerraINVicta */}
              <Reveal delay={80}>
                <a
                  href="https://terrainvicta.scarrasco.com/"
                  target="_blank"
                  rel="noreferrer"
                  className="group block rounded-xl border border-transparent bg-transparent hover:bg-accent/5 transition-colors p-4 sm:p-5"
                >
                  <div className="grid grid-cols-[1fr_24ch] gap-6 items-center">
                    <div className="min-w-0">
                      <p className="font-semibold text-foreground group-hover:text-accent transition-colors flex items-center gap-2">
                        {t("projects.terrainvicta.title")}
                        <img src="/icons/redirect.svg" alt="" className="w-4 h-4 opacity-60 group-hover:opacity-100 transition-opacity brightness-0 contrast-200 dark:brightness-200 dark:contrast-0" />
                      </p>
                      <p className="mt-1 text-foreground/75 text-sm sm:text-[0.95rem]" dangerouslySetInnerHTML={{ __html: t("projects.terrainvicta.p1_html") || t("projects.terrainvicta.p1") }} />
                      <div className="mt-3 flex flex-wrap gap-2">
                        {[
                          "Web Standard",
                          "HTML",
                          "CSS",
                          "JavaScript",
                          "Vercel",
                          "Adobe Photoshop",
                        ].map((t) => (
                          <span key={t} className="tag text-[11px] px-2.5 py-1 bg-accent/10 text-accent rounded-full hover:bg-accent/20 cursor-default">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                      <div className="project-media w-full bg-muted/30 rounded-md border border-accent/20 overflow-hidden shrink-0 transform-gpu scale-100 group-hover:scale-110">
                        <img src="/projects/terrainvicta.png" alt={t("alt.terrainvicta")} className="w-full h-auto object-cover" />
                      </div>
                  </div>
                </a>
              </Reveal>

            </div>
          </Section>

          {/* Experiencia */}
          <Section id="experiencia" title={t("section.experiencia")}>
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
                        {t("experience.dinamica.title")}
                        <img src="/icons/redirect.svg" alt="" className="w-4 h-4 opacity-60 group-hover:opacity-100 transition-opacity brightness-0 contrast-200 dark:brightness-200 dark:contrast-0" />
                      </p>
                      <p className="mt-1 text-foreground/75 text-sm sm:text-[0.95rem]" dangerouslySetInnerHTML={{ __html: t("experience.dinamica.p1_html") || t("experience.dinamica.p1") }} />
                      <div className="mt-3 flex flex-wrap gap-2">
                        {[
                          "Next.js",
                          "PostgreSQL",
                          "Python",
                          "GitHub",
                          "Astro",
                          "JavaScript",
                          "CSS",
                          "Figma",
                          "Vercel",
                          "Firebase",
                          "Supabase",
                          "Node.js",
                        ].map((t) => (
                          <span key={t} className="tag text-[11px] px-2.5 py-1 bg-accent/10 text-accent rounded-full hover:bg-accent/20 cursor-default">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                    <span className="text-foreground/60 text-xs sm:text-sm whitespace-nowrap shrink-0 tabular-nums justify-self-end self-start">{t("experience.dinamica.date")}</span>
                  </div>
                </a>
              </Reveal>

              {/* Dist y Com Luis Jara */}
              <Reveal delay={80}>
                <div className="group block rounded-xl border border-transparent bg-transparent hover:bg-accent/5 transition-colors p-4 sm:p-5">
                <div className="grid grid-cols-[1fr_17ch] gap-8 items-start">
                  <div className="min-w-0">
                    <p className="font-semibold text-foreground group-hover:text-accent transition-colors">{t("experience.ljar.title")}</p>
                    <p className="mt-1 text-foreground/75 text-sm sm:text-[0.95rem]" dangerouslySetInnerHTML={{ __html: t("experience.ljar.p1_html") || t("experience.ljar.p1") }} />
                    <div className="mt-3 flex flex-wrap gap-2">
                      {[
                        "MySQL",
                        "Vercel",
                        "Node.js",
                        "Linux",
                        "GitHub",
                        "Next.js",
                        "Web Standard",
                        "Figma",
                        "Supabase",
                        "Python",
                        "Hardware",
                        "ERP's",
                      ].map((t) => (
                        <span key={t} className="tag text-[11px] px-2.5 py-1 bg-accent/10 text-accent rounded-full hover:bg-accent/20 cursor-default">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                  <span className="text-foreground/60 text-xs sm:text-sm whitespace-nowrap shrink-0 tabular-nums justify-self-end self-start">{t("experience.ljar.date")}</span>
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
                      {t("experience.undurraga.title")}
                      <img src="/icons/redirect.svg" alt="" className="w-4 h-4 opacity-60 group-hover:opacity-100 transition-opacity brightness-0 contrast-200 dark:brightness-200 dark:contrast-0" />
                    </p>
                    <p className="mt-1 text-foreground/75 text-sm sm:text-[0.95rem]" dangerouslySetInnerHTML={{ __html: t("experience.undurraga.p1_html") || t("experience.undurraga.p1") }} />
                    <div className="mt-3 flex flex-wrap gap-2">
                      {[
                        "CMD",
                        "Hardware",
                        "SQL",
                        "Web Standard",
                      ].map((t) => (
                        <span key={t} className="tag text-[11px] px-2.5 py-1 bg-accent/10 text-accent rounded-full hover:bg-accent/20 cursor-default">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                  <span className="text-foreground/60 text-xs sm:text-sm whitespace-nowrap shrink-0 tabular-nums justify-self-end self-start">{t("experience.undurraga.date")}</span>
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
