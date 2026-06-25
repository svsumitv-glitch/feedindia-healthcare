'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useTransform, animate } from 'framer-motion'
import { gsap } from 'gsap'
import { Calendar, MessageCircle, ArrowDown, Shield, Award, Star, TrendingUp, Users, Building2, CheckCircle2, Sparkles, Play } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

/* ─── Animated counter ─────────────────────────────────────── */
function Counter({ to, suffix = '', duration = 2 }: { to: number; suffix?: string; duration?: number }) {
  const count = useMotionValue(0)
  const rounded = useTransform(count, (v) => Math.round(v).toLocaleString())
  const [display, setDisplay] = useState('0')

  useEffect(() => {
    const controls = animate(count, to, {
      duration,
      ease: 'easeOut',
      delay: 0.5,
      onUpdate: (v) => setDisplay(Math.round(v).toLocaleString()),
    })
    return controls.stop
  }, [to, duration, count])

  return (
    <motion.span>
      {display}
      {suffix}
    </motion.span>
  )
}

/* ─── Stats data ─────────────────────────────────────────────── */
const HERO_STATS = [
  { value: 500, suffix: '+', label: 'Projects Done', icon: CheckCircle2, color: 'from-teal-500 to-cyan-500' },
  { value: 200, suffix: '+', label: 'Hospitals', icon: Building2, color: 'from-violet-500 to-purple-600' },
  { value: 1000, suffix: '+', label: 'Doctors Placed', icon: Users, color: 'from-orange-500 to-amber-500' },
  { value: 98, suffix: '%', label: 'Success Rate', icon: TrendingUp, color: 'from-emerald-500 to-green-500' },
]

/* ─── Trust badges ───────────────────────────────────────────── */
const BADGES = [
  { icon: Shield, label: 'NABH Certified Partner', color: 'bg-teal-500' },
  { icon: Award, label: 'ISO 9001:2015', color: 'bg-violet-500' },
  { icon: Star, label: '4.9 ★ Rated', color: 'bg-amber-500' },
]

