import { ArrowUpRight } from "lucide-react";
import cohortPhoto from "@/assets/sabatte-cohort.jpg";
import { Reveal } from "./Reveal";

const ARTICLE_URL =
  "https://lookout.co/uc-santa-cruz-students-talk-about-impact-of-full-ride-scholarships-from-historic-alumnus-gift/story";

export function UCSC() {
  return (
    <section id="ucsc" className="portfolio-section snap-start scroll-mt-28 border-y border-border bg-ink-soft/40 px-5 py-14 sm:px-8 lg:py-20">
      <div>
        <Reveal>
          <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-flame">02 — Santa Cruz</p>
          <h2 className="mt-4 font-display text-[clamp(2rem,6vw,4.5rem)] font-extrabold uppercase leading-[0.9] tracking-tight">
            A full ride
            <br />
            <span className="text-ghost">and a new cohort</span>
          </h2>
        </Reveal>

        <div className="mt-8 grid grid-cols-1 gap-8 lg:mt-10 lg:grid-cols-2 lg:gap-10">
          <Reveal delay={80}>
            <p className="max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg lg:text-xl">
              I came to UC Santa Cruz in the first cohort of Sabatte Family full-ride scholars — the first full ride in
              the university&apos;s history. It changed what I could afford to be curious about. I declared Computer Science
              with an Applied Math minor because I wanted both halves: the systems themselves, and the math that
              explains why they behave the way they do.
            </p>
          </Reveal>

          <Reveal delay={120}>
            <figure>
              <img
                src={cohortPhoto}
                alt="Christopher Zarraga Jimenez with his Sabatte Family scholarship cohort"
                width={1600}
                height={1000}
                className="aspect-[16/10] w-full rounded-[8px] object-cover"
              />
              <figcaption className="mt-3 font-mono text-[10px] uppercase leading-relaxed tracking-[0.16em] text-muted-foreground">
                First cohort of Sabatte Family full-ride scholars at UC Santa Cruz
              </figcaption>
              <a
                href={ARTICLE_URL}
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-foreground transition-colors duration-200 hover:text-muted-foreground"
              >
                Read the scholarship story
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </figure>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
