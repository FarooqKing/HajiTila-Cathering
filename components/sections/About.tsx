import { Check } from "lucide-react";
import { content } from "@/data/content";
import { Parallax } from "@/components/animations/Parallax";
import { WhatsAppButton } from "@/components/ui/ContactButtons";

export function About() {
  const a = content.about;
  return (
    <section id="about" aria-labelledby="about-title" className="section bg-white">
      <div className="wrap grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
        <div className="lg:order-2" data-reveal>
          <figure className="relative">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[28px] max-lg:aspect-[4/3]">
              <Parallax speed={-0.08} className="absolute inset-[-10%]">
                <img src="/images/about/about.webp" alt="" loading="lazy" className="size-full object-cover" aria-hidden />
              </Parallax>
              <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-night via-night/40 to-night/10" />
              <figcaption className="absolute inset-x-0 bottom-0 p-8 md:p-10">
                <span className="mb-5 block h-[2px] w-12 bg-gold" aria-hidden />
                <p className="font-serif text-[clamp(1.6rem,2.6vw,2.2rem)] leading-snug text-ivory">You welcome your guests. We take care of the arrangements.</p>
                <p lang="ur" dir="rtl" className="mt-4 text-left font-urdu text-lg leading-[2.1] text-gold-light">آپ مہمانوں کا استقبال کریں، انتظام ہم پر چھوڑ دیں</p>
              </figcaption>
            </div>
            <div aria-hidden className="absolute -bottom-5 -left-5 -z-10 hidden h-2/3 w-2/3 rounded-[28px] bg-sand lg:block" />
          </figure>
        </div>

        <div>
          <p className="eyebrow-dark" data-reveal>About us</p>
          <h2 id="about-title" className="mt-4 text-[clamp(2.2rem,4.4vw,3.6rem)] text-forest" data-reveal>{a.title}</h2>
          <span className="gold-rule" aria-hidden />
          <p className="mt-7 text-[1.0625rem] leading-[1.8] text-stone" data-reveal>{a.text}</p>
          <ul className="mt-8 grid gap-x-6 gap-y-1 sm:grid-cols-2">
            {a.badges.map((b, i) => (
              <li key={b} data-reveal style={{ "--rd": `${i * 0.08}s` } as React.CSSProperties} className="flex items-center gap-3 py-2.5">
                <span className="grid size-6 shrink-0 place-items-center rounded-full bg-gold text-night"><Check className="size-3.5" strokeWidth={3} aria-hidden /></span>
                <span className="font-semibold text-ink">{b}</span>
              </li>
            ))}
          </ul>
          <div className="mt-10 flex flex-wrap gap-3" data-reveal>
            <WhatsAppButton label="Discuss Your Event" variant="green" />
            <a href="#menu" className="btn btn-line">Build your menu</a>
          </div>
        </div>
      </div>
    </section>
  );
}
