import { CodeCard } from "./CodeCard";
import { Reveal } from "./Reveal";

export function FirstProject() {
  return (
    <section
      id="origin"
      className="mx-auto max-w-6xl px-5 py-20 sm:px-8 lg:py-28"
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

      <div className="mt-12 grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
        <Reveal delay={80}>
          <div className="space-y-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
            <p>
              My first real project lived in a browser tab. No local setup, no
              tooling, no idea what I was doing — just Replit, a blank Python
              file, and an afternoon I thought would be short.
            </p>
            <p>
              It was a small program that took a messy list of things I had to
              do and sorted them by how badly they needed doing. Trivial code.
              But the first time it printed the right order back at me, I
              realized I could make a computer do something nobody had asked it
              to do yet.
            </p>
            <p className="text-foreground">
              That&apos;s the moment the whole thing clicked. Everything after
              this section is downstream of that tab.
            </p>
          </div>
        </Reveal>

        <Reveal delay={140}>
          <CodeCard filename="main.py" badge="repl · v0.1">
            <span className="text-muted-foreground">
              # the first thing I ever wrote that worked
            </span>
            {"\n"}
            <span className="text-flame">def</span>{" "}
            <span className="text-volt">rank</span>(tasks):{"\n"}
            {"    "}
            <span className="text-flame">return</span>{" "}
            <span className="text-volt">sorted</span>(
            {"\n"}
            {"        "}tasks,{"\n"}
            {"        "}key=
            <span className="text-flame">lambda</span> t: (t.due, -t.weight),
            {"\n"}
            {"    "}){"\n\n"}
            <span className="text-flame">for</span> t{" "}
            <span className="text-flame">in</span> rank(load()):{"\n"}
            {"    "}
            <span className="text-volt">print</span>(
            <span className="text-flame">f</span>
            <span className="text-foreground/60">
              &quot;{"{"}t.due{"}"} · {"{"}t.name{"}"}&quot;
            </span>
            )
          </CodeCard>
        </Reveal>
      </div>
    </section>
  );
}
