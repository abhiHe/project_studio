import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react';
import { Reveal } from './Effects';

const TESTIMONIALS = [
  {
    name: 'Aarav Sharma',
    role: 'Final Year Student, VIT',
    img: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=200',
    text: 'ProjectNest helped me ship my final-year project with full documentation and viva prep. I scored top marks and actually understood the code.',
  },
  {
    name: 'Priya Nair',
    role: 'Owner, The Daily Crumb Bakery',
    img: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=200',
    text: 'They built my bakery website with online ordering in under two weeks. Sales went up 40% in the first month. Worth every rupee.',
  },
  {
    name: 'Rahul Verma',
    role: 'Founder, FitCore Gym',
    img: 'https://images.pexels.com/photos/697509/pexels-photo-697509.jpeg?auto=compress&cs=tinysrgb&w=200',
    text: 'The membership dashboard they built handles bookings, attendance, and payments. It just works. Support is quick and reliable.',
  },
  {
    name: 'Sneha Reddy',
    role: 'IEEE Paper Researcher',
    img: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=200',
    text: 'They helped me turn my research idea into a working prototype with clean code and a great UI. The team is patient and talented.',
  },
  {
    name: 'Karan Mehta',
    role: 'Manager, MediPlus Pharmacy',
    img: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=200',
    text: 'The inventory and billing system saved us hours every week. Expiry tracking alone paid for the whole project.',
  },
];

export function Testimonials() {
  const [idx, setIdx] = useState(0);
  const [dir, setDir] = useState(1);
  const next = () => {
    setDir(1);
    setIdx((i) => (i + 1) % TESTIMONIALS.length);
  };
  const prev = () => {
    setDir(-1);
    setIdx((i) => (i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  useEffect(() => {
    const t = setInterval(next, 5000);
    return () => clearInterval(t);
  }, []);

  const t = TESTIMONIALS[idx];

  return (
    <section id="testimonials" className="section-pad relative">
      <div className="container-max relative z-10">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-royal-400">
            Testimonials
          </span>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Loved by students & <span className="gradient-text">businesses</span>
          </h2>
        </Reveal>

        <div className="relative mx-auto mt-12 max-w-3xl">
          <div className="glass-strong relative rounded-3xl p-8 md:p-12">
            <Quote className="absolute right-8 top-8 text-royal-500/20" size={64} />
            <AnimatePresence mode="wait" custom={dir}>
              <motion.div
                key={idx}
                custom={dir}
                initial={{ opacity: 0, x: dir * 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: dir * -40 }}
                transition={{ duration: 0.4 }}
              >
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} className="fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="mt-4 text-lg leading-relaxed md:text-xl">"{t.text}"</p>
                <div className="mt-6 flex items-center gap-3">
                  <img
                    src={t.img}
                    alt={t.name}
                    loading="lazy"
                    className="h-12 w-12 rounded-full object-cover ring-2 ring-royal-500/40"
                  />
                  <div>
                    <div className="font-semibold">{t.name}</div>
                    <div className="text-sm text-muted">{t.role}</div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mt-6 flex items-center justify-center gap-3">
            <button
              onClick={prev}
              className="glass flex h-10 w-10 items-center justify-center rounded-full transition-transform hover:scale-110"
              aria-label="Previous"
            >
              <ChevronLeft size={18} />
            </button>
            <div className="flex gap-1.5">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIdx(i)}
                  className={`h-2 rounded-full transition-all ${
                    i === idx ? 'w-8 bg-gradient-to-r from-royal-500 to-cyan-glow' : 'w-2 bg-white/20'
                  }`}
                />
              ))}
            </div>
            <button
              onClick={next}
              className="glass flex h-10 w-10 items-center justify-center rounded-full transition-transform hover:scale-110"
              aria-label="Next"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
