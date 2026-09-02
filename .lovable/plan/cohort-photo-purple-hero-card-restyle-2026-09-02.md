# Cohort photo + purple hero card restyle

## Cohort photo (Section 02)

- Upload the provided `IMG_4804.jpg` (the real Sabatte cohort group photo) as a CDN asset at `src/assets/sabatte-cohort.jpg.asset.json` via `lovable-assets create`, replacing the generated placeholder currently imported by `src/components/portfolio/UCSC.tsx`. No layout change — same full-width image, 8px radius, caption, and article link.

## Hero cards restyle (`src/components/portfolio/Hero.tsx`)

Only the two hero cards change; the rest of the site stays neutral dark.

**Selected Work card:**
- Background: vertical gradient `#2D1B4E → #160E28`, border `1px rgba(139,92,246,0.3)`, `8px` radius.
- Section label "Selected work" in `#A78BFA` monospace uppercase; project titles `#F4F4F5`; descriptors `#C4B5FD`.
- Remove the circular "Building with" tech pill icons entirely. Replace with a single row of monospace text: `C++ · C · NVML · TypeScript · Linux` in `#A78BFA` at 70% opacity.
- Keep the interactive row behavior (hover/tap metric reveal). The tech-dimming logic tied to the circular icons is removed with them; the metric expansion stays.

**Off the Keyboard card:**
- Background: vertical gradient `#16141A → #0E0D11`, border `1px rgba(255,255,255,0.08)`, `8px` radius.
- Titles `#E4E4E7`, descriptors `#A1A1AA`. Gallery and chevron behavior unchanged.

- No glow, no box-shadow blooms, no radial gradients on either card.

## Profile card (`src/components/portfolio/ProfileCard.tsx`)

- Same treatment as Off the Keyboard: `#16141A → #0E0D11` gradient, `1px rgba(255,255,255,0.08)` border, `8px` radius, light text — so it no longer reads as pure white against the dark page. Photo, name, bio, and social icons unchanged.

## Stats bar fix (`Hero.tsx`)

- "First-gen" currently wraps to two lines, breaking the shared baseline. Fix by clamping all four values to one line: apply `whitespace-nowrap` plus a responsive size step down (e.g. `text-2xl sm:text-3xl`) on the value so all four numbers sit on a single baseline at every viewport. Equal-width columns and 1px dividers stay as-is.

## Technical notes

- Files: `src/components/portfolio/Hero.tsx`, `src/components/portfolio/ProfileCard.tsx`, `src/components/portfolio/UCSC.tsx` (import swap only), new `src/assets/sabatte-cohort.jpg.asset.json`.
- Card restyle uses inline styles or arbitrary-value Tailwind classes scoped to these cards only; no global token changes in `src/styles.css`.
- The old generated `src/assets/sabatte-cohort.jpg` file is removed once the import points at the new asset pointer.
- Verify with a build plus a preview screenshot check of the hero cards, profile card, stats baseline, and section 02 photo.
