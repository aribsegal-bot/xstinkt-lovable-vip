# Codex Prompt Templates

No Claude slash commands existed to convert. These templates capture the recurring asks
for this repo so you can paste them into Codex with placeholders filled in. They pair with
the skills in `skills/`.

Placeholders use `{{like_this}}`.

---

## /add-section

- **Prompt**:
  > Add a new landing section `{{SectionName}}` to the page. Content: `{{copy_or_brief}}`.
  > Place it `{{position, e.g. between About and Contact}}`. Follow AGENTS.md: one
  > self-contained `src/components/{{SectionName}}.tsx`, Tailwind + `cn()`, reuse
  > `components/ui/*`, register it in `src/pages/Index.tsx`. Then run lint, test, and build.
- **Arguments/placeholders**: `{{SectionName}}`, `{{copy_or_brief}}`, `{{position}}`.
- **Expected output**: New component + updated `Index.tsx`, gates green, summary.
- **When to use**: Adding marketing sections to the single page.

---

## /edit-copy

- **Prompt**:
  > In `src/components/{{Section}}.tsx`, change `{{what}}` to `{{new_value}}`. Keep the
  > existing layout, classes, and structure. Don't touch other files. Run lint + build.
- **Placeholders**: `{{Section}}`, `{{what}}`, `{{new_value}}`.
- **Expected output**: Minimal diff to one section, gates green.
- **When to use**: Copy/text tweaks.

---

## /fix-tests

- **Prompt**:
  > `npm run test` is failing. Reproduce, find the root cause, and fix it (fix the code if
  > it regressed, or the test if it's stale). Do not skip or weaken tests. Mock any network
  > calls. Show me the failure and the fix.
- **Placeholders**: none (optionally `{{test_path}}`).
- **Expected output**: Green suite + root-cause explanation.
- **When to use**: Test failures / adding coverage.

---

## /review-diff

- **Prompt**:
  > Review my current `git diff` against AGENTS.md conventions and the repo pitfalls
  > (generated files, git-tracked `.env`, no-unused-vars disabled, routes above `*`).
  > List must-fix vs. nice-to-have. Don't change code. Confirm lint/test/build status.
- **Placeholders**: optional `{{pr_number}}`.
- **Expected output**: Prioritized review findings + gate results.
- **When to use**: Before committing or opening a PR.

---

## /pre-deploy

- **Prompt**:
  > Run the pre-deploy checklist: `npm ci`, lint, test, build, then `npm run preview` and
  > report console errors. Verify nothing sensitive was added to `.env`. Give me a go/no-go.
  > Do NOT publish — I'll trigger Lovable Publish myself.
- **Placeholders**: none.
- **Expected output**: Go/no-go with evidence.
- **When to use**: Before a release.

---

## /add-ui

- **Prompt**:
  > I need `{{primitive_or_form}}` in `{{location}}`. First check `src/components/ui/` for
  > an existing primitive and reuse it. If a new shadcn component is required, confirm with
  > me before installing. For forms use react-hook-form + zod. Then lint + build.
- **Placeholders**: `{{primitive_or_form}}`, `{{location}}`.
- **Expected output**: UI wired with existing primitives, gates green.
- **When to use**: Shared UI elements / forms.

---

## /explain-repo

- **Prompt**:
  > Summarize this repo's architecture, the section-based page composition, build/test/lint
  > commands, and the top 3 pitfalls an agent should know. Cite files.
- **Placeholders**: none.
- **Expected output**: Concise architecture summary citing real paths.
- **When to use**: Onboarding / sanity-checking Codex's context.
