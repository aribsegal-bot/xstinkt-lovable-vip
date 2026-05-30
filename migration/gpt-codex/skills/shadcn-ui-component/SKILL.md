---
name: shadcn-ui-component
description: >-
  Add or correctly use a shadcn-ui primitive (button, dialog, accordion, form,
  etc.) from src/components/ui. Use when a section needs a new shared UI element
  or when wiring forms with react-hook-form + zod. Do NOT hand-roll primitives
  that already exist, and do NOT edit existing generated ui/* files unless asked.
---

## Purpose

The repo uses shadcn-ui (config in `components.json`, primitives in
`src/components/ui/*`). This skill ensures new UI reuses these primitives and follows the
project's form/validation pattern instead of introducing parallel implementations.

## Inputs needed

- Which primitive/element is needed and where it's used.
- For forms: the fields and validation rules.

## Steps

1. Check `src/components/ui/` for an existing primitive before adding anything.
2. If it exists, import it via the `@/components/ui/...` alias and compose with `cn()`.
3. If a new shadcn component is genuinely needed:
   - Prefer the shadcn CLI (`npx shadcn@latest add <component>`) so it lands in
     `src/components/ui/` with the repo's `components.json` settings (slate base, CSS
     vars, no prefix).
   - Confirm before installing anything new.
4. For forms, use `react-hook-form` + `zod` (both already deps) with the `form`,
   `input`, `label`, and `button` primitives.
5. Keep variants/styling consistent with existing primitives (class-variance-authority).

## Validation

```sh
npm run lint
npm run build
npm run dev        # confirm the component renders and is interactive
```

## Failure handling

- Style drift → mirror an existing primitive's variant structure.
- If the CLI would overwrite a customized file, stop and ask.

## Security constraints

- No secrets in UI code. Validate and sanitize any user input before sending it anywhere.

## Example prompts

- "Add a contact form using the existing form/input/button primitives with zod validation
  for name and email."
- "Use the existing dialog primitive to show a launch-notification modal."
