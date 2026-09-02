# Section 03 — Replace terminal panels with expandable text descriptions

## What changes

Rework the six build-log cards in `src/components/portfolio/MoreProjects.tsx` / `BuildLogCard.tsx` so hover-expansion reveals a text description instead of a code terminal. The grid expansion animation (hovered card grows, siblings compress, 350ms ease, others fade to 60%) stays exactly as-is.

## Card structure

- Collapsed: monospace tech-stack label (tag), project name, one-line description.
- Expanded: all of the above + description paragraph + monospace metric line in accent purple + "View on GitHub ↗" link (new tab) at the bottom.
- All six cards equal height when collapsed; only one expands at a time.
- Keep existing card borders, radius, and hover states.

## Card content (all verbatim from your message)

Row 1:
1. **AIEA Lab** — Python / Stable-Baselines3 / CARLA — no GitHub link
2. **Tech4Good Lab** — Angular / Firebase / RxJS — no GitHub link
3. **Neural Inference Engine** — C++17 / PyTorch (replaces "Current Studies") — github.com/Kurisuo/neural-inference-engine

Row 2:
4. **VeriFi** — C++17 / RAG — github.com/Kurisuo/VeriFi
5. **NVPilot** — TypeScript / NVML — github.com/Kurisuo/NVPilot
6. **Multi-Threaded HTTP Server** — C / POSIX — github.com/Kurisuo/multithreaded-http-server

Each card gets its supplied collapsed blurb, expanded paragraph, and metric line, verbatim.

## Typography

- Description paragraphs: 14.5px, line-height 1.65, color #B4B4BC
- Metric lines: monospace 12.5px, accent purple
- Tech-stack label, name, blurb: unchanged from current styling

## Technical details

- In `BuildLogCard.tsx`: remove the `CodeCard`/terminal expanded region; add expanded region with description paragraph, metric line, and optional `href` (external link, `target="_blank" rel="noreferrer"`). Reuse the existing grid-rows expansion animation.
- In `MoreProjects.tsx`: replace the `projects` data array — drop `code`, add `description`, `metric`, optional `href`; swap Current Studies → Neural Inference Engine; keep row layout, Reveal, expansion state, and opacity logic untouched.
- `CodeCard` stays in the codebase (used elsewhere); just no longer used by these cards.
- Verify with a production build and a browser pass confirming hover expansion, one-open-at-a-time, and 60% fade behavior.
