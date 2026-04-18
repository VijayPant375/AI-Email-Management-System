"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Mail, Clock, CheckCircle2, ArrowRight, Zap, Loader2 } from "lucide-react";
import type { Email } from "@/types/email";

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
  const [emails, setEmails] = useState<Email[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchEmails() {
      try {
        const res = await fetch("/api/emails");
        if (res.ok) {
          const data = await res.json();
          setEmails(data);
        }
      } catch (err) {
        console.error("Failed to fetch emails for stats", err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchEmails();
  }, []);

  const totalEmails = emails.length;
  const repliedEmails = emails.filter((e) => e.response_sent).length;
  const pendingEmails = emails.filter((e) => !e.response_sent).length;

  const STATS = [
    {
      label: "Total Emails",
      value: totalEmails.toLocaleString(),
      icon: Mail,
      color: "text-indigo-600 dark:text-indigo-400",
      bg: "bg-indigo-50 dark:bg-indigo-900/30",
      border: "border-indigo-100 dark:border-indigo-800/40",
    },
    {
      label: "Pending Review",
      value: pendingEmails.toLocaleString(),
      icon: Clock,
      color: "text-amber-600 dark:text-amber-400",
      bg: "bg-amber-50 dark:bg-amber-900/30",
      border: "border-amber-100 dark:border-amber-800/40",
    },
    {
      label: "Replied",
      value: repliedEmails.toLocaleString(),
      icon: CheckCircle2,
      color: "text-emerald-600 dark:text-emerald-400",
      bg: "bg-emerald-50 dark:bg-emerald-900/30",
      border: "border-emerald-100 dark:border-emerald-800/40",
    },
  ];

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
            className={`bg-white dark:bg-[var(--sidebar-bg)] rounded-2xl border ${border} shadow-sm p-6 flex items-center gap-5 cursor-default transition-colors duration-200`}
          >
            <div
              className={`w-11 h-11 rounded-xl ${bg} flex items-center justify-center shrink-0 transition-colors duration-200`}
            >
              <Icon size={20} className={color} />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100 leading-none flex items-center gap-2">
                {isLoading ? <Loader2 size={18} className="animate-spin text-gray-400 dark:text-gray-600" /> : value}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 font-medium">{label}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* ── Quick tip ─────────────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.4 }}
        className="mt-6 rounded-2xl border border-indigo-100 dark:border-indigo-900/50 bg-indigo-50/60 dark:bg-indigo-900/20 px-6 py-4 flex items-center gap-3 transition-colors duration-200"
      >
        <Zap size={14} className="text-indigo-500 dark:text-indigo-400 shrink-0" />
        <p className="text-xs text-indigo-700 dark:text-indigo-300">
          <span className="font-semibold text-indigo-800 dark:text-indigo-200">Tip:</span> Click any email row in the
          Emails view to see the full message and AI analysis.
        </p>
      </motion.div>
    </div>
  );
}
