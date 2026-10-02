"use client";

import { X } from "lucide-react";
import { useEffect, useRef } from "react";
import { business } from "@/data/business";
import { navLinks } from "@/data/navigation";
import { CallButton, WhatsAppButton } from "@/components/ui/ContactButtons";
import { Logo } from "@/components/ui/Logo";

export function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const panel = useRef<HTMLDivElement>(null);
  const closeRef = useRef(onClose);
  closeRef.current = onClose;

  useEffect(() => {
    if (!open) return;
    const prev = document.activeElement as HTMLElement | null;
    document.documentElement.style.overflow = "hidden";
    const t = setTimeout(() => panel.current?.querySelector<HTMLElement>("button")?.focus(), 80);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeRef.current();
      if (e.key !== "Tab" || !panel.current) return;
      const f = panel.current.querySelectorAll<HTMLElement>("a[href], button");
      const first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      clearTimeout(t);
      document.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
      prev?.focus();
    };
  }, [open]);

  return (
    <div
      ref={panel}
      id="mobile-menu"
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
      aria-hidden={!open}
      inert={!open || undefined}
      className={`fixed inset-0 z-[60] flex flex-col bg-night/96 backdrop-blur-xl transition-[opacity,visibility] duration-500 xl:hidden ${open ? "visible opacity-100" : "invisible opacity-0"}`}
    >
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-80 bg-[radial-gradient(60%_100%_at_50%_0%,rgba(212,175,55,.14),transparent)]" />
      <div className="wrap relative flex h-[92px] items-center justify-between">
        <Logo />
        <button type="button" onClick={onClose} aria-label="Close menu" className="grid size-11 place-items-center rounded-full border border-gold/30">
          <X className="size-5" />
        </button>
      </div>
      <nav aria-label="Mobile" className="wrap relative flex-1 overflow-y-auto pt-4">
        <ul>
          {navLinks.map((l, i) => (
            <li
              key={l.href}
              className={`border-b border-gold/10 transition-[opacity,transform] duration-700 ${open ? "translate-x-0 opacity-100" : "-translate-x-6 opacity-0"}`}
              style={{ transitionDelay: open ? `${120 + i * 55}ms` : "0ms", transitionTimingFunction: "var(--ease-silk)" }}
            >
              <a href={l.href} onClick={onClose} className="block py-4 font-serif text-[2.1rem] text-ivory">
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <div className="wrap relative grid gap-3 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-6">
        <WhatsAppButton label="Get a Quote on WhatsApp" className="w-full" />
        <CallButton className="w-full" />
        <p className="pt-2 text-center text-xs text-muted">{business.serviceArea}</p>
      </div>
    </div>
  );
}
