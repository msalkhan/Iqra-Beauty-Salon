import { MessageCircle, Moon, Sun } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { SALON_INFO } from '../data/salonData';

interface FloatingActionsProps {
  isDark: boolean;
  onToggleTheme: () => void;
}

export function FloatingActions({ isDark, onToggleTheme }: FloatingActionsProps) {
  const prefersReduced = useReducedMotion();

  return (
    <>
      <button
        type="button"
        onClick={onToggleTheme}
        aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
        title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
        className="fixed bottom-5 left-5 z-40 inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#1c2333]/18 bg-white text-[#1c2333] shadow-md transition-colors hover:border-[#1c2333] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1c2333] dark:border-[#f4efe9]/20 dark:bg-[#1b2130] dark:text-[#f4efe9]"
      >
        {isDark ? (
          <Sun className="h-5 w-5 text-[#f4efe9]" aria-hidden="true" />
        ) : (
          <Moon className="h-5 w-5" aria-hidden="true" />
        )}
      </button>

      <div className="fixed right-5 bottom-5 z-40">
        <span
          aria-hidden="true"
          className="motion-pulse-ring pointer-events-none absolute inset-0 rounded-full bg-[#25D366]"
        />
        <motion.a
          href={SALON_INFO.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp with Iqra Beauty Salon"
          whileHover={prefersReduced ? undefined : { scale: 1.06 }}
          whileTap={prefersReduced ? undefined : { scale: 0.95 }}
          className="relative inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-[#072613] shadow-lg shadow-black/15 transition-colors hover:bg-[#20bd5a] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#25D366]"
        >
          <MessageCircle className="h-6 w-6 fill-current" aria-hidden="true" />
        </motion.a>
      </div>
    </>
  );
}
