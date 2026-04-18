"use client";

import { useEffect } from "react";
import { X, Mail, Clock, BarChart2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { Email } from "@/types/email";
import { PriorityBadge, SentimentBadge, StatusBadge, Badge } from "./Badge";

interface EmailDetailPanelProps {
  email: Email | null;
  onClose: () => void;
}

export default function EmailDetailPanel({
  email,
  onClose,
}: EmailDetailPanelProps) {
  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <AnimatePresence>
      {email && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            className="fixed inset-0 z-40 bg-gray-900/40 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
          />

          {/* Panel */}
          <motion.aside
            key="panel"
            className="fixed inset-y-0 right-0 z-50 w-full max-w-xl flex flex-col bg-white dark:bg-gray-900 shadow-2xl border-l border-gray-100 dark:border-gray-800 transition-colors duration-200"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", ease: "easeInOut", duration: 0.3 }}
          >
            {/* Header (Sticky at top) */}
            <div className="flex items-start justify-between gap-4 px-8 py-6 border-b border-gray-100 dark:border-gray-800 bg-gray-50/80 dark:bg-gray-900/80 backdrop-blur-md shrink-0">
              <div className="min-w-0">
                <p className="text-xs font-bold text-indigo-600 uppercase tracking-widest mb-1.5 flex items-center gap-2">
                  <Mail size={14} />
                  Email Detail
                </p>
                <h2
                  className="text-xl font-bold text-gray-900 dark:text-gray-50 leading-snug break-words"
                  title={email.subject}
                >
                  {email.subject}
                </h2>
              </div>
              <button
                onClick={onClose}
                className="shrink-0 w-9 h-9 rounded-full flex items-center justify-center text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-200 transition-all focus:outline-none"
                aria-label="Close panel"
              >
                <X size={18} />
              </button>
            </div>

            {/* Scrollable body */}
            <div className="flex-1 overflow-y-auto p-8 space-y-8 bg-white dark:bg-gray-900">
              
              {/* Meta information row enclosed in card container */}
              <div className="grid grid-cols-2 gap-4 p-6 bg-gray-50 dark:bg-gray-800 rounded-2xl border border-gray-100/80 dark:border-gray-700">
                <MetaItem icon={<Mail size={14} className="text-indigo-500 dark:text-indigo-400" />} label="From">
                  <span className="text-sm text-gray-900 dark:text-gray-200 font-bold break-all">
                    {email.sender_email}
                  </span>
                </MetaItem>
                <MetaItem icon={<Clock size={14} className="text-indigo-500 dark:text-indigo-400" />} label="Received">
                  <span className="text-sm text-gray-900 dark:text-gray-200 font-semibold">
                    {(() => {
                      if (!email.received_time) return "N/A";
                      const d = new Date(email.received_time);
                      if (isNaN(d.getTime()) || d.getFullYear() <= 1970) return "N/A";
                      return d.toLocaleString(undefined, {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      });
                    })()}
                  </span>
                </MetaItem>
                {email.reply_sent_at && (() => {
                  const d = new Date(email.reply_sent_at);
                  if (isNaN(d.getTime()) || d.getFullYear() <= 1970) return null;
                  return (
                    <MetaItem icon={<Clock size={14} className="text-indigo-500 dark:text-indigo-400" />} label="Replied At">
                      <span className="text-sm text-gray-900 dark:text-gray-200 font-semibold">
                        {d.toLocaleString(undefined, {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </span>
                    </MetaItem>
                  );
                })()}
                <MetaItem icon={<BarChart2 size={14} className="text-indigo-500 dark:text-indigo-400" />} label="Confidence">
                  <span className="inline-flex items-center justify-center px-2 py-0.5 rounded text-xs font-bold bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800 w-fit mt-1">
                    {Math.round(email.confidence_score * 100)}%
                  </span>
                </MetaItem>
              </div>

              {/* Classifications / Badges Section */}
              <div>
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-4">
                  <span className="text-gray-600 dark:text-gray-400">Classifications</span>
                  <div className="h-px bg-gray-100 dark:bg-gray-800 flex-1"></div>
                </h3>
                <div className="flex flex-wrap gap-2.5">
                  <Badge variant="category" label={email.category} />
                  <PriorityBadge priority={email.priority} />
                  <SentimentBadge sentiment={email.sentiment} />
                  <StatusBadge replied={email.response_sent} />
                  {email.manual_review_flag && (
                    <Badge variant="review" label="Needs Review" />
                  )}
                </div>
              </div>

              {/* Message Body Section */}
              <div className="pb-8">
                 <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-4">
                  <span className="text-gray-600">Message Body</span>
                  <div className="h-px bg-gray-100 dark:bg-gray-800 flex-1"></div>
                </h3>
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 text-sm text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap border border-gray-200 dark:border-gray-700 shadow-sm min-h-[300px]">
                  {email.email_body || (
                    <span className="text-gray-400 italic">
                      No body content available.
                    </span>
                  )}
                </div>
              </div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

function MetaItem({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1">
      <span className="flex items-center gap-1.5 text-[11px] font-bold text-gray-500 uppercase tracking-wider">
        {icon}
        {label}
      </span>
      {children}
    </div>
  );
}
