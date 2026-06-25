'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Clock, FolderOpen, Building2, Stethoscope, TrendingUp } from 'lucide-react';

const STATS = [
  {
    value: 15,
    suffix: '+',
    label: 'Years of Excellence',
    unit: 'Years',
    icon: Clock,
    description: 'Decades of trusted healthcare expertise',
  },
  {
    value: 500,
    suffix: '+',
    label: 'Projects Delivered',
    unit: 'Projects',
    icon: FolderOpen,
    description: 'Successfully completed engagements',
  },
  {
    value: 200,
    suffix: '+',
    label: 'Hospitals Served',
    unit: 'Hospitals',
    icon: Building2,
    description: 'Across India and Southeast Asia',
  },
  {
    value: 1000,
    suffix: '+',
    label: 'Doctors Empowered',
    unit: 'Doctors',
    icon: Stethoscope,
    description: 'Medical professionals trained and supported',
  },
  {
    value: 98,
    suffix: '%',
    label: 'Success Rate',
    unit: '',
    icon: TrendingUp,
    description: 'Client satisfaction and project success',
  },
];

function useCountUp(target: number, inView: boolean, duration = 2000) {
  const [count, setCount] = useState(0);
  const frameRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);

  useEffect(() => {
    if (!inView) return;

    startTimeRef.current = null;

    const animate = (timestamp: number) => {
      if (startTimeRef.current === null) {
        startTimeRef.current = timestamp;
      }

      const elapsed = timestamp - startTimeRef.current;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(eased * target);

      setCount(current);

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate);
      } else {
        setCount(target);
      }
    };

    frameRef.current = requestAnimationFrame(animate);

    return () => {
      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [inView, target, duration]);

  return count;
}

function StatCard({
  stat,
  index,
}: {
  stat: (typeof STATS)[number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const count = useCountUp(stat.value, inView, 2000 + index * 200);
  const Icon = stat.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
      transition={{
        duration: 0.7,
        delay: index * 0.12,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="relative group"
    >
      <div
        className="
          relative overflow-hidden rounded-2xl border border-white/10
          bg-white/5 backdrop-blur-md
          px-6 py-7
          flex flex-col gap-4
          hover:bg-white/10 hover:border-teal-400/30
          transition-all duration-500
          shadow-[0_8px_32px_rgba(0,0,0,0.25)]
          hover:shadow-[0_12px_40px_rgba(20,184,166,0.15)]
          hover:-translate-y-1
        "
      >
        <div className="flex items-start justify-between">
          <div
            className="
              p-3 rounded-xl
              bg-teal-400/10 border border-teal-400/20
              group-hover:bg-teal-400/20 group-hover:border-teal-400/40
              transition-all duration-300
            "
          >
            <Icon className="w-6 h-6 text-teal-300" strokeWidth={1.5} />
          </div>
          <div className="w-8 h-8 rounded-full bg-teal-400/5 border border-teal-400/10 flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-teal-400/50 group-hover:bg-teal-300 transition-colors duration-300" />
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <div className="flex items-end gap-0.5">
            <span className="text-4xl font-bold text-white tabular-nums leading-none tracking-tight">
              {count.toLocaleString()}
            </span>
            <span className="text-2xl font-semibold text-teal-300 leading-none mb-0.5">
              {stat.suffix}
            </span>
          </div>
          {stat.unit && (
            <span className="text-xs font-semibold uppercase tracking-widest text-teal-400/70">
              {stat.unit}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-1 border-t border-white/5 pt-4">
          <p className="text-sm font-semibold text-white/90 leading-snug">
            {stat.label}
          </p>
          <p className="text-xs text-white/40 leading-relaxed">
            {stat.description}
          </p>
        </div>

        <div
          className="
            absolute inset-x-0 bottom-0 h-0.5
            bg-gradient-to-r from-transparent via-teal-400/50 to-transparent
            opacity-0 group-hover:opacity-100
            transition-opacity duration-500
          "
        />
      </div>
    </motion.div>
  );
}

export default function StatsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingInView = useInView(sectionRef, { once: true, margin: '-60px' });

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-gradient-to-br from-[#0a2a2a] via-[#0d3535] to-[#071e1e] py-24 md:py-32"
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full border border-teal-500/10" />
        <div className="absolute -top-16 -left-16 w-[350px] h-[350px] rounded-full border border-teal-500/5" />
        <div className="absolute top-1/2 -right-48 w-[600px] h-[600px] rounded-full border border-cyan-400/8" />
        <div className="absolute bottom-0 left-1/3 w-[400px] h-[400px] rounded-full border border-teal-400/5" />

        <div
          className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full opacity-20"
          style={{
            background:
              'radial-gradient(circle, rgba(20,184,166,0.3) 0%, transparent 70%)',
            filter: 'blur(60px)',
          }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full opacity-15"
          style={{
            background:
              'radial-gradient(circle, rgba(6,182,212,0.25) 0%, transparent 70%)',
            filter: 'blur(80px)',
          }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-10"
          style={{
            background:
              'radial-gradient(circle, rgba(20,184,166,0.2) 0%, transparent 60%)',
            filter: 'blur(100px)',
          }}
        />

        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(20,184,166,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(20,184,166,0.8) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={headingInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-teal-400/20 bg-teal-400/5 mb-5">
            <div className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
            <span className="text-xs font-semibold uppercase tracking-widest text-teal-300">
              Our Impact
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight mb-4">
            Numbers That{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 to-cyan-300">
              Define Us
            </span>
          </h2>
          <p className="text-white/50 text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
            Two decades of measurable outcomes across India's healthcare landscape.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 md:gap-5 mb-16">
          {STATS.map((stat, index) => (
            <StatCard key={stat.label} stat={stat} index={index} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={headingInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.7, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="
            relative mx-auto max-w-3xl
            rounded-2xl border border-white/8
            bg-white/4 backdrop-blur-sm
            px-8 py-8
            text-center
          "
        >
          <div
            className="absolute inset-x-0 top-0 h-px"
            style={{
              background:
                'linear-gradient(90deg, transparent, rgba(20,184,166,0.4), transparent)',
            }}
            aria-hidden="true"
          />
          <p className="text-base sm:text-lg text-white/65 leading-relaxed">
            <span className="font-semibold text-white/90">Why trust FeedIndia Healthcare?</span>{' '}
            Our track record speaks through every project we have delivered. From rural primary
            health centres to multi-speciality urban hospitals, we bring clinical intelligence,
            operational rigour, and human-centred design to every engagement — earning the
            confidence of over{' '}
            <span className="text-teal-300 font-semibold">200 healthcare institutions</span> and{' '}
            <span className="text-teal-300 font-semibold">1,000+ medical professionals</span>{' '}
            who rely on us to transform how care is delivered.
          </p>
          <div
            className="absolute inset-x-0 bottom-0 h-px"
            style={{
              background:
                'linear-gradient(90deg, transparent, rgba(6,182,212,0.3), transparent)',
            }}
            aria-hidden="true"
          />
        </motion.div>
      </div>
    </section>
  );
}
