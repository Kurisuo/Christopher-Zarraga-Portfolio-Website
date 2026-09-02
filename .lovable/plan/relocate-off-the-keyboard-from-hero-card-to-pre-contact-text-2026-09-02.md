# Relocate "Off the Keyboard" from hero card to pre-contact text line

## What changes

### 1. Remove the hero card (`src/components/portfolio/Hero.tsx`)
- Delete the "Off the keyboard" card entirely: container, border, gradient background, hobby list, gallery footer, and its chevron.
- The hero grid collapses to the single "Selected work" card. Change the grid from `sm:grid-cols-2` to one column so Selected work keeps its current card width behavior (full width on its row).
- Remove now-unused code from Hero.tsx: the `hobbies` array, `gallery` array + image imports, `galleryOpen` state, `trackRef`, `scrollBy`, `ChevronLeft/ChevronRight/ChevronDown` imports, and the expanding gallery panel block at the bottom of the hero.

### 2. New "Off the keyboard" line above the contact section
Add a new component (e.g. `src/components/portfolio/OffTheKeyboard.tsx`), rendered in `src/routes/index.tsx` directly above `<Contact />`:

- No card, border, surface, or rounded container — it sits on the page background.
- One line of text:
  - Label: `Off the keyboard` in the same muted monospace style as other section labels (`font-mono`, small, uppercase or small-caps feel, muted color).
  - Interests on the same line separated by ` · ` middle dots, body text at 15px, color `#B4B4BC`:
    `Chess (2000 Elo) · Active trading · Lap swimming · Calisthenics · 35mm photography`
  - Note: the interests list differs from the old card (adds "Active trading", drops "Reading" and the old descriptors) — use the new list exactly.
- Natural wrapping on narrow viewports; no font shrinking.
- Generous vertical padding above and below (e.g. `py-16 lg:py-20`) so it reads as a quiet closing note; no heading above it.

### 3. Expandable photo gallery with carousel controls
- A chevron button at the end of the line toggles the gallery; chevron rotates 180° when open.
- Expanded content: a horizontal photo carousel directly beneath the line, reusing the section-02 carousel interaction pattern (from `UCSC.tsx`): left/right arrows, dot indicators, swipe on touch, keyboard arrow navigation when focused. Uses the existing 4 gallery images (chess, swim, calisthenics, photography) currently imported in Hero.tsx — those imports move to the new component.
- The section grows downward when expanded (grid-rows animation, like the existing gallery toggle) and collapses cleanly; no overlay.
- Respect `prefers-reduced-motion` (no slide animation; instant/cross-fade).

## Technical notes
- Files touched: `src/components/portfolio/Hero.tsx` (strip card + gallery), new `src/components/portfolio/OffTheKeyboard.tsx`, `src/routes/index.tsx` (render the new component above `<Contact />`).
- Gallery images stay the same four assets already in `src/assets/`.
- Verify with a production build and a Playwright pass: hero shows only Selected work, the new line sits above the contact section, chevron expands/collapses the carousel, arrows/dots/keyboard work.
