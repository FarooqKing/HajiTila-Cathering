/** Editable website copy. Change wording here without touching components. */
export const content = {
  hero: {
    eyebrow: "Welcome to",
    eyebrowName: "Haji Tila Catering & Tent Service",
    titleLines: ["Beautiful Events.", "Perfectly Arranged."],
    text: "Professional catering, tent arrangements and event solutions for weddings, family gatherings and special occasions across Peshawar.",
    primaryCta: "Get a Quote on WhatsApp",
    secondaryCta: "Call Now",
    tertiaryCta: "Explore Our Services",
    note: "Serving Peshawar & Surrounding Areas",
    /** "Wedding, walima, mehndi — a beautiful arrangement for every occasion" */
    urdu: "شادی، ولیمہ، مہندی — ہر تقریب کا خوبصورت انتظام",
    highlights: ["Catering & Deg", "Tent & Marquee", "Tables & Chairs", "Catering Equipment", "Event Setup"],
  },
  about: {
    title: "Bringing Hospitality, Presentation & Service Together",
    text: "Haji Tila Catering & Tent Service provides catering, tent arrangements and event-related services for celebrations and gatherings in Peshawar. Our focus is on creating welcoming, well-arranged environments where hosts can concentrate on their guests while the important event details are professionally managed.",
    badges: ["Professional Service", "Quality Arrangements", "Flexible Event Solutions", "Peshawar Based"],
  },
  services: {
    title: "Everything Your Event Needs",
    intro: "From food preparation to venue arrangements, tell us what your event needs and we'll discuss the details with you.",
  },
  events: {
    title: "Arrangements for Every Occasion",
    intro: "Tell us the occasion and the date — we'll confirm what we can arrange for you.",
  },
  experience: {
    title: "Imagine Your Event",
    steps: [
      { title: "An empty space", text: "Every celebration starts with a plot of ground or an open venue." },
      { title: "The marquee goes up", text: "Tent and marquee arrangements shaped to your venue and guest count." },
      { title: "Tables and chairs", text: "Seating laid out for dining, conversation and easy movement." },
      { title: "Lights on", text: "Warm lighting turns the space into an evening setting." },
      { title: "Ready for your guests", text: "Food, seating and setup in place — so you can welcome everyone." },
    ],
    final: "From an empty space to a memorable celebration.",
    cta: "Plan My Event",
  },
  gallery: { title: "Our Event Gallery", intro: "A look at the kind of arrangements we provide." },
  beforeAfter: {
    title: "See the Transformation",
    intro: "Drag the handle to compare an empty venue with a prepared event setup.",
    /** Turn on after adding real photos of the same venue: public/images/before-after/before.webp & after.webp */
    enabled: false,
  },
  why: {
    title: "Your Event Deserves Attention to Every Detail",
    items: [
      { title: "Personalised Arrangements", text: "Plans shaped around your occasion, venue and guests." },
      { title: "Reliable Service", text: "Clear communication before and on the day of your event." },
      { title: "Flexible Event Solutions", text: "Choose only the services you need — catering, tents, seating or all of them." },
      { title: "Professional Presentation", text: "Neat, well-arranged setups your guests will notice." },
      { title: "Easy WhatsApp Communication", text: "Share details, photos and questions in one conversation." },
      { title: "Peshawar Based Service", text: "Local to Nasir Bagh Road and serving Peshawar and nearby areas." },
    ],
  },
  process: {
    title: "Planning Your Event is Simple",
    steps: [
      "Tell Us About Your Event",
      "Share Date, Location & Guests",
      "Discuss Required Services",
      "Receive Your Quotation",
      "Confirm Your Booking",
      "We Prepare Your Event",
    ],
    cta: "Start Planning on WhatsApp",
  },
  testimonials: { title: "What Our Clients Say", empty: "Client testimonials will appear here." },
  enquiry: { title: "Tell Us About Your Event", intro: "Fill in what you know — the form prepares a WhatsApp message for you. Nothing is stored on this website." },
  location: { title: "Visit / Contact Us" },
  contactCta: { title: "Let's Plan Your Event", text: "Tell us what you're planning. We'll help you arrange the rest." },
  finalCta: {
    title: "Your Next Celebration Starts Here.",
    text: "Share your event details and let us help you plan the arrangements.",
    cta: "Plan Your Event on WhatsApp",
  },
  /** Keep false until verified figures are available. */
  showStats: false,
  stats: { yearsExperience: "", eventsServed: "", guestsServed: "", equipmentInventory: "" },
} as const;
