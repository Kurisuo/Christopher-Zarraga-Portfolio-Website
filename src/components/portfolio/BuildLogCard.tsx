import type { ReactNode } from "react";
import { CodeCard } from "./CodeCard";
import { cn } from "@/lib/utils";

type BuildLogCardProps = {
  name: string;
  tag: string;
  blurb: string;
  detail: string;
  code: ReactNode;
  open: boolean;
  onToggle: () => void;
  onOpen: () => void;
  onClose: () => void;
};

export function BuildLogCard({
  name,
  tag,
  blurb,
  detail,
  code,
  open,
  onToggle,
  onOpen,
  onClose,
}: BuildLogCardProps) {
  return (
    <article
      className={cn(
        "group min-w-0 border border-border bg-ink-soft p-5 transition-[opacity,border-color] duration-200 ease-out",
        open ? "border-violet" : "hover:border-violet",
      )}
      onMouseEnter={onOpen}
      onMouseLeave={onClose}
    >
      <button
        type="button"
        className="w-full text-left"
        aria-expanded={open}
        onClick={onToggle}
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-violet-muted">
          {tag}
        </span>
        <h3 className="mt-3 font-display text-2xl font-bold leading-tight tracking-tight transition-colors duration-200 group-hover:text-violet-muted">
          {name}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{blurb}</p>
        <p className="mt-2 font-mono text-[11px] leading-relaxed text-violet-muted">{detail}</p>
      </button>
      <div
        className={cn(
          "grid transition-[grid-template-rows,opacity] duration-[350ms] ease-[cubic-bezier(0.4,0,0.2,1)]",
          open ? "mt-4 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
        )}
      >
        <div className="min-h-0 overflow-hidden">
          <CodeCard filename={`${name.toLowerCase().replaceAll(" ", "-")}/main`} className="rounded-lg bg-ink">
            {code}
          </CodeCard>
        </div>
      </div>
    </article>
  );
}
