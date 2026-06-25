'use client'

import { useInView } from 'react-intersection-observer'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Award, Building2, Users, TrendingUp, Target, Eye, CheckCircle, ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'

const TIMELINE = [
  { year: '2009', title: 'FeedIndia Founded', desc: 'Started as a boutique NABH consultancy in Noida, UP.' },
  { year: '2012', title: 'First NABH Accreditation', desc: 'Successfully guided our first hospital to NABH accreditation.' },
  { year: '2015', title: '100 Hospitals Milestone', desc: 'Crossed 100 hospitals supported across 8 Indian states.' },
  { year: '2019', title: 'Pan-India Operations', desc: 'Expanded to 15+ states with dedicated regional teams.' },
  { year: '2024', title: 'Digital Healthcare Division', desc: 'Launched full digital transformation consultancy vertical.' },
]

const ACHIEVEMENTS = [
  { icon: Award, label: '500+ Projects', color: 'bg-teal-100 dark:bg-teal-900/30 text-teal-600' },
  { icon: Building2, label: '200+ Hospitals', color: 'bg-cyan-100 dark:bg-cyan-900/30 text-cyan-600' },
  { icon: Users, label: '15+ States', color: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600' },
  { icon: TrendingUp, label: '98% Success', color: 'bg-teal-100 dark:bg-teal-900/30 text-teal-700' },
]

export default function AboutSection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section ref={ref} className="py-20 lg:py-28 bg-white dark:bg-slate-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-start">

          {/* Left: Images */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="relative"
          >
            <div className="relative h-[480px] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=700&q=80"
                alt="Healthcare consultation"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-teal-900/30 to-transparent" />
            </div>

            {/* Secondary image */}
            <div className="absolute -bottom-6 -right-6 w-48 h-48 rounded-xl overflow-hidden shadow-xl border-4 border-white dark:border-slate-900">
              <Image
                src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=300&q=80"
                alt="Hospital team"
                fill
                className="object-cover"
              />
            </div>

            {/* Floating stat overlay */}
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
              className="absolute -bottom-2 -left-4 bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-4 border border-gray-100 dark:border-slate-700"
            >
              <div className="text-3xl font-extrabold text-teal-600">15+</div>
              <div className="text-xs text-gray-500 dark:text-gray-400 font-medium">Years of Excellence</div>
            </motion.div>

            {/* Achievement badges */}
            <div className="mt-12 grid grid-cols-2 gap-3">
              {ACHIEVEMENTS.map(({ icon: Icon, label, color }) => (
                <div key={label} className="flex items-center gap-3 bg-gray-50 dark:bg-slate-800/50 rounded-xl px-4 py-3">
                  <div className={cn('p-2 rounded-lg', color.split(' ').slice(0, 2).join(' '))}>
                    <Icon className={cn('w-4 h-4', color.split(' ').slice(2).join(' '))} />
                  </div>
                  <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">{label}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15, ease: 'easeOut' }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold bg-teal-100 dark:bg-teal-900/40 text-teal-700 dark:text-teal-300 mb-4">
              About Us
            </span>
            <h2 className="text-3xl lg:text-4xl font-extrabold text-slate-800 dark:text-white mb-4 leading-tight">
              15 Years of Healthcare Excellence Across India
            </h2>
            <p className="text-slate-500 dark:text-slate-400 leading-relaxed mb-8">
              FeedIndia Healthcare &amp; Consultancy was founded with a single mission: to make quality healthcare infrastructure accessible to every Indian — from metro hospitals to rural clinics. Over 15 years, we have partnered with 200+ healthcare facilities to achieve NABH accreditation, navigate complex regulations, adopt digital solutions, and build sustainable, patient-centric institutions.
            </p>

            {/* Mission & Vision */}
            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              <div className="p-5 rounded-2xl bg-teal-50 dark:bg-teal-900/20 border border-teal-100 dark:border-teal-800/40">
                <div className="flex items-center gap-2 mb-2">
                  <Target className="w-5 h-5 text-teal-600" />
                  <span className="font-bold text-slate-800 dark:text-white">Our Mission</span>
                </div>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                  Transforming healthcare delivery through expert consultancy that raises standards and saves lives.
                </p>
              </div>
              <div className="p-5 rounded-2xl bg-cyan-50 dark:bg-cyan-900/20 border border-cyan-100 dark:border-cyan-800/40">
                <div className="flex items-center gap-2 mb-2">
                  <Eye className="w-5 h-5 text-cyan-600" />
                  <span className="font-bold text-slate-800 dark:text-white">Vision 2035</span>
                </div>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                  Making quality healthcare accessible to every Indian by empowering 1,000 healthcare institutions.
                </p>
              </div>
            </div>

            {/* Timeline */}
            <div className="space-y-4 mb-8">
              {TIMELINE.map((item, i) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, x: 20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.08, duration: 0.4 }}
                  className="flex gap-4"
                >
                  <div className="flex flex-col items-center">
                    <div className="w-9 h-9 rounded-full bg-teal-100 dark:bg-teal-900/40 border-2 border-teal-300 dark:border-teal-700 flex items-center justify-center shrink-0">
                      <CheckCircle className="w-4 h-4 text-teal-600" />
                    </div>
                    {i < TIMELINE.length - 1 && <div className="w-0.5 h-full bg-teal-100 dark:bg-teal-900/40 mt-1" />}
                  </div>
                  <div className="pb-4">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-xs font-bold text-teal-600 dark:text-teal-400">{item.year}</span>
                      <span className="font-semibold text-slate-800 dark:text-white text-sm">{item.title}</span>
                    </div>
                    <p className="text-sm text-slate-500 dark:text-slate-400">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-semibold hover:shadow-lg hover:shadow-teal-500/25 hover:-translate-y-0.5 transition-all"
            >
              Start Your Journey <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
