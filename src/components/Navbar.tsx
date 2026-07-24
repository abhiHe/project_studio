import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, Moon, Sun, X } from 'lucide-react';
import { LogoMark } from './Logo';
import { useTheme } from './Effects';

const NAV = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Industries', href: '#industries' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contact', href: '#contact' },
];

export function Navbar() {
  const { theme, toggle } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-3"
      >
        <nav
          className={`flex w-full max-w-7xl items-center justify-between rounded-2xl px-4 py-2.5 transition-all duration-500 ${
            scrolled ? 'glass-strong shadow-glass' : 'border border-transparent'
          }`}
        >
          <a href="#home" className="group relative flex items-center gap-2.5">
            <motion.div
              animate={{ scale: scrolled ? 0.85 : 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 20 }}
              className="relative"
            >
              <motion.div
                className="absolute -inset-1 rounded-xl blur-md opacity-60"
                style={{ background: 'linear-gradient(135deg,#3a5dff,#8b5cf6,#22d3ee)' }}
                animate={{ opacity: [0.4, 0.7, 0.4] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
              <LogoMark size={scrolled ? 32 : 36} />
            </motion.div>
            <div className="leading-tight">
              <span className="font-display text-base font-bold tracking-tight">ProjectNest</span>
              <span className="ml-1 text-xs font-medium text-muted">Studio</span>
            </div>
          </a>

          <div className="hidden items-center gap-1 lg:flex">
            {NAV.map((n) => (
              <a
                key={n.href}
                href={n.href}
                className="group relative px-3 py-2 text-sm font-medium text-muted transition-colors hover:text-[rgb(var(--fg))]"
              >
                {n.label}
                <span className="absolute inset-x-3 -bottom-0.5 h-0.5 origin-left scale-x-0 rounded-full bg-gradient-to-r from-royal-500 to-cyan-glow transition-transform duration-300 group-hover:scale-x-100" />
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={toggle}
              aria-label="Toggle theme"
              className="glass flex h-9 w-9 items-center justify-center rounded-full transition-transform hover:scale-110"
            >
              {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
            </button>
            <a href="#contact" className="btn-primary hidden sm:inline-flex !px-5 !py-2 text-xs">
              Start Project
            </a>
            <button
              onClick={() => setOpen(true)}
              className="glass flex h-9 w-9 items-center justify-center rounded-full lg:hidden"
              aria-label="Open menu"
            >
              <Menu size={18} />
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] bg-ink-950/80 backdrop-blur-xl lg:hidden"
          >
            <div className="flex items-center justify-between px-5 pt-5">
              <div className="flex items-center gap-2">
                <LogoMark size={32} />
                <span className="font-display font-bold">ProjectNest Studio</span>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="glass flex h-9 w-9 items-center justify-center rounded-full"
              >
                <X size={18} />
              </button>
            </div>
            <div className="mt-8 flex flex-col gap-1 px-5">
              {NAV.map((n, i) => (
                <motion.a
                  key={n.href}
                  href={n.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="border-b border-white/5 py-4 text-lg font-medium"
                >
                  {n.label}
                </motion.a>
              ))}
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="btn-primary mt-6 w-full"
              >
                Start Your Project
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
