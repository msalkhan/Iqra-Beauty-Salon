import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import {
  SERVICES,
  SERVICE_CATEGORIES,
  type ServiceCategory,
  type ServiceItem,
} from '../data/salonData';
import { ScrollReveal } from './MotionPrimitives';
import { ResponsiveImage } from './ResponsiveImage';

interface ServicesProps {
  onSelectService: (serviceName: string) => void;
}

function getServicePricing(service: ServiceItem): { label: string; value: string } | null {
  if (service.priceRange && service.startingAt) {
    return {
      label: `From ${service.startingAt}`,
      value: service.priceRange,
    };
  }
  if (service.priceRange) {
    return { label: 'Price range', value: service.priceRange };
  }
  if (service.startingAt) {
    return { label: 'Starting at', value: service.startingAt };
  }
  if (service.pricePlaceholder) {
    return { label: 'Rate', value: service.pricePlaceholder };
  }
  return null;
}

export function Services({ onSelectService }: ServicesProps) {
  const prefersReduced = useReducedMotion();
  const [activeCategory, setActiveCategory] = useState<ServiceCategory>('All');

  const filteredServices =
    activeCategory === 'All'
      ? SERVICES
      : SERVICES.filter((service) => service.category === activeCategory);

  const showLeadCard = activeCategory === 'All' || filteredServices.length === 1;
  const leadService = showLeadCard ? filteredServices[0] : null;
  const leadPricing = leadService ? getServicePricing(leadService) : null;
  const gridServices = showLeadCard ? filteredServices.slice(1) : filteredServices;

  const handleBookService = (service: ServiceItem) => {
    onSelectService(service.name);
    const bookSection = document.getElementById('book');
    if (bookSection) {
      bookSection.scrollIntoView({ behavior: prefersReduced ? 'auto' : 'smooth' });
    }
  };

  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="bg-white py-16 sm:py-24 dark:bg-[#121620]"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Category filter bar at the top of the Services section */}
        <div className="mb-10 flex flex-col gap-4 border-b border-[#1c2333]/10 pb-6 sm:flex-row sm:items-center sm:justify-between dark:border-[#f4efe9]/10">
          <div
            role="group"
            aria-label="Filter services by category"
            className="flex flex-wrap items-center gap-2.5"
          >
            {SERVICE_CATEGORIES.map((category) => {
              const isActive = activeCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => setActiveCategory(category)}
                  className={`inline-flex min-h-[44px] items-center justify-center rounded-full px-5 py-2 text-xs font-medium whitespace-nowrap transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1c2333] dark:focus-visible:outline-[#f4efe9] ${
                    isActive
                      ? 'bg-[#1c2333] text-white dark:bg-[#f4efe9] dark:text-[#121620]'
                      : 'border border-[#1c2333]/18 bg-[#f6f3ef] text-[#1c2333] hover:border-[#1c2333]/40 hover:bg-[#eee8e2] dark:border-[#f4efe9]/18 dark:bg-[#171c28] dark:text-[#f4efe9] dark:hover:border-[#f4efe9]/40 dark:hover:bg-[#1b2130]'
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>

          <p
            aria-live="polite"
            className="text-xs font-medium tabular-nums text-[#575b66] dark:text-[#9ea4b2]"
          >
            Showing {filteredServices.length}{' '}
            {filteredServices.length === 1 ? 'treatment' : 'treatments'}
          </p>
        </div>

        {/* Asymmetric 12-col sticky editorial intro + staggered service showcase */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-14">
          <ScrollReveal className="lg:col-span-4">
            <div className="lg:sticky lg:top-24">
              <p className="text-xs font-semibold tracking-[0.14em] text-[#575b66] uppercase dark:text-[#9ea4b2]">
                Services Menu
              </p>
              <h2
                id="services-heading"
                className="title-section mt-3 text-balance font-semibold text-[#1c2333] dark:text-[#f4efe9]"
              >
                Seven treatments in Phase 5-A
              </h2>
              <p className="prose-editorial mt-4 text-[#575b66] dark:text-[#b9bec9]">
                Pick any treatment to pre-fill the booking form below. Final
                rates depend on hair length and skin needs.
              </p>
            </div>
          </ScrollReveal>

          <motion.div
            key={activeCategory}
            initial={prefersReduced ? undefined : { opacity: 0, y: 8 }}
            animate={prefersReduced ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-8"
          >
            {/* Lead featured service card (asymmetric 5/7 split with dedicated photo) */}
            {leadService && (
              <article className="group overflow-hidden rounded-3xl border border-[#1c2333]/10 bg-[#f6f3ef] dark:border-[#f4efe9]/12 dark:bg-[#171c28]">
                <div className="grid grid-cols-1 sm:grid-cols-12">
                  <div className="relative aspect-[4/3] overflow-hidden bg-[#e9e3dd] sm:col-span-5 sm:aspect-auto sm:min-h-[260px] dark:bg-[#23293a]">
                    <ResponsiveImage
                      sources={leadService.imageSources}
                      alt={leadService.imageAlt}
                      sizes="(max-width: 640px) 92vw, (max-width: 1024px) 38vw, 310px"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      fallbackLabel={leadService.name}
                    />
                  </div>

                  <div className="flex flex-col justify-between p-6 sm:col-span-7 sm:p-8">
                    <div>
                      <div className="flex items-baseline justify-between gap-3">
                        <span className="font-display text-2xl font-semibold tabular-nums text-[#8c857d] dark:text-[#969aa5]">
                          {leadService.number}
                        </span>
                        <span className="text-[11px] font-semibold tracking-[0.12em] text-[#575b66] uppercase dark:text-[#9ea4b2]">
                          {leadService.category}
                        </span>
                      </div>
                      <h3 className="font-display mt-1.5 text-3xl font-semibold text-[#1c2333] dark:text-[#f4efe9]">
                        {leadService.name}
                      </h3>
                      <p className="prose-editorial mt-2 text-[#575b66] dark:text-[#b9bec9]">
                        {leadService.description}
                      </p>
                      {leadPricing && (
                        <div className="mt-4 flex flex-wrap items-baseline gap-x-2.5 gap-y-1 border-t border-[#1c2333]/10 pt-3.5 dark:border-[#f4efe9]/10">
                          <span className="text-[11px] font-semibold tracking-[0.1em] text-[#575b66] uppercase dark:text-[#9ea4b2]">
                            {leadPricing.label}
                          </span>
                          <span className="text-sm font-semibold tabular-nums text-[#1c2333] dark:text-[#f4efe9]">
                            {leadPricing.value}
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="mt-6">
                      <button
                        type="button"
                        onClick={() => handleBookService(leadService)}
                        className="inline-flex min-h-[46px] items-center justify-center gap-2 rounded-full bg-[#1c2333] px-6 py-2.5 text-xs font-medium whitespace-nowrap text-white transition-colors hover:bg-[#2d364d] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1c2333] dark:bg-[#f4efe9] dark:text-[#121620] dark:hover:bg-white"
                      >
                        <span>Book this service</span>
                        <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            )}

            {/* Staggered 2-column visual ledger (right column offset downward) */}
            {gridServices.length > 0 && (
              <div
                className={`${
                  leadService ? 'mt-10' : ''
                } grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-2`}
              >
                {gridServices.map((service, index) => {
                  const servicePricing = getServicePricing(service);
                  return (
                    <article
                      key={service.id}
                      className={`group flex flex-col justify-between border-t border-[#1c2333]/12 pt-6 dark:border-[#f4efe9]/12 ${
                        index % 2 === 1 ? 'md:mt-6' : ''
                      }`}
                    >
                      <div>
                        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-[#f6f3ef] dark:bg-[#1b2130]">
                          <ResponsiveImage
                            sources={service.imageSources}
                            alt={service.imageAlt}
                            sizes="(max-width: 640px) 92vw, (max-width: 1024px) 44vw, 360px"
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                            fallbackLabel={service.name}
                          />
                        </div>

                        <div className="mt-4 flex items-baseline justify-between gap-3">
                          <h3 className="font-display text-2xl font-semibold text-[#1c2333] dark:text-[#f4efe9]">
                            {service.name}
                          </h3>
                          <span className="font-display text-lg font-semibold tabular-nums text-[#8c857d] dark:text-[#969aa5]">
                            {service.number}
                          </span>
                        </div>
                        <p className="mt-1 text-[11px] font-semibold tracking-[0.12em] text-[#575b66] uppercase dark:text-[#9ea4b2]">
                          {service.category}
                        </p>
                        <p className="prose-editorial mt-2 text-sm text-[#575b66] dark:text-[#b9bec9]">
                          {service.description}
                        </p>
                        {servicePricing && (
                          <div className="mt-3.5 flex flex-wrap items-baseline gap-x-2 gap-y-1 border-t border-[#1c2333]/8 pt-3 dark:border-[#f4efe9]/8">
                            <span className="text-[11px] font-semibold tracking-[0.1em] text-[#575b66] uppercase dark:text-[#9ea4b2]">
                              {servicePricing.label}
                            </span>
                            <span className="text-xs font-semibold tabular-nums text-[#1c2333] dark:text-[#f4efe9]">
                              {servicePricing.value}
                            </span>
                          </div>
                        )}
                      </div>

                      <div className="mt-5">
                        <button
                          type="button"
                          onClick={() => handleBookService(service)}
                          className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-[#1c2333]/20 bg-white px-5 py-2 text-xs font-medium whitespace-nowrap text-[#1c2333] transition-colors hover:border-[#1c2333] hover:bg-[#1c2333] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1c2333] dark:border-[#f4efe9]/20 dark:bg-[#1b2130] dark:text-[#f4efe9] dark:hover:bg-[#f4efe9] dark:hover:text-[#121620]"
                        >
                          <span>Book this service</span>
                          <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                        </button>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
