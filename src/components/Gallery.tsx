import { useEffect, useState } from 'react';
import { X, ChevronLeft, ChevronRight, Expand } from 'lucide-react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { GALLERY_ITEMS, type GalleryItem } from '../data/salonData';
import { ScrollReveal } from './MotionPrimitives';
import { ResponsiveImage } from './ResponsiveImage';

const BENTO_SPANS = [
  'lg:col-span-7',
  'lg:col-span-5 lg:mt-10',
  'lg:col-span-4 lg:mt-6',
  'lg:col-span-8',
  'lg:col-span-7',
  'lg:col-span-5 lg:mt-10',
];

const BENTO_SIZES = [
  '(max-width: 640px) 92vw, (max-width: 1024px) 48vw, 660px',
  '(max-width: 640px) 92vw, (max-width: 1024px) 48vw, 460px',
  '(max-width: 640px) 92vw, (max-width: 1024px) 48vw, 380px',
  '(max-width: 640px) 92vw, (max-width: 1024px) 48vw, 760px',
  '(max-width: 640px) 92vw, (max-width: 1024px) 48vw, 660px',
  '(max-width: 640px) 92vw, (max-width: 1024px) 48vw, 460px',
];

export function Gallery() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const prefersReduced = useReducedMotion();

  const selectedItem: GalleryItem | null =
    selectedIndex !== null ? GALLERY_ITEMS[selectedIndex] : null;

  useEffect(() => {
    if (selectedIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedIndex(null);
      } else if (e.key === 'ArrowRight') {
        setSelectedIndex((prev) =>
          prev === null ? null : (prev + 1) % GALLERY_ITEMS.length
        );
      } else if (e.key === 'ArrowLeft') {
        setSelectedIndex((prev) =>
          prev === null
            ? null
            : (prev - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length
        );
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex]);

  return (
    <section
      id="gallery"
      aria-labelledby="gallery-heading"
      className="border-y border-[#1c2333]/8 bg-[#f6f3ef] py-16 sm:py-24 dark:border-[#f4efe9]/10 dark:bg-[#171c28]"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
            <div className="max-w-xl">
              <p className="text-xs font-semibold tracking-[0.14em] text-[#575b66] uppercase dark:text-[#9ea4b2]">
                Style Gallery
              </p>
              <h2
                id="gallery-heading"
                className="title-section mt-3 text-balance font-semibold text-[#1c2333] dark:text-[#f4efe9]"
              >
                Sample lookbook
              </h2>
            </div>
            <p className="prose-editorial max-w-md text-sm text-[#575b66] dark:text-[#b9bec9]">
              [PLACEHOLDER: Swap these sample images with phone photos of your
              real Phase 5-A storefront, styling chairs, and client makeup or
              hair results.]
            </p>
          </div>
        </ScrollReveal>

        {/* Asymmetric editorial grid (7/5 -> 4/8 -> 7/5 with vertical offset) */}
        <div className="mt-12 grid grid-cols-1 items-start gap-6 sm:grid-cols-2 lg:grid-cols-12">
          {GALLERY_ITEMS.map((item, index) => (
            <motion.button
              key={item.id}
              type="button"
              onClick={() => setSelectedIndex(index)}
              initial={prefersReduced ? undefined : { opacity: 0, y: 14 }}
              whileInView={prefersReduced ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: 0.4,
                delay: prefersReduced ? 0 : index * 0.04,
                ease: [0.16, 1, 0.3, 1],
              }}
              whileHover={prefersReduced ? undefined : { y: -2 }}
              aria-label={`Open ${item.title} in gallery lightbox`}
              className={`group flex flex-col overflow-hidden rounded-3xl border border-[#1c2333]/10 bg-white text-left transition-shadow hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1c2333] dark:border-[#f4efe9]/12 dark:bg-[#1b2130] ${
                BENTO_SPANS[index] || 'lg:col-span-6'
              }`}
            >
              <div
                className={`relative w-full overflow-hidden bg-[#e9e3dd] dark:bg-[#23293a] ${
                  index === 3 ? 'aspect-[16/10]' : 'aspect-[4/3]'
                }`}
              >
                <ResponsiveImage
                  sources={item.sources}
                  alt={item.alt}
                  sizes={BENTO_SIZES[index]}
                  fallbackLabel={item.title}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                />
              </div>

              <div className="flex items-center justify-between gap-3 px-5 py-4">
                <div>
                  <h3 className="font-display text-xl font-semibold text-[#1c2333] dark:text-[#f4efe9]">
                    {item.title}
                  </h3>
                  <p className="mt-0.5 text-xs text-[#727680] dark:text-[#9ea4b2]">
                    {item.category}
                  </p>
                </div>
                <Expand
                  className="h-4 w-4 shrink-0 text-[#575b66] transition-colors group-hover:text-[#1c2333] dark:text-[#b9bec9]"
                  aria-hidden="true"
                />
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedItem && selectedIndex !== null && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={`${selectedItem.title} image preview`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            onClick={() => setSelectedIndex(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4"
          >
            <motion.div
              initial={prefersReduced ? undefined : { scale: 0.97, opacity: 0 }}
              animate={prefersReduced ? undefined : { scale: 1, opacity: 1 }}
              exit={prefersReduced ? undefined : { scale: 0.97, opacity: 0 }}
              transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl overflow-hidden rounded-3xl border border-white/15 bg-[#121620] shadow-2xl"
            >
              <div className="flex items-center justify-between border-b border-white/10 px-5 py-3.5 text-white">
                <div>
                  <p className="text-xs text-white/70">{selectedItem.category}</p>
                  <h3 className="font-display text-lg font-medium">{selectedItem.title}</h3>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedIndex(null)}
                  aria-label="Close lightbox"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full text-white/80 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-2 focus-visible:outline-white"
                >
                  <X className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>

              <div className="relative aspect-[4/3] w-full bg-black">
                <ResponsiveImage
                  sources={selectedItem.sources}
                  alt={selectedItem.alt}
                  sizes="(max-width: 1024px) 95vw, 896px"
                  priority
                  fallbackLabel={selectedItem.title}
                  className="h-full w-full object-contain"
                />

                <button
                  type="button"
                  onClick={() =>
                    setSelectedIndex(
                      (selectedIndex - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length
                    )
                  }
                  aria-label="Previous image"
                  className="absolute top-1/2 left-3 inline-flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-black/65 text-white transition-colors hover:bg-[#1c2333] focus-visible:outline-2 focus-visible:outline-white"
                >
                  <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                </button>

                <button
                  type="button"
                  onClick={() =>
                    setSelectedIndex((selectedIndex + 1) % GALLERY_ITEMS.length)
                  }
                  aria-label="Next image"
                  className="absolute top-1/2 right-3 inline-flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-black/65 text-white transition-colors hover:bg-[#1c2333] focus-visible:outline-2 focus-visible:outline-white"
                >
                  <ChevronRight className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>

              <div className="flex items-center justify-between px-5 py-3 text-xs text-white/75">
                <span>{selectedItem.alt}</span>
                <span className="tabular-nums shrink-0 pl-4">
                  {selectedIndex + 1} / {GALLERY_ITEMS.length}
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
