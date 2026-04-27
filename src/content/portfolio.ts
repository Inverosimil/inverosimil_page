import type { Locale } from "../context/LocaleContext";

export type RichTextSegment = {
  text: string;
  highlight?: boolean;
};

type Localized<T> = Record<Locale, T>;

type LocalizedRichText = Localized<RichTextSegment[]>;

export type Project = {
  id: string;
  href: string;
  title: Localized<string>;
  descriptions: LocalizedRichText[];
  stack: string[];
  delay?: number;
  image: {
    src: string;
    width: number;
    height: number;
    altKey: string;
  };
};

export type Experience = {
  id: string;
  href?: string;
  title: Localized<string>;
  description: LocalizedRichText;
  date: Localized<string>;
  stack: string[];
  delay?: number;
};

export const profileImage = {
  src: "/profile_image.webp",
  width: 900,
  height: 975,
};

export const favoriteTechnologies = [
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
] as const;

export const socialLinks = {
  github: "https://github.com/inverosimil",
  linkedin: "https://www.linkedin.com/in/sebastian-carrasco-álvarez",
  instagram: "https://instagram.com/_.inverosimil._",
  whatsapp: "https://wa.me/56950146865?text=Hola%20Sebastián,%20quiero%20hacerte%20una%20consulta.",
  email: "mailto:contacto@scarrasco.com?subject=Consulta&body=Hola%20Sebastián,%20quiero%20hacerte%20una%20consulta.",
} as const;

export const aboutParagraphs: Array<{ delay: number; content: LocalizedRichText }> = [
  {
    delay: 0,
    content: {
      es: [
        { text: "Soy " },
        { text: "Ingeniero Civil Informático", highlight: true },
        { text: " con experiencia en desarrollo web, software y diseño gráfico. Me apasiona crear soluciones innovadoras que optimicen procesos y " },
        { text: "generen verdadero valor", highlight: true },
        { text: " para las empresas." },
      ],
      en: [
        { text: "I am a " },
        { text: "Computer Civil Engineer", highlight: true },
        { text: " with experience in web development, software and graphic design. I love creating innovative solutions that optimize processes and " },
        { text: "generate real value", highlight: true },
        { text: " for companies." },
      ],
    },
  },
  {
    delay: 80,
    content: {
      es: [
        { text: "He trabajado en proyectos tan diversos como sistemas de administración, dashboards interactivos, análisis de datos, juegos y configuración de redes y hardware. Siempre con un mismo objetivo: " },
        { text: "que cada proyecto sea funcional, eficiente y centrado en el usuario", highlight: true },
        { text: "." },
      ],
      en: [
        { text: "I have worked on diverse projects such as admin systems, interactive dashboards, data analysis, games, and network/hardware setup. Always with one goal: " },
        { text: "every project should be functional, efficient, and user-centered", highlight: true },
        { text: "." },
      ],
    },
  },
  {
    delay: 160,
    content: {
      es: [
        { text: "Mi forma de trabajar combina atención al detalle, " },
        { text: "comprensión profunda", highlight: true },
        { text: " del problema y una " },
        { text: "orientación clara", highlight: true },
        { text: " al cliente, lo que me permite " },
        { text: "proponer soluciones", highlight: true },
        { text: " prácticas y creativas." },
      ],
      en: [
        { text: "My way of working combines attention to detail, " },
        { text: "deep understanding", highlight: true },
        { text: " of the problem, and a " },
        { text: "clear orientation", highlight: true },
        { text: " to the client, which allows me to " },
        { text: "propose solutions", highlight: true },
        { text: " that are practical and creative." },
      ],
    },
  },
  {
    delay: 200,
    content: {
      es: [
        { text: "Creo firmemente que la tecnología es una herramienta poderosa para " },
        { text: "transformar ideas en realidades", highlight: true },
        { text: ". Fuera del trabajo, encuentro inspiración en el automovilismo, los cubos de Rubik y el deporte, pasiones que alimentan mi curiosidad, disciplina y perseverancia." },
      ],
      en: [
        { text: "I strongly believe that technology is a powerful tool to " },
        { text: "turn ideas into reality", highlight: true },
        { text: ". Outside of work, I find inspiration in motorsport, Rubik's cubes, and sports — passions that fuel my curiosity, discipline, and perseverance." },
      ],
    },
  },
];

