import { MapPin, Phone } from "lucide-react";
import { DEFAULT_WHATSAPP_MESSAGE, directionsUrl, phoneUrl, whatsappUrl } from "@/lib/contact";
import { WhatsAppIcon } from "./icons";

type Variant = "gold" | "outline" | "quiet" | "green" | "line";

interface BaseProps {
  label?: string;
  variant?: Variant;
  className?: string;
  icon?: boolean;
}

const cls = (v: Variant, extra = "") => `btn btn-${v} ${extra}`;

/**
 * Buttons always look and feel active. If a contact detail isn't configured
 * yet, they link to the on-page enquiry form / contact section instead —
 * never to a broken URL.
 */
export function WhatsAppButton({ label = "Chat on WhatsApp", message = DEFAULT_WHATSAPP_MESSAGE, variant = "gold", className = "", icon = true }: BaseProps & { message?: string }) {
  const href = whatsappUrl(message);
  const inner = (
    <>
      {icon && <WhatsAppIcon className="size-[1.15rem]" />}
      {label}
    </>
  );
  if (!href) return <a href="#enquiry" className={cls(variant, className)} data-magnetic>{inner}</a>;
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={cls(variant, className)} data-magnetic>
      {inner}
    </a>
  );
}

export function CallButton({ label = "Call Now", variant = "outline", className = "", icon = true }: BaseProps) {
  const href = phoneUrl() ?? "#contact";
  return (
    <a href={href} className={cls(variant, className)} data-magnetic>
      {icon && <Phone className="size-[1.05rem]" aria-hidden />}
      {label}
    </a>
  );
}

export function DirectionsButton({ label = "Get Directions", variant = "outline", className = "", icon = true }: BaseProps) {
  const href = directionsUrl();
  const inner = (
    <>
      {icon && <MapPin className="size-[1.05rem]" aria-hidden />}
      {label}
    </>
  );
  if (!href) return <a href="#contact" className={cls(variant, className)} data-magnetic>{inner}</a>;
  return <a href={href} target="_blank" rel="noopener noreferrer" className={cls(variant, className)} data-magnetic>{inner}</a>;
}
