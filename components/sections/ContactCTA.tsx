import { MapPin, Phone } from "lucide-react";
import { business } from "@/data/business";
import { content } from "@/data/content";
import { directionsUrl, phoneUrl, whatsappUrl } from "@/lib/contact";
import { WhatsAppIcon } from "@/components/ui/icons";

export function ContactCTA() {
  const cards = [
    { title: "WhatsApp", text: "Chat with us", href: whatsappUrl(), external: true, icon: <WhatsAppIcon className="size-7" />, detail: "Fastest way to share event details" },
    { title: "Phone", text: "Call Now", href: phoneUrl(), external: false, icon: <Phone className="size-7" strokeWidth={1.5} />, detail: business.phone || "Number coming soon" },
    { title: "Location", text: "Get Directions", href: directionsUrl(), external: true, icon: <MapPin className="size-7" strokeWidth={1.5} />, detail: "Nasir Bagh Road, Askari 6" },
  ];
  return (
    <section aria-labelledby="cta-title" className="section bg-paper">
      <div className="wrap">
        <div className="mb-14 text-center" data-reveal>
          <h2 id="cta-title" className="text-[clamp(2.5rem,6vw,4.8rem)]">{content.contactCta.title}</h2>
          <p className="mx-auto mt-5 max-w-lg text-[1.0625rem] text-stone">{content.contactCta.text}</p>
        </div>
        <ul className="grid gap-5 md:grid-cols-3">
          {cards.map((c, i) => {
            const inner = (
              <>
                <span className="grid size-16 place-items-center rounded-full border border-forest/20 text-gold-deep transition-all duration-700 group-hover:border-forest group-hover:bg-forest group-hover:text-gold-light">{c.icon}</span>
                <p className="mt-8 text-xs font-semibold uppercase tracking-[0.3em] text-gold-deep">{c.title}</p>
                <p className="mt-2 font-serif text-[2.2rem] leading-none text-forest">{c.text}</p>
                <p className="mt-3 text-sm text-stone">{c.detail}</p>
              </>
            );
            const cls = "group card-light flex h-full flex-col items-center p-10 text-center transition-shadow duration-700";
            return (
              <li key={c.title} data-reveal style={{ "--rd": `${i * 0.1}s` } as React.CSSProperties}>
                {c.href ? (
                  <a href={c.href} target={c.external ? "_blank" : undefined} rel={c.external ? "noopener noreferrer" : undefined} className={`${cls} hover:-translate-y-1 hover:shadow-[0_30px_60px_-30px_rgba(14,74,54,.45)]`}>{inner}</a>
                ) : (
                  <div aria-disabled="true" className={`${cls} opacity-70`}>{inner}<span className="sr-only">Coming soon</span></div>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
