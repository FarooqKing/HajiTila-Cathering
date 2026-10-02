/** Brief CSS-only loader (≈1s, first visit only). Content renders underneath regardless. */
export function PageLoader() {
  return (
    <div className="loader" aria-hidden>
      <div className="flex flex-col items-center">
        <span className="grid size-16 place-items-center rounded-full border border-gold/60 font-serif text-2xl text-gold-light">HT</span>
        <span className="mt-5 font-serif text-xl tracking-[0.3em] text-ivory">HAJI TILA</span>
        <span className="loader__line" />
      </div>
    </div>
  );
}
