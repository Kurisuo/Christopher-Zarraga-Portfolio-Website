# Hero hobbies gallery — three real photos, fixed height, lightbox

## Photos

Upload the three uploaded images as CDN assets and use them as the entire gallery, replacing the four existing stock images (chess, swim, calisthenics, film camera), in this order:

1. Sunset ridge silhouette (landscape) — caption: `Fujifilm X-T2, 18–55mm`
2. Chess game outdoors (portrait) — caption: `Blitz downtown`
3. Lap swimming pool (portrait) — caption: `Morning laps`

The four old `src/assets/gallery-*.jpg` files are deleted along with their imports.

## Carousel

Stays collapsed by default and expands from the chevron at the end of the hobbies line, as it does now. Controls match the section 02 carousel:

- Left/right arrow buttons
- Dot indicators for the active photo
- Touch swipe
- Keyboard arrow navigation when the carousel region is focused
- Reduced-motion fallback

Fixed container height (about 420px desktop, 320px mobile) with each image centered and `object-fit: contain`, so the landscape and portrait shots letterbox instead of cropping and the section height never shifts between slides.

Captions sit directly below each image in muted monospace, matching the caption style used in section 02.

## Lightbox

Clicking a photo opens the existing `src/components/portfolio/Lightbox.tsx` overlay — scale-in, arrows to move through the three photos, Escape or backdrop click to close, focus returned to the clicked image. The hero passes its own slides array and index; closing leaves the carousel on the last-viewed photo.

## Technical notes

- Assets created via `lovable-assets create` from the uploads; pointer JSON imported for the `url`.
- Change in `src/components/portfolio/Hero.tsx`: gallery data becomes `{ image, alt, caption }` matching `LightboxSlide`, slides become one-per-view fixed-height frames, and lightbox state is added.
- Verify with `bun run build` plus a browser pass on expand/collapse, arrows, dots, keyboard, and lightbox open/close.
