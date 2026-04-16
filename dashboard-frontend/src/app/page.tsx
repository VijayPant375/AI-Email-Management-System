"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Mail, Clock, CheckCircle2, ArrowRight, Zap } from "lucide-react";

const STATS = [
  {
    label: "Total Emails",
    value: "1,284",
    icon: Mail,
    color: "text-indigo-600",
    bg: "bg-indigo-50",
    border: "border-indigo-100",
  },
  {
    label: "Pending Review",
    value: "38",
    icon: Clock,
    color: "text-amber-600",
    bg: "bg-amber-50",
    border: "border-amber-100",
  },
  {
    label: "Replied",
    value: "1,246",
    icon: CheckCircle2,
    color: "text-emerald-600",
    bg: "bg-emerald-50",
    border: "border-emerald-100",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35 } },
};

export default function Home() {
  return (
    <div className="min-h-full flex flex-col">
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <motion.section
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-indigo-600 via-indigo-500 to-violet-600 px-8 py-14 mb-8"
      >
        {/* Decorative blobs */}
        <div className="absolute -top-12 -right-12 w-64 h-64 bg-white/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-16 -left-8 w-56 h-56 bg-violet-400/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-white text-xs font-medium mb-6">
            <Zap size={11} className="text-yellow-300" />
            Powered by AI
          </div>

          <h1 className="text-4xl font-bold text-white tracking-tight leading-tight">
            AI Email Dashboard
          </h1>
          <p className="mt-3 text-indigo-100 text-base leading-relaxed max-w-md">
            Monitor automated workflows, track sentiment in real time, and manage
            every incoming communication — all in one place.
          </p>

          <div className="mt-8 flex items-center gap-3">
            <Link
              href="/emails"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-indigo-700 text-sm font-semibold shadow-md hover:shadow-lg hover:scale-105 active:scale-100 transition-all duration-150"
            >
              View Emails
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </motion.section>

      {/* ── Stats ─────────────────────────────────────────────────────────── */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 sm:grid-cols-3 gap-4"
      >
        {STATS.map(({ label, value, icon: Icon, color, bg, border }) => (
          <motion.div
            key={label}
            variants={itemVariants}
            whileHover={{ scale: 1.02, y: -2 }}
            className={`bg-white rounded-2xl border ${border} shadow-sm p-6 flex items-center gap-5 cursor-default`}
          >
            <div
              className={`w-11 h-11 rounded-xl ${bg} flex items-center justify-center shrink-0`}
            >
              <Icon size={20} className={color} />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 leading-none">
                {value}
              </p>
              <p className="text-xs text-gray-500 mt-1 font-medium">{label}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* ── Quick tip ─────────────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.4 }}
        className="mt-6 rounded-2xl border border-indigo-100 bg-indigo-50/60 px-6 py-4 flex items-center gap-3"
      >
        <Zap size={14} className="text-indigo-500 shrink-0" />
        <p className="text-xs text-indigo-700">
          <span className="font-semibold">Tip:</span> Click any email row in the
          Emails view to see the full message and AI analysis.
        </p>
      </motion.div>
    </div>
  );
}
