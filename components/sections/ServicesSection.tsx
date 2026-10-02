import { content } from "@/data/content";
import { services } from "@/data/services";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ServiceCard } from "./ServiceCard";

export function ServicesSection() {
  return (
    <section id="services" aria-labelledby="services-title" className="section bg-white">
      <div aria-hidden className="rule absolute inset-x-0 top-0 opacity-40" />
      <div className="wrap">
        <SectionHeading id="services-title" eyebrow="Our services" title={content.services.title} intro={content.services.intro} align="center" />
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <li key={s.slug} data-reveal style={{ "--rd": `${(i % 3) * 0.1}s` } as React.CSSProperties}>
              <ServiceCard service={s} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
