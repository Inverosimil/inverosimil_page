// Revisión del sitio con Jev (TypeSafe AI) vía Vercel AI Gateway.
//
// Jev no genera texto: responde preguntas cerradas (sí/no, elección, puntaje)
// sobre un estado. Aquí el estado es el código fuente de cada archivo y las
// preguntas son criterios fijos de calidad: movimiento, accesibilidad, i18n,
// seguridad y consistencia. Sirve como segunda opinión barata y repetible,
// no como generador de propuestas.
//
// Uso:
//   npm run jev:review                       # revisa los archivos por defecto
//   npm run jev:review -- src/app/page.tsx   # solo esos archivos
//   npm run jev:review -- --ask "¿...?" src/components/Reveal.tsx
//
// Requiere AI_GATEWAY_API_KEY en .env.local (clave de AI Gateway de la cuenta
// de Vercel donde está habilitado Jev). No requiere `vercel login`.

import { readFile } from "node:fs/promises";
import { relative, resolve } from "node:path";
import { experimental_evaluate as evaluate } from "ai";

const MODEL = "typesafe-ai/jev";

// Carga .env.local si existe (sin depender de flags de Node que cambian entre versiones).
async function loadEnvLocal() {
  try {
    const text = await readFile(resolve(process.cwd(), ".env.local"), "utf8");
    for (const raw of text.split("\n")) {
      const line = raw.trim();
      if (!line || line.startsWith("#")) continue;
      const eq = line.indexOf("=");
      if (eq === -1) continue;
      const key = line.slice(0, eq).trim();
      const value = line.slice(eq + 1).trim().replace(/^["']|["']$/g, "");
      if (!(key in process.env)) process.env[key] = value;
    }
  } catch {}
}

const DEFAULT_FILES = [
  "src/app/globals.css",
  "src/app/layout.tsx",
  "src/app/page.tsx",
  "src/app/not-found.tsx",
  "src/components/IntroSidebar.tsx",
  "src/components/SideIndex.tsx",
  "src/components/Reveal.tsx",
  "src/components/Section.tsx",
  "src/components/RichText.tsx",
  "src/components/ParallaxBackground.tsx",
  "src/components/SmoothPageScroll.tsx",
  "src/components/InlineControls.tsx",
  "src/components/TopRightControls.tsx",
  "src/components/SocialLinksNew.tsx",
  "src/components/icons.tsx",
  "src/context/LocaleContext.tsx",
  "src/context/ThemeContext.tsx",
];

// Convenciones del proyecto: Jev las recibe como contexto junto al archivo.
const PROJECT_CONTEXT = {
  stack: "Next.js 15 App Router, React 19, TypeScript, Tailwind CSS 4",
  motion: {
    easing: "cubic-bezier(.22,1,.36,1) para todo",
    durations: "250–700ms; nada por encima de 900ms salvo scroll",
    reducedMotion: "todo movimiento debe desactivarse con prefers-reduced-motion: reduce",
    properties: "solo transform, opacity, filter y clip-path; nunca layout (width/height/top/left)",
  },
  i18n: "texto visible solo vía t('clave') o src/content/portfolio.ts; ids de sección en español",
  theming: "colores solo vía var(--background|--foreground|--accent|--muted) o clases bg-background/text-accent…",
};

const QUESTIONS = {
  reducedMotion: {
    type: "boolean",
    instructions:
      "¿Todo movimiento (animation, transition, requestAnimationFrame, scroll programado) de este archivo queda desactivado cuando el visitante tiene prefers-reduced-motion: reduce? Si el archivo no tiene movimiento, responde sí.",
    criteria: {
      true: "No hay movimiento, o cada movimiento está dentro de un bloque/guard de prefers-reduced-motion.",
      false: "Hay al menos una animación, transición o scroll animado que se ejecuta igual con reduced-motion.",
    },
  },
  motionSubtlety: {
    type: "score",
    instructions:
      "Qué tan sutil y coherente con las convenciones del proyecto es el movimiento de este archivo (duración, easing, propiedades animadas, magnitud). Si no hay movimiento, elige el nivel máximo.",
    criteria: [
      "Movimiento excesivo: duraciones >900ms, escalas >1.1, anima layout, easing distinto o loops infinitos.",
      "Notorio: alguna duración o magnitud fuera de convención, o easing inconsistente.",
      "Correcto: dentro de convención pero con algún detalle mejorable (will-change innecesario, transición global, etc.).",
      "Sutil y consistente: mismas curvas, duraciones cortas, solo transform/opacity.",
    ],
  },
  a11yRisk: {
    type: "choice",
    instructions: "Cuál es el riesgo de accesibilidad principal de este archivo.",
    criteria: {
      none: "No se detecta ningún problema relevante.",
      missingLabel: "Botones o enlaces solo con ícono sin aria-label/title, o imágenes sin alt.",
      focus: "Elementos interactivos que no son button/a, o foco de teclado imposible/invisible.",
      semantics: "Estructura semántica pobre (headings saltados, listas falsas, roles incorrectos).",
      contrast: "Colores de texto con opacidad/contraste probablemente insuficiente (<4.5:1).",
      motion: "Movimiento que puede molestar (parpadeo, autoplay, scroll hijacking sin escape).",
    },
  },
  hardcodedText: {
    type: "boolean",
    instructions:
      "¿Hay texto visible para el usuario escrito directamente en JSX/CSS en lugar de pasar por t('clave') o por src/content/portfolio.ts? Ignora aria-label de idiomas ('Español', 'English'), nombres propios de redes (GitHub, LinkedIn…) y el archivo not-found.tsx, que es solo en español a propósito.",
    criteria: {
      true: "Hay al menos una cadena visible hard-codeada que debería estar traducida.",
      false: "Todo el texto visible está traducido o proviene del contenido tipado.",
    },
  },
  securityRisk: {
    type: "boolean",
    instructions:
      "¿Este archivo introduce un riesgo de seguridad? Considera: target=_blank sin rel=noreferrer/noopener, dangerouslySetInnerHTML con contenido no constante, URLs construidas con datos externos, eval, secretos en el cliente. Un script inline constante que solo lee localStorage para aplicar clases NO es riesgo.",
    criteria: {
      true: "Hay un patrón inseguro real.",
      false: "No hay patrones inseguros.",
    },
  },
  themingConsistency: {
    type: "boolean",
    instructions:
      "¿Todos los colores de este archivo pasan por las variables/clases del sistema de tema (--background, --foreground, --accent, --muted, bg-background, text-accent, etc.)? Los hex literales dentro de las definiciones de .theme-* en globals.css sí están permitidos.",
    criteria: {
      true: "No hay colores literales fuera de las definiciones de tema.",
      false: "Hay colores literales (hex, rgb, nombres) usados directamente en componentes o reglas sueltas.",
    },
  },
};

function parseArgs(argv) {
  const files = [];
  let ask = null;
  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === "--ask") {
      ask = argv[++i];
    } else {
      files.push(argv[i]);
    }
  }
  return { files: files.length ? files : DEFAULT_FILES, ask };
}

