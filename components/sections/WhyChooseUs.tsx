import { HandPlatter, MapPin, MessageCircle, Settings2, ShieldCheck, Sparkles } from "lucide-react";
import { content } from "@/data/content";
import { SectionHeading } from "@/components/ui/SectionHeading";

const ICONS = [Settings2, ShieldCheck, HandPlatter, Sparkles, MessageCircle, MapPin];

export function WhyChooseUs() {
  return (
    <section id="why-us" aria-labelledby="why-title" className="section overflow-hidden bg-sand">
            <div className="wrap relative">
        <SectionHeading id="why-title" eyebrow="Why choose us" title={content.why.title} align="center" />
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {content.why.items.map((it, i) => {
            const Icon = ICONS[i];
            return (
              <li key={it.title} className="group card-light p-8 md:p-10" data-reveal style={{ "--rd": `${(i % 3) * 0.08}s` } as React.CSSProperties}>
                <span className="grid size-14 place-items-center rounded-full border border-forest/20 text-gold-deep transition-all duration-700 group-hover:rotate-[12deg] group-hover:border-forest group-hover:bg-forest group-hover:text-gold-light">
                  <Icon className="size-6" strokeWidth={1.4} aria-hidden />
                </span>
                <h3 className="mt-7 text-[1.75rem] text-forest">{it.title}</h3>
                <p className="mt-2 leading-relaxed text-stone">{it.text}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
