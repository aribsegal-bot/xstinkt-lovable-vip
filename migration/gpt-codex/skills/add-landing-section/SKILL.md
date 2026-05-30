---
name: add-landing-section
description: >-
  Add or edit a section of the xstinkt landing page (Hero, Problem, HowItWorks,
  Models, About, Contact, Footer, etc.). Use when the request is to change page
  copy, add a new marketing section, or restructure the single-page layout. Do
  NOT use for build/test config changes, backend/Supabase work, or shared UI
  primitives (use shadcn-ui-component for those).
---

## Purpose

The site is a single page composed of self-contained section components rendered in order
by `src/pages/Index.tsx`. This skill keeps new/edited sections consistent with that
pattern and the existing Tailwind + shadcn-ui conventions.

## Inputs needed

- Which section to add or edit (name + position in the page).
- The copy/content and any imagery or icons (lucide-react).
- Whether it needs interactivity (form, state) or is presentational.

## Steps

1. Read `src/pages/Index.tsx` to see current section order and imports.
2. For an **edit**: open the matching `src/components/<Section>.tsx` and change only what's
   asked, preserving structure and Tailwind class style.
3. For a **new section**:
   - Create `src/components/<Name>Section.tsx` as a functional component.
   - Use the `@/` import alias and reuse `src/components/ui/*` primitives and `cn()`.
   - Match spacing/typography conventions from a neighboring section.
   - Import and place it in `src/pages/Index.tsx` at the requested position.
4. Use `lucide-react` for icons (already a dependency).
5. Keep styling to Tailwind utility classes — no new CSS systems.

## Validation

```sh
npm run lint
npm run test
npm run build      # confirms types/imports resolve
npm run dev        # visually confirm the section renders in order
```

## Failure handling

- Build/type errors → re-check imports and the `@/` alias.
- Section not appearing → confirm it's imported and placed in `Index.tsx`.
- Don't "fix" unrelated lint warnings or reformat neighboring files.

## Security constraints

- No secrets in component code. Client env vars must be `VITE_`-prefixed and non-sensitive.
- Don't add new third-party form/analytics endpoints without confirming intent.

## Example prompts

- "Add a `FAQSection` between About and Contact with three collapsible Q&As using the
  existing accordion UI primitive."
- "Update the Hero headline copy to X and keep the existing layout."
- "Reorder the page so Models comes before HowItWorks."
