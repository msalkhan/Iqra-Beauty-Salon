import { Phone, ArrowDownRight } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { GALLERY_ITEMS, SALON_INFO } from '../data/salonData';
import { ResponsiveImage } from './ResponsiveImage';

export function Hero() {
  const prefersReduced = useReducedMotion();

  const leftCard = GALLERY_ITEMS[3]; // Facial care
  const centerCard = GALLERY_ITEMS[0]; // Party makeup portrait
  const rightCard = GALLERY_ITEMS[1]; // Hair highlights
  const avatarPhotos = [GALLERY_ITEMS[0], GALLERY_ITEMS[2], GALLERY_ITEMS[4]];

  return (
    <section
      id="top"
      aria-labelledby="hero-heading"
      className="overflow-hidden bg-gradient-to-b from-[#eee8e2] via-[#f6f3ef] to-white pt-10 pb-16 sm:pt-14 sm:pb-24 dark:from-[#171c28] dark:via-[#141823] dark:to-[#121620]"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Asymmetric 12-col boutique editorial split */}
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-10">
          {/* Left 6 cols: Flush-left display typography, high-contrast line heights, CTA & proof */}
          <motion.div
            initial={prefersReduced ? undefined : { opacity: 0, y: 14 }}
            animate={prefersReduced ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6"
          >
            <p className="text-xs font-semibold tracking-[0.14em] text-[#575b66] uppercase dark:text-[#9ea4b2]">
              Ghauri Town Phase 5-A · Islamabad
            </p>

            <h1
              id="hero-heading"
              className="title-hero mt-4 text-balance font-semibold text-[#1c2333] dark:text-[#f4efe9]"
            >
              Your Ladies&apos; Salon in Ghauri Town Phase 5-A.
            </h1>

            <p className="prose-editorial mt-6 max-w-md text-[#575b66] dark:text-[#b9bec9]">
              Haircuts, keratin, colour, facials, waxing, and party makeup in
              Phase 5 Ghauri Town. Open daily until 9:00 PM with slots from
              10:00 AM to 8:30 PM.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-5">
              <motion.a
                href="#book"
                whileHover={prefersReduced ? undefined : { y: -2 }}
                whileTap={prefersReduced ? undefined : { scale: 0.98 }}
                transition={{ duration: 0.15 }}
                className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full bg-[#1c2333] px-8 py-3 text-sm font-medium text-white shadow-sm transition-colors hover:bg-[#2d364d] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1c2333] dark:bg-[#f4efe9] dark:text-[#121620] dark:hover:bg-white"
              >
                <span>Book an Appointment</span>
                <ArrowDownRight className="h-4 w-4 shrink-0" aria-hidden="true" />
              </motion.a>

              <a
                href={SALON_INFO.phoneHref}
                className="inline-flex min-h-[44px] items-center gap-1.5 px-2 text-sm font-medium text-[#1c2333] underline decoration-[#1c2333]/30 underline-offset-4 transition-colors hover:decoration-[#1c2333] dark:text-[#f4efe9] dark:decoration-[#f4efe9]/30"
              >
                <Phone className="h-3.5 w-3.5" aria-hidden="true" />
                <span className="tabular-nums">{SALON_INFO.phoneDisplay}</span>
              </a>
            </div>

            {/* Asymmetric proof strip anchored left */}
            <div className="mt-10 flex flex-wrap items-center gap-4 border-t border-[#1c2333]/12 pt-6 dark:border-[#f4efe9]/12">
              <div className="flex -space-x-2.5">
                {avatarPhotos.map((item) => (
                  <div
                    key={item.id}
                    className="h-10 w-10 overflow-hidden rounded-full border-2 border-white bg-[#e4ddd6] shadow-sm dark:border-[#171c28]"
                  >
                    <ResponsiveImage
                      sources={item.sources}
                      alt={item.title}
                      sizes="48px"
                      priority
                      fallbackLabel={item.title}
                    />
                  </div>
                ))}
              </div>
              <div>
                <p className="text-sm font-semibold tabular-nums text-[#1c2333] dark:text-[#f4efe9]">
                  {SALON_INFO.rating} out of 5 · {SALON_INFO.reviewCount} Google reviews
                </p>
                <p className="text-xs text-[#575b66] dark:text-[#9ea4b2]">
                  Ladies only · Closes at 9:00 PM
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right 6 cols: Staggered, overlapping boutique collage (breaks centered 3-card fan) */}
          <div className="relative mx-auto w-full max-w-lg lg:col-span-6 lg:max-w-none">
            <div className="relative grid grid-cols-12 items-center gap-3 pt-4 pb-8 sm:pt-6 sm:pb-10">
              {/* Primary tilted focal portrait shifted right */}
              <motion.div
                initial={prefersReduced ? undefined : { opacity: 0, y: 18, rotate: -2 }}
                animate={prefersReduced ? undefined : { opacity: 1, y: 0, rotate: -2 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="relative z-10 col-span-8 col-start-3 overflow-hidden rounded-3xl border-2 border-white bg-[#e9e3dd] shadow-xl shadow-[#1c2333]/12 sm:col-span-7 sm:col-start-4 dark:border-[#2a3142] dark:bg-[#1e2433]"
              >
                <div className="aspect-[4/3] w-full">
                  <ResponsiveImage
                    sources={centerCard.sources}
                    alt={centerCard.alt}
                    sizes="(max-width: 640px) 66vw, 380px"
                    priority
                    fallbackLabel={centerCard.title}
                  />
                </div>
              </motion.div>

              {/* Lower-left overlapping tilted detail card */}
              <motion.div
                initial={prefersReduced ? undefined : { opacity: 0, y: 20, rotate: 4 }}
                animate={prefersReduced ? undefined : { opacity: 1, y: 0, rotate: 4 }}
                transition={{ duration: 0.55, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="relative z-20 col-span-5 col-start-1 -mt-14 overflow-hidden rounded-2xl border-2 border-white bg-[#e9e3dd] shadow-lg shadow-[#1c2333]/10 sm:-mt-20 sm:rounded-3xl dark:border-[#2a3142] dark:bg-[#1e2433]"
              >
                <div className="aspect-[4/3] w-full">
                  <ResponsiveImage
                    sources={leftCard.sources}
                    alt={leftCard.alt}
                    sizes="(max-width: 640px) 42vw, 230px"
                    priority
                    fallbackLabel={leftCard.title}
                  />
                </div>
              </motion.div>

              {/* Upper-right offset tilted detail card */}
              <motion.div
                initial={prefersReduced ? undefined : { opacity: 0, y: 16, rotate: -5 }}
                animate={prefersReduced ? undefined : { opacity: 1, y: 0, rotate: -4 }}
                transition={{ duration: 0.55, delay: 0.14, ease: [0.16, 1, 0.3, 1] }}
                className="relative z-0 col-span-5 col-start-8 -mt-20 overflow-hidden rounded-2xl border border-white/80 bg-[#e9e3dd] shadow-md shadow-[#1c2333]/8 sm:-mt-28 sm:rounded-3xl dark:border-[#2a3142] dark:bg-[#1e2433]"
              >
                <div className="aspect-[4/3] w-full">
                  <ResponsiveImage
                    sources={rightCard.sources}
                    alt={rightCard.alt}
                    sizes="(max-width: 640px) 42vw, 220px"
                    priority
                    fallbackLabel={rightCard.title}
                  />
                </div>
              </motion.div>
            </div>

            <p className="text-right text-xs text-[#727680] dark:text-[#8e95a3]">
              Sample lookbook visuals [PLACEHOLDER: Real Phase 5-A photos]
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
