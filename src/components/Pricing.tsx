import { motion } from 'framer-motion';
import { Check, Sparkles } from 'lucide-react';
import { MagneticButton, Reveal } from './Effects';

const PLANS = [
  {
    name: 'Student Package',
    price: '₹4,999',
    period: '/ project',
    desc: 'For academic projects with full guidance and documentation.',
    features: ['Mini / Major / Final-year project', 'Source code + explanation', 'Documentation', 'Viva preparation', '1 revision', '7-day support'],
    highlight: false,
  },
  {
    name: 'Business Starter',
    price: '₹14,999',
    period: '/ project',
    desc: 'Affordable websites for small businesses and local shops.',
    features: ['5-page responsive website', 'Contact + WhatsApp integration', 'Basic SEO setup', 'Mobile-friendly design', '2 revisions', '30-day support'],
    highlight: false,
  },
  {
    name: 'Professional',
    price: '₹39,999',
    period: '/ project',
    desc: 'Full-featured web apps and dashboards with custom design.',
    features: ['Custom web application', 'Admin dashboard', 'Database + API', 'Payment integration', 'Cloud deployment', '90-day support', 'Unlimited revisions'],
    highlight: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    desc: 'Scalable software, mobile apps, and integrations for growing teams.',
    features: ['Mobile app (iOS + Android)', 'ERP / CRM / custom software', 'Dedicated team', 'CI/CD + monitoring', 'SLA & maintenance', 'Priority support'],
    highlight: false,
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="section-pad relative">
      <div className="aurora opacity-30" />
      <div className="container-max relative z-10">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-royal-400">
            Pricing
          </span>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Simple, transparent <span className="gradient-text">pricing</span>
          </h2>
          <p className="mt-4 text-muted">Whether you're a student or a business, there's a plan for you.</p>
        </Reveal>

        <div className="mt-14 grid gap-5 lg:grid-cols-4">
          {PLANS.map((p, i) => (
            <Reveal key={p.name} delay={i * 0.1}>
              <motion.div
                whileHover={{ y: -8 }}
                className={`relative flex h-full flex-col rounded-2xl p-6 transition-all duration-500 ${
                  p.highlight
                    ? 'gradient-border shadow-glow'
                    : 'card-glow'
                }`}
              >
                {p.highlight && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-royal-500 to-accent-500 px-3 py-1 text-[11px] font-semibold text-white">
                    Most Popular
                  </span>
                )}
                <h3 className="font-display text-lg font-semibold">{p.name}</h3>
                <p className="mt-1 text-xs text-muted">{p.desc}</p>
                <div className="mt-4 flex items-end gap-1">
                  <span className="font-display text-3xl font-bold">{p.price}</span>
                  <span className="mb-1 text-sm text-muted">{p.period}</span>
                </div>
                <ul className="mt-5 flex-1 space-y-2.5">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm">
                      <Check size={16} className="mt-0.5 shrink-0 text-cyan-glow" />
                      <span className="text-muted">{f}</span>
                    </li>
                  ))}
                </ul>
                <MagneticButton
                  className={`mt-6 w-full ${p.highlight ? 'btn-primary' : 'btn-ghost'}`}
                >
                  <Sparkles size={14} /> Get Started
                </MagneticButton>
              </motion.div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-8 text-center text-xs text-muted">
          Prices are indicative. Final quotes depend on scope and requirements.
        </Reveal>
      </div>
    </section>
  );
}
