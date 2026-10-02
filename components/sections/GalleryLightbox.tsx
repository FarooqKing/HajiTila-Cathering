"use client";

import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useEffect, useRef } from "react";
import type { GalleryItem } from "@/data/gallery";

export function GalleryLightbox({ items, index, onClose, onIndex }: { items: GalleryItem[]; index: number; onClose: () => void; onIndex: (i: number) => void }) {
  const box = useRef<HTMLDivElement>(null);
  const touch = useRef<number | null>(null);
  const item = items[index];
  const go = (d: number) => onIndex((index + d + items.length) % items.length);
  const goRef = useRef(go);
  goRef.current = go;
  const closeRef = useRef(onClose);
  closeRef.current = onClose;

  useEffect(() => {
    const prev = document.activeElement as HTMLElement | null;
    document.documentElement.style.overflow = "hidden";
    box.current?.querySelector<HTMLElement>("[data-autofocus]")?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeRef.current();
      if (e.key === "ArrowRight") goRef.current(1);
      if (e.key === "ArrowLeft") goRef.current(-1);
      if (e.key === "Tab" && box.current) {
        const f = box.current.querySelectorAll<HTMLElement>("button");
        const first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => { document.removeEventListener("keydown", onKey); document.documentElement.style.overflow = ""; prev?.focus(); };
  }, []);

  return (
    <div
      ref={box}
      role="dialog"
      aria-modal="true"
      aria-label={`Image ${index + 1} of ${items.length}: ${item.alt}`}
      className="fixed inset-0 z-[90] flex flex-col bg-night/96 backdrop-blur-md [animation:fade-up_.5s_var(--ease-silk)_both]"
      onTouchStart={(e) => (touch.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touch.current == null) return;
        const dx = e.changedTouches[0].clientX - touch.current;
        if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
        touch.current = null;
      }}
    >
      <div className="flex items-center justify-between px-5 py-4 sm:px-8">
        <p className="text-sm text-muted"><span className="text-gold-light">{item.category}</span> · {index + 1} / {items.length}</p>
        <button type="button" onClick={onClose} data-autofocus aria-label="Close gallery" className="grid size-11 place-items-center rounded-full border border-gold/30 hover:border-gold"><X className="size-5" /></button>
      </div>
      <div className="relative flex flex-1 items-center justify-center px-4 pb-6 sm:px-20">
        <figure key={item.src} className="relative max-h-full [animation:fade-up_.6s_var(--ease-silk)_both]">
          <img src={item.src} alt={item.alt} className="max-h-[78svh] w-auto max-w-full rounded-2xl object-contain" />
          <figcaption className="mt-3 text-center text-sm text-muted">{item.alt}{!item.isOwnWork && " — illustration"}</figcaption>
        </figure>
        <button type="button" onClick={() => go(-1)} aria-label="Previous image" className="absolute left-3 top-1/2 grid size-12 -translate-y-1/2 place-items-center rounded-full border border-gold/30 bg-night/60 hover:border-gold sm:left-6"><ChevronLeft className="size-5" /></button>
        <button type="button" onClick={() => go(1)} aria-label="Next image" className="absolute right-3 top-1/2 grid size-12 -translate-y-1/2 place-items-center rounded-full border border-gold/30 bg-night/60 hover:border-gold sm:right-6"><ChevronRight className="size-5" /></button>
      </div>
    </div>
  );
}
