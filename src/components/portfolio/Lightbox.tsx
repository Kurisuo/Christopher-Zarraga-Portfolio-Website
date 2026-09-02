import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

export type LightboxSlide = {
  image: string;
  alt: string;
  caption: string;
};

type Props = {
  slides: LightboxSlide[];
  index: number;
  onNavigate: (next: number, direction: number) => void;
  onClose: () => void;
};

export function Lightbox({ slides, index, onNavigate, onClose }: Props) {
  const [entered, setEntered] = useState(false);
  const [closing, setClosing] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const touchStart = useRef<{ x: number; y: number } | null>(null);

  const requestClose = useCallback(() => {
    setClosing(true);
    // wait for the reverse animation, then unmount
    window.setTimeout(onClose, 260);
  }, [onClose]);

  const prev = useCallback(
    () => onNavigate(index - 1, -1),
    [index, onNavigate],
  );
  const next = useCallback(
    () => onNavigate(index + 1, 1),
    [index, onNavigate],
  );

  // entrance animation + body scroll lock
  useEffect(() => {
    const raf = requestAnimationFrame(() => setEntered(true));
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      cancelAnimationFrame(raf);
      document.body.style.overflow = prevOverflow;
    };
  }, []);

  // keyboard: arrows navigate, escape closes, focus trap
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        requestClose();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        prev();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        next();
      } else if (e.key === "Tab") {
        const root = rootRef.current;
        if (!root) return;
        const focusables = root.querySelectorAll<HTMLElement>("button");
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (!first || !last) return;
        const active = document.activeElement as HTMLElement | null;
        if (e.shiftKey) {
          if (!active || !root.contains(active) || active === first) {
            e.preventDefault();
            last.focus();
          }
        } else if (!active || !root.contains(active) || active === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [prev, next, requestClose]);

  const visible = entered && !closing;
  const slide = slides[index];

  return (
    <div
      ref={rootRef}
      role="dialog"
      aria-modal="true"
      aria-label="Photo viewer"
      className="fixed inset-0 z-[100] flex items-center justify-center"
      onTouchStart={(e) => {
        const t = e.touches[0];
        if (t) touchStart.current = { x: t.clientX, y: t.clientY };
      }}
      onTouchEnd={(e) => {
        const start = touchStart.current;
        touchStart.current = null;
        const t = e.changedTouches[0];
        if (!start || !t) return;
        const dx = t.clientX - start.x;
        const dy = t.clientY - start.y;
        if (Math.abs(dy) > 70 && Math.abs(dy) > Math.abs(dx) && dy > 0) {
          requestClose();
        } else if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) {
          if (dx < 0) next();
          else prev();
        }
      }}
    >
      {/* backdrop */}
      <button
        type="button"
        aria-label="Close photo viewer"
        onClick={requestClose}
        className="absolute inset-0 cursor-default transition-opacity duration-200 motion-reduce:transition-none"
        style={{ background: "rgba(10, 10, 12, 0.92)", opacity: visible ? 1 : 0 }}
      />

      {/* close */}
      <button
        ref={closeRef}
        type="button"
        aria-label="Close"
        onClick={requestClose}
        className="absolute right-4 top-4 z-20 rounded-full border border-border bg-ink/80 p-2 text-foreground backdrop-blur transition-colors duration-200 hover:bg-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground"
      >
        <X className="h-5 w-5" />
      </button>

      {/* arrows */}
      <button
        type="button"
        aria-label="Previous photo"
        onClick={prev}
        className="absolute left-3 top-1/2 z-20 -translate-y-1/2 rounded-full border border-border bg-ink/80 p-2.5 text-foreground backdrop-blur transition-colors duration-200 hover:bg-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground sm:left-6"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        type="button"
        aria-label="Next photo"
        onClick={next}
        className="absolute right-3 top-1/2 z-20 -translate-y-1/2 rounded-full border border-border bg-ink/80 p-2.5 text-foreground backdrop-blur transition-colors duration-200 hover:bg-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground sm:right-6"
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      {/* image + caption */}
      <figure
        className="relative z-10 flex h-full w-full flex-col items-center justify-center gap-4 px-4 py-16 sm:px-16"
        onClick={(e) => e.stopPropagation()}
      >
        {slide && (
          <img
            key={slide.image}
            src={slide.image}
            alt={slide.alt}
            className="max-h-full max-w-full rounded-[6px] object-contain transition-[transform,opacity] duration-[250ms] motion-reduce:transition-opacity"
            style={{
              maxWidth: "min(90vw, 100%)",
              maxHeight: "min(85vh, 100%)",
              transform: visible ? "scale(1)" : "scale(0.92)",
              opacity: visible ? 1 : 0,
              transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
            }}
          />
        )}
        {slide && (
          <figcaption
            className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground transition-opacity duration-200"
            style={{ opacity: visible ? 1 : 0 }}
          >
            {slide.caption}
          </figcaption>
        )}
      </figure>
    </div>
  );
}
