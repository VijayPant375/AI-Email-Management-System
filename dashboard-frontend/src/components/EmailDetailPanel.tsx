"use client";

import { useEffect } from "react";
import { X, Mail, Clock, Tag, BarChart2, AlertCircle } from "lucide-react";
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
            className="fixed inset-0 z-40 bg-black/25 backdrop-blur-[2px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Panel */}
          <motion.aside
            key="panel"
            className="fixed inset-y-0 right-0 z-50 w-full max-w-lg flex flex-col bg-white shadow-2xl"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
          >
            {/* Header */}
            <div className="flex items-start justify-between gap-4 px-6 py-5 border-b border-gray-100">
              <div className="min-w-0">
                <p className="text-xs font-semibold text-indigo-600 uppercase tracking-widest mb-1">
                  Email Detail
                </p>
                <h2
                  className="text-base font-semibold text-gray-900 leading-snug truncate"
                  title={email.subject}
                >
                  {email.subject}
                </h2>
              </div>
              <button
                onClick={onClose}
                className="shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition-colors"
                aria-label="Close panel"
              >
                <X size={16} />
              </button>
            </div>

            {/* Scrollable body */}
            <div className="flex-1 overflow-y-auto px-6 py-5 space-y-6">
              {/* Meta row */}
              <div className="grid grid-cols-2 gap-4">
                <MetaItem icon={<Mail size={13} />} label="From">
                  <span className="text-xs text-gray-700 font-medium break-all">
                    {email.sender_email}
                  </span>
                </MetaItem>
                <MetaItem icon={<Clock size={13} />} label="Received">
                  <span className="text-xs text-gray-700">
                    {new Date(email.received_time).toLocaleString()}
                  </span>
                </MetaItem>
                {email.reply_sent_at && (
                  <MetaItem icon={<Clock size={13} />} label="Replied At">
                    <span className="text-xs text-gray-700">
                      {new Date(email.reply_sent_at).toLocaleString()}
                    </span>
                  </MetaItem>
                )}
                <MetaItem icon={<BarChart2 size={13} />} label="Confidence">
                  <span className="text-xs text-gray-700">
                    {Math.round(email.confidence_score * 100)}%
                  </span>
                </MetaItem>
              </div>

              {/* Badges */}
              <div className="flex flex-wrap gap-2">
                <Badge variant="category" label={email.category} />
                <PriorityBadge priority={email.priority} />
                <SentimentBadge sentiment={email.sentiment} />
                <StatusBadge replied={email.response_sent} />
                {email.manual_review_flag && (
                  <Badge variant="review" label="Needs Review" />
                )}
              </div>

              {/* Divider */}
              <hr className="border-gray-100" />

              {/* Email body */}
              <div>
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">
                  Message
                </p>
                <div className="bg-gray-50 rounded-xl p-4 text-sm text-gray-700 leading-relaxed whitespace-pre-wrap font-mono border border-gray-100">
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
      <span className="flex items-center gap-1 text-[10px] font-semibold text-gray-400 uppercase tracking-wider">
        {icon}
        {label}
      </span>
      {children}
    </div>
  );
}
