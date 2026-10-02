"use client";

import { Check, X } from "lucide-react";
import { menu, menuIntro } from "@/data/menu";
import { menuSelection } from "@/lib/menuSelection";

/**
 * Dish picker. Choices flow into the "Tell Us About Your Event" form and
 * its WhatsApp message. Nothing is stored or priced.
 */
export function MenuBuilder() {
  const selected = menuSelection.use();

  return (
    <section id="menu" aria-labelledby="menu-title" className="section bg-sand">
      <div className="wrap">
        <div className="mb-14 grid gap-6 lg:grid-cols-[1fr_1fr] lg:items-end" data-reveal>
          <div>
            <p className="eyebrow-dark">Our menu</p>
            <h2 id="menu-title" className="mt-4 text-[clamp(2.4rem,5vw,4rem)] text-forest">{menuIntro.title}</h2>
            <span className="gold-rule" aria-hidden />
          </div>
          <p className="max-w-lg text-[1.0625rem] leading-relaxed text-stone lg:justify-self-end">{menuIntro.text}</p>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {menu.map((g, gi) => (
            <fieldset key={g.id} className="card-light p-6 md:p-7" data-reveal style={{ "--rd": `${gi * 0.08}s` } as React.CSSProperties}>
              <legend className="sr-only">{g.title}</legend>
              <div className="flex items-start justify-between gap-3 border-b border-line pb-4">
                <div>
                  <p className="font-serif text-[1.7rem] leading-none text-forest">{g.title}</p>
                  <p className="mt-2 text-sm text-stone">{g.note}</p>
                </div>
                <p lang="ur" dir="rtl" className="font-urdu text-lg leading-[2] text-gold-deep">{g.urdu}</p>
              </div>
              <ul className="mt-3 grid gap-1 sm:grid-cols-2">
                {g.dishes.map((d) => {
                  const on = selected.includes(d.name);
                  return (
                    <li key={d.name}>
                      <label className={`flex cursor-pointer items-center gap-3 rounded-xl px-3 py-3 transition-colors duration-300 has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-gold ${on ? "bg-forest/8" : "hover:bg-sand"}`}>
                        <input type="checkbox" className="sr-only" checked={on} onChange={() => menuSelection.toggle(d.name)} />
                        <span className={`grid size-6 shrink-0 place-items-center rounded-full border transition-colors duration-300 ${on ? "border-forest bg-forest text-ivory" : "border-line bg-white"}`} aria-hidden>
                          {on && <Check className="size-3.5" strokeWidth={3} />}
                        </span>
                        <span className="flex-1 font-semibold text-ink">{d.name}</span>
                        <span lang="ur" dir="rtl" className="font-urdu text-[0.95rem] leading-[2] text-stone">{d.urdu}</span>
                      </label>
                    </li>
                  );
                })}
              </ul>
            </fieldset>
          ))}
        </div>

        {/* selection summary */}
        <div className={`sticky bottom-[76px] z-20 mt-8 transition-all duration-500 md:bottom-6 ${selected.length ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"}`} aria-live="polite" aria-hidden={!selected.length}>
          <div className="flex flex-col gap-4 rounded-[22px] bg-forest p-4 pl-6 text-ivory shadow-[0_24px_50px_-20px_rgba(7,42,31,.7)] sm:flex-row sm:items-center">
            <p className="flex-1 text-sm">
              <strong className="font-semibold">{selected.length} {selected.length === 1 ? "dish" : "dishes"} selected</strong>
              <span className="text-ivory/70"> — {selected.join(", ")}</span>
            </p>
            <div className="flex shrink-0 gap-2">
              <button type="button" onClick={() => menuSelection.clear()} className="btn h-11 px-4 text-sm text-ivory/80 hover:text-ivory" aria-label="Clear selected dishes">
                <X className="size-4" /> Clear
              </button>
              <a href="#enquiry" className="btn btn-gold h-11 px-5 text-sm">Add to my quote</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
