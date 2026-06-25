"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import {
  MessageSquare,
  ClipboardList,
  FileText,
  CheckSquare,
  Zap,
  HeartHandshake,
  LucideIcon,
} from "lucide-react";
import { PROCESS_STEPS } from "@/constants";

const ICON_MAP: Record<string, LucideIcon> = {
  MessageCircle: MessageSquare,
  ClipboardList,
  FileText,
  CheckSquare,
  Zap,
  LifeBuoy: HeartHandshake,
  "Initial Consultation": MessageSquare,
  "Planning & Proposal": ClipboardList,
  Documentation: FileText,
  "Review & Approval": CheckSquare,
  Execution: Zap,
  "Ongoing Support": HeartHandshake,
};

/* ── Extracted card component so hooks aren't called inside map ── */
function DesktopStepCard({
  step,
  index,
}: {
  step: (typeof PROCESS_STEPS)[number];
  index: number;
}) {
  const Icon = ICON_MAP[step.icon] ?? ICON_MAP[step.title] ?? MessageSquare;
  const isTeal = index % 2 === 0;
  const cardRef = useRef<HTMLDivElement>(null);
  const cardInView = useInView(cardRef, { once: true, margin: "-80px" });

  return (
    <div
      className="flex flex-col items-center"
      style={{ flexDirection: index % 2 === 0 ? "column-reverse" : "column" }}
    >
      <motion.div
        ref={cardRef}
        initial={{ opacity: 0, y: index % 2 === 0 ? -40 : 40 }}
        animate={cardInView ? { opacity: 1, y: 0 } : { opacity: 0, y: index % 2 === 0 ? -40 : 40 }}
        transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
        className={`w-full rounded-2xl border border-gray-800 bg-gray-900 p-5 shadow-lg ${
          isTeal ? "shadow-teal-500/10" : "shadow-cyan-500/10"
        } mb-6 mt-6`}
      >
        <span
          className={`mb-3 inline-block bg-gradient-to-r ${
            isTeal ? "from-teal-400 to-teal-600" : "from-cyan-400 to-cyan-600"
          } bg-clip-text text-xs font-bold text-transparent`}
        >
          STEP {String(index + 1).padStart(2, "0")}
        </span>
        <div
          className={`mb-3 flex h-10 w-10 items-center justify-center rounded-xl ${
            isTeal ? "bg-teal-500/20 text-teal-400" : "bg-cyan-500/20 text-cyan-400"
          }`}
        >
          <Icon className="h-5 w-5" />
        </div>
        <h3 className="mb-1 text-sm font-semibold text-white">{step.title}</h3>
        <p className="text-xs text-gray-400 leading-relaxed">{step.description}</p>
      </motion.div>

      <div
        className={`z-10 flex h-4 w-4 items-center justify-center rounded-full border-2 ${
          isTeal
            ? "border-teal-400 bg-teal-500/30 shadow-[0_0_8px_2px_rgba(20,184,166,0.4)]"
            : "border-cyan-400 bg-cyan-500/30 shadow-[0_0_8px_2px_rgba(6,182,212,0.4)]"
        }`}
      />
    </div>
  );
}

function MobileStepCard({
  step,
  index,
  lineInView,
}: {
  step: (typeof PROCESS_STEPS)[number];
  index: number;
  lineInView: boolean;
}) {
  const Icon = ICON_MAP[step.icon] ?? ICON_MAP[step.title] ?? MessageSquare;
  const isTeal = index % 2 === 0;
  const rowRef = useRef<HTMLDivElement>(null);
  const rowInView = useInView(rowRef, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={rowRef}
      initial={{ opacity: 0, x: -30 }}
      animate={rowInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
      transition={{ duration: 0.55, delay: index * 0.08, ease: "easeOut" }}
      className="relative mb-8 flex items-start gap-4"
    >
      <div
        className={`absolute -left-[1.85rem] flex h-8 w-8 items-center justify-center rounded-full border-2 ${
          isTeal
            ? "border-teal-400 bg-gray-950 shadow-[0_0_10px_2px_rgba(20,184,166,0.35)] text-teal-400"
            : "border-cyan-400 bg-gray-950 shadow-[0_0_10px_2px_rgba(6,182,212,0.35)] text-cyan-400"
        }`}
      >
        <Icon className="h-4 w-4" />
      </div>
      <div
        className={`w-full rounded-2xl border border-gray-800 bg-gray-900 p-5 shadow-lg ${
          isTeal ? "shadow-teal-500/10" : "shadow-cyan-500/10"
        }`}
      >
        <span
          className={`mb-2 inline-block bg-gradient-to-r ${
            isTeal ? "from-teal-400 to-teal-600" : "from-cyan-400 to-cyan-600"
          } bg-clip-text text-xs font-bold text-transparent`}
        >
          STEP {String(index + 1).padStart(2, "0")}
        </span>
        <h3 className="mb-1 text-sm font-semibold text-white">{step.title}</h3>
        <p className="text-xs text-gray-400 leading-relaxed">{step.description}</p>
      </div>
    </motion.div>
  );
}

export default function ProcessSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const lineInView = useInView(lineRef, { once: true, margin: "-60px" });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const blobY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <section ref={sectionRef} className="relative overflow-hidden py-24 bg-gray-950">
      <motion.div style={{ y: blobY }} className="pointer-events-none absolute inset-0 z-0" aria-hidden>
        <div className="absolute -top-40 left-1/4 h-96 w-96 rounded-full bg-teal-500/10 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 h-80 w-80 rounded-full bg-cyan-500/10 blur-3xl" />
      </motion.div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase border border-teal-400/20 bg-teal-400/5 text-teal-300 mb-4">
            How We Work
          </span>
          <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Our{" "}
            <span className="bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">
              Process
            </span>
          </h2>
          <p className="mt-4 text-lg text-gray-400 max-w-xl mx-auto">
            A clear, guided journey from first contact to ongoing care.
          </p>
        </div>

        {/* Desktop layout */}
        <div className="hidden lg:block">
          <div ref={lineRef} className="relative flex items-center">
            <div className="absolute inset-x-0 top-1/2 h-0.5 -translate-y-1/2 overflow-hidden bg-gray-800">
              <motion.div
                initial={{ scaleX: 0 }}
                animate={lineInView ? { scaleX: 1 } : { scaleX: 0 }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
                style={{ originX: 0 }}
                className="h-full w-full bg-gradient-to-r from-teal-500 to-cyan-500"
              />
            </div>
            <div className="relative grid w-full grid-cols-6 gap-4">
              {PROCESS_STEPS.map((step, index) => (
                <DesktopStepCard key={step.title} step={step} index={index} />
              ))}
            </div>
          </div>
        </div>

        {/* Mobile layout */}
        <div className="lg:hidden">
          <div ref={lineRef} className="relative pl-10">
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-800">
              <motion.div
                initial={{ scaleY: 0 }}
                animate={lineInView ? { scaleY: 1 } : { scaleY: 0 }}
                transition={{ duration: 1.4, ease: "easeInOut" }}
                style={{ originY: 0 }}
                className="h-full w-full bg-gradient-to-b from-teal-500 to-cyan-500"
              />
            </div>
            {PROCESS_STEPS.map((step, index) => (
              <MobileStepCard key={step.title} step={step} index={index} lineInView={lineInView} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
