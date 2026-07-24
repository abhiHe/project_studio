import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Cookie } from 'lucide-react';
import { CursorGlow, ScrollProgress } from './components/Effects';
import { Splash } from './components/Logo';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Services } from './components/Services';
import { Industries } from './components/Industries';
import { Portfolio } from './components/Portfolio';
import { Process } from './components/Process';
import { Pricing } from './components/Pricing';
import { Testimonials } from './components/Testimonials';
import { FAQ } from './components/FAQ';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';

function CookieBanner() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => {
      if (!localStorage.getItem('pn-cookie')) setShow(true);
    }, 2500);
    return () => clearTimeout(t);
  }, []);
  const dismiss = () => {
    localStorage.setItem('pn-cookie', '1');
    setShow(false);
  };
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-20 left-1/2 z-[55] w-[calc(100%-2rem)] max-w-md -translate-x-1/2"
        >
          <div className="glass-strong flex items-center gap-3 rounded-2xl p-4 shadow-glass">
            <Cookie size={20} className="shrink-0 text-royal-400" />
            <p className="flex-1 text-xs text-muted">
              We use cookies to improve your experience. By continuing you accept our cookie policy.
            </p>
            <button onClick={dismiss} className="btn-primary !px-4 !py-1.5 text-xs">
              OK
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!loading) {
      window.scrollTo(0, 0);
    }
  }, [loading]);

  return (
    <>
      <ScrollProgress />
      <CursorGlow />
      <AnimatePresence>
        {loading && <Splash onDone={() => setLoading(false)} />}
      </AnimatePresence>

      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <Industries />
        <Portfolio />
        <Process />
        <Pricing />
        <Testimonials />
        <FAQ />
        <Contact />
      </main>
      <Footer />
      <CookieBanner />
    </>
  );
}
