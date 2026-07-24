import { useEffect } from 'react';
import { motion } from 'framer-motion';

export function LogoMark({ size = 40, glow = true }: { size?: number; glow?: boolean }) {
  return (
    <div
      className="relative flex items-center justify-center"
      style={{ width: size, height: size }}
    >
      {glow && (
        <div
          className="absolute inset-0 rounded-xl blur-md opacity-70"
          style={{ background: 'linear-gradient(135deg, #3a5dff, #8b5cf6, #22d3ee)' }}
        />
      )}
      <svg
        viewBox="0 0 48 48"
        width={size}
        height={size}
        className="relative z-10"
        fill="none"
      >
        <defs>
          <linearGradient id="pn-grad" x1="0" y1="0" x2="48" y2="48">
            <stop offset="0%" stopColor="#5b7fff" />
            <stop offset="50%" stopColor="#8b5cf6" />
            <stop offset="100%" stopColor="#22d3ee" />
          </linearGradient>
        </defs>
        <rect x="4" y="4" width="40" height="40" rx="12" fill="url(#pn-grad)" />
        <path
          d="M16 34V14h8a6 6 0 0 1 0 12h-4"
          stroke="white"
          strokeWidth="3.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        <circle cx="32" cy="16" r="2.5" fill="white" />
      </svg>
    </div>
  );
}

export function LogoFull({ size = 40 }: { size?: number }) {
  return (
    <div className="flex items-center gap-2.5">
      <LogoMark size={size} />
      <div className="leading-tight">
        <span className="font-display text-lg font-bold tracking-tight">
          ProjectNest
        </span>
        <span className="ml-1 text-sm font-medium text-muted">Studio</span>
      </div>
    </div>
  );
}

export function Splash({ onDone }: { onDone: () => void }) {
  const letters = 'ProjectNest'.split('');
  useEffect(() => {
    const t = setTimeout(onDone, 2600);
    return () => clearTimeout(t);
  }, [onDone]);
  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-ink-950"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.04 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* particles */}
      {Array.from({ length: 24 }).map((_, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full"
          style={{
            width: 3 + (i % 4) * 2,
            height: 3 + (i % 4) * 2,
            background: ['#3a5dff', '#8b5cf6', '#22d3ee'][i % 3],
            left: `${(i * 37) % 100}%`,
            top: `${(i * 53) % 100}%`,
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: [0, 1, 0], scale: [0, 1, 0], y: [0, -40, 0] }}
          transition={{ duration: 2.4, delay: i * 0.05, repeat: Infinity, repeatDelay: 1 }}
        />
      ))}

      <motion.div
        initial={{ scale: 0.4, opacity: 0, rotateY: -90 }}
        animate={{ scale: 1, opacity: 1, rotateY: 0 }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        className="relative mb-6"
        style={{ perspective: 800 }}
      >
        <motion.div
          animate={{ rotateY: [0, 8, -8, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        >
          <div className="relative">
            <motion.div
              className="absolute -inset-6 rounded-3xl blur-2xl"
              style={{ background: 'linear-gradient(135deg, #3a5dff, #8b5cf6, #22d3ee)' }}
              animate={{ opacity: [0.5, 0.9, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <LogoMark size={96} />
          </div>
        </motion.div>
      </motion.div>

      <div className="flex overflow-hidden">
        {letters.map((l, i) => (
          <motion.span
            key={i}
            className="font-display text-3xl font-bold tracking-tight md:text-4xl"
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 + i * 0.05, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            {l}
          </motion.span>
        ))}
        <motion.span
          className="font-display text-3xl font-medium text-muted md:text-4xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.5 }}
        >
          Studio
        </motion.span>
      </div>

      <motion.p
        className="mt-4 text-sm text-muted"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4, duration: 0.6 }}
      >
        From Student Projects to Business Solutions
      </motion.p>

      <motion.div
        className="absolute bottom-16 h-1 w-40 overflow-hidden rounded-full bg-white/10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
      >
        <motion.div
          className="h-full bg-gradient-to-r from-royal-500 to-cyan-glow"
          initial={{ x: '-100%' }}
          animate={{ x: '100%' }}
          transition={{ duration: 1.6, delay: 1.6, ease: 'easeInOut' }}
        />
      </motion.div>
    </motion.div>
  );
}
