# Section 02 carousel lightbox

Add a full-featured image lightbox to the "A full ride and a new cohort" carousel (`src/components/portfolio/UCSC.tsx`). The carousel itself — layout, fixed height, text/image sync — stays untouched; the lightbox is a pure overlay.

## What changes

### 1. New component: `src/components/portfolio/Lightbox.tsx`

A self-contained overlay component that receives the slides array, current index, and callbacks from `UCSC`:

- **Overlay**: fixed inset-0, backdrop `rgba(10, 10, 12, 0.92)` fading in over 200ms.
- **Image**: centered, `max-w: 90vw` / `max-h: 85vh`, `object-fit: contain`, never upscaling beyond natural dimensions (natural width/height used as a max). Scales in over 250ms with `cubic-bezier(0.4, 0, 0.2, 1)` (from ~0.9 to 1). With `prefers-reduced-motion`, the scale animation is replaced by a simple cross-fade.
- **Caption**: muted monospace line directly beneath the image.
- **Controls**: left/right arrow buttons to move through all four photos without closing; close (X) button top-right.
- **Closing**: backdrop click, Escape key, or close button — reverses the animation (scale down + fade out, then unmount).
- **Sync**: advancing in the lightbox calls the same `go(next, dir)` the carousel uses, so closing returns the user to the last-viewed slide.
- **Accessibility**: `role="dialog"`, `aria-modal="true"`, focus trap cycling through the controls while open, body scroll locked (`overflow: hidden` on `document.body`, restored on close), focus returned to the carousel image on close. Arrow keys navigate, Escape closes.
- **Mobile**: full-screen image area; horizontal swipe navigates between images, swipe-down dismisses the lightbox.

### 2. `UCSC.tsx` updates

- Add `lightboxOpen` state and an `openLightbox`/`closeLightbox` pair.
- Make the active carousel image clickable: wrapped in a `<button>` (or `role="button"` handler) with `cursor: zoom-in`, a visible `focus-visible` ring matching site styling, opening on click, Enter, or Space. Non-active slides remain non-interactive.
- Render `<Lightbox>` when open, passing `slides`, `index`, `go`, and `closeLightbox`.
- Keep a ref to the carousel image button so focus returns to it on close.
- No changes to the slides array, fixed-height logic, dot indicators, or the Lookout article link.

## Animation note

A true FLIP (scale from the exact carousel rect) adds complexity; the spec's easing/timing values are implemented as the scale-in of the centered overlay, which reads as "scales up into place" and is simpler and robust at all viewport sizes. The reverse plays on close.

## Verification

- Playwright: open lightbox via click and via Enter, check backdrop, caption, arrow navigation syncing the carousel index, Escape/backdrop/close-button dismissal, focus return, body scroll lock, and reduced-motion emulation.
- `bun run build` passes.
