# Add a hobbies line with expandable gallery to the hero

## Hero hobbies line

Add a centered plain-text hobbies line to `src/components/portfolio/Hero.tsx`, placed directly below the stats row inside the same `<header>` so it fills the empty space before section 01.

- Render as plain text on the page background — no card, border, or surface.
- Text: `Off the keyboard I play chess (1900 bullet), trade actively, swim, do calisthenics, and shoot 35mm.`
- Typography: 15px, color `#B4B4BC`, centered within the hero column.
- Spacing: keep it tight to the stats row so the hero reads as one grouped block.

## Expandable photo gallery

Place a small chevron button at the end of the hobbies line. Clicking it toggles a horizontal photo gallery directly beneath the line.

- Chevron rotates 180° when open.
- Gallery expands/collapses with a grid-row animation, pushing section 01 down — no overlay.
- Carousel behavior mirrors the existing OffTheKeyboard gallery:
  - Native horizontal scroll with snap points and touch swipe.
  - Left/right arrow buttons.
  - Dot indicators showing the active photo.
  - Keyboard arrow navigation when the carousel region is focused.
  - Reduced-motion fallback that disables smooth scrolling.
- Reuse the existing four hobby images already in `src/assets/`.

## Profile card bio

Confirm `src/components/portfolio/ProfileCard.tsx` reads `1900-bullet chess player` instead of `2000-Elo chess player`.

## Verification

- Run `bun run build`.
- Visually confirm: hobbies line sits close under the stats row, chevron expands/collapses the gallery, arrows/dots/keyboard/swipe advance photos, and the hero remains compact when collapsed.
