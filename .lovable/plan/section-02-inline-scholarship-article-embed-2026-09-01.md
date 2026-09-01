# Section 02: Inline Scholarship Article Embed

## Goal
Restructure section 02 so the descriptive text occupies roughly the left half (or less) and the scholarship article is embedded inline on the right half, eliminating the external link.

## Current state
`src/components/portfolio/UCSC.tsx` renders the UCSC heading and a full-width paragraph, followed by a full-width "In the press" card that links out to Lookout Santa Cruz with an arrow button.

## Proposed changes

1. **Two-column layout for the body**
   - Wrap the description and the article embed in a responsive grid: `grid-cols-1 lg:grid-cols-2` with a gap.
   - Left column: keep the existing paragraph but constrain its width naturally by the column.
   - Right column: embed the Lookout Santa Cruz article directly.

2. **Article embed**
   - Use an inline `<iframe>` pointing to the article URL, styled as a rounded card (`rounded-[2rem]` or `rounded-3xl`) with a subtle border, matching the existing card aesthetic.
   - Set a fixed aspect ratio (e.g., `aspect-[4/3]` or `h-[420px]`) so it fills the right column without growing too tall.
   - Add a small fallback link below the iframe for accessibility and in case the source blocks framing.

3. **Preserve existing heading**
   - Keep the section label, "First full ride / in school history" heading, and reveal animation above the two-column body.

4. **Responsive behavior**
   - On `lg` and wider: side-by-side columns.
   - Below `lg`: stack description first, embed second, full width.

5. **Styling consistency**
   - Use the existing design tokens: `bg-ink`, `border-border`, `text-muted-foreground`.
   - Maintain spacing rhythm (`mt-8 lg:mt-10`, `gap-8` or `gap-10`).

## Files to modify
- `src/components/portfolio/UCSC.tsx`

## Out of scope
- No changes to other sections, navigation, or profile card.
- No changes to the article URL or section copy.
