import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { Reveal } from './Effects';

const FAQS = [
  {
    q: 'Do you help with final-year student projects?',
    a: 'Yes. We support mini, major, final-year, IEEE, and research projects — including source code, documentation, and viva preparation.',
  },
  {
    q: 'How much does a business website cost?',
    a: 'Our Business Starter plan begins at ₹14,999 for a 5-page responsive website. Final pricing depends on features like online ordering, payments, or dashboards.',
  },
  {
    q: 'Which technologies do you work with?',
    a: 'React, Angular, Node.js, PHP, Python, Java, Flutter, React Native, and more. We also handle cloud deployment, API integration, and SEO.',
  },
  {
    q: 'Do you provide ongoing maintenance?',
    a: 'Absolutely. Every project includes a support period, and we offer long-term maintenance plans for updates, bug fixes, and hosting.',
  },
  {
    q: 'Can you build mobile apps for iOS and Android?',
    a: 'Yes — we build cross-platform apps with Flutter and React Native, plus native Android apps. See our Enterprise plan for details.',
  },
  {
    q: 'How long does a typical project take?',
    a: 'Student projects usually take 3–7 days. Business websites take 1–2 weeks. Custom apps and dashboards take 3–8 weeks depending on scope.',
  },
];

function Item({ faq, i }: { faq: (typeof FAQS)[number]; i: number }) {
  const [open, setOpen] = useState(false);
  return (
    <Reveal delay={i * 0.06}>
      <div className="card-glow overflow-hidden">
        <button
          onClick={() => setOpen((o) => !o)}
          className="flex w-full items-center justify-between gap-4 text-left"
        >
          <span className="font-medium">{faq.q}</span>
          <motion.span animate={{ rotate: open ? 45 : 0 }} className="shrink-0 text-royal-400">
            <Plus size={18} />
          </motion.span>
        </button>
        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <p className="pt-3 text-sm text-muted">{faq.a}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Reveal>
  );
}

export function FAQ() {
  return (
    <section id="faq" className="section-pad relative">
      <div className="container-max relative z-10">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-royal-400">
            FAQ
          </span>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Questions, <span className="gradient-text">answered</span>
          </h2>
        </Reveal>
        <div className="mx-auto mt-12 max-w-3xl space-y-3">
          {FAQS.map((f, i) => (
            <Item key={f.q} faq={f} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
