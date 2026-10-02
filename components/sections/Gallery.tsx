"use client";

import { useMemo, useState } from "react";
import { content } from "@/data/content";
import { gallery, galleryCategories } from "@/data/gallery";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SmartImage } from "@/components/ui/SmartImage";
import { GalleryLightbox } from "./GalleryLightbox";
import { WhatsAppButton } from "@/components/ui/ContactButtons";

const PHOTO_REQUEST = "Assalam-o-Alaikum, could you please share photos or videos of your recent event setups?";

/** Shown until real event photographs are added to data/gallery.ts. */
function GalleryOnRequest() {
  return (
    <section id="gallery" aria-labelledby="gallery-title" className="section bg-white">
      <div className="wrap">
        <div className="relative overflow-hidden rounded-[32px] bg-night text-ivory" data-reveal>
          <img src="/images/events/weddings.webp" alt="" aria-hidden loading="lazy" className="absolute inset-0 size-full object-cover opacity-60" />
          <div aria-hidden className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,42,31,.97)_0%,rgba(7,42,31,.88)_50%,rgba(7,42,31,.45)_100%)]" />
          <div className="relative grid gap-10 p-8 md:p-14 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
            <div>
              <p className="eyebrow">Gallery</p>
              <h2 id="gallery-title" className="mt-4 text-[clamp(2.3rem,5vw,4rem)] text-ivory">{content.gallery.title}</h2>
              <p className="mt-5 max-w-lg text-[1.0625rem] leading-relaxed text-muted">
                See our recent setups before you decide. Message us and we’ll share photos and videos of marquees, seating and catering arrangements.
              </p>
            </div>
            <div className="flex flex-col gap-3 lg:items-end">
              <WhatsAppButton label="Request Photos on WhatsApp" message={PHOTO_REQUEST} />
              <ul className="flex flex-wrap gap-2 lg:justify-end">
                {galleryCategories.slice(1).map((c) => <li key={c} className="rounded-full border border-gold/25 px-3 py-1.5 text-xs text-cream">{c}</li>)}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Gallery() {
  const [filter, setFilter] = useState<(typeof galleryCategories)[number]>("All");
  const [open, setOpen] = useState<number | null>(null);
  const photos = useMemo(() => gallery.filter((g) => g.isOwnWork), []);
  const items = useMemo(() => (filter === "All" ? photos : photos.filter((g) => g.category === filter)), [filter, photos]);

  if (photos.length === 0) return <GalleryOnRequest />;

  return (
    <section id="gallery" aria-labelledby="gallery-title" className="section bg-night-2">
      <div className="wrap">
        <SectionHeading id="gallery-title" eyebrow="Gallery" title={content.gallery.title} intro={content.gallery.intro} align="center" />
        <div role="group" aria-label="Filter gallery" className="mb-10 flex flex-wrap justify-center gap-2" data-reveal>
          {galleryCategories.map((c) => (
            <button
              key={c}
              type="button"
              aria-pressed={filter === c}
              onClick={() => setFilter(c)}
              className={`h-10 rounded-full border px-5 text-sm font-medium transition-colors duration-500 ${filter === c ? "border-gold bg-gold text-night" : "border-gold/25 text-cream hover:border-gold/60"}`}
            >
              {c}
            </button>
          ))}
        </div>

        {items.length === 0 ? (
          <p className="py-16 text-center text-muted">No photos in this category yet.</p>
        ) : (
          <ul className="columns-1 gap-5 sm:columns-2 lg:columns-3" aria-live="polite">
            {items.map((g) => {
              const i = items.indexOf(g);
              return (
                <li key={g.src} className="mb-5 break-inside-avoid [animation:fade-up_.7s_var(--ease-silk)_both]">
                  <button
                    type="button"
                    onClick={() => setOpen(i)}
                    data-cursor="view"
                    aria-label={`Open image: ${g.alt}`}
                    className="group relative block w-full overflow-hidden rounded-[22px] ring-1 ring-gold/15"
                    style={{ aspectRatio: String(g.ratio) }}
                  >
                    <SmartImage src={g.src} alt={g.alt} illustration={!g.isOwnWork} className="absolute inset-0 size-full object-cover transition-transform duration-[1.4s] [transition-timing-function:var(--ease-silk)] group-hover:scale-[1.08]" />
                    <span aria-hidden className="absolute inset-0 bg-gradient-to-t from-night/85 via-night/10 to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-100" />
                    <span className="absolute bottom-4 left-4 rounded-full border border-gold/40 bg-night/60 px-3 py-1 text-xs font-medium text-gold-light backdrop-blur">{g.category}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>
      {open !== null && <GalleryLightbox items={items} index={open} onClose={() => setOpen(null)} onIndex={setOpen} />}
    </section>
  );
}
