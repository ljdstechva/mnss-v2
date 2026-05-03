'use client'

import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Send } from 'lucide-react'
import { useState, type FormEvent } from 'react'

const formControlClass =
  'w-full rounded-2xl border border-primary/15 bg-white px-6 py-4 text-primary caret-primary shadow-sm outline-none transition-all placeholder:text-primary/45 focus:border-secondary/70 focus:ring-2 focus:ring-secondary/45 dark:border-white/10 dark:bg-white/10 dark:text-white dark:caret-white dark:placeholder:text-white/45'

export default function Contact() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [statusMessage, setStatusMessage] = useState('')

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const formData = new FormData(form)

    setStatus('submitting')
    setStatusMessage('')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.get('name'),
          email: formData.get('email'),
          service: formData.get('service'),
          message: formData.get('message'),
        }),
      })

      const result = (await response.json()) as { message?: string; error?: string }

      if (!response.ok) {
        throw new Error(result.error ?? 'Unable to send message.')
      }

      form.reset()
      setStatus('success')
      setStatusMessage(result.message ?? 'Message received successfully.')
    } catch (error) {
      setStatus('error')
      setStatusMessage(error instanceof Error ? error.message : 'Unable to send message.')
    }
  }

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
                  <h2 className="text-sm font-bold tracking-[0.2em] text-secondary uppercase mb-6">Let&apos;s Talk</h2>
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
                <p className="text-sm text-white/40">(c) 1997-2026 MNS Suarez Environmental Studies Consultants. All rights reserved.</p>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-background p-12 md:p-20">
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="contact-name" className="text-sm font-bold text-primary ml-1">Full Name</label>
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      required
                      placeholder="Juan Dela Cruz"
                      className={formControlClass}
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="contact-email" className="text-sm font-bold text-primary ml-1">Email Address</label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      placeholder="juan@example.com"
                      className={formControlClass}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="contact-service" className="text-sm font-bold text-primary ml-1">Service Interested In</label>
                  <select
                    id="contact-service"
                    name="service"
                    className={`${formControlClass} appearance-none`}
                  >
                    <option>Environmental Impact Assessment</option>
                    <option>Sustainability Auditing</option>
                    <option>Waste Management</option>
                    <option>Other Services</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label htmlFor="contact-message" className="text-sm font-bold text-primary ml-1">Your Message</label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={5}
                    required
                    placeholder="Tell us about your project..."
                    className={`${formControlClass} resize-none`}
                  ></textarea>
                </div>
                <p
                  aria-live="polite"
                  className={`min-h-6 text-sm font-semibold ${
                    status === 'error' ? 'text-red-700' : 'text-primary'
                  }`}
                >
                  {statusMessage}
                </p>
                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="w-full bg-secondary text-primary font-bold py-5 rounded-2xl flex items-center justify-center gap-3 hover:bg-secondary/90 transition-all shadow-lg shadow-secondary/20 group"
                >
                  {status === 'submitting' ? 'Sending...' : 'Send Message'} <Send size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
