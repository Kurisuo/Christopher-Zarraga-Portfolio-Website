import { Github, Linkedin, Mail } from "lucide-react";
import portrait from "@/assets/portrait.jpg";
import { cn } from "@/lib/utils";

export function ProfileCard({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "rounded-[2rem] bg-surface p-5 text-surface-foreground",
        className,
      )}
    >
      <img
        src={portrait}
        alt="Christopher Zarraga Jimenez"
        width={1024}
        height={1280}
        className="aspect-[4/5] w-full rounded-2xl object-cover"
      />
      <h2 className="mt-6 text-center font-display text-2xl font-bold tracking-tight">
        Christopher Zarraga Jimenez
      </h2>
      <p className="mt-3 text-center text-sm leading-relaxed text-surface-foreground/60">
        A Computer Science student building things that are equal parts math and
        stubbornness.
      </p>
      <div className="mt-6 flex justify-center gap-3">
        <a
          href="https://github.com"
          className="flex size-10 items-center justify-center rounded-full bg-surface-foreground/5 text-flame transition-colors hover:bg-flame hover:text-flame-foreground"
          aria-label="GitHub"
        >
          <Github className="size-[18px]" />
        </a>
        <a
          href="https://linkedin.com"
          className="flex size-10 items-center justify-center rounded-full bg-surface-foreground/5 text-flame transition-colors hover:bg-flame hover:text-flame-foreground"
          aria-label="LinkedIn"
        >
          <Linkedin className="size-[18px]" />
        </a>
        <a
          href="#contact"
          className="flex size-10 items-center justify-center rounded-full bg-surface-foreground/5 text-flame transition-colors hover:bg-flame hover:text-flame-foreground"
          aria-label="Email"
        >
          <Mail className="size-[18px]" />
        </a>
      </div>
    </div>
  );
}
