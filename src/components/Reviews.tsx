import { Star } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { REVIEWS, SALON_INFO } from '../data/salonData';
import { ScrollReveal } from './MotionPrimitives';

export function Reviews() {
  const prefersReduced = useReducedMotion();
  const [featured, ...supporting] = REVIEWS;

  return (
    <section
      id="reviews"
      aria-labelledby="reviews-heading"
      className="bg-white py-16 sm:py-24 dark:bg-[#121620]"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="flex flex-col justify-between gap-4 border-b border-[#1c2333]/10 pb-7 sm:flex-row sm:items-end dark:border-[#f4efe9]/10">
            <div>
              <p className="text-xs font-semibold tracking-[0.14em] text-[#575b66] uppercase dark:text-[#9ea4b2]">
                Client Reviews
              </p>
              <h2
                id="reviews-heading"
                className="title-section mt-3 text-balance font-semibold text-[#1c2333] dark:text-[#f4efe9]"
              >
                What clients say
              </h2>
            </div>

            <div className="flex items-center gap-2 text-sm text-[#575b66] dark:text-[#b9bec9]">
              <div className="flex items-center gap-0.5 text-[#1c2333] dark:text-[#f4efe9]" aria-hidden="true">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <span className="font-semibold tabular-nums text-[#1c2333] dark:text-[#f4efe9]">
                {SALON_INFO.rating}
              </span>
              <span className="tabular-nums">({SALON_INFO.reviewCount} Google reviews)</span>
            </div>
          </div>
        </ScrollReveal>

        {/* Asymmetric 7 / 5 quote showcase */}
        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-12">
          <motion.figure
            initial={prefersReduced ? undefined : { opacity: 0, y: 14 }}
            whileInView={prefersReduced ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col justify-between rounded-3xl border border-[#1c2333]/10 bg-[#f6f3ef] p-8 lg:col-span-7 lg:p-11 dark:border-[#f4efe9]/12 dark:bg-[#171c28]"
          >
            <blockquote className="font-display text-3xl leading-[1.18] font-medium text-[#1c2333] sm:text-4xl dark:text-[#f4efe9]">
              &ldquo;{featured.quote}&rdquo;
            </blockquote>
            <figcaption className="mt-10 border-t border-[#1c2333]/10 pt-4 text-sm dark:border-[#f4efe9]/10">
              <span className="font-semibold text-[#1c2333] dark:text-[#f4efe9]">
                {featured.author}
              </span>
              <span aria-hidden="true" className="mx-2 text-[#8c857d]">
                ·
              </span>
              <span className="text-[#575b66] dark:text-[#b9bec9]">
                {featured.context}
              </span>
            </figcaption>
          </motion.figure>

          <div className="flex flex-col gap-6 lg:col-span-5 lg:mt-6">
            {supporting.map((review, index) => (
              <motion.figure
                key={review.id}
                initial={prefersReduced ? undefined : { opacity: 0, y: 14 }}
                whileInView={prefersReduced ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.45,
                  delay: prefersReduced ? 0 : 0.08 * (index + 1),
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="flex flex-1 flex-col justify-between rounded-3xl border border-[#1c2333]/10 bg-white p-6 sm:p-7 dark:border-[#f4efe9]/12 dark:bg-[#1b2130]"
              >
                <blockquote className="prose-editorial text-[#1c2333] dark:text-[#f4efe9]">
                  &ldquo;{review.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-5 text-sm">
                  <span className="font-semibold text-[#1c2333] dark:text-[#f4efe9]">
                    {review.author}
                  </span>
                  <span aria-hidden="true" className="mx-2 text-[#8c857d]">
                    ·
                  </span>
                  <span className="text-[#575b66] dark:text-[#b9bec9]">
                    {review.context}
                  </span>
                </figcaption>
              </motion.figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
