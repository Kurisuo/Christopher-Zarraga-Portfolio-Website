import { ArrowUpRight } from "lucide-react";
import { Reveal } from "./Reveal";

const ARTICLE_URL =
  "https://lookout.co/uc-santa-cruz-students-talk-about-impact-of-full-ride-scholarships-from-historic-alumnus-gift/story";

export function UCSC() {
  return (
    <section id="ucsc" className="scroll-mt-32 -mx-5 border-y border-border bg-ink-soft/40 px-5 py-14 sm:-mx-8 sm:px-8 lg:py-20">
      <div>
        <Reveal>
          <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-volt">02 — Santa Cruz</p>
          <h2 className="mt-4 max-w-3xl font-display text-[clamp(1.5rem,3.6vw,2.4rem)] font-extrabold uppercase leading-[0.95] tracking-tight">
            First full ride<br />in school history
          </h2>
        </Reveal>

        <div className="mt-8 grid grid-cols-1 gap-8 lg:mt-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-10">
          <Reveal delay={80}>
            <p className="max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg lg:text-xl">
              I came to UC Santa Cruz in the first cohort of Sabatte Family full-ride scholars — the first full ride in the university&apos;s history. It changed what I could afford to be curious about. I declared Computer Science with an Applied Math minor because I wanted both halves: the systems themselves, and the math that explains why they behave the way they do.
            </p>
          </Reveal>

          <Reveal delay={120}>
            <article className="card-surface rounded-lg border border-border p-6 sm:p-7">
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-volt">Lookout Santa Cruz</p>
              <h3 className="mt-4 font-display text-2xl font-bold leading-tight sm:text-3xl">
                UC Santa Cruz students talk about the impact of full-ride scholarships from a historic alumnus gift
              </h3>
              <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Scholarship coverage</p>
              <p className="mt-6 text-sm leading-relaxed text-muted-foreground sm:text-base">
                The story follows students whose education became possible through the Sabatte Family gift, including how that support creates room to focus on school, ambition, and the communities we want to build.
              </p>
              <a href={ARTICLE_URL} target="_blank" rel="noreferrer" className="mt-7 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-volt transition-colors duration-180 hover:text-foreground">
                Read on Lookout Santa Cruz <ArrowUpRight className="size-4" />
              </a>
            </article>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
