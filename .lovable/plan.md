# Tighten hero rhythm, fix profile alignment, and clear nav pill collisions

## Hero vertical rhythm

Now that both hero cards are removed, the hero ends at the stats row and the gap below it feels like a void.

- Reduce the space between the intro paragraph and the stats row: change the stats wrapper margin from `mt-10 lg:mt-12` to `mt-7 lg:mt-8` in `src/components/portfolio/Hero.tsx`.
- Remove the bottom horizontal rule beneath the stats: change the stats wrapper border from `border-y border-border` to `border-t border-border`.
- Reduce hero bottom padding so section 01 follows shortly after: change `pb-14 lg:pb-16` to `pb-8 lg:pb-10`.

## Profile card alignment

The sticky sidebar currently centers the profile card vertically (`items-center`), so the card now hangs below the shorter hero content.

- In `src/routes/index.tsx`, change the sticky sidebar flex alignment from `items-center` to `items-start` so the profile card sits at the top of the column intentionally.
- Reduce the sidebar vertical padding from `py-24` to `py-12` so the card starts closer to the top of the viewport and the imbalance reads as a deliberate top alignment.

## Content and nav fixes

- In `src/components/portfolio/ProfileCard.tsx`, change the bio line from `2000-Elo chess player` to `1900-bullet chess player`.
- In `src/components/portfolio/PillNav.tsx`, make the pill background fully opaque so labels/content never show through behind it. Use an explicit solid background matching the page background.
- Add scroll clearance for anchored sections so eyebrow labels clear the pill:
  - Increase `scroll-mt-28` on `Hero.tsx` to `scroll-mt-36`.
  - Increase `scroll-mt-32` on `FirstProject.tsx` to `scroll-mt-40`.

## Verification

- Run `bun run build`.
- Visually confirm in the preview: hero reads as one compact block, profile card aligns to top of sidebar, section 01 eyebrow is fully visible below the pill, and the pill is opaque.
