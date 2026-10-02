import { business } from "@/data/business";

export const DEFAULT_WHATSAPP_MESSAGE =
  "Assalam-o-Alaikum, I visited the Haji Tila Catering & Tent Service website. I would like to get details and quotation for my event.";

/** A WhatsApp number is usable only if it is all digits in international form. */
export const isWhatsAppConfigured = (n: string = business.whatsapp) => /^\d{10,15}$/.test(n);
export const isPhoneConfigured = (p: string = business.phone) => p.replace(/\D/g, "").length >= 7;
export const isMapsConfigured = (u: string = business.googleMapsUrl) => /^https?:\/\//.test(u);

/** Returns a wa.me URL, or null while the number is not configured (no broken links). */
export function whatsappUrl(message: string = DEFAULT_WHATSAPP_MESSAGE): string | null {
  if (!isWhatsAppConfigured()) return null;
  return `https://wa.me/${business.whatsapp}?text=${encodeURIComponent(message)}`;
}

export function serviceMessage(serviceName: string): string {
  return `Assalam-o-Alaikum, I would like information about ${serviceName} from ${business.name}.`;
}

export function eventMessage(eventName: string): string {
  return `Assalam-o-Alaikum, I would like to ask about availability for a ${eventName} with ${business.name}.`;
}

export function phoneUrl(): string | null {
  if (!isPhoneConfigured()) return null;
  const digits = business.phone.replace(/[^\d+]/g, "");
  const intl = digits.startsWith("+") ? digits : digits.startsWith("0") ? `+92${digits.slice(1)}` : `+${digits}`;
  return `tel:${intl}`;
}

export function directionsUrl(): string | null {
  return isMapsConfigured() ? business.googleMapsUrl : null;
}

export interface EnquiryInput {
  eventType: string;
  eventDate: string;
  guests: string;
  location: string;
  services: string[];
  notes: string;
  /** Dishes picked in the menu builder (optional). */
  dishes?: string[];
}

function formatDate(iso: string): string {
  if (!iso) return "";
  const d = new Date(`${iso}T00:00:00`);
  return Number.isNaN(d.getTime()) ? iso : d.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
}

/** Builds the quotation request exactly as it will appear in WhatsApp. */
export function buildEnquiryMessage(e: EnquiryInput): string {
  const lines = [
    "Assalam-o-Alaikum,",
    "",
    `I would like to request a quotation from ${business.name}.`,
    "",
    `Event Type: ${e.eventType || "Not specified"}`,
    `Event Date: ${formatDate(e.eventDate) || "Not decided yet"}`,
    `Guests: ${e.guests || "Not sure yet"}`,
    `Location: ${e.location || "Not specified"}`,
    "",
    "Required Services:",
    ...(e.services.length ? e.services : ["To be discussed"]),
  ];
  if (e.dishes?.length) lines.push("", "Menu Preferences:", ...e.dishes);
  if (e.notes.trim()) lines.push("", "Additional Notes:", e.notes.trim());
  lines.push("", "Please share availability and estimated charges.");
  return lines.join("\n");
}
