import { useEffect, useRef, useState, type FormEvent } from 'react';
import {
  Calendar,
  Clock,
  CheckCircle2,
  AlertCircle,
  MessageCircle,
  RotateCcw,
} from 'lucide-react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { SALON_INFO, SERVICES, TIME_SLOTS } from '../data/salonData';
import { ScrollReveal } from './MotionPrimitives';

interface BookingFormProps {
  selectedService: string;
  onServiceChange: (service: string) => void;
}

interface FormErrors {
  fullName?: string;
  phone?: string;
  service?: string;
  date?: string;
  timeSlot?: string;
}

function getTodayDateString(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function BookingForm({ selectedService, onServiceChange }: BookingFormProps) {
  const prefersReduced = useReducedMotion();
  const todayStr = getTodayDateString();
  const whatsappTriggerRef = useRef<HTMLAnchorElement | null>(null);

  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [service, setService] = useState(selectedService || SERVICES[0].name);
  const [date, setDate] = useState(todayStr);
  const [timeSlot, setTimeSlot] = useState('');
  const [notes, setNotes] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});
  const [submittedUrl, setSubmittedUrl] = useState<string | null>(null);

  useEffect(() => {
    if (selectedService) {
      setService(selectedService);
      setSubmittedUrl(null);
      setErrors((prev) => ({ ...prev, service: undefined }));
    }
  }, [selectedService]);

  const validate = (): FormErrors => {
    const nextErrors: FormErrors = {};

    if (!fullName.trim() || fullName.trim().length < 2) {
      nextErrors.fullName = 'Please enter your full name (at least 2 characters).';
    }

    const digitsOnly = phone.replace(/\D/g, '');
    if (!phone.trim()) {
      nextErrors.phone = 'Please enter your phone or WhatsApp number.';
    } else if (digitsOnly.length < 10 || digitsOnly.length > 15) {
      nextErrors.phone = 'Please enter a valid mobile number (e.g. 0315 5162151).';
    }

    if (!service) {
      nextErrors.service = 'Please choose a salon service.';
    }

    if (!date) {
      nextErrors.date = 'Please select your preferred appointment date.';
    } else if (date < todayStr) {
      nextErrors.date = 'Past dates cannot be booked. Please pick today or an upcoming date.';
    }

    if (!timeSlot) {
      nextErrors.timeSlot = 'Please pick a 30-minute time slot between 10:00 AM and 8:30 PM.';
    }

    return nextErrors;
  };

  const buildWhatsAppUrl = () => {
    const lines = [
      `Assalam-o-Alaikum ${SALON_INFO.name}, I would like to book an appointment:`,
      '',
      `*Name:* ${fullName.trim()}`,
      `*Phone:* ${phone.trim()}`,
      `*Service:* ${service}`,
      `*Preferred Date:* ${date}`,
      `*Time Slot:* ${timeSlot}`,
      ...(notes.trim() ? [`*Notes:* ${notes.trim()}`] : []),
    ];
    return `${SALON_INFO.whatsappUrl}?text=${encodeURIComponent(lines.join('\n'))}`;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    const url = buildWhatsAppUrl();
    setSubmittedUrl(url);

    requestAnimationFrame(() => {
      whatsappTriggerRef.current?.click();
    });
  };

  const handleReset = () => {
    setSubmittedUrl(null);
    setErrors({});
    setFullName('');
    setPhone('');
    setDate(todayStr);
    setTimeSlot('');
    setNotes('');
  };

  return (
    <section
      id="book"
      aria-labelledby="book-heading"
      className="bg-white py-16 sm:py-20 lg:py-24 dark:bg-[#121620]"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-start">
          <ScrollReveal className="lg:col-span-5">
            <p className="text-xs font-semibold tracking-[0.14em] text-[#575b66] uppercase dark:text-[#9ea4b2]">
              Appointments
            </p>
            <h2
              id="book-heading"
              className="title-section mt-3 text-balance font-semibold text-[#1c2333] dark:text-[#f4efe9]"
            >
              Book a time slot via WhatsApp
            </h2>
            <p className="prose-editorial mt-5 text-[#575b66] dark:text-[#b9bec9]">
              Pick your service, preferred date, and a 30-minute time slot.
              Submitting opens WhatsApp to {SALON_INFO.phoneDisplay} with your
              details pre-filled so we can confirm right away.
            </p>

            <div className="mt-8 space-y-3 border-t border-[#1c2333]/10 pt-5 text-sm text-[#575b66] dark:border-[#f4efe9]/10 dark:text-[#b9bec9]">
              <p className="flex items-center gap-2.5">
                <Calendar className="h-4 w-4 shrink-0 text-[#1c2333] dark:text-[#f4efe9]" aria-hidden="true" />
                <span>Bookings available from today onward</span>
              </p>
              <p className="flex items-center gap-2.5">
                <Clock className="h-4 w-4 shrink-0 text-[#1c2333] dark:text-[#f4efe9]" aria-hidden="true" />
                <span>Slots run from 10:00 AM to 8:30 PM (salon closes at 9 PM)</span>
              </p>
              <p className="pt-1 text-xs leading-relaxed text-[#727680] dark:text-[#9ea4b2]">
                Need a group booking or a time outside 10:00 AM to 8:30 PM?
                Mention it in the notes or call{' '}
                <a
                  href={SALON_INFO.phoneHref}
                  className="font-medium text-[#1c2333] underline decoration-[#1c2333]/30 underline-offset-2 hover:decoration-[#1c2333] dark:text-[#f4efe9]"
                >
                  {SALON_INFO.phoneDisplay}
                </a>
                .
              </p>
            </div>
          </ScrollReveal>

          <div className="lg:col-span-7">
            <div className="rounded-3xl border border-[#1c2333]/10 bg-[#f6f3ef] p-6 sm:p-8 dark:border-[#f4efe9]/12 dark:bg-[#171c28]">
              <a
                ref={whatsappTriggerRef}
                href={submittedUrl || SALON_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="sr-only"
                tabIndex={-1}
                aria-hidden="true"
              >
                Open WhatsApp
              </a>

              <AnimatePresence mode="wait">
                {submittedUrl ? (
                  <motion.div
                    key="booking-success"
                    initial={prefersReduced ? undefined : { opacity: 0, scale: 0.97 }}
                    animate={prefersReduced ? undefined : { opacity: 1, scale: 1 }}
                    exit={prefersReduced ? undefined : { opacity: 0 }}
                    transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                    className="py-6 text-center"
                    role="status"
                    aria-live="polite"
                  >
                    <motion.div
                      initial={prefersReduced ? undefined : { scale: 0.6, opacity: 0 }}
                      animate={prefersReduced ? undefined : { scale: 1, opacity: 1 }}
                      transition={{ type: 'spring', stiffness: 320, damping: 20 }}
                      className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300"
                    >
                      <CheckCircle2 className="h-7 w-7" aria-hidden="true" />
                    </motion.div>

                    <h3 className="font-display mt-5 text-2xl font-semibold text-[#1c2333] dark:text-[#f4efe9]">
                      Your booking message is ready
                    </h3>
                    <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-[#575b66] dark:text-[#b9bec9]">
                      If WhatsApp did not open automatically, click below to send
                      your appointment details to {SALON_INFO.name}.
                    </p>

                    <div className="mx-auto mt-6 max-w-md rounded-2xl border border-[#1c2333]/10 bg-white p-4 text-left text-sm dark:border-[#f4efe9]/12 dark:bg-[#121620]">
                      <dl className="space-y-2">
                        <div className="flex justify-between gap-4">
                          <dt className="text-[#727680] dark:text-[#9ea4b2]">Name</dt>
                          <dd className="font-medium text-[#1c2333] dark:text-[#f4efe9]">{fullName}</dd>
                        </div>
                        <div className="flex justify-between gap-4">
                          <dt className="text-[#727680] dark:text-[#9ea4b2]">Phone</dt>
                          <dd className="font-medium tabular-nums text-[#1c2333] dark:text-[#f4efe9]">{phone}</dd>
                        </div>
                        <div className="flex justify-between gap-4">
                          <dt className="text-[#727680] dark:text-[#9ea4b2]">Service</dt>
                          <dd className="font-medium text-[#1c2333] dark:text-[#f4efe9]">{service}</dd>
                        </div>
                        <div className="flex justify-between gap-4">
                          <dt className="text-[#727680] dark:text-[#9ea4b2]">Date &amp; Time</dt>
                          <dd className="font-medium tabular-nums text-[#1c2333] dark:text-[#f4efe9]">
                            {date} at {timeSlot}
                          </dd>
                        </div>
                      </dl>
                    </div>

                    <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
                      <a
                        href={submittedUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex min-h-[46px] items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-2.5 text-sm font-semibold text-[#0b2915] transition-colors hover:bg-[#20bd5a] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#25D366]"
                      >
                        <MessageCircle className="h-4 w-4" aria-hidden="true" />
                        <span>Open WhatsApp Message</span>
                      </a>

                      <button
                        type="button"
                        onClick={handleReset}
                        className="inline-flex min-h-[46px] items-center justify-center gap-2 rounded-full border border-[#1c2333]/20 px-5 py-2.5 text-sm font-medium text-[#1c2333] transition-colors hover:bg-white dark:border-[#f4efe9]/20 dark:text-[#f4efe9] dark:hover:bg-[#1e2433]"
                      >
                        <RotateCcw className="h-4 w-4" aria-hidden="true" />
                        <span>Book Another Slot</span>
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  <motion.form
                    key="booking-form"
                    onSubmit={handleSubmit}
                    noValidate
                    initial={prefersReduced ? undefined : { opacity: 0 }}
                    animate={prefersReduced ? undefined : { opacity: 1 }}
                    exit={prefersReduced ? undefined : { opacity: 0 }}
                    className="space-y-5"
                  >
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                      <div>
                        <label
                          htmlFor="booking-name"
                          className="block text-sm font-medium text-[#1c2333] dark:text-[#f4efe9]"
                        >
                          Full Name <span className="text-[#964b56]">*</span>
                        </label>
                        <input
                          id="booking-name"
                          type="text"
                          value={fullName}
                          onChange={(e) => {
                            setFullName(e.target.value);
                            if (errors.fullName) setErrors((p) => ({ ...p, fullName: undefined }));
                          }}
                          placeholder="e.g. Ayesha Khan"
                          aria-invalid={Boolean(errors.fullName)}
                          aria-describedby={errors.fullName ? 'error-name' : undefined}
                          className={`mt-1.5 block min-h-[48px] w-full rounded-xl border bg-white px-4 py-3 text-base text-[#1c2333] placeholder:text-[#8b8e96] focus:ring-2 focus:outline-none sm:text-sm dark:bg-[#121620] dark:text-[#f4efe9] dark:placeholder:text-[#6f7582] ${
                            errors.fullName
                              ? 'border-rose-600 focus:ring-rose-500/30'
                              : 'border-[#1c2333]/15 focus:border-[#1c2333] focus:ring-[#1c2333]/15 dark:border-[#f4efe9]/18 dark:focus:border-[#f4efe9]'
                          }`}
                        />
                        {errors.fullName && (
                          <p
                            id="error-name"
                            role="alert"
                            className="mt-1.5 flex items-center gap-1.5 text-xs text-rose-700 dark:text-rose-400"
                          >
                            <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                            <span>{errors.fullName}</span>
                          </p>
                        )}
                      </div>

                      <div>
                        <label
                          htmlFor="booking-phone"
                          className="block text-sm font-medium text-[#1c2333] dark:text-[#f4efe9]"
                        >
                          Phone / WhatsApp <span className="text-[#964b56]">*</span>
                        </label>
                        <input
                          id="booking-phone"
                          type="tel"
                          value={phone}
                          onChange={(e) => {
                            setPhone(e.target.value);
                            if (errors.phone) setErrors((p) => ({ ...p, phone: undefined }));
                          }}
                          placeholder="e.g. 0315 5162151"
                          aria-invalid={Boolean(errors.phone)}
                          aria-describedby={errors.phone ? 'error-phone' : undefined}
                          className={`mt-1.5 block min-h-[48px] w-full rounded-xl border bg-white px-4 py-3 text-base tabular-nums text-[#1c2333] placeholder:text-[#8b8e96] focus:ring-2 focus:outline-none sm:text-sm dark:bg-[#121620] dark:text-[#f4efe9] dark:placeholder:text-[#6f7582] ${
                            errors.phone
                              ? 'border-rose-600 focus:ring-rose-500/30'
                              : 'border-[#1c2333]/15 focus:border-[#1c2333] focus:ring-[#1c2333]/15 dark:border-[#f4efe9]/18 dark:focus:border-[#f4efe9]'
                          }`}
                        />
                        {errors.phone && (
                          <p
                            id="error-phone"
                            role="alert"
                            className="mt-1.5 flex items-center gap-1.5 text-xs text-rose-700 dark:text-rose-400"
                          >
                            <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                            <span>{errors.phone}</span>
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                      <div>
                        <label
                          htmlFor="booking-service"
                          className="block text-sm font-medium text-[#1c2333] dark:text-[#f4efe9]"
                        >
                          Service <span className="text-[#964b56]">*</span>
                        </label>
                        <select
                          id="booking-service"
                          value={service}
                          onChange={(e) => {
                            const val = e.target.value;
                            setService(val);
                            onServiceChange(val);
                            if (errors.service) setErrors((p) => ({ ...p, service: undefined }));
                          }}
                          aria-invalid={Boolean(errors.service)}
                          aria-describedby={errors.service ? 'error-service' : undefined}
                          className={`mt-1.5 block min-h-[48px] w-full rounded-xl border bg-white px-4 py-3 text-base text-[#1c2333] focus:ring-2 focus:outline-none sm:text-sm dark:bg-[#121620] dark:text-[#f4efe9] ${
                            errors.service
                              ? 'border-rose-600 focus:ring-rose-500/30'
                              : 'border-[#1c2333]/15 focus:border-[#1c2333] focus:ring-[#1c2333]/15 dark:border-[#f4efe9]/18 dark:focus:border-[#f4efe9]'
                          }`}
                        >
                          {SERVICES.map((item) => (
                            <option key={item.id} value={item.name}>
                              {item.name}
                            </option>
                          ))}
                        </select>
                        {errors.service && (
                          <p
                            id="error-service"
                            role="alert"
                            className="mt-1.5 flex items-center gap-1.5 text-xs text-rose-700 dark:text-rose-400"
                          >
                            <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                            <span>{errors.service}</span>
                          </p>
                        )}
                      </div>

                      <div>
                        <label
                          htmlFor="booking-date"
                          className="block text-sm font-medium text-[#1c2333] dark:text-[#f4efe9]"
                        >
                          Preferred Date <span className="text-[#964b56]">*</span>
                        </label>
                        <input
                          id="booking-date"
                          type="date"
                          min={todayStr}
                          value={date}
                          onChange={(e) => {
                            setDate(e.target.value);
                            if (errors.date) setErrors((p) => ({ ...p, date: undefined }));
                          }}
                          aria-invalid={Boolean(errors.date)}
                          aria-describedby={errors.date ? 'error-date' : undefined}
                          className={`mt-1.5 block min-h-[48px] w-full rounded-xl border bg-white px-4 py-3 text-base tabular-nums text-[#1c2333] focus:ring-2 focus:outline-none sm:text-sm dark:bg-[#121620] dark:text-[#f4efe9] ${
                            errors.date
                              ? 'border-rose-600 focus:ring-rose-500/30'
                              : 'border-[#1c2333]/15 focus:border-[#1c2333] focus:ring-[#1c2333]/15 dark:border-[#f4efe9]/18 dark:focus:border-[#f4efe9]'
                          }`}
                        />
                        {errors.date && (
                          <p
                            id="error-date"
                            role="alert"
                            className="mt-1.5 flex items-center gap-1.5 text-xs text-rose-700 dark:text-rose-400"
                          >
                            <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                            <span>{errors.date}</span>
                          </p>
                        )}
                      </div>
                    </div>

                    <div>
                      <span
                        id="time-slot-label"
                        className="block text-sm font-medium text-[#1c2333] dark:text-[#f4efe9]"
                      >
                        Preferred Time Slot (10:00 AM to 8:30 PM){' '}
                        <span className="text-[#964b56]">*</span>
                      </span>
                      <div
                        role="radiogroup"
                        aria-labelledby="time-slot-label"
                        className="mt-2.5 grid grid-cols-2 gap-2.5 sm:grid-cols-4 md:grid-cols-6"
                      >
                        {TIME_SLOTS.map((slot) => {
                          const isSelected = timeSlot === slot;
                          return (
                            <button
                              key={slot}
                              type="button"
                              role="radio"
                              aria-checked={isSelected}
                              onClick={() => {
                                setTimeSlot(slot);
                                if (errors.timeSlot) {
                                  setErrors((p) => ({ ...p, timeSlot: undefined }));
                                }
                              }}
                              className={`min-h-[48px] whitespace-nowrap rounded-xl border px-3 py-2.5 text-sm font-medium tabular-nums transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1c2333] sm:text-xs ${
                                isSelected
                                  ? 'border-[#1c2333] bg-[#1c2333] text-white dark:border-[#f4efe9] dark:bg-[#f4efe9] dark:text-[#121620]'
                                  : 'border-[#1c2333]/14 bg-white text-[#333742] hover:border-[#1c2333] dark:border-[#f4efe9]/15 dark:bg-[#121620] dark:text-[#d5d8e0] dark:hover:border-[#f4efe9]'
                              }`}
                            >
                              {slot}
                            </button>
                          );
                        })}
                      </div>
                      {errors.timeSlot && (
                        <p
                          role="alert"
                          className="mt-2 flex items-center gap-1.5 text-xs text-rose-700 dark:text-rose-400"
                        >
                          <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                          <span>{errors.timeSlot}</span>
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="booking-notes"
                        className="block text-sm font-medium text-[#1c2333] dark:text-[#f4efe9]"
                      >
                        Notes{' '}
                        <span className="font-normal text-[#727680] dark:text-[#9ea4b2]">
                          (Optional)
                        </span>
                      </label>
                      <textarea
                        id="booking-notes"
                        rows={3}
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="Share hair length, makeup occasion, or any specific preferences..."
                        className="mt-1.5 block min-h-[112px] w-full rounded-xl border border-[#1c2333]/15 bg-white px-4 py-3 text-base text-[#1c2333] placeholder:text-[#8b8e96] focus:border-[#1c2333] focus:ring-2 focus:ring-[#1c2333]/15 focus:outline-none sm:text-sm dark:border-[#f4efe9]/18 dark:bg-[#121620] dark:text-[#f4efe9] dark:placeholder:text-[#6f7582]"
                      />
                    </div>

                    <motion.button
                      type="submit"
                      whileHover={prefersReduced ? undefined : { y: -1 }}
                      whileTap={prefersReduced ? undefined : { scale: 0.99 }}
                      className="flex min-h-[50px] w-full items-center justify-center gap-2.5 rounded-full bg-[#1c2333] px-6 py-3.5 text-sm font-medium text-white transition-colors hover:bg-[#2d364d] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1c2333] dark:bg-[#f4efe9] dark:text-[#121620] dark:hover:bg-white"
                    >
                      <MessageCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
                      <span>Confirm &amp; Send via WhatsApp</span>
                    </motion.button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
