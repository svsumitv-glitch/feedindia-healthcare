'use client'

import { useRef, useCallback, useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { motion } from 'framer-motion'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import Image from 'next/image'
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react'
import { TESTIMONIALS } from '@/constants'
import { cn } from '@/lib/utils'

export default function TestimonialsSection() {
  const autoplayRef = useRef(Autoplay({ delay: 4500, stopOnInteraction: true }))
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: 'start', slidesToScroll: 1 },
    [autoplayRef.current]
  )
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([])
  const [sectionRef, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    setScrollSnaps(emblaApi.scrollSnapList())
    emblaApi.on('select', onSelect)
    onSelect()
    return () => { emblaApi.off('select', onSelect) }
  }, [emblaApi, onSelect])

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])

  return (
    <section ref={sectionRef} className="py-20 lg:py-28 bg-slate-50 dark:bg-slate-800/40 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold bg-teal-100 dark:bg-teal-900/40 text-teal-700 dark:text-teal-300 mb-4">
            Client Testimonials
          </span>
          <h2 className="text-3xl lg:text-4xl font-extrabold text-slate-800 dark:text-white mb-4">
            Trusted by Healthcare Leaders
          </h2>
          <p className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
            Hear from hospital directors, founders, and healthcare professionals who have transformed their institutions with FeedIndia.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          {/* Carousel */}
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-6">
              {TESTIMONIALS.map((t) => (
                <div
                  key={t.id}
                  className="flex-[0_0_100%] sm:flex-[0_0_50%] lg:flex-[0_0_33.333%] min-w-0"
                >
                  <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-md border border-gray-100 dark:border-slate-700 h-full flex flex-col">
                    <Quote className="w-8 h-8 text-teal-200 dark:text-teal-800 mb-4" fill="currentColor" />

                    {/* Stars */}
                    <div className="flex gap-1 mb-4">
                      {Array.from({ length: t.rating }).map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-amber-400" fill="currentColor" />
                      ))}
                    </div>

                    <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed italic flex-1 mb-6">
                      &ldquo;{t.content}&rdquo;
                    </p>

                    <div className="flex items-center gap-3 pt-4 border-t border-gray-100 dark:border-slate-700">
                      <div className="relative w-11 h-11 rounded-full overflow-hidden shrink-0">
                        <Image src={t.image} alt={t.name} fill className="object-cover" />
                      </div>
                      <div>
                        <div className="font-bold text-slate-800 dark:text-white text-sm">{t.name}</div>
                        <div className="text-xs text-slate-500 dark:text-slate-400">{t.role}</div>
                        <div className="text-xs text-teal-600 dark:text-teal-400 font-medium">{t.company}</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={scrollPrev}
              aria-label="Previous testimonial"
              className="w-10 h-10 rounded-full bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 flex items-center justify-center hover:bg-teal-50 dark:hover:bg-teal-900/30 hover:border-teal-400 transition-colors shadow-sm"
            >
              <ChevronLeft className="w-4 h-4 text-slate-600 dark:text-slate-300" />
            </button>

            <div className="flex gap-2">
              {scrollSnaps.map((_, i) => (
                <button
                  key={i}
                  onClick={() => emblaApi?.scrollTo(i)}
                  aria-label={`Go to slide ${i + 1}`}
                  className={cn(
                    'h-2 rounded-full transition-all',
                    i === selectedIndex ? 'bg-teal-500 w-6' : 'bg-gray-300 dark:bg-slate-600 w-2'
                  )}
                />
              ))}
            </div>

            <button
              onClick={scrollNext}
              aria-label="Next testimonial"
              className="w-10 h-10 rounded-full bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 flex items-center justify-center hover:bg-teal-50 dark:hover:bg-teal-900/30 hover:border-teal-400 transition-colors shadow-sm"
            >
              <ChevronRight className="w-4 h-4 text-slate-600 dark:text-slate-300" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
