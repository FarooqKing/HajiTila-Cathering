import { content } from "@/data/content";
import { WhatsAppButton } from "@/components/ui/ContactButtons";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function ProcessTimeline() {
  const steps = content.process.steps;
  return (
    <section aria-labelledby="process-title" className="section bg-white">
      <div className="wrap grid gap-14 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <SectionHeading id="process-title" eyebrow="How it works" title={content.process.title} intro="Six simple steps from your first message to a prepared event." />
          <div data-reveal><WhatsAppButton label={content.process.cta} variant="green" /></div>
        </div>
        <ol className="relative">
          <span aria-hidden className="absolute bottom-6 left-[27px] top-6 w-px bg-gradient-to-b from-gold/60 via-gold/25 to-transparent" />
          {steps.map((s, i) => (
            <li key={s} className="relative flex gap-7 pb-10 last:pb-0" data-reveal style={{ "--rd": `${i * 0.06}s` } as React.CSSProperties}>
              <span className="relative z-10 grid size-14 shrink-0 place-items-center rounded-full border border-gold bg-white font-serif text-xl text-forest">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="pt-3">
                <h3 className="text-[1.7rem] leading-tight text-forest">{s}</h3>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
