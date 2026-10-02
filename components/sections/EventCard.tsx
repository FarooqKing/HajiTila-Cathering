import type { EventType } from "@/data/events";
import { eventMessage, whatsappUrl } from "@/lib/contact";
import { SmartImage } from "@/components/ui/SmartImage";

export function EventCard({ event }: { event: EventType }) {
  const href = whatsappUrl(eventMessage(event.title));
  return (
    <article className="group relative h-full overflow-hidden rounded-[26px] bg-card ring-1 ring-gold/15">
      <div className="absolute inset-0" aria-hidden>
        <SmartImage src={event.image} alt="" illustration={false} className="size-full object-cover transition-transform duration-[1.6s] [transition-timing-function:var(--ease-silk)] group-hover:scale-110" />
      </div>
      <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-night via-night/45 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-7">
        <span aria-hidden className="mb-4 block h-px w-10 bg-gold transition-[width] duration-700 group-hover:w-20" />
        <h3 className="text-[2.2rem] text-ivory">{event.title}</h3>
        <p className="mt-2 max-w-[26ch] text-sm leading-relaxed text-cream/80">{event.description}</p>
        {href ? (
          <a href={href} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-gold-light underline-offset-4 hover:underline">
            Ask about availability
          </a>
        ) : (
          <a href="#enquiry" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-gold-light underline-offset-4 hover:underline">Ask about availability</a>
        )}
      </div>
    </article>
  );
}
