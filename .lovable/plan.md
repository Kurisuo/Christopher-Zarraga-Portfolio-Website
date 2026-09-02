# Section 01 bug hunt: parser fix + layout rebalance

## 1. Highlighting bug (root cause confirmed)

In `BugHunt.tsx` each row is a `[id, text]` tuple. The renderer has a special case
`id === "c"` that treats the row as a whole-line comment and prints its raw text.
The line `macheteCost = 10000000` legitimately uses `c` as its *note id* (its
"this line is fine" text is the hyperinflation note), so it hits that branch: the
tag markup is printed literally and it is painted comment-grey.

Fix: stop overloading the id. Mark comment lines explicitly (a third tuple slot or
an id prefix such as `#`), and always run the tag painter on every row — the
painter already strips comment tags correctly, so no line can ever leak markup.
Same change applied to the `snippets.py` and `main.py` row sets, which use the
same `c` convention.

## 2. Layout rebalance

- Grid becomes `1fr 1.35fr`, with a reduced column gap.
- Left column prose capped at ~48ch.
- Left column content vertically centered against the code window height instead
  of top-aligned with dead space below.
- Code window keeps its fixed height and absorbs the extra width.

## 3. Readability

- Code font size 13.5px, line-height 1.8.
- Default code text color `#D4D4DC`.
- Syntax colors set explicitly to the listed values via semantic tokens in
  `src/styles.css` (keywords `#C4B5FD`, strings `#86EFAC`, numbers `#FDBA74`,
  functions `#93C5FD`, comments `#5B5B63`) so they no longer inherit the
  orange/lime site accents by accident.

## 4. snippets.py horizontal scroll

Re-wrap the long list definitions in the `snippets.py` rows across additional
continuation lines (same content, hanging indent) so the widest line fits the
window and no horizontal scrollbar appears at the new column width.

## 5. Eyebrow clearance

`FirstProject.tsx` section currently uses `scroll-mt-28` and `py-14`. The floating
nav pill is `fixed top-5`, so increase top padding/scroll margin on the section so
`01 — WHERE IT STARTED` clears the pill on load and on anchor navigation.

## Files touched

- `src/components/portfolio/BugHunt.tsx` — row format, painter, grid, type sizes, snippet rewrap
- `src/components/portfolio/FirstProject.tsx` — top clearance
- `src/styles.css` — code text + syntax color tokens
