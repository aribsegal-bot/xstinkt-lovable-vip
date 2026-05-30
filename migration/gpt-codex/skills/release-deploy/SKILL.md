---
name: release-deploy
description: >-
  Run the pre-deploy verification checklist and prepare the site for release.
  Use before publishing the landing site (via Lovable Publish) or cutting a
  build. Do NOT use this skill to perform the actual external publish or to
  push to production without explicit human confirmation.
---

## Purpose

There is no CI/CD pipeline in the repo; deployment happens via **Lovable → Share →
Publish**. This skill makes sure the codebase is healthy before a human triggers that
publish, so the deployed build is clean.

## Inputs needed

- Confirmation of what's being released (branch/commit).
- Confirmation that a human will perform the actual Lovable publish.

## Steps

1. Ensure a clean tree on the intended branch: `git status`.
2. Install deps deterministically: `npm ci`.
3. Run the gates:
   ```sh
   npm run lint
   npm run test
   npm run build
   ```
4. Smoke-test the production build locally:
   ```sh
   npm run preview      # serve dist/ and click through the page
   ```
5. Sanity checks specific to this site:
   - Waitlist form submits and shows the success state (Formspree reachable).
   - All sections render in the correct order on desktop and mobile widths.
   - No secrets newly added to `.env`; `.env` not expanded with sensitive values.
6. Summarize a go/no-go. **Stop here** — the human performs the Lovable publish.

## Validation

- `npm run build` exits 0 and `dist/` is produced.
- `npm run preview` serves the page without console errors.

## Failure handling

- Build fails → fix types/imports before proceeding; do not publish a broken build.
- If the form endpoint is unreachable, flag it but it doesn't block the static deploy.

## Security constraints

- Never publish or commit secret values. `.env` is git-tracked — verify nothing sensitive
  was added before release. `SENSITIVE_REVIEW_REQUIRED` if `.env` changed.
- Do not trigger the external publish autonomously; require explicit human sign-off.

## Example prompts

- "Run the pre-deploy checklist and tell me if we're good to publish."
- "Build and preview the production bundle and report any console errors."
