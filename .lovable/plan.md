# Section 01: interactive bug hunt

Replace the static Replit story in section 01 with the interactive bug hunt from the reference file, restyled to the site's existing dark/orange/lime system. All copy, bug explanations, "not this one" notes, and code snippets are taken verbatim from the reference.

## Layout

Keep the current two-column grid (text left, code window right) and the current fixed height. The left column is a fixed-height container holding four absolutely positioned panes that cross-fade at 200ms; the code window keeps its own fixed height with internal scrolling. Nothing grows or reflows on interaction.

## Code window

- Title bar: the three window dots, then three tabs — `shop.py`, `snippets.py`, `main.py` — replacing the current `REPL · V0.1` badge. Active tab uses the site's accent underline and brighter text.
- A `0/4 FOUND` counter sits at the far right of the bar, monospace, shown only on the `shop.py` tab.
- Body is monospace with per-token highlighting reusing the section's existing token colors (keyword / string / number / comment / function).

## The hunt (shop.py)

- Every non-blank line is clickable. Hover gives an identical neutral grey background wash and grey left border on all lines, so bugs are indistinguishable.
- Clicking a bug line: turns green permanently (green tint + green left border) and increments the counter.
- Clicking a correct line: flashes red for 1.4s, then reverts; no persistence.
- Four bugs: the never-exiting `while`, the copy-pasted `macheteShop[3] = True`, the discarded `.lower()`, and the dedented `else`.

## Left column panes

1. Intro prose + the "four bugs in the shop code" cue line.
2. Snippets commentary (two numbered items) — shown on the `snippets.py` tab.
3. Full-file note — shown on the `main.py` tab.
4. Result pane — appears on any line click: a green `BUG N OF 4 — FOUND` label with the bug title and explanation, or a red `NOT THIS ONE` label with `This line is fine` and the why-it's-fine note. Includes a `← back to the hunt` button returning to the intro pane.

Switching tabs swaps both columns together and resets the left pane to that tab's default.

## Below the window

A monospace status line (`Four bugs. Click the lines.`) plus a `Show me all four` button that marks all four bugs green, sets the counter to 4, opens bug 1's result, and updates the status text. Both are hidden on the non-hunt tabs. When all four are found by hand, the status becomes `All four. Better than I did for four years.`

## Responsive / motion

Under the existing mobile breakpoint the columns stack, the left column height becomes auto, and panes switch from absolute cross-fade to plain show/hide. `prefers-reduced-motion` disables transitions.

## Technical notes

- New `src/components/portfolio/BugHunt.tsx` holds the code data (lines as `[id, tokens]` tuples), the bug/OK copy maps, and all interaction state (`activeTab`, `found: Set`, `flashing`, `activePane`, `result`).
- `FirstProject.tsx` is rewritten to render the heading plus `BugHunt`, dropping the old static `CodeCard` body.
- `CodeCard.tsx` gains an optional custom title-bar slot (tabs + counter) so the chrome stays shared; existing usages are unaffected.
- Styling uses existing tokens (`bg-ink-soft`, `border-border`, `text-flame`, `text-volt`, muted foreground); green/red found/miss states are added as two new semantic tokens in `src/styles.css` rather than hardcoded hex.
