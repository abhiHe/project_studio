import { motion } from 'framer-motion';
import {
  Building2,
  Cake,
  Dumbbell,
  GraduationCap,
  HeartPulse,
  Plane,
  Scissors,
  Shirt,
  ShoppingBag,
  Soup,
  Store,
  UtensilsCrossed,
} from 'lucide-react';
import { Reveal } from './Effects';

const INDUSTRIES = [
  { icon: UtensilsCrossed, name: 'Restaurants', color: 'from-orange-500/20 to-red-500/10' },
  { icon: Soup, name: 'Cafes', color: 'from-amber-500/20 to-orange-500/10' },
  { icon: Cake, name: 'Bakeries', color: 'from-pink-500/20 to-rose-500/10' },
  { icon: ShoppingBag, name: 'Cosmetic Stores', color: 'from-fuchsia-500/20 to-pink-500/10' },
  { icon: HeartPulse, name: 'Medical Shops', color: 'from-emerald-500/20 to-teal-500/10' },
  { icon: Store, name: 'Grocery Stores', color: 'from-lime-500/20 to-green-500/10' },
  { icon: Scissors, name: 'Salons', color: 'from-violet-500/20 to-purple-500/10' },
  { icon: Shirt, name: 'Fashion Stores', color: 'from-indigo-500/20 to-blue-500/10' },
  { icon: Building2, name: 'Hotels', color: 'from-cyan-500/20 to-sky-500/10' },
  { icon: GraduationCap, name: 'Tuition Centers', color: 'from-blue-500/20 to-indigo-500/10' },
  { icon: Dumbbell, name: 'Gyms', color: 'from-red-500/20 to-orange-500/10' },
  { icon: Plane, name: 'Travel', color: 'from-sky-500/20 to-cyan-500/10' },
];

export function Industries() {
  return (
    <section id="industries" className="section-pad relative">
      <div className="container-max relative z-10">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-royal-400">
            Industries We Serve
          </span>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Tailored software for <span className="gradient-text">every business</span>
          </h2>
          <p className="mt-4 text-muted">
            We build affordable digital products for local shops, startups, and NGOs.
          </p>
        </Reveal>

        <div className="mt-14 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {INDUSTRIES.map((ind, i) => (
            <Reveal key={ind.name} delay={(i % 6) * 0.06}>
              <motion.div
                whileHover={{ y: -6, scale: 1.04 }}
                className="card-glow group relative flex flex-col items-center gap-3 p-5 text-center"
              >
                <div
                  className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${ind.color} transition-transform duration-500 group-hover:scale-110`}
                >
                  <ind.icon size={24} className="text-[rgb(var(--fg))]" />
                </div>
                <span className="text-sm font-medium">{ind.name}</span>
              </motion.div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-10 text-center text-sm text-muted">
          ...and startups, NGOs, local shops, construction, photography, retail, and more.
        </Reveal>
      </div>
    </section>
  );
}
