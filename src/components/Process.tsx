import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  ClipboardList,
  Cloud,
  Code2,
  Layout,
  LifeBuoy,
  Map,
  TestTube2,
} from 'lucide-react';
import { Reveal } from './Effects';

const STEPS = [
  { icon: ClipboardList, title: 'Requirement Gathering', text: 'We listen, ask the right questions, and define scope.' },
  { icon: Map, title: 'Planning', text: 'Roadmap, milestones, and technology decisions locked in.' },
  { icon: Layout, title: 'UI Design', text: 'Wireframes evolve into polished, on-brand interfaces.' },
  { icon: Code2, title: 'Development', text: 'Clean, tested code built iteratively with your feedback.' },
  { icon: TestTube2, title: 'Testing', text: 'Manual and automated checks across devices and edge cases.' },
  { icon: Cloud, title: 'Deployment', text: 'We ship to production with CI/CD and zero downtime.' },
  { icon: LifeBuoy, title: 'Support', text: 'Ongoing maintenance, updates, and improvements.' },
];

export function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  return (
    <section id="process" className="section-pad relative">
      <div className="container-max relative z-10">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-royal-400">
            How We Work
          </span>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            A process built for <span className="gradient-text">clarity</span>
          </h2>
          <p className="mt-4 text-muted">Seven steps from idea to a live, supported product.</p>
        </Reveal>

        <div ref={ref} className="relative mt-16 grid gap-6 md:grid-cols-7">
          {/* connecting line */}
          <div className="absolute left-0 top-8 hidden h-px w-full bg-gradient-to-r from-royal-500 via-accent-500 to-cyan-glow md:block" />
          {STEPS.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.12, duration: 0.6 }}
              className="relative flex flex-col items-center text-center"
            >
              <motion.div
                whileHover={{ scale: 1.1, rotate: 4 }}
                className="relative mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-soft shadow-glass"
              >
                <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-royal-500/40 to-accent-500/30 blur-md" />
                <s.icon size={24} className="relative text-royal-400" />
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-br from-royal-500 to-accent-500 text-[10px] font-bold text-white">
                  {i + 1}
                </span>
              </motion.div>
              <h3 className="text-sm font-semibold">{s.title}</h3>
              <p className="mt-1 text-xs text-muted">{s.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
