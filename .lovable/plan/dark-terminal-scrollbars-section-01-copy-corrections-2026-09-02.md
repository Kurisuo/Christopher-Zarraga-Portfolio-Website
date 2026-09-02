# Dark terminal scrollbars + section 01 copy corrections

## 1. Scrollbars on terminal/code windows

The user wants the draggable scrollbars inside the code terminals to match the site's dark theme instead of the default light/system scrollbar.

### Design choice
- Thin, dark scrollbar for both WebKit and Firefox.
- Transparent track so the terminal panel background shows through.
- Neutral muted thumb (`muted-foreground/30`) that brightens slightly on hover (`foreground/40`).
- No flame accent, so it stays quiet against the code.

### Implementation
- Add a `.terminal-scroll` utility class in `src/styles.css`:
  - `scrollbar-width: thin`
  - `scrollbar-color: <thumb> <track>` for Firefox
  - `::-webkit-scrollbar` width, `::-webkit-scrollbar-track` transparent, `::-webkit-scrollbar-thumb` rounded with the muted color and a hover state.
- Apply the class to the scrollable `<pre>` in `src/components/portfolio/CodeCard.tsx`.
- Apply the same class to the scrollable `<pre>` in `src/components/portfolio/BugHunt.tsx`.
- Keep the existing terminal styling (background, border, typography, syntax colors) unchanged.

## 2. Correct two bug explanations in section 01

In `src/components/portfolio/BugHunt.tsx`:

- Replace `BUG["1"].b` with:
  > "It's skipped on your first visit, since the flag starts False. But the moment you buy anything, the purchase branch sets <code>macheteShop[3] = True</code> — and nothing inside this loop ever sets it back. Second time you walk into the shop, it spins forever. It pops index 1 and inserts right back at index 1, so the condition can never change. The armor pieces use <code>if</code> for the exact same logic. I wrote the same idea two ways and only one of them hangs the game."

- Replace `BUG["2"].b` with:
  > "Buy the boots and <code>macheteShop[3] = True</code> runs anyway — I copy-pasted the purchase branches and never changed the variable. On its own that's just wrong bookkeeping. Combined with the loop above, it's what turns a harmless mistake into a game that hangs on your second visit to the shop."

- Append this sentence to the end of the intro paragraph (after "Click any line you think is broken."):
  > " Two of them are harmless on their own — they only break the game when they line up."

No other copy, layout, or interaction changes.
