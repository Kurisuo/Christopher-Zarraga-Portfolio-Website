# Personal Portfolio — CS Student

A single-page scrolling narrative portfolio styled after the sawad.framer.website reference: near-black canvas, oversized bold uppercase display type with a "ghosted" second line, one white rounded profile card, and vivid orange + lime accent tiles.

## Visual direction (from the reference)

- Background: near-black (#111). Text: white, with muted grey for body copy.
- Display type: very large, tight, uppercase, heavy weight. Section titles follow the same style ("RECENT PROJECTS", "LET'S WORK TOGETHER").
- Accents: burnt orange and electric lime, used on tiles, badges, and hover states.
- Cards: generously rounded; the profile card is white-on-black for contrast.
- Floating pill nav centered at the top with small icons that jump to sections.
- Motion: restrained scroll-reveal fades, arrow buttons that nudge on hover.

## Page sections

**1. Hero (photo left, bio right)**
- Left: white rounded card with your photo, name, one-line tagline, and social icons.
- Right: oversized two-line headline (second line ghosted), short bio paragraph, a small stat row, then bullet points split into two accent tiles — one for example work, one for hobbies.

**2. First project — Replit**
- Story text on the left, a dark code-editor card on the right with a title bar and a syntax-highlighted snippet from that first project.

**3. UCSC — full ride and NVPilot**
- Large section heading, the story of the first full-ride in university history and the choice of CS with applied math.
- Two project cards from school. NVPilot is the featured one, with the NVIDIA hackathon badge and its own embedded code snippet; the second school project sits beside it.

**4. Other projects + current pursuits**
- A grid of remaining project cards, each with a category label, title, and short description that reveals more on hover.
- A short "what I'm working on now" block closing the section.

**5. Contact**
- Big closing headline, then buttons for email, resume (PDF), and GitHub. Minimal footer line.

## Content I'll use as placeholders

I'll build the full structure with clearly-marked placeholder copy for: your name, bio wording, the Replit project details and snippet, the second UCSC project, the NVPilot snippet, the remaining projects, your email, GitHub URL, and resume link. Your photo will be a generated stand-in portrait matching the reference's high-contrast look. Send me any of these and I'll swap them in.

## Technical notes

- One route: `src/routes/index.tsx`, replacing the placeholder, with section components under `src/components/`.
- Design tokens (background, foreground, muted, orange accent, lime accent, radii, fonts) added to `src/styles.css` as oklch values; no hardcoded color classes in components.
- Display/body font pair loaded via a `<link>` in `src/routes/__root.tsx`.
- Code snippets rendered as static pre/code with hand-applied token spans — no syntax-highlighting dependency.
- Scroll reveals via a small IntersectionObserver hook; smooth-scroll anchors for the pill nav.
- Route-level `head()` with portfolio-specific title, description, and og/twitter tags.
- No backend needed; contact is mailto plus links.
