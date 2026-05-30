---
name: test-repair
description: >-
  Diagnose and fix failing or flaky Vitest tests, or add tests for new/changed
  behavior. Use when `npm run test` fails or when a change needs test coverage.
  Do NOT use to disable/skip tests just to make CI green, or to weaken assertions
  to hide a real regression.
---

## Purpose

Keep the Vitest + Testing Library suite green by fixing the underlying cause, not by
masking it. Test setup lives in `src/test/setup.ts`; config in `vitest.config.ts`
(jsdom env, globals on, `@` alias, includes `src/**/*.{test,spec}.{ts,tsx}`).

## Inputs needed

- The failing test output (`npm run test`).
- The component/module under test and the intended behavior.

## Steps

1. Run `npm run test` and read the full failure (file, assertion, stack).
2. Reproduce narrowly: `npx vitest run <path-to-test>`.
3. Decide root cause:
   - **Test is wrong / stale** → update the test to match correct intended behavior.
   - **Code regressed** → fix the source so the original assertion passes.
   - **Environment gap** (e.g., missing browser API) → extend `src/test/setup.ts`
     (note `window.matchMedia` is already polyfilled there).
4. For new behavior, add a focused test next to existing ones using Testing Library
   queries and `@testing-library/jest-dom` matchers.
5. Re-run until green.

## Validation

```sh
npm run test       # full suite green
npm run lint       # no new lint errors
```

## Failure handling

- Flaky/timing issues → prefer `findBy*`/`waitFor` over fixed timeouts.
- jsdom missing an API → add a minimal polyfill in `setup.ts`, scoped and documented.
- If a test reveals a real product bug, surface it; do not silence it.

## Security constraints

- Never put real secrets/tokens in tests or fixtures — use obvious fakes.
- Don't hit live Supabase/Formspree from tests; mock network calls.

## Example prompts

- "`npm run test` fails after my Hero change — diagnose and fix the root cause."
- "Add a test verifying the waitlist form shows the success state after a 200 response
  (mock the fetch)."
