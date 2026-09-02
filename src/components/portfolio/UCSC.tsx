import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import cohortAsset from "@/assets/sabatte-cohort.jpg.asset.json";
import ycExpoPhoto from "@/assets/slide-yc-expo.jpg";
import berkeleyPhoto from "@/assets/slide-berkeley-regents.jpg";
import shpePhoto from "@/assets/slide-shpe-2026.jpg";
import { Reveal } from "./Reveal";
import { cn } from "@/lib/utils";

const ARTICLE_URL =
  "https://lookout.co/uc-santa-cruz-students-talk-about-impact-of-full-ride-scholarships-from-historic-alumnus-gift/story";

type Slide = {
  image: string;
  alt: string;
  caption: string;
  body: string;
};

const slides: Slide[] = [
  {
    image: cohortAsset.url,
    alt: "Christopher Zarraga Jimenez with his Sabatte Family scholarship cohort",
    caption: "Sabatte Family Scholars, first cohort.",
    body: "I came to UC Santa Cruz in the first cohort of Sabatte Family full-ride scholars — the first full ride in the university's history. It changed what I could afford to be curious about. I am so grateful; I got to declare Computer Science with an Applied Math minor because I wanted both halves: the systems themselves, and the math that explains why they behave the way they do.",
  },
  {
    image: ycExpoPhoto,
    alt: "Placeholder image for the Y Combinator Expo",
    caption: "Y Combinator Expo.",
    body: "",
  },
  {
    image: berkeleyPhoto,
    alt: "Placeholder image for the UC Berkeley Regents Conference",
    caption: "UC Berkeley Regents Conference.",
    body: "",
  },
  {
    image: shpePhoto,
    alt: "Placeholder image for the SHPE 2026 Conference",
    caption: "SHPE 2026 Conference.",
    body: "",
  },
];

export function UCSC() {
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(1);
  const mediaRef = useRef<HTMLDivElement>(null);
  const [mediaHeight, setMediaHeight] = useState<number>();
  const touchStart = useRef<number | null>(null);

  const go = useCallback((next: number, direction: number) => {
    setDir(direction);
    setIndex((next + slides.length) % slides.length);
  }, []);

  const prev = useCallback(() => go(index - 1, -1), [go, index]);
  const next = useCallback(() => go(index + 1, 1), [go, index]);

  useLayoutEffect(() => {
    const el = mediaRef.current;
    if (!el) return;
    const update = () => setMediaHeight(el.getBoundingClientRect().height);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    // no-op; keeps index bounded if slides change
    if (index >= slides.length) setIndex(0);
  }, [index]);

  return (
    <section
      id="ucsc"
      className="portfolio-section snap-start scroll-mt-28 border-y border-border bg-ink-soft/40 px-5 py-14 sm:px-8 lg:py-20"
    >
      <div>
        <Reveal>
          <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-flame">02 — Santa Cruz</p>
          <h2 className="mt-4 font-display text-[clamp(2rem,6vw,4.5rem)] font-extrabold uppercase leading-[0.9] tracking-tight">
            A full ride
            <br />
            <span className="text-ghost">and a new cohort</span>
          </h2>
        </Reveal>

        <div
          role="region"
          aria-roledescription="carousel"
          aria-label="Santa Cruz highlights"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "ArrowLeft") {
              e.preventDefault();
              prev();
            } else if (e.key === "ArrowRight") {
              e.preventDefault();
              next();
            }
          }}
          onTouchStart={(e) => {
            touchStart.current = e.touches[0]?.clientX ?? null;
          }}
          onTouchEnd={(e) => {
            const start = touchStart.current;
            touchStart.current = null;
            if (start == null) return;
            const delta = (e.changedTouches[0]?.clientX ?? start) - start;
            if (Math.abs(delta) > 40) (delta < 0 ? next : prev)();
          }}
          className="group/carousel mt-8 grid grid-cols-1 gap-8 outline-none lg:mt-10 lg:grid-cols-2 lg:gap-10"
        >
          <Reveal delay={80}>
            <div
              className="relative max-w-xl lg:h-[var(--pane-h)]"
              style={{ "--pane-h": mediaHeight ? `${mediaHeight}px` : "auto" } as React.CSSProperties}
            >
              {slides.map((slide, i) => (
                <p
                  key={i}
                  aria-hidden={i !== index}
                  className={cn(
                    "text-base leading-relaxed text-muted-foreground transition-opacity duration-[250ms] sm:text-lg lg:text-xl",
                    "lg:absolute lg:inset-x-0 lg:top-0",
                    i === index
                      ? "opacity-100"
                      : "pointer-events-none opacity-0 max-lg:absolute max-lg:inset-x-0 max-lg:top-0",
                  )}
                >
                  {slide.body}
                </p>
              ))}
            </div>
          </Reveal>

          <Reveal delay={120}>
            <figure>
              <div
                ref={mediaRef}
                className="carousel-media relative aspect-[16/10] w-full overflow-hidden rounded-[8px] bg-ink"
              >
                {slides.map((slide, i) => (
                  <img
                    key={i}
                    src={slide.image}
                    alt={slide.alt}
                    width={1600}
                    height={1000}
                    loading={i === 0 ? undefined : "lazy"}
                    aria-hidden={i !== index}
                    className="absolute inset-0 h-full w-full object-cover transition-[transform,opacity] duration-300 ease-out"
                    style={{
                      transform: i === index ? "translateX(0)" : `translateX(${dir > 0 ? (i > index ? 100 : -100) : i < index ? -100 : 100}%)`,
                      opacity: i === index ? 1 : 0,
                    }}
                  />
                ))}

                <button
                  type="button"
                  onClick={prev}
                  aria-label="Previous slide"
                  className="absolute left-3 top-1/2 z-10 -translate-y-1/2 rounded-full border border-border bg-ink/80 p-2 opacity-0 backdrop-blur transition-opacity duration-200 focus-visible:opacity-100 group-hover/carousel:opacity-100"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={next}
                  aria-label="Next slide"
                  className="absolute right-3 top-1/2 z-10 -translate-y-1/2 rounded-full border border-border bg-ink/80 p-2 opacity-0 backdrop-blur transition-opacity duration-200 focus-visible:opacity-100 group-hover/carousel:opacity-100"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>

              <div className="mt-3 flex items-center gap-2">
                {slides.map((slide, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => go(i, i > index ? 1 : -1)}
                    aria-label={`Go to slide ${i + 1}`}
                    aria-current={i === index}
                    className={cn(
                      "h-1.5 rounded-full transition-all duration-200",
                      i === index ? "w-6 bg-foreground" : "w-1.5 bg-muted-foreground/40 hover:bg-muted-foreground",
                    )}
                  />
                ))}
              </div>

              <figcaption className="mt-3 font-mono text-[10px] uppercase leading-relaxed tracking-[0.16em] text-muted-foreground">
                {slides[index].caption}
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
