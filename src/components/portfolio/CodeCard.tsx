import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function CodeCard({
  filename,
  badge,
  children,
  className,
}: {
  filename: string;
  badge?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex min-w-0 flex-col overflow-hidden rounded-3xl border border-border bg-ink-soft",
        className,
      )}
    >
      <div className="flex shrink-0 items-center gap-2 border-b border-border px-5 py-4">
        <span className="size-2.5 rounded-full bg-flame" />
        <span className="size-2.5 rounded-full bg-foreground/20" />
        <span className="size-2.5 rounded-full bg-foreground/20" />
        <span className="ml-2 min-w-0 truncate font-mono text-xs text-muted-foreground">
          {filename}
        </span>
        {badge ? (
          <span className="ml-auto flex shrink-0 items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-volt">
            <span className="size-1.5 rounded-full bg-volt" />
            {badge}
          </span>
        ) : null}
      </div>
      <pre className="min-h-0 flex-1 overflow-auto p-5 font-mono text-[12px] leading-relaxed text-foreground/85 sm:p-6 sm:text-[13px]">
        <code>{children}</code>
      </pre>
    </div>
  );
}

