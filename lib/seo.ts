import { business } from "@/data/business";
import { services } from "@/data/services";
import { isPhoneConfigured, isWhatsAppConfigured } from "./contact";

export const SEO = {
  title: "Haji Tila Catering & Tent Service | Catering & Event Services Peshawar",
  description:
    "Haji Tila Catering & Tent Service provides catering, tent arrangements and event solutions in Peshawar. Contact us on WhatsApp for event details and quotations.",
  keywords: [
    "Haji Tila Catering Peshawar", "Haji Tila Tent Service", "Catering Service Peshawar", "Tent Service Peshawar",
    "Wedding Catering Peshawar", "Event Catering Peshawar", "Catering Nasir Bagh Peshawar", "Tent Rental Peshawar",
    "Event Equipment Rental Peshawar", "Wedding Tent Service Peshawar",
  ],
  ogImage: "/images/og-image.jpg",
};

/** LocalBusiness schema using only verified details. Phone/map/socials appear once configured. */
export function localBusinessSchema() {
  const sameAs = [business.facebook, business.instagram, business.tiktok].filter(Boolean);
  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "FoodEstablishment"],
    "@id": `${business.siteUrl}/#business`,
    name: business.name,
    url: `${business.siteUrl}/`,
    image: `${business.siteUrl}${SEO.ogImage}`,
    description: SEO.description,
    address: {
      "@type": "PostalAddress",
      streetAddress: "2CJR+VVW, Nasir Bagh Road, Askari 6, Nasir Bagh",
      addressLocality: business.city,
      addressRegion: business.region,
      addressCountry: business.country,
    },
    areaServed: { "@type": "City", name: "Peshawar" },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Catering and event services",
      itemListElement: services.map((s) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: s.title, description: s.description } })),
    },
  };
  if (isPhoneConfigured()) schema.telephone = business.phone;
  if (isWhatsAppConfigured()) schema.contactPoint = { "@type": "ContactPoint", telephone: `+${business.whatsapp}`, contactType: "customer service", availableLanguage: ["en", "ur", "ps"] };
  if (business.email) schema.email = business.email;
  if (business.googleMapsUrl) schema.hasMap = business.googleMapsUrl;
  if (sameAs.length) schema.sameAs = sameAs;
  return schema;
}
