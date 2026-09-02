# Plan: Section 01 left-column readability pass

Scope: `src/styles.css` (shared `.bug-p` rules) and a small class tweak in
`src/components/portfolio/BugHunt.tsx` for the snippets list. No changes to the
code window, code font size, syntax colors, or tab bar.

## Changes

1. Shared left-column typography (all three tabs)
   - Update `.bug-p`: font-size 17px -> 15px, line-height 1.62 -> 1.7,
     max-width 48ch -> 58ch, color -> #C8C8D0.
   - Delete the `.bug-pane-snippets .bug-p` override (14px/1.55) so all three
     tabs share the same sizing.

2. snippets.py list spacing and markers
   - Intro line to list gap: 10px (adjust the intro paragraph's bottom margin
     or the `<ol>` top margin).
   - Space between the two numbered items: 20px (`space-y-4` -> `space-y-5`).
   - Markers outside the text block: `list-style-position: outside` with
     padding only as needed so item text aligns flush with the paragraph above.

3. Overflow behavior
   - Keep the snippets pane in-flow with `overflow: visible` (already the case
     after the last fix) and confirm the other panes don't clip text — content
     may extend past the code window height rather than scrolling internally.

## Verification

- Production build.
- Desktop preview of all three tabs: consistent 15px/1.7/#C8C8D0 text, 58ch
  measure, correct list spacing/marker alignment, no internal scrollbar on the
  snippets pane, code pane unchanged.
