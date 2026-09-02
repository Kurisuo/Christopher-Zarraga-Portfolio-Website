# Fix the GitHub Pages deployment

## What I can and can't see from here

This sandbox is connected to the Lovable git remote, not to your GitHub repo. I can't read Actions run logs or the repo's Pages source setting from here, so I won't guess at them. What I verified directly in the code:

- The workflow file is correctly at `.github/workflows/deploy.yml` (not the repo root), and it is committed to git.
- The build itself works locally: `bun run build:gh` prerenders `/` and emits `dist/client/index.html`, which is exactly the folder the upload step points at. So `failOnError: true` in `vite.config.gh.ts` is not currently killing the build — no route errors during prerender.
- `bunfig.toml` does set `minimumReleaseAge = 86400`. That only breaks `bun install --frozen-lockfile` if a dependency in the lockfile was published in the last 24 hours. It is a plausible but unverified failure cause; the workflow log will say so explicitly if it is.
- The Pages source setting (Settings → Pages → Build and deployment) is not visible from here. `actions/deploy-pages` requires it to be **GitHub Actions**. If it is set to a branch, `deploy-pages` fails with a "Pages site not configured / not using GitHub Actions" error, and nothing ever publishes. Please check that and tell me what it says — that is the single most likely cause of a "site doesn't load / 404" outcome.

## A real bug I did find

Every image on the site comes from Lovable asset pointers whose URLs are **absolute** (`/__l5e/assets-v1/.../file.jpg`). On GitHub Pages the site is served from `/<repo-name>/`, so even with the mirror step those absolute paths resolve to `username.github.io/__l5e/...` and 404. Images would be broken on Pages regardless of whether the workflow succeeds.

## Changes to make

1. **Commit the 7 used assets into `public/`.** Download them once from the CDN and store them at `public/media/`:
   - `hobby-sunset.jpg`, `hobby-chess.jpg`, `hobby-swim.jpg` (Hero)
   - `sabatte-cohort.jpg`, `slide-yc-expo.jpg`, `slide-berkeley-regents.jpg`, `slide-shpe-2026.webp` (section 02)

2. **Point the code at local paths, base-path aware.** Add a tiny `src/lib/media.ts` exporting `media(name)` that returns `` `${import.meta.env.BASE_URL}media/${name}` ``. Update `Hero.tsx` and `UCSC.tsx` to use it instead of the `.asset.json` imports. This works on both Lovable hosting (base `/`) and Pages (base `/<repo>/`).

3. **Delete the "Mirror Lovable assets" step** from `.github/workflows/deploy.yml`. No more build-time dependency on the preview URL.

4. **Leave the unused `.asset.json` pointers alone** (resume, tech logos, lichess gif are not referenced by any component) so nothing else breaks.

5. **Small robustness tweak:** keep `failOnError: true` but note in the workflow that any prerender error will fail the Build step with the route name in the log.

Nothing is force-pushed; this is an ordinary forward commit.

## What you need to do

- Open Settings → Pages and confirm **Source = GitHub Actions**. If it says "Deploy from a branch", switch it — that alone breaks this workflow.
- If the Actions run is red, paste the failing step name and the last ~20 lines of its log and I'll fix the exact error (most likely candidates: `bun install --frozen-lockfile` hitting the 24h release-age guard, or `deploy-pages` refusing due to the Pages source setting).

## Technical notes

- `VITE_BASE_PATH` is already wired to `/${{ github.event.repository.name }}/`, so `import.meta.env.BASE_URL` is correct on Pages.
- Bundler-imported images (`portrait.jpg`, resume PNG) already get base-prefixed by Vite; only the pointer-JSON URLs were absolute.
- If the release-age guard does turn out to be the failure, the fix is to drop `--frozen-lockfile` guard interaction by pinning: I'd add the offending package to `minimumReleaseAgeExcludes` only after confirming with you.
