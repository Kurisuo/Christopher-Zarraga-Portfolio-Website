# Plan: Move NVPilot terminal to section 03, embed scholarship article in section 02

## Section 02 (UCSC) — replace NVPilot terminal with scholarship article

In `src/components/portfolio/UCSC.tsx`:
- Remove the NVPilot `CodeCard` terminal block entirely.
- Keep the existing heading and story text.
- Add an article embed/link card for the Lookout story: "UC Santa Cruz students talk about impact of full-ride scholarships from historic alumnus gift" (https://lookout.co/uc-santa-cruz-students-talk-about-impact-of-full-ride-scholarships-from-historic-alumnus-gift/story).
  - Styled as an editorial "In the press" card: publication name, headline, short excerpt about the Sabatte Family gift, and a "Read the article" link opening in a new tab. (The article is an external news page, so it links out rather than iframing — Lookout blocks embedding.)

## Section 03 (More Projects) — NVPilot card with expandable terminal

In `src/components/portfolio/MoreProjects.tsx`:
- Replace the "Reversibility Engine" card with an "NVPilot" card:
  - Tag: `TypeScript / NVML`
  - Blurb: autonomous agent watching live NVML GPU telemetry and tuning the machine (adapted from the current section 02 copy).
  - The reversibility/journaled-undo detail gets folded into the NVPilot detail text so that content isn't lost.
- Make the NVPilot card clickable (button semantics, keyboard accessible, chevron indicator). On click it expands below the card to reveal the scrollable `CodeCard` terminal with the existing `nvpilot/main.ts` snippet (moved over from `UCSC.tsx`), animated open/closed like the Off-the-keyboard gallery.
- Other cards stay unchanged.

## Technical
- Reuse the existing `CodeCard` component; move the NVPilot code JSX from `UCSC.tsx` into `MoreProjects.tsx`.
- Expansion uses the same grid-rows/max-height transition pattern already used in `Hero.tsx`.
- Verify with build + Playwright: article card renders in 02, clicking NVPilot in 03 reveals the terminal with internal scrolling, no console errors.
