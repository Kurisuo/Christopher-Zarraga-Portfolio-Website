# Hero pair redesign + two bug fixes

## Card 1 — Selected work (orange)

Each project becomes an interactive row: title, plus a lighter one-line descriptor at ~85% size.

- Neural inference engine — MNIST MLP in C++17, zero ML libraries
- Multi-threaded HTTP server — thread pool over a bounded queue, in C
- VeriFi — C++ vector store powering RAG retrieval
- NVPilot — autonomous GPU tuning agent, NVIDIA x ASUS Hackathon
- NES C++ Emulator — 6502 CPU and PPU written from scratch
- AVScope — proposed descriptor: "computer-vision tooling for inspecting autonomous-vehicle perception runs frame by frame" (short form on the card: "frame-by-frame inspector for AV perception runs"). Say the word if that is off and I will swap it.

On hover (desktop) or tap (mobile) a row expands to a monospace metric line, and the "Building with" icons for that row go to full opacity while the rest drop to 30%:

- Neural inference engine -> 100% PyTorch agreement · ~24,000 img/s -> C++, CUDA
- Multi-threaded HTTP server -> ~8,400 req/s · 2.2x speedup -> C, Linux
- VeriFi -> 0.36 ms p50 · 250k vectors -> C++
- NVPilot -> ~550 ms perception · ~3 s rollback -> TypeScript, NVML

Icon row is rebuilt: one uniform set of monochrome white inline SVGs at equal size, same circular background, same stroke weight, evenly spaced. A Linux mark is added so the HTTP-server highlight has a target. The current mixed-resolution PNG logos are dropped.

## Card 2 — Off the keyboard (dark)

Restructured to mirror Card 1 exactly: same section label position, same list-with-descriptor typography, a footer block sitting at the same vertical position as "Building with," and the chevron in the identical corner spot on both cards.

- Chess — 2000 Elo
- Lap swimming — just finished my first swim class
- Calisthenics — bodyweight strength, 5 days a week
- Reading — financial literacy
- Photography — 35mm and coastal landscapes

The chevron expands the card downward into a horizontal photo carousel (existing placeholder photos): swipe on touch, arrow buttons on desktop, no overlay of surrounding content. Chevron rotates 180 degrees when open on both cards.

Both cards are forced to equal height, aligned top and bottom.

## Bugs

1. Stats row colliding with the floating nav pill: add scroll clearance so anchored/scrolled content clears the pill, and make the pill fully opaque instead of semi-transparent so nothing shows through behind it.
2. "5 — Engineers led on VeriFi" number missing on scroll: the cause is not yet confirmed from reading the code, so the first step is reproducing it in the browser at your viewport and inspecting that element's computed state; then fix it so the number is always visible.

## Technical notes

- Files: `src/components/portfolio/Hero.tsx` (both cards, stats), `src/components/portfolio/PillNav.tsx` (opacity), `src/styles.css` only if scroll-margin/token additions are needed.
- Row interaction: hover state on desktop via CSS/React state, tap toggle on touch; highlighting driven by a single `activeProject` state shared with the icon row.
- Carousel: CSS scroll-snap track with native touch swipe plus desktop arrow buttons; no new dependency.
- All transitions 150-200ms ease; existing color tokens unchanged.
