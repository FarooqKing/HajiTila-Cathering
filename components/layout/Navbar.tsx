"use client";

import { useEffect, useState } from "react";
import { navLinks } from "@/data/navigation";
import { Logo } from "@/components/ui/Logo";
import { WhatsAppButton } from "@/components/ui/ContactButtons";
import { MobileMenu } from "./MobileMenu";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("#home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    // Highlight the section currently in view.
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(`#${e.target.id}`)),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    navLinks.forEach((l) => {
      const el = document.querySelector(l.href);
      if (el) io.observe(el);
    });
    return () => {
      window.removeEventListener("scroll", onScroll);
      io.disconnect();
    };
  }, []);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,backdrop-filter] duration-700 ${
          scrolled ? "bg-white/92 backdrop-blur-xl shadow-[0_1px_0_rgba(231,220,198,1),0_18px_40px_-26px_rgba(23,37,31,.35)]" : "bg-transparent"
        }`}
      >
        <div className={`wrap flex items-center justify-between transition-[height] duration-700 ${scrolled ? "h-[72px]" : "h-[92px]"}`}>
          <a href="#home" aria-label="Haji Tila Catering & Tent Service — back to top">
            <Logo compact={scrolled} tone={scrolled ? "dark" : "light"} />
          </a>
          <nav aria-label="Main" className="hidden xl:block">
            <ul className="flex items-center gap-8">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    aria-current={active === l.href ? "true" : undefined}
                    className={`relative py-2 text-[0.875rem] font-medium tracking-wide transition-colors ${active === l.href ? (scrolled ? "text-forest" : "text-gold-light") : scrolled ? "text-ink/70 hover:text-ink" : "text-ivory/80 hover:text-ivory"}`}
                  >
                    {l.label}
                    <span className={`absolute inset-x-0 -bottom-0.5 h-px origin-center bg-gold transition-transform duration-500 ${active === l.href ? "scale-x-100" : "scale-x-0"}`} aria-hidden />
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="flex items-center gap-3">
            <WhatsAppButton label="WhatsApp Quote" className="hidden h-11 px-5 text-sm sm:inline-flex" />
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              aria-expanded={open}
              aria-controls="mobile-menu"
              className={`group grid size-11 place-items-center rounded-full border xl:hidden ${scrolled ? "border-line text-ink" : "border-gold/40 text-ivory"}`}
            >
              <span className="flex w-5 flex-col gap-[5px]" aria-hidden>
                <span className="h-px w-full bg-current transition-transform group-hover:translate-x-0.5" />
                <span className="h-px w-3/4 self-end bg-gold" />
                <span className="h-px w-full bg-current transition-transform group-hover:-translate-x-0.5" />
              </span>
            </button>
          </div>
        </div>
      </header>
      <MobileMenu open={open} onClose={() => setOpen(false)} />
    </>
  );
}
