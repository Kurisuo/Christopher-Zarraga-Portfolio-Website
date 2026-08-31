import { ArrowRight } from "lucide-react";
import { Reveal } from "./Reveal";
import { ProfileCard } from "./ProfileCard";
import { ChessQueen } from "./ChessQueen";

const stats = [
  { value: "1st", label: ["FULL RIDE IN", "UCSC HISTORY"] },
  { value: "+8", label: ["PROJECTS", "SHIPPED"] },
  { value: "48h", label: ["NVIDIA HACKATHON", "BUILD"] },
];

export function Hero() {
  return (
    <header id="top" className="pb-20 pt-28 lg:pt-36">
      {/* Profile card — mobile only; desktop shows the pinned left column */}
      <Reveal className="mb-12 lg:hidden">
        <ProfileCard />
      </Reveal>

      <Reveal delay={80}>
        <h1 className="font-display text-[clamp(2.75rem,9vw,7rem)] font-extrabold uppercase leading-[0.85] tracking-tight">
          Computer
          <br />
          <span className="text-ghost">Science</span>
        </h1>
        <p className="mt-7 max-w-lg text-base leading-relaxed text-muted-foreground sm:text-lg">
          I&apos;m a CS and Applied Math student at UC Santa Cruz. I got here on
          the first full-ride scholarship in the university&apos;s history, and
          I spend most of my time turning half-formed ideas into things that
          actually run.
        </p>
      </Reveal>

      <Reveal delay={160} className="mt-12">
        <dl className="flex flex-wrap gap-x-10 gap-y-6">
          {stats.map((s) => (
            <div key={s.value}>
              <dt className="font-display text-4xl font-bold tracking-tight sm:text-5xl">
                {s.value}
              </dt>
              <dd className="mt-1 font-mono text-[11px] uppercase leading-relaxed tracking-wider text-muted-foreground">
                {s.label[0]}
                <br />
                {s.label[1]}
              </dd>
            </div>
          ))}
        </dl>
      </Reveal>

      <div className="mt-12 grid gap-4 sm:grid-cols-2">
        <Reveal delay={200}>
          <div className="flex h-full flex-col rounded-3xl bg-flame p-6 text-flame-foreground">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em]">
              Selected work
            </p>
            <ul className="mt-4 space-y-2 font-display text-lg font-semibold leading-snug">
              <li>NVPilot — NVIDIA campus hackathon</li>
              <li>Applied math visualizers</li>
              <li>Full-stack side projects</li>
            </ul>
            <a
              href="#work"
              className="mt-6 flex size-9 items-center justify-center self-end rounded-full border border-flame-foreground/40 transition-transform hover:translate-x-1"
              aria-label="Jump to projects"
            >
              <ArrowRight className="size-4" />
            </a>
          </div>
        </Reveal>
        <Reveal delay={260}>
          <div className="flex h-full flex-col rounded-3xl bg-volt p-6 text-volt-foreground">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em]">
              Off the keyboard
            </p>
            <ul className="mt-4 space-y-2 font-display text-lg font-semibold leading-snug">
              <li>Chess — always up for a game</li>
              <li>Basketball and long runs</li>
              <li>Music production</li>
              <li>Cooking for way too many people</li>
            </ul>
            <ChessQueen />
            <a
              href="#origin"
              className="mt-2 flex size-9 items-center justify-center self-end rounded-full border border-volt-foreground/40 transition-transform hover:translate-x-1"
              aria-label="Jump to my first project"
            >
              <ArrowRight className="size-4" />
            </a>
          </div>
        </Reveal>
      </div>
    </header>
  );
}
