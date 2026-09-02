# Plan: Fix snippets.py left pane and tab scroll reset

## Scope

Only adjust the section 01 Bug Hunt interaction in `src/components/portfolio/BugHunt.tsx`. Do not change the code pane font size, syntax colors, or tab bar styling.

## Changes

1. Left column sizing for `snippets.py`
   - Keep the shared left column wrapper at the same overall height as the code window on desktop.
   - Remove the snippets pane's current absolute/fixed-height scrolling behavior by rendering this pane as an in-flow child for this tab.
   - Let the snippets commentary size to its content up to the available code-window height.

2. snippets.py text sizing
   - Change only the snippets pane's left-column text to 14px with line-height 1.55.
   - Keep `shop.py`, `main.py`, and result-pane typography unchanged.

3. snippets.py vertical alignment
   - Align the snippets commentary to the top of the left column.
   - Preserve the existing vertical alignment behavior for the other panes.

4. Code pane scroll reset
   - Add a `ref` to the scrollable `<pre>` code container.
   - In `selectTab()`, reset the code pane's `scrollTop` to `0` after switching tabs so snippets.py and every other tab opens at its first line.

## Verification

- Run a production build.
- Check the desktop preview for all three tabs, confirming:
  - snippets.py commentary no longer clips or shows an internal scrollbar when it fits.
  - the snippets code pane starts at the first line after switching tabs.
  - code typography, syntax palette, and tab bar styling remain unchanged.
