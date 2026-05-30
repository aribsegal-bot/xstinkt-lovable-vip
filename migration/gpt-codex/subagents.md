# Proposed Codex Subagents

No subagents exist today. The repo is small, so keep the roster lean. These are optional
specialized agents that map cleanly onto the recurring workflows in this repo. Spawn them
only when a task clearly fits; otherwise the main agent + `AGENTS.md` is enough.

---

## 1. frontend-builder

- **Role**: Implement UI/section changes following the Tailwind + shadcn-ui conventions.
- **When to spawn**: Adding/editing landing sections, wiring forms, layout/styling work.
- **Tools needed**: File read/write, shell (`npm run dev/lint/test/build`).
- **Model/reasoning**: Standard Codex model, medium reasoning. Visual/iterative work.
- **Boundaries**: Must not edit generated files (`src/integrations/supabase/*`,
  `src/components/ui/*`) without explicit instruction; no new deps without approval; no
  secret handling.
- **Expected output**: Working component(s) wired into `Index.tsx`/`App.tsx`, lint/test/
  build green, short change summary.

---

## 2. test-runner

- **Role**: Run, diagnose, and repair the Vitest suite; add focused tests.
- **When to spawn**: After a behavior change, or when `npm run test` fails.
- **Tools needed**: Shell (`vitest`), file read/write.
- **Model/reasoning**: Standard model, medium reasoning.
- **Boundaries**: Never skip/weaken tests to force green; mock network (no live
  Supabase/Formspree); fakes only for any secret-like values.
- **Expected output**: Green suite, root-cause explanation, any new tests.

---

## 3. code-reviewer

- **Role**: Read-only review of a diff/PR against `AGENTS.md` conventions and repo pitfalls.
- **When to spawn**: Before opening/merging a PR.
- **Tools needed**: Read-only file access, `git diff`, shell to run gates.
- **Model/reasoning**: Higher reasoning effort for thorough correctness review.
- **Boundaries**: Does not modify code; reports findings. Flags secret exposure without
  echoing values.
- **Expected output**: Prioritized findings (must-fix vs. nice-to-have) + gate results.

---

## 4. security-auditor (read-only)

- **Role**: Check for leaked secrets, unsafe `VITE_`-exposed values, and the known
  `.env`/`public/` exposure risks.
- **When to spawn**: Before a release, or when env/config/secret-adjacent files change.
- **Tools needed**: Read-only file access, `git ls-files`, grep.
- **Model/reasoning**: Standard model; careful, conservative.
- **Boundaries**: **Read-only.** Never prints secret values; references env-var names
  only. Escalates `SENSITIVE_REVIEW_REQUIRED` items to the human.
- **Expected output**: A short risk report (e.g., "`.env` is git-tracked", "new `VITE_`
  var looks sensitive") with recommended actions.
