# GitHub Pages deploy: close out the remaining gaps

## What I verified just now

- The seven images are committed: `public/media/` contains `hobby-sunset.jpg`, `hobby-chess.jpg`, `hobby-swim.jpg`, `sabatte-cohort.jpg`, `slide-yc-expo.jpg`, `slide-berkeley-regents.jpg`, `slide-shpe-2026.webp`.
- `Hero.tsx` and `UCSC.tsx` reference them through `media(...)`, which is base-path aware. So Claude's first worry (images 404 after removing the mirror step) does not apply — they are in the repo.
- `deploy.yml` has no `configure-pages` step. Confirmed.
- `tsconfig.json` includes `vite.config.ts` only, not `vite.config.gh.ts`. Confirmed.
- Versions are bleeding-edge as described (`vite 8.1.5`, `nitro 3.0.260603-beta`, `rolldown` override `1.2.1`) and `bunfig.toml` sets `minimumReleaseAge = 86400`. Whether that actually breaks CI install is **unverified** — only the run log can say.

I cannot read your Actions run logs or the repo's Pages source setting from this sandbox, so I will not guess which one is red.

## Changes to make

1. **Add `actions/configure-pages@v5`** to the `build` job, before the build step. This sets the Pages deployment context and is the most likely reason a run goes green while nothing publishes.

2. **Add a `.nojekyll` file** to `public/`. GitHub Pages runs Jekyll by default and drops paths starting with `_`; `.nojekyll` disables that. Cheap insurance.

3. **Add an SPA fallback**: copy `dist/client/index.html` to `dist/client/404.html` in the workflow after the build, so deep links and refreshes don't hit GitHub's own 404 page.

4. **Fix `tsconfig.json`** to include `vite.config.gh.ts` alongside `vite.config.ts`.

5. **Make CI install resilient**: keep `bun install --frozen-lockfile`, but set `BUN_CONFIG_MINIMUM_RELEASE_AGE=0` (or the equivalent flag) for the install step only, so the 24h supply-chain guard cannot fail a CI install of already-locked versions. Local installs keep the guard.

## What I still need from you

One of these collapses the guesswork to the actual cause:

- If the Actions run is **red**: the name of the failing step and its last ~20 log lines.
- If the run is **green** but the site is broken: whether the URL shows GitHub's 404 page, a blank white page, or unstyled text — those are three different bugs.
- The value of **Settings -> Pages -> Build and deployment -> Source**. It must be **GitHub Actions**; if it says "Deploy from a branch", `deploy-pages` cannot publish no matter what else is correct.

## Technical notes

- No history rewriting, no force-push — ordinary forward commits only.
- `failOnError: true` stays. Prerender of `/` succeeds locally with the current `server.ts` entry, so the server-entry risk Claude raised is not currently firing; if CI ever differs, the log names the route.
- Dependency versions stay pinned as-is. Downgrading Vite/Nitro is not on the table until a log actually implicates them.
