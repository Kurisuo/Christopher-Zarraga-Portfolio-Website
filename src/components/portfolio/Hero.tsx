import { Reveal } from "./Reveal";
import { ProfileCard } from "./ProfileCard";

const stats = [
  { value: "1st", label: ["COHORT FULL RIDE", "RECIPIENT AT UCSC"] },
  { value: "5", label: ["ENGINEERS LED", "ON VERIFI"] },
  { value: "First-gen", label: ["COLLEGE SCHOLAR", "IN SHPE"] },
  { value: "3rd", label: ["YEAR AT UCSC", "CS + APPLIED MATH"] },
];

export function Hero() {
  return (
    <header id="top" className="portfolio-section scroll-mt-28 pb-14 pt-28 lg:pb-16 lg:pt-32">
      <Reveal className="mb-12 lg:hidden"><ProfileCard /></Reveal>

      <Reveal delay={80}>
        <h1 className="font-display text-[clamp(2.75rem,9vw,7rem)] font-extrabold uppercase leading-[0.85] tracking-tight">
          Computer<br /><span className="text-ghost">Science</span>
        </h1>
        <p className="mt-7 max-w-3xl text-lg leading-relaxed text-muted-foreground sm:text-xl lg:text-[1.35rem] lg:leading-relaxed">
          I&apos;m Christopher Zarraga — a CS major and Applied Math minor at UC Santa Cruz, here on the Sabatte Family full-ride scholarship, the first ever awarded by the university. I spend most of my time turning half-formed ideas into systems that actually run.
        </p>
      </Reveal>

      <div className="mt-10 border-y border-border py-5 lg:mt-12">
        <dl className="grid grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <div key={stat.value + stat.label[0]} className={`flex min-w-0 flex-col items-center justify-center px-3 text-center ${index > 0 ? "border-l border-hairline" : ""}`}>
              <dt className="whitespace-nowrap font-display text-xl font-bold leading-none tracking-tight sm:text-3xl">{stat.value}</dt>
              <dd className="mt-2 font-mono text-[9px] uppercase leading-tight tracking-[0.12em] text-muted-foreground sm:text-[10px]">{stat.label[0]}<br />{stat.label[1]}</dd>
            </div>
          ))}
        </dl>
      </div>
    </header>
  );
}
