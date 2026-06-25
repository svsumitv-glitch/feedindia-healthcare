'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Heart, Mail, Phone, MapPin, ExternalLink, Send } from 'lucide-react'
import { toast } from 'sonner'

const footerLinks = {
  company: [
    { label: 'About Us', href: '/#about' },
    { label: 'Our Team', href: '/#team' },
    { label: 'Process', href: '/#process' },
    { label: 'Gallery', href: '/#gallery' },
    { label: 'Blog', href: '/#blog' },
    { label: 'Careers', href: '/#contact' },
  ],
  services: [
    { label: 'Hospital Setup', href: '/#services' },
    { label: 'Hospital Management', href: '/#services' },
    { label: 'Medical Recruitment', href: '/#services' },
    { label: 'Business Consulting', href: '/#services' },
    { label: 'NABH Accreditation', href: '/#services' },
    { label: 'Digital Health', href: '/#services' },
  ],
}

const socials = [
  { label: 'LinkedIn', href: 'https://linkedin.com' },
  { label: 'Twitter', href: 'https://twitter.com' },
  { label: 'Facebook', href: 'https://facebook.com' },
  { label: 'YouTube', href: 'https://youtube.com' },
]

export default function Footer() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)

  const handleNewsletter = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setLoading(true)
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      if (res.ok) {
        toast.success('Subscribed! Thank you for joining us.')
        setEmail('')
      } else {
        toast.error('Subscription failed. Please try again.')
      }
    } catch {
      toast.error('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <footer className="bg-slate-950 text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Brand */}
        <div className="lg:col-span-1">
          <Link href="/" className="flex items-center gap-2 mb-5">
            <div className="p-1.5 rounded-lg bg-gradient-to-br from-teal-500 to-cyan-500">
              <Heart className="w-5 h-5 text-white" fill="white" />
            </div>
            <span className="text-white font-extrabold text-lg">FeedIndia <span className="text-teal-400 font-normal text-sm">Healthcare</span></span>
          </Link>
          <p className="text-sm leading-relaxed text-slate-400 mb-5">
            Transforming healthcare delivery across India since 2009. Trusted by 500+ hospitals with expert consulting and management services.
          </p>
          <div className="flex gap-3">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="p-2 rounded-lg bg-slate-800 hover:bg-teal-600 text-slate-400 hover:text-white transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>

        {/* Company */}
        <div>
          <h3 className="text-white font-semibold mb-5 text-sm uppercase tracking-wider">Company</h3>
          <ul className="space-y-3">
            {footerLinks.company.map((l) => (
              <li key={l.label}>
                <Link href={l.href} className="text-sm text-slate-400 hover:text-teal-400 transition-colors">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Services */}
        <div>
          <h3 className="text-white font-semibold mb-5 text-sm uppercase tracking-wider">Services</h3>
          <ul className="space-y-3">
            {footerLinks.services.map((l) => (
              <li key={l.label}>
                <Link href={l.href} className="text-sm text-slate-400 hover:text-teal-400 transition-colors">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact + Newsletter */}
        <div>
          <h3 className="text-white font-semibold mb-5 text-sm uppercase tracking-wider">Contact</h3>
          <ul className="space-y-3 mb-6">
            <li className="flex items-start gap-2.5 text-sm text-slate-400">
              <MapPin className="w-4 h-4 text-teal-500 mt-0.5 shrink-0" />
              <span>Sector 62, Noida, Uttar Pradesh 201301, India</span>
            </li>
            <li className="flex items-center gap-2.5 text-sm text-slate-400">
              <Phone className="w-4 h-4 text-teal-500 shrink-0" />
              <a href="tel:+911234567890" className="hover:text-teal-400 transition-colors">+91 12345 67890</a>
            </li>
            <li className="flex items-center gap-2.5 text-sm text-slate-400">
              <Mail className="w-4 h-4 text-teal-500 shrink-0" />
              <a href="mailto:info@feedindiahealthcare.com" className="hover:text-teal-400 transition-colors">info@feedindiahealthcare.com</a>
            </li>
          </ul>

          <p className="text-xs text-slate-500 mb-2 uppercase tracking-wide font-medium">Newsletter</p>
          <form onSubmit={handleNewsletter} className="flex gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              className="flex-1 min-w-0 px-3 py-2.5 rounded-lg bg-slate-800 border border-slate-700 text-white text-sm placeholder-slate-500 focus:outline-none focus:border-teal-500 transition-colors"
            />
            <button
              type="submit"
              disabled={loading}
              className="p-2.5 rounded-lg bg-teal-600 hover:bg-teal-500 text-white transition-colors disabled:opacity-50"
              aria-label="Subscribe"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-slate-500">
            &copy; {new Date().getFullYear()} FeedIndia Healthcare & Consultancy. All rights reserved.
          </p>
          <div className="flex gap-4 text-xs text-slate-500">
            <Link href="#" className="hover:text-teal-400 transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-teal-400 transition-colors">Terms of Service</Link>
            <Link href="#" className="hover:text-teal-400 transition-colors">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
