# Codex Migration Pack

This folder contains **draft** artifacts to migrate this repository's AI-assistant
setup from Claude Code to OpenAI Codex. Nothing here is wired into the live tool yet —
every file is a draft for you to review, edit, and then apply manually.

> No production source code was modified, no packages were installed, no commands were
> run against the live project, and nothing was committed by the inspection that
> produced this pack.

## What was found in this repo

| Area | Finding |
|------|---------|
| Claude config | **None.** No `CLAUDE.md`, no `.claude/` folder, no settings, slash commands, hooks, skills, plugins, or subagents exist. |
| MCP config | **None in the repo.** No `.mcp.json` or equivalent. (The connected MCP servers you may see belong to your *personal Codex/Claude environment*, not this repository.) |
| Tech stack | Vite + React 18 + TypeScript + shadcn-ui (Radix UI) + Tailwind CSS. Maintained via [Lovable.dev](https://lovable.dev). |
| Backend | Supabase JS client is configured (`src/integrations/supabase/`) but currently only lightly used. The waitlist form posts to a third-party Formspree endpoint. |
| Package manager | npm (`package-lock.json` present). |
| Scripts | `dev`, `build`, `build:dev`, `lint`, `preview`, `test`, `test:watch`. No dedicated typecheck or format script. |
| Tests | Vitest + Testing Library + jsdom. One placeholder test. |
| CI / Docker / Make | None present. |
| Issue/PR templates | None present. |

Because there are **no existing Claude artifacts to convert**, this pack is effectively a
**greenfield Codex onboarding** for the repo: it captures the durable repo knowledge
(stack, commands, conventions, pitfalls) that an AI agent needs, expressed in Codex's
formats (`AGENTS.md`, skills, config).

## What was created

| File | Purpose |
|------|---------|
| `README.md` | This file. |
| `repo_inventory.md` | Full inventory: stack, commands, directories, workflows, risks, unknowns. |
| `claude_to_codex_map.md` | Mapping table of Claude artifacts → Codex destinations (mostly "none → new"). |
| `AGENTS.md.draft` | Draft repository-level `AGENTS.md` for Codex. |
| `codex_config.toml.draft` | Draft Codex `config.toml` (optional MCP stubs + env var placeholders). |
| `mcp_migration.md` | MCP/tool-integration notes (repo has none; documents optional Supabase MCP). |
| `skills/*/SKILL.md` | Draft Codex skills for recurring workflows. |
| `subagents.md` | Proposed Codex subagents. |
| `hooks_migration.md` | Lifecycle-hook analysis (none exist; safe optional drafts). |
| `prompt_templates.md` | Reusable Codex prompt templates (slash-command replacements). |
| `validation_plan.md` | Exact commands/prompts to validate the migration + rollback. |
| `apply_migration.sh.draft` | **Commented, non-executable** draft script to copy drafts into place. |

## How to apply the migration safely

1. **Review every draft.** Edit wording, remove anything inaccurate, and resolve any
   `SENSITIVE_REVIEW_REQUIRED` markers.
2. **Address the security findings first** (see `repo_inventory.md` → Risk areas).
   In particular, decide what to do about the git-tracked `.env`.
3. **Apply `AGENTS.md`**: copy `AGENTS.md.draft` to the repo root as `AGENTS.md`.
4. **Apply skills** (optional): copy `skills/<name>/SKILL.md` into your Codex skills
   location (project-level `.codex/skills/` or your user-level skills dir, per your
   Codex setup).
5. **Apply config** (optional): merge relevant lines from `codex_config.toml.draft`
   into your Codex `config.toml`. Do **not** paste secrets — use env vars.
6. **Validate** using `validation_plan.md`.
7. The draft `apply_migration.sh.draft` automates steps 3–4 but ships fully commented.
   Read it, uncomment what you want, rename to `apply_migration.sh`, then run.

## Security note

All drafts reference secrets only by environment-variable **name**
(e.g. `<OPENAI_API_KEY>`, `VITE_SUPABASE_*`). No secret values, tokens, or credentials
were copied into this pack. Items needing human judgment are tagged
`SENSITIVE_REVIEW_REQUIRED`.
