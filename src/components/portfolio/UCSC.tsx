import { ArrowUpRight } from "lucide-react";
import { Reveal } from "./Reveal";

const ARTICLE_URL =
  "https://lookout.co/uc-santa-cruz-students-talk-about-impact-of-full-ride-scholarships-from-historic-alumnus-gift/story";

export function UCSC() {
  return (
    <section id="ucsc" className="-mx-5 border-y border-border bg-ink-soft/40 px-5 py-14 sm:-mx-8 sm:px-8 lg:py-20">
      <div>
        <Reveal>
          <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-volt">02 — Santa Cruz</p>
          <h2 className="mt-4 font-display text-[clamp(2rem,6vw,4.5rem)] font-extrabold uppercase leading-[0.9] tracking-tight">
            First full ride
            <br />
            <span className="text-ghost">in school history</span>
          </h2>
        </Reveal>

        <div className="mt-8 grid grid-cols-1 gap-8 lg:mt-10 lg:grid-cols-2 lg:gap-10">
          {/* Left: description */}
          <Reveal delay={80}>
            <p className="text-base leading-relaxed text-muted-foreground sm:text-lg lg:text-xl">
              I came to UC Santa Cruz in the first cohort of Sabatte Family full-ride scholars — the first full ride in
              the university's history. It changed what I could afford to be curious about. I declared Computer Science
              with an Applied Math minor because I wanted both halves: the systems themselves, and the math that
              explains why they behave the way they do.
            </p>
          </Reveal>

          {/* Right: embedded article */}
          <Reveal delay={120}>
            <div className="flex h-full flex-col">
              <div className="relative overflow-hidden rounded-[2rem] border border-border bg-ink">
                <iframe
                  src={ARTICLE_URL}
                  title="Lookout Santa Cruz — Full-ride scholarship article"
                  className="aspect-[4/3] w-full"
                  loading="lazy"
                  sandbox="allow-scripts allow-same-origin allow-popups"
                />
              </div>
              <a
                href={ARTICLE_URL}
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-flex items-center gap-2 self-start rounded-full border border-border px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.2em] text-foreground transition-colors hover:border-volt hover:text-volt"
              >
                Open article in new tab
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
