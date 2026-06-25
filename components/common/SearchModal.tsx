'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, X } from 'lucide-react'
import { SERVICES } from '@/constants'

interface Props {
  open: boolean
  onClose: () => void
}

export default function SearchModal({ open, onClose }: Props) {
  const [query, setQuery] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 100)
    } else {
      setQuery('')
    }
  }, [open])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  const results = SERVICES.filter((s) =>
    query.length > 1 &&
    (s.title.toLowerCase().includes(query.toLowerCase()) ||
      s.description.toLowerCase().includes(query.toLowerCase()))
  )

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] bg-black/60 backdrop-blur-sm flex items-start justify-center pt-24 px-4"
          onClick={(e) => e.target === e.currentTarget && onClose()}
        >
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.97 }}
            transition={{ duration: 0.2 }}
            className="w-full max-w-xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl overflow-hidden"
          >
            <div className="flex items-center gap-3 px-5 py-4 border-b border-gray-100 dark:border-slate-800">
              <Search className="w-5 h-5 text-gray-400 shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search services, topics..."
                className="flex-1 bg-transparent text-slate-900 dark:text-white placeholder-gray-400 focus:outline-none text-base"
              />
              <button onClick={onClose} className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
                <X className="w-5 h-5" />
              </button>
            </div>

            {results.length > 0 ? (
              <ul className="max-h-72 overflow-y-auto py-2">
                {results.map((r) => (
                  <li key={r.id}>
                    <button
                      onClick={onClose}
                      className="w-full text-left px-5 py-3 hover:bg-teal-50 dark:hover:bg-slate-800 transition-colors"
                    >
                      <p className="text-sm font-medium text-slate-900 dark:text-white">{r.title}</p>
                      <p className="text-xs text-slate-500 mt-0.5 truncate">{r.description}</p>
                    </button>
                  </li>
                ))}
              </ul>
            ) : query.length > 1 ? (
              <div className="py-10 text-center text-slate-400 text-sm">No results for &quot;{query}&quot;</div>
            ) : (
              <div className="py-8 text-center text-slate-400 text-sm">Start typing to search services...</div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