/* ─── Hero images — reliable Unsplash IDs ───────────────────── */
const HERO_IMAGE = 'https://images.unsplash.com/photo-1551601651-2a8555bfb10d?w=900&q=85&auto=format&fit=crop'
const DOCTOR_THUMB = 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=120&q=80&auto=format&fit=crop'

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const headlineRef = useRef<HTMLDivElement>(null)
  const subRef = useRef<HTMLParagraphElement>(null)
  const badgesRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      tl.from(headlineRef.current, { y: 50, opacity: 0, duration: 0.9 })
        .from(subRef.current, { y: 30, opacity: 0, duration: 0.7 }, '-=0.5')
        .from(badgesRef.current, { y: 20, opacity: 0, duration: 0.6 }, '-=0.4')
        .from(ctaRef.current, { y: 20, opacity: 0, duration: 0.6 }, '-=0.4')
        .from(imageRef.current, { x: 60, opacity: 0, duration: 1, ease: 'power2.out' }, '-=0.9')
        .from(statsRef.current?.querySelectorAll('.stat-card') ?? [], {
          y: 30, opacity: 0, duration: 0.5, stagger: 0.1,
        }, '-=0.6')
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-[#030C17]"
    >
      {/* ── Background layers ─────────────────────────── */}
      {/* Base image tint */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1600&q=60&auto=format&fit=crop"
          alt=""
          fill
          priority
          className="object-cover opacity-10"
          sizes="100vw"
        />
        {/* Gradient vignette */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#030C17] via-slate-900/90 to-[#030C17]" />
      </div>

      {/* Glow orbs */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-40 -left-40 w-[700px] h-[700px] rounded-full bg-teal-600/20 blur-[120px]"
        />
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          className="absolute -bottom-40 -right-20 w-[600px] h-[600px] rounded-full bg-cyan-500/15 blur-[100px]"
        />
        <motion.div
          animate={{ x: [0, 30, 0], opacity: [0.15, 0.25, 0.15] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          className="absolute top-1/3 left-1/2 w-[400px] h-[400px] rounded-full bg-violet-600/10 blur-[80px]"
        />
        {/* Fine grid */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      {/* ── Main content ──────────────────────────────── */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-28 pb-16 lg:pt-32 lg:pb-20">
        <div className="grid lg:grid-cols-[1fr_480px] xl:grid-cols-[1fr_540px] gap-12 xl:gap-16 items-center">

          {/* ── LEFT: Text ──────────────────────────────── */}
          <div className="flex flex-col gap-7">

            {/* Eyebrow badge */}
            <div ref={badgesRef} className="flex flex-wrap gap-2">
              {BADGES.map(({ icon: Icon, label, color }) => (
                <span
                  key={label}
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm text-xs font-semibold text-white/80"
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${color}`} />
                  <Icon className="w-3.5 h-3.5 opacity-70" />
                  {label}
                </span>
              ))}
            </div>

            {/* Headline */}
            <div ref={headlineRef}>
              <div className="flex items-center gap-3 mb-4">
                <Sparkles className="w-5 h-5 text-teal-400" />
                <span className="text-sm font-semibold tracking-[0.18em] uppercase text-teal-400">
                  India&apos;s Premier Healthcare Consultancy
                </span>
              </div>
              <h1 className="font-display text-[clamp(2.4rem,5vw,4rem)] font-extrabold leading-[1.08] tracking-tight text-white">
                Transforming{' '}
                <span
                  className="relative inline-block"
                  style={{
                    backgroundImage: 'linear-gradient(135deg, #2dd4bf 0%, #06b6d4 40%, #818cf8 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  Healthcare
                  <span
                    className="absolute -bottom-1.5 left-0 w-full h-[3px] rounded-full"
                    style={{ background: 'linear-gradient(90deg, #2dd4bf, #06b6d4, #818cf8)' }}
                  />
                </span>
                <br />
                <span className="text-white/90">Building Excellence</span>
              </h1>
            </div>

            {/* Subtitle */}
            <p ref={subRef} className="text-base sm:text-lg text-slate-400 leading-relaxed max-w-xl">
              End-to-end consultancy for NABH accreditation, hospital licensing, medical equipment, recruitment, and digital transformation — trusted by{' '}
              <span className="text-teal-300 font-semibold">200+ hospitals across 15+ states</span>.
            </p>

            {/* CTA row */}
            <div ref={ctaRef} className="flex flex-wrap items-center gap-3 pt-1">
              <Link
                href="/#contact"
                className="group relative inline-flex items-center gap-2.5 px-7 py-3.5 rounded-2xl bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-bold text-sm sm:text-base overflow-hidden shadow-lg shadow-teal-500/30 hover:shadow-teal-500/50 hover:-translate-y-0.5 transition-all duration-200"
              >
                <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                <Calendar className="w-5 h-5" />
                Book Free Consultation
              </Link>

              <Link
                href="/#services"
                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-2xl border border-white/15 bg-white/5 backdrop-blur-sm text-white font-semibold text-sm sm:text-base hover:bg-white/10 hover:-translate-y-0.5 transition-all duration-200"
              >
                Explore Services
              </Link>

              <a
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-300 font-semibold text-sm hover:bg-emerald-500/20 hover:-translate-y-0.5 transition-all duration-200"
              >
                <MessageCircle className="w-5 h-5" />
                WhatsApp
              </a>
            </div>

            {/* Social proof strip */}
            <div className="flex items-center gap-4 pt-2">
              <div className="flex -space-x-2.5">
                {[
                  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=48&q=80&auto=format&fit=crop&face',
                  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=48&q=80&auto=format&fit=crop&face',
                  'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=48&q=80&auto=format&fit=crop&face',
                  DOCTOR_THUMB,
                ].map((src, i) => (
                  <Image
                    key={i}
                    src={src}
                    alt="Client"
                    width={36}
                    height={36}
                    className="w-9 h-9 rounded-full border-2 border-slate-900 object-cover"
                  />
                ))}
              </div>
              <div>
                <div className="flex gap-0.5 mb-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-xs text-slate-400">
                  <span className="text-white font-semibold">4.9/5</span> from 200+ hospital partners
                </p>
              </div>
            </div>
          </div>

          {/* ── RIGHT: Image card ────────────────────────── */}
          <div ref={imageRef} className="relative">
            {/* Main image card */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-black/60 border border-white/10">
              <Image
                src={HERO_IMAGE}
                alt="Healthcare professional at work"
                width={540}
                height={620}
                priority
                className="object-cover w-full h-[500px] sm:h-[560px]"
                sizes="(max-width: 1024px) 100vw, 540px"
              />
              {/* Image gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />

              {/* Bottom glassmorphism bar inside image */}
              <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-slate-950/80 to-transparent backdrop-blur-[2px]">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-teal-300 font-semibold uppercase tracking-wider mb-0.5">Currently Active</p>
                    <p className="text-white font-bold">Live Project: AIIMS Expansion</p>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-500/20 border border-teal-500/30">
                    <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
                    <span className="text-teal-300 text-xs font-semibold">In Progress</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating glass card: Years */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -top-5 -left-5 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl px-5 py-4 shadow-xl"
            >
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-500 shadow-lg">
                  <Award className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-extrabold text-white leading-none">15+</p>
                  <p className="text-xs text-white/60 mt-0.5 font-medium">Years of Excellence</p>
                </div>
              </div>
            </motion.div>

            {/* Floating glass card: Success */}
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              className="absolute -bottom-5 -right-5 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl px-5 py-4 shadow-xl"
            >
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-gradient-to-br from-emerald-500 to-green-500 shadow-lg">
                  <TrendingUp className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-extrabold text-white leading-none">98%</p>
                  <p className="text-xs text-white/60 mt-0.5 font-medium">NABH Success Rate</p>
                </div>
              </div>
            </motion.div>

            {/* Floating play button: Case study */}
            <motion.button
              animate={{ scale: [1, 1.06, 1] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
              className="absolute top-1/2 -translate-y-1/2 -right-5 flex items-center justify-center w-14 h-14 rounded-2xl bg-white/15 backdrop-blur-xl border border-white/25 shadow-xl hover:bg-white/25 transition-colors"
              aria-label="Watch case study"
            >
              <Play className="w-5 h-5 text-white fill-white ml-0.5" />
            </motion.button>
          </div>
        </div>

        {/* ── Stats row ──────────────────────────────────── */}
        <div
          ref={statsRef}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-14 lg:mt-16"
        >
          {HERO_STATS.map(({ value, suffix, label, icon: Icon, color }, i) => (
            <div
              key={label}
              className={`stat-card group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm px-6 py-5 hover:bg-white/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/30`}
            >
              {/* Gradient accent line */}
              <div className={`absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r ${color} opacity-60`} />

              <div className="flex items-start justify-between mb-3">
                <div className={`p-2 rounded-xl bg-gradient-to-br ${color} bg-opacity-20 shadow-md`}>
                  <Icon className="w-4 h-4 text-white" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-white/30">0{i + 1}</span>
              </div>

              <p className="text-3xl font-extrabold text-white tracking-tight">
                <Counter to={value} suffix={suffix} duration={1.8} />
              </p>
              <p className="text-xs font-medium text-slate-400 mt-1">{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Scroll indicator ─────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1.5 text-white/30"
      >
        <span className="text-[10px] font-semibold tracking-[0.2em] uppercase">Scroll</span>
        <motion.div animate={{ y: [0, 7, 0] }} transition={{ repeat: Infinity, duration: 1.6 }}>
          <ArrowDown className="w-4 h-4" />
        </motion.div>
      </motion.div>
    </section>
  )
}
