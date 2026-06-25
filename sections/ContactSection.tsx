'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { MapPin, Phone, Mail, MessageCircle, Clock, Loader2, Send } from 'lucide-react'
import { toast } from 'sonner'
import { contactSchema, type ContactFormData } from '@/lib/validations'
import { CONTACT_INFO, SERVICES } from '@/constants'
import { cn } from '@/lib/utils'

export default function ContactSection() {
  const [loading, setLoading] = useState(false)
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 })

  const { register, handleSubmit, reset, formState: { errors } } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  })

  const onSubmit = async (data: ContactFormData) => {
    setLoading(true)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (res.ok) {
        toast.success("Message sent! We'll contact you shortly.")
        reset()
      } else {
        toast.error('Failed to send. Please try again.')
      }
    } catch {
      toast.error('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const inputClass = 'w-full rounded-xl border border-gray-200 dark:border-slate-600 px-4 py-3 bg-white dark:bg-slate-800 text-slate-800 dark:text-white placeholder-gray-400 dark:placeholder-slate-500 focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all text-sm'

  return (
    <section ref={ref} className="py-20 lg:py-28 bg-gray-50 dark:bg-slate-800/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold bg-teal-100 dark:bg-teal-900/40 text-teal-700 dark:text-teal-300 mb-4">
            Contact Us
          </span>
          <h2 className="text-3xl lg:text-4xl font-extrabold text-slate-800 dark:text-white mb-4">
            Let&apos;s Start Your Healthcare Journey
          </h2>
          <p className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
            Reach out for a free 30-minute consultation. Our experts are ready to understand your needs and craft a solution.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">

          {/* Left: Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-5"
          >
            <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-6">Get In Touch</h3>

            {[
              { icon: MapPin, label: 'Address', value: CONTACT_INFO.address, href: undefined, color: 'text-teal-600' },
              { icon: Phone, label: 'Phone', value: CONTACT_INFO.phone, href: `tel:${CONTACT_INFO.phone}`, color: 'text-teal-600' },
              { icon: Mail, label: 'Email', value: CONTACT_INFO.email, href: `mailto:${CONTACT_INFO.email}`, color: 'text-teal-600' },
              { icon: MessageCircle, label: 'WhatsApp', value: 'Chat with us on WhatsApp', href: `https://wa.me/${CONTACT_INFO.whatsapp}`, color: 'text-green-500' },
              { icon: Clock, label: 'Working Hours', value: CONTACT_INFO.workingHours, href: undefined, color: 'text-teal-600' },
            ].map(({ icon: Icon, label, value, href, color }) => (
              <div key={label} className="flex items-start gap-4 p-4 bg-white dark:bg-slate-800 rounded-xl border border-gray-100 dark:border-slate-700">
                <div className="p-2 rounded-lg bg-teal-50 dark:bg-teal-900/30 shrink-0">
                  <Icon className={cn('w-4 h-4', color)} />
                </div>
                <div>
                  <div className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-0.5">{label}</div>
                  {href ? (
                    <a href={href} target={href.startsWith('https') ? '_blank' : undefined} rel="noopener noreferrer" className="text-sm text-slate-700 dark:text-slate-200 hover:text-teal-600 transition-colors">
                      {value}
                    </a>
                  ) : (
                    <span className="text-sm text-slate-700 dark:text-slate-200">{value}</span>
                  )}
                </div>
              </div>
            ))}

            {/* Map placeholder */}
            <div className="rounded-xl h-48 bg-gradient-to-br from-teal-50 to-cyan-50 dark:from-teal-900/20 dark:to-cyan-900/20 border border-teal-100 dark:border-teal-800/40 flex flex-col items-center justify-center gap-2 text-slate-400">
              <MapPin className="w-8 h-8 text-teal-400" />
              <p className="text-sm font-medium">Healthcare Hub, Noida, UP</p>
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-teal-600 hover:underline"
              >
                View on Google Maps →
              </a>
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-lg border border-gray-100 dark:border-slate-700"
          >
            <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-6">Send us a Message</h3>
            <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5" htmlFor="name">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input id="name" {...register('name')} placeholder="Dr. Rajesh Kumar" className={cn(inputClass, errors.name && 'border-red-400 focus:border-red-400 focus:ring-red-400/20')} />
                  {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5" htmlFor="email">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input id="email" type="email" {...register('email')} placeholder="you@hospital.com" className={cn(inputClass, errors.email && 'border-red-400 focus:border-red-400 focus:ring-red-400/20')} />
                  {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5" htmlFor="phone">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input id="phone" type="tel" {...register('phone')} placeholder="+91 98765 43210" className={cn(inputClass, errors.phone && 'border-red-400 focus:border-red-400 focus:ring-red-400/20')} />
                  {errors.phone && <p className="mt-1 text-xs text-red-500">{errors.phone.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5" htmlFor="organization">
                    Organization
                  </label>
                  <input id="organization" {...register('organization')} placeholder="Your Hospital Name" className={inputClass} />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5" htmlFor="service">
                  Service Required <span className="text-red-500">*</span>
                </label>
                <select id="service" {...register('service')} className={cn(inputClass, errors.service && 'border-red-400')}>
                  <option value="">Select a service...</option>
                  {SERVICES.map((s) => (
                    <option key={s.id} value={s.id}>{s.title}</option>
                  ))}
                </select>
                {errors.service && <p className="mt-1 text-xs text-red-500">{errors.service.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5" htmlFor="message">
                  Message <span className="text-red-500">*</span>
                </label>
                <textarea id="message" {...register('message')} rows={4} placeholder="Tell us about your requirements..." className={cn(inputClass, 'resize-none', errors.message && 'border-red-400')} />
                {errors.message && <p className="mt-1 text-xs text-red-500">{errors.message.message}</p>}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-semibold hover:shadow-lg hover:shadow-teal-500/25 hover:-translate-y-0.5 transition-all disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" /> Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" /> Send Message
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
