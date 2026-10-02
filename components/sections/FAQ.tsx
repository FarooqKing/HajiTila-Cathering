import { Plus } from "lucide-react";
import { faqs } from "@/data/faqs";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function FAQ() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
  return (
    <section id="faq" aria-labelledby="faq-title" className="section bg-sand">
      <div className="wrap grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
        <SectionHeading id="faq-title" eyebrow="Questions" title="Frequently Asked Questions" intro="Everything you need to know before planning your event with us." />
        <div className="divide-y divide-line rounded-[24px] bg-white px-6 shadow-[0_18px_40px_-28px_rgba(23,37,31,.3)] md:px-8" data-reveal>
          {faqs.map((f) => (
            <details key={f.q} className="group py-5 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-[1.0625rem] font-semibold text-ink">
                {f.q}
                <span className="grid size-9 shrink-0 place-items-center rounded-full bg-sand text-forest transition-transform duration-500 group-open:rotate-45" aria-hidden><Plus className="size-4" /></span>
              </summary>
              <p className="mt-3 pr-12 leading-relaxed text-stone">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />
    </section>
  );
}