function pct(n) {
  return `${Math.round(n * 100)}%`;
}

function flag(probability, threshold = 0.5) {
  return probability >= threshold ? "⚠" : "✓";
}

async function reviewFile(path, source) {
  const { answers, usage } = await evaluate({
    model: MODEL,
    state: { project: PROJECT_CONTEXT, file: path, source },
    questions: QUESTIONS,
  });
  return { path, answers, usage };
}

async function askFile(path, source, question) {
  const { answers } = await evaluate({
    model: MODEL,
    state: { project: PROJECT_CONTEXT, file: path, source },
    questions: { answer: { type: "boolean", instructions: question } },
  });
  return { path, probability: answers.answer.probability };
}

async function main() {
  await loadEnvLocal();
  if (!process.env.AI_GATEWAY_API_KEY) {
    console.error(
      "Falta AI_GATEWAY_API_KEY. Créala en tu cuenta personal de Vercel (AI Gateway → API Keys) y ponla en .env.local.\n" +
        "Luego: npm run jev:review"
    );
    process.exit(1);
  }

  const { files, ask } = parseArgs(process.argv.slice(2));
  const root = process.cwd();
  const sources = await Promise.all(
    files.map(async (f) => ({ path: relative(root, resolve(root, f)), source: await readFile(resolve(root, f), "utf8") }))
  );

  if (ask) {
    console.log(`Pregunta: ${ask}\n`);
    const results = await Promise.all(sources.map((s) => askFile(s.path, s.source, ask)));
    for (const r of results) {
      console.log(`${pct(r.probability).padStart(5)}  ${r.path}`);
    }
    return;
  }

  const results = await Promise.all(sources.map((s) => reviewFile(s.path, s.source)));

  const header = ["archivo", "reduced-motion", "sutileza", "a11y", "texto fijo", "seguridad", "tema"];
  const rows = results.map(({ path, answers }) => {
    const rm = answers.reducedMotion.probability;
    const sub = answers.motionSubtlety.score; // 0..3
    const a11y = answers.a11yRisk.choice;
    // Confianza de la elección: una categoría al 30% es una duda, no un hallazgo.
    const a11yProb = answers.a11yRisk.probabilities?.[a11y];
    const a11yLabel = a11yProb == null ? a11y : `${a11y} ${pct(a11yProb)}`;
    const hc = answers.hardcodedText.probability;
    const sec = answers.securityRisk.probability;
    const theme = answers.themingConsistency.probability;
    return [
      path,
      `${flag(1 - rm)} ${pct(rm)}`,
      `${"●".repeat(Math.round(sub) + 1)}${"○".repeat(3 - Math.round(sub))} ${sub.toFixed(1)}/3`,
      a11y === "none" || (a11yProb != null && a11yProb < 0.5) ? `✓ ${a11yLabel}` : `⚠ ${a11yLabel}`,
      `${flag(hc)} ${pct(hc)}`,
      `${flag(sec)} ${pct(sec)}`,
      `${flag(1 - theme)} ${pct(theme)}`,
    ];
  });

  const widths = header.map((h, i) => Math.max(h.length, ...rows.map((r) => r[i].length)));
  const line = (cols) => cols.map((c, i) => c.padEnd(widths[i])).join("  ");
  console.log(line(header));
  console.log(widths.map((w) => "─".repeat(w)).join("  "));
  rows.forEach((r) => console.log(line(r)));

  const tokens = results.reduce((n, r) => n + (r.usage.totalTokens ?? 0), 0);
  console.log(`\n${results.length} archivos · ${tokens} tokens · modelo ${MODEL}`);
  console.log("Lectura: ⚠ marca probabilidad ≥50% de problema; sutileza 0–3 (3 = sutil y consistente).");
}

main().catch((error) => {
  console.error(error?.message ?? error);
  process.exit(1);
});
