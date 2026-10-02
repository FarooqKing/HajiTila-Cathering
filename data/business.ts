/**
 * SINGLE SOURCE OF TRUTH for contact details.
 * Every Call / WhatsApp / Directions button on the site reads from here.
 * Leave a field empty ("") until the real value is known — buttons that
 * depend on it switch to a safe "coming soon" state instead of a broken link.
 */
export const business = {
  name: "Haji Tila Catering & Tent Service",
  shortName: "Haji Tila",
  tagline: "Catering, tent and event solutions in Peshawar.",

  /** Local phone, e.g. "0300-1234567". Shown as text and used for tel: links. */
  phone: "",

  /** WhatsApp number in international format WITHOUT "+", e.g. "923001234567". */
  whatsapp: "92XXXXXXXXXX",

  address: "2CJR+VVW, Nasir Bagh Road, Askari 6, Nasir Bagh, Peshawar, Pakistan",
  addressLines: ["2CJR+VVW", "Nasir Bagh Road", "Askari 6", "Nasir Bagh", "Peshawar, Pakistan"],
  plusCode: "2CJR+VVW",
  city: "Peshawar",
  region: "Khyber Pakhtunkhwa",
  country: "PK",
  serviceArea: "Peshawar and surrounding areas",

  /** Paste the Google Maps share link for the business, e.g. "https://maps.app.goo.gl/...". */
  googleMapsUrl: "",
  /** Optional: Google review link. Shows a "Review us on Google" button when set. */
  googleReviewUrl: "",

  email: "",
  facebook: "",
  instagram: "",
  tiktok: "",

  /** Production URL — used for canonical links, sitemap and Open Graph. */
  siteUrl: "https://www.hajitilacatering.com",
} as const;

export type Business = typeof business;
