import { Quote } from "lucide-react";
import { business } from "@/data/business";
import { content } from "@/data/content";
import { testimonials } from "@/data/testimonials";
import { SectionHeading } from "@/components/ui/SectionHeading";

/** Shows only genuine testimonials from data/testimonials.ts. */
export function Testimonials() {
  return (
    <section aria-labelledby="testimonials-title" className="section bg-paper">
      <div className="wrap">
        <SectionHeading id="testimonials-title" eyebrow="Testimonials" title={content.testimonials.title} align="center" />
        {testimonials.length === 0 ? (
          <div className="mx-auto max-w-xl rounded-[24px] border border-dashed border-forest/25 px-8 py-12 text-center" data-reveal>
            <Quote className="mx-auto size-8 text-gold" aria-hidden />
            <p className="mt-4 text-stone">{content.testimonials.empty}</p>
          </div>
        ) : (
          <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((t) => (
              <li key={t.name + t.quote.slice(0, 12)} className="card-light p-8" data-reveal>
                <Quote className="size-7 text-gold" aria-hidden />
                <blockquote className="mt-4 font-serif text-[1.4rem] leading-snug text-ink">“{t.quote}”</blockquote>
                <p className="mt-6 font-semibold text-forest">{t.name}</p>
                {t.event && <p className="text-sm text-stone">{t.event}</p>}
              </li>
            ))}
          </ul>
        )}
        {business.googleReviewUrl && (
          <div className="mt-10 text-center">
            <a href={business.googleReviewUrl} target="_blank" rel="noopener noreferrer" className="btn btn-line">Review Us on Google</a>
          </div>
        )}
      </div>
    </section>
  );
}
