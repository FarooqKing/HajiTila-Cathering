/**
 * Temporary text logo. To use an official logo, place it at /public/logo.svg
 * and replace the contents of this component with:
 *   <img src="/logo.svg" alt="Haji Tila Catering & Tent Service" className="h-12 w-auto" />
 */
export function Logo({ compact = false, tone = "light" }: { compact?: boolean; tone?: "light" | "dark" }) {
  const dark = tone === "dark";
  return (
    <span className="inline-flex items-center gap-3.5">
      <span className={`relative grid shrink-0 place-items-center rounded-full border transition-all duration-500 ${dark ? "border-forest bg-forest" : "border-gold/70"} ${compact ? "size-10" : "size-12"}`} aria-hidden>
        <span className={`absolute inset-[3px] rounded-full border ${dark ? "border-gold/50" : "border-gold/30"}`} />
        <span className={`font-serif font-semibold leading-none text-gold-light ${compact ? "text-[1.05rem]" : "text-[1.2rem]"}`}>HT</span>
      </span>
      <span className="flex flex-col leading-none">
        <span className={`font-serif text-[1.3rem] font-semibold tracking-[0.16em] ${dark ? "text-forest" : "text-ivory"}`}>HAJI TILA</span>
        <span className={`mt-1.5 flex items-center gap-2 text-[0.62rem] font-semibold tracking-[0.14em] ${dark ? "text-gold-deep" : "text-gold-light"}`}>
          <span className="h-px w-3 bg-gold" aria-hidden />
          Catering &amp; Tent Service
        </span>
      </span>
    </span>
  );
}
