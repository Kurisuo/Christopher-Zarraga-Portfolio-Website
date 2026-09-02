# Fix nav clearance and surface key portfolio copy

## Navigation collision

- Give the floating pill an explicit semantic surface matching `#0F0D14`, retain a visible 1px border, and keep it above page content with a high z-index.
- Standardize every anchored portfolio section (`top`, `origin`, `ucsc`, `work`, and `contact`) to at least 120px of `scroll-margin-top`; section 03 currently has no scroll margin, while sections 02 and 04 use only 112px.
- Preserve the pill’s existing fixed position and icon navigation while ensuring anchor and scroll-snap landings leave each eyebrow and heading clear beneath it.

## Collapsed project metrics

- Render each project metric directly below its collapsed blurb in `BuildLogCard`, using 12px monospace accent text.
- Keep the expanded region limited to the full description and optional GitHub link so the metric is not duplicated.
- Replace the six displayed metric strings with the exact shortened copy supplied:
  - AIEA Lab — `SAC & DDPG · Kubernetes GPU cluster`
  - Tech4Good Lab — `4 goal-tracking components`
  - Neural Inference Engine — `100% PyTorch agreement · ~24,000 img/s`
  - VeriFi — `0.36ms p50 · 250k vectors · 33k chunks/sec`
  - NVPilot — `~550ms perception · ~3s rollback`
  - Multi-Threaded HTTP Server — `~8,400 req/s · 2.2× single-threaded`
- Preserve equal collapsed card heights, row-local hover expansion, full descriptions, and GitHub links.

## Text corrections

- Change the hero hobbies wording to `shoot 18–55mm` with an en dash and no surrounding spaces.
- In section 02 slide one, remove “There's more — click through the photos!” from the body paragraph and render it as a separate, non-bold muted monospace line beneath that paragraph, matching the site’s caption treatment.

## Verification

- Run the production build.
- Check anchor clicks and slow manual scrolling through sections 01–04 at desktop and mobile widths, confirming section labels/headings do not land beneath the pill and underlying text is not visible through it.
- Confirm all six metrics are visible before expansion, cards remain equal height while collapsed, and expanded cards retain their descriptions and links.
- Confirm the corrected lens text and the separately styled section 02 prompt.