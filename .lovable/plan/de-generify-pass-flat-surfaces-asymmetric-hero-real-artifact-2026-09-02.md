# De-generify pass: flat surfaces, asymmetric hero, real artifacts

## Profile card

Restore the full expanded sticky card — portrait, name, bio, three social links — and delete the collapse-on-scroll behavior and its intersection observer sentinel. Dark treatment, flat #141119 surface, 1px hairline border, 8px radius.

Note: the purple cursor trail you asked for earlier is technically a glow. I'm keeping it on the profile card only (it's an intentional one-off interaction, not ambient bloom) and removing every other glow. Say the word and it goes too.

## Flatten everything

- Remove the `card-surface` gradient and `card-lift` shadow/lift utilities; replace with a flat `--surface: #141119` and `border: 1px solid rgba(255,255,255,0.08)`.
- No box-shadows on cards, no radial bloom, no purple default borders.
- Purple appears only on: section numbers, links, monospace metric lines, and hover states.
- `--radius` drops to 8px; every `rounded-3xl`/`rounded-full` card corner becomes `rounded-lg`. Avatar, icon buttons, and the nav pill stay circular.

## Asymmetric hero

- Grid becomes `60% / 40%` on desktop, aligned tops, ragged bottoms (`items-start`, no forced equal height). The short card ends where its content ends — dead space gone.
- Selected Work: hairline border + flat surface.
- Off the Keyboard: no border, no surface — content directly on the background with a 2px purple left rule.
- Tech row rebuilt as one monospace small-caps line, no circles or containers:
  `C++ · C · NVML · TypeScript · Linux`
  Active-project highlight stays: matching labels at full opacity, the rest at 30%.

## Nav collision

Nav pill background becomes opaque #0F0D14 with a hairline border. Section `scroll-mt` raised so anchored content clears the pill, and the hero stats row gets top clearance so it never slides under it.

## Scroll-linked transitions

Rewrite `use-reveal` to keep observing (no `disconnect`) at a 20% threshold so content fades out on scroll up and back in on scroll down: opacity 0 → 1, translateY 20px → 0, 400ms ease-out, 60ms stagger per child. Wrapped in a `prefers-reduced-motion` guard that disables transform and transition.

## Type hierarchy

Section headings drop two steps in scale; card titles grow relative to their descriptors; descriptors go to muted at ~85%. Importance comes from type size, not from another box.

## Real artifacts

Add two textured, real elements next to the styled boxes:

1. A terminal block under the HTTP server row showing actual `wrk` output (request rate, latency distribution, transfer/sec) styled like the existing Replit code window.
2. A small inline SVG latency-scaling chart for VeriFi (p50 vs. vector count) — hand-built, no chart dependency.

I need your real numbers for both. If you paste the `wrk` output and the VeriFi latency points, I'll use them verbatim; otherwise I'll leave placeholders clearly marked rather than invent benchmarks.

## Technical notes

- Files: `src/styles.css` (tokens, radius, remove gradient/lift utilities), `src/hooks/use-reveal.ts` (bidirectional observer + stagger), `src/components/portfolio/` — `ProfileCard`, `Hero`, `PillNav`, `Reveal`, `CodeCard`, `UCSC`, `MoreProjects`, `FirstProject`, `Contact`; `src/routes/index.tsx` (drop collapse state).
- All colors stay as `oklch` tokens in `styles.css`; no hardcoded hex in components.
