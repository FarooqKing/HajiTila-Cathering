import { MapPin, Phone } from "lucide-react";
import { directionsUrl, phoneUrl, whatsappUrl } from "@/lib/contact";
import { WhatsAppIcon } from "@/components/ui/icons";

/** Fixed bottom bar on mobile. Unconfigured items scroll to the on-page contact details. */
export function MobileContactBar() {
  const wa = whatsappUrl();
  const dir = directionsUrl();
  const items = [
    { label: "Call", href: phoneUrl() ?? "#contact", external: false, icon: <Phone className="size-5" /> },
    { label: "WhatsApp", href: wa ?? "#enquiry", external: !!wa, icon: <WhatsAppIcon className="size-5" />, primary: true },
    { label: "Directions", href: dir ?? "#contact", external: !!dir, icon: <MapPin className="size-5" /> },
  ];
  return (
    <nav aria-label="Quick contact" className="fixed inset-x-0 bottom-0 z-40 border-t border-gold/20 bg-night/94 pb-[env(safe-area-inset-bottom)] backdrop-blur-xl md:hidden">
      <ul className="grid grid-cols-3">
        {items.map((it) => (
          <li key={it.label} className={it.primary ? "bg-gold text-night" : "border-r border-gold/10 last:border-r-0"}>
            <a href={it.href} target={it.external ? "_blank" : undefined} rel={it.external ? "noopener noreferrer" : undefined} className="flex h-[60px] flex-col items-center justify-center gap-1">
              <span className={it.primary ? "" : "text-gold-light"}>{it.icon}</span>
              <span className="text-[0.7rem] font-bold uppercase tracking-[0.14em]">{it.label}</span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
