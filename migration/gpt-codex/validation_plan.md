# Migration Validation Plan

Run these after applying `AGENTS.md` (and any skills/config) to confirm Codex is correctly
onboarded. Each item lists either a shell command or a prompt to give Codex.

## 1. Confirm which instructions Codex loaded

> **Prompt:** "Which instruction/config files did you load for this repo (AGENTS.md,
> skills, config.toml)? Quote the project overview line from AGENTS.md and list the skills
> you can see."

Expect it to name `AGENTS.md` and the `skills/*` you installed, and echo the xstinkt
overview line.

## 2. Summarize repo architecture

> **Prompt:** "Summarize this repo's architecture, how the landing page sections are
> composed, and the package manager + key commands. Cite files."

Expect: Vite/React/TS/shadcn/Tailwind, npm, `Index.tsx` composing `*Section.tsx`
components, `App.tsx` router, commands from `package.json`.

## 3. Make a tiny safe change

> **Prompt:** "Make a trivial, safe change: update a code comment in
> `src/pages/Index.tsx`, then show me the diff. Don't touch anything else."

Expect a one-line diff, no churn elsewhere.

## 4. Run tests + lint

```sh
npm install      # or npm ci
npm run lint
npm run test
npm run build
```

> **Prompt alternative:** "Run lint, test, and build and report results."

Expect all to pass (one placeholder test exists).

## 5. Review its own diff

> **Prompt:** "Review the diff you just made against AGENTS.md conventions and the repo
> pitfalls. Confirm it touches no generated files and adds no secrets."

Expect a short clean review and revert/keep recommendation.

## 6. Verify MCP / tools (only if you enabled the optional Supabase MCP)

> **Prompt:** "List the MCP tools you can call. If the Supabase MCP is configured, run a
> read-only `list tables` against project `<SUPABASE_PROJECT_REF>`."

Expect a tool list and a read-only result — **no writes**. If you did not enable any MCP,
expect "no MCP servers configured," which is correct for this repo.

## 7. Verify secret hygiene

```sh
git ls-files .env        # currently returns .env (tracked) — known finding
grep -rIl "VITE_SUPABASE" src   # client usage only, by variable name
```

> **Prompt:** "Confirm you will reference secrets only by env-var name and never print
> `.env` values."

## Rollback instructions

Nothing in this pack modifies the repo until you copy files out of `migration/gpt-codex/`.
To roll back an applied migration:

1. **AGENTS.md**: `git rm AGENTS.md` (or `git checkout -- AGENTS.md` if it previously
   existed) — it's a new untracked/added file, so deleting it fully reverts step 3.
2. **Skills/config**: remove the copied `SKILL.md` files from your Codex skills dir and
   revert any lines you merged into `config.toml`.
3. **The pack itself**: delete the `migration/gpt-codex/` folder; since nothing was
   committed by the inspection, `git status` / `git clean -nd migration/` shows exactly
   what would be removed.
4. No production source, dependencies, or `.env` were changed by this migration, so there
   is nothing else to undo.
