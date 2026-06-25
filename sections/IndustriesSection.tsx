'use client'

import { useInView } from 'react-intersection-observer'
import { motion } from 'framer-motion'
import { Building2, Stethoscope, FlaskConical, Heart, Rocket, GraduationCap, ArrowRight } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { INDUSTRIES } from '@/constants'
import { cn } from '@/lib/utils'

const ICON_MAP: Record<string, LucideIcon> = {
  Building2, Stethoscope, FlaskConical, Heart, Rocket, GraduationCap,
}

export default function IndustriesSection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section ref={ref} className="py-20 lg:py-28 bg-white dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold bg-teal-100 dark:bg-teal-900/40 text-teal-700 dark:text-teal-300 mb-4">
            Industries We Serve
          </span>
          <h2 className="text-3xl lg:text-4xl font-extrabold text-slate-800 dark:text-white mb-4">
            Comprehensive Solutions Across Healthcare
          </h2>
          <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
            We serve the full spectrum of healthcare institutions — from large multi-specialty hospitals to community clinics and healthcare NGOs.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {INDUSTRIES.map((industry, i) => {
            const Icon = ICON_MAP[industry.icon] ?? Building2
            return (
              <motion.div
                key={industry.title}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.08, duration: 0.4 }}
                className="group bg-white dark:bg-slate-800 rounded-2xl p-6 border border-gray-100 dark:border-slate-700 hover:shadow-xl hover:shadow-teal-500/10 hover:-translate-y-1 hover:border-teal-200 dark:hover:border-teal-700 transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-500 shadow-md shadow-teal-500/20 group-hover:shadow-lg group-hover:shadow-teal-500/30 transition-shadow">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-teal-100 dark:bg-teal-900/40 text-teal-700 dark:text-teal-300">
                    {industry.count}
                  </span>
                </div>
                <h3 className="font-bold text-lg text-slate-800 dark:text-white mb-2 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                  {industry.title}
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-4">
                  {industry.description}
                </p>
                <a href="/#services" className="inline-flex items-center gap-1 text-sm font-semibold text-teal-600 dark:text-teal-400 opacity-0 group-hover:opacity-100 transition-opacity">
                  View Services <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
