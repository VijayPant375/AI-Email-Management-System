"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Mail, Clock, CheckCircle2, ArrowRight, Zap, Loader2, Send } from "lucide-react";
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

  // Test Classification State
  const [testEmailBody, setTestEmailBody] = useState("");
  const [isClassifying, setIsClassifying] = useState(false);
  const [testResult, setTestResult] = useState<string | null>(null);
  const [testError, setTestError] = useState<string | null>(null);
  const [dbError, setDbError] = useState<string | null>(null);

  const fetchEmails = async () => {
    setIsLoading(true);
    setDbError(null);
    try {
      const res = await fetch("/api/emails");
      if (res.ok) {
        const data = await res.json();
        setEmails(data);
      } else {
        setDbError("Unable to connect to the database. Make sure PostgreSQL is running.");
      }
    } catch (err) {
      console.error("Failed to fetch emails for stats", err);
      setDbError("Network error: Could not reach the API.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEmails();
  }, []);

  const totalEmails = emails.length;
  const manualReviewQueue = emails.filter((e) => e.manual_review_flag).length;
  const repliedEmails = emails.filter((e) => e.response_sent).length;

  // Breakdown by category
  const categoriesCount = emails.reduce((acc, email) => {
    const cat = email.category || "Uncategorized";
    acc[cat] = (acc[cat] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const handleTestClassification = async () => {
    if (!testEmailBody.trim()) return;
    setIsClassifying(true);
    setTestResult(null);
    setTestError(null);

    try {
      const res = await fetch("/api/classify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ emailBody: testEmailBody }),
      });
      const data = await res.json();
      if (res.ok) {
        setTestResult(data.category);
      } else {
        setTestError(data.error || "Failed to classify");
      }
    } catch (err) {
      setTestError("Network error occurred.");
    } finally {
      setIsClassifying(false);
    }
  };

  const STATS = [
    {
      label: "Total Processed",
      value: totalEmails.toLocaleString(),
      icon: Mail,
      color: "text-indigo-600 dark:text-indigo-400",
      bg: "bg-indigo-50 dark:bg-indigo-900/30",
      border: "border-indigo-100 dark:border-indigo-800/40",
    },
    {
      label: "Manual Review",
      value: manualReviewQueue.toLocaleString(),
      icon: Clock,
      color: "text-amber-600 dark:text-amber-400",
      bg: "bg-amber-50 dark:bg-amber-900/30",
      border: "border-amber-100 dark:border-amber-800/40",
    },
    {
      label: "Auto-Replied",
      value: repliedEmails.toLocaleString(),
      icon: CheckCircle2,
      color: "text-emerald-600 dark:text-emerald-400",
      bg: "bg-emerald-50 dark:bg-emerald-900/30",
      border: "border-emerald-100 dark:border-emerald-800/40",
    },
  ];

  return (
    <div className="min-h-full flex flex-col gap-6 pb-12">
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <motion.section
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-indigo-600 via-indigo-500 to-violet-600 px-8 py-14"
      >
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
            Monitor automated workflows, view AI classifications, and manage every incoming communication.
          </p>

          <div className="mt-8 flex items-center gap-3">
            <Link
              href="/emails"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-indigo-700 text-sm font-semibold shadow-md hover:shadow-lg hover:scale-105 active:scale-100 transition-all duration-150"
            >
              View Emails Queue
              <ArrowRight size={15} />
            </Link>
            <button
              onClick={fetchEmails}
              disabled={isLoading}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-500/20 text-white border border-indigo-400/30 text-sm font-semibold hover:bg-indigo-500/30 transition-all duration-150"
            >
              Refresh Stats
              <Loader2 size={15} className={isLoading ? "animate-spin" : ""} />
            </button>
          </div>
        </div>
      </motion.section>

      {dbError && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/50 rounded-2xl p-4 text-red-600 dark:text-red-400 text-sm font-medium flex items-center gap-3"
        >
          <Zap size={18} className="text-red-500" />
          {dbError}
        </motion.div>
      )}

      {/* ── Stats ─────────────────────────────────────────────────────────── */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 sm:grid-cols-3 gap-6"
      >
        {STATS.map(({ label, value, icon: Icon, color, bg, border }) => (
          <motion.div
            key={label}
            variants={itemVariants}
            whileHover={{ scale: 1.02, y: -4 }}
            className={`bg-white/80 dark:bg-[#1a1d27]/80 backdrop-blur-md rounded-3xl border border-gray-100 dark:border-white/5 shadow-xl shadow-gray-200/20 dark:shadow-black/40 p-6 flex items-center gap-5 cursor-default transition-all duration-300`}
          >
            <div
              className={`w-14 h-14 rounded-2xl ${bg} flex items-center justify-center shrink-0 shadow-inner`}
            >
              <Icon size={24} className={color} />
            </div>
            <div>
              <p className="text-3xl font-extrabold text-gray-900 dark:text-white leading-none flex items-center gap-2 tracking-tight">
                {isLoading ? <Loader2 size={24} className="animate-spin text-gray-400 dark:text-gray-600" /> : value}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 font-semibold tracking-wide uppercase">{label}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* ── Category Breakdown & Test Classifier ───────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-2"
      >
        {/* Category Breakdown */}
        <div className="bg-white/80 dark:bg-[#1a1d27]/80 backdrop-blur-md rounded-3xl border border-gray-100 dark:border-white/5 p-6 shadow-xl shadow-gray-200/20 dark:shadow-black/40">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
            <div className="p-2 bg-indigo-500/10 rounded-lg">
              <Zap size={20} className="text-indigo-500" />
            </div>
            Classification Breakdown
          </h2>
          {isLoading ? (
            <div className="flex justify-center items-center h-32">
              <Loader2 className="animate-spin text-indigo-500" size={24} />
            </div>
          ) : (
            <div className="space-y-4">
              {Object.entries(categoriesCount).map(([cat, count]) => {
                const percentage = totalEmails > 0 ? ((count / totalEmails) * 100).toFixed(1) : "0";
                return (
                  <div key={cat}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-medium text-gray-700 dark:text-gray-300">{cat}</span>
                      <span className="text-gray-500">{count} ({percentage}%)</span>
                    </div>
                    <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-2">
                      <div
                        className="bg-indigo-500 h-2 rounded-full"
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
              {Object.keys(categoriesCount).length === 0 && (
                <p className="text-sm text-gray-500 text-center py-4">No emails processed yet.</p>
              )}
            </div>
          )}
        </div>

        {/* Test Classification */}
        <div className="bg-white/80 dark:bg-[#1a1d27]/80 backdrop-blur-md rounded-3xl border border-gray-100 dark:border-white/5 p-6 shadow-xl shadow-gray-200/20 dark:shadow-black/40 flex flex-col">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-3">
            <div className="p-2 bg-indigo-500/10 rounded-lg">
              <Mail size={20} className="text-indigo-500" />
            </div>
            Live Demo: Test Classification
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-6 font-medium">
            Paste an email body below to see how the Gemini AI models categorize it in real-time.
          </p>

          <textarea
            className="w-full flex-1 p-4 text-sm rounded-2xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-black/20 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 resize-none transition-all shadow-inner"
            placeholder="e.g. Hi, my account is locked and I cannot reset my password. Please help."
            value={testEmailBody}
            onChange={(e) => setTestEmailBody(e.target.value)}
          />

          <div className="mt-4 flex items-center justify-between">
            <button
              onClick={handleTestClassification}
              disabled={isClassifying || !testEmailBody.trim()}
              className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white px-4 py-2 rounded-xl text-sm font-medium transition-all"
            >
              {isClassifying ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
              {isClassifying ? "Analyzing..." : "Classify Email"}
            </button>

            {testResult && (
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 text-sm font-medium border border-emerald-100 dark:border-emerald-800/30 animate-in fade-in zoom-in duration-300">
                <CheckCircle2 size={16} />
                {testResult}
              </div>
            )}
            {testError && (
              <div className="text-red-500 text-sm font-medium px-2">
                {testError}
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
