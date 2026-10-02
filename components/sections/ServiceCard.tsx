import { ArrowUpRight, Armchair, CookingPot, Sparkles, Tent, Users, UtensilsCrossed } from "lucide-react";
import type { Service, ServiceIcon } from "@/data/services";
import { serviceMessage, whatsappUrl } from "@/lib/contact";
import { WhatsAppIcon } from "@/components/ui/icons";
import { TiltCard } from "@/components/ui/TiltCard";

const ICONS: Record<ServiceIcon, typeof Tent> = { deg: CookingPot, tent: Tent, seating: Armchair, equipment: UtensilsCrossed, stage: Sparkles, family: Users };

export function ServiceCard({ service }: { service: Service }) {
  const Icon = ICONS[service.icon];
  const href = whatsappUrl(serviceMessage(service.enquiryName));
  return (
    <TiltCard className="group h-full">
      <article className="card-light flex h-full flex-col p-8 transition-shadow duration-700 group-hover:shadow-[inset_0_0_0_1px_rgba(209,168,58,.7),0_30px_70px_-30px_rgba(14,74,54,.35)] md:p-9">
        <div aria-hidden className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100" style={{ background: "radial-gradient(380px circle at var(--gx,50%) var(--gy,20%), rgba(226,196,109,.10), transparent 50%)" }} />
        <div aria-hidden className="pointer-events-none absolute -right-10 -top-10 size-44 rounded-full bg-gold/5 blur-2xl transition-colors duration-700 group-hover:bg-gold/12" />
        <span className="relative grid size-16 place-items-center rounded-full border border-forest/20 text-gold-deep transition-all duration-700 group-hover:rotate-[-8deg] group-hover:border-forest group-hover:bg-forest group-hover:text-gold-light">
          <Icon className="size-7" strokeWidth={1.3} aria-hidden />
        </span>
        <h3 className="relative mt-9 text-[2rem] leading-tight text-forest">{service.title}</h3>
        <p className="relative mt-3 flex-1 leading-relaxed text-stone">{service.description}</p>
        <a
          href={href ?? "#enquiry"}
          target={href ? "_blank" : undefined}
          rel={href ? "noopener noreferrer" : undefined}
          className="relative mt-8 inline-flex items-center justify-between gap-3 border-t border-line pt-5 text-[0.9375rem] font-semibold text-gold-deep"
          aria-label={`Ask about ${service.title} on WhatsApp`}
        >
          <span className="inline-flex items-center gap-2.5"><WhatsAppIcon className="size-4" /> Ask on WhatsApp</span>
          <ArrowUpRight className="size-5 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
        </a>
      </article>
    </TiltCard>
  );
}
