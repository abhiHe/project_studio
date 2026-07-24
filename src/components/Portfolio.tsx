import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, ExternalLink, FileText } from 'lucide-react';
import { Reveal } from './Effects';

type Project = {
  title: string;
  category: string;
  img: string;
  desc: string;
  stack: string[];
  features: string[];
};

const PROJECTS: Project[] = [
  {
    title: 'BistroByte — Food Ordering',
    category: 'Web App',
    img: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=900',
    desc: 'A full restaurant ordering system with live menu, cart, and kitchen dashboard.',
    stack: ['React', 'Node.js', 'PostgreSQL', 'Stripe'],
    features: ['Live menu', 'Real-time orders', 'Admin dashboard', 'Payments'],
  },
  {
    title: 'GlowUp — Salon Booking',
    category: 'Mobile App',
    img: 'https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg?auto=compress&cs=tinysrgb&w=900',
    desc: 'Salon appointment booking app with stylist scheduling and reminders.',
    stack: ['Flutter', 'Firebase', 'Stripe'],
    features: ['Slot booking', 'Reminders', 'Stylist profiles', 'Reviews'],
  },
  {
    title: 'MediStock — Pharmacy Inventory',
    category: 'Dashboard',
    img: 'https://images.pexels.com/photos/356040/pexels-photo-356040.jpeg?auto=compress&cs=tinysrgb&w=900',
    desc: 'Inventory and billing system for medical shops with expiry tracking.',
    stack: ['React', 'Express', 'PostgreSQL'],
    features: ['Stock alerts', 'Expiry tracking', 'Billing', 'Reports'],
  },
  {
    title: 'CampusNest — Student Portal',
    category: 'Web App',
    img: 'https://images.pexels.com/photos/207692/pexels-photo-207692.jpeg?auto=compress&cs=tinysrgb&w=900',
    desc: 'Academic project management portal for students and mentors.',
    stack: ['Next.js', 'Supabase', 'Tailwind'],
    features: ['Project tracking', 'Mentor chat', 'Docs', 'Submissions'],
  },
  {
    title: 'StyleHub — Fashion Store',
    category: 'E-Commerce',
    img: 'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=900',
    desc: 'A modern e-commerce storefront with catalog, cart, and checkout.',
    stack: ['React', 'Node.js', 'Stripe', 'Tailwind'],
    features: ['Catalog', 'Cart', 'Checkout', 'Admin panel'],
  },
  {
    title: 'FitFlow — Gym Management',
    category: 'Dashboard',
    img: 'https://images.pexels.com/photos/1954524/pexels-photo-1954524.jpeg?auto=compress&cs=tinysrgb&w=900',
    desc: 'Gym membership and class scheduling platform with attendance tracking.',
    stack: ['React', 'Firebase', 'Tailwind'],
    features: ['Memberships', 'Class booking', 'Attendance', 'Analytics'],
  },
];

const FILTERS = ['All', 'Web App', 'Mobile App', 'Dashboard', 'E-Commerce'];

export function Portfolio() {
  const [filter, setFilter] = useState('All');
  const list = filter === 'All' ? PROJECTS : PROJECTS.filter((p) => p.category === filter);

  return (
    <section id="portfolio" className="section-pad relative">
      <div className="container-max relative z-10">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-royal-400">
            Portfolio
          </span>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Work we're <span className="gradient-text">proud of</span>
          </h2>
          <p className="mt-4 text-muted">A selection of products we've designed and shipped.</p>
        </Reveal>

        <Reveal className="mt-10 flex flex-wrap justify-center gap-2">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all ${
                filter === f
                  ? 'bg-gradient-to-r from-royal-500 to-accent-500 text-white'
                  : 'glass text-muted hover:text-[rgb(var(--fg))]'
              }`}
            >
              {f}
            </button>
          ))}
        </Reveal>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((p, i) => (
            <Reveal key={p.title} delay={(i % 3) * 0.1}>
              <motion.div
                whileHover={{ y: -6 }}
                className="card-glow group relative overflow-hidden !p-0"
              >
                <div className="relative h-48 overflow-hidden rounded-t-2xl">
                  <img
                    src={p.img}
                    alt={p.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink-950/80 to-transparent" />
                  <span className="absolute left-3 top-3 glass rounded-full px-2.5 py-1 text-[11px] font-medium">
                    {p.category}
                  </span>
                  <div className="absolute right-3 top-3 flex gap-1.5 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <span className="glass flex h-8 w-8 items-center justify-center rounded-full">
                      <ExternalLink size={14} />
                    </span>
                    <span className="glass flex h-8 w-8 items-center justify-center rounded-full">
                      <FileText size={14} />
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="flex items-center gap-1 font-display text-lg font-semibold">
                    {p.title}
                    <ArrowUpRight
                      size={16}
                      className="text-muted transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-cyan-glow"
                    />
                  </h3>
                  <p className="mt-1.5 text-sm text-muted">{p.desc}</p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {p.stack.map((s) => (
                      <span
                        key={s}
                        className="rounded-full bg-royal-500/10 px-2 py-0.5 text-[11px] text-royal-400"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {p.features.map((f) => (
                      <span key={f} className="text-[11px] text-muted">
                        · {f}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
