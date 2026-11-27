import { useEffect, useState } from 'react';
import { MotionConfig } from 'motion/react';
import { Navbar } from './components/Navbar';
import { ScrollProgressBar } from './components/ScrollProgressBar';
import { Hero } from './components/Hero';
import { Services } from './components/Services';
import { About } from './components/About';
import { Reviews } from './components/Reviews';
import { Gallery } from './components/Gallery';
import { BookingForm } from './components/BookingForm';
import { Footer } from './components/Footer';
import { FloatingActions } from './components/FloatingActions';
import { SERVICES } from './data/salonData';

export default function App() {
  const [selectedService, setSelectedService] = useState<string>(SERVICES[0].name);
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    const saved = window.localStorage.getItem('iqra-salon-theme');
    if (saved === 'dark') return true;
    if (saved === 'light') return false;
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      window.localStorage.setItem('iqra-salon-theme', 'dark');
    } else {
      root.classList.remove('dark');
      window.localStorage.setItem('iqra-salon-theme', 'light');
    }
  }, [isDark]);

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen bg-white text-[#1c2333] transition-colors duration-200 dark:bg-[#121620] dark:text-[#f4efe9]">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-full focus:bg-[#1c2333] focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-white"
        >
          Skip to main content
        </a>

        <ScrollProgressBar />
        <Navbar />

        <main id="main-content">
          <Hero />
          <Services onSelectService={setSelectedService} />
          <About />
          <Reviews />
          <Gallery />
          <BookingForm
            selectedService={selectedService}
            onServiceChange={setSelectedService}
          />
        </main>

        <Footer />
        <FloatingActions
          isDark={isDark}
          onToggleTheme={() => setIsDark((prev) => !prev)}
        />
      </div>
    </MotionConfig>
  );
}
