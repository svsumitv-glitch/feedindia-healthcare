'use client'

import { motion } from 'framer-motion'
import { Phone, MessageCircle } from 'lucide-react'

export default function FloatingButtons() {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
      <motion.a
        href="https://wa.me/911234567890"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, type: 'spring', stiffness: 200 }}
        className="p-3 rounded-xl bg-emerald-500 text-white shadow-lg hover:shadow-emerald-500/40 hover:-translate-y-1 transition-all"
      >
        <MessageCircle className="w-5 h-5" />
      </motion.a>
      <motion.a
        href="tel:+911234567890"
        aria-label="Call us"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1.1, type: 'spring', stiffness: 200 }}
        className="p-3 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-500 text-white shadow-lg hover:shadow-teal-500/40 hover:-translate-y-1 transition-all"
      >
        <Phone className="w-5 h-5" />
      </motion.a>
    </div>
  )
}
