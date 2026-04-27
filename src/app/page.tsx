"use client";

import Image from "next/image";
import Section from "../components/Section";
import Reveal from "../components/Reveal";
import RichText from "../components/RichText";
import IntroSidebar from "../components/IntroSidebar";
import {
  aboutParagraphs,
  experiences,
  favoriteTechnologies,
  profileImage,
  projects,
  type Experience,
  type Project,
} from "../content/portfolio";
import { useLocale } from "../context/LocaleContext";
import { localeMotion } from "../utils/localeMotion";

const tagClass = "tag text-[11px] px-2.5 py-1 bg-accent/10 text-accent rounded-full hover:bg-accent/20 cursor-default";
const titleClass = "locale-animated locale-delay-1 font-semibold text-foreground group-hover:text-accent transition-colors flex items-center gap-2";
const cardClass = "group block rounded-xl border border-transparent bg-transparent hover:bg-accent/5 transition-colors p-4 sm:p-5";
const descriptionClass = "mt-1 text-foreground/75 text-sm sm:text-[0.95rem]";

function ExternalIcon() {
  return (
    <Image
      src="/icons/redirect.svg"
      alt=""
      width={16}
      height={16}
      aria-hidden
      className="w-4 h-4 opacity-60 group-hover:opacity-100 transition-opacity brightness-0 contrast-200 dark:brightness-200 dark:contrast-0"
    />
  );
}

function TagList({ items, className = "mt-3" }: { items: readonly string[]; className?: string }) {
  return (
    <div className={`${className} flex flex-wrap gap-2`}>
      {items.map((item) => (
        <span key={item} className={tagClass}>
          {item}
        </span>
      ))}
    </div>
  );
}

function ProjectEntry({ project }: { project: Project }) {
  const { locale, t } = useLocale();

  return (
    <Reveal delay={project.delay}>
      <a href={project.href} target="_blank" rel="noreferrer" {...localeMotion(`project-${project.id}`)} className={cardClass}>
        <div className="grid grid-cols-1 sm:grid-cols-[1fr_24ch] gap-4 sm:gap-6 items-center">
          <div className="min-w-0">
            <p className={titleClass}>
              {project.title[locale]}
              <ExternalIcon />
            </p>
            {project.descriptions.map((description, index) => (
              <RichText key={index} segments={description[locale]} className={`${descriptionClass} locale-delay-${index + 2}`} />
            ))}
            <TagList items={project.stack} />
          </div>
          <div className="project-media w-full bg-muted/30 rounded-md border border-accent/20 overflow-hidden shrink-0 transform-gpu scale-100 group-hover:scale-110 sm:mt-0 mt-3">
            <Image
              src={project.image.src}
              alt={t(project.image.altKey)}
              width={project.image.width}
              height={project.image.height}
              sizes="(max-width: 640px) calc(100vw - 4.5rem), 24ch"
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
      </a>
    </Reveal>
  );
}

function ExperienceEntry({ experience }: { experience: Experience }) {
  const { locale } = useLocale();
  const dateClass = [
    experience.date.es === experience.date.en ? "" : "locale-animated locale-delay-1",
    "text-foreground/60 text-xs whitespace-nowrap shrink-0 tabular-nums",
  ].filter(Boolean).join(" ");
  const content = (
    <div className="grid grid-cols-1 sm:grid-cols-[1fr_17ch] gap-4 sm:gap-8 items-start">
      <span className={`${dateClass} sm:hidden order-first`}>
        {experience.date[locale]}
      </span>
      <div className="min-w-0">
        <p className={experience.href ? titleClass : "locale-animated locale-delay-1 font-semibold text-foreground group-hover:text-accent transition-colors"}>
          {experience.title[locale]}
          {experience.href ? <ExternalIcon /> : null}
        </p>
        <RichText segments={experience.description[locale]} className={`${descriptionClass} locale-delay-2`} />
        <TagList items={experience.stack} />
      </div>
      <span className={`${dateClass} hidden sm:block sm:text-sm justify-self-end self-start`}>
        {experience.date[locale]}
      </span>
    </div>
  );

  return (
    <Reveal delay={experience.delay}>
      {experience.href ? (
        <a href={experience.href} target="_blank" rel="noreferrer" {...localeMotion(`experience-${experience.id}`)} className={cardClass}>
          {content}
        </a>
      ) : (
        <div {...localeMotion(`experience-${experience.id}`)} className={cardClass}>{content}</div>
      )}
    </Reveal>
  );
}

export default function Home() {
  const { locale, t } = useLocale();

  return (
    <div className="min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 grid md:grid-cols-2 md:grid-cols-[1fr_1.6fr] lg:grid-cols-[1fr_2fr] gap-6 md:gap-10 pt-4 sm:pt-6 items-start">
        <IntroSidebar />

        <main className="min-w-0">
          <Section id="sobre" title={t("section.sobre")} className="py-8 sm:py-16">
            <Image
              src={profileImage.src}
              alt={t("alt.profile")}
              width={profileImage.width}
              height={profileImage.height}
              sizes="(max-width: 640px) 9rem, (max-width: 768px) 11rem, 13rem"
              className="float-right sm:float-right block w-36 sm:w-44 md:w-52 h-auto rounded-md border border-accent/20 shadow-sm ml-4 sm:ml-6 mb-2 sm:mb-0 select-none pointer-events-none bg-muted/30"
              draggable={false}
            />

            {aboutParagraphs.map((paragraph, index) => (
              <Reveal key={index} delay={paragraph.delay}>
                <RichText
                  segments={paragraph.content[locale]}
                  className={`locale-delay-${Math.min(index + 1, 5)}`}
                  motionName={`about-paragraph-${index}`}
                />
              </Reveal>
            ))}

            <Reveal delay={240}>
              <div {...localeMotion("about-tech")} className="mt-6">
                <h3 className="locale-animated locale-delay-5 text-lg font-semibold text-foreground mb-3">{t("about.tech_title")}</h3>
                <div className="flex flex-wrap gap-2">
                  {favoriteTechnologies.map((tech) => (
                    <span key={tech} className="tag text-sm px-3 py-1.5 bg-accent/10 text-accent rounded-full font-medium hover:bg-accent/20 cursor-default">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          </Section>

          <Section id="proyectos" title={t("section.proyectos")} className="pt-8 sm:pt-12">
            <div className="flex flex-col gap-4 sm:gap-5">
              {projects.map((project) => (
                <ProjectEntry key={project.id} project={project} />
              ))}
            </div>
          </Section>

          <Section id="experiencia" title={t("section.experiencia")}>
            <div className="flex flex-col gap-4 sm:gap-5">
              {experiences.map((experience) => (
                <ExperienceEntry key={experience.id} experience={experience} />
              ))}
            </div>
          </Section>
        </main>
      </div>
    </div>
  );
}
