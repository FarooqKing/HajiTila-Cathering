"use client";

import { useEffect, useRef } from "react";

/** Atmospheric backdrop with a slow drift and gentle mouse/scroll parallax. */
export function HeroBackdrop() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let mx = 0, my = 0, cx = 0, cy = 0, raf = 0;
    const fine = window.matchMedia("(pointer: fine)").matches;
    const onMove = (e: PointerEvent) => { mx = e.clientX / innerWidth - 0.5; my = e.clientY / innerHeight - 0.5; };
    const loop = () => {
      cx += (mx - cx) * 0.04; cy += (my - cy) * 0.04;
      const sy = Math.min(window.scrollY, innerHeight);
      el.style.transform = `translate3d(${(-cx * 18).toFixed(2)}px, ${(-cy * 10 + sy * 0.25).toFixed(2)}px, 0) scale(1.08)`;
      raf = requestAnimationFrame(loop);
    };
    if (fine) window.addEventListener("pointermove", onMove, { passive: true });
    raf = requestAnimationFrame(loop);
    return () => { window.removeEventListener("pointermove", onMove); cancelAnimationFrame(raf); };
  }, []);
  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden>
      <div ref={ref} className="absolute inset-[-4%] will-change-transform" style={{ transform: "scale(1.08)" }}>
        <picture>
          <source media="(max-width: 1023px)" srcSet="/images/hero/hero-bg-mobile.webp" />
          <img src="/images/hero/hero-bg.webp" alt="" fetchPriority="high" decoding="async" className="size-full object-cover object-[70%_center]" />
        </picture>
      </div>
    </div>
  );
}
