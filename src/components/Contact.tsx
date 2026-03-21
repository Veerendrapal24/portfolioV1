import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Github, Linkedin, Send, CheckCircle2 } from 'lucide-react';
import TextReveal from './TextReveal';

export default function Contact() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  return (
    <section className="py-24 px-6 md:px-20 bg-clay-bg text-slate-800">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
          <div className="clay-card clay-purple p-12 inline-block mb-8">
            <motion.span 
              initial={{ scale: 3, y: -20, opacity: 0 }}
              whileInView={{ scale: 1, y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, type: "spring", delay: 0.1 }}
              className="text-6xl font-extrabold text-purple-800 block"
            >
              05
            </motion.span>
          </div>
          <TextReveal 
            text="Let's Connect" 
            className="text-6xl md:text-8xl font-extrabold uppercase tracking-tighter text-slate-800 mb-8"
          />
          <p className="text-xl font-bold uppercase tracking-widest text-slate-400 mb-12 max-w-md">
            Open for collaborations, systems architecture discussions, or just a coffee chat.
          </p>

          <div className="flex gap-6">
            {[
              { 
                icon: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <motion.path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1 }} />
                    <motion.polyline points="22,6 12,13 2,6" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.5 }} />
                  </svg>
                ), 
                href: 'mailto:veerendra2475@gmail.com', 
                color: 'clay-blue' 
              },
              { 
                icon: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <motion.path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1.5 }} />
                  </svg>
                ), 
                href: 'https://github.com/Veerendrapal24', 
                color: 'clay-green' 
              },
              { 
                icon: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <motion.path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1 }} />
                    <motion.rect x="2" y="9" width="4" height="12" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.5 }} />
                    <motion.circle cx="4" cy="4" r="2" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 1 }} />
                  </svg>
                ), 
                href: 'https://www.linkedin.com/in/veerendrapal', 
                color: 'clay-pink' 
              }
            ].map((social, i) => (
              <motion.a 
                key={i}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -5, rotate: i % 2 === 0 ? 5 : -5 }}
                whileTap={{ scale: 0.9 }}
                className={`w-16 h-16 flex items-center justify-center rounded-full clay-card ${social.color} transition-all`}
              >
                {social.icon}
              </motion.a>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="clay-card bg-white p-8 md:p-12 relative overflow-hidden"
        >
          <AnimatePresence mode="wait">
            {isSubmitted ? (
              <motion.div 
                key="success"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="flex flex-col items-center justify-center py-20 text-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 10 }}
                  className="w-24 h-24 rounded-full clay-card clay-green flex items-center justify-center text-green-800 mb-8"
                >
                  <CheckCircle2 size={48} />
                </motion.div>
                <h3 className="text-3xl font-extrabold text-slate-800 uppercase mb-4">Message Sent!</h3>
                <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">I'll get back to you soon.</p>
              </motion.div>
            ) : (
              <motion.form 
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-8" 
                onSubmit={handleSubmit}
              >
                <div className="space-y-3">
                  <label className="text-xs font-bold uppercase tracking-widest text-slate-400 ml-4">Name</label>
                  <motion.input 
                    whileFocus={{ scale: 1.01 }}
                    type="text" 
                    required
                    className="w-full bg-clay-bg/50 rounded-[20px] px-6 py-4 focus:ring-4 focus:ring-clay-blue/30 outline-none transition-all text-slate-800 font-bold clay-inset"
                    placeholder="Your Name"
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-xs font-bold uppercase tracking-widest text-slate-400 ml-4">Email</label>
                  <motion.input 
                    whileFocus={{ scale: 1.01 }}
                    type="email" 
                    required
                    className="w-full bg-clay-bg/50 rounded-[20px] px-6 py-4 focus:ring-4 focus:ring-clay-blue/30 outline-none transition-all text-slate-800 font-bold clay-inset"
                    placeholder="your@email.com"
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-xs font-bold uppercase tracking-widest text-slate-400 ml-4">Message</label>
                  <motion.textarea 
                    whileFocus={{ scale: 1.01 }}
                    rows={4}
                    required
                    className="w-full bg-clay-bg/50 rounded-[20px] px-6 py-4 focus:ring-4 focus:ring-clay-blue/30 outline-none transition-all text-slate-800 font-bold clay-inset resize-none"
                    placeholder="Tell me about your project"
                  />
                </div>
                
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={isSubmitting}
                  type="submit"
                  className="group w-full flex items-center justify-center gap-3 clay-button clay-blue text-blue-800 py-6 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                  {!isSubmitting && <Send size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />}
                </motion.button>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
