# Fix section 03 card expansion

## Bug 1 — hover expands the whole column

Today all six cards live in one CSS grid whose `grid-template-columns` animates on hover. Column widths apply to both rows, so hovering "AIEA Lab" also widens "VeriFi".

Fix: split the six cards into two independent rows. Each row is its own flex container (`display: flex` with the existing gap), each card `flex: 1 1 0`. The hovered card animates to `flex-grow: 2`; siblings in that row stay at 1. Transition `flex-grow` over 350ms `cubic-bezier(0.4, 0, 0.2, 1)`. Below `lg`, rows stack to a single column and no expansion sizing applies.

Only one card is expanded at a time (single `active` state, unchanged), and mouse-out restores the default with the same easing. Non-active cards stay at 60% opacity while another card is open.

## Bug 2 — empty code panels

Make the code snippet optional per card. Cards with a snippet render the terminal window (chrome + filename + highlighted code) exactly as now; cards without one render no code window at all — the expanded area only shows what exists. AIEA Lab and VeriFi get real snippets so their panels are no longer blank:

- AIEA Lab — Python: SAC agent setup and training loop on the CarRacing env
- VeriFi — C++: cosine top-k search over the vector index, returning verified matches

## Technical notes

- `src/components/portfolio/MoreProjects.tsx`: replace the single grid + inline `gridTemplateColumns` calculation with two `flex` rows built from a chunked project list; drive width via inline `flexGrow` on the card wrapper.
- `src/components/portfolio/BuildLogCard.tsx`: make `code` prop optional and skip the `CodeCard` block when absent; keep the existing grid-rows expand animation for the detail area.
- No changes to colors, copy, or other sections.

## Verify

Hover each of the six cards in the preview and confirm only that card widens, no card in the other row changes width, every expanded panel shows code (or none at all), and mouse-out returns the layout to default.
