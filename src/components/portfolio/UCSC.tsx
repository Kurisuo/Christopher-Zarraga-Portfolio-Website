import { ArrowUpRight } from "lucide-react";
import { Reveal } from "./Reveal";

export function UCSC() {
  return (
    <section
      id="ucsc"
      className="-mx-5 border-y border-border bg-ink-soft/40 px-5 py-14 sm:-mx-8 sm:px-8 lg:py-20"
    >
      <div>
        <Reveal>
          <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-volt">
            02 — Santa Cruz
          </p>
          <h2 className="mt-4 font-display text-[clamp(2rem,6vw,4.5rem)] font-extrabold uppercase leading-[0.9] tracking-tight">
            First full ride
            <br />
            <span className="text-ghost">in school history</span>
          </h2>
        </Reveal>

        <Reveal delay={80}>
          <p className="mt-6 max-w-4xl text-base leading-relaxed text-muted-foreground sm:text-lg lg:text-xl">
            I came to UC Santa Cruz as the first-ever recipient of the Sabatte
            Family full-ride scholarship — the first full ride in the
            university&apos;s history. It changed what I could afford to be
            curious about. I declared Computer Science with an Applied Math
            minor because I wanted both halves — the systems that run and the
            math that explains why they run the way they do. Two projects from
            that stretch matter most.
          </p>
        </Reveal>

        <div className="mt-8 lg:mt-10">
          {/* Press — scholarship article */}
          <Reveal delay={120}>
            <article className="h-full rounded-[2rem] border border-border bg-ink p-6 sm:p-8">
              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-full bg-volt px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-volt-foreground">
                  In the press
                </span>
                <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                  Lookout Santa Cruz
                </span>
              </div>
              <h3 className="mt-5 max-w-4xl font-display text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl">
                UC Santa Cruz students talk about impact of full-ride
                scholarships from historic alumnus gift
              </h3>
              <p className="mt-4 max-w-4xl text-base leading-relaxed text-muted-foreground lg:text-lg">
                Lookout Santa Cruz covered the Sabatte Family gift and the
                first cohort of full-ride scholars — including how the
                scholarship reshaped what I could pursue in Computer Science
                and Applied Mathematics at UCSC.
              </p>
              <a
                href="https://lookout.co/uc-santa-cruz-students-talk-about-impact-of-full-ride-scholarships-from-historic-alumnus-gift/story"
                target="_blank"
                rel="noreferrer"
                className="mt-6 inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.2em] text-foreground transition-colors hover:border-volt hover:text-volt"
              >
                Read the article
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </article>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
