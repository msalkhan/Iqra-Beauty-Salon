import { MapPin, Phone, Clock, ExternalLink, MessageCircle } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { SALON_INFO } from '../data/salonData';
import { ScrollReveal } from './MotionPrimitives';

export function About() {
  const prefersReduced = useReducedMotion();

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="border-y border-[#1c2333]/8 bg-[#f6f3ef] py-16 sm:py-24 dark:border-[#f4efe9]/10 dark:bg-[#171c28]"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Asymmetric 7 / 5 split with indented editorial callout and vertical stagger */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-start lg:gap-12">
          <ScrollReveal className="lg:col-span-7">
            <p className="text-xs font-semibold tracking-[0.14em] text-[#575b66] uppercase dark:text-[#9ea4b2]">
              About the Salon
            </p>
            <h2
              id="about-heading"
              className="title-section mt-3 max-w-xl text-balance font-semibold text-[#1c2333] dark:text-[#f4efe9]"
            >
              In Phase 5 Ghauri Town, Islamabad
            </h2>

            <div className="prose-editorial mt-7 max-w-xl space-y-5 text-[#575b66] dark:text-[#b9bec9]">
              <p>
                Women visit us in Ghauri Town Phase 5-A for everything from
                routine trims and waxing to keratin smoothing and party makeup.
              </p>
              <p>
                Across 724 Google reviews, guests most often point out that we
                listen carefully before starting so you walk out with what you
                actually asked for.
              </p>
            </div>

            {/* Indented placeholder offset creates boutique visual tension */}
            <div className="mt-8 max-w-lg rounded-2xl border border-dashed border-[#1c2333]/25 bg-white px-5 py-4 text-sm leading-relaxed text-[#575b66] sm:ml-12 dark:border-[#f4efe9]/20 dark:bg-[#121620] dark:text-[#b9bec9]">
              [PLACEHOLDER: Add when Iqra Beauty Salon opened, who leads the
              salon team, and any specific hair or skin product lines you keep
              on your shelves.]
            </div>
          </ScrollReveal>

          {/* Right 5 cols shifted down slightly for asymmetric balance */}
          <ScrollReveal delay={0.06} className="lg:col-span-5 lg:mt-14">
            <div
              id="contact"
              className="scroll-mt-24 rounded-3xl border border-[#1c2333]/10 bg-white p-6 sm:p-8 dark:border-[#f4efe9]/12 dark:bg-[#1b2130]"
            >
              <h3 className="font-display text-2xl font-semibold text-[#1c2333] dark:text-[#f4efe9]">
                Visit, Hours &amp; Contact
              </h3>

              <dl className="mt-6 space-y-5 text-sm">
                <div className="flex items-start gap-3.5 border-b border-[#1c2333]/10 pb-4 dark:border-[#f4efe9]/10">
                  <MapPin
                    className="mt-0.5 h-5 w-5 shrink-0 text-[#1c2333] dark:text-[#f4efe9]"
                    aria-hidden="true"
                  />
                  <div>
                    <dt className="font-semibold text-[#1c2333] dark:text-[#f4efe9]">
                      Address
                    </dt>
                    <dd className="mt-1 leading-relaxed text-[#575b66] dark:text-[#b9bec9]">
                      {SALON_INFO.address}
                    </dd>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 border-b border-[#1c2333]/10 pb-4 dark:border-[#f4efe9]/10">
                  <Phone
                    className="mt-0.5 h-5 w-5 shrink-0 text-[#1c2333] dark:text-[#f4efe9]"
                    aria-hidden="true"
                  />
                  <div>
                    <dt className="font-semibold text-[#1c2333] dark:text-[#f4efe9]">
                      Phone &amp; WhatsApp
                    </dt>
                    <dd className="mt-1">
                      <a
                        href={SALON_INFO.phoneHref}
                        className="font-medium tabular-nums text-[#1c2333] underline decoration-[#1c2333]/35 underline-offset-4 hover:decoration-[#1c2333] dark:text-[#f4efe9] dark:decoration-[#f4efe9]/35"
                      >
                        {SALON_INFO.phoneDisplay}
                      </a>
                    </dd>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <Clock
                    className="mt-0.5 h-5 w-5 shrink-0 text-[#1c2333] dark:text-[#f4efe9]"
                    aria-hidden="true"
                  />
                  <div>
                    <dt className="font-semibold text-[#1c2333] dark:text-[#f4efe9]">
                      Salon Hours
                    </dt>
                    <dd className="mt-1 text-[#575b66] dark:text-[#b9bec9]">
                      {SALON_INFO.hoursNote}
                    </dd>
                  </div>
                </div>
              </dl>

              <div className="mt-7 flex flex-col gap-3">
                <motion.a
                  href={SALON_INFO.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={prefersReduced ? undefined : { y: -1 }}
                  whileTap={prefersReduced ? undefined : { scale: 0.99 }}
                  className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-full bg-[#1c2333] px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-[#2d364d] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1c2333] dark:bg-[#f4efe9] dark:text-[#121620] dark:hover:bg-white"
                >
                  <span>Get Directions</span>
                  <ExternalLink className="h-4 w-4 shrink-0" aria-hidden="true" />
                </motion.a>

                <a
                  href={SALON_INFO.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-full border border-[#1c2333]/20 bg-[#f6f3ef] px-5 py-3 text-sm font-medium text-[#1c2333] transition-colors hover:border-[#1c2333] dark:border-[#f4efe9]/20 dark:bg-[#121620] dark:text-[#f4efe9]"
                >
                  <MessageCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
                  <span>Message on WhatsApp</span>
                </a>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
