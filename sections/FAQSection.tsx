'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { ChevronDown, MessageCircle, Phone, MessageSquare } from 'lucide-react';
import { FAQS } from '@/constants';

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });

  const toggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <section
      ref={sectionRef}
      className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gray-950 overflow-hidden"
      id="faq"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(20,184,166,0.06),transparent_60%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-14"
        >
          <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-teal-400 mb-3">
            FAQ
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            Frequently Asked Questions
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-16 items-start">
          <motion.div
            className="lg:col-span-2"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
          >
            {FAQS.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className={`border-b border-gray-800 transition-all duration-300 ${
                    isOpen ? 'border-l-2 border-l-teal-500 pl-4' : 'pl-0'
                  }`}
                >
                  <button
                    onClick={() => toggle(index)}
                    className="w-full flex items-center justify-between gap-4 py-5 text-left group focus:outline-none"
                    aria-expanded={isOpen}
                  >
                    <span
                      className={`text-base font-semibold transition-colors duration-200 ${
                        isOpen ? 'text-teal-400' : 'text-white group-hover:text-teal-300'
                      }`}
                    >
                      {faq.question}
                    </span>
                    <motion.span
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className={`flex-shrink-0 transition-colors duration-200 ${
                        isOpen ? 'text-teal-400' : 'text-gray-400 group-hover:text-teal-400'
                      }`}
                    >
                      <ChevronDown size={20} />
                    </motion.span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="answer"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                        style={{ overflow: 'hidden' }}
                      >
                        <p className="pb-5 text-sm leading-relaxed text-gray-400">
                          {faq.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-1"
          >
            <div className="relative rounded-2xl p-6 overflow-hidden border border-teal-500/20 bg-gradient-to-br from-teal-900/30 via-gray-900/60 to-gray-900/80 backdrop-blur-sm">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(20,184,166,0.15),transparent_70%)] pointer-events-none" />

              <div className="relative z-10">
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-teal-500/10 border border-teal-500/20 mb-5">
                  <MessageCircle className="text-teal-400" size={22} />
                </div>

                <h3 className="text-lg font-bold text-white mb-2">
                  Still have questions?
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed mb-6">
                  Can't find the answer you're looking for? Our support team is ready to help you.
                </p>

                <a
                  href="mailto:support@example.com"
                  className="flex items-center justify-center gap-2 w-full py-3 px-5 rounded-xl bg-teal-500 hover:bg-teal-400 active:scale-[0.98] transition-all duration-200 text-sm font-semibold text-gray-950 mb-4"
                >
                  <MessageCircle size={16} />
                  Contact Support
                </a>

                <div className="flex flex-col gap-3 pt-4 border-t border-gray-700/50">
                  <a
                    href="tel:+1800000000"
                    className="flex items-center gap-3 text-sm text-gray-300 hover:text-teal-400 transition-colors duration-200 group"
                  >
                    <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-gray-800 group-hover:bg-teal-900/40 border border-gray-700 group-hover:border-teal-500/30 transition-all duration-200">
                      <Phone size={14} className="text-gray-400 group-hover:text-teal-400" />
                    </span>
                    <span>+1 800 000 0000</span>
                  </a>

                  <a
                    href="https://wa.me/1800000000"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-sm text-gray-300 hover:text-teal-400 transition-colors duration-200 group"
                  >
                    <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-gray-800 group-hover:bg-teal-900/40 border border-gray-700 group-hover:border-teal-500/30 transition-all duration-200">
                      <MessageSquare size={14} className="text-gray-400 group-hover:text-teal-400" />
                    </span>
                    <span>Chat on WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
