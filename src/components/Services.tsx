import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  Cloud,
  Code2,
  Database,
  GraduationCap,
  Layout,
  Rocket,
  Search,
  Server,
  Smartphone,
  Wrench,
} from 'lucide-react';
import { Reveal } from './Effects';

const SERVICES = [
  {
    icon: GraduationCap,
    title: 'Student Projects',
    desc: 'Mini, major, final-year, IEEE & research projects with documentation, viva prep, and source code assistance.',
    tags: ['Mini Projects', 'Major Projects', 'IEEE', 'Research'],
  },
  {
    icon: Code2,
    title: 'Web Development',
    desc: 'Modern, fast, responsive websites and web apps built with the latest frameworks.',
    tags: ['React', 'Angular', 'Node.js', 'PHP', 'Python', 'Java'],
  },
  {
    icon: Smartphone,
    title: 'Mobile Apps',
    desc: 'Cross-platform and native mobile applications for iOS and Android.',
    tags: ['Flutter', 'React Native', 'Android'],
  },
  {
    icon: Layout,
    title: 'UI / UX Design',
    desc: 'Beautiful, intuitive interfaces designed to convert and delight users.',
    tags: ['Figma', 'Design Systems', 'Prototyping'],
  },
  {
    icon: Database,
    title: 'Database Design',
    desc: 'Scalable, well-structured databases engineered for performance.',
    tags: ['SQL', 'NoSQL', 'Schema Design'],
  },
  {
    icon: Cloud,
    title: 'Cloud Deployment',
    desc: 'Reliable hosting and deployment pipelines so your product is always live.',
    tags: ['AWS', 'Vercel', 'Docker', 'CI/CD'],
  },
  {
    icon: Server,
    title: 'API Integration',
    desc: 'Connect services, payment gateways, and third-party APIs seamlessly.',
    tags: ['REST', 'GraphQL', 'Webhooks'],
  },
  {
    icon: Search,
    title: 'SEO & Analytics',
    desc: 'Get found online with technical SEO and actionable analytics dashboards.',
    tags: ['On-page SEO', 'Core Web Vitals', 'GA4'],
  },
  {
    icon: Wrench,
    title: 'Maintenance & Support',
    desc: 'Ongoing bug fixes, updates, and hosting so your product stays healthy.',
    tags: ['Bug Fixing', 'Updates', 'Monitoring'],
  },
];

function TiltCard({ s, i }: { s: (typeof SERVICES)[number]; i: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: (i % 3) * 0.1 }}
      whileHover={{ y: -6, rotateX: 4, rotateY: -4 }}
      style={{ transformPerspective: 800 }}
      className="card-glow group relative overflow-hidden"
    >
      <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gradient-to-br from-royal-500/20 to-accent-500/10 blur-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      <div className="relative mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-royal-500/20 to-accent-500/20 text-royal-400 transition-transform duration-500 group-hover:scale-110 group-hover:text-cyan-glow">
        <s.icon size={22} />
      </div>
      <h3 className="relative font-display text-lg font-semibold">{s.title}</h3>
      <p className="relative mt-2 text-sm text-muted">{s.desc}</p>
      <div className="relative mt-4 flex flex-wrap gap-1.5">
        {s.tags.map((t) => (
          <span
            key={t}
            className="rounded-full border border-white/5 bg-white/5 px-2 py-0.5 text-[11px] text-muted"
          >
            {t}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

export function Services() {
  return (
    <section id="services" className="section-pad relative">
      <div className="container-max relative z-10">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-royal-400">
            What We Do
          </span>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Services built to <span className="gradient-text">ship and scale</span>
          </h2>
          <p className="mt-4 text-muted">
            From academic projects to enterprise software — everything you need under one roof.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s, i) => (
            <TiltCard key={s.title} s={s} i={i} />
          ))}
        </div>

        <Reveal className="mt-12 text-center">
          <a href="#contact" className="btn-primary">
            <Rocket size={16} /> Discuss your project
          </a>
        </Reveal>
      </div>
    </section>
  );
}
