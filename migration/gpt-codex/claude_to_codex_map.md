# Claude → Codex Artifact Map

> **Headline:** This repo contains **no Claude-specific artifacts**. There is no
> `CLAUDE.md`, `.claude/` folder, settings file, slash command, hook, skill, plugin,
> subagent, or in-repo MCP config to convert. The table below records that fact and maps
> each *category* to the Codex destination where new, equivalent guidance has been drafted
> in this pack.

| Source file/path | Purpose | Codex destination | Migration status | Notes | Security concerns |
|---|---|---|---|---|---|
| `CLAUDE.md` | (does not exist) | `AGENTS.md` (root) | manual / new | No Claude memory file existed. Drafted fresh `AGENTS.md.draft` from repo inspection. | None — drafted content contains no secrets. |
| `.claude/settings*.json` | (does not exist) | `~/.codex/config.toml` / project config | do not migrate | Nothing to migrate. Useful defaults drafted in `codex_config.toml.draft`. | None. |
| `.mcp.json` / MCP server config | (does not exist in repo) | Codex `config.toml` `[mcp_servers]` | manual / new | Repo defines no MCP servers. Optional Supabase MCP stub provided. See `mcp_migration.md`. | Any MCP server added must use env-var auth, never inline tokens. |
| Claude slash commands | (do not exist) | Codex skills + prompt templates | transform / new | No commands existed. Recurring workflows captured as skills (`skills/`) and `prompt_templates.md`. | None. |
| Claude hooks | (do not exist) | Codex hooks or external scripts | do not migrate | No hooks existed. Optional safe lifecycle-hook drafts in `hooks_migration.md`. | Hook commands must not echo `.env` contents. |
| Claude subagents/agents | (do not exist) | Codex subagents | manual / new | None existed. Proposed agents in `subagents.md`. | Security-auditor agent should be read-only by default. |
| Claude skills/plugins | (do not exist) | Codex skills/plugins | manual / new | None existed. Drafted skills under `skills/`. | None. |
| Memory / project notes | (none beyond `README.md`) | `AGENTS.md` (durable bits only) | transform | Pulled durable, repo-specific facts (commands, conventions) into `AGENTS.md.draft`; left how-to-edit-in-Lovable prose in `README.md`. | None. |
| `README.md` | Lovable boilerplate + edit/deploy instructions | Keep as-is; reference from `AGENTS.md` | do not migrate | Stays a standalone reference. Not duplicated into `AGENTS.md`. | Contains `lovable.dev/projects/REPLACE_WITH_PROJECT_ID` placeholders — already redacted in source. |
| `package.json` scripts | dev/build/lint/test/preview | `AGENTS.md` "Commands" + skills | direct | Commands transcribed verbatim into `AGENTS.md.draft`. | None. |
| `eslint.config.js`, `vitest.config.ts`, `tsconfig*` | lint/test/TS config | Referenced in `AGENTS.md` conventions | direct | Conventions summarized, not copied. | None. |
| `.env` | Supabase client env vars | `codex_config.toml.draft` (names only) | manual | Only variable **names** referenced. **`.env` is git-tracked — flag.** | `SENSITIVE_REVIEW_REQUIRED` — see `repo_inventory.md`. Never copy values. |
| `supabase/config.toml` | Supabase project id | `mcp_migration.md` notes | unknown | Project id present; backend scope unclear. | Project id is an identifier; treat as semi-public but review. |
| `src/integrations/supabase/*` | Generated client + types | "Generated files" pitfall in `AGENTS.md` | direct (as guidance) | Marked do-not-edit in `AGENTS.md.draft`. | None. |
| `.github/` templates, CI | (do not exist) | n/a | do not migrate | None present; nothing to convert. | None. |
| `public/` duplicated source | Lovable artifact | n/a | do not migrate | Flagged as risk; not an AI artifact. | `SENSITIVE_REVIEW_REQUIRED` — possible source exposure via static dir. |
