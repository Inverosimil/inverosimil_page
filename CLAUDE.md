# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Single-page bilingual (es/en) personal portfolio for scarrasco.com. Next.js 15 App Router + React 19 + TypeScript + Tailwind CSS 4. No test suite, no backend, no database — the entire site is one static route rendered from typed content.

## Commands

```bash
npm run dev        # dev server on http://localhost:3000
npm run build      # production build (what Vercel runs)
npm run lint       # eslint (next/core-web-vitals + next/typescript)
npm run typecheck  # tsc --noEmit
```

There are no tests. Before considering a change done, run `npm run lint` and `npm run typecheck`; run `npm run build` for anything touching routing, metadata, fonts, or `next.config.ts`.

Deploys go to Vercel (`vercel.json`: `npm ci` + `npm run build`, Node 20 pinned via `engines`). `next.config.ts` pins `outputFileTracingRoot` and `turbopack.root` to the project dir — this exists because the repo sits under a parent directory that would otherwise confuse Next's workspace root inference. Don't remove it.

## Architecture

### Content is data, not JSX

All portfolio copy lives in [src/content/portfolio.ts](src/content/portfolio.ts) as typed exports (`aboutParagraphs`, `projects`, `experiences`, `favoriteTechnologies`, `socialLinks`, `profileImage`). [src/app/page.tsx](src/app/page.tsx) maps over those arrays. **To change what the site says, edit the content file — not the components.**

Every localized string is `Record<Locale, T>` (`{ es, en }`). Prose is not plain strings and not HTML: it's `RichTextSegment[]` — `{ text, highlight? }` arrays rendered by [RichText](src/components/RichText.tsx), where `highlight: true` wraps the segment in the `.soft-underline` class. Adding emphasis means splitting a segment, never embedding markup.

Short UI labels (nav, section titles, aria-labels, image alts) live in the `messages` map inside [src/context/LocaleContext.tsx](src/context/LocaleContext.tsx) and are read via `t("key")`. Content-file entries reference alts by key (`image.altKey`), so a new image needs both a `portfolio.ts` entry and matching `alt.*` keys in both locales. `t()` falls back to returning the key itself when missing — a raw `alt.foo` on screen means a missing translation.

### Locale switching is an animation system, not just state

`setLocale` in [LocaleContext](src/context/LocaleContext.tsx) runs a FLIP-style transition and this is the most intricate part of the codebase:

1. `captureLocaleLayout()` snapshots `getBoundingClientRect()` for every `[data-locale-motion]` element.
2. The locale is applied under `flushSync` so the DOM reflects new text synchronously.
3. `locale-switching` is added to `<html>`, replaying the `locale-text-in` keyframes on every `.locale-animated` element.
4. After two rAFs, elements that moved more than 2px are animated back from their old position with the Web Animations API.

Consequences for any component you add or edit:

- A block whose **position** should glide during a language change needs `{...localeMotion("unique-name")}` (from [src/utils/localeMotion.ts](src/utils/localeMotion.ts)) — the name must be stable across both locales or the element won't be matched.
- A **text** element that should fade/blur in needs the `locale-animated` class, plus `locale-delay-1`…`locale-delay-5` to stagger it (those map to CSS custom properties in `globals.css`; there is no `locale-delay-6`).
- Anything that must *not* animate (controls, social icons) goes inside a `locale-static` wrapper.
- `setLocale` and all animation work are skipped entirely under `prefers-reduced-motion: reduce`. Every animated component in the repo checks this; keep that invariant.

Run counters and ref arrays guard against rapid toggles — new animation work in that file should register its timeouts/rAFs/`Animation`s in the same refs so `stopLocaleAnimation` can cancel them.

### Theming: two axes, both classes on `<html>`

[ThemeContext](src/context/ThemeContext.tsx) drives two independent toggles, each persisted in `localStorage` and applied as a class on `<html>`:

- **theme** — `theme-light` / `theme-dark` (key `theme`). Default is **dark**; the OS preference is deliberately ignored.
- **accent palette** — `accent-amber` present or absent (key `accent`). Default is **amber**.

Locale defaults to **es** regardless of `navigator.language`. All three defaults only yield to a value the visitor stored earlier.

Colors are four CSS variables (`--background`, `--foreground`, `--accent`, `--muted`) redefined for each of the four class combinations in [globals.css](src/app/globals.css) and exposed to Tailwind through `@theme inline`, so use `bg-background`, `text-accent`, `bg-muted` etc. rather than literal colors. Adding a palette means adding two more blocks (`.theme-light.accent-x`, `.theme-dark.accent-x`), extending the `Accent` type, and nothing else.

Tailwind's `dark:` variant is remapped with `@custom-variant dark` to follow `.theme-dark`, not the OS media query.

An inline blocking script in [layout.tsx](src/app/layout.tsx) applies both classes before paint to avoid a flash; it duplicates the `getInitial*()` logic, so changing class names or storage keys means changing both places. `<html>` carries `suppressHydrationWarning` for this reason. The sun/moon toggle icon is chosen by CSS (`.icon-sun` / `.icon-moon` under `.theme-dark`), not by React state, so it is correct on the first frame.

`flashSwitchAt(x, y)` (exported from ThemeContext) triggers the radial flash used by both the theme and palette buttons. It also gates the only global color transition: `html.theme-switching *` gets a 350ms color/background/border transition **only while a switch is in flight**, so the rest of the time no element carries a transition it did not ask for. Components declare their own hover transitions; never reintroduce a permanent `* { transition: … }` rule.

Text colors must clear WCAG AA (4.5:1) in **all four** combinations — light+amber is the tightest, so `text-foreground/70` is the lowest usable opacity for real text and `--accent` there is a dark `#7a4d02`, not the bright `#fbbf24` of dark mode. Anything below `/70` is decoration and needs `aria-hidden`.

