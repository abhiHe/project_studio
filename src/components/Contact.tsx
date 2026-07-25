import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Mail, MapPin, Phone, Send, MessageCircle } from 'lucide-react';
import { MagneticButton, Reveal } from './Effects';
import { supabase } from '@/lib/supabase';

const BUSINESS_TYPES = ['Student', 'Restaurant', 'Cafe', 'Salon', 'Retail', 'Startup', 'NGO', 'Other'];
const PROJECT_TYPES = ['Student Project', 'Website', 'Mobile App', 'E-Commerce', 'Dashboard', 'Custom Software'];
const BUDGETS = ['< ₹10,000', '₹10,000–₹25,000', '₹25,000–₹50,000', '₹50,000+', 'Not sure'];

export function Contact() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    businessType: '',
    projectType: '',
    budget: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const update = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const { error } = await supabase.from('project_inquiries').insert({
        name: form.name,
        email: form.email,
        phone: form.phone,
        business_type: form.businessType,
        project_type: form.projectType,
        budget: form.budget,
        message: form.message,
      });
      if (error) throw error;
      setStatus('sent');
      setForm({ name: '', email: '', phone: '', businessType: '', projectType: '', budget: '', message: '' });
    } catch {
      setStatus('error');
    }
  };

  const field =
    'w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none transition-colors focus:border-royal-500 focus:bg-white/10';

  return (
    <section id="contact" className="section-pad relative">
      <div className="aurora opacity-40" />
      <div className="container-max relative z-10">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-royal-400">
            Contact
          </span>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Let's build something <span className="gradient-text">together</span>
          </h2>
          <p className="mt-4 text-muted">Tell us about your project and we'll get back within 24 hours.</p>
        </Reveal>

        <div className="mt-14 grid gap-6 lg:grid-cols-5">
          <Reveal className="lg:col-span-3">
            <form onSubmit={submit} className="glass-strong rounded-3xl p-6 md:p-8">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-muted">Name</label>
                  <input
                    required
                    value={form.name}
                    onChange={(e) => update('name', e.target.value)}
                    placeholder="Your name"
                    className={field}
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-muted">Email</label>
                  <input
                    required
                    type="email"
                    value={form.email}
                    onChange={(e) => update('email', e.target.value)}
                    placeholder="you@email.com"
                    className={field}
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-muted">Phone</label>
                  <input
                    value={form.phone}
                    onChange={(e) => update('phone', e.target.value)}
                    placeholder="+91 ..."
                    className={field}
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-muted">Business Type</label>
                  <select value={form.businessType} onChange={(e) => update('businessType', e.target.value)} className={field}>
                    <option value="">Select</option>
                    {BUSINESS_TYPES.map((b) => (
                      <option key={b} value={b}>{b}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-muted">Project Type</label>
                  <select value={form.projectType} onChange={(e) => update('projectType', e.target.value)} className={field}>
                    <option value="">Select</option>
                    {PROJECT_TYPES.map((p) => (
                      <option key={p} value={p}>{p}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-muted">Budget</label>
                  <select value={form.budget} onChange={(e) => update('budget', e.target.value)} className={field}>
                    <option value="">Select</option>
                    {BUDGETS.map((b) => (
                      <option key={b} value={b}>{b}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="mt-4">
                <label className="mb-1.5 block text-xs font-medium text-muted">Message</label>
                <textarea
                  required
                  rows={4}
                  value={form.message}
                  onChange={(e) => update('message', e.target.value)}
                  placeholder="Tell us about your project..."
                  className={`${field} resize-none`}
                />
              </div>

              <MagneticButton
                type="submit"
                disabled={status === 'sending'}
                className="btn-primary mt-5 w-full"
              >
                {status === 'sent' ? (
                  <>
                    <Check size={16} /> Message Sent
                  </>
                ) : status === 'sending' ? (
                  'Sending...'
                ) : (
                  <>
                    <Send size={16} /> Send Message
                  </>
                )}
              </MagneticButton>

              {status === 'sent' && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-3 text-center text-sm text-cyan-glow"
                >
                  Thanks! We'll be in touch within 24 hours.
                </motion.p>
              )}
              {status === 'error' && (
                <p className="mt-3 text-center text-sm text-red-400">
                  Something went wrong. Please try again or email us directly.
                </p>
              )}
            </form>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-2">
            <div className="flex h-full flex-col gap-4">
              <div className="card-glow">
                <h3 className="font-display text-lg font-semibold">Reach us directly</h3>
                <div className="mt-4 space-y-3 text-sm">
                  <a href="mailto:projectstudio.offical03@gmail.com" className="flex items-center gap-3 text-muted hover:text-[rgb(var(--fg))]">
                    <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-royal-500/15 text-royal-400">
                      <Mail size={16} />
                    </span>
                    projectstudio.offical03@gmail.com
                  </a>
                  <a href="tel:+917619161704" className="flex items-center gap-3 text-muted hover:text-[rgb(var(--fg))]">
                    <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-royal-500/15 text-royal-400">
                      <Phone size={16} />
                    </span>
                    +91 76191 61704
                  </a>
                  <a href="https://wa.me/917619161704" className="flex items-center gap-3 text-muted hover:text-[rgb(var(--fg))]">
                    <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-green-500/15 text-green-400">
                      <MessageCircle size={16} />
                    </span>
                    Chat on WhatsApp
                  </a>
                  <div className="flex items-center gap-3 text-muted">
                    <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-royal-500/15 text-royal-400">
                      <MapPin size={16} />
                    </span>
                    Remote · India & Worldwide
                  </div>
                </div>
              </div>

              <div className="card-glow flex-1 overflow-hidden !p-0">
                <div className="relative h-full min-h-[180px] w-full">
                  <iframe
                    title="map"
                    src="https://www.openstreetmap.org/export/embed.html?bbox=77.478559,12.934903,77.498559,12.954903&layer=mapnik&marker=12.944903,77.488559"
                    className="h-full w-full grayscale"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
