import { motion } from 'framer-motion';
import { Award, Eye, Heart, Rocket, Target } from 'lucide-react';
import { Counter, Reveal } from './Effects';

const STATS = [
  { to: 100, suffix: '+', label: 'Projects Delivered' },
  { to: 50, suffix: '+', label: 'Happy Clients' },
  { to: 30, suffix: '+', label: 'Student Projects' },
  { to: 99, suffix: '%', label: 'Client Satisfaction' },
];

const VALUES = [
  { icon: Target, title: 'Mission', text: 'Empower students and small businesses with accessible, premium digital tools.' },
  { icon: Eye, title: 'Vision', text: 'A world where every idea — academic or commercial — can launch beautifully.' },
  { icon: Heart, title: 'Core Values', text: 'Quality, transparency, affordability, and relentless craft in every delivery.' },
];

const TIMELINE = [
  { year: '2021', title: 'The Nest Begins', text: 'Started helping college students ship final-year projects.' },
  { year: '2022', title: 'Business Wing', text: 'Expanded to affordable websites for local shops and cafes.' },
  { year: '2023', title: '50+ Clients', text: 'Crossed 50 delivered projects across 6 industries.' },
  { year: '2024', title: 'Full-Stack Studio', text: 'Added mobile apps, dashboards, and cloud deployment.' },
  { year: '2025', title: '100+ Delivered', text: 'A trusted software partner for students and businesses.' },
];

export function About() {
  return (
    <section id="about" className="section-pad relative">
      <div className="aurora opacity-40" />
      <div className="container-max relative z-10">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-royal-400">
            About Us
          </span>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            We build digital experiences that <span className="gradient-text">last</span>
          </h2>
          <p className="mt-4 text-muted">
            ProjectNest Studio is a software studio born from a simple belief — great software
            shouldn't be reserved for big budgets. We help students learn and businesses grow.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.1}>
              <div className="card-glow text-center">
                <div className="font-display text-4xl font-bold gradient-text sm:text-5xl">
                  <Counter to={s.to} suffix={s.suffix} />
                </div>
                <div className="mt-2 text-sm text-muted">{s.label}</div>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {VALUES.map((v, i) => (
            <Reveal key={v.title} delay={i * 0.1}>
              <div className="card-glow h-full">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-royal-500/20 to-accent-500/20 text-royal-400">
                  <v.icon size={20} />
                </div>
                <h3 className="font-display text-lg font-semibold">{v.title}</h3>
                <p className="mt-2 text-sm text-muted">{v.text}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* timeline */}
        <Reveal className="mt-16">
          <h3 className="mb-8 text-center font-display text-2xl font-bold">Our Journey</h3>
        </Reveal>
        <div className="relative mx-auto max-w-3xl">
          <div className="absolute left-4 top-0 h-full w-px bg-gradient-to-b from-royal-500 via-accent-500 to-cyan-glow md:left-1/2" />
          {TIMELINE.map((t, i) => (
            <Reveal key={t.year} delay={i * 0.08}>
              <div className={`relative mb-8 flex gap-6 md:gap-0 ${i % 2 ? 'md:flex-row-reverse' : ''}`}>
                <div className="md:w-1/2 md:px-8">
                  <div className="card-glow">
                    <div className="flex items-center gap-2">
                      <Rocket size={14} className="text-cyan-glow" />
                      <span className="text-xs font-semibold text-royal-400">{t.year}</span>
                    </div>
                    <h4 className="mt-2 font-display text-lg font-semibold">{t.title}</h4>
                    <p className="mt-1 text-sm text-muted">{t.text}</p>
                  </div>
                </div>
                <div className="absolute left-4 top-6 z-10 -translate-x-1/2 md:left-1/2">
                  <motion.div
                    className="h-4 w-4 rounded-full bg-gradient-to-br from-royal-500 to-accent-500 ring-4 ring-[rgb(var(--bg))]"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                  />
                </div>
                <div className="hidden md:block md:w-1/2" />
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-12 flex justify-center">
          <div className="glass flex items-center gap-3 rounded-full px-5 py-2.5 text-sm">
            <Award size={16} className="text-cyan-glow" />
            Trusted by students & businesses across 6+ industries
          </div>
        </Reveal>
      </div>
    </section>
  );
}
