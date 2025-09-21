"use client";
import React, { createContext, useContext, useEffect, useState } from "react";

export type Locale = "es" | "en";

type LocaleContextValue = {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: (key: string) => string;
};

const LocaleContext = createContext<LocaleContextValue | undefined>(undefined);

const messages: Record<Locale, Record<string, string>> = {
  es: {
    "nav.brand": "Sebastián Carrasco",
    "nav.sobre": "sobre",
    "nav.proyectos": "proyectos",
    "nav.experiencia": "experiencia",
    "nav.contacto": "contacto",
    "section.inicio": "inicio",
    "hero.greeting": "Hola, soy",
    "hero.name": "Sebastián Carrasco",
    "hero.profession": "Ingeniero Civil Informático",
    "hero.description": "Transformo requerimientos complejos en soluciones tecnológicas claras, eficientes y escalables.",
    "cta.cv": "Descargar CV",
    "section.sobre": "Sobre mi",
    "section.proyectos": "Proyectos",
    "section.experiencia": "Experiencia",
    "section.contacto": "contacto",
    "footer.made": "hecho con next.js",

    // Sobre mí
    "about.p1": "Soy Ingeniero Civil Informático con experiencia en desarrollo web, software y diseño gráfico. Me apasiona crear soluciones innovadoras que optimicen procesos y generen verdadero valor para las empresas.",
    "about.p2": "He trabajado en proyectos tan diversos como sistemas de administración, dashboards interactivos, análisis de datos, juegos y configuración de redes y hardware. Siempre con un mismo objetivo: que cada proyecto sea funcional, eficiente y centrado en el usuario.",
    "about.p3": "Mi forma de trabajar combina atención al detalle, comprensión profunda del problema y una orientación clara al cliente, lo que me permite proponer soluciones prácticas y creativas.",
    "about.p4": "Creo firmemente que la tecnología es una herramienta poderosa para transformar ideas en realidades. Fuera del trabajo, encuentro inspiración en el automovilismo, los cubos de Rubik y el deporte, pasiones que alimentan mi curiosidad, disciplina y perseverancia.",
    "about.tech_title": "Tecnologías favoritas",

    // Versiones con subrayado (HTML)
    "about.p1_html": "Soy <span class='soft-underline cursor-default'>Ingeniero Civil Informático</span> con experiencia en desarrollo web, software y diseño gráfico. Me apasiona crear soluciones innovadoras que optimicen procesos y <span class='soft-underline cursor-default'>generen verdadero valor</span> para las empresas.",
    "about.p2_html": "He trabajado en proyectos tan diversos como sistemas de administración, dashboards interactivos, análisis de datos, juegos y configuración de redes y hardware. Siempre con un mismo objetivo: <span class='soft-underline cursor-default'>que cada proyecto sea funcional, eficiente y centrado en el usuario</span>.",
    "about.p3_html": "Mi forma de trabajar combina atención al detalle, <span class='soft-underline cursor-default'>comprensión profunda</span> del problema y una <span class='soft-underline cursor-default'>orientación clara</span> al cliente, lo que me permite <span class='soft-underline cursor-default'>proponer soluciones</span> prácticas y creativas.",
    "about.p4_html": "Creo firmemente que la tecnología es una herramienta poderosa para <span class='soft-underline cursor-default'>transformar ideas en realidades</span>. Fuera del trabajo, encuentro inspiración en el automovilismo, los cubos de Rubik y el deporte, pasiones que alimentan mi curiosidad, disciplina y perseverancia.",

    // Proyectos
    "projects.asesor.title": "Página presentación asesordesalud.cl",
    "projects.asesor.p1": "Desarrollé una página de presentación para un asesor de salud que orienta a sus clientes con la elección de planes de salud en función de sus requerimientos específicos.",
    "projects.asesor.p2": "En este proyecto cubrí desde el desarrollo, levantamiento y configuración de dominios hasta el rediseño de su logo.",

    "projects.terrainvicta.title": "TerraINVicta, un juego de mecanografía",
    "projects.terrainvicta.p1": "Para titularme como Ingeniero Civil Informático mi proyecto final fue un juego de mecanografía, resultando con nota máxima para mi titulación.",

    // Versiones HTML con subrayado en secciones
    "projects.asesor.p1_html": "Desarrollé una <span class='soft-underline cursor-default'>página de presentación</span> para un asesor de salud que orienta a sus clientes con la elección de planes de salud en función de sus requerimientos específicos.",
    "projects.asesor.p2_html": "En este proyecto cubrí desde el <span class='soft-underline cursor-default'>desarrollo</span>, <span class='soft-underline cursor-default'>levantamiento</span> y <span class='soft-underline cursor-default'>configuración de dominios</span> hasta el <span class='soft-underline cursor-default'>rediseño de su logo</span>.",
    "projects.terrainvicta.p1_html": "<span class='soft-underline cursor-default'>Para titularme</span> como Ingeniero Civil Informático mi proyecto final fue un <span class='soft-underline cursor-default'>juego de mecanografía</span>, resultando con <span class='soft-underline cursor-default'>nota máxima</span> para mi titulación.",

    // Experiencia
    "experience.dinamica.title": "Desarrollador Fullstack - Dinámica Plataforma",
    "experience.dinamica.p1": "Como parte del equipo de Data Science mi labor es desarrollar plataformas de análisis de datos y gestión de la información tanto a nivel interno de la empresa como productos para nuestros clientes.",
    "experience.dinamica.date": "Mar 2025 — Actualmente",

    "experience.ljar.title": "Desarrollador de Software y T.I. - Dist y Com Luis Jara",
    "experience.ljar.p1": "Como único y primer informático de la empresa mis labores fueron desarrollar aplicaciones para la gestión interna y levantamiento de infraestructura informática para la empresa. Siendo un reto absoluto como primer trabajo post universidad.",
    "experience.ljar.date": "Sep 2023 — Mar 2025",

    "experience.undurraga.title": "Practicante como T.I. - Viña Undurraga",
    "experience.undurraga.p1": "Como practicante en el departamento de T.I. mis labores fueron desde creación de software para mejora de procesos internos, diagnóstico y actualización de infraestructura informática, administración de bases de datos y soporte técnico.",
    "experience.undurraga.date": "Dic 2021 — Feb 2022",

    // Versiones HTML con subrayado en experiencia
    "experience.dinamica.p1_html": "Como parte del equipo de <span class='soft-underline cursor-default'>Data Science</span> mi labor es desarrollar plataformas de <span class='soft-underline cursor-default'>análisis de datos y gestión de la información</span> tanto a nivel interno de la empresa como productos para nuestros clientes.",
    "experience.ljar.p1_html": "Como <span class='soft-underline cursor-default'>único y primer informático</span> de la empresa mis labores fueron desarrollar aplicaciones para la gestión interna y levantamiento de <span class='soft-underline cursor-default'>infraestructura informática</span> para la empresa. Siendo <span class='soft-underline cursor-default'>un reto absoluto</span> como primer trabajo post universidad.",
    "experience.undurraga.p1_html": "Como <span class='soft-underline cursor-default'>practicante</span> en el departamento de T.I. mis labores fueron desde creación de software para <span class='soft-underline cursor-default'>mejora de procesos internos</span>, diagnóstico y actualización de <span class='soft-underline cursor-default'>infraestructura informática</span>, administración de <span class='soft-underline cursor-default'>bases de datos</span> y <span class='soft-underline cursor-default'>soporte técnico</span>.",

    // Alts ES
    "alt.profile": "Foto de perfil de Sebastián Carrasco",
    "alt.asesor": "Captura de AsesorDeSalud",
    "alt.terrainvicta": "Captura de TerraINVicta",
  },
  en: {
    "nav.brand": "Sebastián Carrasco",
    "nav.sobre": "about",
    "nav.proyectos": "Projects", 
    "nav.experiencia": "Experience",
    "nav.contacto": "contact",
    "section.inicio": "home",
    "hero.greeting": "Hi, I’m",
    "hero.name": "Sebastián Carrasco",
    "hero.profession": "Computer Civil Engineer",
    "hero.description": "I transform complex requirements into clear, efficient and scalable digital solutions.",
    "cta.cv": "Download CV",
    "section.sobre": "About me",
    "section.proyectos": "Projects",
    "section.experiencia": "Experience",
    "section.contacto": "contact",
    "footer.made": "built with next.js",

    // About
    "about.p1": "I am a Computer Science Engineer with experience in web development, software and graphic design. I love creating innovative solutions that optimize processes and generate real value for companies.",
    "about.p2": "I have worked on diverse projects such as admin systems, interactive dashboards, data analysis, games, and network/hardware setup. Always with one goal: every project should be functional, efficient, and user-centered.",
    "about.p3": "My way of working combines attention to detail, deep understanding of the problem, and a clear client orientation, which allows me to propose practical and creative solutions.",
    "about.p4": "I strongly believe that technology is a powerful tool to turn ideas into reality. Outside of work, I find inspiration in motorsport, Rubik's cubes, and sports — passions that fuel my curiosity, discipline, and perseverance.",
    "about.tech_title": "Favorite technologies",

    // About with underline (HTML)
    "about.p1_html": "I am a <span class='soft-underline cursor-default'>Computer Civil Engineer</span> with experience in web development, software and graphic design. I love creating innovative solutions that optimize processes and <span class='soft-underline cursor-default'>generate real value</span> for companies.",
    "about.p2_html": "I have worked on diverse projects such as admin systems, interactive dashboards, data analysis, games, and network/hardware setup. Always with one goal: <span class='soft-underline cursor-default'>every project should be functional, efficient, and user-centered</span>.",
    "about.p3_html": "My way of working combines attention to detail, <span class='soft-underline cursor-default'>deep understanding</span> of the problem, and a <span class='soft-underline cursor-default'>clear orientation</span> to the client, which allows me to <span class='soft-underline cursor-default'>propose solutions</span> that are practical and creative.",
    "about.p4_html": "I strongly believe that technology is a powerful tool to <span class='soft-underline cursor-default'>turn ideas into reality</span>. Outside of work, I find inspiration in motorsport, Rubik's cubes, and sports — passions that fuel my curiosity, discipline, and perseverance.",

    // Projects
    "projects.asesor.title": "Landing page asesordesalud.cl",
    "projects.asesor.p1": "I built a presentation website for a health advisor who guides clients to choose plans based on their specific needs.",
    "projects.asesor.p1_html": "I built a <span class='soft-underline cursor-default'>presentation website</span> for a health advisor who guides clients to choose plans based on their specific needs.",
    "projects.asesor.p2": "I handled development, deployment and domain configuration, and redesigned the brand logo.",
    "projects.asesor.p2_html": "I handled <span class='soft-underline cursor-default'>development</span>, <span class='soft-underline cursor-default'>deployment</span> and <span class='soft-underline cursor-default'>domain configuration</span>, and the <span class='soft-underline cursor-default'>logo redesign</span>.",

    "projects.terrainvicta.title": "TerraINVicta, a typing game",
    "projects.terrainvicta.p1": "For my degree, my final project was a typing game, achieving the highest grade.",
    "projects.terrainvicta.p1_html": "<span class='soft-underline cursor-default'>To get my degree</span> my final project was a <span class='soft-underline cursor-default'>typing game</span>, achieving a <span class='soft-underline cursor-default'>maximum grade</span>.",

    // Experience
    "experience.dinamica.title": "Fullstack Developer - Dinámica Plataforma",
    "experience.dinamica.p1": "As part of the Data Science team, I develop data analysis and information management platforms for internal use and client products.",
    "experience.dinamica.p1_html": "As part of the <span class='soft-underline cursor-default'>Data Science</span> team, I develop <span class='soft-underline cursor-default'>data analysis and information management</span> platforms for internal use and client products.",
    "experience.dinamica.date": "Mar 2025 — Present",

    "experience.ljar.title": "Software and IT Developer - Dist y Com Luis Jara",
    "experience.ljar.p1": "As the company's first and only IT professional, I developed internal management applications and deployed the company's IT infrastructure. A true challenge as my first job after university.",
    "experience.ljar.p1_html": "As the <span class='soft-underline cursor-default'>first and only IT professional</span>, I developed internal management applications and deployed the company's <span class='soft-underline cursor-default'>IT infrastructure</span>. It was <span class='soft-underline cursor-default'>a true challenge</span> as my first job after university.",
    "experience.ljar.date": "Sep 2023 — Mar 2025",

    "experience.undurraga.title": "IT Intern - Viña Undurraga",
    "experience.undurraga.p1": "As an intern in the IT department, I built software to improve internal processes, updated IT infrastructure, managed databases, and provided technical support.",
    "experience.undurraga.p1_html": "As an <span class='soft-underline cursor-default'>intern</span> in the IT department, I built software to <span class='soft-underline cursor-default'>improve internal processes</span>, updated <span class='soft-underline cursor-default'>IT infrastructure</span>, managed <span class='soft-underline cursor-default'>databases</span> and provided <span class='soft-underline cursor-default'>technical support</span>.",
    "experience.undurraga.date": "Dec 2021 — Feb 2022",
    // Alts
    "alt.profile": "Profile picture of Sebastián Carrasco",
    "alt.asesor": "AsesorDeSalud screenshot",
    "alt.terrainvicta": "TerraINVicta screenshot",
  },
};

function getInitialLocale(): Locale {
  if (typeof window === "undefined") return "es";
  try {
    const stored = window.localStorage.getItem("locale");
    if (stored === "es" || stored === "en") return stored as Locale;
  } catch {}
  const lang = navigator.language?.toLowerCase() || "es";
  return lang.startsWith("en") ? "en" : "es";
}

export const LocaleProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [locale, setLocaleState] = useState<Locale>("es");

  useEffect(() => {
    setLocaleState(getInitialLocale());
  }, []);

  const setLocale = (l: Locale) => {
    setLocaleState(l);
    try { window.localStorage.setItem("locale", l); } catch {}
  };

  const t = (key: string) => messages[locale]?.[key] ?? key;

  const value: LocaleContextValue = { locale, setLocale, t };

  // Keep <html lang> in sync with selected locale
  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.setAttribute("lang", locale);
    }
  }, [locale]);

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
};

export function useLocale() {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error("useLocale debe usarse dentro de LocaleProvider");
  return ctx;
} 