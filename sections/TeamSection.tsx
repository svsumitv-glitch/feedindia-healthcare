'use client'

import { useInView } from 'react-intersection-observer'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { ExternalLink } from 'lucide-react'
import { TEAM_MEMBERS } from '@/constants'

export default function TeamSection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 })

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
            Our Team
          </span>
          <h2 className="text-3xl lg:text-4xl font-extrabold text-slate-800 dark:text-white mb-4">
            The Experts Behind Your Success
          </h2>
          <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
            A team of seasoned healthcare administrators, NABH assessors, medical professionals, and technology experts — united by a passion for better healthcare.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {TEAM_MEMBERS.map((member, i) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.09, duration: 0.4 }}
              className="group bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-slate-700"
            >
              {/* Image container */}
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-teal-900/80 via-teal-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                  <p className="text-white text-sm leading-relaxed line-clamp-3">{member.bio}</p>
                  {member.linkedin && (
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${member.name} on LinkedIn`}
                      className="mt-3 inline-flex items-center gap-2 text-xs text-teal-200 hover:text-white transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" /> LinkedIn Profile
                    </a>
                  )}
                </div>
              </div>

              {/* Info */}
              <div className="p-5">
                <h3 className="font-bold text-lg text-slate-800 dark:text-white">{member.name}</h3>
                <p className="text-teal-600 dark:text-teal-400 text-sm font-semibold mb-2">{member.role}</p>
                {member.specialization && (
                  <span className="inline-block text-xs px-3 py-1 rounded-full bg-teal-50 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300 font-medium">
                    {member.specialization}
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
