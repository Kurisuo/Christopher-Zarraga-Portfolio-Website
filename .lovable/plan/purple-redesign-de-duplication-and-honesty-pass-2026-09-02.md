# Purple redesign, de-duplication, and honesty pass

## Color system

Swap the orange/lime pair for a single dark-purple accent system in `src/styles.css`:

- background #0A0A0C, card surface gradient #1A1523 -> #0F0D14, accent #7C3AED, muted purple #A78BFA, body text #E4E4E7
- card borders rgba(124,58,237,0.25), hover 0.5 plus a 2px lift
- all section numbers (01 -> 04) use the same accent; no more alternating orange/green
- the existing `flame`/`volt` tokens are remapped to accent/muted-purple so every component picks up the new palette in one place, then per-component leftovers are cleaned up (code syntax colors in the Replit and NVPilot terminals get accent/muted-purple treatment)

## Honesty fix

CUDA is removed from the hero "Building with" row (unfinished port). Remaining pills: C++, C, NVML, TS, Linux. The inference-engine row's highlight becomes C++ only.

## Sticky profile card

Converted from white to the dark card treatment. On scroll past the hero it collapses to a compact bar: small round avatar, name, three social icons, no bio — under 200px tall. Transition 150-200ms.

## Nav pill

Solid #141119 background with a purple border; page content scrolls beneath with clearance rather than through it (extra scroll padding on the anchored sections).

## Lookout section (02)

The iframe is removed (it renders a paywall prompt). Replaced with a styled card matching the site: outlet name "Lookout Santa Cruz", the article headline, its date, one sentence of summary in your own words, and a "Read on Lookout Santa Cruz" link opening in a new tab. If the published date can't be confirmed, the date line is omitted rather than guessed.

## Build log (03) de-duplication

- Remove VeriFi, NVPilot, and HTTP Server cards — already in Selected Work.
- Remove the "Current Studies" card.
- Keep AIEA Lab and Tech4Good Lab, each gaining a monospace accent metric line:
  - AIEA -> `SAC on CarRacing · Kubernetes GPU cluster`
  - Tech4Good -> `50% of data/event components`
- Metadata labels standardize on tech stack (no more mixing "RESEARCH"/"ACADEMICS" with "C / POSIX"): AIEA -> `Python · Stable-Baselines3 · CARLA`, Tech4Good -> `Angular · Spring · PostgreSQL` (adjusted if the stack differs).
- Chevrons: with NVPilot gone from this section, neither remaining card is expandable, so no chevrons here. Hover still reveals the detail line.

## Ghosted headings

Kept for the hero only. Sections 01-04 use solid white headings at a smaller scale.

## Not in this pass

Dedicated per-project pages (architecture, benchmark methodology, decisions) are the right next build, but they're a separate, larger piece of work — flagged here, not started.

## Technical notes

- Files: `src/styles.css` (tokens), `src/components/portfolio/ProfileCard.tsx` (dark + collapse), `src/routes/index.tsx` (scroll listener / sticky wrapper), `PillNav.tsx`, `UCSC.tsx`, `MoreProjects.tsx`, `FirstProject.tsx`, `Contact.tsx`, `Hero.tsx`.
- Collapse driven by an IntersectionObserver on the hero rather than a scroll handler.
- All colors converted to `oklch` in `@theme`/`:root` per the project's design-system rules; no hardcoded hex in components.
