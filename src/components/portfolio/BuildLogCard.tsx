import { cn } from "@/lib/utils";

type BuildLogCardProps = {
  name: string;
  tag: string;
  blurb: string;
  description: string;
  metric: string;
  href?: string;
  open: boolean;
  onToggle: () => void;
  onOpen: () => void;
  onClose: () => void;
};

export function BuildLogCard({ name, tag, blurb, description, metric, href, open, onToggle, onOpen, onClose }: BuildLogCardProps) {
  return (
    <article
      className={cn(
        "group flex h-full min-w-0 flex-col border border-border bg-ink-soft p-5 transition-[opacity,border-color] duration-200 ease-out",
        open ? "border-foreground/40" : "hover:border-foreground/40",
      )}
      onMouseEnter={onOpen}
      onMouseLeave={onClose}
    >
      <button type="button" className="w-full text-left" aria-expanded={open} onClick={onToggle}>
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{tag}</span>
        <h3 className="mt-3 font-display text-2xl font-bold leading-tight tracking-tight transition-colors duration-200 group-hover:text-foreground">{name}</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{blurb}</p>
      </button>
      <div className={cn("grid transition-[grid-template-rows,opacity] duration-[350ms] ease-[cubic-bezier(0.4,0,0.2,1)]", open ? "mt-4 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0")}>
        <div className="min-h-0 overflow-hidden">
          <p className="text-[14.5px] leading-[1.65] text-[#B4B4BC]">{description}</p>
          <p className="mt-3 font-mono text-[12.5px] leading-relaxed text-code-key">{metric}</p>
          {href ? (
            <a
              href={href}
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-block font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground transition-colors duration-200 hover:text-foreground"
            >
              View on GitHub ↗
            </a>
          ) : null}
        </div>
      </div>
    </article>
  );
}
