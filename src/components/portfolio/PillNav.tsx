import { Home, Terminal, GraduationCap, FolderGit2, Mail } from "lucide-react";

const items = [
  { href: "#top", label: "Intro", Icon: Home },
  { href: "#origin", label: "First project", Icon: Terminal },
  { href: "#ucsc", label: "UCSC", Icon: GraduationCap },
  { href: "#work", label: "Projects", Icon: FolderGit2 },
  { href: "#contact", label: "Contact", Icon: Mail },
];

export function PillNav() {
  return (
    <nav className="pointer-events-none fixed inset-x-0 top-5 z-50 flex justify-center px-4">
      <ul className="pointer-events-auto flex items-center gap-1 rounded-full border border-primary/40 bg-nav px-2 py-2 shadow-[0_10px_30px_-12px_oklch(0_0_0/0.9)]">
        {items.map(({ href, label, Icon }) => (
          <li key={href}>
            <a
              href={href}
              aria-label={label}
              title={label}
              className="flex size-10 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
            >
              <Icon className="size-[18px]" />
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
