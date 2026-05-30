---
name: code-review
description: >-
  Review a pending diff (working tree or a PR) before merge for correctness,
  convention adherence, and the repo's known pitfalls. Use before opening/merging
  a PR or when asked to review changes. Do NOT use to author large new features —
  this is a review pass, not an implementation pass.
---

## Purpose

Provide a focused review tuned to this Vite/React/TS/Tailwind/shadcn repo and its
specific risks (generated files, git-tracked `.env`, Lovable round-tripping).

## Inputs needed

- The diff: `git diff` (working tree) or the PR branch/number.
- The intended behavior change.

## Steps

1. Get the diff: `git diff` or `git diff main...HEAD`.
2. Check correctness: logic, React hook rules, error handling, async/`fetch` handling.
3. Check conventions (per `AGENTS.md`):
   - `@/` import alias used; Tailwind utilities + `cn()`; reuse of `ui/*` primitives.
   - New routes added **above** the `*` catch-all in `src/App.tsx`.
   - New sections registered in `src/pages/Index.tsx`.
4. Check the repo's pitfalls:
   - No edits to generated files (`src/integrations/supabase/*`, `src/components/ui/*`).
   - No secrets added; no new values in `.env`; client vars are `VITE_`-prefixed & safe.
   - No unrelated reformatting / churn (Lovable mirrors the repo).
   - Remember `no-unused-vars` is disabled — manually flag obvious dead code.
5. Verify gates pass: `npm run lint`, `npm run test`, `npm run build`.
6. Summarize findings as must-fix vs. nice-to-have; keep comments specific and few.

## Validation

```sh
npm run lint && npm run test && npm run build
```

## Failure handling

- If the diff is large/ambiguous, ask for intent before judging correctness.
- Distinguish real bugs from style nits; don't block on subjective preferences.

## Security constraints

- Read-only by default — propose changes, don't silently rewrite unrelated code.
- Call out any secret/credential exposure immediately and do not echo the values.

## Example prompts

- "Review my current `git diff` against the conventions in AGENTS.md and list must-fix
  issues."
- "Review PR #N for correctness and whether it touches any generated files."
