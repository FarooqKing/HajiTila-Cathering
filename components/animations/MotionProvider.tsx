"use client";

import { useEffect } from "react";

/**
 * Enables Lenis smooth scrolling (synced with GSAP ScrollTrigger) and the
 * [data-reveal] scroll reveals. Everything is skipped for reduced motion,
 * and content stays visible if any of this fails to load.
 */
export function MotionProvider() {
  useEffect(() => {
    const root = document.documentElement;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Reveal on scroll
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("is-in");
          io.unobserve(e.target);
        }
      }),
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );
    if (!reduce) {
      root.classList.add("js");
      document.querySelectorAll("[data-reveal]").forEach((el) => io.observe(el));
    }

    let destroy: (() => void) | undefined;
    if (!reduce) {
      Promise.all([import("lenis"), import("gsap"), import("gsap/ScrollTrigger")])
        .then(([{ default: Lenis }, { gsap }, { ScrollTrigger }]) => {
          gsap.registerPlugin(ScrollTrigger);
          const lenis = new Lenis({ duration: 1.15, easing: (t: number) => 1 - Math.pow(1 - t, 3), anchors: { offset: -72 } });
          lenis.on("scroll", ScrollTrigger.update);
          const tick = (time: number) => lenis.raf(time * 1000);
          gsap.ticker.add(tick);
          gsap.ticker.lagSmoothing(0);
          destroy = () => {
            gsap.ticker.remove(tick);
            lenis.destroy();
          };
        })
        .catch(() => { /* native scrolling still works */ });
    }
    return () => {
      io.disconnect();
      destroy?.();
    };
  }, []);
  return null;
}