The binding constraint when picking an accent is never plain text on the background — it is a **tag in hover state** (`text-accent` over `bg-accent/20`, i.e. the accent over a 20% tint of itself). Check that case before anything else; several otherwise-fine accents fail only there.

### Icons

All icons live in [src/components/icons.tsx](src/components/icons.tsx) and inherit `currentColor` — no `<img>`, no filter recoloring. `public/icons/` is unused legacy. Two families:

- **UI icons** (sun, moon, palette, download, external link, settings, close) are stroke-only, drawn through the `Icon` wrapper.
- **Social icons** (GitHub, LinkedIn, Instagram, WhatsApp, Mail) are solid-fill brand marks whose path data lives in [src/components/socialIconPaths.ts](src/components/socialIconPaths.ts) (generated, don't hand-edit). Each carries one animation *inside* the mark, triggered purely by CSS: `.social-link:hover .si-*` rules and `si-*` keyframes in `globals.css`, all inside `prefers-reduced-motion: no-preference`. The animated part is a sub-path with `transform-box: view-box` and an explicit `transform-origin`. Leaving the link cuts the animation (it does not finish) and a 200ms transition returns the part to rest.

  GitHub is the intricate one: the cat's face and tail are *holes* in the circle, so the animation works on the absence. A patch path refills each hole (stroked 0.34 so its edge never coincides with the cut) and a `<mask>` re-carves it with the transform applied. The carve polygons deliberately extend past the patch (face: 0.6 units below the clip at y=17.78; tail: 0.6 units right of the vertical cut at x=7) — if patch and carve share an edge, antialiasing leaves a visible hairline. Keep those margins and the `useId`-based ids if you touch it.

### Background

[ParallaxBackground](src/components/ParallaxBackground.tsx) renders the single `.code-grid` element whose CSS draws the dot grid (parallax via `--bg-offset`), the initial reveal wipe, and the pointer "lens" (`--mx/--my`). It is fixed and `pointer-events: none`; do not reuse the `code-grid` class on content elements.

### Scroll and motion components

Three independent, mount-once client components in the root layout, all no-ops under reduced motion:

- [SmoothPageScroll](src/components/SmoothPageScroll.tsx) — hijacks `wheel` (non-passive, `preventDefault`) for eased page scrolling, but walks up from the event target first and bails if any ancestor can actually scroll. Adding a scrollable sub-region requires a real `overflow-y` so that check succeeds.
- [ParallaxBackground](src/components/ParallaxBackground.tsx) — see Background above.
- [Reveal](src/components/Reveal.tsx) — IntersectionObserver fade-in wrapper taking a `delay` prop; the `delay` values on content entries in `portfolio.ts` feed this. It sets `data-revealed="true"` on its wrapper once visible, which CSS uses for one-shot effects (the timeline dot pulse).

[SideIndex](src/components/SideIndex.tsx) implements its own eased scroll-to and active-section detection (nearest section center to viewport center) and hardcodes `SECTION_IDS = ["sobre", "proyectos", "experiencia"]` — adding a section means updating that array and the corresponding `<Section id>` and `section.*` message keys together.

### Layout

[page.tsx](src/app/page.tsx) is a `"use client"` two-column grid: sticky [IntroSidebar](src/components/IntroSidebar.tsx) (hero, CV download, SideIndex, social links, desktop controls) beside a `<main>` of three [Section](src/components/Section.tsx)s. Experience entries render as a vertical timeline (rail column with `.timeline-dot` / `.timeline-line`, the last entry gets no line). [TopRightControls](src/components/TopRightControls.tsx) is the mobile-only (`sm:hidden`) equivalent of [InlineControls](src/components/InlineControls.tsx) — theme, locale and palette switches are duplicated between them, so behavior changes belong in both.

Section ids and message keys are Spanish (`sobre`, `proyectos`, `experiencia`) regardless of active locale; they're stable anchors, not user-facing text.

## Jev review (optional second opinion)

`npm run jev:review` runs [scripts/jev-review.mjs](scripts/jev-review.mjs): it sends each live source file to TypeSafe's Jev (`typesafe-ai/jev`, via Vercel AI Gateway using the AI SDK `experimental_evaluate`) and prints typed judgments per file — reduced-motion compliance, motion subtlety score, main a11y risk, hard-coded text, security risk, theming consistency. `--ask "question" [files]` asks a single yes/no question instead. Jev only decides/scores; it never generates text, so treat its output as a linter-like signal, not as advice. It needs `AI_GATEWAY_API_KEY` in `.env.local` (gitignored) from the personal Vercel account; it does not use `vercel login`. `ai` is a devDependency only — the site itself makes no AI calls.

## Conventions

- Comments and error strings in the codebase are mixed Spanish/English; match the surrounding file.
- Visible images go through `next/image` with explicit `width`/`height` (dimensions live alongside the `src` in `portfolio.ts`) and a `sizes` hint matching the CSS width.
- Imports use relative paths in practice even though `@/*` → `./src/*` is configured in `tsconfig.json`.
- SEO surface is `metadata` in [layout.tsx](src/app/layout.tsx) plus [sitemap.ts](src/app/sitemap.ts) and [robots.ts](src/app/robots.ts); the `https://scarrasco.com` origin is hardcoded in all three.

## Untracked leftovers

`src/components/{Header,Hero,SectionTabs,ProjectCard,SocialLinks,TypewriterText}.tsx`, `src/hooks/` and `public/icons/` are unreferenced leftovers (the first group is untracked; git already dropped them in earlier commits). The component actually rendered is `SocialLinksNew.tsx`, not `SocialLinks.tsx`. Don't treat these as live code or wire them up without asking.
