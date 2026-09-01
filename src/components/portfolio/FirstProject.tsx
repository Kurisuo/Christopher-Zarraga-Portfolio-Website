import { CodeCard } from "./CodeCard";
import { Reveal } from "./Reveal";

export function FirstProject() {
  return (
    <section
      id="origin"
      className="py-14 lg:py-20"
    >
      <Reveal>
        <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-flame">
          01 — Where it started
        </p>
        <h2 className="mt-4 font-display text-[clamp(2rem,6vw,4.5rem)] font-extrabold uppercase leading-[0.9] tracking-tight">
          A Replit tab
          <br />
          <span className="text-ghost">that never closed</span>
        </h2>
      </Reveal>

      <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.55fr)] lg:items-start lg:gap-12 xl:gap-20">
        <Reveal delay={80} className="min-w-0">
          <div className="space-y-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
            <p>
              My first real project lived in a browser tab. No local setup, no
              tooling, no idea what I was doing — just Replit, a blank Python
              file, and an afternoon I thought would be short.
            </p>
            <p>
              It was a tiny text RPG: a player, a monster, a store with overpriced
              cereal, and a loop that rolled dice to see what happened next.
              Trivial code. But the first time it printed &quot;A monster appears
              with 50 HP!&quot; back at me, I realized I could make a computer do
              something nobody had asked it to do yet.
            </p>
            <p className="text-foreground">
              That&apos;s the moment the whole thing clicked. Everything after
              this section is downstream of that tab.
            </p>
          </div>
        </Reveal>

        <Reveal delay={140} className="min-w-0">
          <CodeCard filename="main.py" badge="repl · v0.1">
            <span className="text-muted-foreground"># my first working game loop</span>
            {"\n"}
            <span className="text-flame">import</span> random{" "}as{" "}rand{"\n\n"}
            <span className="text-flame">class</span>{" "}
            <span className="text-volt">Monster</span>:{"\n"}
            {"    "}<span className="text-flame">def</span>{" "}
            <span className="text-volt">__init__</span>(
            <span className="text-foreground/60">self</span>, health=
            <span className="text-volt">50</span>, attack=
            <span className="text-volt">10</span>):{"\n"}
            {"        "}self.health = health{"\n"}
            {"        "}self.attack = attack{"\n"}
            {"        "}self.drops = {"{"}
            {"\n"}
            {"            "}&quot;currency&quot;: rand.randrange(
            <span className="text-volt">1</span>,{" "}
            <span className="text-volt">50</span>),{"\n"}
            {"            "}&quot;items&quot;: [
            <span className="text-foreground/60">&quot;bronze-sword&quot;</span>,{" "}
            <span className="text-foreground/60">&quot;iron-ingot&quot;</span>],{"\n"}
            {"        "}{"}"}{"\n\n"}
            <span className="text-flame">class</span>{" "}
            <span className="text-volt">Game</span>:{"\n"}
            {"    "}<span className="text-flame">def</span>{" "}
            <span className="text-volt">__init__</span>(
            <span className="text-foreground/60">self</span>):{"\n"}
            {"        "}self.player = Player(){"\n"}
            {"        "}self.has_lost ={" "}
            <span className="text-flame">False</span>{"\n"}
            {"        "}self.steps_taken ={" "}
            <span className="text-volt">0</span>{"\n\n"}
            {"    "}<span className="text-flame">def</span>{" "}
            <span className="text-volt">trigger_encounter</span>(
            <span className="text-foreground/60">self</span>):{"\n"}
            {"        "}monster = Monster(){"\n"}
            {"        "}print(
            <span className="text-foreground/60">
              &quot;A monster appears with {"{"}monster.health{"}"} HP!&quot;
            </span>
            ){"\n\n"}
            {"    "}<span className="text-flame">def</span>{" "}
            <span className="text-volt">run</span>(
            <span className="text-foreground/60">self</span>):{"\n"}
            {"        "}while{" "}
            <span className="text-flame">not</span>{" "}self.has_lost{" "}
            <span className="text-flame">and</span>{" "}self.steps_taken &lt;{" "}
            <span className="text-volt">10</span>:{"\n"}
            {"            "}self.steps_taken +={" "}
            <span className="text-volt">1</span>{"\n"}
            {"            "}roll = rand.randrange(
            <span className="text-volt">1</span>,{" "}
            <span className="text-volt">11</span>){"\n\n"}
            {"            "}if roll %{" "}
            <span className="text-volt">3</span>{" "}=={" "}
            <span className="text-volt">0</span>:{"\n"}
            {"                "}print(
            <span className="text-foreground/60">
              &quot;[Step {"{"}self.steps_taken{"}"}] Monster!&quot;
            </span>
            ){"\n"}
            {"                "}self.trigger_encounter(){"\n"}
            {"            "}else:{"\n"}
            {"                "}print(
            <span className="text-foreground/60">
              &quot;[Step {"{"}self.steps_taken{"}"}] Peaceful walk...&quot;
            </span>
            )
          </CodeCard>
        </Reveal>
      </div>
    </section>
  );
}
