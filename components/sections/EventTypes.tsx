"use client";

import { useEffect, useRef } from "react";
import { content } from "@/data/content";
import { events } from "@/data/events";
import { EventCard } from "./EventCard";

/**
 * Desktop: the section pins and the cards travel horizontally as you scroll.
 * Mobile / reduced motion: a native swipeable row with scroll snapping.
 */
export function EventTypes() {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px) and (prefers-reduced-motion: no-preference)");
    let cleanup: (() => void) | undefined;
    let cancelled = false;
    const setup = async () => {
      cleanup?.();
      cleanup = undefined;
      if (!mq.matches || !section.current || !track.current) return;
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([import("gsap"), import("gsap/ScrollTrigger")]);
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);
      const ctx = gsap.context(() => {
        const distance = () => track.current!.scrollWidth - window.innerWidth + 96;
        gsap.to(track.current, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: { trigger: section.current, start: "top top", end: () => `+=${distance()}`, scrub: 0.6, pin: true, invalidateOnRefresh: true },
        });
      }, section);
      cleanup = () => ctx.revert();
    };
    setup();
    mq.addEventListener("change", setup);
    return () => { cancelled = true; mq.removeEventListener("change", setup); cleanup?.(); };
  }, []);

  return (
    <section ref={section} id="events" aria-labelledby="events-title" className="relative overflow-hidden bg-paper py-24 lg:flex lg:h-[100svh] lg:flex-col lg:justify-center lg:py-0">
      <div className="wrap mb-12 flex flex-col gap-6 lg:mb-14 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-2xl">
          <p className="eyebrow-dark">Occasions</p>
          <h2 id="events-title" className="mt-4 text-[clamp(2.3rem,5vw,4rem)] text-forest">{content.events.title}</h2>
          <span className="gold-rule" aria-hidden />
        </div>
        <p className="max-w-sm text-stone">{content.events.intro}</p>
      </div>
      <ul
        ref={track}
        className="flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-4 [scrollbar-width:none] sm:px-8 lg:snap-none lg:overflow-visible lg:px-12 [&::-webkit-scrollbar]:hidden"
        aria-label="Event types"
      >
        {events.map((e) => (
          <li key={e.slug} className="h-[460px] w-[78vw] max-w-[360px] shrink-0 snap-start lg:h-[min(62vh,560px)] lg:w-[380px] lg:max-w-none">
            <EventCard event={e} />
          </li>
        ))}
      </ul>
    </section>
  );
}
