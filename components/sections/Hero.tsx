import { ArrowDown } from "lucide-react";
import { content } from "@/data/content";
import { GoldParticles } from "@/components/animations/GoldParticles";
import { CallButton } from "@/components/ui/ContactButtons";
import { HeroBackdrop } from "./HeroBackdrop";
import { QuickQuote } from "./QuickQuote";

const d = (s: number) => ({ "--d": `${s}s` }) as React.CSSProperties;

export function Hero() {
  const h = content.hero;
  return (
    <section id="home" aria-labelledby="hero-title" className="relative isolate overflow-hidden">
      <HeroBackdrop />
      <GoldParticles className="opacity-70" density={0.00004} />
      <div aria-hidden className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,42,31,.95)_0%,rgba(7,42,31,.8)_45%,rgba(7,42,31,.45)_100%)] max-lg:bg-[linear-gradient(180deg,rgba(7,42,31,.6)_0%,rgba(7,42,31,.85)_45%,rgba(7,42,31,.97)_100%)]" />
      

      <div className="wrap relative grid min-h-[100svh] items-center gap-12 pb-16 pt-32 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16 lg:pb-24 xl:pt-36">
        <div>
          <p className="eyebrow fade-up delay-boot flex items-center gap-4" style={d(0.1)}>
            <span className="rule-grow delay-boot h-px w-12 bg-gold" style={d(0.2)} aria-hidden />
            {h.eyebrow} {h.eyebrowName}
          </p>
          <h1 id="hero-title" className="mt-7 text-[clamp(2.9rem,5.4vw,5.3rem)] leading-[1] text-ivory lg:whitespace-nowrap">
            {h.titleLines.map((line, i) => (
              <span key={line} className="mask-line">
                <span className="delay-boot" style={d(0.35 + i * 0.15)}>{line}</span>
              </span>
            ))}
          </h1>
          <p lang="ur" dir="rtl" className="fade-up delay-boot mt-6 font-urdu text-[clamp(1.15rem,1.9vw,1.5rem)] leading-[2.1] text-gold-light/90" style={{ ...d(0.65), textAlign: "left" }}>
            {h.urdu}
          </p>
          <p className="fade-up delay-boot mt-5 max-w-xl text-[1.0625rem] leading-relaxed text-cream/80" style={d(0.8)}>{h.text}</p>
          <div className="fade-up delay-boot mt-9 flex flex-wrap items-center gap-3" style={d(0.95)}>
            <CallButton label={h.secondaryCta} className="text-ivory" />
            <a href="#services" className="btn btn-quiet group" data-magnetic>
              {h.tertiaryCta} <ArrowDown className="size-4 transition-transform duration-500 group-hover:translate-y-0.5" aria-hidden />
            </a>
          </div>
          <ul className="fade-up delay-boot mt-12 flex flex-wrap gap-x-7 gap-y-3 border-t border-gold/15 pt-6 text-sm text-muted" style={d(1.1)} aria-label="What we arrange">
            {h.highlights.map((s) => (
              <li key={s} className="flex items-center gap-2.5"><span className="size-1.5 rotate-45 bg-gold" aria-hidden />{s}</li>
            ))}
          </ul>
        </div>
        <div className="fade-up delay-boot w-full max-w-[460px] justify-self-center lg:justify-self-end" style={d(0.7)}>
          <QuickQuote />
          <p className="mt-4 text-center text-sm text-ivory/75">{h.note}</p>
        </div>
      </div>
    </section>
  );
}
