export function SectionHeading({ eyebrow, title, intro, align = "left", id, tone = "light" }: { eyebrow?: string; title: string; intro?: string; align?: "left" | "center"; id?: string; tone?: "light" | "dark" }) {
  const center = align === "center";
  const dark = tone === "dark";
  return (
    <div className={`mb-14 ${center ? "mx-auto max-w-3xl text-center" : "max-w-2xl"}`} data-reveal>
      {eyebrow && <p className={dark ? "eyebrow" : "eyebrow-dark"}>{eyebrow}</p>}
      <h2 id={id} className={`mt-4 text-[clamp(2.3rem,5vw,4rem)] ${dark ? "text-ivory" : "text-forest"}`}>{title}</h2>
      <span className={`gold-rule ${center ? "mx-auto" : ""}`} aria-hidden />
      {intro && <p className={`mt-6 text-[1.0625rem] leading-relaxed ${dark ? "text-muted" : "text-stone"} ${center ? "mx-auto max-w-xl" : "max-w-xl"}`}>{intro}</p>}
    </div>
  );
}
