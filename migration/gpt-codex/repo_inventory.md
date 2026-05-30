# Repository Inventory

## Project overview

A single-page marketing / VIP-waitlist **landing site** for "xstinkt" — a patent-pending
garbage-can system that eliminates odors. The page collects emails for an Indiegogo
early-bird launch. The project is generated and maintained via **Lovable.dev**, with the
repo synced bidirectionally to Lovable.

## Tech stack

| Layer | Technology |
|-------|-----------|
| Build tool | Vite 5 (`@vitejs/plugin-react-swc`) |
| Language | TypeScript 5.8 |
| UI framework | React 18.3 |
| Component library | shadcn-ui (Radix UI primitives) |
| Styling | Tailwind CSS 3.4 (+ `tailwindcss-animate`, `@tailwindcss/typography`) |
| Routing | react-router-dom 6 |
| Data/fetching | @tanstack/react-query 5 |
| Forms/validation | react-hook-form + zod |
| Backend SDK | @supabase/supabase-js 2 (client configured, lightly used) |
| Animation | framer-motion |
| Icons | lucide-react |
| Toasts | sonner + custom toaster |
| Testing | Vitest 3 + Testing Library + jsdom |
| Linting | ESLint 9 (flat config) + typescript-eslint |
| Lovable tooling | `lovable-tagger` (dev-only Vite plugin) |

## Package manager

**npm** — `package-lock.json` is committed. Use `npm ci` / `npm install`.

## Commands

| Task | Command | Notes |
|------|---------|-------|
| Install | `npm install` (or `npm ci`) | Node.js + npm required. |
| Dev server | `npm run dev` | Vite on host `::`, port **8080**. |
| Build (prod) | `npm run build` | Vite production build → `dist/`. |
| Build (dev mode) | `npm run build:dev` | Build with `--mode development`. |
| Preview build | `npm run preview` | Serve the built `dist/`. |
| Lint | `npm run lint` | `eslint .` (flat config). |
| Test (once) | `npm run test` | `vitest run`. |
| Test (watch) | `npm run test:watch` | `vitest`. |
| Typecheck | *(none defined)* | Use `npx tsc --noEmit` if needed (see Unknowns). |
| Format | *(none defined)* | No Prettier config present. |

## Important directories & files

| Path | Role |
|------|------|
| `src/main.tsx` | App entry. |
| `src/App.tsx` | Router + global providers (QueryClient, Tooltip, Toasters). |
| `src/pages/Index.tsx` | The landing page; composes all sections in order. |
| `src/pages/NotFound.tsx` | Catch-all 404 route. |
| `src/components/*.tsx` | Page sections: Navigation, Hero, Problem, HowItWorks, Models, About, Contact, Footer. |
| `src/components/ui/*` | shadcn-ui primitives (generated; treat as vendored). |
| `src/hooks/` | `use-toast`, `use-mobile`. |
| `src/lib/utils.ts` | `cn()` class-merge helper. |
| `src/integrations/supabase/client.ts` | Supabase client. Header says "automatically generated — do not edit". |
| `src/integrations/supabase/types.ts` | Generated DB types. |
| `src/test/` | Vitest setup + example test. |
| `supabase/config.toml` | Supabase project id only. |
| `tailwind.config.ts`, `postcss.config.js`, `components.json` | Styling / shadcn config. |
| `vite.config.ts`, `vitest.config.ts`, `tsconfig*.json`, `eslint.config.js` | Build/test/lint/TS config. |
| `public/` | Static assets — **also contains a flat duplicate of every source file** (see Risk areas). |

## Path alias

`@` → `./src` (configured in `vite.config.ts`, `vitest.config.ts`, and `tsconfig`).

## Development workflow

1. `npm install`
2. `npm run dev` → edit `src/`
3. `npm run lint` and `npm run test` before committing
4. Changes pushed to the repo are mirrored to Lovable; changes made in Lovable are
   committed back automatically.

## Deployment / release workflow

- **Primary**: deploy via Lovable ("Share → Publish"). No CI/CD pipeline is defined in
  the repo.
- Custom domains are managed in Lovable project settings.
- No release scripts, version tags, changelog, or migration scripts exist in the repo.

## Risk areas

- **`.env` is git-tracked** (`VITE_SUPABASE_PROJECT_ID`, `VITE_SUPABASE_PUBLISHABLE_KEY`,
  `VITE_SUPABASE_URL`). `.gitignore` does **not** exclude `.env`.
  `SENSITIVE_REVIEW_REQUIRED` — Note: a Supabase *publishable/anon* key and URL are
  designed to be exposed in client builds, so this is likely low-severity, **but**
  committing `.env` is poor hygiene and risks a future secret being leaked the same way.
  Recommend adding `.env` to `.gitignore` and providing a committed `.env.example` with
  variable names only.
- **Hardcoded third-party form endpoint** in `src/components/HeroSection.tsx`
  (a Formspree form id). Not a credential, but a public integration to be aware of;
  abuse/spam protection lives on Formspree's side.
- **`public/` duplicates all source files** (88 entries mirroring `src/`, configs, etc.).
  Likely a Lovable sync artifact. Risk: stale/divergent copies and unintended exposure of
  source via the static folder. Do not edit these copies; treat `src/` as the source of
  truth. `SENSITIVE_REVIEW_REQUIRED` for whether `public/` should be cleaned up.
- **Generated files**: `src/integrations/supabase/client.ts` and `types.ts`, and the
  `src/components/ui/*` shadcn primitives are generated. Editing them risks being
  overwritten by Lovable/shadcn regeneration.
- **`@typescript-eslint/no-unused-vars` is disabled** in `eslint.config.js`, so unused
  code won't be flagged by lint.
- **No typecheck step** in CI or scripts — type errors can slip past `npm run lint`.

## Unknowns

- Whether Supabase is intended to grow into a real backend (tables, auth, edge functions)
  or remain unused scaffolding. `supabase/` has only `config.toml`.
- Whether `public/`'s source duplication is intentional or should be removed.
- Target Node.js version (no `.nvmrc` / `engines` field).
- Whether a typecheck/format gate is desired before deploy.
- Production hosting specifics beyond "Lovable Publish".
