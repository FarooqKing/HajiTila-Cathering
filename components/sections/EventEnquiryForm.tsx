"use client";

import { Check, Copy } from "lucide-react";
import { useEffect, useId, useMemo, useState } from "react";
import { PREFILL_EVENT, type PrefillDetail } from "./QuickQuote";
import { menuSelection } from "@/lib/menuSelection";
import { content } from "@/data/content";
import { eventTypeOptions, requiredServiceOptions } from "@/data/services";
import { buildEnquiryMessage, whatsappUrl, type EnquiryInput } from "@/lib/contact";
import { WhatsAppIcon } from "@/components/ui/icons";
import { SectionHeading } from "@/components/ui/SectionHeading";

const EMPTY: EnquiryInput = { eventType: "", eventDate: "", guests: "", location: "", services: [], notes: "" };

/**
 * Builds a quotation request and opens WhatsApp. No backend, nothing stored.
 */
export function EventEnquiryForm() {
  const [form, setForm] = useState<EnquiryInput>(EMPTY);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const id = useId();
  const dishes = menuSelection.use();
  const message = useMemo(() => buildEnquiryMessage({ ...form, dishes }), [form, dishes]);
  const configured = whatsappUrl() !== null;
  const today = new Date().toISOString().slice(0, 10);

  // Answers from the hero quick-quote card carry over into this form.
  useEffect(() => {
    const onPrefill = (e: Event) => {
      const d = (e as CustomEvent<PrefillDetail>).detail;
      setForm((f) => ({ ...f, eventType: d.eventType || f.eventType, eventDate: d.eventDate || f.eventDate, guests: d.guests || f.guests }));
    };
    window.addEventListener(PREFILL_EVENT, onPrefill);
    return () => window.removeEventListener(PREFILL_EVENT, onPrefill);
  }, []);

  const set = <K extends keyof EnquiryInput>(k: K, v: EnquiryInput[K]) => {
    setForm((f) => ({ ...f, [k]: v }));
    setError(null);
  };
  const toggleService = (s: string) => set("services", form.services.includes(s) ? form.services.filter((x) => x !== s) : [...form.services, s]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.eventType) {
      setError("Choose an event type so we know what you’re planning.");
      document.getElementById(`${id}-type`)?.focus();
      return;
    }
    const url = whatsappUrl(message);
    if (!url) {
      setError("Our WhatsApp number is being added to the website. Please copy the message below, or call or visit us using the details in the Contact section.");
      return;
    }
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(message);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      setError("Copying isn’t available in this browser — select the message text and copy it manually.");
    }
  };

  const label = "mb-2 block text-sm font-medium text-ink";

  return (
    <section id="enquiry" aria-labelledby="enquiry-title" className="section bg-white">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-[480px] bg-[radial-gradient(50%_70%_at_50%_0%,rgba(212,175,55,.10),transparent)]" />
      <div className="wrap relative grid gap-12 lg:grid-cols-[1.25fr_0.75fr]">
        <div>
          <SectionHeading id="enquiry-title" eyebrow="Request a quote" title={content.enquiry.title} intro={content.enquiry.intro} />
          <form onSubmit={submit} noValidate className="card-light grid gap-5 p-6 sm:grid-cols-2 md:p-9" data-reveal>
            <div>
              <label htmlFor={`${id}-type`} className={label}>Event Type <span className="text-gold-deep" aria-hidden>*</span></label>
              <select id={`${id}-type`} required value={form.eventType} onChange={(e) => set("eventType", e.target.value)} aria-invalid={!!error && !form.eventType} aria-describedby={error ? `${id}-err` : undefined} className="field-light">
                <option value="">Select an event</option>
                {eventTypeOptions.map((o) => <option key={o}>{o}</option>)}
              </select>
            </div>
            <div>
              <label htmlFor={`${id}-date`} className={label}>Event Date</label>
              <input id={`${id}-date`} type="date" min={today} value={form.eventDate} onChange={(e) => set("eventDate", e.target.value)} className="field-light" />
            </div>
            <div>
              <label htmlFor={`${id}-guests`} className={label}>Number of Guests</label>
              <input id={`${id}-guests`} inputMode="numeric" placeholder="e.g. 300" value={form.guests} onChange={(e) => set("guests", e.target.value.replace(/[^\d\s\-–]/g, "").slice(0, 12))} className="field-light" />
            </div>
            <div>
              <label htmlFor={`${id}-loc`} className={label}>Event Location</label>
              <input id={`${id}-loc`} placeholder="e.g. Hayatabad, Peshawar" value={form.location} onChange={(e) => set("location", e.target.value.slice(0, 120))} className="field-light" autoComplete="address-level2" />
            </div>
            <fieldset className="sm:col-span-2">
              <legend className={label}>Required Services</legend>
              <div className="flex flex-wrap gap-2">
                {requiredServiceOptions.map((s) => {
                  const on = form.services.includes(s);
                  return (
                    <label key={s} className={`inline-flex h-11 cursor-pointer items-center gap-2 rounded-full border px-4 text-sm transition-colors duration-300 has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-gold ${on ? "border-forest bg-forest text-ivory" : "border-line bg-white text-ink hover:border-forest/40"}`}>
                      <input type="checkbox" className="sr-only" checked={on} onChange={() => toggleService(s)} />
                      <span className={`grid size-4 place-items-center rounded-[5px] border ${on ? "border-ivory bg-ivory text-forest" : "border-ink/25"}`} aria-hidden>{on && <Check className="size-3" strokeWidth={3} />}</span>
                      {s}
                    </label>
                  );
                })}
              </div>
            </fieldset>
            {dishes.length > 0 && (
              <div className="rounded-2xl bg-sand p-4 sm:col-span-2">
                <p className="text-sm font-semibold text-ink">Menu preferences <span className="font-normal text-stone">— from Build Your Menu</span></p>
                <p className="mt-1 text-sm text-stone">{dishes.join(", ")}</p>
                <a href="#menu" className="mt-2 inline-block text-sm font-semibold text-forest underline-offset-4 hover:underline">Change dishes</a>
              </div>
            )}
            <div className="sm:col-span-2">
              <label htmlFor={`${id}-notes`} className={label}>Additional Notes</label>
              <textarea id={`${id}-notes`} rows={4} placeholder="Menu preferences, timings, venue details…" value={form.notes} onChange={(e) => set("notes", e.target.value.slice(0, 800))} className="field-light resize-y" />
            </div>
            {error && <p id={`${id}-err`} role="alert" className="text-sm text-[#b42318] sm:col-span-2">{error}</p>}
            <div className="flex flex-col gap-3 sm:col-span-2 sm:flex-row sm:items-center">
              <button type="submit" className="btn btn-green" data-magnetic>
                <WhatsAppIcon className="size-[1.15rem]" /> Request Quote on WhatsApp
              </button>
              <p className="text-xs text-stone">Opens WhatsApp with your details filled in. Nothing is saved on this website.</p>
            </div>
          </form>
        </div>

        <aside aria-label="Message preview" className="lg:pt-[13.5rem]" data-reveal>
          <div className="sticky top-28 rounded-[28px] bg-[#e9e2d3] p-5">
            <div className="mb-4 flex items-center justify-between">
              <p className="flex items-center gap-2 text-sm font-semibold text-ink"><WhatsAppIcon className="size-4 text-wa-deep" /> Message preview</p>
              <button type="button" onClick={copy} className="inline-flex h-9 items-center gap-1.5 rounded-full border border-ink/15 bg-white px-3 text-xs font-semibold text-ink hover:border-forest">
                {copied ? <><Check className="size-3.5" /> Copied</> : <><Copy className="size-3.5" /> Copy</>}
              </button>
            </div>
            <pre className="max-h-[420px] overflow-auto whitespace-pre-wrap rounded-2xl rounded-tr-sm bg-[#dcf8c6] p-4 font-sans text-[0.85rem] leading-relaxed text-ink shadow-sm">{message}</pre>
            {!configured && <p className="mt-3 text-xs text-stone">WhatsApp number will be added soon.</p>}
          </div>
        </aside>
      </div>
    </section>
  );
}
