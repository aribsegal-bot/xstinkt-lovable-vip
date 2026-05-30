# MCP / Tool-Integration Migration

## Summary

**The repository defines no MCP servers and no in-repo tool integrations.** There is no
`.mcp.json`, no `.claude/` MCP block, and no equivalent. So there is nothing to migrate
1:1.

> Note: any MCP servers visible in your assistant environment (calendar, design,
> deployment, etc.) are attached to **your personal Codex/Claude account**, not to this
> repository. They are out of scope for a repo migration and are intentionally not
> documented or copied here.

Two *external integrations* exist in the code and are documented below for awareness, plus
one **optional** MCP server you might choose to add.

---

## 1. Supabase (optional MCP — not currently configured)

| Field | Value |
|-------|-------|
| Server name | `supabase` |
| Purpose | Let Codex inspect/manage the Supabase project the app connects to (tables, types, policies). |
| Current Claude config location | None — does not exist. |
| Proposed Codex config | `[mcp_servers.supabase]` stub in `codex_config.toml.draft` (commented out). |
| Required env vars | `SUPABASE_ACCESS_TOKEN` (name only — never inline). Project ref from `supabase/config.toml`. |
| Auth method | Personal access token via environment variable. |
| Security review notes | Start with `--read-only`. Do not hardcode the token. The repo's Supabase **publishable** key (in `.env`) is client-safe; a Supabase **access token** is NOT and must never be committed. `SENSITIVE_REVIEW_REQUIRED` before enabling write access. |
| Validation command/prompt | After enabling: ask Codex *"List the Supabase MCP tools you can call and run a read-only `list tables` against project `<SUPABASE_PROJECT_REF>`."* Expect a tool list and a read-only result, no writes. |

**Whether to enable:** only if you intend to grow Supabase into a real backend. Today the
client is barely used, so this is optional.

---

## 2. Formspree (external HTTP integration — not an MCP)

| Field | Value |
|-------|-------|
| Where | `src/components/HeroSection.tsx` — `fetch("https://formspree.io/f/<form-id>", …)`. |
| Purpose | Receives waitlist email submissions. |
| Migration action | None. It's a plain client-side POST, not a tool integration. |
| Security notes | The form id is a public identifier, not a secret. Spam/abuse protection is configured on Formspree's side, outside this repo. Do not change the endpoint without confirming intent. |
| Validation | Manual: submit the form in `npm run dev` and confirm a `2xx` response / success state. |

---

## Recommendation

No MCP migration is required to use Codex with this repo. Add the Supabase MCP stub only
if/when backend work begins, and keep it read-only and env-var-authenticated.
