# scarrasco.com

Portfolio personal de Sebastián Carrasco construido con Next.js App Router, React, TypeScript y Tailwind CSS.

## Stack

- Next.js 15
- React 19
- TypeScript
- Tailwind CSS 4
- ESLint con reglas de Next.js

## Comandos

```bash
npm run dev
npm run build
npm run lint
npm run typecheck
```

El servidor de desarrollo queda disponible en `http://localhost:3000`.

## Estructura

- `src/app`: rutas, layout, estilos globales, sitemap y robots.
- `src/components`: piezas reutilizables de UI.
- `src/context`: estado de tema e idioma.
- `src/content`: contenido tipado del portfolio.
- `public`: imágenes, iconos, documentos y assets estáticos.

## Notas de mantenimiento

- El contenido principal vive en `src/content/portfolio.ts`.
- Las traducciones cortas de UI viven en `src/context/LocaleContext.tsx`.
- Los textos con énfasis se renderizan con segmentos tipados y `RichText`, no con HTML embebido.
- Las imágenes visibles se cargan con `next/image`.
