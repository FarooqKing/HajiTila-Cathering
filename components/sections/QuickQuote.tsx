"use client";

import { CalendarDays, Users } from "lucide-react";
import { useId, useState } from "react";
import { eventTypeOptions } from "@/data/services";
import { buildEnquiryMessage, whatsappUrl } from "@/lib/contact";
import { WhatsAppIcon } from "@/components/ui/icons";

export const PREFILL_EVENT = "ht:prefill-enquiry";
export interface PrefillDetail { eventType: string; eventDate: string; guests: string }

const QUICK_TYPES = ["Wedding", "Walima", "Mehndi", "Engagement", "Family Function"];

/**
 * Three-question quote card in the hero. Opens WhatsApp with the details;
 * if WhatsApp isn't configured yet it hands the answers to the full form.
 */
export function QuickQuote() {
  const id = useId();
  const [eventType, setEventType] = useState("Wedding");
  const [eventDate, setEventDate] = useState("");
  const [guests, setGuests] = useState("");
  const today = new Date().toISOString().slice(0, 10);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const url = whatsappUrl(buildEnquiryMessage({ eventType, eventDate, guests, location: "", services: [], notes: "" }));
    if (url) {
      window.open(url, "_blank", "noopener,noreferrer");
      return;
    }
    window.dispatchEvent(new CustomEvent<PrefillDetail>(PREFILL_EVENT, { detail: { eventType, eventDate, guests } }));
    document.getElementById("enquiry")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <form onSubmit={submit} aria-labelledby={`${id}-t`} className="relative rounded-[28px] bg-white p-6 text-ink shadow-[0_40px_80px_-30px_rgba(0,0,0,.75)] sm:p-7">
      <span aria-hidden className="absolute inset-x-0 top-0 h-1.5 rounded-t-[28px] bg-gradient-to-r from-gold-deep via-gold to-gold-light" />
      <p id={`${id}-t`} className="font-serif text-[1.85rem] leading-tight text-forest">Get a quick quote</p>
      <p className="mt-1 text-sm text-stone">Three details and we’ll reply on WhatsApp.</p>

      <fieldset className="mt-6">
        <legend className="mb-2.5 text-xs font-bold uppercase tracking-[0.18em] text-gold-deep">Your occasion</legend>
        <div className="flex flex-wrap gap-2">
          {QUICK_TYPES.map((t) => (
            <label key={t} className={`cursor-pointer rounded-full border px-3.5 py-2 text-sm transition-colors duration-300 has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-gold ${eventType === t ? "border-forest bg-forest text-ivory font-semibold" : "border-line text-ink hover:border-forest/40"}`}>
              <input type="radio" name="quick-type" value={t} checked={eventType === t} onChange={() => setEventType(t)} className="sr-only" />
              {t}
            </label>
          ))}
          <label className="sr-only" htmlFor={`${id}-other`}>Other occasion</label>
          <select
            id={`${id}-other`}
            value={QUICK_TYPES.includes(eventType) ? "" : eventType}
            onChange={(e) => e.target.value && setEventType(e.target.value)}
            className={`h-[38px] rounded-full border bg-transparent px-3 text-sm outline-none ${QUICK_TYPES.includes(eventType) ? "border-line text-stone" : "border-forest bg-forest font-semibold text-ivory"}`}
          >
            <option value="">More…</option>
            {eventTypeOptions.filter((o) => !QUICK_TYPES.includes(o)).map((o) => <option key={o} value={o} className="bg-white text-ink">{o}</option>)}
          </select>
        </div>
      </fieldset>

      <div className="mt-5 grid grid-cols-2 gap-3">
        <label className="block">
          <span className="mb-2 flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.18em] text-gold-deep"><CalendarDays className="size-3.5" aria-hidden /> Date</span>
          <input type="date" min={today} value={eventDate} onChange={(e) => setEventDate(e.target.value)} className="field-light h-12" />
        </label>
        <label className="block">
          <span className="mb-2 flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.18em] text-gold-deep"><Users className="size-3.5" aria-hidden /> Guests</span>
          <input inputMode="numeric" placeholder="e.g. 300" value={guests} onChange={(e) => setGuests(e.target.value.replace(/[^\d\s\-–]/g, "").slice(0, 10))} className="field-light h-12" />
        </label>
      </div>

      <button type="submit" className="btn btn-green mt-6 w-full" data-magnetic>
        <WhatsAppIcon className="size-[1.15rem]" /> Get Quote on WhatsApp
      </button>
      <p className="mt-3 text-center text-xs text-stone">Opens WhatsApp with your details filled in.</p>
    </form>
  );
}
