import { useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowRight, Play, Sparkles, Star } from 'lucide-react';
import { MagneticButton } from './Effects';

function Particles() {
  const items = useRef(
    Array.from({ length: 28 }).map(() => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      s: 2 + Math.random() * 4,
      d: Math.random() * 4,
      c: ['#3a5dff', '#8b5cf6', '#22d3ee'][Math.floor(Math.random() * 3)],
    })),
  );
  return (
    <div className="absolute inset-0 overflow-hidden">
      {items.current.map((p, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.s,
            height: p.s,
            background: p.c,
            boxShadow: `0 0 ${p.s * 3}px ${p.c}`,
          }}
          animate={{ y: [0, -30, 0], opacity: [0.2, 0.8, 0.2] }}
          transition={{ duration: 4 + p.d, repeat: Infinity, delay: p.d }}
        />
      ))}
    </div>
  );
}

function Mockup() {
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 120, damping: 20 });
  const sry = useSpring(ry, { stiffness: 120, damping: 20 });
  const rotX = useTransform(sry, [-0.5, 0.5], ['8deg', '-8deg']);
  const rotY = useTransform(srx, [-0.5, 0.5], ['-8deg', '8deg']);

  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      rx.set((e.clientX - r.left) / r.width - 0.5);
      ry.set((e.clientY - r.top) / r.height - 0.5);
    };
    const onLeave = () => {
      rx.set(0);
      ry.set(0);
    };
    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);
    return () => {
      el.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseleave', onLeave);
    };
  }, [rx, ry]);

  return (
    <motion.div
      ref={ref}
      style={{ rotateX: rotX, rotateY: rotY, transformPerspective: 1000 }}
      className="relative mx-auto w-full max-w-xl"
    >
      {/* glow */}
      <div className="absolute -inset-6 rounded-3xl bg-gradient-to-br from-royal-500/40 via-accent-500/30 to-cyan-glow/30 blur-2xl" />

      {/* laptop */}
      <motion.div
        className="glass-strong relative rounded-2xl p-3 shadow-glass"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.8 }}
      >
        <div className="flex items-center gap-1.5 px-2 pb-2">
          <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-green-400/80" />
        </div>
        <div className="overflow-hidden rounded-xl bg-ink-950">
          <img
            src="https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=900"
            alt="ProjectNest Studio dashboard"
            className="h-44 w-full object-cover sm:h-56"
            loading="eager"
          />
        </div>
      </motion.div>

      {/* floating cards */}
      <motion.div
        className="glass absolute -left-6 top-12 rounded-xl px-3 py-2 text-xs shadow-glass sm:-left-10"
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
      >
        <div className="flex items-center gap-2">
          <Sparkles size={14} className="text-cyan-glow" />
          <span className="font-medium">Deployed</span>
        </div>
        <div className="mt-1 text-[10px] text-muted">Build #142 · 12s</div>
      </motion.div>

      <motion.div
        className="glass absolute -right-4 top-24 rounded-xl px-3 py-2 text-xs shadow-glass sm:-right-8"
        animate={{ y: [0, 14, 0] }}
        transition={{ duration: 5, repeat: Infinity, delay: 1 }}
      >
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={10} className="fill-yellow-400 text-yellow-400" />
          ))}
        </div>
        <div className="mt-1 text-[10px] text-muted">99% satisfaction</div>
      </motion.div>

      <motion.div
        className="glass absolute -bottom-5 left-8 rounded-xl px-3 py-2 text-xs shadow-glass"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, delay: 0.5 }}
      >
        <div className="font-mono text-[10px] text-cyan-glow">npm run dev</div>
        <div className="mt-0.5 text-[10px] text-muted">Ready in 320ms</div>
      </motion.div>
    </motion.div>
  );
}

export function Hero() {
  return (
    <section id="home" className="relative min-h-screen overflow-hidden pt-32">
      <div className="aurora" />
      <Particles />

      {/* light beams */}
      <motion.div
        className="absolute left-1/2 top-0 h-[60vh] w-[2px] origin-top bg-gradient-to-b from-royal-500/40 to-transparent"
        animate={{ rotate: [15, -15, 15], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div
        className="absolute left-1/3 top-0 h-[50vh] w-[2px] origin-top bg-gradient-to-b from-accent-500/40 to-transparent"
        animate={{ rotate: [-20, 20, -20], opacity: [0.2, 0.5, 0.2] }}
        transition={{ duration: 10, repeat: Infinity }}
      />

      <div className="container-max relative z-10 grid items-center gap-12 px-5 pb-20 lg:grid-cols-2 lg:px-8">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="glass mb-6 inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-glow opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-glow" />
            </span>
            Now accepting 2026 project requests
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl"
          >
            Transforming Ideas Into{' '}
            <span className="gradient-text">Powerful Digital Products</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="mt-6 max-w-lg text-base text-muted sm:text-lg"
          >
            Helping students complete academic projects and helping businesses
            build premium digital solutions — from concept to deployment.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <MagneticButton className="btn-primary">
              Start Your Project <ArrowRight size={16} />
            </MagneticButton>
            <MagneticButton className="btn-ghost">
              <Play size={14} /> Explore Services
            </MagneticButton>
            <MagneticButton className="btn-ghost">Contact Us</MagneticButton>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-10 flex items-center gap-6 text-sm text-muted"
          >
            <div>
              <div className="font-display text-2xl font-bold text-[rgb(var(--fg))]">100+</div>
              <div className="text-xs">Projects delivered</div>
            </div>
            <div className="h-8 w-px bg-white/10" />
            <div>
              <div className="font-display text-2xl font-bold text-[rgb(var(--fg))]">50+</div>
              <div className="text-xs">Happy clients</div>
            </div>
            <div className="h-8 w-px bg-white/10" />
            <div>
              <div className="font-display text-2xl font-bold text-[rgb(var(--fg))]">99%</div>
              <div className="text-xs">Satisfaction</div>
            </div>
          </motion.div>
        </div>

        <Mockup />
      </div>

      {/* scroll indicator */}
      <motion.div
        className="absolute bottom-6 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.6, repeat: Infinity }}
      >
        <div className="glass flex h-9 w-6 items-start justify-center rounded-full p-1.5">
          <div className="h-2 w-1 rounded-full bg-cyan-glow" />
        </div>
      </motion.div>
    </section>
  );
}
