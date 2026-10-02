import { business } from "@/data/business";
import { navLinks } from "@/data/navigation";
import { services } from "@/data/services";
import { phoneUrl, whatsappUrl } from "@/lib/contact";
import { Logo } from "@/components/ui/Logo";
import { SocialIcon } from "@/components/ui/icons";

export function Footer() {
  const socials = (["facebook", "instagram", "tiktok"] as const).filter((s) => business[s]);
  const footerNav = navLinks.filter((l) => ["#home", "#about", "#services", "#gallery", "#contact"].includes(l.href));
  const year = new Date().getFullYear();
  return (
    <footer className="relative border-t border-gold/15 bg-night pb-[88px] md:pb-0">
      <div className="wrap grid gap-12 py-20 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1.2fr_1.2fr]">
        <div>
          <Logo />
          <p className="mt-6 max-w-xs text-muted">{business.tagline}</p>
          {socials.length > 0 && (
            <ul className="mt-6 flex gap-3">
              {socials.map((s) => (
                <li key={s}>
                  <a href={business[s]} target="_blank" rel="noopener noreferrer" aria-label={s} className="grid size-10 place-items-center rounded-full border border-gold/25 text-gold-light hover:border-gold">
                    <SocialIcon name={s} />
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
        <nav aria-label="Footer">
          <h2 className="font-sans text-sm font-semibold text-gold-light">Navigation</h2>
          <ul className="mt-5 space-y-3 text-muted">
            {footerNav.map((l) => <li key={l.href}><a href={l.href} className="hover:text-ivory">{l.label}</a></li>)}
          </ul>
        </nav>
        <div>
          <h2 className="font-sans text-sm font-semibold text-gold-light">Services</h2>
          <ul className="mt-5 space-y-3 text-muted">
            {services.slice(0, 5).map((s) => <li key={s.slug}><a href="#services" className="hover:text-ivory">{s.title.replace(" Service", "")}</a></li>)}
          </ul>
        </div>
        <div>
          <h2 className="font-sans text-sm font-semibold text-gold-light">Contact</h2>
          <address className="mt-5 space-y-1 not-italic text-muted">
            <span className="block">Nasir Bagh Road</span>
            <span className="block">Askari 6</span>
            <span className="block">Peshawar</span>
          </address>
          <div className="mt-4 space-y-1 text-muted">
            {phoneUrl() && <a href={phoneUrl()!} className="block hover:text-ivory">{business.phone}</a>}
            {whatsappUrl() && <a href={whatsappUrl()!} target="_blank" rel="noopener noreferrer" className="block hover:text-ivory">WhatsApp</a>}
            {business.email && <a href={`mailto:${business.email}`} className="block hover:text-ivory">{business.email}</a>}
          </div>
        </div>
      </div>
      <div className="border-t border-gold/10">
        <p className="wrap py-6 text-sm text-muted/80">© {year} {business.name}. All Rights Reserved.</p>
      </div>
    </footer>
  );
}