export const projects: Project[] = [
  {
    id: "asesor",
    href: "https://asesordesalud.cl/",
    title: {
      es: "Página presentación asesordesalud.cl",
      en: "Landing page asesordesalud.cl",
    },
    descriptions: [
      {
        es: [
          { text: "Desarrollé una " },
          { text: "página de presentación", highlight: true },
          { text: " para un asesor de salud que orienta a sus clientes con la elección de planes de salud en función de sus requerimientos específicos." },
        ],
        en: [
          { text: "I built a " },
          { text: "presentation website", highlight: true },
          { text: " for a health advisor who guides clients to choose plans based on their specific needs." },
        ],
      },
      {
        es: [
          { text: "En este proyecto cubrí desde el " },
          { text: "desarrollo", highlight: true },
          { text: ", " },
          { text: "levantamiento", highlight: true },
          { text: " y " },
          { text: "configuración de dominios", highlight: true },
          { text: " hasta el " },
          { text: "rediseño de su logo", highlight: true },
          { text: "." },
        ],
        en: [
          { text: "I handled " },
          { text: "development", highlight: true },
          { text: ", " },
          { text: "deployment", highlight: true },
          { text: " and " },
          { text: "domain configuration", highlight: true },
          { text: ", and the " },
          { text: "logo redesign", highlight: true },
          { text: "." },
        ],
      },
    ],
    stack: [
      "Web Standard",
      "JavaScript",
      "HTML",
      "CSS",
      "Vercel",
      "Figma",
      "Adobe Photoshop",
      "Adobe Illustrator",
    ],
    image: {
      src: "/projects/asesordesalud.png",
      width: 3024,
      height: 1888,
      altKey: "alt.asesor",
    },
  },
  {
    id: "terrainvicta",
    href: "https://terrainvicta.scarrasco.com/",
    title: {
      es: "TerraINVicta, un juego de mecanografía",
      en: "TerraINVicta, a typing game",
    },
    descriptions: [
      {
        es: [
          { text: "Para titularme", highlight: true },
          { text: " como Ingeniero Civil Informático mi proyecto final fue un " },
          { text: "juego de mecanografía", highlight: true },
          { text: ", resultando con " },
          { text: "nota máxima", highlight: true },
          { text: " para mi titulación." },
        ],
        en: [
          { text: "To get my degree", highlight: true },
          { text: " my final project was a " },
          { text: "typing game", highlight: true },
          { text: ", achieving a " },
          { text: "maximum grade", highlight: true },
          { text: "." },
        ],
      },
    ],
    stack: ["Web Standard", "HTML", "CSS", "JavaScript", "Vercel", "Adobe Photoshop"],
    delay: 80,
    image: {
      src: "/projects/terrainvicta.png",
      width: 2994,
      height: 1876,
      altKey: "alt.terrainvicta",
    },
  },
];

export const experiences: Experience[] = [
  {
    id: "dinamica",
    href: "https://www.dinamicaplataforma.com/",
    title: {
      es: "Desarrollador Fullstack - Dinámica Plataforma",
      en: "Fullstack Developer - Dinámica Plataforma",
    },
    description: {
      es: [
        { text: "Como parte del equipo de " },
        { text: "Data Science", highlight: true },
        { text: " mi labor es desarrollar plataformas de " },
        { text: "análisis de datos y gestión de la información", highlight: true },
        { text: " tanto a nivel interno de la empresa como productos para nuestros clientes." },
      ],
      en: [
        { text: "As part of the " },
        { text: "Data Science", highlight: true },
        { text: " team, I develop " },
        { text: "data analysis and information management", highlight: true },
        { text: " platforms for internal use and client products." },
      ],
    },
    date: {
      es: "Mar 2025 — Actualmente",
      en: "Mar 2025 — Present",
    },
    stack: [
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
    ],
  },
  {
    id: "ljar",
    title: {
      es: "Desarrollador de Software y T.I. - Dist y Com Luis Jara",
      en: "Software and IT Developer - Dist y Com Luis Jara",
    },
    description: {
      es: [
        { text: "Como " },
        { text: "único y primer informático", highlight: true },
        { text: " de la empresa mis labores fueron desarrollar aplicaciones para la gestión interna y levantamiento de " },
        { text: "infraestructura informática", highlight: true },
        { text: " para la empresa. Siendo " },
        { text: "un reto absoluto", highlight: true },
        { text: " como primer trabajo post universidad." },
      ],
      en: [
        { text: "As the " },
        { text: "first and only IT professional", highlight: true },
        { text: ", I developed internal management applications and deployed the company's " },
        { text: "IT infrastructure", highlight: true },
        { text: ". It was " },
        { text: "a true challenge", highlight: true },
        { text: " as my first job after university." },
      ],
    },
    date: {
      es: "Sep 2023 — Mar 2025",
      en: "Sep 2023 — Mar 2025",
    },
    stack: [
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
    ],
    delay: 80,
  },
  {
    id: "undurraga",
    href: "https://www.undurraga.cl",
    title: {
      es: "Practicante como T.I. - Viña Undurraga",
      en: "IT Intern - Viña Undurraga",
    },
    description: {
      es: [
        { text: "Como " },
        { text: "practicante", highlight: true },
        { text: " en el departamento de T.I. mis labores fueron desde creación de software para " },
        { text: "mejora de procesos internos", highlight: true },
        { text: ", diagnóstico y actualización de " },
        { text: "infraestructura informática", highlight: true },
        { text: ", administración de " },
        { text: "bases de datos", highlight: true },
        { text: " y " },
        { text: "soporte técnico", highlight: true },
        { text: "." },
      ],
      en: [
        { text: "As an " },
        { text: "intern", highlight: true },
        { text: " in the IT department, I built software to " },
        { text: "improve internal processes", highlight: true },
        { text: ", updated " },
        { text: "IT infrastructure", highlight: true },
        { text: ", managed " },
        { text: "databases", highlight: true },
        { text: " and provided " },
        { text: "technical support", highlight: true },
        { text: "." },
      ],
    },
    date: {
      es: "Dic 2021 — Feb 2022",
      en: "Dec 2021 — Feb 2022",
    },
    stack: ["CMD", "Hardware", "SQL", "Web Standard"],
    delay: 160,
  },
];
