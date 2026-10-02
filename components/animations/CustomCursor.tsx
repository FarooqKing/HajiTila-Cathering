"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Desktop-only gold cursor. Expands over interactive elements, shows "View"
 * over [data-cursor="view"] and pulls [data-magnetic] buttons slightly.
 * Disabled on touch devices and for reduced motion.
 */
export function CustomCursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [mode, setMode] = useState<"default" | "hover" | "view">("default");
  const [moved, setMoved] = useState(false);

  useEffect(() => {
    const ok = window.matchMedia("(hover: hover) and (pointer: fine)").matches && !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!ok) return;
    setEnabled(true);
    document.documentElement.classList.add("has-cursor");
    let x = innerWidth / 2, y = innerHeight / 2, rx = x, ry = y, raf = 0;
    let magnet: HTMLElement | null = null;

    const onMove = (e: PointerEvent) => {
      x = e.clientX; y = e.clientY;
      setMoved(true);
      const t = e.target as HTMLElement;
      const m = t.closest<HTMLElement>("[data-magnetic]");
      if (magnet && magnet !== m) magnet.style.transform = "";
      magnet = m;
      if (m && !m.matches('[aria-disabled="true"]')) {
        const r = m.getBoundingClientRect();
        m.style.transform = `translate(${(x - r.left - r.width / 2) * 0.18}px, ${(y - r.top - r.height / 2) * 0.28}px)`;
        m.style.transition = "transform .35s cubic-bezier(.22,1,.36,1)";
      }
      setMode(t.closest('[data-cursor="view"]') ? "view" : t.closest("a, button, [role='button'], input, select, textarea, label") ? "hover" : "default");
    };
    const onLeave = () => { if (magnet) magnet.style.transform = ""; };
    const loop = () => {
      rx += (x - rx) * 0.16; ry += (y - ry) * 0.16;
      if (dot.current) dot.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      if (ring.current) ring.current.style.transform = `translate3d(${rx}px, ${ry}px, 0)`;
      raf = requestAnimationFrame(loop);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(raf);
      document.documentElement.classList.remove("has-cursor");
    };
  }, []);

  if (!enabled) return null;
  const size = mode === "view" ? 84 : mode === "hover" ? 44 : 10;
  return (
    <div aria-hidden className={`pointer-events-none fixed inset-0 z-[300] transition-opacity duration-500 ${moved ? "opacity-100" : "opacity-0"}`}>
      <div ref={dot} className="absolute left-0 top-0">
        <span className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold-light transition-opacity duration-300 ${mode === "default" ? "size-1.5 opacity-100" : "size-1.5 opacity-0"}`} />
      </div>
      <div ref={ring} className="absolute left-0 top-0">
        <span
          className={`absolute grid -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border transition-[width,height,background-color,border-color] duration-500 ${mode === "view" ? "border-gold bg-gold/90" : mode === "hover" ? "border-gold/70 bg-transparent" : "border-transparent bg-transparent"}`}
          style={{ width: size, height: size, transitionTimingFunction: "var(--ease-silk)" }}
        >
          {mode === "view" && <span className="text-[0.65rem] font-bold tracking-[0.25em] text-night">VIEW</span>}
        </span>
      </div>
    </div>
  );
}
