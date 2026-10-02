import { content } from "@/data/content";
import { GoldParticles } from "@/components/animations/GoldParticles";
import { Parallax } from "@/components/animations/Parallax";
import { WhatsAppButton } from "@/components/ui/ContactButtons";

export function FinalCTA() {
  const f = content.finalCta;
  return (
    <section aria-labelledby="final-title" className="relative isolate overflow-hidden py-36 md:py-48">
      <Parallax speed={0.18} className="absolute inset-[-15%_0]">
        <img src="/images/hero/final-cta.webp" alt="" loading="lazy" className="size-full object-cover" aria-hidden />
      </Parallax>
      <div aria-hidden className="absolute inset-0 bg-night/72" />
      <div aria-hidden className="absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_50%,transparent,rgba(8,8,7,.9))]" />
      <GoldParticles density={0.00006} />
      <div className="wrap relative text-center">
        <span className="rule mx-auto mb-10 w-40" aria-hidden />
        <h2 id="final-title" className="mx-auto max-w-4xl text-[clamp(2.8rem,7vw,6rem)]" data-reveal>{f.title}</h2>
        <p className="mx-auto mt-6 max-w-xl text-[1.0625rem] text-cream/85" data-reveal>{f.text}</p>
        <div className="mt-11" data-reveal>
          <WhatsAppButton label={f.cta.toUpperCase()} className="h-16 px-10 text-sm tracking-[0.18em]" />
        </div>
      </div>
    </section>
  );
}
