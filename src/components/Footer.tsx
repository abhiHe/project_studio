import { motion } from 'framer-motion';
import { ArrowUp, MessageCircle } from 'lucide-react';
import { LogoMark } from './Logo';

const COLS = [
  {
    title: 'Company',
    links: ['About', 'Portfolio', 'Careers', 'Blog', 'Contact'],
  },
  {
    title: 'Services',
    links: ['Student Projects', 'Web Development', 'Mobile Apps', 'UI/UX Design', 'Cloud & DevOps'],
  },
  {
    title: 'Projects',
    links: ['Web Apps', 'Mobile Apps', 'E-Commerce', 'Dashboards', 'Custom Software'],
  },
  {
    title: 'Resources',
    links: ['Privacy Policy', 'Terms & Conditions', 'FAQ', 'Cookie Policy', 'Support'],
  },
];

const SOCIALS = [
  { label: 'Instagram', href: '#' },
  { label: 'LinkedIn', href: '#' },
  { label: 'GitHub', href: '#' },
  { label: 'YouTube', href: '#' },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/5 px-5 pb-10 pt-16 sm:px-8 lg:px-20">
      <div className="aurora opacity-20" />
      <div className="container-max relative z-10">
        <div className="grid gap-10 md:grid-cols-6">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5">
              <LogoMark size={36} />
              <div className="leading-tight">
                <span className="font-display text-base font-bold">ProjectNest</span>
                <span className="ml-1 text-xs font-medium text-muted">Studio</span>
              </div>
            </div>
            <p className="mt-4 max-w-xs text-sm text-muted">
              From Student Projects to Business Solutions — We Build Digital Experiences.
            </p>
            <div className="mt-5 flex gap-2">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="glass flex h-9 w-9 items-center justify-center rounded-full text-xs font-medium transition-transform hover:scale-110 hover:text-cyan-glow"
                >
                  {s.label[0]}
                </a>
              ))}
            </div>
          </div>

          {COLS.map((c) => (
            <div key={c.title}>
              <h4 className="text-sm font-semibold">{c.title}</h4>
              <ul className="mt-3 space-y-2">
                {c.links.map((l) => (
                  <li key={l}>
                    <a
                      href="#"
                      className="text-sm text-muted transition-colors hover:text-[rgb(var(--fg))]"
                    >
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-6 sm:flex-row">
          <p className="text-xs text-muted">
            © {new Date().getFullYear()} ProjectNest Studio. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-xs text-muted">
            <a href="#" className="hover:text-[rgb(var(--fg))]">Privacy</a>
            <a href="#" className="hover:text-[rgb(var(--fg))]">Terms</a>
            <a href="#" className="hover:text-[rgb(var(--fg))]">Cookies</a>
          </div>
        </div>
      </div>

      {/* floating buttons */}
      <motion.a
        href="https://wa.me/910000000000"
        className="fixed bottom-6 left-5 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-green-500 text-white shadow-lg shadow-green-500/40"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label="WhatsApp"
      >
        <MessageCircle size={22} />
      </motion.a>
      <motion.button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-6 right-5 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-royal-500 to-accent-500 text-white shadow-glow"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Back to top"
      >
        <ArrowUp size={20} />
      </motion.button>
    </footer>
  );
}
