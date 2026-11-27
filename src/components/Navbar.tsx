import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { SALON_INFO } from '../data/salonData';

const NAV_LINKS = [
  { label: 'Services', href: '#services' },
  { label: 'About', href: '#about' },
  { label: 'Reviews', href: '#reviews' },
  { label: 'Book', href: '#book' },
  { label: 'Contact', href: '#contact' },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLinkClick = () => {
    setMobileOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 border-b border-[#1c2333]/8 bg-[#eee8e2] dark:border-[#f4efe9]/10 dark:bg-[#171c28]">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-8 px-4 py-4 sm:px-6 lg:px-8">
        {/* Zone 1: Editorial wordmark */}
        <a
          href="#top"
          className="font-display whitespace-nowrap shrink-0 text-xl font-bold tracking-tight text-[#1c2333] transition-opacity hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1c2333] dark:text-[#f4efe9] dark:focus-visible:outline-[#f4efe9]"
        >
          {SALON_INFO.name}
        </a>

        {/* Zone 2: Clean centered navigation links */}
        <nav aria-label="Primary Navigation" className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="whitespace-nowrap shrink-0 text-sm font-medium text-[#575b66] underline-offset-4 transition-colors duration-150 hover:text-[#1c2333] hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1c2333] dark:text-[#b9bec9] dark:hover:text-[#f4efe9]"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: Single dark rounded-full CTA (+ mobile hamburger) */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href="#book"
            className="hidden whitespace-nowrap shrink-0 rounded-full bg-[#1c2333] px-6 py-2.5 text-sm font-medium text-white transition-colors duration-150 hover:bg-[#2d364d] active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1c2333] sm:inline-flex dark:bg-[#f4efe9] dark:text-[#121620] dark:hover:bg-white"
          >
            Book Now
          </a>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation"
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="inline-flex h-12 w-12 items-center justify-center rounded-full text-[#1c2333] transition-colors hover:bg-[#1c2333]/8 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1c2333] md:hidden dark:text-[#f4efe9] dark:hover:bg-[#f4efe9]/10"
          >
            {mobileOpen ? (
              <X className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Menu className="h-5 w-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            id="mobile-navigation"
            aria-label="Mobile Navigation"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
            className="border-t border-[#1c2333]/10 bg-[#eee8e2] px-4 py-4 md:hidden dark:border-[#f4efe9]/10 dark:bg-[#171c28]"
          >
            <div className="flex flex-col gap-2">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={handleLinkClick}
                  className="flex min-h-[48px] items-center rounded-xl px-4 py-3 text-base font-medium text-[#1c2333] transition-colors hover:bg-[#1c2333]/8 active:bg-[#1c2333]/12 dark:text-[#f4efe9] dark:hover:bg-[#f4efe9]/10"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#book"
                onClick={handleLinkClick}
                className="mt-2 flex min-h-[48px] items-center justify-center rounded-full bg-[#1c2333] px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-[#2d364d] dark:bg-[#f4efe9] dark:text-[#121620]"
              >
                Book Now
              </a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
