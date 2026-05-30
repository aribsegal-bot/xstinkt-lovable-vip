# Hooks Migration

## Current state

**No Claude hooks exist** (no `.claude/settings.json` hooks, no `SessionStart`/`PreToolUse`/
`PostToolUse` config). There is nothing to migrate 1:1.

The repo's `package.json` scripts do, however, imply a couple of useful lifecycle moments
that you *could* automate with Codex hooks. All drafts below are **optional** and
conservative.

## Recommendation per candidate

| Candidate hook | Trigger | Action | Recommendation |
|---|---|---|---|
| Session bootstrap | Session start | Ensure deps installed (`npm ci` if `node_modules` missing) | **Migrate (optional, safe).** Useful for fresh/ephemeral environments. |
| Pre-commit gate | Before commit / on stop | `npm run lint && npm run test` | **Rewrite as guidance, not an auto-hook.** Better run by the agent/skill so failures are visible; auto-running can slow every action. |
| Pre-build typecheck | Before build | `npx tsc --noEmit` | **Optional.** No typecheck script exists; add only if you want a strict gate. |
| Secret guard | Before commit | Block commits that add new secret-looking values to `.env` | **Manual review — risky to automate.** Mark `SENSITIVE_REVIEW_REQUIRED`. |

## Safe optional hook drafts

> Codex hook configuration syntax varies by version. Treat these as the *intent*; adapt to
> your Codex hooks format. Keep them advisory and fast.

**1. Session bootstrap (safe):**

```sh
# Run once when a session starts, only if deps are missing.
if [ ! -d node_modules ]; then
  npm ci
fi
```

**2. Pre-flight check (run manually or via the release-deploy skill, not on every action):**

```sh
npm run lint && npm run test
```

## Do NOT auto-hook

- Anything that **reads or echoes `.env`** — risk of leaking the git-tracked secrets.
- Auto-publish/deploy steps — deployment is a human-triggered Lovable action.
- Auto-`git push` or auto-commit — keep commits human-reviewed.

Anything touching secrets or deployment is marked `SENSITIVE_REVIEW_REQUIRED` and should
stay manual.
