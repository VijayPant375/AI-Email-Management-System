"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { Email } from "@/types/email";
import { Badge, PriorityBadge, SentimentBadge, StatusBadge } from "./Badge";
import EmailDetailPanel from "./EmailDetailPanel";

interface EmailTableProps {
  emails: Email[];
}

export default function EmailTable({ emails }: EmailTableProps) {
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);

  return (
    <>
      <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm dark:shadow-xl overflow-hidden transition-colors duration-200">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            {/* Sticky header */}
            <thead className="bg-gray-50 dark:bg-gray-900/50 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-10">
              <tr>
                <th className="px-4 py-3 text-left text-[11px] font-bold text-gray-500 uppercase tracking-wider w-[18%]">
                  Sender
                </th>
                <th className="px-4 py-3 text-left text-[11px] font-bold text-gray-500 uppercase tracking-wider w-[28%]">
                  Subject
                </th>
                <th className="px-4 py-3 text-left text-[11px] font-bold text-gray-500 uppercase tracking-wider w-[10%]">
                  Category
                </th>
                <th className="px-4 py-3 text-left text-[11px] font-bold text-gray-500 uppercase tracking-wider w-[10%]">
                  Priority
                </th>
                <th className="px-4 py-3 text-left text-[11px] font-bold text-gray-500 uppercase tracking-wider w-[12%]">
                  Sentiment
                </th>
                <th className="px-4 py-3 text-left text-[11px] font-bold text-gray-500 uppercase tracking-wider w-[12%]">
                  Received
                </th>
                <th className="px-4 py-3 text-left text-[11px] font-bold text-gray-500 uppercase tracking-wider w-[10%]">
                  Status
                </th>
              </tr>
            </thead>

            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-50 dark:divide-gray-700/50">
              {emails.map((email, index) => (
                <motion.tr
                  key={email.id}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.03, duration: 0.2 }}
                  onClick={() => setSelectedEmail(email)}
                  className="cursor-pointer transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-700 hover:shadow-[inset_4px_0_0_0_#6366f1] odd:bg-white dark:odd:bg-gray-800 even:bg-gray-50/40 dark:even:bg-gray-800/60"
                >
                  {/* Sender */}
                  <td className="px-4 py-3.5 whitespace-nowrap">
                    <div
                      className="flex items-center gap-2.5"
                      title={email.sender_email}
                    >
                      <div className="w-7 h-7 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-700 dark:text-indigo-400 text-[10px] font-bold shrink-0 uppercase">
                        {email.sender_email.charAt(0)}
                      </div>
                      <span className="font-semibold text-gray-800 dark:text-gray-200 truncate max-w-[140px] text-xs">
                        {email.sender_email}
                      </span>
                    </div>
                  </td>

                  {/* Subject */}
                  <td className="px-4 py-3.5 max-w-[220px]">
                    <div className="flex items-center gap-2" title={email.subject}>
                      <span className="font-medium text-gray-700 dark:text-gray-300 truncate text-xs">
                        {email.subject}
                      </span>
                      {email.manual_review_flag && (
                        <Badge variant="review" label="Review" />
                      )}
                    </div>
                  </td>

                  {/* Category */}
                  <td className="px-4 py-3.5 whitespace-nowrap">
                    <Badge variant="category" label={email.category} />
                  </td>

                  {/* Priority */}
                  <td className="px-4 py-3.5 whitespace-nowrap">
                    <PriorityBadge priority={email.priority} />
                  </td>

                  {/* Sentiment */}
                  <td className="px-4 py-3.5 whitespace-nowrap">
                    <SentimentBadge sentiment={email.sentiment} />
                  </td>

                  {/* Received */}
                  <td className="px-4 py-3.5 whitespace-nowrap text-xs text-gray-400">
                    {(() => {
                      if (!email.received_time) return "N/A";
                      const d = new Date(email.received_time);
                      if (isNaN(d.getTime()) || d.getFullYear() <= 1970) return "N/A";
                      return d.toLocaleString(undefined, {
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      });
                    })()}
                  </td>

                  {/* Status */}
                  <td className="px-4 py-3.5 whitespace-nowrap">
                    <StatusBadge replied={email.response_sent} />
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail Panel */}
      <EmailDetailPanel
        email={selectedEmail}
        onClose={() => setSelectedEmail(null)}
      />
    </>
  );
}
