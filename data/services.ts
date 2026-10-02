export type ServiceIcon = "deg" | "tent" | "seating" | "equipment" | "stage" | "family";

export interface Service {
  slug: string;
  title: string;
  /** Name used inside the WhatsApp message. */
  enquiryName: string;
  description: string;
  icon: ServiceIcon;
}

export const services: Service[] = [
  { slug: "catering-deg", title: "Catering & Deg", enquiryName: "Catering & Deg", icon: "deg", description: "Food preparation and catering arrangements for weddings, family functions and special gatherings." },
  { slug: "tent-marquee", title: "Tent & Marquee Service", enquiryName: "Tent & Marquee Service", icon: "tent", description: "Elegant tent and event-space arrangements based on your venue, gathering and occasion." },
  { slug: "tables-seating", title: "Tables & Seating", enquiryName: "Tables & Seating", icon: "seating", description: "Organised table and seating arrangements according to your event requirements." },
  { slug: "catering-equipment", title: "Catering Equipment", enquiryName: "Catering Equipment", icon: "equipment", description: "Event and catering equipment solutions for different gathering requirements." },
  { slug: "wedding-event-setup", title: "Wedding & Event Setup", enquiryName: "Wedding & Event Setup", icon: "stage", description: "Coordinated arrangements for weddings, family celebrations and special occasions." },
  { slug: "private-family-events", title: "Private & Family Events", enquiryName: "Private & Family Events", icon: "family", description: "Flexible arrangements for dinners, family functions, engagements and private celebrations." },
];

/** Options for the enquiry form. */
export const requiredServiceOptions = ["Catering / Deg", "Tent / Marquee", "Tables & Chairs", "Catering Equipment", "Event Setup", "Other"];
export const eventTypeOptions = ["Wedding", "Walima", "Mehndi", "Engagement", "Family Function", "Private Event", "Corporate Event", "Other"];
