import { BugHunt } from "./BugHunt";
import { Reveal } from "./Reveal";

export function FirstProject() {
  return (
    <section
      id="origin"
      className="portfolio-section snap-start scroll-mt-40 pb-14 pt-24 lg:pb-20 lg:pt-28"
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

      <Reveal delay={80} className="mt-8 min-w-0">
        <BugHunt />
      </Reveal>
    </section>
  );
}
