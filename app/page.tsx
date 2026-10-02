import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Stats } from "@/components/sections/Stats";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { EventTypes } from "@/components/sections/EventTypes";
import { EventExperience } from "@/components/sections/EventExperience";
import { Gallery } from "@/components/sections/Gallery";
import { BeforeAfterSlider } from "@/components/sections/BeforeAfterSlider";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { ProcessTimeline } from "@/components/sections/ProcessTimeline";
import { Testimonials } from "@/components/sections/Testimonials";
import { EventEnquiryForm } from "@/components/sections/EventEnquiryForm";
import { LocationSection } from "@/components/sections/LocationSection";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { content } from "@/data/content";
import { MenuBuilder } from "@/components/sections/MenuBuilder";
import { FAQ } from "@/components/sections/FAQ";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ServicesSection />
      <MenuBuilder />
      <About />
      <Stats />
      <EventTypes />
      <EventExperience />
      <Gallery />
      {content.beforeAfter.enabled && <BeforeAfterSlider isOwnWork />}
      <WhyChooseUs />
      <ProcessTimeline />
      <Testimonials />
      <EventEnquiryForm />
      <FAQ />
      <LocationSection />
      <ContactCTA />
      <FinalCTA />
    </>
  );
}
