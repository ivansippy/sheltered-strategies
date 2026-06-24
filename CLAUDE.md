# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Warning: Non-standard Next.js version

This project uses Next.js 16, which has **breaking changes** from versions in your training data — APIs, conventions, and file structure may all differ. Before writing any Next.js-specific code, read the relevant guide in `node_modules/next/dist/docs/`. Heed deprecation notices.

## Commands

```bash
npm run dev      # start dev server at localhost:3000
npm run build    # production build
npm run lint     # run ESLint
npx tsc --noEmit # type-check without emitting
```

There is no test suite currently.

## Architecture

This is a **Next.js 16 App Router** project with **React 19** and **React Compiler** (`reactCompiler: true` in `next.config.ts`).

### Single-page structure

The entire site lives in two files:
- [src/app/page.tsx](src/app/page.tsx) — all content data (typed arrays at the top), all components (`Photo`), and the page component (`ShelteredStrategiesHome`)
- [src/app/globals.css](src/app/globals.css) — all custom styles, scoped under the `.ss` class

The root layout at [src/app/layout.tsx](src/app/layout.tsx) applies `Geist`/`Geist Mono` CSS variables and wraps children.

### Styling

Styling uses **custom CSS only** (no Tailwind utility classes on components), scoped under `.ss` to prevent leakage. CSS is organized into numbered sections in `globals.css` (tokens, base, buttons, nav, hero, etc.). Tailwind v4 is installed via PostCSS but only used on `<body>` in `layout.tsx`.

Color tokens (`--paper`, `--ink`, `--sage`, `--clay`, etc.) and the `--font-body`/`--font-display` CSS variables are defined in `:root` and used throughout. The `Photo` component renders a styled placeholder div that swaps in a real `<img>` when a `src` prop is provided.

### Path alias

`@/*` maps to `src/*` (configured in `tsconfig.json`).

### Content editing

All page copy, therapy entries, process steps, and pricing lives in typed constant arrays (`NAV_LEFT`, `NAV_RIGHT`, `THERAPIES`, `STEPS`, `PRICES`) near the top of `page.tsx` — not in a CMS or data file. Edit those arrays to update content.

### Images

All photos use `next/image` via the `Photo` component (`fill` + the `.ph` CSS container's `position:relative`/fixed `aspect-ratio`), not raw `<img>` tags — this gets automatic resizing/format conversion (AVIF/WebP) and lazy loading. Each `Service` entry has both `photoLabel` (placeholder text shown when no `src` is set) and `photoAlt` (real `alt` text describing the photo) — keep them distinct. The hero image passes `priority` since it's above the fold; other images lazy-load by default.

### SEO & metadata

Site-wide `<title>`/description/Open Graph/Twitter metadata and JSON-LD (`MedicalBusiness` schema) live in `layout.tsx`, since the whole site is one page. `app/sitemap.ts` and `app/robots.ts` generate `/sitemap.xml` and `/robots.txt`. The canonical production domain (`https://shelteredstrategies.com`) is hardcoded as `SITE_URL` in `layout.tsx` and in the sitemap/robots files — update all three if the domain changes.

### Security headers

`next.config.ts` sets CSP, HSTS, X-Frame-Options, and other security headers via `headers()`, and disables the `X-Powered-By` header. The CSP is intentionally strict (`script-src 'self'`, no `unsafe-eval`) — if you add a third-party script, font, or embed, you'll need to extend the relevant CSP directive in `next.config.ts` or it will be silently blocked by the browser.
