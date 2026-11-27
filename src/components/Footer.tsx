import { Instagram, Facebook, Share2, MapPin, Phone } from 'lucide-react';
import { SALON_INFO } from '../data/salonData';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-[#1c2333]/8 bg-[#eee8e2] py-12 dark:border-[#f4efe9]/10 dark:bg-[#121620]">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-12 md:items-start">
          <div className="md:col-span-5">
            <a
              href="#top"
              className="font-display text-2xl font-bold text-[#1c2333] dark:text-[#f4efe9]"
            >
              {SALON_INFO.name}
            </a>
            <p className="mt-3 flex items-start gap-2 text-sm leading-relaxed text-[#575b66] dark:text-[#b9bec9]">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#1c2333] dark:text-[#f4efe9]" aria-hidden="true" />
              <span>{SALON_INFO.address}</span>
            </p>
            <p className="mt-2 flex items-center gap-2 text-sm text-[#575b66] dark:text-[#b9bec9]">
              <Phone className="h-4 w-4 shrink-0 text-[#1c2333] dark:text-[#f4efe9]" aria-hidden="true" />
              <a
                href={SALON_INFO.phoneHref}
                className="font-medium tabular-nums hover:text-[#1c2333] dark:hover:text-[#f4efe9]"
              >
                {SALON_INFO.phoneDisplay}
              </a>
            </p>
          </div>

          <div className="md:col-span-4">
            <h3 className="text-xs font-semibold tracking-wider text-[#1c2333] uppercase dark:text-[#f4efe9]">
              Sections
            </h3>
            <ul className="mt-3 grid grid-cols-2 gap-y-2 text-sm text-[#575b66] dark:text-[#b9bec9]">
              <li>
                <a href="#services" className="hover:text-[#1c2333] dark:hover:text-[#f4efe9]">
                  Services
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-[#1c2333] dark:hover:text-[#f4efe9]">
                  Location &amp; Hours
                </a>
              </li>
              <li>
                <a href="#reviews" className="hover:text-[#1c2333] dark:hover:text-[#f4efe9]">
                  Reviews
                </a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-[#1c2333] dark:hover:text-[#f4efe9]">
                  Gallery
                </a>
              </li>
              <li>
                <a href="#book" className="hover:text-[#1c2333] dark:hover:text-[#f4efe9]">
                  Book Online
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-[#1c2333] dark:hover:text-[#f4efe9]">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div className="md:col-span-3">
            <h3 className="text-xs font-semibold tracking-wider text-[#1c2333] uppercase dark:text-[#f4efe9]">
              Social
            </h3>
            <p className="mt-2 text-xs text-[#727680] dark:text-[#9ea4b2]">
              [PLACEHOLDER: Add Instagram &amp; Facebook links]
            </p>
            <div className="mt-3 flex items-center gap-3">
              <a
                href="#contact"
                aria-label="Instagram link placeholder"
                title="Instagram link placeholder"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#1c2333]/15 bg-white text-[#575b66] transition-colors hover:border-[#1c2333] hover:text-[#1c2333] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1c2333] dark:border-[#f4efe9]/15 dark:bg-[#1b2130] dark:text-[#b9bec9] dark:hover:text-[#f4efe9]"
              >
                <Instagram className="h-4 w-4" aria-hidden="true" />
              </a>
              <a
                href="#contact"
                aria-label="Facebook link placeholder"
                title="Facebook link placeholder"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#1c2333]/15 bg-white text-[#575b66] transition-colors hover:border-[#1c2333] hover:text-[#1c2333] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1c2333] dark:border-[#f4efe9]/15 dark:bg-[#1b2130] dark:text-[#b9bec9] dark:hover:text-[#f4efe9]"
              >
                <Facebook className="h-4 w-4" aria-hidden="true" />
              </a>
              <a
                href={SALON_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Message Iqra Beauty Salon on WhatsApp"
                title="WhatsApp"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#1c2333]/15 bg-white text-[#575b66] transition-colors hover:border-[#1c2333] hover:text-[#1c2333] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1c2333] dark:border-[#f4efe9]/15 dark:bg-[#1b2130] dark:text-[#b9bec9] dark:hover:text-[#f4efe9]"
              >
                <Share2 className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-3 border-t border-[#1c2333]/10 pt-6 text-xs text-[#727680] sm:flex-row sm:items-center dark:border-[#f4efe9]/10 dark:text-[#9ea4b2]">
          <p>
            &copy; {currentYear} {SALON_INFO.name}
          </p>
          <p>Ghauri Town Phase 5-A, Islamabad · Closes at 9:00 PM</p>
        </div>
      </div>
    </footer>
  );
}
