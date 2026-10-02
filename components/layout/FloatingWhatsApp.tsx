import { whatsappUrl } from "@/lib/contact";
import { WhatsAppIcon } from "@/components/ui/icons";

/** Opens WhatsApp when configured; otherwise takes visitors to the quote form. */
export function FloatingWhatsApp() {
  const href = whatsappUrl();
  return (
    <a
      href={href ?? "#enquiry"}
      target={href ? "_blank" : undefined}
      rel={href ? "noopener noreferrer" : undefined}
      aria-label="Chat with us on WhatsApp"
      className="group fixed bottom-[calc(76px+env(safe-area-inset-bottom))] right-4 z-40 flex items-center md:bottom-7 md:right-7"
      data-magnetic
    >
      <span className="pointer-events-none absolute right-[calc(100%+12px)] top-1/2 hidden -translate-y-1/2 translate-x-2 whitespace-nowrap rounded-full bg-ivory px-4 py-2 text-sm font-medium text-night opacity-0 shadow-xl transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100 md:block">
        Chat with us on WhatsApp
      </span>
      <span className="wa-breathe flex h-14 items-center gap-2 rounded-full bg-wa pl-4 pr-5 text-night shadow-[0_14px_34px_-10px_rgba(37,211,102,.6)] md:w-14 md:justify-center md:p-0">
        <WhatsAppIcon className="size-7" />
        <span className="text-sm font-bold md:hidden">Get Quote</span>
      </span>
    </a>
  );
}
