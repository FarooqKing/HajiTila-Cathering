"use client";

import { useEffect, useRef, useState } from "react";
import { content } from "@/data/content";
import { WhatsAppButton } from "@/components/ui/ContactButtons";
import { EventLineArt } from "./EventLineArt";

const PLAN_MESSAGE = "Assalam-o-Alaikum, I would like to plan an event with Haji Tila Catering & Tent Service. Please guide me on the arrangements.";

const clamp = (v: number) => Math.min(1, Math.max(0, v));
const ease = (t: number) => 1 - Math.pow(1 - t, 3);
const seg = (p: number, a: number, b: number) => ease(clamp((p - a) / (b - a)));

/** [start, end] of scroll progress for: ground, marquee, tables, lights, warm glow */
const RANGES: [number, number][] = [[0, 0.1], [0.12, 0.34], [0.36, 0.56], [0.58, 0.76], [0.74, 0.92]];

function paint(groups: (SVGGElement | null)[], p: number) {
  groups.forEach((g, i) => {
    if (!g) return;
    const t = seg(p, ...RANGES[i]);
    if (g.classList.contains("exp-fade")) {
      g.style.opacity = String(t);
      return;
    }
    g.querySelectorAll<SVGPathElement>(":scope > path").forEach((path) => {
      path.style.strokeDasharray = "1";
      path.style.strokeDashoffset = String(1 - t);
    });
    const dots = g.querySelector<SVGGElement>(".exp-dots");
    if (dots) dots.style.opacity = String(seg(p, RANGES[i][0] + 0.08, RANGES[i][1]));
  });
}

/**
 * Signature scroll sequence: a gold line drawing of an event setup draws
 * itself — ground, marquee, tables, lights, then warm light fills the space.
 */
export function EventExperience() {
  const section = useRef<HTMLElement>(null);
  const groups = useRef<(SVGGElement | null)[]>([]);
  const [step, setStep] = useState(0);
  const [reduced, setReduced] = useState(false);
  const steps = content.experience.steps;

  useEffect(() => {
    const r = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setReduced(r);
    if (r) { paint(groups.current, 1); return; }
    paint(groups.current, 0);
    let kill: (() => void) | undefined;
    let cancelled = false;
    (async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([import("gsap"), import("gsap/ScrollTrigger")]);
      if (cancelled || !section.current) return;
      gsap.registerPlugin(ScrollTrigger);
      const st = ScrollTrigger.create({
        trigger: section.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.5,
        onUpdate: ({ progress: p }) => {
          paint(groups.current, p);
          const s = p < 0.12 ? 0 : p < 0.36 ? 1 : p < 0.58 ? 2 : p < 0.8 ? 3 : 4;
          setStep((prev) => (prev === s ? prev : s));
        },
      });
      kill = () => st.kill();
    })();
    return () => { cancelled = true; kill?.(); };
  }, []);

  const finished = reduced || step === 4;

  return (
    <section ref={section} aria-labelledby="exp-title" className={`relative bg-night ${reduced ? "" : "h-[380vh] max-md:h-[300vh]"}`}>
      <div className={`${reduced ? "relative py-24" : "sticky top-0 h-[100svh]"} overflow-hidden`}>
        <div aria-hidden className="absolute inset-0 bg-[radial-gradient(60%_50%_at_62%_70%,rgba(212,175,55,.07),transparent_70%)]" />
        <div className={`${reduced ? "relative mx-auto aspect-[16/9] max-w-5xl" : "absolute inset-y-0 right-0 w-full lg:w-[66%] max-lg:top-[8%] max-lg:bottom-[42%]"}`}>
          <EventLineArt refs={groups} />
        </div>

        <div className={`wrap relative z-10 ${reduced ? "mt-12" : "flex h-full items-center max-lg:items-end max-lg:pb-24"}`}>
          <div className="max-w-md max-lg:rounded-[24px] max-lg:bg-night/80 max-lg:p-5 max-lg:backdrop-blur">
            <p className="eyebrow mb-5">Signature experience</p>
            <h2 id="exp-title" className="text-[clamp(2.4rem,5vw,4.2rem)]">{content.experience.title}</h2>
            <ol className="mt-8 space-y-1" aria-label="How an event comes together">
              {steps.map((s, i) => {
                const on = reduced || i === step;
                const done = !reduced && i < step;
                return (
                  <li key={s.title} className={`flex gap-4 rounded-2xl px-3 py-2 transition-colors duration-700 ${on ? "bg-gold/8" : ""} ${!on && !reduced ? "max-lg:hidden" : ""}`}>
                    <span className={`mt-0.5 font-serif text-lg transition-colors duration-700 ${on || done ? "text-gold-light" : "text-muted/40"}`}>{String(i + 1).padStart(2, "0")}</span>
                    <div>
                      <p className={`font-semibold transition-colors duration-700 ${on ? "text-ivory" : done ? "text-cream/70" : "text-muted/50"}`}>{s.title}</p>
                      <p className={`overflow-hidden text-sm text-muted transition-all duration-700 ${on ? "mt-1 max-h-20 opacity-100" : "max-h-0 opacity-0"}`}>{s.text}</p>
                    </div>
                  </li>
                );
              })}
            </ol>
            <div className={`mt-6 transition-all duration-1000 ${finished ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"}`} aria-hidden={!finished}>
              <p className="font-serif text-[1.55rem] leading-snug text-cream">{content.experience.final}</p>
              <WhatsAppButton label={content.experience.cta} message={PLAN_MESSAGE} className="mt-5" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
