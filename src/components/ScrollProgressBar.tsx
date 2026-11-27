import { motion, useReducedMotion, useScroll, useSpring } from 'motion/react';

/**
 * Subtle top-of-viewport scroll depth indicator using GPU-composited scaleX.
 * Bypasses spring smoothing when prefers-reduced-motion is active.
 */
export function ScrollProgressBar() {
  const prefersReduced = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 260,
    damping: 32,
    restDelta: 0.001,
  });

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-0 z-50 h-[2.5px] bg-[#1c2333]/8 dark:bg-[#f4efe9]/10"
    >
      <motion.div
        className="h-full w-full origin-left bg-[#1c2333] dark:bg-[#f4efe9]"
        style={{
          scaleX: prefersReduced ? scrollYProgress : smoothProgress,
        }}
      />
    </div>
  );
}
