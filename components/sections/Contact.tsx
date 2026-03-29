'use client'

import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Send } from 'lucide-react'

export default function Contact() {
  return (
    <section id="contact" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <div className="bg-primary rounded-[60px] overflow-hidden shadow-2xl">
          <div className="grid lg:grid-cols-2">
            {/* Contact Info */}
            <div className="p-12 md:p-20 text-white flex flex-col justify-between">
              <div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <h2 className="text-sm font-bold tracking-[0.2em] text-secondary uppercase mb-6">Let's Talk</h2>
                  <p className="text-4xl md:text-5xl font-bold mb-8">
                    Ready to Start Your <span className="text-secondary italic">Green</span> Initiative?
                  </p>
                  <p className="text-white/70 text-lg mb-12 max-w-md">
                    Connect with our expert consultants today and discover how we can help your business thrive sustainably.
                  </p>
                </motion.div>

                <div className="space-y-8">
                  <div className="flex items-start gap-6">
                    <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-secondary">
                      <Mail size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg">Email Us</h4>
                      <p className="text-white/60">info@mnsconsultants.com</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-6">
                    <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-secondary">
                      <Phone size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg">Call Us</h4>
                      <p className="text-white/60">+63 (2) 123 4567</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-6">
                    <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-secondary">
                      <MapPin size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg">Visit Us</h4>
                      <p className="text-white/60">Manila, Philippines</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-20 pt-10 border-t border-white/10">
                <p className="text-sm text-white/40">© 1997-2026 MNS Suarez Environmental Studies Consultants. All rights reserved.</p>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-background p-12 md:p-20">
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-primary ml-1">Full Name</label>
                    <input
                      type="text"
                      placeholder="Juan Dela Cruz"
                      className="w-full px-6 py-4 rounded-2xl bg-gray-100 dark:bg-slate-900 border border-border text-blue-950 dark:text-foreground focus:outline-none focus:ring-2 focus:ring-secondary/50 transition-all placeholder:text-blue-950/40 dark:placeholder:text-foreground/40"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-primary ml-1">Email Address</label>
                    <input
                      type="email"
                      placeholder="juan@example.com"
                      className="w-full px-6 py-4 rounded-2xl bg-gray-100 dark:bg-slate-900 border border-border text-blue-950 dark:text-foreground focus:outline-none focus:ring-2 focus:ring-secondary/50 transition-all placeholder:text-blue-950/40 dark:placeholder:text-foreground/40"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-primary ml-1">Service Interested In</label>
                  <select className="w-full px-6 py-4 rounded-2xl bg-gray-100 dark:bg-slate-900 border border-border text-blue-950 dark:text-foreground focus:outline-none focus:ring-2 focus:ring-secondary/50 transition-all appearance-none">
                    <option>Environmental Impact Assessment</option>
                    <option>Sustainability Auditing</option>
                    <option>Waste Management</option>
                    <option>Other Services</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-primary ml-1">Your Message</label>
                  <textarea
                    rows={5}
                    placeholder="Tell us about your project..."
                    className="w-full px-6 py-4 rounded-2xl bg-gray-100 dark:bg-slate-900 border border-border text-blue-950 dark:text-foreground focus:outline-none focus:ring-2 focus:ring-secondary/50 transition-all resize-none placeholder:text-blue-950/40 dark:placeholder:text-foreground/40"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-secondary text-primary font-bold py-5 rounded-2xl flex items-center justify-center gap-3 hover:bg-secondary/90 transition-all shadow-lg shadow-secondary/20 group"
                >
                  Send Message <Send size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
