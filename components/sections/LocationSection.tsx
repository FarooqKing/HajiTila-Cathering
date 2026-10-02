import { Clock, MapPin } from "lucide-react";
import { business } from "@/data/business";
import { content } from "@/data/content";
import { CallButton, DirectionsButton, WhatsAppButton } from "@/components/ui/ContactButtons";

/** Stylised map — no paid Maps API. "Get Directions" uses business.googleMapsUrl. */
function MapArt() {
  return (
    <svg viewBox="0 0 600 420" className="absolute inset-0 size-full" preserveAspectRatio="xMidYMid slice" aria-hidden>
      <defs>
        <pattern id="grid" width="30" height="30" patternUnits="userSpaceOnUse"><path d="M30 0H0V30" fill="none" stroke="#0E4A36" strokeOpacity=".06" /></pattern>
        <radialGradient id="pin-glow"><stop offset="0" stopColor="#D1A83A" stopOpacity=".35" /><stop offset="1" stopColor="#D1A83A" stopOpacity="0" /></radialGradient>
      </defs>
      <rect width="600" height="420" fill="#f4eddf" />
      <rect width="600" height="420" fill="url(#grid)" />
      <path d="M380 -20 C 420 120, 470 260, 520 440" fill="none" stroke="#bcd9cf" strokeWidth="26" strokeLinecap="round" />
      <g fill="none" stroke="#ffffff" strokeLinecap="round">
        <path d="M-20 300 C 120 280, 220 230, 320 210 S 520 170, 640 120" strokeWidth="22" />
        <path d="M120 -20 C 150 120, 180 220, 200 440" strokeWidth="14" />
        <path d="M-20 120 C 140 140, 300 110, 640 60" strokeWidth="10" />
      </g>
      <path d="M-20 300 C 120 280, 220 230, 320 210 S 520 170, 640 120" fill="none" stroke="#D1A83A" strokeOpacity=".7" strokeWidth="2" strokeDasharray="2 10" strokeLinecap="round" />
      <circle cx="320" cy="210" r="90" fill="url(#pin-glow)" />
      <circle cx="320" cy="210" r="40" fill="none" stroke="#0E4A36" strokeOpacity=".2" />
      <text x="36" y="292" fill="#5b6a62" fontSize="12" fontFamily="sans-serif" letterSpacing="3">NASIR BAGH ROAD</text>
    </svg>
  );
}

export function LocationSection() {
  return (
    <section id="contact" aria-labelledby="location-title" className="section bg-white">
      <div className="wrap grid gap-6 lg:grid-cols-[1fr_1fr]">
        <div className="card-light flex flex-col p-8 md:p-11" data-reveal>
          <p className="eyebrow-dark">Location</p>
          <h2 id="location-title" className="mt-4 text-[clamp(2.2rem,4vw,3.4rem)] text-forest">{content.location.title}</h2>
          <span className="gold-rule" aria-hidden />
          <dl className="mt-8 space-y-6">
            <div className="flex gap-4">
              <dt className="grid size-11 shrink-0 place-items-center rounded-full bg-sand text-forest"><MapPin className="size-5" aria-label="Address" /></dt>
              <dd>
                <strong className="block font-semibold text-ink">{business.name}</strong>
                <span className="text-stone">{business.addressLines.join(", ")}</span>
              </dd>
            </div>
            <div className="flex gap-4">
              <dt className="grid size-11 shrink-0 place-items-center rounded-full bg-sand text-forest"><Clock className="size-5" aria-label="Service area" /></dt>
              <dd className="text-stone">Serving {business.serviceArea}. Call or message us to arrange a visit.</dd>
            </div>
          </dl>
          <div className="mt-auto flex flex-wrap gap-3 pt-10">
            <DirectionsButton variant="green" />
            <CallButton variant="line" />
            <WhatsAppButton variant="line" />
          </div>
        </div>
        <div className="relative min-h-[380px] overflow-hidden rounded-[24px] ring-1 ring-line" data-reveal>
          <MapArt />
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[85%]">
            <MapPin className="size-11 fill-gold text-forest" strokeWidth={1.5} aria-hidden />
          </div>
          <div className="absolute inset-x-5 bottom-5 rounded-2xl bg-white p-4 shadow-lg sm:inset-x-auto sm:left-5 sm:max-w-xs">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold-deep">Plus code</p>
            <p className="mt-1 font-serif text-2xl text-forest">{business.plusCode}</p>
            <p className="mt-1 text-sm text-stone">Search this code in Google Maps to find us.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
