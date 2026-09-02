import { Fragment, useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type Row = [string, string];

const BUG: Record<string, { t: string; b: string }> = {
  "1": {
    t: "Nothing ever exits this loop",
    b: "<code>while macheteShop[3] is True</code> runs forever. Nothing inside the loop flips that flag back to False — it pops index 1 and inserts right back at index 1, so the condition never changes. The armor pieces use <code>if</code> for the exact same logic. I wrote the same idea two ways and only one of them hangs the game.",
  },
  "2": {
    t: "Every purchase flags the machete",
    b: "Buy the boots and <code>macheteShop[3] = True</code> runs anyway. I copy-pasted the purchase branches and never changed the variable. So buying anything at all arms the infinite loop above for your next visit to the shop.",
  },
  "3": {
    t: "This line does nothing",
    b: "<code>.lower()</code> returns a lowercased copy and throws it away — strings are immutable in Python. Every input check in the file is silently case-sensitive. Type <code>Boots</code> and the shop pretends it never heard of them.",
  },
  "4": {
    t: "The homeless else",
    b: "This <code>else</code> is dedented one level too far, so it attaches to the whole gear chain instead of the boots check. Type anything unrecognized and you get free boots — charged, of course. Type <code>boots</code> correctly and nothing happens at all.",
  },
};

const OK: Record<string, string> = {
  a: "Ugly, but not broken. The index contract only lives in a comment above it — bad design, working code.",
  b: "Global mutation is a smell, not a bug. It does exactly what I told it to do.",
  c: "This is the hack, and it works. Hyperinflating the price is how I faked an out-of-stock flag.",
  d: "Fine on its own. It's the loop wrapped around it that never ends.",
  e: "Pops and re-inserts at the same index, so the list length never changes — which is why the loop can't exit. Correct line, wrong neighbors.",
  f: "Works. An empty prompt string is lazy, not broken.",
  g: "Correct comparison. The problem is the else that comes after it.",
  h: "Reads the cost out of index 2 correctly. Fine.",
  i: "Fine here. (flavor() does crash in the snacks branch, but that's a different line.)",
  j: "Recursion instead of a loop. It grows the call stack, but it won't break in a session this short.",
  k: "Correct. It's the else above that lets you reach this line by accident.",
  l: "Correct arithmetic. You just may not have meant to buy boots.",
  m: "Just a definition.",
};

const HUNT: Row[] = [
  ["c", "# shop state: bare list, index contract in a comment"],
  ["c", "# [name, display, cost, purchased]"],
  ["a", "<k>macheteShop</k> = [<s>'Machete'</s>, <s>\"$200\"</s>, macheteCost, <k>False</k>]"],
  ["", ""],
  ["m", "<k>def</k> <f>Market</f>():"],
  ["bug1", "    <k>while</k> macheteShop[<n>3</n>] <k>is</k> <k>True</k>:"],
  ["b", "        <k>global</k> macheteCost"],
  ["c", "        macheteCost = <n>10000000</n>"],
  ["d", "        macheteShop.pop(<n>1</n>)"],
  ["e", "        macheteShop.insert(<n>1</n>, <s>\"$10000000\"</s>)"],
  ["", ""],
  ["f", "    marketchoice = <f>input</f>(<s>\"\"</s>)"],
  ["bug3", "    marketchoice.lower()"],
  ["", ""],
  ["g", "    <k>if</k> gearChoice == <s>\"boots\"</s>:"],
  ["h", "        <k>if</k> playerMoney < bootsShop[<n>2</n>]:"],
  ["i", "            <f>flavor</f>(<s>\"You don't have enough...\"</s>)"],
  ["j", "            <f>Market</f>()"],
  ["", ""],
  ["bug4", "    <k>else</k>:"],
  ["k", "        playerInventory.append(<s>\"Boots\"</s>)"],
  ["bug2", "        macheteShop[<n>3</n>] = <k>True</k>"],
  ["l", "        playerMoney -= bootsCost"],
];

const SNIP: Row[] = [
  ["c", "# 1 — state management by hyperinflation"],
  ["", "macheteCost = <n>200</n>"],
  ["", "macheteShop = [<s>'Machete'</s>, <s>\"$200\"</s>, macheteCost, <k>False</k>]"],
  ["", ""],
  ["", "<k>while</k> macheteShop[<n>3</n>] <k>is</k> <k>True</k>:"],
  ["", "    <k>global</k> macheteCost"],
  ["", "    macheteCost = <n>10000000</n>"],
  ["", "    macheteShop.pop(<n>1</n>)"],
  ["", "    macheteShop.insert(<n>1</n>, <s>\"$10000000\"</s>)"],
  ["", "    macheteShop[<n>2</n>] = macheteCost"],
  ["", ""],
  ["", ""],
  ["c", "# 2 — the cereal aisle"],
  ["c", "# [name, cost, hunger, stat effect]"],
  ["", "fruity_circlesShop = [<s>'Fruity Circles'</s>, fruity_circlesCost,"],
  ["", "    <s>'+2 Hunger'</s>, <s>'Increases DEF by +2'</s>]"],
  ["", ""],
  ["", "unfortunate_mellowsShop = [<s>'Unfortunate Mellows'</s>, unfortunate_mellowsCost,"],
  ["", "    <s>'Max Hunger'</s>, <s>'Maxes ALL Stats to 50'</s>]"],
  ["", ""],
  ["", "muffin_rufflesShop = [<s>'Muffin Ruffles'</s>, muffin_rufflesCost,"],
  ["", "    <s>'+4 Hunger'</s>, <s>'Decreases STM by -1 and Increases Speed by +1'</s>]"],
];

const FULL: Row[] = [
  ["", "<k>import</k> time"],
  ["", "<k>import</k> sys"],
  ["", ""],
  ["", "<k>def</k> <f>flavor</f>(game):"],
  ["", "    <k>for</k> flavors <k>in</k> game:"],
  ["", "        sys.stdout.write(flavors)"],
  ["", "        sys.stdout.flush()"],
  ["", "        time.sleep(<n>0.02</n>)"],
  ["", ""],
  ["", "macheteCost = <n>200</n>"],
  ["", "pistolCost = <n>100</n>"],
  ["", "helmetCost = <n>50</n>"],
  ["", "chestplateCost = <n>150</n>"],
  ["", "leggingsCost = <n>100</n>"],
  ["", "bootsCost = <n>50</n>"],
  ["", ""],
  ["", "meatCost = <n>50</n>"],
  ["", "fruity_circlesCost = <n>125</n>"],
  ["", "cinnamon_burnt_mushiesCost = <n>25</n>"],
  ["", "melted_globsCost = <n>30</n>"],
  ["", "unfortunate_mellowsCost = <n>5000</n>"],
  ["", "pear_jillsCost = <n>25</n>"],
  ["", "muffin_rufflesCost = <n>75</n>"],
  ["", ""],
  ["", "kilometersWalked = <n>0</n>"],
  ["", "playerInventory = []"],
  ["", "playerMoney = <n>500</n>"],
  ["", ""],
  ["c", "# for Gear - [Name, Cost, Cost Variable, Checker]"],
  ["", "macheteShop = [<s>'Machete'</s>, <s>\"$200\"</s>, (macheteCost), <k>False</k>]"],
  ["", "pistolShop = [<s>'Pistol'</s>, <s>\"$100\"</s>, (pistolCost), <k>False</k>]"],
  ["", "helmetShop = [<s>'Helmet'</s>, <s>\"$50\"</s>, (helmetCost), <k>False</k>]"],
  ["", ""],
  ["", "<k>def</k> <f>MarketSpotted</f>():"],
  ["", "    <f>print</f>()"],
  ["", "    <f>flavor</f>(<s>\"You have walked %d kilometers...\"</s> % ("],
  ["", "        kilometersWalked))"],
  ["", "    marketYN = <f>input</f>(<s>\"\"</s>)"],
  ["", "    marketYN.lower()"],
  ["", "    <k>if</k> marketYN == <s>\"yes\"</s>:"],
  ["", "        <f>EnteredMarket</f>()"],
  ["", "    <k>elif</k> marketYN == <s>\"no\"</s>:"],
  ["", "        <f>print</f>(<s>\"oh, fine then be like that...\"</s>)"],
  ["", ""],
  ["", "<k>def</k> <f>Market</f>():"],
  ["", "    <k>while</k> macheteShop[<n>3</n>] <k>is</k> <k>True</k>:"],
  ["", "        <k>global</k> macheteCost"],
  ["", "        macheteCost = <n>10000000</n>"],
  ["", "        macheteShop.pop(<n>1</n>)"],
  ["", "        macheteShop.insert(<n>1</n>, <s>\"$10000000\"</s>)"],
  ["", "        macheteShop[<n>2</n>] = macheteCost"],
  ["", ""],
  ["", "    <k>if</k> helmetShop[<n>3</n>] <k>is</k> <k>True</k>:"],
  ["", "        <k>global</k> helmetCost"],
  ["", "        helmetCost = <n>10000000</n>"],
  ["", "        helmetShop.pop(<n>1</n>)"],
  ["", "        helmetShop.insert(<n>1</n>, <s>\"$10000000\"</s>)"],
  ["", ""],
  ["c", "    # ... 300 more lines of this"],
];

const TOKEN_CLASS: Record<string, string> = {
  k: "text-flame",
  s: "text-volt",
  n: "text-amber-300",
  c: "text-muted-foreground/70",
  f: "text-sky-300",
};

/** Renders the tiny <k>/<s>/<n>/<c>/<f> markup used by the code data. */
function paint(text: string): ReactNode {
  const parts = text.split(/(<\/?[knscf]>)/);
  const out: ReactNode[] = [];
  let cls: string | null = null;
  parts.forEach((part, i) => {
    const open = /^<([knscf])>$/.exec(part);
    if (open) {
      cls = TOKEN_CLASS[open[1]] ?? null;
      return;
    }
    if (/^<\/[knscf]>$/.test(part)) {
      cls = null;
      return;
    }
    if (!part) return;
    out.push(
      cls ? (
        <span key={i} className={cls}>
          {part}
        </span>
      ) : (
        <Fragment key={i}>{part}</Fragment>
      ),
    );
  });
  return out;
}

/** Renders the inline <code> markup used inside bug explanations. */
function paintProse(text: string): ReactNode {
  return text.split(/(<code>[\s\S]*?<\/code>)/).map((part, i) => {
    const m = /^<code>([\s\S]*?)<\/code>$/.exec(part);
    if (!m) return <Fragment key={i}>{part}</Fragment>;
    return (
      <code
        key={i}
        className="rounded-[3px] bg-flame/10 px-1 py-px font-mono text-[0.9em] text-flame"
      >
        {m[1]}
      </code>
    );
  });
}

type Tab = "hunt" | "snip" | "full";
type Pane = "intro" | "snip" | "full" | "res";
type Result =
  | { kind: "ok"; n: string; title: string; body: string }
  | { kind: "no"; body: string };

const TABS: { id: Tab; label: string }[] = [
  { id: "hunt", label: "shop.py" },
  { id: "snip", label: "snippets.py" },
  { id: "full", label: "main.py" },
];

export function BugHunt() {
  const [tab, setTab] = useState<Tab>("hunt");
  const [pane, setPane] = useState<Pane>("intro");
  const [found, setFound] = useState<string[]>([]);
  const [bad, setBad] = useState<string | null>(null);
  const [result, setResult] = useState<Result | null>(null);
  const badTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => { if (badTimer.current) clearTimeout(badTimer.current); }, []);

  const rows = tab === "hunt" ? HUNT : tab === "snip" ? SNIP : FULL;
  const live = tab === "hunt";

  function selectTab(next: Tab) {
    setTab(next);
    setPane(next === "hunt" ? "intro" : next);
    setResult(null);
  }

  function clickLine(id: string) {
    if (id.startsWith("bug")) {
      const n = id.slice(3);
      const bug = BUG[n];
      if (!bug) return;
      setFound((f) => (f.includes(n) ? f : [...f, n]));
      setResult({ kind: "ok", n, title: bug.t, body: bug.b });
    } else {
      setBad(id);
      if (badTimer.current) clearTimeout(badTimer.current);
      badTimer.current = setTimeout(() => setBad(null), 1400);
      setResult({ kind: "no", body: OK[id] ?? "Not a bug — just early-days style." });
    }
    setPane("res");
  }

  function revealAll() {
    const firstBug = BUG["1"];
    if (!firstBug) return;
    setFound(["1", "2", "3", "4"]);
    setResult({ kind: "ok", n: "1", title: firstBug.t, body: firstBug.b });
    setPane("res");
  }

  const allFound = found.length === 4;
  const status = !allFound
    ? "Four bugs. Click the lines."
    : result?.kind === "ok" && found.length === 4 && pane === "res" && result.n === "1"
      ? "Click any green line to read it."
      : "All four. Better than I did for four years.";

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:items-start lg:gap-12">
      {/* left column: cross-fading panes */}
      <div className="relative min-w-0 lg:h-[30rem]">
        <Pane on={pane === "intro"}>
          <p className="bug-p">
            My first real project was a tiny text RPG I made in Python! I made it
            to showcase what I had learned in my first semester of Highschool
            computer science. Man, looking back at this code is so crazy, it helps
            me appreciate how far I&apos;ve come in this field!
          </p>
          <p className="bug-p font-semibold text-foreground">
            There are four bugs in the shop code on the right. I shipped every one
            of them and never noticed. Click any line you think is broken.
          </p>
        </Pane>

        <Pane on={pane === "snip"}>
          <p className="bug-p">The two snippets below are the ones that make me laugh most:</p>
          <ol className="list-decimal space-y-4 pl-5">
            <li className="bug-p !mb-0">
              Because at the time I did not know how to make an item go &quot;out
              of stock&quot; flag or use dictionary lookup, I simply hyperinflated
              the price as a form of state management! Definitely not the cleanest
              architecture, but as the forbidden rules of CS say: if it works,
              don&apos;t you touch it again!
            </li>
            <li className="bug-p !mb-0">
              The second snippet brings back fun memories! I debated for hours with
              my best friend on what to name the items – and forgot to balance the
              item stats. But hey, I added a fire weapon – impossible to buy –
              named The Sir. Jaffe, and figured out fun remixed names to my in-game
              items inspired by real cereal brands; remind me of just how fun
              software can be!
            </li>
          </ol>
        </Pane>

        <Pane on={pane === "full"}>
          <p className="bug-p">
            The whole thing, unedited. Roughly 400 lines of high-school me — global
            state, copy-pasted branches, and a shop that recursively calls itself
            instead of looping.
          </p>
          <p className="bug-p">
            I have not touched it. It runs exactly as badly as it did in 2022.
          </p>
        </Pane>

        <Pane on={pane === "res"}>
          {result ? (
            <>
              <div
                className={cn(
                  "mb-3 font-mono text-[11px] uppercase tracking-[0.14em]",
                  result.kind === "ok" ? "text-found" : "text-miss",
                )}
              >
                {result.kind === "ok" ? `Bug ${result.n} of 4 — Found` : "Not this one"}
              </div>
              <h3 className="mb-3 text-xl font-semibold tracking-tight">
                {result.kind === "ok" ? result.title : "This line is fine"}
              </h3>
              <p className="bug-p">{paintProse(result.body)}</p>
              <button
                type="button"
                onClick={() => setPane("intro")}
                className="font-mono text-xs text-muted-foreground transition-colors hover:text-foreground"
              >
                ← back to the hunt
              </button>
            </>
          ) : null}
        </Pane>
      </div>

      {/* right column: code window */}
      <div className="min-w-0">
        <div className="flex h-[30rem] flex-col overflow-hidden rounded-lg border border-border bg-ink-soft">
          <div className="flex shrink-0 items-center gap-1 border-b border-border px-4">
            <div className="mr-3 flex gap-1.5">
              <span className="size-2.5 rounded-full bg-flame" />
              <span className="size-2.5 rounded-full bg-foreground/20" />
              <span className="size-2.5 rounded-full bg-foreground/20" />
            </div>
            {TABS.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => selectTab(t.id)}
                className={cn(
                  "border-b-2 border-transparent px-2.5 py-3 font-mono text-xs transition-colors sm:px-3",
                  tab === t.id
                    ? "border-flame text-foreground"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {t.label}
              </button>
            ))}
            {live ? (
              <div className="ml-auto shrink-0 font-mono text-[11px] uppercase tracking-[0.1em] text-muted-foreground">
                <b className="font-semibold text-found">{found.length}</b>/4 Found
              </div>
            ) : null}
          </div>

          <pre className="min-h-0 flex-1 overflow-auto py-3.5 font-mono text-[12.6px] leading-[1.72]">
            <code className="block">
              {rows.map(([id, text], i) => {
                const clickable = live && id !== "" && id !== "c";
                const hit = id.startsWith("bug") && found.includes(id.slice(3));
                const isBad = bad === id && !!id;
                const body =
                  id === "c" ? (
                    <span className={TOKEN_CLASS["c"]}>{text}</span>
                  ) : text ? (
                    paint(text)
                  ) : (
                    "\u00a0"
                  );
                return (
                  <span
                    key={i}
                    role={clickable ? "button" : undefined}
                    tabIndex={clickable ? 0 : undefined}
                    onClick={clickable ? () => clickLine(id) : undefined}
                    onKeyDown={
                      clickable
                        ? (e) => {
                            if (e.key === "Enter" || e.key === " ") {
                              e.preventDefault();
                              clickLine(id);
                            }
                          }
                        : undefined
                    }
                    className={cn(
                      "block whitespace-pre border-l-2 border-transparent px-4 outline-none",
                      clickable &&
                        "cursor-pointer transition-[background-color,border-color] duration-150 hover:border-muted-foreground hover:bg-foreground/5 focus-visible:border-muted-foreground focus-visible:bg-foreground/5",
                      hit && "!border-found !bg-found/10",
                      isBad && "!border-miss !bg-miss/10",
                    )}
                  >
                    {body}
                  </span>
                );
              })}
            </code>
          </pre>
        </div>

        {live ? (
          <div className="mt-3 flex flex-wrap items-center gap-4 font-mono text-xs text-muted-foreground">
            <span>{status}</span>
            <button
              type="button"
              onClick={revealAll}
              className="rounded-md border border-border px-3 py-1.5 text-[11.5px] transition-colors hover:border-flame hover:text-foreground"
            >
              Show me all four
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
}

function Pane({ on, children }: { on: boolean; children: ReactNode }) {
  return (
    <div
      aria-hidden={!on}
      className={cn(
        "bug-pane lg:absolute lg:inset-0 lg:overflow-auto lg:transition-opacity lg:duration-200",
        on ? "block lg:opacity-100" : "hidden lg:block lg:pointer-events-none lg:opacity-0",
      )}
    >
      {children}
    </div>
  );
}
