"use client";

import { MoveHorizontal } from "lucide-react";
import { useRef, useState } from "react";
import { content } from "@/data/content";
import { SectionHeading } from "@/components/ui/SectionHeading";

/** Drag, click or use arrow keys to compare. Replace the two images with real photos of the same venue. */
export function BeforeAfterSlider({ before = "/images/before-after/before.webp", after = "/images/before-after/after.webp", isOwnWork = false }: { before?: string; after?: string; isOwnWork?: boolean }) {
  const [pos, setPos] = useState(50);
  const box = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const fromEvent = (clientX: number) => {
    const r = box.current!.getBoundingClientRect();
    setPos(Math.min(100, Math.max(0, ((clientX - r.left) / r.width) * 100)));
  };

  return (
    <section aria-labelledby="ba-title" className="section bg-night">
      <div className="wrap">
        <SectionHeading id="ba-title" eyebrow="Before & after" title={content.beforeAfter.title} intro={content.beforeAfter.intro} align="center" />
        <div
          ref={box}
          className="relative mx-auto aspect-[16/10] max-w-5xl touch-pan-y select-none overflow-hidden rounded-[28px] ring-1 ring-gold/20"
          onPointerDown={(e) => { dragging.current = true; (e.target as HTMLElement).setPointerCapture?.(e.pointerId); fromEvent(e.clientX); }}
          onPointerMove={(e) => dragging.current && fromEvent(e.clientX)}
          onPointerUp={() => (dragging.current = false)}
          onPointerCancel={() => (dragging.current = false)}
          data-reveal
        >
          <img src={after} alt="After: venue prepared with a marquee, lights and tables" className="absolute inset-0 size-full object-cover" loading="lazy" draggable={false} />
          <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
            <img src={before} alt="Before: the same open venue, empty" className="absolute inset-0 size-full object-cover" loading="lazy" draggable={false} />
          </div>
          <span className="absolute left-4 top-4 rounded-full bg-night/70 px-3 py-1 text-xs font-semibold tracking-wide text-cream backdrop-blur">Before</span>
          <span className="absolute right-4 top-4 rounded-full bg-gold px-3 py-1 text-xs font-semibold tracking-wide text-night">After</span>
          {!isOwnWork && <span className="illustration-tag bottom-4 left-4">Illustration</span>}
          <div className="absolute inset-y-0 w-px bg-gold-light" style={{ left: `${pos}%` }} aria-hidden>
            <span className="absolute left-1/2 top-1/2 grid size-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-gold bg-night/80 text-gold-light shadow-[0_0_30px_rgba(212,175,55,.35)] backdrop-blur">
              <MoveHorizontal className="size-5" />
            </span>
          </div>
          <input
            type="range"
            min={0}
            max={100}
            value={Math.round(pos)}
            onChange={(e) => setPos(Number(e.target.value))}
            aria-label="Compare before and after"
            className="absolute inset-0 size-full cursor-ew-resize opacity-0"
          />
        </div>
      </div>
    </section>
  );
}
