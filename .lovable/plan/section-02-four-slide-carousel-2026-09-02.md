# Section 02: four-slide carousel

Turn section 02 into a carousel where the photo, caption, and body text change together as one unit. Section heading, card styling, and the Lookout article link stay fixed.

## Content

A single `slides` array in `src/components/portfolio/UCSC.tsx`, each entry `{ image, caption, body }`:

1. **Sabatte cohort** — existing cohort photo, caption "Sabatte Family Scholars, first cohort.", body verbatim:
   "I came to UC Santa Cruz in the first cohort of Sabatte Family full-ride scholars — the first full ride in the university's history. It changed what I could afford to be curious about. I am so grateful; I got to declare Computer Science with an Applied Math minor because I wanted both halves: the systems themselves, and the math that explains why they behave the way they do."
2. **Y Combinator Expo** — placeholder image, empty body string
3. **UC Berkeley Regents Conference** — placeholder image, empty body string
4. **SHPE 2026 Conference** — placeholder image, empty body string

Slides 2-4 get short captions matching their names; bodies stay `""` for you to fill in. Placeholder images are generated 16:10 neutral-dark placeholders in `src/assets/`, easy to swap.

## Layout and height

- Keep the current two-column grid: text left, photo right.
- All four text panes render absolutely at the same origin in the left column; only the active one is at opacity 1, the rest are transparent and `pointer-events: none`.
- Left column gets a fixed height matching the image container, so the longest body defines the box and shorter slides simply leave whitespace. No reflow between slides.
- Image container keeps the current 16:10 aspect ratio, 8px radius, `overflow: hidden`.

## Transitions

- Text: 250ms opacity cross-fade.
- Image: 300ms horizontal slide (track translate, direction follows navigation).
- Both start on the same state change so they read as one motion.
- `prefers-reduced-motion`: image cross-fades instead of sliding.

## Controls

- Left/right chevron buttons overlaid on the image, fading in on hover/focus.
- Dot indicators directly beneath the image showing count and active position; clicking a dot jumps to that slide.
- Arrow-key navigation when the carousel region has focus (`tabIndex=0`, keydown handler).
- Touch swipe via pointer/touch start-end delta threshold.
- Wraps: slide 4 → slide 1 and back. No autoplay.

## Caption

Short muted monospace line directly under the image, separate from body text, changing with the slide.

## Technical notes

- Single file change: `src/components/portfolio/UCSC.tsx`, plus new placeholder image assets.
- Local `useState` for index and direction; no new dependencies.
- Reduced-motion handled with a CSS media query on the image track, not JS.
- Verify with a build and a browser pass: advance through all four slides and confirm the section height is identical on each.
