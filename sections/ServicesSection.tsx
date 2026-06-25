'use client'

import { useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Award, FileCheck, Stethoscope, Users, Globe, Building2,
  Monitor, TrendingUp, Landmark, Heart, Rocket, Briefcase,
  CheckCircle, ArrowRight,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import Link from 'next/link'
import { SERVICES } from '@/constants'
import { cn } from '@/lib/utils'

const ICON_MAP: Record<string, LucideIcon> = {
  Award, FileCheck, Stethoscope, Users, Globe, Building2,
  Monitor, TrendingUp, Landmark, Heart, Rocket, Briefcase,
}

type Filter = 'all' | 'hospital' | 'business'

const FILTERS: { label: string; value: Filter }[] = [
  { label: 'All Services', value: 'all' },
  { label: 'Hospital Services', value: 'hospital' },
  { label: 'Business Consultancy', value: 'business' },
]

export default function ServicesSection() {
  const [activeFilter, setActiveFilter] = useState<Filter>('all')
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 })

  const filtered = activeFilter === 'all' ? SERVICES : SERVICES.filter((s) => s.category === activeFilter)

  return (
    <section ref={ref} className="py-20 lg:py-28 bg-gray-50 dark:bg-slate-800/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <span className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold bg-teal-100 dark:bg-teal-900/40 text-teal-700 dark:text-teal-300 mb-4">
            Our Services
          </span>
          <h2 className="text-3xl lg:text-4xl font-extrabold text-slate-800 dark:text-white mb-4">
            Comprehensive Healthcare &amp; Business Solutions
          </h2>
          <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
            From NABH accreditation to digital transformation, we offer end-to-end consultancy services tailored to every healthcare institution.
          </p>
        </motion.div>

        {/* Filter tabs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1, duration: 0.4 }}
          className="flex flex-wrap justify-center gap-2 mb-10"
        >
          {FILTERS.map((f) => (
            <button
              key={f.value}
              onClick={() => setActiveFilter(f.value)}
              className={cn(
                'px-5 py-2 rounded-xl text-sm font-semibold transition-all',
                activeFilter === f.value
                  ? 'bg-gradient-to-r from-teal-500 to-cyan-500 text-white shadow-md shadow-teal-500/20'
                  : 'bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-teal-400 hover:text-teal-600'
              )}
            >
              {f.label}
            </button>
          ))}
        </motion.div>

        {/* Cards grid */}
        <AnimatePresence mode="popLayout">
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filtered.map((service, i) => {
              const Icon = ICON_MAP[service.icon] ?? Briefcase
              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06, duration: 0.4 }}
                  className="group bg-white dark:bg-slate-800 rounded-2xl p-6 border border-gray-100 dark:border-slate-700 hover:shadow-xl hover:shadow-teal-500/10 hover:-translate-y-2 transition-all duration-300"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-500 shadow-md shadow-teal-500/20">
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <span className={cn(
                      'text-xs font-semibold px-2.5 py-1 rounded-full',
                      service.category === 'hospital'
                        ? 'bg-teal-100 dark:bg-teal-900/40 text-teal-700 dark:text-teal-300'
                        : 'bg-cyan-100 dark:bg-cyan-900/40 text-cyan-700 dark:text-cyan-300'
                    )}>
                      {service.category === 'hospital' ? 'Hospital' : 'Business'}
                    </span>
                  </div>

                  <h3 className="font-bold text-lg text-slate-800 dark:text-white mb-2 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-4 line-clamp-3">
                    {service.description}
                  </p>

                  <ul className="space-y-1.5 mb-5">
                    {service.features.slice(0, 3).map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                        <CheckCircle className="w-4 h-4 text-teal-500 shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>

                  <Link
                    href="/#contact"
                    className="inline-flex items-center gap-1 text-sm font-semibold text-teal-600 dark:text-teal-400 hover:gap-2 transition-all"
                  >
                    Learn More <ArrowRight className="w-4 h-4" />
                  </Link>
                </motion.div>
              )
            })}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
