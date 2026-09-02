# Add GitHub Pages deployment workflow

## Goal
Set up automatic deployment of this portfolio to GitHub Pages whenever `main` is pushed.

## Why this needs care
This is a TanStack Start v1 app (full-stack React with SSR/server functions). GitHub Pages only serves static files, so the build must be configured to output a static site and to serve assets from a repository subdirectory.

## What will change

1. **Vite base path**
   - Update `vite.config.ts` so `base` can be injected via an env var (e.g. `VITE_BASE_PATH`).
   - Default to `/` for local/preview builds; the workflow will set it to `/<repo-name>/` for Pages.

2. **Static generation**
   - Ensure the build produces static HTML/JS/CSS that GitHub Pages can serve.
   - TanStack Start's Nitro build can be configured for static output; the workflow will run the standard `vite build` and use the generated `dist/` (or `.output/public/`) folder as the Pages artifact.

3. **GitHub Actions workflow**
   - Create `.github/workflows/deploy.yml`.
   - Triggers: push to `main`, manual dispatch.
   - Steps:
     - Check out `main`.
     - Install dependencies (Bun).
     - Run `bun run build` with `VITE_BASE_PATH` set from `github.event.repository.name`.
     - Upload the build output as a Pages artifact.
     - Deploy to GitHub Pages via `actions/deploy-pages`.

4. **Package.json helper (optional)**
   - Add a `build:gh` script that builds with the correct base path for local testing.

5. **Verification**
   - Run the build locally with the Pages base path to confirm no 404 asset paths.
   - Check that internal links use TanStack Router's `<Link>` (relative routing) so the base path is respected.

## Open question
What is the GitHub repository name? The workflow can auto-detect it from `github.event.repository.name`, but if you want to preview the exact base path locally, please confirm the repo slug (e.g. `christopher-zarraga-portfolio`).

## Expected result
Pushing to `main` triggers the workflow and deploys the site to `https://<username>.github.io/<repo-name>/`.
