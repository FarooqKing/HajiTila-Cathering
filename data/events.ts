export interface EventType {
  slug: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
}

/** Availability for any event type is confirmed on enquiry — never guaranteed on the site. */
export const events: EventType[] = [
  { slug: "weddings", title: "Weddings", description: "Catering, marquee and seating for the main celebration.", image: "/images/events/weddings.webp", imageAlt: "Illustration of a wedding marquee with chandeliers" },
  { slug: "walima", title: "Walima", description: "Organised dining arrangements for receiving guests.", image: "/images/events/walima.webp", imageAlt: "Illustration of a dining hall set for a walima" },
  { slug: "mehndi", title: "Mehndi", description: "Warm, colourful settings for an evening of celebration.", image: "/images/events/mehndi.webp", imageAlt: "Illustration of a mehndi stage with marigold garlands" },
  { slug: "engagements", title: "Engagements", description: "Graceful arrangements for a smaller, close gathering.", image: "/images/events/engagements.webp", imageAlt: "Illustration of an intimate engagement table" },
  { slug: "family-functions", title: "Family Functions", description: "Food and seating for family get-togethers of any size.", image: "/images/events/family-functions.webp", imageAlt: "Illustration of a family dinner under string lights" },
  { slug: "private-events", title: "Private Events", description: "Dinners and private occasions arranged to your plan.", image: "/images/events/private-events.webp", imageAlt: "Illustration of a private dinner setup" },
  { slug: "corporate-events", title: "Corporate Events", description: "Seating and catering for professional gatherings.", image: "/images/events/corporate-events.webp", imageAlt: "Illustration of rows of chairs facing a stage" },
];
